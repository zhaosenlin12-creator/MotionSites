const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const ROOT = 'C:/kaifa_boot/motionsites_assets';
fs.mkdirSync(ROOT, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'previews'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'thumbnails'), { recursive: true });

function safeName(s) {
  return s.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 80);
}

function download(u, dest, tries = 3) {
  return new Promise((resolve, reject) => {
    const x = new URL(u);
    const lib = x.protocol === 'http:' ? http : https;
    const req = lib.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return download(new URL(r.headers.location, u).toString(), dest, tries).then(resolve, reject);
      }
      if (r.statusCode !== 200) {
        if (tries > 0) return setTimeout(() => download(u, dest, tries - 1).then(resolve, reject), 800);
        return reject(new Error('status ' + r.statusCode));
      }
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => {
        try { fs.writeFileSync(dest, Buffer.concat(chunks)); resolve(dest); }
        catch (e) { reject(e); }
      });
      r.on('error', e => { if (tries > 0) setTimeout(() => download(u, dest, tries - 1).then(resolve, reject), 800); else reject(e); });
    });
    req.on('error', e => { if (tries > 0) setTimeout(() => download(u, dest, tries - 1).then(resolve, reject), 800); else reject(e); });
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

(async () => {
  const prompts = JSON.parse(fs.readFileSync('C:/kaifa_boot/ms_prompts.json', 'utf8'));
  const tasks = [];
  for (const p of prompts) {
    if (p.video_preview_url) tasks.push({ slug: p.id, url: p.video_preview_url, kind: 'preview' });
    if (p.image_preview_url) tasks.push({ slug: p.id, url: p.image_preview_url, kind: 'thumbnail' });
  }
  console.log('total assets:', tasks.length);

  const done = new Set();
  const failed = [];
  const CONC = 8;
  let i = 0;
  const start = Date.now();

  async function worker() {
    while (i < tasks.length) {
      const idx = i++;
      const t = tasks[idx];
      const ext = '.webp';
      const dest = path.join(ROOT, t.kind + 's', safeName(t.slug) + (tasks.filter(x => x.slug === t.slug && x.kind === t.kind).length > 1 ? '_' + idx : '') + ext);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) {
        done.add(t.slug + ':' + t.kind);
        continue;
      }
      try {
        await download(t.url, dest);
        done.add(t.slug + ':' + t.kind);
      } catch (e) {
        failed.push({ ...t, err: e.message });
      }
      if (done.size % 20 === 0) console.log('progress', done.size, '/', tasks.length, 'failed', failed.length);
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  console.log('done in', ((Date.now() - start) / 1000).toFixed(1) + 's');
  console.log('downloaded', done.size, 'failed', failed.length);
  if (failed.length) console.log('first failures:', failed.slice(0, 5));
})();