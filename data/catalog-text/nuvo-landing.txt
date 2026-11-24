# Prompt: nuvo freelance-banking hero ("Coastal Cliffs")

Build a single-file, one-screen **split landing hero for a fictional freelancer bank, nuvo**. Use plain HTML, CSS and vanilla JS, with no framework and no build step.

- **Left:** a tall rounded photo panel showing a golden-hour clifftop meadow with a white lighthouse above the sea, with a stack of floating banking UI cards over it and a big "Hey, it's nuvo!" in the bottom-left corner.
- **Right:** a calm off-white column with a small header, a large three-line headline (sans plus serif italic), a lede, a coral CTA and two small facts at the bottom.

## Layout and scale

- **Page:** a full-viewport page on a pale peach ground `#F8E6DD`, with a unit `--u` scaled from a desktop reference so everything stays one screen.
- **Columns:**
  - **Left panel:** about 46% of the width, rounded corners, with an 8u margin from the page edge.
  - **Right column:** fills the rest of the width on a warm white `#FAF9F5`.

## Type and colour

- **Fonts:**
  - **Instrument Sans** (variable, stretch 95%) for the UI and the first headline lines.
  - **Instrument Serif Italic** for "freelance life", "it's nuvo!" and the card logo.
- **Colours:**
  - ink `#151615`, soft ink `#696C64`, muted `#C3C4C1`
  - coral card `#FE8A70`, coral CTA `#FA7F62`, negative amounts `#E5714D`
  - dark card `#2C3426`, chips `#EFF2E9`

## Left panel

- **Photo:** cover-fit. A grassy slope full of white and yellow wildflowers sweeps up from the lower left to sea cliffs on the right, with a small white lighthouse on top, the sea below and a warm sunset sky.
- **Motion:** a muted, looping 4s video of the same shot sits over the photo with identical cover framing (object-position 50% 50%; 50% 32% on tablets): `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/8c7344a4-d74c-4611-a9f5-bfe0125be0ef.mp4` (1012×1552, portrait).
  - The grass and wildflowers ripple in a sea breeze, waves break on the rocks, clouds drift and the sun glints on the water, with a slow forward camera drift.
  - The last second crossfades into the first, so it loops without a jump and never plays in reverse.
  - Fade it in (0.8s) once its first frame is ready. Hide it for reduced motion so the still photo shows.
- **Rule:** nothing in the scene is drawn or animated in code. Only the UI animates.
- **Dust:** a few tiny white floating dust specks (SVG circles) near the top.
- **Floating cards** (overlapping, with soft depth):
  1. **Coral balance card:** "TOTAL BALANCE", "$24,318.40", a white chip "+$3,200 today", a small dark dot, and "VIEW DETAIL" underlined.
  2. **Frosted glass list card:** "Westbrook Studio" with "+$3,200", then two more rows partly hidden behind the dark card (amounts "−$640" and "−$15" in coral chips), and a white row "Invoice #0413 is due tomorrow" with "SEND A REMINDER ↗".
  3. **Dark card:** "Virtual cart" and "Debit" at the top, and a large "nuvo" wordmark.
- **Corner text:** "Hey," / "*it's nuvo!*" in big white type at the bottom left.

## Right column

- **Header:** a light square menu button (three lines) on the left, the "nuvo" wordmark centred, and a dark square profile button on the right.
- **Headline:** centred, about 64u, tight leading: "Banking that / keeps up with / *freelance life*", with the last line in Instrument Serif Italic.
- **Lede:** "One account for invoices, taxes and / getting paid from anywhere. No monthly / fees, no waiting for Monday."
- **CTA:** a coral rounded pill "Open an account" (151u × 45u) with a small dark square arrow button inside it, on the right. It is exactly centred under the lede on the column's centre line (`left: 50%; transform: translateX(-50%)`). Any hover or lift animation must keep that centring transform, for example `translateX(-50%) translateY(-2px)`, never `transform: none`.
- **Footer facts:** "No monthly fees · 30+ currencies" in light grey.

## Motion

- **Entrance:** one Web Animations timeline, about 2.5s, removed at the end.
  - The header settles.
  - The headline lines wipe up one by one.
  - The lede and CTA rise in turn.
  - The cards float in on the photo.
- **Hover:** the CTA lifts slightly.
- **Reduced motion:** no entrance and no video.

## Responsive

- **Phones:** the right column comes first (header, headline, lede, CTA, facts), and the photo panel with its cards stacks below it.

## Acceptance check (1440×960)

- The golden-hour lighthouse cliff panel sits on the left, with coral, glass and dark cards and "Hey, it's nuvo!".
- The clean right column has the three-line sans and serif headline and the coral CTA.
- **Content:** no real brands.
