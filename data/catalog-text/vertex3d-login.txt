# Prompt: Vertex3D log-in page

Build a single-file, responsive **log-in page for a fictional AI 3D-graphics tool, Vertex3D**. Use plain HTML, CSS, inline SVG and vanilla JS, with no framework and no build step. It's a dark split screen. The left half is a near-black log-in panel. The right half is a black showcase that fades to deep violet, with a glowing headline and an iridescent toy robot on a pedestal circled by a pink orbit ring.

## Media

- **Robot:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3fd6651e-dc6b-4339-a93a-fb627c0109e0.png`, a transparent PNG of a cute robot made of iridescent holographic glass (pink, violet and blue reflections). It has a dark visor with two glowing lilac eyes, round ear discs and an antenna. It stands on a dark chrome cylindrical pedestal with a magenta rim light.
- **Placement:** inside the showcase SVG (viewBox 0 0 421 1200), the robot is an `<image>` 96 wide, bottom-anchored at y = 470 and centred at x = 216.5.
  - It sits between the back half of the orbit ellipse (drawn first) and the front half (drawn after), so the ring wraps around the pedestal.

## Type and colour

- **Font:** **Inter** 300/400/500/600.
- **Colours:** auth panel #090909, fields #080808 with faint borders, and a pink accent #E98AE0, with links in pink #F29AD9.

## Left: log-in

- **Header:** the logo (a pink-to-violet gradient flame) and "Vertex**3D**" (the light weight is on "3D"). A dark "English ⌄" language select sits at the right.
- **Form:**
  - "Welcome!" with "Log in to Vertex3D to continue to Vertex3D."
  - Two wide outline buttons, "Log in with Google" and "Log in with Apple", using the standard marks.
  - An "OR" divider.
  - The "Email" field.
  - The "Password" field, with "Forgot password?" (pink, underlined) beside its label and an eye toggle inside it.
  - A disabled dark "Log in" button, which becomes active once both fields are filled.
  - "Don't have an account? **Sign up**".

## Right: showcase

- **Headline:** about 31px Inter 500: "400K+ users. 50M+ AI" in white, then "generated graphics." in a pink-to-lilac gradient.
- **Join Now:** a small pink triangle pointer and a pink gradient "Join Now" pill.
- **Scene:**
  - a faint, ghosted giant "3D" outline behind
  - the robot on its pedestal
  - a thin pink orbit ellipse around the pedestal, with a glowing pink dot on the front
  - a soft magenta floor glow at the bottom

## Motion

- **Entrance (CSS keyframes, about 1.8s):** the brand and form rise in order, the headline types up, the scene fades up, and the Join Now pill pops in.
- **Focus:** fields show a pink ring.
- **Reduced motion:** no entrance.

## Phone

- **Layout:** the showcase hides and the log-in panel fills the screen.

## Acceptance check

- **Showcase:** the iridescent robot stands on its pedestal, inside the pink ring, below the glowing headline.
- **Brand:** "Vertex3D" everywhere.
- **Content:** no real brands except the standard Google and Apple sign-in marks.