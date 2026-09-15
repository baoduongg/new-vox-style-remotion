# Retention & Quality Control (Comic Video QC)

Tài liệu hướng dẫn kiểm duyệt chất lượng video (Quality Control Checklist) nhằm đảm bảo tỷ lệ giữ chân người xem (Audience Retention) cao nhất cho thể loại **Western 2D Comic Cartoon Animation**.

---

## 📋 1. Bảng Kiểm Duyệt Giữ Chân (Audience Retention QC)

| Tiêu chí | Ngưỡng đạt chuẩn | Cách kiểm tra |
|---|---|---|
| **Giây 0.0 (Hook Swipe Test)** | Phải có hình ảnh va chạm kịch tính + Action Starburst + Text Title nổi bật | Xem frame đầu tiên, đảm bảo không có màn hình đen / logo trống |
| **Nhịp cắt cảnh (Shot Pacing)** | **2.5s – 4.0s/shot** (Shorts) hoặc **4.0s – 6.0s/shot** (Video dài) | Đếm tổng số shots trong `scenes.json` (Video 60s cần 18–25 shots) |
| **Tính nhất quán nhân vật** | Khuôn mặt, màu trang phục, tỷ lệ cơ thể không bị biến dạng giữa các cảnh | Đối chiếu liên tục giữa `0.png`, `1.png` ... `N-1.png` |
| **Vùng an toàn giao diện (Safe-Zone)** | Toàn bộ chữ Title và SFX nằm cách Top ≥160px, Bottom ≥340px, Right ≥200px | Bật overlay Safe-Zone trên Remotion Studio kiểm tra |
| **Độ rõ nét của Text trong ảnh** | Chữ in hoa không bị méo chữ AI, đọc rõ ràng trong 0.5 giây | Kiểm tra từng ảnh chứa Header và SFX (`CLANG!`, `BALG!`, `HALT!`) |
| **Đồng bộ âm thanh - hình ảnh** | Tiếng SFX va chạm khớp chính xác từng frame với ảnh Starburst | Nghe và soi waveform trên timeline Remotion |

---

## 🔍 2. Quy Trình Kiểm Thử & Xuất Bản (Build & Render)

1. **Kiểm tra TypeScript & Cú Pháp**:
   ```bash
   npx tsc --noEmit
   ```
2. **Khởi chạy Remotion Studio để xem trước (Preview)**:
   ```bash
   npm run dev
   ```
   - Mở trình duyệt tại `http://localhost:3000`.
   - Kiểm tra chuyển cảnh Pop-in, âm lượng voiceover và BGM.
3. **Render Video Hoàn Chỉnh**:
   ```bash
   npm run render
   ```
   - Video đầu ra được xuất tại `out/video.mp4`.
