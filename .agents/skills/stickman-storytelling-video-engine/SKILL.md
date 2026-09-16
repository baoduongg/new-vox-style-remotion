---
name: stickman-storytelling-video-engine
description: >-
  Full pipeline để sản xuất video YouTube phong cách Stickman Storytelling / Narrative Animation (hoạt họa người que 2D sống động, giàu cảm xúc và kịch tính, chuyên về các chủ đề GẦN GŨI ĐỜI SỐNG, THỰC TẾ & THỜI SỰ: bẫy công nghệ số/AI/deepfake, bẫy tài chính cá nhân/nâng cấp lối sống, nỗi đau công sở/kiệt sức/tự động hóa ngầm, tâm lý học hành vi đời thường, và các đại án kinh tế/startup công nghệ hiện đại) — từ lên ý tưởng, viết kịch bản 5 hồi kịch tính, visual sourcing (Gemini prompts biểu cảm/SVG stickman/Pexels), đến scaffold và ráp dự án Remotion độc lập. LUÔN dùng skill này khi user nói "làm video stickman kể chuyện", "kể chuyện người que", "kịch bản storytelling hoạt hình", "video kiểu OverSimplified / Brew / MagnatesMedia / TED-Ed Story", hoặc muốn làm video kể chuyện lôi cuốn, thực tế, gần gũi và thời sự kết hợp đồ họa 2D bắt mắt.
---

# Stickman Storytelling Video Engine (Practical, Relatable & Topical Narratives)

Pipeline sản xuất video YouTube chuyên về **Kể Chuyện Hoạt Họa 2D Người Que Thực Tế & Thời Sự (2D Stickman Storytelling / Modern Real-Life Narratives)** — khai thác những vấn đề **gần gũi nhất với đời sống hiện đại, mang tính thời sự nóng hổi và đánh trúng tâm lý người xem** (bẫy Dopamine mạng xã hội, bẫy nợ tiêu dùng, bẫy thăng tiến công sở, các vụ lừa đảo AI/Deepfake tinh vi, các đại án khởi nghiệp công nghệ chấn động) — theo phong cách **2D Vector Animated Storytelling** (tham chiếu: *Brew*, *MagnatesMedia*, *Better Than Yesterday*, *Casually Explained*, *Thoughty2*, *OverSimplified*). Định dạng: **16:9** (YouTube dài 8-15 phút) hoặc **9:16** (Shorts tóm tắt cao trào 60s).

---

## ⚡ ENGINE SINH CỐT TRUYỆN ĐỘNG & KIỂM TRA CHỐNG TRÙNG LẶP

Khi người dùng yêu cầu gợi ý câu chuyện / chủ đề mới:

1. **BẮT BUỘC ĐỌC LỊCH SỬ**: Đọc `references/topic-history.md` để kiểm tra danh sách các câu chuyện đã làm $\rightarrow$ Tuyệt đối không đề xuất lại cốt truyện hoặc đề tài đã thực hiện.
2. **TIÊU CHÍ GỢI Ý CỐT LÕI (3 NGUYÊN TẮC VÀNG)**:
   - **Gần gũi (Relatable)**: Người xem thấy chính mình, bạn bè hoặc đồng nghiệp trong đó (thói quen lướt điện thoại, áp lực tiền bạc, công việc văn phòng, mối quan hệ).
   - **Thực tế (Practical / Actionable)**: Câu chuyện người thật việc thật thời hiện đại, các thí nghiệm tâm lý có thể kiểm chứng, bẫy cuộc sống mà ai cũng có thể vướng phải.
   - **Thời sự (Topical / Contemporary)**: Bắt kịp các biến động xã hội nóng bỏng (AI, Deepfake, bong bóng tài chính, xu hướng làm việc từ xa, văn hóa kiệt sức, mạng xã hội).
3. **SINH ĐỘNG 3-5 CÂU CHUYỆN MỚI**: Áp dụng **5 Trụ Cột Đề Tài Thời Sự & Thực Tế** (tham chiếu chi tiết tại `references/story-topics.md`) để đưa ra các đề xuất sắc bén, kích thích tò mò tột độ.
4. **LƯU NHẬT KÝ NGAY KHI DUYỆT**: Khi người dùng chọn 1 câu chuyện, lập tức ghi một dòng mới vào bảng trong `references/topic-history.md` với trạng thái `[IN_PROGRESS]`.

### 🎯 3 Công Thức Đặt Câu Hỏi Hook Thực Tế & Thời Sự Triệu View:
- **Dạng 1 (The Modern Life Trap - Bẫy Cuộc Sống Hiện Đại)**: `[Làm thế nào một thói quen / trào lưu tưởng chừng vô hại hàng ngày] + [lại đang âm thầm hủy hoại tài chính / não bộ / sự nghiệp của hàng triệu người]?`
- **Dạng 2 (The Shocking Contemporary Con - Đại Án Thời Sự)**: `[Kẻ lừa đảo thời đại số / Startup công nghệ] + [đã dùng một chiêu trò tinh vi nào để qua mặt cả ngân hàng tỷ đô / lừa hàng vạn nạn nhân trong nháy mắt]?`
- **Dạng 3 (The Extreme Modern Experiment - Thử Nghiệm Sống Đột Phá)**: `[Điều gì thực sự xảy ra khi một người quyết định [30 ngày từ bỏ smartphone / 1 năm không tiêu tiền / bí mật tự động hóa 100% công việc]]?`

---

### 💡 5 Trụ Cột Đề Tài Thực Tế & Thời Sự (The 5 Modern Storytelling Pillars):
- **📱 Trụ cột 1: Bẫy Công Nghệ Số, AI & Mạng Xã Hội (Digital Traps, AI & Social Media)**: Vụ lừa Deepfake video call 25 triệu USD, 30 ngày cai nghiện Dopamine smartphone, thuật toán cuộn vô tận biến con người thành nghiện ngập, bẫy hẹn hò lừa đảo Telegram...
- **💸 Trụ cột 2: Bẫy Tài Chính Cá Nhân & Tâm Lý Tiêu Dùng Đời Thường (Modern Money Traps & Behavioral Economics)**: Lương 50 triệu vẫn rỗng túi (Lifestyle Inflation), bẫy mua trước trả sau (BNPL), ảo tưởng nghỉ hưu sớm FIRE, nghịch lý giá cà phê/thức ăn nhanh tăng vọt (Greedflation)...
- **🏢 Trụ cột 3: Nỗi Đau Công Sở & Khủng Hoảng Sự Nghiệp (Workplace Reality & Burnout)**: Nhân viên tự động hóa công việc suốt 5 năm không ai biết, hiện tượng tin tuyển dụng ma (Ghost Jobs), bẫy thăng chức kiệt sức (Hustle Culture), trào lưu Quiet Quitting...
- **🧠 Trụ cột 4: Tâm Lý Học Hành Vi & Thói Quen Đời Sống (Applied Behavioral Psychology & Life Habits)**: Vòng lặp trì hoãn (Procrastination Loop), tại sao người thông minh vẫn dính bẫy lừa đảo, bẫy chi phí chìm (Sunk Cost) trong tình cảm/công việc, thử nghiệm thói quen nguyên tử...
- **🚨 Trụ cột 5: Đại Án Kinh Tế Hiện Đại & Startup Giả Tạo (Modern Corporate Cons & Silicon Valley Scams)**: Charlie Javice & vụ startup 4 triệu sinh viên ảo lừa JP Morgan $175M, Elizabeth Holmes & cú lừa máy xét nghiệm máu Theranos, trò phông bạt của các "chuyên gia làm giàu" TikTok...

> Danh sách case study chi tiết và phân tích kịch bản xem tại: `references/story-topics.md`.
> Nhật ký các câu chuyện đã duyệt / đã sản xuất xem tại: `references/topic-history.md`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Xác Định Ngôn Ngữ Dự Án (Language Specification Rule - Default: English)
- **Mặc định là Tiếng Anh (English)** nếu người dùng không yêu cầu ngôn ngữ khác.
- **Xác định ngay từ bước đầu tiên**:
  - **Lời kể chuyện (Voiceover/voText)**: Toàn bộ kịch bản, lời thoại nhân vật và `scenes.json` viết bằng đúng ngôn ngữ đã chọn.
  - **Văn bản trong ảnh (In-Image Text & Comic Bubbles)**: Bảng hiệu, tiêu đề báo chí, thư từ, ghi chú bản đồ, lời thoại bong bóng trong ảnh minh họa **BẮT BUỘC dùng đúng ngôn ngữ đã chọn**.
  - **Prompt AI (Gemini/Imagen)**: Thân prompt mô tả nghệ thuật/diễn xuất viết bằng tiếng Anh chuẩn, nhưng câu lệnh ràng buộc văn bản hiển thị trong tranh phải chỉ định rõ ngôn ngữ mục tiêu.

### 2. Dự Án Độc Lập 100% (Project Isolation Rule)
- **Mỗi video mới tạo ra BẮT BUỘC nằm trong một folder project độc lập riêng biệt** đặt tên theo câu chuyện (kebab-case, ví dụ: `story-eiffel-tower-con/`, `story-andes-flight-survival/`, `story-great-emu-war/`).
- **TUYỆT ĐỐI KHÔNG** chèn code, assets hay composition của video mới vào folder dự án khác.
- **Mỗi folder video mới phải là một Remotion project độc lập**, tự chứa:
  - `package.json`, `remotion.config.ts`, `tsconfig.json`
  - `src/` (`Root.tsx`, `index.ts`, `index.css`, `components/`, `scenes/`)
  - `public/assets/scenes/` (`0.png` ... `N-1.png`), `public/audio/scenes/` (chỉ 1 track master, không SFX rời rạc)
  - `scenes.json`, `prompt.json`, `prompts_gemini.md`, `voText_<lang>.md`, `voText_<lang>.txt`, `metadata.md`.

### 3. Chuẩn Visual DNA Hoạt Hình 2D Người Que Biểu Cảm (2D Character Acting DNA)
- **Cấu trúc prompt Gemini**: Bắt đầu bằng `Clean 2D vector cartoon animated storytelling illustration, in the style of OverSimplified, Brew, and TED-Ed.`
- **Nhân vật Stickman Biểu Cảm Cao Độ**: Đầu tròn trắng (hoặc có tóc/mũ/kính/trang phục hiện đại: dân văn phòng, lập trình viên, trùm lừa đảo công nghệ, người trẻ lướt điện thoại), viền đen vector sắc nét (`bold black outlines`), biểu cảm mắt miệng cực kỳ phong phú và kịch tính:
  - Nụ cười ranh mãnh của kẻ thao túng, mắt tròn xoe mồ hôi đầm đìa khi tài khoản về 0 / bị bóc phốt, ánh mắt giận dữ bốc lửa, biểu cảm kiệt sức quầng thâm vì deadline/mất ngủ, mặt ngơ ngác hài hước...
- **Bối cảnh 2D Kể Chuyện Sinh Động & Đời Thường**: Văn phòng làm việc hiện đại ngập tràn màn hình máy tính, phòng ngủ tối tăm với ánh sáng xanh smartphone hắt lên mặt, quán cà phê làm việc, phòng họp công ty công nghệ, biểu đồ tài chính lao dốc đỏ rực, thông báo số dư ngân hàng trừ tiền liên tục... kết hợp ánh sáng điện ảnh (spotlight, bóng râm kịch tính, màu sắc tương phản 2 tone).
- **Ràng buộc ngôn ngữ trong ảnh**:
  - *Nếu là Tiếng Anh (Mặc định)*:
    > `All visible text, newspaper headlines, signs, letters, and dialogue bubbles must be strictly in clear English typography with Latin alphabet only, 16:9 widescreen.`
  - *Nếu là Tiếng Việt*:
    > `All visible text, newspaper headlines, letters, and dialogue bubbles must be strictly in clear Vietnamese typography with correct diacritics (Latin alphabet only), 16:9 widescreen.`

### 4. Tối Ưu Giữ Chân Người Xem (Story Retention & Fast Pacing 5-8s)
- **Quy tắc chuyển ảnh 5-8s**: Mỗi đoạn kịch bản 20-30s phải được bẻ nhỏ thành **2 đến 4 shots hình ảnh** (mỗi shot kéo dài **5 đến 8 giây** / 150-250 frames) để mô tả từng hành động, phản ứng cảm xúc của nhân vật hoặc bối cảnh chuyển dịch.
- **Smart Image Fallback**: Component `ImageScene.tsx` luôn tích hợp cơ chế fallback về ảnh gốc của nhóm (`Math.floor((shotIndex * totalBase) / totalShots)`) để Remotion Studio luôn preview mượt mà ngay cả khi ảnh chưa tạo đủ.

### 5. Thiết Kế Âm Thanh Voiceover Kể Chuyện Liền Mạch (Continuous Master Voiceover)
- **Voiceover dẫn dắt cảm xúc**: Giọng người kể chuyện biến hóa theo diễn biến (hồi hộp $\rightarrow$ ngạc nhiên $\rightarrow$ hài hước châm biếm $\rightarrow$ sâu lắng lắng đọng).
- **Master Audio Độc Nhất**: Toàn bộ âm thanh video sử dụng duy nhất một track Master Voiceover liền mạch (`public/audio/scenes/full-scene.wav` hoặc `.mp3`). **TUYỆT ĐỐI KHÔNG dùng các file SFX rời rạc** để tránh lỗi 404 missing assets khi render Remotion.

### 6. Nhận Diện Kênh & Bố Cục Tối Giản (Channel Mascot Watermark)
- **Channel Mascot Watermark**: Hiển thị DUY NHẤT avatar tròn của kênh (`avatar_stickman_channel.jpg`, đường kính 150px, viền vàng kim `2.5px solid rgba(255, 215, 0, 0.85)` và bóng đổ điện ảnh) cố định ở góc phải dưới (`bottom: 60px, right: 40px`) trên layer cao nhất (`zIndex: 999`). **TUYỆT ĐỐI KHÔNG chèn thêm text tên kênh làm rối khung hình kể chuyện**.
- **File avatar chưa có sẵn trong repo skill** — trước bước Scaffold, tạo/lấy file `avatar_stickman_channel.jpg` rồi copy vào `<topic-folder>/public/` (theo mẫu `horror-storytelling-video-engine/resources/` + Bước 5 của skill đó). Dùng chung avatar với `stickman-history-video-engine` nếu cùng kênh.
- **Hiệu ứng Camera Ken Burns & Kịch Tính**: Luân phiên zoom-in kịch tính vào mặt nhân vật, pan ngang theo hướng di chuyển của nhân vật, rung máy khi có va chạm/nổ, mờ chuyển cảnh êm ái.

### 7. Đồng Bộ Audio-Visual Tuyệt Đối (Silent-Failure Prevention)
Ba lỗi sau **không crash và không log lỗi** — chỉ âm thầm khiến ảnh/voice không hiển thị/phát. Bắt buộc tự kiểm tra thủ công (`ls`, `ffprobe`), không dựa vào việc "không thấy lỗi" để kết luận là đúng:
- **Tên file ảnh phải khớp tuyệt đối `0.png ... N-1.png`** — không tiền tố, không khoảng trắng. `ImageScene.tsx` và cơ chế fallback dùng chung 1 pattern, sai tên là mất ảnh toàn bộ video.
- **Đuôi file audio trong `Root.tsx` phải khớp file thực tế** trong `public/audio/scenes/` — `onError` trên `<Audio>` nuốt lỗi lặng lẽ theo thiết kế, không phải chỉ báo đáng tin.
- **Timing (`scenes.json`) phải được tính lại mỗi khi file audio bị tạo lại/thay thế** — dù chỉ 1 lần. Không có cách tự động phát hiện việc này; luôn `ffprobe` đo lại độ dài audio thật và so với `totalFrames/fps` trước khi render bản final. Chi tiết quy trình + phương pháp ASR alignment chính xác nhất tại `references/remotion-scaffold.md` (Mục 5).

---

## Quy Trình 9 Bước Chuẩn (9-Step Full Story Production Pipeline)

```
0. Xác Định Ngôn Ngữ → 1. Chọn Cốt Truyện Kịch Tính → 1.5. Deep Research YouTube
   (Mặc định: English)     (references/story-topics.md)        (Quotes, Data & Real Twist)
                                                                    ↓
3. Scene Breakdown (5-8s) ← 2. Kịch Bản 5 Hồi Kể Chuyện (Được tiếp sức bởi dữ liệu thực tế)
   (timing + 45-55 shots)      (voText_<lang>.md)
        ↓
4. Visual Sourcing (Biểu Cảm Nhân Vật + Đúng Ngôn Ngữ) → 5. Scaffold Standalone Project
   (Gemini Prompts + Language constraint)                    (Remotion isolated folder)
        ↓
6. Master Audio Sync (Voiceover Master Track) → 7. Tạo Thumbnail High-CTR (Đúng Ngôn Ngữ)
   (silencedetect + sync)                          (Khuôn mặt shock + Tình huống kịch tính)
        ↓
8. QC, Preview & Render (Studio & MP4 export)
```

---

### Bước 0: Xác Định Ngôn Ngữ Dự Án (Language Setup)
- Áp dụng đúng theo **Quy Tắc Cốt Lõi #1** (mục "⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC" ở trên) — mặc định English, ghi nhận mã ngôn ngữ nếu user chọn khác.

---

### Bước 1: Ý Tưởng Cốt Truyện & Chọn Đề Tài (Story Idea Selection)
- Áp dụng đúng quy trình đã mô tả ở mục **"⚡ ENGINE SINH CỐT TRUYỆN ĐỘNG"** ở trên: đọc `topic-history.md` chống trùng $\rightarrow$ sinh 3-5 ý tưởng theo 5 trụ cột $\rightarrow$ ghi log `[IN_PROGRESS]` ngay khi user duyệt.

---

### Bước 1.5: Deep Case Research Qua YouTube (Sourcing Tư Liệu Sơ Cấp & Quotes Đắt Giá)
*Áp dụng triệt để năng lực từ skill `youtube-video-research` để nâng tầm câu chuyện từ hư cấu thông thường thành phóng sự điều tra / tài liệu kịch tính nghẹt thở.*

1. **Tìm kiếm 4-8 video YouTube chất lượng cao về Case Study**:
   - Phóng sự điều tra (Bloomberg, WSJ, CNBC, VICE, Coffeezilla, MagnatesMedia).
   - Lời khai / Phỏng vấn nhân chứng, nạn nhân, cựu nhân viên, chuyên gia tâm lý học hành vi.
   - Các bản tin thời sự hoặc phiên điều trần chính thức (SEC, FBI, Tòa án).
2. **Trích xuất dữ liệu vàng nạp vào kịch bản**:
   - **Direct Quotes**: Những câu nói châm biếm, lời ngụy biện ranh mãnh của kẻ lừa đảo hoặc câu than thở tuyệt vọng của nạn nhân $\rightarrow$ dùng làm Hook và lời thoại đắt giá trong kịch bản.
   - **Data Points chính xác**: Số tiền chuyển khoản từng đợt, ngày giờ diễn ra biến cố, số lượng nạn nhân, phần trăm Dopamine sụt giảm $\rightarrow$ làm cho kịch bản stickman chân thực 100%.
   - **Visual Details**: Bối cảnh phòng khách sạn, giao diện app lừa đảo, email nội bộ, biểu đồ tài chính thực tế $\rightarrow$ nạp vào mô tả prompt Gemini ở Bước 4.

---

### Bước 2: Kịch Bản 5 Hồi Kể Chuyện (5-Act Narrative Arc)
- Đọc `references/script-writing.md` để viết kịch bản 5 hồi kịch tính, kết hợp tinh hoa dữ liệu thu thập được từ Bước 1.5:
  1. **Act 1: The Narrative Hook & Inciting Incident (0:00 - 0:45)**: Thả người xem vào giữa tình huống điên rồ hoặc quyết định gây sốc nhất (kết hợp Direct Quote gây bão).
  2. **Act 2: The Origin & The Crazy Plan (0:45 - 2:30)**: Giới thiệu nhân vật, hoàn cảnh bế tắc và kế hoạch/thủ đoạn ngầm bắt đầu.
  3. **Act 3: Rising Stakes & Escalating Chaos (2:30 - 6:30)**: Các thử thách nghẹt thở, những lần suýt bị phát hiện, các số liệu leo thang mất kiểm soát.
  4. **Act 4: The Climax & The Big Twist (6:30 - 8:30)**: Cú đánh cược sinh tử, thời khắc phán xét và cú ngoặt cốt truyện (Plot Twist) chấn động.
  5. **Act 5: The Aftermath & The Moral Payoff (8:30 - 10:00)**: Số phận cuối cùng, sự trớ trêu của định mệnh và bài học thực tế cho người xem.
- Xuất thành `<topic-folder>/voText_<lang>.md` và `<topic-folder>/voText_<lang>.txt` (ví dụ: `voText_en.md`, `voText_vi.md`).

---

### Bước 3: Scene Breakdown & Timing (Pacing 5-8s)
- Bẻ nhỏ kịch bản thành **45 - 55 shots chuyển động liên tục** (mỗi shot 5 - 8 giây).
- Tạo `<topic-folder>/scenes.json` chứa `voText` theo ngôn ngữ đã chọn.
- Ghi rõ `startFrame`, `durationInFrames`, `title`, `voText`, `imageSrc`.

---

### Bước 4: Visual Sourcing & Prompt Gemini (Diễn Xuất Nhân Vật & Ngôn Ngữ Trong Ảnh)
- Đọc `references/visual-sourcing.md` và `references/stickman-style-guide.md`.
- Tạo prompt cho từng phân cảnh, khóa chặt Visual DNA hoạt hình 2D vector, nhân vật stickman đầu tròn biểu cảm, màu sắc điện ảnh sống động.
- **Ràng buộc ngôn ngữ trong ảnh**: Mọi tiêu đề báo chí, thư từ, biển hiệu, bản đồ trong ảnh phải đúng ngôn ngữ đã chọn (tiếng Anh nếu chọn EN, tiếng Việt có dấu chuẩn nếu chọn VI).
- Xuất danh sách prompt vào `<topic-folder>/prompt.json` và `<topic-folder>/prompts_gemini.md`.
- Khi user nạp ảnh vào `public/assets/scenes/` (`0.png` -> `N-1.png`), tích hợp ngay vào Remotion.

---

### Bước 5: Scaffold Standalone Project
- Đọc `references/remotion-scaffold.md`.
- Tạo folder độc lập `<topic-folder>/` với `package.json`, `tsconfig.json`, `remotion.config.ts`, `src/Root.tsx`, `src/index.ts`, `src/index.css`.
- Cài đặt **Channel Mascot Watermark** ở góc phải dưới (`bottom: 60px, right: 40px`, đường kính 150px), không kèm text tên kênh.
- Tích hợp **Smart Image Fallback** và **Subtitle.tsx** (phụ đề burned-in, `subtitleText={scene.voText}`) trong `ImageScene.tsx`.
- Chạy `npm install` bên trong folder video.
- Khi ảnh scene đã được nạp vào `public/assets/scenes/`, **BẮT BUỘC** `ls` xác nhận tên file đúng `0.png...N-1.png` (Mục 5.A của `remotion-scaffold.md`) trước khi coi bước này là xong.

---

### Bước 6: Master Audio & Khớp Âm Thanh Kể Chuyện
- Đọc `references/sound-design.md` và `references/voiceover-tts.md`.
- Nạp file voiceover kể chuyện liền mạch vào `public/audio/scenes/`, rồi **`ls` xác nhận đuôi file thực tế** (`.mp3` hay `.wav`) và sửa `Audio src` trong `Root.tsx` khớp chính xác — không giả định.
- Đo độ dài audio thật làm nguồn chân lý duy nhất: `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public/audio/scenes/full-scene.<ext>`.
- Tính `startFrame`/`durationInFrames` cho từng scene khớp với độ dài audio thật, ưu tiên phương pháp **ASR word-level alignment** (`faster-whisper`, xem recipe đầy đủ tại `references/remotion-scaffold.md` Mục 5.C) — chính xác hơn hẳn silence-detect thuần (vốn hay nhầm khoảng lặng nội-câu với ranh giới giữa câu).
- **Nếu voice được tạo lại/thay bằng file khác ở bất kỳ thời điểm nào sau đó** (kể cả sau khi đã QC xong) — coi toàn bộ `scenes.json` là lỗi thời, quay lại đo + tính timing từ đầu trước khi render bản final.
- Xác nhận `sum(durationInFrames) === totalFrames === round(audio_duration × fps)` trước khi sang Bước 7.

---

### Bước 7: Tạo Thumbnail YouTube High-CTR (Quy Tắc 3 Giây trên Mobile & Chuẩn 1-1-4)
- Đọc `references/metadata.md`.
- Áp dụng **Quy tắc 1-1-4 (1 Nhân Vật + 1 Điểm Va Chạm/Xung Đột + Text ≤ 4 Từ)** với ngôn ngữ đã chọn:
  1. **Nhân vật (Ở giữa)**: Stickman biểu cảm shock cực đại (mắt tròn xoe O_O, mồ hôi đầm đìa hoặc nụ cười ranh mãnh).
  2. **Điểm va chạm/Gãy vỡ (Trái vs Phải)**: Nửa trái hành động tấn công/quyết định mạo hiểm, nửa phải đối tượng phòng thủ/kết quả gãy đôi/sụp đổ (ví dụ: Katana gãy đôi tóe lửa khi chạm khiên; báu vật phát sáng giữa chiến trường tối).
  3. **Text Thumbnail (≤ 3-4 từ)**: Chữ in hoa to, font dày dặn, màu vàng chanh hoặc đỏ viền đen đậm (ví dụ: `IT SHATTERS?!`, `WORTH A LIFE?`, `3,000 YEARS COLLAPSED`).
- Sinh prompt và xuất file ảnh thumbnail 16:9 lưu vào `<topic-folder>/out/thumbnail.jpg` và `<topic-folder>/public/thumbnail.jpg`.

---

### Bước 8: QC, Preview Studio & Xuất Bản Render
- Đọc `references/retention-qc.md` và `references/metadata.md`.
- Viết tiêu đề kích thích tò mò theo **3 Công Thức High-CTR** (tránh 100% các anti-pattern học thuật/bài văn/series), cung cấp sẵn **2 phương án A/B Test Title** (Option A & Option B), mô tả SEO và tags vào `<topic-folder>/metadata.md`.
- Chạy typecheck `npx tsc --noEmit`.
- Mở preview Remotion Studio: `npm run dev` (`http://localhost:3000`).
- Xuất bản video: `npm run render` ra folder `out/`.
