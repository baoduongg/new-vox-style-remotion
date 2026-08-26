# Sound Design & Audio Mastering Guide (Manhwa Drama)

Âm thanh trong video kể chuyện Manhwa đóng vai trò quyết định đến **70% cảm xúc của người xem**. Tài liệu này hướng dẫn cách xử lý voiceover và phân tầng nhạc nền để đẩy cao trào kịch tính.

---

## 🎙️ 1. Xử Lý Voiceover & Khớp Khoảng Lặng (Silence Detection)

Giọng đọc tự sự cần rõ ràng, truyền cảm, có những khoảng ngập ngừng tự nhiên ở các tình huống cảm xúc.

### Lệnh phân tích khoảng lặng bằng FFmpeg:
```bash
ffmpeg -i public/audio/scenes/full-scene.mp3 -af silencedetect=noise=-28dB:d=0.35 -f null -
```

- Sử dụng các mốc thời gian im lặng (`silence_start` và `silence_end`) để làm điểm cắt và chuyển shot hình ảnh trong `scenes.json`.
- Điều này đảm bảo ảnh chuyển đổi đúng lúc người dẫn chuyện ngừng ngắt câu, tạo cảm giác mượt mà tuyệt đối.

---

## 🎼 2. Cấu Trúc Nhạc Nền Chuyển Tone Cảm Xúc (BGM Arc)

Một video Manhwa Drama chuẩn thường sử dụng 3 lớp nhạc nền luân chuyển theo timeline:

| Phân Đoạn | Thể Loại Nhạc | Mood / Nhạc Cụ | Âm Lượng (dB) |
|---|---|---|---|
| **0:00 - 1:00 (Hồi 1)** | Romantic Acoustic / Lo-fi Piano | Piano ấm áp, guitar mộc, êm dịu | `-18dB` |
| **1:00 - 2:30 (Hồi 2 & 3)** | Suspense Ambient Pad / Dark Cello | Cello trầm, tiếng bass ngầm chậm | `-20dB` |
| **2:30 - 3:00 (Phát hiện)** | **DRAMATIC DROP** (Im lặng 1.5s) | Tiếng thở dài hoặc tiếng tim đập | `0dB` |
| **3:00 - 6:00 (Hồi 4)** | Cinematic Action / Tense Strings | Dàn dây dồn dập, nhịp trống dồn | `-16dB` |
| **6:00 - Kết thúc (Hồi 5)**| Reflective Emotional Piano | Piano sâu lắng, đúc kết chiêm nghiệm | `-18dB` |

---

## 💥 3. Các Hiệu Ứng Âm Thanh Điểm Nhấn (Strategic SFX)

Chỉ sử dụng SFX tại đúng các thời điểm then chốt (tránh lạm dụng gây phân tâm):

1. **`sfx_phone_notification.mp3`**: Tiếng chuông tin nhắn vang lên lúc nửa đêm khi chàng trai giấu điện thoại.
2. **`sfx_heartbeat_slow.mp3`**: Tiếng tim đập dồn dập khi cô gái nhìn thấy tờ hóa đơn trong ví.
3. **`sfx_glass_shatter.mp3`**: Tiếng kính vỡ vụn khi chuyển sang phân cảnh Split-Screen lật mặt kẻ phản diện.
4. **`sfx_deep_sub_boom.mp3`**: Cú đánh trầm (bass drop) khi kịch bản hé lộ sự thật tàn nhẫn.
