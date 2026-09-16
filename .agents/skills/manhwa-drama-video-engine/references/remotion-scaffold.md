# Remotion Scaffold & Component Architecture (Manhwa Drama Project)

Tài liệu này cung cấp toàn bộ mã nguồn mẫu và kiến trúc component chuẩn của một dự án Remotion độc lập dành riêng cho thể loại **Manhwa Drama Storytelling**.

---

## 📁 1. Cấu Trúc Thư Mục Chuẩn Của Dự Án

```
<project-folder>/ (ví dụ: manhwa-gold-digger-boyfriend/)
├── package.json
├── remotion.config.ts
├── tsconfig.json
├── scenes.json                  # Dữ liệu phân cảnh + timing + voText
├── prompt.json                  # Danh sách prompt Gemini
├── prompts_gemini.md            # Tài liệu prompt dạng Markdown cho người dùng
├── voText_vi.md / voText_en.md  # Kịch bản đọc voiceover
├── metadata.md                  # Tiêu đề, SEO, mô tả YouTube
├── public/
│   ├── assets/
│   │   ├── scenes/              # Chứa ảnh sinh ra: 0.png, 1.png ... N-1.png
│   │   └── avatar_channel.png   # Logo nhận diện kênh (tùy chọn)
│   ├── audio/
│   │   ├── scenes/
│   │   │   └── full-scene.mp3   # File đọc voiceover liền mạch
│   │   └── bgm/
│   │       ├── romantic_piano.mp3
│   │       └── dramatic_tension.mp3
│   └── thumbnail.jpg
└── src/
    ├── index.ts
    ├── index.css
    ├── Root.tsx
    ├── types.ts
    └── components/
        ├── ManhwaScene.tsx      # Component hiển thị ảnh kèm Ken Burns camera & fallback
        ├── SubtitleOverlay.tsx  # Phụ đề to rõ, viền đen dày
        ├── SplitScreenReveal.tsx# Hiệu ứng chia đôi khung hình tương phản
        └── BackgroundMusic.tsx  # Quản lý nhạc nền chuyển mood
```

---

## 📦 2. `package.json` Chuẩn

```json
{
  "name": "manhwa-drama-remotion",
  "version": "1.0.0",
  "description": "Remotion Project for Korean Manhwa Drama Storytelling Video",
  "scripts": {
    "dev": "remotion preview src/index.ts",
    "render": "remotion render src/index.ts Main out/video.mp4 --codec=h264",
    "render-shorts": "remotion render src/index.ts Shorts out/shorts.mp4 --codec=h264",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@remotion/cli": "4.0.515",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "remotion": "4.0.515"
  },
  "devDependencies": {
    "@types/react": "19.2.7",
    "typescript": "^5.4.5"
  }
}
```

---

## 🧩 3. Các Component Cốt Lõi

### `src/components/ManhwaScene.tsx` (Smart Image Fallback + Dynamic Camera)

```tsx
import React from 'react';
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from 'remotion';

interface ManhwaSceneProps {
  sceneIndex: number;
  totalScenes: number;
  imageSrc?: string;
  cameraMotion?: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'dramatic-push';
  mood?: 'romantic' | 'tense' | 'betrayal' | 'neutral';
}

export const ManhwaScene: React.FC<ManhwaSceneProps> = ({
  sceneIndex,
  totalScenes,
  imageSrc,
  cameraMotion = 'zoom-in',
  mood = 'neutral',
}) => {
  const frame = useCurrentFrame();

  // Smart Fallback nếu user chưa tạo đủ ảnh
  const resolvedSrc = imageSrc || staticFile(`assets/scenes/${sceneIndex}.png`);

  // Tính toán chuyển động máy quay
  const scale = cameraMotion === 'zoom-in'
    ? interpolate(frame, [0, 180], [1, 1.07], { extrapolateRight: 'clamp' })
    : cameraMotion === 'zoom-out'
    ? interpolate(frame, [0, 180], [1.07, 1], { extrapolateRight: 'clamp' })
    : cameraMotion === 'dramatic-push'
    ? interpolate(frame, [0, 90], [1, 1.14], { extrapolateRight: 'clamp' })
    : 1.04;

  const panX = cameraMotion === 'pan-left'
    ? interpolate(frame, [0, 180], [0, -25], { extrapolateRight: 'clamp' })
    : cameraMotion === 'pan-right'
    ? interpolate(frame, [0, 180], [0, 25], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A', overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${panX}px)`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src={resolvedSrc}
          alt={`Scene ${sceneIndex}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            // Fallback an toàn về ảnh 0 nếu ảnh scene chưa tồn tại
            (e.target as HTMLImageElement).src = staticFile('assets/scenes/0.png');
          }}
        />
      </AbsoluteFill>

      {/* Mood Overlay */}
      {mood === 'betrayal' && (
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(14, 102, 85, 0.2) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
```

---

### `src/components/SubtitleOverlay.tsx` (Phụ Đề Manhwa Chuẩn Mực)

```tsx
import React from 'react';

interface SubtitleOverlayProps {
  text: string;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({ text }) => {
  if (!text) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 54,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 48px',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <p
        style={{
          fontFamily: '"Be Vietnam Pro", "Montserrat", "Segoe UI", sans-serif',
          fontWeight: 800,
          fontSize: 38,
          color: '#FFFFFF',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.35,
          letterSpacing: 0.5,
          textShadow: `
            -2.5px -2.5px 0 #000,
             2.5px -2.5px 0 #000,
            -2.5px  2.5px 0 #000,
             2.5px  2.5px 0 #000,
             0px 4px 12px rgba(0, 0, 0, 0.9)
          `,
        }}
      >
        {text}
      </p>
    </div>
  );
};
```

---

### `src/Root.tsx`

```tsx
import React from 'react';
import { Composition, Sequence, Audio, staticFile } from 'remotion';
import scenesData from '../scenes.json';
import { ManhwaScene } from './components/ManhwaScene';
import { SubtitleOverlay } from './components/SubtitleOverlay';
import './index.css';

interface SceneItem {
  startFrame: number;
  durationInFrames: number;
  voText: string;
  imageSrc?: string;
  cameraMotion?: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'dramatic-push';
  mood?: 'romantic' | 'tense' | 'betrayal' | 'neutral';
}

const MainComposition: React.FC = () => {
  const scenes: SceneItem[] = scenesData;

  return (
    <>
      {/* File Audio Voiceover toàn bộ video */}
      <Audio src={staticFile('audio/scenes/full-scene.mp3')} />

      {/* Render từng Scene nối tiếp nhau */}
      {scenes.map((scene, index) => (
        <Sequence
          key={index}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
        >
          <ManhwaScene
            sceneIndex={index}
            totalScenes={scenes.length}
            imageSrc={scene.imageSrc}
            cameraMotion={scene.cameraMotion}
            mood={scene.mood}
          />
          <SubtitleOverlay text={scene.voText} />
        </Sequence>
      ))}
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  const totalFrames = scenesData.reduce(
    (acc, cur) => Math.max(acc, cur.startFrame + cur.durationInFrames),
    0
  ) || 300;

  return (
    <>
      <Composition
        id="Main"
        component={MainComposition}
        durationInFrames={totalFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Shorts"
        component={MainComposition}
        durationInFrames={Math.min(totalFrames, 1800)}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
```
