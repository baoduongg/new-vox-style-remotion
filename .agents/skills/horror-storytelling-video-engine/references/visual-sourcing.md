# Visual Sourcing & Prompt Gemini Guide (Horror Storytelling)

Tài liệu này hướng dẫn chi tiết cách viết Prompt Gemini để tạo ra bộ ảnh minh họa chuẩn phong cách **Dark Semi-Realistic Horror Art / Eerie Graphic Novel Illustration** với không khí ma mị u tối, tính nhất quán cao, và trọn gói cả ảnh Video, Thumbnail Studio lẫn Shorts Cover.

---

## 🔒 1. BẢNG KHÓA NHẤT QUÁN NHÂN VẬT & THỰC THỂ (CONSISTENCY ANCHORS)

Trước khi viết prompt cho toàn bộ tập truyện, **BẮT BUỘC** định nghĩa sẵn diện mạo nhân vật chính và thực thể ma quái:

### 👨 Nhân Vật Chính (Ví dụ: Bảo vệ ca đêm Nam / Tài xế Minh):
```text
[CHARACTER_PROTAGONIST]: A terrified 28-year-old Asian security guard named Nam with short dark hair, wearing a dark navy blue security uniform with silver badge on chest, wide horrified dilated pupils, cold sweat glistening on pale forehead, trembling jaw.
```

### 👻 Thực Thể Ma Quái (Ví dụ: Hồn ma công nhân xây dựng / Người phụ nữ áo trắng):
```text
[ENTITY_GHOST]: A tall ominous shadowy construction worker in a torn dirty reflective safety vest with glowing hollow yellow eye sockets, a decaying grey mud-stained hand, floating slightly in dim shadows with a faint eerie mist aura.
```

---

## 🎨 2. CẤU TRÚC PROMPT GEMINI TIÊU CHUẨN

Mọi Prompt Gemini trong skill này tuân thủ cấu trúc 5 phần:

```
[Tiền tố phong cách Horror] + [Mô tả Nhân vật / Thực thể từ Consistency Anchor] + [Hành động & Biểu cảm sợ hãi chi tiết] + [Bối cảnh u ám & Ánh sáng Chiaroscuro] + [Quy chuẩn định dạng & Ngôn ngữ] + [Hậu tố chống chữ rác AI]
```

### 🌑 Tiền tố phong cách cố định (Master Style Prefix):
```text
Cinematic dark horror illustration, eerie graphic novel semi-realistic digital art style, heavy atmospheric shadows, dark moody chiaroscuro lighting, desaturated color palette with eerie cold teal and deep black tones, subtle film grain texture.
```

### 🚫 Hậu tố bắt buộc cuối mọi prompt (Master Anti-Gibberish Suffix):
Luôn nối chuỗi này vào **cuối cùng** của mọi prompt trước khi gửi cho Gemini:
```text
Cinematic horror artwork only, no speech bubbles, no dialogue text balloons, no comic sound captions, no floating labels, no watermarks. Do not render any text except the exact quoted string(s) specified in the prompt; if no text was specified, the image must contain zero readable text or lettering.
```

---

## 🖼️ 3. QUY CHUẨN PROMPT THUMBNAIL STUDIO & SHORTS COVER (TRỌN BỘ 1 LẦN)

Ngoài các scene trong video, file `prompts_gemini.md` & `prompt.json` **BẮT BUỘC TỰ ĐỘNG CHỨA THÊM 3 PROMPT ĐẶC BIỆT**:

### 1. `Thumbnail Character Card (thumb_card.jpg)` (Khung vòm chân dung 3:4):
```text
Cinematic dark horror character portrait illustration, high-CTR YouTube thumbnail card art. Extreme close-up of a terrified [CHARACTER_PROTAGONIST] with wide horrified dilated pupils and cold sweat on pale forehead looking forward in breathless dread, cold teal rim lighting. In the deep shadow behind his shoulder, [ENTITY_GHOST] leans in with glowing hollow eyes and a decaying grey hand reaching toward his collar. Gritty dark chiaroscuro shadows, intense horror mood, 3:4 portrait framing. Cinematic horror artwork only, no speech bubbles, no dialogue text balloons, no watermarks, zero readable text.
```

### 2. `Thumbnail Background (thumb_bg.jpg)` (Bối cảnh u ám 16:9):
```text
Cinematic dark horror atmospheric background, deserted creepy [setting description] at midnight, solitary flickering hanging bulb casting ominous distorted shadows, deep cold teal volumetric fog and faint blood-red ambient glow, gritty dark textures, 16:9 widescreen composition. Cinematic horror artwork only, no characters in center, no speech bubbles, no watermarks, zero readable text.
```

### 3. `Shorts Cover 9:16 (shorts_cover.png)` (Ảnh bìa dọc dồn dập):
```text
Cinematic dark urban horror illustration, high-CTR YouTube Shorts cover in vertical 9:16 portrait composition. A terrified [CHARACTER_PROTAGONIST] looking over shoulder in pure dread, while [ENTITY_GHOST] emerges from dark background reaching a decayed hand forward. Heavy chiaroscuro shadows, cold teal rim light and deep blood-crimson glow, 9:16 vertical composition, full-bleed framing. Cinematic horror art only, no speech bubbles, no watermark, zero readable text.
```

---

## 🔤 4. QUY ĐỊNH VĂN BẢN TRONG ẢNH KINH DỊ (TEXT-IN-PICTURE CONSTRAINTS)

Bất kỳ biển báo, bảng hiệu, đồng hồ, tin nhắn hoặc giấy tờ xuất hiện trong ảnh **BẮT BUỘC ĐỒNG NHẤT 100% VỚI NGÔN NGỮ VIDEO**:

### 🇻🇳 1. Video Tiếng Việt (`vi`):
- **Biển hiệu phòng**: `Rusty metal door plaque reading 'PHÒNG 404 - KHÔNG PHẬN SỰ MIỄN VÀO'`
- **Đèn LED thang máy**: `Elevator overhead display glowing red reading '- B3'`
- **Biển nghĩa trang**: `Weathered concrete gate sign with Vietnamese text 'NGHĨA TRANG BÌNH HƯNG HÒA'`
- **Đồng hồ số**: `Digital glowing clock displaying '03:33 AM'`
- **Tin nhắn điện thoại**: `Smartphone lockscreen displaying Vietnamese notification 'Em đang đứng ngay sau lưng anh...'`
- **Tiền vàng mã**: `Scattered traditional Vietnamese hell bank notes with printed text 'NGÂN HÀNG ĐỊA PHỦ'`

### 🇺🇸 2. Video Tiếng Anh (`en`):
- **Biển hiệu phòng**: `Rusty metal door plaque reading 'ROOM 404 - DO NOT ENTER'`
- **Đèn LED thang máy**: `Elevator overhead display glowing red reading '- B3'`
- **Biển báo**: `Weathered highway sign reading 'WOODLAND CEMETERY - 2 MILES'`
- **Tin nhắn điện thoại**: `Smartphone lockscreen displaying notification 'Look behind you right now'`

---

## 📑 5. QUY CHUẨN ĐỊNH DẠNG TIÊU ĐỀ TRONG `prompts_gemini.md`

File `prompts_gemini.md` **BẮT BUỘC TUÂN THỦ CẤU TRÚC**:

```markdown
# Danh Sách Prompt Gemini: <project-folder-name>
## Phong cách: Dark Semi-Realistic Horror Art

---

### Thumbnail Character Card (thumb_card.jpg)
```text
<Prompt thumb_card.jpg>
```

---

### Thumbnail Background (thumb_bg.jpg)
```text
<Prompt thumb_bg.jpg>
```

---

### Shorts Cover 9:16 (shorts_cover.png)
```text
<Prompt shorts_cover.png>
```

---

### Scene 0 (0.png)
```text
<Prompt Scene 0>
```

---

### Scene 1 (1.png)
```text
<Prompt Scene 1>
```

...
```
