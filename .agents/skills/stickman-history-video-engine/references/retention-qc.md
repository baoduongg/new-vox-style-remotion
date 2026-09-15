# Kiểm Tra Giữ Chân Người Xem (Retention QC Guide)

Bảng kiểm soát chất lượng (QC) nhằm tối ưu hóa tỉ lệ giữ chân khán giả (Audience Retention) trên YouTube (>60% retention ở mốc 30 giây đầu và >45% ở cuối video).

---

## 1. Quy Tắc Chuyển Đổi Thị Giác 5-8 Giây (5-8s Visual Pacing Rule)

Khán giả sẽ bấm thoát video nếu màn hình đứng yên 1 hình ảnh quá 10 giây.
- [ ] **Mỗi phân đoạn thoại 20-30s phải chia thành 2-4 shots hình ảnh** (mỗi shot kéo dài 5-8s / 150-240 frames).
- [ ] **Chuyển động Camera Ken Burns linh hoạt**: Luân phiên giữa Zoom-in, Zoom-out, Pan-left, Pan-right kết hợp hiệu ứng rung nhẹ (breathing).
- [ ] **Phụ đề hoạt hình đồng bộ**: Chữ nhảy mượt mà theo nhịp đọc, từ khóa quan trọng được tô vàng/cam nổi bật.

---

## 2. Checklist Rà Soát Kịch Bản & Cốt Truyện (Narrative QC)

- [ ] **Hook Nghịch Lý Thời Gian Thực**: Bắt đầu bằng 1 vấn đề nan giải thời hiện đại $\rightarrow$ đối chiếu với cách người cổ đại giải quyết ngoạn mục.
- [ ] **Mối đe dọa sinh tử**: Luôn duy trì cảm giác căng thẳng (cái lạnh -30°C, cơn khát sa mạc, quái thú khổng lồ, bão biển).
- [ ] **Bóc tách 4 lớp giải pháp**: Không giải thích qua loa; phải đi qua từng lớp: Vật liệu $\rightarrow$ Sinh học/Hóa học $\rightarrow$ Cơ học/Kỹ thuật $\rightarrow$ Kỷ luật.
- [ ] **Bằng chứng khảo cổ học**: Trích dẫn di tích, hiện vật thực tế hoặc các thí nghiệm tái hiện hiện đại để tăng độ tin cậy.

---

## 3. Checklist Kỹ Thuật & Đồ Họa Remotion

- [ ] **Văn bản trong tranh chuẩn 100% ngôn ngữ**: Nếu là dự án tiếng Anh $\rightarrow$ 100% tiếng Anh; nếu là tiếng Việt $\rightarrow$ 100% tiếng Việt chuẩn dấu (tuyệt đối không bị rác chữ).
- [ ] **Khung hình 2D Vector sạch sẽ**: Nhân vật stickman đầu tròn viền đen rõ nét, màu sắc tươi sáng, bóng cel-shading mềm, không có watermark rác của AI.
- [ ] **Watermark Mascot Kênh**: Hiển thị duy nhất avatar tròn Mascot ở góc phải dưới (`bottom: 60px, right: 40px`, đường kính 150px), viền vàng kim sắc sảo.
- [ ] **Âm thanh Master liền mạch**: Tổng số frames của Composition khớp chính xác 100% với file âm thanh `full-scene.mp3`.
- [ ] **Typecheck Passed**: Lệnh `npx tsc --noEmit` không có bất kỳ lỗi TypeScript nào.

---

## 4. Checklist Tiêu Đề & Thumbnail (High-CTR & Rule 3 Giây Trên Mobile)

- [ ] **Tiêu Đề Tránh 100% Anti-patterns**:
  - Không có đuôi học thuật vô hồn `(Real Physics)`, `(Analysis)`.
  - Không có mẫu câu văn miêu tả chung chung `The Craziest Lengths...`.
  - Không dùng `The ENTIRE History of...` cho video dưới 15 phút.
  - Không chứa tag chuỗi tập phim `Part 01`, `P3`.
- [ ] **Cung Cấp Đủ 2 Phương Án A/B Test Title**: Có sẵn Option A (Tò mò/Nghịch lý) và Option B (Xung đột/Hậu quả) trong `metadata.md`.
- [ ] **Thumbnail Đạt Chuẩn 1-1-4 (Rule 3 Giây)**:
  - **1 Nhân vật**: Biểu cảm cực sốc (mắt tròn xoe O_O, há hốc mồm hoặc toát mồ hôi).
  - **1 Điểm va chạm / Đối đầu**: Kiếm gãy đôi tóe lửa, báu vật phát sáng giữa nền tối, mũi tên đỏ lao dốc tụt vực.
  - **Text Thumbnail**: Tối đa 3 - 4 từ, in hoa font dày, màu vàng chanh/đỏ viền đen đậm, đọc rõ trong 3s trên màn hình điện thoại 5 inch.
- [ ] **Đồng Bộ Nội Dung Giữa Thumbnail Và 15s Đầu Kịch Bản**: Trả lời hoặc dẫn thẳng vào nghịch lý ngay Act 1 (Payoff nhanh), không nói vòng vo.

