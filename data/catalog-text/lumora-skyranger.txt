# Prompt: Lumora "Cadet Skyranger" interactive 3D hero

Build a single-file, one-screen **interactive character hero** for a fictional 3D studio, **Lumora**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a cinematic space poster: a glossy Pixar-quality 3D cartoon boy cadet in a chunky white, orange and teal space suit rises from the bottom of the screen in front of a glowing orange planet horizon in deep navy space. A huge glowing italic headline floats above him.

The star of the page is the interaction:
- **Head follows the cursor:** his head and eyes turn to follow the mouse, left to right.
- **Helmet:** clicking the red **PUSH ME** button on his chest closes a glass bubble helmet over his head.
- **Cursor:** a ring cursor with a dot replaces the pointer.

## Media

- **Plate:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a194141a-44ba-44bb-8372-e6720af994ca.jpg` (1920×1080). The cadet looks straight ahead: messy auburn hair, freckles, big hazel eyes, a white suit with orange shoulders and a teal chest panel, and a collar ring around his neck. Behind him is a curved orange-gold planet horizon under deep navy space.
- **Head-turn clip:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e1b48476-24ab-456a-bb12-13e63bc60973.mp4` (580×600, 5.04s, 24fps, muted, a keyframe every 4 frames for fast seeking).
  - It's a crop of the same scene around his head: frame 0 looks toward the left of the screen, the last frame toward the right, and his head turns at an even speed in between.
  - It is **never played**: the cursor scrubs it.
- **Helmet:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e8c78660-4497-41b9-82ae-a4738a5edd11.jpg` (960×958). A clear glass bubble dome with white and soft-blue reflections on pure black, blended with `mix-blend-mode: screen` so only the glass shows.
- **Rule:** nothing in the scene is drawn in code. The head moves only through the clip, and the helmet is the image.

## Frame and scaling

- **Frame:** one **1440×810 (16:9) frame** that covers the viewport: `--u = max(100vw/1440, 100vh/810)`, centred with `left: calc(50% - 720u)` and `top: calc(50% - 405u)`. Don't use a transform, so fixed-position elements still pin to the screen on phones.
- **Placement:** every element below is in frame units. The plate fills the frame.

## Type and colour

- **Headline:** **Archivo** Black Italic (variable, wdth 94%, weight 900), 100u, tracking −.02em, white, with a three-layer glow: white 14u, pale blue 34u, blue 70u.
- **Sans:** **Urbanist** 600/700 for everything else.
- **Colours:** text white; muted text `#CDD2E6`; page `#02040D`.

## Layout (1440×810 frame)

- **Logo:** a 35u round gradient disc (cyan → blue → violet → pink, conic) and "Lumora" (Urbanist 600, 29.5u), at (55, 54).
- **Menu:** three 25u white bars at the top right, at (1358, 55).
- **Copy block**, centred, top 122:
  - eyebrow "CADET", Urbanist 700, 18u, tracking .46em, muted
  - headline "SKYRANGER" (cap box about 402–1042 × 166–236)
  - subtitle "Past the Stars and Further", Urbanist 600, 23u, muted, 9u below
- **Captions:** "3D Interaction" bottom-left at (55, 745) and "@studio.design" bottom-right, Urbanist 700, 12.2u.
- **Head clip:** placed at (510, 255), 435×450, `object-fit: fill`. It has a soft radial mask (`ellipse 50% 50% at 50% 46%`, solid to 72%, clear at 99%) so its edges melt into the plate.
  - It starts hidden and fades in (0.6s) on its first seek.
- **Helmet:** 360×360 at (533, 288), hidden at first. A bottom mask (solid to 76%, clear at 92%) tucks it behind the collar ring.
- **PUSH ME button:** a real `<button>` laid exactly over the printed one on his chest. It's a 75u circle at (675, 720) with a glossy red radial gradient, a dark 4u ring plus a faint white outer ring, and "PUSH / ME" in Urbanist 700 at 16.5u.

## Interaction

- **Loading the clip:** fetch the whole clip as a blob and use an object URL as its source, so every seek is instant. Streamed seeks wait on the network and lag. Fall back to the URL if the fetch fails.
- **Head follow:**
  - Map the pointer's x across the frame (14% to 86%) to the clip time 0 → end.
  - Each animation frame, ease the shown time toward the target (×0.14) and set `currentTime` whenever it's not already seeking.
  - After 3.5s without movement, the gaze drifts slowly side to side on its own (a sine around the middle, ±32% of the clip).
- **Cursor:**
  - On fine pointers, hide the system cursor over the stage.
  - A 7px white dot sits exactly on the pointer, and a 44px ring (1.5px white border) eases after it (×0.55 per frame).
- **Helmet:**
  - Clicking PUSH ME presses it (scale .88 and back, 320ms) and toggles the dome.
  - The dome drops from −70u above with a slight overshoot and fades in over 720ms; it reverses to remove it.
  - While on, the button glows red and has `aria-pressed="true"`.
- **Entrance:** one Web Animations timeline, about 1.8s.
  - The logo and menu drop in, then the eyebrow's tracking tightens from .9em.
  - The headline rises out of a 14px blur, then the subtitle and captions follow.
  - The button pops in last.
- **Reduced motion:** no entrance and no head clip; the plate stays.

## Phones (≤ 820px)

- **Background:** the frame still covers the screen, so the cadet fills the lower part.
- **Header:** the logo and menu are pinned to the top corners.
- **Copy:** centred near the top: a 40–64px headline, 14px eyebrow and 16px subtitle.
- **Captions:** pinned to the bottom corners.

## Acceptance check (1440×810)

- The cadet sits centred in front of the glowing orange horizon, with the glowing "SKYRANGER" headline above him.
- Moving the mouse from the far left to the far right turns his head and eyes smoothly from left to right, with no seam around the head.
- Clicking PUSH ME drops a clear glass helmet over his head, and clicking again lifts it off.
- **Content:** no real brands, logos or existing characters.