---
name: shorts-9x16-video-engine
description: >-
  Full pipeline CHUYÊN BIỆT để sản xuất video dọc định dạng 9:16 (YouTube Shorts / TikTok / Instagram Reels, 45-180 giây) — khác với các skill kể chuyện 16:9-là-chính chỉ "co giãn" sang 9:16, skill này thiết kế NGAY TỪ ĐẦU cho khung hình dọc: vùng an toàn tránh UI nền tảng (nút like/share/subscribe), hook 1 giây đầu quyết định lướt hay ở lại, nhịp cắt cảnh 2-4s, KHÔNG dùng text overlay (không headline, không phụ đề — chỉ ảnh + voiceover + watermark nhỏ), ảnh sinh dọc gốc thay vì crop từ ngang, kết thúc dạng vòng lặp. Kế thừa toàn bộ quy tắc chống lỗi câm-lặng (đồng bộ audio/ảnh) đã đúc kết từ stickman-storytelling-video-engine, manhwa-drama-video-engine, stickman-history-video-engine. LUÔN dùng skill này khi user nói "làm video short 9x16/9:16", "video dọc", "video Shorts/TikTok/Reels", "video ngắn định dạng vertical", hoặc khi một video đang làm ở 16:9 cần "cắt bản Shorts" / "làm bản dọc" đúng chuẩn thay vì chỉ đổi kích thước composition.
---

# Shorts 9:16 Video Engine (Vertical-Native Production)

Pipeline sản xuất video **dọc thuần (9:16, 1080×1920)** cho YouTube Shorts / TikTok / Instagram Reels — tối ưu riêng cho **45-180 giây** (mặc định 60-120s, có thể tới trần 180s của YouTube Shorts cho các chủ đề dạng "toàn bộ lịch sử X trong 60s").

Skill này **không phải bản 16:9 co giãn sang dọc**. Ba skill kể chuyện hiện có (`stickman-storytelling-video-engine`, `manhwa-drama-video-engine`, `stickman-history-video-engine`) đều mặc định layout/prompt/pacing cho 16:9 rồi thêm một `<Composition>` 1080×1920 phụ — hệ quả thực tế đã gặp: prompt ảnh vẫn kết thúc bằng `16:9 widescreen` nên ảnh bị crop mất đầu nhân vật, nhịp 5-8s/shot của video dài khiến short 60s chỉ có 8-10 lần chuyển cảnh (quá chậm cho thuật toán Shorts). Skill này sửa từ gốc các vấn đề đó. Video dựng ra chỉ gồm ảnh + voiceover + watermark mascot nhỏ góc phải dưới — không có lớp text overlay (không headline, không phụ đề).

**Về nội dung/kịch bản (topic, giọng văn, chủ đề)**: dùng chung 5 trụ cột đề tài + văn phong từ `stickman-storytelling-video-engine` (hoặc style engine khác nếu user chỉ định — manhwa/history). Skill này KHÔNG thay thế phần sinh ý tưởng nội dung, chỉ thay thế toàn bộ phần **thực thi định dạng dọc**: kịch bản nén hook-first, scene breakdown nhịp nhanh, prompt ảnh dọc gốc, scaffold Remotion vertical-only, QC riêng cho Shorts.

---

## ⚡ ENGINE SINH CHỦ ĐỀ & KIỂM TRA CHỐNG TRÙNG LẶP

1. **BẮT BUỘC ĐỌC LỊCH SỬ**: Đọc `references/topic-history.md` (và nếu project dùng chung kênh với style engine khác, đọc luôn `topic-history.md` của skill đó) → không đề xuất lại chủ đề đã làm.
2. Nếu user chưa có sẵn topic, áp dụng 5 Trụ Cột từ `stickman-storytelling-video-engine/references/story-topics.md` (hoặc trụ cột của style engine user chỉ định), nhưng lọc theo tiêu chí **"cô đọng được thành 1 câu hỏi/1 cú twist duy nhất trong ≤180s"** — chủ đề cần nhiều hồi kịch tính đan xen (vd: một vụ đại án nhiều giai đoạn) phù hợp hơn với video 16:9 dài, không phù hợp ép vào Shorts.
3. **LƯU NHẬT KÝ NGAY KHI DUYỆT**: ghi 1 dòng mới vào `references/topic-history.md` với trạng thái `[IN_PROGRESS]`.

---

## ⚠️ CÁC QUY TẮC CỐT LÕI BẮT BUỘC (CRITICAL RULES)

### 1. Định Dạng Dọc Thuần — Composition Duy Nhất (Vertical-Only Rule)
- **Chỉ một `<Composition>` 1080×1920**, KHÔNG bolt thêm composition 16:9 "cho có". Nếu user cần cả bản dài lẫn bản Shorts của cùng câu chuyện, đó là **2 project riêng biệt** (2 lần scaffold, 2 bộ ảnh dọc/ngang riêng, 2 `scenes.json` riêng) — không share 1 composition co giãn 2 tỉ lệ, vì mọi con số layout (safe-zone, font size, watermark) đều khác nhau giữa 2 định dạng.
- Chi tiết cấu hình project + component tại `references/remotion-scaffold-vertical.md`.

### 2. Vùng An Toàn UI Nền Tảng (Platform Safe-Zone Rule)
Trên khung 1080×1920, UI của YouTube Shorts/TikTok/Reels **luôn đè lên** các vùng cố định — mọi text/watermark quan trọng phải nằm trong vùng an toàn:
- **Top**: chừa ≥160px (thanh tiến trình/tiêu đề một số app).
- **Bottom**: chừa ≥340px (tên kênh, nhạc nền, thanh tiến trình Shorts — vùng này dày nhất, hay bị bỏ sót nhất).
- **Right**: chừa ≥200px (cột nút like/comment/share/save/avatar kênh — cả 3 nền tảng đều đặt cột này ở cạnh phải).
- **Left**: chừa ≥40px.
- Watermark mascot kênh: badge tròn nhỏ (100px) ở **góc phải dưới** (`bottom:60, right:70`) — chấp nhận có thể bị cột nút tương tác che một phần trên TikTok/Shorts vì đây chỉ là chi tiết branding phụ, không phải thông tin cần đọc được; luôn preview trên thiết bị thật để xác nhận phần còn hiển thị đủ nhận diện kênh (chi tiết `references/remotion-scaffold-vertical.md` Mục 2.B).

### 3. Hook 1 Giây & Visual Gag 0-3s (The Swipe Test)
- **Frame đầu tiên (0.0s) phải là hình ảnh cao trào/gây sốc/Visual Gag** — không có logo intro, không fade-in chậm. Khán giả Shorts quyết định lướt hay ở lại trong dưới 1 giây, trước khi kịp nghe voiceover.
- **Visual Gag & Text Prompt Giây 0**: Mô tả chi tiết hình ảnh phi lý hài hước (ví dụ: kiếm sắt chém giáp bị cong queo như sợi mì, hiệp sĩ bốc khói nghẹt thở trong mũ sắt) kết hợp text giật gân đập vào mắt (`"IRON WAS WORSE THAN BRONZE?"`, `"COOKED ALIVE INSIDE"`, `"KNIGHTS WERE LIGHTER?!"`).
- Kịch bản nén hook-first: xem cấu trúc 3-nhịp tại `references/script-writing-shorts.md`.

### 4. Nhịp Cắt Cảnh Dồn Dập 2-4 Giây/Shot
- Khác với 5-8s (kể chuyện dài) hoặc 4-6s (manhwa) — Shorts cần **2 đến 4 giây/shot** (60-120 frames) để đạt mật độ chuyển động phù hợp thuật toán Shorts trong tổng thời lượng ngắn. Với video 60-120s → **20-45 shots**.
- Chi tiết scene breakdown tại `references/script-writing-shorts.md` Mục 3.

### 5. Ảnh Sinh Dọc Gốc, Không Crop Từ Ngang (Native Vertical Image Generation)
- Prompt AI phải kết thúc bằng `9:16 vertical portrait composition, full-bleed vertical framing` — **KHÔNG** copy nguyên prompt từ style engine 16:9 rồi quên đổi hậu tố `16:9 widescreen` (lỗi thực tế hay gặp nhất khi tái dùng prompt cũ — ảnh bị AI vẽ ngang rồi Remotion crop mất đầu/tay nhân vật).
- Không cần chừa negative space cho text overlay (không còn headline/phụ đề) — ưu tiên nhân vật lấp đầy khung hình, chi tiết công thức + prompt mẫu tại `references/vertical-visual-sourcing.md`.
- Nếu bắt buộc tái sử dụng ảnh 16:9 có sẵn (không có ảnh dọc gốc): dùng kỹ thuật crop-fill nền mờ phóng to thay vì `object-fit: cover` cắt trực tiếp (dễ mất đầu nhân vật) — xem Mục 3 file trên.

### 6. Kết Thúc Dạng Vòng Lặp (Loop-Friendly Ending)
- 1-2 giây cuối nên "vọng lại" hình ảnh/câu hỏi mở đầu (cùng góc máy, cùng nhân vật, hoặc nhắc lại câu hook) — khán giả xem lại ngay lập tức (loop) được thuật toán Shorts tính là tín hiệu giữ chân rất mạnh, khác hẳn video dài nơi kết thúc chỉ cần "đọng lại cảm xúc".
- CTA subscribe/follow (nếu có) chỉ xuất hiện 3-5 giây cuối, nhỏ, trong vùng an toàn.

### 7. Đồng Bộ Audio-Visual Tuyệt Đối (kế thừa nguyên vẹn — vẫn là lỗi hay gặp nhất)
Ba lỗi câm-lặng (không crash, không log lỗi) từ các skill kể chuyện gốc **vẫn áp dụng y hệt** ở định dạng dọc — xem chi tiết đầy đủ + script ASR alignment tại `references/remotion-scaffold-vertical.md` Mục 4:
- Tên file ảnh phải khớp tuyệt đối `0.png ... N-1.png`.
- Đuôi file audio trong `Root.tsx` phải khớp file thực tế trong `public/audio/scenes/` — `ls` xác nhận, không giả định.
- `scenes.json` phải tính lại timing mỗi khi audio được tạo lại — `ffprobe` đo độ dài thật, ưu tiên ASR word-level alignment.

### 8. Dự Án Độc Lập 100% (Project Isolation Rule)
- Mỗi short mới nằm trong thư mục riêng (kebab-case, ví dụ `shorts-roman-empire-60s/`), tự chứa `package.json`, `remotion.config.ts`, `tsconfig.json`, `src/`, `public/assets/scenes/`, `public/audio/scenes/`, `scenes.json`, `prompt.json`, `voText_<lang>.md`, `metadata.md` — không tái dùng/ghi đè thư mục project khác.

### 9. Quy Tắc Zero-Part Tuyệt Đối (Zero-Part Standalone Rule)
- **CẤM 100%** việc đặt `Part 01`, `Part 03`, `P3`, `Tập 5` trong tiêu đề hoặc hashtag Shorts. Mỗi video Short là một câu chuyện độc lập, đánh thẳng vào một câu hỏi nghịch lý/myth-busting (ví dụ: `Why Bronze Swords Were Better Than Iron`, `How Knight Helmets Almost Killed Them`, `Who Carries More Weight: A Knight or Modern Soldier?`).

---

## 🚀 QUY TRÌNH 8 BƯỚC SẢN XUẤT SHORTS 9:16

```
0. Xác Định Ngôn Ngữ & Style Nội Dung → 1. Chọn Chủ Đề (chống trùng) → 2. Kịch Bản Hook-First 3 Nhịp
   (mặc định English; style = stickman/manhwa/khác)  (topic-history.md)      (script-writing-shorts.md)
                                                                                    ↓
3. Scene Breakdown Dồn Dập (2-4s/shot) ← 4. Visual Sourcing Dọc Gốc + Safe-Zone Layout
   (20-45 shots, scenes.json)                (vertical-visual-sourcing.md)
        ↓
5. Scaffold Project Vertical-Only → 6. Master Audio & Sync (ffprobe + ASR alignment)
   (remotion-scaffold-vertical.md)     (giữ nguyên quy trình gốc)
        ↓
7. Metadata Shorts (Zero-Part Title/Cover Frame/0s Hook) → 8. QC Retention Shorts, Preview & Render
   (metadata-shorts.md)                                         (retention-qc-shorts.md)
```

---

### Bước 0: Xác Định Ngôn Ngữ & Style Nội Dung
- Mặc định **Tiếng Anh** nếu user không chỉ định — đồng bộ giữa voiceover và text trong ảnh (áp dụng đúng Quy Tắc Ngôn Ngữ của style engine gốc: `stickman-storytelling-video-engine` mục "Xác Định Ngôn Ngữ Dự Án").
- Hỏi user style hình ảnh nếu chưa rõ (stickman narrative / manhwa webtoon / stickman explainer / khác) — style DNA (nhân vật, màu sắc, bối cảnh) lấy từ `references/*-style-guide.md` của skill tương ứng, chỉ phần layout/khung hình/timing lấy từ skill này.

### Bước 1: Chọn Chủ Đề
- Áp dụng đúng mục "⚡ ENGINE SINH CHỦ ĐỀ" ở trên.

### Bước 2: Kịch Bản Hook-First 3 Nhịp
- Đọc `references/script-writing-shorts.md`. Viết kịch bản dồn nén 45-180s theo cấu trúc **Cold-Open Hook → Escalation dồn dập → Twist + Payoff + Loop** (khác 5-hồi của video dài).
- **Nếu topic là dạng "toàn bộ lịch sử/mọi triều đại/mọi vị vua của X"**: BẮT BUỘC áp dụng Mục 1.B của `script-writing-shorts.md` (giới hạn 5-6 điểm dừng, ≤2 tên riêng mới/10s, mini-hook giữa video) — đây là dạng chủ đề dễ vô tình biến Nhịp 2 thành danh sách liệt kê thay vì escalation thật sự, gây mất retention dù sync kỹ thuật vẫn đúng.
- Xuất `<topic-folder>/voText_<lang>.md` và `.txt`.

### Bước 3: Scene Breakdown & Timing
- Bẻ kịch bản thành **20-45 shots** (2-4s/shot). Tạo `<topic-folder>/scenes.json`: `startFrame`, `durationInFrames`, `voText` (dùng để đo timing/ASR alignment, không render lên màn hình), `imageSrc`.

### Bước 4: Visual Sourcing Dọc Gốc
- Đọc `references/vertical-visual-sourcing.md` + style guide tương ứng (vd `stickman-storytelling-video-engine/references/stickman-style-guide.md`). Mọi prompt kết thúc bằng hậu tố dọc (Mục 5 ở trên), không phải `16:9 widescreen`.
- Xuất `<topic-folder>/prompt.json` + `prompts_gemini.md`.
- Nhận ảnh vào `public/assets/scenes/` → **BẮT BUỘC** `ls` xác nhận `0.png...N-1.png` trước khi qua bước 5.

### Bước 5: Scaffold Project Vertical-Only
- Đọc `references/remotion-scaffold-vertical.md`. Tạo project độc lập với composition `Shorts` duy nhất 1080×1920, tích hợp `VerticalImageScene.tsx` và `ChannelWatermarkVertical.tsx` (góc phải dưới, 100px) — không có lớp text overlay nào (không headline, không phụ đề).
- `npm install` trong folder project.

### Bước 6: Master Audio & Sync
- Quy trình giữ nguyên từ skill gốc (không có gì đổi theo định dạng): nạp `full-scene.<ext>` vào `public/audio/scenes/`, `ls` xác nhận đuôi file khớp `Root.tsx`, `ffprobe` đo độ dài thật, ưu tiên ASR alignment nếu >15 scenes — chi tiết đầy đủ tại `references/remotion-scaffold-vertical.md` Mục 4.
- Xác nhận `sum(durationInFrames) === totalFrames === round(audio_duration × fps)` trước khi qua bước 7.

### Bước 7: Metadata Shorts (Zero-Part Title, Caption & Cover Frame)
- Đọc `references/metadata-shorts.md`. Sinh title ngắn (≤60 ký tự), tuân thủ 100% **Zero-Part Rule**, caption + hashtag (`#Shorts` + 3-5 tag chủ đề), chọn timestamp cover frame bằng `npx remotion still src/index.ts Shorts out/cover.jpg --frame=<N>`.

### Bước 8: QC Retention Shorts, Preview & Render
- Đọc `references/retention-qc-shorts.md` — chạy Swipe Test (1s), Loop Test, Safe-Zone Test, và **Information Density Test** (Mục 6 — bắt buộc nếu topic dạng timeline/liệt kê) trước khi coi là đạt, không chỉ checklist kỹ thuật.
- `npx tsc --noEmit` → `npm run dev` (Remotion Studio, xem composition `Shorts`) → `npx remotion render src/index.ts Shorts out/short.mp4`.
