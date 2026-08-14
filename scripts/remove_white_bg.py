"""Xoá nền trắng (near-white) của ảnh element cutout, xuất PNG nền trong suốt.
Chỉ dùng cho ảnh sinh với nền solid trắng theo prompt.json (không dùng cho ảnh "-bg.png" full-frame).

Usage:
    python3 scripts/remove_white_bg.py images/scene-01-face.png public/generated/scene-01-face.png
    python3 scripts/remove_white_bg.py images/*.png --out-dir public/generated  # batch
"""

import sys
from pathlib import Path
from PIL import Image

WHITE_THRESHOLD = 245  # pixel có R,G,B đều >= ngưỡng này coi là nền trắng


def remove_white_bg(src: Path, dst: Path, threshold: int = WHITE_THRESHOLD) -> None:
    img = Image.open(src).convert("RGBA")
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        if r >= threshold and g >= threshold and b >= threshold:
            new_data.append((r, g, b, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst)


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
