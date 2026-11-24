# Scripts

Build, audit and verification tooling for the catalogue. Node 18+, no dependencies.

| Script | What it does |
|---|---|
| `build.js` | Renders `index.html` from `ms_template.html` and writes `data/catalog-*.json` plus one text file per card. Deterministic; asserts its own invariants. |
| `audit-catalog.js` | Unique ids, body-to-metadata matching, prompt quality, source references, asset existence, orphan detection. Non-zero exit on any violation. |
| `verify-assets.js` | Every referenced preview: exists, larger than 2 KB, and starts with the magic bytes its extension claims (webp / png / jpeg / mp4 / webm). |
| `verify_previews.py` | Browser sweep: walks the whole grid, samples scroll checkpoints for decoded visible images, then probes every media URL. Local or live. |
| `verify_live_sample.py` | Samples N previews from a deployed site and decodes each in a fresh `Image()`, separating "broken asset" from "slow link". |
| `normalize-categories.js` | Collapses category synonyms onto the canonical labels. |
| `dedupe-catalog.js` | Drops duplicate ids after an import. |
| `cleanup-cards.js` | Prunes cards with no preview or no body. |
| `convert_preview.py` | Crops and resizes any image into a 1280×800 webp cover. |
| `import-community.js` | Import helpers kept for the test suite (fixtures under `scripts/tests/fixtures/`). |
| `lib/catalog-utils.js` | Markdown prompt extraction, hashing, asset-kind detection, audit rules. |
| `tests/*.test.js` | `node --test` suites; hermetic, run against committed fixtures. |

## Build flow

```bash
node scripts/build.js
node scripts/audit-catalog.js
node scripts/verify-assets.js
node --test scripts/tests/*.test.js
```

## Adding a card

1. Put a 1280×800 cover at `assets/previews/<id>.webp`.
2. Append a record to `data/ms_prompts_merged.json` and its body to `data/ms_prompts_with_text.json` (same `id`).
3. Rebuild, audit, commit the data + preview + regenerated `index.html`.

One-off importers from earlier expansions live in `archive/` (git-ignored) and are not part of the build.
