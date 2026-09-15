# Retention Quality Control & QC Scan Checklist (Horror Storytelling)

Tài liệu này cung cấp quy trình kiểm định chất lượng nghiêm ngặt (Quality Control) trước khi xuất bản video kể chuyện kinh dị, đảm bảo tỷ lệ giữ chân người xem (Audience Retention) đạt trên **60% ở mốc 3 phút** và **45% đến cuối video**.

---

## 📋 1. BẢNG CHECKLIST KIỂM ĐỊNH 9 BƯỚC BẮT BUỘC

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     CHECKLIST KIỂM ĐỊNH CHẤT LƯỢNG                      │
├─────────────────────────────────────────────────────────────────────────┤
│ [ ] 1. HOOK RETENTION (30s đầu): Có xung đột / điềm gở ngay lập tức?   │
│ [ ] 2. PACING 4-6s: Mỗi shot hình ảnh không bị đứng hình quá 6 giây?    │
│ [ ] 3. GIBBERISH SCAN: Ảnh AI không có bong bóng thoại / chữ méo rác?   │
│ [ ] 4. TEXT-IN-PICTURE: Chữ trên biển báo/đồ vật đúng ngôn ngữ 100%?    │
│ [ ] 5. AUDIO SYNC: Cắt chuyển cảnh rơi đúng khoảng lặng voiceover?      │
│ [ ] 6. JUMPSCARE MASTERING: Âm thanh giật mình không bị vỡ tiếng (clip)?│
│ [ ] 7. SUBTITLE LEGIBILITY: Phụ đề to rõ, viền đen dày, padding 190px?  │
│ [ ] 8. WATERMARK AVATAR: Hiển thị avatar_horror_channel.png góc dưới?   │
│ [ ] 9. THUMBNAIL & METADATA: Render out/thumbnail.jpg & đủ tags Shorts? │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 2. QUY TRÌNH QUÉT CHỮ RÁC AI (AI GIBBERISH TEXT SCAN PROTOCOL)

AI sinh ảnh (Gemini / Midjourney / DALL-E) khi gặp các từ khóa truyện/truyện tranh thường tự động thêm **bong bóng thoại (speech bubbles)** chứa các ký tự loằng ngoằng vô nghĩa.

### Quy trình kiểm tra:
1. Mở thư mục `public/assets/scenes/` và duyệt qua từng file từ `0.png` đến `N-1.png` cùng `thumb_card.jpg`, `thumb_bg.jpg`.
2. Kiểm tra 3 vị trí dễ bị lỗi chữ rác nhất:
   - Góc trên bên trái / bên phải khung hình (bong bóng thoại giả).
   - Biển hiệu đường phố, bìa sách, màn hình điện thoại, bảng điều khiển (chữ méo mó).
   - Quần áo nhân vật (logo giả vô nghĩa).
3. **Xử lý nếu phát hiện ảnh lỗi**:
   - Yêu cầu tạo lại ảnh ngay với prompt bổ sung: `Cinematic horror illustration only, absolutely zero readable or unreadable text, zero dialogue bubbles, completely clean background without letters.`

---

## ⏱️ 3. KIỂM SOÁT NHỊP ĐỘ GIỮ CHÂN (PACING & RETENTION RULES)

1. **Quy tắc chuyển cảnh 4 – 6 giây**:
   - Một đoạn kể dài 20 giây **bắt buộc bẻ thành 3 – 4 shots hình ảnh** với các góc máy khác nhau: Toàn cảnh không gian u tối $\rightarrow$ Cận cảnh biểu cảm nhân vật $\rightarrow$ Cận cảnh vật chứng $\rightarrow$ Góc máy rình rập.
2. **Quy tắc Slow Creep Motion**:
   - Mọi shot hình ảnh trong component `HorrorScene.tsx` phải có chuyển động Ken Burns nhẹ (`slow-zoom-in`, `slow-zoom-out`, `creep-pan`) để mắt người xem luôn có cảm giác khung hình đang dịch chuyển.
3. **Quy tắc Phụ đề An Toàn & Sắc Nét**:
   - Font chữ không chân to (`fontSize: 38px`), viền đen 4 phía (`-2.5px 2.5px 0 #050508`), `padding: 0 190px` để không bao giờ đè lên logo avatar watermark ở góc phải dưới (`ChannelWatermark.tsx`).

---

## 🎧 4. KIỂM TOÁN ÂM LƯỢNG CAO TRÀO (DYNAMIC AUDIO QC)

- Dùng phần mềm nghe thử hoặc kiểm tra sóng âm thanh (Waveform):
  - **Giọng đọc Voiceover**: Luôn đều đặn ở mức `-14 LUFS`.
  - **Nhạc nền Ambient Drone**: Giữ ở mức `-22dB` để tạo nền mà không lấn át giọng kể.
  - **Jumpscare / SFX Cú Đấm Âm Thanh**: Đỉnh cao trào không được vượt quá `-1.0 dBTP` để tránh làm chói tai hoặc méo tiếng trên loa điện thoại.

---

## 🖼️ 5. KIỂM ĐỊNH THUMBNAIL STUDIO & METADATA XUẤT BẢN

1. Chạy render thumbnail: `npm run thumbnail` (hoặc `npx remotion still src/index.ts Thumbnail out/thumbnail.jpg --overwrite`).
2. Mở file `out/thumbnail.jpg` kiểm tra:
   - Thẻ vòm nhân vật bên trái hiển thị sắc nét, không bị méo tỷ lệ.
   - Tiêu đề bên phải tương phản rõ ràng trên nền tối, chữ `TRUYỆN KINH DỊ` và `CHUYỆN MA AUDIO` hiển thị chuẩn xác.
3. Kiểm tra file `metadata.md` và `metadata_shorts.md`:
   - Tiêu đề có đủ các phương án A/B testing.
   - Mô tả có đầy đủ Timestamps/Chapters.
   - Bộ tags SEO YouTube dài và tags Shorts đã sẵn sàng dạng phân tách dấu phẩy để copy-paste trực tiếp vào YouTube Studio.
