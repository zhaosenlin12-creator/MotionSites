# Prompt: Elo One results section

Build a single-file **case-study results section for a fictional growth agency, Elo One**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a bright near-white page with a bold centred headline and three tall result cards in sunset orange tones. One card is burnt ember, one is bright tangerine and one is deep rust. Each card has big stat numbers and a warm photo of the client's business, framed by stacked "paper" layers.

## Media (3:2 photos, cover-fitted in the lower part of each card)

- **Hotel Mira:** an alpine chalet hotel at sunset with glowing windows. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c42a7f3d-d802-4377-8cc6-9c209cdfad5f.webp`
- **Nordhaus Estates:** a warm real-estate showroom with an architectural model. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d469e4d7-94ba-4457-ad51-b589766069f0.webp`
- **Studio Belle Peau:** a candle-lit spa treatment room. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e791074d-795e-4b42-ad94-a6b113ecb72d.webp`

## Scale

- **Frame:** the desktop layout is one 838×527 reference frame, with `--u = min(100vw / 838, 100dvh / 527)`.
- **Portrait tablets:** two columns.
- **Phones (≤ 640px):** one column, with `--u = min(100vw / 400, 1.4px)`.

## Type and colour

- **Font:** Lexend (300/500/600, embedded as "EloLexend").
- **Colours:**
  - page `#FDFDFD`
  - ink `#000`
  - lead text `#2B2B2B`
  - brand `#B8460F`
- **Card backgrounds:**
  - Card 1: a radial gradient from `rgb(176,64,18)` to `rgb(46,13,4)`.
  - Card 2: a linear gradient from `rgb(236,96,28)` to `rgb(250,150,56)`.
  - Card 3: a radial gradient from `rgb(132,52,22)` to `rgb(24,9,5)`.

## Layout

- **Headline:** "How businesses achieved measurable / results with Elo One", Lexend 600 at about 22u, centred. Each word is its own span for the entrance.
- **Lead:** two lines in Lexend 300: "Our clients come from very different industries, but the goal is always the same: measurable results. The projects below show the results that are actually possible."
- **Cards:** three cards of about 240 × 270u with a 10u radius and 9u gaps.
  - **Top:**
    - the client name in white 600
    - a one-line outcome
    - a small white line monogram top right: mountain, house or lotus
  - **Stats:** two big stats side by side, divided by a thin white rule:
    - Hotel Mira: "Regional visibility boosted", +240% more website visitors, +180% more direct inquiries
    - Nordhaus Estates: "Leads multiplied", +663% more online leads, +32% more organic traffic
    - Studio Belle Peau: "From invisible to fully booked", +362% more qualified leads, +75% more online bookings
  - **Photo:** at the bottom, sitting on two or three offset translucent "paper" layers that peek out above it.
- **Button:** a white pill with a soft border, "View more projects", centred below.

## Motion

- **Entrance:** a one-time CSS sequence:
  - the headline words rise in a stagger
  - the lead fades in
  - a thin rule draws
  - the cards rise 18u in a 120ms stagger
  - the button fades up last
- **Hover:**
  - Cards lift 3u, and their paper layers fan out slightly.
  - The button darkens its border.
- **Reduced motion:** static.

## Acceptance check (1440×960)

- A bold black headline sits above three warm orange cards of different tones, with photos that read clearly.
- The cards have even margins and a centred button.
- **Content:** all copy is in English, and there are no real brands or logos.