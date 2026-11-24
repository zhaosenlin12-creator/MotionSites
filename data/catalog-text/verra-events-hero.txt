# Prompt: Verra Events hero

Build a single-file **community-platform hero** for a fictional creator platform, **Verra**, in plain HTML, CSS and vanilla JS with no framework, no build step and no media files. A black page holds a rounded dark frame. Inside it, a huge glowing vortex ring of fine red, pink and orange fins is drawn live on a canvas, cropped by the top of the frame. Below it sit a giant gradient word with a typing caret, a two-line subline and a white button. The ring turns slowly and the word types itself through a short list.

## Frame and scale

- **Page:** `#000`. The frame is inset 5vw left and right and 7.2vh top and bottom, with radius 14u, a 1px border at white 9%, and overflow hidden.
- **Unit:** `u = min(frameWidth / 1052, frameHeight / 754)`, written to `--u`. On phones (under 768px) `u = frameWidth / 600` and the frame is inset 10px.
- **Font:** Inter (variable, 400 to 600), self-hosted latin woff2.

## Nav (24u from the top, 26u and 24u side insets)

- **Left:** a small two-chevron logo (an outlined diamond over an open V, 1.7px white stroke) and "Verra" at 17.5u, weight 500.
- **Right:**
  - a frosted pill (29u tall, radius 8u, background `rgba(150,150,150,.38)`, 14px blur) holding "Explore", "Circles" and "People" at 14u;
  - a 4u gap;
  - a white "Connect" button (29u, radius 8u, dark text, weight 500) that lifts 1px on hover.
- **Phones:** the pill hides.

## The ring (canvas, redrawn every frame)

- **Geometry:**
  - centre (frameWidth/2 + 34u, −212u), so it sits above the frame and only the lower arc shows;
  - inner radius 435u, outer radius 652u;
  - vertical scale 1.03 (plus up to ±3.5% from pointer tilt).
- **Strands:** 196 of them, each sampled at 41 points from the inner rim to the outer rim, with q = 0 → 1 and r = ri + (ro − ri)·q.
  - **Angle:** θ = uᵢ + k·(1 − q)^4.2 + 0.05·k·q² + 0.02·sin(πq)·sin(3uᵢ + 0.4t), where uᵢ = 2πi/196 + spin.
  - **Result:** each strand curls tangentially along the inner rim and then runs almost radially to the outer rim, like a turbine fin.
  - **Motion:** spin = 0.06·t rad/s (a seamless rotation), and k = 0.42·(1 + 0.12·sin 0.55t) gently breathes the curl.
- **Fins:**
  - Each strand is a filled ribbon around its centreline. Its half-width is (0.15 + 3.3·s·(1 − 0.25q))·u, where s is a smoothstep of q over 0 to 0.28, so it tapers to nothing at the inner rim.
  - Draw them in angular order starting at the top of the ring (which is off-screen), so the overlap never shows a seam. Each body is opaque (`source-over`), then its leading edge, offset by the half-width, is stroked 1.45u wide in `lighter` mode. The next body covers part of that edge, which gives the layered-fin depth.
- **Colour (radial gradients from ri to ro, so colour follows radius):**
  - body: `#b01e50` → `#9c1236` (12%) → `#860c18` (40%) → `#9c1a0a` (70%) → `#c63c0e` (90%) → `#e85a18`.
  - edge: pink `rgba(255,130,185,.85)` → `rgba(255,84,138,.95)` (8%) → `rgba(255,56,80,.95)` (28%) → `rgba(255,58,44,.95)` (55%) → `rgba(255,92,36)` (80%) → `rgba(255,122,44)` (94%) → `rgba(255,150,70)`.
- **Light:**
  - a deep-red ambient fill in the annulus (`rgba(170,14,50,.35)` → `rgba(120,8,14,.45)` → `rgba(170,40,6,.4)`);
  - an orange halo from ro − 16u to ro + 70u (peak 0.42);
  - a faint pink inner halo (0.09);
  - a thin orange outer-rim line (1.6u).
- **Bloom:** draw every edge again on an offscreen canvas at 0.32× size (5.3u wide, alpha 0.7), plus a 9u orange outer-rim ring and a 5u pink inner-rim ring. Composite it onto the main canvas in `lighter` mode with an 8u blur.
- **Performance:** device pixel ratio is capped at 2. The loop pauses while the tab is hidden. Reduced motion draws one still frame.
- **Pointer:** the ring centre eases up to 14u × 10u toward the pointer (lerp 0.05).

## Headline group (cap top about 447u from the frame top, centred)

- **Word:** at 176u, weight 600, tracking −0.03em, filled with `linear-gradient(12deg, #fffaf6 28%, #ffe6d6 46%, #ffbc98 66%, #ff8f62 88%, #ff7a4c)`. The result is white at the lower left and peach-orange at the top right.
- **Caret:** a 1.6u × 124u bar in `#ffb48c`, 7u to the right of the word.
- **Typewriter:**
  - The words are Events, then Circles, then Creators, looping.
  - Each word holds for 2.6s with the caret blinking every 0.55s. It deletes at 70ms per letter, pauses 0.25s empty, types the next word at 100ms per letter, then pauses 0.15s.
  - Everything is a pure function of time.
- **Subline:** "Verra provides a space for creators to build / communities from zero to millions.", 26u below the word, 18u on a 24u line, white at 92%.
- **Button:** "Get started now", 19u below the subline. It's white, 41u tall with 17u side padding, radius 10u, 15u text at weight 500. On hover it lifts 2px and gains a soft orange glow.
- **Phones:**
  - the word is min(176u, 22vw);
  - the subline is 15px on a 21px line;
  - the whole ring and text block is centred vertically by shifting both the ring centre and the text down by half the leftover height.

## Timing and recording

- **Clock:** the ring and the typewriter read one clock, `performance.now()`.
- **`?rec=1`:** time comes instead from a paused Web Animation, a 100s linear `translateX(0 → 100000px)` on a hidden 1px element. A frame-by-frame recorder can seek it to get exact frames.

## Acceptance check (1440×960)

- **Look:** a crisp, glowing red-pink-orange fin vortex arcs across the top with a pure-black hole.
- **Text:** "Events" sits under the arc in a cream-to-orange gradient with a blinking caret.
- **Motion:** the ring turns slowly and seamlessly. After about 2.6s the word deletes and types "Circles".
- **Performance:** 60fps on a laptop.
- **Content:** no real brands or logos.