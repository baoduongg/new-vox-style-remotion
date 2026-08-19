# Remotion Scaffold

Dùng khi user chưa có project Remotion. Nếu đã có project, chỉ đọc mục 3 (cấu trúc scenes.json) và 4 (mapping) để thêm scene mới vào project hiện tại — không chạy lại bước scaffold.

## 0. Đặt tên project — LUÔN tạo thư mục mới theo topic

Mỗi video mới = 1 thư mục project riêng, đặt tên theo topic (kebab-case, không dấu), ví dụ topic "Vì sao ngáp lây" → `vi-sao-ngap-lay`.

KHÔNG bao giờ scaffold đè hoặc tái sử dụng thư mục project của video trước đó (kể cả nếu nó tên `paper-cut-channel` từ phiên làm việc cũ) — mỗi video có `scenes.json`, asset, audio riêng, dùng chung thư mục sẽ ghi đè/đụng file của video khác. Chỉ tái sử dụng thư mục hiện tại nếu user đang tiếp tục sửa CHÍNH video đó trong cùng phiên.

## 1. Khởi tạo project

```bash
pnpm create video@latest <project-slug> -- --template=blank
cd <project-slug>
pnpm install
```

`<project-slug>` = tên rút ra từ mục 0.

## 2. Cấu trúc thư mục mục tiêu

```
<project-slug>/
├── public/
│   ├── pexels/            # asset tải từ Pexels
│   ├── generated/         # ảnh Gemini-generated
│   └── audio/
│       ├── voiceover.mp3
│       ├── music.mp3      # nhạc nền piano tối giản
│       └── sfx/           # foley (rustle, slide, pen-write, pop-click, tape-peel — xem sound-design.md)
├── src/
│   ├── scenes/
│   │   └── Scene.tsx      # component dùng chung (xem paper-cut-style-guide.md)
│   ├── compositions/
│   │   ├── Landscape.tsx  # 16:9, 1920x1080
│   │   └── Vertical.tsx   # 9:16, 1080x1920
│   ├── data/
│   │   └── scenes.json    # nguồn dữ liệu duy nhất, xem mục 3
│   └── Root.tsx
└── remotion.config.ts
```

## 3. `scenes.json` — nguồn dữ liệu duy nhất

Đây là single source of truth từ bước scene breakdown, đọc bởi cả 2 composition. KHÔNG hard-code nội dung scene trực tiếp trong component — mọi thay đổi nội dung chỉ sửa file này.

```json
{
  "fps": 30,
  "audioSrc": "public/audio/voiceover.mp3",
  "scenes": [ /* xem cấu trúc mẫu trong visual-sourcing.md mục 3 */ ]
}
```

## 4. `Root.tsx` — đăng ký cả 2 composition

```tsx
import { Composition } from 'remotion';
import { Landscape } from './compositions/Landscape';
import { Vertical } from './compositions/Vertical';
import scenesData from './data/scenes.json';

const totalDuration = scenesData.scenes.reduce(
  (max, s) => Math.max(max, s.startFrame + s.durationInFrames),
  0
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
```

## 5. `compositions/Landscape.tsx` (Vertical.tsx tương tự, chỉ đổi layout an toàn)

```tsx
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { Scene } from '../scenes/Scene';
import scenesData from '../data/scenes.json';

export const Landscape: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile('audio/voiceover.mp3')} volume={1} />
    <Audio src={staticFile('audio/music.mp3')} volume={0.15} />
    {scenesData.scenes.map((s, i) => (
      <Sequence key={s.id} from={s.startFrame} durationInFrames={s.durationInFrames}>
        <Scene layers={s.layers} durationInFrames={s.durationInFrames} sceneIndex={i} />
        {/* Foley SFX theo scene — cách sync và mức volume xem sound-design.md */}
      </Sequence>
    ))}
  </AbsoluteFill>
);
```

Với `Vertical.tsx`: layer nào là text overlay cần né vùng safe-zone của Shorts — để margin trên/dưới ~12% chiều cao khung hình cho UI YouTube (nút like/subscribe/caption).

## 6. Preview & render

```bash
npx remotion studio                                   # xem trực tiếp, chọn composition Landscape hoặc Vertical
npx remotion render Landscape out/landscape.mp4
npx remotion render Vertical out/vertical.mp4
```

## 7. Khi thêm scene vào project đã tồn tại

1. Append object scene mới vào `src/data/scenes.json`.
2. Đảm bảo `startFrame` scene mới nối tiếp đúng ngay sau scene cuối (không đè `startFrame` scene cũ, không để hở khoảng trống frame).
3. Không cần sửa `Root.tsx`/composition — `totalDuration` tự tính lại từ dữ liệu.
