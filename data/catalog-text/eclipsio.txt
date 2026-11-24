# Prompt: Eclipsio hero

Build a single-file, one-screen **landing hero for a personal-website builder** for a fictional product, **Eclipsio** ("Launch a Personal Brand That Outshines Every Résumé"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. It's pure black space with a total solar eclipse rising from the bottom edge: a dark sphere ringed by a blazing amber-orange corona, with solar flares curling off its rim and a few orange embers in the dark.

## Scene

- **Plate:** the eclipse is ONE 1448×1086 image: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b4b7e033-b082-4f09-8ec4-2fabca30c4b4.webp`.
  - **Composition:** the sphere fills the bottom of the frame, its rim apex about two thirds of the way down, and everything above it is black.
  - **Placement:** anchor it to the bottom of the screen at the reference height, centred, wider than the viewport if needed. It sits in its own clipped layer so it never causes sideways scroll.
- **Motion:** a 5s muted looping video of the same plate plays over it: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48106c12-33c9-4cea-9780-4a080477405e.mp4` (1280×720). The corona boils and a large flare erupts and arcs off the rim; the sphere stays still.
  - The video is the plate mirror-padded 241/1448 on each side to 16:9. Give it the same height as the plate, **aspect-ratio 1930/1086**, centred the same way, so it lines up exactly.
  - Fade it in once it is playing.
- **Rule:** nothing in the scene is drawn or animated in code.

## Scaling

- **Desktop:** the layout is authored in a **1448×1086** reference with `--u = min(100vw/1448, 100dvh/1086)`.
- **Stack:** nav 124.5u · hero copy · logo strip · eclipse zone that takes the remaining height. The page is exactly one screen tall.

## Type and colour

- **Fonts:** **Inter** (variable) for everything; **Poppins 600** for the partner-logo names.
- **Colours:** black `#000`, white headline, sub-copy `#bcbcbe`, accent orange `#ee7f20` (button gradient `#f28a2a → #ec7a1c`).

## Layout (reference units)

1. **Nav** (top 34u, 37.7u tall):
   - **Logo:** a white rounded "U-n" stroke mark and "Eclipsio" at 27.8u, left 68u.
   - **Links:** Work · Showcase · Members · Journal, 16.25u, weight 600, centred, 42.6u apart.
   - **Button:** a white "Start Creating" pill, right 62u.
2. **Badge:** a dark warm-glass pill, 43.9u tall.
   - **Text:** a glowing peach dot `#f7c69b`, then "Shine Your Name Brighter Tonight" in 15.6u grey.
   - **Edge:** an orange rim lit from the lower-left, with a soft inner glow and a hairline sheen along the top.
3. **Headline:** two lines at 78.8u / 81u line-height, weight 750: **"Launch a Personal Brand That / Outshines Every Résumé"**.
4. **Subline:** 22.6u / 36u, tracking .031em: "Whether you're a designer, developer, or creator, Eclipsio will help / you glow brighter with a site that feels polished, and you."
5. **Buttons** (55.4u tall, 14u apart):
   - **"Start Creating":** a filled orange pill with a hairline white border.
   - **"View Samples":** black, with a gradient border running grey → burnt orange.
6. **Logo strip:** a frosted-glass pill, 892×56u.
   - **Glass:** a faint white gradient fill, a 1px warm border `rgba(255,190,140,.16)`, a 14px backdrop blur, and edges fading to black.
   - **Marquee:** an infinite 46s marquee of grey partner logos (Layers, Circooles, Quotient, Hourglass, Catalog), each a 34u grey icon plus its name. It pauses on hover.

## Motion (UI)

- **Entrance:** a one-time CSS sequence. The logo and nav fade in, the badge settles, each headline line rises, then the subline, the two buttons (staggered) and the logo strip.
- **Hover:** the orange button gains an orange glow, and the outline button brightens.
- **Reduced motion:** no entrance, no marquee, no video.

## Phones

- **Nav:** the links collapse into a round menu button with a dropdown.
- **Copy:** the headline wraps to four lines, and the buttons sit side by side at full width.
- **Logo strip:** becomes a plain full-width soft-edged marquee (no pill).
- **Eclipse:** fills the bottom.

## Acceptance check (1440×900)

- The black hero matches the layout above, with the orange-rimmed badge and the orange "Start Creating" button.
- The frosted logo strip scrolls, and the eclipse below it flares and boils in motion.
- **Content:** no real brand names.