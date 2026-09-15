# Kiểm Tra Giữ Chân Người Xem Kể Chuyện (Story Retention QC Guide)

Bảng kiểm soát chất lượng (QC) nhằm tối ưu hóa tỉ lệ giữ chân khán giả (Audience Retention) trên YouTube (>65% retention ở mốc 30 giây và >50% ở cuối video).

---

## 1. Quy Tắc 3 Giây Thị Giác (The 3-Second Story Motion Rule)

Trong thể loại kể chuyện hoạt họa, khán giả rất nhạy cảm với sự nhàm chán nếu khung hình đứng yên quá lâu:
- [ ] **Mọi 3 đến 5 giây phải có ít nhất 1 biến đổi thị giác**:
  - Nhân vật đổi biểu cảm (mắt chớp, mồ hôi bắn ra, há hốc miệng).
  - Camera chuyển động Ken Burns (zoom-in biểu cảm, pan theo đường chạy).
  - Bong bóng thoại (Speech Bubble), bài báo giật gân hoặc tài liệu pop-in.
  - Chuyển shot góc quay mới (toàn cảnh $\rightarrow$ cận cảnh khuôn mặt).

---

## 2. Checklist Cốt Truyện Kể Chuyện (Narrative Retention QC)

- [ ] **Hook 30 giây đầu có tạo được sự tò mò không thể cưỡng lại không?**
  - *Đạt*: "Năm 1925, một gã đàn ông bí ẩn đã bán đứt tháp Eiffel lấy hàng triệu đô... và 6 tháng sau hắn quay lại bán tiếp lần thứ hai!"
  - *Không đạt*: "Xin chào các bạn, hôm nay chúng ta sẽ tìm hiểu về tiểu sử của Victor Lustig."
- [ ] **Có gài cắm 'Vòng lặp tò mò' (Curiosity Loops) mỗi 45 - 60 giây không?**
  - Luôn mở ra một câu hỏi mới trước khi giải đáp câu hỏi cũ (ví dụ: "Nhưng kế hoạch suýt đổ bể khi một vị khách bất ngờ xuất hiện...").
- [ ] **Có sự đan xen giữa Căng Thẳng (Tension) và Hài Hước (Humor) không?**
  - Không để không khí quá nặng nề hoặc quá nhảm nhí, phải giữ được sự kịch tính kết hợp các chi tiết châm biếm duyên dáng.
- [ ] **Cú Twist ở Cao Trào có đủ bất ngờ không?**
  - Cú ngoặt cốt truyện phải hợp lý nhưng vượt ngoài dự đoán thông thường của người xem.
- [ ] **Phần kết có đọng lại dư vị hoặc bài học đắt giá không?**
  - Video không chỉ dừng lại ở kể sự kiện mà phải tôn vinh tinh thần con người hoặc chỉ ra bài học cuộc sống sâu sắc.

---

## 3. Checklist Kỹ Thuật & Remotion

- [ ] **Ngôn Ngữ Trong Tranh Đúng 100%**: Mọi tiêu đề báo chí, biển hiệu, thư từ trong ảnh minh họa tuân thủ đúng ngôn ngữ dự án đã chọn (Tiếng Anh hoặc Tiếng Việt có dấu chuẩn).
- [ ] **Hiệu Ứng Lật Trang Liền Mạch**: Mỗi lần chuyển sang Scene mới đều có âm thanh lật trang nhẹ `page-turn.wav` (volume `0.20`, `delay: 0`).
- [ ] **Khung Hình Sạch Sẽ (Không Badges che góc)**: Khung hình hiển thị trọn vẹn nét vẽ nghệ thuật 2D, không bị các khối thẻ tiêu đề to che khuất.
- [ ] **Watermark Mascot Kênh**: Hiển thị duy nhất avatar tròn Mascot viền vàng ở góc phải dưới (`bottom: 60px, right: 40px`, đường kính 150px), không có text tên kênh.
- [ ] **Khớp Frame Audio 100%**: Tổng số frames của Composition khớp chính xác tuyệt đối với độ dài file voiceover (`ffprobe -show_entries format=duration` — không tin số cũ đã biết, luôn đo lại file hiện tại trên đĩa).
- [ ] **Audio Balance Chuẩn**: BGM không lấn át voiceover (duy trì `-20dB` đến `-24dB` khi có tiếng đọc), SFX giòn giã ở mức `-10dB` đến `-14dB`.
- [ ] **Tên File Ảnh Đúng Chuẩn**: `ls public/assets/scenes/` cho ra đúng `0.png ... N-1.png` — không tiền tố (`Scene 0.png`), không khoảng trắng, không số đệm.
- [ ] **Đuôi File Audio Khớp Root.tsx**: `ls public/audio/scenes/` khớp chính xác với đường dẫn trong `<Audio src={staticFile(...)} />` — không giả định `.mp3`/`.wav`.
- [ ] **Timing Đã Đồng Bộ Với Audio Hiện Tại (không phải bản cũ)**: Nếu voice từng được tạo lại sau khi `scenes.json` đã có timing, phải chạy lại quy trình đồng bộ (ưu tiên ASR alignment, xem `remotion-scaffold.md` Mục 5.C) trước khi coi là đạt QC.
- [ ] **Phụ Đề Burned-in Đồng Bộ**: `Subtitle.tsx` hiển thị đúng câu `voText` tại đúng thời điểm giọng đọc, có nền mờ phía sau chữ để đọc được trên mọi nền ảnh, không đè lên watermark.
- [ ] **Typecheck Không Lỗi**: Lệnh `npx tsc --noEmit` hoàn thành không có bất kỳ lỗi cú pháp nào.
- [ ] **Render Thử Rải Rác**: Render 2-3 frame ở đầu/giữa/cuối (`npx remotion still ... --frame=N`) và xem ảnh — xác nhận ảnh, phụ đề và thời điểm trong audio đều khớp nhau tại đúng frame đó.

---

## 4. Checklist Tiêu Đề & Thumbnail (High-CTR & Rule 3 Giây Trên Mobile)

- [ ] **Tiêu Đề Tránh 100% Anti-patterns**:
  - Không có đuôi học thuật vô hồn `(Real Physics)`, `(Analysis)`.
  - Không có mẫu câu văn miêu tả chung chung `The Craziest Lengths...`.
  - Không dùng `The ENTIRE History of...` cho video dưới 15 phút.
  - Không chứa tag chuỗi tập phim `Part 01`, `P3`.
- [ ] **Cung Cấp Đủ 2 Phương Án A/B Test Title**: Có sẵn Option A (Tò mò/Nghịch lý) và Option B (Xung đột/Hậu quả) trong `metadata.md`.
- [ ] **Thumbnail Đạt Chuẩn 1-1-4 (Rule 3 Giây)**:
  - **1 Nhân vật**: Biểu cảm cực sốc (mắt tròn xoe O_O, há hốc mồm hoặc nụ cười ranh mãnh).
  - **1 Điểm va chạm / Đối đầu**: Kiếm gãy đôi tóe lửa, báu vật phát sáng giữa nền tối, mũi tên đỏ lao dốc.
  - **Text Thumbnail**: Tối đa 3 - 4 từ, in hoa font dày, màu vàng chanh/đỏ viền đen đậm, đọc rõ trong 3s trên màn hình điện thoại 5 inch.
- [ ] **Đồng Bộ Nội Dung Giữa Thumbnail Và 15s Đầu Kịch Bản**: Người xem click vào vì điều gì thì 15s đầu phải trả lời hoặc dẫn thẳng vào điều đó (Payoff nhanh), không nói vòng vo.

