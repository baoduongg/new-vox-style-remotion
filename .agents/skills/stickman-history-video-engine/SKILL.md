---
name: stickman-history-video-engine
description: Full pipeline để sản xuất video YouTube phong cách Stickman 2D Animated Explainer & Documentary (hoạt họa người que 2D vector tối giản, biểu cảm phong phú, sơ đồ mặt cắt khoa học, giải thích trực quan các chủ đề: Khoa học/Y học, Tài chính/Kinh tế, Tâm lý học/Thói quen, Công nghệ/AI, Sinh tồn/What-If, và Lịch sử cổ đại) — từ lên ý tưởng, viết kịch bản, visual sourcing (Gemini prompts/SVG stickman), đến scaffold và ráp Remotion. LUÔN dùng skill này khi user nói "làm video stickman", "video người que", "làm video giải thích kiểu Kurzgesagt / AsapSCIENCE / Psych2Go / Casually Explained / OverSimplified / Before Civilization", "video what-if", hoặc muốn làm video kiến thức giải thích trực quan bằng người que.
---

# Stickman Universal Video Engine (Science, Finance, Psychology, Tech, Survival & History)

Pipeline sản xuất video YouTube phong cách **Stickman 2D Vector Animated Explainer** (tham chiếu: *Kurzgesagt*, *AsapSCIENCE*, *Psych2Go*, *Casually Explained*, *OverSimplified*, *Before Civilization*). Định dạng: **16:9** (YouTube dài, 8-15 phút) hoặc **9:16** (Shorts).

---

## ⚡ ENGINE SINH CHỦ ĐỀ ĐỘNG THEO 6 PHÂN HỆ

Khi người dùng yêu cầu gợi ý chủ đề mới:

1. **ĐỌC LỊCH SỬ CHỐNG TRÙNG**: Đọc `references/topic-history.md` $\rightarrow$ Tuyệt đối không đề xuất lại chủ đề đã sản xuất.
2. **SINH ĐỘNG 3-5 CHỦ ĐỀ MỚI THEO 6 PHÂN HỆ** (tham chiếu chi tiết tại `references/viking-topics.md`):
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
- Hiển thị duy nhất avatar tròn Mascot (`avatar_stickman_channel.jpg`, đường kính 64px, viền kim loại vàng kim) ở góc phải dưới (`bottom: 32px, right: 36px`, `zIndex: 999`).

---

## 🚀 QUY TRÌNH 8 BƯỚC SẢN XUẤT CHUẨN

```
0. Xác Định Ngôn Ngữ → 1. Chọn Chủ Đề (6 Phân Hệ) → 2. Viết Kịch Bản 5 Phần
   (Default: English)      (viking-topics.md)            (script-writing.md)
        ↓
3. Scene Breakdown (5-8s) → 4. Visual Prompts (Đúng Ngôn Ngữ Nhãn Sơ Đồ)
   (timing + 40-55 shots)      (visual-sourcing.md + stickman-style-guide.md)
        ↓
5. Scaffold Standalone Project → 6. Master Audio & Sync Silencedetect
   (remotion-scaffold.md)           (sound-design.md)
        ↓
7. Tạo High-CTR Thumbnail 2D Vector → 8. QC, Preview Studio & Render
   (metadata.md - 3 điểm chạm)            (retention-qc.md)
```
