const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildCommunityId,
  mergeImportedData,
} = require('../import-community');

test('prefixes community slugs with a stable id', () => {
  assert.equal(buildCommunityId('high-contrast-landing-page'), 'community-superdesign-high-contrast-landing-page');
});

test('replaces short acreage stub, adds celestia, and appends community prompts', () => {
  const merged = [
    { id: 'acreage-farming-hero', title: 'Acreage Farming', has_text: true, text_len: 124 },
    { id: 'wisa-space-hero', title: 'WISA Space', has_text: true, text_len: 37 },
  ];
  const prompts = [
    { id: 'acreage-farming-hero', prompt_text: 'short stub' },
    { id: 'wisa-space-hero', prompt_text: 'Prompt available on the source page.' },
  ];
  const result = mergeImportedData({
    merged,
    prompts,
    recovered: [
      {
        id: 'acreage-farming-hero',
        title: 'Acreage Farming',
        category: 'Landing Page',
        type: 'landing-page',
        page_type: 'landing',
        description: 'Recovered MotionSites record',
        prompt_text: 'Build a premium agricultural website. '.repeat(20),
      },
      {
        id: 'celestia-hero',
        title: 'Celestia Hero',
        category: 'Hero',
        type: 'hero',
        page_type: 'hero',
        description: 'New recovered record',
        prompt_text: 'Build a premium space landing page. '.repeat(20),
      },
    ],
    community: [
      {
        slug: 'high-contrast-landing-page',
        title: 'High Contrast Landing Page',
        category: 'Landing Pages',
        type: 'landing-page',
        description: 'Community prompt',
        prompt_text: 'Create a high-contrast landing page. '.repeat(20),
      },
    ],
  });

  assert.equal(result.stats.replaced, 1);
  assert.equal(result.stats.addedRecovered, 1);
  assert.equal(result.stats.addedCommunity, 1);
  assert.equal(result.promptMap.get('acreage-farming-hero').prompt_text.includes('premium agricultural website'), true);
  assert.equal(result.promptMap.has('wisa-space-hero'), false);
  assert.equal(result.mergedMap.has('celestia-hero'), true);
  assert.equal(result.mergedMap.has('community-superdesign-high-contrast-landing-page'), true);
});
