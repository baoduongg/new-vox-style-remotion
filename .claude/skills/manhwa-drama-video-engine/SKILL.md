---
name: manhwa-drama-video-engine
description: Full pipeline để sản xuất video kể chuyện bằng hình ảnh / YouTube Drama Storytelling phong cách Webtoon Manhwa Hàn Quốc (nhân vật manhwa trau chuốt, bối cảnh đô thị hiện đại Seoul / công sở / nhà hàng / quán ăn, phân cảnh kịch tính, lật mặt cú twist, split-screen tương phản, subtitle đậm nét) — từ lên ý tưởng drama/tâm sự đời sống, viết kịch bản tự sự góc nhìn thứ nhất, visual sourcing (Gemini prompts sinh ảnh Manhwa nhất quán nhân vật, ánh sáng chuyển biến tâm lý), đến scaffold Remotion và render. LUÔN dùng skill này khi user nói "làm video kể chuyện manhwa", "làm video tâm sự đời sống", "kể chuyện bằng hình ảnh", "video phong cách webtoon", "video bóc phốt drama", hoặc muốn làm video confession tình cảm/xã hội kịch tính kết hợp đồ họa truyện tranh Hàn Quốc.
---

# Manhwa Drama Video Engine (Korean Webtoon Storytelling)

Pipeline sản xuất video YouTube & Shorts thể loại **Kể Chuyện Bằng Hình Ảnh / Drama Tâm Sự Đời Sống / Cạm Bẫy Kim Tiền & Tình Cảm / Cú Twist Nhân Sinh** theo phong cách **Modern Korean Manhwa / Webtoon 2D Art Style** (nét vẽ digital sắc sảo, nhân vật chuẩn K-Drama, ánh sáng chuyển biến theo tâm lý nhân vật, đồ họa minh họa bằng chứng trực quan và phụ đề to rõ ràng).

Định dạng hỗ trợ:
- **16:9 (Widescreen)**: Video YouTube dài (5 – 12 phút), trải nghiệm điện ảnh sâu sắc.
- **9:16 (Vertical)**: YouTube Shorts / TikTok / Reels (45 – 90 giây), nhịp độ dồn dập, giật gân, cuốn hút tức thì.

---

## ⚡ ENGINE SINH CHỦ ĐỀ DRAMA & KIỂM TRA CHỐNG TRÙNG LẶP

Khi người dùng yêu cầu gợi ý chủ đề mới:

1. **BẮT BUỘC ĐỌC LỊCH SỬ**: Đọc `references/topic-history.md` để lấy danh sách các câu chuyện đã sản xuất $\rightarrow$ Tuyệt đối không đề xuất lại kịch bản hoặc môtíp đã làm.
2. **SINH ĐỘNG 3-5 CHỦ ĐỀ MỚI**: Áp dụng **Framework 4 Trụ Cột Drama Đời Sống** (tham chiếu tại `references/drama-topics.md`) để tạo ra các câu chuyện đánh thẳng vào tâm lý tò mò, phẫn nộ, đồng cảm và bất ngờ của người xem.
3. **LƯU NHẬT KÝ NGAY KHI DUYỆT**: Khi người dùng chọn 1 topic, lập tức thêm một dòng mới vào bảng trong `references/topic-history.md` với trạng thái `[IN_PROGRESS]`.

### 🎯 Công thức đặt câu hỏi chủ đề chuẩn:
> `[Khởi đầu tưởng như hoàn hảo/hạnh phúc ngút ngàn] + [Dấu hiệu bất thường nhỏ] + [Cú twist lật tẩy bản chất / sự thật gây sốc]?`

---

### 💡 4 Trụ Cột Drama Đời Sống (Dynamic Drama Pillars):
- **💔 Trụ cột 1: Tình Cảm, Đào Mỏ & Thao Túng Tâm Lý** (Bạn trai/bạn gái hoàn hảo như tổng tài nhưng thực chất là thợ săn mồi, bẫy nợ tín dụng, người yêu 2 mặt, hôn phu bí mật chuẩn bị kết hôn với người khác...).
- **🏢 Trụ cột 2: Công Sở, Đấu Đá Quyền Lực & Cướp Đoạt Công Sức** (Sếp giả tạo nhận hết thành tích, đồng nghiệp thân thiết đâm sau lưng, cạm bẫy hợp đồng nô lệ, màn phục thù ngoạn mục của nhân viên thực tập...).
- **🏡 Trụ cột 3: Gia Đình, Thừa Kế & Mâu Thuẫn Thế Hệ** (Cuộc chiến chia tài sản ngầm, mẹ chồng nàng dâu bề ngoài ngọt ngào nhưng âm mưu chiếm đoạt căn nhà, con nuôi và bí mật bản di chúc...).
- **🏙️ Trụ cột 4: Đô Thị, Cạm Bẫy Kim Tiền & Bạn Bè Giả Tạo** (Chủ tịch giả nghèo thử lòng bạn thân, bữa tiệc xa hoa của giới thượng lưu rởm, cạm bẫy đa cấp/đầu tư đội lốt nhóm bạn cùng tiến...).

> Danh sách case study mẫu và phân tích chi tiết xem tại: `references/drama-topics.md`.
> Nhật ký các topic đã duyệt / đã sản xuất xem tại: `references/topic-history.md`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Xác Định & Đồng Nhất Ngôn Ngữ Dự Án (Strict Language & Text-in-Picture Unification Rule)
- **Xác định ngay từ bước đầu tiên**:
  - Đối với kênh nội địa/tâm sự Việt Nam: **Tiếng Việt (`vi`)** với văn phong tự sự tự nhiên, giàu cảm xúc ("Tôi", "Em", "Anh ấy", "Cứ ngỡ là...", "Hóa ra...").
  - Đối với kênh Global/Reddit Stories/Webtoon Drama: **Tiếng Anh (`en`)** ("I thought he was the one...", "Little did I know...", "Turns out it was all a scheme...").
  - Đối với kênh K-Drama/썰툰/Hàn Quốc: **Tiếng Hàn (`ko`)** với văn phong tự sự bản xứ ("~습니다", "~더라고요", "~인 줄 알았습니다", "충격적인 진실").
- **Lời thoại (Voiceover/voText & Subtitles)**: Toàn bộ kịch bản tự sự, file text TTS và `scenes.json` phải đồng nhất 100% theo ngôn ngữ đã chọn.
- **Văn bản trong hình ảnh (Text-in-Picture / In-Image Props / Signage)**: **BẮT BUỘC ĐỒNG NHẤT 100% VỚI NGÔN NGỮ VIDEO**:
  - Khi video là **Tiếng Hàn (`ko`)**: Mọi đồ vật có chữ (sổ tiết kiệm `주택청약종합저축`, thiệp cưới `청첩장`, tin nhắn, hóa đơn, biển hiệu, tài liệu pháp lý `소송 서류`, thông báo số dư) **bắt buộc ghi rõ chữ Hangul tương ứng** trong prompt Gemini.
  - Khi video là **Tiếng Việt (`vi`)**: Mọi văn bản trên đạo cụ (hóa đơn `HÓA ĐƠN MUA HÀNG`, sổ tiết kiệm, tin nhắn, thiệp cưới) **bắt buộc ghi rõ chữ tiếng Việt có dấu**.
  - Khi video là **Tiếng Anh (`en`)**: Mọi văn bản trên đạo cụ **bắt buộc ghi rõ chữ tiếng Anh**.
  - **CẤM TUYỆT ĐỐI**: Video tiếng Hàn nhưng prompt lại để text-in-picture bằng tiếng Anh/Việt, hoặc video tiếng Việt nhưng để text-in-picture tiếng Anh. Mọi prompt sinh ảnh có chữ phải chỉ định chuỗi ký tự chính xác bằng ngôn ngữ của video.

### 2. Dự Án Độc Lập 100% (Project Isolation Rule)
- **Mỗi video mới tạo ra BẮT BUỘC nằm trong một folder project độc lập riêng biệt** đặt tên theo topic (kebab-case, ví dụ: `manhwa-gold-digger-boyfriend/`, `manhwa-office-betrayal/`, `manhwa-fake-billionaire/`).
- **TUYỆT ĐỐI KHÔNG** chèn code hay assets vào folder của các dự án khác.
- **Mỗi folder video mới phải là một Remotion project độc lập**, tự chứa:
  - `package.json`, `remotion.config.ts`, `tsconfig.json`
  - `src/` (`Root.tsx`, `index.ts`, `index.css`, `components/`, `scenes/`)
  - `public/assets/scenes/` (`0.png` ... `N-1.png`), `public/audio/scenes/` & `public/audio/sfx/`
  - `scenes.json`, `prompt.json`, `prompts_gemini.md`, `voText_<lang>.md`, `voText_<lang>.txt`, `metadata.md`.

### 3. Visual DNA Chuẩn Manhwa Webtoon 2D (Korean Manhwa Aesthetic)
- **Cấu trúc prompt Gemini**: Bắt đầu bằng:
  `Clean 2D modern Korean manhwa romance drama webtoon anime art style illustration, sharp digital line art, semi-realistic anime aesthetics, rich emotional atmosphere.`
- **Nhân vật & Trang phục**:
  - Nam chính/Nhân vật nam: Kiểu tóc rẽ ngôi nam tính K-Drama, áo khoác măng tô dạ (trench coat), áo len cổ lọ (turtleneck) hoặc suit lịch lãm.
  - Nữ chính/Nhân vật nữ: Tóc uốn sóng dài mềm mại, áo len dệt kim thanh lịch, chân váy trang nhã, biểu cảm tinh tế (mắt sáng hạnh phúc $\rightarrow$ nghi ngờ bất an $\rightarrow$ rơi nước mắt bàng hoàng).
- **Ánh sáng & Phối màu theo nhịp cảm xúc**:
  - *Hạnh phúc*: Ánh hoàng hôn ấm áp (warm golden glow), màu pastel ngọt ngào, đèn phố lung linh.
  - *Nghi ngờ / Giông bão*: Tone xanh lạnh mờ ảo (cool teal/navy tones), ánh sáng neon lạnh lẽo, bóng đổ u ám.
  - *Lật mặt / Twist*: Nửa sáng nửa tối, nụ cười nham hiểm giấu dưới bóng râm, hiệu ứng nứt vỡ (broken glass shards).
- **Vật chứng trực quan (Floating Evidence Props)**: Luôn chèn các bằng chứng thực tế nổi bật trong khung hình (hóa đơn thanh toán, bảng sao kê thẻ tín dụng, điện thoại hiển thị tin nhắn ngoại tình...).

### 4. Pacing 4-6s Giữ Chân Người Xem Tối Đa
- Mỗi đoạn kịch bản 20-30s bẻ thành **4 đến 6 shots hình ảnh liên tục** (mỗi shot kéo dài **4 đến 6 giây** / 120-180 frames).
- Đa dạng góc máy: Toàn cảnh hẹn hò $\rightarrow$ Trung cảnh đối thoại $\rightarrow$ Cận cảnh biểu cảm mắt/miệng $\rightarrow$ Cận cảnh vật chứng $\rightarrow$ Split-screen 2 mặt tương phản.
- Tích hợp **Smart Image Fallback** trong component `ImageScene.tsx` để preview luôn ổn định.

### 5. Thiết Kế Âm Thanh Chuyển Tone Cảm Xúc (Emotional Soundtrack Dynamics)
- **Giai đoạn 1 (0:00 - 1:00)**: Nhạc Acoustic / Piano lãng mạn nhẹ nhàng.
- **Giai đoạn 2 (1:00 - 2:30)**: Nhạc đệm ngắt quãng, thêm tiếng bass ngầm (subtle dark cello/suspense pad).
- **Giai đoạn 3 (2:30 - Kết thúc)**: Tiếng vỡ (glass shatter hit) khi phát hiện sự thật $\rightarrow$ Nhạc kịch tính dồn dập (dramatic cinematic strings) $\rightarrow$ Nhạc sâu lắng khi kết bài học nhân sinh.
- Sử dụng `ffmpeg silencedetect` để khớp từng frame chuyển cảnh theo nhịp thở tự nhiên của giọng đọc.

### 6. Bố Cục Video, Subtitles & Watermark
- **Subtitles nổi bật**: Subtitle to, đậm nét, viền đen dày (`text-shadow` hoặc `-webkit-text-stroke: 2px black`), đặt tại 1/6 phía dưới màn hình để người xem nắm bắt câu chuyện ngay cả khi tắt tiếng.
- **Channel Watermark**: Avatar tròn tối giản ở góc phải trên hoặc phải dưới (`bottom: 32px, right: 36px`), không che khuất biểu cảm nhân vật.

---

## 🚀 QUY TRÌNH 8 BƯỚC CHUẨN (8-Step Full Production Pipeline)

```
0. Xác Định Ngôn Ngữ → 1. Chọn Topic Drama → 2. Kịch Bản Tự Sự 5 Hồi
   (Mặc định: VI hoặc EN)  (drama-topics.md)      (voText_<lang>.md)
        ↓
3. Scene Breakdown (4-6s) → 4. Visual Sourcing & Prompts (Manhwa DNA)
   (timing + 35-50 shots)      (Character Sheet + Emotional Lighting)
        ↓
5. Scaffold Standalone Project → 6. Master Audio & Voiceover Sync
   (Remotion isolated folder)        (silencedetect + emotional BGM)
        ↓
7. Tạo High-CTR Split Thumbnail → 8. QC, Preview Studio & Render
   (Dual-Face Contrast Formula)        (Studio & MP4 export)
```

---

### Bước 0: Xác Định Ngôn Ngữ Dự Án (Language Setup)
- Xác định ngôn ngữ mục tiêu: **Tiếng Việt (`vi`)** hoặc **Tiếng Anh (`en`)**.
- Toàn bộ kịch bản, lời thoại, phụ đề và text trên đồ vật trong ảnh sẽ tuân thủ ngôn ngữ này.

---

### Bước 1-2: Ý Tưởng + Kịch Bản Tự Sự 5 Hồi (5-Act Narrative Arc)
- **Kiểm tra chống trùng**: Đọc `references/topic-history.md` $\rightarrow$ sinh 3-5 ý tưởng mới dựa trên `references/drama-topics.md`.
- **Ghi log khi duyệt**: Ngay khi user chọn 1 topic, ghi 1 dòng mới vào `references/topic-history.md` (`[IN_PROGRESS]`).
- **Viết kịch bản theo chuẩn 5 hồi** (Đọc `references/script-writing.md`):
  1. **Hồi 1: Chiếc Bẫy Hoàn Hảo (The Golden Illusion)** (0:00 - 0:45): Cuộc gặp gỡ định mệnh, người yêu/đối tác hoàn hảo không tì vết.
  2. **Hồi 2: Gợn Sóng Đầu Tiên (The Ignored Red Flag)** (0:45 - 2:00): Những chi tiết bất thường nhỏ (cuộc gọi lạ lén lút, thói quen giấu điện thoại, sự thay đổi ánh mắt).
  3. **Hồi 3: Cú Sốc Tang Chứng (The Shocking Discovery)** (2:00 - 4:00): Vô tình phát hiện bằng chứng không thể chối cãi (hóa đơn, sao kê, tin nhắn, bắt quả tang).
  4. **Hồi 4: Hạ Màn & Lật Mặt (The Unmasking & Confrontation)** (4:00 - 6:30): Bộ mặt thật lộ diện, thái độ thay đổi 180 độ, sự thật tàn nhẫn đằng sau.
  5. **Hồi 5: Thức Tỉnh & Quả Báo (Awakening & Karma Payoff)** (6:30 - 8:00): Bài học đắt giá, sự trừng phạt thích đáng cho kẻ lừa dối, lời cảnh tỉnh sâu sắc.
- Xuất thành `<topic-folder>/voText_<lang>.md` và `<topic-folder>/voText_<lang>.txt`.

---

### Bước 3: Scene Breakdown & Timing (Pacing 4-6s)
- Bẻ kịch bản thành **35 - 50 shots** (mỗi shot từ 4 - 6 giây).
- Tạo `<topic-folder>/scenes.json` chứa thông tin chi tiết:
  `startFrame`, `durationInFrames`, `title`, `voText`, `imageSrc`, `cameraMotion`, `mood`.

---

### Bước 4: Visual Sourcing & Prompt Gemini Khóa Phong Cách
- Đọc `references/visual-sourcing.md` và `references/manhwa-style-guide.md`.
- Thiết lập **Character Consistency Anchor**: Xác định diện mạo nhân vật (tóc, dáng mặt, trang phục) và đưa vào mọi prompt liên quan đến nhân vật đó.
- Tạo prompt chi tiết cho từng scene: Bắt đầu bằng tiền tố Manhwa, mô tả bối cảnh đô thị, ánh sáng cảm xúc, hành động và góc máy.
- Xuất danh sách vào `<topic-folder>/prompt.json` và `<topic-folder>/prompts_gemini.md`.
- Khi user nạp ảnh vào `public/assets/scenes/` (`0.png` -> `N-1.png`), tích hợp vào Remotion.

---

### Bước 5: Scaffold Standalone Project
- Đọc `references/remotion-scaffold.md`.
- Tạo folder độc lập `<topic-folder>/` với cấu trúc chuẩn Remotion 4.x:
  `package.json`, `tsconfig.json`, `remotion.config.ts`, `src/Root.tsx`, `src/index.ts`, `src/index.css`, `src/components/ManhwaScene.tsx`, `src/components/SubtitleOverlay.tsx`, `src/components/SplitScreenReveal.tsx`.
- Chạy `npm install` bên trong folder video.

---

### Bước 6: Master Audio & Khớp Âm Thanh Cảm Xúc
- Đọc `references/sound-design.md`.
- Nạp file voiceover (`full-scene.mp3`), phân tích khoảng lặng:
  ```bash
  ffmpeg -i public/audio/scenes/full-scene.mp3 -af silencedetect=noise=-28dB:d=0.35 -f null -
  ```
- Khớp điểm chuyển scene chuẩn xác vào khoảng lặng giữa các câu.
- Lồng nhạc nền chuyển tiếp từ lãng mạn sang giật gân, thêm SFX tại điểm nhấn (tiếng chuông tin nhắn, tiếng rơi đồ, tiếng kính vỡ).

---

### Bước 7: Tạo Thumbnail High-CTR Manhwa Split-Face
- Đọc `references/metadata.md`.
- **Công thức Thumbnail Split Face Cực Kỳ Hút Click**:
  - **Nửa Trái**: Nụ cười rạng rỡ, ấm áp, ánh sáng thiên thần (bạn trai lý tưởng / người bạn thân thiết).
  - **Nửa Phải**: Gương mặt tối sầm, nụ cười nửa miệng nham hiểm, mắt sắc lạnh, đường nứt vỡ rạn nứt như kính vỡ vụn.
  - **Text Tiêu Đề Giật Gân**: Dưới 6 từ, màu vàng/trắng viền đỏ đậm (Ví dụ: `HÓA RA LÀ ĐÀO MỎ!`, `BẪY TÌNH TRIỆU ĐÔ!`, `BỘ MẶT THẬT CỦA ANH ẤY!`).
- Xuất file thumbnail vào `<topic-folder>/out/thumbnail.jpg` và `<topic-folder>/public/thumbnail.jpg`.

---

### Bước 8: QC, Preview Studio & Render
- Đọc `references/retention-qc.md` và `references/metadata.md`.
- Chạy typecheck `npx tsc --noEmit`.
- Mở preview Remotion Studio: `npm run dev` (`http://localhost:3000`).
- Xuất bản video hoàn chỉnh: `npm run render` ra thư mục `out/`.
- Tạo tiêu đề câu view tâm sự, mô tả kịch tính và tags vào `<topic-folder>/metadata.md`.
