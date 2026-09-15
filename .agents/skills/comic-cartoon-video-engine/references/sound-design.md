# Sound Design & SFX (Comic Cartoon Audio System)

Tài liệu thiết kế âm thanh cho phong cách **Western 2D Comic Cartoon Animation** (kết hợp Master Voiceover, Nhạc nền BGM Ambient động và Kho hiệu ứng âm thanh SFX hoạt hình kịch tính).

---

## 🎵 1. Cấu Trúc Âm Thanh 3 Lớp (The 3-Layer Audio Mix)

```
[Layer 1: Master Voiceover Track (0 dB)]
                 +
[Layer 2: Comic SFX & Impact Punctuation (-3 dB to -6 dB)]
                 +
[Layer 3: Ambient Cinematic / Lighthearted BGM (-18 dB to -22 dB)]
```

### Quy chuẩn âm lượng (Volume Levels):
- **Voiceover**: Đóng vai trò linh hồn dẫn dắt, luôn giữ mức `-1 dB đến 0 dB`. Giọng đọc rõ ràng, nhấn nhá kịch tính.
- **BGM (Nhạc nền)**: Âm lượng nền `-20 dB` (khi có voiceover) và tự động đẩy lên `-12 dB` ở những khoảng lặng dramatic pause.
- **SFX (Hiệu ứng truyện tranh)**: Âm lượng `-4 dB`, sắc nét, tạo độ nảy tức thì khi có va chạm thị giác.

---

## 💥 2. Thư Viện Hiệu Ứng Âm Thanh Comic (Essential SFX Library)

| Loại hiệu ứng | File SFX đề xuất | Tình huống kích hoạt trên màn hình |
|---|---|---|
| **Va chạm vũ khí / Kim loại** | `sfx_metal_clang.mp3`, `sfx_sword_clash.mp3` | Khung hình có chữ `CLANG!`, `BALG!`, `CRACK!` |
| **Vung roi / Chuyển động nhanh** | `sfx_whip_crack.mp3`, `sfx_fast_whoosh.mp3` | Tia roi quấn quanh vũ khí, tốc độ bay |
| **Đấm / Va đập nặng** | `sfx_heavy_punch.mp3`, `sfx_body_thud.mp3` | Đòn đánh trúng đích, nhân vật ngã xuống đất |
| **Búa tòa án / Phán quyết** | `sfx_gavel_slam.mp3` | Thẩm phán gõ búa, phán quyết luật lệ cổ đại |
| **Hài hước / Sốc / Dừng đột ngột** | `sfx_record_scratch.mp3`, `sfx_boing.mp3` | Cú twist phi lý, mặt nhân vật biến sắc |
| **Ý tưởng bừng sáng / Eureka** | `sfx_ding_bell.mp3`, `sfx_lightbulb_pop.mp3` | Bóng đèn sáng, dấu chấm than `!` xuất hiện |
| **Chiến thắng / Kèn lệnh** | `sfx_victory_fanfare.mp3`, `sfx_cheering.mp3` | Đoạn kết chiến thắng, đám đông reo hò |

---

## 🎙️ 3. Quy Trình Sản Xuất Audio Liền Mạch (Master Audio Sync)

1. **Sinh Voiceover Full Liền Mạch (`full-scene.mp3` hoặc `public/audio/voiceover.mp3`)**:
   - Sử dụng Edge-TTS, ElevenLabs hoặc Gemini Audio với chất giọng tự nhiên, giàu năng lượng (vd: `en-US-ChristopherNeural` hoặc `en-US-GuyNeural`).
2. **Cắt mốc thời gian chuyển cảnh bằng `silencedetect`**:
   - Dùng lệnh ffmpeg để tự động dò khoảng lặng tự nhiên làm ranh giới giữa các cảnh:
   ```bash
   ffmpeg -i public/audio/voiceover.mp3 -af silencedetect=noise=-30dB:d=0.3 -f null -
   ```
3. **Đồng bộ hóa `scenes.json`**:
   - Mỗi cảnh trong `scenes.json` nhận chính xác `startFrame` và `durationInFrames` tương ứng theo từng câu thoại.
