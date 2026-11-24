# Prompt: Halora — smart ring hero, Sage Studio

Build a single-file, one-screen **landing hero for a wellness smart ring**, **Halora**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a calm, sunlit editorial product photo: a real hand rises from the bottom edge against a pale sage wall, a rose-gold ring with a black inner band floats between its fingers, olive-leaf shadows fall across the right side, and a thin clear glass circle arcs behind the hand. Copy sits on the left and three frosted glass metric cards stand on the right.

## Scale

- **Units:** every stage measurement is a reference pixel of a 2048×1152 artboard, multiplied by `--s = min(100vw/2048, 100vh/1152)`, with a floor of 0.55px on desktop.
- **Photo:** fitted to the viewport height and anchored to the bottom, so the arm always leaves the frame at the bottom edge. Up to about 2:1 it behaves like cover; on ultra-wide screens it stops growing and its sides fade into the sage backdrop.
- **Fill:** the hero always fills the viewport, with no letterbox bands.

## Type and colour

- **Fonts:** a neo-grotesk for the UI and copy, and a light geometric display face (300/400/500) for the metric numbers.
- **Colours:**
  - Page `#CBCFB8`, matching the photo's wall.
  - Ink: deep forest `#1E3227` for the logo, nav and headline; `#3F5447` for the eyebrow and paragraph.
  - Accent: olive gold `#9B8A3E` for GOOD and KCAL.
  - Buttons: solid `#1E3227`; the Cart pill is a translucent moss `rgba(62,86,70,.52)` with backdrop blur.

## Header

- **Left:** a six-petal dashed circle logo and "Halora" at 35s.
- **Centre:** links at 22s: Technology, Health, Activity, Insights.
- **Right:** a "Cart" pill with a cart icon, then a dark "Shop the Ring" pill.

## Copy (left, vertically centred)

- **Eyebrow:** a small dot and "Tracking 24/7".
- **Headline:** two lines at 69s, "Know Your Body." / "Move With It."
- **Paragraph:** "Sleep, recovery, stress, heart rate and activity — tracked continuously and turned into insights you can actually use."
- **CTA:** a dark pill, "Explore the Ring".

## Metrics (right, vertically centred)

Three 222×160s glass cards: 20s radius, a pale sage translucent fill, a hairline forest border and backdrop blur. Each has an uppercase tracked label with a line icon, a large light numeral and an uppercase sub-label:

- SLEEP: 7h 42m / GOOD
- CALORIES: 1642 / KCAL
- HRV: 68 / MS

## Motion

- **Entrance:** one Web Animations timeline with backwards fill. It starts only once fonts and the photo are ready, then cancels itself so the page returns to its authored styles.
  - The header items drop in from the top, staggered.
  - The tracking dot switches on with a circular clip, and its label follows.
  - Each headline line rises inside its own mask.
  - The paragraph and the CTA settle in.
  - The glass cards rise one after another.
- **Background video:** a muted, looping video of the same shot sits over the photo with the identical box, anchoring and masks: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e6d15706-f42b-400d-beda-75840834e8bc.mp4` (1920×1084, 4s). Leaf shadows sway across the wall and hand, light glints on the ring as it turns slightly, and the camera drifts gently.
  - The loop crossfades its last second into its first, so it never jumps or plays in reverse.
  - It fades in (0.8s) once its first frame is ready.
- **Rule:** nothing in the scene is drawn or animated in code.
- **Reduced motion:** no entrance, no transitions and no background video.

## Tablet and phone

- **Landscape below 1200px:** a fluid three-zone grid (copy | hand | cards), with the hand centred in the middle zone.
- **Portrait:** copy first, then the three cards in a row, then the hand filling the remaining height.
- **Below 820px:** the links and pills fold into a frosted sage menu panel behind a round burger button.

## Acceptance check (1440×960)

- The hand and the rose-gold ring sit in the centre on a sage wall, with leaf shadows on the right.
- The copy is legible on the left and the three glass cards stand on the right.
- Every element has an even edge margin, and no drop shadows have been added.
