# MotionSites Catalog Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve every existing high-quality preview while fixing incomplete prompt bodies and adding 140 CC0 Superdesign prompts with real previews and traceable provenance.

**Architecture:** Keep the two existing JSON files as runtime sources. Add dependency-free Node utilities for parsing, importing, and auditing; mark legacy records as `motionsites` and imported records as `community`; keep the static single-file application and add one source filter.

**Tech Stack:** Node.js 24 built-ins, `node:test`, vanilla HTML/CSS/JavaScript, JSON, Cloudflare Pages.

---

## File Map

- Create `scripts/lib/catalog-utils.js`, `scripts/import-community.js`, and `scripts/audit-catalog.js`.
- Create `scripts/tests/catalog-utils.test.js`, `scripts/tests/catalog-audit.test.js`, and Markdown fixtures.
- Create `data/catalog_sources.json` and `assets/community/superdesign/<slug>/preview.<ext>`.
- Modify `.gitignore`, both `data/ms_prompts_*.json` files, `scripts/build.js`, `ms_template.html`, `ms_script.js`, `README.md`, `CONTRIBUTING.md`, and `scripts/README.md`.
- Regenerate `index.html` only through `node scripts/build.js`.

### Task 1: Test prompt parsing and quality rules

**Files:**
- Create: `scripts/tests/catalog-utils.test.js`
- Create: `scripts/tests/fixtures/free-format.md`
- Create: `scripts/tests/fixtures/full-prompt-format.md`

- [ ] Write failing tests for both Markdown formats.

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { extractMarkdownPrompt, isCompletePrompt, normalizeTitle, promptHash } = require('../lib/catalog-utils');

test('extracts both exported prompt formats', () => {
  const free = extractMarkdownPrompt(fs.readFileSync(path.join(__dirname, 'fixtures/free-format.md'), 'utf8'), 'Aethera_Studio.md');
  const pro = extractMarkdownPrompt(fs.readFileSync(path.join(__dirname, 'fixtures/full-prompt-format.md'), 'utf8'), 'acreage-farming-hero.md');
  assert.equal(free.title, 'Aethera Studio');
  assert.match(free.promptText, /fullscreen single-page hero/i);
  assert.equal(pro.id, 'acreage-farming-hero');
  assert.match(pro.promptText, /premium agricultural website/i);
});

test('rejects stubs and normalizes duplicates', () => {
  assert.equal(isCompletePrompt('Prompt available on the source page.'), false);
  assert.equal(isCompletePrompt('Build a responsive landing page.\n'.repeat(20)), true);
  assert.equal(normalizeTitle('Acreage — Farming!'), 'acreagefarming');
  assert.equal(promptHash('Build  this UI\r\n'), promptHash('Build this UI\n'));
});
```

- [ ] Run `node --test scripts/tests/catalog-utils.test.js`.

Expected: FAIL with `Cannot find module '../lib/catalog-utils'`.

### Task 2: Implement utilities and integrity audit

**Files:**
- Create: `scripts/lib/catalog-utils.js`
- Create: `scripts/audit-catalog.js`
- Create: `scripts/tests/catalog-audit.test.js`

- [ ] Implement these stable exports:

```js
module.exports = {
  readJson, writeJson, slugify, normalizeTitle, normalizePrompt,
  promptHash, extractMarkdownPrompt, isCompletePrompt,
  detectAssetKind, auditCatalog
};
```

`isCompletePrompt` requires at least 200 trimmed characters and rejects known placeholders. `extractMarkdownPrompt` selects the longest fenced block after a heading containing `Prompt`, tolerating mojibake emoji text and both `text` and bare fences.

- [ ] Add a fixture test that requires `auditCatalog()` to report `duplicate-id`, `missing-asset`, and `short-prompt` for invalid data.
- [ ] Implement `node scripts/audit-catalog.js` to verify unique IDs, body-to-metadata matching, quality, `has_text`/`text_len`, source references, duplicate hashes, local assets, and the 24 MiB limit.
- [ ] Run `node --test scripts/tests/*.test.js`; expect all tests to pass.
- [ ] Commit:
```bash
git add scripts/lib scripts/tests scripts/audit-catalog.js
git commit -m 'test: add catalog parsing and integrity audit'
```
### Task 3: Add provenance and deterministic importer

**Files:**
- Create: `data/catalog_sources.json`
- Create: `scripts/import-community.js`
- Modify: `.gitignore`

- [ ] Add `/sources/` to `.gitignore` so research caches never enter the public repository.
- [ ] Add source records for:

```json
[
  {'id':'giglianepefrei-motionsites-library','repository':'giglianepefrei/motionsites.ai-prompt-library','license':'NOASSERTION'},
  {'id':'nomaan5541-motionsites-collection','repository':'nomaan5541/motionsites-prompt-collection','license':'MIT'},
  {'id':'superdesign-prompts','repository':'superdesigndev/superdesign-prompts','license':'CC0-1.0'}
]
```

- [ ] Implement a dry-run-by-default importer reading:

```text
sources/giglianepefrei_fetch/Pro prompts/*.md
sources/nomaan5541_fetch/missing_prompts.json
sources/superdesign_fetch/prompts.json
sources/superdesign_fetch/prompts/<slug>/preview.*
```

It writes only with `--write`, prefixes community IDs with `community-superdesign-`, preserves prompt text byte-for-byte after newline normalization, attaches `source_kind`, `source_id`, `source_url`, and `source_path`, and reports additions, replacements, duplicates, rejections, missing assets, and bytes.

- [ ] Test that `acreage-farming-hero` replaces its 124-character stub, `celestia-hero` is added, and Superdesign slugs map to stable prefixed IDs.
- [ ] Run all tests and commit:

```bash
git add .gitignore data/catalog_sources.json scripts/import-community.js scripts/tests
git commit -m 'feat: add traceable community prompt importer'
```
### Task 4: Import complete content and original previews

**Files:**
- Local only: `sources/superdesign_fetch/**`
- Modify: `data/ms_prompts_merged.json`
- Modify: `data/ms_prompts_with_text.json`
- Create: `assets/community/superdesign/<slug>/preview.<ext>`

- [ ] Cache the current `superdesigndev/superdesign-prompts` default branch. Verify `prompts.json` has 140 records and `LICENSE-DATA` declares prompt content CC0-1.0.
- [ ] Run `node scripts/import-community.js`; expect one replacement, one new MotionSites record, 140 community records, three rejected short stubs, no collisions, and no missing selected previews.
- [ ] Run `node scripts/import-community.js --write`; expect 505 metadata records and 466 complete prompt bodies.
- [ ] Preserve preview bytes exactly; do not resize or perform lossy conversion.
- [ ] Run `node scripts/audit-catalog.js`; expect `AUDIT OK` and no file above 24 MiB.
- [ ] Commit:

```bash
git add data/ms_prompts_merged.json data/ms_prompts_with_text.json assets/community
git commit -m 'feat: add complete community UI prompt collection'
```

### Task 5: Add source-aware static UI

**Files:**
- Modify: `scripts/build.js`
- Modify: `ms_template.html`
- Modify: `ms_script.js`
- Regenerate: `index.html`

- [ ] Import `isCompletePrompt` and `detectAssetKind` in the build, infer legacy `source_kind` as `motionsites`, and count only validated bodies as complete.
- [ ] Add `<select id='source'>` with all content, MotionSites library, and community picks options beside existing filters.
- [ ] Add Chinese/English source labels, combined filtering, search over source fields, and a subtle community tag without pricing labels.
- [ ] Show original repository/file links in community details; keep metadata-only copy/export disabled.
- [ ] Run:

```bash
node scripts/build.js
node scripts/audit-catalog.js
```

Expected: `SELF-VERIFY OK records=505` and `AUDIT OK`.

- [ ] Commit:

```bash
git add scripts/build.js ms_template.html ms_script.js index.html
git commit -m 'feat: browse MotionSites and community prompt libraries'
```
### Task 6: Update professional repository documentation

**Files:**
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`
- Modify: `scripts/README.md`

- [ ] Document verified totals: 505 records, 466 complete bodies, 140 community entries, and 39 metadata-only entries.
- [ ] Document CC0 prompt licensing, MIT project code, preview source notice, and `data/catalog_sources.json`.
- [ ] Document the reproducible commands:

```bash
node --test scripts/tests/*.test.js
node scripts/import-community.js
node scripts/audit-catalog.js
node scripts/build.js
```

- [ ] State that `sources/` is ignored and never part of the public clone.
- [ ] Commit with `git commit -m 'docs: document expanded catalog and provenance'`.

### Task 7: Run full local acceptance verification

**Files:**
- Verify: all changed files

- [ ] Run automated checks:

```bash
node --test scripts/tests/*.test.js
node scripts/audit-catalog.js
node scripts/build.js
git diff --check
git status --short
```

- [ ] Start `python -m http.server 8000 --bind 127.0.0.1` from `C:\ms_open`.
- [ ] Verify Chinese default UI, English toggle, source/category/type/media filters, search, existing videos, all new local previews, prompt copy feedback, Markdown export, and metadata-only disabled controls.
- [ ] Confirm the browser console has no errors and no local asset request returns 404.
- [ ] Run `git count-objects -vH` and list files over 24 MiB; expect no deployable asset above the limit and no tracked `sources/` path.

Do not merge, push, or deploy until the branch passes every local check and the user reviews the local application.
