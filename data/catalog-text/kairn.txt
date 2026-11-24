# Prompt: KAIRN Alpine 26 hero

Build a single-file, one-screen **landing hero for a premium ski-goggle brand**, **KAIRN** (collection "Alpine 26"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is light-mode winter editorial: a full-bleed photo of a model in an all-white puffer suit and white knit beanie, seated in the snow and looking up, wearing mirrored **ice-blue goggles** that reflect glacier peaks. The background is a calm, almost studio-clean pale icy sky with only a faint low mountain ridge and light snow.

## Scene

- **Plate:** the background is ONE 16:10 photo (1728×1080): `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg`. `object-fit:cover`, position 50% 30% (phones: 50% 18%, then 50% 0).
- **Motion:** a 5s muted looping video of the same plate plays over it with **identical cover rules**: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/823d013d-bf03-4967-b08f-63c3752df435.mp4` (1152×720). Snow drifts across the frame, the model turns her head slightly and the goggle reflections glint.
  - Fade it in once its first frame is ready.
- **Readability:** a soft, cool navy side-shade (`rgba(22,52,84,.34)` → 0 by 55% from the left, and .2 at the far right) keeps white type readable on the pale sky.
- **Rule:** nothing in the scene is drawn or animated in code.

## Type and colour

- **Display:** **Anybody** (variable width), set wide (font-stretch 115–150%), for the logo, nav, headline, card titles and buttons.
- **Text:** **Inter** for small text.
- **Colours:** text white, accent **ice cyan `#44DAFD`**, cream card `#F3F1E9`, ink black.

## Layout (desktop: a measured 1546×1017 canvas scaled by --k = min(vw/1546, vh/1017))

- **Top left:** the text wordmark **"KAIRN"** at 28px, wide, with "KA" in cyan and "IRN" in white.
- **Top centre:** "COLLECTION / OUR WORLD", wide caps, 15.4px.
- **Top right:** an account icon, "BAG" and a round white counter "0".
- **Middle left:**
  - three slider dots (the first cyan)
  - the eyebrow "BUILT FOR THE WHITEST DAYS"
  - a huge wide, thin headline at about 106px: **"FORM." / "FUNCTION."**, then **"VISION"** in outline letters with a cyan stroke
- **Middle right, a 2×2 tile cluster:**
  - **Lens card** (cyan): "01 / LENS EDITION", a large bold "BLUE / FROST" and "A cooler perspective".
  - **Beside it:** "ALPINE / 26" in large wide type.
  - **Glass circle:** a frosted cool-blue circle with a ↗ arrow and "01 / 04" with a progress ring (cyan arc).
  - **Product card** (cream): the ice-blue mirrored goggles, then "MODEL 03" and "EXPLORE THE FRAME".
- **Bottom left:** a frosted navy glass story card with a skier thumbnail, "GLACIER COLLECTION" in cyan, and "Crafted for the summits. / KAIRN goggles sharpen every / view. Read more".
- **Bottom centre:** a cyan "EXPLORE COLLECTION" button sitting on a thin horizontal rule across the page.
- **Bottom right:** "FOLLOW US" and three round outline social icons (X, Facebook, Instagram), the first ringed in cyan.

## Motion (UI)

- **Entrance:** a one-time CSS entrance, about 2.2s.
  - The logo and nav settle; the dots, then the eyebrow.
  - Each headline line types up in turn.
  - The lens card, ALPINE 26, the glass circle and the product card arrive.
  - Then the story card and the button; the rule draws across; the social links fade in last.
- **Hover:** the button lightens to `#6FE3FF`.
- **Reduced motion:** no entrance and no video.

## Tablet and phone

- **Tablet:** a one-screen portrait composition: a header row, the photo, the headline, the story card with the 2×2 tiles, and the action row.
- **Phone:**
  - a viewport-height hero with the photo masked into the page
  - the nav moves into a burger menu
  - below come the 2×2 tiles, the story card and the social row

## Acceptance check (1440×900)

- The pale icy hero shows the white-suited model with blue goggles in the centre, the big wide FORM / FUNCTION / VISION on the left and the cyan / cream tile cluster on the right.
- Snow visibly drifts and the goggles glint in the loop.
- **Content:** no real brand names.