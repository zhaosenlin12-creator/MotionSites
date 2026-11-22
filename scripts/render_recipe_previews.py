"""Render the recipe-pack preview media (mp4 loop + webp poster) from recipe_demo.html.

Every demo is pure HTML/CSS animation, so frames are deterministic: the page exposes
window.__seek(ms) which pauses each Animation and sets currentTime. We seek, shoot,
and encode with ffmpeg.

Usage:
    python scripts/render_recipe_previews.py --all
    python scripts/render_recipe_previews.py --ids re-03-gsap-timeline-recovery,cr-13-screenshot-diff-verify
    python scripts/render_recipe_previews.py --contact          # style contact sheet -> .work/shots
"""
import argparse
import json
import pathlib
import shutil
import subprocess
import sys
import tempfile
from urllib.parse import urlencode

from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

REPO = pathlib.Path(__file__).resolve().parent.parent
DEMO = REPO / "scripts" / "recipe_demo.html"
PACK = REPO / "data" / "recipe_pack.json"
OUT = REPO / "assets" / "previews"
WORK = REPO / ".work" / "recipe_frames"
SHOTS = REPO / ".work" / "shots"

W, H = 1280, 800
FPS = 15
LOOP_MS = 2400
FRAMES = int(FPS * LOOP_MS / 1000)  # 36


def page_url(recipe: dict, index: int) -> str:
    d = recipe["demo"]
    q = urlencode({
        "style": d["style"],
        "t1": d["t1"],
        "kind": d["kind"],
        "meta": d.get("meta", ""),
        "v": d.get("variant", ""),
        "idx": str(index).zfill(2),
        "p": ",".join(recipe.get("palette") or []),
    })
    return DEMO.as_uri() + "?" + q


def ready(page):
    page.wait_for_timeout(120)
    page.evaluate("() => document.fonts && document.fonts.ready ? document.fonts.ready.then(() => true) : true")
    page.wait_for_timeout(120)


def seek(page, ms):
    page.evaluate("(ms) => window.__seek(ms)", ms)


def render_video(page, recipe, index, frames_dir):
    frames_dir.mkdir(parents=True, exist_ok=True)
    seek(page, 0)
    step = LOOP_MS / FRAMES
    for i in range(FRAMES):
        seek(page, round(i * step, 2))
        page.screenshot(path=str(frames_dir / f"f{i:03d}.jpg"), type="jpeg", quality=90)
    mp4 = OUT / (recipe["id"] + ".mp4")
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-framerate", str(FPS), "-i", str(frames_dir / "f%03d.jpg"),
        "-c:v", "libx264", "-preset", "slow", "-crf", "27",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        "-an", str(mp4),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    # webp poster from the first frame
    im = Image.open(frames_dir / "f000.jpg").convert("RGB")
    im.save(OUT / (recipe["id"] + ".webp"), "WEBP", quality=82, method=6)
    return mp4


def contact_sheet(page, pack, only_styles=None):
    SHOTS.mkdir(parents=True, exist_ok=True)
    # one representative recipe per style (+ variants)
    seen = {}
    picks = []
    for i, r in enumerate(pack):
        key = (r["demo"]["style"], r["demo"].get("variant", ""))
        if key in seen:
            continue
        if only_styles and r["demo"]["style"] not in only_styles:
            continue
        seen[key] = i
        picks.append((i, r))
    cell_w, cell_h, label_h = 320, 200, 20
    cols = 4
    rows = (len(picks) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * (cell_h + label_h)), (10, 12, 16))
    draw = ImageDraw.Draw(sheet)
    for n, (i, r) in enumerate(picks):
        page.goto(page_url(r, i + 1), wait_until="load", timeout=20000)
        ready(page)
        seek(page, 1200)
        tmp = SHOTS / "_frame.png"
        page.screenshot(path=str(tmp))
        im = Image.open(tmp).convert("RGB").resize((cell_w, cell_h), Image.LANCZOS)
        x = (n % cols) * cell_w
        y = (n // cols) * (cell_h + label_h)
        sheet.paste(im, (x, y))
        draw.rectangle([x, y + cell_h, x + cell_w, y + cell_h + label_h], fill=(18, 22, 30))
        draw.text((x + 6, y + cell_h + 5), f"{r['demo']['style']} / {r['id'][:32]}", fill=(200, 210, 225))
    path = SHOTS / "contact-sheet.png"
    sheet.save(path)
    print("contact sheet:", path, "cells:", len(picks))
    return path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--ids", default="")
    ap.add_argument("--contact", action="store_true")
    ap.add_argument("--styles", default="")
    ap.add_argument("--force", action="store_true")
    args = ap.parse_args()

    pack = json.loads(PACK.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    WORK.mkdir(parents=True, exist_ok=True)

    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg not found on PATH")

    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox", "--hide-scrollbars"])
        ctx = browser.new_context(viewport={"width": W, "height": H}, device_scale_factor=1)
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

        if args.contact:
            contact_sheet(page, pack, [s for s in args.styles.split(",") if s] or None)
            browser.close()
            return

        ids = {s for s in args.ids.split(",") if s}
        targets = []
        for i, r in enumerate(pack):
            if args.all or (ids and r["id"] in ids):
                if not args.force and (OUT / (r["id"] + ".mp4")).exists() and (OUT / (r["id"] + ".webp")).exists():
                    continue
                targets.append((i, r))
        print("rendering", len(targets), "previews")
        for n, (i, r) in enumerate(targets):
            frames_dir = WORK / r["id"]
            page.goto(page_url(r, i + 1), wait_until="load", timeout=20000)
            ready(page)
            try:
                n_anim = page.evaluate("() => document.getAnimations().length")
            except Exception:
                n_anim = -1
            mp4 = render_video(page, r, i + 1, frames_dir)
            shutil.rmtree(frames_dir, ignore_errors=True)
            print(f"[{n + 1}/{len(targets)}] {r['id']}  anims={n_anim}  {mp4.stat().st_size // 1024} KB")
        if errors:
            print("PAGE ERRORS:", errors[:6])
        browser.close()


if __name__ == "__main__":
    main()
