# Prompt: Vaultra crypto finance hero

Build a single-file, one-screen **landing hero for a fictional crypto finance platform, Vaultra**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a black night with a huge dotted particle globe rising from the bottom. Its rim glows red, blue and magenta, and it **slowly spins**. Thin straight light lines and small glass coin chips cross the dark sky, and a large gradient headline sits on top.

## Media

- **Globe still:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f1631235-0a76-464d-8f1d-2c4b48a997d5.jpg` (1672×941). The dotted particle globe with latitude rings and coloured rim glows, plus the thin diagonal lines and nodes.
- **Globe video:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e71aea27-a808-4ae3-8231-a469d49285d4.mp4` (1280×720, 4s, muted, loops). The same globe rotating steadily left to right, with its particle rings sliding and its rim glows shimmering. The camera is still and the lines don't move.
  - The last second crossfades into the first, so it loops with no jump and never plays in reverse.
  - It sits over the still with identical geometry and fades in once its first frame is ready.
- **Masks:** both layers stretch to a plate that covers the hero. They're feathered at the sides on ultra-wide screens and at the top on phones.
- **Rule:** nothing in the scene is drawn or animated in code.

## Type and colour

- **Headline:** Inter Display 300, about 66px: "Innovative Crypto Financial Solutions / For Any Investment Challenge". It's white with a soft pink-to-lilac gradient at both ends.
- **Body:** **Poppins** 400/500 for the nav, buttons and body text.

## Layout

- **Nav:**
  - "Vaultra" with a double-slash logo mark at the left
  - "Home" (active, with a round icon) · Invest · Communit · Blog · For business · Membership
  - an "EN ⌄" globe selector
  - a white "Sign up" pill and an outline "Log In" pill
- **Centre:**
  - a small glass pill "⚡ Revolutionizing Crypto Finance"
  - the headline
  - "We Don't Just Focus On Investments, We Cover Your Entire / Financial Ecosystem, From Budgeting To Retirement."
  - a white "Get Started →" pill
- **Coin chips:** small round glass chips (₿, Ξ, ₮ and a hex token) riding the light lines at the edges. A mouse-scroll hint sits at the bottom with curved "USDT" and "ETH" labels.

## Motion

- **Entrance:** CSS, about 1.6s. The nav, pill and headline lines rise in, then the copy, the CTA and the chips.
- **Globe:** spins continuously via the video.
- **Reduced motion:** no video and no entrance.

## Acceptance check

- **Globe:** it visibly rotates, and the loop has no jump.
- **Brand:** "Vaultra" everywhere, and the "Sign up" typo is fixed.