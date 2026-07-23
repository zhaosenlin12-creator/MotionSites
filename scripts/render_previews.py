"""Render the SVG previews and HTML examples in this repo to PNG.

Requires Python 3.10+ and `playwright install chromium`.
The output PNGs are written to `docs/preview-png/` and overwrite any existing files.
SVG / HTML sources are not modified.

Usage:
    python scripts/render_previews.py
"""
from playwright.sync_api import sync_playwright
import pathlib

REPO = pathlib.Path(__file__).resolve().parent.parent
OUT = REPO / "docs" / "preview-png"
OUT.mkdir(parents=True, exist_ok=True)

SVGS = [
    "catalog-hero.svg", "prompt-card.svg", "categories.svg", "filters.svg",
    "search-spotlight.svg",
    "001-aurora-landing.svg", "002-glassmorphism-saas.svg",
    "003-magnetic-cta-hero.svg", "004-typewriter-hero.svg",
    "005-pricing-cards.svg", "006-feature-marquee.svg",
    "007-portfolio-grid.svg", "008-live-metrics-dashboard.svg",
    "009-scroll-storytelling.svg", "010-parallax-3d-layers.svg",
]

HTMLS = [
    "examples/hero-aurora.html",
    "examples/pricing-cards.html",
    "templates/starter.html",
]


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        for svg in SVGS:
            src = REPO / "docs" / "screenshots" / svg
            if not src.exists():
                print("missing", src); continue
            ctx = browser.new_context(viewport={"width": 1280, "height": 800})
            page = ctx.new_page()
            page.goto("file:///" + str(src).replace("\\", "/"), wait_until="load", timeout=10000)
            page.wait_for_timeout(100)
            png = OUT / svg.replace(".svg", ".png")
            page.screenshot(path=str(png), timeout=10000)
            print("rendered", png.name)
            ctx.close()

        for html in HTMLS:
            src = REPO / html
            if not src.exists():
                print("missing", src); continue
            ctx = browser.new_context(viewport={"width": 1280, "height": 800})
            page = ctx.new_page()
            page.goto("file:///" + str(src).replace("\\", "/"), wait_until="load", timeout=10000)
            page.wait_for_timeout(200)
            png = OUT / (pathlib.Path(html).stem + ".png")
            page.screenshot(path=str(png), full_page=True, timeout=10000)
            print("rendered", png.name)
            ctx.close()

        browser.close()


if __name__ == "__main__":
    main()
