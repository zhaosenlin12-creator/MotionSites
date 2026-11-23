// scripts/import-kenje-catalog.js — import the new MotionSites-family records from kenje24 (MIT).
//
// The repo publishes a generated manifest (src/data/prompts.generated.ts) whose rows carry a full
// prompt body plus a preview URL. Only rows that are not already here (by id, title or body) and
// that belong to the MotionSites family are imported; the repo's `HorizonX Library` and
// `21st.dev Registry` re-publications are excluded because their upstream licences are not ours
// to archive.
//
// Usage: node scripts/import-kenje-catalog.js [--write]
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PLAN = path.join(ROOT, '.work', 'kenje-plan.json');
const DL = path.join(ROOT, '.work', 'kenje-dl');
const PREVIEWS = path.join(ROOT, 'assets', 'previews');

const SOURCE = {
  id: 'kenje-rebirth-motionsites',
  repository: 'kenje24/rebirth-motionsitesprompt',
  url: 'https://github.com/kenje24/rebirth-motionsitesprompt',
  license: 'MIT',
  preview_notice: 'Preview media is downloaded from the URLs recorded in the repository manifest and converted to a 1280x800 webp cover; no upstream media is hotlinked at runtime.',
  usage: 'Additional MotionSites-family prompt bodies and previews; HorizonX and 21st.dev re-publications are excluded',
};

const CATEGORY = {
  'Landing Pages': 'Landing Page', SaaS: 'SaaS', Features: 'Features Section', CTA: 'CTA Section',
  Agency: 'Agency', Footers: 'Footer Section', Pricing: 'Pricing Page', 'Social Proof': 'Testimonials',
  'Superdesign Canvas': 'Components',
};
const TYPE = {
  landing: 'landing-page', hero: 'hero', footer: 'footer', pricing: 'pricing', features: 'section',
  cta: 'section', social: 'section', component: 'component', section: 'section',
};

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n', 'utf8');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

async function download(url, dest, attempt = 0) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: '*/*' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const type = res.headers.get('content-type') || '';
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1024) throw new Error('tiny ' + buf.length);
    if (buf.length > 25 * 1024 * 1024) throw new Error('too large');
    fs.writeFileSync(dest, buf);
    return { bytes: buf.length, type };
  } catch (e) {
    if (attempt < 3) { await new Promise((r) => setTimeout(r, 800 * (attempt + 1))); return download(url, dest, attempt + 1); }
    throw e;
  }
}

function cover(src, dest, isVideo) {
  if (isVideo) {
    const frame = path.join(DL, '_frame.png');
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', src, '-frames:v', '1', frame], { stdio: 'pipe' });
    execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), frame, dest], { stdio: 'pipe' });
    try { fs.unlinkSync(frame); } catch (e) {}
  } else {
    execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), src, dest], { stdio: 'pipe' });
  }
}

async function main() {
  const write = process.argv.includes('--write');
  const plan = readJson(PLAN).filter((p) => !/^\d+$/.test(p.title));
  const merged = readJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'));
  const prompts = readJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'));
  const have = new Set(merged.map((r) => r.id));
  const maxSort = merged.reduce((m, r) => Math.max(m, Number(r.sort_order) || 0), 0);

  console.log('plan', plan.length, '| already present', plan.filter((p) => have.has(p.id)).length);
  if (!write) { console.log('dry run; pass --write'); return; }

  fs.mkdirSync(DL, { recursive: true });
  fs.mkdirSync(PREVIEWS, { recursive: true });

  let imported = 0, bytes = 0;
  const failures = [];
  for (const p of plan) {
    if (have.has(p.id)) continue;
    const dest = path.join(PREVIEWS, p.id + '.webp');
    let kind = 'image';
    try {
      if (!fs.existsSync(dest)) {
        const url = p.media;
        const ext = (new URL(url).pathname.match(/\.([a-z0-9]{2,4})$/i) || [])[1] || '';
        const isVideo = ['mp4', 'webm', 'mov', 'm3u8'].includes(ext.toLowerCase());
        const src = path.join(DL, p.id + (ext ? '.' + ext : '.bin'));
        if (!fs.existsSync(src)) await download(url, src);
        cover(src, dest, isVideo);
      }
      const size = fs.statSync(dest).size;
      if (size < 2048) throw new Error('cover too small ' + size);
      bytes += size;
    } catch (e) {
      failures.push([p.id, String(e.message).slice(0, 80)]);
      continue;
    }
    const category = CATEGORY[p.category] || 'Landing Page';
    const type = TYPE[p.pageType] || (p.pageType === 'landing' ? 'landing-page' : 'section');
    merged.push({
      id: p.id,
      title: p.title,
      description: category + ' · ' + type,
      category,
      type,
      page_type: p.pageType || 'landing',
      is_free: true,
      source_kind: 'community',
      source_id: SOURCE.id,
      source_url: 'https://github.com/kenje24/rebirth-motionsitesprompt/blob/HEAD/' + p.folder + '/',
      source_repo: SOURCE.repository,
      source_license: SOURCE.license,
      local_rel: 'assets/previews/' + p.id + '.webp',
      local_kind: 'webp',
      sort_order: maxSort + 3 * imported + 1,
      tags: [category, type],
      community_slug: p.id,
    });
    prompts.push({ id: p.id, prompt_text: String(p.prompt).replace(/\r\n/g, '\n') });
    have.add(p.id);
    imported += 1;
    if (imported % 20 === 0) console.log('imported', imported, '/', plan.length);
  }

  writeJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'), merged);
  writeJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'), prompts);

  const srcPath = path.join(ROOT, 'data', 'catalog_sources.json');
  const sources = readJson(srcPath);
  if (!sources.some((s) => s.id === SOURCE.id)) { sources.push(SOURCE); writeJson(srcPath, sources); }

  console.log('imported', imported, '| covers', (bytes / 1048576).toFixed(1), 'MB | failures', failures.length);
  if (failures.length) console.log(JSON.stringify(failures.slice(0, 10)));
}

main();
