# Prompt: Vexor signup CTA and footer

Build a single-file **signup call-to-action with a footer for a fictional global payments company, Vexor**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is pure black with one framed CTA card filled with slowly swirling coral and crimson smoke, a white headline, a dark waitlist input with a coral button, and a minimal footer underneath.

## Media

- **Still plate:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/03c58212-3a59-4c80-b19d-30d05a174563.webp`. Abstract coral, pink and crimson smoke on black, densest on the right and fading to black at the upper left, behind the copy.
- **Loop video:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f6f4ec49-d5dd-4893-8eb4-fa0f932aceaf.mp4` (5s, muted). The same smoke curling and drifting. Its last second crossfades into its first, so it loops without a jump and never plays in reverse.
- **Video behaviour:**
  - It covers the plate inside the card (object-fit cover, anchored right bottom) at 80% opacity.
  - It fades in on `loadeddata`.
  - It is hidden for reduced motion.

## Scale

- **Units:** desktop sizes are in reference pixels of a 1440 frame (`--u = 100cqw / 1440`). The card also respects the height (`--v = min(100cqw / 1240, 100dvh / 720)`), so it fits one screen.
- **Tablet and phone:** they use their own reference boxes (768×700, 768×612 and 390×655) and stack the footer.

## Type and colour

- **Font:** Inter (variable 100–900, embedded as "Inter Vexor").
- **Colours:**
  - page `#000`
  - text white
  - placeholder `#808081`
  - input fill black with a 15% white border
  - accent gradient `#FF8A73` → `#F0605A`
  - card border: a coral gradient (`rgba(244,118,104,.67)` → `.29`)
  - dividers white at 20%

## Layout (1440 frame)

- **CTA card:** about 1380 × 340u with a 20u radius.
  - **Headline:** "Get your Vexor Account", centred, about 34u, semibold.
  - **Sub:** two lines: "Join 200+ businesses like yours, powering their global / transactions with Vexor."
  - **Waitlist field:** a pill (about 460u wide) with the placeholder "Enter your email to join the waitlist" and an inset coral "Get Free Access" pill button with a soft inner highlight.
- **Footer** (below the card, same side margins):
  - Left: a three-slash "W"-like Vexor mark and a four-line paragraph: "Get paid for free from countries in the EU, Asia, and the US. There are no deposit charges. Create an account in your preferred currency and share the details to get paid. We make it easy to go international."
  - Right: "Contact Us", then "+44 20 7946 0321", then "Vexor Labs Ltd, / 12 Harbour Row, / Bristol BS1 5TT, UK".
  - A thin rule, then "Copyright © Vexor Labs. 2025. All Rights Reserved." and "Email us: hello@vexor.example".

## Motion

- **Entrance:** a one-time CSS sequence of about 1.4s:
  - the card rule draws
  - the title rises
  - the copy fades
  - the form expands from its centre, then the button pops
  - the footer mark fades last
- **Hover:**
  - The input border brightens.
  - The coral button lifts 1px and glows warmer.
  - The phone and email links underline.
- **Reduced motion:** static, with no video.

## Acceptance check (1440×960)

- A framed card of moving coral smoke with a centred white headline and waitlist pill.
- A clean two-column footer below, with even margins.
- **Content:** no real brands or logos.