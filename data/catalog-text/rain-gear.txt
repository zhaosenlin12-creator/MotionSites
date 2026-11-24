# MONS — Unmask Trail Hero: full recreation brief

Build a single-file, one-screen product hero for a fictional techwear brand, **MONS** (a rain-shell system). A hooded model in a smoked visor and face mask stands in front of a giant black wordmark. Moving the cursor over the model paints a soft, blobby "unmask" trail that reveals the same man without the visor and mask, edged with a glowing cherry-red rim, and fades back in about 0.8 s. Everything except the model drifts away from the cursor (magnetic repel parallax). The page opens with a black pixel-font loader and a horizontal slice-glitch wipe. Small kit pieces show a red tag on hover and a dark spec card on click.

The page must fill the viewport exactly (no scroll), work with a mouse and with touch, scale from 320 px phones to 2560 px desktops, and switch everything off under reduced motion.

---

## 1. Media (use these exact URLs)

Both images are 2048×1360 WebP with real alpha (transparent background), the same pose and framing to the pixel, so one can be revealed through the other. Load them with `crossOrigin = "anonymous"`. The CDN sends `Access-Control-Allow-Origin: *`, which WebGL needs.

| Role | URL |
|---|---|
| Layer A, masked (visor + face mask), default view and `<img>` fallback | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261121_020044_2a50481c-2879-4750-9ba5-f6e6e1c4237e.png&w=2048&q=85` |
| Layer B, unmasked (same man, face visible, hood still up) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261121_020045_d3d98f0d-73d5-4c45-b4eb-72294778af75.png&w=2048&q=85` |

In code these are built as `'https://images.higgs.ai/?default=1&output=webp&url=' + encodeURIComponent(<cloudfront png>) + '&w=2048&q=85'`.

The `<img>` alt text is "Model in a hooded rain shell, smoked visor and face mask, with a black sling bag".

**Contour texture.** A full-frame SVG (viewBox 0 0 1440 900, `preserveAspectRatio="none"`) of topographic contour lines: 1 px round-capped strokes in #9AA0A6, in 4 groups with stroke-opacity .18/.36/.55/.75. The lines get denser and darker toward the edges and are empty in the centre. Generate it with marching squares over a 3-octave value-noise field (scales 260, 120 and 55 px, weights .65/.25/.10, 12 px grid, iso levels from .30 to .80 in steps of .03). Keep only segments whose edge weight `w = clamp((max(|dx|·1.05, |dy|·0.6) − .35)/.5)` is above .05, where dx and dy are normalised distances from the centre. Inline it as a base64 `data:image/svg+xml` URL.

---

## 2. Fonts

| Use | Family (CSS name) | Weight | Source |
|---|---|---|---|
| Wordmark | Archivo at width 125% ("Archivo X") | 900 | Google Fonts `family=Archivo:wdth,wght@125,900`, latin woff2 `https://fonts.gstatic.com/s/archivo/v25/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q8EsJaRE-NWIDdgffTTnTRZ9xdp.woff2`, `font-display:block` |
| Headline | Sora ("Sora") | 500–600 (variable) | `https://fonts.gstatic.com/s/sora/v17/xMQ9uFFYT72X5wkB_18qmnndmSdSnh2BAfO5mnuyOo1lfiQwV6-x.woff2` |
| All micro labels, nav, tags, panels | JetBrains Mono ("JB Mono") | 500–700 (variable) | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2` |
| Loader word | Silkscreen ("Silk") | 400 | `https://fonts.gstatic.com/s/silkscreen/v6/m8JXjfVPf62XiF7kO-i9YLNlaw.woff2`, `font-display:block` |

In the standalone file all four are base64-embedded `@font-face` sources. Body font: Sora, `-webkit-font-smoothing: antialiased`.

---

## 3. Head and colour tokens

- `<html lang="en" class="js-anim">`, viewport `width=device-width, initial-scale=1, viewport-fit=cover`.
- Title: `MONS — Field System 08`. Meta description: `MONS rain shell system. Hover to unmask.`
- Tokens: `--bg #E6E8EA` (cool fog grey page), `--soft #CBD7D7`, `--mid #4D4A4E` (slate lines and eyebrow), `--ink #111012` (wordmark and text), `--red #E0313F` (cherry accent), `--panel #1B1C1F` (dark HUD panels). Light panel text: #E9EAEC.
- `html, body`: height 100%, overflow hidden, background `--bg`. `#stage`: `position:fixed; inset:0; overflow:hidden; touch-action:none; cursor:crosshair`, with `aria-label="MONS rain shell hero"`.

---

## 4. Scaling system

All scene content lives in one **1440×900 design frame** (`#frame`, `transform-origin:0 0`, `transform: translate(var(--fx), var(--fy)) scale(var(--s))`). JS computes `s`, `fx` and `fy`, plus a UI unit `k` for the HUD that is pinned to the viewport. Three tiers, recomputed on resize:

| Tier | When | Frame | UI unit k |
|---|---|---|---|
| L (landscape) | width/height ≥ 1.05 and height ≥ 560 | `s = vw/1440`, `fx = 0`. If the aspect ratio is wider than 1.6, `fy = 0` (the bottom crops); otherwise `fy = vh − 900·s` (frame anchored to the bottom, flat bg above). | `min(vw/1440, vh/900)` |
| S (short landscape, phones) | landscape with height < 560 | `s = vh/900`, `fx = 0.64·vw − 700·s`, `fy = 0` (model on the right) | `s`. A left column of width `--colw = clamp(190, fx + 300·s − 32, 330)` px holds the copy card (top 56) and the hint panel (bottom 14). |
| P (portrait) | width/height < 1.05 | The HUD stacks at the top: copy card at top 64, hint panel 10 px under it. Let `stackBottom = 64 + cardH + 10 + hintH + 12`. Then `s = min(vw/420, (vh − stackBottom)/780, vw/900·1.9)`, `fx = vw/2 − 705·s`, `fy = vh − 900·s` (a close crop on the head). | `min(1, vw/900)` |

In S and P the wordmark is refitted into the visible window of the frame (from the column edge, or 0, to the right edge, minus 20 px padding each side). Its font size becomes `326·min(1, avail/1280)`, its left is centred in the window minus `0.0755·font`, and its top is `131 − 0.107·font`. The left chevron is shifted to the viewport's left edge (`--clx = −fx/s`) and the right chevron to its right edge (`--crx = winR − 1440`). The tags shift right by `--tagx = max(0, (colR − fx)/s + 16/s − 255)` so they never cross the left edge. The tags and their brackets/leader lines are hidden on P below 640 px wide and on S below 700 px wide.

Text minimums: every HUD font is `max(11px, N·k)`. Tags inside the frame use `font-size: max(11px, 11px/s)` and `height: max(21px, 22px/s)` so they never render under 11 px on screen.

---

## 5. Layers and DOM, back to front (desktop measurements in frame px)

### 5.1 Contour texture
`.tex`: absolutely positioned `inset:-24px` (so it can drift), the SVG at 100% 100%, opacity .6, masked by `radial-gradient(ellipse 48% 58% at 50% 46%, transparent 35%, #000 80%)` so the centre is clean.

### 5.2 Chevrons (inside the frame, behind the wordmark)
Two full-frame SVGs (viewBox 0 0 1440 900, overflow visible, fill `--red`):
- **Top-right arm** `#chevTR`: polygon `560,-400 723,-400 1515,195 1352,195`. It is a thick diagonal band coming from the top and running down-right off the right edge, cut flat at y = 195; the "S" covers part of it. In S and P it is clipped above the frame top (`clip-path: inset(0 -2000px -2000px -2000px)`).
- **Left chevron** `#chevL` (a ">" pointing right, apex at about x 281, y 651): polygon `-54,462 101,462 281,642 281,660 -60,926 -60,792 134,636`.

### 5.3 Wordmark `#wm`
The text "MONS" in Archivo 125% wide, weight 900, size 326 px, line-height 1, letter-spacing −0.012em, colour `--ink`. It is positioned at left 70, top 96, which puts the ink box at x 95–1375, y 131–363. It is built as one solid copy (`.band`) plus 6 clipped copies (`.slice`, `clip-path: inset(j/6 … )`) that exist only for the intro glitch and are removed at 520 ms. Two frosted glass panels sit inside it, sized in em so they scale with the type:
- **g1** (lower strip of the "M"): left .07em, top .626em, width 1.03em, height .26em. No right border, and a mask `linear-gradient(90deg, #000 80%, transparent)` fades it to the right.
- **g2** (over the "S"): left 2.975em, top .574em, width .859em, height .49em. Its top-left corner is chamfered with `clip-path: polygon(.11em 0, 100% 0, 100% 100%, 0 100%, 0 .11em)`, with a 1 px white top/left edge that follows the chamfer. A vertical hatch strip sits on the right (right .045em, top .04em, .028em × .42em, `repeating-linear-gradient(-45deg, rgba(255,255,255,.95) 0 2px, transparent 2px 6px)`).
- Both panels: `background: rgba(232,234,236,.34); backdrop-filter: blur(11px) saturate(110%); border: 1px solid rgba(255,255,255,.75)`.

### 5.4 Model `#model`
A box at left 0, top −28, 1440×956 frame px, holding the `<img>` (layer A) and a WebGL `<canvas>` that covers it. The canvas fades in once WebGL is ready (`.gl` class), and the img is then hidden. At this placement the hood top sits at about y 70 and the body at x 270–1125, cropped by the bottom edge.

### 5.5 Decorative SVG `#deco` (full frame, stroke #4D4A4E, 1 px, non-scaling)
- Tag leader lines (they shift with the tags): `M403 411 H447 L527 448` and `M430 465 H462 L498 486`, stroke-opacity .75.
- Hairline `282,626 → 462,497`, opacity .55.
- Three crosshairs (circle r 7 plus a cross ±13, stroke 1.2, opacity .8) at (265, 83), (980, 433) and (1188, 578).

### 5.6 Kit tags `#tags`
- `TRK 01 / HOOD` at left 288, top 401.
- `TRK 02 / SHELL + SLING` at left 262, top 455.

Tag style: red background, white JetBrains Mono 700, 11 px, letter-spacing .02em, uppercase, padding 0 .64em, height 21–22 px, with two diagonal corners cut 5 px (`polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))`). L-shaped 10 px slate corner brackets (1 px, opacity .7) sit at top-left (281,393), (255,447) and bottom-right (396,419), (423,473).

### 5.7 Header (viewport HUD)
- **Logo** (a link to `./`, aria-label "MONS home"): a dark `--panel` chip at left `max(16, 38k)`, top `max(14, 22k)`, size `max(44, 62k)` × `max(24, 24k)`, corners cut 5 px. Inside are three 5×9 red bars skewed −20°, with a 3 px gap.
- **Nav** pill centred at top `max(12, 18k)`: links Shop, Tech, Journal in JetBrains Mono 500, `max(11, 10k)` px, letter-spacing .12em, uppercase, 7 px vertical padding. The pill has gap `max(18, 44k)`, horizontal padding `max(14, 22k)`, height `max(28, 32k)`, `border: 1px solid rgba(17,16,18,.16)`, radius 0 0 8 8, `background: rgba(240,241,242,.55)` and `backdrop-filter: blur(8px)`. Link hover colour is red. In P the pill sits top-right (right 16) with radius 8 and a 16 px gap.

### 5.8 Copy card `.card` (bottom-right)
- Position: right `max(16, 42k)`, bottom `max(16, 67k)`, width `max(250, 435k)` (never wider than 100vw − 32). Padding: top `max(14, 31k)`, right `max(14, 24k)`, bottom `max(16, 55k)`, left `max(16, 37k)`.
- Surface: `background: rgba(236,238,240,.5); backdrop-filter: blur(16px) saturate(120%); border: 1px solid rgba(255,255,255,.85)`. The top-left and bottom-right corners are cut 14 px.
- Eyebrow `Monsoon Commuter`: JetBrains Mono 500, `max(11, 10.5k)`, letter-spacing .12em, uppercase, colour `--mid`, margin-bottom `max(8, 10k)`.
- Headline `Built for the downpour.<br>Worn every day.`: Sora 600, `max(17, 33k)` px, line-height 1.09, letter-spacing −.025em, colour `--ink`. In S it is 16 px.
- A crosshair icon (24k, min 16) at the top-right.
- On desktop the card spans x 963–1398, y 652–833.

### 5.9 Hint panel `.hint` (bottom-left)
- Position: left `max(16, 40k)`, bottom `max(16, 55k)`, `width: max-content`, min-width `min(100vw − 32, 418k)`.
- Surface: `--panel` background, text #E9EAEC, top-left and bottom-right corners cut 12 px. Padding: `max(10, 20k)` vertically, `max(14, 20k)` on the right, `max(34, 56k)` on the left.
- A hatched strip on the left (`max(8, 12k)` wide, from 8 px to 8 px vertically, `repeating-linear-gradient(-45deg, #E9EAEC 0 2px, transparent 2px 5px)`).
- Two lines: `Hover to unmask / click a piece to view` and `Scroll ↓`, in JetBrains Mono 500, `max(11, 10.5k)`, line-height 1.7, letter-spacing .1em, uppercase, nowrap. They wrap below 420 px and in S.

### 5.10 Hover tip `#tip` and spec card `#spec` (fixed, above everything)
- **Tip:** a red label (the piece name, JetBrains Mono 700, 11 px, padding 5 8) above a dark line `CLICK TO VIEW` with a red `[SPECS]`. It follows the pointer at +18/+16, flips to the other side near the edges, and fades over 160 ms.
- **Spec card:** 260 px wide, dark, top-left and bottom-right corners cut 12 px, padding 16/18. It has an 8 px red square followed by the title (JetBrains Mono 700, 12 px, letter-spacing .12em), then three 11 px uppercase lines separated by 1 px rgba(255,255,255,.12) rules, and a 28×28 × close button. It opens 20 px right of the click, vertically centred on it and clamped inside the viewport (below 640 px it is centred at the bottom), animating `opacity` (.2 s) and `translateY 6 → 0` (.3 s, cubic-bezier(.2,.7,.2,1)). It closes on ×, Esc, or a click on empty stage.

---

## 6. Interactions

### 6.1 Unmask trail (WebGL)
- **Trail buffer:** an offscreen 2D canvas of 360×239 (the model box's aspect), cleared to black. A pointer position in frame coords maps to the trail as `x = fx/1440·360`, `y = (fy + 28)/956·239`.
- **Stamping:** for each pointermove (mouse always; touch or pen only while pressed), stamp soft radial blobs along the segment from the previous point. The radius is `r = 24 + 10·min(1, d/18)` trail px, where d is the segment length, with step `r·0.25`. Each blob is a radial gradient: white .9 at 0, .55 at 0.6, 0 at 1, composited `lighter`. A jump of more than 70 trail px starts a new trail instead of streaking.
- **Decay:** every frame, fill the buffer with black at alpha `1 − 0.05^(dt/850)`. That is exponential decay with a time constant of about 0.85 s, so a reveal fades back to the mask in about 0.8 s. The rAF loop runs only while `energy` (set to 1 on input, multiplied by `0.05^(dt/900)` per frame) is above .004, then clears the buffer and stops.
- **Fragment shader** (layer A = texture 0, B = 1, trail = 2; premultiplied output):
  - Animated noise: `nz = vnoise(uv·(14, 9.3) + t·(.35, −.2))·.55 + vnoise(uv·(34, 22) − t·.5)·.45`.
  - `tr = trail(uv) + (nz − .5)·.16`, which gives the blobby, wobbling edge.
  - Reveal: `m = smoothstep(.40, .47, tr)`; `colour = mix(A, B, m)`.
  - Edge detector: `grad = length(trail(uv ± 1.6 px in x) differences, trail(uv ± 1.6 px in y) differences)`, then `edge = smoothstep(.012, .07, grad)`. The rim only appears where the trail changes in space, so a fading trail never fills flat red.
  - `glow = edge·(1 − smoothstep(0, .2, |tr − .43|))` and `line = edge·smoothstep(.405, .43, tr)·(1 − smoothstep(.43, .455, tr))`.
  - `rgb = mix(rgb, red(.878, .192, .247), glow·.78)`, then `rgb = mix(rgb, (1, .86, .87), line·.9)`, then `rgb += red·glow²·.25`.
  - `gl_FragColor = vec4(rgb·a, a)`, where alpha is the cut-out alpha, so the rim stays on the figure.
- The canvas backing store is `min(2048, 1440·s·dpr)` wide (dpr capped at 2). With no WebGL, the masked `<img>` stays.

### 6.2 Kit pieces (hit tests in frame coords, first match wins)
| Piece | Area | Specs |
|---|---|---|
| RAIN VISOR | rect x 592–818, y 200–300 | Smoked anti-fog lens · Wraps under the hood · Beads and sheds rain |
| FILTER MASK | rect x 624–792, y 300–420 | Washable mesh shell · Swap-in filter insert · Magnetic quick release |
| STORM HOOD | ellipse centre (705, 235), radii 150×180 | Three-point adjust · Wired brim holds shape · Glove-friendly cord locks |
| DRY SLING | bag x 585–915, y 590–900, plus strap x 505–640, y 470–640 | Welded roll-top body · Four litre volume · One-hand buckle release |
| TAPED SHELL | y > 420, x 270–1125, inside ellipse centre (697, 930), radii 440×520 | Three-layer membrane · Fully taped seams · Pit zips for airflow |

On a mouse hover the tip appears and the cursor turns into a pointer. A click opens the spec card.

### 6.3 Magnetic repel parallax (everything but the model)
- The target is the pointer's normalised position, `tx, ty ∈ [−1, 1]`. It returns to 0 on pointerleave and on touch release.
- The current value follows with `c += (target − c)·(1 − e^(−dt/220ms))`, which settles in about 0.6 s. The loop runs only while it is moving.
- Each layer gets `translate: (−cx·d)px (−cy·d·0.7)px`:

| Layer | d | Units |
|---|---|---|
| Chevrons (both) | 24 | frame px |
| Tags group | 20 | frame px |
| Deco SVG | 18 | frame px |
| Wordmark | 14 | frame px |
| Glass g1, g2 (extra, on top of the wordmark's) | 9 | frame px |
| Contour texture | 8 | viewport px × k |
| Card, hint | 7 | viewport px × k |

  The logo and nav stay still. Use the CSS `translate` property so it never fights the transforms.

---

## 7. Opening sequence (plays once)

| Time (ms) | What happens |
|---|---|
| 0 | Fixed loader `#ld` (z 50): 10 black (#09090A) horizontal strips cover the screen. Centred "MONS" in Silkscreen, `clamp(34px, 6vw, 72px)`, red, letter-spacing .06em. A 3 px red bar sits on the bottom edge. |
| 40 + i·70 | Each pixel letter flickers in: opacity 0 → 1 (30%) → .2 (50%) → 1, 200 ms, `steps(4)`. The first letter has a ghost copy (rgba(224,49,63,.35), offset −.32em/−.18em) and jumps (−6, −4) px for 120 ms at 300 ms. |
| 0–420 | The bar scales 0 → .8 (cubic-bezier(.3,.6,.3,1)). The page waits for both images, the fonts, and at least 420 ms. Then WebGL is built and the bar goes .8 → 1 in 90 ms. |
| T = ready + 90 | The loader word and bar fade out (60–80 ms). Each strip slides out sideways (even strips left, odd right, 104%) in 260 ms, cubic-bezier(.7,0,.3,1), with a random 0–170 ms delay. This is the slice-glitch wipe. |
| T + 60 … | The 6 wordmark slices enter from ±40–130 px with opacity 0 → 1, overshoot −25% at 60%, 360 ms, `steps(5)`. The solid wordmark appears at T + 440 and the slices are removed at T + 520. |
| T + 120 | The model fades in from `brightness(1.9) contrast(.6)` to normal over 420 ms, cubic-bezier(.2,.7,.2,1). |
| T + 180 / T + 240 | The left chevron slides in from −420 px and the right one from +420 px, 520 ms, cubic-bezier(.2,.8,.2,1). |
| T + 360 + i·55 | The HUD settles in order: logo, nav, deco, g1, g2, tag 1, tag 2, brackets, card, hint. Each goes opacity 0 → 1 plus translateY 8 px (14 px for the card and hint) → 0, 900 ms, cubic-bezier(.16,.84,.24,1). The nav fades only. |
| T + 700 | The loader is removed. |

Guard: elements with `.rv` start at opacity 0 under `html.js-anim` and show under `.done`. A 5 s failsafe forces `.done` and removes the loader if loading stalls.

---

## 8. Reduced motion
With `prefers-reduced-motion: reduce`: no loader, everything visible at once, no trail (the masked image stays), no parallax, and the tip and spec appear without transitions. Clicking pieces still opens specs.

---

## 9. Acceptance checklist
- At 1440×900 the wordmark ink spans x 95–1375, y 131–363; the hood top is at about y 70; the card spans 963–1398 × 652–833; the hint panel is at about 40–458 × 768–845.
- Hovering the face reveals the unmasked man inside a blobby trail with a thin pink-white line and a cherry glow on its edge only. The trail fades back in under a second.
- While hovering, the wordmark, glass, chevrons, tags, lines, texture, card and hint drift opposite the cursor by their depths. The model and nav stay still.
- The tags never render under 11 px, every touch target is at least 24 px, and nothing overflows at 320×568, 568×320, 768×1024, 1024×768, 1440×900 or 2560×1080.
- With no WebGL, the masked image still shows and everything else works.