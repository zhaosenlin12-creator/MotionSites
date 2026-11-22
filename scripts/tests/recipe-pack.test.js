const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');
const packPath = path.join(ROOT, 'data', 'recipe_pack.json');
const pack = JSON.parse(fs.readFileSync(packPath, 'utf8'));

test('recipe pack: unique kebab-case ids', () => {
  const seen = new Set();
  for (const recipe of pack) {
    assert.match(recipe.id, /^[a-z0-9]+(?:-[a-z0-9]+)+$/, recipe.id);
    assert.ok(!seen.has(recipe.id), 'duplicate id ' + recipe.id);
    seen.add(recipe.id);
  }
});

test('recipe pack: every entry has a real preview pair', () => {
  for (const recipe of pack) {
    for (const ext of ['mp4', 'webp']) {
      const file = path.join(ROOT, 'assets', 'previews', recipe.id + '.' + ext);
      assert.ok(fs.existsSync(file), 'missing ' + file);
      assert.ok(fs.statSync(file).size > 2000, 'suspiciously small ' + file);
    }
  }
});

test('recipe pack: prompt bodies are paste-ready', () => {
  for (const recipe of pack) {
    const words = String(recipe.prompt || '').trim().split(/\s+/).length;
    assert.ok(words >= 120, recipe.id + ' prompt too short (' + words + ' words)');
    assert.ok(words <= 420, recipe.id + ' prompt too long (' + words + ' words)');
    assert.ok(!/```/.test(recipe.prompt), recipe.id + ' prompt contains a code fence');
  }
});

test('recipe pack: metadata is consistent', () => {
  const allowedTypes = new Set(['hero', 'section', 'full-page', 'component', 'playbook']);
  for (const recipe of pack) {
    assert.ok(recipe.title && recipe.title.length > 3, recipe.id + ' title');
    assert.ok(recipe.description && recipe.description.length <= 90, recipe.id + ' description');
    assert.ok(allowedTypes.has(recipe.type), recipe.id + ' type ' + recipe.type);
    assert.ok(Array.isArray(recipe.tags) && recipe.tags.length >= 3, recipe.id + ' tags');
    assert.ok(Array.isArray(recipe.palette) && recipe.palette.length >= 3, recipe.id + ' palette');
    for (const hex of recipe.palette) assert.match(hex, /^#[0-9a-fA-F]{6}$/, recipe.id + ' palette ' + hex);
    assert.ok(recipe.source && recipe.source.url && recipe.source.license, recipe.id + ' source');
    assert.ok(recipe.demo && recipe.demo.style && recipe.demo.t1, recipe.id + ' demo');
    assert.ok(Number.isFinite(recipe.sort_order), recipe.id + ' sort_order');
  }
});

test('page shell stays offline-first (no external font origins)', () => {
  for (const file of ['ms_template.html', 'index.html']) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    assert.ok(!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html), file + ' references Google Fonts');
    assert.ok(!/<link[^>]+href="https?:\/\//.test(html), file + ' has an external stylesheet');
  }
});

test('cache-bust stamp is consistent across build and client', () => {
  const build = fs.readFileSync(path.join(ROOT, 'scripts', 'build.js'), 'utf8');
  const client = fs.readFileSync(path.join(ROOT, 'ms_script.js'), 'utf8');
  const buildStamp = (build.match(/BUILD_STAMP = '([^']+)'/) || [])[1];
  assert.ok(buildStamp, 'build.js has no BUILD_STAMP');
  const clientStamps = [...client.matchAll(/v=([0-9]{8}v[0-9]+)/g)].map((m) => m[1]);
  assert.ok(clientStamps.length >= 1, 'ms_script.js has no cache-bust stamp');
  for (const stamp of clientStamps) assert.strictEqual(stamp, buildStamp);
});
