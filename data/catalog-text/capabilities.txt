# Prompt: Capabilities — amber "Clarity across every layer" section

Build a single-file **capabilities section** for an infrastructure-monitoring product. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is near-black and technical: a mono context strip, a big tight headline with one glowing amber word, and three glass cards, each with a glowing amber holographic wireframe object.

## Scale

- **Units:** measured on an 826×552 artboard. Every length is N × `--u`, where `--u` is the largest uniform "contain" scale, but never under 1px per artboard pixel on narrow, short screens.
- **Spare space:** goes into flexible gaps or taller cards, never letterbox bands.

## Type and colour

- **Page:** `#050505`, with two faint vertical hairline guides at the thirds (white at 3%).
- **Fonts:** **Geist** (variable) for text, **JetBrains Mono** for the top strip.
- **Strip:** 7.2u mono caps, tracking .275em, white at 44%. Left, "01" with a short rule after it; centre "// Capabilities"; right "Full Visibility".
- **Headline:** "Clarity across every layer". Geist at about weight 473, 47.3u, tracking −.05em. "Clarity" is filled with an amber gradient (`#FFC24A` → `#E9931E` → `#A85A0C`).
- **Lede:** "A unified view of your infrastructure. Detect patterns, anticipate issues, and optimize performance before problems arise.", 13.4u at about weight 290, white at 64%.

## Cards

- **Grid:** three columns 16u apart, each card at least 273u tall, radius 4u.
- **Glass:** fill white at 2.1%, a 1u hairline border (slightly brighter on top), a 14px backdrop blur, and a soft amber radial glow (`rgba(190,112,22,.2)` fading out over 135u).
- **Stage** (170u, top of the card) holds the icon. Each icon is an image of a glowing amber wireframe object on pure black, shown with `mix-blend-mode:screen` and a soft radial mask, so only the glow shows:
  1. **Real-Time Signals:** concentric radar rings around a glowing orb, with a small dot on the outer ring.
  2. **Actionable Insights:** thin glowing bar-chart cylinders beside two overlapping wireframe spheres, with three short dashes above.
  3. **Automated Reporting:** a stack of translucent glowing document sheets with text lines.
- **Body:** a 15u title (white at 96%) and two lines at 10.5u (white at 58%):
  1. "Stay ahead with live system data and continuous performance tracking across all nodes."
  2. "Turn complex data into clear decisions with instant, intelligent analysis."
  3. "Generate structured reports that reveal system health at a glance."

## Motion

- **Entrance:** one master Web Animations timeline with backwards fill, run once.
  - The strip items rise, and the rule after "01" draws.
  - The headline rises inside a fixed mask, and "Clarity" fades up.
  - The lede settles.
  - The cards rise in reading order. Each icon performs once: the radar pops in from 72%, the chart wipes up, and the report sheets wipe in from the left.
- **Reduced motion:** no entrance.

## Tablet and phone

- **Tablet:** cards become stacked horizontal panels with the icon on the left.
- **Phone:** stacked cards; the top strip keeps one line.

## Acceptance check (1440×960)

- The amber "Clarity" headline sits over three dark glass cards with glowing amber holographic icons.
- There are no visible black squares behind the icons.
- No brands.