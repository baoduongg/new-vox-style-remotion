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

Khi scene cần ảnh generated, tạo prompt theo template sau, điền theo `visualPrompt` của scene + palette đã chọn (xem `paper-cut-style-guide.md` mục 5):

```
Paper cut craft illustration, layered paper art style, [MÔ TẢ CHỦ THỂ CỦA SCENE].
Color palette: warm kraft paper background [#F4EDE1], accent colors [#C1553D, #3E5C4F].
Visible torn paper edges, soft drop shadows between layers indicating depth,
slightly imperfect hand-cut edges, flat design with subtle paper texture grain,
no photorealistic rendering, no 3D render — pure paper craft diorama look.
Aspect ratio: [16:9 hoặc 9:16].
```

- `[MÔ TẢ CHỦ THỂ CỦA SCENE]` lấy trực tiếp từ `visualPrompt` trong `scenes.json`.
- Thay vì chỉ in prompt ra chat, ghi toàn bộ prompt của các scene cần generated-image vào file `prompt.json` ở root project, format:

```json
{
  "scene-01.png": {
    "prompt": "Paper cut craft illustration, ..."
  },
  "scene-02.png": {
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

Sau khi user tải ảnh về `images/`, chạy xoá nền trắng để có PNG trong suốt:

```bash
python3 scripts/remove_white_bg.py images/scene-01-face.png public/generated/scene-01-face.png
# hoặc batch cả thư mục:
python3 scripts/remove_white_bg.py images/*-bg.png images/*.png --out-dir public/generated
```

Lưu ý: chỉ chạy script này cho ảnh element (nền trắng cần xoá), KHÔNG chạy cho ảnh `-bg.png` (ảnh nền full-frame giữ nguyên, không xoá gì).

Ghi các layer này vào `scenes[].layers` theo đúng thứ tự thị giác (bg trước, element theo depth tăng dần), mỗi element set `kind: "element"` kèm `x`/`y`/`width` (%) đặt tay theo bố cục — xem `paper-cut-style-guide.md` mục 2.

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
