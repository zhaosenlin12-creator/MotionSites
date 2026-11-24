Build one standalone HTML file, index.html, that is a full-viewport hero section and nothing else. Output the file exactly as specified below. Do not redesign, rename, restyle, or omit any element, rule, or script. One page, no framework, no external CSS or JS. The background must be this remote video URL only — do not download it and do not use a local image or video:

https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_182346_a590ff3b-72e5-41ce-8f69-a8c823eaecaa.mp4

<video autoplay muted loop playsinline>, object-fit cover, pointer-events none. Three shade overlays sit on top of the video. The page background is #03080B. The stage is exactly 100dvh, overflow hidden, no letterboxing.

Fonts, declared with @font-face and these exact stacks:
- "RV Display" weight 300 from assets/fonts/rv-display.woff2, fallback "Poppins", "Helvetica Neue", Arial, sans-serif. Used for the headline.
- "RV Brand" weight 600 from assets/fonts/rv-brand.woff2, fallback "Urbanist", "Helvetica Neue", Arial, sans-serif. Used for "riverine.ai".
- "RV Text" weight 400 from assets/fonts/rv-text.woff2, fallback "Helvetica Neue", Helvetica, Arial, sans-serif. Used for nav, lede, buttons, and the scroll cue.
font-display: block. If the woff2 files are not available, keep the @font-face rules and the fallback stacks exactly; do not substitute other typefaces.

All layout is measured from a 1280×960 reference through one unit:
--u: max(0.62px, min(100vw/1280, 100dvh/960)).
Colors: shade 3,8,11; ink #F5FAF6; ink-2 #ECF1EF; teal #88DECC; icon teal #7EC4B5; chevron #7CCBBA; moth #315352; cream pills #EEF1EA; pine discs #122B2A; logo disc #030909.

Desktop composition, positions in --u:
- Top left: a 104×46 glass pill (rgba(150,220,130,.035), blur 12). Inside it, a 46px disc containing a teal delta-tree drawn as seven strokes, and to its right a mirrored moth in #315352.
- Top right of center: a black 442×47 pill. Links, absolutely placed: Work, Regenerate (current, with a small chevron), Nature, Earth, News. Then a cream "Partner" pill with a dark disc and a white right chevron.
- Far top right: a 48px blurred dark circle, speaker icon, aria-label "Ambient river sound", aria-pressed true. Clicking toggles aria-pressed; when false the two sound waves drop to opacity .25. No audio file.
- Bottom left hero: "riverine.ai" in teal; headline on three lines, "Where" / "Regeneration Fuels" / "Future Thinking", light weight, nowrap, per-line letter-spacing; lede on two lines, "Living waterways reveal a hidden logic of renewal" and "Nature's patterns guide more caring AI".
- Actions: cream pill "Shape our Future" linking to #future, with a dark disc and white chevron; text link "Discover the Rivers" linking to #rivers.
- Bottom right: "Scroll for Details" linking to #details, with a teal chevron.
- Nav hrefs: #work, #regenerate, #nature, #earth, #news, #partner. Logo links to # and is labeled "riverine.ai home".
- Hover: text links and the cue turn #88DECC; the Partner and CTA discs turn #26504d.
- Focus-visible: 2px teal outline.

Shade layers, desktop:
- Horizontal gradient, left to right, shade alpha .683, .595, .458, .221, .039, .054 at 0, 20, 40, 60, 80, 100%.
- Vertical gradient, top to bottom, shade alpha .060, .023, .152, .300, .394, .632 at those same stops.
- Bottom-left radial ellipse 93.8% by 41.3% at 0% 100%, shade from 1 to 0.
Video object-position 50% 40%. At min-aspect-ratio 16/9, object-position 50% 24%.

Responsive, components keep desktop proportions and only placement changes:
- At max-width 649.98px or max-height 500px: --u is clamp(0.94px, 100vw/390, 1.2px); gutter clamp(18px, 5.6vw, 32px). Video object-position 63% 50%. Softer left shade and a stronger bottom shade; the corner radial is removed. Headline tracking switches to em values. Actions wrap. Touch padding on the text link and cue.
- At max-width 649.98px only: hide the nav pill. Header is logo, then a 48px black menu button, then the sound button. The menu button is three bars that become an X when aria-expanded is true. The nav becomes a black rounded panel under the header, hidden until .is-open. Links stack at 48px tall, 17px type. Partner sits under the links. Hero is inset by the gutter and sits above the scroll cue, which stays bottom-right. Title size is min(clamp(32px, 10.4vw, 60px), (100vw - 2 gutters) / 8.7). Honor safe-area insets.
- Menu behavior: click toggles the panel; Escape closes it and returns focus to the button; a click outside closes it; choosing a link closes it; when opened, focus the first link.
- Short landscape phones, max-height 500px and min-aspect-ratio 1/1: --u is clamp(0.82px, 100dvh/415, 0.94px). Keep the desktop nav when the screen is at least 650px wide. Hero stays bottom-left, title clamp(28px, 10dvh, 44px), actions do not wrap. Video object-position 50% 30%. Below 650px wide in that short landscape, the open menu is a two-column grid.
- Tablets, 650–1100px wide and at least 501px tall, and portrait screens at least 650px wide with max-aspect-ratio 4/5 and min-height 501px: stop shrinking and pin --u to 0.94px so type and the nav stay touch-safe. On the portrait case, scale the hero and cue by 1.1 and set video object-position to 58% 50%.
- prefers-reduced-motion: no transitions or animations, and skip the entrance.

Entrance, one pass after fonts are ready and the video has loaded data. If reduced motion is set, show the finished page immediately. A 3.5s failsafe removes the hidden state. While waiting, logo, nav, sound, menu, brand, title, lede, actions, and cue are opacity 0.
Timeline, using the Web Animations API with fill backwards, then remove the classes so no inline style remains:
- 0ms, 500ms, quart: logo fades in. Tree strokes draw on with stroke-dashoffset, 80ms plus 45ms per path, 820ms, grow ease cubic-bezier(0.45, 0, 0.2, 1). Moth fades and scales from 0.92 at 420ms for 650ms, expo cubic-bezier(0.16, 1, 0.3, 1).
- 120ms, 700ms, expo: nav or menu lifts 8px. Links ripple from 260ms, 45ms apart, lifting 4px. Sound lifts 8px at 200ms.
- 300ms: "riverine.ai" lifts 10px, 650ms.
- 380ms, then +90ms per line, 1050ms: each headline line rises from translateY(115%) inside its own clip mask.
- 800ms and 860ms: the two lede lines lift 14px, 800ms.
- 1000ms: CTA lifts 12px, 800ms. 1100ms: text link lifts 8px, 600ms, quart cubic-bezier(0.25, 1, 0.5, 1).
- 1250ms: scroll cue lifts from -6px, 700ms.
Travel distances scale with the CTA height over 46, and are 0.8× below 650px wide, rounded to whole pixels. When every animation finishes, force a one-frame redraw of the logo and the action row, then leave the page as the static design.

Use these exact SVG paths. Logo tree, viewBox 0 0 46 46, stroke #7CC6B5, width 1.6, round caps:
M24.2 37V24
M19.8 39.3c1.2-1.9 2.8-2.7 4.4-2.7s3.2.8 4.4 2.7
M23.8 30.2c-2.8-.6-5.5-2.6-7.2-5-2-1.8-5.2-2-7-4.2-1.4-1.8-1.4-4.2 0-6 2-3 5.8-5.2 8.8-6.2 1.4-.5 2.8-1 4.2-1.3
M14.8 23V13.2c0-1.4.8-2.6 2.4-3.4
M24 24.2c-1.8-1.8-3.2-3.8-3.7-6.4-.5-2.6-.6-5.2-.3-7.2
M24.3 23.2c1.5-3 3.5-6.4 4.3-10.2.4-2.6 1.2-4.1 2.8-4.3H35
M24.6 25.7c3-.7 5.8-2.1 7.4-4.5 1.2-1.8 1.4-3.8 2.8-5.2 1.4-1.4 3.2-2.1 5.2-2.4
Moth, viewBox 0 0 39 30, fill #315352, one wing and the same path mirrored with matrix(-1 0 0 1 39 0):
M19.5 12.4C17.5 9.5 14 5 10.8 3 9.6 2.4 8 2.2 6 2.3 4.2 2.4 3.1 3 3 4.8L3.1 9.8C3.2 12.4 5 15 8.3 17.3 6.6 19.5 5.6 21.8 5.4 24.2 5.2 26.2 5.8 27.6 7.3 28 8.8 28.3 10.2 27.3 11.4 25.8 14.2 22.6 17.2 19.8 19.5 17.1Z
Chevrons: M.7.7 5.5 5.3 10.3.7. Partner arrow: M.5.5 3.5 3.5.5 6.5. CTA arrow: M.6.6 4 4 .6 7.4. Speaker: body M14.6 19.6h3.6l5.9-4.9v18.6l-5.9-4.9h-3.6z; waves M27.6 19.6c1.9 2.8 1.9 6 0 8.8 and M31.2 16.2c3.4 4.9 3.4 10.7 0 15.6. Menu bars: M1 1h16, M1 6h16, M1 11h16.

Title: riverine.ai — Where Regeneration Fuels Future Thinking. Theme color #03080B. lang en. Viewport width=device-width, initial-scale=1, viewport-fit=cover.