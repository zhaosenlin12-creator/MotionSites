Recreate this EXACT weather dashboard UI as a single self-contained HTML page (inline CSS, SVG icon sprite, no frameworks, no JS required). Pixel-faithful to the reference “Aurora Weather / Weather Forecast — Central Jakarta” liquid-glass dashboard.

═══════════════════════════════════════
TITLE / META
═══════════════════════════════════════
- Document title: Weather Forecast — Central Jakarta
- lang="en"
- viewport: width=device-width, initial-scale=1, viewport-fit=cover
- Fallback page bg: #04121b
- Color ink: #ffffff
- Antialiased Inter stack; font-feature-settings: "kern" 1
- html/body: height 100%; overflow hidden on desktop

═══════════════════════════════════════
FONTS (exact families + weights)
═══════════════════════════════════════
Use Inter + Inter Tight (SIL OFL). Preferred load:

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500&display=swap" rel="stylesheet">

OR embed WOFF2 @font-face for:
- Inter 400, 500, 600, 700
- Inter Tight 500 only

Body font-family:
'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

Headline (h1) font-family:
'Inter Tight', 'Inter', sans-serif
Weight 500, size calc(63*u), line-height calc(78*u), letter-spacing calc(.25*u)

═══════════════════════════════════════
ASSETS (exact URLs / files)
═══════════════════════════════════════
1) FULL-BLEED BACKGROUND (storm landscape photo, 1600×1200 JPEG):
   Local export from original file:
   ./assets/storm-background.jpg
   (Originally embedded as a data:image/jpeg;base64 URI inside CSS.)
   Subject: dramatic dark cumulonimbus storm clouds with multiple lightning bolts over a green field; cool teal-green / deep blue-black atmosphere.
   CSS:
   background-image: url("./assets/storm-background.jpg");
   background-size: cover;
   background-position: center 25%;
   background-repeat: no-repeat;

2) AVATAR PHOTO (only remote image in the original):
   https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80&auto=format
   alt="Calfin Danang"
   loading="eager" decoding="async"
   onerror="this.remove()"  (falls back to inline SVG avatar #i-avatar)
   Circular crop 52×52 (desktop).

3) NO other remote assets. All icons are inline SVG <symbol>s.

═══════════════════════════════════════
SCALING SYSTEM (critical)
═══════════════════════════════════════
Reference canvas: 1357 × 871 CSS px.
Define:
:root {
  --u: min(100vw / 1357, 100dvh / 871);
  --ink: #ffffff;
  --glass: rgba(255,255,255,.155);
  --glass-line: rgba(255,255,255,.20);
  --e-out: cubic-bezier(.16,1,.3,1);
  --e-soft: cubic-bezier(.22,.61,.36,1);
  --e-pen: cubic-bezier(.37,.01,.2,1);
}
@supports not (height: 100dvh) {
  :root { --u: min(100vw / 1357, 100vh / 871); }
}
Every size/spacing uses calc(N * var(--u)). Layout is absolute / edge-anchored so there is never a blank band.

═══════════════════════════════════════
LIQUID GLASS LANGUAGE (exact recipes)
═══════════════════════════════════════
Stage vignette (::after on .stage, pointer-events:none):
  linear-gradient(105deg, rgba(4,16,24,.34) 0%, rgba(4,16,24,.20) 40%, rgba(4,16,24,.06) 78%, transparent 100%),
  linear-gradient(180deg, rgba(4,16,24,.12) 0%, transparent 22%),
  linear-gradient(0deg, rgba(4,16,24,.07), rgba(4,16,24,.07));

SIDEBAR glass:
  background: linear-gradient(180deg,
    rgba(255,255,255,.125) 0%,
    rgba(255,255,255,.135) 13%,
    rgba(255,255,255,.098) 34%,
    rgba(255,255,255,.092) 100%);
  backdrop-filter: blur(calc(18*var(--u))) saturate(115%);
  -webkit-backdrop-filter: same;
  border-radius: calc(26*var(--u));

TOOL BUTTONS / CHIP glass:
  background: rgba(255,255,255,.15)  /* tools */  /  rgba(255,255,255,.175) /* chip */
  backdrop-filter: blur(calc(16*var(--u))) saturate(115%);
  tools: circle 52×52; chip: pill height 36, radius 18, padding-x 15

RIGHT RAIL CARDS glass (the main “liquid glass” panels):
  background: linear-gradient(180deg,
    rgba(255,255,255,.20) 0%,
    rgba(255,255,255,.258) 24%,
    rgba(255,255,255,.252) 78%,
    rgba(255,255,255,.232) 100%);
  backdrop-filter: blur(calc(26*var(--u))) saturate(118%);
  border-radius: calc(24*var(--u))  /* big card: 26 */

Specular sheen coda (cards + chip):
  ::after width 38%, gradient
  linear-gradient(100deg, transparent 0%, rgba(255,255,255,.17) 50%, transparent 100%);
  skewX(-18deg); animation sheen 1.15s var(--e-soft) 2.55s 1 both;
  @keyframes sheen { from { transform: translate3d(-150%,0,0) skewX(-18deg) }
                      to   { transform: translate3d(260%,0,0) skewX(-18deg) } }

Do NOT use opaque white cards, heavy drop shadows, or purple gradients. Glass must feel frosted over the storm photo.

═══════════════════════════════════════
LAYOUT STRUCTURE (desktop absolute positions)
═══════════════════════════════════════
.stage { position:fixed; inset:0; overflow:hidden; }

1) LEFT SIDEBAR (.sidebar)
   left:16u  top:14u  bottom:7u  width:72u
   flex column, align center
   padding-top:22u  padding-bottom:52u
   - Active white pip: left:-2u  top:131u  width:5u height:29u radius:3u
     box-shadow: 0 0 10u rgba(255,255,255,.55)
   - Logo SVG 40×40 (wave-circle mark, rounded square rx=12, white stroke waves)
   - Nav: margin-top 57.5u, gap 43u, icons 23×23 white
     Links aria-labels: Dashboard (aria-current=page), Reports, Explore regions, Calendar, Settings
   - Logout at bottom: Sign out

2) HEADER (.header)
   top:22u  left:126u  right:37u  height:52u
   Left:
     "Welcome" — 16u / weight 400 / color rgba(255,255,255,.93)
     "Calfin Danang" — 19.5u / weight 700 / letter-spacing -0.35u / margin-top 13u
   Right tools gap 16u: Add location (+), Search, Notifications, avatar

3) HERO (.hero)
   left:126u  top:136u  max-width:560u
   Chip text EXACTLY: Weather Forecast
   H1 EXACT spelling (keep the typo): 
     line1: "Strom"
     line2: "with Heavy Rain"
     Each line wrapped as <span class="ln"><span>…</span></span> for mask reveal
   Blurb EXACT copy (with soft line breaks as in original):
     "Partly cloudy with occasional snow showers. High around 50°F.
      Wind from the east 11 to 21 mph. Snow chance is 40%, with
      rainfall expected to be less than an inch."
   Blurb: width 480u, 15.2u / lh 24u / weight 500 / tracking -0.3u / color rgba(255,255,255,.95)

4) FORECAST STRIP (.forecast)
   left:126u  right:396u  bottom:99u
   Hourly/daily temps row (space-between):
     11° cloud | 13° cloud2 | 14° cloud2 | 10° hail | 19° sun | 12° cloud
     Temp type: 37u weight 400 tracking -0.7u
   SVG wave chart viewBox="0 0 835 230" preserveAspectRatio="none"
     height 230u, margin-top 43u, width 100%
     Fill path + 3 stroked outline paths (stroke-width 6.2@opacity.17, 4.6@.26, 3.4@1)
     Stroke uses horizontal white opacity gradient #wg
     Fill uses #wf + vertical fade mask #wfade + clipPath #wclip / #wclipr for wipe-in
     Use pathLength="1" + stroke-dasharray:1 for drawLine animation
     Exact cubic path (start M0,79 … end L835,86 then fill closes to bottom)
   Days under chart (margin-top -31u):
     Sunday Monday Tuesday Wednesday(on/active weight 600) Thursday Friday
     Font 18u weight 500 color rgba(255,255,255,.88); .on = #fff weight 600

5) RIGHT RAIL (.rail)
   right:38u  top:134u  bottom:95u  width:310u
   flex column gap 20u
   Card A (.card.big):
     Central Jakarta + pin icon
     10° C  (big-temp 92u weight 500 tracking -4.4u; “C” in <i>)
     metrics: 19 mph (wind) | 40% (drop) | 15km/h (gust)
   Card B (.card.row height 120u):
     Indonesia / North Jakarta / Mostly Sunny | 12° cloud
   Card C:
     Indonesia / Bandung / Cloudy | 10° cloud
   Card D:
     Indonesia / South Jakarta / Sunny | 14° cloud2

═══════════════════════════════════════
ICON SPRITE (inline SVG symbols, white/currentColor)
═══════════════════════════════════════
Implement exact symbols: i-grid, i-chart, i-globe, i-cal, i-gear, i-out,
i-plus, i-search, i-bell, i-pin, i-wind, i-drop, i-gust,
i-cloud, i-cloud2, i-hail, i-sun, i-avatar (vector fallback portrait).
Logo: circular clip with 7 horizontal wavy polyline strokes + soft square.

═══════════════════════════════════════
ENTRY CHOREOGRAPHY (must match timings)
═══════════════════════════════════════
Keyframes:
- riseIn: opacity 0 → 1, translateY(var(--ry,14px)) → none
- slideL: from -26px X
- slideR: from +30px X + scale(.985)
- popIn: scale .7 → 1
- growY: scaleY 0 → 1 (pip)
- lineUp: translateY(115%) → none (headline mask)
- wipeDown / wipeRight (clip-path)
- drawLine: stroke-dashoffset 1 → 0
- wipeX: scaleX 0 → 1 on #wclipr (fill follows pen)
- sheen: as above

Beat timing (animation-fill-mode: both):
1. Sidebar slideL .92s delay .05s; logo popIn .70s @.26s;
   nav items riseIn .60s delays .36/.41/.46/.51/.56s; logout @.70s; pip growY .50s @.68s
2. hello riseIn .70s @.14s; who .80s @.22s;
   tools popIn .58s delays .30/.365/.43/.495s
3. chip wipeRight .80s @.44s;
   h1 line1 lineUp 1.05s @.56s; line2 @.67s;
   blurb wipeDown .90s @.90s (--e-soft)
4. cards slideR .95s delays .80/.92/1.03/1.14s;
   place/big-temp/metrics + row children staggered ~1.04–1.36s
5. temps riseIn delays 1.26…1.61s step ~.07s
6. Signature: .wline drawLine 1.60s --e-pen @1.50s;
   #wclipr wipeX 1.42s --e-pen @1.72s (fill ~220ms behind pen)
7. days riseIn from 2.10s step .055s
8. Coda sheen @2.55s

prefers-reduced-motion: reduce → kill all animations/transitions; hide sheen ::after; show chart fully drawn.

Mobile ≤860px: reflow to single scrolling column; --u: min(100vw/430, 1.22px);
sidebar becomes fixed bottom dock height 64u; cards/forecast order change; pip hidden;
sidebar/cards use riseIn instead of slideL/slideR.
≤420px: --u: calc(100vw / 430).

═══════════════════════════════════════
INTERACTION MICROSTATES
═══════════════════════════════════════
.nav a:hover → opacity 1 + translateY(-1u)
.tool:hover → background rgba(255,255,255,.24)
:focus-visible → 2u white outline, offset 2u

═══════════════════════════════════════
HARD CONSTRAINTS
═══════════════════════════════════════
- Keep the typo “Strom” (not Storm).
- Keep all copy, temps, cities, metrics exactly as listed.
- Absolute desktop composition on the 1357×871 unit grid — not a generic CSS Grid dashboard.
- Liquid glass via backdrop-filter + translucent white gradients + final specular sheen — not solid frosted panels.
- Chart must DRAW itself (stroke dash) then FILL wipe left→right.
- No purple theme, no Inter-default marketing look-alikes beyond the specified Inter/Inter Tight, no card shadows stacks, no emoji.
- Single HTML file preferred; background may be external file at ./assets/storm-background.jpg and avatar at the Unsplash URL above.
```

---

**Asset notes**
- **Background:** not a public CDN URL in the original — it was a ~238KB embedded JPEG. Use `./assets/storm-background.jpg` (exported from this project) or re-embed the same data URI.
- **Avatar:**  
  `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80&auto=format`
- **Fonts:** Google Fonts Inter 400–700 + Inter Tight 500, or the embedded WOFF2s already in `index.html`.