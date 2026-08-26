# Kiểm Tra Giữ Chân Người Xem (Retention QC Guide)

Bảng kiểm soát chất lượng (QC) nhằm tối ưu hóa tỉ lệ giữ chân khán giả (Audience Retention) trên YouTube (>60% retention ở mốc 30 giây và >45% ở cuối video).

---

## 1. Quy Tắc 3 Giây (The 3-Second Visual Change Rule)

Khán giả sẽ thoát video nếu màn hình đứng yên hoặc chỉ có 1 hình ảnh tĩnh trong quá 3 giây (90 frames ở 30fps).
- [ ] **Mọi 3 giây phải có ít nhất 1 biến đổi**:
  - Stickman đổi tư thế / chớp mắt / run rẩy.
  - Camera zoom-in hoặc pan nhẹ sang đối tượng bên cạnh.
  - Một mũi tên, đường nét đứt hoặc nhãn chú thích mới được vẽ thêm.
  - Một con số (nhiệt độ, calo) nhảy giá trị.

---

## 2. Checklist Rà Soát Kịch Bản & Cốt Truyện (Narrative QC)

- [ ] **Hook có chứa nghịch lý rõ ràng không?**
  - *Đạt*: "Họ vượt biển băng nhưng cấm dùng lửa — Làm sao sống sót?"
  - *Không đạt*: "Hôm nay chúng ta sẽ tìm hiểu về trang phục của người Viking."
- [ ] **Có tạo cảm giác 'Mối đe dọa thường trực' không?**
  - Người xem phải luôn cảm thấy cái chết đang rình rập nhân vật từng phút nếu không có giải pháp kỹ thuật đúng.
- [ ] **Giải pháp có đi từ Đơn giản đến Sâu sắc không?**
  - Không giải thích hết tất cả trong 1 phút đầu. Phải mở từng lớp (Lớp 1: Len -> Lớp 2: Thức ăn -> Lớp 3: Thuyền -> Lớp 4: Kỷ luật).
- [ ] **Có 'Cú ngoặt nhận thức' (Mindset Shift) ở cuối không?**
  - Video không chỉ dừng lại ở liệt kê chi tiết, mà phải tôn vinh trí tuệ cổ đại.

---

## 3. Checklist Kỹ Thuật & Đồ Họa Remotion

- [ ] **100% Tiếng Anh trong Tranh**: Mọi hình ảnh AI tạo ra có chứa chữ (sơ đồ, nhãn số liệu, bảng so sánh) đều phải là tiếng Anh chữ Latin (tuyệt đối không bị lẫn chữ Ả Rập, Ba Tư hay thư pháp lạ).
- [ ] **Khung Hình Sạch Sẽ (Không Badges che góc)**: Tranh vẽ minh họa phải hiển thị toàn vẹn không gian, không bị các khối thẻ tiêu đề/badge ở góc trên bên trái che khuất nét vẽ.
- [ ] **Hiệu Ứng Lật Trang Liền Mạch**: Mỗi lần chuyển sang Scene mới phải có `page-turn.wav` (volume `0.20`, `delay: 0`) để tạo cảm giác lật mở bản thảo cổ kính.
- [ ] **Âm Thanh Ngữ Cảnh & Không Dùng Âm Meme**: SFX chỉ xuất hiện khi có lý do hình ảnh rõ rệt (`whoosh`, `shutter-old`, `ui-switch`, `ding`), không dùng các âm chát chúa (`vine-boom`, `record-scratch`).
- [ ] **Độ Dài Khớp Audio Master**: Tổng số frames của Composition khớp chính xác 100% với file âm thanh lồng tiếng (`full-scene.mp3` / `full-scene.wav`).
- [ ] **Tên Composition Hợp Lệ**: Đặt ID Composition với dấu gạch ngang (ví dụ: `Topic-EN`, `Topic-VI`), không dùng dấu gạch dưới `_`.
- [ ] **Safe Zones**: Toàn bộ chữ và sơ đồ nằm trọn trong vùng an toàn (cách mép màn hình ít nhất 80px ở 16:9, 140px ở 9:16 Shorts).
- [ ] **Visual Clarity (Kiểm tra khi tắt tiếng)**: Bật video ở chế độ câm (mute) và xem lướt — nếu bạn vẫn hiểu được 80% câu chuyện nhờ sơ đồ và icon, video đã đạt chuẩn thị giác xuất sắc.
- [ ] **Audio Balance**: BGM và SFX nhẹ nhàng nền ở mức -18dB đến -22dB, không lấn át giọng thuyết minh chính.

