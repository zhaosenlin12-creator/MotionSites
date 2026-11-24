# Prompt: MK Consulting legal studio hero ("Rust Orange")

Build a single-file, one-screen **legal-studio hero** for a fictional firm, **MK Consulting** ("Legal studio for creatives"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is street-art industrial: a burnt-orange graffiti concrete wall and a giant condensed white "MK CONSULTING" title. Below it, a huge rusted steel ring hangs from four chains, with ten construction workers standing on its rim and orange graffiti sprayed along its side.

## Media

- **Wall:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a9f1e939-234a-4481-9706-3b0675e7aed2.webp` (3344×1882). Orange concrete with darker sprayed graffiti shapes and drips; cover the page.
- **Ring:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f14add82-809a-41e1-a456-f47b8e57984b.webp` (1446×1685, transparent). The riveted rusty ring is seen slightly from above, with four chains rising to one shackle and workers in hard hats on the rim.
- **Rule:** the scene is still. Only the UI animates.

## Frame and scaling

- **Units:** design units `--u` from a 1672×941 reference (full width).
- **Title row:** the title and nav pin to the top.
- **Bottom group:** the ring and tagline form a group that grows into any spare height and is centred.
- **Portrait:** a single-column layout.

## Type and colour

- **Title:** Anton (288.6u, white, each glyph pinned to its measured box).
- **Nav:** Roboto Condensed, uppercase, white, with thin 1.4u rules between items.
- **Tagline:** Big Shoulders Display 900, uppercase.
- **Graffiti:** Permanent Marker.
- **Colours:** text white, page `#1e0a00` behind the image, graffiti orange gradient `#C2410C` → `#F97316` → `#FB923C` with an orange glow.

## Layout

- **Nav:** spread across the top edge, "ABOUT US — SERVICES — OUR CASES — BLOG — CONTACTS — VACANCIES", with flexible hairline rules between items.
- **Title:** "MK CONSULTING" spans the full width under the nav.
- **Ring:** hangs centred below the title, about 886u wide; the chains rise behind the title letters.
- **Graffiti:** "WE BUILD YOUR CASE" in spray-paint lettering follows the curve of the ring's front band, using an SVG `textPath` on a quadratic arc with a grainy turbulence and glow filter.
- **Tagline:** "LEGAL STUDIO FOR / CREATIVES" centred under the ring.

## Motion (UI)

- **Entrance:**
  - The nav fades in, then the title letters wipe up one by one.
  - The ring fades in.
  - The graffiti draws left to right with a clip.
  - The tagline lines wipe up.
- **Magnet ring:** the hanging ring (with its workers, chains and graffiti, as one layer) follows the mouse slightly, like a magnet.
  - **Pivot:** it swings from the point where the chains fade out at the top (`transform-origin: 50% 33%`), so the chains stay attached.
  - **Pull:** measure the pointer's offset from the ring's centre (50% across, 66% down the ring box). The pull fades smoothly to zero beyond about the ring's width. Up close it moves toward the pointer by up to 34px (vertical movement at 45% of horizontal) and leans up to 3.5° toward it, pendulum style: pointer on the right swings the bottom right.
  - **Easing:** each frame eases toward the target with a frame-rate-independent factor `1 − e^(−dt/140ms)`, so it glides with no jitter, and drifts back to rest when the pointer leaves the window.
  - **Clock:** time comes from a long Web Animation clock rather than wall-clock time.
  - **Limits:** only on fine, hover-capable pointers; off on touch and for reduced motion.
- **Hover:** nav links dim to 70%.
- **Reduced motion:** no entrance and no magnet.

## Phones

- **Nav:** wraps into two compact rows.
- **Title:** stacks as "MK / CONSULTING".
- **Ring:** shows its full hoist chain.
- **Tagline:** sits at the bottom.

## Acceptance check (1440×960)

- The orange graffiti wall fills the page and MK CONSULTING spans the top.
- The rusty ring with workers hangs below on chains, with "WE BUILD YOUR CASE" sprayed along its band.
- The tagline is centred beneath it.
- **Content:** no real brands and no gibberish graffiti.
