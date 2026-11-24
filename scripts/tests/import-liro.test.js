const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const { readPaywallBodiesFromLiro } = require("../import-community");

// Fixtures instead of the git-ignored `sources/` cache: the reader only needs the directory shape
// (sources/akkikumar72-free/liro-prompts/<entry>/{metadata.json,working-prompt.md}).
const FIXTURE_ROOT = path.join(__dirname, "fixtures");

test("readPaywallBodiesFromLiro fills only ids with body > 200 chars", () => {
  const result = readPaywallBodiesFromLiro({ root: FIXTURE_ROOT, paywallIds: ["wisa-space-hero", "nonexistent-id"] });
  assert.equal(result.fills.length, 1);
  assert.equal(result.fills[0].id, "wisa-space-hero");
  assert.equal(typeof result.fills[0].body, "string");
  assert.equal(result.fills[0].body.length > 200, true);
  assert.equal(result.fills[0].source_id, "akkikumar72-liro-prompts");
  assert.equal(result.fills[0].source_repo, "akkikumar72/liro-prompts");
  assert.equal(result.fills[0].source_license, "MIT");
});

test("readPaywallBodiesFromLiro returns empty array when root missing", () => {
  const result = readPaywallBodiesFromLiro({ root: "./no-such-path-xyz", paywallIds: ["wisa-space-hero"] });
  assert.deepEqual(result.fills, []);
});
