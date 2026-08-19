---
name: paper-cut-video-engine
description: Full pipeline để sản xuất video YouTube phong cách paper-cut animation (giấy cắt dán, layered, có bóng đổ, chuyển động parallax nhẹ) — từ lên ý tưởng, viết kịch bản, tìm/tạo hình ảnh, đến scaffold và ráp dự án Remotion. LUÔN dùng skill này khi user nói "làm video paper cut", "kênh curiosity/kiến thức đời sống", "video Remotion", "tạo skill video pipeline", hoặc khi visual video hiện tại "không bắt mắt"/"không có view" và cần nâng chất lượng hình ảnh theo hướng paper-cut. Bao gồm cả việc gọi Pexels API để lấy stock video/ảnh và sinh prompt Gemini để user tự tạo ảnh paper-cut khi Pexels không có ảnh phù hợp.
---

# Paper-Cut Video Engine

Pipeline đầy đủ cho kênh curiosity/kiến thức đời sống, phong cách paper-cut animation, target 2 video/tuần, ~2h/ngày. Định dạng: 16:9 (YouTube dài) hoặc 9:16 (Shorts) — chọn theo từng video.

## Trước khi bắt đầu — hỏi nếu chưa rõ
Nếu user chưa nói rõ, hỏi ngắn gọn trước khi vào bước 1: **format** (16:9/9:16/cả hai), **thời lượng** mục tiêu, **có sẵn topic** hay cần đề xuất, **voiceover** — tự thu, hay tạo bằng AI (Magpie TTS). Thiếu các thông tin này ở đầu thường gây làm lại timing/scene breakdown giữa chừng.

## Quy trình 7 bước

```
1. Ý tưởng      → 2. Kịch bản      → 3. Scene breakdown
   (topic, hook)    (VO script)        (mỗi câu = 1 scene + mô tả visual)
        ↓
4. Visual sourcing → 5. Scaffold/ráp Remotion → 6. QC & xuất → 7. Metadata
   (Pexels/Gemini)    (component + timing)        (checklist)      (title/desc/tags/thumbnail)
```

Đọc references theo từng bước — KHÔNG load hết cùng lúc, chỉ mở file cần dùng ở bước đó.

### Bước 1-2: Ý tưởng + Kịch bản
Đọc `references/script-writing.md`. Output: 1 topic + full script chia theo dòng thoại, mỗi dòng có timestamp ước lượng (dựa trên tốc độ đọc ~2.5 từ/giây tiếng Việt).

Trước khi xin user duyệt script, chạy 1 lượt QC retention theo `references/retention-qc.md` trên bảng script — sửa retention ở dạng text luôn rẻ hơn sửa sau khi đã breakdown scene hoặc đã dựng.

Sau khi user duyệt script: nếu chọn voiceover AI, đọc `references/voiceover-tts.md` và chạy `scripts/magpie_tts.py` để tạo file audio — dùng thời lượng file thật (script tự in ra) thay cho ước lượng từ/giây khi breakdown scene ở bước 3.

### Bước 3: Scene breakdown
Từ script, chia mỗi 1-3 câu thoại thành 1 scene. Mỗi scene cần:
- `id`, `startFrame`, `durationInFrames` (30fps mặc định)
- `voText`: câu thoại tương ứng
- `visualPrompt`: mô tả ảnh/video cần có (dùng để search Pexels VÀ làm prompt Gemini nếu cần tạo mới)
- `visualType`: "photo" | "video" | "generated-image"

Trước khi ghi `scenes.json`, in bảng tóm tắt cho user duyệt (dễ đọc hơn JSON để soát nhịp phim/ẩn dụ hình ảnh trước khi tốn công tìm asset):

| Scene | Thời gian | VO text | Ẩn dụ hình ảnh | Layers dự kiến |
|---|---|---|---|---|

Chỉ sau khi user duyệt bảng này mới ghi `scenes.json` — đổi ẩn dụ hình ảnh sau khi đã tìm/tạo asset ở bước 4 tốn công hơn nhiều so với sau khi duyệt script (bước 1-2).

Lưu thành file `scenes.json` trong project — đây là nguồn dữ liệu duy nhất cho cả bước 4 và 5.

### Bước 4: Visual sourcing
Đọc `references/visual-sourcing.md`. Với từng scene trong `scenes.json`:
1. Thử `scripts/pexels_search.py` trước (đã có API key) — ưu tiên video clip, fallback ảnh.
2. Nếu không ra kết quả phù hợp với phong cách paper-cut (Pexels là ảnh/video thực tế, không phải paper-cut) → sinh **Gemini image prompt** theo template paper-cut trong file đó, in ra cho user tự chạy Gemini và import ảnh vào `public/generated/`.
3. Cập nhật `scenes.json` với đường dẫn asset thật đã tải/import.

Quan trọng: Pexels dùng cho B-roll thực tế (nếu script cần cảnh đời thực), Gemini-generated dùng cho các khái niệm trừu tượng/nhân vật minh hoạ — đây là chỗ quyết định video có "trông paper-cut" hay không, xem kỹ style guide.

### Bước 5: Scaffold & ráp Remotion
Đọc `references/remotion-scaffold.md`. Mỗi video mới → scaffold project **mới**, trong thư mục riêng đặt tên theo topic (kebab-case, xem mục 0 trong file đó) — KHÔNG tái sử dụng thư mục project của video trước (kể cả `paper-cut-channel`), tránh ghi đè `scenes.json`/asset/audio của dự án khác. Chỉ bỏ qua scaffold, thêm scene components vào project hiện tại, nếu user đang tiếp tục sửa chính video đang làm trong cùng phiên.

Mỗi scene trong `scenes.json` map 1-1 sang 1 `<Scene>` component, áp dụng hiệu ứng paper-cut (drop-shadow, layer parallax, xoay nhẹ, cut-in transition, wipe/pop/highlight) — chi tiết animation trong `references/paper-cut-style-guide.md`. Đọc file này TRƯỚC khi code bất kỳ scene component nào — đây là phần quyết định chất lượng visual.

Song song với animate, đọc `references/sound-design.md` và gắn foley SFX + nhạc nền — đây là trụ cột thứ 2 của phong cách Vox-style, không phải bước phụ làm sau cùng. Mỗi entry animation/wipe/pop cần 1 `<Audio>` SFX khớp frame (chi tiết cách sync trong file đó).

### Bước 6: QC & xuất
Chạy lại QC retention theo `references/retention-qc.md` trên `scenes.json` cuối cùng (lớp QC nội dung, bổ sung cho checklist kỹ thuật dưới đây), sau đó rà checklist trước khi render:
- [ ] Tổng `durationInFrames` các scene khớp độ dài file voiceover (chênh lệch < 0.3s)
- [ ] Không scene nào thiếu asset (kiểm tra `scenes.json`, không còn `visualPath: null`)
- [ ] Text overlay (nếu có) không bị che bởi safe-zone của YouTube Shorts (9:16) hoặc caption bar
- [ ] Palette và font nhất quán toàn video (không lệch tông giữa scene Pexels và scene generated)
- [ ] Foley SFX khớp frame với entry/wipe/pop, nhạc nền không đè giọng đọc (checklist đầy đủ ở `references/sound-design.md` mục 5)
- [ ] Mỗi scene vẫn hiểu được ý chính khi tắt tiếng (test bằng cách xem 1 lượt không âm thanh)
- [ ] Preview `npx remotion studio`, xem full 1 lượt trước khi `npx remotion render`
- [ ] Có `README.md` ngắn ở root project: lệnh preview (`npx remotion studio`), lệnh render 2 composition, danh sách asset còn là placeholder (nếu có)

### Bước 7: Metadata xuất bản
Đọc `references/metadata.md`. Sau khi render xong, sinh title/description/tags/thumbnail concept từ `scenes.json` đã duyệt (hook, plot-twist, timestamps) — không bịa nội dung ngoài script đã có.

## Khi user chỉ cần 1 phần của pipeline
Không bắt buộc chạy đủ 7 bước. Nếu user chỉ nói "tìm ảnh paper-cut cho scene X" → nhảy thẳng bước 4. Nếu chỉ nói "sửa animation scene" → chỉ đọc `paper-cut-style-guide.md`. Nếu chỉ nói "thêm SFX/nhạc nền" hoặc "âm thanh video chưa có hồn" → chỉ đọc `references/sound-design.md`. Nếu chỉ nói "viết title/mô tả cho video này" → nhảy thẳng bước 7.

## Ghi chú lệnh
- pnpm là package manager mặc định của project (theo stack hiện tại của user)
- Không viết code placeholder — mọi scene component phải render được ảnh/video thật, không dùng ảnh giữ chỗ
