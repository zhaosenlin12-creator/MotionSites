# Prompt: Tana Camps "Elephant" editorial sections

Build three stacked sections of a fictional safari brand's species page, **Tana Camps Expeditions**, in plain HTML, CSS and vanilla JS with no framework and no build step. The look is a quiet nature magazine: warm cream paper, deep brown-plum Didone capitals, small rust caps labels, documentary photography. The motion is slow and letter-by-letter: the hero title rises in behind the elephant, the hero photo melts into the paper as you scroll, and each section's type climbs in one letter at a time.

## Media (Higgsfield CloudFront)

- **Hero photo** (2400×1357, ratio 2688:1520): an African bush elephant with long tusks walking through golden savanna grass, soft cloudy sky in the top third. https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/934f4b51-d05b-4498-9c4a-8262f044da66.jpg
- **Elephant cut-out** (transparent WebP of the same elephant, cropped to its bounding box): https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5d850aba-1a5b-44eb-bd6c-cd9f87845be7.webp. In the photo's own frame it sits at left 26.19%, top 30.99%, width 46.5%.
- **Round pill photos** (square):
  - savanna with a small elephant under acacias: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a6ea3433-41c4-46b8-aac3-faefa9ad7558.jpg
  - mother and calf silhouetted at sunset: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9152c213-6763-4147-83f3-b985e6c65a00.jpg
- **Tall portrait** (2:3): an elephant's head in profile with one long tusk on green foliage. https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e665edf0-2b16-4b17-ada1-0b928af1dbfa.jpg

## Type and colour

- **Display:** Bodoni Moda (variable), weight 500, optical size pinned to 11 so the hairlines stay sturdy. All display text is uppercase.
- **Labels and body:** Inter. Labels are 600, 10.5px, tracking .2em, uppercase.
- **Colours:** paper `#ECE3D1`, darker paper `#E6DCC8`, ink `#43282A`, body text ink at 72%, rust `#A86438`, hairlines ink at 16%.
- **Grain:** a fixed SVG fractal-noise layer over everything, multiply blend, 38% opacity.

## 1 · Hero (full viewport)

- **Stage:** a box with the photo's ratio (2688:1520) that covers the viewport (`width: max(100vw, 100svh × 1.7684)`), centred, with `container-type: inline-size`. Inside it, three layers:
  1. the photo (object-fit cover)
  2. the title block
  3. the elephant cut-out, so the elephant's back overlaps the lower part of the letters "PH"
- **Title block:** top 19.2% of the stage, centred.
  - Eyebrow "LOXODONTA AFRICANA" (label style, 0.66cqw).
  - "ELEPHANT" at 9.6cqw, line height .8, tracking .01em.
- **Nav (over the photo):**
  - Left: a two-line menu icon + "MENU".
  - Centre: "Tana Camps" in Bodoni Moda 19px over "EXPEDITIONS" (7.5px, tracking .32em).
  - Right: a search icon + "SEARCH".
- **Map pill:** bottom centre, a cream pill "SEE ON MAP" with a round pin icon and an arrow.
- **Load sequence:**
  - The photo settles from scale 1.06 to 1 over 2.2s.
  - The eyebrow and nav fade down into place.
  - The letters of ELEPHANT rise .18em out of a 10px blur, 95ms apart, left to right.
  - The pill rises in last, at about 1.05s.
- **Scroll (hero melts into the paper):**
  - The stage drifts down at .32× the scroll.
  - A paper-coloured gradient at the bottom grows from 34% to 100% of the hero height and to full opacity by about 60% of a viewport scrolled.
  - Photo and cut-out blur up to 6px. The pill sits under the gradient and disappears with the photo.

## 2 · Statement (full viewport, centred)

- **Label:** rust "ELEPHANTS IN AFRICA".
- **Statement:** three lines of uppercase Bodoni at clamp(40px, 7.2vw, 132px), line height 1.06: "THE ● LARGEST / LAND ANIMAL ● ON / THE PLANET".
  - Each ● is a 0.86em round photo pill sitting inline.
- **Emblem:** below, a 66px rust line emblem: a double ring with an elephant head.
- **Reveal (when 35% visible):**
  - Every letter rises from .55em below with a 4° tilt, 26ms apart in reading order.
  - The pills spring in from scale 0, with an overshoot, while their photo zooms from 1.5 to 1.
  - The emblem turns in from −90° and scale .6.

## 3 · Quick facts (full viewport)

- **Layout:** a 1180px column with a hairline on top and three columns (1.12fr / 1.12fr / .96fr).
- **Left column:**
  - Rust label "ELEPHANT".
  - "QUICK / FACTS / ABOUT / ELEPHANT" in Bodoni at clamp(34px, 4.25vw, 66px), one word per line.
  - An 84px play badge: a ring of 48 radial ticks turning once every 16s, with a play triangle in the middle.
  - The caption "7 MINUTES".
- **Middle column:**
  - A 13.4px paragraph about the bush elephant as a keystone species.
  - A facts table with hairlines. The label is ink and the value is rust, right-aligned:
    - Habitat: Woodland and savanna
    - Scientific name: Loxodonta africana
    - Adult weight: 2,000 – 6,300 kg
    - IUCN status: Vulnerable
- **Right column:** the tall 2:3 portrait. The image inside its frame drifts ±7% with scroll (parallax).
- **Reveal:**
  - The title letters rise like the statement's, 30ms apart.
  - The paragraph and table rise 22px in a stagger, and the rows fade in one by one.
  - The portrait wipes up with `clip-path: inset(100% 0 0 0) → inset(0)` (1.2s) while its image settles from scale 1.25.

## Recorder mode (`?rec=1`)

- **Scroll:** the whole page is translated by a 6.5s Web Animation instead of real scrolling:
  - hold to 1.95s
  - glide to section 2 by 3.35s
  - hold to 4.25s
  - glide to section 3 by 5.55s
  - hold
- **Reveals:** created up front at 0, 2.65s and 4.85s.
- **Scroll effects:** a rAF loop reads the page's current translate and applies the same scroll-linked effects, so a frame-by-frame recorder is deterministic.

## Phone (≤ 760px)

- **Nav:** shows icons only.
- **Hero title:** sits higher (top 17%) at 15.6vw so it clears the elephant.
- **Statement:** 8.6vw.
- **Facts:** stack in one column with the title at 12vw and the photo full width.
- **Overflow:** no sideways scroll.

## Acceptance check (1440×960)

- **On load:** the elephant stands in the grass, and ELEPHANT rises in letter by letter behind its back.
- **First scroll:** the photo blurs and melts into the cream paper, then the statement climbs in letter by letter with the two round photos popping into the gaps.
- **Second scroll:** the quick-facts title climbs in, the table fades up, the portrait wipes in and the badge ticks keep turning.
- **Content:** no real brands or logos.