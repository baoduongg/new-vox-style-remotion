# Stickman Universal Style Guide (2D Vector Cartoon)

Tài liệu quy chuẩn phong cách thị giác (Visual Style Guide) cho thể loại **Stickman 2D Animated Explainer & Documentary** đa chủ đề (Khoa học, Tài chính, Tâm lý, Công nghệ, Sinh tồn, Lịch sử).

---

## 🎨 1. DNA Thị Giác Người Que Phổ Quát (Universal Stickman DNA)

Phong cách này là **Hoạt hình 2D Vector Cartoon sạch sẽ, biểu cảm kịch tính và hài hước**:

1. **Nhân vật Stickman Đầu Tròn Biểu Cảm (Expressive Round-Head Stickman)**:
   - Đầu hình tròn xoe màu trắng (hoặc da nâu/vàng tùy bối cảnh) với **viền đen dày dặn, sắc nét (`stroke-width: 6-8px`)**.
   - Thân mình que đen đậm, tay chân linh hoạt, bàn tay bo tròn hoặc ngón trỏ chỉ điểm.
   - Đổ bóng: Bóng phẳng oval mờ (`rgba(0,0,0,0.18)`) dưới chân tiếp đất.

2. **Các Archetype Nhân Vật Đa Ngành Nghề (Universal Character Archetypes)**:
   - 👨‍⚕️ **Bác sĩ / Nhà Sinh Học**: Áo blouse trắng, ống nghe quanh cổ, cầm kim tiêm hoặc kính lúp.
   - 🔬 **Nhà Khoa Học / Kỹ Sư**: Đeo kính tròn tri thức, cầm ống nghiệm bốc khói hoặc thước đo đạc.
   - 💼 **Doanh Nhân / Nhà Đầu Tư**: Áo vest đen/xanh, cà vạt đỏ, tay xách vali tiền hoặc cầm biểu đồ nến xanh đỏ.
   - 💻 **Lập Trình Viên / Dân Công Nghệ**: Áo hoodie, tai nghe trùm đầu, ngồi gõ phím trước 3 màn hình code.
   - 🧠 **Người Que Đời Thường / Tâm Lý**: Mặc áo phông đơn sắc, biểu cảm phong phú (stress ôm đầu, lười biếng nằm giường, bừng sáng ý tưởng).
   - ⚔️ **Chiến Binh / Thợ Thủ Công Cổ Đại**: Trang phục đặc trưng từng thời kỳ (Viking, La Mã, Ai Cập, Đồ Đá).

3. **Biểu Cảm Khuôn Mặt Kịch Tính**:
   - *Bình thường / Giảng giải*: Mắt 2 chấm đen tròn, miệng cười mỉm hoặc gạch ngang.
   - *Sốc / Kinh ngạc*: Mắt mở to tròn xoe, miệng há hốc hình chữ `O` hoặc `D:`, giọt mồ hôi bắn ra xung quanh.
   - *Stress / Kiệt sức*: Quầng thâm lớn dưới mắt, người run rẩy ziczac, hai tay ôm đầu.
   - *Hưng phấn / Eureka*: Mắt lấp lánh ngôi sao, bóng đèn vàng pop-in trên đầu, nụ cười tự tin.

---

## 🌈 2. Bảng Màu 2D Vector Chuẩn Theo Từng Lĩnh Vực

| Lĩnh vực | Tông màu chủ đạo | Bối cảnh nền | Yếu tố nhấn mạnh (Accents) |
|---|---|---|---|
| **Y Học & Cơ Thể** | Đỏ máu `#E63946`, Xanh y tế `#457B9D` | Nền phòng lab sáng `#F1FAEE` hoặc mạch máu `#9D0208` | Virus xanh lá `#52B788`, Kháng thể vàng `#FFD166` |
| **Tài Chính & Tiền Tệ** | Xanh lá tăng giá `#10B981`, Đỏ giảm giá `#EF4444` | Nền sàn giao dịch tối `#0F172A` | Tiền vàng `#F59E0B`, Cột biểu đồ nến |
| **Tâm Lý & Trí Não** | Tím huyền bí `#8B5CF6`, Xanh tư duy `#3B82F6` | Nền bộ não phát sáng `#1E1B4B` | Dòng Dopamine phát sáng `#06B6D4` |
| **Công Nghệ & AI** | Xanh Cyberpunk `#06B6D4`, Neon tím `#A855F7` | Nền lưới vi mạch tối `#0B0F19` | Dòng dữ liệu nhị phân `#22C55E` |
| **Sinh Tồn & What-If** | Cam cảnh báo `#F97316`, Đỏ nguy hiểm `#DC2626` | Bối cảnh kịch tính (thang máy rơi, biển lửa) | Dấu X đỏ to tướng `#EF4444`, Khiên xanh |
| **Lịch Sử & Cổ Đại** | Vàng sa mạc `#F59E0B`, Xanh biển `#0284C7` | Bối cảnh thiên nhiên cổ xưa sống động | Vũ khí, công trình kỳ vĩ |

---

## 💻 3. Component `StickmanUniversalSVG.tsx` Đa Dụng Cho Remotion

```tsx
// src/components/StickmanUniversalSVG.tsx
import React from 'react';
import { useCurrentFrame } from 'remotion';

export type ProfessionArchetype = 'doctor' | 'finance' | 'tech' | 'casual' | 'ancient';
export type EmotionPose = 'explaining' | 'shocked' | 'stress' | 'eureka' | 'working';

interface StickmanProps {
  archetype?: ProfessionArchetype;
  pose?: EmotionPose;
  x?: number;
  y?: number;
  scale?: number;
  flipX?: boolean;
}

export const StickmanUniversalSVG: React.FC<StickmanProps> = ({
  archetype = 'casual',
  pose = 'explaining',
  x = 0,
  y = 0,
  scale = 1,
  flipX = false,
}) => {
  const frame = useCurrentFrame();
  const steppedFrame = Math.floor(frame / 2) * 2;

  // Hiệu ứng run rẩy khi sốc / stress
  const shakeX = (pose === 'shocked' || pose === 'stress') ? Math.sin(steppedFrame * 2) * 3.5 : 0;
  const shakeY = pose === 'stress' ? Math.cos(steppedFrame * 2.5) * 2 : 0;

  return (
    <svg
      width={240 * scale}
      height={340 * scale}
      viewBox="0 0 240 340"
      style={{
        position: 'absolute',
        left: x + shakeX,
        top: y + shakeY,
        transform: flipX ? 'scaleX(-1)' : 'none',
        overflow: 'visible',
      }}
    >
      {/* Bóng đổ tiếp đất */}
      <ellipse cx="120" cy="325" rx="55" ry="12" fill="rgba(0,0,0,0.18)" />

      {/* Trang phục theo archetype */}
      {archetype === 'doctor' && (
        <rect x="92" y="115" width="56" height="85" rx="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="5" />
      )}
      {archetype === 'finance' && (
        <>
          <rect x="94" y="115" width="52" height="80" rx="6" fill="#1E293B" stroke="#1A1A1A" strokeWidth="5" />
          <polygon points="120,118 116,165 120,175 124,165" fill="#EF4444" />
        </>
      )}
      {archetype === 'tech' && (
        <rect x="92" y="115" width="56" height="80" rx="8" fill="#475569" stroke="#1A1A1A" strokeWidth="5" />
      )}
      {archetype === 'casual' && (
        <rect x="95" y="120" width="50" height="75" rx="6" fill="#3B82F6" stroke="#1A1A1A" strokeWidth="5" />
      )}

      {/* Thân que chính */}
      <line x1="120" y1="100" x2="120" y2="210" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />

      {/* Chân */}
      <line x1="120" y1="210" x2="90" y2="315" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
      <line x1="120" y1="210" x2="150" y2="315" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />

      {/* Tay theo biểu cảm */}
      {pose === 'stress' ? (
        <>
          {/* Ôm đầu */}
          <path d="M 120 130 L 80 100 L 95 65" fill="none" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 120 130 L 160 100 L 145 65" fill="none" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : pose === 'eureka' ? (
        <>
          {/* Giơ tay chỉ lên trời */}
          <line x1="120" y1="130" x2="60" y2="80" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
          <line x1="120" y1="130" x2="180" y2="60" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Thuyết trình bình thường */}
          <line x1="120" y1="130" x2="70" y2="180" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
          <line x1="120" y1="130" x2="175" y2="140" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
        </>
      )}

      {/* Đầu tròn trắng viền đen đậm */}
      <circle cx="120" cy="55" r="38" stroke="#1A1A1A" strokeWidth="7" fill="#FFFFFF" />

      {/* Biểu cảm khuôn mặt */}
      {pose === 'shocked' || pose === 'stress' ? (
        <>
          <circle cx="108" cy="48" r="6" fill="#1A1A1A" />
          <circle cx="132" cy="48" r="6" fill="#1A1A1A" />
          <ellipse cx="120" cy="70" rx="9" ry="14" fill="#1A1A1A" />
          {/* Giọt mồ hôi */}
          <path d="M 148 40 Q 155 35 152 48 Q 148 52 144 48 Z" fill="#38BDF8" />
        </>
      ) : (
        <>
          <circle cx="110" cy="50" r="4.5" fill="#1A1A1A" />
          <circle cx="130" cy="50" r="4.5" fill="#1A1A1A" />
          <path d="M 112 70 Q 120 78 128 70" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Phụ kiện Eureka (Bóng đèn) */}
      {pose === 'eureka' && (
        <g transform="translate(110, -10)">
          <circle cx="10" cy="10" r="14" fill="#FACC15" stroke="#1A1A1A" strokeWidth="3" />
          <line x1="10" y1="-8" x2="10" y2="-16" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
          <line x1="-5" y1="-2" x2="-12" y2="-7" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
          <line x1="25" y1="-2" x2="32" y2="-7" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};
```
