# Prompt: MAREN fashion hero

Build a single-file, one-screen **fashion landing hero** for a fictional label, **MAREN**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is an editorial full-bleed portrait of a blonde model in a chunky lilac knit sweater against a dreamy lilac-and-peach sunset sky. Thin white grid lines divide the frame, there's a big mixed sans and italic serif headline, a tilted polaroid, and a giant italic watermark.

## Media

- **Hero photo:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/8c8bd1ea-b9f8-4755-b2db-ca972fa9a381.jpg` (1522×1033). A low-angle portrait: long wavy golden hair, one hand at a lilac turtleneck collar, and a soft lilac sky with glowing peach and coral streaky clouds. It covers the frame, drawn 1155×794 from the top-left of the 1155×767 frame.
- **Polaroid:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4612f265-40f3-4fc9-af4c-b03c289c2b75.jpg` (520×650). A blonde woman in sunglasses, a lilac tee and light jeans, sitting on stone steps before an old building.
- **Motion:** a muted, looping video of the same shot plays over the photo with the identical box and stretch: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0b9dbcc0-b9fc-4c2c-9418-458e4e829c59.mp4` (1600×1084, 4s). A breeze moves her hair and the knit, the clouds drift and the warm light shifts, with a subtle slow push-in.
  - The loop crossfades its last second into its first, so it never jumps or plays in reverse.
  - It fades in (0.8s) once its first frame is ready and is hidden for reduced motion.
- **Rule:** nothing in the scene is drawn or animated in code. Only the UI animates.

## Type and colour

- **Inter Tight** 300/400/500 for the sans.
- **Playfair Display Italic** 400/500 for the logo, the "Modern You" line and the watermark.
- **Colours:** text white; grid lines `rgba(255,255,255,.24)`; glass tint `rgba(112,84,150,.34)`; peach star `#F4B8A2`; page fallback `#3B2F5C`.

## Layout (1155×767 frame, `--u = min(100vw/1155, 100vh/767)`)

- **Grid:** vertical lines at 200.6/1155 and 843.6/1155 of the width, a horizontal line at 405.2/767, and a top rule under the nav.
- **Nav:**
  - "MAREN" in italic serif at the top-left.
  - Right: SHOP · EDITORIAL · JOURNAL separated by vertical rules, then two round glass icon buttons (heart and bag).
- **Headline:** in the left/centre column: "Timeless / Style for" in Inter Tight 300, then "*Modern You*" in Playfair italic, very large.
- **Right column:** a peach star with "WINTER 2027".
  - Lower down: "Discover fashion that blends comfort, quality, and confidence. Crafted for your everyday moments and life's special ones."
  - A white "View Product" pill and a round arrow button.
- **Bottom-left:** "NEW / SEASON / COLLECTION".
- **Polaroid:** tilted −13°, white frame, the photo, and a handwritten "Stylist T-shirt" caption. It overlaps the left column line.
- **Watermark:** a giant italic "MAREN" across the bottom at low opacity, partly behind the model.

## Motion (UI)

- **Entrance:** one CSS sequence.
  - The header items drop in, and each headline line rises in turn.
  - The supporting copy fades up.
  - The polaroid drops and settles to its tilt.
- **Reduced motion:** no background video.

## Phones (portrait)

- The photo covers the screen.
- The headline and copy re-flow over it, with the polaroid smaller and the watermark scaled.
- One screen, no scrolling.

## Acceptance check (1440×960)

- The model in the lilac sweater fills the frame under a lilac-peach sunset.
- The white grid lines frame the "Timeless Style for *Modern You*" headline.
- The tilted polaroid sits lower-left, and "MAREN" appears as the faint watermark.
- **Content:** no real brands.
