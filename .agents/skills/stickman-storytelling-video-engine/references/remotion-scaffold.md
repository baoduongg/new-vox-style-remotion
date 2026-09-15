# Hướng Dẫn Scaffold & Ráp Remotion (Storytelling Remotion Guide)

Tài liệu này cung cấp bộ khung mẫu dự án và các component React chuyên dụng để lắp ráp video phong cách **Stickman Storytelling & Dramatic Narrative** trong Remotion.

---

## 1. Cấu Trúc Dự Án Remotion Độc Lập Chuẩn (Standalone Story Project)

Mỗi video câu chuyện mới **BẮT BUỘC** được tạo trong một thư mục riêng biệt đặt tên theo câu chuyện (kebab-case bắt đầu bằng `story-`, ví dụ: `story-eiffel-tower-con/` hoặc `story-andes-survival/`):

```
story-eiffel-tower-con/
├── package.json                     # Dependencies & scripts độc lập
├── remotion.config.ts               # Cấu hình Rspack & format
├── tsconfig.json                    # Cấu hình TypeScript
├── scenes.json                      # Dữ liệu kịch bản & timing từng frame (EN/VI)
├── prompt.json                      # Bộ prompt sinh visual cho từng scene
├── prompts_gemini.md                # Danh sách prompt Gemini chi tiết
├── voText_en.md / voText_en.txt     # Kịch bản lồng tiếng hoàn chỉnh
├── metadata.md                      # SEO Title, Description, Thumbnail prompt
├── src/
│   ├── index.ts                     # registerRoot(RemotionRoot)
│   ├── index.css                    # Google Fonts & background styling
│   ├── Root.tsx                     # Composition chính
│   └── components/
│       ├── StoryCanvas.tsx          # Khung nền kể chuyện + Vignette điện ảnh
│       ├── ImageScene.tsx           # Hiển thị ảnh AI + Ken Burns + Smart Fallback
│       ├── SpeechBubble.tsx         # Bong bóng thoại & suy nghĩ hoạt hình
│       ├── DramaticTimeline.tsx     # Dòng thời gian mốc sự kiện kịch tính
│       ├── StickmanActorSVG.tsx     # Nhân vật người que diễn xuất đa tư thế
│       ├── Subtitle.tsx             # Phụ đề burned-in đồng bộ voText (bold outline caption)
│       └── ChannelWatermark.tsx     # Watermark Avatar tròn Mascot góc dưới phải
└── public/
    ├── avatar_stickman_channel.jpg  # Mascot kênh
    ├── assets/scenes/               # Ảnh phân cảnh — TÊN FILE PHẢI CHÍNH XÁC 0.png, 1.png, ..., N-1.png
    │                                 # (không tiền tố "Scene ", không khoảng trắng — xem Mục 5)
    └── audio/
        └── scenes/                  # full-scene.mp3 HOẶC full-scene.wav (tuỳ TTS tool) — track duy nhất, KHÔNG có SFX rời rạc (xem Mục 3.A / Rule 5 SKILL.md)
```

> ⚠️ **Đuôi file audio và tên file ảnh là 2 nguồn lỗi câm-lặng phổ biến nhất** (không crash, không log lỗi, chỉ đơn giản là ảnh/voice không hiển thị/phát). Xem quy tắc bắt buộc kiểm tra tại **Mục 5** trước khi coi bước Scaffold là hoàn tất.

---

## 2. File Mẫu Cấu Hình Cho Project Mới

### **`package.json`**:
```json
{
  "name": "story-eiffel-tower-con",
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
    "render": "remotion render Story-EN out/video.mp4"
  }
}
```

### **`remotion.config.ts`**:
```typescript
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

### **`tsconfig.json`**:
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

### **`src/index.ts`**:
```typescript
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

### **`src/index.css`**:
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Bangers&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #111827;
  font-family: 'Montserrat', sans-serif;
}
```

---

## 3. Các Component Chuyên Dụng Sẵn Dùng

### A. Component Minh Họa Kể Chuyện & Smart Fallback (ImageScene.tsx)

```tsx
// src/components/ImageScene.tsx
import React, { useState } from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Audio,
} from 'remotion';
import { Subtitle } from './Subtitle';

interface ImageSceneProps {
  imageIndex: number;
  totalBaseImages?: number;
  totalShots?: number;
  audioSrc?: string;
  zoomDirection?: 'in' | 'out' | 'pan-left' | 'pan-right' | 'zoom-in-tilt';
  subtitleText?: string;
}

export const ImageScene: React.FC<ImageSceneProps> = ({
  imageIndex,
  totalBaseImages = 15,
  totalShots = 45,
  audioSrc,
  zoomDirection = 'in',
  subtitleText,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smart Fallback index nếu chưa tạo đủ ảnh
  const fallbackIndex = Math.floor((imageIndex * totalBaseImages) / totalShots);
  const [imgError, setImgError] = useState(false);

  // Stepped frame cho hiệu ứng animation 10fps mượt mà
  const steppedFrame = Math.floor(frame / 3) * 3;

  // Hiệu ứng chuyển động Ken Burns
  let scale = 1.0;
  let translateX = 0;
  let translateY = 0;
  let rotate = 0;

  if (zoomDirection === 'in') {
    scale = interpolate(steppedFrame, [0, durationInFrames], [1.0, 1.06], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'out') {
    scale = interpolate(steppedFrame, [0, durationInFrames], [1.06, 1.0], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'pan-left') {
    scale = 1.04;
    translateX = interpolate(steppedFrame, [0, durationInFrames], [20, -20], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'pan-right') {
    scale = 1.04;
    translateX = interpolate(steppedFrame, [0, durationInFrames], [-20, 20], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'zoom-in-tilt') {
    scale = interpolate(steppedFrame, [0, durationInFrames], [1.0, 1.08], { extrapolateRight: 'clamp' });
    rotate = interpolate(steppedFrame, [0, durationInFrames], [-0.5, 0.5], { extrapolateRight: 'clamp' });
  }

  // Chuyển động thở nhẹ của camera
  const cameraShakeX = Math.sin((steppedFrame + imageIndex * 35) / 40) * 1.5;
  const cameraShakeY = Math.cos((steppedFrame + imageIndex * 35) / 45) * 1.2;

  // Hiệu ứng mờ chuyển cảnh nhẹ nhàng 4 frames đầu
  const fadeInOpacity = interpolate(frame, [0, 4], [0.85, 1.0], { extrapolateRight: 'clamp' });

  const currentImageSrc = imgError
    ? staticFile(`assets/scenes/${fallbackIndex}.png`)
    : staticFile(`assets/scenes/${imageIndex}.png`);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0F17', overflow: 'hidden' }}>
      {/* Ảnh minh họa chính */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${translateX + cameraShakeX}px, ${translateY + cameraShakeY}px) rotate(${rotate}deg)`,
          opacity: fadeInOpacity,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Img
          src={currentImageSrc}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* Lớp phủ Cinematic Vignette */}
      <AbsoluteFill
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.35)',
          pointerEvents: 'none',
        }}
      />

      {/* Phụ Đề Tuỳ Chọn */}
      {subtitleText && <Subtitle text={subtitleText} />}

      {/* Audio Voiceover tuỳ chọn */}
      {audioSrc && <Audio src={staticFile(audioSrc)} volume={1.0} onError={() => {}} />}
    </AbsoluteFill>
  );
};
```

---

### B. Bong Bóng Thoại & Suy Nghĩ Hoạt Hình (SpeechBubble.tsx)

```tsx
// src/components/SpeechBubble.tsx
import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SpeechBubbleProps {
  text: string;
  x: number;
  y: number;
  type?: 'speech' | 'thought' | 'shout';
  delayFrames?: number;
  pointerDirection?: 'bottom-left' | 'bottom-right' | 'top-left';
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  x,
  y,
  type = 'speech',
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 12, mass: 0.4 },
  });

  if (frame < delayFrames) return null;

  const isShout = type === 'shout';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: isShout ? '4px solid #D32F2F' : '3.5px solid #1A1A1A',
          borderRadius: isShout ? '8px' : '20px',
          padding: '12px 20px',
          boxShadow: '4px 6px 0px rgba(0,0,0,0.2)',
          maxWidth: 320,
        }}
      >
        <span
          style={{
            fontSize: isShout ? 22 : 18,
            fontWeight: 800,
            color: isShout ? '#D32F2F' : '#1A1A1A',
            fontFamily: '"Montserrat", "Arial Black", sans-serif',
            display: 'block',
            textAlign: 'center',
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
```

---

### C. Dòng Thời Gian Kịch Tính (DramaticTimeline.tsx)

```tsx
// src/components/DramaticTimeline.tsx
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface TimelineProps {
  dateText: string;
  locationText?: string;
  chapterText?: string;
}

export const DramaticTimeline: React.FC<TimelineProps> = ({
  dateText,
  locationText,
  chapterText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.6 },
  });

  const translateY = interpolate(slideIn, [0, 1], [-40, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 36,
        left: 40,
        zIndex: 80,
        transform: `translateY(${translateY}px)`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {chapterText && (
        <span
          style={{
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#FFD23F',
            backgroundColor: '#111827',
            padding: '3px 10px',
            borderRadius: 4,
            alignSelf: 'flex-start',
          }}
        >
          {chapterText}
        </span>
      )}
      <div
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', display: 'block' }}>
          📍 {dateText}
        </span>
        {locationText && (
          <span style={{ fontSize: 16, fontWeight: 600, color: '#9CA3AF', display: 'block' }}>
            {locationText}
          </span>
        )}
      </div>
    </div>
  );
};
```

---

### D. Channel Mascot Watermark Tối Giản (ChannelWatermark.tsx)

```tsx
// src/components/ChannelWatermark.tsx
import React from 'react';
import { Img, staticFile } from 'remotion';

export const ChannelWatermark: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        right: 40,
        zIndex: 999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2.5px solid rgba(255, 215, 0, 0.85)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
          backgroundColor: '#111827',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Img
          src={staticFile('avatar_stickman_channel.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <span style={{ position: 'absolute', fontSize: 24, pointerEvents: 'none' }}>🎭</span>
      </div>
    </div>
  );
};
```

---

### E. Phụ Đề Burned-in Đồng Bộ Giọng Đọc (Subtitle.tsx)

Caption bold-outline trắng viền đen (phong cách OverSimplified/kể chuyện) hiển thị `voText` của scene, tự tách câu dài thành cụm ngắn dễ đọc và chia đều theo `durationInFrames` của Sequence bao quanh nó. **BẮT BUỘC** tích hợp component này vào `ImageScene.tsx` (Mục 3.A) — mặc định KHÔNG có phụ đề nào trên khung hình nếu thiếu bước này, gây khó theo dõi cho khán giả xem tắt tiếng hoặc không rành ngôn ngữ gốc.

```tsx
// src/components/Subtitle.tsx
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SubtitleProps {
  text: string;
}

const MAX_WORDS_SOFT = 6;
const MAX_WORDS_HARD = 9;

const splitIntoPhrases = (text: string): string[] => {
  const words = text.split(' ').filter(Boolean);
  const phrases: string[] = [];
  let current: string[] = [];

  for (const word of words) {
    current.push(word);
    const endsClause = /[,.:;!?—-]["'’”]?$/.test(word);
    if (
      (current.length >= MAX_WORDS_SOFT && endsClause) ||
      current.length >= MAX_WORDS_HARD
    ) {
      phrases.push(current.join(' '));
      current = [];
    }
  }
  if (current.length) phrases.push(current.join(' '));
  return phrases.length ? phrases : [text];
};

export const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const phrases = useMemo(() => splitIntoPhrases(text), [text]);
  const perChunk = Math.max(1, Math.floor(durationInFrames / phrases.length));
  const activeIndex = Math.min(phrases.length - 1, Math.floor(frame / perChunk));
  const chunkStart = activeIndex * perChunk;
  const localFrame = frame - chunkStart;

  const pop = spring({ frame: localFrame, fps, config: { damping: 14, mass: 0.5 } });
  const opacity = interpolate(localFrame, [0, 4], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 130,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: `scale(${0.92 + pop * 0.08})`,
          opacity,
          maxWidth: '84%',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          borderRadius: 14,
          padding: '10px 28px',
        }}
      >
        <span
          style={{
            fontSize: 50,
            fontWeight: 900,
            fontFamily: '"Montserrat", "Arial Black", sans-serif',
            color: '#FFFFFF',
            WebkitTextStroke: '3px #000000',
            paintOrder: 'stroke fill',
            textShadow: '0 6px 16px rgba(0,0,0,0.55)',
            lineHeight: 1.3,
          }}
        >
          {phrases[activeIndex]}
        </span>
      </div>
    </AbsoluteFill>
  );
};
```

- Nền đen mờ (`rgba(0,0,0,0.45)`) phía sau chữ là **bắt buộc** để đảm bảo đọc được trên mọi nền ảnh (kể cả ảnh sáng màu/nhiều chi tiết) — không bỏ qua để "cho sạch khung hình".
- `paddingBottom: 130` đặt caption phía trên watermark góc phải dưới, không đè lên nhau.

---

## 4. Lắp Ráp Root.tsx Chuẩn Song Ngữ & Continuous Audio

```tsx
// src/Root.tsx
import './index.css';
import React from 'react';
import { Composition, Sequence, Audio, staticFile } from 'remotion';
import { ImageScene } from './components/ImageScene';
import { ChannelWatermark } from './components/ChannelWatermark';
import scenesDataEN from '../scenes.json';

const zoomDirections: Array<'in' | 'out' | 'pan-left' | 'pan-right' | 'zoom-in-tilt'> = [
  'in', 'out', 'pan-left', 'zoom-in-tilt', 'pan-right', 'in',
];

// Số ảnh gốc THỰC TẾ đã có trong public/assets/scenes/ (đếm bằng `ls public/assets/scenes/ | wc -l`),
// KHÔNG phải tổng số shot. Khi < scenesDataEN.scenes.length, Smart Fallback ở ImageScene.tsx sẽ
// trải đều các ảnh đã có cho những shot còn thiếu ảnh riêng thay vì render nền đen.
// Cập nhật số này mỗi khi nạp thêm ảnh mới vào folder.
const AVAILABLE_BASE_IMAGES = scenesDataEN.scenes.length; // TODO: sửa thành số ảnh thực tế nếu chưa tạo đủ

export const StoryLandscapeEN: React.FC = () => {
  return (
    <>
      {/* Voiceover Track Liền Mạch Master */}
      {/* ⚠️ THAY staticFile(...) BÊN DƯỚI BẰNG ĐÚNG TÊN FILE THỰC TẾ trong public/audio/scenes/
          (chạy `ls public/audio/scenes/` để xác nhận — KHÔNG giả định .mp3, nhiều TTS tool xuất .wav.
          Sai đuôi file sẽ khiến voice câm hoàn toàn mà KHÔNG có lỗi hiển thị, vì onError bị nuốt.) */}
      <Audio
        src={staticFile('audio/scenes/full-scene.mp3')}
        volume={1.0}
        onError={() => {
          // Chỉ nuốt lỗi này khi file thật sự chưa tồn tại (đang chờ TTS render);
          // KHÔNG dùng để che giấu việc gõ sai đuôi file — luôn ls kiểm tra trước.
        }}
      />

      {/* Dãy các phân cảnh hình ảnh 5-8s */}
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
              totalBaseImages={AVAILABLE_BASE_IMAGES}
              totalShots={scenesDataEN.scenes.length}
              zoomDirection={zoomDir}
              subtitleText={scene.voText}
            />
          </Sequence>
        );
      })}

      {/* Channel Mascot Watermark */}
      <ChannelWatermark />
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Story-EN"
        component={StoryLandscapeEN}
        durationInFrames={scenesDataEN.totalFrames}
        fps={scenesDataEN.fps || 30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

---

## 5. Đồng Bộ Audio-Visual Tuyệt Đối (Critical Sync Checklist)

Ba lỗi câm-lặng sau đây **không làm crash Remotion và không log lỗi nào** — chúng chỉ khiến ảnh/voice không hiển thị/phát mà người thực hiện không hề biết cho tới khi xem preview. Sau bước Scaffold (Bước 5) và trước khi coi Bước 6 (Master Audio) là xong, **BẮT BUỘC** chạy đủ 3 kiểm tra dưới đây:

### A. Kiểm Tra Tên File Ảnh
```bash
ls public/assets/scenes/
```
Phải thấy đúng `0.png`, `1.png`, ..., `N-1.png` — không tiền tố (`Scene 0.png`), không khoảng trắng, không số 0 đệm (`00.png`). Nếu ảnh được AI/user lưu sai tên (rất hay gặp khi tải hàng loạt từ Gemini/Nano Banana), đổi tên lại ngay:
```bash
cd public/assets/scenes && for f in "Scene "*.png; do mv "$f" "$(echo "$f" | sed -E 's/Scene ([0-9]+)\.png/\1.png/')"; done
```
`ImageScene.tsx` dùng `staticFile(\`assets/scenes/${imageIndex}.png\`)` và fallback dùng **cùng pattern** — nếu tên sai, cả ảnh chính lẫn ảnh fallback đều không load được, toàn bộ video render nền đen.

### B. Kiểm Tra Đuôi File Audio Khớp Với Root.tsx
```bash
ls public/audio/scenes/
```
So khớp chính xác với đường dẫn trong `<Audio src={staticFile('audio/scenes/full-scene.XXX')} />` ở `Root.tsx`. `onError` trên `<Audio>` nuốt lỗi lặng lẽ theo thiết kế (để Remotion Studio không crash khi TTS chưa render xong) — **đừng dựa vào nó để phát hiện sai đuôi file**, phải tự `ls` xác nhận bằng mắt.

### C. Đồng Bộ Lại Timing Mỗi Khi Audio Được Tạo Lại (QUAN TRỌNG NHẤT)
`scenes.json` (`startFrame`/`durationInFrames`) được tính dựa trên **một bản ghi âm cụ thể**. Nếu file `full-scene.mp3`/`.wav` bị tạo lại (đổi giọng, đổi tốc độ, sửa kịch bản, v.v.) — dù chỉ một lần — **toàn bộ timing cũ trở nên vô giá trị** và phải tính lại từ đầu. Không có cách nào phát hiện việc này tự động; luôn tự hỏi "audio này có phải là audio mà scenes.json hiện tại được tính dựa trên không?" trước khi render bản final.

Kiểm tra nhanh độ dài audio thực tế (dùng làm nguồn chân lý, không tin số cũ đã biết trước đó):
```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public/audio/scenes/full-scene.wav
```
So với `totalFrames / fps` trong `scenes.json`. Lệch quá 0.5s → phải tính lại timing.

**Phương pháp tính timing khuyến nghị theo độ chính xác tăng dần:**

1. **Tỉ lệ theo số từ (nhanh, xấp xỉ)** — dùng khi chưa có audio thật, chỉ ước lượng sơ bộ: chia đều `totalFrames` theo tỉ lệ số từ mỗi `voText` scene (tốc độ đọc chuẩn kể chuyện ~2.3-2.6 từ/giây, xem `voiceover-tts.md`).
2. **Silence detection (ffmpeg, trung bình)** — dò khoảng lặng giữa các câu:
   ```bash
   ffmpeg -i public/audio/scenes/full-scene.wav -af silencedetect=noise=-30dB:d=0.3 -f null - 2>&1 | grep silence_
   ```
   ⚠️ Nhược điểm đã gặp thực tế: giọng TTS thường có khoảng lặng nội-câu (dấu phẩy) gần bằng khoảng lặng giữa câu, khiến việc chọn nhầm gap gây timing lệch pha (scene này ăn bớt thời gian của scene kế, xen kẽ nhanh/chậm bất thường). Chỉ dùng khi không có điều kiện chạy ASR.
3. **ASR Word-Level Alignment (khuyến nghị, chính xác nhất — sai số <0.1s)** — phiên âm lại chính file audio đang dùng bằng `faster-whisper` (chạy local, không cần API key), lấy timestamp từng từ, rồi đối chiếu (sequence alignment) với danh sách từ trong `scenes.json` để suy ra thời điểm bắt đầu thực tế của mỗi scene:
   ```bash
   python3 -m venv /tmp/whisper-venv
   /tmp/whisper-venv/bin/pip install --quiet faster-whisper
   /tmp/whisper-venv/bin/python - << 'EOF'
   from faster_whisper import WhisperModel
   import json
   model = WhisperModel("small.en", device="cpu", compute_type="int8")
   segments, _ = model.transcribe("public/audio/scenes/full-scene.wav", word_timestamps=True)
   words = [{"word": w.word.strip(), "start": w.start, "end": w.end}
            for seg in segments for w in seg.words]
   json.dump(words, open("/tmp/words.json", "w"), indent=2)
   EOF
   ```
   Sau đó dùng `difflib.SequenceMatcher` (Python stdlib) để khớp chuỗi từ kỳ vọng (từ `voText` từng scene, nối theo thứ tự) với chuỗi từ ASR nhận dạng được, lấy timestamp của từ đầu tiên mỗi scene làm `startFrame` (quy đổi `round(t * fps)`), nội suy tuyến tính cho các từ không khớp trực tiếp. Cách này đã kiểm chứng khớp chính xác tới mili-giây trên audio thật, kể cả với văn bản dài 45+ scene / 1000+ từ.

### D. Xác Nhận Cuối Cùng Trước Khi Render
- `sum(durationInFrames của tất cả scene) === totalFrames === round(audio_duration_thật × fps)`.
- Render thử 2-3 frame rải rác (đầu, giữa, cuối) bằng `npx remotion still src/index.ts <CompositionId> out.png --frame=<N>` và xem ảnh — xác nhận ảnh đúng nội dung + phụ đề đúng câu tại đúng thời điểm đó.
- `npx tsc --noEmit` không lỗi.
