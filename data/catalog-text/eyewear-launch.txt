# KYNE AERO.VISION — cinematic 4-scene product page for liquid-chrome sport sunglasses

Build a single-file, fully responsive, **scene-based** product launch page for invented sunglasses, **"KYNE AERO.VISION"**. It is pure black with acid-lime (#c6ff3d) accents, iridescent chrome, and three looping Kling 4 videos.

The page is one 100vh screen with **four scenes**:
1. **Hero:** keyed spinning glasses on a neon-rimmed plinth, in front of a giant scrolling 3D wordmark.
2. **Detail:** a close-up with hotspots.
3. **Quick facts:** an iridescent soap-bubble blob that morphs from a sphere into three fused bubbles holding icons, above a "QUICK FACTS" marquee.
4. **Outro:** a glowing 3D lime logo spinning edge-on with glitch streaks, then "SEE IT BEFORE IT HAPPENS." and Pre-order.

**One scroll gesture = one complete timed transition**; input is locked until it finishes. The header and footer stay in place throughout. Match every detail below.

---

## 1. Global

- **Fonts** (Google Fonts):
  - **Unbounded** 700–900 for display text (headlines get `skewX(-8deg)`);
  - **Inter Tight** 400–600 for UI;
  - **JetBrains Mono** 400–500 for all small caps and labels.
- **Tokens:**
  - `--lime: #c6ff3d`
  - `--txt: #f1f3ee`
  - `--mute: rgba(241,243,238,.55)`
  - `--line: rgba(241,243,238,.22)`
  - `--hue: 0deg` (the lens colour system, see 7)
- **Easings:**
  - `--out: cubic-bezier(.16,1,.3,1)`
  - `--ease: cubic-bezier(.77,0,.18,1)`
  - `--spring: cubic-bezier(.34,1.56,.64,1)`
- **Stage:**
  - `html, body { overflow: hidden }`; a fixed 100vh stage, background `#000`;
  - a faint lime radial glow at 50% 60%;
  - an SVG fractal-noise grain overlay at opacity .18.
- **Blending:** all rendered images and videos have black backgrounds and sit on the stage with **`mix-blend-mode: screen`**. Put the blend on the positioned wrapper, not the img inside it, so black never covers what is behind.

## 2. Assets (exactly these URLs)

- **Turntable video** (glasses on a flat magenta #FF00FF screen, one full 360° turn, a seamless 10 s loop). **Chroma-keyed in WebGL:**
  `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261118_015024_006266ee-7f2e-429b-9805-fe43b2d834fe.mp4`
- **Keyed poster** (same magenta still; key it until the video plays):
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_014952_332a14ea-9b7d-4045-9036-9368eaf90eac.png&w=1920&q=85`
- **Plinth** (glossy black podium, neon lime and cyan rims, mirror top), on black:
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_020140_5b58d755-d5de-46b6-b66e-ab16bb461339.png&w=1920&q=85`
- **Wordmark strip** ("KYNE AERO.VISION" in chrome-lavender 3D experimental type), on black:
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_020004_0521c50e-09ca-4e84-8d93-013a72b5adfc.png&w=2400&q=85`
- **Marquee strip** ("QUICK FACTS . QUICK FACTS ." — solid and outline white):
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_020003_c9e68f16-e6f2-43e8-9459-ba5d9291348d.png&w=2400&q=85`
- **Detail close-up** (glasses three-quarter view, lime rim light), on black:
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_014903_73b0f091-ad2d-4039-8a7a-03a8397b45d0.png&w=1600&q=85`
- **Bubble morph video** (5 s, iridescent soap-bubble sphere → oval → three fused bubbles):
  `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261118_020140_80f218f8-3ea6-4407-b343-db2278462d30.mp4`
- **3D logo video** (lime glass "two slanted blades" mark: full spin edge-on with glitch streaks, back to front; 5 s loop):
  `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261118_020140_b48373e7-a263-431a-b3ef-da6b564f4e03.mp4`

## 3. Header and footer (persistent)

**Header:**
- Absolute top, side insets 2.2vw, height `clamp(54px, 8.6vh, 80px)`, 1 px `--line` bottom border.
- **Brand:** an inline SVG mark of two forward-leaning blades (the left one white with a notch, the right one lime), followed by "KYNE AERO.VISION" (Inter Tight 500).
- "N.1 • WELCOME TO THE FUTURE" in mono.
- **Nav:** mono `.shop .about .collection .info`, with lime underlines that wipe in on hover.
- "[PRG]" over a live HH:MM clock.
- A ring dot with a lime ping.
- **PRE-ORDER pill:** 1 px outline with a round white arrow chip. On hover it fills lime and the arrow rotates −45°.

**Footer** (bottom, mono 9–12 px):
- a star glyph and the date;
- a "+" glyph;
- **4 scene dashes** (the active one is a 30 px lime dash; each is clickable) and "©2026 KYNE AERO.VISION";
- a "+" glyph;
- a corner-bracket icon and the coordinates "50°05′36.2″N 14°26′51.5″E".

**Top corners:**
- Left: a large Inter Tight 500 line with a mono caption beneath. Right: the same, right-aligned.
- They change per scene, sliding out and in through masks (`.ln` overflow masks with .22em bottom padding so descenders never clip; cancel running animations before each swap).

  | Scene | Left | Right |
  |---|---|---|
  | 1 | "bangers only / IT'S ALWAYS TIME TO ENJOY." | "inspired / FROM 10:00 TO 19:00" |
  | 2 | "detail.{01} / LOOK CLOSER. HOVER THE POINTS." | "built light / 24 GRAMS OF CHROME" |
  | 3 | "quick facts / THE NUMBERS THAT MATTER." | "tested / 2,400 KM OF RIDES" |
  | 4 | "ready? / DROP 01 · 500 PAIRS WORLDWIDE." | "ships / JUNE 2026 FREE RETURNS" |

## 4. Scene controller

- **Internals:** a single progress value `PV` (0 to 1) drives all choreography. The scene anchors are **[0, .45, .79, 1]**.
- **Input that moves one scene:**
  - wheel (accumulated delta > 40, with `preventDefault`);
  - ArrowDown, PageDown, Space and ArrowUp, PageUp;
  - touch swipes over 40 px;
  - clicking a footer dash or "SCROLL · NEXT".
- **Each move** tweens PV to the next anchor over 1.7 s with ease-in-out-cubic (2.2 s for jumps of more than one scene).
- **Locking:**
  - input is locked until the tween ends, plus 150 ms;
  - **entering Quick facts extends the lock by 5.4 s**, so the bubble morph and the three icons always finish before you can leave.

## 5. Scene 1 — Hero

**Wordmark marquee:**
- At top 25vh: four copies of the wordmark strip side by side.
- Each img is `min(84vh, 46vw)` tall with negative top and bottom margins (−31% and −38% of that height) to crop the empty space, plus a vertical mask that feathers the crop edges.
- It scrolls left continuously, faster while scenes change.
- It shifts slightly with the mouse.

**Plinth:**
- The plinth image is 100vw wide (16:9), placed so its glossy top edge lands at about 74vh (`top: calc(74vh - 31vw)`), with a screen blend.

**Glasses:**
- A WebGL canvas, 86vw wide at the video's aspect ratio, centred at `top: calc(74vh - 9vw)`, so the glasses sit on the plinth in front of the wordmark.
- **Magenta key** shader:
  ```glsl
  float d = min(c.r, c.b) - c.g;
  float a = 1. - smoothstep(.10, .36, d);
  float sp = max(0., min(c.r, c.b) - c.g); c.r -= sp*.92; c.b -= sp*.92;   // de-spill
  ```
  plus a 3% edge feather and premultiplied output.
- **Why magenta, not green:** green would eat the lime lens.
- **Motion and interaction:**
  - the glasses lean toward the mouse (`translate(sx·−26px, sy·−16px) rotate(sx·2deg)`), with a soft drop shadow;
  - hovering the product eases the video `playbackRate` to 2.6×, and the caption "● HOVER TO SPIN · SCROLL TO EXPLORE" becomes "SPINNING · 2.6×".
- **Intro:**
  1. the header drops in and the footer rises;
  2. the wordmark opens from its centre line;
  3. the plinth rises 40vh;
  4. the glasses fall in from `translateY(-30vh) scale(.6) rotate(-14deg) blur(20px)`;
  5. the corner lines rise.

## 6. Scene 2 — Detail

- **Leaving the hero:** the wordmark lifts and clips away, the plinth sinks 55vh, and the glasses slide right, grow, and clip out from the right.
- **Detail image:** 72vw, on the right, with a screen blend and a radial mask. It wipes in from the right with `clip-path`, and wipes out on exit.
- **Copy** (left, top 30vh):
  - a striped lime-gradient swatch;
  - `lens.{acid}` (Inter Tight 500; the braces content is lime);
  - two mono uppercase paragraphs.
  - Each line rises through its mask in a stagger.
- **Bottom meta:** two mono notes.
- **Three hotspots** (30 px circles with "+" and a lime ping ring) pop in. Hovering or clicking one opens a frosted card (lime mono title and body) that unrolls downward with `clip-path`:
  - PHOTOCHROMIC LENS
  - LIQUID-CHROME FRAME
  - GRIP TEMPLES

## 7. Lens colour system

- A **LENS** picker at the bottom right has four orbs: Acid 0°, Ice 95°, Ember −62°, Ultra 175°.
- Choosing one sets `--hue`. It is applied as `hue-rotate(var(--hue))` to:
  - the glasses canvas;
  - the plinth;
  - the detail image and swatch;
  - the lens name;
  - the logo video;
  - the blob (at half strength).
- The product does a springy pop and a toast confirms the change.
- The Pre-order panel has the same lens options.

## 8. Scene 3 — Quick facts

- **Bubble:** the blob video, `min(96vw, 1700px)` at top 41%, with a screen blend.
- **Playback:** it **plays from 0 when the scene is entered** and holds its last frame. The morph is a sphere that swells, stretches into an oval, then pinches into three fused bubbles.
- **Icons:** three white icons with an RGB split (`drop-shadow(-3px 0 red) drop-shadow(3px 0 cyan)`) sit at **27%, 50% and 73%** of the video width, at 48% height. They pop in with scale and a −40° rotation **as each lobe forms** (video time ≥ 3.7 s, staggered by .15 s), and glitch-skew on hover:
  - a six-petal flower;
  - a faceted crystal drop;
  - three wave lines.
- **Labels** under the lobes (mono key with an Unbounded value): "WEIGHT .24g", "LENS .photochromic" (lower), "FIT .wrap".
- **Marquee:** the "QUICK FACTS" strip at 76%, cropped and masked the same way as the wordmark, scrolling continuously.
- **Exit:** the bubble closes to a horizontal slit and the marquee clips away.

## 9. Scene 4 — Outro

- **On entry:** **12 black vertical slice bars** cover the screen and collapse (`scaleY` 1 → 0, staggered from the centre). This restarts cleanly on every entry.
- **Logo:** the 3D logo video plays and loops, `min(92vw, 1500px)` wide with a screen blend.
- **Text:** "SEE IT BEFORE IT HAPPENS." (Unbounded 800, skewed) and a "PRE-ORDER · $289" pill rise in.

## 10. Pre-order panel and toast

- **Panel:** any PRE-ORDER button opens a full-screen blurred overlay with a **circular `clip-path` reveal from the click point**. It holds a card:
  - "AERO.VISION";
  - LENS chips: Acid, Ice, Ember, Ultra;
  - FIT chips: Narrow, Regular, Wide (lime when active);
  - "$289" and a lime "Reserve pair →" button, which closes the panel and shows a toast.
- **Toast:** a lime pill at the bottom centre.
- **Cursor:** a custom 12 px lime ring that becomes a 44 px tinted circle on hover. `?rec` mode uses a 52 px recording cursor, and all three videos are stepped by the page clock.

## 11. Responsive (≤760 px)

- Hide the nav, clock, dot and welcome text, and the corner captions.
- Glasses 150vw, plinth 170vw (re-centred), blob 150vw.
- The detail image moves below the copy.
- The footer keeps the date, scene dashes and coordinates.
- Swipes navigate between scenes.

## 12. Do not

- No real brands or logos, and no swoosh.
- No opacity crossfades on the video loops.
- Do not use the green screen for this product.
- No scroll-scrubbed partial states: every scene change is a complete, locked, timed transition.