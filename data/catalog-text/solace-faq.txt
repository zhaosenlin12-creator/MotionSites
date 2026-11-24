# Solace — Halftone Dot FAQ and Footer (exact recreation prompt)

Give me a single-file closing section for an AI co-pilot product called **Solace**. The section runs a FAQ into the footer. Behind both sits a full-width live grid of round amber dots, sparse and ragged at the top and dense and pale lower down. Every dot swells and shrinks at its own pace, so the field ripples like an audio meter, and dots near the cursor swell. A centred heading and a dark amber glass FAQ accordion sit on top, with a full-width brown glass footer panel at the bottom.

Plain HTML, CSS and one vanilla script with a 2D canvas, in one file, with no libraries and no images. The only external resource is the Google Font. Reproduce every value, string and timing exactly, and use the complete code at the end as the source of truth.

---

## 1. Page basics

- Title: `Solace`
- Meta description: `Questions, answered. Solace is your AI co-pilot for the work that matters: priorities, follow-ups and answers across every tool your team already uses.`
- Font: `https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap`, with preconnects. The supplied standalone file embeds it.
- Colours: page `#050302`, cream text `#fbefe2`, muted `#d9c3ad`, divider lines `rgba(255,214,170,.14)`, FAQ glass `rgba(34,18,8,.78)`.
- Unit: `--u:min(calc(100vw/1600),calc(100vh/940))`, which becomes `1px` at 820px and below.
- `.wrap` is at least `100svh` with the canvas absolutely filling it. `.content` is a centred flex column with 64u top padding and 28u side and bottom padding.

## 2. Dot field

- Grid step: `max(14, min(W/1600, H/940)*20.5)` px. Each cell gets three stable hash values `a`, `b` and `c` from `fract(sin(i*127.1+j*311.7)*43758.5453)` with offsets.
- Field band: it starts at `H*.1` and is fully dense by `H*.36`. Above `top - 2 steps`, nothing is drawn. Within the band, `v` runs 0 → 1.
- Colour per row: `rgb(226,106,24)` blends to `rgb(248,150,64)` by `v=.55`, then towards `rgb(255,214,170)`, with the last 10% of the height pushing fully to pale peach.
- Survival: `keep = min(1, v*1.6+.12) - a*.6`. A dot with `keep≤0` is skipped unless `c≤.08`, which leaves a few stragglers in the ragged top edge.
- Breathing: `wave = .5+.5*sin(t*(1.6+b*2.6) + a*2π + sin(t*.7+i*.21+j*.13)*1.4)`.
- Size: `(.42+.58*wave^1.3) * min(1,.5+v*.6) * (keep>0 ? 1 : .8)` times a radius of `.37*step`.
- Cursor: the pointer is eased at 12% per frame. Dots gain `0.7*exp(-d²/(step²*22))` of size near it, capped at 1.05. They are drawn with `arc` and fill.
- Reduced motion: `wave` is fixed at .7.

## 3. FAQ

- Heading `Questions, answered`: 40u, weight 600, tracking -.02em.
- Card: 688u wide, 22u below the heading, 4u by 21u padding, `blur(10u)`, a 1px `rgba(255,190,120,.14)` border, 6u radius and a deep shadow.
- Rows: 17u weight 500 buttons with 17u vertical padding and a 14u chevron that rotates 180° when open. Answers open with a `grid-template-rows: 0fr → 1fr` transition over .4s. They are 15u, line height 1.6, muted colour. Only one answer is open at a time, and the first starts open.
- Questions and answers:
  1. `Which tools does Solace connect to?` — `Solace works with Outlook, Gmail, Slack, Zoom, Figma and Linear, and pulls them into one place so nothing slips between apps.`
  2. `How does Solace decide what is a priority?` — `It weighs deadlines, who is asking and how often a thread comes back, then ranks your day so the one thing that can’t wait sits at the top.`
  3. `Is my data and chat history secure?` — `Everything is encrypted in transit and at rest, nothing is used to train models, and you can export or delete your history at any time.`
  4. `Can I try Solace before I pay?` — `Yes. Every workspace starts with a 14-day trial with every feature switched on, and no card needed.`

## 4. Footer

- Pushed to the bottom with `margin-top:auto`. It is full width, a `1fr auto` grid, with 46u by 64u padding, a gradient from `rgba(40,20,8,.86)` to `rgba(84,40,14,.84)`, `blur(12u)`, a 1px warm border and 6u radius.
- Left: a 38u cream square mark with four dark dots, then the wordmark `Solace` at 25u. Below is the tagline `Your AI co-pilot for the work that matters: priorities, follow-ups and answers across every tool your team already uses.` at 15u, max width 440u. Then four 26u outline icons (LinkedIn, X, Instagram, YouTube), then `© Solace 2026 · All rights reserved` at 14u.
- Right: three 196u columns, with 15u weight 600 headings and 14.5u links:
  - **Product:** Overview, Copilot Chat, Priorities, Integrations, Pricing, Security, Changelog.
  - **Resources:** Docs, Guides, API Reference, Help Center, Status.
  - **Company:** About, Customers, Careers, Contact, Privacy, Terms.

## 5. Phones (820px and below)

The heading is 32px. The FAQ goes full width. The footer becomes one column with 32px by 24px padding and 64px top margin, and the links form two columns.

---

## Complete code

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Solace</title>
<meta name="description" content="Questions, answered. Solace is your AI co-pilot for the work that matters: priorities, follow-ups and answers across every tool your team already uses.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--u:min(calc(100vw/1600),calc(100vh/940));--cream:#fbefe2;--mid:#d9c3ad;--line:rgba(255,214,170,.14);--glass:rgba(34,18,8,.78)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#050302}
body{color:var(--cream);font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;text-align:left}
ul{list-style:none}
.wrap{position:relative;min-height:100svh;overflow:hidden;background:#050302}
#dots{position:absolute;inset:0;width:100%;height:100%;display:block}
.content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;min-height:100svh;padding:calc(64*var(--u)) calc(28*var(--u)) calc(28*var(--u))}
h2{font-size:calc(40*var(--u));font-weight:600;letter-spacing:-.02em;text-align:center}
.faq{width:calc(688*var(--u));margin-top:calc(22*var(--u));padding:calc(4*var(--u)) calc(21*var(--u));background:var(--glass);border:1px solid rgba(255,190,120,.14);border-radius:calc(6*var(--u));-webkit-backdrop-filter:blur(calc(10*var(--u)));backdrop-filter:blur(calc(10*var(--u)));box-shadow:0 calc(20*var(--u)) calc(60*var(--u)) rgba(0,0,0,.45)}
.q{border-bottom:1px solid var(--line)}
.q:last-child{border-bottom:0}
.q button{display:flex;align-items:center;justify-content:space-between;gap:calc(20*var(--u));width:100%;padding:calc(17*var(--u)) 0;font-size:calc(17*var(--u));font-weight:500;letter-spacing:-.005em}
.q svg{flex:none;width:calc(14*var(--u));height:calc(14*var(--u));fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.q[data-open] svg{transform:rotate(180deg)}
.a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s cubic-bezier(.2,.8,.2,1)}
.q[data-open] .a{grid-template-rows:1fr}
.a>div{overflow:hidden}
.a p{padding:0 calc(20*var(--u)) calc(20*var(--u)) 0;font-size:calc(15*var(--u));line-height:1.6;color:var(--mid)}
footer{width:100%;margin-top:auto;display:grid;grid-template-columns:1fr auto;gap:calc(40*var(--u));padding:calc(46*var(--u)) calc(64*var(--u)) calc(44*var(--u));background:linear-gradient(180deg,rgba(40,20,8,.86),rgba(84,40,14,.84));border:1px solid rgba(255,190,120,.12);border-radius:calc(6*var(--u));-webkit-backdrop-filter:blur(calc(12*var(--u)));backdrop-filter:blur(calc(12*var(--u)))}
.brand{display:flex;align-items:center;gap:calc(14*var(--u));font-size:calc(25*var(--u));font-weight:500;letter-spacing:-.02em}
.mark{display:grid;place-items:center;width:calc(38*var(--u));height:calc(38*var(--u));background:var(--cream);border-radius:calc(2*var(--u))}
.mark svg{width:56%;height:56%;fill:#1b0d05}
.tag{margin-top:calc(20*var(--u));max-width:calc(440*var(--u));font-size:calc(15*var(--u));line-height:1.6;color:#f0dcc6}
.social{display:flex;gap:calc(16*var(--u));margin-top:calc(26*var(--u))}
.social a{display:grid;place-items:center;width:calc(26*var(--u));height:calc(26*var(--u));opacity:.9;transition:opacity .2s}
.social a:hover{opacity:.6}
.social svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.copy{margin-top:calc(34*var(--u));font-size:calc(14*var(--u));color:#ecd8c2}
.links{display:grid;grid-template-columns:repeat(3,calc(196*var(--u)));gap:calc(8*var(--u))}
.links h3{font-size:calc(15*var(--u));font-weight:600;margin-bottom:calc(16*var(--u))}
.links li{margin-bottom:calc(11*var(--u));font-size:calc(14.5*var(--u));color:#ead5be}
.links a{transition:color .2s}.links a:hover{color:#fff}
button:focus-visible,a:focus-visible{outline:2px solid var(--cream);outline-offset:3px}
@media (max-width:820px){
  :root{--u:1px}
  .content{padding:48px 16px 16px}
  h2{font-size:32px}
  .faq{width:100%;margin-top:20px}
  footer{grid-template-columns:1fr;padding:32px 24px;margin-top:64px}
  .links{grid-template-columns:repeat(2,1fr);gap:24px 16px}
}
</style>
</head>
<body>
<main class="wrap">
  <canvas id="dots" aria-hidden="true"></canvas>
  <div class="content">
    <h2>Questions, answered</h2>
    <div class="faq" id="faq">
      <div class="q" data-open><button aria-expanded="true">Which tools does Solace connect to?<svg viewBox="0 0 14 14"><path d="M3 5l4 4 4-4"/></svg></button><div class="a"><div><p>Solace works with Outlook, Gmail, Slack, Zoom, Figma and Linear, and pulls them into one place so nothing slips between apps.</p></div></div></div>
      <div class="q"><button aria-expanded="false">How does Solace decide what is a priority?<svg viewBox="0 0 14 14"><path d="M3 5l4 4 4-4"/></svg></button><div class="a"><div><p>It weighs deadlines, who is asking and how often a thread comes back, then ranks your day so the one thing that can’t wait sits at the top.</p></div></div></div>
      <div class="q"><button aria-expanded="false">Is my data and chat history secure?<svg viewBox="0 0 14 14"><path d="M3 5l4 4 4-4"/></svg></button><div class="a"><div><p>Everything is encrypted in transit and at rest, nothing is used to train models, and you can export or delete your history at any time.</p></div></div></div>
      <div class="q"><button aria-expanded="false">Can I try Solace before I pay?<svg viewBox="0 0 14 14"><path d="M3 5l4 4 4-4"/></svg></button><div class="a"><div><p>Yes. Every workspace starts with a 14-day trial with every feature switched on, and no card needed.</p></div></div></div>
    </div>
    <footer>
      <div>
        <a class="brand" href="#" aria-label="Solace"><span class="mark"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="14" cy="6" r="3"/><circle cx="6" cy="14" r="3"/><circle cx="14" cy="14" r="3"/></svg></span>Solace</a>
        <p class="tag">Your AI co-pilot for the work that matters: priorities, follow-ups and answers across every tool your team already uses.</p>
        <nav class="social" aria-label="Social">
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v6M8 7.5v.01M12 16v-3.5a2 2 0 0 1 4 0V16M12 10v6"/></svg></a>
          <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7v.01"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5Z"/></svg></a>
        </nav>
        <p class="copy">© Solace 2026 · All rights reserved</p>
      </div>
      <div class="links">
        <div><h3>Product</h3><ul><li><a href="#">Overview</a></li><li><a href="#">Copilot Chat</a></li><li><a href="#">Priorities</a></li><li><a href="#">Integrations</a></li><li><a href="#">Pricing</a></li><li><a href="#">Security</a></li><li><a href="#">Changelog</a></li></ul></div>
        <div><h3>Resources</h3><ul><li><a href="#">Docs</a></li><li><a href="#">Guides</a></li><li><a href="#">API Reference</a></li><li><a href="#">Help Center</a></li><li><a href="#">Status</a></li></ul></div>
        <div><h3>Company</h3><ul><li><a href="#">About</a></li><li><a href="#">Customers</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li><li><a href="#">Privacy</a></li><li><a href="#">Terms</a></li></ul></div>
      </div>
    </footer>
  </div>
</main>
<script>
// accordion: one answer open at a time
const qs=[...document.querySelectorAll('.q')];
qs.forEach(q=>q.querySelector('button').onclick=()=>{
  const open=q.hasAttribute('data-open');
  qs.forEach(o=>{o.removeAttribute('data-open');o.querySelector('button').setAttribute('aria-expanded','false')});
  if(!open){q.setAttribute('data-open','');q.querySelector('button').setAttribute('aria-expanded','true')}
});

// halftone dot field: a fixed grid whose dots swell and shrink on their own, thin and ragged at the top, dense and pale at the bottom
const cv=document.getElementById('dots'),ctx=cv.getContext('2d');
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let W=0,H=0,dpr=1,step=0,cols=0,rows=0,seed=[];
let mx=-9999,my=-9999,tmx=-9999,tmy=-9999;
const hash=(i,j)=>{let h=Math.sin(i*127.1+j*311.7)*43758.5453;return h-Math.floor(h)};
function size(){
  dpr=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  step=Math.max(14,Math.min(W/1600,H/940)*20.5);cols=Math.ceil(W/step)+1;rows=Math.ceil(H/step)+1;
  seed=[];for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)seed.push([hash(i,j),hash(i+71,j+13),hash(i+9,j+97)]);
}
addEventListener('resize',size);size();
addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();tmx=e.clientX-r.left;tmy=e.clientY-r.top});
document.addEventListener('pointerleave',()=>{tmx=tmy=-9999});
// colour runs from a deep orange at the top of the field to pale peach at the bottom
const C0=[226,106,24],C1=[248,150,64],C2=[255,214,170];
const mix=(a,b,t)=>a.map((v,k)=>Math.round(v+(b[k]-v)*t));
function draw(t){
  ctx.clearRect(0,0,W,H);
  mx+=(tmx-mx)*.12;my+=(tmy-my)*.12;
  const top=H*.1,full=H*.36,R=step*.37;
  for(let j=0;j<rows;j++){
    const y=j*step+step*.5;if(y<top-step*2)continue;
    const v=Math.min(1,Math.max(0,(y-top)/(full-top)));         // 0 at the ragged top, 1 lower down
    const col=v<.55?mix(C0,C1,v/.55):mix(C1,C2,(v-.55)/.45*.85+Math.max(0,(y-H*.9)/(H*.1))*.15);
    ctx.fillStyle=`rgb(${col[0]},${col[1]},${col[2]})`;
    for(let i=0;i<cols;i++){
      const x=i*step+step*.5,[a,b,c]=seed[j*cols+i];
      // each dot breathes at its own speed; the top rows are mostly empty with a few survivors
      const wave=calm?.7:.5+.5*Math.sin(t*(1.6+b*2.6)+a*6.283+Math.sin(t*.7+i*.21+j*.13)*1.4);
      const keep=Math.min(1,v*1.6+.12)-(a*.6);
      if(keep<=0&&c>.08)continue;
      let s=(.42+.58*Math.pow(wave,1.3))*Math.min(1,.5+v*.6)*(keep>0?1:.8);
      const dx=x-mx,dy=y-my,d2=dx*dx+dy*dy,hov=Math.exp(-d2/(step*step*22));
      s=Math.min(1.05,s+hov*.7);
      const r=R*s;if(r<.6)continue;
      ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.fill();
    }
  }
}
function loop(ms){draw(ms/1000);requestAnimationFrame(loop)}
requestAnimationFrame(loop);
</script>
</body>
</html>
```