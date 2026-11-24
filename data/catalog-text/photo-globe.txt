# Recreation prompt: "For Noor" pitch letter with a photo globe

Build a single-page personal pitch letter from a small brand studio called **ostra** to a future client called **Noor**, who is opening a natural wine and ceramics bar. The page is quiet, letter-like and editorial: one narrow centred column of small sans-serif type on warm paper, broken by one loud element, a large interactive 3D globe made of curved, rounded photo tiles. It ends with an auto-sliding row of work cards and a handwritten sign-off. Recreate it exactly as described below: every text string, colour, size, spacing value, asset URL, animation timing and interaction. Use plain HTML, CSS and JavaScript in one file, plus three.js 0.160.0 for the globe.

---

## 1. Assets

### Photo sheets

Every photo is a cell of a 2×2 photo sheet: one square image (2048×2048 originals) holding four separate photographs edge to edge, with no gutters. Load each sheet through the images.higgs.ai proxy exactly as listed (these responses send `Access-Control-Allow-Origin: *`, which WebGL textures require). Never re-host or crop the files: the page picks individual photos by UV rectangles (globe) or CSS background-position (cards).

| Key | Used for | URL |
|---|---|---|
| g1 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214908_972ea009-91d2-42a4-977a-ed382291fd28.png&w=1536&q=82 |
| g2 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214908_de043f21-7922-4703-a5c9-82046204cc89.png&w=1536&q=82 |
| g3 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214909_66badb95-f635-4a07-9c15-c67f5d88d0f7.png&w=1536&q=82 |
| g4 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214909_5507f81c-80cd-47a0-983d-4345ddeb8612.png&w=1536&q=82 |
| g5 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214909_606ced4c-e1f6-421f-b4e2-9bd156d968ce.png&w=1536&q=82 |
| g6 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214910_218c82bf-b1c3-4c6f-a423-5b3636edcc17.png&w=1536&q=82 |
| g7 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_215016_855d2215-f3f5-4580-8a0f-9ba6087fc97f.png&w=1536&q=82 |
| g8 | Globe | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214908_feb56792-db60-49c5-9158-c19319c26fc0.png&w=1536&q=82 |
| w1 | Work cards | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_214908_8a37af35-014e-49a3-9484-2ce21afdd77f.png&w=1400&q=85 |
| w2 | Work cards | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_215016_d92f187f-c236-48b9-8ac4-f85f5290624e.png&w=1400&q=85 |

All photos share one art direction: warm candlelight and low window light, oxblood wine red, terracotta clay, warm stone, cream linen and paper beige, with film grain and high contrast.

- **g1–g8 (globe):** red wine on linen; hands throwing clay on a wheel; halved figs on terracotta; a candle-lit stone wine bar; stacked speckled bowls; wine poured into a clay tumbler; a long candle-lit communal table; dark grapes on stone; a woman arranging ceramics on shelves; torn sourdough with olive oil; a row of natural wine bottles; dried flowers in a terracotta vase; an oxblood glaze close-up; two clinking glasses; a potter's drying shelf; cheese, figs and honey on clay; a wine bar doorway at dusk on cobblestones; a candle beside a glass; hands holding a clay cup; a vineyard at golden hour; a terracotta pitcher; olives and bread in small dishes; a cup dipped into glaze; a bottle and cups on a sunset windowsill; pomegranate seeds on a cream plate; a stack of oxblood cups; glasses hanging over a bar; a fig, knife and linen still life; roses in a stoneware jug; a wine glass rim macro; a courtyard table under string lights; plates drying on a rack.
- **w1:** top-left, a candle-lit stone-wall table with wine, a bottle with an olive branch and a clay bowl; top-right, figs on a terracotta plate with a wine glass; bottom-left, clay-covered hands on the wheel; bottom-right, an oxblood vase with a dried branch on a plaster plinth.
- **w2:** top-left, a bakery counter with croissants; top-right, a linen hotel bed with a ceramic lamp; bottom-left, an amber perfume bottle on travertine; bottom-right, a terracotta olive oil bottle on a sunlit table.

### Fonts

| Family name in CSS | Source | Weights |
|---|---|---|
| Inter | Google Fonts, latin subset, variable woff2: https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2 | declared as one face with weight range 100–900; the page uses 400, 450 and 500 |
| Signature | Google Fonts "Mrs Saint Delafield", latin woff2: https://fonts.gstatic.com/s/mrssaintdelafield/v14/v6-IGZDIOVXH9xtmTZfRagunqBw5WC62QKknLw.woff2 | 400 |

Both faces use `font-display: swap`. The body stack is Inter, then system-ui, -apple-system, "Segoe UI", sans-serif. Turn on the font features cv11 and ss01, and use antialiased font smoothing.

### Library

three.js 0.160.0 ES module from https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js, loaded in a `type="module"` script.

---

## 2. Head and tokens

- **Title:** "ostra · For Noor".
- **Meta description:** "A personal pitch letter from ostra, a small brand studio, to Noor about her upcoming natural wine and ceramics bar."
- **theme-color:** #E4DED3.
- **Motion gate:** a tiny inline script in the head adds the class `anim` to `<html>` only when all three hold: reduced motion is not requested, IntersectionObserver exists, and Element.animate exists. Every text-reveal starting state is scoped under `html.anim`, so without JavaScript or with reduced motion all text is simply visible.

Colour tokens:

| Token | Value | Use |
|---|---|---|
| paper | #E4DED3 | page background; also the colour globe tiles fade toward at the rim |
| stone | #C9C3B8 | card placeholder colour behind images |
| ink | #1B1815 | headings, logo, signature, name block |
| body | #5E574F | all paragraphs (about 5.8:1 contrast on paper) |
| oxblood | #8A0B12 | pull-quote, card index numbers, primary button, text selection |
| oxblood-deep | #6E070D | primary button hover |

- **Text selection:** oxblood background with #F4EEE6 text.
- **Base text:** 15px with line-height 1.45, and horizontal overflow on the body is hidden.
- **Content column:** `clamp(300px, 43.2vw, 780px)` wide, centred with auto margins. At 1440px this is 622px wide, from x = 409 to x = 1031.
- **Globe size:** `clamp(300px, 45vw, 860px)` square. At 1440px it is 648px.

---

## 3. Layout, top to bottom (desktop, 1440px wide)

### 3.1 Masthead

The masthead sits in the column with 72px of top padding and is a flex row. It holds only the logo link, aria-label "ostra, home". There is no divider line, no issue number and no navigation.

- **Logo mark:** an inline SVG 34×28 (viewBox 0 0 34 28) of a scallop shell, drawn with a 1.25px currentColor stroke, round caps and joins. The outline is a fan-shaped shell. Seven straight ribs radiate from the hinge point (17, 25.2) to the rim at x = 17, 10.8, 23.2, 5.6, 28.4, 2.3 and 31.7. A small filled trapezoid hinge sits under it, from (13.6, 25.6) to (20.4, 25.6), narrowing to (19.3, 27.4) and (14.7, 27.4).
- **Wordmark:** "ostra" sits 11px to the right, in Inter at 18px, weight 450, letter-spacing −0.01em, ink colour.

### 3.2 Letter

72px top padding.

- **Heading (h1):** two lines, "For Noor," and "and what comes next".
  - Type: Inter 500, `clamp(25px, 2.12vw, 38px)` (30.5px at 1440), line-height 1.13, letter-spacing −0.018em, ink.
  - Structure: each line is its own block-level mask span (overflow hidden, padding-bottom 0.08em balanced by margin-bottom −0.08em so descenders aren't clipped) holding an inner span. The h1 carries aria-label "For Noor, and what comes next" and the line spans are aria-hidden.
- **Paragraph:** 26px below the heading, max-width 88% of the column, body colour, `clamp(14px, 1.04vw, 17px)` (15px at 1440), line-height 1.5. Text: "Hi Noor, opening a natural wine and ceramics bar feels like the most natural next step for you. I put this page together because the way you set a table, glaze a cup and host a room already reads like a brand. It deserves a home that feels the same."

### 3.3 Globe

- **Wrapper:** a square of the globe size, centred, 70px below the letter, with `position: relative`.
  - **Canvas:** fills the wrapper, with `touch-action: pan-y` so phones still scroll vertically. The cursor is `grab`, and `grabbing` while dragging.
  - **Canvas accessibility:** role="img" with aria-label "A slowly turning globe of photographs: red wine by candlelight, clay cups on the wheel, figs on terracotta, linen tables and stone walls. Drag to spin it."
  - **Fallback:** behind the canvas sits a circular radial-gradient disc (#d3c8b8 to #c4b6a2), hidden by default. It shows only if WebGL can't start; the page adds `no-webgl` to `<html>`.
- At 1440×900 the top of the globe sits at about y = 437, so on load the upper half shows under the letter and the lower half is cut off by the bottom of the viewport.

### 3.4 Studio text

The studio text sits in the column with 56px top padding. Paragraphs are body colour, `clamp(14px, 1.04vw, 17px)`, line-height 1.5 and max-width 92%. Consecutive normal paragraphs are 28px apart.

1. "My name is Ines. Together with my partner Theo, I run a small studio called ostra. We make brands, websites and digital products for founder-led places. Most of these turn into years-long relationships, long after the doors first open."
2. **Pull-quote:** centred, full column width, oxblood, Inter 500 at `clamp(20px, 1.62vw, 29px)` (23.3px at 1440), line-height 1.18, letter-spacing −0.014em. Margins are 92px above and 88px below. It has two lines with a forced break: "A bar like yours only works when it" / "feels like a place, not a product."
3. "Anything less feels borrowed. We stay close to the craft, work side by side with founders and skip the templates, so what we make feels as handmade as the cups you throw. The work lasts because it starts from you."
4. "The projects below each show a different part of what a place like yours needs: warm, tactile storytelling for people who come back, not a shop that looks like it was set up in an afternoon."

### 3.5 Work row

- **Position:** 64px below the studio text. The row starts at the column's left edge and runs off the right edge of the viewport. The clipping rail is `calc(100vw − (100vw − column) / 2)` wide with an equal negative right margin, and hides overflow.
- **Track:** a flex row with a 17px gap.
- **Cards:** eight link cards, each `clamp(240px, 22.1vw, 400px)` wide (318px at 1440).
  - **Index number:** two digits (01–08) in oxblood, Inter 11.5px, letter-spacing 0.02em, tabular numerals, 10px above the image.
  - **Image box:** aspect-ratio 318/275, corner radius 2px, stone background.
  - **Photo:** the sheet set as background-image with `background-size: 200% auto` and no repeat, so each quadrant exactly covers the card width. Quadrant positions: top-left "0% 6%", top-right "100% 6%", bottom-left "0% 94%", bottom-right "100% 94%". The 6% and 94% centre the square quadrant vertically in the shorter card.
  - **"View Project" pill:** absolute, 12px from the right and bottom; background #FBF8F3, text #1B1815, Inter 500 12px, line-height 1, padding 9px 13px, fully rounded, shadow 0 1px 2px rgba(27,24,21,.12).
  - **Cursor and labels:** cards show the pointer cursor. Each card's aria-label is "View project NN: name".

Card order:

| No. | Sheet and quadrant | Name |
|---|---|---|
| 01 | w1 top-left | Vela, wine bar identity |
| 02 | w1 bottom-right | Ferro, ceramics studio |
| 03 | w2 top-left | Mattina, bakery website |
| 04 | w1 top-right | Fico, supper club |
| 05 | w2 bottom-left | Ambra, fragrance launch |
| 06 | w1 bottom-left | Tornio, pottery school |
| 07 | w2 top-right | Casa Lino, boutique hotel |
| 08 | w2 bottom-right | Oliva, olive oil shop |

### 3.6 Sign-off

The sign-off sits in the column with padding 62px top and 140px bottom.

- **Thank-you line:** body colour, `clamp(14px, 1.04vw, 17px)`. Text: "Thank you for reading this far, Noor. We'd love to hear from you, zero commitment."
- **Signature:** "Ines" in the Signature font, `clamp(52px, 4.1vw, 70px)` (59px at 1440), line-height 1, ink. It sits 34px below the thank-you line, nudged −4px left, with height 0.9em. It is aria-hidden.
- **Name block:** 26px below the signature, Inter 14px, line-height 1.5, ink, on two lines: "Ines Marlow" / "Co-founder, ostra".
- **Buttons:** a flex row 30px below the name block, with a 16px gap. Both buttons are 43px tall pills with 30px side padding, Inter 500 13.5px and letter-spacing −0.005em. Colour changes transition over 0.25s.
  - **"Book a call":** oxblood background with #FBF5EE text; hover changes the background to oxblood-deep.
  - **"About us":** transparent, with a 1px rgba(27,24,21,.42) border and #3A342E text; hover changes the border and text to ink.
- **Focus:** a visible focus ring on buttons and cards, 2px oxblood with a 3px offset.

---

## 4. The globe in detail (three.js)

### Renderer and camera

- **Renderer:** WebGLRenderer on the canvas with antialias and alpha on, pixel ratio `min(devicePixelRatio, 2)`, and output colour space LinearSRGB. The textures are left in their default colour space, so photo colours pass through untouched and match CSS.
- **Camera:** a perspective camera at z = 3.7 looking at a unit sphere (radius 1). The vertical field of view is `2·asin(1/3.7)` in degrees × 1.015, so the sphere exactly fills the square canvas with a hair of margin.
- **Resizing:** a ResizeObserver on the wrapper resizes the renderer and camera aspect.

### Tile layout

- **Latitude rings:** nine bands, with heights from top to bottom of 11, 14, 17, 21, 24, 21, 17, 14 and 11 degrees. There is a 2.1° gap between bands, and the whole stack is centred vertically on the sphere, so roughly 6° caps at each pole stay empty.
- **Random source:** a seeded Park–Miller generator with seed 20261113, where s = s·16807 mod 2147483647 and the value returned is s / 2147483647.
- **Tiles within a band:** each band is filled around the full 360° with tiles whose arc width is the band height × (0.82 + random × 0.62), divided by sin(band centre polar angle). That keeps tiles roughly square-ish to 1.4 wide on the surface.
  - Gaps between tiles in longitude are 2.1° / sin(centre).
  - All widths and gaps are scaled together so the ring closes exactly.
  - The ring starts at a random longitude.
- **Collage jitter:** 45% of tiles are shortened by a random 0–20% of the band height, flush to either the top or the bottom of the band at random.
- **Geometry:** each tile is its own SphereGeometry patch (radius 1, phiStart/phiLength from the longitude span, thetaStart/thetaLength from its polar span). Segments are about one per 3°, with a minimum of 6 each way. Tiles are truly curved with the sphere, not flat cards.

### Photo assignment

- **Order:** tiles are numbered in creation order, top band first and around each ring. Tile n uses sheet n mod 8 and quadrant floor(n/8) mod 4, so all 32 photos are used before any repeats.
- **Cropping:** each tile's photo is a UV sub-rectangle of its quadrant. Inset 3.5% from the quadrant edges, then centre-crop to the tile's on-surface aspect (arc width / arc height at the tile's mid-latitude).

### Material

The tiles use a custom ShaderMaterial: transparent, depth write on, front faces only, so the back of the sphere is culled and the paper shows through the gaps.

- **Vertex shader:** passes the UV and the facing factor (dot of the view-space normal with the direction to the camera, clamped 0–1).
- **Fragment shader:**
  - **Rounded corners:** a rounded-rectangle signed distance in tile space, scaled by the tile aspect, with corner radius 0.085 of the tile height. The edge is antialiased with smoothstep over ±1.2·fwidth.
  - **Colour:** sampled at rect.xy + uv·rect.zw.
  - **Rim fade:** the colour mixes toward paper (#E4DED3) by (1 − facing)^2.2 × 0.62, so tiles near the silhouette wash out softly into the page, as in a printed sphere.
  - **Opacity:** alpha is the mask × the per-tile opacity uniform. Fragments under 0.003 are discarded, and the output is premultiplied (colour × alpha, alpha).

### Base pose

- The sphere group's X rotation (tilt) rests at 0.2 rad, so the top cap shows. Its Y rotation starts at −0.6 rad.
- There is no idle auto-rotation: the globe stays still unless something moves it.

### Load intro

The intro starts when all 8 textures have loaded, or after a 4s safety timeout.

- **Shape (1.1s, ease-out cubic, p from 0 to 1):**
  - Uniform scale s = 0.42 + 0.58p, with the Y scale additionally multiplied by (0.22 + 0.78p). The globe starts as a wide, squashed band and inflates into a sphere.
  - Group y position = −(1 − p) × 0.62, so it rises from the bottom.
  - A spin-in adds (1 − p)² × 2.6 rad/s to the Y rotation.
- **Tile build-up (one by one, bottom to top):**
  - Each tile gets a start delay: (ring index counted from the bottom ring) × 0.2s, plus (its position in its ring sorted by longitude ÷ tiles in ring) × 0.42s.
  - From its delay, the tile fades in over 0.5s with ease-out cubic.
  - At the same time its mesh scale goes from 0.9 to 1.0, so it rises out from just inside the sphere onto the surface.
  - The bottom ring fills first, tile after tile around it. Each ring above starts 0.2s later, and the top ring finishes about 2.5s after the start.
  - Once the time passes the end of the sequence, all tiles are set to fully visible in one final pass, even if frames were skipped.

### Scroll coupling

- Every scroll event adds (scroll delta in px × 0.0042) rad/s to the angular velocity, clamped to ±6. Scrolling down spins one way and scrolling up spins the other.
- Each frame, the Y rotation advances by velocity × dt, then the velocity decays by exp(−2.6·dt). The globe coasts briefly and stops.
- Tilt eases back toward 0.2 with a factor of 1 − exp(−2.2·dt) per frame.

### Drag

- **Pointer down on the canvas:** capture the pointer, add the `drag` class (grabbing cursor) and zero the velocity.
- **Pointer move:** the Y rotation changes by dx × (2.6 / wrapper width), and the tilt changes by dy × (2.6 / wrapper width) × 0.8, clamped to −0.55…0.75. The horizontal velocity is tracked as a smoothed value (0.6 old + 0.4 new).
- **Release:** the tracked velocity becomes the spin velocity (clamped ±6), so the globe keeps spinning and slows with the same decay. The tilt then eases back to 0.2.

### Performance

An IntersectionObserver (120px root margin) pauses rendering while the globe is off screen, except during the intro and tile build-up.

---

## 5. Text reveals

Text reveals use the Web Animations API, so they can be scrubbed for recording. The easing for all of them except the h1 lines and the signature is cubic-bezier(.22,.8,.24,1).

| Element | Trigger | Animation | Duration | Delay |
|---|---|---|---|---|
| Logo link | on load (in view) | opacity 0→1, translateY 18px→0, blur 6px→0 | 1000ms | 0 |
| h1 line 1 | on load | inner span translateY 105%→0 inside its mask, easing cubic-bezier(.2,.75,.15,1) | 1100ms | 120ms |
| h1 line 2 | on load | same | 1100ms | 230ms |
| Letter paragraph | on load | rise and de-blur | 1000ms | 420ms |
| Each studio paragraph and the pull-quote | entering the viewport | rise and de-blur | 1000ms | 0 |
| Work cards | entering the viewport | rise and de-blur | 1000ms | 0, 110, 220, 330, 440ms for the first five; 440ms for the rest |
| Thank-you line | entering | rise and de-blur | 1000ms | 0 |
| Signature | entering | clip-path inset(0 100% 0 0) → inset(0 0 0 0), a left-to-right writing wipe, easing cubic-bezier(.6,.1,.3,1) | 1400ms | 180ms |
| Name block | entering | rise and de-blur | 1000ms | 350ms |
| Buttons row | entering | rise and de-blur | 1000ms | 480ms |

- **Triggers:** "Entering" uses one IntersectionObserver with rootMargin 0 0 −8% 0. Each element animates once and is then unobserved.
- **Starting states:** hidden states (opacity 0, the h1 spans at 105%, the signature fully clipped) apply only under `html.anim`. The script sets the final state inline and plays the animation with `fill: backwards`.
- **Errors:** if anything throws, the script removes `anim` so the text simply shows.

---

## 6. Work slider motion

- Every 2.4s, unless a slide is running or the tab is hidden, the track slides left by one card width plus the 17px gap.
- The slide is a Web Animation lasting 900ms with easing cubic-bezier(.65,0,.35,1).
- When it finishes, the first card moves to the end of the track and the transform resets. The loop is seamless and infinite; the index numbers travel with their cards.
- Hovering does not pause the slider.

---

## 7. Small screens (max-width 820px)

| Element | Change |
|---|---|
| Column | 100vw − 44px (22px side gutters) |
| Globe | 100vw − 24px, margin-top 46px |
| Masthead | top padding 34px; wordmark 17px |
| Letter | top padding 52px; h1 27px; paragraph full width at 15px |
| Studio text | top padding 40px; paragraphs full width at 15px |
| Pull-quote | 22px with balanced wrapping; its forced line break is hidden; margins 64px top and 60px bottom |
| Work row | margin-top 48px; cards 72vw wide; gap 12px |
| Sign-off | padding 48px top and 96px bottom; thank-you line 15px; signature 56px |

Nothing scrolls horizontally at 375px.

---

## 8. Reduced motion

With prefers-reduced-motion: reduce:
- No text reveals run; all text is visible immediately.
- The globe appears fully built, at full scale and with every tile opaque, with no intro and no scroll-driven spin. Dragging still works.
- The work slider doesn't auto-advance; its rail becomes horizontally scrollable instead.

---

## 9. Acceptance checklist

- At 1440×900 on load, the logo, the two masked heading lines and the letter reveal in sequence.
- The globe rises from a squashed band at the bottom of the viewport, grows and spins into a sphere, and its photos fill in one by one from the bottom ring to the top within about 2.5s.
- Tile corners are rounded and antialiased, and tiles near the edge fade toward the paper colour. No back-facing tiles are visible through the gaps.
- Scrolling spins the globe and it coasts to a stop. Dragging spins and tilts it with momentum, and the tilt settles back.
- The pull-quote is oxblood and centred on two lines. The paragraphs and quote rise in softly as they enter.
- The work row starts at the column edge, bleeds off the right edge, and advances one card every 2.4s forever.
- The signature wipes in left to right, followed by the name and the two pill buttons.
- At 375px wide: one column, the globe nearly full width, cards at 72vw, and no horizontal scroll.
- With reduced motion, everything is static and visible.
- No real brands, people or logos appear anywhere. The studio "ostra", the client "Noor", the people "Ines Marlow" and "Theo", and every project name are fictional.