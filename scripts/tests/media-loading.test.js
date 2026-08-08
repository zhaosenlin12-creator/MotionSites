const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '..', '..', 'ms_script.js'), 'utf8');

test('card video loading is queued instead of timing out into fake art', () => {
  assert.match(source, /__MS_VIDEO_MAX_CONCURRENT\s*=\s*3/);
  assert.match(source, /__MS_VIDEO_QUEUE/);
  assert.match(source, /preload\s*=\s*[']auto[']/);
  assert.match(source, /dataset\.mediaState/);
  assert.match(source, /className\s*=\s*[']media-error[']/);
  assert.match(source, /queueVideoMedia\(/);
  assert.match(source, /retryVideoMedia\(/);
  assert.doesNotMatch(source, /__MS_VIDEO_FALLBACK/);
  assert.doesNotMatch(source, /__msMetaTimer/);
  assert.doesNotMatch(source, /restore\(['"]timeout['"]\)/);
});
