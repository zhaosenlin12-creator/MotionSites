# Prompt: ZENTRADE FAQ page

Build a single-file **FAQ page for a fictional online trading platform, ZENTRADE**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is dark and premium: a near-black page with a soft green glow and stepped green light bars at the top, frosted-glass navigation, a big bold headline, a glass search bar, four pill-shaped category cards and a smooth one-at-a-time accordion.

## Scale

- **Units:** every desktop size is in reference pixels of a 1778px-wide page, multiplied by `--u = 100vw / 1778` (capped at 2200px wide).
- **Tablet (768–1199px):** a fixed `--u = .82px` with a reflowed layout.
- **Phone (under 768px):** a fixed `--u = .8px` with one column.
- **Content column:** 1224u, centred.

## Type and colour

- **Figtree:** 800 for the headline, 400/500/600 for the UI and body.
- **Lexend 300:** the search field only.
- **Colours:**
  - page `#090909`
  - lime `#83F34D` with dark lime text `#0B2400`
  - cards `#1B1B1B`, icon rings `#232323`
  - accordion rows `#131313`
  - rules `#2F2F2F`
  - muted text white at 82%

## Background (CSS only, static)

- **Glow:** a central radial green glow (740u × 950u, centred 92u from the top) that fades from `#1D2E13` to the page colour.
- **Light bars:** a 655u-tall top layer with five stepped vertical light bars on each side. Each fades from green (`#2A4B1B` → `#1D2F14`) to transparent, and the bars step down in height towards the centre (430, 360, 288, 216 and 156u) and are about 80–98u wide.
- **Top spill:** a faint green light spill along the top edge.

## Navigation (58u tall, 22u from the top)

- **Left:**
  - an angled white "Z" mark (51 × 26u) drawn as one SVG path: a top bar, a diagonal and a bottom bar, with slanted ends
  - "ZENTRADE" in Figtree 500 at 26.4u
- **Centre:** a frosted-glass pill (54u tall, radius 13u, 18u blur, white border at 14%) with "About Us · Accounts · Partnerships · FAQs" at 17u. Links glow faint lime on hover.
- **Right:**
  - a glass language selector (138 × 47u): a round US flag, "English" and a chevron
  - a 101u outline "Login" button with a lime border
  - a 142u lime "Trade Now" button with dark text
  - buttons are 58u tall with a 12u radius

## Hero (centred, 177u below the nav)

- **Tag:** a pill "FAQ" (97 × 52u) of green-tinted glass with a pale green 1.3u border.
- **Headline:** "Frequently Asked Questions", Figtree 800, 62.8u on a 75u line.
- **Lede:** two lines at 17u on a 28u line: "Find answers to the most common questions about ZENTRADE’s platforms, / accounts, deposits, trading conditions, and more."
- **Button:** a white "Join Our Community" button (221 × 50u, radius 11u).

## FAQ area (1224u column)

- **Search:** a glass bar 79u below the hero (74u tall, fully rounded, white at 16% with a 24u blur). A magnifier icon, then "Search for your queries" in Lexend 300.
  - **Focus:** a lime border and a soft lime ring.
  - **Filtering:** typing filters the questions by question and answer text. "No questions match your search." appears when nothing matches.
- **Categories:** a 2×2 grid, 59u below the search, with 23u × 25u gaps.
  - **Each card:** fully rounded, 129u tall, `#1B1B1B`, with a 99u round icon disc holding a white glyph:
    - money bag
    - candlesticks
    - target
    - trending-up arrow
  - **Card text:** title (Figtree 500, 23.2u) and "62 Articles" (16.6u, muted).
  - **Titles:** About Zen Trade · Trading Rules & Guidelines · Zen Trade Challenge Insight · Zen Trade Features.
  - **Hover:** the border tints lime.
- **Accordion:** 58u below the cards. Five rows, 22u apart.
  - **Rows:** each question is a full-width button (min 82u tall, radius 14u, `#131313`, Figtree 500 at 23.6u) with a thin circular chevron at the right. The chevron points down when closed and rotates up when open.
  - **Opening:** only one item is open at a time. The answer opens with a `grid-template-rows: 0fr → 1fr` transition (.32s). The answer text is 15.2u on a 23u line, with a thin rule under it.
  - **Questions and answers:**
    1. "What assets can I trade on ZENTRADE?" (open by default): forex majors and minors, indices, commodities such as gold and oil, and popular cryptocurrencies, all from one account, with live spread, leverage and hours shown before each order.
    2. "What is ZENTRADE?": an online trading platform with access to global markets through a fast, secure, easy-to-use interface and dedicated support.
    3. "How do I open an account?": sign up, complete the form, verify your identity, then make your first deposit.
    4. "Which deposit and withdrawal methods are available?": the secure methods listed in your client area, varying by region.
    5. "What are the trading conditions?": spreads, leverage and fees vary by account type and instrument; compare them on the Accounts page.

## Motion

- **Entrance:** a one-time Web Animations sequence, about 1.9s, behind an `intro-pending` class with a 3.8s failsafe. It starts once the fonts are ready, or after 500ms.
  - Brand, links and actions settle in (0–600ms).
  - The FAQ tag lifts and scales in, then the headline rises 18u as one block.
  - The lede, then the white button.
  - The search bar rises, then the four cards resolve in reading order, 85ms apart.
- **Hover:** the white and lime buttons lift 1px, and Trade Now gains a lime glow.
- **Reduced motion:** no entrance and no transitions.

## Tablet and phone

- **Nav:** the centre links and actions collapse into a glass menu button that opens a drawer. Escape and clicking outside close it.
- **Columns:** the categories stack to one column on phones.
- **Accordion rows:** 64px tall with 17px text.

## Acceptance check (1440×960)

- The green glow and stepped light bars frame the bold white headline.
- The search bar, the four pill cards and the accordion sit in a centred column.
- Clicking a question smoothly closes the open one and opens the new one.
- **Content:** no real brands or logos.