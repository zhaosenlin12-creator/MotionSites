# Prompt: Recreate the Keylight sign-in page exactly

Copy everything below the line into your AI coding tool.

---

Recreate the **Keylight** sign-in page: one self-contained `index.html` (inline CSS + vanilla JS, no framework, no build step). It must match **exactly**, so reproduce the source at the end byte for byte. Do not restyle, re-time or refactor anything.

## What it is

- **Split screen.**
  - **Left:** a brand panel about 41% wide on a 1470√ó900 design frame. It holds:
    - a still of a keyhole cut into a dark navy wall, with warm orange light pouring through it into blue haze
    - two pure-CSS light layers over the still, both on `alternate` loops: a warm bloom over the keyhole that swells and fades (5.5s), and a cool drift in the beam below it (9s)
    - the "keylight." logo
    - the headline "Unlock calmly. Grow without worry." and a grey paragraph
    - a marquee of frosted-glass testimonial cards that runs forever (42s) and pauses on hover
    - "Relied on by teams that build" with six customer marks
    - the copyright line
  - **Right:** the sign-in panel:
    - "Hello again!" / "Sign in to carry on."
    - a dark **"Unlock using a passkey"** button with a fingerprint icon and a blue "Most secure" pill
    - "Or use your password", then email/username and password fields (with show/hide), "Remember me", "Forgot your key?" and a black "Sign in" button
    - "Or continue with": Google, Apple, GitHub
    - "No Keylight space yet? Open a free space", and the Terms ¬∑ Privacy ¬∑ Support footer
- **Scaling:** everything is sized in design pixels √ó `--u`, so the whole layout scales with the viewport. Below 740px it becomes one column: still band (logo + headline, showing the blue beam) ‚Üí form ‚Üí still band (testimonials + logos + copyright). There are no light layers on phones.
- **Entrance:** a Web Animations timeline runs once on load:
  - headlines rise line by line out of masks
  - the form rows settle, the passkey button lands with a hair of scale, and the divider rules draw outward
  - the cards lift in, then the quiet details fade in
- **Reduced motion:** the page is static: no marquee and no light layers.
- **The form sends nothing:** submit is prevented in script.

## Media (remote, Higgsfield storage on CloudFront)

- **Keyhole still:** the CSS background (`--brand-img`) of the brand panel and of the phone layout's two bands: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d889cba6-535c-450f-9b74-7270c0e01e9a.webp` (1326√ó1997 WebP). The keyhole sits at the right edge of the panel, fully inside it.

## Font

**Google Sans 400 / 500 / 600 / 700**, self-hosted as `/assets/fonts/google-sans-<weight>.woff2` with the family name `"GS"`. Fallback: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`.

## Acceptance check (1440√ó900)

- **Left:** the whole keyhole glows near the panel's right edge, just past the end of the paragraph, and the copy sits on dark navy. The bloom breathes and the testimonial cards drift left.
- **Right:**
  - "Hello again!" is left-aligned at 32 design px, above the dark passkey button with its blue pill.
  - The "Or use your password" divider comes next, then the form and the three provider buttons.
  - The footer links are centred at the bottom.

---

## Source (`public/index.html`, reproduce byte for byte)

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Sign in ¬∑ Keylight</title>
<meta name="theme-color" content="#030712">
<style>
/* ------------------------------------------------------------------
   Fonts ‚Äî Google Sans (SIL OFL 1.1), embedded so the page works offline
   ------------------------------------------------------------------ */
@font-face{font-family:"GS";font-style:normal;font-weight:400;font-display:block;src:url(/assets/fonts/google-sans-400.woff2) format("woff2")}
@font-face{font-family:"GS";font-style:normal;font-weight:500;font-display:block;src:url(/assets/fonts/google-sans-500.woff2) format("woff2")}
@font-face{font-family:"GS";font-style:normal;font-weight:600;font-display:block;src:url(/assets/fonts/google-sans-600.woff2) format("woff2")}
@font-face{font-family:"GS";font-style:normal;font-weight:700;font-display:block;src:url(/assets/fonts/google-sans-700.woff2) format("woff2")}

/* ------------------------------------------------------------------
   Design tokens. Every length below is written in design pixels of the
   1470 √ó 900 reference frame and multiplied by --u.
   Desktop + tablet (split, >= 740px):
       --u = max(floor, min(viewport-width/1470, viewport-height/900))
       floor = .8 on desktops, rising fluidly to 1 by 940px wide, so the
       desktop frame (scale >= .8) is untouched and tablets never shrink
       text below the design's 14px body size.
   Mobile (stacked, < 740px): --u = 1px (true design pixels).
   ------------------------------------------------------------------ */
:root{
  --u:1px;
  --font:"GS",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;

  --ink:#030712;          /* headings, button, checkbox, strong text */
  --muted:#4a4d54;        /* labels, sub copy, placeholders */
  --icon:#4e5157;         /* input icons */
  --line:#e5e5e5;         /* borders + divider */
  --paper:#ffffff;
  --on-ink:#f9fafb;

  --hero-title:#e5e6ee;
  --hero-copy:rgba(255,255,255,.50);
  --hero-faint:rgba(255,255,255,.50);
  --hero-rule:rgba(255,255,255,.22);
  --logo-ink:rgba(199,210,254,.55);

  --glass-bg:rgba(11,8,19,.44);
  --glass-border:rgba(255,255,255,.10);
  --glass-filter:blur(16px) saturate(.8);

  --shadow-xs:0 1px 2px 0 rgba(0,0,0,.05);
}
:root{--brand-img:url(https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d889cba6-535c-450f-9b74-7270c0e01e9a.webp)}
@media (min-width:740px){
  :root{
    /* width-driven floor (.8 -> 1 between 1176px and 940px wide), but never more
       than the height can hold (the brand column needs 772 design px). On phone
       landscape (< 500px tall) scrolling is unavoidable, so readability wins. */
    --u-floor:min(clamp(.8px, calc(.8px + (1176px - 100vw) / 1180), 1px), max(.8px, calc(100vh / 772), calc(500px - 100vh)));
    --u:min(4px, max(var(--u-floor), min(calc(100vw / 1470), calc(100vh / 900))));
  }
  @supports (height:100dvh){
    :root{
      --u-floor:min(clamp(.8px, calc(.8px + (1176px - 100vw) / 1180), 1px), max(.8px, calc(100dvh / 772), calc(500px - 100dvh)));
      --u:min(4px, max(var(--u-floor), min(calc(100vw / 1470), calc(100dvh / 900))));
    }
  }
}
/* Portrait split (large tablets, portrait monitors): plenty of height, so use
   the full design scale rather than the width-squeezed one. */
@media (min-width:740px) and (orientation:portrait){
  :root{ --u-floor:min(1px, calc(100vh / 772)); }
  @supports (height:100dvh){ :root{ --u-floor:min(1px, calc(100dvh / 772)); } }
}

*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{
  font-family:var(--font);
  background:var(--paper);
  color:var(--ink);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  text-rendering:optimizeLegibility;
  font-feature-settings:"kern" 1;
}
button,input{font:inherit;color:inherit}
a{color:inherit;text-decoration:none}
[hidden]{display:none!important}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

/* ==================================================================
   Shell ‚Äî two panels, always full height: no letterboxing, ever
   ================================================================== */
.shell{display:flex;min-height:100vh;min-height:100dvh;width:100%}

/* ---------------- Brand panel (left) ---------------- */
.brand{
  position:relative;
  flex:0 0 calc(100% * 610 / 1470);
  max-width:calc(100% - 450 * var(--u)); /* tablet: keeps >= 450 for the form column */
  min-height:100vh;min-height:100dvh;
  display:flex;flex-direction:column;justify-content:space-between;gap:calc(24 * var(--u));
  container-type:inline-size;
  padding:calc(32 * var(--u)) 0 calc(32 * var(--u));
  overflow:hidden;
  isolation:isolate;
  color:#fff;
  background:#0b0a1f var(--brand-img) center / cover no-repeat;
}
/* the keyhole breathes: a warm bloom over the keyhole that swells and fades, and a cool drift
   in the beam below it. Pure CSS over the still, behind the content (the panel isolates). */
.brand::before,.brand::after{content:"";position:absolute;pointer-events:none;z-index:-1}
.brand::before{
  left:58%;top:6%;width:62%;height:42%;
  background:radial-gradient(closest-side,rgba(255,170,72,.55),rgba(255,120,40,.18) 55%,transparent);
  mix-blend-mode:screen;filter:blur(calc(6 * var(--u)));
  animation:bloom 5.5s cubic-bezier(.45,0,.55,1) infinite alternate;
}
.brand::after{
  left:-10%;top:42%;width:120%;height:50%;
  background:radial-gradient(closest-side,rgba(70,120,255,.32),transparent);
  mix-blend-mode:screen;
  animation:drift 9s cubic-bezier(.45,0,.55,1) infinite alternate;
}
@keyframes bloom{
  from{opacity:.35;transform:scale(.9)}
  to{opacity:1;transform:scale(1.12)}
}
@keyframes drift{
  from{opacity:.45;transform:translate3d(-6%,2%,0)}
  to{opacity:1;transform:translate3d(6%,-3%,0)}
}
/* Content column: 144 inset + 338 measure on desktop. When the panel narrows
   (tablet), the inset gives way first (144 -> 24), then the right margin,
   and only then the measure itself. */
.brand__inset{
  --inset:clamp(calc(24 * var(--u)), calc(100cqi - 465.75 * var(--u)), calc(144 * var(--u)));
  --measure:min(calc(338 * var(--u)), calc(100cqi - var(--inset) - 24 * var(--u)));
  padding-left:var(--inset);padding-right:calc(24 * var(--u));
}

.logo{display:inline-flex;align-items:center;height:calc(40 * var(--u));gap:calc(10 * var(--u))}
.logo__mark{
  width:calc(40 * var(--u));height:calc(40 * var(--u));flex:none;
  border-radius:calc(12 * var(--u));background:#fff;
  display:grid;place-items:center;
}
.logo__mark svg{width:calc(22 * var(--u));height:calc(22 * var(--u))}
.logo__word{font-size:calc(22 * var(--u));line-height:1;font-weight:600;letter-spacing:-.02em;color:#fff}

.hero__title{
  margin:0;
  max-width:var(--measure);
  /* shrinks only when the measure can no longer hold "Scale confidently." */
  font-size:min(calc(30 * var(--u)), calc(var(--measure) / 7.9));
  line-height:min(calc(36 * var(--u)), calc(var(--measure) / 7.9 * 1.2));
  font-weight:600;letter-spacing:-.034em;
  color:var(--hero-title);
}
.hero__copy{
  margin:calc(11.5 * var(--u)) 0 0;
  max-width:var(--measure);
  font-size:calc(16 * var(--u));line-height:calc(24 * var(--u));
  font-weight:400;color:var(--hero-copy);
}

/* testimonial marquee */
.reel{position:relative;margin-top:calc(40 * var(--u));height:calc(260 * var(--u))}
.reel__track{
  position:absolute;left:0;top:0;display:flex;gap:calc(16 * var(--u));
  transform:translateX(calc(-43 * var(--u)));
  animation:reel 42s linear infinite;
  will-change:transform;
}
@media (hover:hover){.reel:hover .reel__track{animation-play-state:paused}}
@keyframes reel{
  from{transform:translateX(calc(-43 * var(--u)))}
  to{transform:translateX(calc((-43 - 828) * var(--u)))}
}
.card{
  flex:none;width:calc(260 * var(--u));height:calc(260 * var(--u));
  display:flex;flex-direction:column;justify-content:space-between;
  padding:calc(24 * var(--u));
  border:calc(1 * var(--u)) solid var(--glass-border);
  border-radius:calc(14 * var(--u));
  background:var(--glass-bg);
  -webkit-backdrop-filter:var(--glass-filter);
  backdrop-filter:var(--glass-filter);
}
.card__quote{
  margin:0;font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));
  font-weight:400;color:rgba(255,255,255,.87);
  position:relative;top:calc(-1 * var(--u));
}
.card__who{display:flex;align-items:center;justify-content:space-between;gap:calc(12 * var(--u));height:calc(32 * var(--u))}
.card__id{min-width:0;display:flex;flex-direction:column;position:relative;top:calc(-1 * var(--u))}
.card__name{font-size:calc(13 * var(--u));line-height:calc(16 * var(--u));font-weight:600;letter-spacing:-.05em;color:rgba(255,255,255,.9);white-space:nowrap}
.card__role{margin-top:calc(1.5 * var(--u));font-size:calc(12 * var(--u));line-height:calc(16 * var(--u));color:rgba(255,255,255,.47);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.avatar{
  flex:none;width:calc(32 * var(--u));height:calc(32 * var(--u));border-radius:50%;
  display:grid;place-items:center;
  font-size:calc(11 * var(--u));font-weight:600;letter-spacing:.02em;color:rgba(255,255,255,.9);
  box-shadow:inset 0 0 0 calc(1 * var(--u)) rgba(255,255,255,.18);
}
.avatar--a{background:linear-gradient(135deg,#f6b6a0,#8d6ab8)}
.avatar--b{background:linear-gradient(135deg,#9aa3b8,#3c4256)}
.avatar--c{background:linear-gradient(135deg,#ffb36b,#5b6cd6)}

/* trusted-by */
.trust{margin-top:calc(39.5 * var(--u));container-type:inline-size}
.trust__rule{display:flex;align-items:center;gap:calc(8 * var(--u));max-width:var(--measure)}
.trust__rule::before,.trust__rule::after{content:"";flex:1;height:calc(1 * var(--u));background:var(--hero-rule)}
.trust__label{font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));color:rgba(255,255,255,.92);white-space:nowrap}
.marks{max-width:var(--measure);margin-top:calc(24.5 * var(--u));display:flex;flex-direction:column;gap:calc(20 * var(--u))}
.marks__row{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:calc(14 * var(--u)) calc(22 * var(--u));min-height:calc(20 * var(--u))}
.mark{display:inline-flex;align-items:center;gap:calc(5 * var(--u));color:var(--logo-ink);font-size:calc(17 * var(--u));line-height:1;font-weight:500;letter-spacing:-.02em;white-space:nowrap}
.mark svg{width:calc(17 * var(--u));height:calc(17 * var(--u));flex:none}
.mark--word{font-weight:700;letter-spacing:-.04em}
/* When the column can't hold the 4-up row (narrow tablet / small phone),
   the six marks re-flow as an even 3 x 2 grid instead of orphaning one. */
@container (max-width:333.5px){
  .marks{display:grid;grid-template-columns:repeat(3,auto);justify-content:center;justify-items:center;gap:calc(14 * var(--u)) calc(12 * var(--u))}
  .marks__row{display:contents}
}

.legal{margin:0;font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));color:var(--hero-faint);text-wrap:balance}

/* ---------------- Auth panel (right) ---------------- */
.auth{
  flex:1 1 auto;min-width:0;
  min-height:100vh;min-height:100dvh;
  display:flex;flex-direction:column;
  background:var(--paper);
}
.auth__main{flex:1;display:flex;align-items:center;justify-content:center;padding:calc(33.5 * var(--u)) calc(24 * var(--u)) 0}
.panel{width:calc(402 * var(--u));max-width:100%}

.panel__title{margin:0;font-size:calc(32 * var(--u));line-height:calc(40 * var(--u));font-weight:600;letter-spacing:-.022em;color:var(--ink)}
.panel__sub{margin:calc(2 * var(--u)) 0 0;font-size:calc(17 * var(--u));line-height:calc(24 * var(--u));color:var(--muted)}

.form{margin-top:calc(20 * var(--u))}

/* passkey first (recommended): the strongest action, above the password form */
.passkey-slot{margin-top:calc(24 * var(--u));height:calc(44 * var(--u));padding:calc(1 * var(--u))}
.passkey{
  display:flex;align-items:center;gap:calc(12 * var(--u));width:100%;height:100%;
  padding:0 calc(10 * var(--u)) 0 calc(16 * var(--u));
  border:0;border-radius:calc(8 * var(--u));background:var(--ink);color:var(--on-ink);
  font-size:calc(15 * var(--u));line-height:calc(20 * var(--u));font-weight:500;cursor:pointer;text-align:left;
  transition:background-color .15s ease;
}
@media (hover:hover){.passkey:hover{background:#111827}}
.passkey:focus-visible{outline:calc(2 * var(--u)) solid #9ca3af;outline-offset:calc(2 * var(--u))}
.passkey__icon{width:calc(22 * var(--u));height:calc(22 * var(--u));flex:none}
.passkey__label{flex:1}
.pill{
  flex:none;padding:calc(3 * var(--u)) calc(8 * var(--u));border-radius:calc(6 * var(--u));
  background:#3b4fd8;color:#eef0ff;font-size:calc(11.5 * var(--u));line-height:calc(14 * var(--u));font-weight:500;letter-spacing:.005em;
}
.or.or--top{margin-top:calc(20 * var(--u))}
.field + .field{margin-top:calc(15 * var(--u))}
.label{display:block;font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));font-weight:400;color:var(--muted)}
.control{position:relative;margin-top:calc(7 * var(--u))}
.control__icon{
  position:absolute;left:calc(9.5 * var(--u));top:50%;transform:translateY(-50%);
  width:calc(16 * var(--u));height:calc(16 * var(--u));color:var(--icon);pointer-events:none;
}
.input{
  display:block;width:100%;height:calc(36 * var(--u));
  padding:0 calc(40 * var(--u)) 0 calc(30 * var(--u));
  font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));color:var(--ink);
  background:var(--paper);
  border:calc(1 * var(--u)) solid var(--line);
  border-radius:calc(8 * var(--u));
  box-shadow:var(--shadow-xs);
  outline:none;
  transition:border-color .15s ease, box-shadow .15s ease;
}
.input::placeholder{color:var(--muted);opacity:1}
.input:focus-visible{border-color:#a3a3a3;box-shadow:var(--shadow-xs),0 0 0 calc(3 * var(--u)) rgba(163,163,163,.35)}
.reveal{
  position:absolute;right:calc(4.25 * var(--u));top:50%;transform:translateY(-50%);
  width:calc(28 * var(--u));height:calc(28 * var(--u));padding:0;border:0;background:none;cursor:pointer;
  display:grid;place-items:center;color:var(--icon);border-radius:calc(6 * var(--u));
}
.reveal svg{width:calc(14 * var(--u));height:calc(14 * var(--u))}
.reveal::after{content:"";position:absolute;inset:-6px}
.reveal:focus-visible{outline:calc(2 * var(--u)) solid #a3a3a3;outline-offset:0}

.row{margin-top:calc(16 * var(--u));display:flex;align-items:center;justify-content:space-between;height:calc(20 * var(--u))}
.check{display:inline-flex;align-items:center;gap:calc(12.5 * var(--u));cursor:pointer;font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));color:var(--ink)}
.check input{position:absolute;opacity:0;width:1px;height:1px}
.check__text{position:relative;top:calc(-1 * var(--u))}
.check__box{
  width:calc(16 * var(--u));height:calc(16 * var(--u));flex:none;border-radius:calc(4 * var(--u));
  border:calc(1 * var(--u)) solid var(--line);background:var(--paper);box-shadow:var(--shadow-xs);
  display:grid;place-items:center;color:var(--on-ink);
}
.check__box svg{width:calc(11 * var(--u));height:calc(11 * var(--u));opacity:0}
.check input:checked + .check__box{background:var(--ink);border-color:var(--ink)}
.check input:checked + .check__box svg{opacity:1}
.check input:focus-visible + .check__box{box-shadow:0 0 0 calc(3 * var(--u)) rgba(163,163,163,.45)}
.link-strong{font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));font-weight:500;color:var(--ink)}
@media (hover:hover){.link-strong:hover{text-decoration:underline;text-underline-offset:calc(3 * var(--u))}}

.cta-slot{margin-top:calc(20 * var(--u));height:calc(36 * var(--u));padding:calc(1 * var(--u))}
.cta{
  display:flex;align-items:center;justify-content:center;width:100%;height:100%;
  border:0;border-radius:calc(8 * var(--u));background:var(--ink);color:var(--on-ink);
  font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));font-weight:500;cursor:pointer;
  transition:background-color .15s ease;
}
@media (hover:hover){.cta:hover{background:#111827}}
.cta:focus-visible{outline:calc(2 * var(--u)) solid #9ca3af;outline-offset:calc(2 * var(--u))}

.or{margin-top:calc(24 * var(--u));display:flex;align-items:center;gap:calc(16 * var(--u));height:calc(20 * var(--u))}
.or::before,.or::after{content:"";flex:1;height:calc(1 * var(--u));background:var(--line);transform:translateY(calc(-.5 * var(--u)))}
.or span{font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));color:var(--muted);white-space:nowrap}

.providers{margin-top:calc(24 * var(--u));display:flex;flex-direction:column;gap:calc(12 * var(--u))}
.provider{
  display:flex;align-items:center;justify-content:center;gap:calc(8 * var(--u));
  height:calc(36 * var(--u));width:100%;
  border:calc(1 * var(--u)) solid var(--line);border-radius:calc(8 * var(--u));
  background:var(--paper);box-shadow:var(--shadow-xs);cursor:pointer;
  font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));font-weight:500;color:var(--ink);
  transition:background-color .15s ease;
}
@media (hover:hover){.provider:hover{background:#f9fafb}}
.provider:focus-visible{outline:calc(2 * var(--u)) solid #a3a3a3;outline-offset:calc(2 * var(--u))}
.provider__mark{width:calc(16 * var(--u));height:calc(16 * var(--u));flex:none}

.switch{margin:calc(24 * var(--u)) 0 0;text-align:center;letter-spacing:-.0045em;font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));color:var(--muted)}
.switch a{font-weight:600;color:var(--ink)}
@media (hover:hover){.switch a:hover{text-decoration:underline;text-underline-offset:calc(3 * var(--u))}}

.auth__foot{padding:calc(24 * var(--u)) calc(24 * var(--u)) calc(33 * var(--u));display:flex;justify-content:center;gap:calc(12 * var(--u))}
.auth__foot a{font-size:calc(14 * var(--u));line-height:calc(20 * var(--u));color:var(--muted)}
@media (hover:hover){.auth__foot a:hover{color:var(--ink)}}

/* ==================================================================
   Touch: inputs at 16px+ so iOS/iPadOS never zoom on focus
   ================================================================== */
@media (pointer:coarse){
  .input{font-size:max(16px, calc(14 * var(--u)))}
}

/* ==================================================================
   Mobile architecture (< 740px)
   Below 740px the split cannot hold both a 290px brand column (one full
   glass card + inset) and a 450px auth column (402px form + gutters).
   The same DOM is re-placed on a single-column grid:
     [gradient]  logo ¬∑ headline ¬∑ copy
     [paper]     sign-in form ¬∑ legal links
     [gradient]  testimonials ¬∑ trusted-by ¬∑ copyright
   Brand and auth wrappers become display:contents so their children are
   grid items; the two gradient bands are the grid's own ::before/::after.
   ================================================================== */
@media (max-width:739.98px){
  :root{--g:clamp(16px, 5vw, 32px)}

  .shell{
    display:grid;grid-template-columns:minmax(0,1fr);
    grid-template-rows:auto auto 1fr auto auto auto auto;
  }
  .shell::before,.shell::after{
    content:"";grid-column:1;z-index:0;
    background:#0b0a1f var(--brand-img) center top / cover no-repeat;
  }
  .shell::before{grid-row:1 / 3;background-position:center 72%} /* the beam, not the keyhole, behind the phone headline */
  .shell::after{grid-row:5 / 8;background-position:center bottom}

  .brand,.brand__mid,.auth{display:contents}
  .brand::before,.brand::after{display:none}  /* the panel is display:contents here: no layers, the still shows in two bands */
  .brand__top,.hero,.auth__main,.auth__foot,.reel,.trust,.brand__bottom{grid-column:1;position:relative;z-index:1}
  .brand__top{grid-row:1}
  .hero{grid-row:2}
  .auth__main{grid-row:3}
  .auth__foot{grid-row:4}
  .reel{grid-row:5}
  .trust{grid-row:6}
  .brand__bottom{grid-row:7}

  /* brand content column */
  .brand__inset{--inset:var(--g);--measure:min(100%, 480px);padding-left:var(--g);padding-right:var(--g)}
  .brand__top{padding-top:calc(20px + env(safe-area-inset-top))}
  .hero{padding-top:32px;padding-bottom:36px}
  .hero__title{max-width:min(100%, 338px);font-size:clamp(26px, 7.6vw, 30px);line-height:1.2}

  /* testimonials: same 260px glass cards, marquee aligned to the gutter */
  .reel{margin-top:40px;height:260px;overflow:clip}
  .reel__track{animation-name:reel-m;transform:translateX(var(--g))}
  @keyframes reel-m{
    from{transform:translateX(var(--g))}
    to{transform:translateX(calc(var(--g) - 828px))}
  }
  .trust{margin-top:36px}
  .brand__bottom{padding-top:36px;padding-bottom:calc(28px + env(safe-area-inset-bottom))}

  /* auth */
  .auth__main{align-items:flex-start;padding:32px var(--g) 8px}
  .input{height:40px;font-size:16px}
  .cta-slot{height:42px}
  .provider{height:40px}
  .reveal{width:36px;height:36px;right:0}
  .check{padding-block:6px;margin-block:-6px}
  .link-strong{padding-block:8px}
  .auth__foot{padding:4px var(--g) 28px;gap:4px}
  .auth__foot a{padding:12px 4px}
}

@media (prefers-reduced-motion:reduce){
  .reel__track{animation:none}
  .brand::before,.brand::after{animation:none}
  *{transition:none!important}
}
/* ==================================================================
   Entrance ‚Äî pre-roll states only.
   Applied solely while <html> has .is-entering (set by a tiny head script
   when motion is allowed). The timeline removes the class on its first
   frame; a 3s failsafe removes it if the script never runs.
   Backgrounds are never touched: the gradient and the paper are the stage.
   ================================================================== */
html.is-entering :is(
  .logo__mark,.logo__word,.hero__title,.hero__copy,.card,
  .trust__label,.marks__row,.legal,
  .panel__title,.panel__sub,.passkey-slot,.field,.row,.cta-slot,.or span,.provider,.switch,.auth__foot a
){opacity:0}
html.is-entering :is(.or,.trust__rule)::before,
html.is-entering :is(.or,.trust__rule)::after{opacity:0}

/* line masks used only during the headline reveal (removed afterwards) */
/* clip, not overflow+padding: zero layout footprint, room for descenders */
.e-line{display:block;clip-path:inset(0 -.1em -.25em -.1em)}
.e-in{display:block}
</style>
<script>
/* Entrance pre-roll: only when motion is welcome and WAAPI exists. Failsafe un-hides after 3s. */
(function(){var d=document.documentElement;
  if(!('animate' in d)||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))return;
  d.classList.add('is-entering');
  window.__entranceFailsafe=setTimeout(function(){d.classList.remove('is-entering')},3000);
})();
</script>
</head>
<body>
<div class="shell">

  <!-- ============================ BRAND PANEL ============================ -->
  <aside class="brand" aria-label="About Keylight">
    <div class="brand__inset brand__top">
      <a class="logo" href="#" aria-label="Keylight home">
        <span class="logo__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9.5" r="5" stroke="#030712" stroke-width="2.6"/><rect x="10.7" y="13" width="2.6" height="8" rx="1.3" fill="#030712"/></svg>
        </span>
        <span class="logo__word">keylight.</span>
      </a>
    </div>

    <div class="brand__mid">
      <div class="brand__inset hero">
        <h2 class="hero__title">Unlock calmly. Grow without worry.</h2>
        <p class="hero__copy">Sign in with a glance, not a guess. Made to keep every team in flow while each account stays sealed.</p>
      </div>

      <div class="reel" aria-label="What teams say">
        <div class="reel__track">
          <figure class="card" style="margin:0"><blockquote class="card__quote">"Passkeys rolled out in one single afternoon. Our support queue for lost passwords simply went quiet."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Nora Lindqv</span><span class="card__role">Co-founder, Tidewater</span></span><span class="avatar avatar--a" aria-hidden="true">NL</span></figcaption></figure>
          <figure class="card" style="margin:0"><blockquote class="card__quote">"Exactly the right mix of strictness and ease. It let us ship our new app weeks ahead of the plan we made."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Ravi Shankar</span><span class="card__role">Head of Platform at Copperline AI</span></span><span class="avatar avatar--b" aria-hidden="true">RS</span></figcaption></figure>
          <figure class="card" style="margin:0"><blockquote class="card__quote">"Sign-in is now the part nobody asks about. Rollout was quick, and the final flow feels really finished."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Maren Okonkwo</span><span class="card__role">Design Lead at Fernhill Co</span></span><span class="avatar avatar--c" aria-hidden="true">MO</span></figcaption></figure>
          <figure class="card" aria-hidden="true" style="margin:0"><blockquote class="card__quote">"Passkeys rolled out in one single afternoon. Our support queue for lost passwords simply went quiet."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Nora Lindqv</span><span class="card__role">Co-founder, Tidewater</span></span><span class="avatar avatar--a" aria-hidden="true">NL</span></figcaption></figure>
          <figure class="card" aria-hidden="true" style="margin:0"><blockquote class="card__quote">"Exactly the right mix of strictness and ease. It let us ship our new app weeks ahead of the plan we made."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Ravi Shankar</span><span class="card__role">Head of Platform at Copperline AI</span></span><span class="avatar avatar--b" aria-hidden="true">RS</span></figcaption></figure>
          <figure class="card" aria-hidden="true" style="margin:0"><blockquote class="card__quote">"Sign-in is now the part nobody asks about. Rollout was quick, and the final flow feels really finished."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Maren Okonkwo</span><span class="card__role">Design Lead at Fernhill Co</span></span><span class="avatar avatar--c" aria-hidden="true">MO</span></figcaption></figure>
          <figure class="card" aria-hidden="true" style="margin:0"><blockquote class="card__quote">"Passkeys rolled out in one single afternoon. Our support queue for lost passwords simply went quiet."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Nora Lindqv</span><span class="card__role">Co-founder, Tidewater</span></span><span class="avatar avatar--a" aria-hidden="true">NL</span></figcaption></figure>
          <figure class="card" aria-hidden="true" style="margin:0"><blockquote class="card__quote">"Exactly the right mix of strictness and ease. It let us ship our new app weeks ahead of the plan we made."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Ravi Shankar</span><span class="card__role">Head of Platform at Copperline AI</span></span><span class="avatar avatar--b" aria-hidden="true">RS</span></figcaption></figure>
          <figure class="card" aria-hidden="true" style="margin:0"><blockquote class="card__quote">"Sign-in is now the part nobody asks about. Rollout was quick, and the final flow feels really finished."</blockquote><figcaption class="card__who"><span class="card__id"><span class="card__name">Maren Okonkwo</span><span class="card__role">Design Lead at Fernhill Co</span></span><span class="avatar avatar--c" aria-hidden="true">MO</span></figcaption></figure>
        </div>
      </div>

      <div class="brand__inset trust">
        <div class="trust__rule"><span class="trust__label">Relied on by teams that build</span></div>
        <div class="marks" aria-label="Customer logos">
          <div class="marks__row">
            <span class="mark"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5c.6 5.2 3.3 7.9 8.5 8.5v0c-5.2.6-7.9 3.3-8.5 8.5c-.6-5.2-3.3-7.9-8.5-8.5c5.2-.6 7.9-3.3 8.5-8.5Z" transform="translate(0 2)"/></svg>Brisko</span>
            <span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 13l8-7 8 7"/><path d="M4 19l8-7 8 7"/></svg>Lantern</span>
            <span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/></svg>Velum</span>
            <span class="mark mark--word">orrick</span>
          </div>
          <div class="marks__row">
            <span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M2.5 9c2.4-2.4 4.8-2.4 7.2 0s4.8 2.4 7.2 0 3.4-1.6 4.6-1.2"/><path d="M2.5 16c2.4-2.4 4.8-2.4 7.2 0s4.8 2.4 7.2 0 3.4-1.6 4.6-1.2"/></svg>Tessa</span>
            <span class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true"><circle cx="11" cy="13" r="7"/><circle cx="19.5" cy="4.5" r="2.5" fill="currentColor" stroke="none"/></svg>Quarra</span>
          </div>
        </div>
      </div>
    </div>

    <div class="brand__inset brand__bottom">
      <p class="legal">¬© 2026 Keylight, Inc. All rights reserved.</p>
    </div>
  </aside>

  <!-- ============================ AUTH PANEL ============================ -->
  <main class="auth">
    <div class="auth__main">
      <section class="panel" aria-labelledby="signin-title">
        <h1 class="panel__title" id="signin-title">Hello again!</h1>
        <p class="panel__sub">Sign in to carry on.</p>

        <div class="passkey-slot">
          <button class="passkey" type="button">
            <svg class="passkey__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></svg>
            <span class="passkey__label">Unlock using a passkey</span>
            <span class="pill">Most secure</span>
          </button>
        </div>

        <div class="or or--top" role="separator"><span>Or use your password</span></div>

        <form class="form" id="signin" novalidate>
          <div class="field">
            <label class="label" for="identity">Email or username</label>
            <div class="control">
              <svg class="control__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input class="input" id="identity" name="identity" type="text" autocomplete="username" placeholder="Enter your email or username" required>
            </div>
          </div>

          <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control">
              <svg class="control__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input class="input" id="password" name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required>
              <button class="reveal" type="button" aria-label="Show password" aria-pressed="false" aria-controls="password">
                <svg class="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/></svg>
                <svg class="eye-off" hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m2 2 20 20"/></svg>
              </button>
            </div>
          </div>

          <div class="row">
            <label class="check">
              <input type="checkbox" name="remember" checked>
              <span class="check__box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
              <span class="check__text">Remember me</span>
            </label>
            <a class="link-strong" href="#">Forgot your key?</a>
          </div>

          <div class="cta-slot"><button class="cta" type="submit">Sign in</button></div>
        </form>

        <div class="or" role="separator"><span>Or continue with</span></div>

        <div class="providers">
          <!-- Each provider slot is 16√ó16: place the provider's official mark from its brand kit here. -->
          <button class="provider" type="button"><svg class="provider__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/></svg><span>Continue with Google</span></button>
          <button class="provider" type="button"><svg class="provider__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/></svg><span>Continue with Apple</span></button>
          <button class="provider" type="button"><svg class="provider__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/></svg><span>Continue with GitHub</span></button>
        </div>

        <p class="switch">No Keylight space yet? <a href="#">Open a free space</a></p>
      </section>
    </div>

    <nav class="auth__foot" aria-label="Legal">
      <a href="#">Terms</a><a href="#">Privacy</a><a href="#">Support</a>
    </nav>
  </main>
</div>

<script>
(() => {
  const btn = document.querySelector('.reveal');
  const pw = document.getElementById('password');
  btn.addEventListener('click', () => {
    const show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    btn.setAttribute('aria-pressed', String(show));
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    btn.querySelector('.eye-open').hidden = show;
    btn.querySelector('.eye-off').hidden = !show;
  });
  document.getElementById('signin').addEventListener('submit', e => {
    e.preventDefault();
    const bad = [...e.target.querySelectorAll('.input')].find(i => !i.value.trim());
    if (bad) { bad.focus(); return; }
  });
})();

/* ==================================================================
   Entrance ‚Äî one master timeline, played once on first load.
   Built on the Web Animations API (no dependency). Every tween is placed on
   the same clock via `delay`, resolves to the authored style, and is
   cancelled when the whole timeline has finished ‚Äî leaving the page static.

   Motion vocabulary
     RISE     headlines rise line-by-line out of an invisible line mask
     SETTLE   supporting copy + form rows: short rise with opacity
     LIFT     glass cards: rise + scale .985 -> 1, layered behind the copy
     DRAW     hairline rules grow outward from the label they frame
     PRESENCE micro / legal details: opacity only, nearly unnoticed

   Eye path:  brand mark  ->  statement  ->  greeting  ->  form, top to bottom
              (cards lift in beneath while the form resolves)  ->  quiet details
   ================================================================== */
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('is-entering')) return;      // reduced motion / no WAAPI
  let started = false;

  const EXPO   = 'cubic-bezier(.16,1,.3,1)';    // decisive start, long silk finish
  const QUINT  = 'cubic-bezier(.22,1,.36,1)';
  const DRAW   = 'cubic-bezier(.65,0,.35,1)';   // symmetric, for lines being drawn
  const SOFT   = 'cubic-bezier(.33,1,.68,1)';

  const start = () => {
    if (started) return;
    started = true;
    clearTimeout(window.__entranceFailsafe);
    try { run(); } catch (e) { root.classList.remove('is-entering'); }
  };
  // fonts are embedded; wait for them (max 400ms) so line masks match final wrapping
  Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 400))])
    .then(() => requestAnimationFrame(start));

  function run() {
    const $  = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const W = innerWidth, H = innerHeight;

    // one design pixel at the current scale (--u), and a calmer distance on phones
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;width:calc(100 * var(--u))';
    document.body.appendChild(probe);
    const u = probe.getBoundingClientRect().width / 100 || 1;
    probe.remove();
    const k = matchMedia('(max-width:739.98px)').matches ? .75 : 1;
    const d = px => +(px * u * k).toFixed(2);

    const anims = [], restores = [];
    // only the opening composition performs; anything below the fold is simply there
    const inView = el => { const r = el.getBoundingClientRect(); return r.height > 0 && r.bottom > 0 && r.top < H && r.right > 0 && r.left < W; };
    const play = (el, frames, delay, duration, easing, pseudoElement) => {
      const opts = { delay, duration, easing, fill: 'both' };
      if (pseudoElement) opts.pseudoElement = pseudoElement;
      anims.push(el.animate(frames, opts));
    };

    /* ---- behaviours ---- */
    const RISE = (el, t, dur = 950, stagger = 90) => {
      if (!el || !inView(el)) return t;
      splitLines(el).forEach((line, i) =>
        play(line, [{ transform: 'translateY(125%)' }, { transform: 'none' }], t + i * stagger, dur, EXPO));
    };
    const SETTLE = (el, t, y = 10, dur = 640, scale) => {
      if (!el || !inView(el)) return;
      const from = `translate3d(0,${d(y)}px,0)` + (scale ? ` scale(${scale})` : '');
      play(el, [{ opacity: 0, transform: from }, { opacity: 1, transform: 'none' }], t, dur, QUINT);
    };
    const LIFT = (el, t) => {
      if (!el || !inView(el)) return;
      play(el, [{ opacity: 0, transform: `translate3d(0,${d(28)}px,0) scale(.985)` }, { opacity: 1, transform: 'none' }], t, 1050, EXPO);
    };
    const DRAWN = (el, pseudo, t, origin) => {
      if (!el || !inView(el)) return;
      const base = getComputedStyle(el, pseudo).transform;
      const b = base && base !== 'none' ? base + ' ' : '';
      play(el, [{ opacity: 1, transformOrigin: origin, transform: b + 'scaleX(0)' },
                { opacity: 1, transformOrigin: origin, transform: b + 'scaleX(1)' }], t, 760, DRAW, pseudo);
    };
    const PRESENCE = (el, t, dur = 520) => {
      if (!el || !inView(el)) return;
      play(el, [{ opacity: 0 }, { opacity: 1 }], t, dur, SOFT);
    };

    /* headline line masks: wrap each rendered line, restore the original markup afterwards */
    function splitLines(el) {
      const original = el.innerHTML;
      const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(w => `<span class="e-w">${esc(w)}</span>`).join(' ');
      const lines = []; let top = null;
      $$('.e-w', el).forEach(s => { if (s.offsetTop !== top) { top = s.offsetTop; lines.push([]); } lines[lines.length - 1].push(s.textContent); });
      el.innerHTML = lines.map(l => `<span class="e-line"><span class="e-in">${l.map(esc).join(' ')}</span></span>`).join('');
      restores.push(() => { el.innerHTML = original; });
      return $$('.e-in', el);
    }

    /* ---- MASTER TIMELINE (ms) ---- */
    // 01  brand signature: the mark settles, the wordmark is unveiled from it
    SETTLE($('.logo__mark'), 0, 0, 760, .86);
    if (inView($('.logo__word')))
      play($('.logo__word'), [{ opacity: 1, clipPath: 'inset(-30% 100% -30% 0)', transform: `translate3d(${-d(8)}px,0,0)` },
                              { opacity: 1, clipPath: 'inset(-30% -6% -30% 0)', transform: 'none' }], 90, 860, EXPO);

    // 02  the statement ‚Äî the loudest type on the page rises first
    RISE($('.hero__title'), 160);

    // 03  the greeting answers it on the right, same vocabulary, quieter
    RISE($('.panel__title'), 320, 860);
    SETTLE($('.panel__sub'), 430, 8, 600);
    SETTLE($('.passkey-slot'), 500, 10, 680, .985);
    const orTop = $('.or--top');
    DRAWN(orTop, '::before', 560, 'right center');
    DRAWN(orTop, '::after', 560, 'left center');
    PRESENCE($('.or--top span'), 600, 480);

    // 04  supporting copy under the statement
    SETTLE($('.hero__copy'), 470, 12, 720);

    // 05  the form resolves top to bottom; the CTA lands with a hair of scale
    $$('.form .field, .form .row').forEach((el, i) => SETTLE(el, 620 + i * 70, 10, 620));
    SETTLE($('.cta-slot'), 840, 10, 680, .985);

    // 06  glass testimonials lift in underneath, in reading order (left -> right)
    $$('.card').filter(inView)
      .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)
      .forEach((c, i) => LIFT(c, 620 + i * 90));

    // 07  divider draws outward from its label, then the providers settle
    const or = $('.or:not(.or--top)');
    DRAWN(or, '::before', 900, 'right center');
    DRAWN(or, '::after', 900, 'left center');
    PRESENCE($('.or:not(.or--top) span'), 940, 480);
    $$('.provider').forEach((el, i) => SETTLE(el, 960 + i * 60, 8, 560));

    // 08  quiet details close the composition
    const rule = $('.trust__rule');
    DRAWN(rule, '::before', 1000, 'right center');
    DRAWN(rule, '::after', 1000, 'left center');
    PRESENCE($('.trust__label'), 1060);
    PRESENCE($('.switch'), 1080);
    $$('.marks__row').forEach((el, i) => PRESENCE(el, 1140 + i * 80, 600));
    $$('.auth__foot a').forEach((el, i) => PRESENCE(el, 1160 + i * 40, 480));
    PRESENCE($('.legal'), 1280, 520);

    // the first frame already carries every pre-roll state (fill: both), so lift the CSS veil now
    root.classList.remove('is-entering');

    // 09  stillness: cancel every tween (each ends on the authored style), restore markup
    Promise.all(anims.map(a => a.finished)).then(() => {
      anims.forEach(a => a.cancel());
      restores.forEach(f => f());
    }, () => restores.forEach(f => f()));
  }
})();
</script>
</body>
</html>
```