# Retention & Quality Control Checklist (Manhwa Drama)

Bảng kiểm tra chất lượng (QC Checklist) bắt buộc thực hiện trước khi render và xuất bản video nhằm đảm bảo **tỷ lệ giữ chân người xem (Audience Retention) > 65%**.

---

## 📋 1. Checklist Kịch Bản & Cốt Truyện (Script & Audio Storytelling QC)

- [ ] **Hook 30-60 giây đầu**: Đặt ngay tình huống bất thường / mâu thuẫn gây sốc / câu hỏi kích thích tò mò tột độ, kích hoạt tâm lý "phải nghe tiếp", không chào hỏi rườm rà.
- [ ] **Tỷ lệ phân bổ thời lượng chuẩn**: Mở đầu (10%) $\rightarrow$ Phát triển (70%) $\rightarrow$ Cao trào đỉnh điểm (15%) $\rightarrow$ Kết thúc & Dư ba (10-15%).
- [ ] **2-3 Cú Plot Twists bất ngờ & hợp lý**: Tình tiết phát triển có lớp lang, vật chứng logic, thỏa mãn cảm xúc người nghe khi lật màn.
- [ ] **Quy tắc "Show, Don't Tell"**: Tả hành vi, cử chỉ, ánh mắt, giọt nước mắt, bàn tay run rẩy thay vì kể nông khô khan.
- [ ] **Chỉ dẫn Ngữ điệu (Vocal Directions)**: Đã gắn các ghi chú diễn xuất `[(giọng trầm, chậm)]`, `[(nghẹn ngào)]`, `[(dồn dập)]`, `[(ngưng 1 nhịp)]` trong file `.md`.
- [ ] **Khớp chuẩn độ dài & số từ**: Đạt tỷ lệ 130 - 150 từ/phút (Tiếng Việt) hoặc 140 - 160 words/phút (Tiếng Anh), mỗi câu thoại 12 - 18 từ ngắt nghỉ tự nhiên.
- [ ] **Xuất đủ 2 file độc lập**: Đã tạo cả `<topic-folder>/voText_<lang>.txt` (clean text cho TTS) và `<topic-folder>/voText_<lang>.md` (kịch bản phân cảnh đầy đủ).

---

## 🎨 2. Checklist Hình Ảnh & Visual DNA (Visual & Prompts QC)

- [ ] **Chuẩn phong cách Manhwa**: Nét vẽ 2D Webtoon sắc sảo, không bị lẫn phong cách 3D hoặc tranh tả thực tả thực u ám.
- [ ] **Tính nhất quán nhân vật**: Nam chính và nữ chính giữ nguyên kiểu tóc, dáng mặt và trang phục xuyên suốt các cảnh.
- [ ] **Đồng nhất Text-in-Picture 100%**: Mọi văn bản xuất hiện trên đạo cụ/vật chứng (sổ tiết kiệm, thiệp cưới, hóa đơn, tin nhắn điện thoại, tài liệu pháp lý, biển hiệu) **bắt buộc đồng nhất 100% với ngôn ngữ video** (Tiếng Hàn dùng Hangul, Tiếng Việt có dấu đầy đủ, Tiếng Anh chuẩn). Tuyệt đối không để lẫn lộn ngôn ngữ khác.
- [ ] **Không còn chữ vô nghĩa / bong bóng thoại ảo (Gibberish Text Scan)**: **BẮT BUỘC** trước khi scaffold Remotion — mở từng ảnh trong `public/assets/scenes/` và **đọc kỹ toàn bộ chữ xuất hiện** (bong bóng thoại, biển hiệu, header tài liệu, màn hình...). Nếu phát hiện chuỗi ký tự không đúng chính tả / không có nghĩa (dấu hiệu AI bịa chữ do tự vẽ speech bubble — xem nguyên nhân tại `references/visual-sourcing.md` mục 5), phải regenerate riêng ảnh đó với suffix chống-gibberish trước khi tiếp tục. Ưu tiên kiểm tra nghiêm ngặt nhất các scene "bằng chứng"/twist reveal vì đây là khung hình chốt hạ cảm xúc người xem.

---

## 🎧 3. Checklist Âm Thanh & Subtitles (Audio & Remotion QC)

- [ ] **Voiceover đồng bộ**: Frame chuyển cảnh khớp chính xác vào các khoảng lặng tự nhiên từ kết quả `ffmpeg silencedetect`.
- [ ] **Chuyển Tone Nhạc Nền**: Nhạc chuyển từ lãng mạn $\rightarrow$ căng thẳng $\rightarrow$ bùng nổ kịch tính đúng tại giây phát hiện sự thật.
- [ ] **Subtitles hiển thị chuẩn**: Phụ đề không bị tràn dòng, viền đen dày dặn dễ đọc trên cả điện thoại di động lẫn màn hình máy tính.
- [ ] **Chạy thử Remotion**: Lệnh `npx tsc --noEmit` không báo lỗi kiểu TypeScript nào.
