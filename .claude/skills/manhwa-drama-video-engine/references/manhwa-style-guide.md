# Manhwa Drama Style Guide (Korean Webtoon 2D Art Style)

Đây là tài liệu quy chuẩn phong cách thị giác (Visual Style Guide) chuẩn xác cho thể loại **Kể Chuyện / Drama Tâm Sự Bằng Hình Ảnh Phong Cách Manhwa / Webtoon Hàn Quốc** (tham chiếu trực tiếp từ các bộ Webtoon Drama nổi tiếng như *Marry My Husband*, *True Beauty*, *Lookism* và các kênh YouTube Storytelling Webtoon).

---

## 🎨 1. DNA Thị Giác Cốt Lõi (Core Visual DNA)

Phong cách này là **Modern Korean Webtoon 2D Digital Art** kết hợp nghệ thuật điện ảnh K-Drama:

1. **Nét vẽ & Tạo hình nhân vật (Character Aesthetics & Line Art)**:
   - Nét vẽ viền đen kỹ thuật số sắc nét, tinh tế (`clean sharp black digital linework`).
   - Tỷ lệ cơ thể chuẩn phong cách Anime/Manhwa bán tả thực (`semi-realistic modern anime anatomy`).
   - **Nam chính (Male Lead)**: Gương mặt điển trai góc cạnh, lông mày kiếm, kiểu tóc rẽ ngôi nam tính K-Pop/K-Drama (`two-block cut / comma hair`), dáng người cao ráo mặc áo măng-tô dạ (`wool trench coat`), áo len cổ lọ (`black turtleneck`) hoặc vest công sở.
   - **Nữ chính (Female Lead)**: Gương mặt khả ái, mắt to tròn long lanh, tóc uốn sóng nhẹ bồng bềnh (`soft wavy brown hair`), trang phục nữ tính trang nhã (áo len dệt kim, chân váy dài, túi xách đeo vai).
   - **Biểu cảm đa tầng (Micro-Expressions)**:
     - *Hạnh phúc*: Mắt cười cong hình trăng khuyết, gò má ửng hồng phớt, nụ cười dịu dàng.
     - *Nghi ngờ / Bất an*: Đồng tử co rút nhẹ, chân mày chau lại, mắt nhìn nghiêng sang góc khác.
     - *Bàng hoàng / Đau đớn*: Nước mắt tuôn dài, tay bịt miệng run rẩy, mắt mở to kinh ngạc.
     - *Lật mặt / Độc ác*: Khóe môi nhếch lên cười khẩy, mắt sắc lẹm vô hồn, bóng đen phủ nửa trên khuôn mặt.

2. **Ánh Sáng & Màu Sắc Chuyển Biến Tâm Lý (Psychological Lighting & Color Shifts)**:
   - **Giai đoạn Lãng Mạn (Romantic Phase)**: Bảng màu ấm áp pastel, ánh hoàng hôn vàng óng (`golden hour warm lighting`), đèn lồng vàng lung linh ven sông Hàn, sắc hoa hồng viền khung cảnh.
   - **Giai đoạn Đô Thị & Ngột Ngạt (Urban Tension Phase)**: Bối cảnh tàu điện ngầm giờ cao điểm (`Gangnam Station`), ánh đèn huỳnh quang trắng lạnh (`cold fluorescent lighting`), đám đông xám mờ phía sau làm nổi bật sự xa cách của 2 nhân vật.
   - **Giai đoạn Vỡ Mộng / Tang Chứng (Discovery Phase)**: Ánh sáng đêm ngoài cửa sổ nhà hàng cao tầng (`night city skyline bokeh`), ánh đèn bàn ấm tương phản với vệt bóng đen phủ lên mặt kẻ phản bội.
   - **Giai đoạn Lật Mặt (Split Contrast / Betrayal Phase)**: Hiệu ứng chia đôi khung hình (`Split-screen dual face`), một bên ấm áp - một bên màu xanh xám lục lạnh lẽo (`cold desaturated teal`), kèm theo mảnh vỡ thủy tinh (`shattering glass shards`) tượng trưng cho niềm tin sụp đổ.

3. **Vật Chứng & Đồ Họa Nổi Bật (Floating Evidence Props)**:
   - Hình ảnh tang chứng phóng to trôi nổi trong không gian: Hóa đơn túi hiệu xa xỉ (`LUXURY BRAND RECEIPT`), nhiều thẻ tín dụng xếp chồng (`CREDIT CARD`), điện thoại với tin nhắn tán tỉnh bí mật.

---

## 🌈 2. Bảng Màu Manhwa Chuẩn

| Tone Cảm Xúc | Màu Chủ Đạo | Mã Hex Tham Khảo | Ý Nghĩa / Bối Cảnh |
|---|---|---|---|
| **Lãng mạn & Ấm áp** | Vàng hoàng hôn, Hồng đào, Kem | `#FDEBD0`, `#F5B7B1`, `#E59866` | Hẹn hò bờ sông, quán ăn ven đường, Shinsegae |
| **Đô thị hiện đại** | Xanh xám tro, Be thanh lịch, Đen tuyền | `#34495E`, `#D5DBDB`, `#1C2833` | Tàu điện ngầm Gangnam, phố xá đi bộ, công sở |
| **Bất an & Nghi ngờ** | Xanh tím than, Xám khói | `#2C3E50`, `#566573`, `#17202A` | Nhìn trộm điện thoại, góc khuất hành lang |
| **Lật mặt & Bi kịch** | Xanh ngọc lục lạnh, Đen bóng đổ | `#16A085`, `#0E6655`, `#111111` | Nửa mặt phản diện, nụ cười giả tạo, hóa đơn bóc trần |
| **Subtitle Nổi Bật** | Trắng tinh khôi viền đen dày | `#FFFFFF` (Stroke: `#000000`) | Phụ đề lời tự sự dưới đáy khung hình |

---

## 📐 3. Bố Cục Khung Hình Manhwa & Chuyển Động Điện Ảnh

```tsx
// src/components/ManhwaScene.tsx
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface ManhwaSceneProps {
  imageSrc: string;
  voText?: string;
  cameraMotion?: 'zoom-in' | 'pan-left' | 'pan-right' | 'dramatic-push' | 'split-reveal';
  mood?: 'romantic' | 'tense' | 'betrayal' | 'neutral';
}

export const ManhwaScene: React.FC<ManhwaSceneProps> = ({
  imageSrc,
  voText,
  cameraMotion = 'zoom-in',
  mood = 'neutral',
}) => {
  const frame = useCurrentFrame();

  // Chuyển động máy quay mượt mà (Ken Burns Cinema)
  const scale = cameraMotion === 'zoom-in' 
    ? interpolate(frame, [0, 150], [1, 1.08], { extrapolateRight: 'clamp' })
    : cameraMotion === 'dramatic-push'
    ? interpolate(frame, [0, 60], [1, 1.15], { extrapolateRight: 'clamp' })
    : 1.03;

  const panX = cameraMotion === 'pan-left'
    ? interpolate(frame, [0, 150], [0, -30], { extrapolateRight: 'clamp' })
    : cameraMotion === 'pan-right'
    ? interpolate(frame, [0, 150], [0, 30], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      {/* Lớp hình ảnh chính với chuyển động camera */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${panX}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src={imageSrc}
          alt="Manhwa Scene"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>

      {/* Lớp phủ hiệu ứng cảm xúc (Mood Vignette) */}
      {mood === 'betrayal' && (
        <AbsoluteFill
          style={{
            background: 'radial-gradient(circle at 80% 50%, rgba(14, 102, 85, 0.25) 0%, rgba(0,0,0,0.6) 100%)',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Phụ đề Manhwa to rõ, viền đen dày */}
      {voText && (
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 0,
            right: 0,
            textAlign: 'center',
            padding: '0 40px',
            zIndex: 100,
          }}
        >
          <span
            style={{
              fontFamily: '"Be Vietnam Pro", "Montserrat", "Arial", sans-serif',
              fontWeight: 800,
              fontSize: 38,
              color: '#FFFFFF',
              textShadow: `
                -2px -2px 0 #000,
                 2px -2px 0 #000,
                -2px  2px 0 #000,
                 2px  2px 0 #000,
                 0px  4px 10px rgba(0,0,0,0.9)
              `,
              lineHeight: 1.4,
              letterSpacing: 0.5,
            }}
          >
            {voText}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
```
