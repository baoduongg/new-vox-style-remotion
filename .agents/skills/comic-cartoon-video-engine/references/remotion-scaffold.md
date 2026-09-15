# Remotion Project Scaffold (Western 2D Comic Engine)

Tài liệu hướng dẫn cấu trúc dự án Remotion độc lập (Standalone Project) cho thể loại **Western 2D Comic Cartoon Animation**.

---

## 📁 1. Cấu Trúc Thư Mục Dự Án Độc Lập

```
<project-folder>/ (ví dụ: shorts-ancient-weaponry-clash/)
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── scenes.json
├── prompt.json
├── prompts_gemini.md
├── voText_en.md
├── metadata.md
├── public/
│   ├── assets/
│   │   └── scenes/       # 0.png, 1.png, 2.png ... N-1.png
│   ├── audio/
│   │   ├── voiceover.mp3 # Master voiceover track
│   │   ├── bgm.mp3       # Background music
│   │   └── sfx/          # sfx_clang.mp3, sfx_whip.mp3 ...
│   ├── avatar_comic_channel.png
│   └── thumbnail.jpg
└── src/
    ├── index.ts
    ├── Root.tsx
    ├── Composition.tsx
    └── components/
        ├── ComicScene.tsx
        ├── ComicBurstOverlay.tsx
        ├── ChannelWatermark.tsx
        └── ComicSubtitles.tsx
```

---

## ⚙️ 2. File Cấu Hình Dự Án

### `package.json`
```json
{
  "name": "comic-cartoon-video",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "remotion preview src/index.ts",
    "build": "remotion render src/index.ts ComicShort out/video.mp4",
    "render": "remotion render src/index.ts ComicShort out/video.mp4 --props=scenes.json"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.218",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "remotion": "^4.0.218"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "typescript": "^5.6.3"
  }
}
```

### `src/Root.tsx`
```tsx
import React from 'react';
import { Composition, staticFile } from 'remotion';
import { ComicComposition } from './Composition';
import scenesData from '../scenes.json';

export const RemotionRoot: React.FC = () => {
  // Tính tổng thời lượng từ scenesData
  const totalFrames = scenesData.scenes.reduce(
    (acc, scene) => acc + scene.durationInFrames,
    0
  );

  return (
    <>
      {/* Composition Dọc 9:16 cho Shorts / TikTok / Reels */}
      <Composition
        id="ComicShort"
        component={ComicComposition}
        durationInFrames={totalFrames || 1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: scenesData.scenes,
          audioSrc: staticFile('audio/voiceover.mp3'),
          bgmSrc: staticFile('audio/bgm.mp3'),
        }}
      />

      {/* Composition Ngang 16:9 nếu làm video dài */}
      <Composition
        id="ComicWidescreen"
        component={ComicComposition}
        durationInFrames={totalFrames || 1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: scenesData.scenes,
          audioSrc: staticFile('audio/voiceover.mp3'),
          bgmSrc: staticFile('audio/bgm.mp3'),
        }}
      />
    </>
  );
};
```

---

## 🎬 3. Component Hiển Thị Cảnh Comic (`ComicScene.tsx`)

```tsx
import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from 'remotion';

interface ComicSceneProps {
  imageFile: string;
  durationInFrames: number;
  zoomDirection?: 'in' | 'out' | 'pan-left' | 'pan-right' | 'impact-pop';
}

export const ComicScene: React.FC<ComicSceneProps> = ({
  imageFile,
  durationInFrames,
  zoomDirection = 'impact-pop',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hiệu ứng Pop-In nảy nhẹ kiểu truyện tranh ở 5 frames đầu
  const popProgress = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 180,
      mass: 0.6,
    },
  });

  // Hiệu ứng Zoom & Pan động nhẹ nhàng
  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  if (zoomDirection === 'impact-pop') {
    scale = interpolate(popProgress, [0, 1], [0.96, 1.0]) *
      interpolate(frame, [0, durationInFrames], [1, 1.04]);
  } else if (zoomDirection === 'in') {
    scale = interpolate(frame, [0, durationInFrames], [1.0, 1.06]);
  } else if (zoomDirection === 'out') {
    scale = interpolate(frame, [0, durationInFrames], [1.06, 1.0]);
  } else if (zoomDirection === 'pan-left') {
    translateX = interpolate(frame, [0, durationInFrames], [20, -20]);
    scale = 1.04;
  } else if (zoomDirection === 'pan-right') {
    translateX = interpolate(frame, [0, durationInFrames], [-20, 20]);
    scale = 1.04;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#0F172A',
      }}
    >
      <Img
        src={staticFile(`assets/scenes/${imageFile}`)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        }}
      />
    </div>
  );
};
```

---

## 🏷️ 4. Component Watermark Mascot Kênh (`ChannelWatermark.tsx`)

```tsx
import React from 'react';
import { Img, staticFile } from 'remotion';

export const ChannelWatermark: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '60px',
        right: '40px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        border: '4px solid #FACC15',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
        zIndex: 999,
      }}
    >
      <Img
        src={staticFile('avatar_comic_channel.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};
```
