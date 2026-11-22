# Competitor teardown — how the other prompt libraries are built

*Probed 2026-11-22. Every line is tagged **observed** (seen in a response this repo received),
**inferred** (a conclusion drawn from an observation) or **unknown** (nothing was measured). The
distinction matters: a gallery that looks complete in a browser can be empty to a crawler, and a
repository that advertises 470 prompts can ship 12 real ones.*

This note exists so the next contributor starts from measurements instead of impressions, and so the
batch-2 expansion work has a written scope. It is the "look at the neighbours" half of the recipe
pack: the other half is [recipe-pack.md](recipe-pack.md).

---

## 1. What was probed, and what came back

| Site / repo | Licence claim | Records seen | Prompt bodies | Preview media | Verdict |
|---|---|---|---|---|---|
| `motionsites.ai` | commercial, paywalled | 296 already archived | partial, account-gated | public CDN, hotlinkable | **source of the seed catalog**, not re-harvestable (**observed**: `GET /` → 200, 35 542 bytes of client-rendered shell, zero `/prompt/` links in the HTML, three external `<img>` origins) |
| `xiiiabu/motionsites.ai` | MIT | 66 `prompts/*.md` | yes, full | `assets/videos/*.mp4`, up to 30 MB each | mirror of bodies we already hold; 33 of 81 tested slugs collide with our ids (**observed**: GitHub tree API, 166 blobs) |
| `DexZane/awesome-web-prompts` | MIT | 81 `prompt.md` | yes, 6–54 KB each | 5 `preview.png`, 16 self-contained `index.html` demos | **ingested in 1.4.1**: 20 cards (49 new slugs, 21 with a preview, 1 with no usable frame, 27 without any capture) |
| `gradeoin/motionsites.ai-prompt-library`, `xiiiabu` sibling mirrors | MIT | ~65 free each | yes | mp4 | duplicate of the gigl mirror we already ingested |
| `superdesigndev/superdesign-prompts` | MIT | 104 imported | yes | per-record `preview.png` | already shipped in 1.3.x |
| `kenje24/rebirth-motionsitesprompt` | MIT label | 661 record dirs (470 motionsites + 95 `dev21-` + 94 `hx-` + 5 `sup-`) | generated manifest is 4.7 MB | media in shared `assets/images` + `assets/videos`, **not** co-located per record | deferred: 420 slugs are new to us, but record→preview mapping needs their generated TypeScript catalog, and the `dev21-`/`hx-` corpora re-publish third-party component libraries |
| `Vivvidai/vividsites` | custom, non-OSI | 31 in `catalog.json` | yes, `chars` up to 133 994 | webp per prompt | **excluded**: the licence forbids repackaging the prompts into another pack or template store |
| `21st.dev` | per-contributor | 12 000+ claimed | gated behind an account | `cdn.21st.dev` webp | excluded: no OSI licence for the component library; metadata alone cannot become a card |
| `promptmotion.art` | mixed, per-author | 135 cases, 121 with a prompt | yes, quoted verbatim | poster webp + video | out of scope: AI **video** prompts; only its `/web-design` slice overlaps this catalog |
| Codrops demo repos | MIT per demo | hundreds | tutorial prose, not prompt bodies | demo source | keep as a recipe source, not a card source |

Two things generalise from the table:

- **A mirror is worth exactly what it adds after dedupe.** The four MotionSites mirrors advertise
  65–470 prompts each; measured against our 465 ids, the union of new, complete, preview-backed
  records is single digits per mirror.
- **The licence field decides, not the star count.** The largest and most polished candidate
  (`vividsites`) is the one whose licence refuses redistribution; the useful one
  (`awesome-web-prompts`) has 368 stars and an MIT file.

---

## 2. The information architecture they all converge on

Six independent libraries were read at the level of one record. The schemas differ in naming, not in
shape; every one of them is a **card = {identity, classification, prompt body, preview, provenance}**.

| Field | motionsites | superdesign | awesome-web-prompts | 21st.dev | Craft (our pack) |
|---|---|---|---|---|---|
| id | slug | slug | `id` (front-matter) | slug | `re-xx` / `cr-xx` / `sc-xx` |
| title | yes | yes | `name` | yes | yes |
| description | one line | one paragraph | `description.zh` + `.en` | one line | one line, zh |
| classification | category / type | `category` / `type` | `level` → `category` → `type` | category + tags | `category` + `type` + `tags` |
| stack | implicit | implicit | explicit `tech_stack[]` | implicit | implicit (the prompt names the library) |
| prompt body | account-gated | `## Prompt` block | `prompt.md` | copy button | `prompt` |
| preview | CDN mp4/webp | committed `preview.png` | optional `preview.png` or live `index.html` | CDN webp | locally rendered mp4 + webp |
| provenance | none | repo + author | `author`, `source_url` | author handle | `source.repo` + `ref` + licence |

Three conventions are worth stealing outright:

1. **`tech_stack[]` as a first-class field** (awesome-web-prompts). It turns a prompt into a
   dependency decision: React or vanilla, Three.js or CSS.
2. **`recommended_ai[]`** (same repo). The prompt is graded for a model, which is honest about the
   fact that a 30 KB prompt behaves differently in Claude Code and in a 4 k-context chat window.
3. **`level` before `category`** (`pages/` vs `sections/` vs `components/`). It is the only
   ordering that survives growth past a few hundred records, because "what am I rebuilding" is a
   coarser question than "which industry is this page for".

What none of them do, and this catalog does: **ship the acceptance criteria inside the prompt**. A
prompt that ends with `Acceptance:` can be checked; a prompt that ends with "make it premium" cannot.
That difference is the whole recipe pack.

---

## 3. What the card bodies actually look like

Reading 40 bodies across the sources, the same five-slot template appears, with very different
levels of rigour:

```
1. subject      what the page is, in one sentence, with the brand or the product it sells
2. structure    sections in order, each with its content type and grid behaviour
3. motion       what moves, on what trigger, with numbers or nothing
4. constraints  responsive rule, reduced-motion rule, performance budget
5. acceptance   how a reviewer proves it works
```

- Slot 3 is where the paid libraries earn their money: a body that says "GSAP timeline, 0.9 s,
  power3.out, 120 ms stagger" is reproducible; "smooth animations" is not.
- Slot 5 is usually missing in the wild. Of the 40 bodies read, 6 carried any checkable end state,
  and none of the six stated a *failure* condition.
- Slot 1 is where Chinese-language collections are strongest: the `description.zh` field of
  awesome-web-prompts is more specific than the English one on 8 of 10 sampled records.

**Inferred**: the market gap this catalog fills is not "more prompts", it is "prompts whose result
can be judged". Hence the 1.4.0 expansion adds measurement recipes (the `rea` track) and build
recipes with parity checks (the `craft` track), not another 200 landing-page descriptions.

---

## 4. Reproducing the probe

Everything above is repeatable without an account:

```bash
# repository inventories (no clone, no token needed for public repos at this rate limit)
curl -s "https://api.github.com/repos/DexZane/awesome-web-prompts/git/trees/HEAD?recursive=1"

# licence of a candidate before ingesting anything
curl -s "https://raw.githubusercontent.com/Vivvidai/vividsites/HEAD/LICENSE.md"

# which slugs are actually new against this catalog
node -e "const ids=new Set(require('./data/catalog-meta.json').map(r=>r.id));console.log(ids.size)"
```

Rules that produced the verdicts, unchanged from [source-scouting.md](source-scouting.md): no login,
no token, no paid plan, preview media must answer HTTP 200 without auth, and the licence must allow
archival with attribution.

---

## 5. Open questions

- `kenje24` holds 420 record slugs that are new here. Settling it needs their
  `src/data/prompts.generated.ts` manifest to map each slug to a preview file, plus a decision on
  whether the `dev21-`/`hx-` re-publications belong in a catalogue that claims per-record licences.
  **Unknown** until that manifest is parsed against our id set.
- `motionsites.ai` bodies remain account-gated. Nothing here goes near that wall; the 296 seeded
  records stay as archived.
- Whether `level` (`page` / `section` / `component`) should be promoted into the catalog's own
  filters. The current `type` field already encodes it loosely, so this is a UI decision, not a data
  one.
