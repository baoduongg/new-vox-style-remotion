# Hướng Dẫn Scaffold & Ráp Remotion (Remotion Scaffold Guide)

Tài liệu này cung cấp bộ khung mẫu dự án và các component React chuyên dụng để lắp ráp video phong cách **Stickman History & Ancient Survival** trong Remotion.

---

## 1. Cấu Trúc Dự Án Remotion Độc Lập Chuẩn (Standalone Project)

Mỗi video mới **BẮT BUỘC** được tạo trong một thư mục riêng biệt đặt tên theo topic (kebab-case, ví dụ: `viking-freezing-seas/` hoặc `persian-ice-desert/`):

```
viking-freezing-seas/
├── package.json                     # Dependencies & scripts độc lập
├── remotion.config.ts               # Cấu hình Rspack & format
├── tsconfig.json                    # Cấu hình TypeScript
├── scenes.json                      # Dữ liệu kịch bản & timing từng frame
├── prompt.json                      # Bộ prompt sinh visual
├── metadata.md                      # SEO Title, Description, Thumbnail prompt
├── src/
│   ├── index.ts                     # registerRoot(RemotionRoot)
│   ├── index.css                    # Google Fonts & background styling
│   ├── Root.tsx                     # Composition chính
│   ├── components/
│   │   ├── ParchmentCanvas.tsx      # Khung nền giấy da cổ + filter nét rung
│   │   ├── StickmanSVG.tsx          # Nhân vật người que đa tư thế
│   │   ├── HandDrawnCallout.tsx     # Mũi tên, vòng tròn & gạch chéo vẽ tay
│   │   ├── TemperatureGauge.tsx     # Thước đo nhiệt độ / calo
│   │   ├── CrossSectionDiagram.tsx  # Sơ đồ mặt cắt kỹ thuật
│   │   └── SplitCompare.tsx         # Bố cục so sánh tương phản 2 cột
│   └── scenes/
│       ├── Scene01_ParadoxHook.tsx
│       ├── Scene02_ThreatPhysics.tsx
│       └── Scene03_WoolScience.tsx
└── public/
    └── audio/
        ├── scenes/                  # Audio TTS từng câu (scene-01.mp3, ...)
        └── sfx/                     # Hiệu ứng Foley (gió, tiếng đóng dấu, bút chì, ...)
```

### File Mẫu Cấu Hình Cho Project Mới:

**`package.json`**:
```json
{
  "name": "topic-name",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@remotion/cli": "4.0.515",
    "@remotion/sfx": "4.0.515",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "remotion": "4.0.515"
  },
  "devDependencies": {
    "@types/react": "19.2.7",
    "@types/web": "0.0.166",
    "typescript": "5.9.3"
  },
  "scripts": {
    "dev": "remotion studio",
    "build": "remotion bundle",
    "render": "remotion render TopicDocumentary-EN out/video.mp4"
  }
}
```

**`remotion.config.ts`**:
```typescript
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "lib": ["es2015", "dom"],
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": false
  },
  "exclude": ["remotion.config.ts"]
}
```

**`src/index.ts`**:
```typescript
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

**`src/index.css`**:
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #F3EDE2;
}
```

---

## 2. Các Component Chuyên Dụng Sẵn Dùng

### A. Mũi Tên & Vòng Tròn Vẽ Tay (HandDrawnCallout.tsx)
Tự động vẽ nét từ đầu đến cuối khớp với frame trong Remotion:

```tsx
// src/components/HandDrawnCallout.tsx
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface CalloutProps {
  type: 'circle' | 'arrow';
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  delayFrames?: number;
  label?: string;
}

export const HandDrawnCallout: React.FC<CalloutProps> = ({
  type,
  x,
  y,
  width = 160,
  height = 100,
  color = '#C04A2B',
  delayFrames = 0,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 15, mass: 0.5 },
  });

  const strokeDash = interpolate(progress, [0, 1], [600, 0]);

  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        {type === 'circle' ? (
          <path
            d={`M 15 ${height / 2} Q ${width / 2} 5 ${width - 15} ${height / 2} T 15 ${height / 2}`}
            fill="none"
            stroke={color}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="600"
            strokeDashoffset={strokeDash}
          />
        ) : (
          <g>
            <path
              d={`M 10 10 Q ${width * 0.6} ${height * 0.2} ${width - 20} ${height - 20}`}
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset={strokeDash}
            />
            {progress > 0.8 && (
              <polygon
                points={`${width - 10},${height - 10} ${width - 35},${height - 20} ${width - 20},${height - 35}`}
                fill={color}
              />
            )}
          </g>
        )}
      </svg>
      {label && progress > 0.6 && (
        <div
          style={{
            position: 'absolute',
            left: width + 10,
            top: 0,
            color,
            fontSize: 22,
            fontWeight: 'bold',
            fontFamily: 'serif',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
```

### B. Thước Đo Nhiệt Độ & Calo (TemperatureGauge.tsx)
Thể hiện sự sụt giảm nhiệt độ cơ thể kịch tính:

```tsx
// src/components/TemperatureGauge.tsx
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const TemperatureGauge: React.FC<{ startTemp: number; endTemp: number; label: string }> = ({
  startTemp,
  endTemp,
  label,
}) => {
  const frame = useCurrentFrame();
  const currentTemp = interpolate(frame, [0, 90], [startTemp, endTemp], {
    extrapolateRight: 'clamp',
  });

  const isDanger = currentTemp <= 32;

  return (
    <div
      style={{
        position: 'absolute',
        right: 80,
        top: 140,
        backgroundColor: '#F3EDE2',
        border: '3px solid #222',
        borderRadius: 16,
        padding: '20px 30px',
        boxShadow: '4px 6px 0px rgba(34,34,34,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 180,
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: isDanger ? '#C04A2B' : '#1B3B4B',
          margin: '10px 0',
        }}
      >
        {currentTemp.toFixed(1)}°C
      </span>
      {/* Cột đo nhiệt độ trực quan */}
      <div style={{ width: 24, height: 160, border: '3px solid #222', borderRadius: 12, padding: 3 }}>
        <div
          style={{
            width: '100%',
            height: `${Math.max(10, ((currentTemp - 25) / 15) * 100)}%`,
            backgroundColor: isDanger ? '#C04A2B' : '#1B3B4B',
            borderRadius: 8,
            transition: 'height 0.1s ease',
          }}
        />
      </div>
      {isDanger && (
        <span style={{ fontSize: 14, color: '#C04A2B', fontWeight: 800, marginTop: 10 }}>
          HẠ THÂN NHIỆT!
        </span>
      )}
    </div>
  );
};
```

### C. Component Minh Họa Chuẩn (ImageScene.tsx)
Hiển thị tranh vẽ AI với hiệu ứng Ken Burns điện ảnh, nét vẽ rung `hand-drawn-boil`, viền giấy da cổ và hỗ trợ mảng SFX chính xác:

```tsx
// src/components/ImageScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Sequence,
} from 'remotion';
import { HandDrawnFilter } from './ParchmentCanvas';

export interface SfxItem {
  file: string;
  volume?: number;
  delay?: number;
}

interface ImageSceneProps {
  imageIndex: number;
  audioSrc?: string;
  sfxList?: SfxItem[];
  zoomDirection?: 'in' | 'out' | 'pan-left' | 'pan-right';
}

export const ImageScene: React.FC<ImageSceneProps> = ({
  imageIndex,
  audioSrc,
  sfxList = [],
  zoomDirection = 'in',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Stepped frame cho hiệu ứng nét vẽ rung tay stop-motion 10fps
  const steppedFrame = Math.floor(frame / 3) * 3;

  // Hiệu ứng chuyển động máy quay Ken Burns điện ảnh
  let scale = 1.0;
  let translateX = 0;
  let translateY = 0;

  if (zoomDirection === 'in') {
    scale = interpolate(steppedFrame, [0, durationInFrames], [1.0, 1.05], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'out') {
    scale = interpolate(steppedFrame, [0, durationInFrames], [1.05, 1.0], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'pan-left') {
    scale = 1.03;
    translateX = interpolate(steppedFrame, [0, durationInFrames], [12, -12], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'pan-right') {
    scale = 1.03;
    translateX = interpolate(steppedFrame, [0, durationInFrames], [-12, 12], { extrapolateRight: 'clamp' });
  }

  // Chuyển động thở nhẹ tự nhiên của camera
  const cameraShakeX = Math.sin((steppedFrame + imageIndex * 40) / 45) * 1.5;
  const cameraShakeY = Math.cos((steppedFrame + imageIndex * 40) / 50) * 1.2;

  return (
    <AbsoluteFill style={{ backgroundColor: '#F3EDE2', overflow: 'hidden' }}>
      <HandDrawnFilter />

      {/* Ảnh minh họa chính + Ken Burns + Hand-drawn boil */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${translateX + cameraShakeX}px, ${translateY + cameraShakeY}px)`,
          filter: 'url(#hand-drawn-boil)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Img
          src={staticFile(`assets/scenes/${imageIndex}.png`)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Lớp phủ chất liệu giấy da & viền mờ cổ kính */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(circle at center, transparent 65%, rgba(40, 25, 10, 0.28) 100%),
            radial-gradient(rgba(34,34,34,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 24px 24px',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      {/* Viền bản thảo khảo cổ cổ xưa */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          right: 18,
          bottom: 18,
          border: '2px solid rgba(34, 34, 34, 0.2)',
          borderRadius: 8,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 16px rgba(0,0,0,0.1)',
        }}
      />

      {/* Audio Voiceover từng cảnh (nếu có) */}
      {audioSrc && <Audio src={staticFile(audioSrc)} volume={1.0} />}

      {/* Danh sách Foley SFX theo đúng delay timing */}
      {sfxList.map((sfx, idx) => (
        <Sequence key={idx} from={sfx.delay || 0}>
          <Audio src={staticFile(sfx.file)} volume={sfx.volume ?? 0.2} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
```

---

## 3. Lắp Ráp Root.tsx Chuẩn Song Ngữ & Master Continuous Audio

```tsx
// src/Root.tsx
import './index.css';
import React from 'react';
import { Composition, Sequence, Audio, staticFile } from 'remotion';
import { ImageScene } from './components/ImageScene';
import scenesDataVI from '../scenes.json';
import scenesDataEN from '../scenes_en.json';

const zoomDirections: Array<'in' | 'out' | 'pan-left' | 'pan-right'> = [
  'in', 'out', 'pan-left', 'in', 'pan-right', 'out',
];

// Composition Tiếng Anh (Dùng file master voice track liền mạch)
export const TopicLandscapeEN: React.FC = () => {
  return (
    <>
      <Audio src={staticFile('audio/scenes_en/full-scene.mp3')} volume={1.0} />
      {scenesDataEN.scenes.map((scene, idx) => {
        const zoomDir = zoomDirections[idx % zoomDirections.length];
        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
          >
            <ImageScene
              imageIndex={idx}
              sfxList={scene.sfxList || []}
              zoomDirection={zoomDir}
            />
          </Sequence>
        );
      })}
    </>
  );
};

// Composition Tiếng Việt (Dùng audio từng phân cảnh)
export const TopicLandscapeVI: React.FC = () => {
  return (
    <>
      {scenesDataVI.scenes.map((scene, idx) => {
        const zoomDir = zoomDirections[idx % zoomDirections.length];
        return (
          <Sequence
            key={scene.id}
            from={scene.startFrame}
            durationInFrames={scene.durationInFrames}
          >
            <ImageScene
              imageIndex={idx}
              audioSrc={scene.audioSrc}
              sfxList={scene.sfxList || []}
              zoomDirection={zoomDir}
            />
          </Sequence>
        );
      })}
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Composition Tiếng Anh (ID hợp lệ dùng dấu gạch ngang '-') */}
      <Composition
        id="TopicDocumentary-EN"
        component={TopicLandscapeEN}
        durationInFrames={scenesDataEN.totalFrames}
        fps={scenesDataEN.fps}
        width={1920}
        height={1080}
      />

      {/* Composition Tiếng Việt */}
      <Composition
        id="TopicDocumentary-VI"
        component={TopicLandscapeVI}
        durationInFrames={scenesDataVI.totalFrames}
        fps={scenesDataVI.fps}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

