# Thiết Kế Âm Thanh Kể Chuyện (Storytelling Sound Design Guide)

Trong video thể loại **Stickman Storytelling & Dramatic Narrative**, âm thanh đóng vai trò quyết định 50% cảm xúc của người xem.

---

## 1. Cấu Trúc Âm Thanh Tinh Gọn & Ổn Định (Continuous Master Audio Architecture)

Để đảm bảo hiệu suất render nhanh nhất và **tránh 100% các lỗi 404 Missing Asset** khi render Remotion:

```
1. Master Voiceover Track (0dB tham chiếu / đỉnh -3dB)
   └─ Đường dẫn: public/audio/scenes/full-scene.wav (hoặc .mp3).
   └─ Giọng kể chuyện liên tục, truyền cảm, biến chuyển cảm xúc theo từng hồi (kịch tính, châm biếm, sâu lắng).
   └─ Khớp timing toàn bộ phân cảnh qua ffprobe và silencedetect trong scenes.json.
```

> [!IMPORTANT]
> **Quy Tắc Âm Thanh Cốt Lõi**:
> - **KHÔNG chèn các file SFX rời rạc** trong `scenes.json` và `ImageScene.tsx` trừ khi người dùng cung cấp đầy đủ file vật lý.
> - Toàn bộ hiệu ứng âm thanh và nhạc nền (nếu có) được master trực tiếp vào file `full-scene.wav` hoặc lồng trong track chính, giúp quá trình render Remotion luôn 100% thành công không phụ thuộc vào các đường dẫn file con.

---

## 2. Lựa Chọn & Điều Chỉnh Nhạc Nền (BGM Dynamics trong Master Track)

- **Phong cách nhạc nền theo từng thể loại câu chuyện**:
  - *Đại án lừa đảo / Trộm cắp (Heist & Con)*: Nhạc Jazz Upbeat, tiếng contrabass búng ngón rón rén, tiếng trống hi-hat nhanh tạo cảm giác láu cá, tinh ranh.
  - *Sinh tồn / Bi kịch (Survival & Drama)*: Nhạc giao hưởng Cinematic Strings da diết, tiếng cello trầm buồn kết hợp tiếng piano ngân xa.
  - *Lịch sử bi hài (Absurd Blunders)*: Nhạc Pizzicato Strings ngộ nghĩnh, tiếng kèn Bassoon hài hước (tham chiếu phong cách *OverSimplified*).
- **Quy tắc Ducking tự động**:
  - Khi Voiceover đang đọc: BGM giữ ở mức `-20dB` đến `-24dB`.
  - Ở những khoảng lặng 0.5s - 1s (Dramatic Pause): Đẩy âm lượng BGM lên `-14dB` để tăng độ kịch tính trước khi hạ xuống khi câu thoại tiếp theo vang lên.
