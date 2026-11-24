# Prompt: Strata AI hero

Build a single-file, dark, premium **AI-infrastructure landing hero** for a fictional company, **Strata AI** ("trustworthy AI, built up layer by layer"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. One screen tall.

## Look and feel

- **Overall:** near-black and calm, with a faint square grid in the background, white type, violet and teal accents, and soft glass surfaces.
- **Colours:**
  - background `#0d0c11`
  - ink `#ffffff`
  - nav grey `#b9b8bb`
  - muted text `#d3d3d7`
  - wordmark grey `#bdbdc1`
  - "AI" superscript `#9ff0ec`
  - card kicker teal `#bdf7ee`
  - logo-row grey `#bcbcbf`
  - primary violet gradient `#4d19b1 → #6f5adc`
- **Glass surfaces:** `rgba(255,255,255,.02)` fill, a `rgba(255,255,255,.16)` hairline, and `backdrop-filter: blur(8px) brightness(1.15) saturate(.8)`, with a faint inner white glow.
- **Type:**
  - **DM Sans** (variable, weight ~380) for the headline, stats numbers and logo-row words
  - **Inter** (variable, ~300–560) for everything else
  - Self-host both, latin subset.

## Layout (desktop, landscape)

The whole hero is drawn on a **2048×1455 design canvas** scaled by one unit, `--u = viewport height / 1455` (minimum 0.468px). The canvas is centred, the screen is always filled top to bottom, and any spare width is just background.

1. **Header** (148u tall):
   - **Left:** a 70×69u violet gradient tile with a bold white **S** and a soft violet glow, then the light-grey wordmark **"Strata"** with a small teal **"AI"** superscript sitting above its last letters.
   - **Centre:** six nav links, about 48u apart: **Platform · Model Scores · Industries · Defense AI · Use cases · Changelog**.
   - **Right:** **"Log in"**, then an outlined glass pill, **"Meet Strata"** (202×63u).
2. **Left column** (x = 150u):
   - **Headline:** three lines at 104u / 122u line-height: **"Grounded models / made of data / you trust."** Each line stays on one line and fades from white to soft grey at the right.
   - **Subline:** at 29.5u in light grey: "Strata layers verified data, evaluations, and audits for model teams, public agencies, and enterprise operations."
   - **Buttons:** two 85u-tall pills, a violet-gradient **"Meet Strata"** and a dark glass **"Try Free"**.
   - **Stats row:** **2.1B** labels · **400+** evals · **99.9%** uptime. The numbers are DM Sans 50u and the labels are 25u grey, separated by thin vertical hairlines.
3. **Right half:** a large square artwork (about 1120u, centred near x = 1550u). It shows four floating translucent **glass data slabs** at an isometric angle, glowing teal → violet:
   - a grid of data points
   - flowing light waves
   - pixel blocks
   - a violet haze
   Its edges fade into the background with a radial mask, so there's no visible box.
4. **Two glass cards** (451×201u, radius 18u) overlap the artwork. Each has a 63u icon tile, a teal kicker and a two-line white title:
   - **Upper-left of the slabs:** kicker **"Benchmarking"**, title "STRATA Index: Peer-Scored, / Private Model Evaluations.", with a teal network-graph icon.
   - **Lower-right:** kicker **"Red-team"**, title "BASTION: Adversarial Test / for Critical Systems.", with a teal fortress-and-padlock icon.
5. **Logo row** at the bottom, centred and grey: **Arbor** (bold italic) · **Nova** (bold italic) · **lumina** (regular, wide tracking) · **HALCYONIX** (bold italic caps).

## Motion

- **Artwork:** loops. The slabs bob and drift slightly, data particles flow across the top slab, the waves ripple and the pixel blocks flicker.
- **Entrance:** one Web Animations timeline runs once on load, then the page is static.
  - the header items rise and fade in, left to right
  - each headline line rises out of its own clip mask, 0.12s apart
  - the subline settles, then the buttons (the primary with a 1.5% scale settle)
  - the stats rise in one by one, then the two glass cards lift in
  - the logo row fades in, left to right
- **Reduced motion:** no entrance, no loop; the still shows instead.

## Smaller screens

The same content reflows into one centred column: logo with a round menu button that opens a glass dropdown panel, the headline, subline, buttons, stats, then the artwork with the two cards staggered over it, then the logo row. Use a fluid unit `--f = clamp(.55px, .449px + .0284vw, .76px)` and 16–40px side margins.

## Media (use these URLs)

- **Artwork loop:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/435a4fe7-e43b-4e7c-af78-0be083e73569.mp4` (960×960, 5s, H.264, muted, loops; first frame = last frame). Show it inside the masked artwork box.
- **Artwork still** (poster and fallback): `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/782a4a52-4c1e-4471-bb0c-aa232927f4a6.webp` (1200×1200 WebP).

## Acceptance check (1440×900)

- **Left:** the three-line headline sits top-left, with its first line ending just before the "Benchmarking" card. The subline, buttons and stats follow, with even spacing.
- **Right:** the glowing slab stack fills the right half and moves, with the two cards overlapping it.
- **Bottom:** four fictional logos sit centred along the bottom edge.
- **Content:** no real company or product names appear anywhere.