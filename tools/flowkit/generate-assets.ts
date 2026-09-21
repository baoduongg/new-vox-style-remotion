import { parseArgs } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createFlowClient,
  FlowKitError,
  type AspectRatio,
  type ExportQuality,
  type ImageModel,
} from "./client.js";

type EntityKind = "character" | "location" | "prop";

interface ManifestEntity {
  name: string;
  kind: EntityKind;
  description: string;
  aspect?: AspectRatio;
}

interface ManifestShot {
  id: string;
  action: string;
  entities: string[];
  aspect?: AspectRatio;
  variants?: number;
}

interface Manifest {
  style: string;
  aspect: AspectRatio;
  model?: ImageModel;
  entities: ManifestEntity[];
  shots: ManifestShot[];
}

interface FlowKitState {
  entities: Record<string, { mediaId: string }>;
  shots: Record<string, { mediaIds: string[] }>;
}

const DEFAULT_ASPECT: Record<EntityKind, AspectRatio> = {
  character: "3:4",
  location: "16:9",
  prop: "1:1",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function loadManifest(raw: unknown): Manifest {
  if (typeof raw !== "object" || raw === null) throw new Error("Manifest phai la object JSON.");
  const m = raw as Record<string, unknown>;
  if (typeof m.style !== "string") throw new Error("Manifest thieu 'style' (string).");
  if (typeof m.aspect !== "string") throw new Error("Manifest thieu 'aspect' (string).");
  if (!Array.isArray(m.entities) || m.entities.length === 0)
    throw new Error("Manifest thieu 'entities' (array khong rong).");
  if (!Array.isArray(m.shots) || m.shots.length === 0)
    throw new Error("Manifest thieu 'shots' (array khong rong).");

  const entities = m.entities as ManifestEntity[];
  const shots = m.shots as ManifestShot[];

  const entityNames = new Set<string>();
  for (const e of entities) {
    if (!e.name || !e.kind || !e.description)
      throw new Error(`Entity thieu field bat buoc: ${JSON.stringify(e)}`);
    if (!["character", "location", "prop"].includes(e.kind))
      throw new Error(`Entity '${e.name}' co kind khong hop le: ${e.kind}`);
    if (entityNames.has(e.name)) throw new Error(`Entity trung ten: ${e.name}`);
    entityNames.add(e.name);
  }

  const shotIds = new Set<string>();
  for (const s of shots) {
    if (!s.id || !s.action || !Array.isArray(s.entities))
      throw new Error(`Shot thieu field bat buoc: ${JSON.stringify(s)}`);
    if (shotIds.has(s.id)) throw new Error(`Shot trung id: ${s.id}`);
    shotIds.add(s.id);
    for (const name of s.entities) {
      if (!entityNames.has(name)) throw new Error(`Shot '${s.id}' tham chieu entity khong ton tai: ${name}`);
    }
    if (!s.entities.some((name) => s.action.includes(name))) {
      console.warn(`Canh bao: shot '${s.id}' khong nhac ten entity nao trong action.`);
    }
    if (s.variants !== undefined && (s.variants < 1 || s.variants > 4)) {
      throw new Error(`Shot '${s.id}' co variants ngoai pham vi 1-4: ${s.variants}`);
    }
  }

  return { style: m.style as string, aspect: m.aspect as AspectRatio, model: m.model as ImageModel | undefined, entities, shots };
}

async function loadState(statePath: string): Promise<FlowKitState> {
  try {
    const raw = await readFile(statePath, "utf-8");
    return JSON.parse(raw) as FlowKitState;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { entities: {}, shots: {} };
    }
    throw new Error(`Khong the doc state file '${statePath}': ${(error as Error).message}`);
  }
}

let stateWriteQueue: Promise<void> = Promise.resolve();
function saveState(statePath: string, state: FlowKitState): Promise<void> {
  stateWriteQueue = stateWriteQueue.then(() =>
    writeFile(statePath, JSON.stringify(state, null, 2), "utf-8"),
  );
  return stateWriteQueue;
}

async function runPool<T>(
  items: T[],
  limit: number,
  cooldownMs: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  let index = 0;
  let firstStart = true;

  async function runNext(): Promise<void> {
    while (index < items.length) {
      const item = items[index++];
      if (!firstStart) await sleep(cooldownMs);
      firstStart = false;
      await worker(item);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => runNext());
  await Promise.all(workers);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function entityPrompt(style: string, entity: ManifestEntity): string {
  const framing: Record<EntityKind, string> = {
    character: "full-body character reference sheet, neutral pose, plain bright solid background for easy cutout",
    location: "wide establishing background plate, no characters",
    prop: "isolated object reference, plain bright solid background for easy cutout",
  };
  return `${style}. ${framing[entity.kind]}. ${entity.description}`;
}

function shotPrompt(style: string, shot: ManifestShot): string {
  return `${style}. ${shot.action}`;
}

interface RunOptions {
  manifestPath: string;
  outDir: string;
  quality: ExportQuality;
  probe: boolean;
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      manifest: { type: "string" },
      out: { type: "string", default: "public/generated" },
      quality: { type: "string", default: "2k" },
      probe: { type: "boolean", default: false },
    },
  });

  if (!values.manifest) {
    console.error("Thieu --manifest <path>");
    process.exitCode = 1;
    return;
  }
  if (values.quality !== "2k" && values.quality !== "4k") {
    console.error("--quality phai la '2k' hoac '4k'");
    process.exitCode = 1;
    return;
  }

  const options: RunOptions = {
    manifestPath: values.manifest,
    outDir: values.out as string,
    quality: values.quality,
    probe: values.probe as boolean,
  };

  const projectId = process.env.FLOW_PROJECT_ID;
  if (!projectId) {
    console.error("Thieu bien moi truong FLOW_PROJECT_ID (uuid project Flow).");
    process.exitCode = 1;
    return;
  }
  const flowkitUrl = process.env.FLOWKIT_URL ?? "http://127.0.0.1:8100";
  const concurrency = Math.min(Number(process.env.FLOW_CONCURRENCY ?? 2), 5);
  const cooldownMs = Number(process.env.FLOW_COOLDOWN_MS ?? 5000);

  const client = createFlowClient(flowkitUrl);

  const health = await client.health().catch((error) => {
    throw new Error(`Khong goi duoc FlowKit agent tai ${flowkitUrl}: ${(error as Error).message}`);
  });
  if (!health.extension_connected) {
    console.error(
      [
        "FlowKit extension chua ket noi (extension_connected=false).",
        "1. Mo chrome://extensions, bat Developer mode, Load unpacked, chon thu muc extension/ trong ../flowkit",
        "2. Mo flow.google.com, dang nhap, giu tab do mo",
        "3. Tao project trong Flow UI, copy uuid trong URL",
        "4. export FLOW_PROJECT_ID=<uuid> roi khoi dong lai agent FlowKit",
      ].join("\n"),
    );
    process.exitCode = 1;
    return;
  }

  const manifestRaw = JSON.parse(await readFile(options.manifestPath, "utf-8"));
  const manifest = loadManifest(manifestRaw);

  const statePath = path.join(options.outDir, ".flowkit-state.json");
  const refsDir = path.join(options.outDir, "refs");
  const shotsDir = path.join(options.outDir, "shots");
  await mkdir(refsDir, { recursive: true });
  await mkdir(shotsDir, { recursive: true });

  const state = await loadState(statePath);
  const errors: string[] = [];

  if (options.probe) {
    const entity = manifest.entities[0];
    try {
      const response = await client.generateImages({
        prompt: entityPrompt(manifest.style, entity),
        project_id: projectId,
        aspect_ratio: entity.aspect ?? DEFAULT_ASPECT[entity.kind],
        image_model: manifest.model,
        count: 1,
      });
      await writeFile(path.join(options.outDir, ".probe.json"), JSON.stringify(response, null, 2), "utf-8");
      const mediaId = response.media[0]?.image.generatedImage.mediaId;
      console.log(`Probe OK. media_id: ${mediaId ?? "(khong tim thay)"}`);
    } catch (error) {
      console.error(`Probe that bai: ${(error as Error).message}`);
      process.exitCode = 1;
    }
    return;
  }

  await runPool(manifest.entities, concurrency, cooldownMs, async (entity) => {
    const slug = slugify(entity.name);
    if (state.entities[slug]) {
      console.log(`Bo qua entity '${entity.name}' (da co media_id).`);
      return;
    }
    try {
      const generated = await client.generateImages({
        prompt: entityPrompt(manifest.style, entity),
        project_id: projectId,
        aspect_ratio: entity.aspect ?? DEFAULT_ASPECT[entity.kind],
        image_model: manifest.model,
        count: 1,
      });
      const mediaId = generated.media[0]?.image.generatedImage.mediaId;
      if (!mediaId) throw new Error("Response khong co media_id.");
      const exported = await client.exportImage({ media_id: mediaId, project_id: projectId, quality: options.quality });
      await writeFile(path.join(refsDir, `${slug}.jpg`), exported.bytes);
      state.entities[slug] = { mediaId };
      await saveState(statePath, state);
      console.log(`Da tao ref entity '${entity.name}' -> refs/${slug}.jpg`);
    } catch (error) {
      const message = error instanceof FlowKitError ? error.message : (error as Error).message;
      errors.push(`Entity '${entity.name}': ${message}`);
      console.error(`Loi entity '${entity.name}': ${message}`);
    }
  });

  await runPool(manifest.shots, concurrency, cooldownMs, async (shot) => {
    if (state.shots[shot.id]) {
      console.log(`Bo qua shot '${shot.id}' (da co media_ids).`);
      return;
    }
    const referenceMediaIds = shot.entities
      .map((name) => state.entities[slugify(name)]?.mediaId)
      .filter((id): id is string => Boolean(id));
    if (referenceMediaIds.length !== shot.entities.length) {
      const message = `Shot '${shot.id}' thieu media_id cua entity tham chieu (entity gen that bai o buoc truoc).`;
      errors.push(message);
      console.error(message);
      return;
    }
    try {
      const variants = shot.variants ?? 1;
      const generated = await client.generateImages({
        prompt: shotPrompt(manifest.style, shot),
        project_id: projectId,
        aspect_ratio: shot.aspect ?? manifest.aspect,
        image_model: manifest.model,
        count: variants,
        reference_media_ids: referenceMediaIds,
      });
      const mediaIds: string[] = [];
      for (let i = 0; i < generated.media.length; i++) {
        const mediaId = generated.media[i].image.generatedImage.mediaId;
        const exported = await client.exportImage({ media_id: mediaId, project_id: projectId, quality: options.quality });
        await writeFile(path.join(shotsDir, `${shot.id}-${i + 1}.jpg`), exported.bytes);
        mediaIds.push(mediaId);
      }
      state.shots[shot.id] = { mediaIds };
      await saveState(statePath, state);
      console.log(`Da tao shot '${shot.id}' -> shots/${shot.id}-1..${mediaIds.length}.jpg`);
    } catch (error) {
      const message = error instanceof FlowKitError ? error.message : (error as Error).message;
      errors.push(`Shot '${shot.id}': ${message}`);
      console.error(`Loi shot '${shot.id}': ${message}`);
    }
  });

  if (errors.length > 0) {
    console.error(`\nTong ket: ${errors.length} loi.`);
    for (const message of errors) console.error(`- ${message}`);
    process.exitCode = 1;
  } else {
    console.log("\nHoan tat, khong co loi.");
  }
}

main().catch((error) => {
  console.error((error as Error).message);
  process.exitCode = 1;
});
