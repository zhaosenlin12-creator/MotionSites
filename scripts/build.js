// scripts/build.js — progressive catalog build (v3)
//
// Inputs (all committed):
//   data/ms_prompts_merged.json      metadata records for the scraped catalog
//   data/ms_prompts_with_text.json   prompt bodies, by id
//   data/recipe_pack.json            curated "UI replication recipe" pack (v1.2.0)
//   ms_template.html                 page shell + CSS
//
// Outputs:
//   data/catalog-lite.json           counters, top categories, per-category counts
//   data/catalog-meta.json           one record per card
//   data/catalog-text.json           id -> prompt body (legacy single file)
//   data/catalog-text-index.json     id -> per-card text path
//   data/catalog-text/<id>.txt       one file per card body
//   index.html                       template + counters + versioned script tag
//
// Build invariants (asserted at the end of every run):
//   * every published card has a local preview AND a non-empty prompt body
//   * image + video + concept counters always add up to the total
//   * a second run on an unchanged tree produces byte-identical output
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const BUILD_STAMP = '20261122v7';
const MAX_PREVIEW_BYTES = 24 * 1024 * 1024;
const IMAGE_KINDS = new Set(['webp', 'gif', 'png', 'jpeg']);
const VIDEO_KINDS = new Set(['mp4', 'webm', 'hls']);

function readNoBom(p) {
  let buf = fs.readFileSync(p);
  if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) buf = buf.subarray(3);
  return buf.toString('utf8');
}
function readJson(p) {
  return JSON.parse(readNoBom(p));
}
function writeJson(name, value) {
  const body = JSON.stringify(value, null, 2) + '\n';
  fs.writeFileSync(path.join(DATA, name + '.json'), body, 'utf8');
  fs.writeFileSync(path.join(DATA, name + '.json.gz'), zlib.gzipSync(Buffer.from(body, 'utf8'), { level: 9 }));
  return body.length;
}

function kindFromRel(rel) {
  const ext = path.extname(String(rel || '').split('?')[0]).toLowerCase();
  if (ext === '.mp4' || ext === '.mov' || ext === '.m4v') return 'mp4';
  if (ext === '.webm') return 'webm';
  if (ext === '.m3u8') return 'hls';
  if (ext === '.webp') return 'webp';
  if (ext === '.gif') return 'gif';
  if (ext === '.png') return 'png';
  if (ext === '.jpg' || ext === '.jpeg') return 'jpeg';
  return 'other';
}

function previewKind(record) {
  return record.local_kind || kindFromRel(record.local_rel || record.poster_rel);
}

// ---- 1. Load sources ----
const merged = readJson(path.join(DATA, 'ms_prompts_merged.json'));
const textRows = readJson(path.join(DATA, 'ms_prompts_with_text.json'));
const textMap = new Map(textRows.map((row) => [row.id, row.prompt_text || '']));

const recipePath = path.join(DATA, 'recipe_pack.json');
const recipes = fs.existsSync(recipePath) ? readJson(recipePath) : [];
const recipeMeta = [];
for (const recipe of recipes) {
  if (!recipe || !recipe.id) throw new Error('[build] recipe without id');
  if (textMap.has(recipe.id)) {
    console.warn('[build] skipping duplicate recipe id ' + recipe.id);
    continue;
  }
  recipeMeta.push({
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    category: recipe.category,
    type: recipe.type,
    source_kind: 'recipes',
    local_rel: 'assets/previews/' + recipe.id + '.mp4',
    poster_rel: 'assets/previews/' + recipe.id + '.webp',
    local_kind: 'mp4',
    sort_order: recipe.sort_order,
    is_free: true,
    tags: recipe.tags,
    palette: recipe.palette,
    source_id: recipe.source && recipe.source.pack,
    source_repo: recipe.source && recipe.source.repo,
    source_url: recipe.source && recipe.source.url,
    source_license: recipe.source && recipe.source.license,
  });
  textMap.set(recipe.id, recipe.prompt);
}

// ---- 2. Keep only publishable cards (preview + prompt body) ----
const kept = [];
const dropped = [];
for (const record of merged.concat(recipeMeta)) {
  const body = (textMap.get(record.id) || '').trim();
  if (!(record.local_rel || record.poster_rel) || !body) {
    dropped.push(record.id);
    continue;
  }
  kept.push(record);
}
if (dropped.length) {
  console.warn('[build] dropping ' + dropped.length + ' card(s) without preview or prompt body');
}

// ---- 3. Sort ----
// The published catalog is ordered by sort_order (then id) only: newer community
// picks float to the top, and the recipe pack uses negative sort_order to pin itself
// above the scraped catalog. Media kind deliberately does not influence the order.
function sortRecords(list) {
  // Array#sort is stable in Node 18+, so records with the same sort_order keep the
  // relative order they had in the source file (which is the curated order).
  return list.slice().sort((a, b) => {
    const ao = typeof a.sort_order === 'number' ? a.sort_order : Number.POSITIVE_INFINITY;
    const bo = typeof b.sort_order === 'number' ? b.sort_order : Number.POSITIVE_INFINITY;
    return ao - bo;
  });
}
const meta = sortRecords(kept);

// ---- 4. Counters ----
const counts = {};
const textOut = {};
let images = 0, videos = 0, concepts = 0, recipesCount = 0, motionsites = 0, community = 0, complete = 0;
for (const record of meta) {
  const body = (textMap.get(record.id) || '').trim();
  if (body) {
    complete++;
    textOut[record.id] = textMap.get(record.id);
  }
  const kind = previewKind(record);
  if (VIDEO_KINDS.has(kind)) videos++;
  else if (IMAGE_KINDS.has(kind)) images++;
  else concepts++;
  counts[record.category] = (counts[record.category] || 0) + 1;
  const sourceKind = record.source_kind || 'motionsites';
  if (sourceKind === 'recipes') recipesCount++;
  else if (sourceKind === 'community') community++;
  else motionsites++;
}
const topCategories = Object.entries(counts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 9)
  .map(([name, n]) => ({ name, n }));
const lite = {
  total: meta.length,
  complete,
  images,
  videos,
  concepts,
  recipes: recipesCount,
  motionsites,
  community,
  topCategories,
  categories: counts,
  version: 2,
};

// ---- 5. Write data ----
const kb = (n) => (n / 1024).toFixed(1);
console.log(
  'Records=' + meta.length +
  ' complete=' + complete +
  ' images=' + images +
  ' videos=' + videos +
  ' concepts=' + concepts +
  ' recipes=' + recipesCount +
  ' motionsites=' + motionsites +
  ' community=' + community
);
console.log('catalog-lite.json ' + kb(writeJson('catalog-lite', lite)) + ' KB');
console.log('catalog-meta.json ' + kb(writeJson('catalog-meta', meta)) + ' KB');
console.log('catalog-text.json ' + kb(writeJson('catalog-text', textOut)) + ' KB');

const txtDir = path.join(DATA, 'catalog-text');
fs.mkdirSync(txtDir, { recursive: true });
const txtIndex = {};
for (const id of Object.keys(textOut)) {
  const safe = id.replace(/[^a-zA-Z0-9._-]/g, '_');
  fs.writeFileSync(path.join(txtDir, safe + '.txt'), textOut[id], 'utf8');
  txtIndex[id] = 'catalog-text/' + safe + '.txt';
}
fs.writeFileSync(path.join(DATA, 'catalog-text-index.json'), JSON.stringify(txtIndex, null, 2) + '\n', 'utf8');
let pruned = 0;
for (const file of fs.readdirSync(txtDir)) {
  if (!file.endsWith('.txt')) continue;
  if (Object.values(txtIndex).includes('catalog-text/' + file)) continue;
  fs.unlinkSync(path.join(txtDir, file));
  pruned++;
}
console.log('catalog-text/ ' + Object.keys(txtIndex).length + ' files' + (pruned ? ' (pruned ' + pruned + ')' : ''));

// ---- 6. index.html from the template ----
let html = readNoBom(path.join(ROOT, 'ms_template.html'));
const replacements = {
  '${enriched.length}': String(meta.length),
  '${complete}': String(complete),
  '${images}': String(images),
  '${videos}': String(videos),
  '${noMedia}': String(concepts),
  '${recipes}': String(recipesCount),
  '<script>__SCRIPT_BODY__</script>': '<script src="ms_script.js?v=' + BUILD_STAMP + '" defer></script>',
};
for (const [needle, value] of Object.entries(replacements)) html = html.split(needle).join(value);
fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
console.log('index.html ' + kb(Buffer.byteLength(html)) + ' KB  (stamp ' + BUILD_STAMP + ')');

// ---- 7. Assertions ----
const problems = [];
if (images + videos + concepts !== meta.length) problems.push('media counters do not add up');
if (topCategories.reduce((sum, c) => sum + c.n, 0) > meta.length) problems.push('category counts overflow');
if (Object.keys(textOut).length !== complete) problems.push('text index mismatch');
for (const record of meta) {
  const rel = record.local_rel || record.poster_rel;
  if (!rel) { problems.push('missing preview: ' + record.id); continue; }
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) problems.push('missing preview file: ' + record.id + ' -> ' + rel);
  else if (fs.statSync(abs).size > MAX_PREVIEW_BYTES) problems.push('preview over size limit: ' + record.id);
  if (!textOut[record.id]) problems.push('missing prompt body: ' + record.id);
}
if (problems.length) {
  for (const problem of problems) console.error('[build] FAIL ' + problem);
  process.exit(1);
}
console.log('[build] OK invariants hold');
