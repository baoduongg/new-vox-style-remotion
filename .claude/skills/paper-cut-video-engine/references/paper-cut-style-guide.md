# Paper-Cut Style Guide (Remotion)

Đây là phần quyết định video có "trông paper-cut" và bắt mắt hay không — không phải chỉ đổi ảnh, mà là cách layer + animate ảnh trong Remotion. Tham chiếu thẩm mỹ: **Vox-style documentary paper-cut** — chất liệu giấy thật (không phải minh hoạ vector phẳng), chuyển động dứt khoát kiểu stop-motion, và foley âm thanh đi kèm mọi chuyển động (xem mục 7).

## 1. Nguyên tắc thị giác paper-cut

- **Layered depth**: mỗi scene có tối thiểu 3 lớp (background xa, midground, foreground/nhân vật chính) di chuyển với tốc độ khác nhau (parallax) — đây là yếu tố quan trọng nhất, thiếu nó thì trông như slideshow ảnh phẳng.
- **Chất liệu giấy thật (texture), không phải vector phẳng**: mọi ảnh (Gemini-generated lẫn Pexels) phải mang bề mặt vật lý — vân giấy, hạt nhiễu ảnh chụp nhẹ, cạnh giấy cũ hơi ố màu. Đây là điểm phân biệt paper-cut Vox-style với minh hoạ flat-design thông thường — ghi rõ yêu cầu texture trong MỌI prompt Gemini (xem `visual-sourcing.md` mục 2). Tránh ảnh nhìn "sạch" như vector illustrator.
- **Tách thành phần thành ảnh riêng (mặc định, không dùng 1 ảnh gộp/scene)**: mỗi scene có nhiều đối tượng riêng biệt (nhân vật A, nhân vật B, icon/hiệu ứng phụ) → sinh riêng từng ảnh cutout nền trong suốt + 1 ảnh background full-frame không nhân vật, xem `visual-sourcing.md` mục "Tách element". Mỗi thành phần là 1 `Layer` với `kind: "element"` để tự rung/lắc độc lập — đây là yếu tố quyết định video "sinh động" thay vì tĩnh.
- **Rung/lắc tại chỗ liên tục (idle wiggle)**: mỗi layer dao động rotation + bob nhẹ liên tục suốt scene (không chỉ lúc entry), seed theo `sceneIndex*7 + layerIndex*13` để các layer lệch pha nhau, tránh rung đồng bộ trông giả.
- **Chuyển động dứt khoát (snap-in), không "float" mượt kiểu motion graphics**: entry animation phải có cảm giác vật thể được đặt/trượt vào vị trí rồi dừng khựng lại (như stop-motion tay đặt giấy xuống bàn), KHÔNG ease-out dài mượt như UI animation. Dùng `spring` với `damping` cao (14-18) + `mass` thấp (0.5-0.7) như trong component pattern mục 2 — tránh chỉnh damping thấp hơn (trông "nảy" quá mượt) hoặc thêm easing cubic dài (trông "trôi").
- **Step-framing nhẹ (giả lập stop-motion 8-12fps)**: dù render ở 30fps, làm tròn `frame` xuống bội số gần nhất trước khi tính idle wiggle/parallax (vd `const steppedFrame = Math.floor(frame / 3) * 3`, dùng `steppedFrame` thay cho `frame` trong `idleWiggle` và parallax) — giữ nguyên giá trị trong mỗi cụm 2-3 frame rồi nhảy sang giá trị kế tiếp thay vì update mượt mỗi frame. Đây là yếu tố quyết định video trông "stop-motion thủ công" thay vì "AI/vector chuyển động mượt digital" — không bỏ qua bước này.
- **Đa dạng bố cục, tránh lặp thế "giấy giữa nền"**: không đặt mọi scene theo cùng 1 khuôn (1 mẩu giấy/nhân vật giữa khung, nền tối hoặc bàn gỗ) quá 2-3 scene liên tiếp. Luân phiên giữa: full-bleed background phủ kín khung, layout chia đôi trái/phải (2 `element` như ghi chú mục 2), cận cảnh cutout tràn khung (`width` > 70%), hoặc góc nhìn từ trên xuống bàn làm việc (overhead desk). Trước khi ráp, rà lại chuỗi scene liên tiếp trong `scenes.json` — nếu 3+ scene liền kề dùng cùng bố cục thì đổi bố cục hoặc thêm layer `tape`/`element` phá thế tĩnh.
- **Tương tác tay giấy (puppetry) — dùng thưa, đúng lúc**: thỉnh thoảng (1-2 lần/video dài, không phải mọi scene) thêm 1 layer `kind: 'element'` là ảnh bàn tay cắt giấy (paper-cutout hand) đẩy/kéo/trượt 1 mảnh giấy vào khung, dùng ở khoảnh khắc cần nhấn (hook, plot-twist, mở đầu 1 payoff mới) — không dùng tràn lan vì làm chậm nhịp video ngắn.
- **Bóng đổ biến thiên theo hướng (paper curl giả lập)**: thay vì offset shadow cố định 1 hướng cho mọi layer trong video, lệch nhẹ `shadowOffset` theo dấu và độ lớn của `baseRotationDeg` layer đó (layer xoay nhiều thì bóng lệch theo hướng xoay nhiều hơn) — mô phỏng giấy hơi cong/gợn mép thay vì phẳng tuyệt đối chiếu sáng 1 hướng cố định.
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
  kind?: 'background' | 'element' | 'tape'; // background = full-bleed cover; element = cutout nền trong suốt; tape = trang trí góc (xem mục 3b)
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
    <AbsoluteFill style={{ background: '#2B2B2B' /* nền workspace tối mặc định, đổi sang #F4EDE1 (kraft) nếu scene dùng biến thể ấm ở mục 4b */ }}>
      {layers.map((layer, i) => {
        const kind = layer.kind ?? 'background';
        const seed = sceneIndex * 7 + i * 13;
        const steppedFrame = Math.floor(frame / 3) * 3; // step-framing: giữ giá trị 3 frame/lần để giả lập stop-motion 8-12fps
        const { rotate: idleRotate, bobY } = idleWiggle(steppedFrame, seed);

        const entryProgress = spring({
          frame: frame - (layer.entryDelayFrames ?? 0),
          fps,
          config: { damping: 14, mass: 0.6 },
        });
        const parallaxY = interpolate(steppedFrame, [0, durationInFrames], [0, -10 * (layer.depth + 1)]);
        const scaleIn = interpolate(entryProgress, [0, 1], [0.85, 1]);
        const shadowBlur = 5 + layer.depth * 7;
        const shadowOffset = 3 + layer.depth * 5;
        // paper curl giả lập: bóng lệch theo hướng xoay của layer thay vì luôn 1 hướng cố định
        const shadowOffsetX = shadowOffset * Math.sign(layer.baseRotationDeg || 1) * 0.6;
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
                `drop-shadow(${shadowOffsetX}px ${shadowOffset}px ${shadowBlur}px rgba(0,0,0,0.3))`,
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

Không dùng crossfade thường (trông giống slideshow). Mặc định dùng **cut-in wipe**: scene mới "trượt vào" từ 1 cạnh với clip-path động (`polygon` dịch chuyển theo `interpolate(frame, [0, 12], [...])`) mô phỏng 1 tờ giấy được đặt chồng lên — 10-15 frame là đủ, không kéo dài quá 0.5s.

Đổi biến thể theo nhịp phim nếu cut-in wipe lặp lại quá đều giữa nhiều scene liên tiếp:
- **Slide theo mảng màu**: 1 `ColorBlock` full-frame trượt ngang che scene cũ rồi rút đi, lộ scene mới phía sau.
- **Torn-paper reveal**: clip-path răng cưa (dùng lại `CLIP_PATH_VARIANTS`) "xé" từ 1 góc lan ra thay vì trượt thẳng cạnh.

Không dùng fade toàn màn hình trừ khi chuyển sang phần nội dung hoàn toàn khác (vd hết payoff, sang CTA).

Cho các điểm nhấn lớn (đầu video, sang payoff quan trọng, chuyển sang Part 2 series), dùng 1 trong 2 biến thể mạnh hơn thay vì cut-in wipe thường — không lạm dụng, chỉ 1-2 lần/video:
- **Pop-up book (mở sách nổi)**: 2 nửa layer (trái/phải) `rotateY` từ 90° về 0° như trang sách mở ra, layer trung tâm scale nhẹ xuất hiện sau khi 2 nửa mở hết (~18-20 frame, dài hơn cut-in wipe vì là điểm nhấn cố ý).
- **Sticker-peel reveal**: dùng khi hé lộ sự thật/số liệu bất ngờ phía sau 1 lớp che (nhãn, chứng nhận, câu trả lời cũ) — layer che có `clip-path` bo góc như nhãn dán, animate `rotate` nhẹ + `translateY` như đang bóc lên rồi biến mất, lộ layer bên dưới. Kèm SFX tape-peel (xem `sound-design.md`).

## 3b. Tape (băng keo giấy) — trang trí tuỳ chọn

Thêm layer `kind: 'tape'` ở góc 1-2 layer quan trọng/scene để tăng cảm giác thủ công — 1 hình chữ nhật mờ (`opacity: 0.5-0.7`, màu be/kraft nhạt `#F4EDE1`/`#D9C4A3` — nổi rõ trên nền workspace tối), rotate cố định -8° đến 8°, đặt đè lên góc layer như đang dán giữ giấy. Không lạm dụng — tối đa 1-2 miếng tape/scene, chỉ ở layer cần nhấn (ví dụ nhãn tiêu đề, tờ giấy thông tin).

## 4. Hiệu ứng đặc thù Vox-style (dùng đúng lúc, không lạm dụng)

- **Wipe (viết tay)**: khi cần nhấn 1 câu/từ khoá hoặc gạch chân trên "bản đồ"/tài liệu, dùng `clip-path: inset(0 X% 0 0)` với `X` chạy từ 100 → 0 theo `interpolate(frame, [0, 15], [100, 0])` để mô phỏng nét bút/bút dạ đang "viết" ra dần, không phải fade-in hay pop-in. Dùng cho: gạch chân từ khoá, khoanh tròn số liệu, vẽ mũi tên chỉ dẫn.
- **Pop/Pulse (đánh dấu điểm)**: icon hoặc chấm đánh dấu trên bản đồ/sơ đồ xuất hiện bằng scale nhanh quá đà rồi co lại (`interpolate` qua 3 keyframe: `[0, 6, 10] → [0, 1.3, 1]`), sau đó lặp `pulse` nhẹ (scale dao động ±5%, chu kỳ ~40 frame) nếu cần giữ sự chú ý liên tục vào điểm đó. Dùng cho: chấm định vị, icon số liệu, biểu tượng cảnh báo/nhấn mạnh.
- **Highlight block (dải màu nhấn từ khoá)**: khi text overlay có từ khoá cần nhấn, đặt 1 `div` hình khối màu vàng/đỏ (`background: #F2C14E` hoặc accent đỏ của palette) phía sau chữ, với chiều rộng animate theo Wipe ở trên (xuất hiện ngay trước hoặc đồng thời với từ khoá) — mô phỏng highlighter tô lên giấy. Không tô nguyên câu, chỉ 1-3 từ khoá quan trọng nhất/scene.
  - Biến thể "tem nhãn" cho 1 con số gây sốc đơn lẻ (vd "2%"): thay dải màu ngang bằng 1 nhãn tròn/bo góc nhỏ xoay -6° đến 6°, viền đậm, tách khỏi luồng chữ chính, xuất hiện bằng Pop/Pulse ở trên — nổi bật mạnh hơn dải highlight khi chỉ cần nhấn đúng 1 con số duy nhất.
- **Đường kẻ kết nối**: khi 2+ sự kiện/số liệu cần thể hiện quan hệ nhân-quả hoặc trình tự, vẽ 1 đường (thẳng, đứt đoạn, hoặc uốn cong bằng SVG `path`) nối chúng bằng kỹ thuật `stroke-dasharray`/`stroke-dashoffset` animate theo frame (đường "được vẽ ra" dần, cùng logic với Wipe). Màu đường dùng accent phụ (không trùng highlight block) để phân biệt vai trò. Ngoại lệ: với scene infographic/bản đồ tổng quan dựng theo template ghép sẵn (`visual-sourcing.md` mục 2c), route/mũi tên đã bake sẵn trong ảnh generated — không cần code-draw SVG riêng cho trường hợp này vì cả scene là 1 layer nền tĩnh, không tách phần để animate độc lập.

Cả 4 hiệu ứng trên đều phải có foley SFX đi kèm đúng lúc animate chạy — xem mục 7.

## 4b. Nền workspace mặc định: dark charcoal gray textured paper

Nền mặc định của MỌI scene (tự sự/nhân vật lẫn infographic/dữ liệu) là **workspace tối** — bề mặt giấy/vải xám than có texture, mô tả trong prompt Gemini là `"dark charcoal gray, textured paper surface"` (`#2B2B2B`, không phải màu phẳng tuyệt đối). Đặt layer `kind: 'background'` là ảnh nền workspace tối này; các layer giấy/tài liệu/nhân vật khác nằm trên với shadow đậm rõ (giấy kraft sáng nổi bật mạnh trên nền tối).

Biến thể ấm hơn (tuỳ chọn, KHÔNG phải mặc định): nền giấy kraft sáng `#F4EDE1` hoặc bàn gỗ vân nâu — chỉ dùng khi cố ý muốn 1 đoạn/scene có tông ấm áp gần gũi hẳn so với phần còn lại (vd đoạn hồi tưởng tuổi thơ, cảnh mở đầu nhẹ nhàng). Không trộn ngẫu nhiên giữa các scene liền kề — phải có lý do rõ theo nội dung, và nếu dùng thì chỉ 1-2 scene, không đảo cả video.

## 5. Typography (nếu có text overlay)

- **Tiêu đề/heading**: font serif cổ điển có tính tài liệu (DM Serif Display, Times New Roman, Playfair Display), **chữ trắng đậm (bold)** đặt trên dải giấy màu vàng `#F2C14E` (không phải chữ đen) — đây là combo màu chuẩn của tiêu đề Vox-style, tương phản mạnh dễ đọc dù ở kích thước nhỏ. KHÔNG dùng font hệ thống mặc định (Arial/Helvetica) vì phá vỡ cảm giác thủ công/documentary.
- **Số liệu/chú thích/data label**: font sans-serif gọn, hiện đại (Inter, Helvetica Now) — tạo tương phản cố ý giữa tiêu đề cổ điển và dữ liệu hiện đại, đặc trưng của phong cách Vox.
- **Nhãn nhỏ (địa danh, bước, mốc thời gian)**: chip bo góc nhỏ nền trắng/kem, viền đen mảnh, chữ caps đậm màu đen, có shadow nhẹ — khác tiêu đề chính (nền vàng/chữ trắng) để phân biệt vai trò "nhãn phụ" và "tiêu đề chính".
- Text đặt trên 1 "miếng giấy" riêng (rectangle bo góc nhẹ, có shadow như layer 1) chứ không đè trực tiếp lên ảnh nền.

## 6. Palette gợi ý (dark charcoal workspace — chuẩn Vox-style)

`#2B2B2B` (nền workspace mặc định — dark charcoal gray, textured paper surface, KHÔNG phải màu phẳng tuyệt đối, luôn ghi "textured" trong prompt Gemini), `#F4EDE1` (giấy kraft — màu các mảnh giấy/tài liệu/nhãn/nhân vật đặt TRÊN nền tối, không còn dùng làm màu nền tổng thể; cũng dùng làm màu chữ/outline sáng để dễ đọc trên nền tối), `#D9C4A3` (giấy phụ, tài liệu thứ cấp), `#C1553D` (accent đỏ đất — object/icon), `#3E5C4F` (accent xanh rêu — object/icon), `#F2C14E` (highlight vàng — dùng cho hiệu ứng highlight block ở mục 4 và dải tiêu đề ở mục 5, không dùng làm màu nền/layer).

Các mảnh giấy kraft/accent nổi bật rõ rệt trên nền tối thay vì hoà lẫn vào nền be như bản palette cũ — đây là điểm quan trọng nhất để đúng chất Vox-style, giữ nguyên ở mọi loại scene (không riêng gì infographic/bản đồ).

Ghi rõ palette này (hoặc palette đã chọn cho video cụ thể) vào MỌI prompt Gemini ở bước visual sourcing để ảnh generated đồng bộ màu với ảnh Pexels đã qua xử lý.

## 7. Sound design (foley + nhạc nền) — bắt buộc, không phải tuỳ chọn

Âm thanh là 1 trong 2 trụ cột của phong cách Vox-style (ngang hàng với hình ảnh, không phải lớp phủ thêm sau cùng). Chi tiết foley SFX, nguồn tải, cách sync theo frame, và nhạc nền: đọc `references/sound-design.md`. Tối thiểu mỗi scene phải có foley khớp với: entry animation của layer, Wipe/Pop ở mục 4, và transition sang scene kế — thiếu foley thì animation "câm", mất đúng cái làm nên chất Vox.
