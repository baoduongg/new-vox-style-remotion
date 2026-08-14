import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene, type Layer } from "../scenes/Scene";
import scenesData from "../data/scenes.json";

export const Landscape: React.FC = () => (
  <AbsoluteFill>
    {/* ponytail: chưa có voiceover, thêm khi scenesData.audioSrc tồn tại */}
    {"audioSrc" in scenesData && (scenesData as { audioSrc?: string }).audioSrc && (
      <Audio
        src={staticFile(
          (scenesData as { audioSrc: string }).audioSrc.replace(/^public\//, ""),
        )}
      />
    )}
    {scenesData.scenes.map((s, i) => (
      <Sequence
        key={s.id}
        from={s.startFrame}
        durationInFrames={s.durationInFrames}
      >
        <Scene
          layers={s.layers as Layer[]}
          durationInFrames={s.durationInFrames}
          sceneIndex={i}
        />
      </Sequence>
    ))}
  </AbsoluteFill>
);
