"""Render 1280x800 webp covers for awesome-web-prompts records that ship an index.html demo.

The demo is served over loopback (module imports need http, not file://), given time for
web fonts and the entrance animation to settle, and captured at 1280x800. Output goes to
assets/community/awp/<slug>/preview.webp so it matches every other community cover.

Usage:
    python scripts/render_awp_previews.py --all
    python scripts/render_awp_previews.py --slugs autumn-fox,axon
"""
import argparse
import functools
import http.server
import pathlib
import socketserver
import threading

from PIL import Image
from playwright.sync_api import sync_playwright

REPO = pathlib.Path(__file__).resolve().parent.parent
SRC = REPO / ".work" / "awp"
OUT = REPO / "assets" / "community" / "awp"
W, H = 1280, 800
PORT = 8137
# Demos that open on a colour field and advance like a deck: how many slides to skip.
SLIDE_DECKS = {"protein-bars": 2}


def records():
    for readme in sorted(SRC.rglob("README.md")):
        d = readme.parent
        if (d / "index.html").exists():
            yield d


def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(SRC))
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    httpd.RequestHandlerClass.log_message = lambda *a, **k: None
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return httpd


def cover(png: pathlib.Path, dest: pathlib.Path):
    im = Image.open(png).convert("RGB")
    scale = max(W / im.width, H / im.height)
    nw, nh = max(W, round(im.width * scale)), max(H, round(im.height * scale))
    im = im.resize((nw, nh), Image.LANCZOS)
    left, top = (nw - W) // 2, (nh - H) // 2
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.crop((left, top, left + W, top + H)).save(dest, "WEBP", quality=82, method=6)


def trim_uniform(im):
    """Crop trailing rows/columns that are uniform with the corner colour (a band on an empty page)."""
    import numpy as np

    arr = np.asarray(im, dtype=int)
    ref = arr[0, 0]
    diff = np.abs(arr - ref).sum(axis=2)
    rows = np.where(diff.max(axis=1) > 18)[0]
    cols = np.where(diff.max(axis=0) > 18)[0]
    if not len(rows) or not len(cols):
        return im
    return im.crop((int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1))


def band_cover(png: pathlib.Path, dest: pathlib.Path):
    """Compose a short element (a footer band) onto a 1280x800 canvas of its own edge colour."""
    raw = Image.open(png).convert("RGB")
    bg = raw.getpixel((min(3, raw.width - 1), min(3, raw.height - 1)))
    im = trim_uniform(raw)
    canvas = Image.new("RGB", (W, H), bg)
    if im.width > W:
        im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
    canvas.paste(im, ((W - im.width) // 2, (H - im.height) // 2))
    dest.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dest, "WEBP", quality=82, method=6)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--slugs", default="")
    args = ap.parse_args()
    only = {s for s in args.slugs.split(",") if s}

    targets = [d for d in records() if not only or d.name in only]
    print("rendering", len(targets), "covers")
    httpd = serve()
    ok, bad = 0, []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(args=["--no-sandbox", "--hide-scrollbars", "--mute-audio"])
            ctx = browser.new_context(viewport={"width": W, "height": H}, device_scale_factor=1,
                                      reduced_motion="no-preference")
            page = ctx.new_page()
            # Footer demos are a band pinned to the bottom of a 100vh page. Capture them in a
            # short viewport so the band fills the frame instead of floating in empty space.
            ctx_band = browser.new_context(viewport={"width": W, "height": 460}, device_scale_factor=1,
                                           reduced_motion="no-preference")
            page_band = ctx_band.new_page()
            for d in targets:
                is_footer = "footer" in d.as_posix().lower() or "footer" in d.name
                pg = page_band if is_footer else page
                rel = d.relative_to(SRC).as_posix()
                url = f"http://127.0.0.1:{PORT}/{rel}/index.html"
                try:
                    pg.goto(url, wait_until="load", timeout=45000)
                    pg.wait_for_timeout(1500)
                    # Some demos gate the page behind an intro overlay ("Skip intro", "Enter").
                    # A real pointer click is required: a synthetic event is ignored by several
                    # of these handlers.
                    for _ in range(3):
                        if not pg.evaluate("() => document.body.className.includes('locked')"):
                            break
                        clicked = False
                        for label in ["Skip intro", "SKIP INTRO", "Skip", "Enter", "Begin", "Start"]:
                            loc = pg.get_by_role("button", name=label, exact=False)
                            if loc.count():
                                try:
                                    loc.first.click(timeout=2500)
                                    clicked = True
                                    break
                                except Exception:
                                    pass
                        if not clicked:
                            break
                        pg.wait_for_timeout(900)
                    # A few demos keep `body.locked` until their canvas intro finishes; the card
                    # shows the design, not the intro, so drop the lock and hide the overlay.
                    pg.evaluate("""() => {
                        document.body.classList.remove('locked');
                        document.documentElement.classList.remove('locked');
                        for (const el of document.querySelectorAll('[class*=intro], [id*=intro], .preloader, .loader')) {
                            const st = getComputedStyle(el);
                            if (st.position === 'fixed' || st.position === 'absolute') el.style.display = 'none';
                        }
                        document.body.style.overflow = 'auto';
                    }""")
                    pg.wait_for_timeout(500)
                    # protein-bars opens on a bare colour field and advances like a deck.
                    if d.name in SLIDE_DECKS:
                        for _ in range(SLIDE_DECKS[d.name]):
                            pg.keyboard.press("ArrowRight")
                            pg.wait_for_timeout(700)
                    tmp = REPO / ".work" / "_awp_shot.png"
                    dest = OUT / d.name / "preview.webp"
                    pg.screenshot(path=str(tmp))
                    if is_footer:
                        band_cover(tmp, dest)
                    else:
                        cover(tmp, dest)
                    entry, fonts = page.evaluate("""() => [performance.getEntriesByType('resource').length,
                        document.fonts ? document.fonts.size : 0]""")
                    ok += 1
                    print(f"  ok {d.name}  resources={entry} fonts={fonts}  {dest.stat().st_size // 1024} KB")
                except Exception as exc:  # one bad demo must not abort the batch
                    bad.append((d.name, str(exc)[:120]))
                    print(f"  FAIL {d.name}: {str(exc)[:120]}")
            browser.close()
    finally:
        httpd.shutdown()
    print("done", ok, "failed", len(bad))


if __name__ == "__main__":
    main()
