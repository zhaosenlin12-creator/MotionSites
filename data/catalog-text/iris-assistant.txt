# Prompt: AI Assistant — Glass Iris chat dashboard

Build a single-file, one-screen **AI assistant chat dashboard** for a personal-finance app. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is near-black with a cool electric-blue light falling from the top centre onto a living glass orb. The orb is a clear glass sphere with a swirling blue-violet core that slowly turns and pulses in a looping video.

## Scale

- **Units:** every length is in reference pixels of a 1440×1008 artboard, multiplied by `--u = min(100vw/1440, 100dvh/1008)`.
- **Fill:** the rail, top bar and hero stretch into any spare space, so there are never letterbox bands.

## Type and colour

- **Font:** Inter Tight 400/500/600.
- **Colours:** page `#0E0E0E`; tiles and surfaces `#151515` to `#1D1D1D`; text white, with greys `#8C8C8C` and `#6E6E6E` for secondary copy.
- **Top glow:** a radial `rgba(64,110,255,.78)` above the hero centre, a violet `rgba(124,72,240,.42)` lobe to its right, and a faint cyan lobe to its left.
- **Accents:** blue `#2F6BFF` to violet `#5A4CF5`.

## Shell

- **Left rail (48u):** a white logo tile, then grouped 32u icon tiles, with a user tile and a settings tile at the bottom.
- **Top bar:** a back tile, a forward arrow and breadcrumbs "Home › AI Assistant".
  - **Right side:** a glass search field "Search Anything..." with cool blue-grey text, a bell, and an avatar.
- **Under the top bar:**
  - **Left:** a segmented toggle, "Chat Mode" (white, active) / "Overview".
  - **Right:** a glass status pill, a blue dot, "AI Agents Running" and a count badge "17".

## Hero (centred column, 708u wide)

- **Orb:** a 145u square layer with a −30.5u margin, so it occupies the same space as an 84u orb. A still plate sits under a muted, looping, inline `<video>`; the video fades in on `loadeddata`. A radial mask (solid to 61%, clear at 76%) melts the plate's black into the page.
- **Text:**
  - "Good Morning, Jason" in grey 17u.
  - "WHAT'S ON YOUR MIND?" in white, 30u, uppercase, weight 500.
  - "Get personalized financial insights, smarter recommendations."
- **Composer:** 114u tall, `#151515`, 14u radius, with a 1.2u gradient hairline border running blue → indigo → violet → blue.
  - **Input:** "Ask Anything...".
  - **Chips:** +, Normal ▾, Deep Think ▾, then Voice and a blue-to-violet gradient send button.
- **Three quick-action cards:**
  - Smart Budget Plan / Create My Budget, with a blue icon.
  - Set a Saving Goal / Set a Goal, with a violet icon.
  - Track My Expenses / Monitor Spending, with an indigo icon.
- **Recent Conversations:** a tree line with four questions and their times, fading out downwards, then "See More →".

## Motion

- **Entrance:** one Web Animations timeline.
  - The rail tiles and the top-bar items rise in.
  - The orb opens with a circular clip and scales from .92 to 1.
  - The greeting appears, then the headline words rise out of masks.
  - The subline, composer and cards settle in, then the history.
- **Orb video:** a 4s loop of the glass orb slowly rotating, its core pulsing and light refracting through the glass. The end crossfades into the start, it has no audio, and it is hosted on a CDN.
- **Reduced motion:** no entrance and no video; only the still plate shows.

## Tablet and phone

- **Tablet:** the layout reflows with fluid units.
- **Phone:**
  - The top bar wraps into two rows.
  - The quick-action cards stack as full-width rows.
  - The conversation times move under their questions.

## Acceptance check (1440×960)

- The glowing blue glass orb sits centred under a blue light from the top, with no visible square around it.
- All warm and red accents are now blue or violet.