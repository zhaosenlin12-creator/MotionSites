# Prompt: Gridwork Co create-account hero

Build a single-file, one-screen **create-account onboarding hero** for a fictional freelance marketplace, **Gridwork Co**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is fresh and botanical: a large photo card of a young woman tending plants in a bright glass greenhouse on the left, and a clean off-white form on the right asking "What tools do you use?", with sage and forest-green accents.

## Media

- **Photo:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/61db05ee-e08b-47b7-8ab6-541c5c510237.jpg` (1356×1528). A woman with dark hair in a low bun, a cream knit sweater and an olive apron, working with leafy plants in a sunlit greenhouse with hanging plants.
- **Motion:** a muted 10s loop of the same shot plays over the photo with identical cover rules: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/221f7a06-5ecc-40b6-9ece-26f1f982db64.mp4` (1020×1150).
  - The camera dollies in and orbits around her until she faces the lens, while her hands lift and part the leaves and the hanging plants sway. The clip plays forward then reversed, so it loops without a jump.
  - Fade it in (0.8s) once its first frame is ready.
- **Rule:** nothing in the photo is drawn or animated in code. Only the UI animates.

## Scale

- **Units:** every size is in reference pixels of a 1447×1087 artboard, multiplied by `--u = clamp(.7px, min(100vw/1447, 100vh/1087), 2.4px)`.
- **Grid:** the shell fills the viewport. Columns are `minmax(0,1fr)` for the photo and `max(508.7u, 45%)` for the form. Padding is 11.5u top, 15.7u bottom and 15.6u left, so the photo card keeps an even margin to the edges.

## Type and colour

- **Font:** **Inter** 400/500/600/700 everywhere.
- **Colours:**
  - page `#FDFEFD`
  - ink `#101A20`; secondary text `#6E767C`, `#8A9196`
  - lines `#DCE0DD`
  - forest green `#1F4D37` (wordmark, log-in link) and `#1D4A35` (selected border and check)
  - button `#20513A`, hover `#2A6247`
  - sage tint `#ECF2EC` for selected cards

## Photo card (left)

- **Shape:** fills the left column. Top-left corner square; the other corners have a 24u radius. Photo `object-fit:cover`, position 50% 22%.
- **Tile pattern** in the top-left corner, on a 61u grid (4×4 cells):
  - six frosted tiles (61u, radius 15u, `rgba(255,255,255,.5)` with an 8u blur) at column/row (2,0), (3,1), (0,2), (2,2), (1,3) and (3,3)
  - page-coloured cut-outs: cell (0,0) and the rounded notches along the card edge, so the pattern reads as squares punched out of the corner
- **Bottom glass:** a 360u band with a 22u backdrop blur and a forest tint gradient (0 → .30 → .22), masked in from transparent.
- **Testimonial:** white, 40u side padding.
  - Quote: Inter 500, 31.35u on 45.5u, max 772u wide: "I landed multiple paid projects within a couple of days–way more traction than I ever got elsewhere. Definitely my go-to freelance platform now!"
  - Name "Sofia Hernández" (600, 20.5u) and role "Garden Designer, Portland, OR" (500, 16.25u).
  - Two 59u round outline arrow buttons (white 1.5u circle and arrow) at the bottom right, 31u apart.

## Form (right)

- **Column:** 432u wide, centred vertically and horizontally.
- **Wordmark:** a two-leaf mark (dark and mid forest green, with a thin pale vein) and "Gridwork Co" in Inter 600, 24u, forest green.
- **Heading:** "What tools do you use?" in Inter 700, 26u, tracking −.65u, 50.5u below the wordmark. Below it, "We’ll connect you with the best jobs." (17.15u, grey).
- **Tool grid:** 2×3, 34u below the subline, gaps 19u × 18u. Each card is 130.5u tall, radius 11u, with a 1u inset line. Contents:
  - a 41u app icon tile, the tool name (600, 16.75u) and the domain (400, 16.75u, grey) with an external-link icon
  - a 20u round checkbox at the top right
- **The six tools use their real app icons:**
  - **Figma:** the five-colour mark on dark `#1E1E1E`
  - **Framer:** the white glyph on black
  - **Adobe XD:** pink `#FF61F6` "Xd" on plum `#470137`
  - **Webflow:** the white W on blue `#146EF5`
  - **Relume:** the dark hexagon-cube on pink
  - **Canva:** the teal-to-violet gradient circle with the white script, on white
- **Selected state:** Figma, Webflow and Relume start selected. A selected card gets the sage fill, a 2u forest border and a filled forest checkbox with a white tick. Cards toggle on click.
- **Button:** a full-width 53u pill "Create account", 43u below the grid. Below it, "Already have an account? **Log in**" with the link in forest green, underlined.

## Motion (UI)

- **Entrance:** one Web Animations timeline, about 2s, started when the fonts are ready. The photo and its pattern never move.
  - The quote wipes up out of a top-down clip; its footer follows.
  - The wordmark rises, then the heading wipes up and the subline rises.
  - The tool cards rise row by row (155ms per row, 55ms per column), then the button, then the log-in line.
- **Hover:** the arrows get a faint white fill; the button lightens.
- **Reduced motion:** no entrance and no video.

## Tablet and phone

- **Tablet (portrait):** the photo card on top, then a wide form with a 3-column tool grid, all on one screen.
- **Phone:**
  - a short photo card with the quote clamped to 3 lines
  - compact horizontal tool cards in 2 columns
  - everything fits one screen without scrolling

## Acceptance check (1440×960)

- The greenhouse photo card fills the left 55% with the original tile pattern in its top-left corner.
- The form sits centred on the right, with three sage-selected cards and the forest "Create account" pill.
- The camera visibly orbits her in the loop, and it repeats without a jump.