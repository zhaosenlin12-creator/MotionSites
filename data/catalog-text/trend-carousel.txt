# Trend Carousel: Square Swipeable Design-Trends Post (exact recreation prompt)

Build a single-file, interactive, **square 1:1 Instagram carousel** of 7 slides for a fictional design studio, **HALFTONE.** The theme is "2026's biggest design trends aren't new".

1. **Cover:** a red-haired model in cream knitwear sits on a powder-blue backdrop, pointing down. The big word "Design" sits behind her and "*Trends*" in script overlaps her hair. A band of image cards scrolls left across her middle, in front of her.
2. **Slides 2–6, the five trends.** Each has a justified paragraph at the top, an overlapping collage of 4 images, a blue number and a big two-line heading:
   - 01 Surveillance Graphics
   - 02 Naive Illustration
   - 03 Punk/Grunge
   - 04 Curated Objects
   - 05 Distorted Portraits
3. **End card:** a sky-blue slide with "WHICH ONE BELONGS IN YOUR BRAND'S WORLD?", a short paragraph, "LET'S TALK" with a hand-drawn blue circle that draws itself, and the wordmark "HALFTONE.".

How you interact with it:

- **Changing slides:** drag or swipe between slides (rubber-banding at the first and last slide), use the round arrow buttons (shown on hover), the dots, or ← →.
- **On arrival:** each slide's collage wipes in one image after another, and its heading slides up.
- **Collage images:** you can drag them around like a moodboard; they lift and tilt while moving.
- **Cover band:** slows almost to a stop while hovered.

Use plain HTML, CSS and vanilla JS in one file, with no libraries. Every value below is exact. Reproduce every string, number, timing and URL as written.

---

## 1. Page basics

- `<html lang="en">`, title `Trend Carousel`, viewport `width=device-width,initial-scale=1`, charset utf-8.
- **Fonts (Google Fonts):** `https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500&family=Pinyon+Script&display=swap`, with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin). The standalone version embeds the Lexend (300/400/500) and Pinyon Script latin woff2 files as base64 `@font-face` rules instead.
- **Variables:** `--blue:#5f93cf`, `--paper:#f3f3f2`, `--ink:#151515`, `--accent:#2f62e0`.
- **Reset and base:**
  - Universal `box-sizing:border-box;margin:0;padding:0`.
  - `html,body` fill the height, `overflow:hidden`, background `#e7e8ea`.
  - Body font `"Lexend","Helvetica Neue",Arial,sans-serif`, ink colour, antialiased, no selection.
- **Post `#post`:** absolutely centred (translate -50%,-50%), a square of side `S = min(innerWidth, innerHeight)`, `font-size S/100` px (**1em = 1% of the side**). Overflow hidden, background paper, `touch-action:pan-y`, `cursor:grab` (`grabbing` while dragging).
- **Track `#track`:** absolute, inset 0, a flex row. Each `.slide` is `flex:0 0 100%`, full height, relative, overflow hidden, background paper.

## 2. Assets (all URLs exact)

1. **Cover photo (2048², powder-blue seamless studio):** a young woman with a copper-red bob, a fringe and thin silver glasses. She wears a cream open-knit cardigan, cream wide trousers, white socks and burgundy patent loafers. She sits cross-legged on the floor, right arm raised across her chest, index finger pointing down, eyes down.
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_110008_97f7187c-1b33-4746-ac94-dc00336495be.png&w=1600&q=88`
2. **Cut-out of the same model (transparent, the same 2048² frame, pixel-aligned):**
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_110121_f40c2be8-ab96-4085-a3aa-7314ae0f62d6.png&w=1600&q=88`
3. **Contact sheet A (2336×1744, a 4×3 grid of original images with white gutters):**
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_110010_4359ec6f-574d-413b-a403-0325ee9182ab.png&w=2336&q=88`
   - Cell column x-ranges: `[20,577] [599,1156] [1179,1737] [1757,2317]`
   - Cell row y-ranges: `[20,566] [587,1141] [1162,1719]`

   | Cell | Image |
   |---|---|
   | A0 | CCTV crowd still with a red tracking box and timestamp |
   | A1 | Overhead security photo of two people in suits at a café table, with red boxes |
   | A2 | Blue x-ray of a handbag and sneakers |
   | A3 | Thermal-camera figure with green corner brackets |
   | A4 | Crayon girl reading in a green armchair |
   | A5 | Crayon picnic with sun and cloud |
   | A6 | Woman holding vegetables with doodled fruit |
   | A7 | Scribbled orange and yellow paint poster with wobbly letters |
   | A8 | Photocopied zine with a skateboarder and blobby "BROKEN YOUTH" type |
   | A9 | Cut-out man in black with ink splatters |
   | A10 | Laughing glitter lips with ransom letters "DREAM" |
   | A11 | Halftone photocopy guitarist poster |
4. **Contact sheet B (same format):**
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_110011_7adeada8-687e-4c85-a9ff-d99b317441a8.png&w=2336&q=88`
   - Cell column x-ranges: `[22,576] [598,1157] [1178,1739] [1760,2314]`
   - Cell row y-ranges: `[19,573] [592,1147] [1164,1720]`

   | Cell | Image |
   |---|---|
   | B0 | Blue-and-white ceramics archive flat-lay |
   | B1 | Cobalt bottle, spoon, lemon and dried flowers |
   | B2 | Jelly sweets on a grey tray |
   | B3 | Scissors, key, comb and shells laid out on cream |
   | B4 | Shaved-head woman with a giant ear on blue |
   | B5 | Fisheye man with neon scribbles |
   | B6 | Fisheye grin with sunglasses and piercings |
   | B7 | Big-head girl in a grey cap on a street |
   | B8 | Man on a friend's shoulders in yellow sunglasses |
   | B9 | Woman in a blazer drinking coffee in an office |
   | B10 | Bust, sunflower and coast moodboard |
   | B11 | Lemons in a blue bowl on a green check cloth |

**paint(el, id, ew, eh, fx=.5, fy=.5)** crops one cell into an element:

1. Take the cell's box `x, y, w, h`, inset by 4px on every side.
2. Cover-crop it to the element's aspect `ew/eh`, using focus `fx, fy` to place the crop along the axis that is trimmed.
3. Set `background-image` to the sheet.
4. Set `background-size: (W/w·100)% (H/h·100)%`.
5. Set `background-position: (x/(W−w)·100)% (y/(H−h)·100)%`.

## 3. Cover slide (background `--blue`)

**Layers, back to front:**

1. The photo: `img.ph`, absolute, inset 0, cover.
2. `.kick` "2026's biggest": left 5.4%, top 8.6%, 2.55em, uppercase, letter-spacing .01em.
3. `.design` "Design": left 4.6%, top 11.4%, 11.2em, no case change, letter-spacing −.025em, line-height 1.
4. The **cut-out**: `img.ph`. Her arm and head cover parts of "Design".
5. `.script` "Trends": left 53%, top 5.4%, Pinyon Script 400 at 16em/1. It sits in front, over her hair.
6. `.arent` "Aren't<br>new": right 6.2%, top 27.6%, 3.05em, right-aligned.
7. **The band:** left 0, right 0, top 39.4%, height 29.4%, overflow hidden.
   - A `.row` flex with a .55em gap holds the cells `A1, B0, B8, A4, B9, A10, B11, A6`, twice over. Each card is 29.4em × 100%, painted square.
8. `.found` "They've<br>simply<br>found.": left 5.2%, top 72.4%, 3.05em.
9. `.nts` "New<br>things<br>to say": left 78.6%, top 72.4%, 3.05em.
10. A thin white arrow SVG (viewBox 0 0 100 40, path `M0 20H96M78 4l18 16-18 16`, stroke 1.6): right 6.5%, bottom 5.6%, width 9.5%.

All cover text is white Lexend 300, uppercase except where noted, line-height 1.16, `pointer-events:none`.

**Band motion (rAF):**

- `unit = (29.4+.55)·S/100`, `loop = unit·8`.
- `off = (off + unit/2.05·spd·dt) mod loop`, then `translateX(−off)`: one card every ~2.05 s.
- `spd` eases to .22 while the band is hovered and to 1 otherwise, at a rate of `dt·3`.

## 4. Trend slides

**Shared elements:**

- **`.copy`:** left and right 7.6%, top 7.4%, 2.28em/1.3, Lexend 300, justified.
- **`.num`:** left 7.6%, top 66.6%, 2.6em, weight 400, colour `--accent`.
- **`.head` (h2):** left 7.4%, top 71.2%, 8.75em, weight 400, uppercase, line-height 1.1, letter-spacing −.012em, z-index 1.
  - Each line is a span with overflow hidden around an `<i>` that starts at `translateY(105%)`.
  - When the slide gets `.on`, the `<i>` moves to none over .9s `cubic-bezier(.2,.75,.2,1)`; the second line is delayed .08s.
- **`.piece` (collage image):** absolute, painted, box-shadow `0 .25em .8em rgba(0,0,0,.08)`, `cursor:move`, `touch-action:none`.
  - It starts at `clip-path: inset(100% 0 0 0)` and wipes to `inset(0)` when the slide is `.on`: .8s `cubic-bezier(.65,0,.25,1)`, delay `.12 + k·.09` s.
  - While dragged (`.lift`): shadow `0 1.6em 3em rgba(0,0,0,.22)`, scale 1.04.

**Collage pieces** are `[cell, left%, top%, width%, height%, focusX, focusY]`.

**01 Surveillance / graphics.**
Copy: "Security-cam stills, timecodes and tracking boxes turn the act of watching into a visual language. It reads exact, a little uneasy and unmistakably online, which makes it a natural fit for tech, safety and culture brands."

| Cell | left | top | width | height | focus |
|---|---|---|---|---|---|
| A0 | 9 | 25 | 25.5 | 34 | .5, .3 |
| A3 | 18 | 53 | 15 | 19 | |
| A2 | 66 | 20 | 25 | 27 | |
| A1 | 50 | 36 | 27 | 36 | .5, .4 |

Extra: a thin yellow (`#f2c200`) outline square at left 33%, top 46%, 9%×9%.

**02 Naive / illustration.**
Copy: "Wobbly lines, odd proportions and quick, unplanned marks bring the warmth back. It has no interest in looking technically perfect; it feels playful, friendly and human, ideal for brands that want to seem looser and more open."

| Cell | left | top | width | height | focus |
|---|---|---|---|---|---|
| A6 | 8.5 | 23 | 22 | 30 | .5, .25 |
| A5 | 27 | 40 | 21 | 27 | |
| A7 | 51 | 23 | 32 | 41 | |
| A4 | 69 | 57 | 25 | 34 | |

Extra: a yellow (`#f3cf2a`) scribble SVG at left 21%, top 20%, 17%×14%, stroke 6 with round caps. Its paths:
- `M8 60C30 10 40 70 55 25S80 50 92 12`
- `M14 72C34 30 52 66 68 30`

**03 Punk/ / grunge.**
Copy: "Smudged type, xerox grain and ripped-paper layouts pull straight from homemade zines and gig flyers. Today that noise is how brands say independent, urgent and not interested in blending in."

| Cell | left | top | width | height | focus |
|---|---|---|---|---|---|
| A8 | 8 | 23 | 24 | 36 | |
| A9 | 28.5 | 29 | 24 | 40 | .5, .35 |
| A11 | 69 | 20 | 19 | 25 | |
| A10 | 63 | 54 | 27 | 36 | |

**04 Curated / objects.**
Copy: "Things are shot, scanned or drawn, then laid out like a private collection. Instead of one perfect hero image, brands build a world out of what they keep: ingredients, tools, references, products and the small details that show taste."

| Cell | left | top | width | height |
|---|---|---|---|---|
| B0 | 8 | 43.5 | 36 | 22 |
| B1 | 33 | 26 | 22 | 31 |
| B3 | 77 | 21 | 15.5 | 18 |
| B2 | 63 | 51 | 28 | 32 |

**05 Distorted / portraits.**
Copy: "Stretched faces, warped proportions and digital edits turn a familiar portrait into something you can't scroll past. The distortion adds humour, tension and a touch of the surreal, a sharper way for fashion, music and culture brands to show who they are."

| Cell | left | top | width | height | focus |
|---|---|---|---|---|---|
| B4 | 8 | 22 | 29 | 32 | .35, .4 |
| B5 | 36 | 40 | 22 | 27 | |
| B6 | 64 | 20 | 30 | 31 | |
| B7 | 69 | 52 | 27 | 44 | .5, .3 |

## 5. End card

- **Background:** `linear-gradient(180deg, #86b1e2 0%, #a5c6ec 48%, #d4e3f3 100%)`, white text.
- **Faint grid:** one vertical line at 8.6% and one horizontal line at 42%, each 1px `rgba(255,255,255,.16)`.
- **h2** "Which one<br>belongs in your<br>brand's world?": left 13.4%, top 10%, 7.4em, weight 300, line-height 1.08, uppercase, letter-spacing −.01em.
- **p:** left 13.4%, width 55%, top 50.4%, 3.55em/1.24, weight 300, justified.
  Text: "Spotting a trend is easy. Deciding what to take, what to skip and how to make it feel like yours is the real design work."
- **`.cta`** "Let's talk": left 13.4%, top 83.6%, 3.6em, weight 300, uppercase, `cursor:pointer`. On hover it wiggles: rotate −2° then 2°, over .5s.
  - Inside it, an SVG at left −20%, top −62%, width 150%, height 220% (viewBox 0 0 200 80, `preserveAspectRatio="none"`).
  - One hand-drawn loop path with `pathLength="1"`: `M150 14C112 2 34 6 12 30c-18 20 22 38 82 38 62 0 104-12 102-32C194 16 140 8 96 10 58 12 28 20 22 28`.
  - Stroke `#2d6ee8`, width 3.2, round caps, `stroke-dasharray:1`, `stroke-dashoffset:1`.
  - When the slide is `.on`, the offset goes to 0 over 1.1s `cubic-bezier(.6,0,.2,1)` after .35s, so the circle draws itself.
- **`.brand`** "HALFTONE.": right 6.6%, top 84.6%, 2.7em, weight 500, letter-spacing .18em.

## 6. Chrome and controls

- **Arrows `#prev` and `#next`:** round white `rgba(255,255,255,.88)` buttons, 6.4em, at left and right 2.4%, vertically centred.
  - Chevron SVG with stroke 2, shadow `0 .3em 1.2em rgba(0,0,0,.12)`, z-index 5.
  - Hidden until the post is hovered (opacity .3s); hidden at the ends; scale .92 while pressed.
- **Dots `#dots`:** bottom 2.6%, centred, gap 1.1em. 1.25em circles in `rgba(255,255,255,.55)`; the active one is white at scale 1.25.
  - On light slides (classes `#post.light`, slides 2–6), dots are `rgba(0,0,0,.18)` and the active one is ink.
  - Clicking a dot goes to its slide.
- **go(i):**
  1. Clamp i, reset the drag offset, and animate the track to `translateX(−cur·S)` over .62s `cubic-bezier(.22,.8,.2,1)`.
  2. Give the current slide `.on` and remove it from the others, which replays that slide's entrance.
  3. Update the dots, the `light` class and the arrow disabled states.
- **Swipe:**
  - pointerdown on the post (not on the arrows, dots or a piece) records x, y and time, and captures the pointer.
  - After 6px the gesture locks to horizontal or vertical. A horizontal gesture moves the track live, with a .28 resistance past the first and last slide.
  - On release, it changes slide if the distance is over 18% of S or the speed is over .45 px/ms; otherwise it springs back.
- **Piece drag:** pointerdown on a piece of the current slide lifts it and raises its z-index.
  - Moving updates left and top in % of the slide, and rotates it by `clamp(dx/40, −6°, 6°)`.
  - On release it drops (rotation back to 0).
- **Keys:** ← and → change slide.
- **Resize:** recompute S and place the track without animation.