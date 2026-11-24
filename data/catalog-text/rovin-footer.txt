# Prompt: Rovin "Chrome Orbit" footer

Build a single-file, one-screen **footer for a fictional travel-money app, Rovin**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is near-black with a huge glossy chrome sphere of stacked rings lit with ice-blue rim light. The sphere fills the lower right. Above it is a giant two-tone headline, footer link columns sit on the left, and three small frosted-glass feature cards float over the sphere.

## Media

- **Art:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/6e8f5228-3a76-453d-a3de-610a8f8cfc09.webp` (1596×986). A black chrome, ribbed sphere seen from below-left, with electric blue light along its ridges, on black. It fills the whole frame and is anchored bottom right.

## Scale

- **Frame:** one 1596×986 frame, with `--u = min(100vw / 1596, 100vh / 986)`.
- **Tablet and portrait (under 1024px):** a stacked layout with the art behind.

## Type and colour

- **Fonts:**
  - **Golos Text** (400–900): the headline
  - **Reddit Sans** 400/600: the UI
- **Colours:**
  - page `#111`
  - body text `rgb(212,212,212)`
  - card text `rgb(214,226,246)`
  - card fill `rgba(20,30,52,.62)`, with borders `#3A5EA8` and `#2F4F8F`
  - badge `rgba(28,44,78,.7)`

## Layout (1596 frame)

- **Headline:** "Your Passport to see / the World", centred at the top, about 104u.
  - Line 1 is a white-to-pale-blue gradient.
  - Line 2 is a muted slate-blue gradient.
- **Link columns** (left, about 40% down):
  - "Legal": Privacy Policy, Terms of Service
  - "Our Address": 14 Quay Street, Leith / EH6 6LX, UK
  - "Rovin": Travel Cards, Global Wallets
- **Certification:** below the columns, "We are certified by:" and "The Payment Card Industry / Data Security Standard". Under it, a glass badge with a blue shield icon and "SECURE / CERTIFIED".
- **Feature cards** (over the sphere's right flank): three small glass cards with an icon and two lines each, slightly rotated and offset like a loose stack:
  - "Global Physical and / Virtual Cards" (card icon)
  - "Local and / International payment" (arrow icon)
  - "Travel and Lifestyle / friendly features" (check icon)

## Motion

- **Entrance:** a one-time sequence of about 1.8s:
  - the headline unveils with a clip-and-rise
  - the link columns settle in from below
  - the three cards arrive with a small tilt in a stagger
  - the trust badge reveals last
- **Hover:**
  - Links brighten.
  - Cards lift and straighten slightly, and their border brightens.
  - The badge border glows blue.
- **Reduced motion:** static.

## Acceptance check (1440×960)

- The chrome sphere glows blue in the lower right under the giant two-tone headline.
- The links and badge read cleanly on the left, and the three glass cards float over the sphere without covering the headline.
- **Content:** no real brands or logos.