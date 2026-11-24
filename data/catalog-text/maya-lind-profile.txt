# Prompt: Maya Lind profile page (bento)

Build a single-file **personal profile page for a product designer** with a short intro and a bento grid of live cards. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is calm and editorial: warm light grey, off-white rounded cards with hairline borders and soft shadows, tight neo-grotesk type, and one orange accent. Every card has a small piece of quiet, real UI motion.

## Fit: never cropped

- **Stage:** the whole page is drawn on one **1440×960** stage. It's scaled with `transform: scale(min(100vw/1440, 100vh/960))` and centred in a fixed full-window viewport. The intro and the complete grid are always fully visible, with even margins, on any desktop window.
- **Narrow screens (≤820px):** the stage becomes a normal column (intro, then the cards stacked full width) and the page scrolls.

## Media

All photos are generated and contain no logos.

- **Avatar (440×440):** a woman with dark tied-back hair in a black jacket, on a flat orange backdrop. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/60582a62-dbab-4bc1-9169-07db0fcb51b1.jpg`
- **Album cover (500×500):** a single pink gerbera on a soft pink ground. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/ed0c3ef0-5a75-4933-9f3c-6afbea39e2ec.jpg`
- **Book (503×700):** a red hardcover, "THE PATIENT BUILDER / ADA MARSH", on white. It's shown with `mix-blend-mode: multiply` so the white drops out on the card. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b820bd2c-7312-4ac3-8162-76f6d97d4de4.jpg`
- **Football photo (960×645):** a coach kneeling with a ball among kids in red kits on a pitch. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9f4e5ca0-844d-4c0a-8665-5cc5024e3281.jpg`
- **Map (960×645):** a very light grey street map of Lisbon with the estuary. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f3be2d6-3848-493b-b3d7-5880dac21a63.jpg`

## Type and colour

- **Type:** Inter (variable, self-hosted).
  - Headline 39.5px / 46px, weight 520, tracking −0.021em.
  - Bio 20.5px / 31px.
  - Card titles 15.5–29px; chips 12.5px.
- **Colours:**
  - page `#EEECE8`, cards `#F5F3EF`, hairlines black at 7%
  - ink `#1E1C1A`, secondary `#77736E`, muted `#A7A39D`
  - chips `#E9E6E1`, orange `#EE6A1F`, green `#3BC45E`, dark segment `#2A2624`

## Layout (stage pixels)

- **Avatar:** 145px square at (136, 82), radius 11.
- **Headline** at (321, 92), 900px wide: "Hi I’m Maya Lind — I’m a Product Designer at / Fieldnote." followed by " Previously at Orbit." in the muted colour.
- **Bio** at (321, 203), 790px wide, two lines: "I am a seasoned product designer with 5 years of experience specializing in / crafting creative tools solutions and empowering creatives."
- **Voice-note pill** at (321, 287), 495×53, fully rounded, a white-ish fill with a hairline border:
  - a 29px orange round play/pause button
  - 78 waveform bars, 2px wide, with seeded heights and two loud bursts
  - a timer, right-aligned
- **"Available for Work" pill** at (841, 287), 174×53: a green dot with a pulsing halo.
- **Grid:** cards with radius 14, gaps of 17px, outer margins of 76px.
  - **Row 1** (top 390, height 258): Experience 370px · What I’m listening 513px · What I’m reading 371px.
  - **Row 2** (top 665, height 242): Map 370px · Photo 330px · How I work 554px.
- **Chips:** each card has a small rounded label at its top left (line icon plus text): "Experience", "What I’m listening", "What I’m reading", "Map", "How I work".

## Cards

- **Experience:** a vertical timeline with a 1.5px dark line, 8.5px dots, a title at 15.5px and the years in muted grey.
  - Items: Studio Kettle & Co (2020 – 2023), Product Designer (2020 – 2023), Freelance (2023), Orbit — Design Lead (2018 – 2020), Fieldnote — Product Designer (2023 – now), Speaker, Form Conf (2024).
  - The list is doubled and drifts upward at 9px/s, inside a top/bottom fade mask, as a seamless loop.
- **What I’m listening:**
  - Album 165×173 on the left.
  - "SLOW BLOOM" at 18px weight 500 and "Juno Vale" in muted grey.
  - A 243px progress bar (3.5px) with a dark fill and an mm:ss time that advances from 00:34 through a 3:12 track.
  - Prev / play-pause / next and a volume icon; play-pause toggles.
- **What I’m reading:** "The Patient Builder" at 25.5px / 35px, "Ada Marsh" in muted grey, and the book at the right, tilted 5° and bleeding to the bottom edge.
- **Map:** the map fills the card with an 11px inset, radius 9. "Lisbon" sits centred at 27px in grey, with a small "Lisbon" label at the bottom left.
- **Photo:** the football photo inset 11px, with a white pill at the bottom left reading "I love teaching football" with a small orange ball icon.
- **How I work:** a title at 29px, a body at 15px, and a 40px segmented control (Step 01–04) with a dark sliding pill.
  - Steps:
    1. **"01 Discovery Call":** We will make a 30 minutes free consultation so that I can get to learn about your specific needs and come up with a plan.
    2. **"02 Strategy & Scope":** Together we turn what we learned into goals, a clear scope and a timeline, so everyone knows what success looks like.
    3. **"03 Design Sprint":** I explore, prototype and test in focused weekly cycles, sharing progress often so feedback lands early.
    4. **"04 Handoff & Support":** You get polished files, specs and a walkthrough for your team, plus a month of support after launch.
  - It auto-advances every 1.9s, with a 0.42s cubic ease. The pill slides, the outgoing text rises out and the incoming text rises in. Clicking a step holds it for 6s.

## Motion: one clock

- **Clock:** all motion reads one clock, the `currentTime` of a long Web Animation on a hidden element, inside a single `requestAnimationFrame` loop. A frame-by-frame recorder that pauses and seeks Web Animations therefore captures it exactly.
- **Entrance:** each block rises 14px and fades in over 0.7s with a cubic ease, staggered 80ms in DOM order.
- **Voice note:** it starts at 1.3s and plays for 32s.
  - The button shows pause, and the timer counts from 0:00.
  - Bars left of the playhead turn dark, and bars near the playhead gently bounce (scaleY up to +55%).
  - The button toggles play and pause.
- **Available dot:** a halo scales from 1 to 2.4 and fades out every 1.8s.
- **Cards:** on hover they lift 3px with a deeper shadow.
- **Reduced motion:** everything is shown settled and static.

## Acceptance check (1440×960)

- The intro and all six cards are fully visible, with even margins; nothing is cropped.
- Within 6.5 seconds:
  - the page rises in
  - the voice note plays with a moving playhead
  - the song time ticks
  - the experience list drifts
  - How I work changes from 01 to 02 to 03
- **Content:** no real brands, people or logos.