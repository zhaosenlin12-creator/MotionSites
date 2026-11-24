# Prompt: Cutora log-in hero

Build a single-file, one-screen **log-in page** for a fictional video editor, **Cutora**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is warm and cinematic: a full-bleed upward view between golden glass skyscrapers at sunset fills the page. A big white headline sits over the photo on the left, and a clean white log-in card with amber accents fills the right side.

## Media

- **Plate:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e781b542-a83d-4cf2-a66a-44085485865d.jpg` (2048×1360, 3:2). Looking straight up between glass towers that reflect amber and copper sunset light, a deep blue sky with bright clouds, and a sun flare low on the left. Use `background-size: cover`, centred.
- **Motion:** a muted 4s loop of the same shot covers the plate with the same cover rules: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/197f7e27-faac-4bdc-916c-615ac962bf86.mp4` (1600×1064).
  - The camera glides slowly forward and upward between the towers at a steady speed; clouds drift and the reflections slide.
  - The last second blends into the first, so it loops without a jump and never plays in reverse.
  - Fade it in (0.8s) once its first frame is ready.
- **Readability:** soft shades keep the white type readable: a 150u dark wash from the left, 140u from the top, and a warm `rgba(20,10,0,.38)` → 0 rising 420u from the bottom.
- **Rule:** nothing in the photo is drawn or animated in code. Only the UI animates.

## Scale

- **Units:** every desktop size is in reference pixels of a 1672×941 artboard, multiplied by `--u = max(.62px, min(100vw/1672, 100dvh/941))`. The photo and the card stretch to the edges at other ratios, so there are never letterbox bands.
- **Layout:** a two-column flex row. The hero column fills the left. The card panel on the right is 742.4u wide and sits 18u from the top and right and 22.5u from the bottom, an even margin all round.

## Type and colour

- **Font:** a geometric grotesk (General Sans or Red Hat Display style), variable 300–900.
- **Colours:**
  - ink `#000`, secondary text `#5F636B`, muted `#898D94`, placeholder `#95999F`
  - lines `#E2E4E7` / `#E9EAEC`, card `#FEFEFE`
  - button `#161515`
  - amber `#F59A08`, and lighter amber `#FBAE05` for the link on the photo

## Hero (left, white text)

- **Top bar** (57u from the top, 92.5u from the left):
  - **Logo:** a 48u black rounded tile (radius 12u) holding a thick amber-gradient "C" (`#FFC233` → `#F58A07`), then "Cutora" at weight 680, 35.5u, tracking −.95u.
  - **Link:** on the right, "← Back to Website" in light amber, 17.4u, weight 520.
- **Pitch** (bottom-left):
  - Headline "Edit Smarter. Export Faster. / Create Anywhere.": weight 600, 62u on a 70u line, tracking −2.6u, one line each.
  - Subline (weight 460, 20u on 27.5u, 19u below): "From quick social media clips to full-length videos, our powerful editor / lets you work seamlessly across devices."
  - Slider dots 35.5u below: an amber 34.5×9u pill, then two 9u white dots at 55%, 9u apart. Clicking a dot makes it active.

## Log-in card (right)

- **Card:** white, 20u radius. The form is 559u wide, 96.2u from the card's left edge, and centred vertically.
- **Heading:** "Welcome Back!" at weight 660, 50.6u, tracking −1.9u. Below it, "Log in to start creating stunning videos with ease." (19u, secondary).
- **Fields:**
  - "Email" and "Password" labels (weight 560, 17.4u), each above a 66u input with a 10u radius and a 1u line border.
  - Placeholders: "Input your email" and "Input your password".
  - The password input has an eye toggle on the right that shows the password and draws a slash through the icon.
- **Options row:** a 26u "Remember Me" checkbox (it fills black with a white tick) on the left, and "Forgot Password?" in amber on the right.
- **Login button:** a full-width 66u pill, black, with "Login" in **amber**, 38u below.
- **Divider:** "Or continue with:" with hairlines either side.
- **Google button:** a 66u white pill with the multicolour Google "G" and "Continue with Google".
- **Footer line:** "Don’t have an account? **Sign up here**", with the link in amber.

## Motion (UI)

- **Entrance:** one CSS sequence, about 1.6s, with backwards fill.
  - The logo and link fade up. The card rises and settles (scale .99 → 1).
  - Each headline line wipes up out of a clip, followed by the subline and dots.
  - The heading, subline, fields, row, button, divider, Google button and footer rise in turn.
- **Hover:** the Login button deepens to black with a soft shadow.
- **Reduced motion:** no entrance and no video.

## Tablet and phone

- **Portrait:** fits one screen without scrolling. The photo and pitch sit on top, the card at the bottom, and all sizes scale from a 390×844 artboard. Shorter screens drop the subline.
- **Landscape phone:** a compact side-by-side version from a 700×390 artboard.

## Acceptance check (1440×960)

- The golden towers fill the page, and the camera visibly drifts up between them without a jump at the loop point.
- The headline sits bottom-left, and the white card on the right has an even margin to every edge.
- Every link, the Login text and the active dot are amber.
- **Content:** no real brands except the standard Google sign-in button.