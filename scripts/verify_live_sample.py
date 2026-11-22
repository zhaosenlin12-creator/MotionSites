"""Sample-decode check against a deployed site: 40 previews spread across the catalog.

Isolates "does the asset decode" from "does the page load 545 of them on this link".
Loads each URL into a fresh Image() in a blank page, sequentially, and reports decode + bytes.

Usage: python scripts/verify_live_sample.py --base https://host/path/ [--n 40]
"""
import argparse
import json
import random

from playwright.sync_api import sync_playwright


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True)
    ap.add_argument("--n", type=int, default=40)
    args = ap.parse_args()
    base = args.base if args.base.endswith("/") else args.base + "/"

    meta = json.load(open("data/catalog-meta.json", encoding="utf-8"))
    step = max(1, len(meta) // args.n)
    picks = meta[::step][: args.n]
    urls, skipped = [], 0
    for r in picks:
        kind = (r.get("local_kind") or "").lower()
        rel = (r.get("local_rel") or "").lower()
        if kind in ("mp4", "webm", "hls") or rel.endswith((".mp4", ".webm", ".mov", ".m3u8")):
            # A video preview is checked through its webp poster: an <img> cannot decode an mp4.
            poster = r.get("poster_rel")
            if poster:
                urls.append(poster)
            else:
                skipped += 1
        else:
            urls.append(r.get("poster_rel") or r.get("local_rel"))
    urls = [u for u in urls if u]
    print("image candidates:", len(urls), "| video cards without poster skipped:", skipped)

    with sync_playwright() as p:
        b = p.chromium.launch(args=["--no-sandbox"])
        pg = b.new_context(viewport={"width": 900, "height": 700}).new_page()
        pg.goto(base, wait_until="domcontentloaded", timeout=60000)
        res = pg.evaluate("""async (list) => {
            const out = [];
            for (const u of list) {
                const t0 = performance.now();
                out.push(await new Promise((resolve) => {
                    const img = new Image();
                    let done = false;
                    const finish = (state) => { if (!done) { done = true; resolve([state, u, img.naturalWidth, Math.round(performance.now() - t0)]); } };
                    img.onload = () => finish('ok');
                    img.onerror = () => finish('err');
                    img.src = u;
                    setTimeout(() => finish('timeout'), 20000);
                }));
            }
            return out;
        }""", [base + u for u in urls])

        ok = [r for r in res if r[0] == "ok" and r[2] > 0]
        bad = [r for r in res if not (r[0] == "ok" and r[2] > 0)]
        print("base:", base)
        print("sampled:", len(res), "| decoded:", len(ok), "| failures:", len(bad))
        for r in bad[:10]:
            print("  FAIL", r)
        if ok:
            times = sorted(r[3] for r in ok)
            print("decode ms: min %d / median %d / max %d" % (times[0], times[len(times) // 2], times[-1]))
        print("SAMPLE", "OK" if not bad else "FAIL")
        b.close()


if __name__ == "__main__":
    main()
