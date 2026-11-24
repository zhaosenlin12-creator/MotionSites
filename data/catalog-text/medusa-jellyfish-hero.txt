# Robot Jellyfish — Medusa JF-4 3D Field Simulator Hero (exact recreation prompt)

Build a single-file, full-viewport interactive page called **Medusa JF-4**. It is a live three.js field simulator of a robotic jellyfish that you can take apart piece by piece. A huge procedural 3D machine floats in the centre of a pale aqua-white instrument dashboard, and a 25-second looping tour opens each assembly in turn while every gauge on the page reacts.

There are no images, no video and no model files. Every petal, gear, link and rivet is three.js code. Plain HTML, CSS and one vanilla ES module in one file. The only external resources are the two Google Fonts and three.js 0.170.0 from jsDelivr. Reproduce every value, string and timing below exactly. The CSS, markup and script are given verbatim, so copy them without changes.

Four rules define it:
1. **Everything is a function of the playhead.** The pose of the whole machine, the camera and the HUD derive from one time value `t` in 0–25 s, so scrubbing the timeline works perfectly in both directions.
2. **It is one continuous machine.** Nothing crossfades. Parts hinge, unscrew, telescope and fly apart mechanically.
3. **Arms are chains.** Each of the 8 arms is 28 links, posed every frame by walking along the chain and accumulating a bend per link. There are 224 links.
4. **The page stays light and technical.** Pale aqua-white ground, deep teal ink, one coral accent, tiny spaced monospace labels, thin rings behind the model.

---

## 1. Page basics

- Title: `Medusa JF-4 — Field Simulator`
- Meta description: `A robotic jellyfish you can take apart piece by piece, built live in three.js.`
- Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap`, with preconnects to fonts.googleapis.com and fonts.gstatic.com (crossorigin). Inter is used for the title, the big numbers and the operating mode. JetBrains Mono is used for everything else.
- Import map: `three` → `https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js`, `three/addons/` → `https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/`
- Sizing: `html{font-size:min(.78125vw,1.3889vh)}` so 1rem = 10px at 1280×720 and the entire dashboard scales with the viewport. All HUD sizes are in rem.
- Colours: background `#f1fbfa` to `#e3f4f3`, ink `#0e3a3d`, mid `#5d8284`, faint `#9dbcbc`, line `#d3e8e7`, coral `#ff5a3c`, teal `#0f9d8a`, aqua `#46c9bf`.

## 2. Layout

The canvas fills the viewport. Above it sit an SVG for label leader lines, a layer for floating labels and the HUD.

- **Top left:** a coral block 12.8×7rem with a white line-drawn jellyfish icon and `JF-4`.
- **Header:** `ROBOTIC FIELD-SIMULATOR / OCEANIC EXPLORATION PLATFORM`, the title `Medusa JF-4` in Inter 700 with a coral slash, then `SOFT-ROBOTIC TENTACLE DRONE / FLUID PROPULSION`.
- **Top centre:** `JET LOAD` meter of 50 cells, coloured ink, then teal, then coral as load rises, with `IDLE / THRUST / BURST` under it. Below it, two rows of 14 coral plus signs.
- **Top right:** `UNIT ID JF4-0731`, `RUNTIME`, `STATUS` (with a teal or coral dot) and `OPERATOR TANK 2 · M.S.`
- **Left column, three cards:** `JET 01` (kPa, thrust, a live pressure trace with a lagging grey ghost, pulse rate, siphon state), `POWER 02` (battery %, 10 cells, draw, cell, motor temperature), `ARM COIL 03` (status pill and one bar per arm: R1–R4, L1–L4).
- **Right column, four cards:** `DEPTH 04` (attitude dial, depth, V/S, pitch, roll, hold, speed), `ASSEMBLIES 05` (buttons HERO, OPTICS, BELL, PUMP, ARM R2, SIPHON), `DISPLAY 06` (toggles LABELS, EXPLODED, JET WAKE, TURNTABLE), `SUBSYSTEMS 07` (six rows with status pills: OPTIC ARRAY, BELL SHELL, PUMP CORE, ARM CHAINS, SIPHON, BALANCE RING).
- **Lower left of centre:** `OPERATING MODE`, the mode name in large coral Inter 700, and a detail line.
- **Bottom centre:** `OPERATION LOG 08` card with a round coral pause button, a `DIVE … SURFACE` rail with tick marks, a coral message such as `OPERATOR · ISOLATE OPTICS`, the timecode and `8 OPERATOR ACTIONS`.
- **Footer:** `FIELD SIMULATOR · PROCEDURAL MODEL · 8 ARMS · 1 OPTIC · 1 SIPHON` and `MEDUSA MARINE ROBOTICS · DEEP LAB //////`.

Cards are `rgba(255,255,255,.72)` with `backdrop-filter:blur(10px)`, so arms pass softly behind them. Below 820px the side cards hide and only the header, mode, assembly buttons and operation log remain.

## 3. The tour

The tour lasts 25 s and loops. Values are keyframed per property in the `TR` table, eased with smoothstep between keys.

| Time | Mode | What happens |
|---|---|---|
| 0–2.6 s | JETTING | Rises from below with arms trailing, bell squeezing at 1.8 Hz, wake on |
| 2.6 s | HOLDING | Arms coil out, station keeping |
| 3.3 s | OPTICS OPEN | Camera pushes in, gear ring and lens unscrew, iris opens |
| 5.7 s | BELL OPEN | 8 glass petals hinge outward at the rim |
| 7.5 s | PUMP OUT | Pump core rises out spinning, the cap rides above it |
| 9.9 s | ARM R2 APART | Arm R2 straightens and its links separate |
| 12.7 s | SIPHON OPEN | Camera drops under the machine, sleeves telescope, 6 flaps open |
| 15.8 s | TEARDOWN | 330° turntable, everything flies apart |
| 19.3 s | REASSEMBLY | Parts return before the turn ends |
| 21 s | HOLDING | Wide hold |
| 22 s | DEPARTING | Jets upward and leaves the frame on its own |

## 4. The model

- **Bell:** radius 1.34, height 1.62. Eight sectors, each a pivot group hinged at the rim, holding a glass pane, two ceramic ribs, a rim band, a shoulder plate, a dark seam, a coral or aqua tag and rivets.
- **Glass:** transparent `MeshPhysicalMaterial` patched with `onBeforeCompile` so alpha rises with a Fresnel term, from .1 facing to .72 at grazing angles, plus an aqua rim glow.
- **Inside:** dark chassis, rim hoop, spokes and aqua and coral rings. A pump core with a lathe drum, 6 aqua coils, a coral 20-tooth gear, 7 steel pistons and 16 fins. An optic with a dark housing, 8 iris blades, an 18-tooth coral gear ring, an aqua rim and a glossy black lens.
- **Under the bell:** a 3-stage telescoping siphon with a 6-flap nozzle in alternating coral and ceramic.
- **Arms:** 8 arms, 28 links, seven `InstancedMesh` parts per link (ceramic sleeve, dark collar, aqua ring, steel struts, rivets, teal glass window, coral tag). Even arms start closer to horizontal. Odd arms droop more.
- **Stage:** five thin rings with small node markers around the machine, some dashed, drifting slowly, plus a soft radial shadow on an invisible floor.
- **Wake:** 90 instanced bubbles streaming from the nozzle.

Rendering: `NeutralToneMapping`, exposure 1.02, sRGB output, `RoomEnvironment` through PMREM at intensity .62, a shadow-casting key light that follows the body with a 2048 PCF soft map, and a pale aqua fill light. Field of view 26°, pixel ratio capped at 1.75.

## 5. Interaction

- **Assemblies buttons** jump the playhead to that section. HERO jumps to 21 s.
- **Display buttons** toggle labels, exploded view, wake and a free turntable. A manual toggle lasts until the next section starts.
- **Drag the canvas** to orbit, with damping. Pitch is limited.
- **Rail:** click or drag to scrub. **Pause button** or **Space** to pause.
- **Labels:** up to four per section, each projected from a 3D anchor with a coral leader line.

All HUD values are derived from the playhead in `hud(t)`: jet pressure from `pressure(t)`, thrust, load, battery, draw, motor temperature, attitude, depth, arm rows and subsystem pills. In TEARDOWN the arm rows and every subsystem pill read `DETACHED`.

## 6. CSS (use verbatim)

```css
:root{--bg:#f1fbfa;--bg2:#e3f4f3;--ink:#0e3a3d;--mid:#5d8284;--faint:#9dbcbc;--line:#d3e8e7;--coral:#ff5a3c;--teal:#0f9d8a;--aqua:#46c9bf;--card:rgba(255,255,255,.72)}
*{box-sizing:border-box;margin:0;padding:0}
html{font-size:min(.78125vw,1.3889vh)}
html,body{height:100%;overflow:hidden;background:var(--bg)}
body{font-family:'JetBrains Mono',ui-monospace,monospace;color:var(--ink);-webkit-font-smoothing:antialiased;user-select:none}
.page{position:fixed;inset:0;background:radial-gradient(90% 80% at 50% 42%,#fafefd 0%,var(--bg) 55%,var(--bg2) 100%)}
#gl{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:none}
#gl.drag{cursor:grabbing}
#leaders{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
#leaders line{stroke:var(--coral);stroke-width:1}
#leaders circle{fill:var(--coral)}
.tag{position:absolute;left:0;top:0;pointer-events:none;font-size:.8rem;font-weight:600;letter-spacing:.12em;white-space:nowrap;will-change:transform;transition:opacity .25s}
.tag b{display:inline-block;width:.55rem;height:.55rem;background:var(--coral);margin-right:.5rem}
.tag i{display:block;font-style:normal;font-weight:400;font-size:.66rem;color:var(--mid);margin-top:.2rem;padding-left:1.05rem}
.hud{position:absolute;inset:0;pointer-events:none}
.hud button,.hud .card,.logcard{pointer-events:auto}
.logo{position:absolute;left:0;top:0;width:12.8rem;height:7rem;background:var(--coral);color:#fff;display:flex;align-items:center;gap:1.1rem;padding-left:2rem;font-size:1.25rem;font-weight:600;letter-spacing:.14em}
.logo svg{width:3.3rem;height:3.3rem}
.head{position:absolute;left:14.5rem;top:1.5rem}
.head .k{font-size:.72rem;letter-spacing:.2em;color:var(--mid)}
.head h1{font:700 2.8rem/1 Inter,sans-serif;letter-spacing:-.01em;margin:.5rem 0 .6rem;color:var(--ink)}
.head h1 em{font-style:normal;color:var(--coral);font-weight:600;margin-left:.3rem}
.head .s{font-size:.82rem;letter-spacing:.18em;color:var(--mid)}
.load{position:absolute;left:56rem;top:1.7rem;width:27rem}
.load .row{display:flex;justify-content:space-between;font-size:.72rem;letter-spacing:.14em;color:var(--mid)}
.load .row b{color:var(--ink);font-weight:600}
#loadbar{display:flex;gap:.16rem;height:1.5rem;margin:.45rem 0 .4rem}
#loadbar i{flex:1;background:var(--line)}
.load .row.m{font-size:.6rem;color:var(--faint)}
.meta{position:absolute;right:5rem;top:1.7rem;display:flex;gap:2.8rem}
.meta div{font-size:.72rem;letter-spacing:.14em;color:var(--mid);border-left:1px solid var(--line);padding-left:1rem;min-width:7rem}
.meta b{display:block;margin-top:.75rem;font-size:.95rem;font-weight:500;color:var(--ink);letter-spacing:.06em;white-space:nowrap}
.dot{display:inline-block;width:.45rem;height:.45rem;border-radius:50%;background:var(--teal);margin-right:.5rem;vertical-align:.1rem}
.dot.hot{background:var(--coral)}
.plus{position:absolute;left:51rem;top:6.8rem;width:27rem;display:grid;grid-template-columns:repeat(14,1fr);row-gap:.8rem;color:var(--coral);font-size:.9rem;line-height:1;opacity:.55}
.rulelab{position:absolute;top:9.8rem;font-size:.68rem;letter-spacing:.16em;color:var(--faint)}
.card{position:absolute;background:var(--card);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.8);box-shadow:0 .4rem 2rem rgba(40,110,110,.07);padding:1rem 1.1rem}
.ct{display:flex;justify-content:space-between;align-items:center;font-size:.82rem;font-weight:600;letter-spacing:.14em}
.ct span{border-left:.26rem solid var(--coral);padding-left:.55rem}
.ct small{font-size:.66rem;color:var(--faint);font-weight:400}
.big{font:700 2.8rem/1 Inter,sans-serif}
.big small{font:500 1.1rem Inter,sans-serif;color:var(--mid);margin-left:.2rem}
.tiny{font-size:.64rem;letter-spacing:.14em;color:var(--mid)}
.l{left:2rem}.r{right:2rem}
#cJet{top:8.7rem;width:23rem;height:17.8rem}
#cPow{top:27.6rem;width:23rem;height:11.8rem}
#cArm{top:40.5rem;width:23rem;height:18.9rem}
#cDep{top:8.7rem;width:23rem;height:15.5rem}
#cAsm{top:25.3rem;width:23rem;height:8.9rem}
#cDis{top:35.2rem;width:23rem;height:8.6rem}
#cSub{top:44.8rem;width:23rem;height:15.6rem}
.jr{display:flex;justify-content:space-between;align-items:flex-end;margin-top:.5rem}
#chart{display:block;width:100%;height:7.2rem;margin-top:.6rem}
.foot{display:flex;justify-content:space-between;font-size:.66rem;letter-spacing:.12em;color:var(--mid);margin-top:.5rem}
.foot b{color:var(--ink);font-weight:500}
#batt{display:flex;gap:.22rem;width:11.5rem;height:1.5rem}
#batt i{flex:1;background:var(--line)}
.tri{display:flex;justify-content:space-between;margin-top:.9rem;border-top:1px solid var(--line);padding-top:.7rem}
.tri b{display:block;font-size:.92rem;font-weight:500;margin-top:.4rem}
.ctag{font-size:.6rem;letter-spacing:.12em;padding:.2rem .5rem;background:var(--teal);color:#fff;font-weight:600}
.ctag.hot{background:var(--coral)}
.armrow{display:grid;grid-template-columns:2.3rem 1fr 3rem;align-items:center;font-size:.72rem;margin-top:.5rem;height:1.2rem}
.armrow u{display:block;height:.42rem;background:var(--line);position:relative;text-decoration:none}
.armrow u i{position:absolute;left:0;top:0;bottom:0;background:var(--coral)}
.armrow s{text-decoration:none;text-align:right}
.armrow.det s{color:var(--coral);font-size:.56rem;letter-spacing:.08em}
.armrow.det u i{width:0!important}
.dep{display:flex;gap:1.4rem;margin-top:.8rem;align-items:center}
#hor{width:7.6rem;height:7.6rem;flex:none}
.dep dl{flex:1;display:grid;grid-template-columns:1fr auto;row-gap:.65rem;font-size:.72rem}
.dep dt{color:var(--mid);letter-spacing:.12em;font-size:.66rem}
.dep dd{font-weight:500}
.btns{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.75rem}
.btns button{font:500 .72rem 'JetBrains Mono',monospace;letter-spacing:.1em;color:var(--ink);background:rgba(255,255,255,.75);border:1px solid var(--line);padding:.42rem .7rem;cursor:pointer;transition:background .15s,color .15s,border-color .15s}
.btns button:hover{border-color:var(--coral)}
.btns button.on{background:var(--coral);border-color:var(--coral);color:#fff}
.sub{display:grid;grid-template-columns:2rem 1fr auto;align-items:center;margin-top:.32rem;font-size:.74rem;font-weight:500;letter-spacing:.06em;position:relative}
.sub .n{color:var(--faint);font-weight:400;font-size:.68rem}
.sub i{display:block;font-style:normal;font-weight:400;font-size:.56rem;color:var(--mid);letter-spacing:.04em;margin-top:.05rem}
.sub.on{color:var(--coral)}
.sub.on:before{content:"";position:absolute;left:-.55rem;top:0;bottom:0;width:.16rem;background:var(--coral)}
.sub .ctag.idle{background:var(--line);color:var(--mid)}
#mode{position:absolute;left:27.6rem;top:52.2rem}
#mode .t{font-size:.68rem;letter-spacing:.16em;color:var(--mid)}
#mode .m{font:700 2.3rem/1.1 Inter,sans-serif;color:var(--coral);letter-spacing:-.005em;margin:.15rem 0}
.logcard{position:absolute;left:26.5rem;right:26.5rem;top:60.8rem;height:7.8rem;background:var(--card);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);box-shadow:0 .4rem 2rem rgba(40,110,110,.07);padding:.9rem 1.2rem}
.lg{display:grid;grid-template-columns:3.6rem 1fr;gap:1.1rem;align-items:center;margin-top:.15rem}
#play{width:3.4rem;height:3.4rem;border-radius:50%;background:var(--coral);border:0;display:grid;place-items:center;cursor:pointer}
#play svg{width:1.3rem;height:1.3rem;fill:#fff}
.lgh{display:flex;justify-content:space-between;font-size:.66rem;letter-spacing:.14em;color:var(--mid)}
#msg{color:var(--coral);font-weight:600}
#rail{position:relative;height:1.6rem;cursor:pointer;margin-top:.2rem;touch-action:none}
#rail .b{position:absolute;left:0;right:0;top:50%;height:2px;background:var(--line)}
#fill{position:absolute;left:0;top:50%;height:2px;background:var(--coral)}
#knob{position:absolute;top:50%;width:1.05rem;height:1.05rem;margin:-.52rem 0 0 -.52rem;border-radius:50%;background:#fff;border:2px solid var(--coral)}
#rail em{position:absolute;top:50%;width:1px;height:1rem;margin-top:-.5rem;background:var(--faint)}
.sm{display:flex;justify-content:space-between;font-size:.68rem;letter-spacing:.1em;color:var(--mid)}
.bot{position:absolute;left:2rem;right:2rem;bottom:.9rem;display:flex;justify-content:space-between;font-size:.66rem;letter-spacing:.2em;color:var(--mid)}
.bot b{color:var(--coral);font-weight:500}
@media (max-width:820px){
  html{font-size:10px}
  .load,.meta,.plus,.rulelab,#cJet,#cPow,#cArm,#cDep,#cDis,#cSub,.bot{display:none}
  .logo{width:9rem;height:6rem;padding-left:1.2rem;gap:.6rem;font-size:1rem}.logo svg{width:2.4rem;height:2.4rem}
  .head{left:10.4rem;top:1rem}.head h1{font-size:2.2rem;margin:.3rem 0}.head .k{display:none}.head .s{font-size:.62rem;letter-spacing:.06em}
  #cAsm{left:1.6rem;right:1.6rem;width:auto;top:auto;bottom:9.8rem;height:auto;padding:.7rem .8rem}#cAsm .ct{display:none}#cAsm .btns{margin-top:0}
  #mode{left:1.6rem;top:7.4rem}#mode .m{font-size:2rem}
  .logcard{left:1.6rem;right:1.6rem;top:auto;bottom:1.4rem;height:7.6rem}
}
```

## 7. Markup (use verbatim, as the contents of body before the script)

```html
<main class="page">
  <canvas id="gl"></canvas>
  <svg id="leaders"></svg>
  <div id="tags"></div>
  <div class="hud">
    <div class="logo"><svg viewBox="0 0 40 40" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M7 20C7 11 13 6 20 6s13 5 13 14c-3 2-6 1-8 0-3 1.500-7 1.500-10 0-2 1-5 2-8 0Z"/><path d="M12 23c0 4-3 5-2 9M17 24c0 4-2 7 0 11M23 24c0 4 2 7 0 11M28 23c0 4 3 5 2 9"/></svg>JF-4</div>
    <div class="head"><div class="k">ROBOTIC FIELD-SIMULATOR / OCEANIC EXPLORATION PLATFORM</div><h1>Medusa JF-4<em>/</em></h1><div class="s">SOFT-ROBOTIC TENTACLE DRONE / FLUID PROPULSION</div></div>
    <div class="load"><div class="row"><span>JET LOAD</span><b id="loadv">0%</b></div><div id="loadbar"></div><div class="row m"><span>IDLE</span><span>THRUST</span><span>BURST</span></div></div>
    <div class="meta"><div>UNIT ID<b>JF4-0731</b></div><div>RUNTIME<b id="rt">00:00:00</b></div><div>STATUS<b id="st"><span class="dot"></span>JETTING</b></div><div>OPERATOR<b>TANK 2 · M.S.</b></div></div>
    <div class="plus" id="plus"></div>
    <div class="rulelab" style="left:27.6rem">MODEL JF-4 · REV B</div>
    <div class="rulelab" style="right:27.6rem" id="iso">ISOLATE · HERO</div>

    <section class="card l" id="cJet"><div class="ct"><span>JET</span><small>01</small></div>
      <div class="jr"><div class="big"><span id="kpa">0</span><small>KPA</small></div><div class="big" style="font-size:1.9rem"><span id="thr">0</span> N</div></div>
      <div class="foot" style="margin-top:.2rem"><span>BELL PRESSURE</span><span>THRUST</span></div>
      <canvas id="chart"></canvas>
      <div class="foot"><span>PULSE <b id="pul">0.0 HZ</b></span><span id="sipst">SIPHON IDLE</span></div></section>
    <section class="card l" id="cPow"><div class="ct"><span>POWER</span><small>02</small></div>
      <div class="jr" style="align-items:center"><div class="big"><span id="bat">76</span><small>%</small></div><div id="batt"></div></div>
      <div class="tiny">BATTERY</div>
      <div class="tri tiny"><div>DRAW<b id="draw">9.4 W</b></div><div>CELL<b>3.72 V</b></div><div>MOTOR<b id="mot">23 °C</b></div></div></section>
    <section class="card l" id="cArm"><div class="ct"><span>ARM COIL</span><small>03</small></div>
      <div class="foot" style="margin-top:.4rem;align-items:center"><span>COIL PER ARM · TIP SPIRAL</span><span class="ctag" id="armtag">TRAILING</span></div>
      <div id="arms"></div></section>

    <section class="card r" id="cDep"><div class="ct"><span>DEPTH</span><small>04</small></div>
      <div class="dep"><svg id="hor" viewBox="-50 -50 100 100"><defs><clipPath id="hc"><circle r="47"/></clipPath></defs><circle r="47" fill="#f7fdfc" stroke="#cfe5e4"/><g clip-path="url(#hc)"><g id="hg"><rect x="-80" y="0" width="160" height="90" fill="#dcf0ee"/><line x1="-80" x2="80" stroke="#0e3a3d" stroke-width="1"/></g></g><path d="M-16 0h10l4 5 4-5h12" fill="none" stroke="#ff5a3c" stroke-width="1.800"/></svg>
      <dl><dt>DEPTH</dt><dd id="dd">12.42 M</dd><dt>V/S</dt><dd id="dv">+0.00 M/S</dd><dt>PITCH</dt><dd id="dp">+0.00°</dd><dt>ROLL</dt><dd id="dr">+0.00°</dd></dl></div>
      <div class="foot" style="border-top:1px solid var(--line);padding-top:.6rem;margin-top:.7rem"><span>HOLD <b id="hold">OFF</b></span><span>SPEED <b id="spd">0.00 M/S</b></span></div></section>
    <section class="card r" id="cAsm"><div class="ct"><span>ASSEMBLIES</span><small>05</small></div><div class="btns" id="asm"></div></section>
    <section class="card r" id="cDis"><div class="ct"><span>DISPLAY</span><small>06</small></div><div class="btns" id="dis"></div></section>
    <section class="card r" id="cSub"><div class="ct"><span>SUBSYSTEMS</span><small>07</small></div><div id="subs"></div></section>

    <div id="mode"><div class="t">OPERATING MODE</div><div class="m" id="mm">JETTING</div><div class="t" id="ms"></div></div>
    <section class="logcard"><div class="ct"><span>OPERATION LOG</span><small>08</small></div>
      <div class="lg"><button id="play" aria-label="Pause"><svg viewBox="0 0 12 12"><path id="pi" d="M2 1h3v10H2zM7 1h3v10H7z"/></svg></button>
        <div><div class="lgh"><span>DIVE</span><span id="msg"></span><span>SURFACE</span></div>
        <div id="rail" role="slider" tabindex="0" aria-label="Timeline"><div class="b"></div><div id="fill"></div><div id="knob"></div></div>
        <div class="sm"><span id="tc">00:00 / 00:25</span><span>8 OPERATOR ACTIONS</span></div></div></div></section>
    <div class="bot"><span>FIELD SIMULATOR &nbsp;·&nbsp; PROCEDURAL MODEL &nbsp;·&nbsp; 8 ARMS &nbsp;·&nbsp; 1 OPTIC &nbsp;·&nbsp; 1 SIPHON</span><span>MEDUSA MARINE ROBOTICS &nbsp;·&nbsp; DEEP LAB <b>//////</b></span></div>
  </div>
</main>
```

## 8. Script (use verbatim, as `<script type="module">`)

```js
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const DUR = 25, ARMS = 8, N = 28, $ = id => document.getElementById(id);
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a, b, t) => a + (b - a) * t;
const ease = t => t * t * (3 - 2 * t);
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

/* ---------- timeline ---------- */
const TR = {
  py:     [[0,-5.2],[2.6,.25],[22.1,.25],[25,7.6]],
  fol:    [[0,.8],[2.6,0],[21.9,0],[23,.62],[24.2,.62],[25,.25]],
  tilt:   [[0,.38],[2.6,0],[22.1,0],[23.2,.3],[25,.42]],
  roll:   [[0,-.22],[2.6,0],[22.1,0],[23.2,.18]],
  curl:   [[0,.06],[1.5,.08],[3,1],[21.9,1],[23,.05],[25,.05]],
  jet:    [[0,1],[1.7,1],[2.5,0],[21.9,0],[22.4,1],[25,1]],
  dist:   [[0,9.5],[2.7,14],[3.4,14],[4.3,7.2],[5.6,7.2],[6.5,13],[9.3,13],[10.1,14.2],[12.1,14.2],[12.9,11.6],[14.9,11.6],[15.9,18],[20.3,18],[21,14.6],[22,14.6],[23,9.8],[25,9.8]],
  az:     [[0,.55],[2.7,0],[3.4,0],[4.3,-.62],[5.6,-.18],[6.5,.3],[9.3,-.28],[10.1,.5],[12.1,.72],[12.9,0],[14.9,.3],[15.9,0],[22,0],[23,-.5],[25,-.3]],
  turn:   [[15.9,0],[20.4,5.76],[21.4,6.2832],[25,6.2832]],
  el:     [[0,.12],[2.7,.06],[5.6,.1],[6.5,.34],[9.3,.3],[10.1,.12],[12.1,.1],[12.9,-.82],[14.9,-.72],[15.9,.1],[22,.1],[23,.02]],
  ty:     [[0,-.3],[2.7,-.75],[3.4,-.75],[4.3,.45],[5.6,.45],[6.5,.95],[9.3,.95],[10.1,-.75],[12.1,-.75],[12.9,-.5],[14.9,-.5],[15.9,.2],[20.3,.2],[21,-.65],[22,-.65],[23,.2],[25,.5]],
  tx:     [[0,0],[3.4,0],[4.3,.35],[5.6,.35],[6.5,0],[10.1,0],[10.1,-.8],[12.1,-.8],[12.9,0]],
  optic:  [[3.5,0],[4.4,1],[5.3,1],[5.9,0]],
  petal:  [[5.8,0],[6.7,.92],[9.2,.92],[10,0],[15.9,0],[16.9,.6],[19.4,.6],[20.5,0]],
  pump:   [[6.7,0],[7.8,1],[9.1,1],[9.9,0],[15.9,0],[16.9,1],[19.4,1],[20.5,0]],
  apart:  [[10,0],[10.9,1],[11.8,1],[12.5,0]],
  siphon: [[12.9,0],[13.7,1],[14.7,1],[15.4,0]],
  expl:   [[15.9,0],[17.3,1],[19.2,1],[20.6,0]],
};
const sample = (k, t) => {
  if (t <= k[0][0]) return k[0][1];
  for (let i = 1; i < k.length; i++) if (t <= k[i][0]) {
    const a = k[i - 1], b = k[i];
    return b[0] === a[0] ? b[1] : mix(a[1], b[1], ease((t - a[0]) / (b[0] - a[0])));
  }
  return k[k.length - 1][1];
};
const SECT = [
  {t:0,    m:'JETTING',     s:'PITCH +22° · 2.3 M/S', b:'HERO',   st:'JETTING',     log:'INBOUND · JET ASSIST',    iso:'HERO',   tag:'TRAILING'},
  {t:2.6,  m:'HOLDING',     s:'STATION KEEPING',      b:'HERO',   st:'HOLDING',     log:'INBOUND · JET ASSIST',    iso:'HERO',   tag:'COILING'},
  {t:3.3,  m:'OPTICS OPEN', s:'OPTIC · 86% APART',    b:'OPTICS', st:'OPTICS OPEN', log:'OPERATOR · ISOLATE OPTICS',iso:'OPTICS',tag:'COILING', sub:0, lab:'optic', hot:1},
  {t:5.7,  m:'BELL OPEN',   s:'8 PETALS · 92% OPEN',  b:'BELL',   st:'BELL OPEN',   log:'OPERATOR · ISOLATE BELL',  iso:'BELL',  tag:'COILING', sub:1, lab:'bell', hot:1},
  {t:7.5,  m:'PUMP OUT',    s:'CORE · SPINNING FREE', b:'PUMP',   st:'PUMP OUT',    log:'OPERATOR · ISOLATE PUMP',  iso:'PUMP',  tag:'COILING', sub:2, lab:'pump', hot:1},
  {t:9.9,  m:'ARM R2 APART',s:'14 OF 28 LINKS',       b:'ARM R2', st:'ARM R2 APART',log:'OPERATOR · ISOLATE ARM R2',iso:'ARM R2',tag:'COILING', sub:3, lab:'arm', hot:1},
  {t:12.7, m:'SIPHON OPEN', s:'6 FLAPS · 84% APART',  b:'SIPHON', st:'SIPHON OPEN', log:'OPERATOR · ISOLATE SIPHON',iso:'SIPHON',tag:'COILING', sub:4, lab:'siphon', hot:1},
  {t:15.8, m:'TEARDOWN',    s:'TURNTABLE · 98% APART',b:null,     st:'TEARDOWN',    log:'OPERATOR · EXPLODED ON',   iso:'ALL',   tag:'DETACHED',lab:'all', hot:1, det:1, on:['LABELS','EXPLODED','TURNTABLE']},
  {t:19.3, m:'REASSEMBLY',  s:'TURNTABLE · RETURNING',b:null,     st:'REASSEMBLY',  log:'OPERATOR · EXPLODED OFF',  iso:'ALL',   tag:'COILING', hot:1, on:['TURNTABLE']},
  {t:21,   m:'HOLDING',     s:'STATION KEEPING',      b:'HERO',   st:'HOLDING',     log:'OPERATOR · EXPLODED OFF',  iso:'HERO',  tag:'COILING'},
  {t:22,   m:'DEPARTING',   s:'PITCH +40° · RELEASE', b:'HERO',   st:'DEPARTING',   log:'OPERATOR · HERO · RELEASE',iso:'HERO',  tag:'TRAILING', on:['JET WAKE']},
];
SECT[0].on = ['JET WAKE'];
const secAt = t => { let s = SECT[0]; for (const x of SECT) if (t >= x.t) s = x; return s; };

/* ---------- renderer ---------- */
const canvas = $('gl');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:'high-performance'});
renderer.setClearColor(0, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
scene.environmentIntensity = .62;
const camera = new THREE.PerspectiveCamera(26, 1, .1, 120);

const key = new THREE.DirectionalLight(0xffffff, 2.3);
key.position.set(5, 11, 8);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
Object.assign(key.shadow.camera, {left:-8, right:8, top:8, bottom:-8, near:1, far:40});
key.shadow.bias = -.0006; key.shadow.normalBias = .02; key.shadow.radius = 5;
scene.add(key, key.target);
const fill = new THREE.DirectionalLight(0xbdeee9, .7); fill.position.set(-7, -2, 5); scene.add(fill);

/* ---------- materials ---------- */
const ceramic = new THREE.MeshPhysicalMaterial({color:0xf6f8f7, roughness:.34, metalness:0, clearcoat:.7, clearcoatRoughness:.22});
const dark = new THREE.MeshStandardMaterial({color:0x10211f, roughness:.34, metalness:.7});
const steel = new THREE.MeshStandardMaterial({color:0x9db3b1, roughness:.3, metalness:.9});
const coral = new THREE.MeshPhysicalMaterial({color:0xff5536, roughness:.32, clearcoat:.5, emissive:0xff3a18, emissiveIntensity:.14});
const aqua = new THREE.MeshPhysicalMaterial({color:0x37cdbf, roughness:.25, clearcoat:.7, emissive:0x17b5a6, emissiveIntensity:.12});
const rivet = new THREE.MeshStandardMaterial({color:0x1c2d2c, roughness:.45, metalness:.5});
const glass = new THREE.MeshPhysicalMaterial({color:0xd6f5f1, roughness:.06, metalness:0, transparent:true, opacity:.2, depthWrite:false, side:THREE.DoubleSide, envMapIntensity:1.5, specularIntensity:1});
glass.onBeforeCompile = s => {
  s.fragmentShader = s.fragmentShader.replace('#include <opaque_fragment>',
    'float fr=pow(1.-abs(dot(normalize(vViewPosition),normal)),2.2);diffuseColor.a=mix(.1,.72,fr);outgoingLight+=vec3(.25,.75,.72)*fr*.3;\n#include <opaque_fragment>');
};
const tealGlass = new THREE.MeshPhysicalMaterial({color:0x0f6a68, roughness:.16, clearcoat:1});
const shadowed = m => { m.castShadow = true; m.receiveShadow = true; return m; };
const nonIdx = g => { const x = g.index ? g.toNonIndexed() : g; x.deleteAttribute('uv2'); return x; };
const merge = l => mergeGeometries(l.map(nonIdx));
const place = (g, p, q, s) => g.clone().applyMatrix4(new THREE.Matrix4().compose(p, q || new THREE.Quaternion(), s || new THREE.Vector3(1, 1, 1)));
const V = (x, y, z) => new THREE.Vector3(x, y, z);

/* ---------- bell ---------- */
const R = 1.34, H = 1.62;
const prof = u => { const a = u * Math.PI / 2; return [R * Math.cos(a) ** .82, H * Math.sin(a)]; };      // u 0 rim → 1 apex
const shell = (off, u0 = 0, u1 = 1) => { const p = []; for (let i = 0; i <= 26; i++) { const [r, y] = prof(mix(u0, u1, i / 26)); p.push(new THREE.Vector2(r + off, y + off * .6)); } return p; };
const sector = (off, a, b, u0, u1) => new THREE.LatheGeometry(shell(off, u0, u1), Math.max(3, Math.round((b - a) * 16)), a, b - a);
const onShell = (u, phi, off = 0) => { const [r, y] = prof(u); const s = Math.sin(phi), c = Math.cos(phi); return V((r + off) * s, y + off * .6, (r + off) * c); };

const jf = new THREE.Group(); scene.add(jf);
const inner = new THREE.Group(); jf.add(inner);
const anchors = {};
const anchor = (name, parent, x, y, z) => { const o = new THREE.Object3D(); o.position.set(x, y, z); parent.add(o); anchors[name] = o; };
const petals = [];
const rivetG = new THREE.SphereGeometry(.0105, 8, 6);
for (let i = 0; i < 8; i++) {
  const w = Math.PI / 4, a = i * w - w / 2, b = a + w, mid = i * w, hinge = onShell(0, mid);
  const piv = new THREE.Group(); piv.position.copy(hinge);
  const box = new THREE.Group(); box.position.copy(hinge).multiplyScalar(-1); piv.add(box);
  piv.rotation.order = 'YXZ'; piv.rotation.y = 0;
  const pane = new THREE.Mesh(sector(0, a + .03, b - .03, .02, .9), glass); pane.renderOrder = 5; box.add(pane);
  // ceramic: ribs at both edges, a rim band, a shoulder plate and a small tag
  const white = [sector(.016, a, a + .075, 0, .94), sector(.016, b - .075, b, 0, .94), sector(.02, a, b, 0, .16), sector(.02, a + .1, b - .1, .72, .86)];
  const dots = [];
  for (let k = 0; k < 11; k++) { const u = .04 + k * .082; dots.push(place(rivetG, onShell(u, a + .038, .03)), place(rivetG, onShell(u, b - .038, .03))); }
  for (let k = 0; k < 6; k++) dots.push(place(rivetG, onShell(.13, mix(a + .14, b - .14, k / 5), .036)));
  box.add(shadowed(new THREE.Mesh(merge(white), ceramic)), new THREE.Mesh(merge(dots), rivet));
  const seam = new THREE.Mesh(sector(.026, a + .05, b - .05, .165, .178), dark); box.add(seam);
  const tagG = i % 2 ? sector(.03, mid - .06, mid + .06, .06, .105) : sector(.03, mid - .14, mid - .05, .06, .105);
  box.add(new THREE.Mesh(tagG, i % 2 ? aqua : coral));
  inner.add(piv);
  petals.push({piv, tan:V(Math.cos(mid), 0, -Math.sin(mid)), rad:V(Math.sin(mid), 0, Math.cos(mid)), box});
}
anchor('petal', petals[1].box, ...onShell(.45, Math.PI / 4, .05).toArray());

const capG = new THREE.Group(); inner.add(capG);
{
  const y0 = prof(.92)[1];
  capG.add(shadowed(new THREE.Mesh(new THREE.LatheGeometry([[.001,.13],[.12,.125],[.27,.05],[.3,0],[.27,-.05],[.001,-.05]].map(p => new THREE.Vector2(...p)), 32), ceramic)));
  capG.add(new THREE.Mesh(new THREE.TorusGeometry(.2, .016, 8, 40).rotateX(Math.PI / 2).translate(0, .075, 0), coral));
  capG.position.y = y0;
}

// fixed chassis: rim hoop, spokes, arm hub
const chassis = new THREE.Group(); inner.add(chassis);
{
  const list = [new THREE.TorusGeometry(R * .9, .05, 10, 72).rotateX(Math.PI / 2).translate(0, .02, 0),
    new THREE.LatheGeometry([[.15,.34],[.62,.3],[.92,.1],[1.02,-.04],[.9,-.2],[.5,-.3],[.2,-.3]].map(p => new THREE.Vector2(...p)), 48)];
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + Math.PI / 8; list.push(place(new THREE.CylinderGeometry(.022, .022, .86, 8).rotateZ(Math.PI / 2), V(Math.sin(a) * .7, .12, Math.cos(a) * .7), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, a - Math.PI / 2, 0)))); }
  chassis.add(shadowed(new THREE.Mesh(merge(list), dark)));
  chassis.add(new THREE.Mesh(new THREE.TorusGeometry(1.03, .022, 8, 72).rotateX(Math.PI / 2).translate(0, -.03, 0), aqua));
  chassis.add(new THREE.Mesh(new THREE.TorusGeometry(.6, .016, 8, 60).rotateX(Math.PI / 2).translate(0, -.285, 0), coral));
}
const gearShape = (r0, r1, hole, teeth) => {
  const s = new THREE.Shape(); const n = teeth * 4;
  for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2, r = (i % 4 < 2) ? r1 : r0; i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
  const h = new THREE.Path(); h.absarc(0, 0, hole, 0, Math.PI * 2, true); s.holes.push(h); return s;
};
// pump core
const pump = new THREE.Group(); inner.add(pump);
const pumpSpin = new THREE.Group(); pump.add(pumpSpin);
const pistons = [];
{
  pump.add(shadowed(new THREE.Mesh(new THREE.LatheGeometry([[.001,-.35],[.34,-.35],[.38,-.28],[.38,-.1],[.5,-.06],[.5,.04],[.36,.08],[.36,.46],[.42,.5],[.42,.58],[.26,.68],[.001,.7]].map(p => new THREE.Vector2(...p)), 48), dark)));
  const coils = []; for (let i = 0; i < 6; i++) coils.push(new THREE.TorusGeometry(.385, .017, 8, 48).rotateX(Math.PI / 2).translate(0, .13 + i * .055, 0));
  pump.add(new THREE.Mesh(merge(coils), aqua));
  const gear = new THREE.Mesh(new THREE.ExtrudeGeometry(gearShape(.54, .62, .4, 20), {depth:.06, bevelEnabled:false}).rotateX(Math.PI / 2).translate(0, .02, 0), coral);
  pumpSpin.add(shadowed(gear));
  const g = new THREE.CylinderGeometry(.038, .038, .3, 10), head = new THREE.CylinderGeometry(.06, .06, .05, 12);
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * Math.PI * 2, x = Math.cos(a) * .47, z = Math.sin(a) * .47, o = new THREE.Group();
    o.position.set(x, .22, z); o.add(shadowed(new THREE.Mesh(g, steel)));
    const h = new THREE.Mesh(head, ceramic); h.position.y = .17; o.add(h);
    pumpSpin.add(o); pistons.push(o);
  }
  const fins = []; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; fins.push(place(new THREE.BoxGeometry(.13, .22, .012), V(Math.cos(a) * .45, -.23, Math.sin(a) * .45), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -a, 0)))); }
  pumpSpin.add(new THREE.Mesh(merge(fins), steel));
  pump.position.y = .35;
}
anchor('pump', pump, .5, .35, .1);
// optic
const optic = new THREE.Group(); inner.add(optic);
const opHousing = new THREE.Group(), opRing = new THREE.Group(), opLens = new THREE.Group(), iris = [];
{
  optic.position.set(0, .58, .66); optic.add(opHousing, opRing, opLens);
  const cyl = new THREE.CylinderGeometry(.34, .4, .36, 40).rotateX(Math.PI / 2);
  opHousing.add(shadowed(new THREE.Mesh(cyl, dark)));
  const g = new THREE.Mesh(new THREE.ExtrudeGeometry(gearShape(.4, .46, .3, 18), {depth:.07, bevelEnabled:false}), coral);
  opRing.add(shadowed(g)); opRing.add(new THREE.Mesh(new THREE.TorusGeometry(.3, .022, 10, 48).translate(0, 0, .08), aqua));
  const blade = new THREE.Shape(); blade.moveTo(0, 0); blade.lineTo(.2, -.05); blade.quadraticCurveTo(.3, .1, .12, .22); blade.lineTo(0, 0);
  const bg = new THREE.ExtrudeGeometry(blade, {depth:.008, bevelEnabled:false});
  for (let i = 0; i < 8; i++) { const piv = new THREE.Group(); const a = i / 8 * Math.PI * 2; piv.position.set(Math.cos(a) * .25, Math.sin(a) * .25, .18); piv.rotation.z = a + 1.9; piv.add(new THREE.Mesh(bg, steel)); opHousing.add(piv); iris.push(piv); }
  opLens.add(new THREE.Mesh(new THREE.CylinderGeometry(.2, .23, .14, 40).rotateX(Math.PI / 2), dark));
  const lens = new THREE.Mesh(new THREE.SphereGeometry(.19, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2).scale(1, 1, .7).translate(0, 0, .05), new THREE.MeshPhysicalMaterial({color:0x050e10, roughness:.05, metalness:.3, clearcoat:1, envMapIntensity:2}));
  opLens.add(lens); opLens.add(new THREE.Mesh(new THREE.TorusGeometry(.2, .012, 8, 40).translate(0, 0, .07), coral));
}
anchor('optRim', opRing, .3, .2, .08); anchor('optIris', opHousing, -.05, -.2, .2); anchor('optLens', opLens, .1, -.1, .15);
// siphon
const siphon = new THREE.Group(); siphon.position.y = -.32; inner.add(siphon);
const slv = [], flaps = [];
{
  const mk = (r0, r1, m) => { const g = new THREE.Group(); g.add(shadowed(new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, .24, 32, 1, true), m))); g.add(new THREE.Mesh(new THREE.TorusGeometry(r1, .016, 8, 36).rotateX(Math.PI / 2).translate(0, -.12, 0), aqua)); return g; };
  [mk(.3, .26, ceramic), mk(.25, .21, dark), mk(.2, .16, ceramic)].forEach(g => { siphon.add(g); slv.push(g); });
  const s = new THREE.Shape(); s.moveTo(-.09, 0); s.lineTo(.09, 0); s.lineTo(.05, -.24); s.lineTo(-.05, -.24); s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {depth:.014, bevelEnabled:false}).translate(0, 0, .15);
  for (let i = 0; i < 6; i++) { const y = new THREE.Group(); y.rotation.y = i / 6 * Math.PI * 2; const x = new THREE.Group(); x.position.z = 0; const m = shadowed(new THREE.Mesh(g, i % 2 ? coral : ceramic)); x.add(m); y.add(x); slv[2].add(y); y.position.y = -.12; flaps.push(x); }
}
anchor('sipA', siphon, .24, -.2, .1); anchor('sipB', slv[2], -.12, -.2, .1);

/* ---------- arms ---------- */
const sleeveP = [[0,-.41],[.88,-.41],[.97,-.37],[1,-.31],[1,.31],[.97,.37],[.88,.41],[0,.41]].map(p => new THREE.Vector2(...p));
const G = {
  sleeve: new THREE.LatheGeometry(sleeveP, 24),
  collar: new THREE.CylinderGeometry(.74, .74, .95, 18, 1, true),
  ring: new THREE.TorusGeometry(1.0, .022, 6, 28).rotateX(Math.PI / 2).translate(0, .26, 0),
  window: new THREE.BoxGeometry(.3, .24, .06).translate(0, 0, .985),
  tagb: new THREE.BoxGeometry(.14, .5, .05).translate(.56, 0, .84),
  struts: merge([0, 1, 2, 3].map(i => { const a = i * Math.PI / 2 + .6; return new THREE.CylinderGeometry(.05, .05, 1.1, 6).translate(Math.cos(a) * .5, 0, Math.sin(a) * .5); })),
  bolts: merge(Array.from({length:12}, (_, i) => { const a = i / 12 * Math.PI * 2; return new THREE.SphereGeometry(.05, 6, 5).translate(Math.sin(a) * 1, i % 2 ? -.22 : .22, Math.cos(a) * 1); })),
};
const inst = (g, m, cast = true) => { const x = new THREE.InstancedMesh(g, m, ARMS * N); x.frustumCulled = false; x.castShadow = cast; x.receiveShadow = cast; x.instanceMatrix.setUsage(THREE.DynamicDrawUsage); jf.add(x); return x; };
const P = {sleeve:inst(G.sleeve, ceramic), collar:inst(G.collar, dark), ring:inst(G.ring, aqua, false), window:inst(G.window, tealGlass, false), tagb:inst(G.tagb, coral, false), struts:inst(G.struts, steel), bolts:inst(G.bolts, rivet, false)};
const armTip = []; for (let a = 0; a < ARMS; a++) armTip.push(new THREE.Vector3());
const armPt = V(0, 0, 0);
const _p = V(0, 0, 0), _d = V(0, 0, 0), _q = new THREE.Quaternion(), _q0 = new THREE.Quaternion(), _qk = new THREE.Quaternion(), _s = V(1, 1, 1), _o = V(0, 0, 0), _m = new THREE.Matrix4(), _b = new THREE.Matrix4(), _x = V(0, 0, 0), _y = V(0, 0, 0), _z = V(0, 0, 0);
const AX = {x:V(1, 0, 0), y:V(0, 1, 0), z:V(0, 0, 1)}, ZERO = V(0, 0, 0);
const setPart = (mesh, idx, ox, oy, oz, sx, sy, sz, on = true) => {
  if (!on) { _m.makeScale(0, 0, 0); mesh.setMatrixAt(idx, _m); return; }
  _o.set(ox, oy, oz).applyQuaternion(_q).add(_p); _s.set(sx, sy, sz); _m.compose(_o, _q, _s); mesh.setMatrixAt(idx, _m);
};
const curlOut = new Float32Array(ARMS);
function poseArms(S, t) {
  for (let a = 0; a < ARMS; a++) {
    const phi = (a + .5) * Math.PI / 4, ev = a % 2 === 0, sn = Math.sin(phi), cs = Math.cos(phi);
    const ap = a === 2 ? S.apart : 0, e = S.expl;
    const a0 = mix(1.42, ev ? .34 : .9, S.curl);
    const c = Math.cos(a0), s = Math.sin(a0);
    _y.set(sn * c, -s, cs * c); _z.set(-cs, 0, sn); _x.crossVectors(_y, _z);
    _b.makeBasis(_x, _y, _z); _q.setFromRotationMatrix(_b);
    _p.set(sn * .78, -.24, cs * .78);
    const pulse = S.pulse;
    const hair = (ev ? 1 : .8) * (.92 + hash(a) * .18), sp = ev ? 1 : -1;
    let coil = 0;
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1), f = mix(1, .26, u ** 1.15) * (ev ? 1 : .9);
      const L = .33 * f, r = .2 * f;
      const wave = .05 * Math.sin(5.5 * u - t * 1.5 + a * 1.7) * (.35 + u);
      const kHold = (ev ? .07 : .04) + .78 * u ** 3.6 * hair + .075 * Math.sin(u * 8.2 + a * 2.1 + .8) * (1 - u * .6) - (ev ? .13 : .06) * Math.exp(-(((u - .12) / .1) ** 2)) + wave;
      const kTrail = (.012 * Math.sin(a * 2.1)) + .09 * Math.sin(6 * u - t * 6 + a) * (.3 + u) * (1 + pulse * .5) + (.012 + .2 * u ** 5) * S.jet;
      let k = mix(kTrail, kHold, S.curl);
      coil += Math.max(0, k);
      if (ap) k = mix(k, .012 * Math.sin(u * 7), ap);
      if (i) {
        _qk.setFromAxisAngle(AX.z, k); _q.multiply(_qk);
        _qk.setFromAxisAngle(AX.x, .018 * sp * Math.sin(u * 5 + t * .7 + a)); _q.multiply(_qk);
        _qk.setFromAxisAngle(AX.y, .03 * u * sp); _q.multiply(_qk);
      }
      _d.set(0, 1, 0).applyQuaternion(_q);
      const gap = 1 + ap * 1.25 + e * (.5 + hash(a * 31 + i) * .55);
      _p.addScaledVector(_d, L * .5 * gap);
      const hi = hash(a * 13 + i * 7), idx = a * N + i;
      let ex = 0; if (e) { _x.set(_p.x, _p.y + .3, _p.z); ex = e * (.16 + hi * .24); }
      const px = _p.x, py = _p.y, pz = _p.z;
      if (e) _p.addScaledVector(_x, ex);
      if (e) { _qk.setFromAxisAngle(AX.x, e * (hi - .5) * 1.5); _q0.copy(_q); _q.multiply(_qk); }
      const pa = ap * L * .22 + e * L * .5, pb = e * r * 1.2;
      setPart(P.sleeve, idx, 0, pa * .2, 0, r, L, r);
      setPart(P.collar, idx, 0, -pa, 0, r, L, r);
      setPart(P.ring, idx, 0, pa * .8, 0, r, L, r);
      setPart(P.struts, idx, 0, -pa * 1.7, 0, r, L * (1 + e * .3), r);
      setPart(P.bolts, idx, 0, pa * .2, 0, r, L, r);
      setPart(P.window, idx, 0, 0, pb, r, L, r, i % 4 !== 1);
      setPart(P.tagb, idx, pb * .6, 0, pb * .6, r, L, r, i % 5 === 2);
      if (e) _q.copy(_q0);
      _p.set(px, py, pz);
      _p.addScaledVector(_d, L * .5 * gap);
      if (a === 2 && i === 13) armPt.copy(_p);
    }
    curlOut[a] = coil; armTip[a].copy(_p);
  }
  for (const k in P) P[k].instanceMatrix.needsUpdate = true;
}
const armMark = new THREE.Object3D(); jf.add(armMark); anchors.armLink = armMark;

/* ---------- wake + stage ---------- */
const BUB = 90;
const bubMat = new THREE.MeshPhysicalMaterial({color:0xffffff, roughness:.1, transparent:true, opacity:.5, envMapIntensity:1.6});
const bubbles = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 12, 10), bubMat, BUB);
bubbles.frustumCulled = false; bubbles.renderOrder = 6; scene.add(bubbles);
const rings = new THREE.Group(); scene.add(rings);
const ringMat = new THREE.LineBasicMaterial({color:0x97bcbb, transparent:true, opacity:.55});
const dashMat = new THREE.LineDashedMaterial({color:0x97bcbb, transparent:true, opacity:.45, dashSize:.14, gapSize:.1});
const nodeG = new THREE.RingGeometry(.05, .075, 24), nodeM = new THREE.MeshBasicMaterial({color:0x97bcbb, side:THREE.DoubleSide});
const ringSpec = [[4.6, .22, .3, 0], [6.4, -.5, .2, 1], [5.5, 1.28, -.2, 0], [8, .55, -.5, 1], [3.1, 1.46, .02, 0]];
const ringObjs = ringSpec.map(([r, rx, rz, dash], i) => {
  const pts = []; for (let k = 0; k <= 180; k++) { const a = k / 180 * Math.PI * 2; pts.push(V(Math.cos(a) * r, Math.sin(a) * r, 0)); }
  const g = new THREE.BufferGeometry().setFromPoints(pts), l = new THREE.Line(g, dash ? dashMat : ringMat);
  if (dash) l.computeLineDistances();
  const o = new THREE.Group(); o.rotation.set(rx, 0, rz); o.add(l);
  for (let k = 0; k < 3; k++) { const a = k * 2.1 + i, n = new THREE.Mesh(nodeG, nodeM); n.position.set(Math.cos(a) * r, Math.sin(a) * r, 0); o.add(n); }
  rings.add(o); return o;
});
const shC = document.createElement('canvas'); shC.width = shC.height = 256;
{ const c = shC.getContext('2d'), g = c.createRadialGradient(128, 128, 8, 128, 128, 128); g.addColorStop(0, 'rgba(40,110,110,.34)'); g.addColorStop(.5, 'rgba(40,110,110,.12)'); g.addColorStop(1, 'rgba(40,110,110,0)'); c.fillStyle = g; c.fillRect(0, 0, 256, 256); }
const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shC), transparent:true, depthWrite:false}));
floor.position.y = -5.2; scene.add(floor);

/* ---------- labels ---------- */
const LABELS = {
  optic:[['optRim','IR RIM','18 LEDS · 840 NM',16,-5],['optIris','IRIS','8 BLADES · OPENS 3 S',17,1],['optLens','OUTER LENS','SAPPHIRE · 40 M RATED',17,7],['petal','OPTIC SOCKET','Ø 44 MM · SEALED',-24,6]],
  bell:[['petal','BELL PETAL','8 OF 8 · GLASS PORT',17,-8],['pump','PUMP CORE','REACTOR RING',-21,-6]],
  pump:[['pump','PUMP CORE','SPINNING FREE',17,-6],['petal','GLASS PETAL','HINGED · 96°',-23,2]],
  arm:[['armLink','ARM LINK 14','SPLIT · 2.4× GAP',-3,-10]],
  siphon:[['sipA','OUTER SLEEVE','3 STAGE · TELESCOPE',-24,-4],['sipB','NOZZLE','6 FLAPS',-21,5]],
  all:[['pump','PUMP CORE','SPINNING FREE',20,-14],['optLens','OPTICS','1 × LENS',22,-1],['armLink','ARM LINKS','APART',-30,5],['sipA','ARM HUB','8 SOCKETS',20,11]],
};
const tagWrap = $('tags'), leaders = $('leaders'), MAXT = 4, tagEl = [];
for (let i = 0; i < MAXT; i++) {
  const d = document.createElement('div'); d.className = 'tag'; d.style.opacity = 0; tagWrap.append(d);
  const l = document.createElementNS('http://www.w3.org/2000/svg', 'line'), c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', 2.4);
  leaders.append(l, c); tagEl.push({d, l, c, key:''});
}

/* ---------- static hud ---------- */
$('plus').innerHTML = '<span>+</span>'.repeat(28);
for (let i = 0; i < 50; i++) $('loadbar').append(document.createElement('i'));
for (let i = 0; i < 10; i++) $('batt').append(document.createElement('i'));
const armNames = ['R1','R2','R3','R4','L1','L2','L3','L4'], armEls = armNames.map(n => {
  const d = document.createElement('div'); d.className = 'armrow'; d.innerHTML = `<span>${n}</span><u><i></i></u><s></s>`; $('arms').append(d);
  return {d, i:d.querySelector('i'), s:d.querySelector('s')};
});
const SUB = [['OPTIC ARRAY','1 × 52 MM LENS · IR RIM','TRACKING','OPEN'],['BELL SHELL','8 PETALS · GLASS PORT','SEALED','OPEN'],['PUMP CORE','REACTOR RING · 7 PISTONS','RUNNING','OUT'],['ARM CHAINS','224 LINKS · 8 ARMS','8 / 8 LIVE','APART'],['SIPHON','3 SLEEVES · 6-FLAP NOZZLE','IDLE','OPEN'],['BALANCE RING','8 RIM NODES · GYRO','SEALED','OPEN']];
const subEls = SUB.map((s, i) => {
  const d = document.createElement('div'); d.className = 'sub'; d.innerHTML = `<span class="n">0${i + 1}</span><span>${s[0]}<i>${s[1]}</i></span><span class="ctag"></span>`; $('subs').append(d);
  return {d, tag:d.querySelector('.ctag')};
});
const ASM = {HERO:0, OPTICS:3.3, BELL:5.7, PUMP:7.5, 'ARM R2':9.9, SIPHON:12.7}, asmEls = {}, disEls = {};
for (const k in ASM) { const b = document.createElement('button'); b.textContent = k; b.onclick = () => seekTo(k === 'HERO' ? 21 : ASM[k] - .05); $('asm').append(b); asmEls[k] = b; }
const manual = {};
for (const k of ['LABELS','EXPLODED','JET WAKE','TURNTABLE']) { const b = document.createElement('button'); b.textContent = k; b.onclick = () => { manual[k] = !flag(k); manSec = lastSec; }; $('dis').append(b); disEls[k] = b; }
SECT.forEach((s, i) => { if (!i || s.m === 'HOLDING' || s.t === 19.3) return; const e = document.createElement('em'); e.style.left = s.t / DUR * 100 + '%'; $('rail').append(e); });
let manSec = null, lastSec = null;
const flag = k => { if (k in manual) return manual[k]; const s = lastSec || SECT[0]; return k === 'LABELS' ? !!s.lab : (s.on || []).includes(k); };

/* ---------- jet maths ---------- */
const jetAt = t => sample(TR.jet, t);
const beat = t => { const x = (t * 1.8) % 1; return x < .42 ? Math.sin(x / .42 * Math.PI) ** 2 : 0; };
const pressure = t => 18 + 1.4 * Math.sin(t * 1.3) + jetAt(t) * beat(t) * 78;

const chart = $('chart'), cx = chart.getContext('2d');
function drawChart(t) {
  const w = chart.clientWidth, h = chart.clientHeight, dpr = Math.min(devicePixelRatio, 2);
  if (chart.width !== Math.round(w * dpr)) { chart.width = Math.round(w * dpr); chart.height = Math.round(h * dpr); }
  cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, w, h);
  cx.strokeStyle = '#d3e8e7'; cx.lineWidth = 1;
  for (const y of [.25, .6, .92]) { cx.beginPath(); cx.moveTo(0, h * y); cx.lineTo(w, h * y); cx.stroke(); }
  const line = (lag, col, lw) => {
    cx.strokeStyle = col; cx.lineWidth = lw; cx.beginPath();
    for (let i = 0; i <= 90; i++) { const tt = Math.max(0, t - lag - (90 - i) / 90 * 2.4), v = pressure(tt) / 100; const x = i / 90 * (w - 8), y = h * (.92 - v * .72); i ? cx.lineTo(x, y) : cx.moveTo(x, y); }
    cx.stroke();
  };
  line(.14, '#b9d4d3', 1); line(0, '#ff5a3c', 1.6);
  const v = pressure(t) / 100; cx.fillStyle = '#ff5a3c'; cx.beginPath(); cx.arc(w - 8, h * (.92 - v * .72), 3, 0, 7); cx.fill();
}

/* ---------- layout ---------- */
let W = 1, H_ = 1;
function resize() {
  W = innerWidth; H_ = innerHeight;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setSize(W, H_, false);
  camera.aspect = W / H_; camera.updateProjectionMatrix();
  leaders.setAttribute('viewBox', `0 0 ${W} ${H_}`);
}
addEventListener('resize', resize); resize();

/* ---------- input ---------- */
let playT = 0, playing = true, orbitX = 0, orbitY = 0, orbitXs = 0, orbitYs = 0, drag = null, scrub = false;
const seekTo = t => { playT = clamp(t, 0, DUR - .001); for (const k in manual) delete manual[k]; };
$('play').onclick = () => { playing = !playing; $('pi').setAttribute('d', playing ? 'M2 1h3v10H2zM7 1h3v10H7z' : 'M3 1l8 5-8 5z'); };
canvas.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY]; canvas.classList.add('drag'); canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', e => { if (!drag) return; orbitX -= (e.clientX - drag[0]) * .006; orbitY = clamp(orbitY + (e.clientY - drag[1]) * .004, -.9, .9); drag = [e.clientX, e.clientY]; });
const endDrag = () => { drag = null; canvas.classList.remove('drag'); };
canvas.addEventListener('pointerup', endDrag); canvas.addEventListener('pointercancel', endDrag);
const rail = $('rail'), railX = e => { const r = rail.getBoundingClientRect(); playT = clamp((e.clientX - r.left) / r.width, 0, .9999) * DUR; };
rail.addEventListener('pointerdown', e => { scrub = true; rail.setPointerCapture(e.pointerId); railX(e); });
rail.addEventListener('pointermove', e => { if (scrub) railX(e); });
rail.addEventListener('pointerup', () => scrub = false); rail.addEventListener('pointercancel', () => scrub = false);
addEventListener('keydown', e => { if (e.code === 'Space') { e.preventDefault(); $('play').click(); } });

/* ---------- frame ---------- */
const S = {}, tmp = V(0, 0, 0), tmp2 = V(0, 0, 0);
const fmt2 = (v, u) => (v >= 0 ? '+' : '') + v.toFixed(2) + u;
const setTxt = (el, v) => { if (el.textContent !== v) el.textContent = v; };
function apply(t, wall) {
  for (const k in TR) S[k] = sample(TR[k], t);
  const sec = secAt(t);
  if (sec !== lastSec) { lastSec = sec; if (manSec && manSec !== sec) { for (const k in manual) delete manual[k]; manSec = null; } }
  // manual toggles lift the timeline values
  const ex = flag('EXPLODED'), tt = flag('TURNTABLE');
  if ('EXPLODED' in manual) { S.expl = manual.EXPLODED ? 1 : (sec.det ? 0 : S.expl); if (manual.EXPLODED) { S.petal = Math.max(S.petal, .6); S.pump = 1; } }
  S.pulse = beat(t) * Math.max(S.jet, .1);
  const idle = 1 - S.jet;
  // body
  jf.position.set(0, S.py + idle * .07 * Math.sin(t * 1.1), 0);
  jf.rotation.set(S.tilt + idle * .02 * Math.sin(t * .8), 0, S.roll + idle * .02 * Math.sin(t * .6));
  // petals: a soft squeeze with each pulse, a real hinge when opened
  const squeeze = S.pulse * (S.jet > .05 ? .16 : .035) - (1 - S.pulse) * .0;
  petals.forEach((p, i) => {
    const open = S.petal * 1.3;
    p.piv.quaternion.setFromAxisAngle(p.tan, open - squeeze);
    p.piv.position.copy(p.rad).multiplyScalar(prof(0)[0] * (1 - squeeze * .35) + S.expl * .75);
    p.piv.position.y = S.expl * .25 * (i % 2 ? 1 : .4);
  });
  capG.position.y = prof(.92)[1] + S.pump * 1.05 + S.expl * .55;
  pump.position.y = .35 + S.pump * 1.45 + S.expl * .4;
  pumpSpin.rotation.y = t * (1.2 + S.jet * 5) + S.pump * 9;
  pistons.forEach((o, i) => { o.position.y = .22 + .04 * Math.sin(t * 7 + i * .9) * (.4 + S.pump); });
  // optic unscrews
  const oe = Math.max(S.optic, S.expl);
  optic.position.z = .62 + S.expl * 1.15;
  opRing.position.z = .16 + oe * .24; opRing.rotation.z = oe * 3.4 + t * .05;
  opLens.position.z = .2 + oe * .46; opLens.rotation.z = -oe * 2;
  iris.forEach((p, i) => { p.rotation.z = (i / 8 * Math.PI * 2 + 1.9) + oe * .95; p.position.z = .18 + oe * .1; });
  // siphon telescopes
  const se = Math.max(S.siphon, S.expl * .7) ;
  slv[0].position.y = -.12 - se * .12; slv[1].position.y = -.22 - se * .32; slv[2].position.y = -.28 - se * .56 - S.pulse * .03;
  flaps.forEach((f, i) => { f.rotation.x = -.7 + se * 1.45 + S.pulse * .25; });
  siphon.position.y = -.32 - S.expl * .85;
  chassis.position.y = 0;
  // arms
  poseArms(S, t);
  armMark.position.copy(armPt);
  // wake
  const wakeOn = flag('JET WAKE') ? 1 : 0;
  const nz = tmp.set(0, -1.2, 0).applyMatrix4(jf.matrixWorld.compose(jf.position, jf.quaternion, tmp2.set(1, 1, 1)));
  const dir = tmp2.set(0, -1, 0).applyQuaternion(jf.quaternion).clone();
  for (let i = 0; i < BUB; i++) {
    const h = hash(i + 3), h2 = hash(i * 2 + 9), life = (t * (.55 + h * .4) + h2) % 1, s = wakeOn * (1 - life) * (.018 + h * .05);
    _p.copy(nz).addScaledVector(dir, life * (3 + h * 5));
    const a = i * 2.4, rr = life * (.3 + h2 * .9);
    _p.x += Math.cos(a) * rr; _p.z += Math.sin(a) * rr; _p.y -= life * life * .4;
    _m.compose(_p, _q0.identity(), _s.setScalar(Math.max(s, .00001))); bubbles.setMatrixAt(i, _m);
  }
  bubbles.instanceMatrix.needsUpdate = true;
  // stage
  rings.position.y = -.3 + S.py * .1;
  ringObjs.forEach((o, i) => { o.rotation.y = t * .03 * (i % 2 ? 1 : -1) + S.expl * .6 + i; });
  rings.scale.setScalar(1 + (S.dist - 12) * .03);
  floor.material.opacity = clamp(1 - Math.abs(S.py - .25) * .4, 0, 1) * (S.el < -.2 ? .4 : 1);
  // camera
  orbitXs += (orbitX - orbitXs) * .12; orbitYs += (orbitY - orbitYs) * .12;
  const turn = ('TURNTABLE' in manual ? (manual.TURNTABLE ? wall * .5 : 0) : S.turn);
  const az = S.az + turn + orbitXs, el = clamp(S.el + orbitYs, -1.3, 1.3);
  const portrait = clamp(1.35 / camera.aspect, 1, 2.1), d = S.dist * portrait;
  const tg = tmp.set(S.tx, S.ty + S.fol * S.py, 0);
  camera.position.set(tg.x + Math.sin(az) * Math.cos(el) * d, tg.y + Math.sin(el) * d, tg.z + Math.cos(az) * Math.cos(el) * d);
  camera.lookAt(tg);
  key.target.position.copy(jf.position); key.position.set(jf.position.x + 5, jf.position.y + 11, jf.position.z + 8);
}

function hud(t) {
  const sec = lastSec, jet = S.jet, p = pressure(t), kpa = Math.round(p), load = clamp(.12 + jet * (.25 + beat(t) * .72) + S.expl * .02);
  setTxt($('kpa'), String(kpa).padStart(2, '0'));
  setTxt($('thr'), String(Math.round(6 + jet * beat(t) * 210 + (t > 22 ? 4 : 0))));
  setTxt($('pul'), (jet > .1 ? 1.8 : 0).toFixed(1) + ' HZ');
  setTxt($('sipst'), jet > .1 ? 'SIPHON PULSE' : S.siphon > .1 ? 'SIPHON OPEN' : 'SIPHON IDLE');
  drawChart(t);
  setTxt($('loadv'), Math.round(load * 100) + '%');
  [...$('loadbar').children].forEach((b, i) => { const on = i / 50 < load; b.style.background = on ? (i > 35 ? 'var(--coral)' : i > 20 ? 'var(--teal)' : 'var(--ink)') : ''; });
  const bat = 76 - Math.round(t * .22);
  setTxt($('bat'), String(bat));
  [...$('batt').children].forEach((b, i) => { b.style.background = i / 10 < bat / 100 ? (i < 3 ? 'var(--coral)' : 'var(--aqua)') : ''; });
  setTxt($('draw'), (9.4 + jet * beat(t) * 18 + (S.optic + S.petal + S.pump + S.expl) * 7).toFixed(1) + ' W');
  setTxt($('mot'), (22 + Math.round(t * .34)) + ' °C');
  setTxt($('rt'), '00:00:' + String(Math.floor(t)).padStart(2, '0'));
  $('st').innerHTML = `<span class="dot${sec.hot ? ' hot' : ''}"></span>${sec.st}`;
  setTxt($('mm'), sec.m); setTxt($('ms'), sec.s); setTxt($('msg'), sec.log); setTxt($('iso'), 'ISOLATE · ' + sec.iso);
  const pct = t / DUR * 100; $('fill').style.width = pct + '%'; $('knob').style.left = pct + '%';
  setTxt($('tc'), `00:${String(Math.floor(t)).padStart(2, '0')} / 00:25`);
  // attitude
  const pitch = -S.tilt * 57.3 + 0.8 * Math.sin(t * .8), roll = S.roll * 57.3 + 1.1 * Math.sin(t * .6), vs = (sample(TR.py, t + .1) - sample(TR.py, t)) * 10 + .04 * Math.sin(t);
  setTxt($('dp'), fmt2(pitch, '°')); setTxt($('dr'), fmt2(roll, '°')); setTxt($('dv'), fmt2(vs, ' M/S'));
  setTxt($('dd'), (12.42 - S.py * .02 + .04 * Math.sin(t * .5)).toFixed(2) + ' M'); setTxt($('spd'), Math.abs(vs).toFixed(2) + ' M/S');
  setTxt($('hold'), jet > .5 ? 'OFF' : 'STATION');
  $('hg').setAttribute('transform', `rotate(${roll.toFixed(2)}) translate(0 ${(pitch * .4).toFixed(2)})`);
  // arm rows
  const det = sec.det;
  armEls.forEach((a, i) => {
    a.d.classList.toggle('det', !!det);
    const v = Math.round(clamp(mix(.14 + hash(i) * .2 + .08 * Math.sin(t * 3 + i), .88 + .1 * Math.sin(t * .9 + i * 1.8), S.curl)) * 100);
    if (det) { setTxt(a.s, 'DETACHED'); return; }
    a.i.style.width = v + '%'; a.i.style.background = S.curl > .5 ? 'var(--coral)' : 'var(--ink)'; setTxt(a.s, (i === 1 && S.apart > .4) ? 'APART' : v + '%');
  });
  const at = $('armtag'); setTxt(at, sec.tag); at.classList.toggle('hot', !!det);
  // subsystems
  subEls.forEach((s, i) => {
    s.d.classList.toggle('on', sec.sub === i || (det && i === 3));
    let txt = SUB[i][2]; if (i === 4 && jet > .1) txt = 'PULSING';
    const open = sec.sub === i, hot = open || det;
    setTxt(s.tag, det ? 'DETACHED' : open ? SUB[i][3] : txt);
    s.tag.className = 'ctag' + (hot ? ' hot' : txt === 'IDLE' ? ' idle' : '');
  });
  // buttons
  for (const k in asmEls) asmEls[k].classList.toggle('on', sec.b === k);
  for (const k in disEls) disEls[k].classList.toggle('on', flag(k));
  // labels
  const want = flag('LABELS') ? (LABELS[sec.lab] || LABELS.all) : [];
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  tagEl.forEach((e, i) => {
    const l = want[i];
    if (!l) { e.d.style.opacity = 0; e.l.setAttribute('opacity', 0); e.c.setAttribute('opacity', 0); return; }
    if (e.key !== l[1]) { e.key = l[1]; e.d.innerHTML = `<b></b>${l[1]}<i>${l[2]}</i>`; }
    anchors[l[0]].updateWorldMatrix(true, false);
    tmp.setFromMatrixPosition(anchors[l[0]].matrixWorld).project(camera);
    const x = (tmp.x + 1) / 2 * W, y = (1 - tmp.y) / 2 * H_;
    const lx = clamp(W / 2 + (l[3] * rem) * .92 + (x - W / 2) * .22, 26 * rem, W - 34 * rem + (l[3] > 0 ? 8 * rem : 0)), ly = clamp(H_ / 2 + (l[4] * rem) * 1.25, 11 * rem, H_ - 16 * rem);
    const left = l[3] < 0;
    e.d.style.transform = `translate(${lx - (left ? e.d.offsetWidth : 0)}px,${ly - .5 * rem}px)`; e.d.style.opacity = 1;
    const endx = left ? lx + .4 * rem : lx - .4 * rem;
    e.l.setAttribute('x1', x); e.l.setAttribute('y1', y); e.l.setAttribute('x2', endx); e.l.setAttribute('y2', ly); e.l.setAttribute('opacity', .8);
    e.c.setAttribute('cx', x); e.c.setAttribute('cy', y); e.c.setAttribute('opacity', 1);
  });
}

function draw(t, wall) { apply(t, wall); renderer.render(scene, camera); hud(t); }

let last = performance.now();
function loop(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (!frozen) { if (playing && !scrub) playT = (playT + dt) % DUR; draw(playT, now / 1000); }
  requestAnimationFrame(loop);
}
let frozen = false;
document.fonts.ready.then(() => hud(playT));
requestAnimationFrame(loop);
```

## 9. Feel

A serious engineering tool that happens to be astonishing. It is quiet, precise and light, then the machine does something impossible: a glass bell opens like a flower, a spinning core lifts out of it, and 224 links scatter into the air and snap back together before the turn ends. Then it pulses twice and leaves on its own.