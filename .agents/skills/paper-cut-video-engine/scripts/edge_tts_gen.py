#!/usr/bin/env python3
"""
Tạo giọng đọc voiceover bằng Microsoft Edge TTS (gói `edge-tts`, miễn phí, không cần API key).

Yêu cầu:
    pip install edge-tts

Usage:
    # 1 câu thoại
    python edge_tts_gen.py --text "Vì sao bầu trời lại có màu xanh?" --out ./public/audio/vo_scene01.mp3

    # Cả kịch bản: mỗi scene trong scenes.json (field voText) -> 1 file mp3
    python edge_tts_gen.py --script scenes.json --out-dir ./public/audio/scenes/

Danh sách voice tiếng Việt: vi-VN-HoaiMyNeural (nữ), vi-VN-NamMinhNeural (nam).
Xem đầy đủ: python -m edge_tts --list-voices
"""
import argparse
import asyncio
import json
import os
import subprocess
import sys

import edge_tts

sys.stdout.reconfigure(encoding="utf-8")

DEFAULT_VOICE = "vi-VN-HoaiMyNeural"


async def synthesize(text: str, voice: str, out_path: str):
    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(out_path)


def mp3_duration_sec(path: str) -> float:
    try:
        from mutagen.mp3 import MP3
        audio = MP3(path)
        return float(audio.info.length)
    except Exception:
        try:
            out = subprocess.run(
                ["ffprobe", "-v", "error", "-show_entries", "format=duration",
                 "-of", "default=noprint_wrappers=1:nokey=1", path],
                capture_output=True, text=True,
            )
            return float(out.stdout.strip())
        except Exception:
            return 0.0


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", help="1 câu thoại cần đọc")
    parser.add_argument("--script", help="Đường dẫn scenes.json — đọc voText từng scene")
    parser.add_argument("--out", default="./public/audio/vo.mp3", help="File mp3 output khi dùng --text")
    parser.add_argument("--out-dir", default="./public/audio/scenes/", help="Thư mục output khi dùng --script")
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    args = parser.parse_args()

    if not args.text and not args.script:
        print("Lỗi: cần --text hoặc --script", file=sys.stderr)
        sys.exit(1)

    if args.text:
        asyncio.run(synthesize(args.text, args.voice, args.out))
        print(f"Đã tạo: {args.out} ({mp3_duration_sec(args.out):.2f}s)")
        return

    with open(args.script, encoding="utf-8") as f:
        data = json.load(f)

    for scene in data.get("scenes", []):
        text = scene.get("voText")
        if not text:
            continue
        out_path = os.path.join(args.out_dir, f"{scene['id']}.mp3")
        asyncio.run(synthesize(text, args.voice, out_path))
        print(f"[{scene['id']}] {out_path} ({mp3_duration_sec(out_path):.2f}s) — {text[:50]}")


if __name__ == "__main__":
    main()
