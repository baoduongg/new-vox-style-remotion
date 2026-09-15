# Hướng Dẫn Sourcing & Prompt Visual Kể Chuyện (2D Vector Storytelling Prompts)

Tài liệu này hướng dẫn tạo hình ảnh hoạt họa 2D cho video **Stickman Storytelling & Dramatic Narrative** bằng mô hình AI (Gemini / Imagen 3) với trọng tâm vào **diễn xuất nhân vật (Character Acting)**, **biểu cảm kịch tính** và **ràng buộc ngôn ngữ văn bản trong tranh**.

---

## 🎯 1. Công Thức Prompt Gemini Chuẩn (The Storytelling Prompt Formula)

### 📋 Cấu Trúc 4 Thành Phần:
```text
Clean 2D vector cartoon animated storytelling illustration, in the style of OverSimplified, Brew, and TED-Ed. [Main Stickman Characters & Detailed Emotional Acting / Poses / Costumes]. [Vivid 2D Cartoon Narrative Background & Dramatic Lighting]. [Story Props / Signs / Banners / Evidence / Speech Bubbles]. Smooth clean line art, bold black vector outlines, vibrant flat colors with soft cel-shading, playful dramatic aesthetic. [Language & Typography Constraint for In-Image Text]. 16:9 widescreen.
```

### ⚠️ Quy Tắc Bắt Buộc:
1. **Mở đầu chuẩn**: `Clean 2D vector cartoon animated storytelling illustration, in the style of OverSimplified, Brew, and TED-Ed.`
2. **Nhân vật người que**: `Expressive white round-headed stickman character with bold black vector outlines and thin stick limbs, wearing [Period Costume/Suit/Hat], showing [Specific Extreme Emotion: wide shocked eyes, sly grin, dripping sweat, crying tears].`
3. **Cấm dùng**: KHÔNG dùng `3D render, photorealistic, parchment vintage paper, gritty charcoal, blurry sketch`. Phải dùng `Crisp clean 2D vector lines, colorful vibrant background, soft cel-shading`.
4. **Ràng buộc văn bản trong ảnh (In-Image Text Constraint)**:
   - *Dự án Tiếng Anh (Mặc định)*:
     > `All visible text, newspaper headlines, signs, posters, and speech bubbles must be strictly in clear English typography with Latin alphabet only, 16:9 widescreen.`
   - *Dự án Tiếng Việt*:
     > `All visible text, newspaper headlines, signs, posters, and dialogue bubbles must be strictly in clear Vietnamese typography with correct diacritics (Latin alphabet only, e.g., 'BÁN ĐẤU GIÁ THÁP EIFFEL', 'ĐẠI CHIẾN CHIM EMU'), 16:9 widescreen.`

---

## 🎨 2. Thư Viện Prompt Mẫu Kể Chuyện Thực Tế & Thời Sự (Story Prompt Examples)

### A. Khóa Smartphone Vào Két Sắt & Hội Chứng Cai Nghiện Dopamine (English)
```text
Clean 2D vector cartoon animated storytelling illustration, in the style of Brew and Better Than Yesterday. Inside a modern cozy apartment room at night, an expressive stickman character with tired eyes and dark circles is looking with wide comic determination at a glowing smartphone placed inside an open heavy metal electronic timed safe on a wooden desk. On the safe's digital LED screen is a bright red countdown timer '720:00:00'. Floating purple ghost-like dopamine bubbles with sad faces are drifting away into the air. Crisp bold black vector outlines, vibrant flat colors with soft cel-shading, warm lamp lighting contrasting with cool blue digital glows. All visible text strictly in clear English typography, 16:9 widescreen.
```

### B. Nạn Nhân Ôm Đầu Shock Khi Tài Khoản Về Số 0 (Tiếng Việt mẫu)
```text
Clean 2D vector cartoon animated storytelling illustration, in the style of OverSimplified. In a modern bright office cubicle, an expressive stickman office worker wearing a white shirt and blue tie is clutching his head in utter shock and despair, with giant cartoon sweat drops spraying outward and wide comical bulging eyes staring at his glowing smartphone screen. The smartphone screen displays a red bank alert with bold text 'SỐ DƯ: 0 VNĐ'. In the background, stacks of unpaid bills and coffee cups are piled up on the desk. Bold black vector line art, bright vivid colors, dynamic comic-book shock lines. All visible text strictly in clear Vietnamese typography with correct diacritics, 16:9 widescreen.
```

### C. Đại Án Startup: Bán 4 Triệu Sinh Viên Ảo Cho Ngân Hàng (Corporate Con)
```text
Clean 2D vector cartoon animated storytelling illustration, in the style of MagnatesMedia and Brew. Inside a luxurious glass-walled Wall Street skyscraper boardroom, a stylish female stickman startup founder wearing trendy glasses and a black blazer has a confident, sly smirk while sliding a glowing golden USB drive labeled '4,000,000 STUDENT USERS' across a polished marble conference table to a group of wealthy, excited banker stickmen in navy suits holding a massive $175M check. In the background through the floor-to-ceiling windows is the sunny Manhattan skyline. Crisp clean vector outlines, cinematic lighting with rich blues and gold accents, 16:9 widescreen.
```

### D. Cuộc Gọi Video Deepfake Giả Mạo Sếp Lừa 25 Triệu Đô (AI Cyber Scam)
```text
Clean 2D vector cartoon animated storytelling illustration, in the style of TED-Ed. In a dimly lit corporate accounting office, a naive stickman accountant is staring intensely at a large computer monitor displaying a 5-person video conference call. On the screen, the CFO stickman in London is gesturing seriously, but subtle holographic glitch lines and faint binary code ripples reveal that all 5 faces on the screen are AI Deepfakes. A glowing red wire transfer progress bar at the bottom reads 'TRANSFERRING $25,000,000... 99%'. Bold black outlines, tense cyber aesthetic with neon cyan and cautionary orange lighting, 16:9 widescreen.
```

---

## 💻 3. Component SVG Stickman Diễn Xuất Đa Tư Thế (Remotion Ready)

```tsx
// src/components/StickmanActorSVG.tsx
import React from 'react';
import { useCurrentFrame } from 'remotion';

export type StickmanPose =
  | 'smirking_con_artist'
  | 'shocked_victim'
  | 'shivering_survival'
  | 'running_panic'
  | 'holding_cash';

interface StickmanActorProps {
  pose: StickmanPose;
  x?: number;
  y?: number;
  scale?: number;
  hat?: 'top_hat' | 'military_cap' | 'none';
  flipX?: boolean;
}

export const StickmanActorSVG: React.FC<StickmanActorProps> = ({
  pose = 'smirking_con_artist',
  x = 0,
  y = 0,
  scale = 1,
  hat = 'none',
  flipX = false,
}) => {
  const frame = useCurrentFrame();
  const steppedFrame = Math.floor(frame / 3) * 3;

  // Hiệu ứng run rẩy hoặc thở
  const shakeX = pose === 'shivering_survival' || pose === 'shocked_victim' ? Math.sin(steppedFrame * 2.5) * 3 : 0;
  const bobY = Math.sin(steppedFrame * 0.1) * 2;

  return (
    <svg
      width={240 * scale}
      height={340 * scale}
      viewBox="0 0 240 340"
      style={{
        position: 'absolute',
        left: x + shakeX,
        top: y + bobY,
        transform: flipX ? 'scaleX(-1)' : 'none',
        overflow: 'visible',
      }}
    >
      {/* Đổ bóng dưới chân */}
      <ellipse cx="120" cy="315" rx="45" ry="12" fill="rgba(0,0,0,0.15)" />

      {/* Đầu */}
      <circle cx="120" cy="60" r="36" stroke="#1A1A1A" strokeWidth="6" fill="#FFFFFF" />

      {/* Mũ (Nếu có) */}
      {hat === 'top_hat' && (
        <g>
          {/* Vành mũ */}
          <rect x="75" y="32" width="90" height="8" rx="4" fill="#1A1A1A" />
          {/* Thân mũ chóp cao */}
          <rect x="90" y="-10" width="60" height="44" rx="4" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="4" />
          {/* Nơ đỏ quanh mũ */}
          <rect x="90" y="24" width="60" height="8" fill="#D32F2F" />
        </g>
      )}

      {/* Biểu cảm khuôn mặt theo từng Pose */}
      {pose === 'smirking_con_artist' && (
        <g>
          {/* Mắt gian xảo */}
          <path d="M 100 52 Q 108 48 114 54" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 126 52 Q 134 48 140 54" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Nụ cười nhếch mép */}
          <path d="M 105 75 Q 120 74 138 65" stroke="#1A1A1A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {pose === 'shocked_victim' && (
        <g>
          {/* Mắt to tròn xoe */}
          <circle cx="106" cy="54" r="9" stroke="#1A1A1A" strokeWidth="3" fill="#FFF" />
          <circle cx="106" cy="54" r="3.5" fill="#1A1A1A" />
          <circle cx="134" cy="54" r="9" stroke="#1A1A1A" strokeWidth="3" fill="#FFF" />
          <circle cx="134" cy="54" r="3.5" fill="#1A1A1A" />
          {/* Miệng há hốc D: */}
          <ellipse cx="120" cy="78" rx="10" ry="14" fill="#1A1A1A" />
          {/* Mồ hôi bắn tung tóe */}
          <path d="M 75 45 Q 65 40 70 55 Q 75 55 75 45 Z" fill="#42A5F5" />
          <path d="M 165 45 Q 175 40 170 55 Q 165 55 165 45 Z" fill="#42A5F5" />
        </g>
      )}

      {pose === 'shivering_survival' && (
        <g>
          {/* Mắt quầng thâm kiệt sức */}
          <circle cx="108" cy="55" r="3.5" fill="#1A1A1A" />
          <circle cx="132" cy="55" r="3.5" fill="#1A1A1A" />
          <path d="M 98 64 Q 108 70 118 64" stroke="#78909C" strokeWidth="3" fill="none" />
          <path d="M 122 64 Q 132 70 142 64" stroke="#78909C" strokeWidth="3" fill="none" />
          {/* Miệng run rẩy ziczac */}
          <path d="M 106 78 Q 113 72 120 78 T 134 78" stroke="#1A1A1A" strokeWidth="3.5" fill="none" />
        </g>
      )}

      {/* Thân mình */}
      <line x1="120" y1="96" x2="120" y2="210" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />

      {/* Trang phục / Phụ kiện */}
      {pose === 'smirking_con_artist' && (
        <g>
          {/* Áo vest đen */}
          <path d="M 95 106 L 120 98 L 145 106 L 140 200 L 100 200 Z" fill="#263238" />
          {/* Cà vạt / Nơ đỏ */}
          <polygon points="116,108 124,108 126,140 120,150 114,140" fill="#D32F2F" />
        </g>
      )}

      {/* Cánh tay & Đạo cụ */}
      {pose === 'holding_cash' ? (
        <g>
          <line x1="120" y1="120" x2="165" y2="150" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
          <line x1="120" y1="120" x2="75" y2="150" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
          {/* Vali tiền xanh */}
          <rect x="155" y="135" width="45" height="35" rx="4" fill="#795548" stroke="#1A1A1A" strokeWidth="3" />
          <rect x="165" y="125" width="25" height="10" rx="2" fill="none" stroke="#1A1A1A" strokeWidth="3" />
          {/* Xấp tiền USD bay ra */}
          <rect x="175" y="115" width="22" height="14" rx="2" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
        </g>
      ) : (
        <g>
          <line x1="120" y1="120" x2="85" y2="170" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
          <line x1="120" y1="120" x2="155" y2="170" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {/* Đôi chân */}
      <line x1="120" y1="210" x2="90" y2="310" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
      <line x1="120" y1="210" x2="150" y2="310" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
};
```
