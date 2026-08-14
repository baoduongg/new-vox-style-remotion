import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export type Layer = {
  src: string;
  depth: number; // 0 = background (đứng yên), 1 = mid, 2 = foreground (parallax nhiều nhất)
  baseRotationDeg: number; // cố định theo scene, không random runtime
  entryDelayFrames?: number;
  // "background": ảnh full-bleed phủ cả khung. "element": ảnh cutout (nền trong suốt),
  // đặt theo vùng x/y/width riêng, rung/lắc tại chỗ mạnh hơn để nổi bật.
  kind?: "background" | "element";
  x?: number; // % từ trái, chỉ dùng khi kind === "element"
  y?: number; // % từ trên
  width?: number; // % chiều rộng khung
};

// 4 biến thể cạnh răng cưa, xoay vòng theo sceneIndex % 4 — tránh mọi layer cắt y hệt nhau
const CLIP_PATH_VARIANTS = [
  "polygon(2% 0%, 98% 1%, 100% 97%, 97% 100%, 3% 99%, 0% 96%)",
  "polygon(0% 2%, 97% 0%, 100% 3%, 99% 98%, 2% 100%, 1% 97%)",
  "polygon(1% 1%, 99% 0%, 100% 96%, 98% 100%, 2% 99%, 0% 3%)",
  "polygon(0% 0%, 96% 2%, 100% 99%, 4% 100%, 0% 98%, 1% 2%)",
];

// Cut-in wipe: scene mới trượt vào từ cạnh trái, mô phỏng 1 tờ giấy đặt chồng lên
const WIPE_FRAMES = 12;

// Rung/lắc tại chỗ liên tục, seed theo scene+layer để mỗi phần lệch pha nhau (không đồng bộ máy móc)
const idleWiggle = (frame: number, seed: number) => {
  const period = 85 + (seed % 45); // ~2.8-4.3s/chu kỳ ở 30fps
  const phase = ((seed % 20) / 20) * Math.PI * 2;
  const ampDeg = 1.1 + ((seed % 10) / 10) * 1.2; // 1.1-2.3deg
  const rotate = Math.sin((frame / period) * Math.PI * 2 + phase) * ampDeg;
  const bobY =
    Math.cos((frame / (period * 1.3)) * Math.PI * 2 + phase) * (2 + (seed % 3));
  return { rotate, bobY };
};

export const Scene: React.FC<{
  layers: Layer[];
  durationInFrames: number;
  sceneIndex: number;
}> = ({ layers, durationInFrames, sceneIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 100 (chưa lộ gì) -> 0 (lộ toàn bộ), wipe từ trái sang phải
  const wipeHiddenPercent = interpolate(frame, [0, WIPE_FRAMES], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#F4EDE1",
        clipPath: `inset(0 ${wipeHiddenPercent}% 0 0)`,
      }}
    >
      {layers.map((layer, i) => {
        const kind = layer.kind ?? "background";
        const seed = sceneIndex * 7 + i * 13;
        const { rotate: idleRotate, bobY } = idleWiggle(frame, seed);

        const entryProgress = spring({
          frame: frame - (layer.entryDelayFrames ?? 0),
          fps,
          config: { damping: 14, mass: 0.6 },
        });
        const parallaxY = interpolate(
          frame,
          [0, durationInFrames],
          [0, -10 * (layer.depth + 1)],
        );
        const scaleIn = interpolate(entryProgress, [0, 1], [0.85, 1]);
        const shadowBlur = 5 + layer.depth * 7;
        const shadowOffset = 3 + layer.depth * 5;
        const clipPath =
          kind === "background"
            ? CLIP_PATH_VARIANTS[(sceneIndex + i) % CLIP_PATH_VARIANTS.length]
            : undefined;

        const positionStyle =
          kind === "element"
            ? {
                position: "absolute" as const,
                left: `${layer.x ?? 10}%`,
                top: `${layer.y ?? 10}%`,
                width: `${layer.width ?? 40}%`,
                height: "auto",
              }
            : { position: "absolute" as const, inset: 0 };

        return (
          <div
            key={i}
            style={{
              ...positionStyle,
              transform: `translateY(${parallaxY + bobY}px) scale(${scaleIn}) rotate(${
                layer.baseRotationDeg + idleRotate
              }deg)`,
              opacity: entryProgress,
              filter: [
                "drop-shadow(0 0 1.5px rgba(255,255,255,0.85))",
                `drop-shadow(${shadowOffset}px ${shadowOffset}px ${shadowBlur}px rgba(0,0,0,0.3))`,
              ].join(" "),
              clipPath,
            }}
          >
            <Img
              src={staticFile(layer.src.replace(/^public\//, ""))}
              style={{
                width: "100%",
                height: kind === "background" ? "100%" : "auto",
                objectFit: kind === "background" ? "cover" : "contain",
              }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
