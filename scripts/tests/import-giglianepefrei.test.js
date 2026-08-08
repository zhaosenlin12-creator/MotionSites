const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const { readGiglianepefrei } = require("../import-community");

test("readGiglianepefrei returns one record per .md file with body, category, type", () => {
  const result = readGiglianepefrei({ root: "." });
  assert.equal(result.records.length > 50, true, "expected many records");
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
  const result = readGiglianepefrei({ root: "." });
  const slugBased = result.records.find((r) => r.id && r.id.includes("-") && r.title && /[A-Z]/.test(r.title));
  assert.ok(slugBased, "expected at least one slug-derived id");
});

test("readGiglianepefrei returns empty array when sources dir is missing", () => {
  const result = readGiglianepefrei({ root: "./no-such-dir-xyz" });
  assert.deepEqual(result.records, []);
});
