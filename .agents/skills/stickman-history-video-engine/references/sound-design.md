# Thiết Kế Âm Thanh (Sound Design Guide) - Stickman History

Âm thanh chiếm 50% trải nghiệm của một video phong cách tài liệu hoạt họa lịch sử. Thể loại này đòi hỏi **đường tiếng lồng tiếng rõ ràng, uyển chuyển**, kết hợp **nhạc nền huyền bí/kịch tính** và **SFX đồ họa tinh tế**, không chèn âm thanh meme gây loãng trải nghiệm.

---

## 1. Cấu Trúc 3 Lớp Âm Thanh Chuẩn

```
1. Voiceover Master Track (0dB tham chiếu / đỉnh -3dB)
   └─ Giọng đọc trầm ấm, tò mò, tốc độ 130-145 từ/phút, rõ ràng, không bị ngắt vụn.
2. Background Music - BGM (-20dB đến -24dB)
   └─ Ambient Cinematic (Ancient Drone, Acoustic Strings, Bộ gõ lịch sử trầm).
3. Graphic & Transition SFX (-12dB đến -16dB)
   └─ SFX ngữ cảnh xuất hiện đúng lúc: whoosh (camera lướt), pop/tap (icon/text nhảy), shutter (phóng to sơ đồ).
```

---

## 2. Bảng Tra Cứu SFX Đồ Họa & Môi Trường

| Tên SFX | Mục đích sử dụng | Lưu ý tần suất |
|---|---|---|
| `whoosh.wav` | Đi kèm chuyển động pan nhanh hoặc lướt camera | Chỉ dùng ở các đoạn chuyển hướng mạnh (20-30s/lần) |
| `pop.wav` / `tap.wav` | Khi một nhãn số liệu, mũi tên hoặc hộp thông tin bật ra | Rất nhẹ, không chói tai |
| `shutter.wav` | Khi phóng to kính hiển vi hoặc sơ đồ mặt cắt | Nhấn mạnh phân tích khoa học |
| `ambient_fire.wav` | Tiếng lửa trại nổ lách tách | Nhẹ nhàng ở các cảnh tiền sử / xưởng rèn |
| `ambient_wind.wav` | Tiếng gió rít sa mạc hoặc bão tuyết Bắc Cực | Tăng độ nhập tâm không gian |

> [!IMPORTANT]
> **Tuyệt đối không lạm dụng SFX**: Không chèn SFX liên tục ở mỗi frame hay mỗi lần chuyển shot 5s. Đường tiếng Voiceover phải luôn được tôn trọng và rõ ràng nhất.

---

## 3. Khớp Âm Thanh Liền Mạch Bằng FFmpeg

File âm thanh Voiceover nguyên vẹn được phân tích để tìm các khoảng lặng tự nhiên giữa các câu:

```bash
ffmpeg -i public/audio/scenes/full-scene.mp3 -af silencedetect=noise=-28dB:d=0.4 -f null -
```

Các mốc thời gian khoảng lặng này chính là điểm cắt chuyển cảnh hình ảnh tự nhiên, giúp video mượt mà không bị ngắt tiếng đột ngột.
