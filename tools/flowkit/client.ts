import axios, { AxiosInstance, isAxiosError } from "axios";

export type AspectRatio = "1:1" | "9:16" | "16:9" | "3:4" | "4:3";
export type ImageModel = "NANO_BANANA_PRO" | "NANO_BANANA_2" | "NANO_BANANA_2_LITE";
export type ExportQuality = "2k" | "4k";

export interface GenerateImageRequest {
  prompt: string;
  project_id: string;
  aspect_ratio?: AspectRatio;
  image_model?: ImageModel;
  count?: number;
  seed?: number;
  reference_media_ids?: string[];
}

export interface GenerateImageMedia {
  name: string;
  image: {
    generatedImage: {
      mediaId: string;
      fifeUrl: string;
    };
  };
}

export interface GenerateImageResponse {
  media: GenerateImageMedia[];
  requested_count: number;
  generated_count: number;
  complete: boolean;
  failed_variants?: Array<{ index: number; error: string }>;
}

export interface ExportImageRequest {
  media_id: string;
  project_id: string;
  quality?: ExportQuality;
}

export interface ExportImageResult {
  bytes: Buffer;
  contentType: string;
}

export interface HealthResponse {
  status: "ok";
  version: string;
  extension_connected: boolean;
  ws: {
    connected: boolean;
    active_connections: number;
    authenticated_connections: number;
    extension_versions: string[];
    flow_url_supported: boolean | null;
    connects: number;
    disconnects: number;
    uptime_s: number | null;
  };
}

export interface FlowStatusResponse {
  connected: boolean;
  transport: "batch";
  flow_project_id: string | null;
  allow_degraded: boolean;
  flow_key_present: boolean;
}

export class FlowKitError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "FlowKitError";
  }
}

const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!isAxiosError(error)) throw error;
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        throw toFlowKitError(error);
      }
      const status = error.response?.status;
      if (!status || !RETRYABLE_STATUSES.has(status) || attempt >= MAX_RETRIES - 1) {
        throw toFlowKitError(error);
      }
      await sleep(2 ** attempt * 10_000);
    }
  }
}

function toFlowKitError(error: unknown): FlowKitError {
  if (!isAxiosError(error)) {
    return new FlowKitError(error instanceof Error ? error.message : String(error));
  }
  const status = error.response?.status;
  if (status === 503) {
    return new FlowKitError(
      "Extension not connected (503). Mo tab flow.google.com da dang nhap, giu tab do mo, roi thu lai.",
      status,
    );
  }
  const data = error.response?.data as { error?: string; data?: unknown } | undefined;
  const detail = data?.error ?? (typeof data?.data === "string" ? data.data : undefined) ?? error.message;
  return new FlowKitError(String(detail), status);
}

export interface FlowClient {
  health(): Promise<HealthResponse>;
  status(): Promise<FlowStatusResponse>;
  generateImages(req: GenerateImageRequest): Promise<GenerateImageResponse>;
  exportImage(req: ExportImageRequest): Promise<ExportImageResult>;
}

export function createFlowClient(baseURL: string): FlowClient {
  const http: AxiosInstance = axios.create({ baseURL, timeout: 120_000 });

  return {
    async health() {
      return withRetry(async () => (await http.get<HealthResponse>("/health")).data);
    },

    async status() {
      return withRetry(async () => (await http.get<FlowStatusResponse>("/api/flow/status")).data);
    },

    async generateImages(req) {
      return withRetry(
        async () => (await http.post<GenerateImageResponse>("/api/flow/generate-image", req)).data,
      );
    },

    async exportImage(req) {
      return withRetry(async () => {
        const response = await http.post("/api/flow/export-image", req, {
          responseType: "arraybuffer",
        });
        const contentType =
          typeof response.headers["content-type"] === "string"
            ? response.headers["content-type"]
            : "image/jpeg";
        return { bytes: Buffer.from(response.data as ArrayBuffer), contentType };
      });
    },
  };
}
