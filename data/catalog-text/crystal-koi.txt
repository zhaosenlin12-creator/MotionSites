# Nectarline — exact recreation prompt

Build a single-file, five-section landing page called **Nectarline** ("Supply Side Studio®"), a fictional self-serve programmatic-media curation product. The page sits on top of a fixed, full-viewport scene: a looping dusk lotus-pond video in the hero (drawn through a WebGL hover-ripple lens), which crossfades to a deep violet gradient for the middle sections and to a night version of the pond behind the footer. A 3D crystal-glass koi fish (a real GLB model rendered with Three.js) swims through every section, its position, size and heading driven by scroll, and its body bending in a swimming wave. All UI is ordinary HTML laid over that scene. Recreate it exactly as specified below: every text, colour, size, position, timing and formula is the real one.

Everything is one HTML file: inline CSS, two inline scripts (one classic, one ES module), Three.js from a CDN import map. No build step, no framework.

---

## 1. Media and asset URLs (use these exact links, do not re-host)

| Asset | URL | How it is used |
|---|---|---|
| Day plate (dusk lotus pond, still) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_151305_25ef1f45-0886-491c-a7a8-81e296402d5a.png&w=2400&q=85 | CSS background-image of the hero scene layer, cover, centred. Visible until the video has a frame, and on its own under reduced motion. |
| Pond loop video (Kling 3.0, 5.04 s, 1276×720, 24 fps, no audio, first frame = last frame) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261104_160514_d8369d6e-d8ba-4532-9751-b32e0c8aaf75.mp4 | A muted, looping, playsinline, preload auto, crossorigin anonymous video. It is never shown directly: its frames are uploaded every animation frame as a WebGL texture and drawn through the ripple lens shader (section 9). The host sends Access-Control-Allow-Origin: *, which WebGL needs. |
| Night plate (same pond at night, stars, dim glowing lotuses) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_151304_3b7ab857-b4c2-4f5a-8d7f-e1ec429185a5.png&w=2400&q=85 | CSS background-image of the third scene layer, cover, centred; fades in behind the call-to-action and footer. |
| Koi 3D model (Tripo H3.1 image-to-3D, about 6.2 MB GLB, one mesh, about 17.5k vertices, base-colour texture) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261104_151843_47d87652-1c40-465c-b0d6-cd94c22a9d3e.glb | Loaded with Three.js GLTFLoader. CORS is open on this host. |
| Three.js 0.170.0 | https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js and the addons folder https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/ | Import map: "three" points at the module file, "three/addons/" at the addons folder. Use GLTFLoader (three/addons/loaders/GLTFLoader.js) and RoomEnvironment (three/addons/environments/RoomEnvironment.js). |

There are no other images. Every icon, chart, badge, logo orb and decoration is inline SVG or CSS.

## 2. Fonts

| Family | Role | Weights used | File (latin subset, woff2) |
|---|---|---|---|
| Inter Tight | All UI and headlines (a free stand-in for Neue Haas Display) | variable 100–900; used at 300, 400, 500, 600 | https://fonts.gstatic.com/s/intertight/v9/NGSwv5HMAFg6IuGlBNMjxLsH8ag.woff2 |
| Instrument Serif, italic | Single accent words inside headlines | 400 italic only | https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2 |
| Fira Code | Labels, tags, numbers in tables, the typed bid request | 400 | https://fonts.gstatic.com/s/firacode/v27/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7Ng.woff2 |

Declare three @font-face rules with font-display swap: "Inter Tight" with font-weight range 100 900; "Instrument Serif" with font-style italic; "Fira Code". In the single-file deliverable the three files are embedded as base64 data URIs. Equivalently, the Google Fonts stylesheet for Inter Tight 300–600, Instrument Serif italic and Fira Code 400 gives the same faces. Font stacks: sans = "Inter Tight", system-ui, sans-serif; serif = "Instrument Serif", Georgia, serif; mono = "Fira Code", ui-monospace, monospace. Body text uses -webkit-font-smoothing antialiased.

## 3. Head, colour tokens and base

Title: "Nectarline — Supply Side Studio". Meta description: "The leading independent self-serve studio for curating programmatic supply." Viewport meta width=device-width, initial-scale=1. The html element starts with the class "anim" (entrance guard, section 10).

| Token | Value | Use |
|---|---|---|
| ink | #f4f2ff | primary text |
| ink-2 | rgba(236,232,255,.72) | body copy, secondary text |
| ink-3 | rgba(220,214,255,.5) | captions, tags, table headers |
| peri | #6f78ff | primary button, accent fills |
| peri-2 | #8d94ff | accent text, hover of primary button, step numbers |
| navy (page background) | #0d0830 | html and body background |
| line | rgba(196,178,255,.15) | hairlines and dividers |
| glass-hi (role card hover) | linear-gradient(160deg, rgba(120,100,255,.2), rgba(70,50,170,.14)) | |

Reset: every element box-sizing border-box, margin 0, padding 0. Links inherit colour, no underline. Buttons inherit font and colour, no border, transparent background, pointer cursor. Body overflow-x hidden.

## 4. Scaling system

One design unit, u, is derived from a 1440 px wide frame: u = content width / 1440 on screens wider than 820 px, and content width / 390 at 820 px and below. Use the document's clientWidth (which excludes the scrollbar), set by script as the CSS custom property --u in px on load and on resize (the stylesheet fallback is 100vw/1440, or 100vw/390 in the small-screen query). Every desktop measurement below is in u; "40u" means calc(40 × var(--u)). On phones most rules switch to fixed px values (section 12).

## 5. The fixed scene stack (behind everything)

A fixed full-viewport container, z-index 0, pointer-events none, overflow hidden, aria-hidden. It holds four layers, each absolutely filling it, in this order (back to front):

1. **Day plate**: background-image = day plate, cover, centred; will-change opacity and transform. Inside it: the pond video (absolute, 100%×100%, object-fit cover, opacity 0, transition opacity 1.2 s ease; it only becomes visible if WebGL is unavailable, by gaining a class that sets opacity 1), then the ripple canvas "pondfx" (absolute, 100%×100%, block, opacity 0, transition opacity 1.2 s ease; it gets opacity 1 on the video's first "playing" event).
2. **Violet layer**: background linear-gradient(180deg, #160c40 0%, #0f0832 50%, #0b0626 100%), opacity 0. It is a flat gradient with no radial glows or blobs.
3. **Night plate**: background-image = night plate, cover, centred, opacity 0. A ::after overlay darkens it for footer legibility: linear-gradient(180deg, rgba(13,8,40,.15) 0%, transparent 30%, rgba(13,8,40,.6) 58%, rgba(11,6,34,.94) 100%).
4. **Koi canvas**: a full-viewport transparent WebGL canvas (Three.js renderer, alpha true, antialias true).

Main content is position relative, z-index 1, above the scene.

**Scroll crossfade** (runs on scroll and resize; h = viewport height, y = scrollY, smoothstep(a,b,v) = t²(3−2t) with t = clamp((v−a)/(b−a))):
- toViolet = smoothstep(0.15h, 1.05h, y).
- Day plate opacity = 1 − toViolet; its transform = scale(1 + 0.08·toViolet) translateY(−0.06·y px) (a slow push-in and parallax as you leave the hero).
- toNight = smoothstep(endTop − 1.1h, endTop − 0.1h, y), where endTop is the CTA/footer section's offsetTop.
- Violet layer opacity = toViolet × (1 − toNight). Night plate opacity = toNight.
- The nav gets the class "scrolled" when y > 0.5h.
- The pond video plays while toViolet < 0.999 and is paused otherwise (no decoding when it can't be seen).

## 6. Navigation (fixed, z-index 20)

Fixed bar: top 24u, left 36u, right 32u, height 52u, flex, items centred, space-between, font-size 16u.
- **Logo** (link to #top): flex, gap 14u, weight 600, 23u, letter-spacing −0.01em. The orb before the word is a 34u circle: radial-gradient(circle at 32% 30%, #fff 0 8%, #cdb8ff 22%, #8a6cff 52%, #4b3bd6 78%), box-shadow 0 0 18u rgba(160,140,255,.55) plus an inset −4u −5u 10u rgba(40,20,140,.5). Text: "Nectarline".
- **Centre menu**: absolutely centred (left 50%, translateX(−50%)), flex, gap 4u, padding 5u, radius 12u, background rgba(120,124,220,.28), 1 px border rgba(200,200,255,.22), backdrop-filter blur(14px) saturate(1.3). Items: "Product", "Channels", "Resources" (each followed by a 10u chevron: a 10×10 viewBox path M2 3.5 l3 3 3−3, stroke currentColor 1.4, opacity .8) and "Customer Stories" (no chevron). Item: flex, gap 7u, padding 10u 14u, radius 8u, weight 500, background transition .25 s; hover background rgba(255,255,255,.12). When the nav has "scrolled", the menu background becomes rgba(14,16,60,.55).
- **Right group**: flex, gap 10u. "Login" (weight 500, padding 0 14u). Pill "Book a Call": grey glass (background rgba(120,124,200,.42), border rgba(210,210,255,.2), blur 10px). Pill "Get Started — it's Free": dark (#141a4d, border rgba(160,160,255,.18); hover #1c2363). Pills: inline-flex, height 46u, padding 0 17u, radius 10u, weight 500, nowrap; transitions .25 s; hover translateY(−1px).

## 7. Shared components

- **Button**: inline-flex, centred, height 49u, padding 0 18u, radius 11u, 16u, weight 500, nowrap, transition transform .25 s, box-shadow .3 s, background .3 s; hover translateY(−2px).
  - fill: background #6f78ff, shadow 0 8u 26u rgba(90,96,255,.35); hover background #8d94ff, shadow 0 10u 34u rgba(110,116,255,.5).
  - ghost: 1 px border rgba(230,226,255,.42), background rgba(255,255,255,.03); hover rgba(255,255,255,.1).
  - white: #fff with text #14163f. dk: #11143f with a 1 px border rgba(160,160,255,.2).
- **Accent text**: colour #8d94ff. **Serif accent**: Instrument Serif italic 400, letter-spacing 0.
- **Lede**: 18u, line-height 1.55, ink-2, letter-spacing −0.005em.
- **Glass surface** (cards, as on the original): background linear-gradient(160deg, rgba(110,90,240,.14), rgba(60,40,150,.08)); 1 px border rgba(205,190,255,.16); box-shadow inset 0 1px 0 rgba(255,255,255,.08) and 0 24u 60u rgba(8,3,30,.28); backdrop-filter blur(22px) saturate(1.35). The koi shows softly frosted through these cards; that is intended.
- **Chip**: inline-flex, gap 6u, height 24u, padding 0 9u, radius 6u, Fira Code 11u, letter-spacing .02em, ink-2, background rgba(170,150,255,.1), border rgba(190,170,255,.12). Variant "up": text #7cf0bd, background rgba(80,220,160,.1), border rgba(80,220,160,.18). Variant "live": a 6u dot before the text, #5ee6a8 with a 0 0 8u #5ee6a8 glow, pulsing opacity to .35 at 50% over 2 s ease-in-out, infinite.
- **Text link with arrow**: inline-flex, gap 10u, 16u, weight 500; the 16u arrow (path M2 8 h11 M9 4 l4 4 −4 4, stroke 1.5) moves right 4u on hover over .3 s.
- **Icons**: bare line icons, no tile, no background, no border: a 24u box, opacity .85, holding a 22u-wide white SVG with stroke-width 1.3.
- **Scroll reveal**: elements marked "reveal" start at opacity 0 and translateY(36u), with transition on opacity and transform of 1 s cubic-bezier(.2,.7,.2,1). An IntersectionObserver (threshold .15) adds the class "in" (opacity 1, no transform) once and then stops watching that element.

## 8. Sections, top to bottom (desktop measurements)

### 8.1 Hero (id hero), height 100vh, min-height 900u, position relative

All children absolutely positioned on the 1440×900 frame:
- **Headline** at left 67u, top 526u: weight 300, 74u, line-height 68u, letter-spacing −0.025em, two lines "Introducing" and "Nectarline". Each line is a block wrapper with overflow hidden and padding-bottom 6u, holding a block span (the span slides up inside its mask on entrance).
- **Subline** at left 67u, top 684u: "Supply Side Studio" followed by a superscript ® at 0.55em; 20u, ink-2, letter-spacing −0.005em.
- **Buttons** at left 67u, top 742u, flex, gap 11u: fill "Get Started — it's Free" and ghost "Book a Call".
- **Scroll card** (a button) at left 1202u, top 703u, 193u × 152u, radius 10u, padding 16u 17u, background linear-gradient(160deg, rgba(120,128,255,.72), rgba(98,104,240,.62)), border rgba(210,210,255,.3), blur 16px, 27u, line-height 1.18, letter-spacing −0.01em, column flex with space-between. Text: "Scroll down" / "& discover". Bottom-right: a 22u white down-arrow (M11 3 v15 M5 12 l6 6 6 −6, stroke 1.6) that bobs 5u down and back over 2.2 s ease-in-out, infinite. Hover lifts the card 4u (.35 s). Clicking smooth-scrolls to the Studio section.

### 8.2 Studio (id studio), centred, padding 300u 64u 150u

- **Headline** (reveal): weight 300, 52u, line-height 1.1, letter-spacing −0.028em, max-width 1240u, margin 22u auto 0. Text: "The leading independent " + accent "self-serve curation studio" + line break + "for all programmatic media buyers."
- **Lede** (reveal), max-width 600u, margin-top 22u: "Shape supply before you bid. Package, forecast and launch private deals from one calm workspace."
- **Buttons** (reveal), centred, gap 10u, margin-top 34u: fill "Get started — it's free", ghost "Book a Call".
- **Stats row** (reveal): a 4-column grid, max-width 1060u, margin 72u auto 0, hairline top and bottom borders (line colour), vertical hairlines between cells. Each cell has padding 24u 20u and is left-aligned; the number is weight 300, 40u, letter-spacing −0.03em, line-height 1; the caption is 14u, ink-3, line-height 1.4, margin-top 10u. Cells: "2.4B" / "bid requests shaped" ↵ "every day"; "48s" / "median time from brief" ↵ "to live deal ID"; "120+" / "supply partners" ↵ "in one workspace"; "0%" / "buy-side markup" ↵ "on curated media". These figures are placeholder copy for the fictional brand.
- **Product dashboard** (reveal, id dash): max-width 1220u, margin 80u auto 0, radius 16u, background linear-gradient(180deg, rgba(30,20,78,.86), rgba(20,13,56,.9)), border in the line colour, box-shadow 0 50u 140u rgba(6,2,30,.7), a 7u ring rgba(150,120,255,.05), an inset top highlight rgba(255,255,255,.06); overflow hidden; 13u base text. A 1 px highlight line runs along the top edge from 10% to 90%: linear-gradient(90deg, transparent, rgba(200,180,255,.7), transparent).
  - **Top bar**: height 54u, padding 0 18u, flex, gap 16u, hairline bottom border rgba(190,170,255,.09). Contents: a mini logo (20u orb + "Nectarline", 15u); a breadcrumb in ink-3 "Deals  /  " + bold ink "Spring Streaming Pack"; a flexible spacer; a search field 230u × 32u (radius 8u, background rgba(170,150,255,.07), border rgba(190,170,255,.1), a magnifier icon, "Search deals", and a "⌘K" key cap in Fira Code 10u on rgba(255,255,255,.06)); a live chip "Live"; a 30u round avatar "PM" (linear-gradient(135deg, #7a5cff, #c070ff), 11u, weight 600).
  - **Body**: a grid with a 196u sidebar and a flexible main column.
  - **Sidebar**: padding 14u 12u, hairline right border, column with 2u gaps. Group headings in Fira Code 10u, tracking .1em, ink-3: "WORKSPACE", then "LIBRARY" (16u above, 6u below). Items (padding 8u 10u, radius 7u, gap 10u, ink-2, a 15u line icon at opacity .8, an optional count on the right in Fira Code 10u ink-3): "Performance" (active: background rgba(140,120,255,.16), white text, a 2 px inset left bar in #8d94ff), "Deals 24", "Forecasts", "Team", then "Audience Layers 38", "Contextual 61", "Domain Scoring", "CTV Packages 12".
  - **Main**: padding 20u 22u 22u. Header row (flex, gap 12u): "Deal performance" (weight 400, 21u, tracking −0.015em); an up chip "▲ 18.4% vs last period"; a segmented control on the right (padding 3u, radius 8u, background rgba(170,150,255,.07), border rgba(190,170,255,.1); options "7D", "30D" (active, background rgba(255,255,255,.1), white), "90D", each 12u with padding 5u 11u); a small button "+ New deal" (32u tall, padding 0 13u, radius 8u, #6f78ff, 12u, weight 500).
  - **KPI tiles**: 4 columns, gap 12u, margin-top 18u; each tile has padding 14u 16u, radius 10u, background rgba(70,52,160,.22), border rgba(190,170,255,.08); label 12u ink-3; value row (space-between, baseline): value weight 400, 24u, tracking −0.02em, plus a chip (up variant unless negative). Under it a 30u sparkline (full width). Tiles: Spend "$184.2K" "+12%" colour #9b8cff; Win rate "29.6%" "+3.1pt" #ff8fd8; eCPM "$9.42" "−4%" (neutral chip) #7fd6ff; Deals live "24" "+5" #7cf0bd.
  - **Chart row**: grid 1.75fr / 1fr, gap 12u, margin-top 12u. Panes have padding 16u, radius 10u, background rgba(70,52,160,.18), border rgba(190,170,255,.08), heading 13u weight 500 ink-2. Left pane "Spend & win rate" with a legend on the right (8u square swatches: Spend #9b8cff, Win rate #ff8fd8; 11u ink-3), then a 190u-tall area chart. Right pane "Format mix" with five horizontal bars (gap 14u, margin-top 18u): label row 12u ink-2 with the value in Fira Code ink-3 on the right; track 6u tall, fully rounded, rgba(190,170,255,.08); fill a horizontal gradient from the colour to the colour at about 67% alpha. Bars: CTV 38% #9b8cff, Display 27% #7fd6ff, Online video 19% #ff8fd8, Audio 10% #ffc27a, DOOH 6% #7cf0bd. Each fill's width is value/38 × 100% (CTV fills the track).
  - **Deals table**: margin-top 12u, radius 10u, border rgba(190,170,255,.08). Rows: a grid of 2.2fr 1fr 1fr 1fr 1fr, padding 11u 16u, 12.5u ink-2, hairline separators rgba(190,170,255,.07). Header row: background rgba(70,52,160,.18), Fira Code 10.5u, tracking .06em, uppercase, ink-3: Deal, Channel, Floor, Win rate, Status. Rows: bold "Spring Streaming Pack" / CTV / $18.50 / 31.2% / live chip "Live"; "Pondside In-Market Auto" / Display / $4.80 / 27.9% / "Live"; "Quiet Hours Audio" / Audio / $6.20 / — / plain chip "Forecasting". Numbers are in Fira Code.
  - **Chart generation** (deterministic): a seeded generator s ← (s × 9301 + 49297) mod 233280, r = s/233280. series(n, seed, base, amp, trend)[i] = base + trend·i/(n−1) + sin(i·0.9 + seed)·amp·0.5 + (r − 0.5)·amp. Curves are smooth cubic paths: each segment from point q to p uses control points (mid-x, q.y) and (mid-x, p.y).
    - Sparklines: viewBox 200×30 stretched to fit; series(14,3,20,7,10), (14,7,18,6,9), (14,11,22,6,−6), (14,5,12,4,14); x = i·200/13; y = 28 − normalised(v)·24. Each has a fill under the line from the colour at .35 to 0 opacity, and a 1.6 px non-scaling stroke.
    - Area chart: viewBox 600×190 stretched; 5 horizontal grid lines at y = 12 + i·41.5 in rgba(190,170,255,.08); Spend = series(30,2,90,26,60), Win rate = series(30,9,70,22,30); max = largest value + 10; x = i·600/29; y = 190 − 12 − (v/max)·160. Fills from #9b8cff at .42 and #ff8fd8 at .22 down to 0. Strokes 2 px (#9b8cff) and 1.6 px (#ff8fd8), non-scaling. A marker at Spend point 22: a dashed vertical line rgba(220,210,255,.25) and a 4.5-radius dot (fill #1a1150, stroke #b9adff, 2 px).
  - **Draw-in on reveal**: every line uses pathLength 1 with stroke-dasharray 1 and stroke-dashoffset 1, and a transition on stroke-dashoffset of 1.8 s cubic-bezier(.2,.7,.2,1) (the win-rate line is delayed .2 s). Fills and the marker fade in over 1 s after a .9 s delay. Bar fills transition their width over 1.4 s on the same curve from 0. When the dashboard is revealed, set every dash offset to 0 and every bar to its width.

### 8.3 Packages (id packs), padding 190u 64u 160u

- **Split row**: a grid of 1fr / 520u, gap 80u, items aligned to the bottom, margin-bottom 72u.
  - Left (reveal): headline weight 300, 52u, line-height 1.1, tracking −0.028em, margin-top 22u, max-width 700u: "Choose boldly, look ahead, shape supply, tune fast, " + accent ("track " + serif italic "truth."). Lede max-width 560u, margin-top 22u: "Start from a curated package, tune it to your brief, then push one deal ID to any buying platform you already use." Buttons (gap 10u, margin-top 32u): white "Customer Stories", dk "Book a Call".
  - Right (reveal, aria-hidden): a code block with **no panel**: no background, no border, no blur, no divider lines. Header row (height 30u, Fira Code 12u ink-2): "bid_request.json" on the left and plain text "OpenRTB 2.6" on the right. Code area: padding 14u 0 6u, Fira Code 13u, line-height 1.6, colour rgba(214,204,255,.72), white-space pre, fixed height 250u, overflow hidden. Footer row (padding-top 10u, Fira Code 12u ink-3): "deal nl.pond.0428" on the left and the live dot + "ready" on the right, both plain with no chip fill or border.
  - **Typing**: the code area types out this text one character at a time (22 ms per character, 120 ms after each newline), followed by a block caret (0.55em × 1.1em, rgba(214,204,255,.8), blinking with steps(2) every 1 s). After the last character it waits 3.2 s and starts again from empty. It starts the first time 30% of the block is visible. The text, exactly, with two-space indents per level:
    "id": "7f3a9c1e00b24d6e8a51c0ffee42d0e1",
    "at": 2,
    "tmax": 120,
    "imp": [{
      "id": "1",
      "pmp": {
        "private_auction": 1,
        "deals": [{
          "id": "nl.pond.0428",
          "bidfloor": 4.8,
          "at": 1,
          "ext": { "priority": 1 }
- **Package cards**: a 3-column grid, gap 20u. Each card is a glass surface (the first one overrides it), reveal (delays 0, .08 s, .16 s), min-height 400u, radius 12u, padding 28u 30u, column flex, overflow hidden; transition transform .5 s cubic-bezier(.2,.7,.2,1); hover lifts 6u and sets the border to rgba(200,180,255,.32).
  - Card anatomy: a top row with an index in Fira Code 12u ink-3 ("01", "02", "03") on the left and a bare icon on the right; an eyebrow in Fira Code 12u, tracking .08em, ink-2, 46u below; a title at weight 400, 32u, line-height 1.12, tracking −0.022em, 12u below; body 16.5u, line-height 1.5, ink-2, 14u below; a meta row pushed to the bottom (padding-top 22u, 1 px top border rgba(210,195,255,.16), flex, space-between, bottom-aligned) with a small 12u ink-3 caption above a metric (weight 300, 30u, tracking −0.03em) on the left, and a text link "Get these deals →" on the right.
  - Card 1 (lead): background linear-gradient(155deg, #7a72ff 0%, #6457ee 55%, #7b4fe0 100%), border rgba(230,220,255,.35), shadow 0 30u 80u rgba(90,70,240,.3); index and caption at rgba(255,255,255,.7), body at rgba(255,255,255,.82). Crosshair icon (circle r6, circle r2, four ticks). "AUDIENCE-LAYERED" / "Reach Buyers Ready to Act Now" / "Publisher first-party signals plus trusted audiences, layered supply-side." / "Avg. reach lift" "+24%".
  - Card 2: screen icon (a rounded 14×9 rect and a stand line). "CTV PACKAGES" / "Screens Watched" / "Streaming inventory tuned toward a given context or genre." / "Completion rate" "96%".
  - Card 3: trend-arrow icon. "PERFORMANCE" / "Lift Conversion Now" / "Placements curated to steer toward the KPIs you care about." / "Avg. CPA change" "−17%".
- **Steps strip** (reveal): an ordered list as a 3-column grid, gap 20u, margin-top 56u. Each item: flex, gap 16u, padding-top 22u, 1 px top border in the line colour, 16u ink-2, line-height 1.45. Before it, a counter "01"/"02"/"03" in Fira Code 12u #8d94ff. A highlight line on the top border (linear-gradient(90deg, #8d94ff, transparent)) grows from 0 to 60% width over 1.4 s when the strip is revealed. Bold ink lead-ins: "Pick a package, then tune it" + "Layer audiences, context and quality rules."; "Review the forecast" + "See reach, floors and bidding guidance up front."; "Generate deal IDs in seconds" + "Activate on any buying platform, live in minutes."

### 8.4 Use cases (id uses), padding 150u 64u 220u

- **Heading block** in the empty top-right of the staircase, absolutely positioned: right 64u, top 150u, width 600u, right-aligned, above the cards. Headline (reveal) weight 300, 52u, line-height 1.1, tracking −0.028em: "Built for everyone" ↵ "who " + serif italic "touches" + " supply." Lede (reveal) max-width 440u, margin 20u 0 0 auto: "One workspace, four ways in. Every team gets the controls it needs, and nothing it doesn't."
- **Stepped staircase** of four glass role cards inside a container 880u tall. Each card is absolutely positioned, 310u wide, min-height 420u, radius 12u, padding 26u 26u 24u, column flex, reveal. Positions (left, top): card 1 (0, 0); card 2 (334u, 150u); card 3 (668u, 300u); card 4 (1002u, 450u); reveal delays 0, .06 s, .12 s, .18 s. Hover lifts 8u (.5 s), switches the background to glass-hi and the border to rgba(200,180,255,.3).
  - Card anatomy: a top row with a plain tag "USE CASE" (Fira Code 11u, tracking .12em, ink-3, **no background, no border, no padding**) and a bare icon; a title at weight 400, 29u, tracking −0.02em, 64u below; body 16u, line-height 1.5, ink-2, 14u below; two feature chips (normal chip style, gap 6u, wrap, 20u below); a link "Explore now →" pushed to the bottom with padding-top 22u and a 1 px top border rgba(210,195,255,.12).
  - Cards: "Media Agency" (briefcase icon) / "Programmatic without curation is just noise. Own the pipes, or let the pipes own you." / chips "Multi-client seats", "Margin control". "Direct Advertiser" (megaphone icon) / "Brands win when supply is shaped, not shuffled. Cut the clutter. Keep only what counts." / "Brand safety", "Outcome KPIs". "Publisher" (document icon) / "Stop funding buy-side margins. Keep them. Every hop takes a cut. Remove those hops." / "O&O packaging", "Audience extension". "Ad Tech" (code-brackets icon) / "Transparency isn't a feature, it's oxygen. Leaders don't wait on inventory. They shape it all." / "Open API", "White-label".

### 8.5 Call to action and footer (id end), min-height 100vh, padding 230u 64u 36u, column flex

- **CTA panel** (glass + reveal; its own background overrides the glass tint with linear-gradient(180deg, rgba(80,58,180,.34), rgba(40,26,110,.3))): max-width 880u, centred, padding 56u 60u 50u, radius 18u, centred text, overflow hidden, with a 1 px top highlight from 15% to 85% (transparent → rgba(220,200,255,.8) → transparent). Headline weight 300, 72u, tracking −0.032em, line-height 1.02, margin-top 22u: "Start Curating" ↵ serif italic "Supply-Side" + " Now!". Lede max-width 520u, margin 20u auto 0: "Free to start. Your first curated deal can be live before your coffee goes cold." Buttons (centred, gap 10u, margin-top 32u): fill "Get Started — it's Free", ghost "Book a Call". Note line (Fira Code 12u, ink-3, tracking .02em, margin-top 22u): "No card needed  ·  Live in minutes  ·  Cancel anytime".
- **Footer**, pushed to the bottom (margin-top auto, padding-top 150u):
  - Link grid: 1.6fr + four 1fr columns, gap 40u, padding-bottom 40u, a hairline bottom border. Brand column: logo (21u text, 28u orb, ink); a paragraph (15u, line-height 1.5, ink-3, max-width 280u, margin-top 16u) "The independent studio for curating programmatic supply, from first brief to live deal."; a live chip "All systems normal" (margin-top 22u). Column headings in Fira Code 11u, tracking .1em, ink-3, 16u below. Links are 15u ink-2, 11u apart, white on hover (.2 s). PRODUCT: Curation, Monetization, Forecasts. USE CASES: Media Agency, Direct Advertiser, Publisher, Ad Tech. CHANNELS: CTV, Display / Native, DOOH, Video / Audio. RESOURCES: Partner Directory, Documentation, System Status, Contact Us.
  - Legal bar: flex, space-between, padding-top 22u, 13u ink-3: "©2026 Nectarline: Supply Side Studio®" on the left; links "Privacy", "Terms", "Opt Out" (gap 24u) on the right.
  - Wordmark: "Nectarline" at weight 300, 236u, line-height .8, tracking −0.05em, centred, margin-top 26u, with transparent text clipped to a background of linear-gradient(180deg, rgba(210,195,255,.22), rgba(210,195,255,0) 85%) (a large, fading, ghosted wordmark). aria-hidden, not selectable.

## 9. Hero hover lens (WebGL, matches the original's post effect)

The pond is drawn into the "pondfx" canvas with WebGL 1. If WebGL is unavailable, or the program fails to link, show the plain video instead.
- Canvas backing size = viewport × min(devicePixelRatio, 1.5), updated on resize.
- One full-screen quad (two triangles over −1..1); vUv = position·0.5 + 0.5.
- Texture: the video element, re-uploaded every frame (RGB, unsigned byte, flip-Y on, clamp to edge, linear filtering).
- Cover fit: A = canvas aspect, V = video aspect (1276/720). If A > V then scale = (1, V/A), else scale = (A/V, 1). Multiply the scale by z = 0.975 (a slight zoom that leaves room for the tilt). Sampling: texture2D(tex, (uv − 0.5)·scale + 0.5 + tilt).
- Fragment shader, exactly the original's ripple: dist = distance(vUv, mouse); ripple = sin(dist·20 − time·5)·0.006; strength = smoothstep(0.2, 0.0, dist)·presence; offset = normalize(vUv − mouse + 1e−5)·ripple·strength. Red is sampled at vUv + offset + (0.005, 0)·strength, green at vUv + offset, blue at vUv + offset − (0.005, 0)·strength. Output alpha is 1. This gives a circular ripple of about a fifth of the screen around the cursor, with a red/blue colour split at its edge.
- time = seconds since the effect started. mouse = the pointer in uv (x/width, 1 − y/height). presence eases toward 1 while the pointer is in the window and toward 0 when it leaves, with rate k = 1 − e^(−6·dt). The mouse uniform keeps its last value while presence fades.
- Tilt: target tx, ty = pointer mapped to −1..1 (u·2 − 1, v·2 − 1; 0 when the pointer leaves), eased with k = 1 − e^(−dt/0.1) (settles in about 0.3 s, like the original's 0.3 s easing). The tilt uniform = (tx·0.009·scale.x, ty·0.009·scale.y), about 1° at this field of view.
- The loop runs on requestAnimationFrame but only draws when the video is ready (has played once), not paused and has data (readyState ≥ 2). dt is capped at 0.05 s.
- Pointer state is shared by both scripts: one window pointermove listener sets u, v, tx, ty and inside = true; a pointerleave listener on the document element sets inside = false and tx = ty = 0.

## 10. Hero entrance (one Web Animations timeline, run once)

The html element starts with the class "anim"; while present, every element marked data-in has opacity 0. The script starts the animations below with fill "backwards" (so each holds its first keyframe during its delay), then removes "anim" on the next animation frame. A 3 s failsafe timeout also removes it. Easing for all: cubic-bezier(.2,.75,.2,1).

| Element | From | To | Delay | Duration |
|---|---|---|---|---|
| Nav bar | opacity 0, translateY(−14px) | opacity 1, none | 0 ms | 900 ms |
| Headline line 1 span | opacity 0, translateY(105%) | opacity 1, none | 250 ms | 1100 ms |
| Headline line 2 span | opacity 0, translateY(105%) | opacity 1, none | 370 ms | 1100 ms |
| Subline | opacity 0, translateY(12px) | opacity 1, none | 620 ms | 900 ms |
| Hero buttons | opacity 0, translateY(14px) | opacity 1, none | 740 ms | 900 ms |
| Scroll card | opacity 0, translateY(40px) scale(.96) | opacity 1, none | 880 ms | 1100 ms |

## 11. The 3D koi (Three.js module)

- **Renderer**: on the koi canvas, alpha true, antialias true, high-performance power preference, pixel ratio min(devicePixelRatio, 2), sRGB output, ACES filmic tone mapping at exposure 0.95. The size follows the window.
- **Scene lighting**: environment = PMREM of RoomEnvironment (sigma 0.04); hemisphere light 0xc6b2ff / 0x2a1c80 at 0.7; key directional light 0xffc8f0 at 1.6 from (3, 5, 6); rim directional light 0x8c7bff at 2.8 from (−5, −1, −4). There is no glow sprite and no halo: the fish is drawn alone.
- **Camera**: perspective, 30° vertical field of view, near 0.1, far 100, at (0, 0, 10) looking down −Z. Visible frustum at z = 0: height fh = 2·tan(15°)·10, width fw = fh·aspect.
- **Model normalisation** (bake every mesh's world transform into its geometry first): take the bounding box; the longest axis is the fish's length. If it is Z, rotate +90° about Y; if Y, rotate −90° about Z. Then rotate 180° about Y so the nose points to +X (this Tripo model faces −X otherwise). Translate the box centre to the origin and scale uniformly so the length is 1. Recompute normals.
- **Material** (replaces the model's own; keeps its base-colour texture as both map and emissive map): MeshPhysicalMaterial with colour 0xc9b4ff (0xb8a4ff if there is no texture), roughness 0.18, metalness 0.15, clearcoat 1, clearcoat roughness 0.1, iridescence 0.85, iridescence IOR 1.4, thickness range 260–700, emissive 0x7a46ff at intensity 0.55, sheen 0.25 with sheen colour 0xff9ce6, transparent at opacity 0.95, environment intensity 0.75, double-sided. This gives a lilac-pink crystal look that stays bright against the dark violet background.
- **Swim deformation** (injected into the vertex shader in place of the begin_vertex chunk, using model-space position with the head at +X): tail = clamp((0.32 − x)/0.82, 0, 1); z += sin(x·freq − time·speed)·amp·(0.15 + 1.6·tail²); y += cos(x·freq·0.5 − time·speed·0.5)·amp·0.12·tail. Defaults: freq 5.2, speed 6.5, amp 0.075.
- **Swim speed follows scroll**: track scroll velocity vel (pixels per second, smoothed: vel += (instant − vel)·0.1). speedUp = min(|vel|/1800, 1.4). The shader time advances by dt·(1 + speedUp) each frame, and amp = 0.07 + 0.03·speedUp.
- **Scene graph**: rig (position and heading) → body (uniform scale) → mesh.
- **Scroll choreography**: one pose per section. x and y are in half-viewport units (−1..1, x to the right, y up), s is the fish length as a share of viewport height, and yaw, pitch and roll are in radians (yaw about Y, where 0 faces right; pitch about Z, where negative is nose down; roll about X).

| Pose | Scroll position where it applies (h = viewport height) | x | y | s | yaw | pitch | roll |
|---|---|---|---|---|---|---|---|
| hero | 0 | 0.02 | 0.16 | 0.72 | 0.18 | −0.92 | 0.05 |
| statement | Studio section top + 0.2h | −0.66 | −0.6 | 0.42 | 0.5 | 0.2 | −0.1 |
| dash | dashboard top + half its height − 0.5h | 0.5 | −0.5 | 0.46 | −0.35 | 0.32 | 0.1 |
| packs | Packages section top + 0.3h | 0.4 | −0.78 | 0.5 | 0.55 | −0.05 | 0.08 |
| uses | Use-cases section top + 0.3h | −0.42 | −0.42 | 0.6 | 3.0 (turned to face left) | 0.12 | −0.06 |
| end | min(CTA/footer section top, maximum scroll) | −0.7 | 0.56 | 0.48 | 0.3 | −0.14 | 0.05 |

  Section tops are page-absolute (bounding rect top + scrollY), recomputed on load and resize. Between two neighbouring poses, interpolate every value with easeInOutCubic of the scroll progress between their positions (4t³ below 0.5, otherwise 1 − (−2t + 2)³/2). Before the first pose use the first; after the last, the last.
- **Per frame** (dt capped at 0.05 s, t = elapsed seconds): ease the current pose toward the target with k = 1 − e^(−3.2·dt) (k = 1 under reduced motion). Idle bob: y += sin(0.9t)·0.018. Position = (x·fw/2, (y + bob)·fh/2, 0). Rotation (XYZ order) = (roll + sin(0.7t)·0.04, yaw + sin(0.5t)·0.06, pitch). Scale = s·fh.
- **Pointer tilt** (the original's TILT camera control): camera.rotation.y eases toward −tx·0.01745 and camera.rotation.x toward ty·0.01745 (1° maximum) with k = 1 − e^(−dt/0.1).
- **Phone poses** (≤ 820 px wide) override only x, y and s: hero (0.12, 0.38, 0.46), statement (0.42, −0.72, 0.3), dash (−0.35, −0.74, 0.3), packs (0.38, −0.74, 0.3), uses (−0.3, −0.76, 0.32), end (0.3, −0.74, 0.32).

## 12. Small screens (max-width 820 px; u = width/390)

- Nav: top 14, left 16, right 16, height 44; logo 19 px with a 28 px orb; the centre menu, "Login" and the grey "Book a Call" pill are hidden; the dark pill is 38 px tall, 13 px text, padding 0 13, radius 9.
- Hero: min-height 100svh. The headline sits at left 20, bottom 250, 46 px with 44 px line-height; the subline at bottom 212, 16 px; buttons at bottom 140; buttons are 46 px tall, 15 px, padding 0 16, radius 10. The scroll card sits at right 20, bottom 28, 150 × 92, 18 px text, padding 12/14, with an 18 px arrow.
- Lede 16 px. Studio: padding 150/20/80, headline 32 px, button rows wrap. Stats become 2×2 (top border on cells 3–4, no left border on cell 3, cell padding 18/14, numbers 30 px, captions 13 px, margin-top 48).
- Dashboard: margin-top 48, radius 12, 11 px text; the breadcrumb, search and sidebar are hidden; main padding 14/12; title 17 px; "+ New deal" and the trend chip are hidden; KPIs are 2×2 (gap 8, padding 12, values 20 px, labels 11 px); the chart row stacks (gap 8); the area chart is 140 px tall; the table shows Deal, Channel and Status only (2fr 1fr 1fr, 11 px, padding 10/12).
- Packages: padding 110/16/80; the split stacks (gap 32, margin-bottom 36); headlines 32 px; code 11 px, 200 px tall; cards stack (gap 12, min-height 330, padding 24, titles 28 px, body 15.5 px, eyebrow 30 px from the top row at 11 px, metric 26 px); steps stack (gap 14, 15 px).
- Use cases: padding 80/16/110; the heading block returns to normal flow, left-aligned, 32 px headline, lede margin 16 above; the staircase becomes a simple stack (gap 12) with every card full width, min-height auto, padding 24, titles 27 px 34 px below the tag, body 15.5 px.
- CTA and footer: section padding 150/16/26; panel padding 40/22/34, radius 14, headline 42 px; footer padding-top 90; the link grid is 2 columns (gap 28/20) with the brand column spanning both; links 14.5 px; the legal bar stacks (gap 10, 12 px, links wrap with gap 16); wordmark 76 px with 22 px above.
- There is no horizontal scrolling at 390 px.

## 13. Reduced motion (prefers-reduced-motion: reduce)

All CSS animations and transitions are off; the data-in elements and all reveal elements are visible immediately; the entrance timeline doesn't run. The pond video's source is removed, so the still day plate shows and there is no ripple lens. The bid request is shown fully typed with no caret animation. The koi snaps to each pose without easing (k = 1), with no idle bob, wobble or swim (the shader time stays fixed), and the renderer redraws only on scroll.

## 14. Acceptance checklist

- At 1440×900 the hero matches: headline top 526, subline top 684, buttons top 742, scroll card at (1202, 703) sized 193×152; the koi sits centre-right with its head pointing down-right toward the large glowing lotus in the pond.
- Moving the mouse over the hero makes circular ripples with red/blue fringing around the cursor, and the whole view (pond and koi) leans up to 1° toward the pointer, settling in about 0.3 s.
- The pond video loops seamlessly with no visible jump, and pauses once the hero has faded out.
- Scrolling crossfades the pond to the violet gradient, then to the night pond behind the CTA; the koi glides between the six poses and swims faster while you scroll.
- The dashboard's lines draw in and its bars grow when it reveals; the bid request types and loops; the steps strip's highlight grows.
- Use-case cards form a four-step diagonal with the heading in the empty top-right; their "USE CASE" tags have no fill or border; icons everywhere have no tile.
- Cards are glass (translucent with backdrop blur); the koi reads as a soft frosted shape behind them, and there are no gradient blobs or glows anywhere in the background or around the fish.
- 390 px wide: everything stacks as described, with no horizontal scroll.
- No console errors; every listed URL returns 200; the three fonts load.