# Krung Travel — "Welcome to Bangkok" cinematic travel booking landing page

Build a single-file, full-bleed, fully responsive travel booking landing page for an invented brand **"Krung Travel"** (Bangkok, Thailand). It has a cinematic three-slide hero with giant gradient-faded titles, drifting volumetric clouds, a soft misty right-to-left wipe between slides, a column of round destination thumbnails on thin concentric rings, a white search bar with working date-range and guest popovers, a "Recomended Places to Stay" grid of eight photo cards, and a shared-element transition from a card to a property detail page with booking. The whole palette is warm sunset peach and mauve. Every visual must match this description exactly.

---

## 1. Global look

- **Page background:** solid peach `#f7d9c6` down to 115vh. It then blends to `#fbe7da` at 175vh and to `#fdf0e7` at the bottom, so the hero's bottom fade lands on exactly the same peach with no seam. `html` is also `#f7d9c6`.
- **Text colours:**
  - ink `#1d1a1c`
  - muted ink `#5c5156`
  - light muted `#8a7f83`
- **Accents:**
  - orange `#f39419` for Book Now
  - star yellow `#f7c325`
  - heart red `#ff4d5e`
- **Fonts (Google Fonts):**
  - **Urbanist** (300, 400, 500, 600, 700, 800) for all UI text, the nav and the giant titles.
  - **Gilda Display** for section headings and property names: an elegant high-contrast serif.
- **Easing:**
  - `--ease: cubic-bezier(.65,0,.35,1)` for layout moves.
  - `--out: cubic-bezier(.16,1,.3,1)` for reveals.
- **Body:** `overflow-x: hidden`, antialiased.
- **Edges:** no side margins anywhere. The hero touches both edges of the viewport.

## 2. Custom cursor (matches the reference's grey dot cursor)

- Hide the native cursor everywhere (`cursor: none`).
- A fixed 26 px circle in `rgba(72,62,68,.55)` follows the pointer through `transform: translate(x, y)` with negative margins to centre it.
- **Over anything clickable** (buttons, links, cards, thumbnails, search fields): it grows to 38 px and lightens to `rgba(72,62,68,.35)`.
- **While pressed:** it becomes a 44 px hollow dark ring, with a transparent fill and a 5 px border in `rgba(20,16,18,.9)`.
- Sizes animate over .25 s with `--out`.
- **Recording mode:** when the URL contains `?rec`, the cursor is larger: 50 px, 58 px on hover, and a 62 px ring with a 7 px border while pressed.

## 3. Navigation bar

- **Position and size:** fixed, full width, 74 px tall, side padding `clamp(20px, 9.5vw, 170px)`.
- **Over the hero:** transparent, with white text at 92% opacity and a 1 px bottom hairline in `rgba(255,255,255,.28)`.
- **After scrolling past 30% of the viewport height:** it turns solid. The background becomes `rgba(247,217,198,.86)` with a 14 px backdrop blur, the text becomes ink, and the hairline becomes `rgba(29,26,28,.08)`. Background, colour and border transition over .5 s.
- **Left side, in order:**
  1. "Krung Travel" logo: Urbanist 300 at 26 px. It is clickable and returns home.
  2. A 1 × 42 px vertical divider at 45% opacity with 28 px margins.
  3. "Visitors" at 12.5 px with a tiny chevron.
- **Centre:** three links, "Apartments", "Where to go" and "Contact Us", at 14.5 px with a 44 px gap. On hover, a 1.5 px underline wipes in from the left and wipes out to the right.
- **Right side:** "Become a host" at 14 px, a thin-line globe icon, then a pill button. The pill has a 1.5 px border, 9 px radius, a hamburger icon and a 22 px filled circle containing a user silhouette.

## 4. Hero (100vh, min-height 680 px, overflow hidden)

### 4.1 Slides

There are three stacked full-bleed slides. Each slide has:

- **A photo layer:** inset −3%, `background-size: cover`, base scale 1.04.
- **A top tint:** `linear-gradient(180deg, rgba(84,64,74,.42) 0%, rgba(84,64,74,.08) 26%, transparent 46%)`, which gives the mauve band behind the nav.
- **A giant title** inside the slide, so the wipe reveals the title together with the photo:
  - Urbanist 700, uppercase, line-height .9, white-space nowrap.
  - Each word is wrapped so it can rise from a mask.
  - Each word is filled with a vertical gradient clipped to the text: `rgba(255,255,255,.97)` at 0%, `.86` at 36%, `.16` at 100%. The letters look like frosted metal that fades into the photo at the bottom.

| # | Photo (use exactly) | Title | Title size and position | Photo position | Thumbnail lit |
|---|---|---|---|---|---|
| 1 | Bangkok skyline at sunset with the pixelated tower and the river | `WELCOME TO BANGKOK` (one line) | 8.25vw, left 2.6vw, top 74 px + 3.2vh | center 62% | Wat Arun (bottom) |
| 2 | Thai teak-house living room opening onto a sunset river terrace | `FIND PLACE TO STAY` | 8.25vw, same position | center 55% | floating market (middle) |
| 3 | Low-angle porcelain-mosaic temple prang against a blue-grey sky | `EXPLORE` / `BANGKOK` (two lines) | 9.6vw, left 7vw, top 74 px + 5vh, line-height .95 | center 40% | tuk-tuk (top) |

**Slide photos** (load at w=2400):
- Slide 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005348_d02f5076-330a-4062-960b-b000a310d6e4.png&w=2400&q=85
- Slide 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_2a7781a6-ffd1-48f1-bb19-051b67063047.png&w=2400&q=85
- Slide 3: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_73725010-6ca6-46d8-a732-fc33275a02e0.png&w=2400&q=85

### 4.2 Clouds (volumetric, drifting, screen-blended)

The cloud asset is white clouds on pure black. It is composited with `mix-blend-mode: screen`, so the black disappears and only the white clouds remain.

**Cloud image:** https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_6590354a-216c-40a2-9f84-93abe97dc7b1.png&w=2400&q=85

- **Bottom cloud bank:** a box at left/right −4%, bottom −6%, 78% of the hero height, z-index 7. It holds two copies of the cloud image, `cover`, anchored center bottom. Each copy has a mask that fades its top from transparent at 0% to opaque at 38%, so no rectangular edge ever shows.
  - Front copy: drifts sideways from −2.5% to +2.5% over 26 s, alternating, ease-in-out.
  - Back copy: mirrored horizontally at 85% opacity, drifting ±3% sideways and 4% vertically over 34 s.
- **Top cloud layer:** the same image, flipped vertically. It sits from −30% to 50% of the hero height and starts at opacity 0. On scroll it fades in (opacity = scrollY / (0.45 × viewport height)) and moves up. Its mask fades the opposite edge.
- **Bottom fade:** an overlay over the lowest 46% of the hero, `rgba(247,217,198,0)` → `.45` at 45% → `.92` at 82% → solid `#f7d9c6`. The photo melts into the peach page.

### 4.3 Right rail: thumbnails on concentric rings

Three round thumbnails sit in a vertical column centred at x = 85.5% of the viewport. The column starts at 74 px + 8.5% of the hero height.

| Order | Subject | Lit on |
|---|---|---|
| Top | tuk-tuk | slide 3 |
| Middle | floating market | slide 2 |
| Bottom | Wat Arun with a longtail boat | slide 1 |

**Thumbnail images** (w=400):
- Tuk-tuk: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_2697af01-b81b-4c9e-bb4f-7200cb1aa1e8.png&w=400&q=85
- Floating market: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_e2768ec3-714b-47bc-b03e-4fc6794d5dd9.png&w=400&q=85
- Wat Arun: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_c5667173-fd6e-4dcb-9547-6c4518e19388.png&w=400&q=85

**Thumbnails:**
- Sizes:
  - active: 11.3% of the viewport width, clamped to 96–190 px;
  - inactive: 5.4%, clamped to 46–92 px;
  - gap: 0.9% of the viewport width, minimum 8 px.
- Each has a 3 px white border at 92% opacity and the shadow `0 10px 26px rgba(60,30,30,.28)`.
- The active one also gets a halo ring 9 px outside it in `rgba(255,255,255,.55)`.
- Hover: scale 1.07 with a deeper shadow.
- Switching slides animates top, left, width and height over .9 s with `--ease`. The lit thumbnail swells in its own place in the column and the others shrink, so the column reflows smoothly.

**Rings:** two thin outlined circles (1.6 px, `rgba(255,255,255,.5)`), both centred on the active thumbnail.
- Inner ring radius: half the active size + 5% of the viewport width.
- Outer ring radius: half the active size + 10.8% of the viewport width.
- They slide with the active thumbnail over .9 s and are allowed to run off the right edge.

**Connector line:** a 3 px white rounded bar, 4.7% of the viewport width long (minimum 40 px). It sits 0.8% of the viewport width left of the active thumbnail at the same height. On a change it scales out from its right end (scaleX 0), then scales back in.

**Caption block:** anchored by its right edge just left of the connector, at least 16 px away, vertically aligned to the active thumbnail.
- A 3 px white vertical bar, 6.5% of the viewport width tall (minimum 84 px). It grows from the top (scaleY 0 → 1, .6 s).
- A heading in Urbanist 300 at `clamp(26px, 2.75vw, 40px)`, white, with a soft text shadow.
- A description at `clamp(12px, 1vw, 14.5px)`, 88% opacity, max-width 250 px.
- The text reveals left to right with a clip-path (inset right 100% → fully shown) over .9 s.

**Caption copy:**
- Slide 1: "Discover Bangkok" / "Discover Bangkok's best places to stay and visit. Find suitable ones for you and your family"
- Slide 2: "Places to stay" / "Riverside teak houses, sky-high suites and quiet garden villas picked for you"
- Slide 3: "Places to go" / "Explore through the eyes of Bangkok's best Thai adventures"

### 4.4 Slide transition: soft misty right-to-left wipe (the signature move)

Clicking a thumbnail switches slides; otherwise slides auto-advance 1 → 2 → 3 → 1 every 5.2 s. The wipe lasts 1.25 s with easeInOutCubic and is driven by requestAnimationFrame.

- **Incoming slide:** placed above the outgoing one and revealed by a moving linear-gradient mask (to the left) with a soft edge about 35% wide. With progress `p`:
  - fully opaque up to `p·135 − 35` % from the right edge;
  - 60% at the midpoint;
  - transparent at `p·135` %.

  The photo and the giant title wipe together, so mid-transition you read hybrids like "FIND PLACE TO BANGKOK".
- **Incoming photo:** settles from scale 1.12 to 1.04 while sliding from +2% to 0.
- **Outgoing photo:** pushes from scale 1.04 to 1.09 and drifts −2%.
- **Mist band:** a vertical band 34% of the viewport width rides along the wipe edge, a radial blush-white haze (`rgba(255,236,226,.75)` → transparent) blurred 10 px. Its opacity follows sin(π·t) up to .95, so the edge looks like a cloud passing.
- **Rail:** when the wipe starts, the rail re-lays out, and the connector and caption hide. After 650 ms the connector and bar grow back and the new caption text clips in.
- **After the wipe:** the live photo does a very slow Ken Burns. Scale grows 0.0035 per second for up to 12 s, plus a pointer parallax shift of ±0.6% horizontally and ±0.5% vertically.

### 4.5 Intro (on load)

- After 250 ms, each title word rises from below its mask (translateY 105% → 0, 1.15 s `--out`), staggered by 90 ms.
- The thumbnails scale from 0 to 1, staggered 140 ms from a .35 s start.
- The rings fade in.
- The search bar slides up 30 px while fading in over 1 s.
- The caption reveals after 900 ms.

### 4.6 Scroll choreography

| Element | Movement |
|---|---|
| Slide stack | translateY(+0.42 × scrollY), so the photo lags |
| Bottom cloud bank | translateY(−0.38 × scrollY), scale 1 + 0.35 × scrollY / viewport height, so clouds rise and swell past the photo |
| Top cloud layer | fades in |
| Rail | translateY(+0.2 × scrollY), fades out by half a viewport |

The result: scrolling down buries the city in cloud above the search bar, exactly like the reference.

## 5. Search bar

- **Size and position:** absolutely centred, `min(900px, 100% − 40px)` wide, 90 px tall, radius 26 px, bottom 20vh + 2 px.
- **Look:** `rgba(255,255,255,.93)` with the shadow `0 18px 60px rgba(120,70,60,.16)`, z-index above the clouds.
- **Fields:** four. Each has a 16 px thin-line icon, a 21 px Urbanist 500 label and a 13 px muted sub-label.
  1. Pin icon — "Bangkok" / "Choose the destination" (1.35× wider than the others)
  2. Calendar icon — "Check in" / "Add date"
  3. Calendar icon — "Check out" / "Add date"
  4. People icon — "Visitors" / "Add guests"
- **Active or hovered field:** becomes a raised white tile, 72 px tall, radius 14 px, shadow `0 8px 24px rgba(120,80,70,.14)`. "Check in" starts raised.
- **Send button:** a black 40 px square, radius 11 px, with a white paper-plane icon. Hover scales it to 1.1 and rotates it −8°. Clicking it smooth-scrolls to the stays.
- **Calendar popover:** opens under the date fields as a white card, radius 18 px, with a big soft shadow. It drops in from −8 px.
  - Header: month name with ‹ › buttons.
  - Grid: 7 columns × 34 px, Monday first.
  - Picking dates: the first click sets check-in, the second sets check-out. Both ends become black tiles with white numbers, and the days between get a pale peach band. Days before check-in are disabled.
  - The field sub-labels update to dates like "Dec 18".
  - After choosing check-out, the Visitors popover opens automatically.
- **Visitors popover:** Adults (13+) and Children (2–12) rows with round − / + steppers. The sub-label updates, for example "3 guests".
- Clicking outside closes the popovers.

## 6. "Recomended Places to Stay" section

- **Position and padding:** pulled up into the hero by −17vh. Side padding `clamp(20px, 9.5vw, 170px)`.
- **Heading:** "Recomended Places to Stay" in Gilda Display at `clamp(26px, 2.45vw, 36px)`. The spelling matches the reference.
- **"See All" pill:** on the right, with a 1.4 px ink border and radius 20 px. On hover it fills ink with white text.
- **Grid:** two rows of four, gap `clamp(14px, 2.2vw, 30px)`. Each card has:
  - aspect ratio 203:268, radius 12 px, shadow `0 12px 30px rgba(110,60,50,.16)`;
  - a full-bleed photo with a bottom darkening gradient;
  - a top-left price pill: white at 82% opacity, 6 px blur, radius 6 px, 11.5 px text, "/night" at 60% opacity;
  - a top-right 30 px white heart button;
  - bottom-left text: the name (Urbanist 600 at 15.5 px), a pin icon with the area, five yellow stars and "4,8".
- **Entrance:** cards rise 40 px and fade in when scrolled into view, staggered 90 ms per column.
- **Hover:** the card lifts 6 px, the shadow deepens and the photo zooms to 1.07 over 1.2 s.
- **Heart:** toggles between an outline and a filled red heart with a 1.35× pop.

**Cards** (photos at w=700):

| # | Name | Area | Price | Photo |
|---|---|---|---|---|
| 1 | Riverside Teak Villa | Khlong San, Bangkok | $1,300/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_d7535a9a-29c3-4714-9c2a-4b8934ed1df2.png&w=700&q=85 |
| 2 | Baan Suan Teak House | Thonburi, Bangkok | $1,200/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005405_6867b7fa-e6ec-4c5c-a810-aea29a94cce4.png&w=700&q=85 |
| 3 | Sathorn Sky Condo | Sathorn, Bangkok | $170/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_78f07613-5823-4ef1-94a9-cbf8977e5c38.png&w=700&q=85 |
| 4 | Velvet Night Suite | Silom, Bangkok | $120/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_816e6775-3733-4270-8e1f-bbf270fe3fff.png&w=700&q=85 |
| 5 | Lantern Deck House | Bang Rak, Bangkok | $70/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005408_bf9bfa74-cb9c-4055-a632-b725670fdc9d.png&w=700&q=85 |
| 6 | Skyline Pool Cabana | Sukhumvit, Bangkok | $105/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005413_84e12590-d5b2-4676-9600-c31c6cd0b0f4.png&w=700&q=85 |
| 7 | Grand River Residence | Charoen Krung, Bangkok | $1,300/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005414_da006178-018e-4ed8-b340-f6a70f18f1bc.png&w=700&q=85 |
| 8 | Palm Court Resort | Bang Na, Bangkok | $1,200/night | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005417_3c7632ad-341c-4e40-b370-db3c3aaf479e.png&w=700&q=85 |

## 7. Card → detail page (shared-element flight)

Clicking any card (except its heart) opens a fixed full-screen white detail page, which fades in over .55 s. The nav turns solid.

**Flight:**
- At the same time, a floating copy of the card photo flies from the card's exact rectangle to the detail page's main image rectangle over 900 ms with easeInOutCubic. The corner radius goes from 12 to 10 px.
- The flight uses the w=700 image, which is already cached.
- The real main image stays hidden until the flight lands, then swaps in. It layers the w=1400 version over the w=700 one, for example: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005347_d7535a9a-29c3-4714-9c2a-4b8934ed1df2.png&w=1400&q=85 (same pattern for every card).
- The other detail blocks rise 26 px and fade in, staggered 70 ms from 250 ms.

**Detail layout:**
- **Background:** a peach band 290 px tall at the top, white below.
- **Breadcrumb:** "Home › Type of places to stay › Villas › {name}, {area}" at 12.5 px. The last crumb is muted. "Home" returns to the landing page.
- **Columns:** two columns, 1.18fr and 1fr.
  - **Left column:**
    - The main photo: aspect 512:445, radius 10 px, with a heart button.
    - Below it, three square interior thumbnails with a 16 px gap. They lift on hover. The third has a dark overlay reading "+9".
  - **Right column:**
    - The name in Gilda Display at about 38 px.
    - "Hosted by", a 20 px avatar and "Ploy Sirikul".
    - "About {name}" in Gilda Display.
    - A paragraph about Thonburi, the Grand Palace, Wat Arun, river ferries to Chinatown street food and a lantern-lit teak terrace.
    - A booking card (white, radius 18 px, soft shadow):
      - the price at 26 px with "/night";
      - a pale grey box with Check In and Check Out, showing the dates chosen in the hero search (default Dec 22 and Dec 27, 2026);
      - a Guests row with − / + steppers;
      - an orange "Book Now" pill. On click it turns green and reads "Booked ✓".
    - A rating row between hairlines:
      - "4.8", "(128 reviews)" and five small red stars;
      - three overlapping 38 px reviewer avatars;
      - a "Rate Now" outline pill.
    - "Amenities": a 3 × 2 grid of thin-line icons — Wi-Fi, Personal Bar, Private Pier, Superhost, Own Cinema, Room Service.
- **"Similar Places to Stay":** four more cards using the same card component.

**Interior thumbnails:**
- https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005420_531ca3bc-da2a-48a8-9506-30b46f6725a5.png&w=500&q=85
- https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005422_3d48e291-6d44-46fa-a18e-ab2f7c791839.png&w=500&q=85
- https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005426_0b8053b2-b0af-4629-85b1-5800d8f100d0.png&w=500&q=85

**Avatars** (host and reviewers):
- https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_2bc44540-0fec-4b94-9f47-722c00c851dd.png&w=120&q=85
- https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_fee8e948-a5dc-4e86-9ecc-dc8dbce6b660.png&w=120&q=85
- https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_005635_ce259660-2765-42ee-a5b0-3afee70b11aa.png&w=120&q=85

Clicking the "Krung Travel" logo or the "Home" crumb fades the detail page out and returns to the landing page.

## 8. Responsive

**≤ 1000 px:**
- Hide the nav links and "Become a host".
- The card grids become two columns.
- The detail page stacks into one column.

**≤ 640 px:**
- The nav is just the logo and the right-hand icons.
- Titles wrap at 13–14vw within 80vw.
- The caption and connector are hidden. The thumbnails and rings stay.
- The search bar becomes a 2 × 2 grid of fields with a full-width black send button below, at bottom 16vh.
- The stays section pulls up by −8vh.

There must never be horizontal scrolling or side gaps.

## 9. Do not

- No real brands or logos. The brand is "Krung Travel".
- No opacity crossfades between slides: always the masked misty wipe.
- No rectangular cloud edges: always masks plus screen blending.
- Use only the images listed above.