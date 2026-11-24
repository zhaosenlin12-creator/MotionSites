# Arriving Tomorrow: Mix-and-Match Outfit Drop Post (exact recreation prompt)

Build a single-file, interactive, square (1:1) social-media post that teases a clothing drop.

On a flat light-grey card, a bold title reads "ARRIVING TOMORROW". Below it sits an oversized hoodie, with relaxed drawstring sweat shorts underneath, both shot as clean ghost-mannequin product photos, plus thin ‹ › arrows on the left and right.

- **Arrows:** clicking an arrow swaps the outfit to the next colourway. The hoodie slides out one way and the shorts the other, then the new pieces cross in from the opposite sides and land with a small tilt wobble.
- **Single piece:** tapping just the hoodie or just the shorts changes only that piece, and dragging a piece sideways swipes it.
- **Autoplay:** when idle, the post plays itself.

Every colour is made in code from one white hoodie photo and one white shorts photo.

Use plain HTML, CSS and vanilla JS in one file, with no libraries. Every value below is exact. Reproduce every string, number, timing and URL as written.

---

## 1. Page basics

- `<html lang="en">`, title `Arriving Tomorrow`, viewport `width=device-width,initial-scale=1`, charset utf-8.
- **Font (Google Fonts):** `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&display=swap`, with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin). The standalone version embeds the latin woff2 faces as base64 `@font-face` rules instead of the link.
- **Variables:** `--bg:#ececec`, `--ink:#111`.
- **Reset and base:**
  - Universal `box-sizing:border-box;margin:0;padding:0`.
  - `html,body` fill the height, `overflow:hidden`, background `--bg`.
  - body font `"Inter Tight","Helvetica Neue",Arial,sans-serif`, colour ink, antialiased, `user-select:none`.

## 2. Assets (all URLs exact)

Both images are transparent PNG cut-outs of WHITE garments with soft natural fabric folds, no logos and no text, served through the images.higgs.ai proxy (which sends `Access-Control-Allow-Origin: *`, so they work as CSS masks).

1. **White oversized pullover hoodie** (hood, kangaroo pocket, ribbed cuffs and hem; ghost-mannequin front view):
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_065532_0fd0b9b0-7f8e-4519-b490-6478519b5186.png&w=1200&q=88`
2. **White relaxed sweat shorts** (elastic waistband, drawstring; flat front view):
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_065534_5ab4e8d0-8d00-42b4-b0ac-6dc60ea7aac0.png&w=1200&q=88`

## 3. Layout

- **Card `#card`:** absolutely centred (translate -50%,-50%), overflow hidden, background `--bg`.
  - On load and resize: `s = min(innerWidth, innerHeight)`; the card is s × s with `font-size: s/100` px, so **1em = 1% of the card**.
- **Title `h1`:** "ARRIVING TOMORROW", absolute, full width at top 5.4%, centred. Inter Tight 600, 4.1em, letter-spacing -.035em, line-height 1.
- **Rows:** full width; `#top` at top 11% and 48% tall, `#bot` at top 58% and 36% tall.
- **Garment `.g`** (one per piece; a new element is created for each colour):
  - Absolute, top and bottom 0, left 50%, 46em wide, margin-left -23em, `cursor:grab`, `touch-action:pan-y`.
  - Filter `drop-shadow(0 .9em .7em rgba(0,0,0,.13)) drop-shadow(0 .15em .25em rgba(0,0,0,.08))`.
  - Inside: a `.hov` wrapper (absolute, inset -6%; transform transition .45s `cubic-bezier(.3,1.5,.5,1)`; on hover `translateY(-1.2%) scale(1.025)`) containing two layers:
    - **`.tint`:** inset 0, background-color = the colourway. It is masked by the garment image: `mask: url(<garment>) center/contain no-repeat`, with a `-webkit-` prefix too. The URL is passed through a `--m` custom property.
    - **`<img>`:** the same white garment, `object-fit:contain`, `mix-blend-mode:multiply`, `filter:url(#shade)`, no pointer events, not draggable.
  - **Shading filter:** declared once in a hidden inline SVG as `<filter id="shade" color-interpolation-filters="sRGB">` with feComponentTransfer, where R, G and B each use `type="gamma" exponent="2.6"`. This deepens the fabric folds so the multiplied colour keeps real shading. A contrast filter would wash the near-whites out.
- **Arrows:**
  - Buttons `#prev` (left 1.5em) and `#next` (right 1.5em): absolute, vertically centred, 9em × 12em, no background or border.
  - Each holds a 3.6em × 5.2em SVG chevron (viewBox 0 0 24 34). Paths: prev `M17 3 4 17l13 14`, next `M7 3l13 14L7 31`. No fill, currentColor stroke 2.2, round caps and joins.
  - Hover nudges the chevron .6em outward (.35s spring); `:active` scales it .85.

## 4. Colourways

- **Colours:**
  - sky `#8dd2ef`
  - lemon `#f6dc55`
  - grass `#46cc45`
  - lilac `#b29de4`
  - tang `#fa8430`
  - fuchsia `#ee4cb3`
  - cobalt `#1d84d2`
- **Sequences** (index advances independently per row):
  - TOPS: sky, grass, tang, fuchsia, lemon, sky, lilac, tang
  - BOTS: lemon, lilac, grass, cobalt, fuchsia, tang, sky, lemon
- Start at sky hoodie with lemon shorts.

## 5. Slide transition (WAAPI)

`slide(row, dir, delay, fromPct)`, where `dir` is +1 for next and -1 for previous.

- **Direction sign:** `sgn = dir` for the top row and `-dir` for the bottom row. Next sends the hoodie out to the left and the shorts out to the right, so the pieces cross.
- Advance that row's index (wrapping), create the new garment, and disable pointer events on the old one.
- **Old piece:** animates from `translateX(fromPct%) rotate(0)` to `translateX(-sgn·150%) rotate(-sgn·9deg)` over 520ms with `cubic-bezier(.55,0,.75,.35)`, fill forwards, then is removed.
- **New piece:** 1250ms with `cubic-bezier(.2,.75,.3,1)`, fill backwards. Keyframes:
  - 0: `translateX(sgn·150%) rotate(sgn·10deg)`
  - .42: the same (it waits off-card while the old piece leaves)
  - .78: `translateX(-sgn·3%) rotate(-sgn·3.5deg)`
  - .90: `translateX(sgn·.8%) rotate(sgn·1.4deg)`
  - 1: `none`
- **Both pieces (arrows and keys):** ignored if called within 700ms of the previous call. Otherwise run the top row at delay 0 and the bottom row at delay 110ms.
- **Keyboard:** ArrowRight is next and ArrowLeft is previous.

## 6. Single-piece interaction

On pointerdown on the current piece of a row, capture the pointer and track dx. While dragging, the piece follows with `translateX(dx/width·100%) rotate(dx/width·8deg)`. On pointerup:

- **Moved under 4px (a tap):** clear the transform and advance only that row (`slide(row, +1)`).
- **Dragged past 14% of its width:** slide that row. The direction is `-sign(p)` for the top row and `+sign(p)` for the bottom row, so dragging the hoodie left or the shorts right means next. The old piece starts from its dragged position.
- **Otherwise:** spring back to none over 450ms with `cubic-bezier(.3,1.6,.5,1)`.

## 7. Autoplay

- Track the last interaction time: any pointermove, click, tap, drag or key resets it.
- A 250ms timer loop checks it. If more than 3500ms have passed, advance both pieces, then backdate the timer by 1300ms so the next automatic change comes about 2.2 s later, like the original teaser loop.