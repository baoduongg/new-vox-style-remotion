# Hướng Dẫn Voiceover & TTS Kể Chuyện (Storyteller Voice Guide)

Tài liệu này hướng dẫn thiết lập giọng đọc lồng tiếng (Voiceover) chuẩn phong cách kể chuyện hoạt họa lôi cuốn, kịch tính và giàu cảm xúc.

---

## 1. Yêu Cầu Về Tông Giọng & Phong Cách Kể (Storyteller Persona)

- **Đặc trưng**: Sống động, biến hóa linh hoạt, biết nhấn nhá ở những chi tiết quan trọng, có chất châm biếm hài hước nhẹ nhàng nhưng vẫn giữ được sự sâu sắc ở những thời khắc sinh tử.
- **Tốc độ đọc**: ~2.3 đến 2.6 từ/giây (khoảng 140 - 155 từ/phút).
- **Khoảng ngắt kịch tính (Dramatic Pauses)**:
  - Ngắt 0.4s - 0.6s trước mỗi câu chốt cú ngoặt (Plot Twist) hoặc tình huống ngặt nghèo.
  - Ngắt 0.3s sau mỗi câu thoại hài hước để người xem kịp ngấm tiếng cười.

---

## 2. Thiết Lập Cấu Hình AI TTS

### A. Edge-TTS (Miễn phí & Nhanh)
- **Tiếng Việt**:
  - Voice: `vi-VN-NamMinhNeural` (Giọng nam truyền cảm, giàu nội lực) hoặc `vi-VN-HoaiMyNeural` (Giọng nữ diễn cảm).
  - Rate: `+0%` đến `+5%` (tùy độ dồn dập của phân đoạn hành động).
  - Pitch: `+0Hz`.

### B. ElevenLabs (Nếu dùng Tiếng Anh - Khuyên Dùng)
- **Voice model khuyến nghị**:
  - *Charlie* hoặc *George*: Giọng kể chuyện lôi cuốn, hài hước và giàu biểu cảm (tham chiếu phong cách *OverSimplified* / *Thoughty2*).
  - *Adam* hoặc *Marcus*: Giọng trầm, căng thẳng cho các câu chuyện sinh tồn / đại án nghiêm túc.
- **Cấu hình Voice Settings**:
  - Stability: `0.50` đến `0.58` (độ ổn định vừa phải giúp giọng có sự biến đổi cảm xúc tự nhiên).
  - Similarity: `0.85`.
  - Style Exaggeration: `0.15` đến `0.25` (tăng tính kịch tính của lời kể).

---

## 3. ⚠️ Quy Tắc Bắt Buộc: Đồng Bộ Lại Timing Sau Mỗi Lần Tạo/Sửa Voice

`scenes.json` chỉ khớp với **đúng file audio đã dùng để tính nó**. Bất kỳ lần nào file `full-scene.mp3`/`.wav` bị tạo lại (đổi giọng, đổi rate, sửa câu chữ, re-export...) — dù nhỏ — thì `startFrame`/`durationInFrames` cũ đều lỗi thời và **phải tính lại từ đầu**, không được coi là "gần đúng thì thôi".

- Luôn đo độ dài audio hiện tại bằng `ffprobe` (không tin số đã biết trước đó) trước khi tính hoặc kiểm tra timing.
- Phương pháp tính chính xác nhất là **ASR word-level alignment** bằng `faster-whisper` — xem recipe đầy đủ (script cài đặt, transcribe, đối chiếu `difflib.SequenceMatcher`) tại `references/remotion-scaffold.md` Mục 5.C.
- Checklist đầy đủ cho toàn bộ vòng đồng bộ audio-visual (tên file ảnh, đuôi file audio, timing) nằm ở `references/remotion-scaffold.md` Mục 5.
