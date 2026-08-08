# `scripts/`

This directory ships the catalog build, import, and audit pipeline.

## `build.js`

Regenerates the single-file `index.html` catalog from the bundled data files.

```bash
node scripts/build.js
# -> Records=504 complete=476 images=173 videos=106 concepts=224 motionsites=365 community=139
# -> Wrote index.html bytes <size>
# -> [build] demoting over-limit preview <filename>
# -> SELF-VERIFY OK records=504
```

The script is **idempotent** — re-running it does not duplicate records.
Records are deduped by `id`. It also auto-demotes any preview over the
Cloudflare Pages 25 MiB per-file cap so the deployed site never references
a file the host will silently replace with an HTML error page.

## When do you run it?

- After editing `data/ms_prompts_merged.json`
- After editing `data/ms_prompts_with_text.json`
- After dropping a new preview into `assets/previews/<id>.webp`

You do **not** need to run it to use the catalog — `index.html` is
pre-generated and shipped as part of the repo.

## Adding a prompt

1. Append a record to **both** JSON files with the same `id`.
2. Drop a preview into `assets/previews/<id>.webp` (and reference it as `local_rel`).
3. Re-run `node scripts/build.js`.
4. Commit and push.

See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the full workflow.

## `import-community.js`

Imports the community-picks library (default: `superdesigndev/superdesign-prompts`, CC0-1.0) and reconciles it with the local catalog.

```bash
node scripts/import-community.js          # dry-run, never writes
node scripts/import-community.js --write  # persists data + downloads previews
```

The script merges recovered MotionSites records, replaces short stubs with full prompt bodies, prefixes community IDs (`community-superdesign-<slug>`), and surfaces downloads that fail after retries so a single flaky network response cannot abort the entire import.

## `import-community.js` extended coverage

Beyond the community-superdesign picks, the importer now reads two additional sources:

- **akkikumar72/liro-prompts** (`MIT`) — fills paywall records with the repository's `working-prompt.md` reconstructions when a MotionSites item has no original body. Records filled this way carry `text_reconstructed: true`.
- **giglianepefrei/motionsites.ai-prompt-library** (`NOASSERTION`) — pulls free prompts from `sources/giglianepefrei_fetch/prompts/*.md`, downloads their preview videos via `ensureGiglPreviewAssets`, and de-duplicates against existing titles via `normalizeTitle` so slug-only differences do not create duplicates.

See `data/catalog_sources.json` for the full attribution list.

## `download-gigl-previews.js`

Downloads preview videos for the `giglianepefrei` free prompts. The CloudFront source
times out frequently, so the script:

- Runs in small batches (`GIGL_BATCH=6`, `GIGL_CONCURRENCY=2`) with a 20s per-attempt timeout.
- Persists results in `data/gigl-preview-log.json` so a timeout can resume cleanly.
- Skips files already on disk (>1 KiB) and reports hard 4xx/5xx failures.

Run order:

```bash
node scripts/import-community.js --write   # ingest prompt bodies + merge metadata
node scripts/download-gigl-previews.js     # fetch the preview videos (resumable)
node scripts/dedupe-catalog.js            # collapse title duplicates
node scripts/build.js                     # regenerate index.html
```
## `audit-catalog.js`

Verifies uniqueness, body quality, source references, and the 24 MiB asset cap:

```bash
node scripts/audit-catalog.js
# -> AUDIT OK records=503 complete=467 community=139 missingBodies=36 assets=431
```

Exit code is non-zero on any rule violation. The script is the gate for the deployment pipeline.

## `normalize-categories.js`

Collapses the 105 hand-curated / scraped `category` strings into ~58 canonical labels so the dropdown stays scannable. Source-of-truth: `lib/category-utils.js` (frozen map, 145 entries).

```bash
node scripts/normalize-categories.js
# -> normalized 980 records
# -> distinct categories: 105 -> 58
```

Idempotent — running it on already-normalized data is a no-op.

## `lib/category-utils.js`

Frozen `NORMALIZE_MAP` (145 entries) plus `normalizeCategory`, `normalizeRecordCategories`, and `applyCategoryNormalization`. Covered by 6 unit tests in `tests/category-utils.test.js`.

## `lib/catalog-utils.js`

Shared utilities (Markdown parsing, prompt hashing, asset-kind detection, source-aware completeness rules). All exportable; covered by `node --test scripts/tests/*.test.js`.