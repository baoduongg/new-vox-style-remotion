# Stickman History & Survival Style Guide (2D Vector Animation)

Đây là tài liệu quy chuẩn phong cách thị giác (Visual Style Guide) chuẩn xác cho thể loại **Stickman History Animated Documentary** (tham chiếu trực tiếp từ các kênh hàng đầu như *Ancient World Uncovered*, *Before Civilization*, *OverSimplified*).

---

## 🎨 1. DNA Thị Giác Cốt Lõi (Core Visual DNA)

Phong cách này là **Hoạt hình 2D Vector Cartoon hiện đại** với nét vẽ sạch sẽ, màu sắc tươi sáng kết hợp cel-shading 2 mảng nhẹ nhàng:

1. **Nhân vật Stickman Đầu Tròn Biểu Cảm (Expressive Round-Head Stickmen)**:
   - Đầu hình tròn xoe màu trắng (hoặc da ngăm nâu đối với người tiền sử / có tóc râu Viking màu nâu/vàng) với **viền đen dày dặn, sắc nét (bold black vector outline)**.
   - Khuôn mặt tối giản nhưng cực kỳ giàu cảm xúc:
     - *Bình thường / Thuyết minh*: Mắt chấm bi đen, miệng một gạch ngang.
     - *Lo lắng / Hoảng sợ*: Mắt mở to tròn xoe, lông mày xếch vát, miệng há hốc uốn lượn `D:`, giọt mồ hôi chảy bên thái dương.
     - *Kiệt sức / Lạnh cóng*: Quầng thâm lớn dưới mắt, người run rẩy với các đường ziczac rung, miệng méo xệch.
     - *Quyết tâm / Giận dữ*: Lông mày vát nhọn hướng vào trong `\ /`, ánh mắt kiên định.
   - Thân mình: Chân tay que màu đen mảnh (`stroke-width: 4-6px`), bàn tay/bàn chân bo tròn đơn giản.
   - Trang phục thời kỳ: Áo tunic len Viking, da thú rách gấu thời tiền sử, áo choàng ấm, thắt lưng da, không có mũ sừng giả tạo.
   - Đổ bóng: Bóng đổ hình oval mờ tối (`rgba(0,0,0,0.2)`) dưới chân tiếp đất.

2. **Bối Cảnh 2D Hoạt Hình Sống Động (Rich 2D Vector Cartoon Environments)**:
   - **Ban ngày / Savan**: Bầu trời xanh nhạt thanh bình (`#98CBE8`), mặt trời tròn vàng óng tỏa tia nắng thẳng rực rỡ, đồng cỏ savan vàng ấm (`#E5B869`), cây keo tán rộng acacias, mây trắng bồng bềnh.
   - **Biển Bắc Cực / Bão tuyết**: Bầu trời đêm xanh xám giông bão (`#2A3644`), mây bão đen kịt, tuyết trắng rơi lất phất, biển dậy sóng màu xanh thẫm (`#1B3B4B`) với bọt sóng trắng, các tảng băng trôi nhấp nhô.
   - **Xưởng rèn / Chiến trường**: Lò nung rực lửa cam đỏ (`#E05A2B`), đe sắt xám đậm, tia lửa bắn tung tóe, vũ khí sáng bóng.

3. **Phương Tiện & Đạo Cụ 2D Chi Tiết (Detailed Cartoon Props & Vehicles)**:
   - Thuyền rồng Viking (Drakkar / Knorr) thân gỗ nâu clinker nhiều tầng ván, mũi thuyền chạm trổ đầu rồng dũng mãnh, cánh buồm vuông sọc đỏ-kem bắt mắt, khiên tròn gắn quanh mạn.
   - Vũ khí / Công cụ: Rìu đá, giáo nhọn, kiếm thép Ulfberht sáng bóng có dòng chữ `+VLFBERHT+`, bó củi, lửa trại bập bùng, nồi nung crucible bốc khói.

4. **Đồ Họa Giáo Dục & Typography (Educational Infographics & Headers)**:
   - Tiêu đề dạng chữ viết hoa hoạt hình (comic sans / clean sans-serif) đặt nổi bật ở góc trên, kèm bullet points sạch sẽ (ví dụ: `EARLY HUMANS: LIFE ON THE SAVANNA`, `- Hunter-Gatherer Society`).
   - Mũi tên chỉ dẫn, nhãn dán, thước đo nhiệt độ, sơ đồ cấu tạo được vẽ dạng vector 2D thân thiện, dễ hiểu.

---

## 🌈 2. Bảng Màu 2D Hoạt Hình Chuẩn

| Yếu tố | Mã Hex / Mô tả |
|---|---|
| **Bầu trời ban ngày** | `#98CBE8` (Xanh cyan dịu) đến `#C4E4F5` (Chân trời) |
| **Bầu trời bão tuyết** | `#263442` (Xám đen bão) đến `#1D2631` (Đêm cực hàn) |
| **Đồng cỏ Savan / Đất** | `#E5B869` (Cỏ vàng khô), `#C99B4B` (Đất đồi), `#8C6832` (Đường mòn) |
| **Đại dương / Sóng biển** | `#244B60` (Mặt biển), `#173444` (Vùng sâu), `#FFFFFF` (Bọt sóng) |
| **Mặt trời & Lửa rực** | `#FFD23F` (Mặt trời vàng), `#FF5E36` (Ngọn lửa đỏ cam), `#FFE680` (Tia nắng) |
| **Gỗ thuyền & Da thú** | `#8C6547` (Gỗ thân tàu), `#5C3E28` (Gỗ già), `#A67C52` (Da thuộc) |
| **Thép & Kim loại** | `#E8F1F5` (Lưỡi kiếm sáng), `#7B8C9E` (Sắt thô), `#4A5868` (Xỉ sắt) |
| **Nét viền đen (Outlines)**| `#1A1A1A` hoặc `#222222` (Viền đen đậm rõ nét) |

```tsx
// src/components/HistoryScene.tsx
import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface HistorySceneProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  sceneIndex: number;
}

export const HistoryScene: React.FC<HistorySceneProps> = ({
  title,
  subtitle,
  children,
  sceneIndex,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steppedFrame = Math.floor(frame / 3) * 3;

  // Hiệu ứng camera thở nhẹ (subtle camera float)
  const cameraZoom = interpolate(steppedFrame, [0, 150], [1, 1.04]);
  const cameraPanX = Math.sin((steppedFrame + sceneIndex * 20) / 40) * 4;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F3EDE2',
        backgroundImage: `
          radial-gradient(#2222220d 1px, transparent 1px),
          radial-gradient(circle at center, transparent 60%, rgba(50,30,10,0.12) 100%)
        `,
        backgroundSize: '24px 24px, 100% 100%',
        transform: `scale(${cameraZoom}) translate(${cameraPanX}px, 0px)`,
        filter: 'url(#hand-drawn-boil)',
        overflow: 'hidden',
        padding: 60,
        fontFamily: '"Cinzel", "Crimson Text", "Georgia", serif',
        color: '#222222',
      }}
    >
      {/* Tiêu đề góc màn hình phong cách bản thảo tài liệu */}
      {title && (
        <div style={{ position: 'absolute', top: 50, left: 70, zIndex: 10 }}>
          <h2 style={{ fontSize: 42, margin: 0, fontWeight: 700, letterSpacing: 1.5 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 24, margin: '6px 0 0 0', color: '#666', fontStyle: 'italic' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Nội dung chính của Scene */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
```
