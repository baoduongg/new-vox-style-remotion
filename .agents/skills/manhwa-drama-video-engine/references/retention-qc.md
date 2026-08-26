# Retention & Quality Control Checklist (Manhwa Drama)

Bảng kiểm tra chất lượng (QC Checklist) bắt buộc thực hiện trước khi render và xuất bản video nhằm đảm bảo **tỷ lệ giữ chân người xem (Audience Retention) > 65%**.

---

## 📋 1. Checklist Kịch Bản & Cốt Truyện (Script & Narrative QC)

- [ ] **Hook 3 giây đầu**: Đặt ngay mâu thuẫn hoặc câu hỏi gây sốc trước khi nhạc nền vào nhịp.
- [ ] **Nhịp độ câu chuyện**: Mỗi hồi không kéo dài quá 2 phút, luôn có thông tin hoặc tình tiết mới.
- [ ] **Độ dài câu thoại**: Mỗi câu ngắn gọn từ 12 - 18 từ, ngắt nghỉ tự nhiên, không rườm rà.
- [ ] **Tính logic của Cú Twist**: Bằng chứng được phát hiện hợp lý, cú lật mặt làm thỏa mãn cảm xúc người xem.

---

## 🎨 2. Checklist Hình Ảnh & Visual DNA (Visual & Prompts QC)

- [ ] **Chuẩn phong cách Manhwa**: Nét vẽ 2D Webtoon sắc sảo, không bị lẫn phong cách 3D hoặc tranh tả thực tả thực u ám.
- [ ] **Tính nhất quán nhân vật**: Nam chính và nữ chính giữ nguyên kiểu tóc, dáng mặt và trang phục xuyên suốt các cảnh.
- [ ] **Đồng nhất Text-in-Picture 100%**: Mọi văn bản xuất hiện trên đạo cụ/vật chứng (sổ tiết kiệm, thiệp cưới, hóa đơn, tin nhắn điện thoại, tài liệu pháp lý, biển hiệu) **bắt buộc đồng nhất 100% với ngôn ngữ video** (Tiếng Hàn dùng Hangul, Tiếng Việt có dấu đầy đủ, Tiếng Anh chuẩn). Tuyệt đối không để lẫn lộn ngôn ngữ khác.

---

## 🎧 3. Checklist Âm Thanh & Subtitles (Audio & Remotion QC)

- [ ] **Voiceover đồng bộ**: Frame chuyển cảnh khớp chính xác vào các khoảng lặng tự nhiên từ kết quả `ffmpeg silencedetect`.
- [ ] **Chuyển Tone Nhạc Nền**: Nhạc chuyển từ lãng mạn $\rightarrow$ căng thẳng $\rightarrow$ bùng nổ kịch tính đúng tại giây phát hiện sự thật.
- [ ] **Subtitles hiển thị chuẩn**: Phụ đề không bị tràn dòng, viền đen dày dặn dễ đọc trên cả điện thoại di động lẫn màn hình máy tính.
- [ ] **Chạy thử Remotion**: Lệnh `npx tsc --noEmit` không báo lỗi kiểu TypeScript nào.
