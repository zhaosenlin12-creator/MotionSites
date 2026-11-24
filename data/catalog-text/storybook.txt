# Little Lantern: recreation prompt

Give me a single-file website called "Little Lantern" that recreates this page exactly: a real-time 3D children's board book lying on a dark wooden table. On load the book is first seen open, flips back through its pages, closes, swings round and settles onto the table. Scrolling (or a click on "Open book") lifts the book, zooms it in and swings the cover open, revealing two-page spreads. Only the right-hand page ever turns: a stiff board page that rises over the spine and lands on the left, showing the next spread. Each spread is a layered night illustration with mouse parallax, a looping animated sky (video) and serif copy printed on the right page. Build it as one `index.html` with Three.js r160 (ES module via an import map from `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`), plain CSS and plain JavaScript. No other libraries.

Everything below is the exact specification. Follow every number.

---

## 1. Assets (use these exact links)

Every image is loaded through the image proxy `https://images.higgs.ai/?default=1&output=webp&url=<URL-encoded source URL>&w=<width>&q=85`. Textures must be loaded with `crossOrigin = "anonymous"` (the proxy and the video host both send `Access-Control-Allow-Origin: *`).

| Key | Use | Width requested | Source URL |
|---|---|---|---|
| wood | Page background (CSS cover) | 1920 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_042945_1a630b88-451d-4d93-9a7d-4151a6170e19.png |
| cover | Front cover art, portrait 1792×2240 (4:5) | 1600 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_044929_d58bc487-df95-467d-a32e-014ac2ded268.png |
| sky1 | Spread 1 sky plate (no characters/lettering), 2048×1360 | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_043138_3a3c257d-bcdd-4bf2-98fd-63b823d7a72c.png |
| fg1 | Spread 1 foreground, transparent PNG (lettering "BE BRAVE / together", bear with lantern on a floating island) | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_043139_8f39272f-a412-4ff3-b8ae-d2340a8a7871.png |
| sky2 | Spread 2 sky plate | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_043138_a3a977df-cbac-4e02-88f8-ebf1a7d13ec7.png |
| fg2 | Spread 2 foreground ("SHARE THE LIGHT / with a friend", bear hands a lantern to a fox on a grassy hill) | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_043139_8099c495-ae61-4b2d-a545-56a29a3a40ed.png |
| sky3 | Spread 3 sky plate (with full moon top right) | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_050305_7a0850b6-a36a-4469-b9e1-3c0a7300b3aa.png |
| fg3 | Spread 3 foreground ("ASK BIG QUESTIONS / and wonder", bear and fox at a telescope) | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_050305_f813bcc0-744e-4c68-af6e-101d3a872b35.png |
| sky4 | Spread 4 sky plate | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_050304_edf43a56-7da6-4693-a45b-1946fe525085.png |
| fg4 | Spread 4 foreground ("HOME IS US / all together", bear, fox and owl at a campfire under a tree with a hanging lantern) | 2048 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_050304_3dc2a3c3-6c59-4945-88dd-bdad2ae6b6a6.png |
| page1 | Full composite of spread 1 (used only for the dot thumbnail) | 400 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_042945_dfadad74-111c-430c-aab1-cb8fffc9a5f2.png |
| page2 | Full composite of spread 2 (dot thumbnail) | 400 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_042945_093eb422-4460-43b8-8e22-ce1b6cabafaf.png |
| page3 | Full composite of spread 3 (dot thumbnail) | 400 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_050221_ae054b92-6a0a-4600-9717-6c7b8c424f16.png |
| page4 | Full composite of spread 4 (dot thumbnail) | 400 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_050220_86483ded-276a-4d3f-b472-410285d9b29b.png |

Animated skies (Kling 3.0, 1280×720 H.264, 5.04 s, silent, seamless loops; load directly from these links, do not re-encode). Video i replaces sky i:

| Spread | Video URL |
|---|---|
| 1 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_051956_5f368146-b522-461d-9f5d-422f45255bd0.mp4 |
| 2 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_051955_27d39710-be95-4992-8914-ce803e5729f5.mp4 |
| 3 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_051956_e7b2c41f-53c7-4adf-a9b7-ea294590d358.mp4 |
| 4 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261108_051955_15cd3fbc-7100-420e-8479-ca8b0afb346e.mp4 |

In the videos the stars twinkle and flare, shooting stars streak across, the clouds along the bottom roll and churn, and the moon (spread 3) glows. Nothing moving in the scene is drawn in code.

## 2. Fonts

All from Google Fonts, latin subset, `font-display: swap`:

- **Newsreader** 400 normal and 400 italic (optical size axis 6..72; request `Newsreader:opsz,wght@6..72,400` and `Newsreader:ital,opsz,wght@1,6..72,400`). Body font of the whole page and the font of the copy printed on the pages.
- **Patrick Hand** 400. The logo's first line.
- **Caveat** 500. The logo's second line.

Preload Newsreader 400. Before drawing the page copy onto canvases, wait for `document.fonts.load` of "400 40px Newsreader", "italic 400 20px Newsreader", "20px Patrick Hand" and "500 20px Caveat".

## 3. Head and colour tokens

- Title "Little Lantern". Meta description "Little Lantern: a 3D board book with two spreads about big talks for small hearts." Viewport `width=device-width, initial-scale=1, viewport-fit=cover`.
- Root tokens: `--ink #f4efe6` (text), `--muted #8f8f8f`, `--bg #050505`. html and body: height 100 %, overflow hidden, background #050505, colour #f4efe6, Newsreader, antialiased, `overscroll-behavior: none`. Global reset: box-sizing border-box, zero margin and padding. Buttons inherit font and colour, no background, no border, pointer cursor.

## 4. Scaling system

The design is a 1440×900 frame. On desktop (viewport width ≥ 820 px) compute `S = min(innerWidth/1440, innerHeight/900)` (contain), `fx = (innerWidth − 1440·S)/2`, `fy = (innerHeight − 900·S)/2`, and expose `--s`, `--fx`, `--fy` as CSS custom properties. Every frame measurement below is in frame pixels and is multiplied by `--s` and offset by `--fx/--fy`.

The open spread rectangle (the reading position) is x 226, y 132, width 990, height 638 frame px. So `rect = {x: fx+226S, y: fy+132S, w: 990S, h: 638S}`. Spread aspect = 990/638 = 1.5517. Page dots sit at frame y 814.5 (`--dotsY`), the intro block's top at frame y 548 (`--introY`).

Below 820 px (phone): `S = 1`, `fx = fy = 0`, spread width = viewport − 32, height = width/1.5517, x = 16, y = max(96, 0.40·vh − h/2). Dots at y + h + 30, captions at y + h + 56, intro top at 0.56·vh.

## 5. Static DOM (top to bottom, all `position: fixed`)

1. `#wood`: inset 0, z 0, background #050505 plus the wood image, `center / cover`, no repeat. Its opacity is animated by the load showcase (starts at 0).
2. `#stage`: inset 0, z 1, `touch-action: none`, holds the Three.js canvas (block, no outline). When the book is open the cursor is `grab`, while dragging `grabbing`.
3. Logo `header.logo`: centred (`left 50%; translateX(-50%)`), top fy + 5·s, width 240·s, z 5, no pointer events, centred text, white.
   - Line 1 "LITTLE LANTERN": Patrick Hand 21.4·s px, line-height 1, letter-spacing .125em (with matching padding-left so it stays centred).
   - Line 2 "big talks for small hearts": Caveat 500, 23·s px, line-height 1, margin-top 3·s.
   - A hand-drawn underline: inline SVG 158·s × 6·s, centred, margin-top 3·s, viewBox 0 0 158 6, `preserveAspectRatio none`, path "M1 3.6 C 30 2.2, 70 1.6, 110 2.4 S 150 3.4, 157 3.1", white stroke 2.1, round caps.
4. Two arrow buttons `.navArrow.prev` and `.navArrow.next`, z 6, top fy + 420·s, 80·s × 40·s, centred content, opacity 0 and no pointer events until the book is open (then opacity 1; a disabled arrow is opacity .2). Left at fx + 54·s, right at fx + 1306·s. Each holds a 68·s × 30·s hand-drawn SVG (viewBox 0 0 68 30, white, round caps and joins): shaft "M11 22.5 C 24 15.5, 44 12.5, 59 21.8" stroke 2.4; upper barb "M11.2 22.4 L 23.6 8.6" stroke 1.3; lower barb "M11 22.6 C 18 25, 27 27.4, 37.6 30.4" stroke 1.5. The right arrow is the same SVG mirrored with `scaleX(-1)`. Hover: the SVG moves 10·s px outwards and rotates −6deg (.25 s, cubic-bezier(.3,.7,.2,1)). Labels "Previous page" / "Next page".
5. Page dots `nav.dots`: centred at `--dotsY` (translate −50 %, −50 %), flex row, gap 12·s, z 6, hidden until open (opacity transition .5 s with .2 s delay). Built in JS, one button per spread: a 14.5·s circle (the active one 20.5·s with a `0 0 10·s rgba(255,190,110,.45)` glow; inactive ones at opacity .7, hover 1). Background: the spread's composite image at width 400, `background-size 520%`, positions spread 1 "22% 54%", spread 2 "26% 66%", spread 3 "27% 74%", spread 4 "14% 55%" (each centres on the glowing lantern). A pseudo-element overlays a sphere shading: radial highlight at 34 % 30 % (white .35 → 0 at 45 %) plus a radial shadow at 60 % 65 % (transparent at 40 % → black .55). Labels "Spread n: <heading>"; the active dot has `aria-current="page"`.
6. Intro block `section.pretext`: z 4, full width, top `--introY`, column, centred, 16 px side padding. Contents:
   - "Open book" button: 50 px tall, 0 34 px padding, 15 px white text, a 20×16 open-book line icon (viewBox 0 0 20 16, white 1.4 stroke, path "M10 3.2 C 7 1.4, 3.6 1.2, 1 2v11.6c2.6-.8 6-.6 9 1.2 3-1.8 6.4-2 9-1.2V2c-2.6-.8-6-.6-9 1.2z" plus the spine "M10 3.2v11.6"), 10 px gap, and a hand-drawn oval ring around it (SVG absolutely positioned inset −4 px −8 px, viewBox 0 0 200 58, `preserveAspectRatio none`, path "M30 6 C 80 0, 160 2, 190 16 C 204 26, 196 46, 160 52 C 110 59, 40 57, 14 46 C -4 37, 4 14, 38 6 C 60 2, 90 3, 104 5", white at .75 opacity, width 1.1, `stroke-dasharray 560`; on hover `stroke-dashoffset −60` over .9 s, and the icon wobbles: a 2-step `.5 s` animation translating −1 px and rotating −6deg).
   - Dedication `.dedic`, margin-top 26 px, line-height 1.35, letter-spacing .02em: "For:" (italic 13 px #8c8c8c), "every small explorer" (22 px white, margin 2 px 0 8 px), "May your lantern always find a friend." (17 px, opacity .85), "Love, the Paper Moon crew" (14 px white, margin-top 10 px), "Makers of bedtime stories" (italic 13 px #8c8c8c, margin-top 2 px).
   - Status line `.loading`, margin-top 16 px, italic 13 px #8c8c8c: "Loading…" at first; after the showcase "Scroll or click to open" (phone: "Swipe up or tap to open").
   - The dedication and status line fade in once on load (CSS animation `.9s .25s cubic-bezier(.2,.7,.2,1) backwards` from opacity 0).
7. Captions (phone only): fixed at `--capY`, centred, 24 px side padding, an h2 (20 px white, 6 px bottom margin) with the current heading and a p (15 px, line-height 1.4, #a9a9a9, max 340 px) with the three lines joined. They fade in when open.
8. A visually hidden live region that announces "<heading>. <lines>" for the current spread when open.
9. Footer, z 6, font 15.2·s px, line-height 1, #8f8f8f, letter-spacing .005em, height 26·s, bottom fy − 9·s, no wrap:
   - Left at fx + 26·s: "Little Lantern" + " by " (#6d6d6d) + "Paper Moon" (#bdbdbd link).
   - Right at fx + 26·s from the right, gap 19·s: "Share" (#5c5c5c), "Copy URL" (button; copies location.href, shows "Copied!" for 1.4 s), "Mail it" (mailto link with subject "Little Lantern" and the page URL as body). Link colour #bdbdbd, hover white and underlined (.3 s).
   - Phone: 12 px, bottom 8 px, sides 14 px, gap 12 px, "Share" hidden.
10. Logo and footer fade in once on load with the Web Animations API: logo from opacity 0 and translate(−50 %, −14 px) to its rest place, 900 ms, cubic-bezier(.2,.7,.2,1); each footer half from opacity 0, 900 ms, delay 600 ms. Guard: the html element starts with class `js-anim` (logo and footer at opacity 0); it is swapped for `anim-done` when the animations are created, again when they finish, and at the latest after 2.5 s.

## 6. The book (Three.js)

**Renderer and camera.** WebGLRenderer with antialias and alpha, transparent clear colour, pixel ratio min(devicePixelRatio, 2), sized to the viewport. Perspective camera, FOV 30°, placed on the z axis at distance `(innerHeight/2)/tan(15°)` so one world unit equals one CSS pixel at z 0; near = distance/10, far = distance·10. Ambient light white 1.1, directional light white 1.5 from (−0.4, 0.7, 1).

**Units.** Inside the book the spread is 1 unit wide: page width PW = 0.5, page height A = 1/1.5517 = 0.6444. The book group is uniformly scaled by its on-screen spread width in pixels. A child group `pivot` is offset along x by `−PW/2 · (1 − coverOpen)` so that when closed the cover is centred and when open the spread is centred. The spine is the pivot's x = 0.

**Board thickness.** Two extruded shapes with outer corners rounded (radius 40/990 = 0.0404; spine-side corners square), no bevel, 10 curve segments; materials: cap faces navy #131a31 (roughness .9), sides cream #d8cbb3 (roughness .95).
- Right stack: x 0…PW, depth 0.03, back face at z −0.033.
- Left stack: x −PW…0, depth 0.012, back face at z −0.015; visible only when the cover's turn progress is above 0.96.

**Contact shadow.** A unit plane with a 256×256 canvas radial gradient (black .85 at radius 18, .45 at 55 %, 0 at the edge), transparent, no depth write, drawn first. Position (lerp(PW/2, 0, c), −0.03, −0.038), scale (lerp(PW·1.45, 1.28, c), A·1.5), opacity (0.85 − 0.35·c)·brightness, where c is the cover's turn progress.

**Leaves.** Each leaf is a PlaneGeometry PW × A with 32 × 10 segments, translated so its left edge (x = 0) is the spine and it lies over the right page. Material: a double-sided transparent ShaderMaterial. There are N + 1 leaves for N = 4 spreads:
- Leaf 0 is the cover: front = cover art; back = left half of spread 1.
- Leaf k (1…3): front = right half of spread k; back = left half of spread k + 1.
- Leaf 4 is the fixed back board (never turns): front = right half of spread 4.

A turnable leaf i has a right-side z of 0.0024·(4 − i) and a left-side z of 0.0024·(i + 1); the board sits at z 0. So on the right the cover is on top, and on the left the most recently turned leaf is on top.

**Turn deformation** (recomputed only when the turn progress t changes; t = 0 lying right, t = 1 lying left). Turn angle θ = π·t. Flex amount k = 0.42·sin(π·t) (0 with reduced motion), multiplied per row by (1 + 0.3·y/A) so the lower corner lags slightly more. For each row, walk the 32 segments from the spine: segment c (1…32) has normalised position s = (c − 0.5)/32 and local angle a = θ − k·s; advance x += cos(a)·PW/32 and z += sin(a)·PW/32. Write (x, y, z) into the vertices, then recompute normals. The leaf's own z position is lerp(zRight, zLeft, smoothstep(0.35, 0.65, t)) + 0.004·sin(π·t). While turning (0.001 < t < 0.999) its render order is 20; otherwise round(z·4000).

**Fragment shader (per pixel).**
- Page mask: p = (u·0.5, (v − 0.5)·A) in spread units; a rounded-box SDF centred on the spine with half size (0.5, A/2) and radius 0.0404, so only the outer corners round. Anti-alias width = 1.2·length(fwidth(p)); discard when the mask is below 0.004.
- Lighting: n = the normal, flipped on back faces; lit = dot(n, normalise(−0.3, 0.4, 1)); shade = clamp(1 + 0.6·(lit − 0.877), 0.5, 1.12). Spine gutter darkening: ×(1 − 0.20·e^(−22u)). Outer board edge: ×(1 − 0.16·smoothstep(−0.010, 0, d)).
- Face content, by mode:
  - Cover: x is cropped to the page aspect (0.776) from the 0.8 image; uv = 0.5 + (uv − 0.5)/1.02 + mouse·0.006.
  - Right half of a spread: spread coordinates su = (0.5 + 0.5u, v).
  - Left half (a turned page's back): su = (0.5 − 0.5u, v).
- Spread art mapping: the 2048×1360 art (aspect 1.5059) is cover-fitted to the spread by scaling y around 0.5 by 1.5059/1.5517, then zoomed: uv = 0.5 + (su − 0.5)/1.045 + offset + shift.
  - The sky plate's offset is mouse·0.010, the foreground's mouse·0.024, which gives the parallax.
  - Spread 1 alone has shift (0, 0.035), which aligns its art with the approved design.
  - When the sky is a video (16:9) it is cover-fitted by scaling x around 0.5 by 1.5517/1.7778, then zoomed by 1.045 with the same mouse·0.010 offset (no shift).
  - Composite: sky, then the foreground mixed by its alpha, then the copy texture (sampled at su directly) mixed by its alpha.
- A face without content (never visible in practice) is paper #efe6d4 with a faint 900-cell hash grain.
- Output colour × shade × brightness, alpha = mask.

**Copy printed on the pages.** One 2048 × 1320 canvas per spread, in spread coordinates, with a text shadow rgba(0,0,0,.28) blur 10, left-aligned at x = 0.514·W:
- The heading in Newsreader 400 at (27.2/990)·W px, colour #f6f1e8, baseline at 0.749·H.
- Three body lines in Newsreader 400 at (17.3/990)·W px, colour rgba(240,235,226,.94), baselines at 0.806, 0.839 and 0.870·H.

On phones the printed copy is switched off and the captions show it instead. Copy:

| Spread | Heading | Line 1 | Line 2 | Line 3 |
|---|---|---|---|---|
| 1 | Brave Together | Small hearts can be brave, | especially when they face the unknown | together. |
| 2 | Share the Light | A little light grows bigger | every time you pass it on | to a friend. |
| 3 | Ask Big Questions | Every question is a small lantern | that helps us see each other | a little more clearly. |
| 4 | Home Is Us | Home is not a place we keep, | it is the people we make room for | around the fire. |

**Animated skies.** After the textures load (and unless reduced motion is on), create one muted, looping, playsinline video per spread with crossOrigin anonymous and the Kling URL. When it fires `playing`, wrap it in a VideoTexture (linear filtering, no mipmaps) and swap it in as the sky of both halves of that spread (the left half on leaf i's back, the right half on leaf i+1's front, or the board's front for spread 4), flagging the faces as video. Until then the still sky shows; if autoplay is refused the stills stay. Pause the videos when the tab is hidden and resume when it is visible again.

## 7. Poses and states

States: loading → showcase → intro → open.

Pose = position (x, y in world px, y up from the viewport centre), uniform scale (spread width in px) and rotation (rx, ry, rz in radians). Frame y converts to world y as innerHeight/2 − (fy + frameY·S). Desktop poses:

| Pose | x | y (frame) | scale | rx | ry | rz |
|---|---|---|---|---|---|---|
| Intro (closed on the table) | 0 | 318 | 0.74·rect.w | −0.95 | 0 | 0.26 |
| Lift (upright, small) | 0 | 250 | 0.46·rect.w | 0 | 0 | 0 |
| Open (reading) | spread centre − viewport centre | spread centre | rect.w | 0 | 0 | 0 |
| Showcase A (open, upright) | 0 | 318 | 0.50·rect.w | 0.12 | −0.20 | 0.02 |
| Showcase B (closed, three-quarter view) | 0 | 310 | 0.64·rect.w | −0.35 | −0.75 | 0.12 |

Phone poses use the viewport height instead:
- Intro: y = vh/2 − 0.30·vh, scale = rect.w.
- Lift: y = vh/2 − 0.24·vh, scale 0.72·rect.w.
- Showcase A: y as intro, scale 0.80·rect.w.
- Showcase B: y as intro, scale 0.95·rect.w.

**Opening progress o (0…1) blends the poses.**
- a = easeInOutCubic(clamp(o/0.42)) blends intro → lift.
- b = easeInOutCubic(clamp((o − 0.32)/0.68)) blends that result → open.
- The cover's turn progress is easeInOutCubic(clamp((o − 0.45)/0.5)).
- Idle float: y += sin(1.3·time)·5·S·(1 − a), off with reduced motion.
- Mouse tilt in every state: rx −= mouseY·(0.05 + 0.03·b); ry += mouseX·(0.08 + 0.02·b).
- mouseX and mouseY are the pointer in −1…1 from the viewport centre (mouse pointers only), eased each frame by 1 − 0.94^(dt·60). The same eased values drive the shader parallax (x negated).

**Load showcase** (st = seconds since the textures finished loading; total 3.6 s).
- While loading: the wood is at opacity 0, the board edges and pages are black, the book is hidden. The dedication and status line sit centred vertically: translateY = (0.5·vh − 70) − (intro top + 76), eased away to 0 over the first 0.6 s of the showcase. "Loading…" fades out over 0.4 s.
- The book starts open on spread 3 (cover, leaf 1 and leaf 2 turned).
- Flip-backs, each easeInOutCubic: leaf 2 turns back over 0.35–0.95 s, leaf 1 over 0.75–1.35 s, and the cover closes over 1.15–1.95 s.
- Brightness of pages, board and shadow = smoothstep(0.45, 1.1, st); the book is invisible while brightness ≤ 0.01.
- Pose: Showcase A with a slow sway (ry + 0.12·sin(1.4·st), y + sin(2·st)·4·S). It blends to Showcase B with easeInOutCubic over 1.15–2.15 s, then to the live intro pose (with float and mouse tilt) over 1.95–3.10 s.
- Wood opacity = smoothstep(1.9, 3.1, st). The "Open book" button fades in with smoothstep(3.0, 3.6, st).
- At 3.6 s: everything is reset to closed and full brightness, the status line changes to "Scroll or click to open", the button becomes clickable, and the state is intro.

**Scroll to open (intro state).**
- Wheel events are captured (passive false, default prevented) and add deltaY/1400 to a target progress (deltaY/30 for line-mode wheels), clamped to 0…1. Touch drags add (previous y − current y)/600.
- Each frame, progress o eases toward the target by 1 − 0.915^(dt·60). Scrolling back before the auto-finish closes the book again.
- Once the target passes 0.5 and no input arrives for 160 ms, or after a click on "Open book" (or a click on the stage while o < 0.02, or Down/PageDown/Space/Enter), auto-finish starts: target rises by 0.011·dt·60 per frame until it reaches 1.
- The intro block's opacity = 1 − 3.2·o and it moves down 160·o px.
- When o > 0.995 the book is open: the intro block is hidden, body gets `open` (arrows, dots and captions appear) and the state is open.

**Turning pages (open state).**
- Next: turn leaf (current + 1) from 0 to 1. Previous: turn leaf (current) back to 0. Arrows, dots (which can jump several leaves at once), and the Left/Right keys use 1050 ms per full turn (duration scales with the distance) + 120 ms, easeInOutCubic.
- Dragging: a pointer down inside the spread (±30 px horizontally) grabs the right page (to go forward) or the left page (to go back) and captures the pointer. The leaf's t follows t0 − dx/(0.9·rect.w).
- On release: a right-page drag completes when t > 0.3 (900 ms) or springs back (600 ms); a left-page drag goes back when t < 0.7.
- The previous arrow is disabled on spread 1, the next arrow on spread 4.

## 8. Reduced motion

With `prefers-reduced-motion: reduce`:
- There is no showcase: the book appears closed on the lit table immediately.
- No float, tilt or parallax, and no page flex.
- Turns and the opening complete in a single frame.
- The videos are not loaded, so the still skies show.
- All CSS transitions and animations are off, and the logo, footer and intro are fully visible.

## 9. Acceptance checklist

- On load: black screen with the centred dedication and "Loading…". Then the book fades in open on "Ask Big Questions", flips back through "Share the Light" and "Be Brave", closes, swings to a three-quarter view and lies down on the table as the wood fades up. "Open book" appears after about 3.6 s.
- Scrolling lifts the closed book upright, then flies it to the centre, zooming in while the cover swings open to the left around the spine. The open spread fills exactly x 226–1216, y 132–770 of a 1440×900 frame.
- Only the right page turns. A turning page stands up over the spine with a slight flex and lands on the left showing the next spread's left half.
- Each spread's art runs continuously across the spine with a soft gutter shadow, rounded outer corners only, and visible board thickness at the edges.
- The skies move (clouds rolling, stars twinkling, shooting stars), and the foregrounds shift more than the skies as the mouse moves.
- Four dots, two arrows, keyboard and drag all work. The phone layout shows captions below the spread and no arrows.