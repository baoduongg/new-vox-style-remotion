# Paper-Cut Style Guide (Remotion)

Đây là phần quyết định video có "trông paper-cut" và bắt mắt hay không — không phải chỉ đổi ảnh, mà là cách layer + animate ảnh trong Remotion.

## 1. Nguyên tắc thị giác paper-cut

- **Layered depth**: mỗi scene có tối thiểu 3 lớp (background xa, midground, foreground/nhân vật chính) di chuyển với tốc độ khác nhau (parallax) — đây là yếu tố quan trọng nhất, thiếu nó thì trông như slideshow ảnh phẳng.
- **Tách thành phần thành ảnh riêng (mặc định, không dùng 1 ảnh gộp/scene)**: mỗi scene có nhiều đối tượng riêng biệt (nhân vật A, nhân vật B, icon/hiệu ứng phụ) → sinh riêng từng ảnh cutout nền trong suốt + 1 ảnh background full-frame không nhân vật, xem `visual-sourcing.md` mục "Tách element". Mỗi thành phần là 1 `Layer` với `kind: "element"` để tự rung/lắc độc lập — đây là yếu tố quyết định video "sinh động" thay vì tĩnh.
- **Rung/lắc tại chỗ liên tục (idle wiggle)**: mỗi layer dao động rotation + bob nhẹ liên tục suốt scene (không chỉ lúc entry), seed theo `sceneIndex*7 + layerIndex*13` để các layer lệch pha nhau, tránh rung đồng bộ trông giả.
- **Drop shadow nhiều lớp + viền rim sáng**: mỗi layer có 2 `drop-shadow()` chồng nhau — 1 viền trắng mờ sát cạnh (mô phỏng ánh sáng bắt viền giấy) + 1 bóng đậm offset theo depth — layer càng gần camera thì shadow càng đậm/offset càng lớn, mô phỏng giấy dán chồng lên nhau.
- **Torn/cut edge**: dùng `clip-path: polygon(...)` răng cưa nhẹ ở cạnh layer background thay vì hình chữ nhật vuông vức. Layer `element` (cutout nền trong suốt) không cần clip-path vì viền đã là hình dạng thật của vật thể.
- **Micro-rotation**: mỗi layer có rotation cơ sở nhỏ (-3° đến 3°) cố định (seed theo scene id, KHÔNG random mỗi lần render) cộng thêm idle wiggle ở trên — giấy thật không bao giờ thẳng tuyệt đối và không bao giờ đứng yên hoàn toàn.
- **Palette giới hạn**: mỗi video dùng tối đa 5-6 màu chủ đạo (kể cả ảnh Gemini-generated phải theo palette này — ghi rõ trong prompt Gemini). Tránh ảnh Pexels có màu lệch tông làm vỡ bộ nhận diện.

## 2. Component pattern chuẩn cho 1 Scene

```tsx
// src/scenes/Scene.tsx
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, spring, useVideoConfig } from 'remotion';

type Layer = {
  src: string;
  depth: number; // 0 = background, 1 = mid, 2 = foreground — quyết định tốc độ parallax + shadow
  baseRotationDeg: number; // cố định theo scene, không random runtime
  entryDelayFrames?: number;
  kind?: 'background' | 'element'; // background = full-bleed cover; element = cutout nền trong suốt, đặt theo x/y/width
  x?: number; // % từ trái, chỉ dùng khi kind === 'element'
  y?: number; // % từ trên
  width?: number; // % chiều rộng khung
};

const CLIP_PATH_VARIANTS = [
  'polygon(2% 0%, 98% 1%, 100% 97%, 97% 100%, 3% 99%, 0% 96%)',
  'polygon(0% 2%, 97% 0%, 100% 3%, 99% 98%, 2% 100%, 1% 97%)',
  'polygon(1% 1%, 99% 0%, 100% 96%, 98% 100%, 2% 99%, 0% 3%)',
  'polygon(0% 0%, 96% 2%, 100% 99%, 4% 100%, 0% 98%, 1% 2%)',
]; // biến thể cạnh răng cưa cho layer background, xoay vòng theo (sceneIndex + layerIndex) % 4

// Rung/lắc tại chỗ liên tục suốt scene, seed theo scene+layer để lệch pha nhau (không đồng bộ máy móc)
const idleWiggle = (frame: number, seed: number) => {
  const period = 85 + (seed % 45); // ~2.8-4.3s/chu kỳ ở 30fps
  const phase = ((seed % 20) / 20) * Math.PI * 2;
  const ampDeg = 1.1 + ((seed % 10) / 10) * 1.2; // 1.1-2.3deg
  const rotate = Math.sin((frame / period) * Math.PI * 2 + phase) * ampDeg;
  const bobY = Math.cos((frame / (period * 1.3)) * Math.PI * 2 + phase) * (2 + (seed % 3));
  return { rotate, bobY };
};

export const Scene: React.FC<{ layers: Layer[]; durationInFrames: number; sceneIndex: number }> = ({
  layers,
  durationInFrames,
  sceneIndex,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#F4EDE1' /* màu nền giấy kraft, đổi theo palette video */ }}>
      {layers.map((layer, i) => {
        const kind = layer.kind ?? 'background';
        const seed = sceneIndex * 7 + i * 13;
        const { rotate: idleRotate, bobY } = idleWiggle(frame, seed);

        const entryProgress = spring({
          frame: frame - (layer.entryDelayFrames ?? 0),
          fps,
          config: { damping: 14, mass: 0.6 },
        });
        const parallaxY = interpolate(frame, [0, durationInFrames], [0, -10 * (layer.depth + 1)]);
        const scaleIn = interpolate(entryProgress, [0, 1], [0.85, 1]);
        const shadowBlur = 5 + layer.depth * 7;
        const shadowOffset = 3 + layer.depth * 5;
        const clipPath = kind === 'background' ? CLIP_PATH_VARIANTS[(sceneIndex + i) % 4] : undefined;

        const positionStyle =
          kind === 'element'
            ? { position: 'absolute' as const, left: `${layer.x ?? 10}%`, top: `${layer.y ?? 10}%`, width: `${layer.width ?? 40}%`, height: 'auto' }
            : { position: 'absolute' as const, inset: 0 };

        return (
          <div
            key={i}
            style={{
              ...positionStyle,
              transform: `translateY(${parallaxY + bobY}px) scale(${scaleIn}) rotate(${layer.baseRotationDeg + idleRotate}deg)`,
              opacity: entryProgress,
              filter: [
                'drop-shadow(0 0 1.5px rgba(255,255,255,0.85))', // viền rim sáng mô phỏng giấy bắt sáng
                `drop-shadow(${shadowOffset}px ${shadowOffset}px ${shadowBlur}px rgba(0,0,0,0.3))`,
              ].join(' '),
              clipPath,
            }}
          >
            <Img
              src={staticFile(layer.src.replace(/^public\//, ''))}
              style={{ width: '100%', height: kind === 'background' ? '100%' : 'auto', objectFit: kind === 'background' ? 'cover' : 'contain' }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
```

Ghi chú khi áp dụng vào scene thật:
- `depth` layer 0 (background) hầu như đứng yên, layer cao nhất di chuyển nhiều nhất khi parallax → tạo cảm giác 3D dù ảnh 2D.
- `entryDelayFrames` nên so le giữa các layer (background vào trước, foreground vào sau ~4-6 frame) thay vì cùng lúc — hiệu ứng giấy "được dán vào" lần lượt.
- `kind: 'element'` cần `x`/`y`/`width` đặt thủ công theo bố cục scene (vd nhân vật trái đặt `x: 8, width: 38`, nhân vật phải đặt `x: 54, width: 38`) — không có logic tự dàn layout, phải xem qua ảnh cutout rồi canh tay.
- `clipPath` nên có 3-4 biến thể polygon dùng xoay vòng theo `scene.id % 4`, tránh mọi layer cắt y hệt nhau.

## 3. Transition giữa scene

Không dùng crossfade thường (trông giống slideshow). Dùng **cut-in wipe**: scene mới "trượt vào" từ 1 cạnh với clip-path động (`polygon` dịch chuyển theo `interpolate(frame, [0, 12], [...])`) mô phỏng 1 tờ giấy được đặt chồng lên — 10-15 frame là đủ, không kéo dài quá 0.5s.

## 4. Typography (nếu có text overlay)

- Font có nét tay/serif nhẹ, KHÔNG dùng font hệ thống mặc định (Arial/Helvetica) — phá vỡ cảm giác thủ công.
- Text đặt trên 1 "miếng giấy" riêng (rectangle bo góc nhẹ, có shadow như layer 1) chứ không đè trực tiếp lên ảnh nền.

## 5. Palette gợi ý (kraft paper warm tone — phù hợp curiosity channel)

`#F4EDE1` (nền), `#D9C4A3` (giấy phụ), `#C1553D` (accent đỏ đất), `#3E5C4F` (accent xanh rêu), `#2B2B2B` (text/outline).

Ghi rõ palette này (hoặc palette đã chọn cho video cụ thể) vào MỌI prompt Gemini ở bước visual sourcing để ảnh generated đồng bộ màu với ảnh Pexels đã qua xử lý.
