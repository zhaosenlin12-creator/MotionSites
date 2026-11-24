# UNIT/0 — Robot-Eye ASCII Loader + Magazine-Cover Hero: exact recreation brief

Build a single-page website (one `index.html`, vanilla HTML/CSS/JS, no libraries, no build step) for a fictional visual studio called **UNIT/0**. The page has two parts that play as one sequence:

1. **Section 1, the loader.** A full-screen canvas that draws everything as a grid of monospace text characters. A big cream-and-orange **robot camera-eye** opens its two shutter plates, looks around, blinks once, the view zooms in, the iris morphs into a 4-point star, little ✦ sparkles bloom and twinkle across the screen, then the whole loader **falls apart into pixels** from every sparkle outward, revealing the page underneath.
2. **Section 2, the revealed hero.** A near-black screen with a tiny orange 4-point sparkle logo top-left, a single nav link "Home" top-right, an edge-to-edge giant orange ultra-condensed wordmark **UNIT/0** that wipes in letter by letter, and three tilted magazine covers (**VOLT**, **SCAN**, **ECHO**) that slide up from below the screen and overlap the bottom of the wordmark.

Total running time at speed 1: the eye sequence lasts 6.235 s, the dissolve 1.3 s, and the page is fully settled at about 8.2 s. Mood: dark, warm, techy, editorial, a little uncanny ("you are being watched"), premium.

---

## 1. Assets

There is exactly one image asset. It is a 2×2 sheet (1744 × 2336 px, 3:4) holding three magazine covers; the fourth cell (bottom-right) is plain near-black and is never shown.

| Use | URL | How it is placed |
|---|---|---|
| Cover sheet (VOLT top-left, SCAN top-right, ECHO bottom-left) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_055020_74d6a446-0656-45bc-a43a-0ed29d2826c2.png&w=1744&q=85` | Set as `background-image` on each cover element with `background-size: 200% 200%`, `background-repeat: no-repeat`. VOLT uses `background-position: 0 0`, SCAN `100% 0`, ECHO `0 100%`. Each cover element has `aspect-ratio: 872 / 1168` (one cell of the sheet). |

The raw generation behind the wrapper is `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261117_055020_74d6a446-0656-45bc-a43a-0ed29d2826c2.png`. Keep the images.higgs.ai wrapper; do not crop or re-host.

What the covers show (all people are fictional):
- **VOLT**: cream/beige paper cover; a huge chrome-metallic bevelled 3D title "VOLT" across the top; a young woman with dark hair in a loose bun wearing a crinkled silver utility jacket with black straps; cover line in black bold condensed caps on the left: "BUILT / FOR A / BRIGHTER / TOMORROW".
- **SCAN**: flat saturated orange cover; chrome title "SCAN" with star glints; a white-and-chrome humanoid robot head in profile with orange ring "eyes" and a dark visor; white cover line "NEW / HORIZONS / AHEAD".
- **ECHO**: dark brown cover; chrome title "ECHO" with star glints; close-up of a young man with tousled dark hair lit by orange light through blinds; white cover line "REAL / PEOPLE / BIGGER / DREAMS".

The favicon is an inline SVG data URI of the same 4-point sparkle path as the logo, filled `#ff8f5a`.

## 2. Fonts

| Role | Family | Weight | Source |
|---|---|---|---|
| Wordmark "UNIT/0" | Anton | 400 (the only weight) | Google Fonts `https://fonts.googleapis.com/css2?family=Anton&display=swap`; latin WOFF2 `https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm3Kz-C8.woff2` |
| Nav link | Inter | 500 | Google Fonts `https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap`; latin WOFF2 `https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.woff2` |
| Loader characters | the system monospace stack: `600 11px ui-monospace, Menlo, Consolas, monospace` (canvas font, scaled by the device pixel ratio) | 600 | none, system font |
| Sparkle glyphs ✦ in the loader | `system-ui, "Segoe UI Symbol", sans-serif` at the sparkle's size | normal | none |

Self-host the two WOFF2 files (`@font-face`, Anton with `font-display: block` so the wordmark never shows in a fallback face; Inter with `font-display: swap`) and preload Anton. In the single-file version both fonts are embedded as base64 `data:font/woff2` URIs.

## 3. Head, colour tokens, base styles

- `<html lang="en">`, charset utf-8, viewport `width=device-width,initial-scale=1,viewport-fit=cover`.
- Title: "UNIT/0 — Studio". Meta description: "UNIT/0 is an independent visual studio."
- Tokens: `--bg: #0c0907` (warm near-black), `--accent: #ff8f5a` (soft ember orange, used for the wordmark, logo, favicon), `--ink: #f3ead8` (cream text).
- Global reset (`box-sizing: border-box`, zero margin/padding). `html, body` background `--bg`, colour `--ink`. Body font Inter, antialiased, `overflow-x: hidden`. Links inherit colour, no underline.
- The loader's own palette (inside its script): background `#0c0907`, accent orange `#f2804a`, cream `#f3ead8`.

## 4. Scaling system

The desktop composition was measured on a 1440 × 900 frame. One design unit `--u = 100vw / 1440`. Every desktop position and size below is "N u" = N × (viewport width / 1440). The hero section is `height: 100vh` (and `100svh` where supported), `min-height: 560u`, `overflow: hidden`, background `--bg`, `position: relative`. Because sizes follow the width, on shorter or taller desktop windows the covers are simply clipped more or less at the bottom edge, exactly like the reference where they run off the screen.

## 5. Section 2 DOM, in order, with every desktop measurement (1440 × 900)

`<main class="hero">` contains, in this order:

1. **Logo** `<a href="/" aria-label="UNIT/0 home">` positioned absolute, `left 39u`, `top 7u`, `46u × 46u`, colour `--accent`, z-index 5. Inside: an SVG with viewBox 0 0 46 46 and one path, a concave 4-point star: start at the top point (23,0), curve to the right point (46,23) with the control pulled toward (24.6,13.8)/(32.2,21.4), then to the bottom point (23,46) via (32.2,24.6)/(24.6,32.2), then to the left point (0,23) via (21.4,32.2)/(13.8,24.6), then back to the top via (13.8,21.4)/(21.4,13.8). So its centre sits at (62, 30).
2. **Nav** `<nav aria-label="Main">` absolute, `right 40u`, `top 16u`, flex row with `gap 34u`, Inter 500, font size `max(14px, 19u)`, letter-spacing −0.01em, line-height 1.2, z-index 5. It contains a single link "Home" (`href="/"`, `aria-current="page"`). Links have a 1px bottom border that is transparent and turns `currentColor` on hover and on the current page, with 2px padding below; the border colour transitions over 0.2 s. (Only the built page is listed; no buttons, pills or extra items.)
3. **Wordmark** `<h1 class="word" aria-label="UNIT/0">` with six `<span aria-hidden="true">` children: U, N, I, T, /, 0 (a zero). Anton 400, uppercase, line-height 1, colour `--accent`, z-index 1, `pointer-events: none`, `white-space: nowrap`. The h1 is absolute, spans the full width, height 1em. Each span is `position: absolute; top: 0; display: block; transform-origin: 0 0`.
   - **Vertical fit**: the letters' cap height must be exactly **364u** and the cap tops must sit at **y = 79u** (so the letters end at y ≈ 443u). Measure Anton on a hidden canvas at 100px: cap ratio = `actualBoundingBoxAscent` of "H" / 100; ascent and descent ratios from `fontBoundingBoxAscent/Descent` of the word. Font size = 364u / capRatio. With line-height 1, the baseline sits at half-leading + ascent, where half-leading = (fontSize − (ascent + descent) × fontSize) / 2; the cap top inside the box = baseline − capRatio × fontSize. Set the h1 `top` = 79u − that offset.
   - **Horizontal fit, letter by letter**: each letter is stretched with `scaleX` onto its own box, in 1440-wide units: U 27→332, N 312→648, I 628→776, T 768→1014, / 971→1166, 0 1144→1416. (These boxes were solved so the visible ink lands on the measured ink of the design: U 45–313, N 339–621, I 648–755, T crossbar 774–1007, slash 993→1153 across its height, 0 1155–1403.) For each span: remove its transform, read its natural width, set `left` = 45u + (boxStart − 45)u and `transform: scaleX((boxEnd − boxStart)u / naturalWidth)`. Re-run the fit after `document.fonts.load('100px Anton')` resolves and on every resize. The result is a heavy, wide, edge-to-edge wordmark spanning x 45u → 1403u with tight ~20–30u gaps; the slash leans right and nearly touches T and 0.
4. **Covers** `<div class="covers">` absolute inset 0, z-index 2, `pointer-events: none`, holding three `div.cover` elements with `role="img"` and aria-labels ("VOLT magazine cover: a woman in a silver utility jacket", "ECHO magazine cover: a man lit by orange light", "SCAN magazine cover: a chrome robot head on orange"). DOM order is VOLT, ECHO, SCAN; stacking is VOLT z 1, ECHO z 2, SCAN z 3 (SCAN sits on top of both neighbours). Each cover rotates around its **top-edge midpoint** (`transform-origin: 50% 0`) and has `box-shadow: 0 14u 40u rgba(0,0,0,.55)`. Positions are given as top-edge midpoint, width, tilt:

| Cover | Top-edge midpoint (x, y) | Width | Height (width × 1168/872) | Tilt | Left edge (midpoint − width/2) |
|---|---|---|---|---|---|
| VOLT | (251u, 433u) | 487u | ≈ 652u | −8.3° | 7.5u |
| SCAN | (741u, 397u) | 459u | ≈ 615u | −4.4° | 511.5u |
| ECHO | (1216u, 427u) | 429u | ≈ 575u | +6° | 1001.5u |

All three run off the bottom of the screen; the section's `overflow: hidden` clips them. The tops of the covers overlap the bottom ~45u of the wordmark letters.

## 6. Portrait phones and tablets (max-width 819px **and** max-aspect-ratio 1/1)

The same parts are re-stacked to fill a tall screen (landscape phones and anything wider keep the desktop composition scaled by width):
- `--u = 100vw / 390`; hero `min-height 560px`.
- Logo `left 16px, top 18px, 28 × 28px`. Nav `right 16px, top 22px`, gap 22px, font size 15px.
- Wordmark: same letter boxes scaled to a width of (viewport − 32px), starting at x 16px; cap height = (viewport − 32) × 364 / 1360; cap top at y = 70px.
- Covers become a staggered vertical fan. Each cover's width `--w = min(60vw, 46svh)`, shadow `0 10px 30px rgba(0,0,0,.55)`. The fan starts at `--covers-top` = cap top + 0.82 × cap height (set from JS, so the first cover overlaps the bottom of the wordmark):
  - VOLT: left 4vw, top = covers-top, tilt −6°.
  - SCAN: right 4vw, top = covers-top + 0.42 × w, tilt +4°.
  - ECHO: left 12vw, top = covers-top + 0.86 × w, tilt −3°, z-index 4 (on top on phones so its title shows).
- Checked at 390×844, 320×568, 768×1024 (fan layout) and 812×375 (desktop composition): nothing scrolls sideways, every part stays visible, and the covers are clipped only at the bottom edge.

## 7. Section 2 entrance (triggered by the loader)

Before the reveal, every wordmark span is clipped to nothing from the right: `clip-path: inset(-5% 100% -5% 0)`, and every cover is pushed below the screen: `transform: translateY(calc(100vh + 20%)) rotate(tilt)` (the drop is a CSS variable so the tilt stays). When the loader adds the class **`eye-loaded`** to `<html>` (25% into the dissolve, about 6.56 s):
- **Wordmark wipe**: each letter's clip-path animates to `inset(-5% -2% -5% 0)` over **0.5 s**, easing `cubic-bezier(.65,0,.35,1)`, staggered left to right with delays 0, 0.07, 0.14, 0.21, 0.28, 0.35 s. The letters appear to be painted in from their left edges, one after another, like the reference's "FOLIO".
- **Covers slide up**: the drop variable goes to 0 over **1.0 s** with easing `cubic-bezier(.16,1,.3,1)` (fast start, long soft settle), delays VOLT 0.45 s, SCAN 0.57 s, ECHO 0.69 s. Each card rises straight up into its tilted resting place.
No hovers, parallax or extra effects are added.

## 8. The loader

The loader is one IIFE in a `<script>` inside `<head>` (so it runs before the page paints). It leaks nothing global except `window.EyeLoader = { replay(), skip() }`. Optional config read before it runs: `window.EyeLoaderConfig = { speed: 1, once: false, bg: "#0c0907", accent: "#f2804a", cream: "#f3ead8" }`. `speed` scales the whole timeline. `once: true` shows it only once per browser session (sessionStorage key `unit0-eyeloader-seen`, every access wrapped in try/catch); the default plays on every load.

### 8.1 Install behaviour and lifecycle
- **Reduced motion** (`prefers-reduced-motion: reduce`): no canvas at all; immediately add `eye-loaded` and `eye-static` to `<html>` (`eye-static` disables the section-2 transitions so everything is simply there) and dispatch `eyeloader:done`.
- **No flash**: immediately inject a `<style>` that paints `html::after { content:""; position:fixed; inset:0; background:#0c0907; z-index:2147483646; pointer-events:none }`. Remove it as soon as the canvas has drawn its first frame.
- **Scroll lock**: save `<html>`'s inline overflow, set `overflow: hidden`, restore the saved value at the end.
- **Canvas**: one visible `<canvas aria-hidden="true">` appended to `<html>`, `position:fixed; inset:0; z-index:2147483647; display:block; pointer-events:auto; background:transparent`. Two off-screen canvases: `frame` (the character grid is drawn here each frame) and `rem` (what is left during the dissolve). All three are sized viewport × devicePixelRatio (capped at 2) and resized on window resize (not during the dissolve).
- **Start**: wait for `document.fonts.ready` or 300 ms, whichever comes first, then build the glyph atlas and start a `requestAnimationFrame` loop.
- **Clock**: the timeline advances only by the time between drawn frames, each step capped at 0.1 s, multiplied by `speed`. So a page opened in a background tab starts its loader from the beginning when it becomes visible.
- **Skip**: any `pointerdown` or `keydown` (capture phase) before the dissolve jumps the clock straight to the dissolve start. `EyeLoader.skip()` does the same.
- **Events**: add `eye-loaded` to `<html>` 25% into the dissolve; when the dissolve time is over **and** every particle is gone, remove the canvas, the cover style and all listeners, cancel the animation frame, drop all buffers, restore overflow, mark the session as seen, and dispatch `CustomEvent("eyeloader:done")` on `document`. `EyeLoader.replay()` removes `eye-loaded`/`eye-static` and runs everything again.

### 8.2 Character rendering
- Grid cells are **8 px wide × 12 px tall** (CSS pixels). For each cell centre, compute a ramp id (orange or cream), a ramp position 0–1, and a brightness 0–1.
- Character ramp, dark to bright (92 characters, the first is a space): `` .`-':,_^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@``. Character index = round(brightness × 91); index 0 draws nothing.
- **Flicker**: every cell gets a random brightness jitter of ±0.08, re-rolled 12 times per second.
- **Scanlines**: every odd row's brightness × 0.84.
- **Alpha** = fade-in alpha × (0.3 + 0.7 × brightness).
- **Fade-in**: each cell has its own appear time = random × 0.33 s + (row / rows) × 0.12 s (random but slightly top-down), and fades to full over 0.15 s.
- **Glyph atlas**: pre-render every character in every colour once into a canvas (92 columns × 32 rows of 8 × 12 cells, at device pixel ratio), using the 600-weight monospace font at 11px, centred in its cell. Each frame, clear `frame` to the background colour and `drawImage` each cell's glyph from the atlas with `globalAlpha`. This keeps ~13,500 cells at 60 fps.
- **Colours**: two 16-step ramps built from the palette (mix = linear RGB interpolation):
  - Orange ramp, 5 stops: deep (accent mixed 80% toward the background, about #3c2015), dark (accent mixed 38% toward black, about #964f2e), accent `#f2804a`, light (accent mixed 50% toward white, about #f9c0a5), white.
  - Cream ramp, 4 stops: the same deep, cream-dark (cream mixed 62% toward the background), cream `#f3ead8`, white.
- **Background characters**: 55% of cells carry a fixed dim value 0.03–0.13 on the cream ramp at position 0.05 (a faint warm dust of characters), halved while the sparkles bloom.

### 8.3 Timeline (seconds at speed 1, every curve easeInOutCubic)

| Phase | Start | Duration | What happens |
|---|---|---|---|
| Fade-in | 0 | 0.5 | Characters appear randomly, slightly top-down. The eye's shutters are closed: openness 0.04, a thin seam at the exact screen centre. |
| Open | 0.5 | 1.0 | Openness eases 0.04 → 1: the top plate slides up and the bottom plate slides down symmetrically, revealing the iris. |
| Look around | 1.5 | 2.0 | The gaze moves through keyframes (fraction of the phase: x, y in eye units): 0: (0,0) · .12: (0,0) · .24: (−.42,.02) · .40: (−.42,.02) · .50: (.38,−.04) · .64: (.38,−.04) · .74: (−.12,−.16) · .86: (−.12,−.16) · 1: (0,0); each segment eased. One **blink** at 45% of the phase (t = 2.4 s): over 0.24 s the openness is multiplied by 1 − 0.97 × sin(π × progress), so the shutters snap shut and reopen. While looking up, the top plate lifts an extra 0.06 × (−gaze y). |
| Zoom | 3.5 | 1.3 | The whole eye scales 1 → 1.9 about the screen centre. |
| Morph | 4.215 (55% into the zoom) | 1.2 | The iris becomes a 4-point star (see 8.5). The housing, shutters and socket fade out (their brightness × (1 − morph)). |
| Sparkle | 4.935 (60% into the morph) | 1.3 | ✦ glyphs bloom and twinkle; the star brightens toward white. |
| Dissolve | 6.235 | 1.3 | Pixel break-up revealing the page (see 8.7). `eye-loaded` at 6.56 s. |

### 8.4 The robot eye model (eye units: housing half-width = 1, y points down)
- **Unit** = min(viewport width × 0.37, viewport height × 0.6) pixels, times the zoom. Centre = screen centre.
- **Housing**: a rounded square, the superellipse |x|⁴ + (|y|/0.74)⁴ < 1, drawn on the cream ramp. Shading: dome = 1 − 0.32 × q² (q = the superellipse value, so corners darken); lit from above: × (1 − 0.12 × y); thin vertical seams where ||x| − 0.74| < 0.012 (× 0.45); a darker outline where q > 0.92 (× 0.55). Brightness = 0.95 × dome × light × seam × outline; ramp position 0.6 + 0.2 × dome.
- **Bolts**: four at (±0.82, ±0.47), radius 0.055; dark ring (cream ramp 0.25, brightness 0.2) with a bright centre of radius 0.025 (cream ramp 0.9, brightness 0.85).
- **Bezel**: a dark ring just outside the socket, radius 0.6 to 0.67 (orange ramp 0.08, brightness 0.22).
- **Socket**: a circle of radius 0.6. Inside it, between iris and rim, a dark gap (orange ramp 0.12–0.42, brightness 0.13 + 0.45 × rim glow), where rim glow = exp(−((r − 0.6)/0.03)²), darkened by a shadow under the top plate: × (1 − 0.5 × exp(−(y − topEdge)/0.1)).
- **Shutter plates**: top edge = −(0.5 + lift) × openness, bottom edge = +0.5 × openness. The top plate covers everything inside the socket above its edge, plus a visible bar outside the socket from its edge up to 0.17 above it where |x| < 0.64. The bottom plate mirrors it. Plates are on the orange ramp at position 0.56, with horizontal grooves every 0.042 units alternating brightness 0.95 and 0.7, a bright lip within 0.025 of the closing edge (+0.25 brightness, ramp + 0.15), and a slight darkening toward the plate ends (× (1 − 0.3 × (|x|/0.64)⁴)). When the openness is 0.04 the two edges meet as a thin seam.
- **Iris**: radius 0.47, centred at gaze × 0.5 (so it stays inside the socket). Orange ramp, position 0.58 + 0.2 × (1 − r) + 0.08 × rings. Brightness = (0.74 + 0.22 × rings + 0.12 × fibres + collarette) × limbal × nearPupil × light × (1 − top shadow), where (r = distance / iris radius):
  - rings = 0.5 + 0.5 × cos(r × 9π), mechanical concentric rings;
  - fibres = periodic value noise of the angle at 24, 48 and 96 cells around (weights 0.5, 0.3, 0.2);
  - collarette = 0.25 × exp(−((r − 0.6)/0.06)²), a brighter ring at 60% of the radius;
  - limbal = 0.55 beyond r 0.9 (dark outer ring); nearPupil = 0.9 inside r 0.5;
  - light = 1 + 0.15 × (dy / iris radius), so the lower half is lighter;
  - top shadow = 0.55 × exp(−(y − topEdge)/0.12), a deep shadow from the top plate.
- **Pupil**: radius 0.39 × iris radius, breathing ± 5% with sin(t × 1.6), near-black (brightness 0.02).
- **Catchlights** (pure white, cream ramp at 1, brightness 1): a 4-pane window centred at (−0.36, −0.36) iris radii from the iris centre, ±0.14 square with a cross-shaped gap of 0.022; and a tiny dot of radius 0.06 iris radii at (+0.3, +0.28).

### 8.5 Morph into the star
During the morph (m eases 0 → 1) the iris region becomes the superellipse |dx|ᵖ + |dy|ᵖ < Rᵖ around the iris centre, with p = 2 − 1.5 × m (circle → concave 4-point star) and R = 0.47 × (1 − 0.06 × m) × (1 + 0.015 × sin(9t)), a tiny pulse. The pupil and the catchlights disappear as soon as the morph begins, and the iris rings blend into a flat star. The star sits on the orange ramp at position 0.5 + 0.22 × (1 − r) + 0.35 × sparkle progress, brightness 0.62 + 0.35 × (1 − r) + 0.3 × sparkle progress, so it ends near white. Housing, shutters, bezel and socket fade with brightness × (1 − m).

### 8.6 Sparkles and the progress bar
- **Sparkles**: one per 8000 px² of viewport (about 162 at 1440 × 900), at random positions. Size = 7 + 48 × random^3.2 px (mostly small, a few up to 55 px). Each is born at a random time in the first 75% of the sparkle phase. Drawn as the "✦" character on `frame`, centred: size × (0.75 + 0.25 × twinkle) × fade-in, where twinkle = 0.65 + 0.35 × sin(age × f × 2π + phase) with f 2–5 Hz, alpha = fade-in (0.25 s) × twinkle, colour mixing from the accent orange to `#ffe6cf` over 0.9 s of age, with a glow (`shadowBlur` = 4 + 0.35 × size, same colour).
- **Progress bar** (the reel's little loading bar): from the start of the morph until the dissolve, at x 16 px, y viewport height − 42 px, 4 px tall. A track min(260 px, 50% of the width) wide in the deep colour, and a fill in the accent colour whose width eases 0 → full over that time. Fades in quickly. It dissolves with everything else.

### 8.7 Dissolve into pixels (1.3 s)
- At the start, set the canvas to `pointer-events: none`, copy the last `frame` into `rem`, and read its pixels once.
- Divide the screen into **12 px blocks**. Seeds are every sparkle (x, y, size) plus the centre star (screen centre, size = unit × 1.9 × 0.47 × 2.2). For each block, effective distance = min over seeds of max(0, distance − 1.2 × seed size) / (1 + seed size / 30), so bigger seeds eat faster. Each block's delay = (0.72 × distance / max distance + 0.15 × random) × 1.3 s.
- When a block's delay passes, clear it from `rem` so the website shows through. Sample its colour (average of 5 points). If its luminance is above 0.32, spawn it as a falling pixel square of its own colour; above 0.62 it splits into four half-size squares. Particles: vx random ±140 px/s, vy −60 to −280 px/s (an upward kick), gravity 900 px/s², fading out linearly over 1 s.
- Each sparkle bursts when reached: 6 + size/5 small glowing squares (2–5 px, white or light orange, `shadowBlur` 8).
- During the first 60% of the dissolve, each frame draws three horizontal glitch slices: a random band 6–32 px tall copied from `rem` and shifted sideways 10–50 px.
- Each dissolve frame: clear the visible canvas, draw `rem`, draw the glitch slices, draw the particles.

## 9. Accessibility and behaviour notes
- The wordmark is a real `h1` with `aria-label="UNIT/0"`; the per-letter spans are `aria-hidden`. Covers are `role="img"` with descriptive labels. The canvas is `aria-hidden`.
- Reduced motion shows the finished page with no loader and no transitions.
- There is no page scroll beyond one screen.

## 10. Acceptance checklist
- On load the screen is never white: the warm near-black cover is there before the first canvas frame.
- The closed eye is a thin seam at the exact centre; the shutters open symmetrically in 1 s; the iris darts left, right and up-left, and blinks once at about 2.4 s.
- Zoom to 1.9×, the iris morphs into a sharp concave 4-point star, the cream housing fades away, ✦ sparkles twinkle with glow, and the progress bar fills bottom-left.
- The loader falls apart in 12 px blocks spreading out from every sparkle, bright blocks fall as pixels, and there are sideways glitch slices early on.
- About 6.6 s in, "UNIT/0" paints in letter by letter in `#ff8f5a`, edge to edge, caps from 79u to 443u; then VOLT, SCAN and ECHO rise into their tilts (−8.3°, −4.4°, +6°) with SCAN on top, overlapping the letters' bottoms.
- When finished: no canvas, no injected style, scrolling restored, `eyeloader:done` fired once, and `EyeLoader.replay()` replays.
- Phones: logo and "Home" on top, wordmark across the full width, covers as a staggered fan; no sideways scroll at 320 px.