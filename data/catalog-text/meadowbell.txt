# Prompt: Meadowbell hero

Build a single-file **landing hero for an animated kids' farming series**, "Hollyoak's Plucky Sprout Squad", from a fictional studio, **Meadowbell**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a sunny hand-painted anime (Ghibli-like) afternoon: a boy and his beagle lie on a grassy hillside looking up at a big blue sky full of cumulus clouds, with a green valley far off on the right.

## Scene

- **Plate:** the whole scene is ONE 9:8 background image (2160×1920): `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3ca5d10d-ea2f-4907-876f-33bde169469e.jpg`.
  - **Sky:** a deep-to-light blue sky across the top 60%, with a tall cumulus cloud on the left, another on the right, and wispy streaks top-right.
  - **Hillside:** the boy (messy brown hair, white shirt, blue shorts, hands behind his head) and a brown-and-white beagle lie at the left, looking up. Grass and wildflowers fill the bottom third, softly blurred at the very bottom.
- **Motion:** the scene moves only through a looping video of the same plate: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d2cb5bef-f92b-4e91-ae93-8dc6555e56ac.mp4` (960×960, 5s, muted, loops; first frame = last frame).
  - The grass ripples in steady waves, daisies nod, the boy's hair and shirt flutter, the dog's ears lift, and the clouds drift right.
  - The video was rendered square from the plate mirror-padded 120/1920 at the top and bottom. Lay it over the plate at **100% width, 112.5% height, top −6.25%** so its middle sits exactly on the plate.
- **Rule:** nothing in the scene is drawn or animated in code.

## Frame and scaling

- **Frame:** the hero is **one 1440×1280 frame** (9:8) that scales with the viewport width: `--u = 100vw/1440`, height 1280u. On a 1440×900 screen the headline, buttons and the boy and dog show first, and the chapters row sits just below the fold.
- **Placement:** every element below is placed in frame units.

## Type and colour

- **Display:** **Grandstander 900**, a rounded, slightly bouncy display face, all white. It's used for the logo, the kicker, the headline and the section title.
- **Everything else:** **Inter** 400/500. Self-host the latin woff2 files.
- **Colours:** text is white with a soft blue shadow `0 4u 18u rgba(28,70,120,.28)` on the headline. Button text green is `#5b875c`.

## Layout (1440×1280 frame)

- **Nav:**
  - **Logo:** "Meadowbell" 29.5px with a small white two-leaf sprout icon, at (31, 23).
  - **Nav pill:** a translucent sage pill `rgba(173,196,174,.45)` with backdrop blur, 546×50 at (443, 13), radius 25. Inside: Farm · Gear · Chapters · Our Crew, Inter 500 19.5px, 54px apart, starting 49px in.
  - **Join us:** a white pill, 105×45 at (1311, 14), green Inter 500 18.5px.
- **Copy, centred:**
  - **Kicker:** "HOLLYOAK'S" 40.5px, cap top at y = 203.
  - **Headline:** **"PLUCKY / SPROUT SQUAD"**, 143.5px on a 118px line pitch, cap top at y = 261.
  - **Subline:** Inter 21.2px / 27px, three lines: "Learn the Ways of the Meadow with / Hollyoak's Plucky Sprout Squad! Each chapter is / packed with play, chores, and wonder."
  - **Join us button:** white pill, 144×59 at (550, 617), green 22px.
  - **Watch preview button:** translucent mint pill `rgba(204,218,173,.6)` with blur, 184×58 at (707, 619). It has a white rounded play triangle and white 19.5px text.
- **Chapters row:**
  - **Title:** "CHAPTERS" 36px at (137, 866).
  - **Link:** "browse all chapters ›" 22px, right-aligned to x = 1308.
  - **Cards:** three 378×273 cards at x = 133, 531, 929 (y = 913), radius 15, soft shadow, each with a white rounded play triangle 20px in from the bottom-left. Card art:
    - a vegetable garden with tomato stakes and a cottage: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cd2d844f-ae3f-4fa9-8067-b077530b6e71.webp
    - a boy and dog on a hill path among sheep above the sea: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48f5b97e-c27c-4afd-9427-eb35aebd1751.webp
    - a girl in a straw hat flying a kite on a breezy hill: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cde5384e-ce4d-423f-925a-451b779066e0.webp

## Motion (UI only)

- **Entrance**, one Web Animations timeline, run once:
  - the logo, nav and Join us drop in
  - the kicker un-blurs
  - each headline line springs up out of a blur, 0.16s apart
  - then the subline, both buttons, the chapters title and link, and the three cards rise in turn
- **Hover:** the cards lift 8u and their art zooms to 1.05. The pills rise 2u, and the chevron nudges right.
- **Reduced motion:** no video and no transitions.

## Phones (≤ 820px)

- **Nav:** compact, with the logo and Join us.
- **Copy:** stacked and centred in flow, with the headline at 51px.
- **Chapters:** a swipeable row of cards.
- **Scene:** the 9:8 plate and video sit in one 9:8 box sized to the hero's height and shifted so the boy and dog stay in view (left 18%, translateX(−18%)).

## Acceptance check (1440×1280)

- The text, pills and cards sit at the coordinates above over the hillside scene.
- The grass visibly ripples, the boy's hair and the dog's ears move, and the clouds drift.
- The video lines up exactly with the still.