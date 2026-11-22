# Source scouting — what else can feed this catalog

The catalog is built from public prompt libraries and public preview media, with a per-record
licence and source URL. This note records which adjacent sources were evaluated in November 2026,
what is actually extractable without an account, and why some were rejected. It exists so the next
contributor does not repeat the probing or accidentally cross a paywall.

Ground rules that apply to every source below:

- No login, token, paid plan or OAuth flow is ever used.
- Preview media must be publicly downloadable (HTTP 200, no auth).
- Each record needs a prompt body — a pretty screenshot alone cannot become a card.
- The licence must allow archival with attribution (MIT / CC0 / Apache-2.0 / public web standard).

## Ingested

| Source | Licence | Records here | How | Status |
|---|---|---|---|---|
| `motionsites.ai` public catalog (2026 seed) | archived public excerpts | 296 | original scrape + public GitHub markdown exports, previews bundled locally | shipped |
| `superdesigndev/superdesign-prompts` | MIT (repo `LICENSE`) | 61 | `scripts/import-superdesign-repo.js` from a local clone; README front-matter + `## Prompt` block + `preview.*` asset, converted to 16:10 webp covers | shipped |
| `morluto/rea` + `storytold/craft-anything` | MIT / Apache-2.0 | 44 recipes | original prompt synthesis, locally rendered previews | shipped, see [recipe-pack.md](recipe-pack.md) |
| `superdesigndev/superdesign-prompts` (earlier snapshot) | MIT | — | legacy `superdesign_fetch/prompts.json` path in `scripts/import-community.js` | superseded by the repo importer |

## Evaluated — feasible next, not ingested yet

| Source | Licence | Candidate records | Blocker / cost |
|---|---|---|---|
| `kenje24/rebirth-motionsitesprompt` | MIT | 93 HorizonX + 93 21st.dev records with committed webp/mp4 previews; 470 extra MotionSites-style bodies | repo inventory is large; prompts average ~113 words (below the 120-word quality bar for several), so curation is needed |
| `gradeoin/motionsites.ai-prompt-library`, `xiiiabu/motionsites.ai` | MIT | ~65 free prompts each with `assets/videos/*.mp4` previews | mostly duplicates of prompts already archived via the gigl mirror (48 of 66 already present); ~18 incremental free prompts, 67 Pro bodies are text-only |
| `giglianepefrei/motionsites.ai-prompt-library` | MIT | 66 free + 67 Pro prompt bodies | text-only archive; the local clone in `sources/` is partial because the repo also ships demo media |
| `21st.dev` | per-contributor, not an OSI licence | 12,000+ claimed; SSR title/description/author + `cdn.21st.dev` webp previews | component source/prompt is gated behind an account; metadata-only records cannot become cards here |
| Codrops demo repos | MIT (per-demo check) | hundreds of effects | each card would need a locally rendered preview + an original prompt; good future "recipe" source |

## Rejected, with evidence

- **motionsites.ai live catalog** — no public listing endpoint (`/api/prompts`, `/api/catalog`, `/api/prompts/count` → 404), `sitemap.xml` has zero per-record URLs, and bodies are login/paywalled (`/api/mcp` → 401, "free accounts can open 3 free prompts"). Preview media on `pub-86dc5b5484314368ac5436a674b0d919.r2.dev`, `images.higgs.ai` and `d8j0ntlcm91z4.cloudfront.net` is public and hotlinkable, so it is used only for preview rebuilds of already-archived bodies. **The paywall is not bypassed.**
- **Figma Community** — search pages hydrate client-side; a file page (`/community/file/1293853194619288804`) returns HTTP 403 from CloudFront to non-browser clients, so title/author/cover/licence cannot be read. Free files are CC BY 4.0, paid files use Figma's paid-resource licence (no redistribution); covers are publisher-owned. Not viable without the Figma API token or an authenticated browser, and bulk harvesting would need legal review.
- **`xianxian-sensen/motionsites-prompts`** — Unlicense, 328 bodies, zero preview fields (text-only).
- **`a113101007/…mirror-deploy`** — MIT, but 470 bodies have null previews and 191 preview-only entries have no body: no record satisfies both.
- **`nomaan5541/motionsites-prompt-collection`** — HTTP 451 (unavailable for legal reasons).
- **Aceternity UI / 21st.dev component source** — no OSI licence file for the component library; excluded from provenance.
- **Shadertoy** — default CC BY-NC-SA (non-commercial); no shader source is cited anywhere in the packs.

## How to add a source

1. Pick a source whose licence allows archival with attribution. Record it in `data/catalog_sources.json`.
2. Write an importer in `scripts/` that produces, per record: `id`, `title`, `description`, `category`, `type`, `tags`, `local_rel` (a downloaded preview), `source_id`, `source_repo`, `source_url`, `source_license`, and the prompt body.
3. Download previews into `assets/community/<source>/<slug>/` (webp or mp4, <= 24 MiB — the build rejects anything larger), and convert images to a 16:10 1280x800 webp cover so cards stay visually consistent.
4. Append records to `data/ms_prompts_merged.json` and bodies to `data/ms_prompts_with_text.json`, then run `node scripts/build.js && node scripts/audit-catalog.js`.
5. Dedupe by `source_id` + slug and by normalised title before writing.

`scripts/import-superdesign-repo.js` is the reference implementation (front-matter parsing, body extraction, preview conversion, licence normalisation, idempotent merge).
