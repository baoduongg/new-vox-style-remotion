# Remotion Scaffold & Component Architecture (Horror Storytelling Project)

Tài liệu này cung cấp toàn bộ mã nguồn mẫu và kiến trúc component chuẩn của một dự án Remotion độc lập dành riêng cho thể loại **Kể Chuyện Audio Kinh Dị (Horror Storytelling)**.

---

## 📁 1. CẤU TRÚC THƯ MỤC CHUẨN CỦA DỰ ÁN

```
<project-folder>/ (ví dụ: horror-elevator-basement-b3/)
├── package.json
├── remotion.config.ts
├── tsconfig.json
├── scenes.json                  # Dữ liệu phân cảnh + timing + voText + cameraMotion + mood
├── prompt.json                  # Danh sách prompt Gemini dạng JSON (Scenes + Thumbnail + Shorts Cover)
├── prompts_gemini.md            # Tài liệu prompt dạng Markdown cho người dùng
├── voText_vi.md / voText_en.md  # Kịch bản sản xuất đầy đủ
├── voText_vi.txt / voText_en.txt# Text voiceover sạch cho TTS
├── metadata.md                  # Tiêu đề, SEO, mô tả YouTube dài & Shorts
├── metadata_shorts.md           # Metadata độc lập cho YouTube Shorts / TikTok / Reels
├── public/
│   ├── avatar_horror_channel.png # Mascot Logo nhận diện kênh (BẮT BUỘC)
│   ├── assets/
│   │   ├── scenes/              # Chứa ảnh sinh ra: 0.png, 1.png ... N-1.png
│   │   ├── avatar_horror_channel.png
│   │   ├── thumb_card.jpg       # Ảnh vòm chân dung nhân vật cho Thumbnail Studio
│   │   └── thumb_bg.jpg         # Ảnh nền u ám cho Thumbnail Studio
│   └── audio/
│       ├── scenes/
│       │   └── full-scene.mp3   # File đọc voiceover liền mạch
│       └── bgm/
│           ├── dark_ambient_drone.mp3
│           └── tense_heartbeat.mp3
├── out/
│   ├── video.mp4                # Video 16:9 hoàn chỉnh
│   ├── shorts.mp4               # Video dọc 9:16
│   └── thumbnail.jpg            # Ảnh thumbnail 1920x1080 xuất từ Remotion
└── src/
    ├── index.ts
    ├── index.css
    ├── Root.tsx
    ├── types.ts
    └── components/
        ├── HorrorScene.tsx      # Component hiển thị ảnh kèm Slow Creeping Camera & Fallback
        ├── SubtitleOverlay.tsx  # Phụ đề to rõ, viền đen sắc sảo, padding an toàn 190px
        ├── DarkAtmosphere.tsx   # Hiệu ứng Vignette tối góc, sương mù & đèn chập chờn
        ├── JumpscareFlash.tsx   # Hiệu ứng chớp giật kịch tính tại cao trào
        ├── ChannelWatermark.tsx # Avatar kênh tròn ở góc dưới bên phải (avatar_horror_channel.png)
        └── Thumbnail.tsx        # Component render Thumbnail High-CTR tự động
```

---

## 📦 2. `package.json` Chuẩn

```json
{
  "name": "horror-storytelling-remotion",
  "version": "1.0.0",
  "description": "Remotion Project for Horror Audio Storytelling Video",
  "scripts": {
    "dev": "remotion preview src/index.ts",
    "render": "remotion render src/index.ts Main out/video.mp4 --codec=h264",
    "render-shorts": "remotion render src/index.ts Shorts out/shorts.mp4 --codec=h264",
    "thumbnail": "remotion still src/index.ts Thumbnail out/thumbnail.jpg --overwrite",
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

## 🛠️ 3. `remotion.config.ts` & `tsconfig.json`

### `remotion.config.ts`:
```ts
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');
```

### `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## 🧩 4. CÁC COMPONENT CỐT LÕI

### `src/types.ts`
```ts
export type CameraMotion =
  | 'slow-zoom-in'
  | 'slow-zoom-out'
  | 'creep-pan-left'
  | 'creep-pan-right'
  | 'jolt-push'
  | 'static-dread';

export type HorrorMood = 'eerie' | 'tension' | 'terror' | 'aftermath' | 'neutral';

export interface SceneItem {
  startFrame: number;
  durationInFrames: number;
  title?: string;
  voText: string;
  imageSrc?: string;
  cameraMotion?: CameraMotion;
  mood?: HorrorMood;
  isJumpscare?: boolean;
}
```

---

### `src/components/HorrorScene.tsx`
```tsx
import React from 'react';
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { CameraMotion, HorrorMood } from '../types';
import { DarkAtmosphere } from './DarkAtmosphere';

interface HorrorSceneProps {
  sceneIndex: number;
  totalScenes: number;
  imageSrc?: string;
  cameraMotion?: CameraMotion;
  mood?: HorrorMood;
  durationInFrames: number;
}

export const HorrorScene: React.FC<HorrorSceneProps> = ({
  sceneIndex,
  imageSrc,
  cameraMotion = 'slow-zoom-in',
  mood = 'eerie',
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  // Smart Fallback tự động về 0.png nếu chưa có ảnh scene hiện tại
  const resolvedSrc = imageSrc || staticFile(`assets/scenes/${sceneIndex}.png`);

  // Tính toán chuyển động máy quay tạo cảm giác bò chậm rùng rợn (Slow Creeping Motion)
  const scale =
    cameraMotion === 'slow-zoom-in'
      ? interpolate(frame, [0, durationInFrames], [1, 1.08], { extrapolateRight: 'clamp' })
      : cameraMotion === 'slow-zoom-out'
      ? interpolate(frame, [0, durationInFrames], [1.08, 1], { extrapolateRight: 'clamp' })
      : cameraMotion === 'jolt-push'
      ? interpolate(frame, [0, 15, durationInFrames], [1, 1.15, 1.18], { extrapolateRight: 'clamp' })
      : 1.03;

  const panX =
    cameraMotion === 'creep-pan-left'
      ? interpolate(frame, [0, durationInFrames], [0, -30], { extrapolateRight: 'clamp' })
      : cameraMotion === 'creep-pan-right'
      ? interpolate(frame, [0, durationInFrames], [0, 30], { extrapolateRight: 'clamp' })
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050508', overflow: 'hidden' }}>
      {/* Container Chuyển Động Ảnh */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${panX}px)`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src={resolvedSrc}
          alt={`Horror Scene ${sceneIndex}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = staticFile('assets/scenes/0.png');
          }}
        />
      </AbsoluteFill>

      {/* Lớp Phủ Khí Quyển Ma Mị (Dark Atmosphere & Vignette) */}
      <DarkAtmosphere mood={mood} frame={frame} />
    </AbsoluteFill>
  );
};
```

---

### `src/components/DarkAtmosphere.tsx`
```tsx
import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { HorrorMood } from '../types';

interface DarkAtmosphereProps {
  mood: HorrorMood;
  frame: number;
}

export const DarkAtmosphere: React.FC<DarkAtmosphereProps> = ({ mood, frame }) => {
  // Hiệu ứng đèn chập chờn nhẹ (flicker) cho các cảnh tension / terror
  const flicker =
    mood === 'terror'
      ? interpolate(Math.sin(frame * 0.45), [-1, 1], [0.85, 1])
      : 1;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity: flicker }}>
      {/* Heavy Corner Vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(5, 5, 8, 0.75) 85%, #050508 100%)',
        }}
      />

      {/* Mood Color Wash */}
      {mood === 'terror' && (
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to top, rgba(74, 14, 23, 0.35) 0%, transparent 60%)',
          }}
        />
      )}

      {mood === 'eerie' && (
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(to top, rgba(13, 38, 38, 0.3) 0%, transparent 50%)',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
```

---

### `src/components/SubtitleOverlay.tsx`
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
        bottom: 56,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 190px', // Khoảng cách an toàn 190px chống đè lên watermark
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      <p
        style={{
          fontFamily: '"Be Vietnam Pro", "Montserrat", "Segoe UI", sans-serif',
          fontWeight: 800,
          fontSize: 38,
          color: '#F0EFEA',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.4,
          letterSpacing: 0.6,
          textShadow: `
            -2.5px -2.5px 0 #050508,
             2.5px -2.5px 0 #050508,
            -2.5px  2.5px 0 #050508,
             2.5px  2.5px 0 #050508,
             0px 4px 16px rgba(0, 0, 0, 0.95),
             0px 0px 20px rgba(0, 0, 0, 0.8)
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

### `src/components/JumpscareFlash.tsx`
```tsx
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface JumpscareFlashProps {
  active: boolean;
}

export const JumpscareFlash: React.FC<JumpscareFlashProps> = ({ active }) => {
  const frame = useCurrentFrame();
  if (!active) return null;

  // Chớp trắng giật trong 4 frames đầu của scene
  const opacity = interpolate(frame, [0, 2, 4], [0.9, 0.4, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        opacity,
        pointerEvents: 'none',
        zIndex: 300,
      }}
    />
  );
};
```

---

### `src/components/ChannelWatermark.tsx` (Watermark Avatar Kênh Góc Phải Dưới)
```tsx
import React from 'react';
import { staticFile } from 'remotion';

export const ChannelWatermark: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        right: 40,
        width: 125,
        height: 125,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2.5px solid rgba(255, 255, 255, 0.75)',
        boxShadow:
          '0 8px 30px rgba(0, 0, 0, 0.95), 0 0 20px rgba(220, 20, 20, 0.55), inset 0 0 10px rgba(0,0,0,0.8)',
        zIndex: 999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050508',
      }}
    >
      <img
        src={staticFile('avatar_horror_channel.png')}
        alt="Channel Avatar Watermark"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = staticFile('assets/avatar_horror_channel.png');
        }}
      />
    </div>
  );
};
```

---

### `src/components/Thumbnail.tsx` (Component Tạo Thumbnail Siêu Hút Click)
```tsx
import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';

interface ThumbnailProps {
  titleLine1?: string;
  titleLine2?: string;
  tagText?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  titleLine1 = 'Thang Máy',
  titleLine2 = 'Tầng Âm B3',
  tagText = 'TRUYỆN KINH DỊ',
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#040406',
        fontFamily: '"Playfair Display", "Lora", serif',
        overflow: 'hidden',
      }}
    >
      {/* 1. Nền Bối Cảnh U Ám (thumb_bg.jpg) */}
      <AbsoluteFill>
        <img
          src={staticFile('assets/thumb_bg.jpg')}
          alt="Eerie Hallway Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '55% center',
            transform: 'scaleX(-1)',
            filter: 'brightness(0.85) contrast(1.2) saturate(1.15)',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = staticFile('assets/scenes/0.png');
          }}
        />
      </AbsoluteFill>

      {/* Dark Vignette Overlay */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(2, 2, 4, 0.6) 80%, #020204 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric Blood-Red Ambient Glow */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 68% 45%, rgba(180, 20, 20, 0.22) 0%, rgba(220, 100, 20, 0.08) 35%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Smooth Dark Gradient bên phải giúp tôn chữ */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(to right, rgba(2, 2, 5, 0.05) 0%, rgba(2, 2, 5, 0.25) 35%, rgba(2, 2, 5, 0.6) 60%, rgba(3, 3, 6, 0.88) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hào quang đỏ sau khung thẻ vòm */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 26% 50%, rgba(220, 20, 20, 0.4) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 2. Main Content Layout (Flex Row) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 80px',
          gap: '70px',
          zIndex: 10,
        }}
      >
        {/* LEFT PORTAL CARD (Thẻ Vòm Nghệ Thuật) */}
        <div
          style={{
            position: 'relative',
            width: '560px',
            height: '860px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Viền vòm sáng kèm đinh kim cương */}
          <div
            style={{
              position: 'absolute',
              inset: -12,
              border: '2px solid rgba(255, 255, 255, 0.85)',
              borderRadius: '24px',
              borderTopLeftRadius: '200px',
              borderTopRightRadius: '200px',
              boxShadow:
                '0 0 35px rgba(220, 20, 20, 0.6), inset 0 0 15px rgba(220, 20, 20, 0.35)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          >
            {/* Đinh kim cương trái */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: -11,
                transform: 'translateY(-50%) rotate(45deg)',
                width: 20,
                height: 20,
                backgroundColor: '#E50914',
                border: '2px solid #FFFFFF',
                boxShadow: '0 0 14px #E50914, 0 0 6px #FFFFFF',
              }}
            />
            {/* Đinh kim cương phải */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: -11,
                transform: 'translateY(-50%) rotate(45deg)',
                width: 20,
                height: 20,
                backgroundColor: '#FFFFFF',
                border: '2px solid #E50914',
                boxShadow: '0 0 14px #FFFFFF, 0 0 8px #E50914',
              }}
            />
          </div>

          {/* Khung chứa ảnh nhân vật (thumb_card.jpg) */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              borderTopLeftRadius: '190px',
              borderTopRightRadius: '190px',
              overflow: 'hidden',
              boxShadow:
                '0 30px 80px rgba(0, 0, 0, 0.98), 0 0 40px rgba(0, 0, 0, 0.9)',
              border: '2.5px solid rgba(255, 255, 255, 0.25)',
              position: 'relative',
            }}
          >
            <img
              src={staticFile('assets/thumb_card.jpg')}
              alt="Character Portal Art"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = staticFile('assets/scenes/0.png');
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 25%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE (Typography & Badges) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex: 1,
            gap: '26px',
          }}
        >
          {/* Tag Pill: TRUYỆN KINH DỊ */}
          <div
            style={{
              backgroundColor: '#E50914',
              padding: '10px 32px',
              borderRadius: '8px',
              boxShadow:
                '0 6px 25px rgba(229, 9, 20, 0.75), 0 2px 10px rgba(0,0,0,0.9)',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: '"Montserrat", "Be Vietnam Pro", sans-serif',
                fontWeight: 900,
                fontSize: 34,
                color: '#FFFFFF',
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              {tagText}
            </span>
          </div>

          {/* Main Title Typography */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <h1
              style={{
                fontFamily: '"Playfair Display", "Lora", serif',
                fontWeight: 900,
                fontSize: 112,
                lineHeight: 1.08,
                color: '#FFFFFF',
                margin: 0,
                padding: 0,
                letterSpacing: 1.5,
                textShadow: `
                  -3px -3px 0 rgba(0,0,0,0.98),
                   3px -3px 0 rgba(0,0,0,0.98),
                  -3px  3px 0 rgba(0,0,0,0.98),
                   3px  3px 0 rgba(0,0,0,0.98),
                   0px 12px 35px rgba(0, 0, 0, 0.98),
                   0px 0px 50px rgba(0, 0, 0, 0.95)
                `,
              }}
            >
              {titleLine1}
            </h1>
            {titleLine2 && (
              <h1
                style={{
                  fontFamily: '"Playfair Display", "Lora", serif',
                  fontWeight: 900,
                  fontSize: 112,
                  lineHeight: 1.08,
                  color: '#FFFFFF',
                  margin: 0,
                  padding: 0,
                  letterSpacing: 1.5,
                  textShadow: `
                    -3px -3px 0 rgba(0,0,0,0.98),
                     3px -3px 0 rgba(0,0,0,0.98),
                    -3px  3px 0 rgba(0,0,0,0.98),
                     3px  3px 0 rgba(0,0,0,0.98),
                     0px 12px 35px rgba(0, 0, 0, 0.98),
                     0px 0px 50px rgba(0, 0, 0, 0.95)
                  `,
                }}
              >
                {titleLine2}
              </h1>
            )}
          </div>

          {/* Sub-tag (FULL) */}
          <div
            style={{
              fontFamily: '"Montserrat", "Be Vietnam Pro", sans-serif',
              fontWeight: 900,
              fontSize: 52,
              color: '#FFFFFF',
              letterSpacing: 4.5,
              textTransform: 'uppercase',
              textShadow:
                '-2px -2px 0 rgba(0,0,0,0.95), 2px -2px 0 rgba(0,0,0,0.95), -2px 2px 0 rgba(0,0,0,0.95), 2px 2px 0 rgba(0,0,0,0.95), 0 6px 25px rgba(0,0,0,0.98)',
              marginTop: '-4px',
            }}
          >
            (FULL)
          </div>

          {/* Channel Watermark Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginTop: '8px',
              backgroundColor: 'rgba(5, 5, 10, 0.82)',
              border: '1.5px solid rgba(255, 255, 255, 0.22)',
              padding: '10px 24px',
              borderRadius: '30px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 6px 25px rgba(0,0,0,0.9)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#E50914',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(229, 9, 20, 0.95)',
              }}
            >
              <span style={{ fontSize: 16, color: '#FFFFFF', marginLeft: '2px' }}>
                ▶
              </span>
            </div>
            <span
              style={{
                fontFamily: '"Montserrat", "Be Vietnam Pro", sans-serif',
                fontWeight: 800,
                fontSize: 24,
                color: '#F0EFEA',
                letterSpacing: 2.2,
                textTransform: 'uppercase',
              }}
            >
              CHUYỆN MA AUDIO
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

---

### `src/Root.tsx`
```tsx
import React from 'react';
import { Composition, Sequence, Audio, staticFile } from 'remotion';
import scenesData from '../scenes.json';
import { SceneItem } from './types';
import { HorrorScene } from './components/HorrorScene';
import { SubtitleOverlay } from './components/SubtitleOverlay';
import { JumpscareFlash } from './components/JumpscareFlash';
import { ChannelWatermark } from './components/ChannelWatermark';
import { Thumbnail } from './components/Thumbnail';
import './index.css';

interface CompositionProps {
  showSubtitles?: boolean;
  isShorts?: boolean;
}

const MainComposition: React.FC<CompositionProps> = ({
  showSubtitles = true,
  isShorts = false,
}) => {
  const scenes: SceneItem[] = scenesData as SceneItem[];

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
          <HorrorScene
            sceneIndex={index}
            totalScenes={scenes.length}
            imageSrc={scene.imageSrc}
            cameraMotion={scene.cameraMotion}
            mood={scene.mood}
            durationInFrames={scene.durationInFrames}
          />
          {scene.isJumpscare && <JumpscareFlash active={true} />}
          {showSubtitles && <SubtitleOverlay text={scene.voText} />}
        </Sequence>
      ))}

      {/* Watermark Avatar Kênh ở góc dưới bên phải */}
      <ChannelWatermark />
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  const totalFrames =
    (scenesData as SceneItem[]).reduce(
      (acc, cur) => Math.max(acc, cur.startFrame + cur.durationInFrames),
      0
    ) || 300;

  return (
    <>
      <Composition
        id="Main"
        component={MainComposition}
        defaultProps={{
          showSubtitles: true,
          isShorts: false,
        }}
        durationInFrames={totalFrames}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Shorts"
        component={MainComposition}
        defaultProps={{
          showSubtitles: false,
          isShorts: true,
        }}
        durationInFrames={Math.min(totalFrames, 1800)}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Thumbnail"
        component={Thumbnail}
        durationInFrames={30}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

---

### `src/index.ts` & `src/index.css`

#### `src/index.ts`:
```ts
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

#### `src/index.css`:
```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #050508;
  font-family: 'Be Vietnam Pro', 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

---

## 🚀 5. QUY TẮC SAO CHÉP ASSET CỐT LÕI (MASCOT & WATERMARK)
Khi khởi tạo thư mục dự án mới, lệnh sau **BẮT BUỘC ĐƯỢC CHẠY TỰ ĐỘNG** để sao chép logo kênh:
```bash
cp .agents/skills/horror-storytelling-video-engine/resources/avatar_horror_channel.png <project-folder>/public/
cp .agents/skills/horror-storytelling-video-engine/resources/avatar_horror_channel.png <project-folder>/public/assets/
```
