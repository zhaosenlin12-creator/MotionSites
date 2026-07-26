#!/usr/bin/env node
// Apply category normalization to both data files.
//
// Usage:  node scripts/normalize-categories.js

const fs = require('node:fs');
const path = require('node:path');
const { applyCategoryNormalization } = require('./lib/category-utils');

const ROOT = path.resolve(__dirname, '..');

const beforeMerged = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/ms_prompts_merged.json'), 'utf8').replace(/^\uFEFF/, ''));
const beforeText = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/ms_prompts_with_text.json'), 'utf8').replace(/^\uFEFF/, ''));

function summarize(records) {
  const cats = new Map();
  for (const r of records) {
    const k = (r.category || '').trim();
    cats.set(k, (cats.get(k) || 0) + 1);
  }
  return cats;
}

function diffSummary(before, after) {
  const beforeMap = summarize(before);
  const afterMap = summarize(after);
  const keys = new Set([...beforeMap.keys(), ...afterMap.keys()]);
  const merged = {};
  for (const k of keys) {
    merged[k] = { before: beforeMap.get(k) || 0, after: afterMap.get(k) || 0 };
  }
  return Object.entries(merged)
    .filter(([, v]) => v.before !== v.after)
    .sort((a, b) => (b[1].before + b[1].after) - (a[1].before + a[1].after));
}

const summary = applyCategoryNormalization({ root: ROOT });

const afterMerged = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/ms_prompts_merged.json'), 'utf8').replace(/^\uFEFF/, ''));
const afterText = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/ms_prompts_with_text.json'), 'utf8').replace(/^\uFEFF/, ''));

const distinctBefore = summarize(beforeText).size;
const distinctAfter = summarize(afterText).size;

console.log('normalized ' + summary.totalTouched + ' records');
console.log('distinct categories: ' + distinctBefore + ' -> ' + distinctAfter);
console.log('merged changes (top 30):');
diffSummary(beforeMerged, afterMerged).slice(0, 30).forEach(([k, v]) => {
  console.log('  ' + v.before + ' -> ' + v.after + '  ' + JSON.stringify(k));
});
console.log('text changes (top 30):');
diffSummary(beforeText, afterText).slice(0, 30).forEach(([k, v]) => {
  console.log('  ' + v.before + ' -> ' + v.after + '  ' + JSON.stringify(k));
});
