#!/usr/bin/env node
// Apply category normalization to both data files.
//
// Usage:  node scripts/normalize-categories.js [--quiet]
//
// Exit codes:
//   0 - normal (changes or no changes)
//   2 - missing input file (data/ms_prompts_*.json)
//   3 - malformed JSON

const fs = require('node:fs');
const path = require('node:path');
const { applyCategoryNormalization } = require('./lib/category-utils');

const ROOT = path.resolve(__dirname, '..');
const QUIET = process.argv.includes('--quiet');

function readJsonSafe(absPath) {
  if (!fs.existsSync(absPath)) {
    if (!QUIET) console.error('missing input file:', path.relative(ROOT, absPath));
    process.exit(2);
  }
  try {
    return JSON.parse(fs.readFileSync(absPath, 'utf8').replace(/^\uFEFF/, ''));
  } catch (e) {
    if (!QUIET) console.error('malformed JSON in', path.relative(ROOT, absPath), '-', e.message);
    process.exit(3);
  }
}

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
    .filter(function([, v]) { return v.before !== v.after; })
    .sort(function(a, b) { return (b[1].before + b[1].after) - (a[1].before + a[1].after); });
}

const beforeMerged = readJsonSafe(path.join(ROOT, 'data/ms_prompts_merged.json'));
const beforeText = readJsonSafe(path.join(ROOT, 'data/ms_prompts_with_text.json'));

const summary = applyCategoryNormalization({ root: ROOT });

const afterMerged = readJsonSafe(path.join(ROOT, 'data/ms_prompts_merged.json'));
const afterText = readJsonSafe(path.join(ROOT, 'data/ms_prompts_with_text.json'));

const distinctBefore = summarize(beforeText).size;
const distinctAfter = summarize(afterText).size;

if (!QUIET) {
  console.log('normalized ' + summary.totalTouched + ' records');
  console.log('distinct categories: ' + distinctBefore + ' -> ' + distinctAfter);
  console.log('merged changes (top 30):');
  diffSummary(beforeMerged, afterMerged).slice(0, 30).forEach(function([k, v]) {
    console.log('  ' + v.before + ' -> ' + v.after + '  ' + JSON.stringify(k));
  });
  console.log('text changes (top 30):');
  diffSummary(beforeText, afterText).slice(0, 30).forEach(function([k, v]) {
    console.log('  ' + v.before + ' -> ' + v.after + '  ' + JSON.stringify(k));
  });
}

if (distinctAfter > distinctBefore) {
  if (!QUIET) console.warn('WARN: distinct categories grew (' + distinctBefore + ' -> ' + distinctAfter + ')');
}
process.exit(0);
