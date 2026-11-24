# Embers Foundry: recreation prompt

Give me the superdetailed exact prompt to recreate this page exactly as it is, including the correct asset URL, all elements, animations, and fonts.

Build a single-file, two-state landing page called "Embers Foundry". It is a dark, cinematic, full-viewport page with no document scroll. The first state is a hero: a straight-on view of an iron gate in a stone courtyard, with a giant word "Embers" behind two charcoal rock mounds. The second state ("section 2") shows the same courtyard from a three-quarter angle, with a title, a paragraph and three image cards. One wheel tick, swipe or key press switches between the states. Between them, a pre-rendered camera-move video is scrubbed from a frame cache while the text animates with masks. Every timing below was measured frame by frame from the reference reel. Copy the numbers exactly.

## 1. Assets (use these exact URLs; do not re-host)

Every image goes through the Higgsfield image proxy. The pattern is https://images.higgs.ai/?default=1&output=webp&url=ENCODED_RESULT_URL&w=WIDTH&q=85.

| Role | Exact URL used in the page | Notes |
|---|---|---|
| Hero background plate (straight-on view, no UI, no word, no mounds) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061107_c3030a30-c49e-4b74-be3f-c8a0750c193b.png&w=1344&q=85 | 1344×752 source. Dark stone courtyard, black iron torii-style gate with a glowing molten copper disc behind its bars, two braziers with flames, warm skylight slit at the top, wet reflective floor, dark red tree at the right edge. |
| Section 2 background plate (three-quarter view of the same courtyard) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061140_af2262a5-c52c-472a-be3c-ccfbdf621c3a.png&w=1344&q=85 | 1344×752. Gate on the right two-thirds, skylight running diagonally, dark rock in the bottom-left foreground. |
| Rock mounds cut-out (transparent PNG) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_071757_11ac0e5d-35f5-4e49-bdab-2cee6a7a2ae3.png&w=1344&q=85 | 1344×752 with alpha. Two charcoal rock mounds with an orange rim light. The left mound is highest at the left edge, the right mound is highest at the right edge, and their slopes meet in a V exactly at the bottom centre. The same image is used twice: once clipped to its left half, once to its right half. Load it with crossorigin="anonymous". |
| Card art sheet (2×2 grid) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061140_b66e0e91-d128-4f2f-9076-3a6fee12924e.png&w=1024&q=85 | 1024×1024. Top-left: a stone forge hall with columns and a light shaft. Top-right: a lantern-lit workshop with long tables. Bottom-left: an anvil with a glowing bar and sparks. Bottom-right: the iron gate with braziers. Show each quadrant with background-size 200% 200%. |
| Camera-move video (Kling 3.0, 5 s, 24 fps, 121 frames, 1280×716, H.264, no audio) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261123_061238_19527355-b1cd-46dc-b72e-6eb7e0efd788.mp4 | Its first frame is the hero plate and its last frame is the section 2 plate. One continuous camera arc to the right. Served with Access-Control-Allow-Origin: *, so fetch it with mode "cors". |

## 2. Fonts

| Family name in CSS | Source file | Axes and use |
|---|---|---|
| "Archivo Wide" (Archivo variable, latin subset) | https://fonts.gstatic.com/s/archivo/v25/k3kQo8UDI-1M0wlSfdnoLg.woff2 | Declare it with font-weight 300 600, font-stretch 62% 125% and font-display swap. It is the display face for the hero title, the big word, the caption numbers and the section 2 title. |
| "Onest" (latin) | https://fonts.gstatic.com/s/onest/v11/gNMKW3F-SZuj7xmf-HY.woff2 | Weight 400 to 500, font-display swap. Body text, nav links, card labels. The body falls back to system-ui and sans-serif. |

In the standalone file both fonts are embedded as base64 WOFF2 data URIs. Body text uses -webkit-font-smoothing: antialiased.

## 3. Document, tokens and scaling

The tab title is "Embers Foundry". Set the viewport meta to width=device-width, initial-scale=1 and the html lang to "en".

Colour tokens:

| Token | Hex | Use |
|---|---|---|
| --deep | #121110 | Page and stage background |
| --dark | #1F1815 | Card and video-card fill behind images |
| --accent | #5D3827 | Palette member (copper shadow) |
| --soft | #C5794B | Palette member (copper glow) |
| --light | #EDE3DA | All text, icons, the big word, menu lines |

Text tints used: rgba(237,227,218,.86) for paragraphs, .82 for caption text, .8 for glyph icons, .4 for the caption divider lines, .18 for the video-card border and .12 for the card borders.

Units:
- **--u** (UI unit) = min(100vw / 1440, 100vh / 810). The desktop UI is designed on a 1440×810 frame, and every desktop measurement below is in u. At exactly 1440×810, 1u = 1px.
- **--s** (scene unit) = 100vw / 1440. Used only for the big word and the mounds so they always line up with each other.
- **--ease-out** = cubic-bezier(.16,1,.3,1), used only for the card image hover zoom.

The universal reset is margin 0, padding 0 and box-sizing border-box. html and body are 100% tall with overflow hidden, background --deep and color --light. The body has overscroll-behavior none. Links inherit colour and have no underline.

## 4. Structure (DOM order, desktop measurements in u at 1440×810)

Everything lives in one main element, class "stage", fixed with inset 0, overflow hidden and background --deep. On page load it also carries the class "pre". Layers from back to front:

1. **Hero plate** (img, class "plate plate-h1"): absolute inset 0, 100% × 100%, object-fit cover, centred, transform-origin centre. Use fetchpriority high and decoding async.
2. **Section 2 plate** (img, class "plate plate-s2"): same box, opacity 0 until section 2 is reached.
3. **Camera canvas** (canvas, class "cam", internal size 1280×720): same box with object-fit cover, opacity 0. It becomes opacity 1 when the stage has the class "cam-on".
4. **Shade** (div): absolute inset 0, pointer-events none. Vertical gradient from top to bottom: rgba(18,17,16,.72) at 0%, .18 at 22%, 0 at 40%, 0 at 75%, .35 at 100%.
5. **Foreground box** (div, class "fg"): absolute, left 0, right 0, bottom 0, height 810 × --s, overflow hidden, pointer-events none. It holds, in this order:
   - **The big word** (div, class "word"): absolute, left −44s, top 452s. Archivo Wide at stretch 125%, weight 600, size 340.6s, line-height 1, letter-spacing −.035em, colour --light, nowrap. Inside it is one span with display inline-block, transform scaleX(1.05) and transform-origin top-left. The span holds six italic elements, one per letter of "Embers" (E, m, b, e, r, s), each inline-block with font-style normal. The word runs off both screen edges slightly: the E's stem is cut at the left and the s at the right.
   - **Left mound** (img, classes "mounds mound-l") and **right mound** (img, classes "mounds mound-r"), both using the mounds cut-out URL. Each is absolute, left 0, bottom 0, width 100%, height = 810 × --s × 0.64 + --mb, with object-fit fill so the art is gently squashed to sit low on the bottom edge. --mb is 0 on desktop. The left one has clip-path inset(0 50% 0 0) and the right one inset(0 0 0 50%), so each shows only its own mound. The word sits behind both.
6. **Nav** (header, z-index 5): absolute along the top, height 86u, flex with space-between and centred items, padding 0 30u 0 26u.
   - **Logo**: a 56×56 viewBox SVG drawn at a width of 52u (minimum 40px) with stroke --light 1.6. It has an outer circle r26, an inner dashed circle r21 (stroke .8, dasharray 1.5 3), a filled flame path in the middle, and two short horizontal anvil lines under it (from 17 to 39 at y41, and from 20 to 36 at y45, round caps). The aria-label of its link is "Embers Foundry home".
   - **Links**: an unordered list, absolute, left 436u, vertically centred, flex with a gap of 80u. Each li has overflow hidden (it is the mask for the entrance). The items are Forges, Halls, Relics, Braziers, Ashes. Each link is inline-block with padding 6px 0, line-height 14px, size max(11px, 12.5u), weight 500, letter-spacing .02em, uppercase and opacity .92. On hover its opacity goes to .6 over .3s.
   - **Menu button**: max(28px, 32u) wide by max(28px, 24u) tall. A column flex with a gap of max(6px, 9u) holding two 1.5px lines in --light. No background or border. Its aria-label is "Menu".
7. **Glyph column** (div, z-index 4): absolute at left 32u, top 211u. A column flex with a gap of 13.8u holding seven 16×16 icons drawn at a width of 17u (minimum 11px), colour rgba(237,227,218,.8). From top to bottom: a dagger cross (vertical line with a short bar at y5), a diamond outline, a plus, four dots around a centre dot, an eight-spoke asterisk, a filled four-point star, and a triangle with a bar inside.
8. **Hero section** (section, class "h1", absolute inset 0, pointer-events none; its UI children re-enable pointer events):
   - **Title** (h1): absolute, left 38u, top 93u, overflow hidden, padding-bottom .08em. Archivo Wide at stretch 100%, weight 400, size 48.4u, line-height 1.2, letter-spacing −.012em, word-spacing .12em, uppercase, nowrap. Its text is in an inner span (display block) so it can slide inside the h1's mask. Text: "Forging ancient fire into lasting wisdom." It spans from x 41 to x 1180 on one line.
   - **Body** (p): absolute, left 1210u, top 99u, width 194u, overflow hidden. Onest at size max(11px, 12.6u), line-height 1.36, colour rgba(237,227,218,.86). Text, in an inner block span: "A timeless craft, where heat and patience shape something greater than metal." It wraps to three lines.
   - **Video card** (a, aria-label "Play film"): absolute, left 92u, top 206u, 164u × 114u, with a 1px border in rgba(237,227,218,.18), fill #1f1815 and overflow hidden. Its background image is the card art sheet at background-size 200% 200% and background-position 100% 100% (the gate quadrant). An overlay pseudo-element tints it with rgba(18,17,16,.18). It has a centred play triangle: a 24×24 SVG at a width of 26u (minimum 16px), path from 7,4 to 19,12 to 7,20, closed, stroke #EDE3DA 1.4, no fill, id "play".
   - **Captions**: a container, absolute, left 0, right 0, bottom 14u, height 40u. Each caption is absolutely positioned on the bottom with overflow hidden (its mask): number 01 at left 37u, 02 at 411u, 03 at 786u, 04 at 1173u. Inside each is a flex row (class "mi") with centred items and a gap of 14u:
     - The number: Archivo Wide at stretch 104%, weight 300, size 33.3u, line-height 1.
     - A two-line span with a 1px left border in rgba(237,227,218,.4), padding-left 12u, size max(11px, 11.6u), line-height 1.3, colour rgba(237,227,218,.82).
     - The texts are "Ancient techniques, / modern purpose.", "Crafted by fire, / refined by time.", "More than metal, / enduring legacy." and "The forge lives / in what we build."
9. **Section 2** (section, class "s2", absolute inset 0). All its UI starts at opacity 0.
   - **Title** (h2): absolute, left 74u, top 124u. Archivo Wide at stretch 90%, weight 400, size 37.7u, line-height 43u, uppercase. Three lines: "Unveiling / deep halls / of the forge."
   - **Paragraph**: absolute, left 74u, top 289u, width 246u. Size max(11px, 14.2u), line-height 1.5, colour .86. Text: "Step into the heart of the foundry, where stone and fire work together. Here, ancient craftsmanship meets enduring purpose, and every corner holds a story of resilience, skill and the timeless pursuit of something lasting." It wraps to seven lines.
   - **Arrow**: a 26×26 SVG, absolute at left 73u, top 472u, width 26u (minimum 24px). An up-right arrow: a line from 3,23 to 23,3 plus a corner from 8,3 to 23,3 to 23,18, stroke 1.5.
   - **Cards row**: absolute, left 704u, top 480u, flex with a gap of 19u. There are three links, each 216u × 246u with fill #1f1815, a 1px border in rgba(237,227,218,.12) and overflow hidden.
     - Each card has an inner image layer that covers it, using the card art sheet at background-size 200% 200%. Card 1 uses position 0 0 (forge hall), card 2 uses 100% 0 (workshop) and card 3 uses 0 100% (anvil).
     - On hover the image layer scales to 1.05 over .9s with --ease-out.
     - A bottom gradient overlay runs from rgba(18,17,16,0) at 55% to rgba(18,17,16,.55) at 100%.
     - The label "Exploring" sits at left 16u, bottom 14u, size max(11px, 16.5u), weight 500, letter-spacing .02em, uppercase.

## 5. Mounds clean-up (runtime)

When the mounds image loads, draw it to a canvas and clean the green edge left by the background removal. For each pixel with alpha:
- Let m = max(r, b) and d = (g − m) / 255.
- If d > 0, multiply the alpha by (1 − smoothstep(.10, .38, d)) and set g = min(g, m × .96).

Write the result to a blob URL and give that same URL to both mound images. A promise resolves once both images have decoded the new URL. The intro waits for it (see 7), so the mounds never blink. If anything fails, resolve the promise anyway.

## 6. Camera clip frame cache (runtime)

1.2 s after the script starts, fetch the MP4 as an ArrayBuffer.
- Parse its moov box by hand to get the avcC description, the codec string, and the sample table (stsz, stsc, stco/co64, stss).
- Decode every sample in order with WebCodecs VideoDecoder.
- Draw each output frame to a 1280×720 canvas, then encode it with canvas.toBlob as a JPEG at quality .86.
- Keep the blobs sorted by timestamp: 121 frames.

The cache counts as ready when it holds more than 20 frames. If WebCodecs is missing or fails, fall back to playing a hidden muted video once and grabbing each presented frame with requestVideoFrameCallback.

Scrubbing works like this:
- A progress value p from 0 to 1 maps to frame round(p × (frames − 1)).
- Up to six frames ahead in the direction of travel are decoded with createImageBitmap, with no more than 4 decodes in flight.
- The nearest already-decoded frame at or behind the target is drawn to the visible canvas.
- Bitmaps more than 10 frames from the playhead are closed once more than 24 are cached.

**runCamera(forward, delay, duration):**
- After the delay, add the class "cam-on".
- Animate p from 0 to 1 (forward) or 1 to 0 (back) with an ease-out cubic, 1 − (1 − x)³, over the duration.
- At the end, set the section 2 plate's opacity to 1 (forward) or 0 (back). When going back, also remove "cam-on".
- If the cache isn't ready, or the user prefers reduced motion, crossfade the section 2 plate instead with cubic-bezier(.33,1,.68,1) over the same timing.

## 7. Load sequence (ms from the first frame; all Web Animations with fill both)

The intro starts two animation frames after three things are ready: the fonts, the hero plate decode and the cleaned mounds. A 2500 ms failsafe starts it anyway. On start, remove the class "pre". While "pre" is set:
- All UI, the nav links, the menu and the whole foreground box are at opacity 0.
- The hero plate is pre-scaled to 1.3.

Easings: QOUT = cubic-bezier(.25,1,.5,1) (quart out), COUT = cubic-bezier(.33,1,.68,1) (cubic out), CIN = cubic-bezier(.32,0,.67,0) (cubic in).

| Element | From → to | Delay | Duration | Easing |
|---|---|---|---|---|
| Hero plate (scene zoom-out) | scale(1.3) → none | 0 | 1350 | QOUT |
| Right mound (stays on the bottom edge, slides in from the right) | translateX(45%) → none | 0 | 1700 | QOUT |
| Left mound (stays on the bottom edge, slides in from the left) | translateX(−45%) → none | 40 | 1700 | QOUT |
| Nav link 1 to 5, each inside its li mask | translateY(−110%) → none | 100, 200, 300, 400, 500 | 300 each | COUT |
| Menu icon | opacity 0 → 1 | 530 | 200 | linear |
| Hero title inner block, sliding down out of the h1's top mask | translateY(−100%) → none | 390 | 950 | COUT |
| Hero body inner block, sliding up out of the p's bottom mask | translateY(100%) → none | 450 | 900 | COUT |
| Video card | opacity 0 → 1 | 570 | 260 | linear |
| Glyph column | opacity 0, translateX(10px) → opacity 1, none | 600 | 400 | COUT |
| Big word letters E, m, b, e, r, s | opacity 0, translateY(.06em) → opacity 1, none | 630 + [0, 100, 270, 240, 200, 370] | 450 each | COUT |
| Play triangle | opacity 0 → 1 | 970 | 230 | linear |
| Caption 01, 02, 03, 04 inner rows, each sliding up out of its caption's mask | translateY(100%) → none | 730, 870, 970, 1000 | 220 each | COUT |

So the letters appear in the order 1, 2, 5, 4, 3, 6. The mounds start just off-screen: only a sliver of the right mound shows on the first frame. They close until they meet at the bottom centre. Scrolling is locked until 1450 ms.

## 8. Scroll transition: hero to section 2

**Triggers:**
- A wheel event with |deltaY| above 4. All wheel events call preventDefault.
- A touch swipe of more than 30px. The touchmove handler is non-passive and calls preventDefault.
- ArrowDown, PageDown or Space go down. ArrowUp or PageUp go up.

A lock ignores input while a transition runs. Before each transition, every running animation is committed (commitStyles) and cancelled, so the next one starts from the exact current pose. Time 0 is the trigger.

**Hero out:**

| Element | Motion | Delay | Duration | Easing |
|---|---|---|---|---|
| Hero title inner block | none → translateY(−100%) (slides up into its top mask) | 0 | 280 | CIN |
| Hero body inner block | none → translateY(100%) (drops into its bottom mask) | 50 | 250 | CIN |
| Caption rows 1 to 4 | none → translateY(100%) | 0, 20, 40, 60 | 260 | CIN |
| Video card | opacity 1 → 0 | 350 | 130 | linear |
| Letters 1 to 6 | none → translateY(D) | i × 65 | 450 | CIN |
| Left mound | none → translateX(−51%) | 20 | 560 | CIN |
| Right mound | none → translateX(51%) | 150 | 450 | CIN |

D is the distance in px from the word's top to the bottom of the foreground box, plus 8px. So each letter drops right out of the clipped box, one by one from left to right.

**Section 2 in (the reel's smooth-scroll curve):**

Each section 2 element moves from one viewport height below its place up to its place. Use a 55-keyframe linear animation lasting 1800 ms, with keyframe k at offset k/54 and time t = k/54 × 1.8 s. The remaining offset fraction is:
- f(t) = 1 − 1.506 × t while t < 0.47 s (a steady glide).
- After that, f(t) = 0.293 × e^(−(t − 0.47) / 0.232) (an exponential settle with a 0.232 s time constant).
- The last keyframe is exactly 0.

The transform is translateY(f × innerHeight px), with opacity 1 throughout. Base delay is 180 ms, plus each element's lag:

| Element | Lag (ms) |
|---|---|
| Section 2 title | 0 |
| Paragraph | 100 |
| Arrow | 100 |
| Card 1 | 0 |
| Card 2 | 150 |
| Card 3 | 300 |

**Camera:** runCamera(forward) with a 550 ms delay and a 1700 ms duration.

**At 2300 ms:** add the class "is-s2" to the stage. That keeps the section 2 UI at opacity 1, the hero UI at opacity 0 and the section 2 plate visible. Then unlock.

The nav, logo, menu and glyph column never move during transitions.

## 9. Scroll transition: section 2 back to hero

- Remove "is-s2" at once.
- Section 2 elements run the mirrored curve: offset = 1 − f(t), from their place down to one viewport below, over 1800 ms with no base delay. The lags are reversed so lower elements lead and nothing overlaps: title 100, paragraph 0, arrow 0, card 1 300, card 2 150, card 3 0.
- The camera runs backwards with a 200 ms delay over 1700 ms.
- The hero entrance from section 7 replays with an 800 ms base offset. Nav links, menu, glyph column and the scene zoom are left out of the replay. It covers the mounds sliding in from the sides, the title, body, video card, play icon, letters and captions.
- Unlock after 2300 ms.

## 10. Small screens

The phone layout applies when the width is at most 820px or the aspect ratio is portrait (1/1 or taller):
- **Units and nav**: --u becomes 100vw / 390. The nav switches to padding 16px 18px 0 with flex-wrap. The logo is 42px. The links drop to a second full-width row (static, space-between, gap 8px, margin-top 4px, 11px text). The menu is 30×28 with a 7px gap.
- **Shade**: a stronger top shade, from .9 at 0% to .62 at 30%, .25 at 48% and 0 at 60%, then .45 at 100%, so the title reads over the skylight.
- **Hero title**: left and right 18px, top 118px, wrapping, font size min(26px, 6.4vw), line-height 1.2.
- **Body and video card**: both sit at top 118px + 3 × 1.2 × title size + 14px. The body is on the left, min(300px, 60vw) wide at 12.5px. The video card is on the right, min(120px, 26vw) by min(84px, 18vw).
- **Glyphs**: a horizontal row at left 18px, top 94px, with 12px gaps and 13px icons.
- **Captions**: a 2×2 grid, 18px from the sides and 16px from the bottom, with 12px gaps. Each caption becomes static, the row gap is 10px, numbers are 22px and text 11px.
- **Foreground box**: bottom 0, height 100vw × 810 / 1440 + 192px. --mb is 96px, so the mounds reach behind the captions and stay on the very bottom edge.
- **Section 2 text**: the title at left 18px, top 118px, size min(24px, 6vw), line-height 1.28. The paragraph below it is min(330px, 100vw − 36px) wide at 12.5px.
- **Cards**: three equal cards, (100vw − 52px) / 3 wide at a 216:246 ratio, 18px from the sides and 20px from the bottom, with 8px gaps. Labels are 11px. The arrow sits just above the cards.

Tablets in portrait (width 600px or more and portrait):
- --u is 100vw / 760.
- The title is min(40px, 5.4vw) at top 130px. The body is 14px and 300px wide. The video card is 200×140.
- The links return to one centred absolute row with a 36px gap at 12px.
- Captions run in 4 columns.
- The foreground box height is the scene + 152px, with --mb 76px.
- The section 2 title is min(34px, 4.6vw). The cards are (100vw − 92px) / 3 wide with a 14px gap.

Short landscape phones (height at most 520px and landscape):
- --u is 100vh / 470.
- The links are a centred absolute row with a 22px gap.
- The title sits at the top-left, 58vw wide, clamp(15px, 2.6vw, 22px). The body is at the top-right at 11px.
- The video card, glyph column and arrow are hidden.
- The captions are a 4-column row 8px from the bottom.
- The foreground box height is the scene + 36px, with --mb 36px.
- The cards sit bottom-right at min(150px, 15vw) each.

Text is never smaller than 11px. Touch targets are at least 24px: the nav links get 6px vertical padding.

## 11. Reduced motion

With prefers-reduced-motion: reduce:
- There is no intro animation. The page shows its final state at once, and the stage gets the class "rm".
- Scrolling switches the state instantly. "is-s2" hides the foreground box and shows the section 2 plate.
- The card hover zoom has no transition.

## 12. Acceptance checklist

- The first frame is a zoomed-in scene (1.3) with no UI. Only a sliver of the right mound shows at the bottom-right edge.
- The scene settles to 1.0 by 1.35 s. The mounds glide in sideways along the bottom edge and meet in a V at the bottom centre by about 1.7 s.
- The nav links drop in one by one, 0.1 s apart.
- The title block slides down from behind its top edge. The body slides up from behind its bottom edge.
- The big word's letters fade up in the order 1, 2, 5, 4, 3, 6. The captions pop up left to right.
- One wheel tick down:
  - the title exits up into its mask;
  - the letters drop out left to right;
  - the mounds slide out sideways, left first;
  - section 2 text rises from below the screen on a glide-then-settle curve, with the paragraph and cards trailing;
  - the camera arcs to the angled view between 0.55 s and 2.25 s.
- One wheel tick up reverses it with no overlaps.
- The nav and glyphs never move during transitions.
- There is no horizontal scroll, and no UI block overlaps another, from 320×568 up to 2560×1440.