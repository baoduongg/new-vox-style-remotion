# Hướng Dẫn Viết Kịch Bản Kể Chuyện 5 Hồi Thực Tế & Thời Sự (Narrative Script Writing Guide)

Kịch bản cho phong cách **Stickman Storytelling / Animated Narrative** hiện đại đòi hỏi nghệ thuật kể chuyện lôi cuốn, đánh trúng tâm lý người xem, kết hợp giữa **sự căng thẳng / giật mình (Suspense & Eye-opening Moments)**, **những mảng miếng hài hước châm biếm đời thường (Relatable Humor)** và **những cú ngoặt cốt truyện (Plot Twists)** mang tính thức tỉnh cao.

---

## 🌐 0. Quy Định Ngôn Ngữ Kịch Bản (Default: English)

- **Mặc định là Tiếng Anh (English)**:
  - File kịch bản xuất bản: `<topic-folder>/voText_en.md` và `<topic-folder>/voText_en.txt`.
  - Phân cảnh timing: `<topic-folder>/scenes.json` chứa `voText` tiếng Anh với lối kể chuyện tự nhiên, dí dỏm, thực tế, giàu kịch tính (tham chiếu văn phong *Brew*, *MagnatesMedia*, *Better Than Yesterday*, *Thoughty2*).
- **Khi dự án chọn Tiếng Việt (hoặc ngôn ngữ khác)**:
  - File kịch bản xuất bản: `<topic-folder>/voText_vi.md` và `<topic-folder>/voText_vi.txt`.
  - Phân cảnh timing: `<topic-folder>/scenes.json` chứa `voText` tiếng Việt có dấu chuẩn, câu từ sắc bén, gần gũi với đời sống hiện đại, chạm đúng nỗi đau (pain point) của người xem.
- **Đồng bộ hóa**: Ngôn ngữ của kịch bản là căn cứ để tạo Voiceover Audio và làm căn cứ đưa tiêu đề báo chí, màn hình ứng dụng, thông báo tin nhắn, biểu đồ vào Prompt tạo tranh AI.

---

## 🔍 0.5. Tích Hợp Tư Liệu Từ YouTube Video Research (Fact & Quote Injection)

Khi viết kịch bản dựa trên các case study thực tế (bẫy công nghệ, đại án kinh tế, bẫy tài chính, thử nghiệm tâm lý), kịch bản sẽ trở nên **uy tín và giật gân gấp 10 lần** khi được nạp các phát hiện từ skill `youtube-video-research`:

1. **Direct Quotes làm Hook & Lời Thoại**: 
   - Đưa câu nói ngông cuồng nhất của kẻ lừa đảo hoặc lời thú nhận của nhân chứng lên ngay câu mở đầu (0:00 - 0:15).
   - Ví dụ: *“Cô ta nhìn thẳng vào mắt chủ tịch ngân hàng lớn nhất nước Mỹ và nói: ‘Tôi có 4 triệu sinh viên đang sẵn sàng mở tài khoản’.”*
2. **Số liệu cụ thể từng cen-ti-mét (Exact Data Points)**:
   - Thay vì nói *“mất rất nhiều tiền”*, viết chính xác: *“bị trừ sạch 25.6 triệu USD qua 15 lệnh chuyển khoản trong 48 giờ”*.
   - Thay vì nói *“rất ít người dùng”*, viết: *“trong số 4 triệu email gửi đi, đúng 103 người nhấp chuột”*.
3. **Chi tiết hình ảnh bóc trần sự thật (Visual Cues)**:
   - Dùng các tình tiết thực tế từ phóng sự (căn phòng họp kín, email cảnh báo nội bộ, biểu đồ tài chính, giao diện deepfake) để đưa vào mô tả phân cảnh cho họa sĩ/AI vẽ.

---

## 🎭 1. Cấu Trúc Kịch Bản 5 Hồi Kịch Tính (The 5-Act Narrative Arc)

```
[Hồi 1: The Relatable Hook & Inciting Incident] (0:00 - 0:45)
  └─ Bắt đầu ngay bằng một nghịch lý đời thực gây sốc hoặc một hành động cực đoan khiến người xem giật mình.
[Hồi 2: The Underlying Mechanism & The Crazy Plan] (0:45 - 2:30)
  └─ Giải mã cơ chế tâm lý/thủ đoạn ngầm đằng sau và kế hoạch hành động hoặc nguồn gốc sự việc.
[Hồi 3: Rising Stakes & The Real Struggle] (2:30 - 6:30)
  ├─ Thử thách 1: Những chuyển biến ban đầu hoặc sự leo thang của vấn đề.
  ├─ Thử thách 2: Biến cố ập đến (cơn vật vã cai nghiện, sự nghi ngờ của điều tra viên, khoản nợ phình to).
  └─ Thử thách 3: Tình thế ngàn cân treo sợi tóc, sự thật suýt bị phơi bày hoặc điểm khủng hoảng tột cùng.
[Hồi 4: The Climax & The Big Twist / Wake-Up Call] (6:30 - 8:30)
  └─ Thời khắc phán xét, cú đánh cược cuối cùng và sự thật bất ngờ nhất được hé lộ.
[Hồi 5: The Aftermath & The Actionable Takeaway] (8:30 - 10:00)
  └─ Số phận của các nhân vật, bài học đắt giá và giải pháp thực tế để người xem áp dụng ngay vào đời sống.
```

---

## 🎬 2. Kịch Bản Mẫu 1: 30 Ngày Khóa Smartphone Vào Két Sắt Hẹn Giờ (Dopamine Reset)

```markdown
# Topic: I Locked My Smartphone In A Timed Safe For 30 Days: Here Is What Happened To My Brain
# Protagonist: Stickman - Một nhân viên văn phòng nghiện màn hình 7 tiếng/ngày
# Tone: Chân thực, hài hước, kịch tính tâm lý, thức tỉnh sâu sắc

[SCENE 1 - 0:00] [STICKMAN: Nằm trên giường lúc 2h sáng, khuôn mặt trắng bệch dưới ánh sáng xanh le lói từ màn hình điện thoại, đồng hồ báo 02:30 AM]
Voiceover: Đã bao giờ bạn tự nhủ: "Mình chỉ lướt TikTok 5 phút trước khi đi ngủ thôi", rồi bỗng nhận ra ngoài trời đã bắt đầu le lói ánh bình minh và đồng hồ đã chỉ 3 giờ sáng?

[SCENE 2 - 0:20] [STICKMAN: Mở màn hình Screen Time đỏ rực: "Daily Average: 7 Hours 42 Minutes", biểu cảm há hốc kinh hoàng mồ hôi đầm đìa]
Voiceover: Đó chính xác là cơn ác mộng của Alex. Một ngày nọ, khi mở báo cáo thời gian sử dụng màn hình, con số hiển thị khiến anh chết lặng: 7 tiếng 42 phút mỗi ngày. Tính ra, anh đang dành gần một nửa thời gian thức của cuộc đời chỉ để vuốt một tấm kính phẳng!

[SCENE 3 - 0:45] [STICKMAN: Cầm chiếc két sắt hẹn giờ kim loại trên bàn làm việc, ném chiếc iPhone vào trong và vặn đồng hồ "720 HOURS"]
Voiceover: Quá căm ghét cảm giác bị điều khiển, Alex đưa ra một quyết định điên rồ nhất đời mình: Anh mua một chiếc két sắt điện tử hẹn giờ trên Amazon, ném chiếc smartphone vào trong, khóa mã 30 ngày liên tục và chuẩn bị cho một cuộc chiến sinh tử với chính bộ não của mình.

[SCENE 4 - 1:20] [STICKMAN: Ngồi ở bàn làm việc, hai tay giật giật, thọc tay vào túi quần trống không với dấu chấm hỏi to đùng]
Voiceover: Nhưng chỉ sau 4 giờ đầu tiên, điều kinh dị bắt đầu xuất hiện: hiện tượng "Rung chuông ảo giác". Cứ mỗi 5 phút, đùi của Alex lại giật lên vì cảm giác điện thoại đang rung, dù túi quần anh hoàn toàn trống rỗng!

[SCENE 5 - 2:05] [STICKMAN: Ôm đầu quằn quại trên sàn nhà, xung quanh là những con quái vật Dopamine màu tím bay lượn]
Voiceover: Các nhà thần kinh học gọi đây là "Cơn thiếu hụt Dopamine cấp tính". Não bộ chúng ta đã quen với việc nhận được những cú hích hưng phấn miễn phí cứ mỗi 10 giây. Khi cắt đứt nguồn kích thích đó, bộ não sẽ phản ứng y hệt như một kẻ nghiện đang lên cơn đói thuốc!

[SCENE 6 - 3:00] [STICKMAN: Đứng nhìn bức tường trắng vô hồn trong phòng khách, biểu cảm ngơ ngác tột độ]
Voiceover: Ngày thứ 5: Cơn ác mộng của sự tĩnh lặng. Lần đầu tiên sau 10 năm, Alex phải đối mặt với một thứ mà con người hiện đại đã hoàn toàn quên lãng: "Sự buồn chán thuần túy". Không có màn hình để trốn tránh, mọi nỗi lo âu, công việc chưa hoàn thành và sự trống rỗng bắt đầu ùa về bủa vây anh.

[SCENE 7 - 4:15] [STICKMAN: Cầm cuốn sách giấy cũ kỹ, chăm chú đọc dưới ánh đèn vàng ấm áp]
Voiceover: Nhưng đến ngày thứ 14, một phép màu sinh học bắt đầu diễn ra. Các thụ thể Dopamine trong não bắt đầu tự tái tạo. Những trang sách giấy dày cộp mà trước đây Alex đọc 2 trang là buồn ngủ, giờ đây bỗng trở nên lôi cuốn kỳ lạ. Anh bắt đầu tập trung làm việc 3 tiếng liền không hề bị phân tâm.

[SCENE 8 - 5:30] [STICKMAN: Đi dạo công viên, hít thở sâu, ngắm nhìn cây cối xanh tươi với nụ cười rạng rỡ]
Voiceover: Giấc ngủ sâu quay trở lại. Vị giác trở nên đậm đà hơn. Và lần đầu tiên sau nhiều năm, anh ngẩng đầu lên trên phố và nhận ra: 99% những người xung quanh anh đang cắm mặt vào điện thoại như những con robot vô hồn.

[SCENE 9 - 7:00] [STICKMAN: Đứng trước chiếc két sắt khi tiếng "TÍCH TẮC... CẠCH!" vang lên đúng 720 giờ, mở cánh cửa sắt ra]
Voiceover: Đúng 0h ngày thứ 30, chiếc két sắt phát ra tiếng "Cạch!". Chiếc điện thoại sáng đèn trở lại với hơn 2,400 thông báo chưa đọc. Nhưng khi cầm chiếc máy lên tay... Alex cảm thấy một sự ngần ngại kỳ lạ.

[SCENE 10 - 8:30] [STICKMAN: Xóa toàn bộ app mạng xã hội, chỉ giữ lại gọi điện và bản đồ, nở nụ cười tự do]
Voiceover: Sau 30 ngày thử nghiệm, bài học lớn nhất không phải là bạn phải vứt bỏ công nghệ, mà là: Nếu bạn không chủ động làm chủ thiết bị trong túi mình, các kỹ sư thuật toán tại Thung lũng Silicon sẽ biến bạn thành món hàng để khai thác sự chú ý của bạn mỗi ngày.
```

---

## 💻 3. Kịch Bản Mẫu 2: Cú Lừa 4 Triệu Sinh Viên Ảo Bán Cho JP Morgan $175 Triệu USD (Charlie Javice Scandal)

```markdown
# Topic: The $175M Startup Con: How A 28-Year-Old Faked 4 Million Users To Fool JP Morgan
# Protagonist: Charlie Javice - Nhà sáng lập startup Frank
# Tone: Kịch tính thương trường, giật gân, bóc trần sự thật, châm biếm

[SCENE 1 - 0:00] [STICKMAN: Charlie Javice đeo kính thời thượng, đứng trên sân khấu Forbes 30 Under 30 nhận tràng pháo tay]
Voiceover: Năm 2021, cô gái 28 tuổi Charlie Javice bước lên bục vinh quang của tạp chí Forbes. Cô tuyên bố startup của mình — nền tảng hỗ trợ tài chính sinh viên Frank — đang sở hữu hơn 4.25 triệu người dùng và sẵn sàng làm rung chuyển ngành ngân hàng nước Mỹ!

[SCENE 2 - 0:25] [STICKMAN: Chủ tịch ngân hàng JP Morgan Jamie Dimon ký séc khổng lồ "$175,000,000" trao cho Charlie]
Voiceover: Bị thuyết phục bởi con số 4 triệu khách hàng trẻ tuổi béo bở, ngân hàng lớn nhất nước Mỹ JP Morgan Chase đã nhanh chóng chi đứt 175 triệu USD tiền mặt để thâu tóm startup Frank mà không hề do dự.

[SCENE 3 - 1:00] [STICKMAN: Charlie ngồi trong phòng họp bí mật với một giáo sư khoa học dữ liệu, màn hình hiện danh sách mã hóa]
Voiceover: Nhưng đằng sau ánh hào quang đó là một sự thật rợn người: Startup Frank thực chất chỉ có chưa đầy 300,000 người dùng thật! Để bán được giá 175 triệu USD, Charlie đã bí mật thuê một giáo sư khoa học dữ liệu với giá 18,000 USD để lập trình tạo ra... 4 triệu danh tính sinh viên giả mạo!

[SCENE 4 - 2:15] [STICKMAN: Giáo sư dữ liệu chạy thuật toán "Generate Fake Names, Fake Addresses, Fake Birthdays"]
Voiceover: Vị giáo sư đã dùng thuật toán tự động sinh ra 4.25 triệu cái tên, địa chỉ nhà, ngày sinh và số điện thoại giả y như thật, sau đó đóng gói thành một file dữ liệu khổng lồ giao cho ban thẩm định của JP Morgan.

[SCENE 5 - 3:45] [STICKMAN: Đội ngũ marketing JP Morgan bấm nút "SEND MARKETING EMAIL" tới 4 triệu sinh viên]
Voiceover: Vở kịch chỉ thực sự vỡ lở khi bộ phận Marketing của JP Morgan quyết định gửi email chào mừng đến 4 triệu sinh viên trong danh sách. Kết quả: Hơn 70% email bị báo lỗi không tồn tại, và chỉ có đúng 103 người nhấp chuột vào liên kết!

[SCENE 6 - 5:20] [STICKMAN: Thám tử FBI và luật sư ập vào văn phòng JP Morgan niêm phong máy tính]
Voiceover: Ban lãnh đạo JP Morgan lập tức nhận ra mình vừa mua phải một "đống rác kỹ thuật số" trị giá 175 triệu đô. Các cuộc điều tra nội bộ mở ra, FBI vào cuộc và phát hiện toàn bộ chuỗi email Charlie yêu cầu nhân viên xóa sạch dấu vết.

[SCENE 7 - 7:15] [STICKMAN: Charlie Javice đứng trước vành móng ngựa tòa án liên bang New York]
Voiceover: Charlie Javice bị truy tố 4 tội danh gian lận tài chính với mức án lên tới 30 năm tù. Cú lừa Frank trở thành biểu tượng cay đắng cho thời kỳ "Fake It Until You Make It" (Cứ giả vờ cho đến khi thành công) mù quáng của giới startup công nghệ.
```

---

## 💸 4. Kịch Bản Mẫu 3: Lương 50 Triệu Vẫn Rỗng Túi - Bẫy Nâng Cấp Lối Sống (Lifestyle Inflation)

```markdown
# Topic: Earning $2,000/Month But Still Broke: The Brutal Trap Of Lifestyle Inflation
# Protagonist: Stickman Nam - Dân văn phòng 5 năm đi làm
# Tone: Chạm trúng tim đen, thực tế tài chính, phân tích tâm lý sâu sắc

[SCENE 1 - 0:00] [STICKMAN: Cầm điện thoại xem thông báo lương: "+50,000,000 VND", 3 ngày sau số dư còn 840,000 VND, mặt đờ đẫn]
Voiceover: Ngày 5 đầu tháng: Tin nhắn điện thoại báo ting ting cộng 50 triệu đồng tiền lương. Nhưng đến ngày mùng 10, mở ứng dụng ngân hàng ra, số dư chỉ còn đúng... 840 nghìn đồng! Câu hỏi đặt ra là: 49 triệu kia đã bốc hơi đi đâu?

[SCENE 2 - 0:35] [STICKMAN: Hồi tưởng 5 năm trước: Sinh viên mới ra trường lương 8 triệu, ăn cơm bụi 25k, ở phòng trọ nhỏ mà vẫn để dành được 1 triệu]
Voiceover: 5 năm trước, khi mới đi làm với mức lương 8 triệu, Nam vẫn sống vui vẻ, đi xe số, uống trà đá và mỗi tháng vẫn tiết kiệm được 1 triệu gửi về cho mẹ. Khi đó, anh từng mơ ước: "Chỉ cần lương lên 20 triệu, mình sẽ trở nên giàu có."

[SCENE 3 - 1:40] [STICKMAN: Đi vào quán cà phê sang chảnh 120k/ly, tay cầm chìa khóa xe tay ga xịn, chuyển sang căn chung cư cao cấp]
Voiceover: Nhưng khi thu nhập tăng lên, một con quái vật vô hình bắt đầu thức giấc: "Bẫy nâng cấp lối sống" (Lifestyle Inflation). Ly cà phê 25k vỉa hè được thay bằng ly Caramel Macchiato 120k. Chiếc xe số được đổi thành xe tay ga trả góp. Căn phòng trọ 2 triệu được nâng cấp lên chung cư cao cấp 12 triệu/tháng.

[SCENE 4 - 3:10] [STICKMAN: Chạy mệt nhoài trên chiếc máy chạy bộ khổng lồ "Hedonic Treadmill", tiền rơi rớt xung quanh]
Voiceover: Các nhà kinh tế học hành vi gọi đây là "Máy chạy bộ khoái lạc" (Hedonic Treadmill). Não bộ con người thích nghi với sự tiện nghi cực kỳ nhanh chóng. Sau đúng 2 tuần ở nhà đẹp hay đi xe sang, cảm giác sung sướng biến mất hoàn toàn, và mức chi tiêu xa xỉ đó bỗng trở thành... "tiêu chuẩn tối thiểu bắt buộc"!

[SCENE 5 - 5:00] [STICKMAN: Bị sếp mắng nhưng không dám cãi vì gánh nặng nợ nần đè trên vai]
Voiceover: Nguy hiểm nhất là: Khi chi phí cố định tăng lên bằng đúng mức thu nhập, bạn đã tự tay trao quyền tự do của mình cho người khác. Bạn không dám nghỉ việc, không dám nói lên chính kiến, và phải cắn răng chịu đựng môi trường độc hại chỉ vì không thể sống thiếu kỳ lương tiếp theo.

[SCENE 6 - 7:30] [STICKMAN: Cầm sổ tay tài chính, cắt giảm 3 khoản chi tiêu vô lý, thiết lập quy tắc "Trả Cho Mình Trước"]
Voiceover: Lối thoát duy nhất không phải là cố kiếm thêm thật nhiều tiền, mà là phá vỡ chiếc máy chạy bộ khoái lạc: Luôn giữ mức sống thấp hơn thu nhập ít nhất 1 bậc và tự động trích 30% tiền lương vào quỹ đầu tư ngay vào giây phút nhận lương.
```

---

## ⏱️ 5. Quy Chuẩn Tốc Độ Thoại & Visual Callouts

- **Tốc độ đọc**: ~2.3 - 2.6 từ/giây (khoảng 140 - 155 từ/phút). Có Dramatic Pauses 0.6s trước các câu chốt bài học hoặc số liệu giật mình.
- **Visual Callout Tags**:
  - `[STICKMAN: <hành động, biểu cảm khuôn mặt>]`
  - `[PHONE / SCREEN: <màn hình app, thông báo số dư, tin nhắn>]`
  - `[CHART / GRAPH: <biểu đồ chi phí, sóng Dopamine, cổ phiếu>]`
  - `[DOC: <hợp đồng, bài báo, sao kê ngân hàng>]`
