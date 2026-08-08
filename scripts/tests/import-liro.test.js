const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const { readPaywallBodiesFromLiro } = require("../import-community");

test("readPaywallBodiesFromLiro fills only ids with body > 200 chars", () => {
  const result = readPaywallBodiesFromLiro({ root: ".", paywallIds: ["wisa-space-hero", "nonexistent-id"] });
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
