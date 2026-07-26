// Category normalization for the MotionSites catalog.
const fs2 = require('node:fs');
const path2 = require('node:path');

const NORMALIZE_MAP = Object.freeze({
  'landing page': 'Landing Page',
  'landing pages': 'Landing Page',
  'landingpage': 'Landing Page',
  'hero': 'Hero Section',
  'hero section': 'Hero Section',
  'pricing': 'Pricing Page',
  'pricing page': 'Pricing Page',
  'pricing pages': 'Pricing Page',
  'features': 'Features Section',
  'feature': 'Features Section',
  'features section': 'Features Section',
  'cta': 'CTA Section',
  'cta section': 'CTA Section',
  'footer': 'Footer Section',
  'footer section': 'Footer Section',
  'form': 'Forms & Contact',
  'forms': 'Forms & Contact',
  'forms & contact': 'Forms & Contact',
  'contact us': 'Forms & Contact',
  'contact': 'Forms & Contact',
  'faq': 'FAQ & Help',
  'testimonial': 'Testimonials',
  'testimonials': 'Testimonials',
  'about': 'About Section',
  'about section': 'About Section',
  'blog': 'Blog & Editorial',
  'blog & editorial': 'Blog & Editorial',
  'waitlist': 'Waitlist & Coming Soon',
  'coming soon': 'Waitlist & Coming Soon',
  'waitlist & coming soon': 'Waitlist & Coming Soon',
  'signup': 'Waitlist & Coming Soon',
  'sign up': 'Waitlist & Coming Soon',
  'sign in form': 'Waitlist & Coming Soon',
  'auth': 'Auth & Login',
  'auth & login': 'Auth & Login',
  'login': 'Auth & Login',
  'sign in': 'Auth & Login',
  'onboarding': 'Onboarding',
  'email marketing': 'Email & Newsletter',
  'email & newsletter': 'Email & Newsletter',
  'email newsletter': 'Email & Newsletter',
  'newsletter': 'Email & Newsletter',
  'component': 'Components',
  'components': 'Components',
  'card': 'Cards',
  'cards': 'Cards',
  'accordion': 'Components',
  'tabs': 'Components',
  'slider': 'Components',
  'carousel': 'Components',
  'carousal': 'Components',
  'marquee': 'Components',
  'bento': 'Components',
  'design systems & styles': 'Design Systems & Styles',
  'design systems styles': 'Design Systems & Styles',
  'design systems': 'Design Systems & Styles',
  'animations & backgrounds': 'Animations & Backgrounds',
  'animations backgrounds': 'Animations & Backgrounds',
  'animations': 'Animations & Backgrounds',
  'saas': 'SaaS',
  'saas website': 'SaaS',
  'ai / saas': 'SaaS',
  'ai saas website': 'SaaS',
  'learning saas': 'SaaS',
  'ai': 'AI Apps',
  'ai app': 'AI Apps',
  'ai chat': 'AI Apps',
  'artificial intelligence': 'AI Apps',
  'ai apps': 'AI Apps',
  'fintech': 'Fintech',
  'ecommerce': 'E-commerce',
  'ecommerce app': 'E-commerce',
  'e-commerce': 'E-commerce',
  'travel': 'Travel',
  'travel app': 'Travel',
  'booking': 'Travel',
  'health': 'Healthcare',
  'healthcare': 'Healthcare',
  'health app': 'Healthcare',
  'medicine': 'Healthcare',
  'wellness': 'Wellness',
  'mindfulness': 'Wellness',
  'fashion': 'E-commerce',
  'food': 'Food & Drink',
  'food & drink': 'Food & Drink',
  'real estate': 'Real Estate',
  'education': 'Education',
  'education website': 'Education',
  'learning': 'Education',
  'sports': 'Sports',
  'music': 'Music',
  'entertainment': 'Entertainment',
  'automotive': 'Automotive',
  'transportation': 'Transportation',
  'sustainability': 'Sustainability',
  'community app': 'Community',
  'community': 'Community',
  'church': 'Community',
  'social media': 'Social Media',
  'productivity': 'Productivity',
  'developer': 'Developer',
  'developer platform': 'Developer',
  'cybersecurity': 'Cybersecurity',
  'vpn': 'Cybersecurity',
  'hr management': 'HR',
  'loyalty app': 'Loyalty',
  'technology': 'Technology',
  'mobile app': 'Mobile App',
  'mobile apps': 'Mobile App',
  'app': 'Mobile App',
  'statistics app': 'Mobile App',
  '3d website': '3D Website',
  'dashboard': 'Dashboards',
  'dashboards': 'Dashboards',
  'dashboard demo': 'Dashboards',
  'portfolio': 'Portfolio',
  'portfolios': 'Portfolio',
  'agency': 'Agency',
  'agency website': 'Agency',
  'process': 'Process & Stats',
  'process & stats': 'Process & Stats',
  'stats': 'Process & Stats',
  'statistics': 'Process & Stats',
  'why us': 'Why Us',
  'use case': 'Use Cases',
  'use cases': 'Use Cases',
  'benefits': 'Benefits',
  'services': 'Services',
  'products': 'Products',
  'product': 'Products',
  'projects': 'Projects',
  'case studies': 'Case Studies',
  'investor presentations': 'Presentations',
  'presentation': 'Presentations',
  'presentations': 'Presentations',
  'interactive': 'Interactive',
  'calendar': 'Calendars',
  'calendars': 'Calendars',
  'info': 'Info',
  'categories': 'Categories',
  'website': 'Website',
  '404': '404 Pages',
  'web3': 'Web3',
  'driving': 'Driving',
  'other': 'Other'
});

function titleCase(part) {
  if (!part) return part;
  if (/^\s+$/.test(part)) return part;
  if (part === '&') return part;
  if (part.length > 1 && part.toUpperCase() === part) return part;
  return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
}

function isPlainString(value) {
  return typeof value === 'string';
}

function normalizeCategory(input) {
  if (input == null) return '';
  if (typeof input === 'number') {
    if (!Number.isFinite(input)) return '';
    return String(input);
  }
  if (typeof input === 'boolean') return input ? 'Yes' : 'No';
  if (!isPlainString(input)) return '';
  const trimmed = input.trim();
  if (!trimmed) return '';
  const key = trimmed.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(NORMALIZE_MAP, key)) {
    return NORMALIZE_MAP[key];
  }
  return trimmed.split(/(\s+)/).map(titleCase).join('');
}

function normalizeRecordCategories(records) {
  if (!Array.isArray(records)) return records;
  return records.map(function(record) {
    if (!record || typeof record !== 'object') return record;
    if (!('category' in record)) return record;
    const next = normalizeCategory(record.category);
    if (next === record.category) return record;
    return Object.assign({}, record, { category: next });
  });
}

function applyCategoryNormalization(opts) {
  const root = opts && opts.root;
  if (!root) throw new Error('applyCategoryNormalization: root required');
  const targets = [
    'data/ms_prompts_merged.json',
    'data/ms_prompts_with_text.json'
  ];
  let totalTouched = 0;
  for (const rel of targets) {
    const abs = path2.join(root, rel);
    if (!fs2.existsSync(abs)) continue;
    const raw = JSON.parse(fs2.readFileSync(abs, 'utf8').replace(/^\uFEFF/, ''));
    const next = normalizeRecordCategories(raw);
    fs2.writeFileSync(abs, JSON.stringify(next, null, 2) + '\n', 'utf8');
    totalTouched += next.length;
  }
  return { totalTouched: totalTouched };
}

module.exports = {
  NORMALIZE_MAP: NORMALIZE_MAP,
  applyCategoryNormalization: applyCategoryNormalization,
  normalizeCategory: normalizeCategory,
  normalizeRecordCategories: normalizeRecordCategories
};
