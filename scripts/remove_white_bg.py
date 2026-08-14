"""Xoá nền trắng (near-white) của ảnh element cutout, xuất PNG nền trong suốt.
Chỉ dùng cho ảnh sinh với nền solid trắng theo prompt.json (không dùng cho ảnh "-bg.png" full-frame).

Độ sáng nền trắng lệch nhau giữa các ảnh Gemini (vd 247 vs 253) nên ngưỡng KHÔNG cố định:
tự đo màu nền bằng dải viền (border strip) của chính ảnh đó, rồi ramp alpha quanh mốc đo được
— tránh vừa sót lớp mờ trên nền, vừa cắt cụt bóng đổ nhạt của chủ thể.

Usage:
    python3 scripts/remove_white_bg.py images/scene-01-face.png public/generated/scene-01-face.png
    python3 scripts/remove_white_bg.py images/*.png --out-dir public/generated  # batch
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image

BORDER_PX = 10  # dải viền dùng để đo màu nền thật của ảnh
RAMP_WIDTH = 30  # bề rộng dải chuyển alpha quanh mốc nền đo được
GAMMA = 3.5  # >1 dồn alpha thấp về 0 nhanh hơn, giữ alpha cao gần như nguyên vẹn


def detect_bg_whiteness(whiteness: np.ndarray) -> float:
    border = np.concatenate(
        [
            whiteness[:BORDER_PX, :].ravel(),
            whiteness[-BORDER_PX:, :].ravel(),
            whiteness[:, :BORDER_PX].ravel(),
            whiteness[:, -BORDER_PX:].ravel(),
        ]
    )
    # dùng percentile cao (không phải median) — nhiễu nền phân tán 2 phía quanh median,
    # lấy median làm mốc để lại một nửa nền có alpha dư nhỏ; percentile 95 phủ hết nền thật
    return float(np.percentile(border, 95))


def remove_white_bg(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGBA")
    arr = np.array(img).astype(np.float32)
    whiteness = arr[:, :, :3].min(axis=2)

    bg_ref = detect_bg_whiteness(whiteness)
    transparent_above = bg_ref
    opaque_below = bg_ref - RAMP_WIDTH

    alpha_scale = np.clip(
        (transparent_above - whiteness) / (transparent_above - opaque_below), 0, 1
    )
    # gamma > 1 dồn phần alpha thấp (haze còn sót trên vùng nền rộng, kể cả vignette
    # ánh sáng mờ lan khắp canvas) về gần 0, trong khi vẫn giữ alpha cao (chủ thể)
    # gần như nguyên vẹn — tránh "màn sương" mờ phủ cả vùng nền trống khi element
    # được scale lớn trong Remotion.
    alpha_scale = alpha_scale**GAMMA
    arr[:, :, 3] = arr[:, :, 3] * alpha_scale

    out = Image.fromarray(arr.astype(np.uint8), mode="RGBA")
    dst.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst)


def main() -> None:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)

    out_dir = None
    if "--out-dir" in args:
        idx = args.index("--out-dir")
        out_dir = Path(args[idx + 1])
        del args[idx : idx + 2]

    if out_dir is not None:
        for src_str in args:
            src = Path(src_str)
            dst = out_dir / src.name
            remove_white_bg(src, dst)
            print(f"{src} -> {dst}")
    else:
        if len(args) != 2:
            print("Cần đúng 2 tham số (src, dst) khi không dùng --out-dir")
            sys.exit(1)
        src, dst = Path(args[0]), Path(args[1])
        remove_white_bg(src, dst)
        print(f"{src} -> {dst}")


if __name__ == "__main__":
    main()
