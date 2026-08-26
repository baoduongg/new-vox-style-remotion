# Hướng Dẫn Scaffold & Ráp Remotion Đa Năng (Universal Remotion Scaffold)

Tài liệu cung cấp bộ khung mẫu dự án và các component React chuyên dụng để lắp ráp video phong cách **Stickman Animated Explainer & Documentary** cho mọi thể loại trong Remotion.

---

## 1. Cấu Trúc Dự Án Remotion Độc Lập Chuẩn

Mỗi video mới nằm trong một thư mục riêng biệt đặt tên theo topic (kebab-case, ví dụ: `dopamine-loop-explained/`, `inflation-wealth-secrets/`, `roman-concrete-secrets/`):

```
topic-project-folder/
├── package.json                     # Dependencies & scripts độc lập
├── remotion.config.ts               # Cấu hình Rspack & format
├── tsconfig.json                    # Cấu hình TypeScript
├── scenes.json                      # Dữ liệu kịch bản & timing từng shot (5-8s)
├── prompt.json                      # Bộ prompt sinh visual
├── metadata.md                      # SEO Title, Description, Thumbnail prompt
├── src/
│   ├── index.ts                     # registerRoot(RemotionRoot)
│   ├── index.css                    # Google Fonts & background styling
│   ├── Root.tsx                     # Composition chính
│   └── components/
│       ├── ImageScene.tsx           # Hiệu ứng Ken Burns camera & Smart Fallback
│       ├── AnimatedSubtitle.tsx     # Phụ đề hoạt hình nổi bật từ khóa
│       ├── Watermark.tsx            # Mascot Avatar kênh viền kim loại
│       ├── BarChartCompare.tsx      # Biểu đồ cột so sánh động (Tài chính & Khoa học)
│       └── MetricGauge.tsx          # Đồng hồ đo chỉ số (Nhiệt độ, Dopamine, Lạm phát)
└── public/
    ├── assets/scenes/               # 0.png ... N-1.png
    ├── avatar_stickman_channel.jpg  # Mascot kênh 64px
    └── audio/scenes/
        └── full-scene.mp3           # Audio voiceover tổng liền mạch
```

---

## 2. File Cấu Hình Dự Án

**`package.json`**:
```json
{
  "name": "stickman-explainer-project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@remotion/cli": "4.0.515",
    "@remotion/sfx": "4.0.515",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "remotion": "4.0.515"
  },
  "devDependencies": {
    "@types/react": "19.2.7",
    "@types/web": "0.0.166",
    "typescript": "5.9.3"
  },
  "scripts": {
    "dev": "remotion studio",
    "build": "remotion bundle",
    "render": "remotion render ExplainerDoc out/video.mp4"
  }
}
```

**`src/index.css`**:
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&family=Montserrat:ital,wght@0,600;0,800;1,700&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #0F172A;
  font-family: 'Outfit', 'Montserrat', sans-serif;
}
```

---

## 3. Các Component Đồ Họa Đa Năng Sẵn Dùng

### A. Biểu Đồ So Sánh Tăng Trưởng Động (`BarChartCompare.tsx`)

```tsx
// src/components/BarChartCompare.tsx
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface BarData {
  label: string;
  value: number;
  color: string;
}

export const BarChartCompare: React.FC<{ bars: BarData[]; title?: string }> = ({
  bars,
  title,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.5 },
  });

  const maxValue = Math.max(...bars.map((b) => b.value));

  return (
    <div
      style={{
        position: 'absolute',
        top: 100,
        right: 80,
        backgroundColor: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(10px)',
        border: '3px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        padding: '24px 32px',
        color: '#FFFFFF',
        minWidth: 380,
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
      }}
    >
      {title && (
        <h3 style={{ margin: '0 0 20px 0', fontSize: 22, fontWeight: 800, color: '#FACC15' }}>
          {title}
        </h3>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {bars.map((bar, i) => {
          const barWidth = interpolate(progress, [0, 1], [0, (bar.value / maxValue) * 100]);
          return (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 16, fontWeight: 700 }}>
                <span>{bar.label}</span>
                <span style={{ color: bar.color }}>{bar.value.toLocaleString()}</span>
              </div>
              <div style={{ height: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: `${barWidth}%`, height: '100%', backgroundColor: bar.color, borderRadius: 8 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

---

### B. Đồng Hồ Đo Chỉ Số Đa Dụng (`MetricGauge.tsx`)

```tsx
// src/components/MetricGauge.tsx
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface MetricGaugeProps {
  label: string;
  startVal: number;
  endVal: number;
  unit?: string;
  color?: string;
}

export const MetricGauge: React.FC<MetricGaugeProps> = ({
  label,
  startVal,
  endVal,
  unit = '',
  color = '#EF4444',
}) => {
  const frame = useCurrentFrame();
  const currentVal = interpolate(frame, [0, 60], [startVal, endVal], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 80,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        border: `3px solid ${color}`,
        borderRadius: 20,
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: 14, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
          {label}
        </p>
        <p style={{ margin: 0, fontSize: 36, fontWeight: 900, color }}>
          {Math.round(currentVal).toLocaleString()}{unit}
        </p>
      </div>
    </div>
  );
};
```

---

### C. Phụ Đề Hoạt Hình & Watermark

*(Xem chi tiết triển khai `AnimatedSubtitle.tsx`, `Watermark.tsx`, và `ImageScene.tsx` trong template mã nguồn)*.
