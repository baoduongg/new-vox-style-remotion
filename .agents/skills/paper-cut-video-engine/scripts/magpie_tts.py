#!/usr/bin/env python3
"""
Tạo giọng đọc voiceover bằng NVIDIA Magpie TTS Multilingual (build.nvidia.com).

Yêu cầu:
    pip install nvidia-riva-client
    biến môi trường NVIDIA_API_KEY (lấy tại https://build.nvidia.com/nvidia/magpie-tts-multilingual)

Usage:
    # 1 câu thoại
    python magpie_tts.py --text "Vì sao bầu trời lại có màu xanh?" --out ./public/audio/vo_scene01.wav

    # Cả kịch bản: mỗi scene trong scenes.json (field voText) -> 1 file wav
    python magpie_tts.py --script scenes.json --out-dir ./public/audio/

Xem references/voiceover-tts.md để biết cách chọn voice/emotion phù hợp nội dung.
"""
import argparse
import json
import os
import sys
import wave

sys.stdout.reconfigure(encoding="utf-8")

FUNCTION_ID = "877104f7-e885-42b9-8de8-f6e4c6303969"
SERVER = "grpc.nvcf.nvidia.com:443"


def synthesize(text: str, voice: str, language: str, api_key: str) -> bytes:
    import riva.client

    auth = riva.client.Auth(
        uri=SERVER,
        use_ssl=True,
        metadata_args=[
            ["function-id", FUNCTION_ID],
            ["authorization", f"Bearer {api_key}"],
        ],
    )
    service = riva.client.SpeechSynthesisService(auth)
    resp = service.synthesize(
        text, voice_name=voice, language_code=language, sample_rate_hz=44100
    )
    return resp.audio


def write_wav(pcm_bytes: bytes, path: str, sample_rate: int = 44100):
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with wave.open(path, "wb") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sample_rate)
        f.writeframes(pcm_bytes)


def wav_duration_sec(path: str) -> float:
    with wave.open(path, "rb") as f:
        return f.getnframes() / f.getframerate()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", help="1 câu thoại cần đọc")
    parser.add_argument("--script", help="Đường dẫn scenes.json — đọc voText từng scene")
    parser.add_argument("--out", default="./public/audio/vo.wav", help="File wav output khi dùng --text")
    parser.add_argument("--out-dir", default="./public/audio/", help="Thư mục output khi dùng --script")
    parser.add_argument("--voice", default="Magpie-Multilingual.VI-VN.Long.Neutral")
    parser.add_argument("--language", default="vi-VN")
    args = parser.parse_args()

    if not args.text and not args.script:
        print("Lỗi: cần --text hoặc --script", file=sys.stderr)
        sys.exit(1)

    api_key = os.environ.get("NVIDIA_API_KEY")
    if not api_key:
        print("Lỗi: chưa set biến môi trường NVIDIA_API_KEY", file=sys.stderr)
        sys.exit(1)

    if args.text:
        audio = synthesize(args.text, args.voice, args.language, api_key)
        write_wav(audio, args.out)
        print(f"Đã tạo: {args.out} ({wav_duration_sec(args.out):.2f}s)")
        return

    with open(args.script, encoding="utf-8") as f:
        data = json.load(f)

    for scene in data.get("scenes", []):
        text = scene.get("voText")
        if not text:
            continue
        out_path = os.path.join(args.out_dir, f"{scene['id']}.wav")
        audio = synthesize(text, args.voice, args.language, api_key)
        write_wav(audio, out_path)
        print(f"[{scene['id']}] {out_path} ({wav_duration_sec(out_path):.2f}s) — {text[:50]}")


if __name__ == "__main__":
    main()
