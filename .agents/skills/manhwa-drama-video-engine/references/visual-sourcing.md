# Visual Sourcing & Prompt Gemini Guide (Manhwa Drama 2D Webtoon)

Tài liệu này hướng dẫn chi tiết cách viết Prompt Gemini để tạo ra những bức ảnh chuẩn phong cách **Modern Korean Manhwa / Webtoon 2D Art Style** với tính nhất quán nhân vật cao và ánh sáng chuyển tải trọn vẹn cảm xúc của câu chuyện.

---

## 🔒 1. Bảng Khóa Nhất Quán Nhân Vật (Character Consistency Anchor)

Trước khi viết prompt cho toàn bộ tập truyện, **BẮT BUỘC** định nghĩa sẵn diện mạo của 2 nhân vật chính và copy đoạn mô tả này vào mọi prompt có mặt họ:

### 👨 Nam Chính (Minh Huy / Male Lead):
```
[CHARACTER_MALE]: A handsome 26-year-old Korean man with sharp jawline, stylish dark brown comma-parted hair, expressive dark brown eyes, wearing a stylish camel brown wool trench coat over a black turtleneck sweater.
```

### 👩 Nữ Chính (Thu Hà / Female Lead):
```
[CHARACTER_FEMALE]: A pretty 24-year-old Korean woman with long soft wavy brown hair, gentle brown eyes, wearing a cozy cream-colored knit sweater, a pleated teal midi skirt, and carrying a small leather crossbody bag.
```

---

## 🎨 2. Cấu Trúc Prompt Gemini Tiêu Chuẩn

Mọi Prompt Gemini trong skill này tuân thủ cấu trúc 5 phần:

```
[Tiền tố phong cách Manhwa 2D] + [Mô tả Nhân vật từ Character Anchor] + [Hành động & Biểu cảm chi tiết] + [Bối cảnh & Ánh sáng tâm lý] + [Quy chuẩn định dạng & Ngôn ngữ]
```

### 💎 Tiền tố phong cách cố định (Master Style Prefix):
```
Clean 2D modern Korean manhwa romance drama webtoon anime art style illustration, sharp digital line art, semi-realistic anime aesthetics, rich emotional cinematic atmosphere.
```

### 🚫 Hậu tố bắt buộc cuối mọi prompt (Master Anti-Gibberish Suffix):
Luôn nối chuỗi này vào **cuối cùng** của mọi prompt, sau phần mô tả bối cảnh/hành động (xem lý do đầy đủ ở mục 5 bên dưới):
```
Cinematic illustration only, no speech bubbles, no dialogue text balloons, no comic sound-effect captions, no watermarks. Do not render any text except the exact quoted string(s) specified above; if no text was specified in this prompt, the image must contain zero readable text or lettering.
```

---

## 🎬 3. Bộ Prompt Mẫu Cho Các Phân Cảnh Điển Hình

> ⚠️ Scene 1 dưới đây viết đầy đủ để làm mẫu. Từ Scene 2 trở đi, mỗi prompt **PHẢI** được nối thêm **Master Anti-Gibberish Suffix** ở mục 2 vào cuối trước khi gửi cho Gemini, kể cả khi không viết lặp lại chuỗi đó trong tài liệu này để tiết kiệm không gian.

### Scene 1: Hẹn hò lãng mạn trước Shinsegae (Romantic Date)
```
Clean 2D modern Korean manhwa romance drama webtoon anime art style illustration, sharp digital line art, semi-realistic anime aesthetics. A handsome 26-year-old Korean man with stylish comma-parted hair in a camel brown wool trench coat and a pretty 24-year-old Korean woman with wavy brown hair in a cream knit sweater and teal skirt, walking happily hand in hand outside a luxury department store with glowing warm entrance lights that say "SHINSEGAE", romantic smiling expressions, pedestrians blurred in background, warm cozy golden evening light, 16:9 widescreen, no photo realism, webtoon comic art. Cinematic illustration only, no speech bubbles, no dialogue text balloons, no comic sound-effect captions, no watermarks. Do not render any text except the exact quoted string(s) specified above; if no text was specified in this prompt, the image must contain zero readable text or lettering.
```

### Scene 2: Ăn tối ngắm hoàng hôn sông Hàn (Han River Dinner)
```
Clean 2D modern Korean manhwa romance drama webtoon anime art style illustration, sharp digital line art. The handsome Korean man in a dark teal suit jacket feeding a skewer with chopsticks to the pretty Korean woman with wavy brown hair, smiling affectionately at a cozy waterfront pojangmacha restaurant, Han river sunset with golden pink sky and bridge in background, warm lantern glow on wooden table with Korean food dishes, romantic atmosphere, 16:9 widescreen, 2D webtoon art.
```

### Scene 3: Nghi ngờ trong toa tàu điện ngầm Gangnam (Subway Suspicion)
```
Clean 2D modern Korean manhwa romance drama webtoon anime art style illustration, sharp digital line art. Inside a crowded modern Seoul subway car with green digital sign "Gangnam Station", the pretty Korean woman in cream knit sweater holding the arm of the handsome Korean man in grey trench coat looking at him with worried suspicious eyes, the man has a cold indifferent expression while secretly staring down at his smartphone screen, crowded commuters in background, cool fluorescent lighting, urban suspense mood, 16:9 widescreen.
```

### Scene 4: Bàng hoàng phát hiện hóa đơn & thẻ tín dụng (Shocking Evidence Discovery)
```
Clean 2D modern Korean manhwa drama webtoon anime art style illustration, sharp digital line art. In a luxury high-rise cafe at night with glowing city skyline outside window, the pretty Korean woman covering her mouth in tears of shock, looking at a large floating glowing paper receipt titled "LUXURY BRAND RECEIPT" with handbag icon and several credit cards floating in air, the handsome Korean man standing next to her with a tense shadowed face looking down uncomfortably, dramatic high contrast night lighting, emotional shock, 16:9 widescreen.
```

### Scene 5: Khung hình chia đôi - Lật mặt kẻ phản diện (Split-Screen Villain Reveal)
```
Clean 2D modern Korean manhwa drama webtoon anime art style illustration, split-screen dual panel composition with diagonal dividing line. Left side: The handsome Korean man in camel coat with a warm gentle smiling face in bright warm lighting. Right side: The same man with a sinister cold smirk, sharp evil eyes, shaded half-face in dark desaturated teal lighting, background with shattered glass shards flying, dramatic psychological betrayal contrast, 16:9 widescreen, comic art style.
```

---

## 🔤 4. Quy Định Bắt Buộc Về Văn Bản Trong Ảnh (Text-in-Picture & In-Image Props Constraint)

Chữ hiển thị trên các vật chứng và bối cảnh (hóa đơn, sao kê ngân hàng, thiệp mời cưới, tin nhắn điện thoại, biển báo đường phố, hồ sơ tòa án, banner sự kiện) **BẮT BUỘC ĐỒNG NHẤT 100% VỚI NGÔN NGỮ ĐÃ CHỌN CỦA VIDEO**:

### 🇰🇷 1. Khi Video là Tiếng Hàn (`ko`):
Mọi prompt mô tả vật chứng có chữ **bắt buộc chỉ định rõ cụm từ chữ Hangul** đặt trong ngoặc đơn:
- **Sổ tiết kiệm / Số dư**: `Korean bank passbook clearly printed with Hangul text '주택청약종합저축' showing balance '150,000,000원'`
- **Thiệp cưới / Sự kiện**: `Luxury wedding invitation clearly displaying Korean Hangul calligraphy '[신랑 강도현 & 신부 최유나] 서울 신라호텔 다이너스티홀'`
- **Sao kê / Bằng chứng lừa đảo**: `Korean bank transaction document stamped with red seals (도장) showing Hangul text '사기 횡령 고소장 & 금융 거래 내역서'`
- **Màn hình điện thoại**: `Smartphone screen displaying Korean Hangul notification '[입금 완료] 150,000,000원 전액 환수'`
- **Biển hiệu / Băng rôn**: `Congratulatory flower stand with Korean Hangul ribbon '축 화혼 강도현 ♥ 최유나'`
- **Prompt suffix bắt buộc**: `All visible in-image text, signs, and documents must strictly be written in clear Korean Hangul typography.`

### 🇻🇳 2. Khi Video là Tiếng Việt (`vi`):
Mọi prompt mô tả vật chứng có chữ **bắt buộc chỉ định rõ cụm từ tiếng Việt có dấu đầy đủ**:
- **Hóa đơn mua sắm**: `Floating luxury receipt titled 'HÓA ĐƠN MUA HÀNG' showing 'TỔNG TIỀN: 180.000.000 VNĐ'`
- **Sao kê ngân hàng**: `Bank statement document showing red stamp and Vietnamese text 'SAO KÊ TÀI KHOẢN - RÚT TIỀN TIẾT KIỆM'`
- **Tin nhắn điện thoại**: `Smartphone screen displaying Vietnamese chat message 'Hẹn gặp anh tối nay nhé anh yêu'`
- **Thiệp cưới**: `Wedding invitation card reading 'THIỆP CƯỚI: MINH HUY & NGỌC MAI'`
- **Prompt suffix bắt buộc**: `All visible in-image text, receipts, and signs must strictly be written in clear Vietnamese typography with proper accents.`

### 🇺🇸 3. Khi Video là Tiếng Anh (`en`):
Mọi prompt mô tả vật chứng có chữ **bắt buộc chỉ định rõ cụm từ tiếng Anh chuẩn**:
- **Hóa đơn / Sao kê**: `Bank statement document showing 'BANK OF AMERICA - FRAUDULENT WITHDRAWAL $150,000'`
- **Thiệp cưới**: `Luxury hotel wedding invitation reading 'WEDDING INVITATION: DANIEL & EMILY'`
- **Prompt suffix bắt buộc**: `All visible text, receipts, phone messages, and signs must strictly be in clear English typography with Latin alphabet.`

> ⚠️ **CẤM TUYỆT ĐỐI**: Để lẫn lộn ngôn ngữ (ví dụ video tiếng Hàn mà hóa đơn lại in tiếng Anh "INVOICE" hoặc tiếng Việt; hoặc video tiếng Việt mà thiệp cưới lại in tiếng Anh). Mọi văn bản xuất hiện trong visual phải giúp người xem hòa mình tự nhiên 100% vào thế giới của câu chuyện!

---

## 🚫 5. Chống Lỗi Chữ Vô Nghĩa & Bong Bóng Thoại Ảo (Anti-Gibberish / No Speech-Bubble Protocol)

### 🔍 Nguyên nhân gốc rễ (Root Cause):
Khi prompt chứa các từ khóa thể loại như `"webtoon"`, `"manhwa"`, `"comic"`, mô hình sinh ảnh (Gemini/Nano Banana) có xu hướng **tự ý vẽ thêm speech bubble (bong bóng thoại)** vào cảnh — kể cả khi prompt **không hề yêu cầu** — vì nó liên tưởng thể loại này với truyện tranh có lời thoại. Do không có câu thoại thật nào được cấp cho nó để điền vào bong bóng đó, mô hình sẽ **bịa ra các ký tự Hangul/Việt/Anh trông giống chữ nhưng vô nghĩa (gibberish)**. Đây là lỗi hình ảnh phổ biến và nghiêm trọng nhất của pipeline này — đặc biệt nguy hiểm nếu rơi vào đúng các scene "bằng chứng" (evidence reveal) vốn là khoảnh khắc chốt hạ cú twist.

### ✅ Quy tắc bắt buộc để phòng tránh:
1. **Luôn nối Master Anti-Gibberish Suffix** (mục 2) vào cuối **MỌI** prompt Gemini, không có ngoại lệ — kể cả các scene tưởng chừng không có chữ.
2. **Không mô tả nhân vật đang "nói/thoại" một cách chung chung** (ví dụ tránh cụm `"talking to each other"`, `"having a conversation"`) vì cụm này gợi ý mô hình vẽ bong bóng thoại. Thay vào đó, mô tả **hành động và biểu cảm cụ thể** (`"listening with a warm smile"`, `"gesturing while explaining"`, `"looking away with a cold expression"`) — nội dung lời thoại đã có sẵn trong phụ đề (`voText`) nên KHÔNG cần lặp lại bằng bong bóng thoại trong ảnh.
3. **Nếu một scene bắt buộc phải có chữ hiển thị** (hóa đơn, tài liệu, biển hiệu, màn hình điện thoại, banner...), áp dụng đúng mục 4 ở trên: chỉ định chính xác **chuỗi ký tự trong ngoặc đơn** và đặt trong dấu ngoặc kép của prompt. Không được để mô hình tự bịa thêm chữ phụ nào khác ngoài chuỗi đã chỉ định.
4. **Ưu tiên composition không chữ** cho các scene cảm xúc/phản ứng (cận cảnh biểu cảm, phân cảnh lãng mạn, phân cảnh nghi ngờ) — chỉ đưa chữ vào khi đó chính là vật chứng cốt truyện.

### 🩹 Cách xử lý khi ảnh đã bị lỗi (Recovery):
Nếu sau khi nhận ảnh vẫn phát hiện bong bóng thoại/chữ gibberish (xem bước QC bắt buộc tại `references/retention-qc.md`):
- Tạo lại (regenerate) riêng ảnh đó với prompt đã bổ sung rõ suffix chống-gibberish + câu lệnh phụ: `"Absolutely no speech bubbles or dialogue balloons anywhere in the frame."`
- Nếu ảnh vẫn tái phạm sau 2 lần thử, đổi hướng composition sang cận cảnh không chữ (silent reaction shot) để né hẳn khu vực dễ sinh bong bóng thoại.
