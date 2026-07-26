# `scripts/`

This directory ships the catalog build, import, and audit pipeline.

## `build.js`

Regenerates the single-file `index.html` catalog from the bundled data files.

```bash
node scripts/build.js
# -> Records=505 complete=466 images=306 videos=87 concepts=112 motionsites=365 community=140
# -> Wrote index.html bytes <size>
# -> [build] demoting over-limit preview <filename>
# -> SELF-VERIFY OK records=364
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

## `audit-catalog.js`

Verifies uniqueness, body quality, source references, and the 24 MiB asset cap:

```bash
node scripts/audit-catalog.js
# -> AUDIT OK records=505 complete=466 community=140 missingBodies=39 assets=393
```

Exit code is non-zero on any rule violation. The script is the gate for the deployment pipeline.

## `lib/catalog-utils.js`

Shared utilities (Markdown parsing, prompt hashing, asset-kind detection, source-aware completeness rules). All exportable; covered by `node --test scripts/tests/*.test.js`.