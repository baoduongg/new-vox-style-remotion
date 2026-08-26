#!/usr/bin/env node
// Scans sibling project folders and writes dashboard/data.json + copies thumbnails.
// No dependencies (Node builtins only). Run: node dashboard/scan.js

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_ASSETS = path.join(__dirname, "assets");

fs.mkdirSync(OUT_ASSETS, { recursive: true });

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function findFirstExisting(paths) {
  return paths.find((p) => fs.existsSync(p)) || null;
}

function fileSizeMb(p) {
  try {
    return +(fs.statSync(p).size / 1024 / 1024).toFixed(1);
  } catch {
    return null;
  }
}

function formatDuration(totalFrames, fps) {
  if (!totalFrames || !fps) return null;
  const totalSeconds = Math.round(totalFrames / fps);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const entries = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .filter((d) => !d.name.startsWith(".") && d.name !== "dashboard" && d.name !== "node_modules" && d.name !== "public" && d.name !== "scripts" && d.name !== "images")
  .map((d) => d.name)
  .filter((name) => fs.existsSync(path.join(ROOT, name, "package.json")));

const projects = entries.map((name) => {
  const dir = path.join(ROOT, name);
  const pkg = readJson(path.join(dir, "package.json")) || {};

  const scenesPath = findFirstExisting([
    path.join(dir, "scenes.json"),
    path.join(dir, "scenes_en.json"),
  ]);
  const scenesData = scenesPath ? readJson(scenesPath) : null;
  const sceneCount = Array.isArray(scenesData?.scenes) ? scenesData.scenes.length : null;
  const fps = scenesData?.fps ?? null;
  const totalFrames = scenesData?.totalFrames ?? null;

  // Detect language variants from scenes_xx.json and render:xx scripts.
  // Only 2-letter ISO codes count as languages (e.g. render:shorts is a format, not a language).
  const scriptLangs = Object.keys(pkg.scripts || {})
    .filter((k) => /^render:[a-z]{2}$/.test(k))
    .map((k) => k.split(":")[1]);
  const scenesLangs = fs
    .readdirSync(dir)
    .filter((f) => /^scenes_[a-z]{2}\.json$/.test(f))
    .map((f) => f.match(/^scenes_([a-z]{2})\.json$/)[1]);
  const languages = [...new Set([...scriptLangs, ...scenesLangs])];

  // Rendered outputs
  const outDir = path.join(dir, "out");
  const renders = fs.existsSync(outDir)
    ? fs
        .readdirSync(outDir)
        .filter((f) => f.endsWith(".mp4"))
        .map((f) => ({
          file: f,
          sizeMb: fileSizeMb(path.join(outDir, f)),
        }))
    : [];

  // Thumbnail: prefer out/thumbnail, then public/thumbnail
  const thumbSrc = findFirstExisting([
    path.join(outDir, "thumbnail.jpg"),
    path.join(dir, "public", "thumbnail.jpg"),
    path.join(dir, "public", "thumbnail.png"),
  ]);
  let thumbnail = null;
  if (thumbSrc) {
    const ext = path.extname(thumbSrc);
    const destName = `${name}-thumb${ext}`;
    fs.copyFileSync(thumbSrc, path.join(OUT_ASSETS, destName));
    thumbnail = `assets/${destName}`;
  }

  const remotionVersion =
    (pkg.dependencies && pkg.dependencies.remotion) || null;

  const status = renders.length > 0 ? "rendered" : sceneCount ? "scripted" : "scaffold";

  let lastModified = null;
  try {
    lastModified = fs.statSync(dir).mtime.toISOString();
  } catch {}

  return {
    id: name,
    name: pkg.name || name,
    status,
    thumbnail,
    sceneCount,
    fps,
    totalFrames,
    duration: formatDuration(totalFrames, fps),
    languages,
    renders,
    remotionVersion,
    lastModified,
  };
});

// Most recently modified first
projects.sort((a, b) => (b.lastModified || "").localeCompare(a.lastModified || ""));

// Remove thumbnails left behind by projects that no longer exist.
const liveIds = new Set(entries);
for (const file of fs.readdirSync(OUT_ASSETS)) {
  const match = file.match(/^(.+)-thumb\.[a-z]+$/);
  if (match && !liveIds.has(match[1])) {
    fs.unlinkSync(path.join(OUT_ASSETS, file));
  }
}

fs.writeFileSync(
  path.join(__dirname, "data.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), projectRoot: ROOT, projects }, null, 2)
);

console.log(`Scanned ${projects.length} project(s). Wrote dashboard/data.json`);
projects.forEach((p) => console.log(`  - ${p.id}: ${p.status}, ${p.sceneCount ?? "?"} scenes, ${p.renders.length} render(s)`));
