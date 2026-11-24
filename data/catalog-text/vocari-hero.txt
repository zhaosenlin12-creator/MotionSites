# Prompt: Vocari AI assistant hero

Build a single-file, one-screen **landing hero for a fictional voice-AI platform, Vocari**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a deep navy night sky that glows into bright cyan at the horizon. A pixel-dot audio equaliser rises from that glow, and in front of it sits a dark side-profile silhouette of a man with curly hair, with two small floating UI cards.

## Media

- **Background gradient:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/35281788-af1d-4637-b2bf-24ebe55f11bb.png` (745×194). Navy #09131F at the top, through teal, to cyan #46DCEC and then white at the bottom.
  - The page uses it as a 3-slice: the top rows are anchored at the top, the middle row stretches, and the bottom rows are anchored at the bottom with a 40px feathered join.
- **Silhouette:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b5703dce-12a2-4177-8b07-8c158121d986.png`, a transparent PNG of a young man with thick curly hair and a beard in right-facing side profile. It's one flat navy-black shape (#0A0F15).
  - It's centred slightly right of the middle, rising from the bottom edge, with its head overlapping the equaliser.
- **Equaliser:** an inline SVG of about 2,000 small square dots in columns of different heights, spanning the full width. The dots are cyan to pale cyan and fade into the white glow.

## Type and colour

- **Headline:** a light, condensed serif at weight about 330, around 82px: "Create reliable AI assistants / for daily challenges", in white.
- **Subline:** a grey-blue sans line: "Vocari improves LLMs with business logic for reliable AI conversations."
- **Buttons:** a warm-cream "Book a Demo" and a dark glass "Try Now".
- **Nav:** the logo (a cyan rounded tile with three dark bars) and "Vocari" at the left; "Products ⌄ · Developers · Resources · Use Case" in the middle; a two-line burger at the right.

## Cards (foreground)

- **"Create Agent" card:** on the left over the silhouette's neck. A pale cyan-tinted glass card with the logo, "Create Agent", a "Select model ⌄" field and a dark teal "Deploy" button with cyan text.
- **Chat card:** on the right. A dotted light-grey card with tool icons, a dark navy bubble ("Metro Suites Phase II is under construction, completion by Q4 2025."), an input reading "What is most ROI…", a send icon and a round dark mic button.

## Motion

- **Entrance (about 1.6s):** the nav and headline settle, the equaliser fades in, the silhouette rises 14px, and the cards slide in.
- **Live voice (starts about 1.1s in, loops forever):** the dot equaliser behaves like someone speaking.
  - **Columns:** each column of dots grows and shrinks from its own (slanted) baseline, snapping to whole dots. It can reach up to 4 dots taller than its resting height; new dots take the row colour of the nearest column.
  - **Speech rhythm:** phrases of 1.6–2.8s separated by 0.2–0.5s pauses. Within a phrase, syllable bursts come at about 6 per second with varying strength, and a slow spectral wobble gives each column its own band.
  - **Ripple:** the voice ripples outward from the speaker's head, so columns further from the centre react a little later.
  - **Mic:** the chat card's mic button gets a soft cyan ring and glow that swell with the same voice level.
  - **Timing:** everything is a pure function of the page clock (a long Web Animation used as the time source for requestAnimationFrame), so it can be recorded frame by frame.
- **Reduced motion:** no entrance and no live voice; the equaliser stays static.

## Phone

- **Headline:** stacks into three lines.
- **Silhouette and equaliser:** scale down, with the cards overlapping the bottom of the silhouette.

## Acceptance check

- **Glow:** the navy-to-cyan glow and the equaliser read clearly, with the curly-haired profile centred over them.
- **Voice:** the equaliser visibly talks: columns bounce in syllable bursts with short pauses, and the mic ring pulses with them.
- **Content:** no real brands.
