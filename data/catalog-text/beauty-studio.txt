# Reshoot: recreation brief for the full landing page

Rebuild this page exactly as described below. Everything here comes from the finished build: one `index.html` with all CSS and JS inline, three libraries loaded from CDNs, and two self-hosted font files in `assets/fonts/`. There are no other local assets. Every photo comes from ten AI-generated image sheets on a remote image proxy, cropped cell by cell in the browser. Unless a value says px, vw, svh or em, it is in rem. The fluid root font-size (section 4) makes 1rem equal 16px on a 1728px-wide screen.

---

## 1. Overview

**Brand.** "Reshoot" is a fictional AI beauty-photography studio. The page tagline is "Reshoot — AI Beauty Photography". The meta description reads: "Reshoot turns one skincare product photo into campaign-grade beauty shoots, styled product scenes and motion." Every photo shows a fictional skincare line called **Lunelle**: a frosted lavender glass dropper serum, a matte lavender squeeze tube and a frosted blush-pink cream jar. All three have white caps and thin serif "LUNELLE" labels. They are worn and held by one recurring model with light olive skin, faint freckles and a sleek dark low bun, plus five other models in one headshot sheet.

**Mood.** Soft, luminous, blush-and-lilac editorial. The type is large, light-weight Inter grotesk, with single words set in Instrument Serif Italic for a "glow" accent. Corners are rounded throughout, and pill buttons are pale lilac.

**Structure, top to bottom.**

1. **Preloader.** A full-screen overlay with a stepped percentage counter in the top-left, the logo bottom-left and a stepped spinner bottom-right. In the centre, four tall portraits hard-cut every 0.5 s. It blurs in, holds, blurs out and fades away. Returning visitors get it at 1/5 duration with the word "Synced" in place of the counter.
2. **Fixed header.** Logo plus wordmark on the left. In the centre, a lilac pill holding the Menu button (burger plus label), a round theme toggle and a live scroll-percentage readout. On the right, a round sign-in icon and a "Get started" pill button.
3. **Menu panel.** A rounded card that grows down out from behind the centre pill. It has three link groups, a scrambling Menu/Close label and a burger that turns into an X.
4. **Section 1, Hero.** A full-viewport stage. A ring of eight rounded photo cards orbits the centre (one turn every 32 s), and each photo counter-rotates to stay upright. The two-line headline "Your shelves, *radiantly* re-shot." sits inside the ring. A vertical list of outlined chips loops upward on the right. "©2026" sits bottom-centre and "scroll down" bottom-right.
5. **Section 2, How it works.** On the left, a heading: "From your *idea* to on-brand images." On the right, a masked column of three huge phrases crawls upward forever and brightens as each phrase rises. Below sits a "Trusted by" row with a horizontal marquee of ten invented wordmarks in rounded tiles.
6. **Section 3, AI Beauty Photoshoots.** A full-bleed rounded panel 70rem tall. A tag sits top-left and the heading plus body copy bottom-left. Across the middle, a single packshot card points with an arrow to a dark "Generated photos" dashboard. The dashboard shows a 5×2 grid of results, three of them selected, and bleeds off the right edge. A round white spark button sits bottom-right.
7. **Section 4, Four steps.** Four full-viewport slides with soft pastel vertical gradients. Each has a large headline with a serif-italic last word, a huge step number (01 to 04), two feature bullets and a row of four photo cards with glass captions and chips. As you scroll, each of the first three slides pins, tips back in 3D (rotationX 40°), shrinks to 70%, twists a random ±5° and fades out.

**Themes.** Blush (light) is the default. The class `light` sits on `<body class="body light">`. Night (dark) is the alternative. The toggle in the header pill switches them, and the choice persists in localStorage.

---

## 2. Media: generated image sheets

### 2.1 How URLs are built

The script holds a base folder and an object `S` with ten sheet entries. Base folder: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/`

The page never loads the cloudfront PNG directly. Each element's background-image is set to the image proxy URL `https://images.higgs.ai/?default=1&output=webp&url=` + encodeURIComponent(base + filename) + `&w=` + sheet's w + `&q=85`. In the encoded part, ":" becomes %3A and "/" becomes %2F. Underscores, hyphens and dots stay as they are. The proxy returns WebP at quality 85, resized to the width `w` listed per sheet. Each sheet is one image that is reused for several tiles.

### 2.2 Sheet table

| Key | Source PNG (cloudfront) | Exact URL used on the page (background-image) | Sheet px (W×H) | Proxy w | Grid |
|---|---|---|---|---|---|
| pre | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212221_aa358f68-9766-4be1-a25b-4c2a7d766643.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212221_aa358f68-9766-4be1-a25b-4c2a7d766643.png&w=1200&q=85 | 1360×2048 | 1200 | 2×2 |
| ringa | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212220_9be89454-e5c2-400f-a0c3-ed24fc218fbe.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212220_9be89454-e5c2-400f-a0c3-ed24fc218fbe.png&w=1400&q=85 | 2048×2048 | 1400 | 2×2 |
| ringb | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212220_40759068-fc82-4598-8924-5f2e465e2e2e.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212220_40759068-fc82-4598-8924-5f2e465e2e2e.png&w=1400&q=85 | 2048×2048 | 1400 | 2×2 |
| studio | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212220_cd01507d-7e12-4101-b742-bc86e8f02f6a.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212220_cd01507d-7e12-4101-b742-bc86e8f02f6a.png&w=1360&q=85 | 1360×2048 | 1360 | 2×2 |
| life | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212221_aaa82e12-4ddb-46bd-9bd9-8e5189f0d06b.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212221_aaa82e12-4ddb-46bd-9bd9-8e5189f0d06b.png&w=1360&q=85 | 1360×2048 | 1360 | 2×2 |
| base | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212221_5918bfdd-271e-420d-87ac-6646f8992931.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212221_5918bfdd-271e-420d-87ac-6646f8992931.png&w=2048&q=85 | 2048×1360 | 2048 | 3 cols × 2 rows |
| styled | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212221_99aed2e6-df64-4910-9867-29f8a8ae31c2.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212221_99aed2e6-df64-4910-9867-29f8a8ae31c2.png&w=2048&q=85 | 2048×1360 | 2048 | 3 cols × 2 rows |
| styled2 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212328_615deead-364f-4afb-82e6-ee7589e09dfb.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212328_615deead-364f-4afb-82e6-ee7589e09dfb.png&w=2048&q=85 | 2048×2048 | 2048 | 2×2 |
| prod | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212131_dac765cc-9d5d-4b23-b99c-9c838e37b5dc.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212131_dac765cc-9d5d-4b23-b99c-9c838e37b5dc.png&w=1600&q=85 | 2048×1360 | 1600 | single image |
| faces | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_212222_0554bb8d-aacd-4479-9b61-d1c200034665.png | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_212222_0554bb8d-aacd-4479-9b61-d1c200034665.png&w=1600&q=85 | 2048×1360 | 1600 | 3 cols × 2 rows |

### 2.3 Cell boundaries and contents

Cells are numbered from 0 in reading order (row-major): index n gives column = n mod (number of columns) and row = floor(n / number of columns). The boundaries below are the raw pixel ranges stored in the script, measured in the sheet's native pixels between the thin white gutters. The 8px inset (section 2.4) is applied on top of them.

| Key | Column x-ranges | Row y-ranges | Cell 0 | Cell 1 | Cell 2 | Cell 3 | Cells 4 and 5 |
|---|---|---|---|---|---|---|---|
| pre | 0–673, 687–1360 | 0–1015, 1029–2048 | Model holding the serum dropper near her cheek, blush backdrop | Close-up, eyes closed, dewy skin, lilac backdrop | Leaning on a lilac pedestal with the cream jar, warm light | Half-body in a lavender silk slip dress holding the tube, pale pink backdrop | — |
| ringa | 0–1014, 1034–2048 | 0–1016, 1032–2048 | Serum dropper standing in shallow rippling water, lilac light | Beauty close-up of the model's glowing face, a serum drop on her cheekbone | Lavender tube lying on folded lilac silk with water droplets | Model smiling softly, touching her cheek, pale blush backdrop | — |
| ringb | 0–1016, 1032–2048 | 0–1014, 1030–2048 | Open cream jar with a swirl of pink cream on lilac satin | Model in profile, luminous skin, dropper near her jaw | Dropper releasing one golden serum drop above water ripples | Model with eyes closed, cheek resting on her hand, lavender backdrop | — |
| studio | 0–676, 685–1360 | 0–1019, 1029–2048 | E-commerce studio shot on light lilac-grey seamless, lavender silk slip top, holding the serum: front half-body | Three-quarter view | Side profile | Close-up of hands holding the bottle by the collarbone | — |
| life | 0–672, 688–1360 | 0–1016, 1032–2048 | Sunlit marble bathroom, applying serum | Blooming lilac garden, holding the tube | Sunny terrace at golden hour with the cream jar | Soft-lit bedroom with white linen, dabbing serum on her cheek | — |
| base | 0–674, 687–1361, 1374–2048 | 0–673, 684–1360 | Plain packshot on pale grey-white seamless with soft shadow: serum dropper front | Tube front | Cream jar front | Serum bottle three-quarter | 4: jar with lid off showing pink cream; 5: serum bottle on a deep plum backdrop |
| styled | 0–677, 685–1365, 1373–2048 | 0–676, 684–1360 | Serum bottle in rippling lilac water | Tube on draped lavender silk | Cream jar among pink peony petals | Serum bottle on warm travertine in sunlight | 4: open jar on mirrored glass with soft reflections; 5: serum bottle on moody plum velvet with a glow |
| styled2 | 0–1017, 1031–2048 | 0–1017, 1031–2048 | Products only: serum dropper upright on warm travertine, sunlight and leaf shadows | Closed blush-pink cream jar among scattered peony petals | Serum dropper three-quarter on deep plum velvet, soft glow | Blush-pink cream jar on a smooth sandstone pedestal, lilac sky gradient behind | — |
| prod | 0–2048 | 0–1360 | The hero Lunelle packshot: serum, tube and jar together on a pale lilac acrylic pedestal, seamless blush-to-lilac gradient, water droplets on the glass | — | — | — | — |
| faces | 0–675, 687–1361, 1373–2048 | 0–674, 686–1360 | Square beauty headshot on light grey: East Asian woman with a short black bob | The recurring Lunelle model | Black woman with natural coily hair | South Asian woman with long dark hair | 4: red-haired freckled woman; 5: Latina woman with curly brown hair |

### 2.4 Cover-crop math (the `.ph` tile system)

Every photo tile is an empty div with class `ph` and a `data-img="sheet:index"` attribute, such as `ringa:1`. The `.ph` class gives it background-color var(--secondbg) and background-repeat no-repeat. An IIFE at the top of the body script then does the following.

1. **Cell lookup.** Split the key on ":" and read the sheet. Compute column and row as above. Set x0 = xs[col].start + 8, x1 = xs[col].end − 8, y0 = ys[row].start + 8, y1 = ys[row].end − 8. The constant inset IN = 8 keeps any white gutter edge from showing. The cell rect is x = x0, y = y0, w = x1 − x0, h = y1 − y0, all in native sheet pixels.
2. **Fit (object-fit: cover by hand).** Read the element's offsetWidth (ew) and offsetHeight (eh), and skip if either is 0. Offset sizes ignore transforms, so the rotating ring tiles still measure correctly. Scale k = max(ew / w, eh / h). Focal point fx = data-fx, defaulting to 0.5, and fy = data-fy, defaulting to 0.5. Set background-size to (W × k)px by (H × k)px, where W and H are the sheet's native pixel size, not the proxy width. That is why a 1200px-wide WebP still lines up. Set background-position to −(x·k + (w·k − ew)·fx) px horizontally and −(y·k + (h·k − eh)·fy) px vertically. The overflow is split by the focal fraction, so fy = 0.3 keeps more of the top of the cell.
3. **Wiring.** For every [data-img] element, set the inline background-image to url("…proxy URL…") once, call fit, and register it with one shared ResizeObserver that calls fit again on every size change.

Focal overrides used on the page: life:0 with data-fy .3 (step 3), life:2 with data-fy .35 (step 4 wide card), studio:1 with data-fy .2 (step 4) and pre:1 with data-fy .3 (step 4). No data-fx is used anywhere.

### 2.5 Where every key is used

| Key | Used in |
|---|---|
| pre:0, pre:1, pre:2, pre:3 | Preloader stack. DOM order is pre:3, pre:0, pre:2, pre:1. pre:1 also appears as step 04, card 4 (fy .3) |
| ringa:0 | Hero ring holder at 45° |
| ringa:1 | Hero ring holder at 0° (top); dashboard cell 6; step 02 card 3; tablet/mobile alt grid, middle column, first tile |
| ringa:2 | Hero ring holder at 135° |
| ringa:3 | Hero ring holder at 180° |
| ringb:0 | Hero ring holder at 225° |
| ringb:1 | Hero ring holder at 90° |
| ringb:2 | Hero ring holder at 315° |
| ringb:3 | Hero ring holder at 270° |
| studio:0 | Dashboard cell 2 |
| studio:1 | Dashboard cell 10; alt grid column 1 tall tile; step 04 card 2 (fy .2) |
| studio:2 | Alt grid column 3 tall tile |
| life:0 | Step 03 card 2, "Kept" (fy .3) |
| life:1 | Dashboard cell 4 (selected); alt grid middle column, second tile |
| life:2 | Step 04 wide card (fy .35) |
| life:3 | Dashboard cell 8 |
| base:0 | Photoshoots panel, the single "input" card left of the arrow |
| base:1 | Step 04 card 3 |
| styled:0 | Dashboard cell 1 (selected); step 02 wide card; alt grid column 1 second tile |
| styled:1 | Dashboard cell 3; step 02 card 2 |
| styled:4 | Dashboard cell 9; step 03 card 4, "Kept" |
| styled2:0 | Dashboard cell 7 (selected); step 03 wide card |
| styled2:1 | Step 02 card 4 |
| styled2:2 | Step 03 card 3 |
| styled2:3 | Dashboard cell 5; alt grid column 3 second tile |
| prod:0 | Step 01 wide card |
| faces:0 | Step 01 card 3 |
| faces:1 | Step 01 card 2, "Selected" |
| faces:2 | Step 01 card 4 |

These cells are never shown: studio:3, base:2–5, styled:2, styled:3, styled:5 and faces:3–5.

---

## 3. Fonts

Two self-hosted @font-face rules point at files in `assets/fonts/`, both with font-display swap.

| Family name | Local file | Download source (Google Fonts woff2) | Descriptors |
|---|---|---|---|
| Inter | assets/fonts/inter-var.woff2 | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2 | Variable, font-weight range 100 to 900, normal style |
| Instrument Serif | assets/fonts/instrument-serif-italic.woff2 | https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2 | font-style italic, font-weight 400 |

Body text is Inter with an Arial, sans-serif fallback, with -webkit-font-smoothing antialiased and -moz-osx-font-smoothing grayscale. The working weights are 400 and 500. The invented wordmark tiles also use 300 and 600 from the same variable file. The serif comes in through the utility class `.it`: Instrument Serif with a Georgia, serif fallback, italic, weight 400, letter-spacing −0.01em. Each use then scales the italic up slightly so it matches the grotesk's optical size.

The serif italic appears in these places only:

- Hero headline: "radiantly" at 1.08em with letter-spacing −0.02em.
- How it works heading: "idea" at 1.06em.
- How it works crawling column: "glow" in "Keeps the glow", at 1.06em, weight 400, letter-spacing −0.1rem. It appears twice because the column is duplicated.
- Trusted-by wordmarks with class b, set directly in the serif italic at 2rem: "Kivra" and "Maisy & Co".
- Step headlines at 1.08em with letter-spacing −0.04rem: "looks." (01), "options." (02), "favorite." (03) and "export." (04).
- The `.what__title .it` rule (1.04em) exists in the CSS, but nothing in the DOM uses it.

---

## 4. Head, libraries, root scale, type scale

**Document.** The html element has lang "en" and starts with class "is-loading". The head contains, in this order:

1. meta charset utf-8.
2. meta viewport width=device-width, initial-scale=1.
3. title "Reshoot — AI Beauty Photography".
4. The meta description quoted in section 1.
5. One style block.
6. A tiny inline script. It adds is-loading to the html element again, then removes it if prefers-reduced-motion: reduce matches.
7. Three blocking scripts, in this order:
   - GSAP 3.12.5 from `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
   - ScrollTrigger 3.12.5 from `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
   - SplitType 0.3.4 from `https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js`

The body has classes "body light". The main behaviour script sits at the end of the body, and ScrollTrigger is registered there.

**Global resets.** Every element gets box-sizing border-box and zero margin and padding. html and body get overscroll-behavior none. body gets background-color var(--mainbg), color var(--fonts-100), display flex with column flow, and font-size 1vw. Links inherit colour. The plain focus outline is removed, and :focus-visible gets a 2px solid var(--accent) outline at 2px offset. Images are display block. The `main.page` wrapper is a flex column with min-height 100svh and overflow hidden.

**Fluid root font-size.** These rules sit on html. The rem inside each calc is the browser's 16px initial size.

| Viewport width | html font-size |
|---|---|
| Above 2560px (base rule) | 1.484375rem (23.75px fixed) |
| ≤ 2560px | calc(−0.006009615384615419rem + 0.9314903846153846vw) |
| ≤ 1728px | calc(−0.009345794392523143rem + 0.9345794392523362vw), so 1rem = 16px at 1728 |
| ≤ 991px | calc(0.021640258215962493rem + 1.8779342723004695vw) |
| ≤ 767px | calc(−0.0025905678851174934rem + 4.14490861618799vw) |

All of these are `@media screen and (max-width: …)` rules, written in descending order so the narrowest match wins.

**Type-scale variables on :root.** --h1 5.5rem, --h2 7.5rem, --h25 4rem, --h3 3.25rem, --body2 1rem, --tag 1.125rem, --title1 1rem, --title2 0.875rem, --title3 1.5rem, --btn 1.0625rem. At ≤991px, --h1 becomes 4.5rem and --h2 5.5rem. At ≤767px: --h1 2.5rem, --h2 2.25rem, --h25 2.25rem, --h3 1.5rem, --body2 0.875rem, --tag 1rem.

**Utility classes.**

| Class | Size | Line-height | Weight | Letter-spacing | Other |
|---|---|---|---|---|---|
| u-h1 | var(--h1) | 0.94 | 400 | −0.165rem | — |
| u-h2 | var(--h2) | 1 | 400 | −0.225rem | (unused) |
| u-h2-5 | var(--h25) | 1 | 400 | −0.12rem; −0.045rem at ≤767 | (unused) |
| u-h3 | var(--h3) | 1.05 | 500 | −0.1rem | — |
| u-body-2 | var(--body2) | 1.25 | 400 | — | — |
| u-tag | var(--tag) | 1.5 | 400 | — | — |
| u-title-2 | var(--title2) | 1.5 | 500 | −0.01313rem | — |
| u-title-3 | var(--title3) | 1.5 | 500 | −0.01313rem | — |
| u-small-text-1 | 0.75rem | 1.5 | 400 | — | — |
| u-small-text-2 | 0.625rem | 1 | 500 | −0.0125rem | uppercase |
| u-btn | var(--btn) | 1.2 | 400 | −0.02125rem | — |
| u-fonts-50 / u-fonts-64 | — | — | — | — | colour var(--fonts-50) / var(--fonts-64) |
| u-indent | — | — | — | — | padding-left 1.75rem (1.5rem at ≤767), unused |

---

## 5. Colour tokens and gradients

The tokens are defined on `.body`, which holds the night values, and overridden by `.body.light`, which holds blush, the default. The swap is instant, with no colour transition.

| Token | Night (.body) | Blush (.body.light, default) | Used for |
|---|---|---|---|
| --mainbg | #0b090d | #f9f0f5 | Page background, preloader, chip fill, edge fades |
| --mainbg-gradient | #0b090d00 | #f9f0f500 | Transparent end of edge fades |
| --fonts-100 | #f6e9f4 | #3a1d43 | Main text |
| --fonts-64 | #f6e9f4a3 | #3a1d43a3 | Body copy, hover borders |
| --fonts-50 | #f6e9f480 | #3a1d4380 | Menu group labels |
| --fonts-30 | #f6e9f44d | #3a1d434d | Tag dot, panel arrow |
| --fonts-20 | #f6e9f433 | #3a1d4333 | Chip borders, sign-in border, menu divider |
| --secondbg | #141117 | #f3e6f0 | Photo placeholder, wordmark tiles, Photoshoots panel |
| --lines | #25202a | #e8d7e4 | Section borders, ring card fill |
| --menu | #272030 | #cbb6ea | Header pill background |
| --pill-ink | #f6e9f4 | #3a1d43 | Header pill text, burger lines |
| --menu-colors | #ffffff2e | #3a1d432b | Theme button border |
| --prc | #ffffff1f | #3a1d431a | Percentage pill fill |
| --dots-pattern | #1b171f | #ecdcef | Menu panel background |
| --dash | #18141c | #25142d | Dashboard background (dark in both themes) |
| --btn-bg | #cbb6ea | #cbb6ea | Primary pill button |
| --btn-ink | #2c1433 | #2c1433 | Primary pill text |
| --accent | #e58fb6 | #e58fb6 | Button hover, focus ring, spark-button hover |
| --flash-a | #c05ae0 | #b14bd9 | First word-flash colour (violet) |
| --flash-b | #f28db5 | #f28db5 | Second word-flash colour (pink) |
| --card | #18141c | #ffffff | (declared, unused) |
| --card-2 | #ffffff0f | #3a1d430d | (declared, unused) |

**Fixed (theme-independent) colours.**

- Dashboard text: #f6e9f4. Dashboard sub-label: #f6e9f480.
- Dashboard lilac (Generate pill, selected outline and badge): #cbb6ea, with ink #2c1433.
- Unselected check badge: #ffffffd9. Dashboard cell placeholder: #ffffff0d.
- Spark button: white #fff with ink #2c1433.
- Step slides: ink #3a1d43, exposed as --ink. Body copy #3a1d43b3. Bullet dot #b9a4ea.
- Step cards: shadow #3a1d431a. Glass caption #2c143352 with 10px backdrop blur and white text. Chip #ffffffd9 with ink #3a1d43. Pick outline #fff.

**Gradients.**

- Hero chip list, vertical (desktop). Top fade: linear-gradient(180deg, var(--mainbg), var(--mainbg-gradient)). Bottom fade: linear-gradient(180deg, var(--mainbg-gradient), var(--mainbg)).
- Hero chip list, horizontal (≤991). Left fade: 90deg from var(--mainbg) to var(--mainbg-gradient). Right fade: 90deg from var(--mainbg-gradient) to var(--mainbg).
- How it works column mask (mask-image and -webkit-mask-image): linear-gradient(180deg, transparent 0, #000 12%, #000 88%, transparent 100%).
- Trusted-by marquee. Left fade: linear-gradient(90deg, var(--mainbg), var(--mainbg-gradient)). Right fade: linear-gradient(−90deg, var(--mainbg), var(--mainbg-gradient)).
- Step slides, all linear-gradient 180deg:
  - s1: #f9d6c8 0%, #efcfdc 48%, #d8c5f1 100%
  - s2: #f6d0d9 0%, #e7c9e8 50%, #cdb9ef 100%
  - s3: #f8dccd 0%, #f1cfe0 50%, #dcc3ee 100%
  - s4: #efd2ea 0%, #e2c6ef 50%, #c9b6f0 100%
- Hover-stagger text mask: linear-gradient(#000 0 0) at size 100% 70%, centred, no-repeat. This clips the top and bottom 15% of each rolling label.

---

## 6. Section-by-section DOM, text and measurements

### 6.0 Inline SVG sprite

A hidden 0×0 SVG (position absolute, aria-hidden) at the top of the body defines five symbols.

- **logo** (viewBox 0 0 56 56). Four 16×16 squares with rx 4, each rotated 45° about its own centre, forming a diamond of diamonds, all in currentColor:
  - top at x20 y2, full opacity
  - right at x34 y16, opacity .55
  - left at x6 y16, opacity .8
  - bottom at x20 y30, opacity .35
- **spin** (viewBox 0 0 56 56). Eight 6×14 bars with rx 3, all starting at x25 y4 and rotated about 28 28 in 45° steps (0 to 315). Their opacities in order are 1, .3, .6, .2, .4, .5, .8, .1.
- **spark** (viewBox 0 0 32 32). A four-point curved star centred at 16 16, spanning from y4 to y24 and from x6 to x26, plus two dots: r 2.2 at 25 25 and r 1.6 at 7 7.
- **trash** and **down** (16×16 stroke icons) are defined but not used.

### 6.1 Preloader (section.preloader, aria-hidden)

- **Container.** position fixed, inset 0, z-index 9999, pointer-events none, background var(--mainbg). Flex column with justify-content space-between, align-items flex-start, padding 2rem. While the html element has is-loading, its direct children are opacity 0 and visibility hidden. Each child has will-change opacity, filter.
- **Counter.** The first child is a div with class u-h1, so 5.5rem, line-height .94, weight 400, letter-spacing −.165rem, starting with text "0". It sits at the top-left.
- **Bottom row.** A full-width flex row, space-between, centred. On the left is the logo symbol at 3.5rem square in var(--fonts-100). On the right is a 3.5rem wrapper holding the spin symbol at 3.5rem, rotated forever by a CSS keyframe "spinStep" (to rotate 360deg) over 1s with steps(8), so it ticks rather than spins.
- **Image stack.** A centring layer (absolute, inset 0, flex centre, pointer-events none) holds a 16rem × 24rem relative box. Inside are four stacked absolute layers, each inset 0 and each a .ph tile: pre:3, pre:0, pre:2, pre:1, in that DOM order.
- **≤767px.** Logo and loader become 2.5rem, and the image box becomes 10.5rem × 16rem.

### 6.2 Header (header.header)

- **Container.** position fixed, top, left and right 0, z-index 999. Flex, space-between, align center, padding 1.5rem 2rem, transition all .2s ease, will-change transform.
- **Left block** (width 10.75rem). A link to #hero with aria-label "Reshoot home", inline-flex, gap .6rem, no underline, colour var(--fonts-100). It holds the logo symbol at 2.6rem square and the word "Reshoot" at 1.45rem, weight 500, letter-spacing −.04rem. On hover the logo fades to opacity .64 over .2s.
- **Centre pill** (header__main). position relative, z-index 2, flex centred, gap 1.5rem, height 3rem, padding .5rem, border-radius 99rem, background var(--menu), colour var(--pill-ink). Its contents, left to right:
  - **Menu button.** No background or border, flex, gap .75rem, padding .5rem 0 .5rem .5rem, hover opacity .64.
    - Icon: a 1.65rem square flex column, centred, holding two lines. Each line is 1.65rem wide, .0625rem tall and filled with var(--pill-ink). JS offsets the top line y −.2rem and the bottom line +.2rem, making a two-bar burger.
    - Label: "Menu" in u-btn, flex none, width 3rem, left-aligned. The fixed width stops the pill jumping when the label scrambles to "Close".
    - aria-label starts as "Open menu".
  - **Theme toggle.** A 2rem circle button with a 1px solid var(--menu-colors) border, transparent background and colour var(--pill-ink). Hover changes the border to var(--fonts-64). It has the attribute data-theme-toggle and aria-label "Toggle colour theme". It holds two 1rem icons:
    - A crescent moon outline (16-unit viewBox, stroke 1.3), shown only in night.
    - A sun: a circle of r 3.6 with eight short round-capped rays (20-unit viewBox, stroke 1.4), shown only in blush.
  - **Percentage pill.** Height 2rem, padding 0 .55rem, radius 99rem, background var(--prc). It holds #progress, text "100%" in u-btn, 2.5rem wide and centred, so the width stays steady while the number changes.
- **Right block.** Flex, gap .65rem.
  - **Sign-in.** A 2rem circle link (href "#", aria-label "Sign in") with a 1px var(--fonts-20) border that turns var(--fonts-64) on hover. It holds a 1rem filled user glyph: a head circle plus a shoulder arc.
  - **"Get started".** A primary pill linking to #list: height 3rem, padding .875rem 1.5rem, radius 99rem, flex centred, background var(--btn-bg), colour var(--btn-ink), no underline, nowrap, transition all .2s. Hover background is var(--accent). It carries the attribute hover-stagger-wrap, and its inner div with the label carries hover-stagger.
  - Both right-hand items have class is-header-btn, which the intro animation targets.

### 6.3 Menu panel (section.menu)

- **Outer.** position fixed, top, left and right 0, z-index 998, just under the header. Flex centred, padding-top .75rem, pointer-events none, transition all .2s. Inside is a holder (menu__wrap-main), 18rem wide, flex, centred horizontally and aligned to the top.
- **Card** (nav.menu__wrap, aria-label "Site menu"). Flex column, gap 3rem, width 15rem, height 0, padding 0, translateY 2rem, border-radius 2rem, background var(--dots-pattern), overflow hidden, pointer-events auto.
- **Collapsed state, set by GSAP at start-up.** Desktop: width 15rem, height 2.7rem, y 1.25rem, padding 0, overflow hidden. At ≤767: width 15.5rem, height 2.7rem, y .5rem. In this state the card sits hidden behind the centre pill.
- **Open state.** Desktop: width 18rem, height 39rem, padding 6.25rem 1.25rem 2.5rem 1.25rem. At ≤991: width 16.2rem, height 39rem, padding 5rem 1rem 1rem 1rem. The large top padding leaves room for the pill that overlaps the card's top.
- **Groups.** Each group (menu__item) is a column with gap .65rem and starts at opacity 0.
  1. Label "Menu" (u-small-text-1, u-fonts-50), then a column (gap .2rem) of u-title-3 links: "How it works" → #how, "Photoshoots" → #pdp, "Four steps" → #list.
  2. Class is-lined (border-top 1px var(--fonts-20), padding-top 1.5rem). Label "Other", then u-title-2 links: "Privacy Policy", "Terms of Service", "Cookie Policy" (all href "#").
  3. Class is-last (padding-top 3rem). Label "Social media", then a row (gap .75rem) of u-title-2 links: "Instagram", "Pinterest", "Youtube".
  4. Class is-auth, hidden on desktop. It holds a second "Get started" primary pill (→ #list, hover-stagger).
- Every link has the attribute hover-stagger, no underline, colour var(--fonts-100) and hover opacity .64.

### 6.4 Section 1, Hero (section#hero.hero)

- **Container.** position relative, width 100%, height 100svh, min-height 56rem, padding 2rem 2rem 4rem. Flex, centred horizontally, aligned to the bottom, overflow hidden. It defines **--R: min(22vw, 35svh)**. Every ring dimension derives from --R.
- **Bottom bar** (hero__wrap). z-index 2, width 100%, flex, centred, bottom-aligned. It holds:
  - An empty left flex:1 cell.
  - The year: a div with class hero__copy, position absolute, u-small-text-2, text "©" followed by a span data-current-year. The span holds "2026" in the markup and JS replaces it with the current year. Because it is absolutely positioned inside a centred flex row, it lands bottom-centre.
  - A right flex:1 cell, justified to the end, holding the link "scroll down" → #how in u-small-text-2, no underline.
  - The year, "scroll down" and the headline all carry data-hero-text.
- **Chip list** (hero__slider, aria-hidden). Absolute, top 10rem, bottom 10rem, right 2rem, z-index 3, flex, end-aligned and vertically centred.
  - The wrap is relative, 17rem tall, a column aligned to the end, overflow hidden.
  - Inside are two identical rows. Each is a column aligned to the end, gap .5rem, padding-bottom .5rem, running the CSS animation "hero-row".
  - Six chips per row: "Jars", "UGC", "Vanity flatlays", "Ads", "Reviews", "Skin closeup".
  - Chip style: padding .35rem 1rem .4rem, 1px solid var(--fonts-20) border, radius .5rem, background var(--mainbg), nowrap. Text 1rem, weight 500, line-height 1.5, colour var(--fonts-100).
  - Two 7rem fade overlays sit at the top and bottom of the wrap (pointer-events none) with the gradients from section 5.
- **Ring** (hero__carousel__wrap, aria-hidden). Absolute, inset 0, z-index 3, flex centred, pointer-events none, padding-top 2.5rem. That padding shifts the visual centre down by 1.25rem so it clears the header.
  - Inside is the rotating square hero__carousel__in: relative, width and height 2.9 × R, flex centred.
  - It holds eight holders (hero__carousel__deg, position absolute). Each holder's data-deg is its fixed rotation: 0, 45, 90, 135, 180, 225, 270, 315.
  - **Orbit geometry.** Each holder contains one card with position relative and top −R. A relative offset does not move the layout box, so the holder's box (and transform origin) stays at the ring centre while the card is drawn a distance R above it. Rotating the holder by d degrees places the card on a circle of radius R. 0° is 12 o'clock and positive angles go clockwise, so 90° is 3 o'clock.
  - **Card.** Width .37R, height .44R, border-radius .12R, background var(--lines), overflow hidden, flex centred. Each card stays tilted along the ring with its holder.
  - **Photo.** Inside each card is a square .ph tile of .52R × .52R (flex none), larger than the card so it overfills it. JS rotates it by −d so it reads upright.
  - Photo per angle: 0° ringa:1, 45° ringa:0, 90° ringb:1, 135° ringa:2, 180° ringa:3, 225° ringb:0, 270° ringb:3, 315° ringb:2.
- **Headline layer** (hero__center). Absolute, inset 0, z-index 4, flex centred, pointer-events none, padding-top 2.5rem, matching the ring.
  - The h1 (hero__title) has pointer-events auto, font-size R × .172, line-height .98, weight 400, letter-spacing −.04em, centred, colour var(--fonts-100).
  - Text: "Your shelves," then a line break, then a span with class it holding "radiantly" (1.08em, −.02em), then " re-shot.".
  - It sits fully inside the ring.
- **Stacking order, back to front.** Bottom bar (2), chips (3), ring (3, later in DOM), headline (4).

### 6.5 Section 2, How it works (section#how.how)

- **Container.** Relative flex column, padding 9rem 2rem 7rem, border-top 1px solid var(--lines).
- **Top row** (how__main). Flex, stretch, gap 4rem.
  - **Left column.** flex none, width 33rem, padding-top 2rem, flex column, gap 3.5rem.
    - Tag "How it works" in u-tag.
    - h2 with data-flash: 4.6rem, line-height 1.02, weight 400, letter-spacing −.14rem. Text: "From your " + italic "idea" (1.06em) + line break + "to on-brand" + line break + "images.".
  - **Right column.** flex 1, height 34rem, flex column, overflow hidden, with the 12% / 88% vertical mask from section 5.
    - It holds two identical columns, the second aria-hidden. Each runs the CSS animation "columnanima".
    - Each column holds three items, each with padding 1.6rem 0 1.9rem. The phrase inside is 6.5rem, line-height 1, weight 500, letter-spacing −.24rem, nowrap.
    - Phrases: "Shoots images", "Makes motion", "Keeps the " + italic "glow" (1.06em, weight 400, −.1rem).
- **Bottom row** (how__bottom). Flex, top-aligned, margin-top 4.5rem, padding-top 2.5rem, border-top 1px var(--lines).
  - Left: 33rem wide, holding "Trusted by" in u-tag.
  - Right: relative, flex 1, min-width 0, flex, overflow hidden.
    - Two identical rows, the second aria-hidden. Each is a flex row with gap 1.25rem and padding-right 1.25rem, running the CSS animation "marquee".
    - Each row holds ten tiles. A tile is 13rem × 9.5rem, radius 1rem, background var(--secondbg), flex centred, colour var(--fonts-100).
    - Two 6.5rem edge fades sit on top: the right fade first in the DOM, then the left.
- **Wordmark styles.** Base: 1.65rem, line-height 1, nowrap.
  - a: weight 600, letter-spacing −.06rem.
  - b: Instrument Serif italic, 2rem.
  - c: weight 400, letter-spacing .32rem, uppercase, 1.05rem.
  - d: weight 500, letter-spacing −.03rem, preceded by a solid dot. The dot is an i element at .42em × .42em, round, filled with currentColor, margin-right .3em, vertical-align .12em.
  - e: weight 300, letter-spacing .05rem.
- **Tile order:** "glowly" (a), "Kivra" (b), "Noora" (c), dot + "velēn" (d), "oriel." (e), "Maisy & Co" (b), "softa" (a), "Lirae" (c), dot + "dewlab" (d), "petalé" (e).

### 6.6 Section 3, AI Beauty Photoshoots (section.ai)

- **Container.** The section is a flex column with no padding, so the panel is full-bleed edge to edge.
- **Anchor.** The wrapper div #pdp has margin-top −6.5rem and padding-top 6.5rem, so menu jumps land below the header.
- **Panel** (ai__top). Relative, width 100%, flex column, space-between, aligned to the start. Height 70rem, padding 5rem, border-radius 3rem, background var(--secondbg), overflow hidden.
- **Spark button.** A link to #list with aria-label "Start a beauty photoshoot". Absolute, bottom 1rem, right 1rem, z-index 5, a 4rem circle, background #fff, colour #2c1433, flex centred, holding the spark symbol at 2rem. Hover: background var(--accent) and scale .9, with transition all .2s.
- **Tag** (top-left, z-index 2). A flex row with gap .5rem: a .25rem round dot in var(--fonts-30), then "AI Beauty Photoshoots" in u-title-2.
- **Title block** (bottom-left, z-index 2). Flex column, gap 1rem, width 36rem.
  - h3 with data-flash, class u-h3, width 88%: "Campaign-grade," + line break + "with no photo crew.".
  - Body copy in u-body-2 and u-fonts-64, width 80%: "Upload one serum and get every angle, glow, light and mood" + line break + "ready for PDPs and launches, no studio and no retouching."
- **Showcase strip** (ai__grid, desktop only). Absolute, top 5rem, left 5rem, right 0, height 45rem, flex, vertically centred, gap 3.5rem, pointer-events none. Left to right:
  1. **Input card.** 17.5rem × 26.5rem, radius 2rem, overflow hidden, 1px border in var(--mainbg), filled by base:0.
  2. **Arrow.** 1.5rem, colour var(--fonts-30), a stroked right arrow: a line from 4 to 19 plus a chevron, stroke 1.5, round caps and joins.
  3. **Dashboard** (d2). flex 1, flex, border-radius 2rem 0 0 2rem, overflow hidden, background var(--dash), text #f6e9f4. It has a 1px var(--mainbg) border with no right border, because it runs off the right edge of the panel.
- **Dashboard contents.** Only the main column exists in the DOM. The CSS also styles a sidebar (d2__side, d2__brand, d2__nav), but the markup has none, so don't build one.
  - The main column is flex 1, min-width 0, padding 1.6rem 0 1.6rem 1.6rem, flex column, gap 1.2rem.
  - **Head row** (space-between, centred, padding-right 1.6rem):
    - Left: bold "Generated photos" (1.1rem, weight 500), with a small line under it reading "Lunelle Serum · 10 of 24" (.72rem, weight 400, #f6e9f480, margin-top .15rem).
    - Right: a pill reading "✦ Generate more". Height 2.2rem, padding 0 1rem, radius 99rem, background #cbb6ea, ink #2c1433, .78rem, weight 500, gap .4rem.
  - **Grid.** CSS grid, five equal columns, gap .7rem, padding-right 1.6rem.
    - Each cell: relative, aspect-ratio 3/4, radius 1rem, overflow hidden, background #ffffff0d. Its photo is an absolute inset 0 tile.
    - Each cell has a check badge: absolute, top and right .55rem, a 1.35rem circle, background #ffffffd9, ink #2c1433, holding a .75rem check stroke (width 2, round caps).
    - Selected cells (class sel) get a 2px solid #cbb6ea outline at offset −2px, and their badge turns #cbb6ea.
    - Cells in order:
      1. styled:0 (selected)
      2. studio:0
      3. styled:1
      4. life:1 (selected)
      5. styled2:3
      6. ringa:1
      7. styled2:0 (selected)
      8. life:3
      9. styled:4
      10. studio:1
- **Alternate collage** (ai__grid-alt). Hidden on desktop and used from 991px down. Three columns:
  1. Column 1: studio:1 (tall), then styled:0.
  2. Middle column (md): ringa:1, then life:1.
  3. Column 3: studio:2 (tall), then styled2:3.

### 6.7 Section 4, Four steps (section.list)

- **Structure.**
  - The section has margin-top 8rem.
  - #list is on its inner list__wrap (relative flex column).
  - Inside, list__main__wrap (relative, overflow hidden) holds four slides.
  - Each slide (list__main__slide) is 100vh tall.
  - Inside each slide is a content wrap at 100% width and height with **perspective 250vw**.
  - Inside that is the content card (list__main__content): absolute, inset 0, flex column, space-between, padding 7.5rem 3rem 3rem, colour #3a1d43, --ink #3a1d43, overflow hidden, with its gradient class s1 to s4.
- **Top block** (st__top).
  - **Title row.** Flex, space-between, top-aligned.
    - The headline is an h3 (st__h) at 4.6rem, line-height 1, weight 400, letter-spacing −.14rem. Its italic span is 1.08em with letter-spacing −.04rem.
    - The step number (st__num) is 8.5rem, line-height .85, weight 500, letter-spacing −.4rem.
    - Both the headline and the number carry data-flash-stb.
  - **Info grid.** Two equal columns, gap 3rem, margin-top 2.6rem. Each column holds:
    - A bullet tag (st__tag): flex, gap .7rem, 1.45rem, weight 500, letter-spacing −.03rem, preceded by a .8rem round dot in #b9a4ea.
    - A paragraph (st__p): margin .6rem 0 0 1.5rem, so it is indented under the tag text. 1.15rem, line-height 1.4, colour #3a1d43b3.
- **Card row** (st__row). Flex, gap 1rem, height min(27rem, 37vh). Four cards.
  - Each card (st__card): relative, flex 1, radius 1.6rem, overflow hidden, box-shadow 0 1.5rem 3rem #3a1d431a, holding an absolute inset 0 photo tile.
  - The first card has class w (flex 1.95).
  - Glass caption (st__cap): absolute, left, right and bottom .8rem, z-index 2, height 2.8rem, padding 0 1rem, radius 1rem, flex, space-between, background #2c143352 with a 10px backdrop blur, white, .85rem, weight 500. Two spans: a label and an arrow glyph.
  - Chip (st__chip): absolute, top and left .8rem, z-index 2, flex, gap .4rem, padding .35rem .7rem, pill radius, background #ffffffd9, ink #3a1d43, .72rem, weight 500. An optional .8rem icon sits inside. With class spin, the icon is the spin symbol ticking through spinStep (1s, steps(8)).
  - A card with class pick gets a 3px solid #fff outline at offset −3px.
  - The `.st__cta` rule is defined but unused.

Slide contents (a line break inside a headline or paragraph is shown as " / "):

| Slide | Gradient | Headline (italic word) | Number | Bullet 1 tag / text | Bullet 2 tag / text | Cards (left to right) |
|---|---|---|---|---|---|---|
| 1 | s1 | "Add products / and *looks.*" | 01 | "20+ model presets" / "Stack your products, faces / and skin tones side by side." | "Multiple pose choices" / "Front, profile and close-up / poses from a single upload." | Wide prod:0 with caption "Lunelle skincare set" and "→"; faces:1 with pick outline and chip "Selected"; faces:0; faces:2 |
| 2 | s2 | "AI generates / *options.*" | 02 | "Mood & lighting variations" / "Dream up new scenes, / moods and setups." | "Multiple visual directions" / "Explore different looks, / textures and styles." | Wide styled:0 with spinning chip "Generating…" (spin icon) and caption "Lunelle Serum Collection" and "→"; styled:1; ringa:1; styled2:1 |
| 3 | s3 | "Choose your / *favorite.*" | 03 | "Side-by-side comparison" / "Keep the versions you love / from every new batch." | "Easy selection & review" / "Tap to keep, swipe to drop, / share picks with your team." | Wide styled2:0 with caption "Travertine · picked" and "→"; life:0 (fy .3) with pick and chip "Kept"; styled2:2; styled:4 with pick and chip "Kept" |
| 4 | s4 | "Ready-made / assets *export.*" | 04 | "Optimized for PDP & ads" / "Export every look right to / your store, ads, and reels." | "One-click export" / "Every size and crop, / sent in a single click." | Wide life:2 (fy .35) with caption "Summer glow campaign · 24 assets" and "↓"; studio:1 (fy .2); base:1; pre:1 (fy .3) |

The page ends after slide 4. There is no footer.

---

## 7. Responsive behaviour

### ≤ 991px (tablet)

- **Root.** The scale switches to the 1.878vw formula. --h1 becomes 4.5rem and --h2 5.5rem.
- **Header.** Unchanged.
- **Menu.** The open state uses the narrower size (16.2rem × 39rem, padding 5rem 1rem 1rem 1rem).
- **Hero.**
  - --R becomes min(30vw, 30svh) and min-height 52rem.
  - The chip list moves to a horizontal strip: top auto, bottom 5.5rem, left and right 0, height 2.5rem, centred. Its wrap becomes a 32rem-wide row with gap 0.
  - Each row becomes a horizontal flex with padding-right .5rem and no bottom padding. The animation variables change to start translate (0%, 0%) and end (−100%, 0%), so the same keyframe now scrolls left.
  - The fades become 7rem-wide left and right side fades with the 90deg gradients.
- **How it works.**
  - The top row becomes a column. The left block goes full width with gap 2rem and padding-bottom 3rem.
  - The crawling column becomes flex none at 26rem tall.
  - The bottom row becomes a column with gap 1.25rem, and both halves go full width.
- **Photoshoots panel.**
  - Panel height becomes 66rem.
  - The desktop showcase strip is hidden. The alternate collage shows instead: absolute, top 9rem, left and right 0, padding 0 2rem, flex, gap 1rem, top-aligned, centred.
  - Side columns are flex columns with gap 1rem and padding-top 2.5rem. The middle column is flex 1 with no top padding.
  - Tiles have radius .5rem and are 13rem × 13rem. Tall tiles (class t) are 18rem tall. The first middle tile is full width × 24rem, and the second middle tile is 13rem tall.
- **Steps.** Content padding 6.5rem 2rem 2rem, headline 3.6rem, number 6rem.

### ≤ 767px (mobile)

- **Root.** The scale switches to the 4.145vw formula. Type variables: h1 2.5rem, h2 2.25rem, h25 2.25rem, h3 1.5rem, body2 .875rem, tag 1rem.
- **Preloader.** Logo and loader 2.5rem, images 10.5 × 16rem.
- **Header.**
  - Aligned to the top, padding 1.2rem 1rem.
  - The left block goes to auto width and the "Reshoot" word is hidden, so only the logo shows.
  - The right block (sign-in and Get started) is hidden. The centre pill stays.
- **Menu.**
  - The outer wrapper is right-aligned with padding-right .65rem, and the holder is 16.2rem wide.
  - The card uses gap 2rem and each group gets padding-bottom 1rem.
  - The collapsed state is 15.5rem × 2.7rem with y .5rem.
  - The auth group appears as a row with gap .25rem, holding the full-width "Get started" button (flex 1).
- **Hero.**
  - --R becomes min(35vw, 28svh), min-height 42rem, padding 8rem 1rem 2rem.
  - The ring and headline layers get bottom 4rem, which lifts their centre.
  - The chip strip sits at bottom 3.5rem and its wrap goes full width.
  - The headline font-size becomes R × .165.
- **How it works.**
  - Padding 5rem 1rem. The left heading is 2.5rem with letter-spacing −.06rem.
  - The crawl column is 15rem tall, its phrases 2.6rem with letter-spacing −.08rem, and its item padding 1rem 0 1.2rem.
  - The bottom row's margin-top becomes 2.5rem.
  - Tiles are 9 × 6.5rem, with row gap and padding-right of .75rem.
  - Wordmarks: base 1.15rem, b 1.4rem, c .75rem.
- **Photoshoots panel.**
  - Radius 1.5rem, height 36.5rem, padding 2rem.
  - The spark button shrinks to 2.5rem (icon 1.4rem) and moves to top 1.35rem, right 2rem, bottom auto.
  - Title block, h3 and body copy go full width. The line break in the body copy is hidden.
  - Alternate collage: top 5rem, padding 0 1rem, gap .5rem. Columns have gap .5rem and padding-top 1.5rem.
  - Tiles are 6rem square and tall tiles 8.5rem. The first middle tile is 13rem tall and the second middle tile is hidden.
- **Steps.**
  - Section margin-top 5rem. Content padding 6rem 1rem 1.25rem.
  - Headline 2.25rem with letter-spacing −.05rem. Number 3.4rem with letter-spacing −.12rem.
  - The info grid becomes one column with gap 1rem and margin-top 1.5rem. Tags are 1.05rem. Paragraphs are .9rem with margin-top .3rem.
  - The card row becomes a two-column grid with rows of 9rem and 7rem, auto height and gap .5rem. The wide card spans both columns, the fourth card is hidden, and captions are 2.2rem tall at .75rem.

---

## 8. Animations and interactions

### 8.1 Preloader timeline

- **Start.** It starts on window load, or immediately if document.readyState is already "complete". A failsafe setTimeout calls it after 8000 ms. A started flag makes it run only once.
- **Returning visitors.** It reads localStorage "reshoot_preloader_v1" and treats the visitor as returning if the value is "1", then writes "1". The speed factor sp is 1/5 for a returning visitor and 1 otherwise. Both reads and writes are in try/catch.
- **Scroll lock.** It scrolls to (0, 0), then sets overflow hidden on both html and body.
- **Image hard-cuts.** A setInterval every 500 × sp ms (100 ms when returning) sets z-index 9 on the layer at the current index and 1 on the others, then advances the index modulo 4.
  - Before the first tick the last DOM layer (pre:1) is on top.
  - From then on the sequence is pre:3 (0.5 s), pre:0 (1.0 s), pre:2 (1.5 s), pre:1 (2.0 s), and so on.
  - These are instant cuts with no crossfade.
- **New-visitor counter.**
  - Steps are 0, 17, 35, 58, 76, 89, 100 with total T = 2.5 s, run on a GSAP timeline with delay .5.
  - Each segment tweens a plain number from the previous step to the next over 2.5/6 ≈ 0.4167 s with ease power2.out, writing Math.round of the value into the counter.
  - The first segment is 0 to 0, a short hold. The counter reaches 100 at 3.0 s.
  - The number is printed with no "%" sign.
- **Returning-visitor text.** The counter text becomes "Synced". It also gets its own fromTo: from opacity 0, y 8px, blur 6px to opacity 1, y 0, blur 0, over .2 s with delay .1 and ease power2.out.
- **Main timeline.**
  1. Set all direct children of the preloader to visibility visible.
  2. Fade them in: fromTo opacity 0 with filter blur(20px) to opacity 1 with blur(0px), duration 1 × sp, stagger .05 × sp, ease power2.out. The three children are the counter, the logo/loader row and the image stack.
  3. Fade them out: opacity 0 with blur(20px), duration 1 × sp, delay 2.5 × sp, stagger .05 × sp, ease power2.in.
  4. Fade the whole preloader to opacity 0 over .6 × sp with ease power2.in.
- **On complete.**
  - Remove is-loading from html and set the preloader to visibility hidden.
  - Dispatch the document event "preloader:done", which starts the hero intro.
  - Clear the image interval.
  - After 1 × sp seconds (gsap.delayedCall), release the scroll lock.

### 8.2 Opening sequence table (first visit, seconds from window load)

| Element | Property | Starts at | Duration | Stagger | Ease |
|---|---|---|---|---|---|
| Preloader children (3) | opacity 0→1, blur 20px→0 | 0 | 1.0 | 0.05 | power2.out |
| Preloader photos | hard-cut z-index swaps | 0.5, then every 0.5 | instant | — | — |
| Counter | 0→17→35→58→76→89→100 | 0.5 (first segment holds at 0) | 6 × 0.4167 = 2.5 | sequential | power2.out per segment |
| Preloader children | opacity 1→0, blur 0→20px | 3.6 | 1.0 | 0.05 | power2.in |
| Preloader overlay | opacity 1→0 | 4.7 | 0.6 | — | power2.in |
| "preloader:done" fires (T₀) | — | ≈ 5.3 | — | — | — |
| Hero text words (©, year, "scroll", "down", headline words) | flash keyframes | T₀ + 0 | 0.15 per word | 0.2 per word, per element | power2.out |
| Header logo link | opacity 0→1, y 24→0, scale .9→1 | T₀ + 0.10 | 0.5 | — | power2.out |
| Header pill + menu holder | same | T₀ + 0.20 | 0.6 | — | power2.out |
| Ring cards (8) | opacity 0→1, scale .5→1 | T₀ + 0.30 | 0.5 | 0.12 | power2.out |
| Sign-in + Get started (is-header-btn) | opacity 0→1, y 24→0, scale .9→1 | T₀ + 0.35 | 0.5 | — | power2.out |
| Hero chips (12) | opacity 0→1, x 40→0, scale .9→1 | T₀ + 0.35 | 0.5 | 0.12 | power2.out |
| Scroll unlock | overflow restored | T₀ + 1.0 | — | — | — |

On a returning visit, every preloader value is divided by 5, so T₀ ≈ 1.06 s. The hero intro timings stay the same.

### 8.3 Hero intro details

At script start, unless reduced motion is on, GSAP sets these hidden states:

- Every data-hero-text element: opacity 0.
- Header logo link, header pill, menu holder and .is-header-btn: opacity 0, y 24, scale .9.
- Ring cards: opacity 0, scale .5.
- Hero chips: opacity 0, x 40, scale .9.

On "preloader:done", playHeroIntro builds a timeline. Each data-hero-text element is word-split (see 8.11), its words are set to opacity 0 in the violet flash colour, and the element itself is set to opacity 1. All three elements' word tweens are placed at time 0 with stagger .2 and ease power2.out, using three keyframes per word:

1. opacity 1 in --flash-a over .05.
2. Colour to --flash-b over .05.
3. Opacity to the word's stored final opacity (1, or .5 inside .u-fonts-50) and colour to var(--fonts-100) over .05.

So each word blinks violet, then pink, then settles to ink. The headline's words are "Your", "shelves,", "radiantly", "re-shot.", and the italic span keeps its styling. The other tweens follow the table above.

### 8.4 Ring rotation

- On load, each holder is set to rotate d and its photo to rotate −d. This runs even with reduced motion.
- Unless reduced motion is on:
  - hero__carousel__in rotates to 360 over 32 s, ease none, repeat −1. The ring turns clockwise.
  - Every ring photo rotates by "−=360" over 32 s, ease none, repeat −1.
- The two cancel out, so every photo stays perfectly upright while its card tilts around the orbit. The intro's scale and opacity tweens act on the cards, not the photos, so they don't conflict with the rotation.

### 8.5 Hero chip loop

The CSS keyframe "hero-row" runs 24 s, linear, infinite. It goes from translate(var(--tx, 0%), var(--ty, 0%)) to translate(var(--tx-end, 0%), var(--ty-end, −100%)). With two identical rows, the list scrolls up seamlessly, one row-height (100%) per cycle. At ≤991 the variables change it to a leftward horizontal scroll (see section 7). The 7rem mainbg fades soften the entry and exit.

### 8.6 Menu open and close

- **Open timeline** (paused). Tween the card to y 0 and the open width, height and padding over .4 s with ease power2.out. Then tween the groups to opacity 1, stagger .05, duration .3, starting .2 s before the first tween ends ("−=0.2").
- **Burger timeline** (paused, duration .25, ease power2.out, both bars at time 0):
  - The top bar goes from y −.2rem to y .025rem and rotate 45.
  - The bottom bar goes from y .2rem to y −.025rem and rotate −45.
  - Transform origin is centred, which forms an X.
- **Label scramble.**
  - Total frames T = 20, one frame every 20 ms. L is the longer of the old and new label lengths.
  - On frame f, character i shows the new character if i is within the new label and f/T > i/L. Otherwise it shows "•".
  - After frame 20 the text is set to the final label and the interval clears.
  - The label scrambles to "Close" on open and back to "Menu" on close.
- **Opening.** Set the open flag, add class is-open to the button, play the burger timeline, scramble to "Close", set aria-label to "Close menu" and play the open timeline.
- **Closing.**
  - Clear the flag, remove is-open, reverse the burger, scramble to "Menu" and set aria-label to "Open menu".
  - Tween the groups in reverse DOM order to opacity 0 (stagger .05, duration .2).
  - Call the open timeline's reverse with argument .3. In GSAP this jumps the playhead to 0.3 s and plays backward from there, so the close is a quick ~0.3 s collapse, not a delay.
- **Close triggers.** Clicking the button while open, clicking anywhere outside both the card and the button, pressing Escape, and clicking any menu group (so following a link closes it).
- **Resize.** While open, the card tweens to the new open size over .2 s. While closed, it snaps to the new collapsed state.

### 8.7 Hover-stagger roll (buttons and menu links)

- **Scope.** Every [hover-stagger] element. Skipped entirely under reduced motion. The hover target is the closest [hover-stagger-wrap] ancestor (the whole pill for buttons), or the element itself for menu links.
- **Setup.**
  - The element gets position relative (if unset), display inline-block (if unset) and overflow hidden, plus the 100% × 70% centred mask from section 5.
  - Its text moves into a span, and a clone of that span is placed absolutely at left 0, top 100%, directly underneath.
  - SplitType splits both spans into characters.
- **Animation.** A paused timeline (defaults: duration .2, stagger .02, ease power1.inOut) tweens the original characters and the clone characters from yPercent 0 to −100 at the same time, with opacity held at 1. The label rolls up letter by letter and the copy rolls in from below.
- **Triggers.** mouseenter calls restart. mouseleave calls reverse.

### 8.8 Scroll percentage indicator

A requestAnimationFrame loop runs forever, including under reduced motion. Each frame computes m = scrollHeight − innerHeight. The value is 0 if m ≤ 0, otherwise scrollY / m × 100 clamped to 0–100. It writes Math.round(value) + "%" into #progress. The markup holds "100%" until the first frame.

### 8.9 Theme toggle

- **Storage.** The localStorage key is "reshoot-light" and holds the string "true" or "false". The default is "true" (blush) when the key is missing or invalid.
- **apply(on).** Toggles class light on body, writes the key (in try/catch) and sets aria-pressed on every [data-theme-toggle] to the opposite of on, so pressed means night. Except during the initial apply, it dispatches a window CustomEvent "theme:changed" with detail on.
- **Clicks.** A click flips the current state.
- **Icons.** CSS shows the sun in blush and the moon in night.
- **Flash colours.** Word-flash colours are read from the body's computed --flash-a and --flash-b. The scroll-flash colours are captured when the page loads.

### 8.10 Scroll word flashes

- **Targets.** Every [data-flash] element (the How it works heading and the Photoshoots h3) and every [data-flash-stb] element (the four step headlines and four step numbers).
- **Setup.** Each is word-split. Unless reduced motion is on, its words are set to opacity 0 in --flash-a.
- **Trigger.** A ScrollTrigger on the element with start "top 90%" and once: true.
- **Animation.** Words staggered .1 apart, three keyframes each:
  1. opacity 1 in --flash-a over .2 with ease power2.out.
  2. Colour to --flash-b over .05.
  3. Colour to the final ink over .1. The final ink is var(--ink) (#3a1d43) for data-flash-stb, otherwise var(--fonts-100).

### 8.11 Word-split helper

A TreeWalker collects every text node inside the element. Each node is split on whitespace runs, keeping the whitespace as plain text nodes. Each non-blank piece is wrapped in a span with the given class (flash-word or hero-flash-word). Its data-final-opacity is .5 if the text node's parent is inside a .u-fonts-50 element, otherwise 1. Nested markup such as the italic spans and line breaks is preserved, because only text nodes are replaced.

### 8.12 How it works column crawl and brightness

- **Crawl.** CSS keyframe "columnanima": translateY 0% to −100% over 24 s, linear, infinite, on both duplicated columns. The phrase list rises endlessly inside the masked 34rem window.
- **Brightness loop.** A requestAnimationFrame loop with fadeFinish = .15. Each frame, for each of the six phrases, it measures the phrase relative to the window:
  - top = phrase top − window top, bottom = top + phrase height, H = window height.
  - Default opacity is .2.
  - If the phrase is at least partly visible (bottom > 0 and top < H):
    - n = clamp(1 − bottom / H, 0, 1)
    - p = clamp(n / (1 − .15), 0, 1)
    - opacity = .2 + .8 × p
- **Effect.** Phrases near the bottom of the window sit at .2. They brighten linearly as they rise and reach full opacity once their bottom edge is in the top 15% of the window. The mask then fades them out at the very top.

### 8.13 Trusted-by marquee

The CSS keyframe "marquee" runs translateX 0% to −100% over 24 s, linear, infinite, on both duplicated rows. This gives a seamless leftward loop. Each row's padding-right equals the gap, so the seam stays even. The 6.5rem side fades blend the tiles into the page.

### 8.14 Step slides: pinned 3D stack

This applies to every slide except the last, and is skipped under reduced motion.

- **Tween 1: tip back and shrink.** Tween the content card to:
  - rotationZ = (Math.random() − .5) × 10, a random tilt between −5° and +5°, chosen once per page load
  - scale .7
  - rotationX 40
  - ease power1.in

  Its ScrollTrigger pins the slide's content wrap (the element carrying perspective 250vw), with the slide as trigger, start "top 0%", end "+=" + innerHeight (one viewport of scroll) and scrub true. Pin spacing uses GSAP defaults.
- **Tween 2: fade.** Tween the same card to autoAlpha 0 with ease power1.in. Its ScrollTrigger has the card as trigger, start "top −80%", end "+=" + 0.5 × innerHeight and scrub true.
- **Effect.** As you scroll past a slide, it holds in place while it tips backward away from you, shrinks and twists slightly, then fades out across the last stretch of the pin. The next pastel slide scrolls up to replace it. The fourth slide is never transformed.
- Inside step 02, the "Generating…" chip icon ticks constantly via spinStep.

---

## 9. Reduced motion (prefers-reduced-motion: reduce)

- **Preloader.** The inline head script removes is-loading at once. The CSS media query sets the preloader to display none. The preloader JS also hides it, removes is-loading and returns early: no scroll lock, no counter, no localStorage write.
- **CSS animations.** These are set to none with !important: the hero chip rows, the How it works columns, the marquee rows, the preloader spinner and the step chip spinner.
- **Ring.** The cards are placed at their angles with upright photos but don't rotate.
- **Hero intro.** Not run, and the hidden starting states are never applied, so the header, hero text, ring cards and chips are visible right away.
- **Scroll flashes.** Words are still split into spans but never hidden or animated.
- **Hover-stagger.** Not set up at all, so links and buttons keep plain text.
- **Step pin and 3D stack.** Not created. The four slides scroll normally as 100vh panels.
- **Still active:**
  - The menu open/close timeline, burger and scramble (not gated)
  - The theme toggle
  - The percentage readout
  - The How it works brightness loop, which keeps applying position-based opacities to the now-static column
  - The ResizeObserver photo cropping

---

## 10. Acceptance checklist

- [ ] One index.html with inline CSS and JS. GSAP 3.12.5, ScrollTrigger 3.12.5 and SplitType 0.3.4 load from the exact CDN URLs in section 4. The only local files are assets/fonts/inter-var.woff2 and assets/fonts/instrument-serif-italic.woff2, downloaded from the two Google Fonts URLs.
- [ ] The root font-size uses all five rules with the exact coefficients, so 1rem = 16px at 1728px wide. The type-scale variables and their ≤991 and ≤767 overrides match.
- [ ] body starts with "body light". Blush is the default, night tokens are exactly as tabled, and the toggle persists "reshoot-light" as "true" or "false".
- [ ] All ten sheets load through images.higgs.ai with the exact encoded URLs and w values from section 2.2. No cloudfront URL is used directly as a background.
- [ ] Every .ph tile crops with the 8px inset, the cover scale k = max(ew/w, eh/h), the focal fx and fy (default .5) and a shared ResizeObserver. The data-fy overrides are .3, .35, .2 and .3 where listed. No white gutter shows in any tile.
- [ ] Every data-img key sits where section 2.5 says, including the preloader's DOM order pre:3, pre:0, pre:2, pre:1 and the ring's angle-to-key mapping.
- [ ] The preloader runs: blur in (1 s), stepped counter 0→100 in six power2.out segments starting at .5 s, 0.5 s photo hard-cuts, blur out at 3.6 s, overlay fade at 4.7 s, then "preloader:done". Returning visitors run at 1/5 speed with "Synced". The 8 s failsafe exists.
- [ ] The hero ring has eight cards at 45° steps on radius --R = min(22vw, 35svh). Cards are .37R × .44R with radius .12R, and photos are .52R and upright. The ring spins 360° per 32 s while the photos counter-rotate. The headline is R × .172 and sits inside the ring.
- [ ] Hero words flash violet → pink → ink at .2 s stagger. The header pops in with y 24 and scale .9 at .1, .2 and .35. Ring cards scale from .5 with .12 stagger from .3. Chips slide from x 40 with .12 stagger from .35.
- [ ] Hero chips loop vertically over 24 s on desktop and horizontally at ≤991.
- [ ] The header pill shows Menu, the theme toggle and a live rounded scroll percentage. The menu grows from 15rem × 2.7rem to 18rem × 39rem over .4 s. The label scrambles with "•" over 20 frames of 20 ms, and the burger rotates to ±45°. The menu closes on outside click, Escape and link click.
- [ ] Buttons and menu links roll their characters up (−100% yPercent, .2 s, .02 stagger, power1.inOut) on hover and reverse on leave.
- [ ] How it works: the heading flashes at "top 90%" once. The three-phrase column crawls up over 24 s inside a 12/88 mask, and phrase opacity follows the .2 + .8p formula with fadeFinish .15. The ten-tile wordmark marquee runs left over 24 s with edge fades.
- [ ] The Photoshoots panel is full-bleed, 70rem tall with 3rem radius. It has the tag, the heading (flashes) and body copy, the base:0 card, the arrow and the dark dashboard: "Generated photos", "Lunelle Serum · 10 of 24", "✦ Generate more", five columns of 3:4 cells with check badges, and cells 1, 4 and 7 selected. The dashboard bleeds off the right edge, and the white spark button sits bottom-right. Below 991px the alternate collage shows instead.
- [ ] Four 100vh step slides with the exact gradients, headlines, numbers, bullets, captions and chips. Slides 1 to 3 pin for one viewport and tween to rotationX 40, scale .7 and a random ±5° Z rotation with power1.in. They fade with autoAlpha from "top −80%" over half a viewport.
- [ ] The mobile layout matches section 7: logo-only header, right-aligned menu with a Get started button, smaller ring, two-column card grid with the fourth card hidden, and so on.
- [ ] Reduced motion matches section 9 exactly.
- [ ] No real brand names appear anywhere. "Reshoot", "Lunelle" and every wordmark are invented.