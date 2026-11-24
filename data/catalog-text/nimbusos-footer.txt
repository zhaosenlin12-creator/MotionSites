# Prompt: NimbusOS footer section

Build a single-file **footer section** for a fictional digital-growth agency, **NimbusOS**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. A deep indigo, photographic "sky" with a soft diagonal light fold fills the screen. A white newsletter call-to-action sits on it at the top left, and a crisp white footer card floats above a striped indigo floor at the bottom.

## Media

- **Sky:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4ec0de15-9d60-43b1-a76e-7d721f094fd6.jpg`. A deep indigo-to-violet gradient with a soft diagonal light fold, `background-size: cover`, anchored to the bottom centre.
- **Floor:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cadf77d3-d2b1-45a2-800b-5f96d6ec3f18.jpg`. Horizontal indigo and lavender stripes, stretched to 100% width and 157.5u tall at the bottom. Its top 8u fades in with a mask.
- **Grain:** a fine SVG noise overlay at 7% opacity in `soft-light` blend, tiled at 220u.
- **Background colour:** `#03063A` behind everything. The background never moves.

## Scale

- **Units:** every size is in reference pixels of a 1433×1098 artboard, multiplied by `--u = min(100vw/1433, max(.68px, 100vh/1098))`.
- **Fill:** the page is one viewport tall. A flexible spacer between the hero and the card absorbs any extra height, so there are never blank bands.

## Type and colour

- **Font:** a neo-grotesk (Helvetica Neue style), weight 400 only. Headings get a hair of text stroke.
- **Colours:**
  - brand indigo `#111884`, hover `#1A23A6`
  - ink `#000`, muted text `#4E4E51` / `#59595C`
  - rules `#E0E1E9`, card `#FEFEFE`

## Hero (top left, 47u in, 35u down)

- **Badge:** a 43u white note badge with a folded top-right corner and an indigo notes glyph.
- **Headline:** "Let Your Work Speak For Itself. / We’ll Handle The Words." at 53.8u on a 66u line, white at 90%, 41u below the badge.
- **Lede:** two lines at 18.6u on a 29.5u line, white at 69%: "We’re here to help you navigate your digital journey. Get in touch with us today to discuss / how we can take your business to the next level."
- **Signup**, 35.7u below:
  - a 530 × 55.5u square email field, white at 20% with a 4u blur, placeholder "Enter Your Mail..."
  - a 193.5u white "Sign Up" button with a 48u indigo square holding a circled arrow
  - the field focuses to white at 26% with a 1.5u inner ring
  - submitting clears the field and shows "Thanks — we’ll be in touch."

## Footer card

- **Card:** square-cornered white, 48u from each side, sitting right on top of the floor. A fine double inner border and a crisp 1u dark outline with a tiny drop line underneath.
- **Top row:** 360u tall, 62u top padding, 58u left padding. Grid columns: 469u (flexible), then 236, 207.5, 199.5 and 165u.
  - **Brand column:**
    - an original indigo logo of six small hexagons around a filled centre hexagon (33 × 31u), then "NimbusOS" at 25.4u
    - "The Architect Of / Modern Digital Growth." at 30.6u, 60u below
    - a 177 × 48u indigo "Get In Touch" button with a white square arrow cap
  - **Link columns:** each starts with a 2.4u light rule on its left, a 19.8u heading, then links at 15.8u in muted grey, 19.5u apart. Links turn indigo on hover.
    - Industries: Automotive, Energy & Utilities, Financial, Life Science, Embedded Teams
    - Insights: News, Case Studies, Podcasts, Events, Public Sector
    - Company: About Us, Careers, Join Us, Contact Us, Press
    - Connect: X.com, Instagram, Facebook, LinkedIn, each with a small outline icon
- **Bottom row:** 62u tall, above a hairline. "Privacy Policy · Terms of Use · Cookie Consent" on the left and "© 2025 NimbusOS Ltd. All rights reserved." on the right.

## Motion

- **Entrance:** one Web Animations sequence, about 1.9s, behind an `entrance-pending` class with a 3s failsafe. It starts when the fonts are ready, and any pointer or key press skips it.
  - The badge settles (80ms), then the headline wipes up out of a clip (220ms).
  - The lede, then the signup.
  - In the card: the logo, the headline wipe, the button, then the link columns 90ms apart, and the bottom row last.
- **Hover:** buttons deepen to `#1A23A6`, and links turn indigo.
- **Reduced motion:** no entrance and no transitions.

## Tablet and phone

- **Tablet (768×1024 artboard):** fits one screen with no scrolling, and the spacer takes the extra height.
- **Phone (390×844 artboard):**
  - the link groups become an accessible ARIA tab set (Industries / Insights / Company / Connect) with arrow-key navigation, showing one group at a time in two columns
  - legal links and the copyright stack under them

## Acceptance check (1440×960)

- The indigo sky and striped floor frame a white newsletter block at the top left and a full-width white footer card at the bottom.
- Columns and rules are aligned, and there are no blank bands at any window size.
- **Content:** no real brands or logos.