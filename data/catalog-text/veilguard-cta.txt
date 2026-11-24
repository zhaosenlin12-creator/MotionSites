# Prompt: VeilGuard AI communication firewall hero

Build a single-file, one-screen **hero for a fictional AI compliance company, VeilGuard**. Use plain HTML, CSS, inline SVG and vanilla JS, with no framework and no build step. The look is near-black with a sweeping violet and magenta light ribbon arcing across the frame. A bold white headline is left-aligned, and on the right a dark glass card shows a "firewall" flow: Email, Doc and Post inputs pass through a shield hub and come out marked "Clean".

## Media

- **Background:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/14718e72-5eb9-4186-a0c5-2339094b274d.webp`. Glossy violet, pink and electric-blue light bands sweeping in an arc from the left edge to the upper right, over black. It covers the whole frame.

## Scale

- **Frame:** a 1586×992 reference frame, with `--u = min(100vw / 1586, 100svh / 992)`.
- **Desktop (≥ 900px wide, ≥ 600px tall, landscape):** the copy is left-aligned at 133u, and the flow card sits on the right. Both are vertically centred with flexible spacers.
- **Phones and portrait tablets:** everything is centred and stacked: the headline, the buttons, then the flow card.

## Type and colour

- **Fonts:**
  - **Inter Display** 700: the headline
  - **Inter** 400/500/600: everything else
- **Colours:**
  - page `#060607`
  - sub text `#D6D7E6`
  - badge text `rgba(232,226,250,.74)`
  - cyan `#08CFFE`
  - card `rgba(24,25,26,.8)`
  - pills `rgba(59,61,65,.62)`
  - "clean" pills `rgba(12,60,82,.62)` with a cyan edge
  - lines white at 42%

## Layout (desktop)

- **Nav:**
  - Left: a shield mark with a check, flanked by two short dashes, and "VeilGuard".
  - Centre: "Platform ⌄ · Solutions ⌄ · Developers · Company ⌄".
  - Right: a white "Sign In" pill.
- **Headline:** "The AI / Communication / Firewall", three lines at 78u on an 86u line.
- **Sub:** about 560u wide: "Check every email, document, and post against your policies while people write. Fix problems before send. Generate exam-ready evidence automatically."
- **Buttons:**
  - a white "Get Demo" pill with a black circular ↗ chip
  - an outlined "Watch Demo" pill
- **Badge:** a small ring icon and "BUILT BY FORMER SECURITY AND COMPLIANCE LEADERS." in spaced caps.
- **Flow card:** right side, about 470u tall, scaled to .8 and anchored right.
  - **Inputs:** three grey pills with icons (Email, Doc, Post).
  - **Connectors:** they join into a white rounded shield tile at the centre.
  - **Outputs:** the tile fans out to three cyan "✓ Clean" pills.
  - **Stem:** a thin vertical line runs down from the hub, clipped by the card.

## Motion

- **Entrance:** a one-time Web Animations sequence of about 1.8s:
  - the nav fades in
  - the headline lines rise and unblur in a stagger
  - the sub, the buttons, then the badge
  - the flow card fades in, its connector lines draw left to right, the hub pops, and the Clean pills light up in sequence
- **Hover:**
  - Pills brighten.
  - The hub tile glows.
  - "Get Demo" lifts and its chip rotates.
  - "Watch Demo" fills faintly.
- **Reduced motion:** static.

## Acceptance check (1440×960)

- The violet light ribbon arcs behind a left-aligned three-line headline.
- The firewall flow card sits on the right with its lines contained, with even margins and no overlap.
- **Content:** no real brands or logos.