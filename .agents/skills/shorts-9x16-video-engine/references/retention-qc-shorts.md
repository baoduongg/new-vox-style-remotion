# Kiểm Tra Giữ Chân Người Xem Cho Shorts 9:16 (Shorts Retention QC)

Metric quan trọng nhất với Shorts là **% thời lượng xem trung bình (Average % Viewed)** và **tỉ lệ xem lại (Replay Rate)** — khác với video dài nơi mốc 30s/50% là chuẩn tham chiếu chính. Vì video đã ngắn sẵn (45-180s), QC tập trung vào **3 giây đầu quyết định lướt hay ở** và **có được xem lại hay không**, nhiều hơn là retention curve trải dài.

---

## 1. Swipe Test (1 Giây Đầu Tiên)

- [ ] Tạm dừng preview đúng ở **frame đầu tiên** (frame 0) — hình ảnh hiện ra có đủ gây tò mò/sốc để dừng ngón tay lướt không, HAY chỉ là một cảnh trung tính/nền chờ?
- [ ] Không có logo intro, không có fade-in-từ-đen kéo dài hơn 4-5 frames trước khi nội dung chính xuất hiện.
- [ ] Câu voiceover đầu tiên (nghe 2 giây đầu) đã nêu được xung đột/con số/nghịch lý cốt lõi chưa, hay còn đang "dẫn nhập"?

## 2. Mute Test (Xem Tắt Tiếng Toàn Bộ)

- [ ] Video không dùng text overlay (không headline, không phụ đề) — chấp nhận việc xem tắt tiếng sẽ không truyền tải được lời thoại, miễn hình ảnh vẫn đủ mạnh để giữ chân trong vài giây đầu (Swipe Test ở Mục 1).
- [ ] Nếu cần truyền tải nội dung cho người xem tắt tiếng, xử lý ở tầng platform (auto-caption của TikTok/YouTube khi đăng) thay vì burn-in vào video.

## 3. Loop Test (Kết Thúc → Mở Đầu)

- [ ] Xem liên tục frame cuối nối sang frame đầu (loop) — có tạo cảm giác "vòng lặp hợp lý" (visual hoặc lời thoại vọng lại) hay bị hụt/cộc lốc?
- [ ] Không có màn hình đen/watermark to chiếm trọn khung ở giây cuối làm gãy mạch loop.

## 4. Safe-Zone Test (Vùng An Toàn UI Nền Tảng)

- [ ] Preview với overlay mô phỏng UI Shorts/TikTok (hoặc ít nhất tự vẽ khung tham chiếu theo `references/remotion-scaffold-vertical.md` Mục 1: top 160px / bottom 340px / right 200px) — không có chi tiết ảnh quan trọng (mặt nhân vật, chữ trong ảnh) nào bị vùng này che.
- [ ] Watermark góc phải dưới (100px) — xác nhận phần còn lại sau khi bị cột nút tương tác che vẫn đủ nhận diện là logo kênh, không bị che 100%.

## 5. Nhịp Độ (Pacing Density)

- [ ] Đếm số lần chuyển shot trong 60 giây đầu — phải ≥15 lần (tức trung bình ≤4s/shot). Nếu ít hơn, một số shot đang bị kéo dài quá mức cho phép ở Mục "Nhịp Cắt Cảnh 2-4s" của `SKILL.md`.
- [ ] Không đoạn nào >4 giây hình ảnh đứng yên hoàn toàn (không Ken Burns, không thay đổi biểu cảm, không chuyển shot).

## 6. Information Density Test (chỉ áp dụng cho topic dạng timeline/liệt kê nhiều giai đoạn)

Sync audio/hình đúng KHÔNG đảm bảo giữ chân — video có thể đồng bộ hoàn hảo mà vẫn bị vuốt bỏ giữa chừng vì nội dung quá tải tên riêng (xem `references/script-writing-shorts.md` Mục 1.B). Chạy test này trước khi render nếu topic là "toàn bộ lịch sử/mọi vị vua/mọi triều đại của X":

- [ ] Đếm số giai đoạn/nhân vật/địa danh riêng biệt được nhắc trong kịch bản — vượt quá 5-6 điểm dừng cho video ≤120s là dấu hiệu cần gộp/cắt bớt.
- [ ] Rà từng cửa sổ 10 giây bất kỳ trong Nhịp 2 (Escalation) — không cửa sổ nào chứa >2 tên riêng mới xuất hiện lần đầu.
- [ ] Mỗi điểm dừng có ít nhất 1 chi tiết cụ thể/gây ngạc nhiên đi kèm, không chỉ là tên + niên đại.
- [ ] Có 1 mini-hook (câu hỏi tu từ hoặc lời "nhá" trước) đặt ở khoảng 35-45% thời lượng video.
- [ ] Đọc to kịch bản (không xem hình) và tự hỏi: "nếu chỉ nghe, có đoạn nào cảm giác như đang liệt kê/học thuộc lòng không?" — nếu có, đoạn đó cần viết lại theo Mục 1.B trước khi tiếp tục sang bước ảnh/audio.

## 7. Checklist Kỹ Thuật (kế thừa từ style engine gốc, vẫn bắt buộc)

- [ ] Tên file ảnh đúng chuẩn `0.png...N-1.png` (`ls public/assets/scenes/`).
- [ ] Đuôi file audio khớp `Root.tsx` (`ls public/audio/scenes/`).
- [ ] Timing đã đồng bộ với audio hiện tại — không phải bản audio cũ đã bị tạo lại.
- [ ] `sum(durationInFrames) === totalFrames === round(audio_duration × fps)`.
- [ ] `npx tsc --noEmit` không lỗi.
- [ ] Render thử 3 frame (đầu/giữa/cuối) bằng `npx remotion still src/index.ts Shorts out.png --frame=<N>` — xác nhận ảnh và watermark đều đúng tại đúng thời điểm đó.
