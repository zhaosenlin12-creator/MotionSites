# Verane — "Invest in Skyline" real-estate landing page: exact recreation brief

Build a single-file, full-viewport real-estate landing page for a fictional agency called VERANE. It is one sticky scroll stage that tells a two-part story. First comes a twilight city hero: a lilac-to-rose sky, one slender cylindrical glass supertall with a glowing crown exactly in the centre, a dense lit skyline on a harbour, and a huge thin "SKYLINE" headline that sits behind the tower. Then, as the visitor scrolls, the camera pulls back through a tall three-pane window into a dark indigo room. A man in a navy suit stands on softly lit steps looking out, and four white property cards slide in around the window. No framework and no build step: plain HTML, one style block, one script. Everything is driven by one requestAnimationFrame render loop that reads two clocks. The first is the intro clock (seconds since the hero image and fonts are ready). The second is a smoothed scroll clock mapped onto the timeline of the reference reel ("reel seconds" below).

## 1. Assets (use these exact URLs)

All images load through the Higgsfield image proxy: `https://images.higgs.ai/?default=1&output=webp&url=<URL-encoded result URL>&w=<width>&q=85`. Do not download or re-host anything.

| Asset | Result URL | Proxy width | Size and notes |
|---|---|---|---|
| Hero plate (sky, centre tower, skyline, harbour, no text or UI) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261119_114206_b326116b-1b08-4b0a-95c7-e0b20c6986ee.png | 2048 | 2048×1360. The tower is centred at x≈1024. Its crown top is at y≈316, its base at y≈1222, and the tallest rooftops of the skyline start at y≈890. |
| Room plate (dark indigo room, three-pane window, man in a navy suit from behind, steps with rose light strips; the window glass is flat chroma green #00FF00) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261119_114205_7235737c-137f-49d3-b967-ff0d65b5c4d3.png | 2048 | 2048×1360. Green glass bounding box x 523–1527, y 175–948 (centre 1025, 561.5), mullions at x 834–854 and 1200–1220, top of the steps at y≈735, bottom of the steps at y≈860. |
| House photo sheet (2×2 grid of four dusk house photos) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261119_114207_afc537ef-59b8-44f3-bea8-6e64ae6af08f.png | 1400 | 2048×1360. Quadrants: top-left a dark-grey ranch house with a pink tree; top-right a cream two-storey house; bottom-left a timber-and-glass A-frame cottage; bottom-right a stone manor under a pink sky. |
| Hero video (Kling 3, 5 s loop, first frame = last frame; water ripples, reflections and window lights move, sky and tower are still) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261119_131845_acb065cd-9dea-4e18-8f20-1d2634228a92.mp4 | direct link, used as is | 1280×720, 24 fps, 5.04 s, H.264, no audio. It shows rows 208–1360 of the hero plate (a 2048×1152 crop), so place it over exactly that band. |

Both the hero plate and the room plate are loaded with `crossOrigin="anonymous"`. The room plate must be readable by a canvas. The proxy sends `Access-Control-Allow-Origin: *`, and so does the video's CloudFront link.

## 2. Fonts

Self-host the latin WOFF2 files, all with `font-display: swap`:

| Family | Weight | Use | URL |
|---|---|---|---|
| Poppins | 300 | "Shape Your Future.", paragraph | https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2 |
| Poppins | 400 | nav links, Eng, Sign up, prices, spec rows | https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecg.woff2 |
| Poppins | 500 | card titles | https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2 |
| Poppins | 600 | logo | https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2 |
| Pinyon Script | 400 | "Invest in" | https://fonts.gstatic.com/s/pinyonscript/v24/6xKpdSJbL9-e9LuoeQiDRQR8WOXaOg.woff2 |
| Outfit (variable, declare weight range 100–900) | 330 | "SKYLINE" | https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtq.woff2 |

The body falls back to system-ui, sans-serif. Use -webkit-font-smoothing: antialiased.

## 3. Head, tokens and page structure

The title is "Verane — Invest in Skyline". Include the viewport meta tag `width=device-width, initial-scale=1`. Set the CSS variables `--sky: #6372c8`, `--room: #151f3f`, `--s` (UI scale, set by script), and `--travel` (scroll travel, set by script to 3.4 × viewport height). Use box-sizing: border-box everywhere with zero margins. html and body have background #151f3f and text colour white. Links inherit their colour and have no underline.

DOM order:

1. A fixed `header.nav` with z-index 20 and initial opacity 0. It holds the logo link "VERANE", a `nav.pill` with four links (Home, which is active, About Us, Property List, Contact Us), a span "Eng" with an inline globe SVG, and a link "Sign up". All four children are absolutely positioned.
2. `main#story` with height `calc(100vh + var(--travel))`. Inside it, `div.stage`: position sticky, top 0, height 100vh (100svh where supported), overflow hidden, background #6372c8. The stage stacks these layers from back to front:
   1. `#view`, the "view layer". It contains: a `.sky` div; `img#heroImg` (the hero plate); `video#heroVid` (muted, loop, playsinline, preload auto, crossorigin anonymous, aria-hidden).
   2. `#head`, a full-width absolute div holding `span#word` "SKYLINE".
   3. `#tower`, the "tower layer": a second copy of the hero plate, clipped to the tower outline.
   4. `span#script` "Invest in". It sits in front of the tower so the tower never cuts it.
   5. `.shade`, a bottom gradient scrim that is only used on phones.
   6. `#room`, the "room layer": two edge-extension spans and `canvas#roomCv`.
   7. `#build`, the "Shape Your Future." block with its thumbnail.
   8. `#para`, the paragraph.
   9. Four `article.card` elements.

Every transformed layer uses `position: absolute; left: 0; top: 0; transform-origin: 0 0; will-change: transform`.

## 4. Scaling system

Everything is computed in JavaScript on load, on resize and when fonts are ready. W = window.innerWidth and H = the stage's clientHeight.

- **Portrait ("phone") mode:** H > 1.15·W. This covers every tall screen, both phones and portrait tablets (600×1024, 768×1024, 820×1180, 1024×1366). Everything else (desktop, landscape tablets, landscape phones) uses the desktop layout.
- **UI scale s:** in portrait, min(W/390, H/700, 1.9); otherwise clamp(min(W/1440, H/900), 0.62, 1.35). Write it to `--s`. Every UI size in CSS is `calc(<design px> * var(--s))`.
- **Minimum text sizes, so nothing is ever unreadable:** every UI font is `max(<floor>, calc(<px> * var(--s)))`:
  - logo 14 px; nav links, Eng and Sign up 11 px; globe icon 16 px;
  - "Shape Your Future." 18 px; paragraph 11 px;
  - card title 12 px, card subtitle 11 px, price 12 px, spec row 11 px, spec icons 13 px.
- **Plate cover:** sc = max(W/2048, H/1360), pw = 2048·sc, ph = 1360·sc, ox = (W − pw)/2, oy = (H − ph)/2. heroImg and towerImg are placed at (ox, oy) with size pw × ph. The video goes at left ox, top oy + 208·sc, size pw × 1152·sc, with object-fit: fill. The `.sky` div goes at left ox, top oy − 0.6·ph, size pw × 1.6·ph. The room layer box is pw × ph, and its offset (ox, oy) is folded into its transform (see section 7).
- **Glass on screen:** g = { x: ox + 1025·sc, y: oy + 561.5·sc, w: 1004·sc, h: 773·sc }.
- **Room end scale:** sEnd = phone ? min(1, 0.92·W/g.w) : 1.

## 5. Elements and exact styling

**Sky gradient (`.sky`).** A vertical linear gradient sampled from the plate. It is rgb(98,115,201) from 0% to 38.9%, then runs through rgb(103,118,203) 41.1%, rgb(110,121,206) 43.4%, rgb(117,124,208) 45.7%, rgb(125,127,210) 48%, rgb(133,131,211) 50.3%, rgb(141,134,211) 52.6%, rgb(148,136,212) 54.9%, rgb(156,139,212) 57.2%, rgb(165,142,210) 59.5%, rgb(175,144,208) 61.8%, rgb(187,148,204) 64.1%, rgb(196,150,199) 66.4%, rgb(204,153,195) 68.7%, rgb(210,154,189) 71%, rgb(215,155,184) 73.2%, rgb(220,155,178) 75.6%, rgb(224,152,171) 77.9% and rgb(227,148,163) 80.1%. The div extends 60% of a plate height above the plate, so a downward pan never reveals an edge.

**Skyline (heroImg and heroVid).** Both get the mask `linear-gradient(to bottom, transparent 61%, #000 65.2%)`, so only the skyline and harbour show and the sky above comes from the gradient. The video starts at opacity 0 and fades to 1 over 0.4 s once it is playing (class `on`). With prefers-reduced-motion it stays paused and hidden. The page re-checks when that setting changes.

**Tower (`#tower img`).** An inline SVG mask (viewBox 0 0 2048 1360, mask-size 100% 100%, no repeat). It has a white polygon through the plate points 978,1222 986,1150 990,700 994,420 990,340 994,316 1054,316 1058,340 1062,420 1065,1000 1068,1200 1074,1222, plus a white ellipse at 1024,322 (rx 62, ry 38) blurred with feGaussianBlur stdDeviation 14, so the crown glow fades softly into the sky.

**Nav.** These are desktop positions, as fractions of the viewport (all vertically centred on y = H·67/1012):
- The logo sits at left W·93/1418. "VERANE" is Poppins 600, 22·s px, letter-spacing 0.12em.
- The pill is centred horizontally. It has padding 5·s, gap 4·s, a radius of 999, background rgba(255,255,255,.12), a 1 px border in rgba(255,255,255,.35), and backdrop-filter blur(10px). Each link is 15·s px with padding 10·s × 20·s and line-height 1.1. The active Home link is a white pill with text #2b2a52.
- "Eng" sits at right W·216/1418. It is 15·s px with a 24·s globe icon (circle r 9.5, ellipse rx 4.2, three horizontal lines, stroke white 1.3) and a gap of 8·s.
- "Sign up" sits at right W·92/1418. It is a white pill with text #2b2a52, 15·s px, padding 12·s × 21·s.

On desktop, Eng's right offset is max(W·216/1418, Sign up's right + Sign up's width + 16·s), so on short landscape screens, where the text floors make Sign up wider, they never touch.

In portrait the nav sits at top 18·s:
- Sign up is at right 20·s.
- The logo (left 20·s) and Eng (right = 20·s + Sign up's width + 14·s) are both vertically centred on Sign up.
- The pill moves to its own second row, 12·s below Sign up, centred, with links at max(11.5 px, 12·s) and padding 8·s × max(9 px, 11·s).

navBottom, the lowest edge of the four nav items, is measured after placing them and used below.

**Headline "SKYLINE"** (in `#head`). Outfit weight 330, white, line-height 1, letter-spacing 0, transform-origin 0 0. It is sized from its ink, not its font box, using canvas measureText at 100 px for cap ascent, font ascent/descent and ink width (actualBoundingBoxLeft + Right).
- **Desktop targets** (measured on the approved mockup at 1440×900):
  - Target width wordW = W·1303/1440.
  - Cap height cap = min(150·H/900·1.22, wordW·150/1303), then wordW = min(wordW, cap·1303/150·1.25).
  - Ink left at W·70/1440, cap top at H·446/900.
  - Font size = 100·cap/capAscent, then scaleX = wordW / (inkWidth at that size).
  - Position: left = inkLeft + actualBoundingBoxLeft·scaleX. top = capTop − (half-leading + (fontAscent − capAscent)), where half-leading = (fontSize − (ascent + descent)) / 2.
- **Portrait:** wordW = W − 40·s, cap = wordW·150/1303, left 20·s, cap top just under the script (see below).

**Script "Invest in"** (`#script`, in front of the tower). Pinyon Script 400, white, nowrap. It is sized and placed from its ink box (canvas measureText ascent + descent for the ink height, actualBoundingBoxLeft + Right for the ink width).
- **Desktop and landscape:** the ink width is min(W·406/1440, wordW·406/1303) and the ink's left edge is at W·73/1440. It is placed from the headline, not from the screen height: the script's ink bottom overlaps the caps by 16.4% of the script's own ink height (ink top = capTop − inkHeight·0.836), exactly as on the mockup (script ink y 329–469 over caps starting at 446). This keeps the pair locked together on wide (2560×1080) and short (667×375) screens alike.
- **Portrait:** the ink width is min(W·0.5, 260·s), at left 20·s, with its ink top 20·s under the build block. The headline's cap top then sits at scriptInkTop + inkHeight·1.04, a small gap so the pair reads cleanly at phone size.

**"Shape Your Future." block (`#build`).** This is a flex row, centre-aligned, with gap 28·s.
- The thumbnail is 121·s × 95·s with radius 14·s. Its background is the photo sheet at background-size 205% 205%, position 2% 2% (the top-left house). Its shadow is 0 6·s 18·s rgba(30,20,70,.35). A white rounded play triangle (34·s × 38·s, translate −40%,−50%) sits centred on it.
- The text "Shape Your<br>Future." is Poppins 300, 36·s px, line-height 1.06.
- Desktop position: left W·93/1418, top H·169/1012.
- Portrait: the thumbnail is 76·s × 60·s and the text max(20 px, 26·s), at left 20·s, top = navBottom + 20·s.

**Paragraph (`#para`).** Poppins 300, 13.4·s px, line-height 1.45, four nowrap lines, each a block span followed by a space.
- Desktop position: right W·68/1418, top H·182/1012.
- The four lines: "Discover remarkable homes and towers set over a calm lit harbor," / "from quiet garden villas to lofty sky suites with sweeping views. A" / "calm advisor guides you from the very first visit to the final" / "key, so you find the place that fits."
- Short desktop or landscape screens (H < 620): the block gets a width of 0.4·W and the spans become inline and wrap, so the text floor never pushes it into the build block.
- Portrait: the spans become inline and wrap, at max(12 px, 12.5·s), with left and right 20·s, bottom 4.5% of H, over the `.shade` scrim. The scrim covers the bottom 34%, linear-gradient(to top, rgba(30,20,60,.55), transparent), and its opacity follows the paragraph's.

**Room layer.** A canvas at 2048×1360. When the room plate loads:
- Draw it, then key out the green per pixel. With r, g, b in 0–1: m = max(r, b) and k = g − m. If k > 0.05, alpha = 1 − smoothstep(0.10, 0.38, k), and green is clamped to min(g, m·0.96).
- To keep the room visible beyond the plate when it is scaled below 1 (phones), the layer has:
  - an infinite #151f3f band above (::before);
  - a band below (::after) that starts at the plate's own bottom-edge floor colour and darkens: linear-gradient(#4a3d6a, #2e2850 900px, #221d40);
  - side extensions (4000 px wide) with linear-gradient(#151f3f, #121b3b 58%, #272548 61%, #4a3d6a).
- The canvas bottom fades out (mask linear-gradient(to bottom, #000 86%, transparent 100%)) over a floor colour painted on the layer itself (background linear-gradient(to bottom, transparent 75%, #4a3d6a 75%); the glass ends at 70%, so this never shows through the window). The floor therefore runs seamlessly into the band below.
- The layer is hidden until the pull-back starts.

**Property cards** (four `article.card` elements). Cards use their own scale variable `--cs` (default `var(--s)`), so they can be resized without shrinking the text below its floor. White, width 266·cs, radius 24·cs, padding 12·cs 12·cs 18·cs, shadow 0 14·cs 40·cs rgba(8,10,40,.35), transform-origin 0 0. In the measurements below, "·s" on a card means "·cs".
- **Compact variant (cs < 0.8):** the text row stacks into a column (title, subtitle, then the price on its own line, with no divider and line-height 1.35), and the spec gap drops to max(7 px, 16·cs). Spec items never wrap (white-space: nowrap), so "180 m²" always stays on one line.
- **Photo:** height 150·cs·`--ph` (`--ph` defaults to 1), radius 18·s, the photo sheet at 205% 205% with positions 1% 1% / 99% 1% / 1% 99% / 99% 99%.
- **Text row:** a flex row with space-between and gap 8·s, padding 9·s 6·s 0. The title is Poppins 500, 14·s, #24233a. The subtitle is 12.5·s, #a3a2b3. The price is Poppins 400, 16·s, #8e8da0, padding-left 12·s, with a 1 px #e6e5ee left divider and line-height 2. All three are nowrap.
- **Spec row:** padding 10·s 6·s 0, gap 22·s, 12·s px, #55546a. Each item is a 16·s outline icon (stroke #9c9bb0, width 1.6) plus its value: bed, bath and house icons.
- **Content:**
  1. Lumen Gardens / Soft Modern Retreats / $412,000 / 3, 2, 180 m²
  2. Maple Terrace / Classic Family House / $528,000 / 4, 3, 240 m²
  3. Cedar Hollows / Timber Glass Cottage / $365,000 / 2, 2, 150 m²
  4. Rosewood Lane / Twilight Stone Manor / $486,000 / 4, 3, 260 m²
- **Desktop final positions:**
  - Card 1: x = W·79/1418, y = H·195/998.
  - Card 2: right edge at W·(1351−12)/1418, y = H·195/998.
  - Card 3: x = W·212/1418, y = H·581/998.
  - Card 4: right edge at W·(1221−12)/1418, y = H·581/998.
  - The two rows must fit between top = navBottom + 14·s and bottom = H − 12·s with a 12·s gap. If they don't, first shrink cs (down to 0.5), then the photo ratio --ph (down to 0.45), re-measuring each time.
  - Top cards: y = min(max(top, their mockup y), bottom − 2·cardHeight − gap). Bottom cards: y = max(min(bottom − cardHeight, their mockup y), top + cardHeight + gap). The rows can never overlap.
  - If two rows still can't fit (landscape phones), all four cards go in one row along the bottom, each min(266·s, (W − 24·s − 3·8·s)/4) wide with --ph 0.5, in the order Lumen, Cedar, Maple, Rosewood. The left two slide in from the left and the right two from the right, the inner pair 0.3 s later.
- **Portrait:** a centred 2×2 grid, gap 10·s, 16·s from the bottom. Card width cw = min(266·s·0.9, (W − 32·s − gap)/2) and cs = cw/266, so the cards are laid out at that width (not scaled down with a transform) and the text keeps its floors. The room's final glass centre (gyEnd) is set so the bottom step ends just above the card grid, but never so high that the top of the window frame goes under the nav (gyEnd ≥ navBottom + 10·s + glassHeight·sEnd/2).

## 6. Timeline 1: the intro (seconds I since the hero plate is decoded and fonts are ready; 3.5 s failsafe)

All curves are cubic-bezier evaluated with Newton iteration. They were fitted to per-frame measurements of the reference reel.

| What | Window | Easing | Values |
|---|---|---|---|
| Camera pan on the tower (sky, skyline and tower layers together) | 0–2.6 s | cubic-bezier(.45,.6,.65,1) | translateY from +0.355·H to 0, scale from 1.13 to 1 (the tower top travels from 61% to 26% of the height, near-linear for the first second) |
| Skyline rise (heroImg and video only, on top of the pan) | 1.15–2.2 s, then 2.2–3.5 s | cubic-bezier(.08,.9,.45,.95), then cubic-bezier(.45,0,.55,1) | absolute offset +0.45·H → −0.063·H (overshoot) → 0. Applied inside the view as translateY((offset·H − panY)/(viewScale)) |
| Nav fade-in | 1.45–2.0 s | cubic-bezier(.33,0,.2,1) | opacity 0 → 1 |
| Headline "SKYLINE" rise | 2.6–4.5 s | cubic-bezier(.3,.15,.2,1) | translateY from +0.62·H to 0 (plus the pan offset) |
| Script "Invest in" rise | 2.75–4.65 s | cubic-bezier(.3,.15,.2,1) | translateY from +0.62·H to 0 (plus the pan offset) |
| Build block and paragraph | 5.2–6.0 s | cubic-bezier(.25,.75,.2,1) | opacity 0 → 1, translateY 18·s → 0 |

## 7. Timeline 2: scroll (reel seconds T)

The scroll progress is pT = clamp(−story.top / (story.height − H)). It is smoothed with a time constant: pCur += (pT − pCur)·(1 − e^(−dt/0.187 s)), dt capped at 0.1 s, snapped when the difference drops below 1e‑4 (the same as 0.085 per frame at 60 fps), giving a soft inertial glide. Then T = 6.8 + pCur·6.6, so T runs from 6.8 to 13.4.

| What | T window | Easing | Values |
|---|---|---|---|
| Script exit | 6.82–7.25 | cubic-bezier(.5,0,.75,.4) | opacity 1 → 0, +25·s px down |
| Headline exit | 7.0–7.42 | same | opacity 1 → 0, +25·s px down |
| Build block and paragraph exit (with the scrim) | 6.85–7.35 | same | opacity → 0, +25·s px down |
| Push-in on the view | 7.5–8.35 | cubic-bezier(.45,0,.55,1) | scale 1 → 1.3 about the bottom-centre of the visible glass, so the skyline lifts with no gap. It relaxes back to 1 as q goes to 1. |
| Pull-back through the window | 9.0–11.1 | monotone cubic (Fritsch–Carlson) through ln S keyframes | T 9.0, 9.2, 9.5, 9.8, 10.1, 10.4, 10.63, 10.8, 10.97, 11.1, 11.3 → ln S 1.93, 1.749, 1.526, 1.253, 0.956, 0.642, 0.358, 0.166, 0.058, 0, 0. These come from the inner-mullion distance measured frame by frame in the reel. |
| Top cards slide in | 11.25–13.1 | cubic-bezier(.25,.75,.2,1) | from fully off the near side edge (−(x + width + 40) for the left card, W − x + 40 for the right) to the final x |
| Bottom cards slide in | 11.55–13.3 | same | same |

**Pull-back maths, computed every frame:**
- q = clamp(1 − lnS/1.93).
- Room scale S = e^lnS · sEnd^q.
- Glass centre y: gy = lerp(g.y, gyEnd, q). gyEnd is g.y on desktop. On phones it is min(g.y, top of the card grid − 6·s − (860 − 561.5)·sc·sEnd), so the bottom step ends just above the cards.
- The room layer is shown when T ≥ 8.98 and the canvas is keyed: `translate(g.x, gy) scale(S) translate(−g.x + ox, −g.y + oy)`.
- **The view always covers the visible glass.** The glass on screen is g.w·S by g.h·S around (g.x, gy). Clip it to the screen to get the rect R. Then kc = max(R.w/W, R.h/H), and R's centre is (rcx, rcy).
- The view and tower layers both get `translate(rcx, R.bottom) scale(push) translate(−rcx, −R.bottom) translate(rcx, rcy + panY) scale(kc·panScale) translate(−W/2, −H/2)`. Before the pull-back R is the whole screen (kc = 1, the hero). At the end R is the window glass, so the distant skyline shrinks into the window more slowly than the room: natural parallax.

## 8. Reduced motion

With prefers-reduced-motion: reduce:
- The intro is skipped (everything starts in its final state).
- The video stays paused and hidden.
- The scroll smoothing is off.
- The page shows the settled hero while pT < 0.5 and the settled room with all four cards placed once pT ≥ 0.5. There are no tweens.

## 9. Acceptance checklist

- At 1440×900 after the intro: "SKYLINE" caps span x 70–1373 and y 446–596. The tower passes between the Y and the L, in front of the word. "Invest in" ink sits at x 73–479. The nav is centred at y≈60.
- The skyline rises separately from the tower, overshoots slightly and settles. The water and lights move; the sky and tower stay still.
- Scrolling fades the copy and pushes in gently. The window mullions then enter from the screen edges, the man rises into view and the room reveals itself, with no gaps beside or above the window view at any point. The cards slide in from both sides, top pair first.
- Audited at 320×568, 360×740, 375×667, 390×844, 430×932, 600×1024, 768×1024, 820×1180, 1024×1366, 667×375, 740×360, 844×390, 932×430, 1024×500, 1024×600, 1024×768, 1180×820, 1280×720, 1366×768, 1440×900, 1920×1080 and 2560×1080, in both the settled hero and the final room state:
  - no UI element overlaps another or leaves the screen, and there is no horizontal scroll;
  - no text renders below 11 px;
  - Eng sits beside Sign up;
  - in portrait the pill is on its own row and the room ends showing the window, the man and the steps above the 2×2 cards;
  - "Invest in" is never hidden by the tower and keeps its mockup overlap with the caps.
- No requests fail. Fonts are self-hosted or embedded. The video uses its direct Kling link.