# Hướng Dẫn Scaffold & Ráp Remotion Vertical-Only (Shorts 9:16)

Bộ khung project + component chuyên dụng cho video dọc thuần 1080×1920. Cấu hình `package.json`/`tsconfig.json`/`remotion.config.ts` giữ nguyên như style engine gốc (xem `stickman-storytelling-video-engine/references/remotion-scaffold.md` Mục 2) — tài liệu này chỉ mô tả phần **khác biệt do định dạng dọc**: cấu trúc thư mục, safe-zone constants, và Root.tsx với composition duy nhất.

Video KHÔNG có lớp text overlay nào (không headline hook, không phụ đề hội thoại) — chỉ ảnh + voiceover + watermark mascot nhỏ. Hằng số safe-zone dưới đây vẫn giữ lại làm tham chiếu chung cho watermark và CTA subscribe/follow cuối video (Mục 6 SKILL.md), tránh lệch số giữa các component nếu sau này thêm overlay mới.

---

## 0. Cấu Trúc Dự Án

```
shorts-<topic>/
├── package.json / remotion.config.ts / tsconfig.json   # giống hệt style engine gốc
├── scenes.json              # timing + voText (dùng để đo/ASR alignment, không render lên màn hình)
├── prompt.json / prompts_gemini.md
├── voText_<lang>.md / .txt
├── metadata.md
├── src/
│   ├── index.ts / index.css
│   ├── Root.tsx                        # DUY NHẤT 1 <Composition> "Shorts" 1080x1920
│   └── components/
│       ├── VerticalImageScene.tsx      # Ken Burns tuned cho khung dọc + Smart Fallback
│       └── ChannelWatermarkVertical.tsx # Góc PHẢI DƯỚI, badge tròn nhỏ 100px
└── public/
    ├── avatar_stickman_channel.jpg
    ├── assets/scenes/        # 0.png ... N-1.png — ảnh SINH DỌC GỐC (xem vertical-visual-sourcing.md)
    └── audio/scenes/         # full-scene.mp3/.wav — track duy nhất
```

---

## 1. Hằng Số Vùng An Toàn (Safe-Zone Constants)

Dùng chung một file hằng số để mọi component tham chiếu, tránh lệch số giữa các component:

```tsx
// src/components/safeZone.ts
export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1920;

// Khoảng chừa tối thiểu để không bị UI nền tảng (YouTube Shorts/TikTok/Reels) che —
// số liệu ước lượng bảo thủ dựa trên cột nút tương tác + thanh tên kênh/tiến trình phổ biến
// trên cả 3 nền tảng; luôn xem lại bằng mắt khi preview trên thiết bị thật trước khi publish.
export const SAFE_TOP = 160;
export const SAFE_BOTTOM = 340;
export const SAFE_RIGHT = 200;
export const SAFE_LEFT = 40;
```

---

## 2. Component Chuyên Dụng

### A. VerticalImageScene.tsx — Ken Burns Tuned Cho Khung Dọc + Smart Fallback

Giống `ImageScene.tsx` gốc (xem `stickman-storytelling-video-engine/references/remotion-scaffold.md` Mục 3.A) nhưng biên độ pan/zoom **giảm** so với bản ngang — khung dọc hẹp hơn nên pan ngang mạnh dễ đẩy nhân vật ra khỏi khung hình:

```tsx
// src/components/VerticalImageScene.tsx
import React, { useState } from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

interface VerticalImageSceneProps {
  imageIndex: number;
  totalBaseImages?: number;
  totalShots?: number;
  zoomDirection?: 'in' | 'out' | 'pan-left' | 'pan-right';
}

export const VerticalImageScene: React.FC<VerticalImageSceneProps> = ({
  imageIndex,
  totalBaseImages = 15,
  totalShots = 30,
  zoomDirection = 'in',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fallbackIndex = Math.floor((imageIndex * totalBaseImages) / totalShots);
  const [imgError, setImgError] = useState(false);
  const steppedFrame = Math.floor(frame / 3) * 3;

  let scale = 1.0;
  let translateX = 0;

  // Biên độ nhỏ hơn bản 16:9 (1.0->1.06 / ±20px) vì khung dọc hẹp, pan mạnh dễ mất chi tiết ở rìa
  if (zoomDirection === 'in') {
    scale = interpolate(steppedFrame, [0, durationInFrames], [1.0, 1.045], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'out') {
    scale = interpolate(steppedFrame, [0, durationInFrames], [1.045, 1.0], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'pan-left') {
    scale = 1.03;
    translateX = interpolate(steppedFrame, [0, durationInFrames], [10, -10], { extrapolateRight: 'clamp' });
  } else if (zoomDirection === 'pan-right') {
    scale = 1.03;
    translateX = interpolate(steppedFrame, [0, durationInFrames], [-10, 10], { extrapolateRight: 'clamp' });
  }

  const fadeInOpacity = interpolate(frame, [0, 4], [0.85, 1.0], { extrapolateRight: 'clamp' });
  const currentImageSrc = imgError
    ? staticFile(`assets/scenes/${fallbackIndex}.png`)
    : staticFile(`assets/scenes/${imageIndex}.png`);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0F17', overflow: 'hidden' }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${translateX}px)`,
          opacity: fadeInOpacity,
        }}
      >
        <Img
          src={currentImageSrc}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ boxShadow: 'inset 0 0 120px rgba(0,0,0,0.35)', pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};
```

### B. ChannelWatermarkVertical.tsx — Góc PHẢI DƯỚI, Badge Tròn Nhỏ

Không dùng `safeZone.ts` (badge đủ nhỏ và ở góc nên không cần tính theo hằng số dùng chung) — vị trí/kích thước dưới đây là chuẩn đã validate qua render thật, giữ nguyên cho mọi project mới:

```tsx
// src/components/ChannelWatermarkVertical.tsx
import React from 'react';
import { Img, staticFile } from 'remotion';

export const ChannelWatermarkVertical: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        right: 70,
        zIndex: 999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2.5px solid rgba(255, 210, 63, 0.9)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          backgroundColor: '#111827',
        }}
      >
        <Img
          src={staticFile('avatar_stickman_channel.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};
```

⚠️ Vị trí này nằm trong vùng cột nút tương tác (`SAFE_RIGHT`) nên có thể bị che một phần trên TikTok/Shorts — chấp nhận được vì đây chỉ là badge branding phụ (100px, không phải text cần đọc). Luôn preview trên thiết bị thật; nếu channel cụ thể cần logo luôn hiện trọn vẹn, cân nhắc chuyển sang góc trái trên (`top: SAFE_TOP - 100, left: SAFE_LEFT`) thay vì góc phải dưới.

---

## 3. Root.tsx — Composition Duy Nhất 1080×1920

```tsx
// src/Root.tsx
import './index.css';
import React from 'react';
import { Composition, Sequence, Audio, staticFile } from 'remotion';
import { VerticalImageScene } from './components/VerticalImageScene';
import { ChannelWatermarkVertical } from './components/ChannelWatermarkVertical';
import scenesData from '../scenes.json';

const zoomDirections: Array<'in' | 'out' | 'pan-left' | 'pan-right'> = ['in', 'pan-left', 'out', 'pan-right'];

// Số ảnh dọc gốc THỰC TẾ đã có trong public/assets/scenes/ — đếm bằng `ls public/assets/scenes/ | wc -l`
const AVAILABLE_BASE_IMAGES = scenesData.scenes.length; // TODO: sửa nếu chưa tạo đủ ảnh

const ShortsComposition: React.FC = () => {
  return (
    <>
      {/* ⚠️ Xác nhận đuôi file thật bằng `ls public/audio/scenes/` trước khi sửa dòng dưới — xem Mục 4 */}
      <Audio src={staticFile('audio/scenes/full-scene.mp3')} volume={1.0} onError={() => {}} />

      {scenesData.scenes.map((scene: any, idx: number) => {
        const zoomDir = zoomDirections[idx % zoomDirections.length];
        return (
          <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
            <VerticalImageScene
              imageIndex={idx}
              totalBaseImages={AVAILABLE_BASE_IMAGES}
              totalShots={scenesData.scenes.length}
              zoomDirection={zoomDir}
            />
          </Sequence>
        );
      })}

      <ChannelWatermarkVertical />
    </>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Shorts"
      component={ShortsComposition}
      durationInFrames={scenesData.totalFrames}
      fps={scenesData.fps || 30}
      width={1080}
      height={1920}
    />
  );
};
```

`package.json` script render: `"render": "remotion render src/index.ts Shorts out/short.mp4"`.

---

## 4. Đồng Bộ Audio-Visual Tuyệt Đối (kế thừa nguyên vẹn từ style engine gốc)

Không có gì khác biệt theo định dạng ở bước này — 3 lỗi câm-lặng và quy trình đo/ASR alignment áp dụng y hệt. Xem đầy đủ tại `stickman-storytelling-video-engine/references/remotion-scaffold.md` Mục 5 (A/B/C/D). Tóm tắt 2 lệnh dùng thường xuyên nhất:

```bash
ls public/assets/scenes/    # phải ra đúng 0.png...N-1.png, không tiền tố/khoảng trắng
ls public/audio/scenes/     # so khớp đuôi file với staticFile(...) trong Root.tsx

ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 \
  public/audio/scenes/full-scene.wav
# so với scenesData.totalFrames / fps trong scenes.json — lệch >0.5s phải tính lại timing
```

Với Shorts dưới 180s (thường ≤50 scenes), phương pháp **tỉ lệ theo số từ** thường đã đủ chính xác cho bản nháp; vẫn nên chạy ASR alignment (`faster-whisper`, xem file trên Mục 5.C) trước khi render bản final vì shot ngắn (2-4s) nhạy với sai lệch timing hơn nhiều so với shot 5-8s của video dài — lệch 0.3s ở shot 3s đã là lệch 10% thời lượng shot đó.
