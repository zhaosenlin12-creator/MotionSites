const test = require('node:test');
const assert = require('node:assert/strict');

const { auditCatalog } = require('../lib/catalog-utils');

test('audit rejects duplicate ids, missing assets, and short prompts', () => {
  const result = auditCatalog({
    root: process.cwd(),
    merged: [
      { id: 'same', local_rel: 'assets/missing-preview.webp' },
      { id: 'same', local_rel: null },
    ],
    prompts: [
      { id: 'same', prompt_text: 'short prompt' },
    ],
    sources: [],
  });

  assert.deepEqual(
    result.errors.map((error) => error.code).sort(),
    ['duplicate-id', 'missing-asset', 'short-prompt'],
  );
});
