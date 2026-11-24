# Prompt: Skyprompt hero

Build a single-file, one-screen **landing hero for an online course on AI image generation** for a fictional school, **Skyprompt** ("Prompt-to-Pixel Art, No Cost!"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. It's bright, playful and airy: a floating grassy island with a waterfall hangs in a clear blue sky above a bank of clouds, and a fan of four art cards rests on the island.

## Scene

- **Plate:** the whole scene is ONE background image, a 1440×900 composition: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/dc4ac5c7-4eee-48ab-814c-cbba3c9fd1b7.jpg`.
  - **Sky:** a clear blue gradient, deeper at the top (#3195e0 → #49a9f3).
  - **Island:** one small floating island, centred, its grassy top at about y = 560, with a waterfall falling from its underside into the clouds.
  - **Clouds:** fluffy clouds along the bottom edge and the lower corners.
- **Motion:** the scene moves only through a looping video of that same plate: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/81764d30-8120-4ab5-8491-4dd852b82496.mp4` (1280×720, 5s, muted, loops; first frame = last frame).
  - It shows the waterfall flowing, small yellow butterflies fluttering across the sky, a larger butterfly passing, the clouds drifting and the grass swaying. The island itself never moves.
  - The video was rendered 16:9 from the plate mirror-extended 96/1728 on each side. Lay it over the plate at **111.11% of the frame width, left −5.556%**, so its middle sits exactly on the plate.
- **Rule:** nothing in the scene is drawn or animated in code.

## Frame and scaling

- **Frame:** everything sits in one **1440×900 frame** sized by `--u = max(100vw/1440, 100vh/900)`. The frame covers the viewport, centred horizontally and anchored to the top, and every element below is placed in frame units.
- **Nav:** pinned to the viewport edges with its own fit unit, `--n = clamp(.62px, min(100vw/1440, 100vh/900), 1.6px)`.

## Type and colour

- **Headline:** DM Serif Display 400, white, with a 1.1u white text-stroke for weight.
- **Everything else:** Poppins 400/600/700. Self-host the latin woff2 files.
- **Labels:** Poppins **700**, letter-spacing −.015 to −.02em, dark ink `#161c08`, set on a **rough yellow highlighter swipe**: an SVG brush shape with jagged edges, filled `#f6f03b`, stretched behind the text, plus a soft `drop-shadow(0 0 1.5u rgba(246,240,59,.75))` paint bleed. Never use clean boxes.

## Layout (1440×900 frame coordinates)

- **Nav:**
  - **Logo:** a white six-petal flower, 44×44 at (118, 22).
  - **Links:** Story · Study Plan · Showcase · Classroom · Q&A, white, 17px, centred at y = 44, 35.5px apart.
  - **X button:** a 50px translucent white circle, 283 from the right.
  - **Pill:** a white "Begin the Journey" pill, 168×44, 107 from the right.
- **Headline block:**
  - Highlighter **"Begin"**: 131×44 at (657, 117), 40px.
  - Headline **"Prompt-to-Pixel Art"**: 103px, centred, top 140.
  - Highlighter **"No Cost!"**: 176×45 at (638, 241), 39px.
  - **Subline:** 17.2px / 24.5px, centred, top 312, two lines: "Turn plain words into images you love — lesson / by lesson, from first idea to finished piece."
- **Cards:** four 132×162 cards with a 5px white border, radius 12 and a soft shadow, each tilted:
  - (472, 419) at −12°: cottage on a sea cliff
  - (601, 407) at −4°: orange kitten in a blue beanie and scarf
  - (711, 409) at 4°: smiling succulent in a terracotta pot
  - (827, 419) at 12°: golden retriever in a cowboy hat and red bandana
  - Card art: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/37b0e4f8-9780-409b-9aa4-f855a9a4ef24.webp, https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/02be94e0-6903-4edd-b5ec-a10eb62d166e.webp, https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/73e9f810-8b43-4548-a4b1-830b1b99cdfd.webp, https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/fde79b9a-ae7c-439f-9a96-f727754defb7.webp
- **Labels and arrows:**
  - Highlighter label **"Starts from Zero!"** at (395, 424), rotated −11°, with a hand-drawn yellow arrow curving into the first card.
  - Highlighter label **"Real Client Results"** at (927, 518), rotated −6°, with one arrow curling up to the dog card and a double arrow curling down.
- **Call to action, on the island:**
  - Highlighter **"Zero Cost"**: 96×25 at (672, 584).
  - White pill **"Begin the Journey"**: 195×44 at (622, 624), 17px Poppins 600.
  - Note **"No art skills needed to start."**: 15.6px, centred at top 682.

## Motion (UI only)

- **Already visible at load:** the scene, the cards and the call to action.
- **Entrance**, one Web Animations timeline, run once:
  - the logo and the nav buttons fade in
  - at 0.35s, "Begin" is marked in: the yellow swipes left to right (clip-path on `::before`), then the word lands
  - at 0.7s, the headline develops out of a 14px blur with a 1.04 → 1 scale
  - at 1.45s, "No Cost!" is marked the same way
  - at 1.85s, the subline settles out of a soft blur
- **Hover:** cards lift 18u, straighten and grow to 1.07.
- **Reduced motion:** no entrance and no video.

## Phones (≤ 820px)

- **Top:** a compact nav (logo, the pill and a round menu button), then the copy in flow, centred.
- **Below:** the same frame, scaled to 100vw/720 and cropped around the island, with its top edge fading into a page gradient sampled from the plate's sky.

## Acceptance check (1440×900)

- The copy and the card fan sit at the coordinates above.
- The waterfall flows and butterflies cross the sky.
- The island stays still and the cards stay seated on it.
- All labels are bold on rough highlighter swipes.