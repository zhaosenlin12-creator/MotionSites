# Prompt: Mindora mental-health hero

Build a single-file, one-screen **hero for a fictional AI mental-health app, Mindora**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is "forest quiet": a pale sage page washed with soft sunlit fern shadows, a calm serif headline, a dark moss pill button, and three frosted-glass health cards that each hold a photo of a person resting in a sunlit forest.

## Media

- **Background:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/91ff1b55-9dec-43eb-8da7-329815e2f52a.webp`. A pale sage wash with blurred fern fronds and dappled light at the left and right edges, and an empty, soft centre for the copy. It covers the whole page.
- **Card photos** (1214×1295 each, cover-fitted):
  - Sleep: a woman with closed eyes, resting in warm forest light. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/765542c8-b963-46be-9449-d9c5536889c1.webp`
  - Biomarkers: a man in an olive tee among ferns. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/ccb0662a-dc37-4d0f-9120-244a0e16cd7b.webp`
  - HRV: a woman with her head tilted back, eyes closed, breathing in sunlight. `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/dd81f02a-0640-48db-9d47-868c0810b4cd.webp`
- **Fallback:** keep a soft green gradient behind each photo until it loads.

## Scale

- **Units:** every desktop size is in reference pixels of a 1440px frame, multiplied by `--u = max(min(100cqw / 1440, 100svh / 1032), 100cqw / 1440 × .72)`, so the hero always fits one screen.
- **Tablet and portrait:** under 900px wide, or any portrait ratio, the cards reflow into a scrollable row.
- **Phone:** under 560px, `--u` is 1px and the cards stack in one column.

## Type and colour

- **Fonts:**
  - **Brygada 1918:** the headline
  - **Poppins:** body and UI
  - **Urbanist:** the card numbers and labels
- **Colours:**
  - ink `#28311F`
  - button `#2C3A22`
  - page `#EEF0E4`
  - bars: a pale green gradient `#A9D18E`

## Layout (1440 frame)

- **Nav:**
  - Left: a small sun mark (a circle with eight short rays, drawn in SVG) and "Mindora".
  - Centre: "Home · About Us · Benefit · Community".
  - Right: a dark moss "Contact Us ↗" pill.
- **Headline:** "Smarter Mental Health, / Powered by AI", centred, Brygada 1918 at about 52u.
- **Sub:** two lines in Poppins: "Get instant mental health insights, personalized advice, and / virtual care, anytime, anywhere."
- **Button:** a dark pill, "Get Started Today ↗".
- **Cards:** three cards along the bottom, about 330 × 360u with a 24u radius and 34u gaps. Each card is a frosted-glass frame (blur, a faint green tint and a thin white inner border) around its photo.
  - **Sleep:** "Sleep", seven thin white percentage bars with day letters (64, 74, 57, 78, 68, 56, 65%), and the note "Your HRV was within the typical range (35 – 40)".
  - **Biomarkers:** a glass chip reading "10.8 g/dl", "BORDERLINE LOW", "Ferritin · Blood Iron".
  - **HRV:** a translucent white area chart (37, 36, 29, 35, 27, 45, 40) with day letters and the same range note.
  - **HRV photo crop:** anchor it at 50% 8% so the head is never cropped.

## Motion

- **Entrance:** a one-time Web Animations sequence of about 1.6s. It runs once the fonts are ready, with a failsafe.
  - The nav fades down.
  - The headline lines rise and unblur.
  - The sub, then the button.
  - The three cards rise in a 120ms stagger.
  - The sleep bars grow from zero, and the HRV line draws in.
- **Hover:**
  - Cards lift 4u and the glass brightens slightly.
  - Buttons lift 1px and the arrow nudges.
- **Reduced motion:** everything is static.

## Acceptance check (1440×960)

- The serif headline sits centred in the soft fern-shadow light.
- Three glass cards with forest portraits sit along the bottom with even side margins, and no faces are cropped.
- **Content:** no real brands or logos.