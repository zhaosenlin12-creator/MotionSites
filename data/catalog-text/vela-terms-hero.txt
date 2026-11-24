# Prompt: Vela "in your terms" hero

Build a single-file, one-screen hero for a fictional privacy app, **vela**: a secure messaging app, crypto wallet and Web3 browser. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is soft and warm: a grainy pastel gradient panel and a huge tight grotesk headline. The first word cycles through four verbs, each with its own glossy 3D icon, and the panel's colour changes with every word. A cream stats strip with a curved notch sits underneath.

## Media

Four glossy 3D icons, each a 320×320 webp with transparency, in a soft inflated candy material. The files are orange, but the page shows each icon in its own word's hue (see **Icon tint** below).

| Word | Icon | File |
|---|---|---|
| Message | rounded chat bubble with three embossed dots | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/83de7c35-dd91-4e56-bfb8-0ffafc83d0e0.webp` |
| Browse | four-pointed sparkle star with two small orbiting spheres | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d952211-0474-48cc-af48-58f68b3b7525.webp` |
| Transact | two curved arrows cycling around a $ coin | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e2e91fca-5b3f-4e0e-a437-8a581592e407.webp` |
| Build web | a globe of rounded hexagon-like cells with meridian grooves | `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/6b32bb47-4ad6-4938-a637-c997b373c68b.webp` |

## Scale and type

- **Unit:** every size is in px of a 1440×960 frame, multiplied by `--u = min(100vw/1440, 100vh/960)`. The page fills the viewport.
- **Font:** **Inter Tight** (variable, self-hosted latin), 500 for the headline, numbers and lead, and 400/500 for UI.
- **Colours:**
  - ink `#0D0D0C`
  - secondary text at 56% ink, the scroll hint at 42%
  - strip and page cream `#FBF6EF`

## Layout (1440×960)

- **Hero panel:** the top 75% of the screen.
  - It's made of four stacked gradient layers, one per word. Each layer has a vertical base gradient, a large radial glow at about 86% / 76% (bottom right), and a softer radial glow at about 32% / 105% (bottom left).
    - **Message**, lemon cream: base `#F2ECDF` → `#F4EBC6`, glow `rgb(246,222,104)`.
    - **Browse**, peach and apricot: base `#F8DCC7` → `#F9CBA9`, glow `rgb(249,150,84)`.
    - **Transact**, warm sage mint: base `#E9EBE0` → `#DFE9D4`, glow `rgb(150,206,150)`.
    - **Build web**, rose lilac: base `#F0E4E6` → `#ECD6E2`, glow `rgb(222,150,200)`.
  - A fine SVG fractal-noise grain sits on top at 18% opacity with `mix-blend-mode: multiply`.
- **Nav:** 80u tall, with a hairline under it.
  - **Left:** a 13u black dot and "vela", 600 weight at 25u.
  - **Right:** "Products / Company / Docs", each with a small chevron (17u, 42u gaps), then an outlined "Join Vela" button (48u tall, 7u radius, 1.4px border). The button fills black on hover.
- **Headline:**
  - **Position:** left 112u, top 190u.
  - **Size:** 172u on a 0.86 line height, tracking −0.032em.
  - **Line 1:** the cycling slot, an icon at 1em square followed by the word.
  - **Line 2:** "in your terms", which never changes.
- **Row:** at top 578u.
  - Two outlined store buttons, 58u tall: "App Store" with a fruit glyph and "Google Play" with a play-triangle glyph. Use neutral line icons, not official badges.
  - Beside them, a 2-line caption at 18.5u: "Vela is a secure messaging app, crypto wallet, and / Web3 browser built with state of the art technology."
- **Stats strip:** the bottom 25% of the screen, in cream.
  - **Notch:** its top edge rises over the right side in a smooth S-curve. The SVG path is `M0 62 H1062 C1092 62 1098 54 1116 34 C1138 9 1146 1 1178 1 H1440 V62 Z` in a 1440×62 box, stretched to the width.
  - **Scroll hint:** "↓ Scroll to learn more" at 15u sits on the raised part.
  - **Content:**
    - "Nothing great is / made alone" at 29u, 500 weight
    - three stats at 54u: **11.5M+** "Active accounts", **$0.0002** "Average cost per transaction", **80+** "Dapps integrations", with labels at 16.5u
    - a thin line-art sprout (two leaves on a stem, a little ground line) on the far right

## Icon tint (in code)

Each icon takes the hue of its word's panel, so the icon and background read as one colour family:

- **Wrapper:** each icon sits in a 1.02em square wrapper with `isolation: isolate`.
- **Base:** the `<img>` is turned grey with `filter: grayscale(1) brightness(1.1) contrast(1.08)`.
- **Tint layer:** a colour layer sits on top, `background: var(--tint)` with `mix-blend-mode: color`, clipped to the icon's own shape with `mask: url(<same icon>) center/contain no-repeat`. The grey icon's shading and speculars survive, and only the hue and saturation change.
- **Tints:** Message `#E9C22E` (yellow), Browse `#F2772F` (orange), Transact `#3FB874` (green), Build web `#C564C4` (rose violet).
- **Motion:** the transforms (bob, pop-in) go on the wrapper.

## Motion (one clock)

- **Clock:** everything reads one clock, a long Web Animation's `currentTime`, so a frame-by-frame recorder can seek it.
- **Slots:** each word has a 1.75 s slot, in the order Message → Browse → Transact → Build web, looping.
  - **Enter, over 0.5 s:** opacity 0→1, rising from +0.32em, blur 10px→0, scale 0.96→1, ease-out cubic. The icon follows 60 ms later, scaling 0.7→1 and untwisting from −14°.
  - **Leave, the last 0.42 s:** fade out while drifting up 0.16em and blurring to 8px, ease-in cubic.
- **Panel colour:** crossfades over a 0.77 s window that straddles each word change, so it passes through a soft muted mix as in the reference.
- **Idle motion:** the icon floats gently (±0.028em, ±3°). The gradient layers drift slowly (±2.2% / ±1.6% at scale 1.08), so nothing is ever frozen.
- **App Store:** while "Build web" holds, the App Store button fills to black with white text and then releases.
- **Live first word:** Message also fades in on load.
- **Reduced motion:** a still "Browse" state.
- **Hidden tab:** the clock pauses.

## Phones (≤ 760px)

- The panel flows in normal order.
- The headline is at `clamp(52px, 15.5vw, 88px)`.
- The store buttons wrap, and the caption sits under them.
- The strip's stats wrap into two columns with the sprout on the right.
- No sideways scroll.

## Acceptance check (1440×960)

- "Browse in your terms" sits on a warm peach panel with the glossy star tinted orange; each icon always matches its panel's hue.
- Every 1.75 s the word blurs up and out, and the next rises in with its own icon while the panel shifts to lemon, sage or rose.
- The App Store button flashes black during "Build web".
- **Content:** no real brands or logos.