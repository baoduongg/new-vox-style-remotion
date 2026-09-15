# Sound Design & Horror Audio Mastering Guide
## (Atmospheric Dread & Suspense Soundscapes)

Âm thanh trong video kể chuyện kinh dị chiếm tới **80% trải nghiệm rùng rợn của người nghe**. Một câu chuyện ma thành công phải khiến người nghe cảm nhận được hơi lạnh sau gáy ngay cả khi nhắm mắt lại.

---

## 🎙️ 1. XỬ LÝ VOICEOVER & KHỚP KHOẢNG LẶNG (SILENCE DETECTION)

Giọng đọc kinh dị cần trầm ấm, chậm rãi, có độ ngắt nghỉ ma mị để tạo cảm giác hồi hộp ngột ngạt.

### Lệnh phân tích khoảng lặng bằng FFmpeg:
```bash
ffmpeg -i public/audio/scenes/full-scene.mp3 -af silencedetect=noise=-28dB:d=0.35 -f null -
```

- Mọi mốc thời gian `silence_start` và `silence_end` trong log FFmpeg sẽ được dùng làm mốc chuyển cảnh hình ảnh trong `scenes.json`.
- Chuyển cảnh chính xác tại khoảng lặng giúp nhịp video mượt mà, không cắt ngang câu thoại rùng rợn.

---

## 🎼 2. CẤU TRÚC PHÂN TẦNG NHẠC NỀN KINH DỊ (4-STAGE HORROR SOUNDSCAPE)

| Phân Đoạn | Thể Loại Nhạc | Nhạc Cụ / Yếu Tố Âm Thanh | Âm Lượng (dB) |
|---|---|---|---|
| **0:00 - 1:00 (Mở đầu / Hook)** | Dark Ambient Drone | Tiếng gió rít, drone trầm u ám, mưa đêm rả rích | `-22dB` |
| **1:00 - 3:00 (Điềm báo leo thang)** | Suspense Creeping Pad | Tiếng đồng hồ tích tắc, cello trầm ngắt quãng | `-20dB` |
| **3:00 - 3:02 (Khoảng lặng nghẹt thở)** | **CHOKE SILENCE (Im lặng 1.5s)** | Cắt hết nhạc, chỉ còn tiếng tim đập `thump... thump...` | `0dB` |
| **3:02 - 4:30 (Cao trào kinh hoàng)** | Climactic Terror Stinger & Dissonant Strings | Tiếng thét nhạc cụ chát chúa, bass drop rền vang | `-14dB` |
| **4:30 - Kết thúc (Dư ba ám ảnh)** | Haunting Spectral Wind & Soft Cello | Tiếng gió lạnh u uất, piano đơn độc | `-22dB` |

---

## 💥 3. BỘ HIỆU ỨNG ÂM THANH KINH DỊ ĐIỂN HÌNH (STRATEGIC HORROR SFX)

Sử dụng SFX có chọn lọc tại các khoảnh khắc mang tính quyết định:

1. **`sfx_creaking_door.mp3`**: Tiếng bản lề cửa gỗ rỉ sét rên rỉ khi cánh cửa tự hé mở lúc nửa đêm.
2. **`sfx_slow_heartbeat.mp3`**: Tiếng tim đập chậm dần rồi dồn dập khi nhân vật nhìn vào góc phòng tối.
3. **`sfx_whisper_breath.mp3`**: Tiếng thở dài hoặc tiếng thì thầm rè đặc sát vành tai (hiệu ứng binaural stereo).
4. **`sfx_creaky_footsteps.mp3`**: Tiếng bước chân trần nặng nề trên sàn gỗ gác xép.
5. **`sfx_jumpscare_stinger.mp3`**: Cú giật âm thanh đanh thép kết hợp sub bass khi thực thể bất ngờ xuất hiện.
6. **`sfx_static_radio.mp3`**: Tiếng rè sóng vô tuyến đứt quãng khi thiết bị điện tử bị nhiễu sóng ma quái.

---

## 🎚️ 4. QUY CHUẨN MASTERING ÂM THANH YOUTUBE ĐÊM KHUYA

- **Target Integrated Loudness**: `-14 LUFS` (Chuẩn YouTube).
- **True Peak Limiter**: `-1.0 dBTP` (Bảo vệ loa/tai nghe, tránh vỡ tiếng khi có jumpscare âm lượng lớn).
- **Dialogue Isolation**: Giọng đọc voiceover luôn chiếm dải tần số `150Hz – 4.5kHz` rõ nét, nhạc nền ambient lùi về dải sub (`<100Hz`) và dải atmospheric (`>6kHz`) để không đè lời kể.
