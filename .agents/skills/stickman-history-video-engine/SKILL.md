---
name: stickman-history-video-engine
description: >-
  Full pipeline để sản xuất video YouTube phong cách Stickman 2D Animated Explainer & Documentary (hoạt họa người que 2D vector tối giản, biểu cảm phong phú, sơ đồ mặt cắt khoa học, giải thích trực quan các chủ đề: Khoa học/Y học, Tài chính/Kinh tế, Tâm lý học/Thói quen, Công nghệ/AI, Sinh tồn/What-If, và Lịch sử cổ đại) — từ lên ý tưởng, viết kịch bản, visual sourcing (Gemini prompts/SVG stickman), đến scaffold và ráp Remotion. LUÔN dùng skill này khi user nói "làm video stickman", "video người que", "làm video giải thích kiểu Kurzgesagt / AsapSCIENCE / Psych2Go / Casually Explained / OverSimplified / Before Civilization", "video what-if", hoặc muốn làm video kiến thức giải thích trực quan bằng người que.
---

# Stickman Universal Video Engine (Science, Finance, Psychology, Tech, Survival & History)

Pipeline sản xuất video YouTube phong cách **Stickman 2D Vector Animated Explainer** (tham chiếu: *Kurzgesagt*, *AsapSCIENCE*, *Psych2Go*, *Casually Explained*, *OverSimplified*, *Before Civilization*). Định dạng: **16:9** (YouTube dài, 8-15 phút) hoặc **9:16** (Shorts).

---

## ⚡ ENGINE SINH CHỦ ĐỀ ĐỘNG THEO 6 PHÂN HỆ

Khi người dùng yêu cầu gợi ý chủ đề mới:

1. **ĐỌC LỊCH SỬ CHỐNG TRÙNG**: Đọc `references/topic-history.md` $\rightarrow$ Tuyệt đối không đề xuất lại chủ đề đã sản xuất.
2. **SINH ĐỘNG 3-5 CHỦ ĐỀ MỚI THEO 6 PHÂN HỆ** (tham chiếu chi tiết tại `references/topics.md`):
   - 🔬 **Khoa Học & Y Học**: Cơ thể thiếu ngủ 7 ngày, hệ miễn dịch đánh virus, cà phê & não bộ.
   - 💰 **Tài Chính & Kinh Tế**: Bẫy lạm phát tiền mất giá, kỳ quan lãi kép, bong bóng tài sản.
   - 🧠 **Tâm Lý Học & Thói Quen**: Cạm bẫy trì hoãn & vòng lặp Dopamine, hiệu ứng Dunning-Kruger.
   - 🤖 **Công Nghệ & AI**: Mạng nơ-ron AI học thế nào, cáp quang ngầm đáy biển, Blockchain.
   - 🚨 **Sinh Tồn & What-If**: Thang máy đứt cáp rơi tự do, Trái Đất ngừng quay 5 giây.
   - 🏛️ **Lịch Sử & Văn Minh Cổ Đại**: Bê tông La Mã tự liền, kéo đá kim tự tháp, hòn đá mặt trời Viking.
3. **LƯU NHẬT KÝ NGAY KHI DUYỆT**: Ghi topic đã chọn vào `references/topic-history.md` với trạng thái `[IN_PROGRESS]`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Xác Định Ngôn Ngữ Dự Án (Default: English)
- Mặc định là **Tiếng Anh (English)** nếu người dùng không yêu cầu ngôn ngữ khác.
- Toàn bộ kịch bản thoại (`voText_<lang>.md`), văn bản nhãn sơ đồ trong prompt AI và thumbnail phải đồng bộ 100% theo ngôn ngữ đã chọn.

### 2. Dự Án Độc Lập 100% (Project Isolation Rule)
- Mỗi video mới nằm trong một thư mục riêng biệt (kebab-case, ví dụ: `dopamine-loop/`, `roman-concrete/`).
- Tự chứa đầy đủ: `package.json`, `tsconfig.json`, `remotion.config.ts`, `src/`, `public/assets/scenes/`, `scenes.json`, `prompt.json`, `metadata.md`.

### 3. Visual DNA 2D Vector Cartoon Phổ Quát
- Bắt đầu prompt bằng: `Clean 2D vector cartoon animated documentary style illustration, in the style of Kurzgesagt and OverSimplified.`
- Nhân vật: Người que đầu tròn trắng viền đen dày (`bold black vector outlines`), trang phục linh hoạt theo ngành nghề (bác sĩ, doanh nhân, coder, người đời thường, chiến binh cổ đại).
- **CẤM DÙNG**: `photorealistic, 3D render, dark grunge, textured parchment, tea-stained`.

### 4. Tối Ưu Giữ Chân Người Xem (Pacing 5-8s & Kinetic Subtitle)
- Mỗi đoạn thoại 20-30s bẻ thành **2-4 shots hình ảnh** (mỗi shot kéo dài **5 đến 8 giây**).
- Tích hợp `AnimatedSubtitle.tsx` (highlight từ khóa vàng/cam) và `ImageScene.tsx` với Smart Fallback.

### 5. Thiết Kế Âm Thanh Thuần Khiết (Master Continuous Audio)
- Ưu tiên Voiceover Master liền mạch (`full-scene.mp3`). Sử dụng `ffmpeg silencedetect` để bắt chính xác khoảng lặng tự nhiên làm điểm chuyển shot.
- Nhạc nền BGM Ambient nhẹ nhàng (-20dB), SFX đồ họa tinh tế (`whoosh`, `pop`, `shutter`), không chèn âm meme gây loãng video.

### 6. Channel Mascot Watermark
- Hiển thị duy nhất avatar tròn Mascot (`avatar_stickman_channel.jpg`, đường kính 150px, viền kim loại vàng kim) ở góc phải dưới (`bottom: 60px, right: 40px`, `zIndex: 999`).
- **File avatar chưa có sẵn trong repo skill** — trước bước Scaffold, tạo/lấy file `avatar_stickman_channel.jpg` rồi copy vào `<topic-folder>/public/` (theo mẫu `horror-storytelling-video-engine/resources/` + Bước 5 của skill đó). Dùng chung avatar với `stickman-storytelling-video-engine` nếu cùng kênh.

---

## 🚀 QUY TRÌNH 8 BƯỚC SẢN XUẤT CHUẨN

```
0. Xác Định Ngôn Ngữ → 1. Chọn Chủ Đề (6 Phân Hệ) → 2. Viết Kịch Bản 5 Phần
   (Default: English)      (topics.md)            (script-writing.md)
        ↓
3. Scene Breakdown (5-8s) → 4. Visual Prompts (Đúng Ngôn Ngữ Nhãn Sơ Đồ)
   (timing + 40-55 shots)      (visual-sourcing.md + stickman-style-guide.md)
        ↓
5. Scaffold Standalone Project → 6. Master Audio & Sync Silencedetect
   (remotion-scaffold.md)           (sound-design.md)
        ↓
7. Tạo High-CTR Thumbnail 2D Vector (Quy tắc 1-1-4 & Rule 3 Giây) → 8. QC, Preview Studio & Render
   (metadata.md - 1 Nhân vật + 1 Va chạm + Text ≤ 4 từ)                 (retention-qc.md - A/B Titles)
```

### Bước 0: Xác Định Ngôn Ngữ & Tỷ Lệ Khung Hình
- Mặc định **Tiếng Anh (English)** nếu người dùng không yêu cầu ngôn ngữ khác. Xác định tỷ lệ: `16:9` (dài 8-15 phút) hoặc `9:16` (Shorts).
- Toàn bộ kịch bản thoại (`voText_<lang>.md`), văn bản nhãn sơ đồ trong prompt AI và thumbnail phải đồng bộ 100% theo ngôn ngữ đã chọn.

### Bước 1: Chọn Chủ Đề (6 Phân Hệ)
- Đọc `references/topic-history.md` chống trùng, đề xuất 3-5 ý tưởng theo 6 phân hệ tại `references/topics.md` (Khoa Học & Y Học, Tài Chính & Kinh Tế, Tâm Lý Học & Thói Quen, Công Nghệ & AI, Sinh Tồn & What-If, Lịch Sử & Văn Minh Cổ Đại). Lưu trạng thái `[IN_PROGRESS]` khi duyệt.

### Bước 2: Viết Kịch Bản 5 Phần
- Đọc `references/script-writing.md`. Viết kịch bản giải thích trực quan, rõ ràng, có nhịp hook mở đầu và kết luận đọng lại bài học. Lưu vào `voText_<lang>.md`.

### Bước 3: Scene Breakdown & Timing (Pacing 5-8s)
- Bẻ kịch bản thành **40-55 shots** (mỗi shot 5-8 giây). Tạo `scenes.json` với đầy đủ `startFrame`, `durationInFrames`, `voText`, `imageSrc`.

### Bước 4: Visual Prompts (Đúng Ngôn Ngữ Nhãn Sơ Đồ)
- Đọc `references/visual-sourcing.md` và `references/stickman-style-guide.md`. Áp dụng Visual DNA 2D Vector Cartoon Phổ Quát (Mục 3 ở trên) cho từng scene, đảm bảo nhãn/chữ trong sơ đồ khớp ngôn ngữ dự án.
- Xuất `prompt.json` và `prompts_gemini.md` cho user tự tạo ảnh, lưu vào `public/assets/scenes/` (`0.png` ... `N-1.png`).

### Bước 5: Scaffold Standalone Project Remotion
- Đọc `references/remotion-scaffold.md`. Khởi tạo project Remotion độc lập với `Root.tsx`, `ImageScene.tsx`, `AnimatedSubtitle.tsx`, `ChannelWatermark.tsx`.
- Copy file avatar mascot vào `<topic-folder>/public/` (xem Mục 6 ở trên — file chưa có sẵn, cần tạo/lấy trước).

### Bước 6: Master Audio & Sync Silencedetect
- Đọc `references/sound-design.md`. Tạo voiceover master liền mạch (`full-scene.mp3`), chạy `ffmpeg silencedetect` để tinh chỉnh điểm chuyển shot theo khoảng lặng tự nhiên.
- Với video >15 scenes, ưu tiên ASR word-level alignment (`faster-whisper` + `difflib.SequenceMatcher`, xem `stickman-storytelling-video-engine/references/remotion-scaffold.md` Mục 5.C) thay vì chỉ dựa silencedetect, để tránh timing lệch pha giữa các scene.

### Bước 7: Tạo Thumbnail 2D Vector High-CTR (Rule 3 Giây trên Mobile & Chuẩn 1-1-4)
- Đọc `references/metadata.md`.
- Áp dụng **Quy tắc 1-1-4 (1 Nhân Vật + 1 Điểm Va Chạm/Xung Đột + Text ≤ 4 Từ)**:
  1. **Nhân vật (Ở giữa)**: Stickman biểu cảm cực sốc (mắt tròn xoe O_O há hốc mồm, toát mồ hôi).
  2. **Điểm va chạm / Đối đầu**: Kiếm chạm khiên gãy đôi tóe lửa; tảng muối phát sáng giữa bãi chiến trường tối; kim tự tháp sụp đổ kèm mũi tên đỏ dốc đứng.
  3. **Text Thumbnail (≤ 3-4 từ)**: In hoa font chữ Sans-Serif dày dặn, màu vàng chanh hoặc đỏ viền đen đậm (`IT SHATTERS?!`, `DEADLIER THAN GOLD`, `3,000 YEARS COLLAPSED`).
- Sinh prompt và xuất file thumbnail 16:9 lưu vào `<topic-folder>/out/thumbnail.jpg` và `public/thumbnail.jpg`.

### Bước 8: QC, Preview Studio & Xuất Bản Render
- Đọc `references/retention-qc.md` và `references/metadata.md`.
- Viết tiêu đề kích thích tò mò theo **3 Công Thức High-CTR** (tránh 100% các từ cấm `Real Physics`, `The ENTIRE History`, `Part X`), cung cấp sẵn **2 phương án A/B Test Title** (Option A & Option B), mô tả SEO và tags vào `<topic-folder>/metadata.md`.
- Chạy typecheck `npx tsc --noEmit`.
- Mở preview Remotion Studio: `npm run dev` (`http://localhost:3000`).
- Xuất bản video: `npm run render` ra folder `out/`.
