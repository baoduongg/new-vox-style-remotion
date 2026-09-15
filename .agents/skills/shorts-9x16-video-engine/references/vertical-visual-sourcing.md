# Hướng Dẫn Sourcing Ảnh Dọc Gốc Cho Shorts 9:16

Ảnh cho Shorts phải được **sinh dọc từ gốc (native 9:16)**, không phải ảnh 16:9 rồi crop. Đây là nguồn lỗi visual phổ biến nhất khi tái dùng prompt từ style engine 16:9: quên đổi hậu tố tỉ lệ khung hình ở cuối prompt khiến AI vẽ ngang, sau đó Remotion `object-fit: cover` cắt mất đầu hoặc tay nhân vật vì khung dọc hẹp hơn nhiều so với khung ngang.

---

## 1. Công Thức Prompt Dọc Chuẩn

Lấy nguyên phần **DNA phong cách nhân vật/bối cảnh** từ style guide tương ứng (`stickman-storytelling-video-engine/references/stickman-style-guide.md`, `manhwa-drama-video-engine/references/manhwa-style-guide.md`, hoặc style khác user chỉ định) — chỉ thay **2 phần**: bố cục khung hình và hậu tố tỉ lệ.

```text
[Prefix phong cách — giữ nguyên từ style engine gốc]. [Nhân vật/hành động/biểu cảm — giữ nguyên].
[Bối cảnh — giữ nguyên]. Vertical portrait framing, character filling the frame naturally (không cần
chừa negative space cho text overlay — video không dùng headline/phụ đề). [Hậu tố dọc — THAY THẾ hậu tố
16:9 gốc]: 9:16 vertical portrait composition, full-bleed vertical framing, no letterboxing, no black bars.
```

### ⚠️ Checklist bắt buộc trước khi gửi prompt đi tạo ảnh:
- [ ] Prompt **không** còn chứa cụm `16:9 widescreen` sót lại từ style engine gốc (lỗi hay gặp nhất khi copy nguyên khối prompt cũ).
- [ ] Có cụm `9:16 vertical portrait composition` hoặc tương đương ở cuối prompt.
- [ ] Ràng buộc ngôn ngữ text-in-image vẫn giữ nguyên theo ngôn ngữ dự án (xem style engine gốc).

---

## 2. Ví Dụ Prompt Dọc (chuyển thể từ ví dụ 16:9 trong stickman-storytelling-video-engine)

### A. Cold-Open Hook — Charlie ký check $175M (scene đầu tiên, phải "tự nói được" vì không có headline)
```text
Clean 2D vector cartoon animated storytelling illustration, in the style of MagnatesMedia and Brew.
A stylish female stickman startup founder wearing trendy glasses and a black blazer, confident sly
smirk, holding up a giant golden check reading '$175,000,000' toward the camera, positioned in the
lower two-thirds of frame. Blurred luxurious glass office skyscraper background with warm gold accent
lighting. Crisp clean vector outlines, cinematic lighting, vibrant flat colors with soft cel-shading.
Vertical portrait framing, dynamic full-bleed composition. All visible text strictly in clear English
typography. 9:16 vertical portrait composition, full-bleed vertical framing, no letterboxing, no black bars.
```

### B. Escalation — Màn hình bounce email đỏ rực (scene giữa, không cần negative space)
```text
Clean 2D vector cartoon animated storytelling illustration, in the style of Brew. Extreme close-up of
a glowing smartphone/monitor screen filling most of the vertical frame, displaying a bold red alert
'70% BOUNCED. 103 CLICKS.' with a small stickman silhouette reacting in shock at the bottom edge of
frame. Bold black vector outlines, high-contrast red and white color scheme, dynamic comic shock lines
radiating from the screen. All visible text strictly in clear English typography. 9:16 vertical
portrait composition, full-bleed vertical framing, no letterboxing, no black bars.
```

---

## 3. Khi Bắt Buộc Tái Sử Dụng Ảnh 16:9 Có Sẵn (Fallback — chỉ dùng khi không thể sinh ảnh dọc mới)

Ưu tiên tuyệt đối vẫn là sinh ảnh dọc gốc (Mục 1). Chỉ dùng kỹ thuật dưới đây khi user đã có sẵn bộ ảnh 16:9 từ một video dài và muốn dựng nhanh bản Shorts từ đúng bộ ảnh đó:

- **KHÔNG** dùng `object-fit: cover` cắt trực tiếp ảnh 16:9 vào khung `<Img>` 9:16 — công thức crop mặc định sẽ cắt theo chiều ngang trước, dễ mất đầu/tay nhân vật nếu nhân vật không nằm chính giữa khung ngang gốc.
- **Dùng kỹ thuật crop-fill nền mờ phóng to (blur-extend background)**: layer dưới là chính ảnh 16:9 đó phóng to + `blur(40px)` + tối màu (`brightness(0.5)`) phủ kín toàn bộ 1080×1920; layer trên là ảnh gốc giữ nguyên tỉ lệ, `object-fit: contain`, căn giữa — cho cảm giác nền "kéo dài" tự nhiên thay vì mất nội dung.

```tsx
// Fallback layer — chỉ dùng khi chưa có ảnh dọc gốc cho scene này
<AbsoluteFill>
  <Img
    src={src}
    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(40px) brightness(0.5)', transform: 'scale(1.2)' }}
  />
  <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Img src={src} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
  </AbsoluteFill>
</AbsoluteFill>
```

- Đánh dấu rõ trong `scenes.json` scene nào đang dùng fallback (`"visualSource": "16x9-blur-fill"`) để ưu tiên thay bằng ảnh dọc gốc nếu có thời gian trước khi render bản final — chất lượng crop-fill luôn thấp hơn ảnh sinh dọc gốc.
