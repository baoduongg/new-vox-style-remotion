# Video Pipeline Dashboard

Static dashboard listing every Remotion project in this folder (sibling directories with a `package.json`).

## Run

```bash
node dashboard/serve.js
```

Opens on http://localhost:4747, auto-scans on start.

## Rescan without restarting

```bash
node dashboard/scan.js
```

Then click "Refresh scan" in the page, or reload.

## How it detects projects

Any sibling folder with a `package.json` is picked up. Per project it reads:
- `scenes.json` / `scenes_<lang>.json` → scene count, fps, duration, languages
- `out/*.mp4` → render status, file size, playable link
- `out/thumbnail.jpg` or `public/thumbnail.jpg` → card thumbnail

Status: `scaffold` (no scenes.json) → `scripted` (scenes but no render) → `rendered` (has an mp4 in `out/`).
