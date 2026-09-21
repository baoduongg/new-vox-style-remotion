---
name: horror-storytelling-video-engine
description: >-
  Full pipeline để sản xuất video kể chuyện audio / YouTube Horror Storytelling / Chuyện Ma Đêm Khuya & Kinh Dị (nghệ thuật dẫn chuyện rùng rợn, không khí u ám ma mị, visual minh họa kinh dị bán thực/dark fantasy atmospheric, ánh sáng âm u, âm thanh ambient rợn gáy, jumpscare & slow burn suspense, subtitle đậm nét ma quái) — từ lên ý tưởng truyện kinh dị/chuyện ma dân gian/urban legends/tâm lý ám ảnh, viết kịch bản tự sự góc nhìn thứ nhất, visual sourcing (Gemini prompts sinh ảnh kinh dị nhất quán, ảnh thumbnail card + background, ảnh cover shorts, chống bong bóng thoại AI), đến scaffold Remotion độc lập, render Thumbnail Studio và render video. LUÔN dùng skill này khi user nói "làm video truyện ma", "làm video chuyện ma", "làm video kinh dị", "kể chuyện audio kinh dị", "chuyện ma đêm khuya", "creepypasta", "urban legends", hoặc muốn làm video kể chuyện âm thanh rùng rợn kết hợp minh họa điện ảnh u ám.
---

# Horror Storytelling Video Engine (Audio Horror & Chuyện Ma Đêm Khuya)

Pipeline sản xuất video YouTube & Shorts thể loại **Kể Chuyện Audio Kinh Dị / Chuyện Ma Đêm Khuya / Creepypasta / Bí Ẩn Tâm Linh & Đô Thị** theo phong cách **Dark Semi-Realistic Horror & Eerie Atmospheric Digital Art** (nét vẽ điện ảnh u ám, ánh sáng tương phản Chiaroscuro ma mị, sương mù thể tích, âm thanh ambient rợn gáy, thumbnail vòm cuốn hút và phụ đề to rõ ràng).

Định dạng hỗ trợ:
- **16:9 (Widescreen)**: Video YouTube dài (5 – 20 phút), trải nghiệm rùng rợn lắng đọng đêm khuya.
- **9:16 (Vertical)**: YouTube Shorts / TikTok / Reels (45 – 90 giây), nhịp độ dồn dập, giật gân, cuốn hút tức thì.

---

## ⚡ ENGINE SINH CHỦ ĐỀ KINH DỊ & KIỂM TRA CHỐNG TRÙNG LẶP

Khi người dùng yêu cầu gợi ý chủ đề mới:

1. **BẮT BUỘC ĐỌC LỊCH SỬ**: Đọc `references/topic-history.md` để lấy danh sách các câu chuyện đã sản xuất $\rightarrow$ Tuyệt đối không đề xuất lại kịch bản hoặc môtíp đã làm.
2. **SINH ĐỘNG 3-5 CHỦ ĐỀ MỚI**: Áp dụng **Framework 5 Trụ Cột Kinh Dị Audio** (tham chiếu tại `references/horror-topics.md`) để tạo ra các câu chuyện đánh thẳng vào tâm lý tò mò, sợ hãi bản năng và lạnh sống lưng của người nghe.
3. **LƯU NHẬT KÝ NGAY KHI DUYỆT**: Khi người dùng chọn 1 topic, lập tức thêm một dòng mới vào bảng trong `references/topic-history.md` với trạng thái `[IN_PROGRESS]`.

### 🎯 Công thức đặt câu hỏi chủ đề chuẩn:
> `[Bối cảnh / Thời gian đêm muộn] + [Hành động tưởng chừng bình thường / Cấm kỵ] + [Hiện tượng dị thường / Cú twist rợn tóc gáy]?`

---

### 💡 5 Trụ Cột Kinh Dị Audio (Dynamic Horror Pillars):
- **🚕 Trụ cột 1: Chuyện Ma Đô Thị & Nghề Nghiệp Đêm Muộn** (Tài xế taxi nhận khách lúc 3h sáng, ca trực đêm cửa hàng tiện lợi, bảo vệ tuần tra tầng hầm để xe, bác sĩ ca cấp cứu...).
- **🕯️ Trụ cột 2: Chuyện Ma Dân Gian & Nghi Thức Cấm Kỵ** (Hèm tục kiêng cữ cổ truyền, mở rương gỗ niêm phong, trò chơi trốn tìm nửa đêm Hitori Kakurenbo, đám cưới ma...).
- **🧠 Trụ cột 3: Kinh Dị Tâm Lý & Ảo Giác Điên Loạn** (Bản sao song trùng Doppelgänger, chiếc gương soi phản chiếu chậm 1 giây, phòng kín ngột ngạt, giấc mơ lặp lại...).
- **🏚️ Trụ cột 4: Địa Điểm Bị Nguyền Rủa & Nhà Hoang** (Khách sạn phòng 404 ven đèo, căn nhà trọ giá rẻ bất thường, bệnh viện bỏ hoang, trường học ban đêm...).
- **📱 Trụ cột 5: Creepypasta Kỹ Thuật Số & Hiện Tượng Dị Thường** (Tần số sóng radio lạ trên xe ô tô, đoạn ghi âm bí ẩn trong ứng dụng theo dõi giấc ngủ, camera chuông cửa thông minh...).

> Danh sách case study mẫu và phân tích chi tiết xem tại: `references/horror-topics.md`.
> Nhật ký các topic đã duyệt / đã sản xuất xem tại: `references/topic-history.md`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Xác Định & Đồng Nhất Ngôn Ngữ Dự Án (Strict Language & Text-in-Picture Rule)
- **Xác định ngay từ bước đầu tiên**:
  - Đối với kênh nội địa/chuyện ma Việt Nam: **Tiếng Việt (`vi`)** với văn phong tự sự tự nhiên, giàu cảm xúc rùng mình ("Tôi", "Người ta bảo rằng...", "Lẽ ra đêm đó tôi không nên...", "Một luồng khí lạnh buốt...").
  - Đối với kênh Global/Reddit NoSleep/Creepypasta: **Tiếng Anh (`en`)** ("I was working the late night shift...", "Never answer the door at 3 AM...", "The reflection in my mirror wasn't me...").
- **Lời thoại & Subtitles**: Toàn bộ kịch bản tự sự, file text TTS và `scenes.json` phải đồng nhất 100% theo ngôn ngữ đã chọn.
- **Văn bản trong hình ảnh (Text-in-Picture)**: **BẮT BUỘC ĐỒNG NHẤT 100% VỚI NGÔN NGỮ VIDEO**:
  - Khi video là **Tiếng Việt (`vi`)**: Mọi văn bản trên đạo cụ (biển hiệu phòng, đèn led thang máy, tin nhắn điện thoại) **bắt buộc ghi rõ chữ tiếng Việt có dấu**.
  - Khi video là **Tiếng Anh (`en`)**: Mọi văn bản trên đạo cụ **bắt buộc ghi rõ chữ tiếng Anh**.
  - **CẤM TUYỆT ĐỐI**: Video tiếng Việt nhưng để text-in-picture tiếng Anh hoặc ngược lại.
- **Chống Chữ Vô Nghĩa (Anti-Gibberish Protocol)**: Nối **Master Anti-Gibberish Suffix** vào cuối mọi prompt (xem `references/visual-sourcing.md`) và chạy bước QC kiểm tra ảnh tại `references/retention-qc.md`.

### 2. Dự Án Độc Lập 100% (Project Isolation Rule)
- Mỗi video mới **BẮT BUỘC nằm trong một folder project độc lập riêng biệt** đặt tên theo topic (kebab-case, ví dụ: `horror-elevator-basement-b3/`, `horror-midnight-taxi-passenger/`).
- Tự chứa đầy đủ `package.json`, `remotion.config.ts`, `tsconfig.json`, `src/`, `public/`, `scenes.json`, `prompt.json`, `prompts_gemini.md`, `voText_<lang>.md`, `voText_<lang>.txt`, `metadata.md`, `metadata_shorts.md`.

### 3. Visual DNA Chuẩn Dark Atmospheric Horror
- **Cấu trúc prompt Gemini**: Bắt đầu bằng:
  `Cinematic dark horror illustration, eerie graphic novel semi-realistic digital art style, heavy atmospheric shadows, dark moody chiaroscuro lighting, desaturated color palette with eerie cold teal and deep black tones, subtle film grain texture.`
- **Kết thúc MỌI prompt bằng suffix chống chữ rác**:
  `Cinematic horror artwork only, no speech bubbles, no dialogue text balloons, no comic sound captions, no floating labels, no watermarks. Do not render any text except the exact quoted string(s) specified in the prompt; if no text was specified, the image must contain zero readable text or lettering.`
- **Trọn gói Prompting 1 Lần**: Luôn sinh đủ Prompt cho `Scene 0..N-1`, `Thumbnail Card (thumb_card.jpg)`, `Thumbnail BG (thumb_bg.jpg)` và `Shorts Cover 9:16 (shorts_cover.png)` ngay từ đầu.

### 4. Pacing 4-6s & Slow Creep Camera Motion
- Mỗi đoạn kịch bản 20-30s bẻ thành **4 đến 6 shots hình ảnh liên tục** (mỗi shot kéo dài **4 đến 6 giây** / 120-180 frames).
- Kết hợp chuyển động máy quay bò chậm rùng rợn (`slow-zoom-in`, `slow-zoom-out`, `creep-pan-left`, `creep-pan-right`) trong component `HorrorScene.tsx`.
- Tích hợp **Smart Image Fallback** về `0.png` để preview luôn ổn định.

### 5. Bố Cục Video, Subtitles & Watermark Avatar Kênh
- **Subtitles nổi bật**: Subtitle to, đậm nét, viền đen dày (`-2.5px 2.5px 0 #050508`), đặt tại 1/6 phía dưới màn hình với padding hai bên an toàn (`padding: 0 190px`) để không bị đè lên watermark hoặc dính sát mép.
- **Channel Watermark (BẮT BUỘC)**: Tự động copy `avatar_horror_channel.png` từ skill resources vào thư mục `public/` và `public/assets/` khi scaffold project. Hiển thị avatar tròn cố định ở góc dưới bên phải (`bottom: 40px, right: 40px`, đường kính 125px).
- **Thương hiệu kênh chuẩn**: Sử dụng nhãn nhận diện **"CHUYỆN MA AUDIO"** trên thumbnail và badge kênh.

---

## 🚀 QUY TRÌNH 8 BƯỚC CHUẨN TỐI ƯU (Streamlined 8-Step Pipeline)

```
0. Xác Định Ngôn Ngữ → 1. Chọn Topic Kinh Dị → 2. Kịch Bản Audio Storytelling
   (Mặc định: VI hoặc EN) (horror-topics.md)     (voText_<lang>.md & .txt)
        ↓
3. Scene Breakdown (4-6s) → 4. Trọn Bộ Visual Prompts (Scenes + Thumb Card + Thumb BG + Shorts)
   (timing + 35-50 shots)      (prompts_gemini.md & prompt.json)
        ↓
5. Scaffold Standalone Project → 6. Master Audio & Voiceover Sync
   (Copy mascot avatar + Remotion)   (silencedetect + ambient horror BGM)
        ↓
7. Render Thumbnail & Xuất Metadata → 8. QC, Preview Studio & Render
   (npm run thumbnail + metadata.md)     (Studio & MP4 export)
```

---

### Bước 0: Xác Định Ngôn Ngữ Dự Án (Language Setup)
- Xác định ngôn ngữ mục tiêu: **Tiếng Việt (`vi`)** hoặc **Tiếng Anh (`en`)**.
- Toàn bộ kịch bản, lời thoại, phụ đề và text trên đồ vật trong ảnh tuân thủ ngôn ngữ này.

---

### Bước 1-2: Ý Tưởng + Kịch Bản Audio Storytelling Kinh Dị (Horror Storytelling Engine)
- **Kiểm tra chống trùng**: Đọc `references/topic-history.md` $\rightarrow$ sinh 3-5 ý tưởng mới dựa trên `references/horror-topics.md`.
- **Ghi log khi duyệt**: Ngay khi user chọn 1 topic, ghi 1 dòng mới vào `references/topic-history.md` (`[IN_PROGRESS]`).
- **Viết kịch bản theo chuẩn Slow Burn to Terror 4 giai đoạn** (Đọc chi tiết tại `references/script-writing.md`):
  1. Mở đầu lạnh gáy (Hook 30-45s) $\rightarrow$ 2. Điềm báo leo thang (70%) $\rightarrow$ 3. Cao trào giáp mặt kinh hoàng & Cú twist (15%) $\rightarrow$ 4. Kết thúc & Dư ba ám ảnh (10-15%).
- **Xuất bản 2 file bắt buộc**:
  - `<topic-folder>/voText_<lang>.txt`: Text Voiceover sạch 100% cho TTS engine.
  - `<topic-folder>/voText_<lang>.md`: Kịch bản phân cảnh chi tiết có Visual Tags, Mood, Shot Notes.

---

### Bước 3: Scene Breakdown & Timing (Pacing 4-6s)
- Bẻ kịch bản thành **35 - 50 shots** (mỗi shot từ 4 - 6 giây).
- Tạo `<topic-folder>/scenes.json` chứa thông tin chi tiết:
  `startFrame`, `durationInFrames`, `title`, `voText`, `imageSrc`, `cameraMotion`, `mood`, `isJumpscare`.

---

### Bước 4: Visual Sourcing & Trọn Bộ Prompts Gemini 1 Lần Duy Nhất
- Đọc `references/visual-sourcing.md` và `references/horror-style-guide.md`.
- Thiết lập **Character & Entity Consistency Anchor**.
- Xuất đầy đủ prompt vào `<topic-folder>/prompt.json` và `<topic-folder>/prompts_gemini.md` bao gồm:
  - `Thumbnail Character Card (thumb_card.jpg)`
  - `Thumbnail Background (thumb_bg.jpg)`
  - `Shorts Cover 9:16 (shorts_cover.png)`
  - `Scene 0 (0.png)` đến `Scene N-1 ((N-1).png)`

---

### Bước 5: Scaffold Standalone Project & Sao Chép Watermark
- Đọc `references/remotion-scaffold.md`.
- Tạo folder độc lập `<topic-folder>/` với cấu trúc chuẩn Remotion 4.x:
  `package.json`, `tsconfig.json`, `remotion.config.ts`, `src/types.ts`, `src/Root.tsx`, `src/index.ts`, `src/index.css`, `src/components/HorrorScene.tsx`, `src/components/SubtitleOverlay.tsx`, `src/components/DarkAtmosphere.tsx`, `src/components/JumpscareFlash.tsx`, `src/components/ChannelWatermark.tsx`, `src/components/Thumbnail.tsx`.
- **TỰ ĐỘNG SAO CHÉP WATERMARK KÊNH**:
  ```bash
  cp .agents/skills/horror-storytelling-video-engine/resources/avatar_horror_channel.png <topic-folder>/public/
  cp .agents/skills/horror-storytelling-video-engine/resources/avatar_horror_channel.png <topic-folder>/public/assets/
  ```
- Chạy `npm install` bên trong folder video.

---

### Bước 6: Master Audio & Khớp Âm Thanh Ma Quái
- Đọc `references/sound-design.md` và `references/voiceover-tts.md`.
- Nạp file voiceover (`full-scene.mp3`), phân tích khoảng lặng:
  ```bash
  ffmpeg -i public/audio/scenes/full-scene.mp3 -af silencedetect=noise=-28dB:d=0.35 -f null -
  ```
- Khớp điểm chuyển scene chuẩn xác vào khoảng lặng giữa các câu.
- **Trước khi coi bước này là xong**: chạy đủ Critical Sync Checklist tại `references/remotion-scaffold.md` Mục 6 (tên file ảnh, đuôi file audio khớp Root.tsx, và — với video >15 scenes — ưu tiên ASR word-level alignment thay vì chỉ dựa silencedetect để tránh lệch timing).

---

### Bước 7: Render Thumbnail Studio & Xuất Trọn Gói Metadata (Dài + Shorts)
- Đọc `references/metadata.md`.
- **Render Thumbnail High-CTR**:
  ```bash
  npm run thumbnail
  # hoặc: npx remotion still src/index.ts Thumbnail out/thumbnail.jpg --overwrite
  ```
- **Tự động xuất trọn gói 7 phần** vào `<topic-folder>/metadata.md` và `<topic-folder>/metadata_shorts.md`:
  - Tiêu đề YouTube chính + 4 phương án A/B testing.
  - Mô tả chuẩn SEO có đầy đủ Timestamps/Chapters.
  - Bộ tags SEO YouTube dài phân tách dấu phẩy.
  - Bài viết Facebook/Community post.
  - Bộ Metadata Shorts 9:16: Tiêu đề <60 ký tự (Zero-Part rule), Hook 0-3s, Caption & Hashtags, Timestamps ảnh bìa, Prompt bìa dọc 9:16, Pinned Comment, và Tags SEO Shorts.

---

### Bước 8: QC, Preview Studio & Render Xuất Bản
- Đọc `references/retention-qc.md`.
- Chạy typecheck: `npx tsc --noEmit`.
- Mở preview Remotion Studio: `npm run dev` (`http://localhost:3000`).
- Xuất bản video:
  - Video 16:9: `npm run render` ra `out/video.mp4`.
  - Video 9:16: `npm run render-shorts` ra `out/shorts.mp4`.
- Cập nhật trạng thái `[COMPLETED]` trong `references/topic-history.md`.
