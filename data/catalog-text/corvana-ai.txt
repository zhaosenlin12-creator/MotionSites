# Prompt: Corvana AI hero

Build a single-file, one-screen **landing hero for an AI copilot that runs clinic front desks** for a fictional company, **Corvana AI**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. It's bright, clean and warm: a white page, a coral accent, a pixel-art heartbeat line running behind the main button, and a strip of three tall rounded panels (a laughing patient, a check-ins chart and a patient-trust widget over a coral peony).

## Type and colour

- **Type:** a tight neo-grotesk (Inter / Inter Display style) for everything, self-hosted woff2 at 400/500/600. The headline is 500 weight with very tight tracking (about −0.045em).
- **Page:** white `#FEFEFE`, ink `#000`, nav ink `#3A3C40`, muted `#5E6064`.
- **Accents:** coral `#F8533F`, announcement coral `#FA6E5C`, data violet `#7A5CF0`, chip lavender `#F1EDFE→#E8E2FD` with violet text `#6A4CEB`.

## Scaling

- **Desktop:** the composition is authored in reference px of a **1514×1039** artboard: `--u = min(100cqw/1514, max(100svh/1039, .68px))`, centred.
- **Below 1024px wide or portrait:** the page re-flows into one locked screen with real px and a swipeable panel strip with dots.

## Layout (desktop, reference px)

1. **Announcement bar:** coral, 38px tall. "30% off for all new clinics." plus the underlined link "CLAIM THE DEAL NOW".
2. **Nav:** white, 68px, with a hairline bottom border.
   - **Left:** a blue-violet gradient "V" mark and "Corvana AI".
   - **Centre:** Care (current, bold) · Features · Clinics · Customers · Careers.
   - **Right:** a light-grey "Watch a Demo" pill.
3. **Headline:** two centred lines, about 72u, **"The AI Copilot Made For Calmer / Clinical Coordination"**.
4. **Subline:** about 22.4u / 31u, two lines: "From first check-in to aftercare reminders, take over routine tasks / and paperwork while giving every patient a warm welcome."
5. **Main button:** a 233×71.5u glass ring (translucent white, hairline border, soft drop shadow) around a black pill, "Start Your Trial", 22u.
6. **Heartbeat field:** behind the button, a pixel ECG trace spans the whole 1514u width.
   - **Pixels:** 6.2u squares on a 9.6u grid, coral `#F8533F` with lighter `#FB7565` baseline dots.
   - **Shape:** the baseline sits 9u below the button centre. Four heartbeats at −462, −225, +231 and +468u from centre each have a small P bump, a Q dip, a tall R spike (≈60u up), an S drop (≈47u down) and a T bump. Draw every spike as a vertical pixel staircase.
   - **Ends:** the baseline thins to sparse dots and fades toward both ends.
7. **Panel strip:** 1313.5×429.5u, radius 16, three columns 436.5 / 425.5 / 436.5u with 7.5u gaps.
   - **Patient panel:** a laughing older woman with wavy silver hair, gold hoops and a coral knit sweater, on a smooth **mint-green → pale sky-blue studio gradient**.
     - Still: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c43c6772-ae79-45f3-a2ff-90a401f03b48.webp
     - Loop on top: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/39c69b84-0ac5-485f-ae42-3bd7d521989e.mp4` (960×960, 5s, muted, loops; first = last frame). She laughs, her shoulders shake, and her hair sways.
     - The loop is the portrait mirror-padded 47/1208 on each side to a square. Lay it at **107.78% width, left −3.89%, full height** over the 1208:1302 portrait frame so it aligns exactly. Fade it in once it is playing.
   - **Metric panel:** `#EAEAEA` with a white 339×316u card.
     - **Text:** "Check-ins Completed" with a › button, "18.7" (50u, 600) with a small "K", and a lavender chip "+21.3%" followed by "vs Prior Week".
     - **Chart:** a violet line `#7A5CF0` and a coral line `#F8533F` rise left to right. The coral end has a filled dot with a soft ring, the violet end has a ringed dot, there's a grey drop line, and a row of grey tick marks runs along the bottom.
   - **Peony panel:** a macro of ruffled coral peony petals filling the whole panel: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b6730025-6d74-465e-8978-f9909c47095a.webp.
     - **Trust card:** a frosted 292×241u card, "Patient Trust Rating", "98%" (44.5u, 400), a symmetric violet bar-wave meter and "Wonderful".
     - **Avatars card:** a white 66.5u card below it, with three overlapping rounded-square avatars, "62K+" and "Clinicians Onboarded".

## Motion

- **Entrance:** one Web Animations timeline behind an `entry-pending` class, with a failsafe.
  - The bar text, the logo, the nav links (55ms stagger) and the demo pill rise in.
  - Each headline line wipes up out of a clip mask, then the subline.
  - The glass ring fades in and the black button rises.
  - The metric card and the right stack rise. The chart ticks fade, the two lines draw in with stroke-dashoffset, then the dots pop, and the bar-wave opens from the centre.
- **Heartbeat trace:** loops forever. Each pixel has `--t` = its x-fraction, and a 3.2s linear animation delayed by `--t`. A bright head sweeps left → right like a monitor, and pixels settle to 58% opacity behind it.
- **Hover:** the black button lifts 1px with a deeper shadow, and the › button gets a grey disc.
- **Reduced motion:** no entrance, no sweep, no video.

## Acceptance check (1440×900)

- **Above the strip:** the coral bar, the nav, the two-line headline, the subline and the glass-ringed black button. The heartbeat line runs edge to edge through the button row, with four spikes and a moving bright trace.
- **Panel strip:** the woman laughs in motion on the mint-to-sky gradient, the chart has coral and violet lines, and the peony panel holds the trust card and the avatars card.
- **Content:** no real company names anywhere.