# Metadata xuất bản (title / description / tags / thumbnail) - Optimized for Growth & SEO

Input: `scenes.json` đã duyệt (hook, plot-twist, timestamps) + topic gốc từ bước 1. Không bịa thông tin ngoài script — metadata chỉ diễn đạt lại nội dung đã có, không thêm số liệu/claim mới.

## 1. Title (Tối ưu CTR & Search)

- **Độ dài chuẩn:** 16:9: 50-65 ký tự (YouTube cắt ~70). 9:16 Shorts: ngắn gọn, sắc bén, 30-45 ký tự.
- **Công thức cấu trúc:** Kết hợp giữa **Từ khóa chính (cho SEO)** + **Hook phản trực giác/Câu hỏi từ script** (không viết lại sai lệch ý nghĩa).
- **Nguyên tắc vàng:** Tạo Curiosity gap chân thật, không misleading (payoff phải trả đúng kỳ vọng). Tránh ALL CAPS toàn bộ tiêu đề, không nhồi nhét từ khóa lặp. 
- **Yêu cầu đầu ra:** Đề xuất chính xác 3 phương án title theo 3 góc tiếp cận khác nhau để user lựa chọn:
  1. *Phương án Câu hỏi trực diện* (Kích thích tò mò ngay).
  2. *Phương án Tuyên bố phản trực giác* (Tạo sự bất ngờ/trái chiều).
  3. *Phương án Dẫn dắt bằng con số/Sự thật ngầm hiểu* (Nếu script có số liệu).

## 2. Description (Tối ưu thuật toán gợi ý & Kéo xem thêm)

Cấu trúc bắt buộc theo thứ tự:
1. **2 dòng đầu tiên (Micro-hook & SEO - Cực kỳ quan trọng trước nút "Xem thêm"):** Viết lại hook tích hợp khéo léo **1 từ khóa chính của video** + gợi mở plot-twist nhưng tuyệt đối **không spoil đáp án**. Mục tiêu bắt buộc là kích thích người xem bấm "Xem thêm".
2. **Đoạn ngắn 2-3 câu (Context):** Tóm tắt bối cảnh câu hỏi dựa trên phần Setup của script, mở rộng thêm các từ khóa phụ liên quan tự nhiên.
3. **Chapters/timestamps (Chỉ áp dụng cho 16:9, bỏ qua hoàn toàn nếu là Shorts):** Map trực tiếp từ `scenes.json`, gộp gọn gàng theo cấu trúc chuẩn:
00:00 Hook
00:05 Setup
00:20 Payoff 1: [Tên ngắn gọn]
...

4. **CTA text:** Nhắc nhở sub/like + đặt câu hỏi tương tác mở rộng (phải khớp hoàn toàn với nội dung CTA đã viết ở bước 2 của script, không tự chế CTA ngoài).
5. **3-5 Hashtag chuẩn SEO:** Viết liền không dấu (`#tag`), trong đó: 1 hashtag bắt buộc cho tên kênh/series, 1 hashtag từ khóa chính, các hashtag ngách liên quan.

## 3. Tags (YouTube tags field - Tối ưu Search Discovery)

Liệt kê từ 10-15 tag phân bổ theo chiến lược phễu cho kênh mới:
- **2-3 Tag chính xác:** Khớp hoàn toàn với từ khóa cốt lõi trong Title và chủ đề gốc.
- **5-7 Tag ngữ nghĩa rộng & Long-tail (Từ khóa dài):** Các câu hỏi hoặc từ khóa đồng nghĩa mà người xem thực tế hay gõ trên thanh tìm kiếm YouTube liên quan đến vấn đề của video.
- **2-3 Tag phân loại thể loại/kênh:** (Ví dụ: `khoa học đời sống`, `curiosity`, tên series, v.v.).
- *Lưu ý tuyệt đối:* Không nhồi nhét các từ khóa "bắt trend" không liên quan để trục lợi view (tránh bị YouTube phạt thuật toán spam metadata).

## 4. Thumbnail Concept (Tối ưu hóa tỷ lệ nhấp chuột - CTR)

Output thành 2 phần rõ ràng, agent chỉ đưa concept chi tiết để user duyệt, không tự render ảnh:

- **Text Overlay (Chữ trên ảnh):** Tối đa 3-4 từ, chữ in hoa (UPPERCASE). Tuyệt đối **không lặp lại y hệt title**, mà phải là góc nhìn bổ sung (Ví dụ: nếu title là câu hỏi thì overlay là từ khóa gây sốค / kết quả nghịch lý để tạo sự tò mò kép).
- **Visual Concept:** Mặc định sử dụng bố cục **Split-screen tương phản** (chi tiết tại Template 4a bên dưới) đối với các video có chứa yếu tố đối lập, số liệu sốc, bất công hoặc twist. Nếu không có cặp đối lập, chuyển về dạng 1 nhân vật/vật thể foreground cắt dán chủ đạo, biểu cảm rõ nét ngay cả khi hiển thị ở kích thước siêu nhỏ (~120px trên mobile), nền tuân thủ đúng bảng màu trong `paper-cut-style-guide.md`.

### 4a. Template Split-screen tương phản (Mặc định cho video có twist/số liệu sốc)

Quy chuẩn bố cục cố định, chỉ thay thế các trường trong ngoặc vuông `[...]`:

- **Chia đôi khung hình:** Ngăn cách bởi một đường xé giấy răng cưa chéo (torn paper edge), tuyệt đối không dùng đường kẻ thẳng cứng nhắc.
- **Nửa bên trái (Hiện trạng / Nhân vật gốc):** Nhân vật paper-cut chính chủ đạo, biểu cảm gương mặt rõ ràng, hướng mắt nhìn thẳng hoặc góc 3/4, đặt trong bối cảnh màu ấm áp (nâu đất, xanh lá, be kraft...) lấy từ palette chuẩn.
- **Nửa bên phải (Cái twist / Sự tương phản bất ngờ):** Chọn 1 trong 2 dạng theo nội dung script:
- *Dạng A (Nhãn dán/Chứng nhận vs Thực tế):* Nền mờ liên quan + 1 badge/icon tròn nổi bật ở giữa + hộp nhãn chữ phía trên.
- *Dạng B (Con số gây sốc):* Đặt một con số thống kê cực lớn chiếm >50% diện tích nửa phải, sử dụng màu accent nổi bật (như cam/đỏ) đặt trên nền vật thể paper-cut mờ phía sau.
- **Label Box:** Hộp chữ ngắn gọn (2-4 từ, UPPERCASE) nằm trong khung bo góc màu đen bán trong suốt, chữ trắng hoặc kem đậm, đặt ở góc trên của mỗi nửa (không được che mất mặt nhân vật).
- **Góc dưới bên phải:** Nút "SUBSCRIBE" màu đỏ nhỏ gọn kèm chữ trắng — đây là thành phần nhận diện thương hiệu cố định trên mọi thumbnail của kênh.
- **Chất liệu:** Giữ nguyên hiệu ứng cắt dán thủ công (drop shadow giữa các lớp layer, mép giấy có độ gồ ghề tự nhiên), không dùng hiệu ứng 3D bóng bẩy hoặc ảnh chụp thực tế (photorealistic) cho nửa paper-cut.

**Mẫu Gemini Image Prompt (Điền tự động dựa trên scene/script cụ thể):**
```text
A split-screen thumbnail in the Vox paper cutout animation style, divided diagonally by a jagged torn paper edge.
Left half: a detailed paper-cutout portrait of [MÔ TẢ NHÂN VẬT CHÍNH], clear expression, layered paper craft with soft drop shadows, background of [BỐI CẢNH GỐC] in warm earth-tone paper cutout colors [#8B6F47, #4A6741, #E8D9B5].
Right half: [MÔ TẢ TWIST — VD "a giant bold orange number '2%' overlaid on a blurred paper-cutout coffee cup" HOẶC "a blurred realistic photo background of a coffee factory with a circular fair-trade certification badge icon centered"], dark contrasting background.
Bold uppercase text label "[LABEL TRÁI]" in a dark rounded rectangle box, top-left.
Bold uppercase text label "[LABEL PHẢI]" in a dark rounded rectangle box, top-right.
Small red "SUBSCRIBE" button, bottom-right corner.
High contrast, clear readable composition at small thumbnail size (~120px tall), no small text, no photorealistic 3D render for the paper-cut half.
Aspect ratio: 16:9.
[LABEL TRÁI] và [LABEL PHẢI] lấy trực tiếp từ text overlay hoặc con số/claim cốt lõi trong script, tuyệt đối không bịa số liệu bên ngoài.

Lưu ý riêng cho video dạng 9:16 Shorts: Đổi tham số Aspect ratio: 16:9 thành 9:16, đồng thời chuyển đổi bố cục chia trái/phải thành chia trên/dưới với đường xé giấy ngang.

Ghi chú vận hành cho Shorts (9:16)
Lược bỏ hoàn toàn mục chapters trong description.

Bổ sung hashtag #Shorts vào ngay tiêu đề hoặc dòng đầu tiên của danh sách hashtag.

Thumbnail cho Shorts ít ảnh hưởng trực tiếp (vì thuật toán feed tự quét cắt frame), tuy nhiên vẫn nên giữ nguyên trường concept để nhân sự hoặc hệ thống tự động chọn frame cover chuẩn xác nhất.