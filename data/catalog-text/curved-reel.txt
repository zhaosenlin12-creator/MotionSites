# HERO PROMPT — "Norro." Curved Showreel (exact recreation brief)

Build a **single self-contained `index.html`** (inline `<style>` and one inline `<script>`, no build step, no framework, no external JS libraries) for a fictional Nordic film studio called **Norro.**. The page is a dark, full-viewport, non-scrolling showreel: a **WebGL2 fragment shader** draws a horizontal reel of 16:9 film stills bent onto a **concave cylinder** (as if seen from inside a curved cinema screen). Huge condensed uppercase project titles roll at the bottom-left, Next/Prev buttons sit bottom-right, a custom red-dot cursor says "View project", clicking the centre opens a **case view** that wipes down over the reel, a white **Read more** card slides in from the right, an **index overlay** shows an infinite skewed project list, and a **light theme** toggle recolours everything including the shader background.

Everything below is the specification. Follow every value exactly. Do not invent extra sections, scrolling content, loaders, footers or extra animations.

---

## 1. Document, fonts, global tokens

- `<!doctype html>`, `lang="en"`, `<meta charset="utf-8">`, viewport `width=device-width,initial-scale=1`, `<title>Norro.</title>`.
- Google Fonts: preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin), then load **Anton** (regular) and **Inter** weights **400, 500, 600** with `display=swap` in one stylesheet link (`family=Anton&family=Inter:wght@400;500;600`).
- CSS custom properties on `:root` (dark is the default):

| Token | Dark (default) | Light (`body.light`) |
|---|---|---|
| `--bg` | `#000` | `#f3f2ef` |
| `--fg` | `#f4f2ee` | `#0c0c0c` |
| `--mute` | `#6f6d69` | `#9a9893` |
| `--line` | `rgba(244,242,238,.16)` | `rgba(12,12,12,.14)` |
| `--red` | `#ff2b2b` | (unchanged) |
| `--ease` | `cubic-bezier(.7,0,.2,1)` | — |
| `--out` | `cubic-bezier(.2,.8,.2,1)` | — |

- Global reset: every element `box-sizing:border-box; margin:0; padding:0`.
- `html, body`: height 100%, `overflow:hidden` (the page never scrolls), background `var(--bg)`, `transition: background .6s`.
- `body`: font-family `"Inter","Helvetica Neue",Arial,sans-serif`, colour `var(--fg)`, `-webkit-font-smoothing:antialiased`, `user-select:none` (+ `-webkit-user-select:none`), **`cursor:none`** (the native cursor is hidden everywhere; a custom cursor replaces it).
- When the body has class `grab` (during a drag), `body.grab` and all its descendants also get `cursor:none`.
- `button`: inherits font and colour, transparent background, no border, `cursor:none`.
- Utility class **`.ui`**: font-size **10px**, weight **500**, letter-spacing **.08em**, `text-transform:uppercase`.
- Utility class **`.big`** (display type): font-family `"Anton","Impact",sans-serif`, weight 400, uppercase, letter-spacing **-.005em**, line-height **.9**.

### Z-order (bottom to top)

| Layer | Element | z-index | Position |
|---|---|---|---|
| WebGL reel canvas | `canvas#gl` | 1 | fixed, inset 0, 100%×100%, `touch-action:none` |
| Home overlay (titles + next controls) | `section#home` | 5 | fixed inset 0, `pointer-events:none` |
| Case view | `section#case` | 10 | fixed inset 0 |
| Top bar | `header#top` | 30 | fixed top |
| Index overlay | `section#idx` | 40 | fixed inset 0 |
| Custom cursor | `div#cur` | 100 | fixed, `pointer-events:none` |

---

## 2. Assets (copy verbatim)

There are exactly two media assets.

**SHEET** — one 3840×2160 image containing sixteen 16:9-ish stills in a 4×4 grid separated by thin black gutters:

```
https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_070809_9454266a-bcc7-474e-854a-bc5770e5ceb3.png&w=3840&q=88
```

**VIDEO** — a looping harbour-at-night clip (muted, looped, inline):

```
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_070920_ba374cc6-355a-4d14-84c6-1d40d14db660.mp4
```

### Sheet geometry

- Sheet size constants: `SW = 3840`, `SH = 2160`.
- Column x-origins `CX = [4, 972, 1932, 2891]`, column widths `CW = [945, 937, 936, 945]`.
- Row y-origins `CY = [4, 551, 1088, 1617]`, row heights `CH = [524, 514, 506, 539]`.
- Cell index `k` runs 0–15 row-major: column = `k mod 4`, row = `floor(k / 4)`. The rectangle of cell k is `[CX[k mod 4], CY[floor(k/4)], CW[k mod 4], CH[floor(k/4)]]` in sheet pixels.

Full cell table (x, y, w, h in sheet px):

| k | x | y | w | h | | k | x | y | w | h |
|---|---|---|---|---|---|---|---|---|---|---|
| 0 | 4 | 4 | 945 | 524 | | 8 | 4 | 1088 | 945 | 506 |
| 1 | 972 | 4 | 937 | 524 | | 9 | 972 | 1088 | 937 | 506 |
| 2 | 1932 | 4 | 936 | 524 | | 10 | 1932 | 1088 | 936 | 506 |
| 3 | 2891 | 4 | 945 | 524 | | 11 | 2891 | 1088 | 945 | 506 |
| 4 | 4 | 551 | 945 | 514 | | 12 | 4 | 1617 | 945 | 539 |
| 5 | 972 | 551 | 937 | 514 | | 13 | 972 | 1617 | 937 | 539 |
| 6 | 1932 | 551 | 936 | 514 | | 14 | 1932 | 1617 | 936 | 539 |
| 7 | 2891 | 551 | 945 | 514 | | 15 | 2891 | 1617 | 945 | 539 |

Every image crop on the page (reel tiles, gallery frames, rail thumbnails, index thumbnail) is cut from this one sheet using these rectangles. No other images are loaded.

### Cells per project and the reel tile order

| Project index | Title | Sheet cells (in this order) |
|---|---|---|
| 0 | Night Harbour | 1, 0, 2, 3 |
| 1 | The Last Light | 4, 5 |
| 2 | Salt & Iron | 6, 7 |
| 3 | Northbound | 8, 9 |
| 4 | Quiet Machines | 10, 11 |
| 5 | Ferry Songs | 12, 13, 14, 15 |

- The reel is all projects' cells concatenated in that order: **16 tiles**, T = 16. Tile list: `[1,0,2,3, 4,5, 6,7, 8,9, 10,11, 12,13,14,15]`, each tile remembering its project index.
- Project start tile `PSTART = [0, 4, 6, 8, 10, 12]`, lengths `PLEN = [4, 2, 2, 2, 2, 4]`.
- **Tile 0 of the reel (Night Harbour's first cell, sheet cell 1) is the VIDEO**: when the video has decoded data (`readyState >= 2`) that tile shows the live video texture instead of sheet cell 1; before that it shows sheet cell 1 as a poster.
- The "resting centre" of project i is reel coordinate `PSTART[i] + 0.5` — i.e. each project rests with its **first (lead) tile exactly centred** on screen.
- The reel is infinite: tile indices wrap modulo 16.

---

## 3. Project data (all text verbatim)

Six projects. Fields: title `t`, cells `c`, category `cat`, `year`, `client`, stat value `stat`, stat label `sl`, `lead`, strategy `s1`, storytelling `s2`.

### 0 — Night Harbour
- cells: 1, 0, 2, 3
- cat: `Documentary · Series · 6 episodes`
- year: `2025`
- client: `Coastal Film Fund`
- stat: `2.4M` — label: `Views`
- lead: `Night Harbour follows the last night-shift fishing crews of a northern port for one winter, from the first frost to the spring thaw.`
- s1: `We embedded with three crews for four months and shot only between dusk and dawn, letting the sodium lamps, neon and work lights set the palette of the whole series.`
- s2: `Each episode is built around one object on the boat. A net, a rope, a radio, a lamp. Small things that carry a family history and a disappearing way of life.`

### 1 — The Last Light
- cells: 4, 5
- cat: `Short film · Commission`
- year: `2024`
- client: `Northern Heritage Trust`
- stat: `31` — label: `Festivals`
- lead: `A portrait of the final lighthouse keeper on the coast, recorded during his last month before the tower went fully automatic.`
- s1: `The film was lit almost entirely by the beam itself, timed to its eight-second rotation.`
- s2: `One location, one voice, no score until the very last minute.`

### 2 — Salt & Iron
- cells: 6, 7
- cat: `Brand film · Campaign`
- year: `2024`
- client: `Varvet Shipyards`
- stat: `+64%` — label: `Applications`
- lead: `A recruitment campaign for a century-old shipyard, made with the welders, riggers and painters who build its hulls.`
- s1: `Every role in the film is played by the person who actually does the job.`
- s2: `Shot on the night shift, when the dock is loudest and the sparks are brightest.`

### 3 — Northbound
- cells: 8, 9
- cat: `Documentary · Feature`
- year: `2023`
- client: `Rail North`
- stat: `1.1M` — label: `Streams`
- lead: `Twelve passengers, one overnight train, eleven hundred kilometres of snow. A feature-length journey told from inside the carriages.`
- s1: `We rode the line twenty-two times to cast the people on board.`
- s2: `The edit follows the timetable minute by minute, station to station.`

### 4 — Quiet Machines
- cells: 10, 11
- cat: `Podcast · Video series`
- year: `2023`
- client: `Tekno Archive`
- stat: `48` — label: `Episodes`
- lead: `Conversations with the engineers who keep old machines alive, from analog studios to the cold halls of the internet.`
- s1: `Every episode is recorded on the machine it is about.`
- s2: `Long takes, real sound, no music beds.`

### 5 — Ferry Songs
- cells: 12, 13, 14, 15
- cat: `Music film · Live`
- year: `2025`
- client: `Fjord Line Arts`
- stat: `100 000€+` — label: `Raised`
- lead: `A youth choir, a cellist and a ferry crossing the fjord at night. A live concert filmed in one continuous voyage.`
- s1: `The ferry kept its normal timetable. Passengers became the audience.`
- s2: `Recorded with forty microphones spread from the car deck to the bridge.`

Shared credits paragraph used in every Read more card (verbatim): `Directed by Norro. Cinematography, sound and edit in house. Colour at Norro. Grade.`

---

## 4. Top bar (`header#top`)

- Fixed, left 0, right 0, top 0, height **54px**, `display:flex; align-items:center`, horizontal padding **0 1.6vw**, z-index 30, `transition: opacity .4s`. Transparent background. It stays visible on home and in the case view (the index overlay covers it).
- Left to right:
  1. **Logo** `Norro.` — Inter **20px**, weight **600**, letter-spacing **-.04em**, margin-right **4.2vw**. Not uppercase.
  2. **Nav** (`.ui`, flex, gap **22px**): three buttons `Home`, `About`, `Works`. Each at opacity **.45**, `transition: opacity .25s`; `Home` has class `on` (opacity 1) and hover also gives opacity 1. `Works` opens the index overlay. `About` and `Home` do nothing.
  3. Right cluster (`.ui`, `margin-left:auto`, flex, align centre, gap **16px**):
     - **Language** switch: `EN` and `FI` as `<b>` elements, flex gap **6px**, weight 500, opacity **.4**; `EN` has `on` → opacity 1. Non-functional.
     - **Theme button** (`.ico`, aria-label "Theme"): 22×22px, `display:grid; place-items:center`, `border-radius:50%`, `border:1px solid var(--line)`. Inside an 11×11px SVG (viewBox 0 0 24 24): a half-filled circle — the **left half** filled with currentColor (a path from (12,3) arcing radius 9 around the left side to (12,21) and closing) plus a full circle outline r=9 centred at 12,12, stroke currentColor width 2, no fill. Toggles light theme.
     - **Index button** (`.ico`, aria-label "Index"): same 22px round outline, containing a `.dots` grid of **2×2** dots. Opens the index overlay.
- `.dots` component (reused): `display:grid; grid-template-columns:3px 3px; gap:3px`; each dot `<i>` is 3×3px, `background:currentColor`, `border-radius:50%`.

---

## 5. WebGL curved reel (`canvas#gl`)

### 5.1 Setup

- Get a **WebGL2** context with `antialias:false, premultipliedAlpha:false`.
- One full-screen **triangle** (vertices (-1,-1), (3,-1), (-1,3)) as a single 2D attribute; the vertex shader just passes the position. All work happens in the fragment shader (GLSL ES 3.00, `precision highp float`).
- **Device pixel ratio cap 1.5**: on load and on every `resize`, `d = min(devicePixelRatio, 1.5)`; canvas backing size = `innerWidth*d × innerHeight*d`; CSS size stays 100%×100%; update the GL viewport. Keep `W = innerWidth`, `H = innerHeight` in CSS px. The resize handler also re-lays-out the case gallery.
- Two textures, both `CLAMP_TO_EDGE` on S and T, `LINEAR` min/mag filters, each initialised to a **1×1 opaque black pixel** so the shader works before anything loads:
  - Texture unit 0 = the **SHEET** image (load with `crossOrigin='anonymous'`). On load upload it, **generate mipmaps** and switch the min filter to `LINEAR_MIPMAP_LINEAR`. No Y-flip on upload (texture v = 0 is the top of the image).
  - Texture unit 1 = the **VIDEO**: a `<video>` element created in JS (not in the DOM), `crossOrigin='anonymous'`, `muted`, `loop`, `playsInline`, `src = VIDEO`, `play()` immediately (swallow promise rejection). Every animation frame, if `video.readyState >= 2`, re-upload the current video frame into texture unit 1.
- Uniform arrays sized to T = 16:
  - `uCell[16]` (vec4): for each reel tile, its sheet rectangle **normalised**: `(x/SW, y/SH, w/SW, h/SH)`.
  - `uIsVid[16]` (float): 1 for tile 0, 0 for the rest.
- Scalar uniforms per frame: `uRes` (backing px), `uPos` (reel position in tiles), `uTheta`, `uH` (half-height of the centre strip, backing px), `uCy` (vertical centre, backing px), `uK` (curvature strength 0–1), `uTW` (tile width, backing px), `uVidOn` (1 when video `readyState >= 2`), `uBg` (vec3 background colour, 0–1).

### 5.2 Constants for the curved look

- **theta max = 0.95 rad** (angular half-span of the cylinder visible across half the screen width); **k = 1** (full curvature). There is an unused "flat" factor (0 = curved, 1 = flat) that is multiplied in as `uTheta = 0.95·(1 − flat)` and `uK = 1·(1 − flat)`; its target is always 0, so **the reel always stays curved**, including underneath the case view.
- **Centre strip half-height** `hh = 0.245 · H` (the centre tile is 49% of the viewport height tall).
- **Vertical centre** `cy = 0.455 · H` (slightly above the middle of the screen; measured from the top).
- (The flat-blend formulas, for completeness: `hh = 0.245H + (fh/2 − 0.245H)·flat`, `cy = 0.455H + (0.5H − 0.455H)·flat`, where `fh = innerWidth·0.46·9/16` is the case-gallery frame height. With flat = 0 these reduce to the values above.)
- **Tile width** `uTW = 2·hh·16/9` (16:9 tile at the centre). All three (hh, cy, tile width) are multiplied by the backing ratio `cv.width / W` before upload.

### 5.3 Per-pixel maths (describe → implement)

Work in a top-down pixel frame: `fc = (gl_FragCoord.x, uRes.y − gl_FragCoord.y)`.

1. **Normalised horizontal coordinate** `x = (fc.x − uRes.x/2) / (uRes.x/2)` → −1 at the left edge, +1 at the right edge. Let `ax = |x|`.
2. **Concave cylinder seen from inside — atan/tan horizontal mapping.** Let `tT = tan(max(uTheta, 0.001))`. The viewing angle of the pixel is `th = atan(x · tT)` (so at the screen edge `th = ±theta`). The arc-length position on the cylinder in pixels is `spx = (th / tT) · uRes.x/2`. Convert to reel coordinates: `s = uPos + spx / uTW`. Because `th/tT` is less than x toward the edges (at the edge it is `0.95 / tan 0.95 ≈ 0.68`), content is compressed horizontally toward the sides, like the inside wall of a cylinder curving toward the viewer.
3. **Half-height grows by 1/cos(theta).** `hhPix = uH · mix(1, 1/cos(th), uK)`. At the centre the strip is `uH`; at the edges it grows to `uH / cos(0.95) ≈ 1.72 · uH`, so the reel flares taller at the left and right edges (the nearer walls of the concave screen). Top and bottom edges therefore curve outward symmetrically about `uCy`.
4. **Vertical texture coordinate** `v = (fc.y − uCy) / (2·hhPix) + 0.5` (0 = top of the strip, 1 = bottom).
5. **Edge feathering (vertical mask).** `feather = 0.006 + ax²·0.16`; `m = smoothstep(0, feather, v) · smoothstep(0, feather, 1 − v)`. The top/bottom edges are crisp at the centre and get progressively softer toward the sides.
6. **Tile lookup.** For a reel coordinate s and vertical v: tile index `i = floor(s)`, horizontal fraction `f = fract(s)`, `id = i mod 16` (positive modulo). If `uIsVid[id] > .5` and `uVidOn > .5`, sample the video texture at `(f, v)`. Otherwise sample the sheet at `cell.xy + (f, v) · cell.zw` (normalised rectangle). There is **no gap** between tiles in the shader — the sheet's own thin black gutters/crops give the separation.
7. **9-tap horizontal blur growing with |x|^2.4.** Blur radius `r = ax^2.4 · 0.06 · uK` (in tile units). Take 9 samples for `k = −4…4`, offset `o = k/4`: sample at `s + o·r` horizontally and `clamp(v + o·r·0.6, 0, 1)` vertically (a slight diagonal smear), average all nine. Zero blur at the centre, motion-blur-like softness at the edges.
8. **Edge darkening.** Multiply the colour by `mix(1, 0.55, ax²·uK)` — down to 55% brightness at the extreme edges.
9. **Background blend.** Output `mix(uBg, colour, m)` with alpha 1. Outside the strip (m = 0) the pixel is exactly the background colour, so the reel sits seamlessly on the page background in both themes.

### 5.4 Background colour in the shader

- Dark: `(0, 0, 0)`. Light: `(.953, .949, .937)` (= `#f3f2ef`).
- Each frame the current shader background eases toward the target per channel by `min(1, dt·5)` (dt in seconds), so a theme toggle cross-fades the reel background roughly in step with the CSS `.6s` background transition.

---

## 6. Home overlay (`section#home`)

Fixed, inset 0, z-index 5, `pointer-events:none`, `transition: opacity .4s`. When the index overlay is open (`body.index`) its opacity becomes 0.

### 6.1 Title roller (`#roll`) — bottom-left

- Structure: `#roll > .slide > .list > span.big × 18`.
- `#roll`: absolute, left **1.3vw**, bottom **2.2vh**, height **7.9vw**, `overflow:hidden` (a one-line window).
- Each title line: `.big`, `display:block`, font-size **8.6vw**, height **7.9vw**, line-height **7.9vw**, `white-space:nowrap`. (Anton glyphs at 8.6vw in a 7.9vw line — tightly cropped.)
- The list contains **three consecutive copies** of the six titles (18 lines: copy 0 = indices 0–5, copy 1 = 6–11, copy 2 = 12–17). The roller index `rollI` starts at 6 (the middle copy, project 0).
- `.list` has `transition: transform 1s var(--ease)` and is positioned with `translateY(−rollI · 7.9vw)`.
- The line at `rollI` gets class `cur`; all others lose it.
- **setRoll(i, dir)** (called when the active project changes): target = 6 + i. If dir > 0 and target < current rollI, use target + 6 (go down into the next copy so the roll always moves forward); if dir < 0 and target > current, use target − 6; otherwise use target. Clear any inline transition, apply the new translate (1s ease), mark `cur`. Then (debounced — cancel any previous pending timer) after **1050ms**, if rollI is not 6 + i, silently snap back to the middle copy: set transition none, rollI = 6 + i, apply translate, mark `cur`, force a reflow, restore the transition. Net effect: titles always roll in the gesture direction and the list never runs out.
- Forward (next) direction = list moves up (next title rises from below).
- Initial call on load: setRoll(0, +1).
- **Drop-out (`body.out`)**: every line except `.cur` gets `visibility:hidden` (so only the current title is visible while it drops), and `.slide` translates **down by 8.4vw** with `transition: transform .5s var(--ease)` — the title slides down out of its window. Default (not out) `.slide` transition: `transform .55s var(--ease) .1s` (coming back in has a 0.1s delay and 0.55s duration).

### 6.2 Next controls (`#nx`) — bottom-right

- `.ui`, absolute, right **1.6vw**, bottom **2.4vh**, flex column, `align-items:flex-end`, gap **8px**. Default transition `transform .55s var(--ease) .1s`. In `body.out`: `transform: translateY(calc(100% + 4vh))` with `transition: transform .5s var(--ease)` (drops below the viewport).
- Contents top to bottom:
  1. **Label** `.lab` (right-aligned, line-height 1.35): a `<span>` "Next" (block, opacity **.5**, font-size **8px**), then a `<b>` (weight 500, block, height **13px**, `overflow:hidden`) containing an `<i>` (block, normal style, `transition: transform .7s var(--ease)`) whose text is the **next project's title** (project (cur+1) mod 6). Initially "The Last Light". Upper-cased via `.ui`.
  2. **Next button** `.rb#bNext` (aria "Next project"): chevron pointing right (path 8,5 → 16,12 → 8,19, stroke currentColor width 3, no fill, viewBox 24).
  3. **Prev button** `.rb#bPrev` (aria "Previous project"): chevron pointing left (16,5 → 8,12 → 16,19).
- `.rb`: 26×26px circle, background `var(--fg)`, icon colour `var(--bg)` (inverted chip), grid-centred 10×10px SVG, `pointer-events:auto`, `transition: transform .25s var(--out)`, hover `scale(1.15)`.
- **Next-label roll (setNext)**: when the active project changes, translate the `<i>` to `translateY(−110%)` (rolls up out of the 13px window over .7s). After **350ms**: set its text to the new next title, disable transition, jump to `translateY(110%)` (below the window), force reflow, re-enable transition, animate to `none` (rolls up into place).

---

## 7. Reel motion, input and settle logic

### 7.1 State

- `pos` (current reel coordinate, tiles), `tgt` (target), `cur` (active project index), `mode` ∈ {`home`, `opening`, `case`, `closing`, `index`}, `lastIn` (timestamp of the last wheel/drag input), `ref` (reel centre of the project the current gesture started from, or null).
- Initial: `pos = tgt = 0.5` (project 0 centred), `cur = 0`, mode `home`.
- **wrapNear(c, ref)** = `c + round((ref − c)/16)·16` — the copy of reel coordinate c closest to ref.
- **Per frame smoothing**: `dt = min(0.05, frameDelta seconds)`; `pos += (tgt − pos) · (1 − e^(−5.5·dt))` (critically-damped-feeling exponential ease, frame-rate independent).
- **Active project**: tile `floor(pos)` mod 16 → its project. When it differs from `cur`: direction = +1 if `((a − cur) mod 6) ≤ 3` else −1; set `cur = a`; call setRoll(a, dir) and setNext(a). So titles update as soon as the boundary tile crosses the centre, mid-scroll.

### 7.2 Gestures and settle (home mode only)

- **startGesture()**: if `ref` is null, set `ref = wrapNear(PSTART[cur] + .5, pos)`.
- **Wheel** (window listener, passive): in home, startGesture(), then add the dominant-axis delta (deltaX if |deltaX| > |deltaY|, else deltaY) × **0.0032** tiles to `tgt`; set `lastIn = now`. In case mode (and Read more card closed) route to the gallery wheel. In index mode add `deltaY × 0.006` to the index target.
- **Drag** (pointer events on the canvas, home only): on pointerdown capture the pointer, reset `ref = null` then startGesture(), record start x, start `tgt`, `moved = 0`, last x/time, velocity 0, add `body.grab`.
  - One tile in pixels for dragging: `tilePx = H · 0.49 · 16/9` (the centre tile width).
  - pointermove: `dx` = clientX − start x; `moved = max(moved, |dx|)`; instantaneous velocity = Δx/Δt (px per ms, Δt ≥ 1); smoothed `v = v·0.6 + inst·0.4`. `tgt = startTgt − dx / tilePx` (drag left → reel advances); additionally `pos += (tgt − pos)·0.65` so the reel tracks the finger tightly; `lastIn = now`.
  - pointerup / pointercancel: remove `grab`. If `moved < 6px` it is a **click**: reset ref; if in home and the pointer is in the **central hit zone** (|x − W/2| < 0.3W and 0.18H < y < 0.78H) open the case for `cur`. Otherwise it is a **fling**: `tgt −= v · 260 / tilePx`, then `tgt = settle(tgt)`, `ref = null`, `lastIn = 0`.
- **Idle settle for wheel**: every frame, in home, not dragging, and **more than 380ms** since the last input: if `ref` is not null, `tgt = settle(tgt)` and `ref = null`.
- **settle(x)**: let `r = ref` (or x if null), `d = x − r`.
  - If `|d| < 0.18` tiles → return r (snap back to the project you started on; gesture threshold **0.18 tile**).
  - Otherwise, among all six project centres wrapped near x, consider only those strictly in the gesture direction from r (`(c − r)·d > 0.01`) and return the one **closest to x**. Result: any gesture beyond the threshold lands on the **next or previous project in the gesture direction** (a big fling can travel further — it lands on whichever centre in that direction is nearest to where the fling ended), never back on the start.
- **goP(i)**: `ref = null`; i wrapped to 0–5; `tgt = wrapNear(PSTART[i] + .5, pos)`. Next button → goP(cur + 1); Prev → goP(cur − 1).

### 7.3 Keyboard

| Mode | Key | Action |
|---|---|---|
| home | ArrowRight / ArrowDown | goP(cur + 1) |
| home | ArrowLeft / ArrowUp | goP(cur − 1) |
| home | Enter | open case for cur |
| case | ArrowDown / ArrowUp | gallery step +1 / −1 |
| case | Escape | if Read more card open → close card; else close case |
| index | ArrowDown / ArrowUp | index target +1 / −1 |
| index | Escape | close index |
| index | Enter | close index and go to the highlighted project |

---

## 8. Custom cursor (`#cur`)

- Fixed at left 0/top 0, **8×8px** circle, `margin:-4px 0 0 -4px` (centred on the pointer), background `var(--red)` (`#ff2b2b`), z-index 100, `pointer-events:none`. Moved on every window pointermove with `transform: translate(clientX px, clientY px)` — no lag/easing.
- Label `<b>` inside: absolute, left **14px**, top **−4px**, font-size **9px**, weight 500, letter-spacing **.08em**, colour `var(--fg)`, `white-space:nowrap`, opacity 0 with `transition: opacity .25s`. Not uppercase (text is exactly `View project`).
- When mode is home and the pointer is in the central hit zone (|x − W/2| < 0.3W, 0.18H < y < 0.78H) the cursor gets class `lab` (label opacity 1) and the label text becomes `View project`; otherwise the class is removed and the text cleared.

---

## 9. Case view (`section#case`)

### 9.1 Container

- Fixed inset 0, z-index 10, background `var(--bg)`, `pointer-events:none`, **`clip-path: inset(0 0 100% 0)`** (fully clipped — zero-height visible area at the top), `transition: clip-path .8s var(--ease), background .6s`.
- `body.case`: `clip-path: inset(0 0 0 0)` and `pointer-events:auto`. Because only the bottom inset animates (100% → 0), the opaque case page **wipes down from the top edge** over the still-curved reel; on close it wipes back up.
- The top bar (z 30) remains visible above the case.

### 9.2 Building a case (`buildCase(i)`, done at the start of opening)

- **Gallery list (8 frames)**: the project's own cells in order, then keep appending cells from the following projects (i+1, i+2 … wrapping) until there are exactly **8** frames. Examples: Night Harbour → 1,0,2,3,4,5,6,7; The Last Light → 4,5,6,7,8,9,10,11; Salt & Iron → 6–13; Northbound → 8–15; Quiet Machines → 10,11,12,13,14,15,1,0; Ferry Songs → 12,13,14,15,1,0,2,3. Only Night Harbour's first frame (cell 1) is a video frame.
- Reset gallery index `gi = 0`.
- **Case title**: split the project title into words; first line = first ceil(n/2) words, second line = rest (one line if a single word). Night Harbour → "Night" / "Harbour"; The Last Light → "The Last" / "Light"; Salt & Iron → "Salt &" / "Iron"; Northbound → "Northbound"; Quiet Machines → "Quiet" / "Machines"; Ferry Songs → "Ferry" / "Songs". Each line is a `span.ln` (block, `overflow:hidden`) wrapping an inner `span` (block).
- Frames, rail thumbs, counter digits, total and the card are filled (below), then layout runs.

### 9.3 Sheet crop helper (backgrounds)

For an element of width w (fallback 46% of viewport width) and height `h = w·9/16`, and sheet cell (cx, cy, cw, ch): `sx = w/cw`, `sy = h/ch`; set `background-image: url(SHEET)`, `background-size: (3840·sx)px (2160·sy)px`, `background-position: (−cx·sx)px (−cy·sy)px`. This scales the whole sheet so exactly that cell fills the element (slight non-uniform stretch to 16:9 is accepted).

### 9.4 Layout elements

| Element | Spec |
|---|---|
| **Back** `button#back.ui` | Text `Back`. Absolute, left **1.6vw**, top **19vh**. Final opacity **.6**. Closes the case. |
| **Case title** `#ctitle.big` | Absolute, left **1.5vw**, top 50%, `translateY(-50%)`, font-size **3.4vw**, width **13vw** (Anton, line-height .9, uppercase). |
| **Gallery** `#gal` | Absolute, left 50%, top 0, width **46vw**, height 100%, margin-left **−23vw** (centred column). |
| **Frames** `.fr` (8) | Absolute, left 0, width 100%, `aspect-ratio:16/9`, top 50%, `background-size:cover` (overridden by crop helper), `overflow:hidden`, `transition: transform 1s var(--ease), filter 1s var(--ease)`. |
| **Counter** `#cnt.big` | Absolute, left **88.6vw**, top 50%, `translateY(-55%)`, font-size **2.5vw**, line-height 1. |
| **Thumbnail rail** `#rail` | Absolute, right **−1.4vw** (bleeds off the right edge), top 50%, flex column, gap **6px**, `transition: transform .9s var(--ease)`. |
| **Open film** `#film.ui` | Absolute, left **1.6vw**, bottom **2.6vh**, flex, gap 6px, align centre, font-size **8px** (overrides .ui). Text `Open film` followed by a **5×5px red dot** (`var(--red)`, round). Non-functional. |
| **Read more** `button#more` | Absolute, right **1.6vw**, bottom **2.2vh**, font-size **12px**, flex, align centre, gap 6px, `pointer-events:auto`. Text `Read more` (Inter 400, NOT uppercase — no .ui class) followed by a 2×2 `.dots` grid. Opens the card. |
| **Card** `aside#card` | See 9.8. |

### 9.5 Gallery behaviour (vertical filmstrip)

- Frame height `fh = innerWidth · 0.46 · 9/16`; gap `= innerHeight · 0.07` (**7vh**).
- Each frame j: `margin-top: −fh/2` px (centred on the 50% line) and `transform: translateY((j − gi)·(fh + gap) px)`. The active frame sits in the vertical centre; others stack above/below with 7vh gaps (neighbours partly visible at top and bottom of the viewport).
- Non-active frames have class `off`: **`filter: blur(16px) brightness(.42)`** (dark theme). In light theme: `blur(16px) brightness(1.05) saturate(.6) opacity(.55)`. Active frame has no filter. Filter and transform both transition 1s `--ease`.
- Night Harbour frame 0 contains a `<video>` (muted, loop, playsinline, crossorigin anonymous, src = VIDEO, autoplay via play()) absolutely filling the frame with `object-fit:cover`, on top of its poster crop, plus the **player bar** (9.6).
- **Wheel in case** (only when the card is closed): ignore if |deltaY| < 4 or if within the **750ms lock** after the last accepted step; otherwise lock for 750ms and step by sign(deltaY).
- **caseStep(d)**: `gi = clamp(gi + d, 0, 7)`; if unchanged do nothing; else re-layout. No wrap.
- Clicking a non-active frame jumps to it; clicking a rail thumbnail jumps to it.

### 9.6 Player bar (`#player.ui`, only inside the video frame)

- Absolute, left 0, right 0, **bottom −30px** (sits just below the frame), flex, align centre, gap 8px.
- Children in order: `❚❚`, `Pause`, a `.bar` (flex 1, height 1px, background `var(--line)`, position relative, containing an `<i>` absolutely positioned left/top/bottom 0 with background `var(--fg)` and no width set — i.e. an empty progress fill), then `⤢`. Non-functional.
- Layout sets the player's inline opacity to 1 when gi = 0 and 0 otherwise.

### 9.7 Rolling counter and thumbnail rail

- **Counter**: `.d` is a window of height **2.5vw** with `overflow:hidden`, containing a column of spans `01`…`08` (each block, height 2.5vw). The column translates `translateY(−gi·2.5vw)` with `transition: transform .9s var(--ease)` — digits roll vertically. Below it `.tot` shows the total `08` in `var(--mute)` with margin-top **.35vw**.
- **Rail**: 8 thumbnails `<i>`, each block, width **5.2vw**, `aspect-ratio:16/9`, cropped from the sheet with the crop helper, `filter: brightness(.4)`, `transition: filter .5s, transform .5s var(--out)`. Active thumb `on`: no filter and `translateX(−.8vw)` (pops left). Thumb step `th = innerWidth·0.052·9/16 + 6` px; the rail's transform is `translateY(−gi·th − th/2)` px so the active thumb is centred on the 50% line (transform .9s `--ease`).

### 9.8 Read more card (`aside#card`)

- Absolute, right **.6vw**, top **13vh**, bottom **11vh**, width **21.5vw**, background **#fff**, colour **#0c0c0c** (white in both themes), padding **18px 18px 16px**, flex column, z-index 3. Hidden at `transform: translateX(110%)`; `body.read` → `none`; `transition: transform .8s var(--ease)` (slides in from the right edge, out the same way).
- `.tx` scroll area: flex 1, `overflow:auto`, `scrollbar-width:thin`, padding-right 6px. Content in order:
  1. `.cat` — project category, **7px**, letter-spacing .1em, uppercase, opacity .6.
  2. `h3.big` — project title, **1.9vw**, margin 6px 0 6px.
  3. `.redbar` — width **40%**, height **7px**, background `var(--red)`, margin-bottom 8px.
  4. `.meta` — `Year {year}` line break `Client {client}`; **8px**, line-height 1.5, opacity .7, margin-bottom 12px.
  5. `.lead` — lead text, **12px**, line-height **1.38**, margin-bottom 16px.
  6. `h4` `Strategy` — **7px**, .1em, uppercase, weight 500, margin 10px 0 6px, opacity .7.
  7. `p` — **s1 repeated twice** separated by a space; **8.5px**, line-height 1.6, opacity .8.
  8. `h4` `Storytelling`, then `p` with **s2 repeated twice** separated by a space.
  9. `h4` `Credits`, then `p` with the shared credits sentence.
- `.stat` footer (outside the scroll area): border-top **1px solid #e3e3e3**, padding-top 10px, margin-top 10px, flex, `justify-content:space-between`, `align-items:flex-end`.
  - Left: a label span (stat label, e.g. `Views`; 7px, .1em, uppercase, opacity .6, block, margin-bottom 4px) above a `b.big` value (e.g. `2.4M`, **2.3vw**, weight 400, Anton).
  - Right: close button `#cardX` which is itself a 2×2 `.dots` grid (aria "Close"). Removes `body.read`.
- While the card is open the gallery wheel is disabled; Escape closes the card first.

---

## 10. Open / close transitions (exact timeline)

All "ease" below = `cubic-bezier(.7,0,.2,1)`; "out" = `cubic-bezier(.2,.8,.2,1)`.

### 10.1 openCase(i) — only from home

| t (ms) | What happens |
|---|---|
| 0 | `mode = 'opening'`. `tgt = wrapNear(PSTART[i] + .5, pos)` (finish centring the project). buildCase(i). Add **`body.out`**: the title roller hides all non-current lines and the slide drops **8.4vw** down over **.5s ease**; the `#nx` controls drop by `100% + 4vh` over **.5s ease**. |
| 330 | Add **`body.case`**: case layer clip-path animates `inset(0 0 100% 0)` → `inset(0 0 0 0)` over **.8s ease** — the page **wipes down from the top**. The WebGL reel keeps rendering curved beneath it. |
| 330 + staggers (delays measured from adding `case`) | **Gallery** `#gal`: from `translateY(22vh)` to none over **1.25s out**, delay **.1s** (slides up). **Title lines**: inner spans from `translateY(105%)` to none over **.8s out**, line 1 delay **.62s**, line 2 delay **.72s** (roll up out of their masks). **Counter**: clip-path `inset(100% 0 0 0)` → `inset(0)` over **.8s out**, delay **.7s** (reveals bottom-up). **Back**: opacity 0 → **.6**, .5s, delay **.85s**. **Film, Read more, Rail**: opacity 0 → 1, .5s, delay **.95s** (rail transform keeps its .9s ease). **Player**: opacity → 1, .5s, delay **1s**. |
| 1250 | `mode = 'case'` (input enabled for the case). |

### 10.2 closeCase() — only from case

| t (ms) | What happens |
|---|---|
| 0 | Remove `body.read` (card slides out). `mode = 'closing'`. Remove **`body.case`**: clip-path animates back to `inset(0 0 100% 0)` over .8s ease — the case **wipes up** to the top revealing the curved reel. All inner case elements keep their entered state during the wipe because their un-case transitions are `0s` duration with **.8s delay**: after .8s (fully covered) gallery jumps back to `translateY(22vh)`, title spans to `translateY(105%)`, counter to clipped, back/film/more/rail/player to opacity 0 — ready for the next open. |
| 620 | Remove **`body.out`**: title slide returns to 0 with **.55s ease, .1s delay** and the `#nx` controls rise back with the same .55s/.1s; non-current title lines become visible again. |
| 1150 | `mode = 'home'`. |

---

## 11. Index overlay (`section#idx`)

- Fixed inset 0, z-index **40**, background **#121212**, colour **#f4f2ee** (always dark, regardless of theme). `clip-path: inset(0 0 100% 0)` → `body.index`: `inset(0 0 0 0)`, `transition: clip-path .9s var(--ease)` (wipes down from the top; covers the top bar).
- **Open** from the top-bar index button or the `Works` nav (allowed in home or case mode): remove `body.read`, remember the previous mode, `mode = 'index'`, set index target and value to `cur`, add `body.index`. Home overlay fades to opacity 0 (.4s).
- **Close button** `#xclose`: absolute, left 1.6vw, top 20px, z 2; contains a **3×3** `.dots` grid (`grid-template-columns: 3px 3px 3px`) rotated **45°** (reads as an ×/diamond of dots).
- **Red hairline** `#hair`: absolute, full width, top 50%, height 1px, background **rgba(255,43,43,.55)**.
- **Thumbnail** `#ithumb`: absolute, left 1.6vw, top 50%, width **10.5vw**, aspect 16/9, `translateY(-50%)`, cropped from the sheet to the **first cell of the highlighted project** (crop helper), no transition.
- **Meta** `#imeta`: absolute, left **29vw**, top 50%, `translateY(-120%)` (sits just above the hairline), **7px**, line-height 1.4, opacity .55, uppercase, letter-spacing .1em. Content: first segment of the category (text before the first ` · `, e.g. `Documentary`) + line break + year.
- **List** `#ilist.big`: absolute, left **33vw**, top 0, bottom 0, right 0. Contains **18 items** (three copies of the six titles), each a `div[data-i]` absolutely positioned at left 0, font-size **4.3vw**, line-height 1, height **4.6vw**, nowrap, colour **#3a3a3a**, `transform-origin: 0 50%`, `transition: color .35s`. Each title is in an inline-block span skewed **skewX(-11deg)** with `transition: transform .5s var(--out)`.
- **Highlighted item** (`on`): colour **#f4f2ee**; its span becomes `skewX(-11deg) translateX(2.2vw)` (slides right).
- **Infinite positioning, every frame while the index is open**: line step `lh = innerWidth·0.046`; ease `idxV += (idxT − idxV)·0.12`; for item k (0–17), `y = k − idxV − 6`, wrapped into the range [−9, 9) (total 18); `transform: translateY(H/2 + y·lh − lh/2 px)`. The item at y≈0 sits centred on the red hairline; the list scrolls endlessly in both directions.
- Highlighted project `a = round(idxV) mod 6`. Only the item(s) of project a whose y-position is within `0.6·lh` of the centre line get `on`. When a changes, update the thumbnail and meta.
- **Input**: wheel adds `deltaY·0.006` to idxT; ArrowDown/Up ±1; hovering (pointermove over) an item nudges idxT by `((itemCentreY − H/2) / (H·0.046))·0.08` per move event (drifts the hovered item toward the hairline).
- **Selecting** (click an item, or Enter on the highlighted one): remove `body.index`, restore the previous mode; if that was the case view, instantly remove `case` and `out` and set mode home; then goP(selected) on the reel. Escape or the close button just closes (returns to the previous mode).

---

## 12. Light theme

- The theme button toggles `body.light`.
- CSS tokens switch to: bg **#f3f2ef**, fg **#0c0c0c**, mute **#9a9893**, line **rgba(12,12,12,.14)**; red stays #ff2b2b. Page and case backgrounds transition .6s.
- The shader background eases to `(.953,.949,.937)`; the curved reel's surroundings become warm off-white; titles, buttons (inverted chips become black with off-white icons) and cursor label invert automatically.
- Gallery off-frames in light: `blur(16px) brightness(1.05) saturate(.6) opacity(.55)`.
- Read more card stays white with #0c0c0c text; index overlay stays #121212.

---

## 13. Render loop summary (every requestAnimationFrame)

1. `dt = min(.05, Δt)`.
2. Home idle settle (not dragging, >380ms since input, ref set) → settle.
3. Ease `pos` toward `tgt` with factor `1 − e^(−5.5·dt)`.
4. Detect active project change → title roll + Next label roll.
5. Ease the (always-zero) flat factor with `1 − e^(−6.5·dt)`.
6. Ease shader background toward the theme colour by `min(1, dt·5)`.
7. Compute hh = 0.245H, cy = 0.455H, tile width = 2·hh·16/9 (times backing ratio).
8. Upload the current video frame if `readyState >= 2`.
9. Set uniforms (theta .95, k 1, video-on flag, background) and draw the triangle.
10. If the index is open, run the index positioning step.

On load: size the canvas, setRoll(0, +1), start the loop. (Optional debugging handle on `window.__nr` exposing goP, openCase, closeCase, openIndex, closeIndex, caseStep, a `more()` that opens the card, and getters for cur and mode.)

---

## 14. Visual impression to match

- Pure black page. A wide band of film stills spans the full width, its centre tile 49% of the viewport tall and sitting a little above centre (45.5%). The band's top and bottom edges bow outward toward the left and right edges (≈1.72× taller at the sides), the side tiles are horizontally compressed, darker (down to 55%) and softly smeared, and their top/bottom edges feather into the background. It reads as the inside of a curved cinema wall.
- The first frame on load is the live harbour video, centred.
- A giant Anton title (8.6vw, e.g. "NIGHT HARBOUR") sits flush bottom-left, cropped tight in its 7.9vw window. Bottom-right: tiny "NEXT" label over the next title, then two small off-white circular chevron buttons stacked.
- Tiny uppercase Inter UI at 10px, a 20px "Norro." wordmark top-left.
- A small red dot cursor, with "View project" beside it over the central area.

---

## 15. Acceptance checklist

- [ ] Single `index.html`; only Anton + Inter 400/500/600 from Google Fonts; no JS libraries.
- [ ] Page never scrolls; native cursor hidden everywhere; 8px #ff2b2b dot cursor follows instantly; "View project" label (9px, 14px right of the dot) appears only in home within |x−W/2| < 30% W and 18%–78% H.
- [ ] Colour tokens exactly: #000 / #f4f2ee / #6f6d69 / rgba(244,242,238,.16) / #ff2b2b; light #f3f2ef / #0c0c0c / #9a9893 / rgba(12,12,12,.14); eases (.7,0,.2,1) and (.2,.8,.2,1).
- [ ] SHEET and VIDEO URLs copied verbatim; CX [4,972,1932,2891], CW [945,937,936,945], CY [4,551,1088,1617], CH [524,514,506,539]; 4×4 row-major cells.
- [ ] Reel tile order 1,0,2,3,4,5,6,7,8,9,10,11,12,13,14,15 (16 tiles, wraps); tile 0 shows the live video once `readyState ≥ 2`, sheet cell 1 before that.
- [ ] WebGL2, full-screen triangle, DPR capped at 1.5, sheet mipmapped, 1×1 black placeholder textures, video re-uploaded each frame.
- [ ] Shader: θ max .95; `th = atan(x·tan θ)`; `s = pos + (th/tanθ)·(resX/2)/tileW`; half-height × mix(1, 1/cos th, k); centre half-height 24.5% H at 45.5% H; tile width 2·hh·16/9; feather .006 + x²·.16; 9-tap blur radius |x|^2.4·.06 with vertical .6 factor; darkening to .55 by x²; mix with background colour by the mask.
- [ ] Reel stays curved at all times (flat factor stays 0), including under the case view.
- [ ] Wheel ×.0032 tiles on the dominant axis; drag 1 tile = H·.49·16/9 px with 0.65 immediate follow; fling `v·260/tilePx`; click (<6px) in centre zone opens the case.
- [ ] Settle after 380ms idle: < .18 tile returns to start project; beyond that lands on the nearest project centre strictly in the gesture direction. Easing `1 − e^(−5.5dt)`.
- [ ] Each project rests with its first tile centred (PSTART + .5).
- [ ] Next/Prev buttons and arrow keys step projects; Enter opens.
- [ ] Title roller: 3 copies of 6 titles, 8.6vw type in 7.9vw lines, 1s ease translate, always rolls in gesture direction, silently re-centres to the middle copy after 1050ms.
- [ ] Next label: 13px window, roll up out (.7s), text swap at 350ms, enter from below.
- [ ] Open: `out` at 0 (title/controls drop .5s; only current title visible), `case` at 330ms (top-down clip-path wipe .8s ease), gallery from 22vh (1.25s out, .1s), title lines .62s/.72s, counter .7s, back .85s → .6 opacity, film/more/rail .95s, player 1s; mode case at 1250ms.
- [ ] Close: wipe up immediately, inner elements reset only after .8s, `out` removed at 620ms (title rolls back .55s with .1s delay), mode home at 1150ms.
- [ ] Case layout: Back 1.6vw/19vh; two-line title 3.4vw at left 1.5vw, width 13vw; 46vw gallery centred; 8 frames with 7vh gaps; neighbours blur(16px) brightness(.42); counter at 88.6vw, 2.5vw rolling digits 01–08 over 08 in mute; rail of 5.2vw thumbs at right −1.4vw, active brightened and shifted −.8vw; Open film + red dot bottom-left; Read more + dots bottom-right.
- [ ] Gallery fills to 8 frames from following projects; wheel lock 750ms, |deltaY| < 4 ignored, clamped 0–7; frame and rail clicks jump.
- [ ] Night Harbour frame 1 has the video plus player bar (❚❚ Pause, 1px line, ⤢) 30px below it.
- [ ] Read more card: white, 21.5vw wide, top 13vh, bottom 11vh, right .6vw, slides from translateX(110%) in .8s; cat / title / 40%×7px red bar / Year+Client / lead / Strategy (s1 ×2) / Storytelling (s2 ×2) / Credits; stat footer with #e3e3e3 rule, label + 2.3vw Anton value and dots close button; Escape closes card before case.
- [ ] Index: #121212 overlay wipes down .9s; 3×3 rotated-45° dots close; red hairline rgba(255,43,43,.55) at 50%; 10.5vw thumbnail left; meta at 29vw above the line; infinite list of 18 skewed (−11°) 4.3vw Anton titles from 33vw, step 4.6vw, #3a3a3a with the centred one #f4f2ee and shifted 2.2vw; easing .12; wheel ×.006; hover drift; click/Enter selects and returns to the reel on that project.
- [ ] Light theme toggles all tokens, the shader background (.953,.949,.937) and the light off-frame filter; card stays white, index stays dark.
- [ ] All six projects' text fields match Section 3 character for character (including `·`, `&`, `+64%`, `100 000€+`).