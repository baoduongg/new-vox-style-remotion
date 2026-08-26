#!/usr/bin/env node
// Zero-dependency static server for the dashboard. Run: node dashboard/serve.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const net = require("net");
const { execSync, spawn } = require("child_process");

const ROOT = __dirname;
const PARENT = path.resolve(ROOT, "..");
const PORT = 4747;
const STUDIO_PORT_BASE = 3300;

// projectId -> { port, proc, status: 'starting'|'ready'|'error' }
const studios = new Map();

function isPortFree(port) {
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once("error", () => resolve(false))
      .once("listening", () => tester.close(() => resolve(true)))
      .listen(port, "127.0.0.1");
  });
}

async function findFreePort(startAt) {
  let port = startAt;
  while (!(await isPortFree(port))) port++;
  return port;
}

function waitForPortOpen(port, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    (function attempt() {
      const socket = net.createConnection({ port, host: "127.0.0.1" }, () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() > deadline) return reject(new Error("Studio boot timeout"));
        setTimeout(attempt, 400);
      });
    })();
  });
}

async function startStudio(projectId) {
  const existing = studios.get(projectId);
  if (existing) {
    // Someone already claimed this project (in-flight spawn or running instance).
    // Wait for the in-flight one to settle instead of racing a second spawn.
    if (existing.status !== "error") return existing;
    studios.delete(projectId);
  }

  const projectDir = path.join(PARENT, projectId);
  if (!fs.existsSync(path.join(projectDir, "package.json"))) {
    throw new Error("Unknown project");
  }
  if (!fs.existsSync(path.join(projectDir, "node_modules"))) {
    throw new Error("Chưa cài dependencies. Chạy npm install (hoặc pnpm install) trong thư mục dự án trước.");
  }

  // Reserve the slot BEFORE the async port lookup so a second concurrent
  // /start call for the same project sees this placeholder, not a gap.
  const entry = { port: null, proc: null, status: "starting", errorLog: "" };
  studios.set(projectId, entry);

  const port = await findFreePort(STUDIO_PORT_BASE + studios.size);
  entry.port = port;

  const proc = spawn("npx", ["remotion", "studio", "--port", String(port)], {
    cwd: projectDir,
    stdio: ["ignore", "ignore", "pipe"],
    detached: false,
  });
  entry.proc = proc;

  proc.stderr.on("data", (chunk) => {
    entry.errorLog = (entry.errorLog + chunk.toString()).slice(-2000);
  });

  proc.on("exit", () => {
    if (studios.get(projectId) === entry) {
      entry.status = "error";
      entry.exited = true;
    }
  });

  waitForPortOpen(port, 30000)
    .then(() => { entry.status = "ready"; })
    .catch(() => { if (!entry.exited) entry.status = "error"; });

  return entry;
}

process.on("exit", () => {
  for (const { proc } of studios.values()) proc?.kill();
});
process.on("SIGINT", () => process.exit());

const MIME = {
  ".html": "text/html",
  ".json": "application/json",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
};

try {
  execSync("node scan.js", { cwd: ROOT, stdio: "inherit" });
} catch (e) {
  console.error("Scan failed, serving stale data.json if present.");
}

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);

  if (urlPath === "/api/rescan" && req.method === "POST") {
    try {
      execSync("node scan.js", { cwd: ROOT, stdio: "pipe" });
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: e.message }));
    }
  }

  const startMatch = urlPath.match(/^\/api\/studio\/([^/]+)\/start$/);
  if (startMatch && req.method === "POST") {
    try {
      const entry = await startStudio(startMatch[1]);
      // If we attached to an in-flight spawn, its port may not be assigned yet.
      while (entry.port === null) await new Promise((r) => setTimeout(r, 50));
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ port: entry.port, status: entry.status }));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: e.message }));
    }
  }

  const statusMatch = urlPath.match(/^\/api\/studio\/([^/]+)\/status$/);
  if (statusMatch && req.method === "GET") {
    const entry = studios.get(statusMatch[1]);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(
      entry
        ? { port: entry.port, status: entry.status, errorLog: entry.status === "error" ? entry.errorLog : undefined }
        : { status: "stopped" }
    ));
  }

  const target = urlPath === "/" ? "/index.html" : urlPath;

  // Dashboard's own files (index.html, data.json, assets/...) live under ROOT.
  // Everything else (project folders like /viking-monster-strength/out/x.mp4)
  // is resolved from PARENT so render links can point at sibling projects.
  const dashboardLocal = path.normalize(path.join(ROOT, target));
  const filePath = fs.existsSync(dashboardLocal)
    ? dashboardLocal
    : path.normalize(path.join(PARENT, target));

  if (!filePath.startsWith(PARENT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Dashboard running at http://localhost:${PORT}`);
});
