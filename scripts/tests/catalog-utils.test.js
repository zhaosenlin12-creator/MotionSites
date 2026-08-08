const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  extractMarkdownPrompt,
  isCompletePrompt,
  normalizeTitle,
  promptHash,
} = require('../lib/catalog-utils');

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf8');
}

test('extracts the free export prompt format', () => {
  const record = extractMarkdownPrompt(fixture('free-format.md'), 'Aethera_Studio.md');

  assert.equal(record.title, 'Aethera Studio');
  assert.equal(record.category, 'Hero Section');
  assert.equal(record.type, 'hero');
  assert.match(record.promptText, /fullscreen single-page hero/i);
});

test('extracts the full prompt export format', () => {
  const record = extractMarkdownPrompt(fixture('full-prompt-format.md'), 'acreage-farming-hero.md');

  assert.equal(record.id, 'acreage-farming-hero');
  assert.equal(record.category, 'Landing Page');
  assert.equal(record.type, 'landing-page');
  assert.match(record.promptText, /premium agricultural website/i);
});

test('rejects short placeholders and accepts executable specifications', () => {
  assert.equal(isCompletePrompt('Prompt available on the source page.'), false);
  assert.equal(isCompletePrompt('Build a responsive landing page.\n'.repeat(20)), true);
  assert.equal(
    isCompletePrompt(
      'Create a typing animation that reveals each character with a 50ms delay between characters for the main headline.',
      { source_kind: 'community' },
    ),
    true,
  );
});

test('normalizes titles and prompt hashes', () => {
  assert.equal(normalizeTitle('Acreage - Farming!'), 'acreagefarming');
  assert.equal(promptHash('Build  this UI\r\n'), promptHash('Build this UI\n'));
});
