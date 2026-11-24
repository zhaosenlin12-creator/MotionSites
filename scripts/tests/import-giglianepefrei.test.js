const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const { readGiglianepefrei } = require("../import-community");

// The importer reads a research cache under `sources/` that is git-ignored. The suite therefore
// points it at committed fixtures, so the test is hermetic instead of depending on a clone.
const FIXTURE_ROOT = path.join(__dirname, "fixtures");

test("readGiglianepefrei returns one record per .md file with body, category, type", () => {
  const result = readGiglianepefrei({ root: FIXTURE_ROOT });
  assert.equal(result.records.length >= 2, true, "expected the fixture records");
  const aethera = result.records.find((r) => r.id === "aethera-studio");
  assert.ok(aethera, "aethera-studio record should exist");
  assert.equal(aethera.title, "Aethera Studio");
  assert.equal(aethera.category, "Hero Section");
  assert.equal(aethera.type, "hero");
  assert.equal(aethera.body.length > 200, true);
  assert.equal(aethera.source_id, "giglianepefrei-motionsites-library");
  assert.equal(aethera.source_repo, "giglianepefrei/motionsites.ai-prompt-library");
  assert.equal(typeof aethera.license, "string");
});

test("readGiglianepefrei derives a stable slug for IDs that do not declare one", () => {
  const result = readGiglianepefrei({ root: FIXTURE_ROOT });
  const slugBased = result.records.find((r) => r.id === "aethera-studio" && r.title === "Aethera Studio");
  assert.ok(slugBased, "expected a slug-derived id");
});

test("readGiglianepefrei returns empty array when sources dir is missing", () => {
  const result = readGiglianepefrei({ root: "./no-such-dir-xyz" });
  assert.deepEqual(result.records, []);
});
