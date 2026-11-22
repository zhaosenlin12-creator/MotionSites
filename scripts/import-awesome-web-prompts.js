// scripts/import-awesome-web-prompts.js — ingest DexZane/awesome-web-prompts (MIT).
//
// Every record is `prompts/<level>/<category>/<slug>/` with a YAML front-matter README
// (name, level, category, tech_stack, tags, recommended_ai, description.zh/.en, author)
// plus a full `prompt.md` brief. 21 of the 47 new records ship a preview: 5 as
// `preview.png`, 16 as a self-contained `index.html` demo (rendered to a cover by
// scripts/render_awp_previews.py). Records without either are skipped: a card needs a
// real preview, not a placeholder.
//
// Usage:
//   node .work/awp_fetch.js              # pull the record dirs into .work/awp (research cache)
//   python scripts/render_awp_previews.py --all
//   node scripts/import-awesome-web-prompts.js            # dry run
//   node scripts/import-awesome-web-prompts.js --write    # convert png covers + append records
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, '.work', 'awp');
const OUT = path.join(ROOT, 'assets', 'community', 'awp');
const SOURCE = {
  id: 'awesome-web-prompts',
  repo: 'DexZane/awesome-web-prompts',
  url: 'https://github.com/DexZane/awesome-web-prompts',
  license: 'MIT',
  branch: 'HEAD',
};
// No usable cover: the demo opens on a bare colour field and advances as a slide deck.
const SKIP = new Set(['protein-bars']);

const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, v) => fs.writeFileSync(path.join(ROOT, p), JSON.stringify(v, null, 2) + '\n', 'utf8');

const CATEGORY = {
  '404': '404 Pages', '3d': '3D Website', agency: 'Agency', ai: 'AI', art: 'Portfolio',
  automotive: 'Automotive', creative: 'Agency', 'creator-platform': 'Landing Page',
  'data-intelligence': 'SaaS', ecommerce: 'E-commerce', editorial: 'Blog & Editorial',
  environmental: 'Sustainability', 'food-drink': 'E-commerce', interactive: 'Interactive',
  'landing-page': 'Landing Page', manufacturing: 'Technology', motion: 'Animations & Backgrounds',
  photography: 'Portfolio', portfolio: 'Portfolio', 'real-estate': 'Real Estate', saas: 'SaaS',
  space: '3D Website', supply: 'Transportation', technology: 'Technology', travel: 'Travel',
  footer: 'Footer Section', hero: 'Hero Section',
};

const unquote = (v) => String(v || '').trim().replace(/^["']|["']$/g, '');

function parseFrontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  let current = null;
  for (const rawLine of m[1].split(/\r?\n/)) {
    if (!rawLine.trim()) continue;
    const top = rawLine.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (top) {
      const [, key, value] = top;
      if (value.trim() === '') {
        current = key;
        out[key] = out[key] || null;
      } else {
        current = null;
        out[key] = unquote(value);
      }
      continue;
    }
    const item = rawLine.match(/^\s*-\s*(.+)$/);
    if (item && current) {
      if (!Array.isArray(out[current])) out[current] = [];
      out[current].push(unquote(item[1]));
      continue;
    }
    const nested = rawLine.match(/^\s+([A-Za-z_][\w-]*):\s*(.*)$/);
    if (nested && current) {
      if (!out[current] || typeof out[current] !== 'object' || Array.isArray(out[current])) out[current] = {};
      out[current][nested[1]] = unquote(nested[2]);
    }
  }
  return out;
}

function firstH1(text) {
  return (text.replace(/^---[\s\S]*?---/, '').match(/^#\s+(.+)$/m) || [])[1] || '';
}

function pickCover(dir, files) {
  const png = files.find((f) => /^preview\.(png|jpe?g|webp)$/i.test(f));
  if (png) return { kind: 'image', file: png };
  if (files.includes('index.html')) return { kind: 'rendered' };
  return null;
}

function typeOf(level, category, slug) {
  if (level === 'sections') {
    if (category === 'footer') return 'footer';
    if (category === 'hero') return 'hero';
    return 'section';
  }
  if (/404/.test(slug)) return 'landing-page';
  return 'landing-page';
}

function main() {
  const write = process.argv.includes('--write');
  if (!fs.existsSync(SRC)) {
    console.error('Missing ' + SRC + ' — run node .work/awp_fetch.js first');
    process.exit(1);
  }
  const dirs = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'README.md') dirs.push(path.dirname(p));
    }
  })(SRC);

  const merged = readJson('data/ms_prompts_merged.json');
  const prompts = readJson('data/ms_prompts_with_text.json');
  const ids = new Set(merged.map((r) => r.id));
  const maxSort = merged.reduce((m, r) => Math.max(m, Number(r.sort_order) || 0), 0);

  const planned = [];
  const skipped = [];
  for (const dir of dirs.sort()) {
    const slug = path.basename(dir);
    const files = fs.readdirSync(dir);
    if (SKIP.has(slug)) { skipped.push([slug, 'no-usable-cover']); continue; }
    const cover = pickCover(dir, files);
    if (!cover) { skipped.push([slug, 'no-preview']); continue; }
    const readme = fs.readFileSync(path.join(dir, 'README.md'), 'utf8');
    const fm = parseFrontMatter(readme);
    const bodyPath = path.join(dir, 'prompt.md');
    if (!fs.existsSync(bodyPath)) { skipped.push([slug, 'no-prompt']); continue; }
    const body = fs.readFileSync(bodyPath, 'utf8').trim();
    if (body.length < 400) { skipped.push([slug, 'short-body']); continue; }
    const id = 'community-awp-' + slug;
    if (ids.has(id)) { skipped.push([slug, 'exists']); continue; }
    const title = String(fm.name || firstH1(readme) || slug).trim();
    const rawCategory = String(fm.category || '').toLowerCase();
    const category = CATEGORY[rawCategory] || 'Landing Page';
    const desc = fm.description && typeof fm.description === 'object'
      ? (fm.description.en || fm.description.zh || '')
      : String(fm.description || '');
    const tags = (Array.isArray(fm.tags) ? fm.tags : []).map((t) => String(t).trim()).filter(Boolean);
    const relDir = path.relative(SRC, dir).split(path.sep).join('/');
    planned.push({
      id, slug, title, category, desc: String(desc).trim().slice(0, 220),
      body, tags: [...new Set(tags)].slice(0, 8),
      level: String(fm.level || 'pages'),
      type: typeOf(String(fm.level || 'pages'), rawCategory, slug),
      tech: Array.isArray(fm.tech_stack) ? fm.tech_stack : [],
      recommended: Array.isArray(fm.recommended_ai) ? fm.recommended_ai : [],
      relDir, cover,
      previewRel: 'assets/community/awp/' + slug + '/preview.webp',
      sourceUrl: 'https://github.com/' + SOURCE.repo + '/blob/' + SOURCE.branch + '/prompts/' + relDir + '/README.md',
      sort_order: maxSort + 3 * planned.length + 1,
    });
  }

  console.log('dirs=' + dirs.length + ' new=' + planned.length + ' skipped=' + skipped.length);
  console.log('skip reasons', JSON.stringify(skipped.reduce((a, [s, why]) => { (a[why] = a[why] || []).push(s); return a; }, {})));
  const byCat = {};
  for (const p of planned) byCat[p.category] = (byCat[p.category] || 0) + 1;
  console.log('categories', JSON.stringify(byCat));
  if (!write) { console.log('dry run; pass --write to import'); return; }

  fs.mkdirSync(OUT, { recursive: true });
  let imported = 0, bytes = 0;
  for (const p of planned) {
    const destDir = path.join(OUT, p.slug);
    const destWebp = path.join(destDir, 'preview.webp');
    if (p.cover.kind === 'image') {
      fs.mkdirSync(destDir, { recursive: true });
      execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'),
        path.join(SRC, p.relDir, p.cover.file), destWebp], { stdio: 'pipe' });
    }
    if (!fs.existsSync(destWebp)) { console.log('skip (no cover on disk)', p.slug); continue; }
    const size = fs.statSync(destWebp).size;
    if (size > 24 * 1024 * 1024) { console.log('skip (over limit)', p.slug); continue; }

    merged.push({
      id: p.id,
      title: p.title,
      description: p.desc,
      category: p.category,
      type: p.type,
      page_type: 'community',
      is_free: true,
      source_kind: 'community',
      source_id: SOURCE.id,
      source_url: p.sourceUrl,
      source_path: 'prompts/' + p.relDir + '/README.md',
      source_repo: SOURCE.repo,
      source_license: SOURCE.license,
      local_rel: p.previewRel,
      local_kind: 'webp',
      sort_order: p.sort_order,
      tags: p.tags,
      tech_stack: p.tech,
      recommended_ai: p.recommended,
      community_slug: p.slug,
    });
    prompts.push({ id: p.id, prompt_text: p.body });
    imported += 1;
    bytes += size;
  }

  writeJson('data/ms_prompts_merged.json', merged);
  writeJson('data/ms_prompts_with_text.json', prompts);

  // Source register.
  const srcPath = 'data/catalog_sources.json';
  const sources = readJson(srcPath);
  if (!sources.some((s) => s.id === SOURCE.id)) {
    sources.push({
      id: SOURCE.id,
      repository: SOURCE.repo,
      url: SOURCE.url,
      license: SOURCE.license,
      preview_notice: 'Five records ship a preview.png; sixteen ship a self-contained index.html demo that is rendered to a 1280x800 webp cover with scripts/render_awp_previews.py. No upstream demo code is shipped.',
      usage: 'Community web-build prompt collection (front-matter + prompt.md), ingested with scripts/import-awesome-web-prompts.js',
    });
    writeJson(srcPath, sources);
  }
  console.log('imported=' + imported + ' covers=' + (bytes / 1024).toFixed(0) + 'KB total=' + merged.length);
}

main();
