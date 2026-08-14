#!/usr/bin/env python3
"""
Tìm và tải video/ảnh từ Pexels API cho paper-cut-video-engine.

Yêu cầu biến môi trường PEXELS_API_KEY.

Usage:
    python pexels_search.py --query "hand cutting paper craft" --type video --per-page 5 --out ./public/pexels/
    python pexels_search.py --query "autumn leaves texture" --type photo --per-page 5 --out ./public/pexels/ --download 2
"""
import argparse
import os
import sys
import urllib.request
import urllib.parse
import json


PEXELS_VIDEO_URL = "https://api.pexels.com/videos/search"
PEXELS_PHOTO_URL = "https://api.pexels.com/v1/search"


def search(query: str, media_type: str, per_page: int, api_key: str):
    url = PEXELS_VIDEO_URL if media_type == "video" else PEXELS_PHOTO_URL
    req = urllib.request.Request(
        f"{url}?query={urllib.parse.quote(query)}&per_page={per_page}",
        headers={"Authorization": api_key},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())


def list_results(data: dict, media_type: str):
    items = data.get("videos" if media_type == "video" else "photos", [])
    results = []
    for item in items:
        if media_type == "video":
            # Chọn file chất lượng HD gần 1080p nhất
            files = sorted(
                item.get("video_files", []),
                key=lambda f: abs((f.get("height") or 0) - 1080),
            )
            file_url = files[0]["link"] if files else None
        else:
            file_url = item.get("src", {}).get("large2x") or item.get("src", {}).get("original")
        results.append(
            {
                "id": item["id"],
                "photographer": item.get("photographer") or item.get("user", {}).get("name"),
                "page_url": item.get("url"),
                "file_url": file_url,
                "width": item.get("width"),
                "height": item.get("height"),
            }
        )
    return results


def download(file_url: str, out_dir: str, media_type: str, item_id) -> str:
    os.makedirs(out_dir, exist_ok=True)
    ext = "mp4" if media_type == "video" else "jpg"
    path = os.path.join(out_dir, f"pexels-{item_id}.{ext}")
    urllib.request.urlretrieve(file_url, path)
    return path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", required=True)
    parser.add_argument("--type", choices=["video", "photo"], default="video")
    parser.add_argument("--per-page", type=int, default=5)
    parser.add_argument("--out", default="./public/pexels/")
    parser.add_argument(
        "--download",
        type=int,
        default=None,
        help="Index (1-based) của kết quả muốn tải ngay. Bỏ trống để chỉ liệt kê, không tải.",
    )
    args = parser.parse_args()

    api_key = os.environ.get("PEXELS_API_KEY")
    if not api_key:
        print("Lỗi: chưa set biến môi trường PEXELS_API_KEY", file=sys.stderr)
        sys.exit(1)

    data = search(args.query, args.type, args.per_page, api_key)
    results = list_results(data, args.type)

    if not results:
        print(f"Không tìm thấy kết quả nào cho query: {args.query}")
        sys.exit(0)

    for i, r in enumerate(results, start=1):
        print(f"[{i}] id={r['id']} {r['width']}x{r['height']} by {r['photographer']}")
        print(f"    page: {r['page_url']}")
        print(f"    file: {r['file_url']}")

    if args.download:
        chosen = results[args.download - 1]
        if not chosen["file_url"]:
            print("Kết quả này không có file_url khả dụng.", file=sys.stderr)
            sys.exit(1)
        path = download(chosen["file_url"], args.out, args.type, chosen["id"])
        print(f"\nĐã tải về: {path}")
        print(f"Credit bắt buộc: Photo/Video by {chosen['photographer']} on Pexels ({chosen['page_url']})")


if __name__ == "__main__":
    main()
