"""Convert an image to a 1280x800 webp cover (16:10, centre-cropped).

Used by scripts/import-superdesign-repo.js so imported previews match the card grid.
Requires Pillow (already used by scripts/render_previews.py).

Usage: python scripts/convert_preview.py <src> <dest.webp> [quality]
"""
import sys

from PIL import Image

W, H = 1280, 800


def main() -> int:
    if len(sys.argv) < 3:
        print("usage: convert_preview.py <src> <dest.webp> [quality]", file=sys.stderr)
        return 2
    src, dest = sys.argv[1], sys.argv[2]
    quality = int(sys.argv[3]) if len(sys.argv) > 3 else 82
    im = Image.open(src).convert("RGB")
    scale = max(W / im.width, H / im.height)
    nw, nh = max(W, round(im.width * scale)), max(H, round(im.height * scale))
    im = im.resize((nw, nh), Image.LANCZOS)
    left, top = (nw - W) // 2, (nh - H) // 2
    im.crop((left, top, left + W, top + H)).save(dest, "WEBP", quality=quality, method=6)
    return 0


if __name__ == "__main__":
    sys.exit(main())
