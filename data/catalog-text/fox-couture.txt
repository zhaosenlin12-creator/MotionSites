# Novu® London — full recreation brief

Build a single-page, three-section fashion landing page for a fictional digital-fashion label called **Novu®**. Its mascot is a photoreal 3D fennec fox in orange shield sunglasses, a chunky silver chain and an oversized white varsity jacket. The page has three sections: a hero with a giant wordmark, a pinned "story" section, and a partners carousel with a footer. Behind the hero and the story runs **one continuous scroll-scrubbed video**. The fox walks in place the whole time while the camera orbits all the way around it (front close-up → profile → back → profile walk → front) and pulls back to the full body. Scrolling down plays the orbit forward; scrolling up plays it backward. The look is a pale, warm, grainy photo studio, with black ink type and one hot orange accent.

Everything below is exact. Build it as one HTML file with inline CSS and inline JavaScript, no framework and no build step. Two external scripts are loaded at runtime from jsDelivr (mp4box.js and Lenis).

---

## 1. Assets (use these exact URLs)

All images are direct Higgsfield generation results served through the images.higgs.ai resizer. Never download, crop or re-host them.

| Asset | Exact URL | Used for |
|---|---|---|
| Scene video (Kling 3.0, 10.04 s, 241 frames, 24 fps, 1280×720, H.264, a single keyframe, moov at the front of the file, CORS open) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261107_145142_a39216fc-13cf-4ce3-baf8-d9bdbfd5f955.mp4 | Scroll-scrubbed background behind the hero and the story (desktop only) |
| Hero still (2048×1360 original) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_005547_8a9e6889-76aa-4688-81b5-4452d9afa4ad.png&w=2048&q=85 | Hero image on phones and with reduced motion only. The `w` parameter is the viewport width × devicePixelRatio × 1.05, rounded to a multiple of 64, with a minimum of 1024 and a maximum of 2048. |
| Story still (2048×1360 original) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_005547_a3e2027b-0bcb-455d-bef4-6c0c6d722cb1.png&w=2048&q=85 (same width rule) | Full-body walking fox on phones and with reduced motion only |
| Story still, small | the same story URL with &w=480 | Blurred backdrop behind the story still (reduced motion, wide screens) |
| Partner sheet (2688×1520 original, a 3×2 grid of six portrait cards with thin white gutters) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_005542_4250aa05-1091-4015-b242-d58db718f6b7.png&w=2000&q=85 | Six partner cards, each shown with a CSS background-position crop of this one sheet |
| mp4box.js 0.5.2 | https://cdn.jsdelivr.net/npm/mp4box@0.5.2/dist/mp4box.all.min.js | Demuxes the MP4 so WebCodecs can decode it |
| Lenis 1.1.13 | https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js | Smooth wheel scrolling |

Partner sheet content, by grid cell (column, row): (0,0) a snow leopard in a grey quilted puffer, light grey backdrop; (1,0) a hare in round black sunglasses and a black leather jacket, charcoal backdrop; (2,0) a raccoon in a dark cap and a satin bomber with orange-striped cuffs, mid grey; (0,1) an owl in a black bucket hat and a black tailored coat, mid grey; (1,1) an axolotl in a chrome visor and a white satin hoodie with orange cord tips, light grey; (2,1) a red panda in a chunky grey knit cardigan and a silver chain, mid grey.

## 2. Fonts

Two variable fonts. Self-host the latin WOFF2 files, or embed them as base64 data URIs in a standalone build.

| Family | Source (Google Fonts, latin subset) | Axes used | Role |
|---|---|---|---|
| Archivo | https://fonts.gstatic.com/s/archivo/v25/k3kQo8UDI-1M0wlSfdnoLg.woff2 | weight 100–900, width (font-stretch) 62%–125% | Everything: wordmark, labels, headings, body |
| Outfit | https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtq.woff2 | weight 100–900 | Only the small "Novu®" logo that appears after scrolling |

Declare them with @font-face: Outfit with font-weight 100 900 and font-display swap; Archivo with font-weight 100 900, font-stretch 62% 125% and font-display swap. The body default is Archivo at font-stretch 112%, with antialiased font smoothing.

## 3. Head, tokens and global layers

- Title: "Novu® London — High-Fashion Novus". Meta description: "Fully 3D fashion characters, ready to redesign digital couture." Viewport: width=device-width, initial-scale=1. Language: en.
- Colour tokens: background #e9e6e1 (warm bone); ink #0b0b0b; mute #77736d; pill rgba(255,255,255,.42); line rgba(11,11,11,.14); accent #ff5a1f (hot orange).
- The html and body backgrounds are the background token. Reset margins and padding, use border-box sizing, links inherit colour with no underline, and buttons are unstyled.
- **Film grain**: a fixed layer at inset −50%, z-index 60, pointer-events none, opacity .07, mix-blend-mode multiply. Its background is an inline SVG data URI: a 240×240 SVG with a feTurbulence filter (type fractalNoise, baseFrequency .9, numOctaves 2, stitchTiles stitch), then an feColorMatrix that keeps only alpha. The layer animates "grain" over 1 s with steps(6), infinitely, translating through (0,0) → (−3%,2%) → (2%,−4%) → (−4%,−1%) → (3%,3%) → (0,0).
- **Vignette**: a fixed full-screen layer at z-index 59 with an inset box-shadow of 220 n-units spread, colour rgba(60,52,44,.22).

## 4. Scaling system

- The design frame is 1440×900. The frame unit is u = (viewport width without the scrollbar) ÷ 1440. JavaScript writes document.documentElement.clientWidth into a CSS variable --vw on load and on every resize, so the frame centres exactly even with a scrollbar.
- The nav/footer unit is n = min(vw ÷ 1440, 100svh ÷ 760), so the fixed UI shrinks on short screens.
- At 820px wide and below, both units become 100vw ÷ 390 (a 390px phone design).
- Every measurement below is written in design pixels: "53u" means 53 × u, and "53n" means 53 × n.

## 5. Fixed top nav (z-index 40, height 66n, pointer-events none on the container, auto on its children)

| Element | Exact text | Position and size | Style |
|---|---|---|---|
| Play Trailer pill (button) | PLAY TRAILER | left 53n, top 8n, width 178n, height 50n | Pill: flex, gap 16n, padding 0 9n 0 24n, radius 999px, background = pill token, backdrop blur 10px. Label: Archivo 700, stretch 108%, uppercase, letter-spacing −.01em, 13n. Ends in a 32n black circle with a white play triangle (an SVG path in a 10×10 viewBox: M2.5 1.2 L9 5 L2.5 8.8 z). |
| Centre label | HIGH-FASHION NOVUS | left 463n, top 22n | Label style, 14.5n |
| View Marketplace pill (link to #partners) | VIEW MARKETPLACE | right 127n, top 8n, width 227n | The same pill; its circle shows a pause icon (two vertical strokes, 1.6 wide, round caps) |
| Menu button | (aria-label "Open menu") | right 55n, top 8n, 50n circle, white, shadow 0 6px 24px rgba(0,0,0,.06) | Three 16n×2px ink bars, offset −5n, 0 and +5n vertically. When open they become an X (top bar rotates 45°, middle fades out, bottom rotates −45°). Hover: scale 1.08. |
| Mini logo (link to #top) | Novu® | left 53n, top 18n | Outfit 600, 30n, letter-spacing −.02em. The ® is a superscript at .45em. Hidden (opacity 0, translateY −8px) until scrolled. |

Pill hover: the background rises to rgba(255,255,255,.75), and the circle turns orange, rotates 90° and scales to 1.08 (.45s, cubic-bezier(.2,.8,.2,1)).

When scrollY is more than 35% of the viewport height, the body gets the class "scrolled". The two pills and the centre label then fade out and move up 10px, and the mini logo fades in (.4s).

**Menu overlay**: fixed full screen at z-index 35, background rgba(233,230,225,.86) with an 18px backdrop blur, column centred, padding 0 53n. It holds three links:
- "01 The Drop" → #top
- "02 The Walk" → #walk
- "03 Partners" → #partners

The links are Archivo 900, stretch 125%, uppercase, size max(40px, 88n), line-height 1, letter-spacing −.03em. The number sits in a span at .18em, weight 500, letter-spacing .2em, margin-right .6em. When the menu opens the links rise from translateY(30px) and opacity 0 over .6s, staggered by 0, .06s and .12s. Hovering a link turns it orange. Escape closes the menu, and clicking a link closes it.

## 6. Fixed bottom bar (z-index 40, height 100n)

| Element | Exact text | Position | Style |
|---|---|---|---|
| Our Roadmap pill (link to #walk) | OUR ROADMAP | left 53n, bottom 22n, width 188n | Pill. The circle icon is two small rings joined by an S-shaped path (stroke 1.4, round caps). |
| Icon button (aria-label "Random Novu") | — | left 261n, bottom 22n, 52n circle, pill background, 10px backdrop blur | A 26n fox-mask glyph in a 28×28 viewBox: a black fox head, an orange visor rectangle (x 8.6, y 12.6, 10.8×3.4, radius 1.4) and a small bone-coloured nose dot. Hover: rotate −12° and scale 1.06. |
| Switch group | PRESS · NOVUBAR · TO SWITCH | centred, bottom 32n | "PRESS" and "TO SWITCH" are 10n white hints at .85 opacity. NOVUBAR is a black key 32n tall with 0 36n padding, white 13n label, and a hard 3n black under-shadow plus 0 6n 14px rgba(0,0,0,.18). It presses down 3n when clicked (class "hit" for 140 ms). |
| Fashion Index link (to #partners) | FASHION INDEX ↗ | left 1111n, bottom 40n, 13.5n | A north-east arrow icon. On hover a 1.5px underline wipes in from the left (.45s) and the arrow nudges 2px up and right. |
| Dots | — | right 58n, bottom 43n | Five 3.5n ink dots, gap 4n. Each blinks opacity 1 → .2 → 1 over 1.8s, staggered by .12s. |

When the partners section's top passes 55% of the viewport height, the body gets "at-end" and the whole bar fades out and moves down 20px (.5s).

**Novubar behaviour**: clicking NOVUBAR, or pressing Space when focus isn't on an input, button or link, jumps to the next stop:
1. the top of the page;
2. the start of the story plus 2% of the viewport height;
3. the start of the story plus 135% of the viewport height;
4. the partners section.

After the last stop it goes back to the top. It uses Lenis scrollTo with a 1.6 s duration when Lenis is loaded, otherwise native smooth scrolling.

## 7. Stage: hero + story share one background

Wrap the hero and the story in a relative "stage" container. Its first child is the **scene**: a sticky layer (top 0, height 100svh, margin-bottom −100svh, overflow hidden, z-index 0, pointer-events none) holding one full-size canvas. The scene starts at opacity 0 and fades to 1 over .9s once the body has the class "scene-on". The hero and the story sit above it at z-index 1 with transparent backgrounds.

### 7a. Hero (height 100svh, min 520px, overflow hidden)

A frame box fills the width, is anchored to the top, and has height max(900u, 100%), so text never clips and extra height crops at the bottom. Inside it:

- **Wordmark (h1, aria-label "Novu London")**: Archivo weight 650, line-height 1, 177u, no wrapping. It is built from three absolutely positioned parts, and every character is its own inline-block span so it can animate:
  - "Novu" at left 53u, top 72.3u, font-stretch 107%;
  - the ® as an inline SVG at left 533u, top 103u, 70u × 70u: a circle of radius 31 with stroke width 7, plus an "R" drawn as a filled path, both in currentColor;
  - "LONDON" at left 650u, top 72.3u, font-stretch 100%.
  - **Fitting**: after the fonts load and on every resize (desktop only), measure each part's natural width and set its letter-spacing to (target × u − natural) ÷ (letters − 1). The target for "Novu" is 464u (it spans 53 → 517) and for "LONDON" 737u (650 → 1387). This makes the ink span exactly the mockup.
- **Copy block 1**: top 298u, left 53u, Archivo 600, stretch 104%, 16.5u, line-height 1.22, uppercase, letter-spacing −.005em. Each line is a separately masked span (overflow hidden) holding an inner block that can slide:
  - "**BUILT IN 3D,** READY" (the bold part at weight 850)
  - "TO REDESIGN DIGITAL"
  - "COUTURE"
- **Copy block 2**: top 298u, left 339u, the same style:
  - "MEET ALL"
  - "**7777 STYLED**"
  - "BIG-EARED NOVUS"
- **Tag**: left 1022u, top 596u, label style 13.5u: "NVU0023." followed by a 46u × 8u SVG arrow (a 44-unit line plus a small open arrowhead, stroke 1.3, ink). The line loops a draw animation: stroke-dasharray 46, offset 46 → 0 (by 45%) → hold → −46, over 2.4 s, cubic-bezier(.6,0,.2,1), starting after 1.6 s, infinite.
- **Hero still** (an img with alt "A fennec fox character in orange shield sunglasses, a silver chain and a white varsity jacket"): object-fit cover over the frame. **On desktop it is never loaded or shown.** The body gets the class "video-bg" and the img stays display none with no src. The backdrop stays plain bone until the video's first frame is ready. The still is used only on phones and with reduced motion.
- **Wordmark parallax**: while scrolling, the wordmark moves up by 40% × min(1, scrollY ÷ viewport height).

### 7b. Story (id "walk", height 300svh)

A sticky inner "stick" (top 0, height 100svh, overflow hidden) holds a frame box at 100% height with:

- **Panel 01** (article): label "01 /", heading "STREETWEAR, BUT" / "MADE YOURS", and the paragraph "Swap your NOVU's style with limited digital drops, climb the Fashion Index and shape a look that lives in every world." ("NOVU's" is orange).
- **Panel 02**: label "02 /", heading "RUN THE" / "NOVUWALK", and the paragraph "Hit the catwalk and flaunt your whole wardrobe. Become a NOVUFLUENCER and collect the real-world perks." ("NOVUFLUENCER" is orange).
- **Panel geometry**: absolute, left 140u, top 262u, width 600u.
  - Label: 11u, letter-spacing .35em, mute colour, weight 500, stretch 125%.
  - Heading: margin-top 30u, Archivo 900, stretch 125%, 40u, line-height .92, letter-spacing −.025em, uppercase. Each line is a masked span with padding-bottom .04em.
  - Paragraph: margin-top 22u, 15.5u, line-height 1.36, colour #55514b, stretch 108%, weight 450, max-width 330u. Highlights use the accent colour.
- **While the video scene runs, Panel 01 moves to left 860u (the right side)**, because the fox walks on the left of the frame at that moment, as on the original site.
- **Progress dashes**: two 46u × 2px tracks (line colour) with an ink fill that scales on X from the left, gap 8u, at left 140u, top 560u. While Panel 01 is on the right they slide to left 860u (.6s). Their opacity follows whichever panel is more visible, so they are hidden between panels.

## 8. The scroll-scrubbed scene (desktop, motion allowed)

**Video content**: one continuous 10-second shot. The fennec fox walks in place for the whole clip (a steady treadmill-style walk cycle; head, shoulders, ears and chain bob; hands in its pockets) and its body always faces the same way. Only the camera moves:
- it starts on a low-angle front close-up of the head and shoulders (this frame matches the hero composition, with the wordmark above the head);
- orbits to the fox's left profile;
- goes behind it, showing the back of the jacket with a big orange "23";
- continues to the right-side profile while pulling back and lowering, where the full body walks on the left of the frame;
- ends on a front full-body view with the fox right of centre.

The backdrop is a plain seamless bone-white studio with a soft floor shadow, and the whole clip has a warm grade with film grain.

**Why not a video element**: Kling encodes the clip with a single keyframe, so seeking a video element backwards is very slow. Hardware video decoders can also stall or be blocklisted; on the build machine the hardware decoder managed about 1 fps. So every frame is decoded once in software and cached.

**Loading pipeline** (starts immediately on desktop):
1. Load mp4box.js, then fetch the MP4 with CORS and read it as a stream. Append each chunk to an mp4box file object with a running byte offset. Kling files keep the index at the front, so decoding starts with the first bytes.
2. In onReady, read the video track: the sample count (241) and the codec. Pull the decoder description from the avcC box (write the box to a big-endian DataStream and skip its first 8 bytes). Create a WebCodecs VideoDecoder configured with that codec, the coded size, the description and **hardwareAcceleration "prefer-software"**.
3. Extract samples in batches of 12 and turn each into an EncodedVideoChunk (type "key" if it is a sync sample, otherwise "delta", with timestamp and duration in microseconds).
4. Feed the decoder with backpressure: decode only while the decoder queue holds fewer than 4 items **and** fewer than 3 frames per encoder are waiting. Re-check after every "dequeue" event and after every encoded frame. When the stream has ended and every chunk has been fed, flush once.
5. Start an **encoder pool** of N = clamp(hardwareConcurrency − 1, 1, 4) Web Workers, created from an inline blob script. Each decoded VideoFrame is transferred, never copied, to worker (frame index mod N). A worker processes its frames one at a time:
   - draws the frame onto an OffscreenCanvas the size of the video (2D context with willReadFrequently);
   - closes the frame;
   - averages the RGB of the left and right 4-pixel columns, which become that frame's edge colours;
   - converts the canvas to a JPEG blob at quality .88;
   - posts back the index, the time, the blob and the edge colours.
6. The main thread stores each blob and its edge colours by index. The first stored frame (index 0) switches the scene on: it sizes the canvas, renders, waits two animation frames, then adds "scene-on" so the canvas fades in.
7. Fallback when WebCodecs, Worker, OffscreenCanvas or ReadableStream is missing, or the pipeline fails: play the video once, muted, at playbackRate .5, inside a 2×2px fixed element at opacity .01 (it has to be painted for frame callbacks to fire). Capture each presented frame with requestVideoFrameCallback, file it by round(mediaTime × 24), and store it the same way.

**Rendering**:
- The canvas backing size is its CSS size × min(devicePixelRatio, 1.5).
- The stage progress P (0 to 1) is −(stage top) ÷ (stage height − viewport height).
- The target frame is min(1, P ÷ .85) × 240, so the last frame is reached at 85% of the stage and then held.
- A playhead eases toward the target every animation frame: cur += (target − cur) × (1 − (1 − k)^(dt ÷ 16.7)), where k = .6 when Lenis is running and .25 otherwise. It snaps once within .02.
- **Sub-frame blending**: draw frame floor(cur), then draw the next frame on top at globalAlpha equal to the fractional part.
- Decoded ImageBitmaps live in an LRU window of 56 bitmaps. Each animation frame queues decodes (createImageBitmap from the JPEG blob, at most 8 in flight) for every frame between the playhead and the target plus 14 beyond, and 4 frames behind. If the exact frame isn't decoded yet, draw the nearest decoded frame within 12 instead of freezing.
- **Framing**: interpolate between two rectangles with t = clamp((cur ÷ 240 − .35) ÷ .55), eased with an ease-in-out cubic (4t³ for t < .5, otherwise 1 − (−2t + 2)³ ÷ 2).
  - Rect 0 matches the hero layout: the 16:9 frame is cover-fitted into a box of the full canvas width and height max(width × 900 ÷ 1440, canvas height), anchored at the top and centred.
  - Rect 1 fits the frame to the full canvas height, centred horizontally, so the walking figure keeps its feet in view.
- **Wide screens**: before drawing, fill the left half of the canvas with that frame's left edge colour and the right half with its right edge colour. Where the frame doesn't reach a side, feather its edge into that colour with a linear gradient over 6% of the frame width.
- Redraw only when the frame index, the blend amount (to 2 decimals) or the framing t (to 3 decimals) changes.

**Panel timing** (story progress p from 0 to 1 across the sticky run, while the scene runs):
- Panel 01: opacity = clamp((p − .20) ÷ .06) × (1 − clamp((p − .43) ÷ .06)).
- Panel 02: opacity = clamp((p − .64) ÷ .08).
- As a panel's opacity a rises, its heading lines slide up from translateY((1 − ease(a)) × (105% + line × 20%)), its paragraph rises from (1 − ease(a)) × 24px, and its label slides 16px horizontally (in from the right for Panel 01, from the left for Panel 02).
- Dash fills: the first fills over p .20 → .55, the second over .55 → 1.
- Without the scene (reduced motion), the panels sit on the left: Panel 01 shows for p < .5 and Panel 02 after.

**Smooth scroll**: when motion is allowed, load Lenis and create it with lerp .085, smoothWheel true, wheelMultiplier 1 and anchors true. Drive it with a requestAnimationFrame loop. Add the standard Lenis CSS: html.lenis and its body get height auto, .lenis-smooth disables scroll-behavior, and .lenis-stopped hides overflow.

## 9. Partners section (id "partners")

- Padding-top 56n. Background: a vertical gradient #e9e6e1 → #f1efec at 60% → #f4f3f1.
- Label "03 /" (11n, .35em tracking, mute colour) and heading "OUR" / "PARTNERS" (Archivo 900, stretch 125%, 42n, line-height .9, letter-spacing −.025em, uppercase), both indented 50n.
- **Track**: a horizontal flex row with gap 20n and padding 28n 50n 0, scrollable on X with the scrollbar hidden and a grab cursor. It holds 12 cards (the six partners twice):
  - Snowline · 01 · PUFFER
  - Hush Hare · 02 · LEATHER
  - Night Bandit · 03 · BOMBER
  - Hoot & Co · 04 · TAILORING
  - Axo Lab · 05 · TECH
  - Ember Knit · 06 · KNITWEAR
- **Card**: width 253n, aspect ratio 1.179, overflow hidden, background #cfcbc5. Its art layer uses the partner sheet with background-size 304.9% 203.25%. The background-position X is .15%, 50.07% or 99.94% by grid column, and Y is .2% or 99.7% by grid row. The art sits at grayscale(.85) contrast(1.02).
- Card hover: full colour and scale 1.06 (1s). A caption slides up from below (.5s): white label-style text at 11n on a transparent-to-rgba(0,0,0,.55) gradient, the name on the left and "0N · TYPE" on the right (weight 500, letter-spacing .2em, .8 opacity).
- **Drag to scroll** with the mouse. The track also drifts automatically at .03px per ms (wrapping around) until the first pointerdown, wheel or touchstart.
- **Progress bar**: margin 52n 50n 0, a 2px line-coloured track with an ink fill. The fill width = visible fraction + (1 − visible fraction) × scroll fraction.
- **Footer** grid (columns 1fr auto auto auto, column gap 52n, padding 76n 50n 30n):
  - Quote: "WE SEW, WE STYLE," / "WE WALK. WE WIN." in Archivo 900, stretch 125%, 21n, line-height 1. Below it "Novu Studio Manifest" (12.5n, mute colour, weight 450, stretch 108%, margin-top 18n).
  - "CONNECT" / "WITH" / "US" in the same style as the quote, margin-right 70n.
  - Link column 1: "Our channel ↗", "View the Market ↗", "Rarity Ranker ↗", "NOVU Fashion Index ↗".
  - Link column 2: "The Atelier Journal ↗", "Drops ↗", "Kiln Studio ↗".
  - Links: 13.5n, colour #4f4b45, stretch 108%, gap 7n. On hover the colour goes to ink and the arrow nudges and turns orange.
- **Legal row**: a 1px top border in the line colour, margin 0 50n, padding 36n 0 56n, 10n, letter-spacing .38em, weight 600, stretch 125%, uppercase, no wrapping. It holds:
  - "© 2026 • NOVU LABS" (mute colour);
  - "STYLED BY @NOVUSTUDIOLDN" (the handle in ink);
  - a flexible spacer;
  - "TERMS & CONDITIONS" and "PRIVACY POLICY" (orange on hover);
  - the blinking dots again.

## 10. Opening animation (Web Animations, run once after fonts load)

The body starts with the class "pre", which hides the hero still, every wordmark character, the copy lines, the tag, the nav items (except the mini logo) and the bottom-bar items. When fonts are ready, remove "pre" and run the timeline below. All entries use easing cubic-bezier(.16,1,.3,1) with fill backwards.

| Target | From | Duration | Delay |
|---|---|---|---|
| Hero still (phones and reduced motion only) | opacity 0, scale 1.08, blur 10px | 1800 ms | 0 |
| Each wordmark character (Novu, ®, LONDON, in order) | opacity 0, translateY(60%) rotate(4deg) | 1100 ms | 250 + i × 55 ms |
| Each copy line (6 total) | opacity 0, translateY(100%) | 900 ms | 850 + i × 70 ms |
| Tag | opacity 0, translateX(−20px) | 900 ms | 1300 ms |
| Nav items (Play Trailer, centre label, View Marketplace, menu) | opacity 0, translateY(−24px) | 900 ms | 500 + i × 80 ms |
| Bottom-bar items (Roadmap, icon, switch, Fashion Index, dots) | opacity 0, translateY(24px); the switch keeps its translateX(−50%) | 900 ms | 700 + i × 80 ms |

When all animations finish, cancel them and mark the page ready. There is a failsafe reveal at 4 s and a hard one at 6 s. The scene canvas fades in independently of this timeline, as soon as the first video frame is decoded.

## 11. Phone layout (820px and below, 390px design)

- Units: n = u = 100vw ÷ 390. The scene video is not used and the stills are loaded instead.
- **Nav**: only the Play Trailer pill (left 16, top 14, 42 tall, 11px label, 30px circle) and the menu button (right 16, top 14, 42px). Once scrolled, the nav gets a bone gradient background so content scrolls under it cleanly.
- **Bottom bar**: only the NOVUBAR key (38 tall, 12px label, bottom 20).
- **Hero** stacks vertically below an 84px top padding:
  - the wordmark at 76px with line-height .9: "Novu" plus a .36em ® on the first line, "LONDON" on the second;
  - copy block 1 and copy block 2 at 14px;
  - the hero still in a 470px-tall box with object-position 57% 40%, masked to fade in from transparent over its top 26%;
  - the tag pinned bottom-right.
- **Story** stacks too: Panel 01 then Panel 02 (headings 33px, paragraphs 14.5px, fully visible, no motion), then the story still in a 520px box at object-position 72% 50%. No progress dashes.
- **Partners**: cards 240px wide with gap 12, captions always visible, art at grayscale(.3).
- **Footer**: two columns; the quote and "CONNECT WITH US" span both columns at 24px (the line breaks in "Connect with us" are hidden so it reads as one line). The legal row wraps and has 110px of bottom padding so the NOVUBAR key never covers it.

## 12. Reduced motion

With prefers-reduced-motion: reduce:
- all CSS animations and transitions are off and the grain layer is hidden;
- the scene video is never loaded and the stills are shown;
- there is no smooth scroll and no opening animation;
- the story panels switch instantly at the midpoint;
- the partner track doesn't drift.

## 13. Acceptance checklist

- At 1440×900, the wordmark ink spans 53 → 1387 at a 122px cap height. The ® circle sits at 533–603. The copy lines sit at y 306, 326 and 346. The tag is at 1022, 603.
- On desktop, nothing but the plain backdrop shows until the video's first frame is decoded (about 1 s on a normal connection); then the video fades in. The hero still is never requested on desktop.
- All 241 frames are cached within a few seconds. Scrolling down orbits the camera smoothly from the close-up to the full-body walk, and scrolling up plays it backwards. The fox's walk never moves forward in the frame.
- Panel 01 appears on the right during the profile walk and Panel 02 on the left over the final front view. The dashes follow the visible panel.
- Wheel scrolling glides (Lenis), and the playhead stays within a few frames of the scroll position.
- NOVUBAR and the Space key step through the four stops. The menu opens and closes. Card hover shows colour and the caption. The track drifts and can be dragged.
- At 390px every section stacks, with no horizontal scroll and nothing covered by the NOVUBAR key.
- With reduced motion, the stills show and nothing animates.