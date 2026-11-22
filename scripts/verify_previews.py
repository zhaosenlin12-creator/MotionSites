"""Full preview sweep: load the catalog, force every card into view, and prove each preview renders.

The grid is progressive + IntersectionObserver-armed, so the page is scrolled in viewport steps until
the card count stops growing, then every <img> is checked for a decoded frame and every failed request
is collected. Run it against a local server before a deploy, and against the live URL after one.

Usage: python scripts/verify_previews.py [--url http://127.0.0.1:8140/index.html] [--expect 545]
"""
import argparse
import pathlib
import subprocess
import sys
import time

from playwright.sync_api import sync_playwright

REPO = pathlib.Path(__file__).resolve().parent.parent
PORT = 8140


def serve():
    return subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"],
                            cwd=str(REPO), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def sweep(page, expect):
    seen = 0
    stable = 0
    for _ in range(240):
        page.mouse.wheel(0, 2600)
        page.wait_for_timeout(120)
        n = page.evaluate("() => document.querySelectorAll('.card:not(.skeleton)').length")
        if n == seen:
            stable += 1
            if stable >= 6 and n >= expect:
                break
        else:
            stable = 0
            seen = n
    page.wait_for_timeout(1200)
    page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1200)
    return page.evaluate("() => document.querySelectorAll('.card:not(.skeleton)').length")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", default="")
    ap.add_argument("--expect", type=int, default=545)
    args = ap.parse_args()
    url = args.url
    server = None
    if not url:
        server = serve()
        time.sleep(1.5)
        url = f"http://127.0.0.1:{PORT}/index.html"
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(args=["--no-sandbox"])
            pg = b.new_context(viewport={"width": 1440, "height": 1000}).new_page()
            errors, failed = [], []
            pg.on("pageerror", lambda e: errors.append(str(e)))
            pg.on("console", lambda m: errors.append("console:" + m.text[:140]) if m.type == "error" else None)
            pg.on("requestfailed", lambda r: failed.append(r.url))
            pg.on("response", lambda r: failed.append(f"{r.status} {r.url}") if r.status >= 400 else None)
            pg.goto(url, wait_until="networkidle", timeout=60000)
            pg.wait_for_timeout(800)
            cards = sweep(pg, args.expect)
            stats = pg.evaluate("""() => {
                const imgs = [...document.querySelectorAll('.card img')];
                const vids = [...document.querySelectorAll('.card video')];
                const broken = imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src).slice(0, 10);
                const tiny = imgs.filter((i) => i.naturalWidth > 0 && i.naturalWidth < 200).length;
                return { imgs: imgs.length, vids: vids.length, broken, tiny,
                         decoded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length };
            }""")
            print("url:", url)
            print("cards:", cards, "| images:", stats["imgs"], "decoded:", stats["decoded"],
                  "| videos:", stats["vids"], "| tiny(<200px):", stats["tiny"])
            if stats["broken"]:
                print("BROKEN:", stats["broken"])

            # Every card carries its media URL on the .media node (data-src / data-poster), whether or
            # not the loader has armed it yet. HEAD them all so the sweep covers 100% of the grid.
            urls = pg.evaluate("""() => {
                const out = new Set();
                for (const el of document.querySelectorAll('.card .media')) {
                    for (const a of ['data-src', 'data-poster']) {
                        const v = el.getAttribute(a);
                        if (v) out.add(v);
                    }
                }
                return [...out];
            }""")
            print("media urls:", len(urls))
            bad = []
            for i in range(0, len(urls), 40):
                chunk = urls[i:i + 40]
                res = pg.evaluate("""async (list) => {
                    const out = [];
                    for (const u of list) {
                        try {
                            const r = await fetch(u, { method: 'GET', headers: { Range: 'bytes=0-1' }, cache: 'no-store' });
                            if (r.status !== 200 && r.status !== 206) out.push([r.status, u]);
                        } catch (e) { out.push(['ERR', u]); }
                    }
                    return out;
                }""", chunk)
                bad.extend(res)
            print("url check failures:", len(bad), bad[:6])

            # Our own probe requests are not site failures: drop them from the listener's list.
            base = url.rsplit('/', 1)[0] + '/'
            probe_abs = {base + u for u in urls}
            real_failed = [f for f in failed if not any(f.endswith(p) or f.endswith(p.split('/', 3)[-1]) for p in probe_abs)]
            print("page errors:", len(errors), errors[:4])
            print("failed requests (site):", len(real_failed), real_failed[:6])
            ok = (not stats["broken"] and not real_failed and not errors and not bad
                  and cards >= args.expect and len(urls) >= args.expect)
            print("SWEEP", "OK" if ok else "FAIL")
            b.close()
            return 0 if ok else 1
    finally:
        if server:
            server.terminate()


if __name__ == "__main__":
    sys.exit(main())
