// scripts/import-superdesign-repo.js — ingest the superdesigndev/superdesign-prompts repo (MIT)
//
// The repo is a public prompt library: every `prompts/<slug>/` folder has a README with
// YAML front-matter (title, category, tags, author, try_url) plus a fenced prompt block,
// and a preview asset (png / jpg / gif / mp4).
//
// Usage:
//   git clone --depth 1 https://github.com/superdesigndev/superdesign-prompts.git sources/superdesign-prompts
//   node scripts/import-superdesign-repo.js            # dry run (prints stats)
//   node scripts/import-superdesign-repo.js --write    # convert previews + append records
//
// `sources/` is git-ignored: the clone is a research cache, the extracted previews and
// the merged records are what gets committed.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'sources', 'superdesign-prompts', 'prompts');
const OUT = path.join(ROOT, 'assets', 'community', 'superdesign');
const SOURCE = {
  id: 'superdesign-prompts',
  repo: 'superdesigndev/superdesign-prompts',
  url: 'https://github.com/superdesigndev/superdesign-prompts',
  license: 'MIT',
  branch: 'main',
};

const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, v) => fs.writeFileSync(path.join(ROOT, p), JSON.stringify(v, null, 2) + '\n', 'utf8');
const slugify = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const CATEGORY = {
  'landing pages': 'Landing Page', 'landing page': 'Landing Page',
  'mobile apps': 'Mobile App', 'mobile app': 'Mobile App',
  'components': 'Components', 'component': 'Components',
  'dashboards': 'Dashboards', 'dashboard': 'Dashboards',
  'animations': 'Animations & Backgrounds', 'backgrounds': 'Animations & Backgrounds',
  'styles': 'Design Systems & Styles', 'style': 'Design Systems & Styles',
  'design systems': 'Design Systems & Styles',
  'email': 'Email & Newsletter', 'newsletters': 'Email & Newsletter',
  'pricing': 'Pricing Page', 'waitlists': 'Waitlist & Coming Soon',
  'authentication': 'Auth & Login', 'onboarding': 'Onboarding',
  'forms': 'Forms & Contact', 'blog': 'Blog & Editorial',
  'ecommerce': 'E-commerce', 'e-commerce': 'E-commerce',
  'portfolios': 'Portfolio', 'portfolio': 'Portfolio',
};

function parseScalar(raw) {
  const v = String(raw || '').trim();
  if (!v) return '';
  if (v.startsWith('"') && v.endsWith('"')) { try { return JSON.parse(v); } catch (e) { return v.slice(1, -1); } }
  if (v.startsWith('[') && v.endsWith(']')) {
    try { return JSON.parse(v.replace(/'/g, '"')); } catch (e) { return v.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean); }
  }
  return v;
}

function parseFrontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const data = {};
  for (const line of m[1].split('\n')) {
    const at = line.indexOf(':');
    if (at < 0) continue;
    const key = line.slice(0, at).trim();
    if (!key) continue;
    data[key] = parseScalar(line.slice(at + 1));
  }
  return data;
}

function extractBody(text) {
  const section = text.split(/^##\s+Prompt\s*$/m)[1] || text;
  const blocks = [...String(section).matchAll(/```(?:text|json|markdown|md)?\s*\n([\s\S]*?)\n```/g)]
    .map((m) => m[1].trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  return blocks[0] || '';
}

function firstParagraph(text) {
  const afterTitle = text.replace(/^---[\s\S]*?---/, '').replace(/^#\s+.*$/m, '');
  const para = afterTitle.split(/\n\s*\n/).map((s) => s.trim()).find((s) => s && !s.startsWith('<') && !s.startsWith('##'));
  return String(para || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function deriveType(record) {
  const bag = [record.category, ...(record.tags || []), record.slug, record.title].join(' ').toLowerCase();
  if (bag.includes('landing')) return 'landing-page';
  if (bag.includes('hero')) return 'hero';
  if (bag.includes('dashboard')) return 'dashboard';
  if (bag.includes('background')) return 'background';
  if (bag.includes('animation')) return 'animation';
  if (bag.includes('footer')) return 'footer';
  if (bag.includes('waitlist')) return 'waitlist';
  if (bag.includes('pricing')) return 'pricing';
  if (bag.includes('portfolio')) return 'portfolio';
  if (bag.includes('email') || bag.includes('newsletter')) return 'email';
  if (bag.includes('form') || bag.includes('signup') || bag.includes('sign-in') || bag.includes('contact')) return 'form';
  return slugify(record.category || 'community');
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'pipe' });
}

function ensureFfmpeg() {
  try { run('ffmpeg', ['-version']); } catch (e) { throw new Error('ffmpeg is required on PATH'); }
}

function convertImage(src, dest) {
  // Pillow keeps the 16:10 cover crop consistent with the rest of the catalog and
  // avoids depending on a specific ffmpeg build's webp encoder.
  run('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), src, dest]);
}

function ffmpegSnapshot(src, dest) {
  const tmp = dest + '.frame.png';
  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-frames:v', '1', tmp]);
  convertImage(tmp, dest);
  try { fs.unlinkSync(tmp); } catch (e) {}
}

function convertVideo(src, dest, poster) {
  run('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-vf', "scale='min(1280,iw)':-2",
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '27', '-pix_fmt', 'yuv420p', '-an',
    '-movflags', '+faststart', dest]);
  ffmpegSnapshot(src, poster);
}

function pickPreview(dir, files) {
  const order = ['preview.mp4', 'preview.webp', 'preview.png', 'preview.jpg', 'preview.jpeg', 'preview.gif'];
  for (const name of order) if (files.includes(name)) return name;
  return files.find((f) => /^preview\./i.test(f)) || null;
}

function main() {
  const write = process.argv.includes('--write');
  if (!fs.existsSync(SRC)) {
    console.error('Missing ' + SRC + '\nClone the source first:\n  git clone --depth 1 ' + SOURCE.url + '.git sources/superdesign-prompts');
    process.exit(1);
  }
  if (write) ensureFfmpeg();

  const merged = readJson('data/ms_prompts_merged.json');
  const prompts = readJson('data/ms_prompts_with_text.json');
  const existingIds = new Set(merged.map((r) => r.id));
  const existingSlugs = new Set();
  for (const r of merged) {
    if (r.source_kind === 'community' && r.source_path) {
      const m = String(r.source_path).match(/prompts\/([^/]+)\//);
      if (m) existingSlugs.add(m[1]);
    }
  }

  const dirs = fs.readdirSync(SRC, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const planned = [];
  const skipped = [];
  for (const slug of dirs) {
    const dir = path.join(SRC, slug);
    const files = fs.readdirSync(dir);
    const readme = files.find((f) => /^readme\.md$/i.test(f));
    if (!readme) { skipped.push([slug, 'no-readme']); continue; }
    const text = fs.readFileSync(path.join(dir, readme), 'utf8');
    const fm = parseFrontMatter(text);
    const body = extractBody(text);
    const previewName = pickPreview(dir, files);
    const id = 'community-superdesign-' + slug;
    if (existingIds.has(id) || existingSlugs.has(slug)) { skipped.push([slug, 'exists']); continue; }
    if (!previewName) { skipped.push([slug, 'no-preview']); continue; }
    if (body.length < 120) { skipped.push([slug, 'short-body']); continue; }
    const title = String(fm.title || text.match(/^#\s+(.+)$/m)?.[1] || slug).replace(/\s+/g, ' ').trim();
    const rawCategory = String(fm.category || '').trim();
    const category = CATEGORY[rawCategory.toLowerCase()] || rawCategory || 'Landing Page';
    const description = firstParagraph(text).slice(0, 220) || null;
    const ext = path.extname(previewName).toLowerCase();
    const previewUrl = 'https://github.com/' + SOURCE.repo + '/blob/' + SOURCE.branch + '/prompts/' + slug + '/' + previewName;
    planned.push({
      id, slug, title, category, description, body,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      author: fm.author || null,
      industry: fm.industry || null,
      try_url: fm.try_url || null,
      previewName, ext, previewUrl,
      type: deriveType({ category, tags: fm.tags || [], slug, title }),
      sort_order: 10000 + planned.length * 3 + 1,
    });
  }

  console.log('source dirs=' + dirs.length + ' new=' + planned.length + ' skipped=' + skipped.length);
  const byCat = {};
  for (const p of planned) byCat[p.category] = (byCat[p.category] || 0) + 1;
  console.log('categories', JSON.stringify(byCat));
  if (!write) {
    console.log('dry run; pass --write to import');
    return;
  }

  let bytes = 0;
  const imported = [];
  for (const p of planned) {
    const destDir = path.join(OUT, p.slug);
    fs.mkdirSync(destDir, { recursive: true });
    const src = path.join(SRC, p.slug, p.previewName);
    let rel, kind = null, poster = null;
    if (p.ext === '.mp4') {
      const dest = path.join(destDir, 'preview.mp4');
      const posterPath = path.join(destDir, 'poster.webp');
      convertVideo(src, dest, posterPath);
      rel = 'assets/community/superdesign/' + p.slug + '/preview.mp4';
      poster = 'assets/community/superdesign/' + p.slug + '/poster.webp';
      kind = 'mp4';
    } else {
      const dest = path.join(destDir, 'preview.webp');
      convertImage(src, dest);
      rel = 'assets/community/superdesign/' + p.slug + '/preview.webp';
      kind = 'webp';
    }
    const size = fs.statSync(path.join(ROOT, rel)).size;
    if (size > 24 * 1024 * 1024) { console.warn('skip over-limit ' + p.id); continue; }
    bytes += size;

    const meta = {
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      type: p.type,
      page_type: 'community',
      is_free: true,
      source_kind: 'community',
      source_id: SOURCE.id,
      source_url: p.previewUrl,
      source_path: 'prompts/' + p.slug + '/README.md',
      source_repo: SOURCE.repo,
      source_license: SOURCE.license,
      local_rel: rel,
      local_kind: kind,
      sort_order: p.sort_order,
      tags: p.tags,
      author: p.author,
      industry: p.industry,
      try_url: p.try_url,
      community_slug: p.slug,
    };
    if (poster) meta.poster_rel = poster;
    merged.push(meta);
    prompts.push({ id: p.id, prompt_text: p.body });
    imported.push({ id: p.id, kind, bytes: size });
  }

  // The repository relicensed to MIT: keep the existing superdesign records honest too.
  for (const record of merged) {
    if (record.source_id === SOURCE.id) record.source_license = SOURCE.license;
  }
  for (const record of prompts) {
    const meta = merged.find((r) => r.id === record.id);
    if (meta && meta.source_id === SOURCE.id) record.source_license = SOURCE.license;
  }

  writeJson('data/ms_prompts_merged.json', merged);
  writeJson('data/ms_prompts_with_text.json', prompts);
  console.log('imported=' + imported.length + ' preview-bytes=' + (bytes / 1048576).toFixed(1) + 'MB total=' + merged.length);
}

main();
