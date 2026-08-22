---
name: stickman-history-video-engine
description: Full pipeline để sản xuất video YouTube phong cách Stickman History Documentary / Ancient Survival (hoạt họa người que tối giản trên nền giấy da cổ/parchment, sơ đồ mặt cắt khoa học, bản đồ hải trình, giải mã nghịch lý lịch sử/sinh tồn của người Viking và các nền văn minh cổ đại) — từ lên ý tưởng, viết kịch bản, visual sourcing (Gemini prompts/SVG stickman/Pexels), đến scaffold và ráp Remotion. LUÔN dùng skill này khi user nói "làm video stickman lịch sử", "làm video viking", "chủ đề video người viking", "làm video kiểu Ancient World Uncovered / Before Civilization", "video giải mã sinh tồn thời cổ đại", hoặc muốn làm video kiến thức lịch sử có tính giải trí cao kết hợp đồ họa khoa học trực quan.
---

# Stickman History Video Engine (Viking & Ancient Survival)

Pipeline sản xuất video YouTube chủ đề lịch sử, khảo cổ học, nhân chủng học và giải mã bí ẩn sinh tồn thời cổ đại — **đặc biệt chuyên sâu về Thời Đại Viking (Viking Age, 793 – 1066 CN)** — theo phong cách **Stickman Animated Documentary** (tham chiếu: *Ancient World Uncovered*, *Before Civilization*). Định dạng: **16:9** (YouTube dài, 8-15 phút) hoặc **9:16** (Shorts tóm tắt nghịch lý).

---

## ⚡ KHO CHỦ ĐỀ GỢI Ý CHUYÊN SÂU "LÀM THẾ NÀO..." VỀ NGƯỜI VIKING

Khi người dùng yêu cầu gợi ý chủ đề, **LUÔN áp dụng Công Thức "Làm Thế Nào..." (The How-Did-They Framework)** và tham chiếu `references/viking-topics.md`.

### 🎯 Công thức đặt câu hỏi chủ đề chuẩn:
> `Làm thế nào người Viking [Kỳ tích sinh tồn / Chinh phục phi thường] khi / mà [Nghịch cảnh cực đoan / Rào cản tưởng như bất khả thi]?`

---

### 🧭 Nhóm 1: Hàng Hải, Định Vị & Hải Trình Băng Giá
1. **Hòn Đá Mặt Trời**: *Làm thế nào người Viking định vị giữa mù khơi Bắc Cực khi không có la bàn từ tính?* (Quang học phân cực tinh thể Iceland Spar Calcite + đĩa Uunartoq + quạ đen Hrafna-Flóki).
2. **Kỹ Thuật Thuyền Rồng**: *Làm thế nào người Viking đóng những con thuyền dẻo như cá voi lướt sóng ngàn dặm mà không bị gãy đôi?* (Chẻ gỗ sồi xuyên tâm + đinh tán sắt mềm + len tẩm hắc ín nở trong nước).
3. **Chinh Phục Bắc Mỹ**: *Làm thế nào người Viking vượt Đại Tây Dương đến châu Mỹ trước Columbus 500 năm trên thuyền gỗ hở boong?* (Chiến thuật nhảy đảo + săn ngà hải mã + dấu vết bão mặt trời Miyake 1021 CN).
4. **Vượt Cạn Xuyên Rừng**: *Làm thế nào người Viking kéo những hạm đội thuyền rồng vượt cạn hàng trăm kilômét xuyên rừng rậm nước Nga?* (Con lăn gỗ bôi trơn mỡ động vật + thiết kế thân tàu siêu nhẹ 3 tấn).

### ❄️ Nhóm 2: Sinh Tồn Cực Hàn, Dinh Dưỡng & Y Học Cổ
5. **Sống Sót Trên Biển Băng**: *Làm thế nào người Viking sống sót qua bão tuyết -30°C trên biển băng mà tuyệt đối không được dùng lửa?* (Vải len Vaðmál ngâm mỡ cừu Lanolin + động cơ 6000 kcal sinh nhiệt nội sinh + túi ngủ Skinnfeldr).
6. **Cá Tuyết Khô 10 Năm**: *Làm thế nào người Viking bảo quản cá suốt 10 năm không hỏng mà không cần một hạt muối hay tủ lạnh?* (Công nghệ thăng hoa gió lạnh Lofoten + 80% protein tinh khiết).
7. **Bát Súp Hành Tây Tử Thần**: *Làm thế nào các nữ lang y Viking chẩn đoán vết thương thủng ruột trên chiến trường chỉ bằng một bát súp hành tây?* (Phân loại cấp cứu triage bằng khứu giác + rêu đầm lầy Sphagnum kháng sinh).
8. **Nhà Cỏ Than Bùn (Turf House)**: *Làm thế nào người Viking xây nhà ấm 15°C giữa bão tuyết ở vùng đất không có lấy một cây gỗ?* (Hệ số cách nhiệt R-value của rễ cỏ than bùn + cộng sinh thân nhiệt đàn gia súc).

### ⚔️ Nhóm 3: Luyện Kim, Vũ Khí & Khoa Học Chiến Trận
9. **Thanh Kiếm Thần Ulfberht**: *Làm thế nào người Viking tạo ra thanh kiếm thép đúc tinh khiết 1500°C vượt trước thời đại 800 năm?* (Lò nấu kín Crucible Steel + tuyến đường sông Volga trao đổi phôi thép Damascus + rãnh thoát lực Fuller).
10. **Sắt Đầm Lầy (Bog Iron)**: *Làm thế nào người Viking "gặt hái" hàng triệu tấn sắt từ bùn lầy vi sinh thay vì đào mỏ sâu?* (Vi khuẩn Gallionella kết tủa sắt + lò nung đất sét Bloomer).
11. **Chất Điên Cuồng Berserker**: *Làm thế nào một loại hạt cây độc biến chiến binh Berserker thành cỗ máy chiến tranh không biết đau?* (Alkaloid Scopolamine trong cây Henbane + phong tỏa thụ thể cảm giác não bộ).
12. **Vật Lý Bức Tường Khiên**: *Làm thế nào bức tường khiên gỗ mềm 8mm của người Viking chặn đứng kỵ binh hạng nặng?* (Biến dạng đàn hồi của gỗ bồ đề + viền da sống co ngót siết ứng suất trước + khóa khiên so le).
13. **Rìu Hai Tay Dane Axe**: *Làm thế nào chiếc rìu Dane Axe mỏng nhẹ có thể chẻ đôi khiên giáp chỉ trong một nhát chém?* (Đòn bẩy cán dài 1.5m + lưỡi nêm mỏng áp suất nghìn PSI + mép hàn thép tôi cứng).

### 🏛️ Nhóm 4: Xã Hội, Luật Pháp & Sự Biến Mất Bí Ẩn
14. **Quốc Hội Althing Năm 930**: *Làm thế nào người Viking vận hành một nền dân chủ không cần vua hay quân đội thường trực suốt 300 năm?* (Người ngâm luật thuộc lòng + quyền lực pháp lý phụ nữ Viking + luật trục xuất Outlawry).
15. **Đồng Bạc Baghdad Dưới Mộ Cổ**: *Làm thế nào hàng vạn đồng bạc Hồi giáo Baghdad lại được chôn giấu dưới các nấm mộ Viking ở Bắc Âu?* (Nền kinh tế cân bạc mảnh Hack-Silver + tuyến hàng hải sông Volga - Biển Caspi).
16. **Bí Ẩn Diệt Vong Tại Greenland**: *Làm thế nào một thuộc địa Viking 400 trang trại đột ngột biến mất không dấu vết sau 500 năm hưng thịnh?* (Tiểu Băng Hà + bẫy cứng nhắc văn hóa từ chối học người Inuit + ngà hải mã sụt giá).

> Chi tiết phân tích khoa học 4 lớp, hiện vật khảo cổ và prompt hình ảnh của từng chủ đề xem tại: `references/viking-topics.md`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Dự Án Độc Lập 100% (Project Isolation Rule)
- **Mỗi video mới tạo ra BẮT BUỘC nằm trong một folder project độc lập riêng biệt** đặt tên theo topic (kebab-case, ví dụ: `viking-sunstone-navigation/`, `viking-freezing-seas/`, `viking-ulfberht-sword/`, `viking-onion-soup/`).
- **TUYỆT ĐỐI KHÔNG** chèn code, assets hay composition của video mới vào folder của các channel/dự án khác (như `paper-cut-channel`, v.v.).
- **Mỗi folder video mới phải là một Remotion project độc lập**, tự chứa:
  - `package.json` (đồng bộ phiên bản `@remotion/cli`, `remotion`, `@remotion/sfx`, `react`, `react-dom`)
  - `remotion.config.ts`, `tsconfig.json`
  - `src/` (`Root.tsx`, `index.ts`, `index.css`, `components/`, `scenes/`)
  - `public/assets/scenes/` (`0.png` ... `N-1.png`), `public/audio/scenes/` & `public/audio/sfx/`
  - `scenes.json`, `scenes_en.json`, `prompt.json`, `prompts_gemini.md`, `voText_en.md`, `voText_en.txt`, `metadata.md`.

### 2. Chuẩn Prompt & Phong Cách 2D Vector Hoạt Hình (2D Vector Cartoon DNA)
- **Prompt Gemini 100% tiếng Anh**: Bắt đầu bằng `Clean 2D vector cartoon animated documentary style illustration, in the style of Ancient World Uncovered and Before Civilization.`
- **Nhân vật**: Nhân vật stickman đầu tròn trắng (hoặc da ngăm nâu đối với người tiền sử / có râu tóc Viking), viền đen dày dặn sắc nét (`bold black vector outlines`), biểu cảm mắt miệng phong phú (mắt thâm quầng khi kiệt sức, to tròn khi hoảng sợ, đổ mồ hôi, há miệng `D:`).
- **Bối cảnh & Đồ họa**: Bối cảnh hoạt hình 2D sống động, tươi sáng (bầu trời xanh, savan vàng, biển đêm bão tuyết xanh đậm, lửa trại cam rực rỡ), kết hợp đổ bóng cel-shading 2 tone mượt mà.
- **Chữ viết trong ảnh BẮT BUỘC là tiếng Anh Latin**: Mọi nhãn số liệu, công thức, bảng biểu trong ảnh phải là chữ Latin tiếng Anh hoạt hình rõ ràng.
- **Câu lệnh bắt buộc cuối mỗi prompt**:
  > `All visible text and labels must be strictly in clear English typography with Latin alphabet only, absolutely no Runic, Arabic, Old Norse, or foreign calligraphy script, 16:9 widescreen.`

### 3. Tối Ưu Giữ Chân Người Xem (Retention & Fast Pacing 5-8s)
- **Quy tắc chuyển ảnh 5-8s**: Mỗi đoạn kịch bản 20-30s phải được bẻ nhỏ thành **2 đến 4 shots hình ảnh** (mỗi shot kéo dài **5 đến 8 giây** / 150-250 frames). Tuyệt đối không để 1 ảnh tĩnh hiển thị quá 10 giây gây nhàm chán.
- **Smart Image Fallback**: Component `ImageScene.tsx` luôn tích hợp cơ chế fallback về ảnh gốc của nhóm (`Math.floor((shotIndex * totalBase) / totalShots)`) để Remotion Studio luôn preview mượt mà ngay cả khi ảnh chưa tạo đủ.

### 4. Thiết Kế Âm Thanh Thuần Khiết (Clean Voiceover Audio)
- **Tập trung vào Voiceover**: Ưu tiên giữ đường tiếng đọc Voiceover liền mạch, rõ ràng, không chèn các âm thanh meme hoặc SFX lặp đi lặp lại làm giảm trải nghiệm của người xem.
- **Cắt chuyển cảnh chuẩn xác**: Dùng `ffmpeg silencedetect` để xác định chính xác các khoảng lặng tự nhiên giữa các câu đọc.

### 5. Nhận Diện Kênh & Bố Cục Hình Ảnh (Channel Watermark & Cinematic Motion)
- **Channel Avatar Watermark**: Hiển thị avatar tròn của kênh (`avatar_stickman_channel.jpg`) cố định ở góc phải dưới (`bottom: 32px, right: 36px`) trên layer cao nhất (`zIndex: 999`) xuyên suốt toàn bộ video.
- **Hiệu ứng Camera Điện Ảnh**: Luân phiên 6 hướng camera Ken Burns (`zoom-in`, `zoom-out`, `pan-left`, `pan-right`, `zoom-in-tilt`, `pan-up`) kết hợp rung nhẹ tự nhiên (`camera breathing`) và mờ chuyển cảnh nhẹ nhàng (4 frames fade-in).

---

## Quy Trình 8 Bước Chuẩn (8-Step Full Production Pipeline)

```
1. Chọn Topic Viking → 2. Kịch bản Song Ngữ → 3. Scene Breakdown (5-8s)
   (viking-topics.md)   (VI + EN voText)       (timing + 50+ shots)
        ↓
4. Visual Sourcing → 5. Scaffold Standalone Project → 6. Master Audio (Voiceover)
   (Gemini Prompts)   (Remotion isolated folder)       (silencedetect + sync)
        ↓
7. Tạo Thumbnail High-CTR → 8. QC, Preview & Render
   (2D Vector Contrast)       (Studio & MP4 export)
```

---

### Bước 1-2: Ý tưởng + Kịch bản Song Ngữ
- Đọc `references/viking-topics.md` và `references/script-writing.md`.
- Output: 1 chủ đề Viking nghịch lý + kịch bản 5 phần chuẩn:
  1. **The Paradox Hook**: Đập tan định kiến + đặt nghịch lý sinh tồn / kỹ thuật không tưởng.
  2. **The Threat Physics**: Phân tích điều kiện khắc nghiệt của Bắc Cực / hải trình / chiến trận.
  3. **The 4-Layer System**: Bóc tách 4 tầng giải pháp của người Viking (Vật liệu $\rightarrow$ Sinh học $\rightarrow$ Kỹ thuật $\rightarrow$ Kỷ luật).
  4. **Experimental Proof**: Bằng chứng khảo cổ học (Oseberg, Gokstad, L'Anse aux Meadows, Ulfberht...) & tái hiện thực nghiệm.
  5. **The Mindset Payoff**: Đúc kết trí tuệ thích nghi của người Viking.
- Xuất thành `<topic-folder>/voText_en.md` và `<topic-folder>/voText_en.txt`.

---

### Bước 3: Scene Breakdown & Timing (Pacing 5-8s)
- Bẻ nhỏ kịch bản thành **45 - 55 shots chuyển động liên tục** (mỗi shot 5 - 8 giây).
- Tạo `<topic-folder>/scenes.json` (Việt) và `<topic-folder>/scenes_en.json` (Anh).
- Ghi rõ `startFrame`, `durationInFrames`, `title`, `voText`, `imageSrc`, và `sfxList: []`.

---

### Bước 4: Visual Sourcing (Gemini Image Prompts 2D Cartoon)
- Đọc `references/visual-sourcing.md` và `references/stickman-style-guide.md`.
- Tạo prompt 100% tiếng Anh cho từng phân cảnh, khóa chặt Visual DNA hoạt hình 2D vector, stickman đầu tròn trắng viền đen đậm, màu sắc tươi sáng và cel-shading 2 tone.
- Xuất danh sách prompt vào `<topic-folder>/prompt.json` và `<topic-folder>/prompts_gemini.md`.
- Khi user nạp ảnh vào `public/assets/scenes/` (`0.png` -> `N-1.png`), tích hợp ngay vào Remotion.

---

### Bước 5: Scaffold Standalone Project
- Đọc `references/remotion-scaffold.md`.
- Tạo folder độc lập `<topic-folder>/` với `package.json`, `tsconfig.json`, `remotion.config.ts`, `src/Root.tsx`, `src/index.ts`, `src/index.css`.
- Cài đặt persistent **Channel Avatar Watermark** (`avatar_stickman_channel.jpg`) ở góc phải dưới (`bottom: 32px, right: 36px`).
- Tích hợp **Smart Image Fallback** trong `ImageScene.tsx`.
- Chạy `npm install` bên trong folder video.

---

### Bước 6: Master Audio & Khớp Âm Thanh Chính Xác
- Đọc `references/sound-design.md`.
- Nạp file voiceover đọc liền mạch (`full-scene.mp3` / `full-scene.wav`), chạy phân tích khoảng lặng bằng ffmpeg:
  ```bash
  ffmpeg -i public/audio/scenes_en/full-scene.mp3 -af silencedetect=noise=-28dB:d=0.4 -f null -
  ```
- Cập nhật frame chuyển cảnh khớp chính xác vào các khoảng lặng. Giữ âm thanh voiceover thuần khiết không có SFX gây nhiễu.

---

### Bước 7: Tạo Thumbnail YouTube Đột Phá Tương Phản (High-CTR Thumbnail)
- Đọc `references/metadata.md`.
- Áp dụng công thức 3 điểm chạm thị giác cực mạnh:
  1. **Bên Trái**: Nghịch cảnh / Thất bại / Công nghệ yếu kém với dấu **X Đỏ To** (ví dụ: *1,100°C CRUDE IRON BENT*).
  2. **Bên Phải**: Kỳ tích / Đỉnh cao kỹ nghệ với **Ánh Vàng Rực Rỡ** (ví dụ: *1,500°C PURE STEEL: 800 YRS AHEAD!*).
  3. **Ở Giữa**: Stickman Viking đầu tròn biểu cảm shock tột độ (mắt tròn xoe, há hốc miệng) cầm thước đo / công cụ bốc khói.
- Sinh prompt và xuất file ảnh thumbnail 16:9 lưu vào `<topic-folder>/out/thumbnail.jpg` và `<topic-folder>/public/thumbnail.jpg`.

---

### Bước 8: QC, Preview Studio & Xuất Bản Render
- Đọc `references/retention-qc.md` và `references/metadata.md`.
- Chạy typecheck `npx tsc --noEmit`.
- Mở preview Remotion Studio: `npm run dev` (`http://localhost:3000`).
- Xuất bản video: `npm run render:en` hoặc `npm run render:vi` ra folder `out/`.
- Viết tiêu đề nghịch lý, mô tả SEO và tags vào `<topic-folder>/metadata.md`.
