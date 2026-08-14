---
name: paper-cut-video-engine
description: Full pipeline để sản xuất video YouTube phong cách paper-cut animation (giấy cắt dán, layered, có bóng đổ, chuyển động parallax nhẹ) — từ lên ý tưởng, viết kịch bản, tìm/tạo hình ảnh, đến scaffold và ráp dự án Remotion. LUÔN dùng skill này khi user nói "làm video paper cut", "kênh curiosity/kiến thức đời sống", "video Remotion", "tạo skill video pipeline", hoặc khi visual video hiện tại "không bắt mắt"/"không có view" và cần nâng chất lượng hình ảnh theo hướng paper-cut. Bao gồm cả việc gọi Pexels API để lấy stock video/ảnh và sinh prompt Gemini để user tự tạo ảnh paper-cut khi Pexels không có ảnh phù hợp.
---

# Paper-Cut Video Engine

Pipeline đầy đủ cho kênh curiosity/kiến thức đời sống, phong cách paper-cut animation, target 2 video/tuần, ~2h/ngày. Định dạng: 16:9 (YouTube dài) hoặc 9:16 (Shorts) — chọn theo từng video.

## Quy trình 6 bước

```
1. Ý tưởng      → 2. Kịch bản      → 3. Scene breakdown
   (topic, hook)    (VO script)        (mỗi câu = 1 scene + mô tả visual)
        ↓
4. Visual sourcing → 5. Scaffold/ráp Remotion → 6. QC & xuất
   (Pexels/Gemini)    (component + timing)        (checklist)
```

Đọc references theo từng bước — KHÔNG load hết cùng lúc, chỉ mở file cần dùng ở bước đó.

### Bước 1-2: Ý tưởng + Kịch bản
Đọc `references/script-writing.md`. Output: 1 topic + full script chia theo dòng thoại, mỗi dòng có timestamp ước lượng (dựa trên tốc độ đọc ~2.5 từ/giây tiếng Việt).

### Bước 3: Scene breakdown
Từ script, chia mỗi 1-3 câu thoại thành 1 scene. Mỗi scene cần:
- `id`, `startFrame`, `durationInFrames` (30fps mặc định)
- `voText`: câu thoại tương ứng
- `visualPrompt`: mô tả ảnh/video cần có (dùng để search Pexels VÀ làm prompt Gemini nếu cần tạo mới)
- `visualType`: "photo" | "video" | "generated-image"

Lưu thành file `scenes.json` trong project — đây là nguồn dữ liệu duy nhất cho cả bước 4 và 5.

### Bước 4: Visual sourcing
Đọc `references/visual-sourcing.md`. Với từng scene trong `scenes.json`:
1. Thử `scripts/pexels_search.py` trước (đã có API key) — ưu tiên video clip, fallback ảnh.
2. Nếu không ra kết quả phù hợp với phong cách paper-cut (Pexels là ảnh/video thực tế, không phải paper-cut) → sinh **Gemini image prompt** theo template paper-cut trong file đó, in ra cho user tự chạy Gemini và import ảnh vào `public/generated/`.
3. Cập nhật `scenes.json` với đường dẫn asset thật đã tải/import.

Quan trọng: Pexels dùng cho B-roll thực tế (nếu script cần cảnh đời thực), Gemini-generated dùng cho các khái niệm trừu tượng/nhân vật minh hoạ — đây là chỗ quyết định video có "trông paper-cut" hay không, xem kỹ style guide.

### Bước 5: Scaffold & ráp Remotion
Đọc `references/remotion-scaffold.md`. Nếu chưa có project, scaffold mới theo cấu trúc chuẩn ở đó (hỗ trợ song song composition 16:9 và 9:16). Nếu project đã tồn tại, chỉ thêm scene components mới, không scaffold lại.

Mỗi scene trong `scenes.json` map 1-1 sang 1 `<Scene>` component, áp dụng hiệu ứng paper-cut (drop-shadow, layer parallax, xoay nhẹ, cut-in transition) — chi tiết animation trong `references/paper-cut-style-guide.md`. Đọc file này TRƯỚC khi code bất kỳ scene component nào — đây là phần quyết định chất lượng visual.

### Bước 6: QC & xuất
Checklist trước khi render:
- [ ] Tổng `durationInFrames` các scene khớp độ dài file voiceover (chênh lệch < 0.3s)
- [ ] Không scene nào thiếu asset (kiểm tra `scenes.json`, không còn `visualPath: null`)
- [ ] Text overlay (nếu có) không bị che bởi safe-zone của YouTube Shorts (9:16) hoặc caption bar
- [ ] Preview `npx remotion studio`, xem full 1 lượt trước khi `npx remotion render`

## Khi user chỉ cần 1 phần của pipeline
Không bắt buộc chạy đủ 6 bước. Nếu user chỉ nói "tìm ảnh paper-cut cho scene X" → nhảy thẳng bước 4. Nếu chỉ nói "sửa animation scene" → chỉ đọc `paper-cut-style-guide.md`.

## Ghi chú lệnh
- pnpm là package manager mặc định của project (theo stack hiện tại của user)
- Không viết code placeholder — mọi scene component phải render được ảnh/video thật, không dùng ảnh giữ chỗ
