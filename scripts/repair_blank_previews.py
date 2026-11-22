"""Repair blank catalog previews by re-fetching the source animated webp and taking a real frame.

Eleven seeded MotionSites cards ship a 640px preview whose first frame is an empty canvas (the
1.1.8 fix converted animated webp to static by keeping frame 0, which is blank for these). The
original animated file is still listed in data/catalog-details.json, so we re-download it, take a
frame at ~40% of the loop, and write the usual 16:10 1280x800 cover.

Usage: python scripts/repair_blank_previews.py [--dry-run]
"""
import argparse
import io
import json
import pathlib
import sys
import urllib.request

from PIL import Image

REPO = pathlib.Path(__file__).resolve().parent.parent
DETAILS = REPO / "data" / "catalog-details.json"
PREVIEWS = REPO / "assets" / "previews"
WORK = REPO / ".work" / "repair"
W, H = 1280, 800
MIN_BYTES = 2048


def blank_ids():
    ids = []
    for p in sorted(PREVIEWS.glob("*.webp")):
        if p.stat().st_size < MIN_BYTES:
            ids.append(p.stem)
    return ids


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "motionsites-repair"})
    with urllib.request.urlopen(req, timeout=60) as res:
        return res.read()


def cover(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    scale = max(W / im.width, H / im.height)
    nw, nh = max(W, round(im.width * scale)), max(H, round(im.height * scale))
    im = im.resize((nw, nh), Image.LANCZOS)
    left, top = (nw - W) // 2, (nh - H) // 2
    return im.crop((left, top, left + W, top + H))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    details = json.loads(DETAILS.read_text(encoding="utf-8"))
    WORK.mkdir(parents=True, exist_ok=True)
    targets = blank_ids()
    print("blank previews:", len(targets))
    fixed, failed = 0, []
    for cid in targets:
        rec = details.get(cid) or {}
        url = rec.get("video_preview_url") or rec.get("image_preview_url")
        if not url:
            failed.append((cid, "no source url"))
            continue
        try:
            raw = fetch(url)
            im = Image.open(io.BytesIO(raw))
            frames = getattr(im, "n_frames", 1)
            idx = max(1, int(frames * 0.4)) if frames > 1 else 0
            if frames > 1:
                im.seek(idx)
            out = cover(im.copy())
            if args.dry_run:
                print(f"  would fix {cid}  frames={frames} pick={idx}  src={len(raw)//1024} KB")
                continue
            tmp = WORK / (cid + ".webp")
            out.save(tmp, "WEBP", quality=84, method=6)
            tmp.replace(PREVIEWS / (cid + ".webp"))
            fixed += 1
            print(f"  fixed {cid}  frames={frames} pick={idx}  {tmp.stat().st_size // 1024 if tmp.exists() else (PREVIEWS / (cid + '.webp')).stat().st_size // 1024} KB")
        except Exception as exc:
            failed.append((cid, str(exc)[:110]))
    print("fixed", fixed, "failed", len(failed))
    for cid, why in failed:
        print("  FAIL", cid, why)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
