# Prompt: RidgeAI hero

Build a single-file, full-viewport **AI app-builder landing hero** for a fictional company, **RidgeAI** ("ship real apps from a plain idea"). Use plain HTML, CSS and vanilla JS, with no framework and no build step.

## Look and feel

- **Background:** a full-bleed cinematic photograph of snowy alpine peaks at sunrise, with a low sun on the right, a calm blue sky across the upper half, and glowing amber circuit-like light paths tracing the dark forested valleys and converging at the bottom centre.
  - Over it sits a slow looping video of the same scene, where the light pulses through the paths and clouds drift.
  - On top of that are two screen-blended CSS layers: an amber bloom over the valleys that swells and fades (4.6s, alternate), and a soft light band that sweeps across them (6.5s).
  - A faint dark radial shade sits behind the centre copy so white text stays readable over the bright peaks.
- **Type:** **Inter** (variable, self-hosted).
  - headline 400 weight, white
  - nav ink `#2e2e2e`
  - accent amber `#ff8a12` (CTA, send button, "AI" in the logo)
  - prompt placeholder `#9389cf`
  - perk sparkles lime `#8fd61b`
- **Blueprint frame:** thin white lines (`rgba(255,255,255,.28)`) form an architectural grid over the photo:
  - two rails on each side and two horizontal rules
  - small white square handles at the intersections
  - diagonal hatching in two cells, upper-right and lower-left

## Layout (desktop)

Every size is in design units of a **1372×872 reference**, where `u = clamp(.5px, min(max(100vw/1372, .8px), 100vh/872), 2px)`.

1. **Top bar:** a white bar inset 27.8u from the sides and 20.8u from the top, 53.5u tall.
   - **Left:** an amber hexagon logo and the wordmark **Ridge**, with **AI** in amber, in Inter 600, 23.5u, with tight tracking.
   - **Centre:** the links **Product · Templates · Pricing · Changelog**.
   - **Right:** an amber **Start Climbing** button (115×29u, radius 3.4u) with a warm glow beneath it.
2. **Centre column:**
   - **Badge:** a glass pill with a sparkle icon, "Now with multi-agent app builders".
   - **Headline:** two lines at 60u / 61u line-height, **Ship Real Apps / from a Plain Idea.**
   - **Subline:** two lines at 14.9u: "Turn one sentence into a working app with auth, data, and payments. No code / to write. Describe the tool you need and RidgeAI builds, then ships."
   - **Prompt box:** white, 511×112u, radius 6u, with the placeholder "Build a booking app for a salon" and a 31u amber send button with a › chevron. It sends nothing.
   - **Perks:** three items with lime sparkle icons: No credit card required · Free plan available · Live in one click.
   - **Social proof:** five overlapping 34u circular **initial avatars** (MK, JL, AS, RT, EV, each on its own gradient, with white rings), and "Loved by 40,000 builders" under them.

## Motion

- **Entrance:** pure CSS, run once.
  - The bar drops in, then the badge settles.
  - Each headline line rises out of a clip mask, 0.13s apart.
  - The subline settles, then the prompt box with a 1.5% scale.
  - The perks, then the social-proof row, fade up last.
- **Reduced motion:** nothing animates and the still photo shows.

## Smaller screens (< 900px)

- The bar becomes a compact white bar with the logo, the Start Climbing button and a menu button that opens a white dropdown.
- The frame collapses to the two outer rails and two rules, with small hatched corner blocks.
- The copy stacks centred: the headline wraps (clamp 30–58px), the prompt box goes full width, and the perks wrap.

## Media (use these URLs)

- **Background still:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/fab71b48-e739-4ff3-b93a-232b2bb5b74f.jpg` (1920×1086 JPEG)
- **Background loop:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d7dbb9fc-403e-411f-b640-58716b95355f.mp4` (1276×720, 5s, muted, loops, first frame = last frame). Use `object-fit: cover` and the same position as the still so the two align exactly.

## Acceptance check (1440×900)

- **Top:** the white bar sits at the top with the amber CTA.
- **Middle:** the blueprint grid frames the screen, and the centred headline, prompt box, perks and avatar row read clearly over the alpine scene.
- **Bottom:** the amber light paths in the valleys visibly pulse and glow, and a light band sweeps across them.
- **Content:** no real company or person names appear anywhere.