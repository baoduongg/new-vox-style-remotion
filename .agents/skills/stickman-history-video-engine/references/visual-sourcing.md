# Hướng Dẫn Tìm Kiếm & Tạo Visual (2D Vector Cartoon Animated Style)

Tài liệu hướng dẫn tạo hình ảnh cho video **Stickman History & Ancient Survival** chuẩn phong cách hoạt hình vector 2D của các kênh YouTube giáo dục/lịch sử hàng đầu (*Ancient World Uncovered*, *Before Civilization*, *OverSimplified*).

---

## 🎯 1. Công Thức Prompt Gemini Chuẩn (The 2D Vector Cartoon Formula)

Để ảnh tạo ra đồng nhất với các hình ảnh mẫu (nhân vật người que đầu tròn biểu cảm, viền đen sắc nét, bối cảnh hoạt hình 2D sống động):

### 📋 Cấu Trúc 4 Thành Phần:
```text
Clean 2D vector cartoon animated documentary style illustration, in the style of Ancient World Uncovered and Before Civilization. [Subject & Expressive White Round-Headed Stickman Characters with Bold Black Outlines]. [Rich 2D Cartoon Background & Lighting]. [Historical Props / Tools / Vehicles / Technical Insets]. Smooth clean line art, vibrant flat colors with soft cel-shading, playful historical educational aesthetic. All visible text and labels must be strictly in clear English typography with Latin alphabet only, 16:9 widescreen.
```

### ⚠️ Quy Tắc Bắt Buộc:
1. **Phong cách**: BẮT ĐẦU bằng `Clean 2D vector cartoon animated documentary style illustration, in the style of Ancient World Uncovered and Before Civilization.`
2. **Nhân vật**: `Expressive white round-headed stickman with bold black vector outlines and thin stick limbs, wearing [Viking/Period Clothing]`.
3. **Cấm dùng**: KHÔNG dùng các từ như `parchment paper, charcoal sketch, vintage manuscript, textured grain, tea-stained, Renaissance etching`. Thay vào đó, dùng `Clean colorful 2D vector cartoon background, flat colors, soft cel-shading`.
4. **Văn bản & Nhãn**: 100% tiếng Anh Latin, font hoạt hình rõ ràng. Luôn kết thúc bằng:
   `All visible text and labels must be strictly in clear English typography with Latin alphabet only, 16:9 widescreen.`

---

## 🎨 2. Thư Viện Prompt Mẫu (2D Vector Cartoon Examples)

### A. Thuyền Viking Vượt Bão Tuyết Bắc Cực (Freezing Blizzard Longship)
```text
Clean 2D vector cartoon animated documentary style illustration, in the style of Ancient World Uncovered. A detailed wooden Viking longship with a carved dragon prow battling stormy dark ocean waves. Inside the boat, five expressive white round-headed stickman Viking sailors are shivering in the freezing snowstorm, wrapped in thick wool blankets and cloaks, with dark tired bags under their eyes, trembling squiggly lines around them. Dark stormy navy-blue sky with falling white snowflakes and distant floating icebergs. Crisp bold black vector outlines, vibrant flat colors, smooth cel-shading. All visible text strictly in clear English typography, 16:9 widescreen.
```

### B. Thuyền Rồng Căng Buồm Ban Ngày (Daytime Longship Sailing)
```text
Clean 2D vector cartoon animated documentary style illustration, in the style of Ancient World Uncovered. A wooden Viking longship sailing peacefully on calm light-blue ocean waters under a clear sky. The ship features a striking red-and-cream vertically striped square sail catching the wind and wooden shields mounted on the gunwale. Onboard are three stickman characters: a Viking captain with a brown beard steering with a side oar, a crewman adjusting the sail rigging, and a stickman sitting and studying an unfolded navigation map. Crisp bold black outlines, cheerful flat colors with soft shading. 16:9 widescreen.
```

### C. Người Tiền Sử Bên Lửa Trại Savan (Prehistoric Savanna & Campfire)
```text
Clean 2D vector cartoon animated documentary style illustration, in the style of Before Civilization. An open golden savanna landscape under a bright pale blue sky with stylized acacia trees and a big round golden sun. A group of expressive prehistoric stickmen with simple leopard-print and ragged brown animal hides gathered around a crackling campfire, holding stone spears and wooden clubs. At the top, a clean bold cartoon text header: 'EARLY HUMANS: SURVIVAL AND FIRE'. Bold black vector line art, vibrant warm palette, soft cel-shading. 16:9 widescreen.
```

---

## 3. Thư Viện SVG Stickman Viking Sẵn Dùng Trong Remotion

```tsx
// src/components/StickmanVikingSVG.tsx
import React from 'react';
import { useCurrentFrame } from 'remotion';

interface StickmanVikingProps {
  pose: 'shivering' | 'holding_sunstone' | 'wielding_sword' | 'rowing';
  x?: number;
  y?: number;
  scale?: number;
  color?: string;
}

export const StickmanVikingSVG: React.FC<StickmanVikingProps> = ({
  pose = 'shivering',
  x = 0,
  y = 0,
  scale = 1,
  color = '#222222',
}) => {
  const frame = useCurrentFrame();
  const steppedFrame = Math.floor(frame / 3) * 3;

  // Hiệu ứng run rẩy khi lạnh
  const shiverOffsetX = pose === 'shivering' ? Math.sin(steppedFrame * 2.5) * 3 : 0;
  const shiverOffsetY = pose === 'shivering' ? Math.cos(steppedFrame * 3.1) * 2 : 0;

  // Góc vung kiếm / nâng đá
  const armAngle = pose === 'holding_sunstone' ? -45 : pose === 'wielding_sword' ? Math.sin(steppedFrame * 0.2) * 20 : 0;

  return (
    <svg
      width={220 * scale}
      height={320 * scale}
      viewBox="0 0 220 320"
      style={{
        position: 'absolute',
        left: x + shiverOffsetX,
        top: y + shiverOffsetY,
        overflow: 'visible',
      }}
    >
      {/* Đầu */}
      <circle cx="110" cy="55" r="32" stroke={color} strokeWidth="6" fill="#F3EDE2" />
      {/* Mũ Viking bằng da không sừng */}
      <path d="M 80 50 Q 110 20 140 50 Z" fill="#7A5230" stroke={color} strokeWidth="3" />
      
      {/* Mắt & Biểu cảm */}
      <circle cx="100" cy="52" r="3.5" fill={color} />
      <circle cx="120" cy="52" r="3.5" fill={color} />
      {pose === 'shivering' ? (
        <path d="M 96 70 Q 103 64 110 70 T 124 70" stroke={color} strokeWidth="3" fill="none" />
      ) : (
        <path d="M 100 68 Q 110 74 120 68" stroke={color} strokeWidth="3.5" fill="none" />
      )}

      {/* Thân */}
      <line x1="110" y1="87" x2="110" y2="190" stroke={color} strokeWidth="6" strokeLinecap="round" />

      {/* Áo choàng len Vadmal */}
      <path
        d="M 85 100 Q 110 92 135 100 L 145 180 Q 110 188 75 180 Z"
        fill="#C8963E"
        stroke={color}
        strokeWidth="4"
        opacity="0.9"
      />
      {/* Ghim cài áo Brooch */}
      <circle cx="92" cy="110" r="5" fill="#C04A2B" stroke={color} strokeWidth="2" />

      {/* Tay & Đạo cụ */}
      {pose === 'holding_sunstone' ? (
        <g transform={`rotate(${armAngle} 110 110)`}>
          <line x1="110" y1="110" x2="165" y2="70" stroke={color} strokeWidth="6" strokeLinecap="round" />
          {/* Tinh thể Iceland Spar phát sáng */}
          <polygon points="165,60 180,68 175,85 160,77" fill="#D4EBF2" stroke="#3A6073" strokeWidth="2" />
        </g>
      ) : pose === 'wielding_sword' ? (
        <g transform={`rotate(${armAngle} 110 110)`}>
          <line x1="110" y1="110" x2="170" y2="120" stroke={color} strokeWidth="6" strokeLinecap="round" />
          {/* Kiếm Ulfberht */}
          <line x1="170" y1="120" x2="210" y2="70" stroke="#777" strokeWidth="5" strokeLinecap="round" />
          <line x1="160" y1="130" x2="175" y2="115" stroke="#C04A2B" strokeWidth="4" strokeLinecap="round" />
        </g>
      ) : (
        <>
          {/* Tay co ro ôm áo */}
          <path d="M 110 110 L 85 140 L 125 145" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 110 110 L 135 140 L 95 145" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Chân & Ủng da */}
      <line x1="110" y1="190" x2="85" y2="280" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="110" y1="190" x2="135" y2="280" stroke={color} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
};
```

---

## 4. Sourcing B-roll Thực Tế Từ Pexels API
- **Từ khóa Pexels Viking & Bắc Cực**:
  - `arctic stormy ocean cold waves`
  - `foggy sea northern coastline`
  - `blacksmith anvil glowing iron hammer`
  - `ancient wooden ship museum`
  - `moss peat bog nature`
- **Bộ lọc màu hòa quyện**: Luôn áp dụng hiệu ứng trộn parchment trong CSS để B-roll không bị tách biệt khỏi nền vẽ tay.
