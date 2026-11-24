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

const community = meta.filter((r) => r.source_kind === 'community');

function magicOk(file, ext) {
  const head = fs.readFileSync(file).subarray(0, 16);
  if (ext === '.webp') return head.subarray(0, 4).toString('latin1') === 'RIFF' && head.subarray(8, 12).toString('latin1') === 'WEBP';
  if (ext === '.png') return head[0] === 0x89 && head.subarray(1, 4).toString('latin1') === 'PNG';
  if (ext === '.jpg' || ext === '.jpeg') return head[0] === 0xFF && head[1] === 0xD8;
  if (ext === '.mp4') return head.subarray(4, 8).toString('latin1') === 'ftyp';
  return false;
}

test('community cards: present, with a local preview and a body', () => {
  assert.ok(community.length >= 300, 'expected the community set, got ' + community.length);
  for (const record of community) {
    assert.ok(record.local_rel, record.id + ' local_rel');
    const file = path.join(ROOT, record.local_rel);
    assert.ok(fs.existsSync(file), 'missing preview ' + record.local_rel);
    const ext = path.extname(record.local_rel).toLowerCase();
    assert.ok(magicOk(file, ext), 'bad ' + ext + ' header: ' + record.id);
    const body = (bodies.get(record.id) || '').trim();
    assert.ok(body.length >= 100, record.id + ' body too short');
    assert.ok(!/^Source:\s*https?:\/\//i.test(body), record.id + ' body looks like a bare link');
  }
});

test('the shipped catalogue carries no outbound source pointers', () => {
  // The site presents the resources, not where they were collected from.
  const forbidden = ['source_url', 'source_repo', 'source_path', 'source_license', 'try_url', 'upstream_id', 'community_slug'];
  for (const record of meta) {
    for (const key of forbidden) {
      assert.strictEqual(record[key], undefined, record.id + ' still carries ' + key);
    }
  }
});
