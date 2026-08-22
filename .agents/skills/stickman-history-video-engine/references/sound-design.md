# Thiết Kế Âm Thanh (Sound Design Guide) - Stickman History

Âm thanh là 50% trải nghiệm của một video phong cách tài liệu hoạt họa lịch sử. Thể loại này đòi hỏi sự kết hợp giữa **không gian thiên nhiên cổ xưa hùng vĩ** và **tiếng động foley vẽ tay sắc nét**.

---

## 1. Cấu Trúc 3 Lớp Âm Thanh Chuẩn

```
1. Voiceover Track (0dB tham chiếu / đỉnh -3dB)
   └─ Giọng nam trầm, âm điệu học thuật, rõ ràng, tốc độ vừa phải.
2. Foley SFX Track (-8dB đến -14dB)
   ├─ Nhóm 1: Foley Vẽ tay (tiếng bút chì phác thảo, tiếng phấn viết bảng, tiếng lật trang sách cũ)
   ├─ Nhóm 2: Môi trường (gió tuyết rít, sóng biển va đập, gỗ thuyền cót két)
   └─ Nhóm 3: Nhấn mạnh đồ họa (tiếng pop khi icon xuất hiện, tiếng kim loại lách cách khi hiện nhiệt kế)
3. Background Music - BGM (-18dB đến -24dB)
   └─ Ambient Cinematic cổ đại (Tagelharpa, Đàn Cello trầm, Bộ gõ cổ xưa, Drone bầu không khí)
```

---

## 2. Thư Viện Sound Effects Chuẩn (@remotion/sfx)

Sử dụng trực tiếp các sound effect chất lượng cao được chuẩn hóa âm lượng đỉnh -3dB từ thư viện chính thức `@remotion/sfx` (https://www.remotion.dev/docs/sfx/):

```bash
npm install @remotion/sfx
```

### Bảng Mapping SFX Chuẩn Theo Ngữ Cảnh:

| Âm thanh SFX | Source URL / File | Ngữ cảnh sử dụng trong video tài liệu |
|---|---|---|
| `pageTurn` | `https://remotion.media/page-turn.wav` | Chuyển cảnh giữa các trang bản thảo / bản đồ cổ (**Bắt buộc ở mỗi lần chuyển Scene**) |
| `dramaticBoomer` | `https://remotion.media/dramatic-boomer.wav` | Cú đập kịch tính khi nêu nghịch lý, mối đe dọa nhiệt, công trình cổ khổng lồ |
| `whoosh` | `https://remotion.media/whoosh.wav` | Hiệu ứng chuyển động nhanh, gió lùa, bốc hơi, luồng khí Venturi |
| `vineBoom` | `https://remotion.media/vine-boom.wav` | Nhấn mạnh cú sốc bất ngờ (vd: Tuyệt đối cấm dùng điện!) |
| `shutterOld` / `shutterModern` | `https://remotion.media/shutter-old.wav` | Phóng to kính hiển vi, sơ đồ mặt cắt kiến trúc kỹ thuật |
| `uiSwitch` | `https://remotion.media/switch.wav` | Chuyển đổi giữa 2 cột so sánh Đúng vs Sai, Hiện đại vs Cổ đại |
| `whip` | `https://remotion.media/whip.wav` | Xuất hiện các mũi tên chỉ dẫn, callout vẽ tay bất ngờ |
| `ding` | `https://remotion.media/ding.wav` | Phát kiến vật lý, ý tưởng giải mã thành công, CTA rung chuông |
| `mouseClick` | `https://remotion.media/mouse-click.wav` | Kêu gọi Like & Subscribe cuối video |

> [!TIP]
> **Quy tắc Chuyển Cảnh**: Luôn chèn `page-turn.wav` (volume `0.20`, `delay: 0`) tại điểm bắt đầu của mỗi Scene để tạo cảm giác lật giở từng trang bản thảo khảo cổ cổ kính liền mạch.


---

## 3. Lựa Chọn Nhạc Nền (BGM Selection)

- **Phong cách khuyến nghị**:
  - *Nordic Ambient Folk / Dark Historical Drone*: Nhạc cụ dây gẩy cổ xưa kết hợp tiếng thở dài của thiên nhiên hoang sơ (tham chiếu: âm hưởng nhạc Wardruna, Danheim ở phiên bản nhẹ nhàng không lời).
  - *Documentary Investigation Ambient*: Tiếng synth mờ ảo kết hợp tiếng gõ nhịp đều đặn thể hiện sự suy luận, giải mã từng bước câu hỏi hóc búa.
- **Quy tắc quan trọng**:
  - **Tuck under voice**: BGM không bao giờ được có các đoạn cao trào quá chói hoặc giọng ca hát đè lên voiceover.
  - **Ducking tự động**: Hạ âm lượng BGM xuống thêm 3-4dB ở những đoạn giải thích số liệu phức tạp để người xem tập trung tối đa.
