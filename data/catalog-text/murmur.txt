# Prompt: murmur podcast hero

Build a single-file, one-screen **landing hero for a daily podcast** from a fictional show, **murmur** ("Daily Murmur Podcast"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. The mood is calm and cinematic: blue hour seen through a rain-streaked apartment window, with a blurred city skyline in violet and pink, warm bokeh lights, and dark monstera leaves in the lower corners.

## Scene

- **Plate:** the whole background is ONE 16:10 image: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7a7598ba-a6f8-42b4-ac39-98279dac4192.jpg`.
  - **Window:** a dark wooden window frame fills the middle and right. Its glass is covered in raindrops, with a blurred skyline behind it.
  - **Room:** a soft curtain hangs at the left, and big monstera leaves fill the lower-left and lower-right corners.
- **Motion:** the scene moves through a looping video of the same plate: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d41b8c1d-f175-43b3-af22-7081133aa8de.mp4` (1280×720, 5s, muted, loops; first frame = last frame), with drops sliding and lights shimmering.
  - The video was rendered 16:9 from the plate mirror-padded 96/1728 on each side. Lay it at **111.11% width, left −5.556%** so its middle sits exactly on the plate.
  - **Lighting layers** (screen-blended, lighting only, never drawn objects):
    - **Bloom:** three soft radial glows over the city lights (pink, amber and periwinkle) breathe between 35% and 100% over 5.2s.
    - **Sweep:** a pale diagonal light band sweeps across the room every 7s, like headlights passing below.

## Frame and scaling

- **Frame:** one **1440×900 frame** that covers the viewport: `--u = max(100vw/1440, 100vh/900)`, centred. Every element below is placed in frame units.

## Type and colour

- **Wordmark:** "murmur" in **Newsreader 500** (a bookish serif with moderate contrast), white, 139px, tracking +.05em, with a soft navy shadow.
- **Sans:** **Inter** 400/500. The subtitle is lavender `#dfe3fb`; the episode title is white.
- **Mono:** **IBM Plex Mono** 400 for the label, date line, About text and platform row. The label is `#b9c4ea` and the date line `#7583bd`.
- **Card:** deep navy glass `rgba(8,21,62,.84)` with an 18px blur, a 1px periwinkle border `rgba(132,146,255,.38)` and a deep shadow.

## Layout (1440×900 frame)

- **Wordmark:** "murmur", centred, x-height top at y = 133.
- **Subtitle:** "Daily Murmur Podcast", 33px, centred, at y = 225.
- **Label:** "LISTEN TO THE LATEST EPISODE", 12.6px mono, tracking .05em, centred 10px right of centre, at y = 319.
- **Player card:** 623.5×190 at (412.5, 350), radius 16.
  - **Cover:** 158×156 at (18.5, 16) inside the card, radius 7. The art is rooftop gardens over a dusk skyline, `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/6f03fd17-7c05-4c28-a079-6c53f2d397e6.webp`, with a white serif "murmur" over its lower left.
  - **Title:** "Why Cities Are Planting Forests / on Rooftops", Inter 500 20.6px on a 25.5px line, at (202.5, 33).
  - **Date line:** "Apr 25 · Daily Murmur Podcast", 11.2px mono, at y = 99.5.
  - **Waveform:** 62 thin rounded bars (1.9px) across 335×34 at (203, 138). Most are quiet; there's a tall bright burst at about 25%, softer bumps at 33% and 68%, and a colour drift from blue `#5560FF` through periwinkle `#86A2FF` to violet `#A083FF`, with a faint glow.
  - **Play button:** a 37px off-white circle with a navy play triangle at (566.5, 136.5).
- **About:** "ABOUT", 13px mono at (414, 595). Below it, four mono lines at 13.72px on a 19.3px pitch: "Every weekday morning, murmur slows the noise down to the four stories / worth carrying into your day: twenty quiet minutes of science, designs, / cities and culture, told by hosts who stay so curious about the / small things that make a city a home."
- **Platform row:** "LISTEN ON YOUR FAVORITE PODCAST PLATFORM", 11.4px mono at (414, 760). Four 21.5px round white icons start at x = 710 with an 11.7px gap: an outlined podcast mic, a sound-bars disc, a headphones disc and another bars disc. Use generic glyphs only, no real brand logos.

## Motion (UI)

- **Entrance:** one Web Animations timeline.
  - The wordmark develops out of an 18px blur with a slight scale.
  - The subtitle rises, and the label's tracking tightens from .3em to .05em.
  - The card rises out of a blur, and the waveform wipes in left to right.
  - The About lines rise one by one, then the platform row.
- **Loops:** the waveform bars breathe on staggered 1.6s loops (scaleY .72↔1.08).
- **Hover:** the play button grows to 1.08 with a halo, and the icons lift 2px.
- **Reduced motion:** no video, no bloom or sweep, no breathing.

## Phones (≤ 820px)

- **Background:** the plate and video cover the screen behind everything.
- **Copy:** stacks centred: a 60–100px wordmark, the subtitle and the label.
- **Card:** compact. The cover sits beside the title and date, the waveform runs full width below, and play sits at the bottom-right.
- **Below the card:** the About block and the platform row, left-aligned.

## Acceptance check (1440×900)

- Every element sits at the coordinates above over the rainy-window plate.
- The loop lines up with the still, the city glow breathes, and a light band sweeps the room.
- **Content:** no real brands, logos or people.