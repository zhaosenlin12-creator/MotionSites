# Recreate the "Adrian Korvel" portfolio hero exactly

Build a single-file, full-viewport portfolio hero for a fictional independent designer, Adrian Korvel. It is one screen, with no scrolling on desktop. The page is a deep burnt-terracotta scene. A giant, softly glowing condensed serif name sits behind an illustrated portrait of a young man with long curly hair that blows in the wind. Dark agave leaves sway in the bottom corners, and small sparkles twinkle. Around this sit small uppercase typewriter-style text blocks, a minimal nav and a strip of five badges along the bottom. Everything below must be reproduced exactly: values, text, assets, timings.

---

## 1. Assets (use these exact URLs; do not re-host, crop or re-encode)

| Role | Type | URL | Size | How it is used |
|---|---|---|---|---|
| Scene still (background plate) | PNG, served as WebP through the image proxy | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_011718_f1fd2b4c-d260-44ae-a0a2-8256134a4c35.png&w=2048&q=85` | 2048 × 1360 (3:2) | CSS background of the plate box, stretched to the box (`background-size:100% 100%`). Terracotta field, soft central glow, dark brown agave clusters in the bottom-left and bottom-right corners, 3 small white four-point sparkles. No text, no person. |
| Scene loop video | MP4 H.264, 1764 × 1172, 24 fps, 5.04 s, no audio | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261107_013821_69b8d7f5-48e9-43bb-8986-621494771aff.mp4` | ~2.4 MB | Same framing as the scene still. Agave leaves bend and whip hard in a gusting wind, sparkles twinkle, glow stays constant. Starts and ends on the still, so it loops seamlessly. Plays on top of the still inside the plate box. |
| Portrait still on chroma green | PNG, served as WebP through the image proxy | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_011718_86327298-00a4-468f-bc16-1555fc51ab6a.png&w=2048&q=85` | 2048 × 1360 (3:2) | The young man (long dark-brown curly hair to the shoulders, oatmeal crew-neck chunky knit sweater, flat painterly vector illustration style) on flat #00FF00. Keyed to transparency in WebGL; shown until the video has frames and permanently for reduced motion. Must load with `crossOrigin="anonymous"` (the proxy sends `Access-Control-Allow-Origin: *`). |
| Portrait loop video on chroma green | MP4 H.264, 1764 × 1172, 24 fps, 5.04 s, no audio | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261107_013339_aa2bb827-96c2-470c-be0f-f718d4c1cfcf.mp4` | ~6.2 MB | Same framing as the portrait still. His hair streams and whips to the right in a strong wind, the sweater ripples, he breathes and blinks once; the green never changes. Starts and ends on the still (seamless loop). Never shown directly: it is drawn into a WebGL canvas and keyed every frame. CloudFront sends `Access-Control-Allow-Origin: *`, so it must be created with `crossOrigin="anonymous"`. |

All four media share one geometry: a 3:2 image placed in a 1440 × 900 design frame at **left 0, top −28.125, width 1440, height 956.25** design units. That is a centred 16:10 crop of the 3:2 source, with 28.125 units hidden above and below.

## 2. Fonts (self-hosted latin WOFF2 from Google Fonts)

| CSS family name | Google font | Weight(s) | File URL | Used for |
|---|---|---|---|---|
| "Caslon Cond" | Libre Caslon Condensed (variable) | 400–700 range, used at 500 | `https://fonts.gstatic.com/s/librecasloncondensed/v3/flUpRrasxYEyVwtcWIsbLunUPow3bHNaxvyEX6gqZQ.woff2` | The giant two-line name |
| "Instrument Serif" | Instrument Serif | 400 | `https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2` | "Korvel" wordmark |
| "Plex Mono" | IBM Plex Mono | 400 | `https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2` | Body copy, badges, CHAT |
| "Plex Mono" | IBM Plex Mono | 500 | `https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2` | Nav links, BOOK A CALL |

`font-display: block` for Caslon Cond (the name must never flash in a fallback face); `swap` for the others. In the standalone file all four are embedded as base64 data URIs.

## 3. Head and colour tokens

- `<title>`: Adrian Korvel — Independent Designer
- meta description: "Adrian Korvel is an independent designer based in Lisbon, building calm, honest digital interfaces for studios that value clarity and craft."
- viewport: `width=device-width, initial-scale=1`

| Token | Value | Use |
|---|---|---|
| --bg | #aa4820 | Page background, plate fallback |
| --ink | #fff8f1 | All small text and icons |
| --name | #fae5d5 | Giant name |
| --pill | #f4ede6 | BOOK A CALL background |
| --pill-ink | #a03815 | BOOK A CALL text and arrow |

Global reset (`*{box-sizing:border-box;margin:0;padding:0}`). `html, body` height 100%, background --bg, colour --ink. `body` uses Plex Mono, `overflow:hidden` on desktop, `-webkit-font-smoothing:antialiased`. Links inherit colour, no underline.

## 4. The scaling system (three units)

Everything was measured on a 1440 × 900 mockup. One design unit is 1 mockup pixel.

- `--u` (cover) = `max(100vw/1440, 100vh/900)`. Used only for the scene plate, which must always cover the whole viewport.
- `--uc` (contain) = `min(100vw/1440, 100vh/900)`. Used for the content frame (name and portrait) and for the four copy blocks, so they always fit inside the viewport.
- `--n` (nav) = `clamp(0.62px, 100vw/1440, 1.25px)`. Used for the nav and the badge strip, which are pinned to viewport edges and scale with width only.
- `--ft` = `100vh − 900·--uc`, the y position where the content frame starts.

Containers:
- `.hero`: `position:relative`, 100vw × 100vh (100svh where supported), `overflow:hidden`, background --bg.
- `.cover` (scene plate holder): absolute, `left:50%`, `bottom:0`, width 1440·--u, height 900·--u, `translateX(-50%)`. It is **bottom-anchored**: on wide, short screens the top of the scene is cropped, never the agave.
- `.frame` (content): the same box but with `--u` redefined to `--uc`. Absolute, `left:50%`, `bottom:0`, 1440·--uc × 900·--uc, `translateX(-50%)`. It sits on the viewport's bottom edge.
- Inside each: `.plate` and `.man` are at left 0, top −28.125·u, width 1440·u, height 956.25·u.

## 5. Layer stack and exact desktop layout (design units on the 1440 × 900 frame)

From back to front:

1. **Plate** (`.cover > .plate`). The background image is the scene still (stretched 100% 100%), with the scene video as a child `<video class="plate-vid">` (absolute, inset 0, 100% × 100%, `object-fit:cover`, opacity 0 → 1 over 0.8 s ease once it fires `playing`). The video is muted, looped, `playsinline`, `preload=auto`, `crossOrigin=anonymous` and `aria-hidden`. The plate carries `role="img"` and `aria-label` "Terracotta backdrop with dark agave leaves".

2. **Name** (`h1.name`, `aria-label="Adrian Korvel"`, children `aria-hidden`). It fills the frame, with `pointer-events:none`. Font: Caslon Cond 500, colour #fae5d5, `line-height:1`. Glow: `text-shadow: 0 0 10u rgba(255,214,186,.55), 0 0 34u rgba(255,170,120,.45), 0 0 80u rgba(255,150,100,.25)`. Each line is an absolutely positioned span, full width, `text-align:center`, `nowrap`:
   - Line 1 "Adrian": font-size 202u, letter-spacing −0.01em, top 94u, translateX(−4.5u). Measured ink: x 449–977, cap top ≈ 118, baseline ≈ 272.
   - Line 2 "Korvel": font-size 212u, letter-spacing 0.065em, top 266u, translateX(11u). Measured ink: x ≈ 420–1030, baseline ≈ 453.
   - The portrait covers the middle of both words (the "r", "i" of Adrian and "orv" of Korvel are hidden behind his head and hair). That is intended.

3. **Portrait** (`.man`, `role="img"`, `aria-label` "Illustrated portrait of a young man with long curly hair in an oatmeal sweater", `pointer-events:none`). It contains one `<canvas>` (absolute, inset 0, 100% × 100%, `object-fit:cover`). The canvas pixel size equals the source being drawn (2048 × 1360 for the still, 1764 × 1172 for the video). Head top ≈ y 183, face centred at x ≈ 720, sweater running off the bottom edge.

4. **Bottom fade** (`.fade`, full viewport width, bottom 0, height 150·--uc, `pointer-events:none`): `linear-gradient(to bottom, rgba(176,82,44,0) 0%, rgba(190,110,74,.45) 62%, rgba(200,130,98,.72) 100%)`. It melts the sweater and agave into a lighter terracotta haze behind the badges.

5. **Copy blocks** (`p.copy`, z-index 3). Plex Mono 400, font-size 15.6·--uc, line-height 20.7·--uc, letter-spacing 0.025em, uppercase, `nowrap`, colour --ink. Lines are split with `<br>` exactly as shown:
   - `.c1`: left 62·--n, top --ft + 152·--uc. Text: "I design calm, honest / digital interfaces — / shaped like architecture, / warm like baked clay."
   - `.c2`: left 62·--n, top --ft + 366·--uc. Text: "No noise. No fluff. Just / craft. Every detail earns / its own place."
   - `.c3`: left `100vw − 214·uc − 62·n + 62·uc`, top --ft + 152·--uc. Text: "Based / in Lisbon, / remote"
   - `.c4`: left `100vw − 291·uc − 62·n + 62·uc`, top --ft + 363·--uc. Text: "Independent designer for / studios that value / clarity, craft, and the / long-lasting simplicity."
   - At exactly 1440 × 900 this puts the blocks at x 62, 62, 1226 and 1149. On other sizes the left blocks stay aligned with the nav padding and the right blocks keep the same distance from the right edge.

6. **Nav** (`header.nav`, absolute, top 0, full width, height 54·n, flex, `align-items:center`, horizontal padding 62·n, z-index 5):
   - Wordmark "Korvel" (`a.logo`, `aria-label` "Korvel, home"): Instrument Serif 400, 33·n, line-height 1, letter-spacing −0.01em, nudged up 2·n, margin-right 48·n. Ink x 64–131 at 1440.
   - Links (`ul.links`, Plex Mono **500**, 14.6·n, letter-spacing 0.02em): HOME · ABOUT · PROJECTS · JOURNEY. The middle dots are `li + li::before { content:"·"; margin:0 14n; opacity:.85 }`. Each link has 4·n vertical padding and a 1px currentColor underline drawn by `::after`, `scaleX(0)` from the left, going to `scaleX(1)` on hover/focus-visible over 0.35 s `cubic-bezier(.2,.7,.2,1)`. Ink x 182–509.
   - Right group (`margin-left:auto`, gap 30·n, margin-right 1·n, Plex Mono 13·n, letter-spacing 0.02em):
     - "CHAT", opacity .95, fading to .7 on hover over 0.25 s. Ink x 1184–1214.
     - "BOOK A CALL" pill: inline-flex, gap 8·n, height 32·n, padding 0 13·n, radius 999px, background #f4ede6, colour #a03815, Plex Mono 500, 12.6·n, letter-spacing 0.03em. It ends in a 12·n arrow icon: an SVG with viewBox 0 0 12 12, stroke currentColor 1.6, round caps, path `M3 9 9 3M4 3h5v5`. Box x 1245–1377, y 10–42. On hover the pill lifts 1px and gains `box-shadow: 0 6px 22px rgba(80,20,0,.28)`, and the arrow moves (2px, −2px), both over 0.3 s `cubic-bezier(.2,.7,.2,1)`.

7. **Badge strip** (`ul.badges`, `aria-label` "How I work", absolute, full width, bottom 10·n, flex centred, z-index 5, Plex Mono 400, 13.4·n, letter-spacing 0.02em, `nowrap`, `text-shadow: 0 1px 8px rgba(110,40,12,.55)`). Each `li` is a flex row with gap 8·n: a 15·n icon (with `drop-shadow(0 1px 4px rgba(110,40,12,.5))`) then the label. Separator: `li + li::before { content:"·"; margin:0 14n 0 6n; opacity:.85 }`. Items in order:
   1. Bar-chart icon (three filled rounded bars) + "RESEARCH-LED PROCESS"
   2. Pencil icon (stroked) + "HAND-MADE"
   3. Diamond with inner circle (stroked) + "TAILOR-MADE SITES"
   4. Price-tag icon with a dot (stroked) + "FIXED PRICING"
   5. Clock icon (stroked circle with hands) + "QUICK REPLY"
   - All icons use a 16 × 16 viewBox with stroke-width 1.4. The strip spans x ≈ 306–1145 at 1440.

## 6. Green-screen keying (WebGL)

Create a WebGL context on the portrait canvas with `{ premultipliedAlpha:true, alpha:true }`. Draw a full-screen triangle strip (−1,−1 / 1,−1 / −1,1 / 1,1). The vertex shader maps it to UVs with a flipped y: `v = vec2(p.x*.5+.5, .5-p.y*.5)`. The texture uses CLAMP_TO_EDGE and LINEAR filtering. Upload the current source each draw with `texImage2D`. Fragment shader:

- `m = max(r, b)`, `d = g − m`
- `alpha = 1 − smoothstep(0.06, 0.30, d)`
- Spill clamp: `g = min(g, (r + b) × 0.52)`. This removes the green halo from fine hair strands while leaving brown hair, skin and the cream sweater untouched.
- Output premultiplied: `gl_FragColor = vec4(rgb × alpha, alpha)`.

Draw the still once it loads. When the portrait video fires `playing`, start a draw loop using `video.requestVideoFrameCallback` (fall back to `requestAnimationFrame`) that redraws the video every frame while `readyState >= 2`. The portrait video is never added to the DOM.

## 7. Motion and interaction

**Video playback.** On load, call `play()` on both videos (muted, looped, inline). The still underneath stays visible until each video has frames, so nothing ever flashes empty. Both loops are exactly 5.04 s and start and end on their still. Hair, leaves and sparkles move only in these videos. Nothing in the scene is animated with CSS or SVG.

**Entrance (one Web Animations timeline, runs once).** While loading, the hero has the class `js-pending`, which sets opacity 0 on the plate, portrait, name spans, copy, nav children and badge items. Start the timeline when the plate image, the portrait still and `document.fonts.ready` have all resolved, with a failsafe `setTimeout` at 3500 ms. Remove `js-pending`, then animate with easing `cubic-bezier(.2,.7,.15,1)` and `fill:'backwards'`:

| Element | From → to | Delay (ms) | Duration (ms) |
|---|---|---|---|
| Plate (still + video) | opacity 0, scale(1.06) → 1, scale(1) | 0 | 1600 |
| Name line 1 | opacity 0, blur(14px), its own translateX + translateY(40px) → opacity 1, blur 0, its translateX | 250 | 1400 |
| Name line 2 | same | 410 | 1400 |
| Portrait | opacity 0, translateY(60px) → 1, none | 520 | 1500 |
| Nav children (logo, links, right group) | opacity 0, translateY(−12px) → 1, none | 700, 790, 880 | 900 |
| Copy c1, c2, c3, c4 (in DOM order; on phones the single .mcopy block) | opacity 0, translateY(14px), clip-path inset(0 0 100% 0) → 1, none, inset(0 0 0% 0) | 1000 + i × 120 | 1000 |
| Badge items 1–5 | opacity 0, translateY(10px) → 1, none | 1300 + i × 80 | 800 |

**Reduced motion.** With `prefers-reduced-motion: reduce`, all CSS transitions and animations are disabled, the entrance timeline is skipped (content appears at once), both videos are paused, the scene video is hidden and the keyed portrait still is redrawn. The page listens for changes to the setting and switches live.

## 8. Phone layout (max-width 820px)

- `body` scrolls (`overflow:auto`). `--n` becomes 100vw/390.
- `.hero` becomes a flex column, height auto, min-height 100svh.
- Nav: static, height 64·n, padding 0 18·n. Wordmark 30·n. Links and CHAT are hidden; the pill is 34·n high with 12·n text.
- A separate `.mcopy` block (hidden on desktop) appears under the nav: padding 6·n 18·n 0, Plex Mono 11.2·n, line-height 1.45, uppercase. Rows: (1) "I design calm, honest / digital interfaces — / shaped like architecture, / warm like baked clay." on the left and "Based / in Lisbon, / remote" on the right (`space-between`, gap 14·n). (2) "No noise. No fluff. Just / craft. Every detail earns / its own place." (3) "Independent designer for / studios that value / clarity, craft, and the / long-lasting simplicity." There are 12·n gaps between rows. The desktop `.copy` blocks are hidden.
- `.stage` is relative, `flex:1`, min-height 560·n, `overflow:hidden`. It holds a cropped view of the same scene: both `.cover` and `.frame` use `--u = 100vw/700`, left −370·u, bottom −20·u, no transform. This shows frame x 370–1070, with the name and portrait centred.
- The fade is 110·n tall.
- Badges: absolute, bottom 12·n, wrap and centre, row-gap 7·n, column-gap 16·n, padding 0 18·n, 10·n text, 12·n icons, gap 6·n, no dot separators.

## 9. Acceptance checklist

- At 1440 × 900 the page matches the measurements above within 2 px. The glowing name sits behind the portrait, and the portrait's hair overlaps the letters with clean keyed edges and no green fringe.
- Both videos play and loop seamlessly. Hair visibly whips in the wind and the agave sways hard; nothing else in the scene moves.
- On a wide, short window (e.g. 1536 × 776) the name never touches the nav, the copy blocks stay fully visible, and the scene still covers edge to edge.
- At 390 × 844 the copy sits above the scene, with no horizontal scroll and no overlaps.
- Reduced motion shows the stills with no animation.
- No external requests other than the four media URLs above and the four font files (or none for fonts in the standalone build).