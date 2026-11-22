const fs = require('node:fs');
const path = require('node:path');

const {
  auditCatalog,
  isCompletePrompt,
  readJson,
} = require('./lib/catalog-utils');

function main() {
  const root = path.resolve(__dirname, '..');
  const merged = readJson(path.join(root, 'data', 'ms_prompts_merged.json'));
  const prompts = readJson(path.join(root, 'data', 'ms_prompts_with_text.json'));

  // The curated recipe pack is a second source of cards: fold it in so the audit
  // covers everything the site actually publishes.
  const recipePath = path.join(root, 'data', 'recipe_pack.json');
  const recipes = fs.existsSync(recipePath) ? readJson(recipePath) : [];
  const recipeMeta = recipes.map((recipe) => ({
    id: recipe.id,
    source_kind: 'recipes',
    local_rel: 'assets/previews/' + recipe.id + '.mp4',
    poster_rel: 'assets/previews/' + recipe.id + '.webp',
  }));
  const recipePrompts = recipes.map((recipe) => ({ id: recipe.id, prompt_text: recipe.prompt }));

  const allMerged = merged.concat(recipeMeta);
  const allPrompts = prompts.concat(recipePrompts);

  const sourcesPath = path.join(root, 'data', 'catalog_sources.json');
  const sources = fs.existsSync(sourcesPath) ? readJson(sourcesPath) : [];
  const result = auditCatalog({ root, merged: allMerged, prompts: allPrompts, sources });

  if (result.errors.length) {
    for (const error of result.errors) {
      const detail = [error.code, error.id, error.path].filter(Boolean).join(' ');
      console.error(`AUDIT ERROR ${detail}`);
    }
    console.error(`AUDIT FAIL errors=${result.errors.length}`);
    process.exit(1);
  }

  const promptById = new Map(allPrompts.map((p) => [p.id, p]));
  const complete = allMerged.filter((record) => {
    const prompt = promptById.get(record.id);
    if (!prompt) return false;
    return isCompletePrompt(prompt.prompt_text || '', { source_kind: record.source_kind });
  }).length;
  const community = allMerged.filter((record) => record.source_kind === 'community').length;
  const recipeCount = allMerged.filter((record) => record.source_kind === 'recipes').length;
  const missingBodies = allMerged.length - complete;
  const assets = allMerged.filter((record) => !!record.local_rel).length;
  console.log(
    `AUDIT OK records=${allMerged.length} complete=${complete} recipes=${recipeCount} community=${community} ` +
    `missingBodies=${missingBodies} assets=${assets}`
  );
}

main();
