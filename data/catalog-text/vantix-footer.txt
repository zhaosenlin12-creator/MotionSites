# Prompt: Vantix footer ("Cobalt Flare")

Build a single-file **website footer** for a fictional creative agency, **Vantix**. Use plain HTML, CSS, inline SVG and vanilla JS, with no framework and no build step. The look is a deep-navy footer under a glowing electric cobalt and cyan aurora band. A thin blue arc runs through a glowing glass ring, and a big vertical cyan wordmark stands between two hairline dividers, with link columns, a "Book a call" call to action and social icons.

## Media

- **Glow plate:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4a917d4c-123f-4b68-8125-b201961b7791.jpg` (2240×843). A smooth cobalt-to-cyan light field across the top that fades into dark navy.
- **Motion:** a muted 4s loop over the plate: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a8f60da5-538f-403a-a812-6be0f098e319.mp4` (1600×600).
  - The aurora ribbons flow, ripple and curl across the band while the light drifts sideways.
  - The last second crossfades into the first, so it loops without a jump and never plays in reverse.
  - It fades in (0.9s) once its first frame is ready.
- **Rule:** nothing in the glow is drawn or animated in code. Only the UI animates.

## Scale

- **Units:** desktop is a 1326 × 1186 reference composition, with 1 unit = `--u = min(100cqw/1326, clamp(1px, 100cqw/2200, 1.16px), 100vh/1186)`. The footer always fits one screen; type keeps readable floors.
- **Framing:** content sits in a centred 1326u frame (offset `--x0`). The glow, arc and dashed rule stay full-bleed.

## Colours and type

- **Colours:**
  - page `#00071A`
  - text white; links `#AFCAF3`; copyright `#B3CCEF`
  - accent cyan `#2EF0FD`
  - dividers and the dashed rule `#2A74E8` at about 40%
- **Sky:** above the glow image (on tall screens) the background is a horizontal gradient taken from the plate's top row: `#2A70F9 → #0C40D2 → #126FF3 → #57E3FC → #64E4FC`.
- **Font:** Inter Display 300/400/500.

## Layout (reference units)

- **Glow box:** the top 558u, `preserveAspectRatio="none"` across the full width. The plate and the video share it, and both are masked so their bottom 18% fades into the page.
- **Arc:** a thin arc (1.6px, gradient `#2A6DFC → #3FD0FF`) sweeps from (0, 143) down through about (816, 386) and up to (1326, 334).
- **Ring:** r = 78 at (780.7, 351.5). A glass disc with a dark inner radial fill and a 2.4px rim graded from blue at the bottom-left to bright cyan `#8AF0FF` at the top-right. A soft 5px blurred copy of the rim sits under it as a glow.
- **Wordmark:** "Vantix", bold geometric sans (Plus Jakarta Sans 700), drawn as one vector path, reading bottom to top.
  - Its cap height is 88.5u, its baseline is at x = 667.5u, and its bottom is aligned at y = 901.7u.
  - It's filled with a vertical gradient `#1DB6FC → #44F4FD → #19DAFD`.
  - The two vertical hairlines at x = 473 and 762 fade in from the top.
- **Left:**
  - "Elevate your brand with / us and experience the / difference." (500, 29u) at (72, 589)
  - a 76u cyan ring with a cyan ↗ arrow, then "Book a call" (30u, cyan, underlined) at (73, 741)
- **Right:** "Important" (Services, Portfolio, Pricing, About, Reviews) at x = 859 and "Legal" (Terms & conditions, Privacy policy, Contact us) at x = 1078. Headings are 28u/500; links are 21.6u/300 on a 58.75u row.
- **Bottom:**
  - a full-width dashed rule at y = 964
  - "Follow us" at (72, 1025)
  - five 45u round icons (X, Instagram, LinkedIn, Dribbble, Behance): dark blue glass with a thin blue ring and cyan glyphs
  - "Copyright © 2024 - All rights reserved" (15u, light) aligned right at y = 1099

## Motion

- **Entrance:** one CSS sequence with backwards fill, about 1.6s.
  - The wordmark wipes up out of a clip.
  - The headline rises out of a clip.
  - The two link columns and the CTA rise in turn.
  - The social row and the copyright fade in.
- **Hover:**
  - the CTA ring fills faint cyan and its arrow turns 45°, while the underline retracts
  - links turn cyan
  - icons lift 3u
- **Reduced motion:** no entrance and no video.

## Tablet and phone (below 960px, portrait or touch)

- **One-screen grid:** the glow band on top takes the spare height, with the plate cropped to its bottom.
- **Wordmark:** horizontal and full width, rising out of the glow, with a rule just under it.
- **Main block:** headline and CTA, then the link columns. On phones they stack below the headline.
- **Bottom:** the social row, then the copyright.

## Acceptance check (1440×1152)

- The aurora visibly flows behind the arc and ring.
- The cyan "Vantix" stands vertically between the hairlines.
- Every accent (CTA, icons, wordmark) is cyan; there are no drop shadows.
- **Content:** no real brands except the generic social glyphs.