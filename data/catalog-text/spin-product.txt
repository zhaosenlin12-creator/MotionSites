# Spin Product: 360° Drag-to-Rotate Fashion Product Page (exact recreation prompt)

Build a single-file, interactive fashion e-commerce product page for a fictional label, **OKTA/9**, on a flat pale cool-grey background.

In the centre, a full-body model stands in an oversized **metallic silver puffer jacket with a topographic contour-line print**, charcoal wide-leg jeans and silver sneakers. She is a real 360° turntable clip.

- **Rotate:** drag left or right to turn her a full circle. She coasts with inertia, and after 3 s idle she slowly spins on her own.
- **Notched white cards:** a product info card on the left and a size and buy card on the right, linked to the jacket by thin white connector lines.
- **Hotspots:** when she faces front, three pulsing "+" pins pop up on the jacket and open callouts on hover.
- **Look thumbnails:** front and back thumbnails spin her to that side.
- **Size selector:** a black highlight slides between sizes.
- **Accordion:** the [+] rows open one at a time.
- **Save:** toggles to "Saved".
- **Pre-order:** flies a thumbnail in an arc into the bag, which bounces as BAG/0 counts up.

Use plain HTML, CSS and vanilla JS in one file, with no libraries. Every value below is exact. Reproduce every string, number, timing and URL as written.

---

## 1. Page basics

- `<html lang="en">`, title `Spin Product`, viewport `width=device-width,initial-scale=1`, charset utf-8.
- **Fonts (Google Fonts):** `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@500&family=Tinos&display=swap`, with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin). The standalone version embeds the latin woff2 files as base64 `@font-face` rules instead.
- **Variables:** `--bg:#e2e4e8`, `--card:#fff`, `--ink:#111`, `--mute:#7b7e84`, `--chip:#eceef1`, `--line:#b9bcc2`.
- **Reset and base:**
  - Universal `box-sizing:border-box;margin:0;padding:0`.
  - `html,body` fill the height, `overflow:hidden`, background `var(--bg)`.
  - Body font `"IBM Plex Mono"`, ink colour, antialiased, no selection.
  - Buttons inherit the font, with no border or background.
- **Artboard `#art`:** a fixed 1500×1000 px board, absolutely positioned, `transform-origin:0 0`.
  - On load and resize: `K = min(innerWidth/1500, innerHeight/1000)`.
  - Place the board at `left: innerWidth/2`, `top: innerHeight/2` with `transform: scale(K) translate(-750px,-500px)`.

## 2. Asset (URL exact)

**Turntable clip:** Kling 4.0, image-to-video with the same start and end frame, 10.04 s, 24 fps, 732×1296, no audio.

- The camera orbits a full 360° around the model, who stands still with her hands in her pockets, on a uniform pale grey seamless backdrop.
- Frame 0 and the last frame are the same front view. The back view is at the midpoint.

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261107_112151_ae5c9a8f-07da-4b83-8dd8-47c762a5dfc0.mp4`

## 3. Header

- **`#logo` "OKTA/9":** left 28, top 18, Inter Tight 500 at 27px, letter-spacing −.01em.
- **`#crumb` "HOME > SHOP > COATS & JACKETS":** left 28, top 54, 11px, letter-spacing .03em.
- **Pills `.pill`:**
  - 35px tall, padding `0 17px`, white, radius 4px, 13px uppercase, letter-spacing .03em, no wrapping.
  - Notched corners: `clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))`.
  - Hover: `#f6f6f7`.
- **`#nav`:** centred at top 16 with a 6px gap: "Shop", "Collections", "Explore".
- **`#acct`:** right 28: a search icon (circle r7 plus a handle, stroke 2.6), "Log in", and "Bag/" followed by `<b id="count">0</b>`.
  - The bag bumps when an item lands: the count jumps 6px up at scale 1.4, over .5s `cubic-bezier(.3,1.8,.5,1)`.

## 4. Turntable `#stage`

- **Size and position:** left 480, top 70, 540×960, `cursor:grab` (`grabbing` while dragging), `touch-action:none`.
- **Media:** it holds the `<video id="vid" muted playsinline loop autoplay preload="auto" crossorigin="anonymous">` and a `<canvas id="cv">` (backing 1080×1920), both filling it.
  - Both are masked with `linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)` so the clip's edges melt into the page.
- **Frame cache:**
  - On `loadeddata`: `NF = round(duration·24)`.
  - An offscreen canvas is `min(720, videoWidth)` wide, keeping the aspect.
  - **Page background = the clip's own backdrop:** draw the first frame, read the pixel at (6, 6), and set `--bg` to it.
  - With `requestVideoFrameCallback`: turn loop off, play from 0, and on each callback store the frame `round(mediaTime·24)` as a JPEG blob (quality .88).
  - Otherwise, seek through every `i/24` and grab each frame on `seeked`.
  - When it ends (after 150 ms):
    1. Fill any gaps from a neighbouring frame.
    2. **Drop the last frame**, because it equals the first, giving a seamless loop of NF−1 frames.
    3. Hide the video and draw the thumbnails.
- **show():** decode the frame at `round(ang·NF) mod NF` with `createImageBitmap` and draw it cover-fitted. Only one decode runs at a time; it re-runs if the wanted frame changed meanwhile.
- **Angle `ang`:** 1 is one full turn.
  - **Drag:** `ang += −dx/K/900` per move. Velocity estimate: `v = d/max(8ms, Δt)·1000·.6 + v·.4`.
  - **On release:** `vel = clamp(v, −2.5, 2.5)` turns per second.
  - **When not dragging:** `idle` accumulates and any pointer move resets it. The target speed is .045 turns/s once idle exceeds 3 s, otherwise 0. `vel` eases to the target at a rate of `dt·.8` while auto-spinning and `dt·2.2` otherwise, and `ang += vel·dt`.
  - **spinTo(a):** tweens along the shortest way round to a, with easeInOutCubic over `900 + |Δ|·900` ms.
- **Readout `#deg`:** centred, bottom 62px, 11px, letter-spacing .06em, mute.
  - "DRAG TO ROTATE", then a 120px 1px bar in `--line` with a 7px ink dot at `ang·100%`, then the degrees as three digits plus "°", in ink.

## 5. Hotspots and callouts

Pins are positioned in fractions of the stage:

| Position | Title | Callout text |
|---|---|---|
| (.47, .22) | Two-way zip | Silver two-way zip with a sculpted pull, up to a tall stand collar. |
| (.38, .285) | Contour print | A topographic map printed edge to edge, so every panel shows a different ridge. |
| (.63, .385) | Hand-warmer pockets | Deep fleece-lined pockets set high for hands-in-pockets wear. |

- **Pin `.hs`:** a 22px white (.92) circle with a "+", a hairline ring and a soft shadow.
  - A pulsing outer ring (`ping`, 2.2s infinite) scales from .6 to 1.5 and fades out.
  - Pins are shown only while she **faces front**: within ±3.5% of a turn, not dragging, not tweening, and |vel| < .02.
  - They pop in (scale 0 → 1, .35s `cubic-bezier(.3,1.6,.5,1)`, staggered .08s) and scale back to 0 otherwise.
- **Callout `.tip`:** 210px white, padding `12px 14px`, 11px/1.45, with an uppercase 500 title.
  - It sits to the right of the pin when x > .5, otherwise to the left.
  - It wipes open with `clip-path: inset(0 100% 0 0)` → `inset(0)` over .45s `cubic-bezier(.65,0,.25,1)` on hover.
- **Connector lines (SVG over the board, white, width 2):**
  - `M438 395H562L592 362H618`
  - `M1105 600H962L937 478H900`
  
  They use `pathLength 1` and a dash of 1. When she faces front they draw in (dashoffset 1 → 0, .7s). When she turns away they retract (.35s).

## 6. Cards

Both cards are white with notched clip-path shapes like printed tickets:

- **`#info`:** `polygon(0 0, 130px 0, 140px 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 290px) calc(100% - 8px), calc(100% - 300px) 100%, 10px 100%, 10px 120px, 0 112px)`.
- **`#buy`:** `polygon(0 8px, 265px 8px, 275px 0, 100% 0, 100% calc(100% - 8px), 300px calc(100% - 8px), 290px 100%, 10px 100%, 10px calc(100% - 40px), 0 calc(100% - 48px))`.

**`#info`:** left 18, top 300, width 420, padding `36px 28px 26px 38px`.

- **Name:** "The contour lines<br>metallic puffer", 13px uppercase, letter-spacing .05em, line-height 1.45.
- **Then a row:** "€ 1.120" on the left, and a "PRE-ORDER" tag on the right (11px on `--chip`, padding `2px 4px`).
- **Accordion** (margin-top 22):
  - Each header is a full-width button with the label on the left and "[+]" on the right (shows "[−]" when open), 13px uppercase, padding 8px 0.
  - Each body animates `grid-template-rows` 0fr → 1fr over .45s `cubic-bezier(.65,0,.25,1)`.
  - Body text is Tinos 15.5px/1.38, with padding `4px 0 12px`.
  - Only one row is open at a time. Description starts open.

  | Row | Text |
  |---|---|
  | Description | Oversized puffer jacket in a liquid-silver ripstop, printed all over with a topographic contour map. Stand collar, two-way zip and deep hand-warmer pockets. Boxy, cropped fit. |
  | Materials | Shell: 100% recycled nylon with a metallic coating. Fill: 80/20 recycled down. Lining: 100% recycled polyester. |
  | Size guide | XS/S: chest 124 cm. M/L: chest 132 cm. XL/2XL: chest 140 cm. Cut wide; take your usual size for the intended volume. |
  | Packaging | Folded into a reusable drawstring sack and shipped in a recycled card box. No plastic. |
  | Shipping & returns | Pre-orders ship in 4–6 weeks. Free returns within 30 days of delivery. |

**`#buy`:** left 1105, top 385, width 375, padding `30px 26px 26px`.

- "SIZE" (13px, letter-spacing .05em).
- **Sizes:** a three-column grid with a 6px gap: XS/S, M/L (selected), XL/2XL. Each is 36px tall, 13px, on `--chip` tiles.
  - The selected size has white text over a black highlight `#hl`. The highlight slides to the clicked button: left and width over .45s `cubic-bezier(.65,0,.25,1)`.
- **Note:** "Model is 172 cm & wears size M/L. Size guide", 10.5px uppercase, mute, with "Size guide" underlined in ink.
- **Action row** (margin-top 22, gap 6), both black, 36px tall, 13px uppercase white:
  - **SAVE**, 62px wide: toggles "Saved" on `#3a3d44`.
  - **PRE-ORDER**, filling the rest: on click the label rolls up and "Added to bag" rolls in from below (.45s), and it reverts after 1.8s.
- **Note:** "Pay in 3 instalments at checkout. Learn more".

## 7. Looks

- **Position:** `#looks` at left 38, top 790: two 56px buttons, each with a 96×96 canvas.
  - One shows the front frame (angle 0), the other the back frame (angle .5).
  - Each crop is a centred square 62% of the frame width, starting 7% from the top.
- **Styling:** inactive thumbnails are greyscale at opacity .7. The active one is full colour, framed by four 7px black corner brackets.
- **Click:** marks it active and calls `spinTo(0)` or `spinTo(.5)`.

## 8. Add to bag

On a PRE-ORDER click:

1. A 60×80 white card, filled with the front thumbnail, is created at the button.
2. It animates in an arc (WAAPI, 900ms, `cubic-bezier(.5,0,.3,1)`, fill forwards): halfway up and towards the bag (scale .8, −8°), then into the BAG pill (scale .18, −14°).
3. A 900 ms timer then removes it.
4. The count goes up by 1 and the bag bumps.