# Prompt: Synthora AI hero

Build a single-file, one-screen **landing hero for an AI solutions company**, **Synthora**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a black page with a futuristic rounded display font, a centred headline, and a blazing molten-orange solar ring rising from the bottom edge.

## Media

- **Glow plate:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7e2a7695-c32b-4179-9c90-cae865819272.jpg` (1663×940). A pure-black field with a burning ring arching up from the bottom centre: a white-gold edge, fiery orange plasma with crackling filaments, a dark interior, drifting embers and thin vertical orange light streaks. The top half is pure black.
- **Motion:** a muted 4s loop of the same ring, laid over the plate with identical sizing: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/6ad9485f-ab40-444b-bd3c-40dcb9bd0e2f.mp4`.
  - The flares lick around the ring, embers rise, and the camera pushes in slowly.
  - The last second crossfades into the first, so it never plays in reverse.
  - Fade it in (0.8s) once its first frame is ready.
- **Rule:** nothing in the glow is drawn or animated in code.

## Type and colour

- **Font:** **Anta** (rounded futuristic display) for everything, weight 400.
- **Colours:**
  - page `#000`, text white, button text `#030103`
  - badge glass `rgba(220,110,40,.16)`, Watch Demo glass `rgba(255,150,70,.2)`
  - sun icon `#FAD53E`
  - a floor gradient under the glow, from `rgb(255,150,40)` at the bottom through deep ember to black

## Layout

- **Units:** a reference stage of 894×541 scaled by `--p = min(100vw/894, 100svh/541)`. The glow is pinned to the bottom (906×515p), the nav is pinned to the top, and the content floats in the middle.
- **Nav:** a round white logo mark with a four-point sparkle cut-out, then "Synthora" at 23.8p. Centre links: Start · Features · Resources · Help · Pricing (10.7p). Right: "Log in" with a user icon.
- **Badge:** an ember-glass pill holding a white "New" chip, "Simple Pricing" and a small yellow sun.
- **Headline:** "Empowering businesses with / practical AI solutions" at 38p on a 47p line.
- **Subline:** "We help teams design, develop and launch intelligent products with reliable infrastructure / and real-world impact." at 10.7p.
- **Buttons:**
  - a white "Start Free" pill
  - an ember-glass "Watch Demo" pill with a play icon
  - Hover: Start Free gets an orange glow, and Watch Demo's glass deepens.

## Motion (UI)

- **Entrance:** one Web Animations sequence, about 1.9s.
  - The logo, links and login fade in.
  - The badge opens from its centre.
  - The headline wipes up out of a clip.
  - The subline, then each button rises.
- **Reduced motion:** no entrance and no video.

## Phones and tablets

- **Fluid layout:** a top bar with the logo and a round glass burger that opens a dark ember glass dropdown menu.
- **Content:** centred, with type set by clamp().
- **Glow:** scaled up and anchored to the bottom.

## Acceptance check (1440×960)

- The black page has the centred white headline.
- The burning orange ring rises from the bottom edge, and its flames and embers visibly move.
- **Content:** no real brands.