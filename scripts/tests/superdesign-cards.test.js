const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');
const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'catalog-meta.json'), 'utf8'));
const bodies = new Map(
  JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'ms_prompts_with_text.json'), 'utf8'))
    .map((r) => [r.id, String(r.prompt_text || '')])
);

const community = meta.filter((r) => r.source_id === 'superdesign-prompts');

test('superdesign source: records exist and are attributable', () => {
  assert.ok(community.length >= 30, 'expected at least 30 superdesign records, got ' + community.length);
  for (const record of community) {
    assert.strictEqual(record.source_kind, 'community', record.id);
    assert.strictEqual(record.source_license, 'MIT', record.id + ' licence must match the repo LICENSE');
    assert.strictEqual(record.source_repo, 'superdesigndev/superdesign-prompts', record.id);
    assert.match(record.source_url, /^https:\/\/github\.com\/superdesigndev\/superdesign-prompts\/blob\/main\//, record.id);
    assert.match(record.source_path, /^prompts\/[^/]+\/README\.md$/, record.id);
    assert.ok(record.community_slug, record.id + ' community_slug');
  }
});

test('superdesign source: every record has a local webp cover and a body', () => {
  for (const record of community) {
    assert.ok(record.local_rel, record.id + ' local_rel');
    assert.strictEqual(record.local_kind, 'webp', record.id + ' local_kind');
    assert.match(record.local_rel, /^assets\/community\/superdesign\/[^/]+\/preview\.webp$/, record.id);
    const file = path.join(ROOT, record.local_rel);
    assert.ok(fs.existsSync(file), 'missing preview ' + record.local_rel);
    const head = fs.readFileSync(file).subarray(0, 16).toString('latin1');
    assert.ok(head.startsWith('RIFF') && head.includes('WEBP'), 'not a webp: ' + record.id);
    const body = (bodies.get(record.id) || '').trim();
    assert.ok(body.length >= 120, record.id + ' body too short');
    assert.ok(!/^Source:\s*https?:\/\//i.test(body), record.id + ' body looks like a bare link');
  }
});

test('superdesign source: ids are unique and slugs kebab-case', () => {
  const seen = new Set();
  for (const record of community) {
    assert.match(record.id, /^community-superdesign-[a-z0-9-]+$/, record.id);
    assert.ok(!seen.has(record.id), 'duplicate ' + record.id);
    seen.add(record.id);
  }
});
