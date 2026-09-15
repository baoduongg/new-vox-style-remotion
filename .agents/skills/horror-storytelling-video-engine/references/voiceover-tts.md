# Voiceover & TTS Engine Guide (Horror Storytelling)

Tài liệu này hướng dẫn cách cấu hình và tối ưu hóa giọng đọc kể chuyện kinh dị / truyện ma đêm khuya cho các engine Text-To-Speech (TTS) hoặc diễn viên lồng tiếng thực tế.

---

## 🎙️ 1. ĐẶC TRƯNG GIỌNG ĐỌC KỂ CHUYỆN KINH DỊ

Một giọng đọc truyện ma xuất sắc cần hội tụ 4 yếu tố cốt lõi:

1. **Âm vực Trầm Ấm & Ma Mị (Deep & Resonant Tone)**: Tông giọng trầm, ấm, hơi khàn nhẹ tạo cảm giác gần gũi như một người từng trải đang ngồi đối diện kể lại chuyện có thật lúc nửa đêm.
2. **Nhịp Điệu Chậm Rãi & Nhấn Nhá (Measured Pacing 120-140 từ/phút)**: Không đọc nhanh, không đọc đều đều ru ngủ; luôn có những khoảng buông lơi có chủ đích.
3. **Khoảng Lặng Nghẹt Thở (Suspenseful Breath Pauses)**: Tận dụng dấu ba chấm `...` và dấu gạch ngang `—` để tạo khoảng nghỉ 0.5s – 1.2s trước các từ khóa ghê rợn.
4. **Biến Hóa Cảm Xúc Theo 4 Hồi**: Khởi đầu bí ẩn $\rightarrow$ Hồi hộp tăng dần $\rightarrow$ Nghẹn thở dồn dập $\rightarrow$ Sâu lắng ám ảnh.

---

## ⚙️ 2. CẤU HÌNH TTS CHO CÁC ENGINE PHỔ BIẾN

### 1. ElevenLabs:
- **Giọng Tiếng Anh (`en`) gợi ý**: *George (Warm, Storyteller)*, *Marcus (Deep, Authoritative)*, *Adam (Intense, Narrative)*.
- **Giọng Tiếng Việt (`vi`) gợi ý**: Các giọng Custom Voice Clone có chất giọng miền Bắc hoặc miền Nam trầm ấm, vang nhẹ.
- **Thông số tối ưu cho Horror**:
  - `Stability`: `0.70 – 0.78` (Giữ độ ổn định giọng trầm, tránh bị vỡ giọng).
  - `Similarity`: `0.80 – 0.85` (Độ tương đồng cao với mẫu giọng gốc).
  - `Style Exaggeration`: `0.15 – 0.25` (Tăng nhẹ độ biểu cảm).
  - `Speaker Boost`: `ON`.

### 2. Microsoft Edge TTS (Miễn Phí):
- **Tiếng Việt**: `vi-VN-NamMinhNeural` (Giọng nam miền Bắc trầm ấm) hoặc `vi-VN-HoaiMyNeural` (Giọng nữ truyền cảm).
  - Tham số: `rate: "-10%"`, `pitch: "-3Hz"`.
- **Tiếng Anh**: `en-US-ChristopherNeural` hoặc `en-US-GuyNeural`.
  - Tham số: `rate: "-8%"`, `pitch: "-2Hz"`.

### 3. OpenAI TTS:
- **Model**: `tts-1-hd`.
- **Voice**: `onyx` (Nam trầm sâu lắng) hoặc `echo` (Vang nhẹ ma mị).
- **Speed**: `0.92` (Giảm nhẹ tốc độ đọc để tạo không khí u uất).

---

## 📝 3. NGUYÊN TẮC CHUẨN HÓA FILE `voText_<lang>.txt` CHO TTS

Để file TTS đọc chuẩn xác và không bị lỗi vấp từ:

1. **Phiên âm toàn bộ số và ký hiệu**:
   - Viết `ba giờ sáng` thay vì `3h sáng` hoặc `3:00 AM`.
   - Viết `phòng bốn trăm linh tư` thay vì `phòng 404`.
   - Viết `hai mươi triệu đồng` thay vì `20tr` hay `20.000.000đ`.
2. **Loại bỏ 100% stage directions**:
   - Xóa sạch mọi tag như `[(giọng trầm)]`, `[(thì thầm)]`, `[SCENE 1]` trong file `.txt`.
3. **Chèn dấu câu tạo nhịp thở**:
   - Dùng `...` trước các từ tạo bất ngờ: `Cửa xe mở ra... và không có ai cả.`
   - Mỗi câu thoại chính là một dòng riêng biệt trong file `.txt`.
