---
name: comic-cartoon-video-engine
description: >-
  Full pipeline để sản xuất video hoạt hình / YouTube Shorts & Long-form phong cách Western 2D Comic Cartoon Animation & Graphic Novel Explainer (truyện tranh hoạt họa phương Tây 2D: nét vẽ viền đen dày dặn bold outlines, nhân vật 2D hoạt hình biểu cảm hài hước/kịch tính, tiêu đề Title Header trên đỉnh, hiệu ứng va chạm Action Starburst, chữ tượng thanh Onomatopoeia SFX như CLANG!, POW!, CRACK!, BOOM!, màu cel-shading phẳng tươi sáng) — từ lên ý tưởng (Vũ khí cổ đại, Tập tục kỳ lạ, Đấu tay đôi lịch sử, Khoa học & What-If), viết kịch bản 5 hồi kịch tính, visual sourcing (Gemini prompts sinh ảnh Comic đồng nhất để người dùng tự tạo ảnh), đến scaffold Remotion và render. LUÔN dùng skill này khi user nói "làm video comic cartoon", "video hoạt hình truyện tranh phương Tây", "video phong cách comic", "video hoạt họa 2D nét đậm", "video vũ khí/lịch sử kiểu comic starburst", hoặc khi user gửi hình mẫu hoạt hình comic có chữ header và SFX va chạm.
---

# Comic Cartoon Video Engine (Western 2D Animated Explainer)

Pipeline sản xuất video hoạt hình phong cách **Western 2D Comic Cartoon & Animated Storytelling** (tham chiếu: truyện tranh hoạt họa phương Tây, *Simple History*, *The Infographics Show*, *OverSimplified Comic Edition*, *TED-Ed Cartoon Animations*). Định dạng: **9:16 Vertical (Shorts/TikTok/Reels)** và **16:9 Landscape (YouTube)**.

---

## ⚡ ENGINE SINH CHỦ ĐỀ ĐỘNG THEO 6 TRỤ CỘT

Khi người dùng yêu cầu gợi ý chủ đề mới:

1. **ĐỌC LỊCH SỬ CHỐNG TRÙNG**: Đọc `references/topic-history.md` $\rightarrow$ Tuyệt đối không đề xuất lại chủ đề đã sản xuất.
2. **SINH ĐỘNG 3-5 CHỦ ĐỀ MỚI THEO 6 TRỤ CỘT** (tham chiếu chi tiết tại `references/comic-topics.md`):
   - ⚔️ **Vũ Khí Cổ Đại & Cơ Chế Đối Đầu**: Roi mềm vs Chùy nặng, Đinh ba & Lưới La Mã vs Kiếm sắt, Kiếm đồng chém kiếm sắt.
   - ⚖️ **Luật Lệ & Tập Tục Kỳ Quặc Lịch Sử**: Ly hôn bằng đấu võ đài, Tòa án xét xử chú lợn mặc quần áo, Thử thách dìm nước.
   - 🏆 **Trận Đấu Tay Đôi & Đại Chiến Huyền Thoại**: Miyamoto Musashi đánh bại kiếm thánh bằng mái chèo gỗ, Berserker cầu Stamford.
   - 🔬 **Phá Giải Ngộ Nhận & Khoa Học Vui**: Mũ Viking có sừng là cú lừa, Bộ giáp sắt hiệp sĩ linh hoạt bất ngờ.
   - 🧠 **Tâm Lý Học Đời Sống & Bẫy Xã Hội**: Bẫy thức khuya trả thù giấc ngủ, Hiệu ứng Diderot mua sắm.
   - 🚨 **Sinh Tồn Kịch Tính & Tình Huống Giả Định**: Thang máy rơi tự do tầng 50, Cách thoát cát lún thực sự.
3. **LƯU NHẬT KÝ NGAY KHI DUYỆT**: Ghi topic đã chọn vào `references/topic-history.md` với trạng thái `[IN_PROGRESS]`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Visual DNA Truyện Tranh Hoạt Họa 2D (Comic Visual DNA & Character Bible)
- **Style DNA**: `Bold 2D vector comic cartoon style illustration, animated historical storybook aesthetic with thick clean black outlines and vibrant cel-shaded flat colors.`
- **Character & Uniform Bible (Đồng nhất phục trang 100%)**:
  - Mọi nhân vật chính và phe phái (lính, chỉ huy, phe đối lập, nhà vua) phải có mô tả màu sắc quân phục cố định xuyên suốt toàn bộ các cảnh (ví dụ: áo khoác, màu ve áo, nẹp cổ, mũ kepi/mũ sắt, quần, bốt). Không thay đổi kiểu dáng mũ hay màu áo giữa các shot.
- **Quy Chuẩn Full-Bleed 100% & Bố Cục Vùng An Toàn (Middle 70% Safe Zone)**:
  - **Full-Bleed Tràn Viền Tuyệt Đối**: Cảnh nền (bầu trời, ngọn núi, đường phố, lâu đài) phải vẽ tràn mép 100% cả 4 cạnh.
  - **CẤM DÙNG các từ gây sinh viền / khung thừa**: Tuyệt đối KHÔNG dùng các cụm từ như `margins`, `generous top/bottom margins`, `comic panel`, `panel framing`, `letterboxing` vì AI sẽ vẽ khung chữ nhật phân ô hoặc viền trắng trên/dưới.
  - **Câu lệnh chuẩn chống khung thừa**: `Single continuous full-screen scene filling 100% of the 9:16 vertical canvas edge-to-edge. Seamless full-bleed artwork, NO inner rectangular frames, NO comic panel borders, NO white bars, NO black bars, NO letterboxing, NO empty margins.`
  - **Action Starburst & SFX**: Tia nổ va chạm ngôi sao nhiều cánh kèm chữ tượng thanh đặt ngay cạnh điểm va chạm ở trung tâm (`CLANG!`, `BALG!`, `HALT!`, `POW!`, `CRACK!`).
- **CẤM DÙNG**: `photorealistic, 3D render, dark grunge, textured parchment, messy sketch, stickman que 1 sợi không quần áo`.

### 2. Quy Chuẩn Xuất Prompt Sinh Ảnh Cho Người Dùng (Prompts Export & Safe-Zone Delivery)
- Xuất toàn bộ danh sách prompt sinh ảnh chi tiết vào `prompts_gemini.md` (định dạng Markdown dễ copy) và `prompt.json` (mảng JSON).
- Cấu trúc prompt 9:16 chuẩn: Style DNA, Single continuous full-screen clause, Bối cảnh full-bleed & Nhân vật trung tâm (với Character Bible chi tiết), Biểu cảm kịch tính, Action Starburst & SFX, kèm câu lệnh chống khung thừa & viền trắng.
- **Người dùng tự tạo ảnh**: Người dùng sử dụng các công cụ AI yêu thích (Google Flow, Gemini Imagen 3, Midjourney, DALL-E...) để tạo ảnh và lưu trực tiếp vào thư mục `public/assets/scenes/` với tên file chuẩn (`0.png`, `1.png`, ... `N-1.png`).
- Agent kiểm tra sự hiện diện của các file ảnh bằng lệnh `ls public/assets/scenes/` trước khi tiến hành preview Remotion Studio hoặc render.

### 3. Xác Định Ngôn Ngữ Dự Án (Default: English)
- Mặc định là **Tiếng Anh (English)** nếu người dùng không yêu cầu ngôn ngữ khác.
- Toàn bộ kịch bản thoại (`voText_en.md`), text tiêu đề và chữ SFX trong prompt AI phải đồng bộ 100% theo ngôn ngữ đã chọn.

### 4. Dự Án Độc Lập 100% (Project Isolation Rule)
- Mỗi video mới nằm trong một thư mục riêng biệt (kebab-case, ví dụ: `shorts-ancient-weaponry-clash/`, `shorts-medieval-pig-on-trial/`).
- Tự chứa đầy đủ: `package.json`, `tsconfig.json`, `remotion.config.ts`, `src/`, `public/assets/scenes/`, `scenes.json`, `prompt.json`, `prompts_gemini.md`, `metadata.md`.

### 5. Nhịp Cắt Cảnh & Giữ Chân Cực Đại (Pacing & Retention — Quy Tắc < 3s / Ảnh)
- **Shorts 9:16 Kể Chuyện Bằng Ảnh (Image Storytelling Shorts)**:
  - **QUY TẮC BẮT BUỘC 1 ẢNH < 3.0S**: Độ dài mỗi ảnh chỉ được phép từ **1.8s – 2.8s/shot (50 – 85 frames ở 30fps)**. Tuyệt đối **KHÔNG** để 1 ảnh tĩnh hiển thị quá 3s khiến người xem bị "chán mắt" và giảm tỷ lệ giữ chân (Viewer Retention).
  - **Kỹ thuật phân rã câu thoại (Micro-Beat Visual Splitting)**: Mỗi câu thoại dài 5–7s bắt buộc phải phân rã thành **2 đến 3 visual shots liên tiếp** với các góc máy đa dạng:
    - *Beat 1 (Establishing/Action)*: Bối cảnh toàn cảnh / Nhân vật hành động xuất kích.
    - *Beat 2 (Close-up/Gag)*: Cận cảnh biểu cảm kịch tính / sốc / toát mồ hôi / há hốc mồm.
    - *Beat 3 (Punchline/SFX)*: Đồ họa Infographic / Chalkboard / Tia nổ Starburst SFX / Kết quả bất ngờ.
  - Video 60s $\rightarrow$ Cần **25–30 shots**. Video 100–110s $\rightarrow$ Cần **40–48 shots**.
- **Video dài 16:9 (5–10 phút)**: Nhịp **3.5s – 5.0s/shot** (tổng 60–100 shots).
- Giây 0.0 bắt buộc là **Visual Gag / Va chạm kịch tính** để giữ chân người xem ngay lập tức.

### 6. Thiết Kế Âm Thanh 3 Lớp (Master Audio & Comic SFX)
- Voiceover Master liền mạch (`public/audio/voiceover.mp3`). Sử dụng `ffmpeg silencedetect` để bắt chính xác khoảng lặng tự nhiên làm điểm chuyển shot.
- Điểm va chạm thị giác (Starburst) phải khớp chính xác từng frame với tiếng SFX (`sfx_clang.mp3`, `sfx_whip.mp3`, `sfx_gavel.mp3`).
- Nhạc nền BGM Ambient nhẹ nhàng (-20dB).

### 7. Channel Mascot Watermark
- Hiển thị avatar tròn Mascot (`avatar_comic_channel.png`, đường kính 120px, viền vàng kim `#FACC15`) ở góc phải dưới (`bottom: 60px, right: 40px`, `zIndex: 999`).
- **File avatar chưa có sẵn trong `resources/`** — trước Bước 5, tạo/lấy file `avatar_comic_channel.png` rồi copy vào `<topic-folder>/public/` (theo mẫu `horror-storytelling-video-engine/resources/` + Bước 5 của skill đó).

---

## 🚀 QUY TRÌNH 8 BƯỚC SẢN XUẤT CHUẨN

```
0. Xác Định Ngôn Ngữ & Tỷ Lệ (9:16 / 16:9)
        ↓
1. Chọn Chủ Đề (6 Trụ Cột Comic) → 2. Viết Kịch Bản 5 Hồi Kịch Tính
   (references/comic-topics.md)        (references/script-writing.md)
        ↓
3. Scene Breakdown (2.5-4s/shot) → 4. Visual Prompts (Middle 70% Safe Zone + SFX)
   (timing + scenes.json)             (Xuất prompts_gemini.md + prompt.json cho user tạo ảnh)
        ↓
5. Scaffold Standalone Project  → 6. Master Audio & Sync Silencedetect
   (references/remotion-scaffold.md)   (references/sound-design.md)
        ↓
7. Tạo High-CTR Thumbnail 2D Comic (Quy tắc 1-1-4)
   (references/metadata.md - 1 Nhân vật + 1 Va chạm + Text ≤ 4 từ)
        ↓
8. Retention QC, Preview Studio & Render
   (references/retention-qc.md - A/B Titles)
```

---

### Bước 0: Xác Định Ngôn Ngữ & Tỷ Lệ Khung Hình
- Mặc định English (`en`). Xác định tỷ lệ: `9:16` (Shorts) hoặc `16:9` (Long-form).

### Bước 1: Chọn Chủ Đề Comic (6 Trụ Cột Đề Tài)
- Đọc `references/topic-history.md` chống trùng lặp, đề xuất 3-5 ý tưởng theo 6 trụ cột tại `references/comic-topics.md`. Lưu trạng thái `[IN_PROGRESS]` khi duyệt.

### Bước 2: Viết Kịch Bản 5 Hồi Kịch Tính
- Đọc `references/script-writing.md`. Viết kịch bản tự sự gay cấn, hài hước, phân định rõ Action Beats & Onomatopoeia SFX. Lưu vào `voText_<lang>.md`.

### Bước 3: Scene Breakdown & Timing
- Phân chia shot ngắn (2.5s - 4.0s/shot cho Shorts). Tạo `scenes.json` với đầy đủ timestamp, caption, headline, SFX name.

### Bước 4: Visual Prompts & Bàn Giao Cho Người Dùng Tự Tạo Ảnh
- Đọc `references/visual-sourcing.md` và `references/comic-style-guide.md`.
- Áp dụng quy tắc **Middle 70% Safe Zone** cho định dạng dọc 9:16 (tuyệt đối không đặt title header sát mép trên cùng, tập trung nhân vật & SFX ở trung tâm).
- Xuất toàn bộ prompts ra `prompts_gemini.md` (dạng Markdown code block) và `prompt.json` (mảng JSON).
- Người dùng tự sử dụng công cụ AI sinh ảnh (Flow, Gemini Imagen 3, Midjourney...) và chép file ảnh vào `public/assets/scenes/` (`0.png` ... `N-1.png`).

### Bước 5: Scaffold Standalone Project Remotion
- Đọc `references/remotion-scaffold.md`. Khởi tạo project Remotion độc lập với đầy đủ `Root.tsx`, `ComicScene.tsx`, `ComicBurstOverlay.tsx`, `ChannelWatermark.tsx`.

### Bước 6: Master Audio & Đồng Bộ Âm Thanh SFX
- Đọc `references/sound-design.md`. Tạo master voiceover, chạy `ffmpeg silencedetect` để tinh chỉnh frame chuyển cảnh, khớp từng tiếng SFX (`CLANG!`, `POW!`) với frame nổ Starburst.

### Bước 7: Tạo High-CTR Thumbnail & Tối Ưu Metadata
- Đọc `references/metadata.md`. Thiết kế prompt Thumbnail theo quy tắc 1-1-4 (1 Nhân vật sốc + 1 Điểm va chạm + Text ≤ 4 từ). Xuất bộ Metadata gồm 3 tiêu đề A/B test, Description, 15 Thẻ Tags.

### Bước 8: Kiểm Duyệt Chất Lượng (Retention QC) & Render
- Đọc `references/retention-qc.md`. Kiểm tra checklist âm thanh, hình ảnh, mở Remotion Studio kiểm tra preview, sau đó render video MP4.

---

## 📖 TÀI LIỆU THAM CHIẾU CHI TIẾT (REFERENCES)

1. [Quy Chuẩn Phong Cách Thị Giác (comic-style-guide.md)](references/comic-style-guide.md)
2. [Hướng Dẫn Prompt & Visual Sourcing (visual-sourcing.md)](references/visual-sourcing.md)
3. [6 Trụ Cột Đề Tài Comic (comic-topics.md)](references/comic-topics.md)
4. [Kỹ Thuật Viết Kịch Bản 5 Hồi (script-writing.md)](references/script-writing.md)
5. [Scaffold Dự Án Remotion (remotion-scaffold.md)](references/remotion-scaffold.md)
6. [Thiết Kế Âm Thanh & SFX (sound-design.md)](references/sound-design.md)
7. [Tối Ưu Metadata & Thumbnail High-CTR (metadata.md)](references/metadata.md)
8. [Kiểm Duyệt Chất Lượng & Render (retention-qc.md)](references/retention-qc.md)
9. [Nhật Ký Chống Trùng Đề Tài (topic-history.md)](references/topic-history.md)
10. [Thiết Lập Kênh YouTube (channel-setup.md)](references/channel-setup.md)
