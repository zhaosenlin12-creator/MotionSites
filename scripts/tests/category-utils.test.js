const test = require('node:test');
const assert = require('node:assert/strict');
const {
  NORMALIZE_MAP,
  normalizeCategory,
  normalizeRecordCategories,
} = require('../lib/category-utils');

test('normalizeCategory collapses equivalent forms to a canonical label', () => {
  assert.equal(normalizeCategory('Landing Page'), 'Landing Page');
  assert.equal(normalizeCategory('Landing Pages'), 'Landing Page');
  assert.equal(normalizeCategory('landing page'), 'Landing Page');
  assert.equal(normalizeCategory('Landing page'), 'Landing Page');

  assert.equal(normalizeCategory('Hero'), 'Hero Section');
  assert.equal(normalizeCategory('Hero Section'), 'Hero Section');

  assert.equal(normalizeCategory('SaaS'), 'SaaS');
  assert.equal(normalizeCategory('AI / SaaS'), 'SaaS');
  assert.equal(normalizeCategory('AI SaaS Website'), 'SaaS');
  assert.equal(normalizeCategory('AI'), 'AI Apps');
  assert.equal(normalizeCategory('AI App'), 'AI Apps');
  assert.equal(normalizeCategory('Artificial Intelligence'), 'AI Apps');

  assert.equal(normalizeCategory('E-commerce'), 'E-commerce');
  assert.equal(normalizeCategory('Ecommerce'), 'E-commerce');
  assert.equal(normalizeCategory('Ecommerce App'), 'E-commerce');

  assert.equal(normalizeCategory('Portfolio'), 'Portfolio');
  assert.equal(normalizeCategory('Portfolios'), 'Portfolio');

  assert.equal(normalizeCategory('Component'), 'Components');
  assert.equal(normalizeCategory('Components'), 'Components');

  assert.equal(normalizeCategory('Testimonial'), 'Testimonials');
  assert.equal(normalizeCategory('Testimonials'), 'Testimonials');

  assert.equal(normalizeCategory('Form'), 'Forms & Contact');
  assert.equal(normalizeCategory('Forms & Contact'), 'Forms & Contact');

  assert.equal(normalizeCategory('Pricing'), 'Pricing Page');
  assert.equal(normalizeCategory('Pricing Page'), 'Pricing Page');
  assert.equal(normalizeCategory('Pricing Pages'), 'Pricing Page');

  assert.equal(normalizeCategory('Dashboard'), 'Dashboards');
  assert.equal(normalizeCategory('Dashboards'), 'Dashboards');
  assert.equal(normalizeCategory('Dashboard Demo'), 'Dashboards');

  assert.equal(normalizeCategory('Sign In Form'), 'Waitlist & Coming Soon');
  assert.equal(normalizeCategory('Waitlist'), 'Waitlist & Coming Soon');
  assert.equal(normalizeCategory('Coming Soon'), 'Waitlist & Coming Soon');

  assert.equal(normalizeCategory('Design Systems & Styles'), 'Design Systems & Styles');
  assert.equal(normalizeCategory('Design Systems Styles'), 'Design Systems & Styles');

  assert.equal(normalizeCategory('Animations & Backgrounds'), 'Animations & Backgrounds');
  assert.equal(normalizeCategory('Animations Backgrounds'), 'Animations & Backgrounds');

  assert.equal(normalizeCategory('Email & Newsletter'), 'Email & Newsletter');
  assert.equal(normalizeCategory('Email Newsletter'), 'Email & Newsletter');
  assert.equal(normalizeCategory('Email Marketing'), 'Email & Newsletter');
  assert.equal(normalizeCategory('Newsletter'), 'Email & Newsletter');
});

test('normalizeCategory preserves acronyms and applies Title Case as fallback', () => {
  assert.equal(normalizeCategory('SaaS'), 'SaaS');
  assert.equal(normalizeCategory('CTA'), 'CTA Section');
  assert.equal(normalizeCategory('AI'), 'AI Apps');
  assert.equal(normalizeCategory('  Some new Category  '), 'Some New Category');
  assert.equal(normalizeCategory('quiet'), 'Quiet');
});

test('normalizeCategory handles empty and nullish inputs', () => {
  assert.equal(normalizeCategory(''), '');
  assert.equal(normalizeCategory('   '), '');
  assert.equal(normalizeCategory(null), '');
  assert.equal(normalizeCategory(undefined), '');
});

test('NORMALIZE_MAP is frozen and case-insensitive keys', () => {
  assert.equal(Object.isFrozen(NORMALIZE_MAP), true);
  for (const [key, value] of Object.entries(NORMALIZE_MAP)) {
    assert.ok(key === key.toLowerCase(), 'map key should be lowercase: ' + key);
    assert.ok(value.length > 0, 'map value should be non-empty: ' + key);
  }
});

test('normalizeRecordCategories mutates only changed categories', () => {
  const records = [
    { id: 'a', category: 'Landing Pages' },
    { id: 'b', category: 'Landing Page' },
    { id: 'c', category: 'SaaS' },
  ];
  const out = normalizeRecordCategories(records);
  assert.equal(out[0].category, 'Landing Page');
  assert.strictEqual(out[1], records[1]);
  assert.equal(out[2].category, 'SaaS');
});

test('normalizeRecordCategories preserves unrelated fields', () => {
  const records = [
    { id: 'a', title: 'Foo', category: 'Ecommerce App', source_kind: 'motionsites' },
  ];
  const out = normalizeRecordCategories(records);
  assert.equal(out[0].id, 'a');
  assert.equal(out[0].title, 'Foo');
  assert.equal(out[0].source_kind, 'motionsites');
  assert.equal(out[0].category, 'E-commerce');
});
