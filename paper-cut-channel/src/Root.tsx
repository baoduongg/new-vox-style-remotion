import "./index.css";
import { Composition } from "remotion";
import { Landscape } from "./compositions/Landscape";
import { Vertical } from "./compositions/Vertical";
import scenesData from "./data/scenes.json";

const totalDuration = scenesData.scenes.reduce(
  (max, s) => Math.max(max, s.startFrame + s.durationInFrames),
  0,
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Landscape"
      component={Landscape}
      durationInFrames={totalDuration}
      fps={scenesData.fps}
      width={1920}
      height={1080}
    />
    <Composition
      id="Vertical"
      component={Vertical}
      durationInFrames={totalDuration}
      fps={scenesData.fps}
      width={1080}
      height={1920}
    />
  </>
);
