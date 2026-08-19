# Visual Sourcing: Pexels + Gemini prompt

## Nguyên tắc chọn nguồn cho từng scene

| Loại visual cần | Nguồn |
|---|---|
| Cảnh đời thực, đồ vật, con người thật, thiên nhiên (B-roll) | Pexels (video ưu tiên, ảnh fallback) |
| Khái niệm trừu tượng, minh hoạ nhân vật hoạt hình, sơ đồ, ẩn dụ thị giác | Gemini-generated theo prompt paper-cut |
| Ảnh Pexels có nhưng lệch tông màu quá nhiều so với palette video | Vẫn ưu tiên Gemini-generated để giữ đồng bộ style |

Paper-cut là phong cách minh hoạ — Pexels (ảnh/video thực) chỉ nên chiếm phần nhỏ (B-roll nền, texture giấy thật, tay cắt giấy...), phần lớn nhân vật/khái niệm chính nên là ảnh generated để giữ nhất quán thẩm mỹ.

## 1. Dùng Pexels

Script `scripts/pexels_search.py` cần biến môi trường `PEXELS_API_KEY` (đã có sẵn theo user).

```bash
python scripts/pexels_search.py --query "hand cutting paper craft" --type video --per-page 5 --out ./public/pexels/
```

- `--type video|photo`
- Script in ra danh sách kết quả kèm `id`, `url`, `photographer` (cần credit trong description video theo điều khoản Pexels) và tải file được chọn về `--out`.
- Luôn xem trước danh sách rồi hỏi user chọn 1, KHÔNG tự động tải file đầu tiên khi có nhiều lựa chọn khác biệt về bố cục.

## 2. Sinh prompt Gemini (user tự chạy và import ảnh)

Khi scene cần ảnh generated, tạo prompt theo template sau, điền theo `visualPrompt` của scene + palette đã chọn (xem `paper-cut-style-guide.md` mục 6):

```
A detailed paper cutout illustration in the Vox paper cutout animation style, [MÔ TẢ CHỦ THỂ CỦA SCENE].
Background: dark charcoal gray, textured paper surface [#2B2B2B].
Cutout elements in warm kraft paper [#F4EDE1] and accent colors [#C1553D, #3E5C4F], layered paper cutout infographic, paper collage style.
Visible torn paper edges, soft drop shadows between layers indicating depth,
slightly imperfect hand-cut edges, aged archival document paper texture with subtle grain and
faint scan/archival noise (like old documents or vintage maps), NOT clean flat
vector art, no photorealistic rendering, no 3D render — pure paper craft
diorama look.
Aspect ratio: [16:9 hoặc 9:16].
```

- Cụm `"Vox paper cutout animation style"` giữ nguyên văn (không dịch/diễn giải lại) — model sinh ảnh nhận diện tốt hơn khi giữ đúng chính tả.
- Nền mặc định là `dark charcoal gray, textured paper surface [#2B2B2B]` — KHÔNG còn là kraft cream `#F4EDE1` như bản cũ, đây là thay đổi quan trọng nhất để ra đúng chất Vox (các mảnh giấy kraft/accent nổi bật trên nền tối thay vì hoà vào nền be). `#F4EDE1` giờ là màu của các đối tượng cắt dán đặt TRÊN nền, không phải màu nền.
- Nếu scene chủ đích dùng biến thể ấm (kraft sáng/bàn gỗ, xem `paper-cut-style-guide.md` mục 4b), đổi dòng `Background:` tương ứng — không xoá dòng này.

- `[MÔ TẢ CHỦ THỂ CỦA SCENE]` lấy trực tiếp từ `visualPrompt` trong `scenes.json`.
- Thay vì chỉ in prompt ra chat, ghi toàn bộ prompt của các scene cần generated-image vào file `prompt.json` ở root project, format:

```json
{
  "scene-01": {
    "prompt": "Paper cut craft illustration, ..."
  },
  "scene-02": {
    "prompt": "Paper cut craft illustration, ..."
  }
}
```

- Key là tên file ảnh đích (khớp `scene-{id}.png`), value là object có field `prompt` (giữ đúng chính tả này, không sửa thành "prompt") chứa full prompt đã build theo template trên.
- Báo user: "Prompt đã lưu ở `prompt.json`, chạy từng prompt trong Gemini, tải ảnh về, đặt vào `public/generated/<tên-file-tương-ứng-key>`."
- Sau khi user xác nhận đã import ảnh, cập nhật `scenes.json`: `visualPath: "public/generated/scene-{id}.png"`, `visualType: "generated-image"`.

## 2b. Tách scene thành nhiều element riêng (mặc định cho scene có ≥2 đối tượng)

Để mỗi thành phần rung/lắc độc lập thật sự (không phải giả lập mask trên 1 ảnh gộp), sinh riêng:
- 1 ảnh `scene-{id}-bg.png`: background full-frame, KHÔNG có nhân vật/vật thể chính, prompt thêm "background only, no characters, no objects".
- 1 ảnh/mỗi đối tượng độc lập (nhân vật, icon, hiệu ứng phụ): `scene-{id}-{tên-phần}.png`, prompt thêm đoạn isolate:

```
Isolated subject only, centered, on a plain flat solid white background, no scene background, no ground shadow.
```

Lý do dùng nền trắng thay vì yêu cầu Gemini xuất nền trong suốt: Gemini không xuất PNG alpha đáng tin cậy, nền trắng phẳng dễ tách sạch bằng code sau khi tải về.

Lưu ý: vẫn dùng nền TRẮNG (không phải xám) cho ảnh element dù nền scene mặc định giờ là workspace tối `#2B2B2B` — trắng cho tương phản cao nhất để `remove_white_bg.py` tách sạch, đặc biệt vì nhiều object giờ có tông sáng (giấy kraft `#F4EDE1`) dễ lẫn với nền xám hơn nền trắng. Sau khi tách nền, ghép element vào layer `bg` (đã là ảnh workspace tối) trong Remotion — object tự nổi bật đúng như ý, không cần đổi màu nền lúc generate.

Sau khi user tải ảnh về `images/`, chạy xoá nền trắng để có PNG trong suốt:

```bash
python3 scripts/remove_white_bg.py images/scene-01-face.png public/generated/scene-01-face.png
# hoặc batch cả thư mục:
python3 scripts/remove_white_bg.py images/*-bg.png images/*.png --out-dir public/generated
```

Lưu ý: chỉ chạy script này cho ảnh element (nền trắng cần xoá), KHÔNG chạy cho ảnh `-bg.png` (ảnh nền full-frame giữ nguyên, không xoá gì).

Ghi các layer này vào `scenes[].layers` theo đúng thứ tự thị giác (bg trước, element theo depth tăng dần), mỗi element set `kind: "element"` kèm `x`/`y`/`width` (%) đặt tay theo bố cục — xem `paper-cut-style-guide.md` mục 2.

## 2c. Prompt cho scene infographic/bản đồ tổng quan (1 ảnh ghép sẵn, không tách lớp)

Dùng cho scene dạng tổng quan/quy trình/chuỗi cung ứng — nơi cả bố cục (bản đồ/nền + nhiều icon + đường route nối) cần nhìn như 1 khối hoàn chỉnh ngay, KHÔNG cần từng phần tự rung độc lập như mục 2b. Chỉ chọn cách này khi scene chủ yếu đứng yên/parallax nhẹ cả khối; nếu cần từng icon rung riêng thì vẫn tách lớp theo mục 2b như bình thường.

Công thức prompt (điền theo thứ tự, mỗi phần 1-2 câu):
1. **Mở đầu định dạng + phong cách**: `A detailed infographic in the Vox paper cutout animation style, using layered paper textures and drop shadows, on a dark gray textured background.`
2. **Nền/tài liệu trung tâm**: mô tả bản đồ/tài liệu chính, vd `A central, vintage, crinkled paper world map with faded tan tone [#E8D9B5].`
3. **Element** (đổi theo topic — đây là phần duy nhất cần viết lại mỗi lần): liệt kê 3-5 vật thể/icon paper-cutout đặc trưng cho chủ đề, nối bằng route.
4. **Typography/tiêu đề**: `Below/at the bottom center, a title '[TIÊU ĐỀ VIẾT HOA]' in a bold white serif font on a yellow rectangular paper strip [#F2C14E].`
5. **Câu hoàn thiện**: `All elements have realistic paper textures and soft drop shadows, diffused even studio lighting, top-down perspective as if laid out on a table.`

Ví dụ đầy đủ (chủ đề năng lượng tái tạo):
```
A detailed, informative infographic and world map, created in the Vox paper cutout animation style. The background is a dark gray textured surface, serving as a workspace for layered paper elements. The central focus is a vintage, crinkled paper world map. Red dashed thread lines connect several major global cities, marked with small, hand-drawn white paper tags. In the bottom center, a prominent title, "THE GLOBAL RENEWABLE ENERGY SHIFT", is displayed in a bold, white serif font on a yellow rectangular paper strip. Surrounding the map are various illustrated paper cutout elements: a wind turbine, a solar panel field, a battery storage unit, and an electric car, all with the same textured, hand-sketched, and drop-shadowed appearance. Black arrow cutouts link these elements in a flow, showing the energy lifecycle. The entire scene has a tactile, layered quality with soft, realistic shadows under every paper piece, and diffused, even studio lighting. The perspective is top-down, capturing the collage as if laid out on a table.
```

Đổi element theo topic — chỉ sửa phần 3, giữ nguyên phần 1/2/4/5:
- Chuỗi vi mạch: `Connected by dashed red lines are small paper cutouts of a silicon wafer, a semiconductor fabrication plant, and a finished smartphone.`
- Khai thác mỏ: `Cutout illustrations of a heavy-duty mining truck, a processing facility, and metal ingots are placed around the map, connected by black arrows.`

Palette nền tối `#2B2B2B`–`#3A3A3A` cho workspace, dải tiêu đề `#F2C14E` chữ trắng — đã có sẵn trong palette dự án (`paper-cut-style-guide.md` mục 6), không cần định nghĩa màu mới.

Route/thread/mũi tên trong loại prompt này bake sẵn trong ảnh generated (không tách layer riêng) — xem ghi chú ngoại lệ ở `paper-cut-style-guide.md` mục 4 "Đường kẻ kết nối".

## 3. Cập nhật scenes.json

Sau mỗi lần lấy được asset (Pexels hoặc Gemini), cập nhật ngay object scene tương ứng, không gom lại làm 1 lần cuối — tránh mất dấu asset nào ứng với scene nào khi số lượng scene lớn.

```json
{
  "id": "scene-04",
  "voText": "...",
  "startFrame": 210,
  "durationInFrames": 96,
  "visualPrompt": "...",
  "visualType": "generated-image",
  "visualPath": "public/generated/scene-04.png",
  "layers": [
    { "src": "public/generated/scene-04-bg.png", "depth": 0, "baseRotationDeg": -1.5 },
    { "src": "public/generated/scene-04-fg.png", "depth": 2, "baseRotationDeg": 2 }
  ]
}
```

Nếu 1 scene cần nhiều layer paper-cut (background/foreground riêng để parallax), sinh prompt Gemini riêng cho từng layer (nền và chủ thể tách nhau — dễ hơn nếu prompt yêu cầu Gemini xuất ảnh có nền trong suốt/đơn giản để tự tách layer thủ công, hoặc tách bằng công cụ remove-background sau khi tải về).
