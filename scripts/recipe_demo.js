/* MotionSites recipe demo renderer.
 * Every visual is pure HTML + CSS animation so it can be frozen deterministically:
 * window.__seek(ms) pauses every Animation and sets its currentTime, which lets
 * scripts/render_recipe_previews.py capture exact frames into an mp4/webp loop.
 */
(function () {
  'use strict';
  var q = new URLSearchParams(location.search);
  function pick(k, d) { var v = q.get(k); return (v === null || v === '') ? d : v; }
  var P = pick('p', '#7b9cff,#b48cff,#5cdcb1,#ffba72').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  // Palettes are authored for page accents, but the preview canvas is always dark and
  // the swatch order differs per source. Re-rank them by chroma so C1/C2 are always the
  // vivid accents, C3 the next one and C4 a light highlight; then darken any fill that
  // is too light (a near-white swatch would paint grey haze behind every layer).
  function hexRgb(h) {
    var s = String(h || '').replace('#', '');
    if (s.length === 3) s = s.split('').map(function (c) { return c + c; }).join('');
    if (s.length !== 6 || /[^0-9a-f]/i.test(s)) return [123, 156, 255];
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
  }
  function toHex(rgb) {
    return '#' + rgb.map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'); }).join('');
  }
  function rgbLum(rgb) { return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255; }
  function rgbSat(rgb) {
    var max = Math.max(rgb[0], rgb[1], rgb[2]), min = Math.min(rgb[0], rgb[1], rgb[2]);
    return max === 0 ? 0 : (max - min) / max;
  }
  function safeFill(rgb) {
    // Slightly lift chroma so muted palettes still read as colour on a dark canvas.
    var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max !== min) {
      var d = max - min;
      var s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      s = Math.min(1, s * 1.28);
      var h;
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 6;
      var hue2 = function (p, q, t) {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      var q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p2 = 2 * l - q2;
      rgb = [hue2(p2, q2, h + 1 / 3) * 255, hue2(p2, q2, h) * 255, hue2(p2, q2, h - 1 / 3) * 255];
    }
    var L = rgbLum(rgb);
    if (L <= 0.52) return toHex(rgb);
    var t = 0.58 + (L - 0.52) * 0.6;
    return toHex([rgb[0] + (12 - rgb[0]) * t, rgb[1] + (15 - rgb[1]) * t, rgb[2] + (22 - rgb[2]) * t]);
  }
  var cands = P.map(hexRgb);
  if (cands.length < 2) cands = cands.concat([hexRgb('#7b9cff'), hexRgb('#5cdcb1')]);
  // chroma score rewards saturated mid-tones (near-black and near-white score low)
  function score(c) { return rgbSat(c) * (0.35 + 0.65 * Math.min(1, rgbLum(c) * 2.4)); }
  var ranked = cands.slice().sort(function (a, b) { return score(b) - score(a); });
  var lightest = cands.slice().sort(function (a, b) { return rgbLum(b) - rgbLum(a); })[0];
  var C1 = safeFill(ranked[0]);
  var C2 = safeFill(ranked[1] || lightest);
  var C3 = safeFill(ranked[2] || ranked[0]);
  var C4 = safeFill(ranked[3] || lightest);
  var RAW = [safeFill(ranked[0]), safeFill(ranked[1] || lightest), safeFill(ranked[2] || ranked[0]), safeFill(lightest)];
  var STYLE = pick('style', 'teardown');
  var T1 = pick('t1', 'Motion recipe').toUpperCase();
  var META = pick('meta', '');
  var IDX = pick('idx', '01');
  var KIND = pick('kind', 'TEARDOWN');
  var VARIANT = pick('v', '');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function seed(s) { var h = 2166136261 >>> 0; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rnd(s, i) { return (seed(s + ':' + i) % 997) / 997; }
  function words() { return T1.split(' ').filter(Boolean); }
  function label(extra) {
    return '<div class="micro" style="position:absolute;left:0;top:-22px;white-space:nowrap">' + extra + '</div>';
  }

  /* ---------- shared background ---------- */
  document.getElementById('bg').innerHTML =
    '<div class="glow" style="width:720px;height:720px;left:-200px;top:-260px;background:' + C1 + ';opacity:.16"></div>' +
    '<div class="glow" style="width:620px;height:620px;right:-190px;bottom:-240px;background:' + C2 + ';opacity:.13"></div>' +
    '<div class="glow" style="width:300px;height:300px;left:52%;top:38%;background:' + C3 + ';opacity:.07"></div>' +
    '<div class="grid"></div>';

  document.getElementById('chrome').innerHTML =
    '<div class="tl"><span class="idx">R路' + esc(IDX) + '</span><span class="kind">' + esc(KIND) + '</span></div>' +
    '<div class="tr">' + esc(META) + '</div>' +
    '<div class="br">MOTIONSITES / RECIPE PACK</div>';

  var S = {};

  /* ============ 1. TEARDOWN 鈥?annotated section boxes ============ */
  S.teardown = function () {
    return '<style>' +
      '.td{position:absolute;inset:74px 70px 66px;display:grid;grid-template-columns:1fr 330px;gap:26px}' +
      '.td-main{position:relative;border-radius:18px;overflow:hidden;background:linear-gradient(165deg,rgba(255,255,255,.055),rgba(255,255,255,.012));border:1px solid rgba(255,255,255,.10)}' +
      '.td-main:before{content:"";position:absolute;inset:0;background:radial-gradient(70% 60% at 78% 8%,color-mix(in srgb,var(--c3) 26%,transparent),transparent 70%)}' +
      '.td-scan{position:absolute;left:0;right:0;height:120px;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--c3) 16%,transparent),transparent);animation:scanY 2.4s linear infinite;mix-blend-mode:screen}' +
      '.td-pad{position:absolute;inset:34px 34px 30px;display:flex;flex-direction:column;gap:15px}' +
      '.td-box{border:1px dashed rgba(255,255,255,.26);border-radius:10px;position:relative;padding:12px 14px}' +
      '.td-box>i{position:absolute;left:0;top:-18px;font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:color-mix(in srgb,var(--c3) 80%,#fff);white-space:nowrap;font-style:normal}' +
      '.td-box>s{position:absolute;right:6px;bottom:4px;font:500 9px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.34);text-decoration:none}' +
      '.td-eye{display:inline-block;padding:6px 10px;border-radius:99px;background:color-mix(in srgb,var(--c4) 18%,transparent);border:1px solid color-mix(in srgb,var(--c4) 45%,transparent);color:#ffe6c6;font:500 10px/1 "JetBrains Mono",monospace;letter-spacing:.14em}' +
      '.td-h{height:34px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,.92),rgba(255,255,255,.55));width:86%}' +
      '.td-h2{height:34px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,.72),rgba(255,255,255,.28));width:64%}' +
      '.td-sub{height:11px;border-radius:4px;background:rgba(255,255,255,.24);width:52%}' +
      '.td-row{display:flex;gap:10px;align-items:center}' +
      '.td-btn{padding:9px 16px;border-radius:99px;background:#f2f4f8;color:#0a0c12;font:600 11px/1 "Inter",sans-serif}' +
      '.td-btn.ghost{background:transparent;color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.24)}' +
      '.td-media{flex:1;border-radius:10px;background:linear-gradient(135deg,color-mix(in srgb,var(--c1) 60%,#0b0e14),color-mix(in srgb,var(--c2) 55%,#0b0e14));position:relative;overflow:hidden;min-height:120px}' +
      '.td-media:after{content:"";position:absolute;inset:0;background:radial-gradient(60% 70% at 30% 20%,rgba(255,255,255,.35),transparent 60%)}' +
      '.td-side{display:flex;flex-direction:column;gap:12px}' +
      '.td-card{border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(12,15,22,.72);padding:16px 16px}' +
      '.td-card .micro{margin-bottom:12px;letter-spacing:.16em}' +
      '.td-kv{display:flex;justify-content:space-between;align-items:baseline;padding:7px 0;border-top:1px solid rgba(255,255,255,.07);font:500 11px/1 "JetBrains Mono",monospace}' +
      '.td-kv span:first-child{color:rgba(255,255,255,.44)}' +
      '.td-kv span:last-child{color:#fff}' +
      '.td-big{font:700 26px/1 "Inter",sans-serif;letter-spacing:-.03em;margin:2px 0 10px}' +
      '.td-bars{display:flex;gap:3px;align-items:flex-end;height:56px;margin-top:6px}' +
      '.td-bars i{flex:1;border-radius:2px;background:linear-gradient(180deg,color-mix(in srgb,var(--c3) 80%,#fff),color-mix(in srgb,var(--c1) 60%,transparent));animation:pulse 2.4s ease-in-out infinite}' +
      '</style>' +
      '<div class="td">' +
      '<div class="td-main"><div class="td-scan"></div><div class="td-pad">' +
      '<div class="td-box" style="margin-top:14px"><i>EYEBROW 路 12/1 路 1440w</i><span class="td-eye">' + esc(T1) + '</span></div>' +
      '<div class="td-box"><i>HEADLINE 路 2 LINES 路 64/68 路 -3%</i><div class="td-h"></div><div class="td-h2" style="margin-top:8px"></div><s>w 86% / 64%</s></div>' +
      '<div class="td-box"><i>SUBHEAD 路 16/26 路 52ch</i><div class="td-sub"></div><s>gap 16</s></div>' +
      '<div class="td-box"><i>ACTIONS 路 pill 44h 路 gap 12</i><div class="td-row"><span class="td-btn">Primary</span><span class="td-btn ghost">Secondary</span></div><s>2 states + focus</s></div>' +
      '<div class="td-box" style="flex:1"><i>MEDIA 路 3:2 路 lazy 路 poster</i><div class="td-media"></div><s>video 24s loop</s></div>' +
      '</div></div>' +
      '<div class="td-side">' +
      '<div class="td-card"><div class="micro">Measured, not guessed</div><div class="td-big">' + words().slice(0, 2).join(' ') + '</div>' +
      '<div class="td-kv"><span>content</span><span>1180 px</span></div>' +
      '<div class="td-kv"><span>padding</span><span>96 / 64</span></div>' +
      '<div class="td-kv"><span>grid</span><span>12 cols</span></div>' +
      '<div class="td-kv"><span>gap</span><span>24 px</span></div>' +
      '<div class="td-kv"><span>states</span><span>9</span></div></div>' +
      '<div class="td-card"><div class="micro">Evidence coverage</div><div class="td-bars">' +
      [42, 62, 51, 78, 66, 88, 58, 72, 84, 54, 93, 68].map(function (h, i) { return '<i style="height:' + h + '%;animation-delay:' + (i * 0.12).toFixed(2) + 's"></i>'; }).join('') +
      '</div></div>' +
      '<div class="td-card" style="flex:1;display:flex;flex-direction:column;justify-content:space-between"><div class="micro">Breakpoints</div>' +
      '<div style="display:flex;gap:8px"><span class="pill">390</span><span class="pill">768</span><span class="pill" style="border-color:color-mix(in srgb,var(--c3) 60%,transparent);color:#fff">1440</span></div>' +
      '<div class="micro" style="margin-top:12px">unknown 鈫?estimated</div></div>' +
      '</div></div>';
  };

  /* ============ 2. HERO 鈥?first-fold mock with guides ============ */
  S.hero = function () {
    return '<style>' +
      '.hr{position:absolute;inset:80px 74px 70px;border-radius:20px;overflow:hidden;background:linear-gradient(170deg,#0b0e15,#0a0c11 60%,#0d1017);border:1px solid rgba(255,255,255,.09)}' +
      '.hr-guides{position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.075) 0 1px,transparent 1px 8.33%);mix-blend-mode:screen;opacity:.7}' +
      '.hr-glow{position:absolute;width:640px;height:640px;right:-140px;top:-180px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c1) 60%,transparent),transparent 65%);filter:blur(40px);animation:breathe 2.4s ease-in-out infinite}' +
      '.hr-in{position:absolute;inset:56px 62px;display:grid;grid-template-columns:1.15fr .85fr;gap:44px;align-items:center}' +
      '.hr-eye{display:inline-flex;gap:9px;align-items:center;font:500 11px/1 "JetBrains Mono",monospace;letter-spacing:.2em;color:rgba(255,255,255,.62);text-transform:uppercase;opacity:0;animation:rise 2.4s ease-out infinite}' +
      '.hr-eye b{width:26px;height:1px;background:var(--c3)}' +
      '.hr-h{font:800 74px/.96 "Inter",sans-serif;letter-spacing:-.045em;margin:22px 0 0;opacity:0;animation:rise 2.4s ease-out infinite;animation-delay:.12s}' +
      '.hr-h em{font-style:normal;color:color-mix(in srgb,var(--c3) 82%,#fff)}' +
      '.hr-sub{max-width:400px;margin:24px 0 28px;color:rgba(255,255,255,.55);font-size:15px;line-height:1.6;opacity:0;animation:rise 2.4s ease-out infinite;animation-delay:.24s}' +
      '.hr-cta{display:flex;gap:12px;opacity:0;animation:rise 2.4s ease-out infinite;animation-delay:.36s}' +
      '.hr-b{padding:13px 22px;border-radius:99px;font:600 13px/1 "Inter",sans-serif}' +
      '.hr-b.p{background:#f2f4f8;color:#080a0f;box-shadow:0 10px 30px rgba(0,0,0,.5)}' +
      '.hr-b.g{border:1px solid rgba(255,255,255,.22);color:#fff}' +
      '.hr-media{position:relative;height:100%;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.14);background:linear-gradient(160deg,color-mix(in srgb,var(--c2) 70%,#0a0d13),color-mix(in srgb,var(--c1) 45%,#0a0d13));opacity:0;animation:rise 2.4s ease-out infinite;animation-delay:.18s}' +
      '.hr-media:before{content:"";position:absolute;inset:0;background:radial-gradient(70% 80% at 70% 20%,rgba(255,255,255,.55),transparent 55%)}' +
      '.hr-media:after{content:"";position:absolute;left:0;top:0;width:52%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);animation:sheen 2.4s ease-in-out infinite}' +
      '.hr-fold{position:absolute;left:0;right:0;top:82%;border-top:1px dashed color-mix(in srgb,var(--c4) 65%,transparent);z-index:9}' +
      '.hr-fold span{position:absolute;right:18px;top:-20px;font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.16em;color:color-mix(in srgb,var(--c4) 85%,#fff)}' +
      '.hr-col{position:absolute;bottom:22px;left:62px;display:flex;gap:8px;font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.12em;color:rgba(255,255,255,.34)}' +
      '</style>' +
      '<div class="hr"><div class="hr-guides"></div><div class="hr-glow"></div>' +
      '<div class="hr-in"><div>' +
      '<div class="hr-eye"><b></b>' + esc(T1) + ' 路 first fold</div>' +
      '<h1 class="hr-h">Ship the <em>feeling</em><br>not the pixels</h1>' +
      '<p class="hr-sub">Rebuild the measured grid, type ramp and state table at three widths before touching the styling.</p>' +
      '<div class="hr-cta"><span class="hr-b p">Start the clone</span><span class="hr-b g">Read blueprint</span></div>' +
      '</div><div class="hr-media"></div></div>' +
      '<div class="hr-fold"><span>fold 路 900</span></div>' +
      '<div class="hr-col"><span>12 COL</span><span>路</span><span>1180 CONTENT</span><span>路</span><span>96 TOP PAD</span></div>' +
      '</div>';
  };

  /* ============ 3. TOKENS 鈥?swatches, type ladder, spacing ============ */
  S.tokens = function () {
    var sw = [
      ['surface', '#0b0e14'], ['raised', '#141925'], ['accent', C1], ['accent-2', C2], ['signal', C3], ['warn', C4]
    ].map(function (s, i) {
      return '<div class="tk-sw" style="animation-delay:' + (i * 0.08).toFixed(2) + 's"><div class="tk-chip" style="background:' + s[1] + '"></div><div class="tk-hex">' + esc(s[1]) + '</div><div class="tk-role">' + esc(s[0]) + '</div></div>';
    }).join('');
    var sizes = [['Display', '64/68', 58], ['Heading', '32/40', 34], ['Body', '16/26', 19], ['Caption', '12/18', 13]];
    var ladder = sizes.map(function (s) {
      return '<div class="tk-row"><span class="tk-name">' + s[0] + '</span><span class="tk-aa" style="font-size:' + s[2] + 'px">Aa</span><span class="tk-num">' + s[1] + ' px</span><span class="tk-bar"><i style="width:' + (s[2] * 1.5) + 'px"></i></span></div>';
    }).join('');
    var steps = [4, 8, 12, 16, 24, 32, 48, 64].map(function (v) {
      return '<div class="tk-step"><i style="height:' + Math.max(6, v * 0.55) + 'px"></i><span>' + v + '</span></div>';
    }).join('');
    return '<style>' +
      '.tk{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:16px}' +
      '.tk-sw-row{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}' +
      '.tk-sw{opacity:0;animation:rise 2.4s ease-out infinite}' +
      '.tk-chip{height:74px;border-radius:12px;border:1px solid rgba(255,255,255,.12);box-shadow:inset 0 1px 0 rgba(255,255,255,.10)}' +
      '.tk-hex{font:500 11px/1 "JetBrains Mono",monospace;margin-top:9px;color:#fff}' +
      '.tk-role{font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.12em;color:rgba(255,255,255,.38);margin-top:5px;text-transform:uppercase}' +
      '.tk-mid{display:grid;grid-template-columns:1.05fr .95fr;gap:16px;flex:1;min-height:0}' +
      '.tk-card{border-radius:16px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.012));padding:20px 22px;position:relative;overflow:hidden}' +
      '.tk-card .micro{margin-bottom:14px}' +
      '.tk-row{display:flex;align-items:center;gap:14px;padding:5px 0}' +
      '.tk-name{width:64px;font:500 10px/1 "JetBrains Mono",monospace;letter-spacing:.12em;color:rgba(255,255,255,.4);text-transform:uppercase}' +
      '.tk-aa{font:600 30px/1 "Inter",sans-serif;letter-spacing:-.04em;width:86px}' +
      '.tk-num{font:500 10.5px/1 "JetBrains Mono",monospace;color:color-mix(in srgb,var(--c3) 78%,#fff);width:74px}' +
      '.tk-bar{flex:1;height:5px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}' +
      '.tk-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--c1),var(--c3))}' +
      '.tk-steps{display:flex;align-items:flex-end;gap:14px;height:74px;padding-top:12px}' +
      '.tk-step{display:flex;flex-direction:column;align-items:center;gap:7px;flex:1}' +
      '.tk-step i{width:100%;max-width:26px;border-radius:3px;background:linear-gradient(180deg,color-mix(in srgb,var(--c2) 85%,#fff),color-mix(in srgb,var(--c1) 45%,transparent))}' +
      '.tk-step span{font:500 9.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.45)}' +
      '.tk-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}' +
      '.tk-chip2{border:1px solid rgba(255,255,255,.14);border-radius:99px;padding:7px 12px;font:500 10px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.62)}' +
      '</style>' +
      '<div class="tk">' +
      '<div class="micro" style="position:static">' + esc(T1) + ' 路 measured ramp</div>' +
      '<div class="tk-sw-row">' + sw + '</div>' +
      '<div class="tk-mid">' +
      '<div class="tk-card"><div class="micro">Type ladder 路 Inter / Fraunces / Mono</div>' + ladder + '</div>' +
      '<div class="tk-card"><div class="micro">Spacing ladder 路 4pt base</div><div class="tk-steps">' + steps + '</div>' +
      '<div class="micro" style="margin-top:18px">Shape & elevation</div><div class="tk-chips">' +
      '<span class="tk-chip2">radius 6</span><span class="tk-chip2">radius 12</span><span class="tk-chip2">radius 18</span><span class="tk-chip2">pill</span><span class="tk-chip2">shadow 0 24 60</span><span class="tk-chip2">hairline 1</span>' +
      '</div></div></div></div>';
  };

  /* ============ 4. MATERIALS 鈥?surface ladder + glass ============ */
  S.materials = function () {
    var rows = [['L1', 'page', '4%'], ['L2', 'section', '6%'], ['L3', 'card', '9%'], ['L4', 'raised', '13%'], ['L5', 'float', '18%']];
    var ladder = rows.map(function (r, i) {
      return '<div class="mt-row"><span class="mt-lvl">' + r[0] + '</span><span class="mt-name">' + r[1] + '</span><span class="mt-bar"><i style="opacity:' + (0.18 + i * 0.16).toFixed(2) + '"></i></span><span class="mt-num">' + r[2] + '</span></div>';
    }).join('');
    return '<style>' +
      '.mt{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1.25fr .75fr;gap:24px}' +
      '.mt-stage{position:relative;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.10);background:radial-gradient(90% 90% at 20% 10%,color-mix(in srgb,var(--c1) 32%,#0a0d13),#080a0f 60%)}' +
      '.mt-blob{position:absolute;border-radius:50%;filter:blur(38px);animation:drift 2.4s ease-in-out infinite}' +
      '.mt-b1{width:300px;height:300px;left:40px;top:40px;background:' + C2 + ';opacity:.4}' +
      '.mt-b2{width:260px;height:260px;right:60px;bottom:30px;background:' + C3 + ';opacity:.3;animation-delay:.6s}' +
      '.mt-b3{width:200px;height:200px;left:46%;top:46%;background:' + C1 + ';opacity:.36;animation-delay:1.2s}' +
      '.mt-glass{position:absolute;border-radius:16px;border:1px solid rgba(255,255,255,.28);background:linear-gradient(150deg,rgba(255,255,255,.20),rgba(255,255,255,.05));backdrop-filter:blur(16px) saturate(1.35);-webkit-backdrop-filter:blur(16px) saturate(1.35);box-shadow:0 30px 60px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.35);padding:22px}' +
      '.mt-g1{left:56px;top:56px;width:360px;height:220px;animation:float 2.4s ease-in-out infinite}' +
      '.mt-g2{right:52px;top:170px;width:250px;height:150px;animation:float 2.4s ease-in-out infinite;animation-delay:.7s}' +
      '.mt-g1 .micro,.mt-g2 .micro{color:rgba(255,255,255,.72)}' +
      '.mt-gl{font:600 26px/1.05 "Inter",sans-serif;letter-spacing:-.03em;margin-top:12px}' +
      '.mt-g2 .mt-gl{font-size:18px}' +
      '.mt-side{border-radius:18px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.7);padding:22px}' +
      '.mt-row{display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.06)}' +
      '.mt-lvl{font:600 10px/1 "JetBrains Mono",monospace;color:color-mix(in srgb,var(--c3) 80%,#fff);width:24px}' +
      '.mt-name{font:500 11px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.46);width:66px}' +
      '.mt-bar{flex:1;height:8px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden}' +
      '.mt-bar i{display:block;height:100%;border-radius:99px;background:#fff}' +
      '.mt-num{font:500 10px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.5);width:34px;text-align:right}' +
      '.mt-note{margin-top:16px;font-size:12px;line-height:1.6;color:rgba(255,255,255,.5)}' +
      '</style>' +
      '<div class="mt"><div class="mt-stage">' +
      '<div class="mt-blob mt-b1"></div><div class="mt-blob mt-b2"></div><div class="mt-blob mt-b3"></div>' +
      '<div class="mt-glass mt-g1"><div class="micro">' + esc(T1) + '</div><div class="mt-gl">five surfaces,<br>one light model</div></div>' +
      '<div class="mt-glass mt-g2"><div class="micro">glass 16 / 135%</div><div class="mt-gl">grain 0.05</div></div>' +
      '</div><div class="mt-side"><div class="micro" style="margin-bottom:10px">Luminance ladder</div>' + ladder +
      '<div class="mt-note">Contrast 4.5:1 on every surface, including glass over media.</div></div></div>';
  };

  /* ============ 5. TIMELINE 鈥?nested tween lanes ============ */
  S.timeline = function () {
    var lanes = [
      ['hero.enter', [0, 62], [8, 40], [52, 44]],
      ['title.split', [10, 42], [24, 30], [30, 52]],
      ['cards.stagger', [30, 58], [48, 26], [70, 24]],
      ['cta.pop', [56, 30], [66, 28], [88, 10]]
    ];
    var laneHtml = lanes.map(function (l, li) {
      var bars = l.slice(1).map(function (b, bi) {
        var col = ['var(--c1)', 'var(--c2)', 'var(--c3)'][bi % 3];
        return '<i class="tl-bar" style="left:' + b[0] + '%;width:' + b[1] + '%;background:linear-gradient(90deg,' + col + ',color-mix(in srgb,' + col + ' 55%,transparent));animation-delay:' + (li * 0.1 + bi * 0.05).toFixed(2) + 's"></i>';
      }).join('');
      return '<div class="tl-lane"><span class="tl-name">' + esc(l[0]) + '</span><div class="tl-track">' + bars + '</div><span class="tl-val">' + (li === 0 ? '0.0 鈫?1.6' : li === 1 ? '+=0.2' : li === 2 ? 'stagger .08' : 'ease expo') + '</span></div>';
    }).join('');
    var ticks = ['0', '0.6', '1.2', '1.8', '2.4'].map(function (t, i) {
      return '<span style="left:' + (i * 25) + '%">' + t + 's</span>';
    }).join('');
    return '<style>' +
      '.tl{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:14px}' +
      '.tl-head{display:flex;align-items:baseline;justify-content:space-between}' +
      '.tl-title{font:700 30px/1 "Inter",sans-serif;letter-spacing:-.035em}' +
      '.tl-title em{font:500 12px/1 "JetBrains Mono",monospace;letter-spacing:.14em;color:rgba(255,255,255,.4);font-style:normal;margin-left:14px}' +
      '.tl-body{flex:1;border-radius:18px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(165deg,rgba(255,255,255,.05),rgba(255,255,255,.012));padding:26px 26px 18px;position:relative;overflow:hidden}' +
      '.tl-ruler{display:flex;justify-content:space-between;padding-left:112px;padding-right:96px;margin-bottom:14px;position:relative}' +
      '.tl-ruler:before{content:"";position:absolute;left:112px;right:96px;top:18px;height:1px;background:rgba(255,255,255,.12)}' +
      '.tl-ruler span{font:500 9.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.4)}' +
      '.tl-lane{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.06)}' +
      '.tl-name{width:98px;font:500 10.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.55);letter-spacing:.04em}' +
      '.tl-track{position:relative;flex:1;height:34px;border-radius:7px;background:rgba(255,255,255,.035)}' +
      '.tl-bar{position:absolute;top:6px;height:22px;border-radius:5px;box-shadow:0 0 22px rgba(0,0,0,.4);animation:pulse 2.4s ease-in-out infinite}' +
      '.tl-val{width:88px;text-align:right;font:500 9.5px/1 "JetBrains Mono",monospace;color:color-mix(in srgb,var(--c3) 75%,#fff)}' +
      '.tl-play{position:absolute;top:64px;bottom:18px;width:2px;background:linear-gradient(180deg,transparent,var(--c4),var(--c4),transparent);animation:playX 2.4s linear infinite;box-shadow:0 0 20px var(--c4)}' +
      '.tl-play:after{content:"50%";position:absolute;top:-24px;left:-18px;font:500 9.5px/1 "JetBrains Mono",monospace;color:var(--c4)}' +
      '@keyframes playX{0%{left:12%}100%{left:86%}}' +
      '.tl-foot{display:flex;gap:10px;margin-top:12px}' +
      '</style>' +
      '<div class="tl"><div class="tl-head"><div class="tl-title">' + esc(T1) + '<em>GSAP 路 ScrollTrigger</em></div><div class="micro">2.4s loop 路 scrubbed</div></div>' +
      '<div class="tl-body"><div class="tl-ruler">' + ticks + '</div><div class="tl-play"></div>' + laneHtml +
      '<div class="tl-foot"><span class="pill">position params preserved</span><span class="pill">ease parsed at 11 points</span><span class="pill">runtime-generated 鈫?inferred</span></div>' +
      '</div></div>';
  };

  /* ============ 6. BEZIER 鈥?easing curves + travelling dots ============ */
  S.bezier = function () {
    var curves = [
      ['ease-out-expo', 'cubic-bezier(.16,1,.3,1)', 'M0,100 C30,4 52,0 100,0'],
      ['ease-in-out', 'cubic-bezier(.65,0,.35,1)', 'M0,100 C42,100 58,0 100,0'],
      ['spring (approx)', 'cubic-bezier(.34,1.56,.64,1)', 'M0,100 C34,0 64,0 100,100']
    ];
    var cards = curves.map(function (c, i) {
      return '<div class="bz-card"><div class="bz-name">' + c[0] + '</div><div class="bz-val">' + c[1] + '</div>' +
        '<svg class="bz-svg" viewBox="0 0 100 100" preserveAspectRatio="none">' +
        '<path d="' + c[2] + '" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1"/>' +
        '<path d="' + c[2] + '" fill="none" stroke="var(--c3)" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="220" stroke-dashoffset="220" style="animation:dash 2.4s linear infinite;animation-delay:' + (i * 0.2).toFixed(2) + 's"/>' +
        '</svg>' +
        '<span class="bz-dot" style="offset-path:path(\'' + c[2] + '\');animation-delay:' + (i * 0.2).toFixed(2) + 's"></span>' +
        '<div class="bz-scale"><span>0</span><span>t</span><span>1</span></div></div>';
    }).join('');
    return '<style>' +
      '.bz{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:16px}' +
      '.bz-top{display:flex;align-items:baseline;justify-content:space-between}' +
      '.bz-h{font:800 46px/1 "Inter",sans-serif;letter-spacing:-.045em}' +
      '.bz-h span{color:color-mix(in srgb,var(--c3) 85%,#fff)}' +
      '.bz-grid{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}' +
      '.bz-card{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(165deg,rgba(255,255,255,.055),rgba(255,255,255,.012));padding:20px 20px 14px;display:flex;flex-direction:column;overflow:hidden}' +
      '.bz-name{font:600 15px/1 "Inter",sans-serif;letter-spacing:-.01em}' +
      '.bz-val{font:500 10px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.42);margin-top:8px}' +
      '.bz-svg{flex:1;width:100%;height:auto;margin:14px 0 6px;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:20% 20%}' +
      '.bz-dot{position:absolute;left:20px;top:96px;width:9px;height:9px;border-radius:50%;background:var(--c4);box-shadow:0 0 0 4px color-mix(in srgb,var(--c4) 28%,transparent),0 0 22px var(--c4);offset-path:path("M0,170 C65,20 120,0 260,0");offset-distance:0%;animation:runDot 2.4s cubic-bezier(.16,1,.3,1) infinite}' +
      '@keyframes runDot{0%{offset-distance:0%}70%,100%{offset-distance:100%}}' +
      '.bz-scale{display:flex;justify-content:space-between;font:500 9px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.3)}' +
      '.bz-legend{display:flex;gap:8px}' +
      '</style>' +
      '<div class="bz"><div class="bz-top"><div class="bz-h">' + esc(T1.split(' ').slice(-1)[0]) + ' <span>tokens</span></div><div class="micro">harvested from getAnimations()</div></div>' +
      '<div class="bz-grid">' + cards + '</div>' +
      '<div class="bz-legend"><span class="pill">--dur-fast 120</span><span class="pill">--dur-hero 320</span><span class="pill">--ease-out-expo</span><span class="pill">exit 65% of enter</span></div></div>';
  };

  /* ============ 7. TIMING 鈥?staggered entrance + duration ruler ============ */
  S.timing = function () {
    var cards = [0, 1, 2, 3, 4, 5].map(function (i) {
      return '<div class="tm-card" style="animation-delay:' + (i * 0.08).toFixed(2) + 's"><div class="tm-num">' + String(i + 1).padStart(2, '0') + '</div><div class="tm-line"></div><div class="tm-line s"></div></div>';
    }).join('');
    var stops = [['instant', '80鈥?20', 18], ['control', '150鈥?00', 34], ['enter', '240鈥?20', 62], ['exit', '脳0.65', 44], ['ambient', '6鈥?2s', 100]];
    var ruler = stops.map(function (s, i) {
      return '<div class="tm-stop"><span class="tm-lbl">' + s[0] + '</span><span class="tm-dur">' + s[1] + ' ms</span><i style="width:' + s[2] + '%;animation-delay:' + (i * 0.1).toFixed(2) + 's"></i></div>';
    }).join('');
    return '<style>' +
      '.tm{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:18px}' +
      '.tm-top{display:flex;justify-content:space-between;align-items:flex-end}' +
      '.tm-h{font:800 52px/1 "Inter",sans-serif;letter-spacing:-.05em;max-width:640px}' +
      '.tm-h em{font-style:normal;color:color-mix(in srgb,var(--c4) 86%,#fff)}' +
      '.tm-cards{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;flex:1;align-items:stretch}' +
      '.tm-card{border-radius:14px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(170deg,rgba(255,255,255,.07),rgba(255,255,255,.015));padding:16px;display:flex;flex-direction:column;gap:9px;opacity:0;animation:cardRise 2.4s ease-out infinite}' +
      '.tm-num{font:500 10px/1 "JetBrains Mono",monospace;color:color-mix(in srgb,var(--c3) 80%,#fff)}' +
      '.tm-line{height:8px;border-radius:4px;background:rgba(255,255,255,.34);width:100%}' +
      '.tm-line.s{width:62%;background:rgba(255,255,255,.16)}' +
      '.tm-card:after{content:"";flex:1;border-radius:8px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1) 55%,transparent),color-mix(in srgb,var(--c2) 35%,transparent));margin-top:6px}' +
      '@keyframes cardRise{0%{transform:translateY(30px) scale(.97);opacity:0}16%{transform:translateY(0) scale(1);opacity:1}86%{transform:translateY(0);opacity:1}100%{transform:translateY(-10px);opacity:0}}' +
      '.tm-ruler{border-radius:16px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.6);padding:20px 22px;display:flex;flex-direction:column;gap:9px}' +
      '.tm-stop{display:flex;align-items:center;gap:14px}' +
      '.tm-lbl{width:72px;font:500 10px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45)}' +
      '.tm-dur{width:88px;font:500 10px/1 "JetBrains Mono",monospace;color:#fff}' +
      '.tm-stop i{height:7px;border-radius:99px;background:linear-gradient(90deg,var(--c1),var(--c3));box-shadow:0 0 18px color-mix(in srgb,var(--c3) 45%,transparent);animation:pulse 2.4s ease-in-out infinite}' +
      '</style>' +
      '<div class="tm"><div class="tm-top"><div class="tm-h">' + esc(T1) + '</div><div class="micro">one token sheet 路 not per-component numbers</div></div>' +
      '<div class="tm-cards">' + cards + '</div>' +
      '<div class="tm-ruler">' + ruler + '</div></div>';
  };

  /* ============ 8. MATRIX 鈥?3D tilt card + decomposed matrix ============ */
  S.matrix = function () {
    return '<style>' +
      '.mx{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1.1fr .9fr;gap:26px}' +
      '.mx-stage{position:relative;border-radius:18px;border:1px solid rgba(255,255,255,.10);background:radial-gradient(80% 80% at 50% 30%,color-mix(in srgb,var(--c1) 26%,#0a0d13),#07090d 70%);display:flex;align-items:center;justify-content:center;perspective:1100px;overflow:hidden}' +
      '.mx-orbit{position:absolute;width:520px;height:520px;border-radius:50%;border:1px solid rgba(255,255,255,.10);animation:spin 24s linear infinite}' +
      '.mx-orbit:after{content:"";position:absolute;left:50%;top:-3px;width:6px;height:6px;border-radius:50%;background:var(--c3);box-shadow:0 0 16px var(--c3)}' +
      '.mx-deck{position:relative;width:340px;height:220px;transform-style:preserve-3d;animation:tilt 2.4s ease-in-out infinite}' +
      '.mx-ghost{position:absolute;inset:0;border-radius:16px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}' +
      '.mx-ghost.g1{transform:translate3d(-26px,18px,-80px) rotate(-6deg);opacity:.5}' +
      '.mx-ghost.g2{transform:translate3d(26px,-14px,-160px) rotate(5deg);opacity:.32}' +
      '.mx-face{position:absolute;inset:0;border-radius:16px;border:1px solid rgba(255,255,255,.24);background:linear-gradient(160deg,color-mix(in srgb,var(--c1) 58%,#10141c),color-mix(in srgb,var(--c2) 42%,#10141c));box-shadow:0 40px 80px rgba(0,0,0,.55);overflow:hidden;padding:24px}' +
      '.mx-face:before{content:"";position:absolute;inset:0;background:radial-gradient(80% 60% at 20% 0%,rgba(255,255,255,.4),transparent 60%)}' +
      '.mx-face:after{content:"";position:absolute;left:0;top:0;width:44%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.4),transparent);animation:sheen 2.4s ease-in-out infinite}' +
      '.mx-face .micro{color:rgba(255,255,255,.8)}' +
      '.mx-gl{font:700 28px/1.05 "Inter",sans-serif;letter-spacing:-.035em;margin-top:10px}' +
      '.mx-axis{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);display:flex;gap:22px;font:500 9.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.4)}' +
      '.mx-side{display:flex;flex-direction:column;gap:14px}' +
      '.mx-card{border-radius:16px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.7);padding:20px}' +
      '.mx-kv{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);font:500 11px/1 "JetBrains Mono",monospace}' +
      '.mx-kv span:first-child{color:rgba(255,255,255,.42)}' +
      '.mx-mono{font:500 10.5px/1.7 "JetBrains Mono",monospace;color:color-mix(in srgb,var(--c3) 80%,#fff);word-break:break-all;margin-top:12px}' +
      '.mx-note{font:500 11px/1.6 "JetBrains Mono",monospace;color:rgba(255,255,255,.4)}' +
      '.mx-cells{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px}' +
      '.mx-cells i{height:26px;border-radius:6px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1)}' +
      '</style>' +
      '<div class="mx"><div class="mx-stage"><div class="mx-orbit"></div>' +
      '<div class="mx-deck"><div class="mx-ghost g1"></div><div class="mx-ghost g2"></div>' +
      '<div class="mx-face"><div class="micro">' + esc(T1) + '</div><div class="mx-gl">decompose<br>before you<br>reanimate</div></div></div>' +
      '<div class="mx-axis"><span>X 12掳</span><span>Y 鈭?6掳</span><span>Z 0掳</span></div>' +
      '</div><div class="mx-side">' +
      '<div class="mx-card"><div class="micro" style="margin-bottom:8px">Resolved transform</div>' +
      '<div class="mx-kv"><span>translate</span><span>0, 24, 0</span></div>' +
      '<div class="mx-kv"><span>scale</span><span>1.04</span></div>' +
      '<div class="mx-kv"><span>rotate</span><span>X 9 Y 鈭?6</span></div>' +
      '<div class="mx-kv"><span>perspective</span><span>1100</span></div>' +
      '<div class="mx-mono">matrix3d(.966,-.09,.25,0, ...)</div></div>' +
      '<div class="mx-card" style="flex:1"><div class="micro">matrix 鈫?readable</div><div class="mx-cells">' +
      Array.from({ length: 9 }).map(function () { return '<i></i>'; }).join('') + '</div>' +
      '<div class="mx-note">Checkpoints 0 / 25 / 50 / 75 / 100%</div></div>' +
      '</div></div>';
  };

  /* ============ 9. SCROLLMAP 鈥?pinned progress ============ */
  S.scrollmap = function () {
    return '<style>' +
      '.sc{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1fr 210px;gap:24px}' +
      '.sc-stage{position:relative;border-radius:18px;border:1px solid rgba(255,255,255,.10);overflow:hidden;background:linear-gradient(180deg,#0a0d13,#07090d);padding:34px 38px}' +
      '.sc-ghost{position:absolute;left:0;right:0;bottom:-34%;height:44%;border-radius:18px 18px 0 0;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.025);padding:26px 38px;transform:translateY(0);animation:ghostUp 2.4s ease-in-out infinite}' +
      '.sc-ghost .micro{opacity:.6}' +
      '.sc-pin{position:relative;z-index:2;display:flex;flex-direction:column;gap:16px}' +
      '.sc-eyebrow{font:500 10.5px/1 "JetBrains Mono",monospace;letter-spacing:.2em;text-transform:uppercase;color:color-mix(in srgb,var(--c3) 78%,#fff)}' +
      '.sc-h{font:800 56px/.98 "Inter",sans-serif;letter-spacing:-.045em;max-width:520px}' +
      '.sc-h em{font-style:normal;color:color-mix(in srgb,var(--c2) 90%,#fff)}' +
      '.sc-sub{max-width:420px;font-size:14px;line-height:1.6;color:rgba(255,255,255,.5)}' +
      '.sc-media{margin-top:8px;height:186px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:linear-gradient(120deg,color-mix(in srgb,var(--c1) 55%,#0b0e15),color-mix(in srgb,var(--c2) 45%,#0b0e15));position:relative;overflow:hidden;animation:breathe 2.4s ease-in-out infinite}' +
      '.sc-media:after{content:"";position:absolute;inset:0;background:radial-gradient(60% 70% at 70% 30%,rgba(255,255,255,.45),transparent 60%)}' +
      '.sc-rail{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.7);padding:22px 20px;display:flex;flex-direction:column;justify-content:space-between}' +
      '.sc-rail:before{content:"";position:absolute;left:26px;top:40px;bottom:60px;width:2px;background:rgba(255,255,255,.12)}' +
      '.sc-mark{position:relative;padding-left:26px;font:500 9.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.4)}' +
      '.sc-mark b{position:absolute;left:-3px;top:-2px;width:10px;height:10px;border-radius:50%;background:#0a0d13;border:2px solid rgba(255,255,255,.3)}' +
      '.sc-mark:nth-child(2) b{border-color:var(--c3);box-shadow:0 0 18px color-mix(in srgb,var(--c3) 60%,transparent)}' +
      '.sc-pct{font:700 34px/1 "Inter",sans-serif;letter-spacing:-.04em;color:#fff;margin-top:auto}' +
      '.sc-pct span{font:500 10px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.4);margin-left:6px}' +
      '.sc-pinlbl{font:500 9.5px/1.6 "JetBrains Mono",monospace;color:rgba(255,255,255,.38);margin-top:8px}' +
      '@keyframes ghostUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-16%)}}' +
      '</style>' +
      '<div class="sc"><div class="sc-stage">' +
      '<div class="sc-pin"><div class="sc-eyebrow">scroll 0.00 鈫?1.00</div>' +
      '<div class="sc-h">' + esc(T1) + ' <em>pinned</em></div>' +
      '<div class="sc-sub">One shared progress value, lerped each frame, drives transform, opacity and clip across the whole sequence.</div>' +
      '<div class="sc-media"></div></div>' +
      '<div class="sc-ghost"><div class="micro">next section 路 enter 0.85</div></div>' +
      '</div><div class="sc-rail">' +
      '<div>' + ['0.00 start', '0.25 headline', '0.50 media', '0.75 cards', '1.00 release'].map(function (m, i) { return '<div class="sc-mark"><b></b>' + m + '</div>'; }).join('') + '</div>' +
      '<div class="sc-pct">62<span>percent</span></div><div class="sc-pinlbl">pin 200vh<br>scrub true</div></div></div>';
  };

  /* ============ 10. STACK 鈥?sticky card stack ============ */
  S.stack = function () {
    var cards = [0, 1, 2, 3].map(function (i) {
      return '<div class="st-card" style="--i:' + i + ';animation-delay:' + (i * 0.1).toFixed(2) + 's"><div class="st-top"><span class="st-idx">0' + (i + 1) + '</span><span class="st-tag">PIN ' + (i * 100) + 'vh</span></div><div class="st-gl">' + ['Observe', 'Blueprint', 'Craft', 'Verify'][i] + '</div><div class="st-bar"><i></i></div></div>';
    }).join('');
    return '<style>' +
      '.st{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:.9fr 1.1fr;gap:30px;align-items:center}' +
      '.st-left .micro{margin-bottom:16px}' +
      '.st-h{font:800 60px/.98 "Inter",sans-serif;letter-spacing:-.05em}' +
      '.st-h em{font-style:normal;color:color-mix(in srgb,var(--c3) 84%,#fff)}' +
      '.st-p{max-width:360px;margin-top:20px;font-size:14px;line-height:1.6;color:rgba(255,255,255,.5)}' +
      '.st-deck{position:relative;height:520px;perspective:1000px}' +
      '.st-card{position:absolute;left:0;right:0;top:0;height:150px;border-radius:16px;border:1px solid rgba(255,255,255,.14);padding:20px 24px;background:linear-gradient(160deg,rgba(22,27,39,.96),rgba(12,15,22,.96));box-shadow:0 30px 60px rgba(0,0,0,.5);display:flex;flex-direction:column;gap:12px;transform-origin:top center;animation:stMove 2.4s ease-in-out infinite}' +
      '.st-card:nth-child(1){top:0;z-index:4;border-color:color-mix(in srgb,var(--c3) 45%,rgba(255,255,255,.14))}' +
      '.st-card:nth-child(2){top:96px;z-index:3;transform:scale(.965);opacity:.92}' +
      '.st-card:nth-child(3){top:186px;z-index:2;transform:scale(.93);opacity:.78}' +
      '.st-card:nth-child(4){top:268px;z-index:1;transform:scale(.9);opacity:.6}' +
      '.st-top{display:flex;justify-content:space-between;align-items:center}' +
      '.st-idx{font:600 11px/1 "JetBrains Mono",monospace;color:color-mix(in srgb,var(--c3) 85%,#fff)}' +
      '.st-tag{font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.14em;color:rgba(255,255,255,.4)}' +
      '.st-gl{font:700 26px/1 "Inter",sans-serif;letter-spacing:-.03em}' +
      '.st-bar{height:6px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}' +
      '.st-bar i{display:block;height:100%;width:64%;border-radius:99px;background:linear-gradient(90deg,var(--c1),var(--c3))}' +
      '@keyframes stMove{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-16px) scale(1.012)}}' +
      '</style>' +
      '<div class="st"><div class="st-left"><div class="micro">sticky stack 路 4 scenes</div>' +
      '<div class="st-h">' + esc(T1.split(' ')[0]) + '<br><em>one scroll</em></div>' +
      '<p class="st-p">Each card pins for 100vh, then hands off. Progress maps to a shared timeline, not to per-element listeners.</p>' +
      '<div style="display:flex;gap:8px;margin-top:18px"><span class="pill">sticky</span><span class="pill">scrub</span><span class="pill">lerp .12</span></div></div>' +
      '<div class="st-deck">' + cards + '</div></div>';
  };

  /* ============ 11. POINTER 鈥?cursor spotlight / drag mechanics ============ */
  S.pointer = function () {
    var drag = VARIANT === 'drag';
    var magnet = VARIANT === 'magnet';
    var inner = magnet
      ? '<div class="pt-btns">' +
          ['Copy prompt', 'Export .md', 'Share'].map(function (l, i) {
            return '<span class="pt-pill" style="animation-delay:' + (i * 0.12).toFixed(2) + 's">' + l + '</span>';
          }).join('') + '</div>' +
        '<div class="pt-cursor2" style="animation:ptMagCur 2.4s ease-in-out infinite"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M5 3l14 8-6 1.5L10 19z"/></svg></div>' +
        '<div class="pt-hud"><span>spring k 0.18</span><span>damping 14</span><span>max 18 px</span></div>'
      : drag
      ? '<div class="pt-track">' +
          [0, 1, 2, 3, 4].map(function (i) {
            return '<div class="pt-slide' + (i === 2 ? ' lift' : '') + '"><div class="pt-thumb" style="background:linear-gradient(150deg,color-mix(in srgb,var(--c' + ((i % 2) + 1) + ') 60%,#0d1118),#0d1118)"></div><div class="pt-line"></div><div class="pt-line s"></div></div>';
          }).join('') + '</div>' +
        '<div class="pt-cursor" style="animation:ptX 2.4s ease-in-out infinite"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M5 3l14 8-6 1.5L10 19z"/></svg></div>' +
        '<div class="pt-hud"><span>threshold 8 px</span><span>velocity 1.4 px/ms</span><span>snap 320</span></div>'
      : '<div class="pt-spot" style="animation:ptSpot 2.4s ease-in-out infinite"></div>' +
        '<div class="pt-magnet" style="animation:ptMagnet 2.4s ease-in-out infinite"><span>magnetic</span></div>' +
        '<div class="pt-cursor2" style="animation:ptSpot 2.4s ease-in-out infinite"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M5 3l14 8-6 1.5L10 19z"/></svg></div>' +
        '<div class="pt-hud"><span>lerp 0.12</span><span>magnet radius 120</span><span>trail 6</span></div>';
    return '<style>' +
      '.pt{position:absolute;inset:76px 70px 66px;border-radius:18px;border:1px solid rgba(255,255,255,.10);overflow:hidden;background:radial-gradient(90% 90% at 30% 20%,color-mix(in srgb,var(--c1) 20%,#080a0f),#07090d 65%)}' +
      '.pt-title{position:absolute;left:34px;top:28px;z-index:5;font:800 40px/1 "Inter",sans-serif;letter-spacing:-.045em}' +
      '.pt-sub{position:absolute;left:34px;top:78px;z-index:5;font:500 10px/1.6 "JetBrains Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.42)}' +
      '.pt-hud{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);display:flex;gap:8px;z-index:6}' +
      '.pt-hud span{border:1px solid rgba(255,255,255,.14);border-radius:99px;padding:7px 12px;font:500 10px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.6);background:rgba(8,10,14,.6);backdrop-filter:blur(6px)}' +
      '.pt-spot{position:absolute;width:520px;height:520px;border-radius:50%;left:8%;top:22%;background:radial-gradient(circle,color-mix(in srgb,var(--c3) 30%,transparent),transparent 62%);filter:blur(26px);mix-blend-mode:screen}' +
      '@keyframes ptSpot{0%,100%{transform:translate(0,0)}30%{transform:translate(420px,90px)}62%{transform:translate(180px,220px)}80%{transform:translate(520px,140px)}}' +
      '.pt-magnet{position:absolute;left:44%;top:44%;width:190px;height:64px;border-radius:99px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.07);backdrop-filter:blur(10px);font:600 13px/1 "Inter",sans-serif;letter-spacing:.02em;z-index:4}' +
      '@keyframes ptMagnet{0%,100%{transform:translate(0,0)}30%{transform:translate(34px,12px)}62%{transform:translate(16px,-14px)}80%{transform:translate(42px,8px)}}' +
      '.pt-cursor,.pt-cursor2{position:absolute;z-index:7;filter:drop-shadow(0 4px 12px rgba(0,0,0,.6))}' +
      '.pt-cursor2{left:8%;top:22%;transform:translate(120px,120px)}' +
      '.pt-btns{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;gap:14px;z-index:4}' +
      '.pt-pill{padding:17px 30px;border-radius:99px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.08);backdrop-filter:blur(10px);font:600 14px/1 "Inter",sans-serif;box-shadow:0 20px 40px rgba(0,0,0,.45);animation:ptMag 2.4s cubic-bezier(.16,1,.3,1) infinite}' +
      '.pt-pill:nth-child(1){background:#f2f4f8;color:#080a0f;border-color:transparent}' +
      '@keyframes ptMag{0%,100%{transform:translate(0,0) scale(1)}24%{transform:translate(10px,-6px) scale(1.03)}48%{transform:translate(-8px,7px) scale(1.01)}72%{transform:translate(6px,4px) scale(1.02)}}' +
      '@keyframes ptMagCur{0%,100%{left:52%;top:44%}50%{left:66%;top:60%}}' +
      '.pt-cursor2{left:52%;top:44%}' +
      '.pt-track{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;gap:16px;width:1100px;z-index:3}' +
      '.pt-slide{width:200px;height:250px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.045);padding:14px;display:flex;flex-direction:column;gap:10px;flex:none}' +
      '.pt-slide.lift{transform:translateY(-18px) rotate(-3deg) scale(1.04);border-color:color-mix(in srgb,var(--c3) 55%,rgba(255,255,255,.12));box-shadow:0 30px 60px rgba(0,0,0,.55)}' +
      '.pt-thumb{flex:1;border-radius:9px}' +
      '.pt-line{height:7px;border-radius:4px;background:rgba(255,255,255,.3)}' +
      '.pt-line.s{width:60%;background:rgba(255,255,255,.14)}' +
      '@keyframes ptX{0%,100%{left:30%;top:58%}50%{left:62%;top:44%}}' +
      '</style>' +
      '<div class="pt"><div class="pt-title">' + esc(T1) + '</div><div class="pt-sub">' + (drag ? 'pointer capture 路 inertia 路 snap' : magnet ? 'spring follow 路 clamped displacement' : 'cursor lerp 路 magnetic target') + '</div>' + inner + '</div>';
  };

  /* ============ 12. SCENE 鈥?WebGL-ish 3D object + HUD ============ */
  S.scene = function () {
    var faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
    return '<style>' +
      '.sn{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1fr 280px;gap:26px}' +
      '.sn-stage{position:relative;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.10);background:radial-gradient(70% 70% at 50% 34%,color-mix(in srgb,var(--c1) 24%,#080a0f),#06080c 72%);display:flex;align-items:center;justify-content:center;perspective:900px}' +
      '.sn-ring{position:absolute;width:460px;height:460px;border-radius:50%;border:1px dashed rgba(255,255,255,.12);animation:spin 18s linear infinite}' +
      '.sn-ring.r2{width:340px;height:340px;animation-duration:12s;animation-direction:reverse;border-style:solid;border-color:rgba(255,255,255,.07)}' +
      '.sn-obj{position:relative;width:190px;height:190px;transform-style:preserve-3d;animation:tilt 2.4s ease-in-out infinite}' +
      '.sn-face{position:absolute;inset:0;border:1px solid color-mix(in srgb,var(--c3) 55%,transparent);background:linear-gradient(150deg,color-mix(in srgb,var(--c1) 30%,transparent),color-mix(in srgb,var(--c2) 18%,transparent));box-shadow:inset 0 0 40px color-mix(in srgb,var(--c1) 30%,transparent)}' +
      '.sn-face.front{transform:translateZ(95px)}' +
      '.sn-face.back{transform:rotateY(180deg) translateZ(95px)}' +
      '.sn-face.left{transform:rotateY(-90deg) translateZ(95px)}' +
      '.sn-face.right{transform:rotateY(90deg) translateZ(95px)}' +
      '.sn-face.top{transform:rotateX(90deg) translateZ(95px)}' +
      '.sn-face.bottom{transform:rotateX(-90deg) translateZ(95px)}' +
      '.sn-core{position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#fff,color-mix(in srgb,var(--c3) 80%,transparent) 40%,transparent 70%);filter:blur(8px);animation:breathe 2.4s ease-in-out infinite}' +
      '.sn-gridline{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(80% 80% at 50% 50%,#000 20%,transparent 75%)}' +
      '.sn-title{position:absolute;left:30px;top:26px;z-index:4}' +
      '.sn-title .gl{font:800 34px/1 "Inter",sans-serif;letter-spacing:-.04em}' +
      '.sn-title .micro{margin-top:8px}' +
      '.sn-hud{position:absolute;right:26px;bottom:24px;z-index:4;text-align:right;font:500 10px/1.9 "JetBrains Mono",monospace;color:rgba(255,255,255,.42)}' +
      '.sn-side{border-radius:18px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.72);padding:22px;display:flex;flex-direction:column;gap:14px}' +
      '.sn-kv{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);font:500 10.5px/1 "JetBrains Mono",monospace}' +
      '.sn-kv span:first-child{color:rgba(255,255,255,.42)}' +
      '.sn-code{flex:1;border-radius:10px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.28);padding:14px;font:500 10px/1.8 "JetBrains Mono",monospace;color:rgba(255,255,255,.5);white-space:pre-wrap}' +
      '.sn-code b{color:color-mix(in srgb,var(--c3) 80%,#fff);font-weight:500}' +
      '</style>' +
      '<div class="sn"><div class="sn-stage"><div class="sn-gridline"></div><div class="sn-ring"></div><div class="sn-ring r2"></div>' +
      '<div class="sn-core"></div><div class="sn-obj">' + faces.map(function (f) { return '<div class="sn-face ' + f + '"></div>'; }).join('') + '</div>' +
      '<div class="sn-title"><div class="gl">' + esc(T1) + '</div><div class="micro">camera 45掳 路 fixed rig</div></div>' +
      '<div class="sn-hud">dpr capped 2<br>16.7 ms budget<br>pause off-screen</div>' +
      '</div><div class="sn-side"><div class="micro">Uniforms</div>' +
      '<div class="sn-kv"><span>uTime</span><span>1.428</span></div>' +
      '<div class="sn-kv"><span>uMouse</span><span>0.34, 鈭?.12</span></div>' +
      '<div class="sn-kv"><span>uDpr</span><span>2.0</span></div>' +
      '<div class="sn-code">vec3 col = mix(\n  <b>uColorA</b>, <b>uColorB</b>,\n  smoothstep(0.,1.,uv.y)\n);\ncol *= <b>grain</b>(uv);\ngl_FragColor = vec4(col, 1.);</div>' +
      '<div class="micro" style="margin-top:2px">poster fallback required</div></div></div>';
  };

  /* ============ 13. SVGDRAW 鈥?lottie / path reveal ============ */
  S.svgdraw = function () {
    return '<style>' +
      '.sv{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1.15fr .85fr;gap:24px}' +
      '.sv-stage{position:relative;border-radius:18px;border:1px solid rgba(255,255,255,.10);background:radial-gradient(80% 80% at 40% 20%,color-mix(in srgb,var(--c2) 20%,#080a0f),#07090d 70%);display:flex;align-items:center;justify-content:center;overflow:hidden}' +
      '.sv-svg{width:74%;height:74%}' +
      '.sv-path{fill:none;stroke:url(#svgGrad);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1400;stroke-dashoffset:1400;animation:svDraw 2.4s ease-in-out infinite}' +
      '.sv-dot{fill:#fff;filter:drop-shadow(0 0 10px #fff)}' +
      '.sv-lbl{position:absolute;left:28px;top:24px}' +
      '.sv-lbl .gl{font:800 34px/1 "Inter",sans-serif;letter-spacing:-.04em}' +
      '.sv-side{display:flex;flex-direction:column;gap:12px}' +
      '.sv-card{border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.72);padding:18px}' +
      '.sv-layer{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.06);font:500 10.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.55)}' +
      '.sv-layer b{color:#fff;font-weight:500}' +
      '.sv-code{font:500 10px/1.75 "JetBrains Mono",monospace;color:rgba(255,255,255,.48);white-space:pre-wrap}' +
      '@keyframes svDraw{0%{stroke-dashoffset:1400}55%,100%{stroke-dashoffset:0}}' +
      '</style>' +
      '<div class="sv"><div class="sv-stage"><div class="sv-lbl"><div class="gl">' + esc(T1) + '</div><div class="micro" style="margin-top:8px">network 鈫?json 鈫?path</div></div>' +
      '<svg class="sv-svg" viewBox="0 0 400 300"><defs><linearGradient id="svgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + C3 + '"/><stop offset="1" stop-color="' + C1 + '"/></linearGradient></defs>' +
      '<path class="sv-path" d="M40,220 C80,80 140,60 200,150 C260,240 320,200 360,90"/>' +
      '<circle class="sv-dot" cx="360" cy="90" r="5"/>' +
      '</svg><div class="sn-gridline" style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:50px 50px"></div></div>' +
      '<div class="sv-side"><div class="sv-card"><div class="micro" style="margin-bottom:8px">Lottie layers</div>' +
      '<div class="sv-layer"><span>shape 路 stroke</span><b>dash 0 鈫?100</b></div>' +
      '<div class="sv-layer"><span>trim path</span><b>0.0 鈫?1.0</b></div>' +
      '<div class="sv-layer"><span>ease</span><b>in-out 1.2 s</b></div>' +
      '<div class="sv-layer"><span>frame rate</span><b>60</b></div></div>' +
      '<div class="sv-card" style="flex:1"><div class="micro" style="margin-bottom:8px">Captured from network</div>' +
      '<div class="sv-code">GET /anim/hero.json<br>content-type: application/json<br>layers: 12 路 assets: 3<br>w: 800 h: 600 ip: 0 op: 120</div></div></div></div>';
  };

  /* ============ 14. REVEAL 鈥?split text / mask reveal ============ */
  S.reveal = function () {
    var mask = VARIANT === 'mask';
    var lines = ['Layers hold', 'tales of', 'time'];
    var maskHtml = lines.map(function (line, i) {
      return '<div class="rv-line"><span class="rv-mask" style="animation-delay:' + (i * 0.12).toFixed(2) + 's">' + esc(line) + '</span></div>';
    }).join('');
    var splitHtml = ['MOTION', 'AS', 'METHOD'].map(function (w, i) {
      var letters = w.split('').map(function (ch, j) {
        return '<span class="rv-ch" style="animation-delay:' + (i * 0.18 + j * 0.035).toFixed(2) + 's">' + esc(ch) + '</span>';
      }).join('');
      return '<div class="rv-line"><span class="rv-word">' + letters + '</span></div>';
    }).join('');
    return '<style>' +
      '.rv{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;justify-content:center;gap:20px;overflow:hidden}' +
      '.rv-eyebrow{position:absolute;top:0;left:0;font:500 10.5px/1 "JetBrains Mono",monospace;letter-spacing:.2em;text-transform:uppercase;color:color-mix(in srgb,var(--c3) 78%,#fff)}' +
      '.rv-line{overflow:hidden;line-height:.92}' +
      '.rv-mask{display:block;font:800 108px/1 "Inter",sans-serif;letter-spacing:-.055em;transform:translateY(105%);animation:rvMask 2.4s cubic-bezier(.16,1,.3,1) infinite}' +
      '.rv-mask:nth-child(even){color:color-mix(in srgb,var(--c3) 82%,#fff)}' +
      '.rv-word{display:inline-block;white-space:nowrap;font:800 96px/1 "Inter",sans-serif;letter-spacing:-.055em}' +
      '.rv-ch{display:inline-block;transform:translateY(105%) rotate(6deg);opacity:0;animation:rvLetter 2.4s cubic-bezier(.16,1,.3,1) infinite}' +
      '.rv-word:nth-child(2) .rv-ch{color:color-mix(in srgb,var(--c2) 85%,#fff)}' +
      '.rv-foot{position:absolute;right:0;bottom:0;display:flex;gap:8px}' +
      '@keyframes rvMask{0%{transform:translateY(105%)}22%,78%{transform:translateY(0)}92%,100%{transform:translateY(-105%)}}' +
      '@keyframes rvLetter{0%{transform:translateY(105%) rotate(6deg);opacity:0}24%,76%{transform:translateY(0) rotate(0);opacity:1}90%,100%{transform:translateY(-60%);opacity:0}}' +
      '</style>' +
      '<div class="rv"><div class="rv-eyebrow">' + esc(T1) + ' 路 per-line clip</div>' +
      (mask ? maskHtml : splitHtml) +
      '<div class="rv-foot"><span class="pill">stagger 60鈥?0 ms</span><span class="pill">total &lt; 600 ms</span><span class="pill">transform + opacity only</span></div></div>';
  };

  /* ============ 15. STATES 鈥?interaction state machine ============ */
  S.states = function () {
    const nodes = ['REST', 'HOVER', 'PRESS', 'OPEN', 'CLOSING'];
    const graph = nodes.map(function (n, i) {
      return '<div class="ss-node" style="animation-delay:' + (i * 0.42).toFixed(2) + 's"><b>' + n + '</b><span>' + ['idle', 'pointer', 'active', 'expanded', 'exit'][i] + '</span></div>' + (i < nodes.length - 1 ? '<i class="ss-arrow"></i>' : '');
    }).join('');
    const rows = [
      ['data-state', 'closed 鈫?open'],
      ['aria-expanded', 'true'],
      ['enter', '180 ms fade + 8 px rise'],
      ['exit', '120 ms, then unmount'],
      ['focus', 'returns to trigger']
    ].map(function (r) { return '<div class="ss-kv"><span>' + r[0] + '</span><span>' + r[1] + '</span></div>'; }).join('');
    return '<style>' +
      '.ss{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:22px}' +
      '.ss-h{display:flex;justify-content:space-between;align-items:baseline}' +
      '.ss-h .gl{font:800 46px/1 "Inter",sans-serif;letter-spacing:-.045em}' +
      '.ss-graph{display:flex;align-items:center;gap:0;padding:26px 22px;border-radius:16px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.62)}' +
      '.ss-node{flex:1;text-align:center;padding:14px 6px;border-radius:11px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.035);animation:ssGlow 2.4s ease-in-out infinite}' +
      '.ss-node b{display:block;font:600 11px/1 "JetBrains Mono",monospace;letter-spacing:.14em;color:#fff}' +
      '.ss-node span{display:block;margin-top:6px;font:500 9px/1 "JetBrains Mono",monospace;letter-spacing:.1em;color:rgba(255,255,255,.35);text-transform:uppercase}' +
      '.ss-arrow{width:34px;height:1px;position:relative;background:linear-gradient(90deg,rgba(255,255,255,.3),rgba(255,255,255,.06));margin:0 2px}' +
      '.ss-arrow:after{content:"";position:absolute;right:0;top:-3px;border-left:6px solid rgba(255,255,255,.3);border-top:3.5px solid transparent;border-bottom:3.5px solid transparent}' +
      '@keyframes ssGlow{0%,100%{border-color:rgba(255,255,255,.13);box-shadow:none}12%,28%{border-color:color-mix(in srgb,var(--c3) 70%,transparent);box-shadow:0 0 26px color-mix(in srgb,var(--c3) 30%,transparent);background:color-mix(in srgb,var(--c3) 12%,transparent)}}' +
      '.ss-mid{display:grid;grid-template-columns:1fr 1fr;gap:16px;flex:1}' +
      '.ss-card{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.012));padding:22px;display:flex;flex-direction:column;justify-content:center;gap:14px}' +
      '.ss-card .micro{margin-bottom:6px}' +
      '.ss-btn{align-self:flex-start;padding:16px 30px;border-radius:12px;background:#f2f4f8;color:#080a0f;font:600 15px/1 "Inter",sans-serif;box-shadow:0 18px 40px rgba(0,0,0,.5);animation:ssBtn 2.4s ease-in-out infinite}' +
      '.ss-btn:after{content:"鈻?;margin-left:10px;font-size:12px;opacity:.5}' +
      '@keyframes ssBtn{0%,100%{transform:translateY(0)}14%{transform:translateY(1px) scale(.985)}26%,86%{transform:translateY(0)}}' +
      '.ss-kv{display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid rgba(255,255,255,.06);font:500 11px/1 "JetBrains Mono",monospace}' +
      '.ss-kv span:first-child{color:rgba(255,255,255,.42)}' +
      '.ss-kv span:last-child{color:#fff}' +
      '</style>' +
      '<div class="ss"><div class="ss-h"><div class="gl">' + esc(T1) + '</div><div class="micro">every control = one table</div></div>' +
      '<div class="ss-graph">' + graph + '</div>' +
      '<div class="ss-mid"><div class="ss-card"><div class="micro">Live component</div><span class="ss-btn">Open menu</span>' +
      '<div class="micro" style="margin-top:10px;color:color-mix(in srgb,var(--c3) 75%,#fff)">data-state="open"</div></div>' +
      '<div class="ss-card"><div class="micro">Transition table</div>' + rows + '</div></div></div>';
  };

  /* ============ 16. RESPONSIVE 鈥?three widths, one section ============ */
  S.responsive = function () {
    const parity = VARIANT === 'parity';
    const frames = [
      ['390', '1 col', 250, 380],
      ['768', '2 col', 330, 430],
      ['1440', '3 col', 430, 460]
    ].map(function (f, i) {
      const cols = i + 1;
      const cards = Array.from({ length: cols * 2 }).map(function (_, j) {
        return '<i style="height:' + (i === 0 ? 54 : 46) + 'px;animation-delay:' + (i * 0.3 + j * 0.06).toFixed(2) + 's"></i>';
      }).join('');
      return '<div class="rs-frame" style="width:' + f[2] + 'px;animation-delay:' + (i * 0.28).toFixed(2) + 's">' +
        '<div class="rs-bar"><span>' + f[0] + ' px</span><b>' + f[1] + '</b></div>' +
        '<div class="rs-body"><div class="rs-h"></div><div class="rs-sub"></div><div class="rs-grid" style="grid-template-columns:repeat(' + cols + ',1fr)">' + cards + '</div></div></div>';
    }).join('');
    return '<style>' +
      '.rs{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:20px}' +
      '.rs-h2{display:flex;justify-content:space-between;align-items:baseline}' +
      '.rs-h2 .gl{font:800 46px/1 "Inter",sans-serif;letter-spacing:-.045em}' +
      '.rs-row{flex:1;display:flex;align-items:flex-end;justify-content:center;gap:22px}' +
      '.rs-frame{border-radius:14px;border:1px solid rgba(255,255,255,.13);background:linear-gradient(170deg,rgba(255,255,255,.06),rgba(255,255,255,.012));overflow:hidden;animation:rsLift 2.4s ease-in-out infinite}' +
      '@keyframes rsLift{0%,100%{transform:translateY(0);border-color:rgba(255,255,255,.13)}16%,44%{transform:translateY(-10px);border-color:color-mix(in srgb,var(--c3) 55%,transparent)}}' +
      '.rs-bar{display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.08);font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.1em;color:rgba(255,255,255,.45)}' +
      '.rs-bar b{color:#fff;font-weight:500}' +
      '.rs-body{padding:16px 14px}' +
      '.rs-h{height:16px;border-radius:4px;background:linear-gradient(90deg,rgba(255,255,255,.9),rgba(255,255,255,.4));width:78%}' +
      '.rs-sub{margin-top:8px;height:7px;border-radius:4px;background:rgba(255,255,255,.2);width:56%}' +
      '.rs-grid{display:grid;gap:7px;margin-top:16px}' +
      '.rs-grid i{border-radius:6px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1) 45%,transparent),color-mix(in srgb,var(--c2) 25%,transparent));animation:pulse 2.4s ease-in-out infinite}' +
      '.rs-foot{display:flex;gap:8px;flex-wrap:wrap}' +
      '</style>' +
      '<div class="rs"><div class="rs-h2"><div class="gl">' + esc(T1) + '</div><div class="micro">breakpoints measured, not framework defaults</div></div>' +
      '<div class="rs-row">' + frames + '</div>' +
      '<div class="rs-foot">' + (parity
        ? '<span class="pill">landmarks 4</span><span class="pill">unnamed controls 0</span><span class="pill">contrast 鈮?4.5</span><span class="pill">touch 44 px</span><span class="pill">200% zoom</span><span class="pill">no side scroll</span>'
        : '<span class="pill">390 / 768 / 1024 / 1440</span><span class="pill">container 1180</span><span class="pill">type clamp()</span><span class="pill">items per row 1 鈫?2 鈫?3</span>') +
      '</div></div>';
  };

  /* ============ 17. REPORT 鈥?acceptance self-test ============ */
  S.report = function () {
    const claims = VARIANT === 'claims'
      ? [['menus open on click and Enter', 'pass'], ['focus returns to trigger', 'pass'], ['no new console errors', 'pass'], ['carousel masked and compared', 'unmeasured'], ['first-fold height within 24 px', 'fail'], ['token purity: no raw hex', 'pass']]
      : [['LCP < 2.5 s on cold cache', 'pass'], ['no long task > 50 ms while scrolling', 'pass'], ['frame time < 16.7 ms', 'pass'], ['pixel diff 鈮?24 / channel', 'pass'], ['unknown shader uniforms', 'unmeasured'], ['third-party media licence', 'unmeasured']];
    const rows = claims.map(function (c, i) {
      return '<div class="rp-row" style="animation-delay:' + (i * 0.18).toFixed(2) + 's"><span class="rp-c">' + esc(c[0]) + '</span><b class="rp-t ' + c[1] + '">' + (c[1] === 'pass' ? 'PASS' : c[1] === 'fail' ? 'FAIL' : 'UNMEASURED') + '</b></div>';
    }).join('');
    return '<style>' +
      '.rp{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1fr 300px;gap:22px}' +
      '.rp-main{border-radius:16px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.72);padding:24px;display:flex;flex-direction:column}' +
      '.rp-head{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.1)}' +
      '.rp-head .gl{font:800 30px/1 "Inter",sans-serif;letter-spacing:-.04em}' +
      '.rp-round{font:500 10px/1 "JetBrains Mono",monospace;letter-spacing:.16em;color:color-mix(in srgb,var(--c3) 80%,#fff)}' +
      '.rp-row{display:flex;align-items:center;gap:16px;padding:15px 0;border-bottom:1px solid rgba(255,255,255,.05);animation:rpIn 2.4s ease-out infinite}' +
      '@keyframes rpIn{0%{opacity:.2;transform:translateX(-8px)}14%,100%{opacity:1;transform:translateX(0)}}' +
      '.rp-c{flex:1;font-size:13.5px;color:rgba(255,255,255,.72)}' +
      '.rp-t{font:600 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.14em;padding:6px 9px;border-radius:6px}' +
      '.rp-t.pass{color:#7ff0c4;background:rgba(92,220,177,.12);border:1px solid rgba(92,220,177,.4)}' +
      '.rp-t.fail{color:#ff9db8;background:rgba(255,138,177,.12);border:1px solid rgba(255,138,177,.4)}' +
      '.rp-t.unmeasured{color:#ffd39b;background:rgba(255,186,114,.12);border:1px solid rgba(255,186,114,.4)}' +
      '.rp-side{display:flex;flex-direction:column;gap:14px}' +
      '.rp-score{border-radius:16px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.012));padding:22px;text-align:center}' +
      '.rp-big{font:800 58px/1 "Inter",sans-serif;letter-spacing:-.05em;background:linear-gradient(120deg,' + C3 + ',' + C1 + ');-webkit-background-clip:text;background-clip:text;color:transparent}' +
      '.rp-lbl{font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.16em;color:rgba(255,255,255,.4);margin-top:8px;text-transform:uppercase}' +
      '.rp-bars{display:flex;gap:3px;align-items:flex-end;height:54px;margin-top:18px}' +
      '.rp-bars i{flex:1;border-radius:2px;background:linear-gradient(180deg,' + C3 + ',color-mix(in srgb,' + C1 + ' 40%,transparent));animation:pulse 2.4s ease-in-out infinite}' +
      '.rp-note{font:500 11px/1.6 "JetBrains Mono",monospace;color:rgba(255,255,255,.42)}' +
      '</style>' +
      '<div class="rp"><div class="rp-main"><div class="rp-head"><div class="gl">' + esc(T1) + '</div><div class="rp-round">ROUND 2 / 3</div></div>' +
      rows + '</div><div class="rp-side"><div class="rp-score"><div class="rp-big">0.93</div><div class="rp-lbl">likeness</div>' +
      '<div class="rp-bars">' + [30, 44, 38, 52, 46, 62, 50, 70, 58, 76, 64, 82].map(function (h, i) { return '<i style="height:' + h + '%;animation-delay:' + (i * 0.1).toFixed(2) + 's"></i>'; }).join('') + '</div></div>' +
      '<div class="rp-score" style="text-align:left"><div class="micro">Rule</div><div class="rp-note" style="margin-top:10px">A check that could not measure reports <b style="color:#ffd39b">unmeasured</b> and blocks a pass. Silence never rounds up to success.</div></div></div></div>';
  };

  /* ============ 18. DIFF 鈥?screenshot verification ============ */
  S.diff = function () {
    const heat = [3, 4, 2, 5, 8, 4, 3, 9, 14, 6, 4, 3, 7, 12, 5, 3, 2, 6, 4, 3].map(function (v) {
      const a = Math.min(0.9, v / 16);
      return '<i style="background:color-mix(in srgb,' + C4 + ' ' + (a * 100) + '%,color-mix(in srgb,' + C1 + ' 30%,transparent));height:' + (10 + v * 2) + 'px"></i>';
    }).join('');
    return '<style>' +
      '.df{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:18px}' +
      '.df-head{display:flex;justify-content:space-between;align-items:baseline}' +
      '.df-head .gl{font:800 44px/1 "Inter",sans-serif;letter-spacing:-.045em}' +
      '.df-pair{display:grid;grid-template-columns:1fr 1fr;gap:18px;flex:1;min-height:0}' +
      '.df-shot{position:relative;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(170deg,#10141d,#0a0d12);padding:22px;overflow:hidden}' +
      '.df-shot .micro{position:absolute;left:16px;top:12px}' +
      '.df-mock{margin-top:16px;display:flex;flex-direction:column;gap:10px}' +
      '.df-mh{height:14px;width:62%;border-radius:4px;background:rgba(255,255,255,.8)}' +
      '.df-ms{height:7px;width:44%;border-radius:4px;background:rgba(255,255,255,.24)}' +
      '.df-mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:8px}' +
      '.df-mgrid i{height:58px;border-radius:7px;background:linear-gradient(150deg,color-mix(in srgb,var(--c1) 50%,transparent),color-mix(in srgb,var(--c2) 28%,transparent))}' +
      '.df-mask{position:absolute;background:rgba(255,255,255,.9);border-radius:4px;mix-blend-mode:screen;animation:dfMask 2.4s ease-in-out infinite}' +
      '.df-m1{left:56%;top:34%;width:30%;height:26%}' +
      '.df-m2{left:12%;top:70%;width:20%;height:16%;animation-delay:.4s}' +
      '@keyframes dfMask{0%,100%{opacity:.85}50%{opacity:.55}}' +
      '.df-heat{display:flex;align-items:flex-end;gap:3px;height:56px;padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:rgba(10,13,19,.6)}' +
      '.df-heat i{flex:1;border-radius:2px}' +
      '.df-scores{display:flex;gap:10px;align-items:center}' +
      '.df-score{border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px 14px;font:500 10px/1.5 "JetBrains Mono",monospace;color:rgba(255,255,255,.55)}' +
      '.df-score b{display:block;font-size:16px;color:#fff;letter-spacing:-.02em}' +
      '</style>' +
      '<div class="df"><div class="df-head"><div class="gl">' + esc(T1) + '</div><div class="micro">masked 路 common area 路 two scores</div></div>' +
      '<div class="df-pair">' +
      ['REFERENCE', 'REBUILD'].map(function (t, i) {
        return '<div class="df-shot"><div class="micro">' + t + ' 路 1440脳' + (i ? '2420' : '2400') + '</div><div class="df-mock"><div class="df-mh"></div><div class="df-ms"></div><div class="df-mgrid"><i></i><i></i><i></i></div><div class="df-ms" style="width:72%"></div></div><div class="df-mask df-m1"></div><div class="df-mask df-m2"></div></div>';
      }).join('') + '</div>' +
      '<div class="df-heat">' + heat + '</div>' +
      '<div class="df-scores"><span class="df-score"><b>0.94</b>layout</span><span class="df-score"><b>0.88</b>ssim</span><span class="df-score"><b>鈭?0</b>height 螖 px</span><span class="df-score"><b>3</b>worst regions</span>' +
      '<span class="micro" style="margin-left:auto">fix biggest difference first</span></div></div>';
  };

  /* ============ 19. MICRO 鈥?press, toast, skeleton ============ */
  S.micro = function () {
    return '<style>' +
      '.mc{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr;gap:18px}' +
      '.mc-head{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline}' +
      '.mc-head .gl{font:800 46px/1 "Inter",sans-serif;letter-spacing:-.045em}' +
      '.mc-cell{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.10);background:linear-gradient(160deg,rgba(255,255,255,.055),rgba(255,255,255,.012));padding:26px;display:flex;flex-direction:column;justify-content:center;gap:18px;overflow:hidden}' +
      '.mc-cell .micro{position:absolute;left:20px;top:16px}' +
      '.mc-btn{position:relative;align-self:flex-start;margin-top:16px;padding:17px 32px;border-radius:99px;background:#f2f4f8;color:#080a0f;font:600 15px/1 "Inter",sans-serif;overflow:hidden;animation:mcPress 2.4s ease-in-out infinite}' +
      '.mc-btn:after{content:"";position:absolute;left:50%;top:50%;width:8px;height:8px;border-radius:50%;background:rgba(0,0,0,.18);transform:translate(-50%,-50%) scale(0);animation:mcRipple 2.4s ease-out infinite}' +
      '@keyframes mcPress{0%,100%{transform:scale(1)}10%{transform:scale(.965)}20%{transform:scale(1)}60%{transform:scale(1)}66%{transform:scale(.985)}72%{transform:scale(1)}}' +
      '@keyframes mcRipple{0%,6%{transform:translate(-50%,-50%) scale(0);opacity:0}10%{opacity:.5}34%{transform:translate(-50%,-50%) scale(18);opacity:0}100%{opacity:0}}' +
      '.mc-toast{position:relative;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:rgba(16,20,28,.94);padding:15px 18px;box-shadow:0 20px 40px rgba(0,0,0,.5);animation:mcToast 2.4s cubic-bezier(.16,1,.3,1) infinite}' +
      '@keyframes mcToast{0%,6%{transform:translateY(16px);opacity:0}16%,80%{transform:translateY(0);opacity:1}92%,100%{transform:translateY(-8px);opacity:0}}' +
      '.mc-toast b{font:600 12.5px/1 "Inter",sans-serif}' +
      '.mc-toast span{display:block;margin-top:7px;font:500 10px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.45)}' +
      '.mc-prog{position:absolute;left:0;bottom:0;height:2px;border-radius:0 0 12px 12px;background:linear-gradient(90deg,' + C3 + ',' + C1 + ');animation:mcProg 2.4s linear infinite}' +
      '@keyframes mcProg{0%{width:0}70%,100%{width:100%}}' +
      '.mc-skel{display:flex;flex-direction:column;gap:10px}' +
      '.mc-sk{position:relative;height:34px;border-radius:8px;overflow:hidden;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.08)}' +
      '.mc-sk:after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.14),transparent);animation:sheen 2.4s ease-in-out infinite}' +
      '.mc-real{margin-top:2px;font:500 12px/1.5 "Inter",sans-serif;color:rgba(255,255,255,.72);opacity:0;animation:mcReal 2.4s ease-out infinite}' +
      '@keyframes mcReal{0%,46%{opacity:0}64%,90%{opacity:1}100%{opacity:0}}' +
      '.mc-time{display:flex;gap:6px;margin-top:14px}' +
      '.mc-time span{font:500 9.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.4);border:1px solid rgba(255,255,255,.12);border-radius:99px;padding:6px 9px}' +
      '</style>' +
      '<div class="mc"><div class="mc-head"><div class="gl">' + esc(T1) + '</div><div class="micro">numbers, not vibes</div></div>' +
      '<div class="mc-cell"><div class="micro">Press 路 0.97 路 90 ms</div><span class="mc-btn">Copy prompt</span><div class="mc-time"><span>0</span><span>60</span><span>140</span><span>300 ms</span></div></div>' +
      '<div class="mc-cell"><div class="micro">Skeleton 鈫?content 路 240 ms</div><div class="mc-skel"><div class="mc-sk"></div><div class="mc-sk" style="width:78%"></div></div><div class="mc-real">Prompt body ready 路 2 342 chars</div></div>' +
      '<div class="mc-cell" style="grid-column:1/-1"><div class="micro">Toast 路 queue 路 self-dismiss 4 s</div><div class="mc-toast"><b>Copied to clipboard</b><span>prompt 路 re-03-gsap-timeline-recovery</span><i class="mc-prog"></i></div></div></div>';
  };

  /* ============ 20. PHASES 鈥?five timed passes ============ */
  S.phases = function () {
    const phases = [['EVIDENCE', '0鈥?'], ['TOKENS', '5鈥?'], ['BLUEPRINT', '9鈥?4'], ['CRAFT', '14鈥?4'], ['SELF-TEST', '24鈥?0']];
    const blocks = phases.map(function (p, i) {
      return '<div class="ph-block" style="animation-delay:' + (i * 0.34).toFixed(2) + 's"><b>' + p[0] + '</b><span>' + p[1] + ' min</span></div>';
    }).join('');
    return '<style>' +
      '.ph{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:20px}' +
      '.ph-head{display:flex;justify-content:space-between;align-items:flex-end}' +
      '.ph-head .gl{font:800 54px/1 "Inter",sans-serif;letter-spacing:-.05em}' +
      '.ph-strip{display:flex;gap:8px}' +
      '.ph-block{flex:1;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.035);padding:16px 16px 18px;position:relative;overflow:hidden;animation:phGlow 2.4s ease-in-out infinite}' +
      '.ph-block b{display:block;font:600 11px/1 "JetBrains Mono",monospace;letter-spacing:.14em;color:#fff}' +
      '.ph-block span{display:block;margin-top:9px;font:500 9.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.4)}' +
      '.ph-block:after{content:"";position:absolute;left:0;bottom:0;height:2px;background:linear-gradient(90deg,' + C3 + ',' + C1 + ');animation:phBar 2.4s ease-in-out infinite}' +
      '@keyframes phGlow{0%,100%{border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.035)}12%,30%{border-color:color-mix(in srgb,var(--c3) 62%,transparent);background:color-mix(in srgb,var(--c3) 10%,transparent)}}' +
      '@keyframes phBar{0%,100%{width:0}20%,100%{width:100%}100%{width:0}}' +
      '.ph-body{flex:1;display:grid;grid-template-columns:1.25fr .75fr;gap:16px}' +
      '.ph-hero{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.11);background:linear-gradient(160deg,#0c1018,#090c12);padding:30px 34px;overflow:hidden}' +
      '.ph-hero:before{content:"";position:absolute;right:-80px;top:-80px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c1) 55%,transparent),transparent 65%);filter:blur(18px);animation:breathe 2.4s ease-in-out infinite}' +
      '.ph-eye{font:500 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.2em;color:color-mix(in srgb,var(--c3) 76%,#fff)}' +
      '.ph-h{font:800 42px/1.02 "Inter",sans-serif;letter-spacing:-.045em;margin-top:16px;max-width:380px}' +
      '.ph-sub{margin-top:14px;height:7px;width:64%;border-radius:4px;background:rgba(255,255,255,.2)}' +
      '.ph-btns{display:flex;gap:9px;margin-top:20px}' +
      '.ph-btns i{width:92px;height:30px;border-radius:99px;background:#f2f4f8}' +
      '.ph-btns i+i{background:transparent;border:1px solid rgba(255,255,255,.22)}' +
      '.ph-side{display:flex;flex-direction:column;gap:12px}' +
      '.ph-card{flex:1;border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.7);padding:18px;display:flex;flex-direction:column;justify-content:center;gap:10px}' +
      '.ph-clock{width:92px;height:92px;border-radius:50%;border:2px solid rgba(255,255,255,.14);position:relative;align-self:center}' +
      '.ph-clock:before{content:"";position:absolute;left:50%;top:50%;width:2px;height:32px;background:' + C4 + ';transform-origin:top;transform:translate(-50%,0) rotate(130deg);box-shadow:0 0 14px ' + C4 + '}' +
      '.ph-clock:after{content:"";position:absolute;inset:10px;border-radius:50%;border:1px dashed rgba(255,255,255,.2)}' +
      '.ph-kv{font:500 10px/1.7 "JetBrains Mono",monospace;color:rgba(255,255,255,.45)}' +
      '.ph-kv b{color:#fff;font-weight:500}' +
      '</style>' +
      '<div class="ph"><div class="ph-head"><div class="gl">' + esc(T1) + '</div><div class="micro">timeboxed 路 stop at the biggest difference</div></div>' +
      '<div class="ph-strip">' + blocks + '</div>' +
      '<div class="ph-body"><div class="ph-hero"><div class="ph-eye">SAME HERO 路 THREE WIDTHS</div><div class="ph-h">A hero that is 95% right beats a perfect header</div><div class="ph-sub"></div><div class="ph-btns"><i></i><i></i></div></div>' +
      '<div class="ph-side"><div class="ph-card"><div class="ph-clock"></div><div class="ph-kv"><b>28 min</b> elapsed</div></div>' +
      '<div class="ph-card"><div class="ph-kv">state parity <b>鉁?/b><br>token purity <b>鉁?/b><br>headline breaks <b>鉁?/b><br>unverified <b>2 listed</b></div></div></div></div></div>';
  };

  /* ============ 21. FILMSTRIP 鈥?capture evidence strip ============ */
  S.filmstrip = function () {
    const frames = ['0', '120', '240', '480', '720', '1000', '1500', '2000'].map(function (t, i) {
      return '<div class="fs-frame" style="animation-delay:' + (i * 0.12).toFixed(2) + 's"><i style="opacity:' + (0.25 + i * 0.09).toFixed(2) + '"></i><span>' + t + ' ms</span></div>';
    }).join('');
    const ev = [['computed styles', 'observed'], ['intro duration', 'observed'], ['hover after media', 'inferred'], ['shadow token', 'unknown']].map(function (e, i) {
      return '<div class="fs-ev"><span>' + e[0] + '</span><b class="' + e[1] + '">' + e[1].toUpperCase() + '</b></div>';
    }).join('');
    return '<style>' +
      '.fs{position:absolute;inset:76px 70px 66px;display:flex;flex-direction:column;gap:18px}' +
      '.fs-head{display:flex;justify-content:space-between;align-items:baseline}' +
      '.fs-head .gl{font:800 44px/1 "Inter",sans-serif;letter-spacing:-.045em}' +
      '.fs-strip{display:grid;grid-template-columns:repeat(8,1fr);gap:9px;flex:1;min-height:0}' +
      '.fs-frame{border-radius:10px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(160deg,#0f131b,#0a0d13);padding:8px;display:flex;flex-direction:column;gap:8px;animation:fsPulse 2.4s ease-in-out infinite}' +
      '.fs-frame i{flex:1;border-radius:5px;background:linear-gradient(150deg,' + C1 + ',' + C2 + ');mix-blend-mode:screen}' +
      '.fs-frame span{font:500 9px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.45);text-align:center}' +
      '@keyframes fsPulse{0%,100%{border-color:rgba(255,255,255,.12);transform:translateY(0)}14%,34%{border-color:color-mix(in srgb,var(--c3) 60%,transparent);transform:translateY(-6px)}}' +
      '.fs-ruler{display:flex;justify-content:space-between;padding:0 4px;position:relative}' +
      '.fs-ruler:before{content:"";position:absolute;left:4px;right:4px;top:5px;height:1px;background:rgba(255,255,255,.14)}' +
      '.fs-ruler span{font:500 9px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.34)}' +
      '.fs-bottom{display:grid;grid-template-columns:1fr 1fr;gap:14px}' +
      '.fs-panel{border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(10,13,19,.68);padding:18px}' +
      '.fs-ev{display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid rgba(255,255,255,.06);font:500 10.5px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.55)}' +
      '.fs-ev b{font-weight:500}' +
      '.fs-ev b.observed{color:#7ff0c4}' +
      '.fs-ev b.inferred{color:#ffd39b}' +
      '.fs-ev b.unknown{color:rgba(255,255,255,.35)}' +
      '.fs-run{display:flex;gap:8px;align-items:center;flex-wrap:wrap}' +
      '.fs-run .pill{font-size:11px}' +
      '</style>' +
      '<div class="fs"><div class="fs-head"><div class="gl">' + esc(T1) + '</div><div class="micro">scenario 路 2 runs 路 diff &lt; 1%</div></div>' +
      '<div class="fs-strip">' + frames + '</div><div class="fs-ruler"><span>0</span><span>500</span><span>1000</span><span>1500</span><span>2000 ms</span></div>' +
      '<div class="fs-bottom"><div class="fs-panel"><div class="micro" style="margin-bottom:8px">Evidence ledger</div>' + ev + '</div>' +
      '<div class="fs-panel"><div class="micro" style="margin-bottom:12px">Capture scenario</div><div class="fs-run"><span class="pill">goto</span><span class="pill">wait_for ready</span><span class="pill">hover</span><span class="pill">scroll_to</span><span class="pill">screenshot 脳8</span></div>' +
      '<div class="micro" style="margin-top:14px;color:rgba(255,255,255,.3)">1440脳900 路 390脳844 路 reduced-motion</div></div></div></div>';
  };

  /* ============ 22. MARQUEE 鈥?seamless infinite bands ============ */
  S.marquee = function () {
    const line = 'INFINITE MARQUEE 路 NO SEAM 路 DUPLICATE THE TRACK 路 ';
    const band = function (size, dir, delay, color) {
      const txt = (line + line).repeat(2);
      return '<div class="mq-band" style="animation-direction:' + dir + ';animation-delay:' + delay + 's"><span style="font-size:' + size + 'px;color:' + color + '">' + txt + '</span></div>';
    };
    return '<style>' +
      '.mq{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:10px;overflow:hidden}' +
      '.mq:before{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 50%,color-mix(in srgb,var(--c1) 16%,transparent),transparent 70%)}' +
      '.mq-band{white-space:nowrap;display:flex;animation:mqRun 2.4s linear infinite;will-change:transform}' +
      '.mq-band span{font-family:"Inter",sans-serif;font-weight:800;letter-spacing:-.04em;line-height:1.05;padding-right:40px}' +
      '@keyframes mqRun{to{transform:translateX(-50%)}}' +
      '.mq-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:5;text-align:center;padding:24px 34px;border-radius:16px;border:1px solid rgba(255,255,255,.18);background:rgba(8,10,14,.78);backdrop-filter:blur(14px);box-shadow:0 30px 70px rgba(0,0,0,.6)}' +
      '.mq-center .gl{font:800 34px/1 "Inter",sans-serif;letter-spacing:-.04em}' +
      '.mq-center .micro{margin-top:10px}' +
      '.mq-tag{position:absolute;left:50%;bottom:40px;transform:translateX(-50%);display:flex;gap:8px;z-index:5}' +
      '</style>' +
      '<div class="mq">' +
      band(72, 'normal', 0, 'rgba(255,255,255,.10)') +
      band(92, 'reverse', 0, C3) +
      band(64, 'normal', 0, 'rgba(255,255,255,.14)') +
      band(110, 'reverse', 0, C1) +
      '<div class="mq-center"><div class="gl">' + esc(T1) + '</div><div class="micro">two copies 路 translateX 鈭?0% 路 linear</div></div>' +
      '<div class="mq-tag"><span class="pill">pause on hover</span><span class="pill">duplicate children</span><span class="pill">reduced motion 鈫?static</span></div></div>';
  };

  /* ============ 23. TEXTFX 鈥?kinetic / decrypt ============ */
  S.textfx = function () {
    const scramble = VARIANT === 'scramble';
    const word = T1.replace(/[^A-Z ]/g, '');
    const chars = (scramble ? 'DECRYPT' : word).split('').map(function (ch, i) {
      if (ch === ' ') return '<span class="tf-sp"></span>';
      if (scramble) {
        return '<span class="tf-ch tf-scr" style="animation-delay:' + (i * 0.06).toFixed(2) + 's" data-a="' + '!<>-_\\/[]{}鈥?+*^?#'.charAt(i % 19) + '">' + esc(ch) + '</span>';
      }
      return '<span class="tf-ch" style="animation-delay:' + (i * 0.05).toFixed(2) + 's">' + esc(ch) + '</span>';
    }).join('');
    return '<style>' +
      '.tf{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 74px;overflow:hidden}' +
      '.tf-word{font:800 128px/1 "Inter",sans-serif;letter-spacing:-.06em;display:flex;flex-wrap:wrap}' +
      '.tf-ch{display:inline-block;background:linear-gradient(180deg,#fff,color-mix(in srgb,var(--c3) 55%,#fff));-webkit-background-clip:text;background-clip:text;color:transparent;animation:tfK 2.4s cubic-bezier(.16,1,.3,1) infinite}' +
      '@keyframes tfK{0%{transform:translateY(60%) rotate(4deg);opacity:0}22%,74%{transform:translateY(0) rotate(0);opacity:1}90%,100%{transform:translateY(-40%);opacity:0}}' +
      '.tf-scr{background:none;color:#fff;position:relative;animation:tfScr 2.4s steps(1,end) infinite}' +
      '.tf-scr:after{content:attr(data-a);position:absolute;left:0;top:0;color:color-mix(in srgb,var(--c4) 85%,#fff);animation:tfScrA 2.4s steps(1,end) infinite}' +
      '@keyframes tfScr{0%{opacity:.2}30%{opacity:1}60%{opacity:.4}100%{opacity:1}}' +
      '@keyframes tfScrA{0%{opacity:1}15%{opacity:0}40%{opacity:1}55%{opacity:0}80%{opacity:1}100%{opacity:0}}' +
      '.tf-sp{width:.28em}' +
      '.tf-sub{display:flex;gap:8px;margin-top:34px}' +
      '.tf-line{margin-top:26px;display:flex;align-items:center;gap:12px;font:500 10.5px/1 "JetBrains Mono",monospace;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.42)}' +
      '.tf-line b{width:52px;height:1px;background:color-mix(in srgb,var(--c3) 70%,transparent)}' +
      '</style>' +
      '<div class="tf"><div class="tf-line"><b></b>' + (scramble ? 'per-glyph 路 random pool 路 30 fps' : 'variable font 路 weight + scale per char') + '</div>' +
      '<div class="tf-word">' + chars + '</div>' +
      '<div class="tf-sub">' + (scramble
        ? '<span class="pill">stagger 60 ms</span><span class="pill">opacity steps</span><span class="pill">sr-only real text</span>'
        : '<span class="pill">split by char</span><span class="pill">stagger 50 ms</span><span class="pill">clip + transform</span>') + '</div></div>';
  };

  /* ============ 24. SHADER 鈥?mesh / raymarch / distortion ============ */
  S.shader = function () {
    const v = VARIANT || 'liquid';
    const mesh = v === 'mesh';
    const warp = v === 'warp';
    return '<style>' +
      '.sh{position:absolute;inset:0;overflow:hidden;background:#05060b}' +
      '.sh-blob{position:absolute;border-radius:50%;filter:blur(46px);mix-blend-mode:screen;animation:drift 2.4s ease-in-out infinite}' +
      '.sh-b1{width:560px;height:560px;left:-6%;top:6%;background:radial-gradient(circle at 30% 30%,' + C1 + ',transparent 62%);opacity:.7}' +
      '.sh-b2{width:640px;height:640px;right:-10%;top:-6%;background:radial-gradient(circle at 60% 40%,' + C2 + ',transparent 60%);opacity:.6;animation-delay:.5s}' +
      '.sh-b3{width:520px;height:520px;left:26%;bottom:-18%;background:radial-gradient(circle at 40% 40%,' + C3 + ',transparent 62%);opacity:.5;animation-delay:1s}' +
      '.sh-b4{width:380px;height:380px;right:22%;bottom:6%;background:radial-gradient(circle at 50% 50%,' + C4 + ',transparent 60%);opacity:.34;animation-delay:.8s}' +
      '.sh-mesh{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:52px 52px;mask-image:radial-gradient(80% 70% at 50% 50%,#000,transparent 85%);opacity:' + (mesh ? '.9' : '.18') + '}' +
      '.sh-warp{position:absolute;left:14%;top:18%;width:72%;height:64%;border-radius:24px;background:linear-gradient(140deg,' + C1 + ',' + C2 + ' 50%,' + C3 + ');filter:saturate(1.2);' + (warp ? 'transform:skewY(-3deg)' : 'opacity:.35') + '}' +
      (warp ? '.sh-slice{position:absolute;left:14%;width:72%;height:6px;background:rgba(255,255,255,.35);filter:blur(1px);animation:shSlice 2.4s ease-in-out infinite}' : '') +
      '.sh-ring{position:absolute;left:50%;top:50%;width:520px;height:520px;margin:-260px 0 0 -260px;border-radius:50%;border:1px solid rgba(255,255,255,.16);animation:spin 18s linear infinite}' +
      '.sh-ring:after{content:"";position:absolute;left:50%;top:-3px;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 20px #fff}' +
      '.sh-ring.r2{width:360px;height:360px;margin:-180px 0 0 -180px;animation-duration:11s;animation-direction:reverse;border-style:dashed;opacity:.6}' +
      '.sh-label{position:absolute;left:70px;bottom:64px;z-index:5}' +
      '.sh-label .gl{font:800 76px/.94 "Inter",sans-serif;letter-spacing:-.055em;text-shadow:0 10px 40px rgba(0,0,0,.6)}' +
      '.sh-label .micro{margin-top:14px;color:rgba(255,255,255,.55)}' +
      '.sh-meta{position:absolute;right:70px;bottom:64px;z-index:5;text-align:right;font:500 10px/1.9 "JetBrains Mono",monospace;color:rgba(255,255,255,.45)}' +
      '.sh-scan{position:absolute;left:0;right:0;height:120px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.06),transparent);animation:scanY 2.4s linear infinite}' +
      '@keyframes shSlice{0%,100%{top:30%;opacity:.1}50%{top:62%;opacity:.5}}' +
      '</style>' +
      '<div class="sh"><div class="sh-blob sh-b1"></div><div class="sh-blob sh-b2"></div><div class="sh-blob sh-b3"></div><div class="sh-blob sh-b4"></div>' +
      (warp ? '<div class="sh-warp"></div><div class="sh-slice"></div><div class="sh-slice" style="animation-delay:.6s"></div>' : (mesh ? '' : '<div class="sh-warp"></div>')) +
      '<div class="sh-mesh"></div><div class="sh-ring"></div><div class="sh-ring r2"></div><div class="sh-scan"></div>' +
      '<div class="sh-label"><div class="gl">' + esc(T1) + '</div><div class="micro">' + (mesh ? 'feTurbulence 路 grain 0.05 路 2k tile' : warp ? 'displacement 路 hover 路 lerp 0.08' : 'raymarch 64 steps 路 fresnel rim') + '</div></div>' +
      '<div class="sh-meta">' + (mesh ? 'svg filter 路 no GPU cost<br>tile 256 px 路 opacity .06' : warp ? 'canvas 2d 路 1 texture<br>pointer 鈫?uv offset' : 'dpr 鈮?1.5 路 half res mobile<br>pause offscreen') + '</div></div>';
  };

  /* ============ 25. TRANSITION 鈥?curtain / view morph ============ */
  S.transition = function () {
    const morph = VARIANT === 'morph';
    if (morph) {
      return '<style>' +
        '.tr{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:center}' +
        '.tr-card{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.16);background:linear-gradient(150deg,color-mix(in srgb,var(--c1) 55%,#0d1118),color-mix(in srgb,var(--c2) 35%,#0d1118));padding:24px;box-shadow:0 30px 60px rgba(0,0,0,.5);animation:trCard 2.4s ease-in-out infinite}' +
        '.tr-card .micro{color:rgba(255,255,255,.75)}' +
        '.tr-gl{font:700 26px/1.1 "Inter",sans-serif;letter-spacing:-.03em;margin-top:12px}' +
        '.tr-page{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(170deg,#0d1118,#080b10);padding:24px;box-shadow:0 30px 60px rgba(0,0,0,.5);animation:trPage 2.4s ease-in-out infinite}' +
        '.tr-page .hero{height:110px;border-radius:10px;background:linear-gradient(140deg,color-mix(in srgb,var(--c1) 60%,#0b0e15),color-mix(in srgb,var(--c2) 45%,#0b0e15));margin-top:14px}' +
        '.tr-page .l{height:8px;border-radius:4px;background:rgba(255,255,255,.22);margin-top:12px;width:74%}' +
        '.tr-page .l.s{width:48%;background:rgba(255,255,255,.12)}' +
        '.tr-code{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:6;font:500 10px/1.7 "JetBrains Mono",monospace;color:rgba(255,255,255,.6);background:rgba(8,10,14,.8);border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:10px 14px;backdrop-filter:blur(8px)}' +
        '@keyframes trCard{0%,100%{transform:scale(1) rotate(-1deg);opacity:1}38%,68%{transform:scale(.62) rotate(0);opacity:.35}88%,100%{transform:scale(1) rotate(-1deg);opacity:1}}' +
        '@keyframes trPage{0%,38%{transform:scale(.96);opacity:.2}68%,100%{transform:scale(1);opacity:1}}' +
        '</style>' +
        '<div class="tr"><div class="tr-card"><div class="micro">thumbnail 路 card</div><div class="tr-gl">' + esc(T1) + '</div></div>' +
        '<div class="tr-page"><div class="micro">detail 路 page</div><div class="hero"></div><div class="l"></div><div class="l s"></div></div>' +
        '<div class="tr-code">document.startViewTransition(() =&gt; render())</div></div>';
    }
    const panels = [0, 1, 2, 3, 4].map(function (i) {
      return '<i class="tr-panel" style="left:' + (i * 20) + '%;animation-delay:' + (i * 0.07).toFixed(2) + 's;background:linear-gradient(180deg,' + (i % 2 ? C2 : C1) + ',' + (i % 3 ? C1 : C2) + ')"></i>';
    }).join('');
    return '<style>' +
      '.tr{position:absolute;inset:0;overflow:hidden}' +
      '.tr-panel{position:absolute;top:0;width:20.4%;height:100%;animation:trCurtain 2.4s cubic-bezier(.76,0,.24,1) infinite;transform-origin:top}' +
      '@keyframes trCurtain{0%,6%{transform:scaleY(1)}52%,88%{transform:scaleY(0)}100%{transform:scaleY(1)}}' +
      '.tr-page{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 120px;background:#080a0f;z-index:-1;opacity:' + '.9' + '}' +
      '.tr-page .micro{color:' + C3 + '}' +
      '.tr-gl{font:800 84px/.95 "Inter",sans-serif;letter-spacing:-.055em;margin-top:18px}' +
      '.tr-gl em{font-style:normal;color:color-mix(in srgb,' + C3 + ' 85%,#fff)}' +
      '.tr-lines{display:flex;gap:10px;margin-top:26px}' +
      '.tr-lines i{width:150px;height:8px;border-radius:4px;background:rgba(255,255,255,.2)}' +
      '.tr-tag{position:absolute;right:70px;top:34px;z-index:5;display:flex;gap:8px}' +
      '</style>' +
      '<div class="tr"><div class="tr-page"><div class="micro">next page 路 revealed</div><div class="tr-gl">' + esc(T1) + '<br><em>reveal</em></div><div class="tr-lines"><i></i><i></i><i></i></div></div>' +
      panels + '<div class="tr-tag"><span class="pill">stagger 70 ms</span><span class="pill">clip or scaleY</span><span class="pill">scroll reset</span></div></div>';
  };

  /* ============ 26. BENTO 鈥?frosted bento grid ============ */
  S.bento = function () {
    return '<style>' +
      '.bn{position:absolute;inset:76px 70px 66px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,1fr);gap:14px}' +
      '.bn-tile{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,.14);background:linear-gradient(150deg,rgba(255,255,255,.09),rgba(255,255,255,.02));backdrop-filter:blur(14px) saturate(1.3);-webkit-backdrop-filter:blur(14px) saturate(1.3);padding:18px;overflow:hidden;animation:bnGlow 2.4s ease-in-out infinite}' +
      '.bn-tile:before{content:"";position:absolute;right:-40px;bottom:-40px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c1) 55%,transparent),transparent 65%);filter:blur(20px);opacity:.55}' +
      '.bn-big{grid-column:span 2;grid-row:span 2}' +
      '@keyframes bnGlow{0%,100%{border-color:rgba(255,255,255,.14)}12%,28%{border-color:color-mix(in srgb,var(--c3) 52%,transparent)}}' +
      '.bn-gl{font:700 24px/1.08 "Inter",sans-serif;letter-spacing:-.03em;position:relative}' +
      '.bn-big .bn-gl{font-size:40px;max-width:420px}' +
      '.bn-micro{font:500 9.5px/1.6 "JetBrains Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5);position:relative}' +
      '.bn-bars{display:flex;gap:5px;align-items:flex-end;height:58px;margin-top:18px;position:relative}' +
      '.bn-bars i{flex:1;border-radius:3px;background:linear-gradient(180deg,' + C3 + ',' + C1 + ');animation:pulse 2.4s ease-in-out infinite}' +
      '.bn-row{display:flex;align-items:center;gap:8px;margin-top:14px;position:relative}' +
      '.bn-av{width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(8,10,14,.8);background:linear-gradient(140deg,' + C1 + ',' + C2 + ')}' +
      '.bn-av:nth-child(2){background:linear-gradient(140deg,' + C2 + ',' + C3 + ')}' +
      '.bn-av:nth-child(3){background:linear-gradient(140deg,' + C3 + ',' + C4 + ')}' +
      '.bn-av:nth-child(4){background:linear-gradient(140deg,' + C4 + ',' + C1 + ')}' +
      '.bn-kpi{font:800 34px/1 "Inter",sans-serif;letter-spacing:-.04em;margin-top:6px;position:relative}' +
      '.bn-ring{width:54px;height:54px;border-radius:50%;border:3px solid rgba(255,255,255,.14);border-top-color:' + C3 + ';animation:spin 2.4s linear infinite;margin-top:10px;position:relative}' +
      '</style>' +
      '<div class="bn">' +
      '<div class="bn-tile bn-big"><div class="bn-micro">' + esc(T1) + '</div><div class="bn-gl" style="margin-top:12px">Frosted tiles,<br>one light model</div><div class="bn-bars">' +
      [34, 58, 46, 72, 52, 88, 62, 78, 44, 68].map(function (h, i) { return '<i style="height:' + h + '%;animation-delay:' + (i * 0.1).toFixed(2) + 's"></i>'; }).join('') + '</div></div>' +
      '<div class="bn-tile"><div class="bn-micro">Active users</div><div class="bn-kpi">84.2k</div><div class="bn-row"><span class="bn-av"></span><span class="bn-av"></span><span class="bn-av"></span><span class="bn-av"></span></div></div>' +
      '<div class="bn-tile"><div class="bn-micro">Latency</div><div class="bn-kpi">16.7<span style="font-size:14px;color:rgba(255,255,255,.5)"> ms</span></div><div class="bn-ring"></div></div>' +
      '<div class="bn-tile"><div class="bn-micro">Surface</div><div class="bn-gl" style="font-size:18px;margin-top:10px">glass 16 / 135%</div></div>' +
      '<div class="bn-tile"><div class="bn-micro">Contrast</div><div class="bn-kpi">4.5:1</div><div class="bn-micro" style="margin-top:8px">verified on media</div></div>' +
      '<div class="bn-tile"><div class="bn-micro">Tokens</div><div class="bn-gl" style="font-size:18px;margin-top:10px">0 raw hex</div></div></div>';
  };

  /* ============ 27. GALLERY 鈥?horizontal scroll gallery ============ */
  S.gallery = function () {
    const cards = [0, 1, 2, 3, 4].map(function (i) {
      return '<div class="gl-card" style="--i:' + i + '"><div class="gl-img" style="background:linear-gradient(150deg,' + (i % 2 ? C2 : C1) + ',' + (i % 3 ? C3 : C4) + ')"></div><div class="gl-line"></div><div class="gl-line s"></div></div>';
    }).join('');
    return '<style>' +
      '.gl{position:absolute;inset:76px 0 66px;display:flex;flex-direction:column;justify-content:center;gap:20px;overflow:hidden}' +
      '.gl-head{display:flex;justify-content:space-between;align-items:baseline;padding:0 74px}' +
      '.gl-head .gl-t{font:800 48px/1 "Inter",sans-serif;letter-spacing:-.05em}' +
      '.gl-track{display:flex;gap:18px;padding-left:74px;animation:glRun 2.4s cubic-bezier(.76,0,.24,1) infinite}' +
      '@keyframes glRun{0%,8%{transform:translateX(0)}58%,88%{transform:translateX(-980px)}100%{transform:translateX(0)}}' +
      '.gl-card{width:250px;height:340px;flex:none;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);padding:12px;display:flex;flex-direction:column;gap:9px}' +
      '.gl-card:nth-child(2n){transform:translateY(26px)}' +
      '.gl-img{flex:1;border-radius:9px;opacity:.9}' +
      '.gl-line{height:7px;border-radius:4px;background:rgba(255,255,255,.32);width:82%}' +
      '.gl-line.s{width:52%;background:rgba(255,255,255,.14)}' +
      '.gl-prog{margin:0 74px;height:2px;border-radius:99px;background:rgba(255,255,255,.1);position:relative;overflow:hidden}' +
      '.gl-prog i{position:absolute;inset:0;width:38%;border-radius:99px;background:linear-gradient(90deg,' + C1 + ',' + C3 + ');animation:glProg 2.4s ease-in-out infinite}' +
      '@keyframes glProg{0%{width:0}58%,88%{width:70%}100%{width:0}}' +
      '.gl-cap{padding:0 74px;display:flex;justify-content:space-between;font:500 10px/1 "JetBrains Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.4)}' +
      '</style>' +
      '<div class="gl"><div class="gl-head"><div class="gl-t">' + esc(T1) + '</div><div class="micro">scrollY 鈫?translateX</div></div>' +
      '<div class="gl-track">' + cards + '</div><div class="gl-prog"><i></i></div><div class="gl-cap"><span>0 / 3200 px</span><span>' + esc(T1) + ' 路 5 frames</span><span>lerp 0.1</span></div></div>';
  };

  /* ============ 28. TILT 鈥?cursor reactive tilt card ============ */
  S.tilt = function () {
    return '<style>' +
      '.tl2{position:absolute;inset:76px 70px 66px;display:flex;align-items:center;justify-content:center;perspective:1200px}' +
      '.tl2-stage{position:relative;width:600px;height:380px;transform-style:preserve-3d;animation:tl2Tilt 2.4s ease-in-out infinite}' +
      '.tl2-card{position:absolute;inset:0;border-radius:20px;border:1px solid rgba(255,255,255,.2);background:linear-gradient(155deg,color-mix(in srgb,' + C1 + ' 50%,#10141c),color-mix(in srgb,' + C2 + ' 40%,#10141c));box-shadow:0 50px 100px rgba(0,0,0,.6);overflow:hidden;padding:34px}' +
      '.tl2-card:before{content:"";position:absolute;inset:0;background:radial-gradient(60% 60% at 30% 20%,rgba(255,255,255,.35),transparent 60%)}' +
      '.tl2-card:after{content:"";position:absolute;width:70%;height:140%;left:-30%;top:-20%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.42),transparent);animation:tl2Glare 2.4s ease-in-out infinite}' +
      '.tl2-card .micro{color:rgba(255,255,255,.8);position:relative}' +
      '.tl2-gl{font:800 46px/.98 "Inter",sans-serif;letter-spacing:-.05em;margin-top:18px;position:relative;max-width:420px}' +
      '.tl2-badges{display:flex;gap:8px;margin-top:22px;position:relative}' +
      '.tl2-badge{border:1px solid rgba(255,255,255,.28);border-radius:99px;padding:7px 12px;font:500 10px/1 "JetBrains Mono",monospace;color:rgba(255,255,255,.85)}' +
      '.tl2-hud{position:absolute;right:-40px;bottom:-30px;transform:translateZ(80px);display:flex;flex-direction:column;gap:6px;font:500 10px/1.4 "JetBrains Mono",monospace;color:rgba(255,255,255,.55);background:rgba(8,10,14,.82);border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:12px 14px;backdrop-filter:blur(8px)}' +
      '.tl2-hud b{color:#fff;font-weight:500}' +
      '.tl2-cursor{position:absolute;left:58%;top:30%;z-index:9;filter:drop-shadow(0 6px 14px rgba(0,0,0,.7));animation:tl2Cur 2.4s ease-in-out infinite}' +
      '@keyframes tl2Tilt{0%,100%{transform:rotateY(-14deg) rotateX(8deg)}50%{transform:rotateY(12deg) rotateX(-7deg)}}' +
      '@keyframes tl2Glare{0%{transform:translateX(-40%) rotate(16deg)}60%,100%{transform:translateX(220%) rotate(16deg)}}' +
      '@keyframes tl2Cur{0%,100%{transform:translate(0,0)}50%{transform:translate(-120px,80px)}}' +
      '</style>' +
      '<div class="tl2"><div class="tl2-stage"><div class="tl2-card"><div class="micro">' + esc(T1) + '</div><div class="tl2-gl">pointer-driven depth,<br>clamped and damped</div>' +
      '<div class="tl2-badges"><span class="tl2-badge">max 14掳</span><span class="tl2-badge">lerp 0.08</span><span class="tl2-badge">glare follows</span></div></div>' +
      '<div class="tl2-hud"><span>rotateX <b>8掳</b></span><span>rotateY <b>鈭?4掳</b></span><span>perspective <b>1200</b></span></div>' +
      '<div class="tl2-cursor"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M5 3l14 8-6 1.5L10 19z"/></svg></div></div></div>';
  };

  /* ============ 29. TRAIL 鈥?velocity image trail ============ */
  S.trail = function () {
    const items = [0, 1, 2, 3, 4, 5].map(function (i) {
      return '<div class="tr2-item" style="animation-delay:' + (i * 0.05).toFixed(2) + 's;width:' + (150 - i * 12) + 'px;height:' + (190 - i * 14) + 'px;background:linear-gradient(150deg,' + (i % 3 === 0 ? C1 : i % 3 === 1 ? C2 : C3) + ',' + C4 + ');opacity:' + (1 - i * 0.13).toFixed(2) + '"></div>';
    }).join('');
    return '<style>' +
      '.tr2{position:absolute;inset:0;overflow:hidden;background:radial-gradient(70% 70% at 60% 40%,color-mix(in srgb,' + C1 + ' 14%,#06070b),#06070b 70%)}' +
      '.tr2-item{position:absolute;left:14%;top:26%;border-radius:12px;border:1px solid rgba(255,255,255,.22);offset-path:path("M0,0 C260,40 420,220 700,120 C860,60 900,300 1000,260");offset-distance:0%;animation:tr2Run 2.4s cubic-bezier(.4,0,.2,1) infinite;box-shadow:0 24px 50px rgba(0,0,0,.5)}' +
      '@keyframes tr2Run{0%{offset-distance:0%;opacity:0}8%{opacity:1}55%,100%{offset-distance:100%;opacity:0}}' +
      '.tr2-title{position:absolute;left:74px;bottom:64px;z-index:6}' +
      '.tr2-title .gl{font:800 64px/.96 "Inter",sans-serif;letter-spacing:-.055em}' +
      '.tr2-title .micro{margin-top:12px}' +
      '.tr2-cursor{position:absolute;left:14%;top:26%;z-index:5;animation:tr2Cur 2.4s cubic-bezier(.4,0,.2,1) infinite}' +
      '@keyframes tr2Cur{0%{transform:translate(0,0)}55%,100%{transform:translate(700px,120px)}}' +
      '.tr2-hud{position:absolute;right:70px;top:34px;text-align:right;font:500 10px/1.7 "JetBrains Mono",monospace;color:rgba(255,255,255,.42)}' +
      '</style>' +
      '<div class="tr2">' + items + '<div class="tr2-cursor"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M5 3l14 8-6 1.5L10 19z"/></svg></div>' +
      '<div class="tr2-title"><div class="gl">' + esc(T1) + '</div><div class="micro">6 trail nodes 路 50 ms apart 路 velocity clamped</div></div>' +
      '<div class="tr2-hud">pointer 鈫?path<br>node count 6<br>reduced motion 鈫?1</div></div>';
  };

  var stage = document.getElementById('stage');
  var content = document.getElementById('content');
  content.style.cssText = '--c1:' + C1 + ';--c2:' + C2 + ';--c3:' + C3 + ';--c4:' + C4;
  var fn = S[STYLE] || S.teardown;
  content.innerHTML = fn();

  // Deterministic capture hook: pause everything, then seek to an absolute time.
  window.__seek = function (ms) {
    var anims = document.getAnimations ? document.getAnimations() : [];
    for (var i = 0; i < anims.length; i++) {
      try { anims[i].pause(); anims[i].currentTime = ms; } catch (e) { /* noop */ }
    }
  };
  window.__ready = function () {
    return !document.querySelector('img');
  };
})();
