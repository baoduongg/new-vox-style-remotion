---
name: stickman-history-video-engine
description: Full pipeline để sản xuất video YouTube phong cách Stickman History Documentary / Ancient Survival (hoạt họa người que tối giản trên nền giấy da cổ/parchment, sơ đồ mặt cắt khoa học, bản đồ hải trình, giải mã nghịch lý lịch sử/sinh tồn của người Viking và các nền văn minh cổ đại) — từ lên ý tưởng, viết kịch bản, visual sourcing (Gemini prompts/SVG stickman/Pexels), đến scaffold và ráp Remotion. LUÔN dùng skill này khi user nói "làm video stickman lịch sử", "làm video viking", "chủ đề video người viking", "làm video kiểu Ancient World Uncovered / Before Civilization", "video giải mã sinh tồn thời cổ đại", hoặc muốn làm video kiến thức lịch sử có tính giải trí cao kết hợp đồ họa khoa học trực quan.
---

# Stickman History Video Engine (Viking & Ancient Survival)

Pipeline sản xuất video YouTube chủ đề lịch sử, khảo cổ học, nhân chủng học và giải mã bí ẩn sinh tồn thời cổ đại — **đặc biệt chuyên sâu về Thời Đại Viking (Viking Age, 793 – 1066 CN)** — theo phong cách **Stickman Animated Documentary** (tham chiếu: *Ancient World Uncovered*, *Before Civilization*). Định dạng: **16:9** (YouTube dài, 8-15 phút) hoặc **9:16** (Shorts tóm tắt nghịch lý).

---

## ⚡ ENGINE SINH CHỦ ĐỀ ĐỘNG & KIỂM TRA CHỐNG TRÙNG LẶP

Khi người dùng yêu cầu gợi ý chủ đề mới:

1. **BẮT BUỘC ĐỌC LỊCH SỬ**: Đọc `references/topic-history.md` để lấy danh sách các topic đã sản xuất $\rightarrow$ Tuyệt đối không đề xuất lại chủ đề hoặc cơ chế đã làm.
2. **SINH ĐỘNG 3-5 CHỦ ĐỀ MỚI**: Áp dụng **Framework "Vấn Đề Hiện Đại $\rightarrow$ Giải Pháp Viking"** (tham chiếu công thức và các case study mẫu tại `references/viking-topics.md`) để sinh động các ý tưởng mới toanh đánh vào các nỗi đau thiết thực của người xem hiện đại.
3. **LƯU NHẬT KÝ NGAY KHI DUYỆT**: Khi người dùng chọn 1 topic, lập tức thêm một dòng mới vào bảng trong `references/topic-history.md` với trạng thái `[IN_PROGRESS]`.

### 🎯 Công thức đặt câu hỏi chủ đề chuẩn:
> `[Vấn đề nan giải ở thời hiện đại] + [Người Viking đã xử lý như thế nào mà không cần công nghệ hiện đại]?`

---

### 💡 4 Trụ Cột Đời Sống Để Sinh Ý Tưởng Động (Dynamic Ideation Pillars):
- **🏃 Trụ cột 1: Thể Lực, Sức Khỏe & Y Học Thường Nhật** (Đau lưng do ngồi nhiều, kiệt sức, mất ngủ mùa đông, vi khuẩn kháng thuốc, rụng tóc / da liễu do hóa chất...).
- **🥩 Trụ cột 2: Dinh Dưỡng, Ăn Uống & Bảo Quản Không Điện** (Mất điện hỏng thực phẩm, chất bảo quản công nghiệp, viêm loét dạ dày, say rượu nôn nao, thiếu vi chất...).
- **🏠 Trụ cột 3: Nhà Ở, Năng Lượng & Thiết Bị Sinh Tồn** (Hóa đơn tiền điện/sưởi đắt đỏ, áo mưa rách nát / vi nhựa, mất sóng GPS, bão lũ ngập úng, lọc nước ngọt...).
- **👥 Trụ cột 4: Quản Trị Đội Ngũ, Xã Hội & Tài Chính** (Quản lý nhân sự khó bảo, mâu thuẫn tranh chấp đất đai / hợp đồng, lạm phát mất giá tiền, stress & khủng hoảng tâm lý...).

> Danh sách case study mẫu và phân tích 4 lớp khoa học xem tại: `references/viking-topics.md`.
> Nhật ký các topic đã duyệt / đã sản xuất xem tại: `references/topic-history.md`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Xác Định Ngôn Ngữ Dự Án (Language Specification Rule - Default: English)
- **Mặc định là Tiếng Anh (English)** nếu người dùng không yêu cầu ngôn ngữ khác.
- **Xác định ngay từ bước đầu tiên** (trước khi viết kịch bản và sinh prompt):
  - **Lời thoại (Voiceover/voText)**: Toàn bộ kịch bản, lời thuyết minh và `scenes.json` phải được viết bằng đúng ngôn ngữ đã xác định.
  - **Văn bản trong ảnh (In-Image Text & Labels)**: Nếu hình ảnh có chứa tiêu đề, nhãn sơ đồ (diagram labels), thước đo, thông số khoa học hoặc chữ viết minh họa thì **BẮT BUỘC phải dùng đúng ngôn ngữ đã chọn** (ví dụ: Tiếng Anh cho kênh Global/English, Tiếng Việt cho kênh Việt Nam).
  - **Prompt mô tả cho AI (Gemini/Imagen)**: Thân prompt mô tả bối cảnh/nghệ thuật vẫn viết bằng tiếng Anh để mô hình hiểu chính xác nhất, nhưng câu lệnh ràng buộc văn bản hiển thị trong ảnh phải chỉ định rõ ngôn ngữ mục tiêu.

### 2. Dự Án Độc Lập 100% (Project Isolation Rule)
- **Mỗi video mới tạo ra BẮT BUỘC nằm trong một folder project độc lập riêng biệt** đặt tên theo topic (kebab-case, ví dụ: `viking-sunstone-navigation/`, `viking-freezing-seas/`, `viking-ulfberht-sword/`, `viking-onion-soup/`).
- **TUYỆT ĐỐI KHÔNG** chèn code, assets hay composition của video mới vào folder của các channel/dự án khác (như `paper-cut-channel`, v.v.).
- **Mỗi folder video mới phải là một Remotion project độc lập**, tự chứa:
  - `package.json` (đồng bộ phiên bản `@remotion/cli`, `remotion`, `@remotion/sfx`, `react`, `react-dom`)
  - `remotion.config.ts`, `tsconfig.json`
  - `src/` (`Root.tsx`, `index.ts`, `index.css`, `components/`, `scenes/`)
  - `public/assets/scenes/` (`0.png` ... `N-1.png`), `public/audio/scenes/` & `public/audio/sfx/`
  - `scenes.json`, `prompt.json`, `prompts_gemini.md`, `voText_<lang>.md`, `voText_<lang>.txt`, `metadata.md`.

### 3. Chuẩn Prompt & Phong Cách 2D Vector Hoạt Hình (2D Vector Cartoon DNA)
- **Cấu trúc prompt Gemini**: Bắt đầu bằng `Clean 2D vector cartoon animated documentary style illustration, in the style of Ancient World Uncovered and Before Civilization.`
- **Nhân vật**: Nhân vật stickman đầu tròn trắng (hoặc da ngăm nâu đối với người tiền sử / có râu tóc Viking), viền đen dày dặn sắc nét (`bold black vector outlines`), biểu cảm mắt miệng phong phú (mắt thâm quầng khi kiệt sức, to tròn khi hoảng sợ, đổ mồ hôi, há miệng `D:`).
- **Bối cảnh & Đồ họa**: Bối cảnh hoạt hình 2D sống động, tươi sáng (bầu trời xanh, savan vàng, biển đêm bão tuyết xanh đậm, lửa trại cam rực rỡ), kết hợp đổ bóng cel-shading 2 tone mượt mà.
- **Chữ viết trong ảnh theo đúng ngôn ngữ đã chọn**:
  - *Nếu là Tiếng Anh (Mặc định)*:
    > `All visible text, labels, infographics, and diagram annotations must be strictly in clear English typography with Latin alphabet only, absolutely no Runic, Arabic, Old Norse, or illegible script, 16:9 widescreen.`
  - *Nếu là Tiếng Việt*:
    > `All visible text, headers, and diagram labels must be strictly in clear Vietnamese typography with correct diacritics (Latin alphabet only), 16:9 widescreen.`
  - *Nếu là ngôn ngữ khác*: Tương tự chỉ định rõ `in clear [Language] typography with [Target Script] only`.

### 4. Tối Ưu Giữ Chân Người Xem (Retention & Fast Pacing 5-8s)
- **Quy tắc chuyển ảnh 5-8s**: Mỗi đoạn kịch bản 20-30s phải được bẻ nhỏ thành **2 đến 4 shots hình ảnh** (mỗi shot kéo dài **5 đến 8 giây** / 150-250 frames). Tuyệt đối không để 1 ảnh tĩnh hiển thị quá 10 giây gây nhàm chán.
- **Smart Image Fallback**: Component `ImageScene.tsx` luôn tích hợp cơ chế fallback về ảnh gốc của nhóm (`Math.floor((shotIndex * totalBase) / totalShots)`) để Remotion Studio luôn preview mượt mà ngay cả khi ảnh chưa tạo đủ.

### 5. Thiết Kế Âm Thanh Thuần Khiết (Clean Voiceover Audio)
- **Tập trung vào Voiceover**: Ưu tiên giữ đường tiếng đọc Voiceover liền mạch, rõ ràng, không chèn các âm thanh meme hoặc SFX lặp đi lặp lại làm giảm trải nghiệm của người xem.
- **Cắt chuyển cảnh chuẩn xác**: Dùng `ffmpeg silencedetect` để xác định chính xác các khoảng lặng tự nhiên giữa các câu đọc.

### 6. Nhận Diện Kênh & Bố Cục Hình Ảnh (Channel Watermark & Cinematic Motion)
- **Channel Avatar Watermark**: Hiển thị DUY NHẤT avatar tròn của kênh (`avatar_stickman_channel.jpg`, đường kính 64px, viền vàng kim `2.5px solid rgba(255, 215, 0, 0.85)` và bóng đổ điện ảnh `box-shadow`) cố định ở góc phải dưới (`bottom: 32px, right: 36px`) trên layer cao nhất (`zIndex: 999`) xuyên suốt toàn bộ video. **TUYỆT ĐỐI KHÔNG chèn thêm text tên kênh hay thanh nền** để giữ bố cục video tối giản, sang trọng và không che khuất nội dung hình ảnh.
- **Hiệu ứng Camera Điện Ảnh**: Luân phiên 6 hướng camera Ken Burns (`zoom-in`, `zoom-out`, `pan-left`, `pan-right`, `zoom-in-tilt`, `pan-up`) kết hợp rung nhẹ tự nhiên (`camera breathing`) và mờ chuyển cảnh nhẹ nhàng (4 frames fade-in).

---

## Quy Trình 8 Bước Chuẩn (8-Step Full Production Pipeline)

```
0. Xác Định Ngôn Ngữ → 1. Chọn Topic Viking → 2. Kịch bản Theo Ngôn Ngữ
   (Mặc định: English)    (viking-topics.md)      (voText_<lang>.md)
        ↓
3. Scene Breakdown (5-8s) → 4. Visual Sourcing (In-Image Text đúng Ngôn Ngữ)
   (timing + 45-55 shots)      (Gemini Prompts + Language constraint)
        ↓
5. Scaffold Standalone Project → 6. Master Audio (Voiceover)
   (Remotion isolated folder)        (silencedetect + sync)
        ↓
7. Tạo Thumbnail High-CTR (Đúng Ngôn Ngữ) → 8. QC, Preview & Render
   (2D Vector Contrast)                        (Studio & MP4 export)
```

---

### Bước 0: Xác Định Ngôn Ngữ Dự Án (Language Setup)
- Mặc định: **Tiếng Anh (English)**.
- Nếu người dùng yêu cầu ngôn ngữ khác (ví dụ: Tiếng Việt, Español...), ghi nhận mã ngôn ngữ mục tiêu (`en`, `vi`, `es`...).
- Mọi nội dung thoại, nhãn sơ đồ, chữ trong ảnh prompt và thumbnail sẽ tuân thủ 100% ngôn ngữ này.

---

### Bước 1-2: Ý tưởng + Kịch bản Thoại Theo Ngôn Ngữ Đã Chọn
- **Kiểm tra chống trùng**: Đọc `references/topic-history.md` $\rightarrow$ sinh động 3-5 ý tưởng mới theo 4 trụ cột đời sống dựa trên `references/viking-topics.md`.
- **Ghi log khi duyệt**: Ngay khi user duyệt chọn 1 topic, ghi 1 dòng mới vào `references/topic-history.md` (`[IN_PROGRESS]`).
- **Viết kịch bản theo đúng ngôn ngữ đã chọn**: Đọc `references/script-writing.md` để viết kịch bản 5 phần chuẩn:
  1. **The Paradox Hook**: Đặt ra vấn đề nan giải thời hiện đại $\rightarrow$ nghịch lý người Viking xử lý mà không cần công nghệ hiện đại.
  2. **The Threat Physics**: Phân tích điều kiện khắc nghiệt của Bắc Cực / hải trình / chiến trận.
  3. **The 4-Layer System**: Bóc tách 4 tầng giải pháp của người Viking (Vật liệu $\rightarrow$ Sinh học $\rightarrow$ Kỹ thuật $\rightarrow$ Kỷ luật).
  4. **Experimental Proof**: Bằng chứng khảo cổ học (Oseberg, Gokstad, L'Anse aux Meadows, Ulfberht...) & tái hiện thực nghiệm.
  5. **The Mindset Payoff**: Đúc kết bài học thích nghi cho con người thời nay.
- Xuất thành `<topic-folder>/voText_<lang>.md` và `<topic-folder>/voText_<lang>.txt` (ví dụ: `voText_en.md`, `voText_vi.md`).

---

### Bước 3: Scene Breakdown & Timing (Pacing 5-8s)
- Bẻ nhỏ kịch bản thành **45 - 55 shots chuyển động liên tục** (mỗi shot 5 - 8 giây).
- Tạo `<topic-folder>/scenes.json` chứa `voText` theo ngôn ngữ đã chọn (kèm theo `scenes_<lang>.json` tương ứng nếu có song ngữ).
- Ghi rõ `startFrame`, `durationInFrames`, `title`, `voText`, `imageSrc`, và `sfxList: []`.

---

### Bước 4: Visual Sourcing & Prompt Gemini (Đúng Ngôn Ngữ Văn Bản Trong Ảnh)
- Đọc `references/visual-sourcing.md` và `references/stickman-style-guide.md`.
- Tạo prompt cho từng phân cảnh, khóa chặt Visual DNA hoạt hình 2D vector, stickman đầu tròn trắng viền đen đậm, màu sắc tươi sáng và cel-shading 2 tone.
- **Ràng buộc ngôn ngữ trong ảnh**: Nếu ảnh có chứa text/nhãn/tiêu đề, phải đặt văn bản đó bằng đúng ngôn ngữ đã chọn (tiếng Anh nếu chọn EN, tiếng Việt có dấu chuẩn nếu chọn VI).
- Xuất danh sách prompt vào `<topic-folder>/prompt.json` và `<topic-folder>/prompts_gemini.md`.
- Khi user nạp ảnh vào `public/assets/scenes/` (`0.png` -> `N-1.png`), tích hợp ngay vào Remotion.

---

### Bước 5: Scaffold Standalone Project
- Đọc `references/remotion-scaffold.md`.
- Tạo folder độc lập `<topic-folder>/` với `package.json`, `tsconfig.json`, `remotion.config.ts`, `src/Root.tsx`, `src/index.ts`, `src/index.css`.
- Cài đặt **Channel Avatar Watermark** chỉ hiển thị duy nhất avatar tròn Mascot (`avatar_stickman_channel.jpg`) ở góc phải dưới (`bottom: 32px, right: 36px`), không kèm text tên kênh.
- Tích hợp **Smart Image Fallback** trong `ImageScene.tsx`.
- Chạy `npm install` bên trong folder video.

---

### Bước 6: Master Audio & Khớp Âm Thanh Chính Xác
- Đọc `references/sound-design.md`.
- Nạp file voiceover đọc liền mạch (`full-scene.mp3` / `full-scene.wav`), chạy phân tích khoảng lặng bằng ffmpeg:
  ```bash
  ffmpeg -i public/audio/scenes/full-scene.mp3 -af silencedetect=noise=-28dB:d=0.4 -f null -
  ```
- Cập nhật frame chuyển cảnh khớp chính xác vào các khoảng lặng. Giữ âm thanh voiceover thuần khiết không có SFX gây nhiễu.

---

### Bước 7: Tạo Thumbnail YouTube Đột Phá Tương Phản (High-CTR Thumbnail Theo Ngôn Ngữ)
- Đọc `references/metadata.md`.
- Áp dụng công thức 3 điểm chạm thị giác cực mạnh với text tiêu đề/nhãn bằng **đúng ngôn ngữ đã chọn**:
  1. **Bên Trái**: Nghịch cảnh / Thất bại / Công nghệ yếu kém với dấu **X Đỏ To** (ví dụ EN: *1,100°C CRUDE IRON BENT*, VI: *1,100°C SẮT THÔ BỊ CONG*).
  2. **Bên Phải**: Kỳ tích / Đỉnh cao kỹ nghệ với **Ánh Vàng Rực Rỡ** (ví dụ EN: *1,500°C PURE STEEL: 800 YRS AHEAD!*, VI: *1,500°C THÉP TINH KHIẾT: VƯỢT 800 NĂM!*).
  3. **Ở Giữa**: Stickman Viking đầu tròn biểu cảm shock tột độ (mắt tròn xoe, há hốc miệng) cầm thước đo / công cụ bốc khói.
- Sinh prompt và xuất file ảnh thumbnail 16:9 lưu vào `<topic-folder>/out/thumbnail.jpg` và `<topic-folder>/public/thumbnail.jpg`.

---

### Bước 8: QC, Preview Studio & Xuất Bản Render
- Đọc `references/retention-qc.md` và `references/metadata.md`.
- Chạy typecheck `npx tsc --noEmit`.
- Mở preview Remotion Studio: `npm run dev` (`http://localhost:3000`).
- Xuất bản video: `npm run render` ra folder `out/`.
- Viết tiêu đề nghịch lý, mô tả SEO và tags vào `<topic-folder>/metadata.md` bằng đúng ngôn ngữ đã chọn.
