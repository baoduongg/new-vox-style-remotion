# Hướng Dẫn Voiceover & TTS (Voiceover Guide)

Tài liệu hướng dẫn thiết lập giọng đọc lồng tiếng (Voiceover) chuẩn phong cách phim tài liệu lịch sử / khảo cổ học khám phá.

---

## 1. Yêu Cầu Về Tông Giọng (Voice Persona)

- **Đặc trưng**: Trầm ấm, điềm đạm, rõ ràng, mang tính tò mò khám phá nhưng uy quyền học thuật (giống như người dẫn chuyện phim tài liệu *National Geographic* hay *BBC Earth*).
- **Tốc độ đọc**: ~2.2 đến 2.5 từ/giây (khoảng 130 - 145 từ/phút). Không nói quá nhanh kiểu tin tức thời sự, cần có khoảng nghỉ 0.5s giữa các ý chính để người xem kịp thẩm thấu sơ đồ hình ảnh.

---

## 2. Thiết Lập Prompt / Cấu Hình AI TTS

### A. Edge-TTS / Magpie TTS
- **Tiếng Việt**:
  - Voice: `vi-VN-NamMinhNeural` (Giọng nam trầm, chuẩn phát âm, rất hợp phim tài liệu).
  - Rate: `-5%` (hạ nhẹ tốc độ để tăng độ trang trọng).
  - Pitch: `-2Hz` (tăng độ dày, trầm của giọng).

### B. ElevenLabs (Nếu dùng tiếng Anh)
- **Voice model**: *Adam*, *Marcus*, hoặc *George* (Deep, authoritative, historical documentary).
- **Settings**:
  - Stability: `0.65` (đảm bảo giọng đọc ổn định, không bị cảm xúc thái quá).
  - Clarity / Similarity: `0.80`.
  - Style Exaggeration: `0.10`.
