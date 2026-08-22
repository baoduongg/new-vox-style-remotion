# Sound Design (Foley + Nhạc nền)

Phong cách Vox-style dựa trên 2 trụ cột ngang hàng: hình ảnh paper-cut (xem `paper-cut-style-guide.md`) và âm thanh. Mọi chuyển động trên màn hình phải có tiếng động thực tế đi kèm — thiếu foley là lý do phổ biến nhất khiến video "trông paper-cut nhưng không có cảm giác Vox".

## 1. Foley — map theo loại chuyển động

| Chuyển động trên màn hình | SFX cần |
|---|---|
| Layer/element entry (spring vào vị trí) | Tiếng giấy sột soạt ngắn (paper rustle), 0.2-0.4s, trùng frame lúc `entryProgress` đạt ~0.7-1 |
| Transition cut-in wipe / torn-paper reveal | Tiếng giấy trượt + đặt xuống (paper slide + soft thump), khớp 10-15 frame của transition |
| Wipe (viết tay, gạch chân, khoanh tròn) | Tiếng bút/bút dạ viết trên giấy (pen scratch), kéo dài suốt thời gian wipe chạy (~15 frame) |
| Pop/Pulse (đánh dấu icon, chấm bản đồ) | Tiếng click nhẹ hoặc tap ngón tay, đúng frame lúc scale đạt đỉnh (frame thứ 6 trong keyframe `[0,6,10]`) |
| Tape xuất hiện (mục 3b style guide) | Tiếng băng keo giấy bóc/dán (tape peel), ngắn ~0.3s |

Với mỗi scene, liệt kê các sự kiện animate cần foley (từ `scenes.json` layers + hiệu ứng đã chọn) trước khi tìm SFX — tránh tìm dư SFX không dùng tới.

## 2. Nguồn SFX (miễn phí, có giấy phép dùng thương mại/YouTube)

- Pixabay Audio (pixabay.com/sound-effects) — không cần credit, ưu tiên dùng trước.
- YouTube Audio Library (studio.youtube.com → Audio Library) — nếu kênh có sẵn.
- Freesound.org — cần lọc license CC0 hoặc CC-BY (nếu CC-BY, credit trong description video).

Tìm bằng từ khoá tiếng Anh: "paper rustle", "paper slide", "pen writing on paper", "pencil scratch", "tape peel", "soft click". Tải file ngắn (dưới 1s cho click/pop, 0.3-0.6s cho rustle/slide) — SFX dài phải tự cắt cho khớp animation, không để nguyên file dài đè lên scene sau.

Lưu vào `public/audio/sfx/`, đặt tên theo loại: `rustle-01.mp3`, `slide-01.mp3`, `pen-write-01.mp3`, `pop-click-01.mp3`, `tape-peel-01.mp3`. Vài biến thể mỗi loại (2-3 file) để tránh lặp y hệt giữa nhiều scene liên tiếp.

## 3. Sync SFX vào Remotion

Mỗi SFX là 1 `<Audio>` đặt trong `<Sequence>` của scene tương ứng, `startFrom`/`from` khớp đúng frame của animation nó minh hoạ:

```tsx
<Sequence from={s.startFrame} durationInFrames={s.durationInFrames}>
  <Scene layers={s.layers} durationInFrames={s.durationInFrames} sceneIndex={i} />
  {s.layers.map((layer, li) =>
    layer.kind === 'element' ? (
      <Sequence key={li} from={layer.entryDelayFrames ?? 0} durationInFrames={20}>
        <Audio src={staticFile(`audio/sfx/rustle-0${(li % 3) + 1}.mp3`)} volume={0.5} />
      </Sequence>
    ) : null
  )}
</Sequence>
```

Ghi cue SFX vào `scenes.json` khi breakdown (thêm field `sfx` mỗi layer/effect nếu cần, ví dụ `"sfx": "rustle-01"`) thay vì hard-code trong component — theo đúng nguyên tắc `scenes.json` là single source of truth (xem `remotion-scaffold.md` mục 3).

## 4. Nhạc nền

- Thể loại: piano tối giản (minimalist piano), tông documentary — KHÔNG dùng nhạc có lời, KHÔNG nhạc điện tử beat mạnh (phá vỡ cảm giác tài liệu/thủ công).
- Nguồn: Pixabay Music hoặc YouTube Audio Library, tìm từ khoá "minimal piano documentary", "curious piano ambient".
- Mixing: nhạc nền luôn dưới voiceover — đặt `volume={0.12-0.18}` cho track nhạc (so với `volume={1}` của voiceover), foley SFX ở khoảng `volume={0.4-0.6}` (đủ nghe nhưng không át VO).
- 1 track nhạc cho toàn video (không đổi nhạc giữa scene) trừ khi đổi hẳn phần nội dung (hook → payoff → CTA có thể tăng nhẹ tempo/volume ở CTA).
- Nếu video có 2+ đoạn đối lập rõ rệt về cảm xúc (vd đoạn khó khăn/bi quan vs. đoạn giải pháp/hy vọng), đổi tempo hoặc chuyển sang 1 track phụ tông sáng hơn ở đoạn giải pháp thay vì giữ nguyên 1 track đều toàn video — bắc cầu bằng crossfade 1-2s giữa 2 track, không cắt đột ngột.

```tsx
<Audio src={staticFile('audio/music.mp3')} volume={0.15} />
<Audio src={staticFile('audio/voiceover.mp3')} volume={1} />
```

## 5. QC trước khi render

- [ ] Mỗi entry animation quan trọng (không phải mọi rung nhẹ) có foley tương ứng
- [ ] Wipe/Pop/Pulse ở style guide mục 4 đều có SFX khớp frame, không bị lệch/trễ
- [ ] Nhạc nền không đè giọng đọc (nghe thử ở đoạn voiceover nói nhanh/nhiều chữ nhất)
- [ ] Không SFX nào bị cắt cụt do dài hơn `durationInFrames` của Sequence chứa nó
