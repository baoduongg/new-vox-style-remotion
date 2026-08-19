#!/usr/bin/env python3
"""
Xoá nền trắng phẳng (từ ảnh Gemini generated) -> PNG nền trong suốt.

Dùng cho ảnh element (isolated subject, nền trắng) trong visual-sourcing.md mục 2b.
KHÔNG chạy cho ảnh *-bg.png (nền full-frame, giữ nguyên).

Usage:
    python remove_white_bg.py images/scene-01-face.png public/generated/scene-01-face.png
    python remove_white_bg.py images/*.png --out-dir public/generated
"""
import argparse
import os
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

sys.stdout.reconfigure(encoding="utf-8")

WHITE_THRESHOLD = 235  # ngưỡng trên ảnh ĐÃ LÀM MỜ (grain giấy làm pixel gốc dao động quanh trắng)
BLUR_RADIUS = 3
CLOSE_ITER = 3  # nối các đốm nhiễu nhỏ trong vùng nền trước khi tính liên thông


def remove_white_bg(src_path: str, dst_path: str, threshold: int = WHITE_THRESHOLD):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img)
    rgb = arr[:, :, :3]

    # Làm mờ trước khi xét ngưỡng: ảnh Gemini có grain giấy khiến nền "trắng" dao động
    # pixel-to-pixel, threshold trên ảnh gốc để lại các đốm không liên thông (noise holes)
    blurred = np.array(Image.fromarray(rgb).filter(ImageFilter.GaussianBlur(BLUR_RADIUS)))
    white_candidate = np.all(blurred >= threshold, axis=2)
    # Đóng (dilate rồi erode) để nối các khoảng hở nhỏ còn sót lại sau blur
    # border_value=1: coi vùng ngoài khung ảnh là nền, tránh binary_closing
    # ăn mòn nhầm phần nền chạm sát mép ảnh (làm mất liên kết với biên)
    white_candidate = ndimage.binary_closing(white_candidate, iterations=CLOSE_ITER, border_value=1)

    # Chỉ xoá vùng trắng LIÊN THÔNG với biên ảnh (nền thật luôn chạm mép,
    # ảnh isolated subject không nên chạm mép) — tránh xoá nhầm nội dung sáng ở giữa
    labeled, _ = ndimage.label(white_candidate)
    border_labels = set(labeled[0, :]) | set(labeled[-1, :]) | set(labeled[:, 0]) | set(labeled[:, -1])
    border_labels.discard(0)
    bg_mask = np.isin(labeled, list(border_labels))

    arr[:, :, 3] = np.where(bg_mask, 0, arr[:, :, 3])
    Image.fromarray(arr, "RGBA").save(_ensure_dir(dst_path), "PNG")


def _ensure_dir(dst_path: str) -> str:
    os.makedirs(os.path.dirname(dst_path) or ".", exist_ok=True)
    return dst_path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("inputs", nargs="+", help="File ảnh nguồn (nền trắng)")
    parser.add_argument("--out", help="File output khi chỉ có 1 input")
    parser.add_argument("--out-dir", help="Thư mục output khi có nhiều input (giữ nguyên tên file)")
    parser.add_argument("--threshold", type=int, default=WHITE_THRESHOLD)
    args = parser.parse_args()

    if len(args.inputs) == 1 and args.out:
        remove_white_bg(args.inputs[0], args.out, args.threshold)
        print(f"Đã tạo: {args.out}")
        return

    if not args.out_dir:
        print("Lỗi: cần --out-dir khi xử lý nhiều file (hoặc --out cho 1 file)", file=sys.stderr)
        sys.exit(1)

    for src in args.inputs:
        dst = os.path.join(args.out_dir, os.path.basename(src))
        remove_white_bg(src, dst, args.threshold)
        print(f"Đã tạo: {dst}")


if __name__ == "__main__":
    main()
