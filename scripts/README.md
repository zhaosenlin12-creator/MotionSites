# `scripts/`

This directory ships **one script** — everything else runs through `build.js`.

## `build.js`

Regenerates the single-file `index.html` catalog from the bundled data files.

```bash
node scripts/build.js
# -> Records=364 complete=328 images=175 videos=73 concepts=111
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