# Metadata & High-CTR Horror Thumbnail Guide
## (Horror Storytelling SEO & Thumbnail Architecture)

Tài liệu này cung cấp công thức tạo **Thumbnail Kinh Dị Siêu Hút Click (High-CTR 10 – 18%)** và bộ tiêu chuẩn viết Tiêu đề, Mô tả, Thẻ tag SEO trọn gói cho cả **Video YouTube Dài (16:9)** và **YouTube Shorts / TikTok / Reels (9:16)**.

---

## 🖼️ 1. CÔNG THỨC THUMBNAIL KINH DỊ HIGH-CTR (LEFT CARD + RIGHT TITLE COMPOSITION)

Dựa trên cấu trúc chuẩn đã được kiểm chứng thực tế trong Remotion Component `Thumbnail.tsx`:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   [NỬA TRÁI: THẺ VÒM NHÂN VẬT & THỰC THỂ]   [NỬA PHẢI: TYPOGRAPHY]     │
│   - Khung thẻ vòm viền sáng + đinh kim     - Tag pill đỏ: TRUYỆN       │
│     cương ma mị (thumb_card.jpg)             KINH DỊ                    │
│   - Cận cảnh đôi mắt kinh hoàng, mồ hôi    - Tiêu đề Serif lớn        │
│     lạnh, đồng tử giãn cực đại               (Playfair / Lora)          │
│   - Thực thể ma quái ghé sát vai / vươn    - Sub-tag: (FULL)           │
│     bàn tay xám ngoét tới cổ                - Pill nhận diện kênh:      │
│   - Ánh sáng Chiaroscuro & vệt hào quang đỏ   ▶ CHUYỆN MA AUDIO         │
│                                                                         │
│   [NỀN CHÌM TOÀN KHUNG HÌNH (thumb_bg.jpg)]:                            │
│   Hành lang tối / Căn phòng bỏ hoang / Ánh đèn chập chờn + Gradient tối │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🎯 2 Asset Hình Ảnh Cần Thiết Cho Thumbnail:
1. `public/assets/thumb_card.jpg`: Ảnh dọc chân dung cận cảnh nhân vật chính hoảng loạn tột độ và thực thể ma quái ẩn hiện sau lưng.
2. `public/assets/thumb_bg.jpg`: Ảnh bối cảnh chiều ngang (16:9) không gian u tối, sương mù ma mị, bóng đổ nặng nề làm nền chìm phía sau.

---

## ✍️ 2. CÔNG THỨC TIÊU ĐỀ KINH DỊ HIGH-CTR (12 – 18%)

### Tiếng Việt (`vi`):
- `Thang Máy Tầng Âm B3: Bí Mật Ca Trực Bảo Vệ Nửa Đêm Tại Toà Nhà Bỏ Hoang | Chuyện Ma Có Thật`
- `Chuyến Taxi Lúc 3 Giờ Sáng: Lời Cảnh Báo Của Người Phụ Nữ Áo Trắng Khi Nhìn Lên Gương Chiếu Hậu`
- `Thuê Căn Phòng 404 Lúc Nửa Đêm: Lý Do Bản Thân Không Có Bóng Phản Chiếu Trong Gương`
- `Trò Chơi Trốn Tìm Một Mình Lúc 0 Giờ: Lẽ Ra Tôi Không Nên Nhặt Con Búp Bê Ấy Lên`
- `Tần Số Radio Lạ Lúc 3:33 Sáng: Bản Tin Dự Báo Cái Chết Của Chính Bác Tài Ca Đêm`

### Tiếng Anh (`en`):
- `Midnight Taxi Ride At 3 AM: The Chilling Secret In My Rearview Mirror | True Horror Story`
- `I Rented Room 404 At A Deserted Motel: Never Open The Closet After Midnight`
- `Night Shift Security Guard At An Abandoned Tower: The Basement Floor B3 Does Not Exist`
- `The Sleep Tracker App Recorded A Voice Whispering In My Ear At 3:15 AM`

---

## 📑 3. CẤU TRÚC FILE `metadata.md` (XUẤT TRỌN GÓI 1 LẦN)

Mỗi dự án video kinh dị khi hoàn tất kịch bản **BẮT BUỘC TỰ ĐỘNG XUẤT ĐẦY ĐỦ 7 PHẦN** vào `<topic-folder>/metadata.md`:

```markdown
# Metadata Video: <project-folder-name>
## (Kể Chuyện Audio Kinh Dị & Chuyện Ma Đêm Khuya)

---

## 📌 1. TIÊU ĐỀ YOUTUBE CHÍNH (HIGH-CTR 12 – 18%)
```text
<Tiêu đề chính kịch tính, khơi gợi tò mò, có kèm | Chuyện Ma Có Thật hoặc Chuyện Ma Audio>
```

---

## 🎯 2. CÁC PHƯƠNG ÁN TIÊU ĐỀ PHỤ (A/B TESTING TITLES)
- **Option 1 (Tập trung điềm gở & nghề nghiệp)**: `<Tiêu đề phương án 1>`
- **Option 2 (Tập trung cú twist & thực thể)**: `<Tiêu đề phương án 2>`
- **Option 3 (Giật gân ngắn gọn - Clickbait cao)**: `<Tiêu đề phương án 3>`
- **Option 4 (Tâm linh đô thị)**: `<Tiêu đề phương án 4>`

---

## 🖼️ 3. THUMBNAIL PROMPTS (GEMINI / MIDJOURNEY)

### A. Ảnh Thẻ Vòm Nhân Vật (thumb_card.jpg - Tỷ lệ 2:3 hoặc 3:4):
```text
Cinematic dark horror character portrait illustration, high-CTR YouTube thumbnail card art. Extreme close-up of a terrified [Protagonist Anchor] with wide horrified dilated pupils and cold sweat on pale forehead looking forward in breathless dread, cold teal rim lighting. In the deep shadow behind his shoulder, [Entity Anchor] leans in with glowing hollow eyes and a decaying grey hand reaching toward his collar. Gritty dark chiaroscuro shadows, intense horror mood, 3:4 portrait framing. Cinematic horror artwork only, no speech bubbles, no dialogue text balloons, no watermarks, zero readable text.
```

### B. Ảnh Nền Bối Cảnh (thumb_bg.jpg - Tỷ lệ 16:9):
```text
Cinematic dark horror atmospheric background, deserted creepy [setting description] at midnight, solitary flickering hanging yellow bulb casting ominous distorted shadows, deep cold teal volumetric fog and faint blood-red ambient glow, gritty dark textures, 16:9 widescreen composition. Cinematic horror artwork only, no characters in center, no speech bubbles, no watermarks, zero readable text.
```

### 🔤 Gợi ý Chèn Text Trên Thumbnail:
- **Tag Pill**: `TRUYỆN KINH DỊ` *(Nền đỏ `#E50914`, chữ trắng đậm)*
- **Tiêu đề chính**: `<Tên câu chuyện 2-3 dòng font Serif Playfair/Lora>` *(Màu trắng viền đen dày)*
- **Sub-tag**: `(FULL)`
- **Kênh nhận diện**: `CHUYỆN MA AUDIO`

---

## 📑 4. MÔ TẢ VIDEO CHUẨN SEO (YOUTUBE DESCRIPTION)

```text
<Tóm tắt dẫn dắt câu chuyện rùng rợn 2-3 đoạn ngắn, nêu bật tình huống cấm kỵ và cú twist nghẹt thở...>

🎧 LƯU Ý QUAN TRỌNG: Hãy tắt đèn và đeo tai nghe stereo để cảm nhận trọn vẹn không gian âm thanh ma mị và rợn gáy nhất!

---------------------------------------------------
⏱️ MỐC THỜI GIAN (CHAPTERS / TIMESTAMPS):
0:00 - <Tên mốc 1>
0:35 - <Tên mốc 2>
...
X:XX - Lời cảnh báo lạnh sống lưng nửa đêm

---------------------------------------------------
📌 Đừng quên nhấn LIKE, CHIA SẺ và ĐĂNG KÝ KÊNH để không bỏ lỡ những tập Chuyện Ma Đêm Khuya & Kể Chuyện Kinh Dị tiếp theo vào 21h hàng tuần!

#TruyenMa #ChuyenMaDemKhuya #KinhDi #ChuyenKinhDi #ChuyenMaAudio #AudioStorytelling #Creepypasta #TruyenMaCoThat #HorrorStory #AmAnhDemKhuya
```

---

## 🏷️ 5. BỘ TỪ KHÓA TỐI ƯU SEO (TAGS CHO YOUTUBE STUDIO)

```text
truyện ma, chuyện ma, chuyện ma đêm khuya, chuyen ma audio, truyen ma audio, truyen ma co that, truyen ma viet nam, chuyen kinh di, truyen kinh di, ke chuyen dem khuya, creepypasta viet nam, truyen ma hay nhat, truyen ma kinh di nhat, [chủ đề cụ thể], [địa điểm cụ thể], audio horror, vietnamese horror story, scary story, night shift horror, audio storytelling, truyen ma rung ron, chilling horror, scary story with subtitles, horror storytelling remotion
```

---

## 📱 6. NỘI DUNG ĐĂNG BÀI MẠNG XÃ HỘI (COMMUNITY POST / FACEBOOK / TIKTOK)

### 📘 Bài viết Facebook / YouTube Community:
> 🌑 *"<Câu hook giật mình kích thích tò mò>"*  
> Trọn bộ câu chuyện ma đô thị có thật: **<Tên Tiêu Đề>** vừa chính thức lên sóng!  
> 🎧 Đeo tai nghe, tắt điện và thưởng thức ngay tại link bên dưới 👇  
> #ChuyenMaDemKhuya #ChuyenKinhDi #ChuyenMaAudio #AudioHorror

---

## 🎬 7. BỘ METADATA CHUYÊN BIỆT CHO YOUTUBE SHORTS / TIKTOK / REELS (9:16)

*(Đồng thời xuất ra file độc lập `<topic-folder>/metadata_shorts.md` để user sử dụng tiện lợi)*

### 🚫 Quy Tắc Cốt Lõi: Zero-Part Standalone Rule
Tuyệt đối **KHÔNG** đặt `Tập 1`, `Part 1`, `P2` trong tiêu đề Shorts. Mỗi Short là một câu chuyện độc lập.

### 🏆 Tiêu Đề Shorts High-CTR (< 60 ký tự):
- **Option 1 (Cảnh báo cấm kỵ - Khuyên dùng)**: `<Tiêu đề cảnh báo cấm kỵ> ⚠️ #shorts #kinhdi`
- **Option 2 (Nghịch lý dị thường)**: `<Tiêu đề nghịch lý rùng rợn> 😱 #shorts #chuyenma`
- **Option 3 (Cú twist bất ngờ)**: `<Tiêu đề giật gân ngắn>... #shorts #chuyenmaaudio`
- **Option 4 (Lời thì thầm ma quái)**: `"<Câu thoại rùng rợn>" 👻 #shorts #creepypasta`

### 🎭 Hook Giây 0-3s & Visual Shock:
- **Visual Shock**: Đèn chớp giật, cận cảnh mắt ma phát sáng hoặc chi tiết kinh hoàng mở màn.
- **Text Hook In-Screen**: `"<CÂU HOOK CHỮ IN HOA MÀU ĐỎ/VÀNG VIỀN ĐEN>"`

### 💬 Caption & Hashtags Shorts:
```text
<Đoạn giới thiệu ngắn 1-2 câu kết thúc bằng lời kêu gọi đeo tai nghe>

#Shorts #TruyenMa #ChuyenMaDemKhuya #KinhDi #ChuyenKinhDi #ChuyenMaAudio #Creepypasta #TruyenMaCoThat #ScaryStory #HorrorStory
```

### 🖼️ Khung Hình Bìa (Cover Frame Timestamps):
- **Frame A (~X.Xs)**: <Chi tiết khung hình shock 1>
- **Frame B (~Y.Ys)**: <Chi tiết khung hình shock 2>

### 🎨 Prompt Bìa Dọc 9:16 (Gemini Imagen 3 / Midjourney):
```text
Cinematic dark urban horror illustration, high-CTR YouTube Shorts cover in vertical 9:16 portrait composition. A terrified [Protagonist Anchor] looking over shoulder in pure dread, while [Entity Anchor] emerges from dark background reaching a decayed hand forward. Heavy chiaroscuro shadows, cold teal rim light and deep blood-crimson glow, 9:16 vertical composition, full-bleed framing. Cinematic horror art only, no speech bubbles, no watermark, zero readable text.
```

### 💬 Bình Luận Ghim (Pinned Comment):
```text
Nếu gặp phải tình huống này giữa đêm khuya... bạn sẽ làm gì? 😱
1. <Lựa chọn 1>
2. <Lựa chọn 2>
3. <Lựa chọn 3>

👉 Để lại câu trả lời và chia sẻ trải nghiệm rợn gáy nhất của bạn bên dưới nhé! 👇
```

### 🏷️ Bộ Tags SEO Cho Shorts (YouTube Studio & TikTok):
```text
truyen ma short, truyen ma shorts, chuyen ma dem khuya, chuyen ma audio, truyen ma audio, truyen ma co that, chuyen kinh di short, truyen kinh di, [chủ đề short], audio horror, horror shorts, scary shorts, creepypasta shorts, truyen ma rung ron, chilling horror, scary story with subtitles, tiktok truyen ma, truyen ma tiktok, shorts kinh di, chuyen ma co that short, am anh dem khuya
```
```
