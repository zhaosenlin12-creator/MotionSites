// =======================================================
// MotionSites Prompts - Client script (i18n + perf hardened)
// =======================================================

// -------- i18n (default zh-CN) --------
const I18N = {
  'zh-CN': {
    searchPlaceholder: '搜索标题、描述、提示词…',
    allCategories: '全部分类',
    allTypes: '全部类型',
    allFormats: '全部格式',
    staticMotion: '动/静态图',
    video: '视频',
    concept: '概念图',
    compact: '紧凑',
    compactView: '紧凑视图',
    standardView: '标准视图',
    fullPrompt: '完整提示词',
    metadataOnly: '仅元数据',
    image: '图片',
    visual: '视觉',
    copy: '复制提示词',
    copiedShort: '✓ 已复制',
    copyDone: '已复制到剪贴板',
    copyFail: '复制失败，请手动选中',
    export: '导出 .md',
    exportDone: '已导出',
    noFullPrompt: '该条目暂无完整提示词。',
    noFullPromptHint: '原站未发布正文——以下为可用的元数据与来源。',
    metaSection: '可用元数据',
    metaSource: '来源链接',
    metaOriginal: '原站页面',
    metaCreatedAt: '收录时间',
    metaSortOrder: '排序权重',
    metaLocal: '本地资源',
    metaOpen: '在新窗口打开',
    metaOpenSource: '打开来源',
    metaOpenImage: '查看原图',
    metaOpenVideo: '查看原视频',
    metaNoRemote: '该条目未提供远端预览 URL。',
    metaCopyDescription: '复制简介',
    metaDescriptionCopied: '已复制简介',
    placeholderNote: '概念图：根据分类调色板生成',
    close: '关闭 (Esc)',
    empty: '没有匹配的提示词',
    emptyHint: '尝试更换关键词或筛选条件',
    resultsSuffix: '条结果',
    totalSuffix: '共',
    prompts: '个提示词',
    tagline: '动效 UI 提示词资料库',
    footer: '按 / 搜索 · 按 Esc 关闭 · 按 G 切换紧凑',
    noPreview: '概念图',
    conceptBadge: '概念',
    fullBadge: '完整',
    metadataBadge: '元数据',
    searchLabel: '搜索',
    catLabel: '分类',
    typeLabel: '类型',
    mediaLabel: '媒体',
    densityLabel: '视图密度',
    backToTop: '回到顶部',
    language: '语言',
    languageName: '中文',
    enName: 'English',
    zhName: '中文',
    failedToLoad: '加载失败',
    copied: '已复制',
    filterBy: '筛选',
    allCatsChip: '全部',
    allSources: '全部来源',
    sourceMotionsites: 'MotionSites 主库',
    sourceCommunity: '社区精选',
    sourceBadge: '社区',
    sourceRepoLabel: '来源仓库',
    sourcePathLabel: '原始文件',
    sourceLicenseLabel: '许可证',
    modalLoading: '加载中…'
  },
  'en': {
    searchPlaceholder: 'Search titles, descriptions, prompts…',
    allCategories: 'All categories',
    allTypes: 'All types',
    allFormats: 'All formats',
    staticMotion: 'Static & motion',
    video: 'Video',
    concept: 'Concept art',
    compact: 'Compact',
    compactView: 'Compact view',
    standardView: 'Standard view',
    fullPrompt: 'Full prompt',
    metadataOnly: 'Metadata only',
    image: 'Image',
    visual: 'Visual',
    copy: 'Copy prompt',
    copiedShort: '✓ Copied',
    copyDone: 'Copied to clipboard',
    copyFail: 'Copy failed - select manually',
    export: 'Export .md',
    exportDone: 'Exported',
    noFullPrompt: 'The full prompt body is not yet in this catalog.',
    noFullPromptHint: 'The source page has not published the body. See metadata below.',
    metaSection: 'Available metadata',
    metaSource: 'Source links',
    metaOriginal: 'Original page',
    metaCreatedAt: 'Indexed on',
    metaSortOrder: 'Sort weight',
    metaLocal: 'Local asset',
    metaOpen: 'Open in new tab',
    metaOpenSource: 'Open source',
    metaOpenImage: 'View source image',
    metaOpenVideo: 'View source video',
    metaNoRemote: 'No remote preview URL was published for this entry.',
    metaCopyDescription: 'Copy description',
    metaDescriptionCopied: 'Description copied',
    placeholderNote: 'Concept art - rendered from the per-category palette',
    close: 'Close (Esc)',
    empty: 'No matches yet',
    emptyHint: 'Try a different query or filter',
    resultsSuffix: 'results',
    totalSuffix: 'of',
    prompts: 'prompts',
    tagline: 'A curated library of motion-driven UI prompts',
    footer: 'Press / to search · Esc to close · G for compact',
    noPreview: 'Concept art',
    conceptBadge: 'Concept',
    fullBadge: 'Full',
    metadataBadge: 'Meta',
    searchLabel: 'Search',
    catLabel: 'Category',
    typeLabel: 'Type',
    mediaLabel: 'Media',
    densityLabel: 'Density',
    backToTop: 'Back to top',
    language: 'Language',
    languageName: 'English',
    enName: 'English',
    zhName: '中文',
    failedToLoad: 'Failed to load',
    copied: 'Copied',
    filterBy: 'Filter',
    allCatsChip: 'All',
    allSources: 'All sources',
    sourceMotionsites: 'MotionSites library',
    sourceCommunity: 'Community picks',
    sourceBadge: 'Community',
    sourceRepoLabel: 'Source repository',
    sourcePathLabel: 'Original file',
    sourceLicenseLabel: 'License',
    modalLoading: 'Loading…'
  }
};

let LANG = (() => {
  try {
    const stored = localStorage.getItem('ms.lang');
    if (stored && I18N[stored]) return stored;
  } catch (e) {}
  return 'zh-CN';
})();
const t = (k) => I18N[LANG][k] || I18N['en'][k] || k;

// -------- helpers --------
const $ = (id) => document.getElementById(id);
const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const hash = (id) => { let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return h; };
const fnv = (id) => { let h = 2166136261 >>> 0; for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

let current = null, compact = false;

// -------- progressive-loading state --------
let DATA = [];
let LITE = null;
let __MS_BOOT_DONE = false;
let __MS_TEXT_CACHE = Object.create(null);
let __MS_TEXT_PROMISES = Object.create(null);
let __MS_TEXT_INDEX = null;
let __MS_TEXT_INDEX_PROMISE = null;
let __MS_MEDIA_OBSERVER = null;
const __MS_VIDEO_MAX_CONCURRENT = 8;
const __MS_VIDEO_MAX_RETRIES = 2;
const __MS_VIDEO_RETRY_DELAY_MS = 700;
const __MS_VIDEO_STALL_TIMEOUT_MS = 30000;
const __MS_VIDEO_QUEUE = [];
let __MS_VIDEO_ACTIVE = 0;

function debounce(fn, ms) {
  let timer = null;
  return function () {
    const args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { timer = null; fn.apply(null, args); }, ms);
  };
}

async function fetchJSON(url) {
  // BUST-CACHE: append a build stamp so each deploy invalidates browser caches.
  const sep = url.includes('?') ? '&' : '?';
  const fullUrl = url + sep + 'v=20260831v3';
  const res = await fetch(fullUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error('fetchJSON ' + url + ' ' + res.status);
  return res.json();
}

async function loadPromptText(id) {
  if (!id) return '';
  if (__MS_TEXT_CACHE[id] != null) return __MS_TEXT_CACHE[id];
  if (__MS_TEXT_PROMISES[id]) return __MS_TEXT_PROMISES[id];
  // Dedupe: when N parallel calls fire before the first one resolves,
  // they all share the same in-flight promise instead of N duplicate fetches.
  if (!__MS_TEXT_INDEX_PROMISE) {
    __MS_TEXT_INDEX_PROMISE = fetchJSON('data/catalog-text-index.json')
      .then(function (v) { __MS_TEXT_INDEX = v; return v; })
      .catch(function (e) { return {}; });
  }
  const idx = await __MS_TEXT_INDEX_PROMISE;
  const rel = idx[id];
  if (!rel) { __MS_TEXT_CACHE[id] = ''; return ''; }
  const p = (async function () {
    try {
      const res = await fetch('data/' + rel + '?v=20260831v3', { cache: 'no-store' });
      if (!res.ok) throw new Error('text ' + id + ' ' + res.status);
      const txt = await res.text();
      __MS_TEXT_CACHE[id] = txt;
      return txt;
    } catch (e) {
      __MS_TEXT_CACHE[id] = '';
      return '';
    } finally {
      delete __MS_TEXT_PROMISES[id];
    }
  })();
  __MS_TEXT_PROMISES[id] = p;
  return p;
}

// -------- palette / placeholder art --------
const PALETTES = [
  { name: 'Indigo Aurora', a: '#7b9cff', b: '#b48cff', c: '#3d6cff' },
  { name: 'Emerald Drift', a: '#5cdcb1', b: '#88e3a4', c: '#3aac85' },
  { name: 'Sunlit Dunes', a: '#ffba72', b: '#ffdfa0', c: '#e08940' },
  { name: 'Rose Pulse', a: '#ff8ab1', b: '#ffb1c7', c: '#bd2e63' },
  { name: 'Lavender Beam', a: '#a974ff', b: '#c6a3ff', c: '#6e3bd1' },
  { name: 'Cyan Tide', a: '#5cc8ff', b: '#9ce3ff', c: '#2e88cc' },
  { name: 'Solar Glow', a: '#ffd76b', b: '#ffe8a8', c: '#d9a235' },
  { name: 'Coral Heat', a: '#ff7f7f', b: '#ffb1b1', c: '#cc4b4b' },
  { name: 'Mint Spritz', a: '#7cffc4', b: '#b6ffe0', c: '#3abf85' },
  { name: 'Dusk Bloom', a: '#9b8cff', b: '#c4b8ff', c: '#5a4cd1' }
];

const CATEGORY_PALETTE = {
  'Landing Page': 'Indigo Aurora', 'Hero Section': 'Sunlit Dunes', 'Hero': 'Sunlit Dunes',
  'SaaS': 'Emerald Drift', 'AI / SaaS': 'Emerald Drift', 'AI SaaS Website': 'Emerald Drift',
  'Agency': 'Cyan Tide', 'Portfolio': 'Rose Pulse', 'Web3': 'Lavender Beam',
  'Features': 'Mint Spritz', 'Features Section': 'Mint Spritz',
  'Footer Section': 'Solar Glow', 'Footer': 'Solar Glow',
  'Email Marketing': 'Coral Heat', 'Social Media': 'Rose Pulse',
  'Presentation': 'Indigo Aurora', 'Fintech': 'Cyan Tide', 'Transportation': 'Cyan Tide',
  'Health': 'Emerald Drift', 'Healthcare': 'Emerald Drift',
  'Ecommerce App': 'Rose Pulse', 'E-commerce': 'Rose Pulse',
  'Benefits': 'Mint Spritz', 'Slider': 'Lavender Beam', 'Sustainability': 'Emerald Drift',
  'Why Us': 'Indigo Aurora', 'Use Case': 'Indigo Aurora', 'Mobile App': 'Lavender Beam',
  'Travel App': 'Rose Pulse', 'Booking': 'Sunlit Dunes', 'Travel': 'Sunlit Dunes',
  'Cards': 'Mint Spritz', 'Wellness': 'Emerald Drift',
  'CTA': 'Coral Heat', 'CTA Section': 'Coral Heat', 'About': 'Dusk Bloom',
  'Signup': 'Lavender Beam', 'Sign Up': 'Lavender Beam', 'Sign In Form': 'Lavender Beam',
  'Entertainment': 'Rose Pulse', 'Ecommerce': 'Rose Pulse',
  'Tabs': 'Mint Spritz', 'Testimonials': 'Solar Glow', 'Testimonial': 'Solar Glow',
  'Education': 'Cyan Tide', 'Interactive': 'Lavender Beam', '3D Website': 'Lavender Beam',
  'Landing page': 'Indigo Aurora', 'Website': 'Indigo Aurora', 'Agency Website': 'Cyan Tide',
  'Waitlist': 'Lavender Beam', 'Marquee': 'Rose Pulse', 'Pricing': 'Solar Glow',
  'Real Estate': 'Sunlit Dunes', 'landing page': 'Indigo Aurora', 'Info': 'Indigo Aurora',
  'Services': 'Indigo Aurora', 'FAQ': 'Mint Spritz', 'AI': 'Emerald Drift',
  'HR Management': 'Indigo Aurora', 'Fashion': 'Rose Pulse', 'Process': 'Indigo Aurora',
  'Dashboard Demo': 'Emerald Drift', 'Projects': 'Indigo Aurora', 'Blog': 'Indigo Aurora',
  'Carousal': 'Rose Pulse', 'Case Studies': 'Indigo Aurora', 'Categories': 'Indigo Aurora',
  'Accordion': 'Mint Spritz', 'Contact us': 'Coral Heat', 'Bento': 'Mint Spritz',
  'Products': 'Rose Pulse', 'Stats': 'Solar Glow', 'Feature': 'Mint Spritz',
  'Loyalty App': 'Rose Pulse', 'Dashboard': 'Emerald Drift', 'Product': 'Rose Pulse',
  'Form': 'Mint Spritz', 'Investor Presentations': 'Indigo Aurora',
  'Automotive': 'Cyan Tide', 'Productivity': 'Emerald Drift', 'Church': 'Dusk Bloom',
  'App': 'Lavender Beam', 'AI App': 'Emerald Drift', 'SaaS Website': 'Emerald Drift',
  'Developer Platform': 'Indigo Aurora', 'Medicine': 'Emerald Drift',
  'Mindfulness': 'Emerald Drift', 'Cybersecurity': 'Cyan Tide',
  'Statistics App': 'Emerald Drift', 'Sports': 'Coral Heat', 'VPN': 'Cyan Tide',
  'Education Website': 'Cyan Tide', 'Driving': 'Cyan Tide', 'Community App': 'Rose Pulse',
  'Health App': 'Emerald Drift', 'Artificial Intelligence': 'Emerald Drift',
  'Music': 'Rose Pulse', 'Technology': 'Cyan Tide', 'Component': 'Indigo Aurora',
  'Learning': 'Cyan Tide', 'Learning SaaS': 'Cyan Tide', '404': 'Solar Glow',
  'Developer': 'Indigo Aurora'
};

const paletteFor = (x) => {
  const name = CATEGORY_PALETTE[x.category];
  if (name) { const p = PALETTES.find((z) => z.name === name); if (p) return p; }
  return PALETTES[hash(x.id) % PALETTES.length];
};

const BG_STYLES = ['aurora', 'mesh', 'grid', 'stripes', 'dots'];

function ornament(pat) {
  const s = pat % 5;
  if (s === 0) return '<svg width="74" height="74" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="1.4" stroke-linecap="round"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="6"/><circle cx="16" cy="16" r="1.6" fill="rgba(255,255,255,.95)"/><path d="M5 5 L27 27"/></svg>';
  if (s === 1) return '<svg width="74" height="74" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="1.4" stroke-linecap="round"><path d="M6 24 L16 5 L26 24 Z"/><circle cx="16" cy="19" r="2.2" fill="rgba(255,255,255,.95)"/></svg>';
  if (s === 2) return '<svg width="74" height="74" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="1.4" stroke-linecap="round"><rect x="5" y="5" width="22" height="22" rx="3"/><path d="M5 13 L27 13"/><path d="M13 13 L13 27"/><circle cx="9" cy="9" r="1.4" fill="rgba(255,255,255,.95)"/></svg>';
  if (s === 3) return '<svg width="74" height="74" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="1.4" stroke-linecap="round"><path d="M5 16 C5 9 11 5 16 5 C21 5 27 9 27 16 C27 23 21 27 16 27 C11 27 5 23 5 16 Z"/><path d="M11 14 L21 14 M11 19 L21 19 M11 16.5 L21 16.5"/></svg>';
  return '<svg width="74" height="74" viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="1.4" stroke-linecap="round"><path d="M4 16 H28"/><path d="M16 4 V28"/><circle cx="16" cy="16" r="8"/><circle cx="16" cy="16" r="2.5" fill="rgba(255,255,255,.95)"/></svg>';
}

function placeholderHTML(x, opts) {
  opts = opts || {};
  const ph = paletteFor(x);
  const pat = fnv(x.id || 'x');
  const bg = opts.bg || BG_STYLES[pat % BG_STYLES.length];
  const cat = esc(x.category || 'Concept');
  const ttl = esc(x.title || x.id || '');
  const big = !!opts.big;
  const isVideo = (x.local_kind === 'mp4' || x.local_kind === 'hls');
  return '<div class="ph-art ph-bg-' + bg + '" style="--phA:' + ph.a + ';--phB:' + ph.b + ';--phC:' + ph.c + ';--phAngle:' + (pat % 360) + 'deg">'
    + '<div class="ph-grid"></div>'
    + '<div class="ph-glow"></div>'
    + '<div class="ph-icon">' + ornament(pat) + '</div>'
    + '<div class="ph-cat">' + cat.toUpperCase() + '</div>'
    + '<div class="ph-title" style="font-size:' + (big ? '30px' : '18px') + ';font-style:' + (big ? 'italic' : 'normal') + '">' + ttl + '</div>'
    + (big ? '<div class="ph-meta"><span>' + esc(x.type || '—') + '</span> · ' + (x.is_free ? t('openAccess') : t('premium')) + '</div>' : '')
    + '</div>';
}

// Replace image with placeholder on error (event-delegated, no inline JS strings)
function onImgError(e) {
  const img = e.target;
  if (!img || img.tagName !== 'IMG') return;
  if (img.dataset.fallback === '1') return; // already replaced
  img.dataset.fallback = '1';
  img.style.display = 'none';
  // find matching record by id
  const card = img.closest('.card');
  if (!card) return;
  const id = card.dataset.id;
  const rec = DATA.find((x) => x.id === id);
  if (!rec) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = placeholderHTML(rec);
  img.parentNode.appendChild(wrap.firstChild);
}

function mediaOf(x, forPreview) {
  // forPreview=true is the detail modal; load immediately
  if (x.local_kind === 'mp4') return '<video src="' + esc(x.local_rel) + '" ' + (forPreview ? 'controls ' : '') + 'autoplay loop muted playsinline preload="metadata"></video>';
  if (x.local_kind === 'hls') return placeholderHTML(x, { big: forPreview });
  if (x.local_kind === 'webp' || x.local_kind === 'gif' || x.local_kind === 'png' || x.local_kind === 'jpeg') {
    return '<img src="' + esc(x.local_rel) + '" alt="' + esc(x.title) + '" loading="lazy" decoding="async">';
  }
  return placeholderHTML(x, { big: forPreview });
}

// Lazy card media: a placeholder div with data-armed=1; the IntersectionObserver
// swaps in the real <img>/<video> when the card scrolls into view.
function lazyMediaOf(x) {
  const k = x.local_kind;
  const src = x.local_rel || '';
  const title = esc(x.title || x.id || '');
  const ph = placeholderHTML(x, { big: false });
  const poster = (x.poster_rel && typeof x.poster_rel === 'string') ? x.poster_rel : '';
  // catalog-meta no longer carries a separate `local_kind`; trust the URL extension first.
  // Only fall back to placeholder when there is no source, or the kind is genuinely unknown (hls/other).
  if (!src || k === 'hls' || k === 'other') {
    return '<div class="media" data-armed="1" data-kind="placeholder">' + ph + '</div>';
  }
  // Defensive: trust the URL extension over local_kind when they disagree,
  // so a single stale "local_kind=mp4" pointing at a renamed file does not blackhole the card.
  const ext = (src.split('?')[0].split('#')[0].split('.').pop() || '').toLowerCase();
  const looksImage = ext === 'webp' || ext === 'gif' || ext === 'png' || ext === 'jpg' || ext === 'jpeg';
  const looksVideo = ext === 'mp4' || ext === 'webm' || ext === 'mov';
  let kind = 'placeholder';
  // catalog-meta no longer carries a separate `local_kind` (it was redundant), so trust the URL extension.
  if (looksVideo) kind = 'video';
  else if (looksImage) kind = 'image';
  else if (k === 'mp4' || k === 'webm') kind = 'video';
  else if (k === 'webp' || k === 'gif' || k === 'png' || k === 'jpeg') kind = 'image';
  return '<div class="media" data-armed="1" data-kind="' + kind + '" data-src="' + esc(src) + '" data-title="' + title + '"' + (poster ? ' data-poster="' + esc(poster) + '"' : '') + '>' + ph + '</div>';
}

function finishVideoMedia(item, state) {
  if (item.settled) return;
  item.settled = true;
  if (item.timer) clearTimeout(item.timer);
  const el = item.el;
  if (state === 'ready') {
    el.dataset.mediaState = 'ready';
    const ph = el.querySelector('.ph-art');
    if (ph) ph.remove();
    const v = el.querySelector('video');
    if (v) v.style.opacity = '1';
  } else {
    el.dataset.mediaState = 'error';
    const ph = el.querySelector('.ph-art');
    if (ph) ph.remove();
    const error = document.createElement('div');
    error.className = 'media-error';
    error.textContent = t('failedToLoad');
    el.appendChild(error);
  }
  __MS_VIDEO_ACTIVE = Math.max(0, __MS_VIDEO_ACTIVE - 1);
  pumpVideoMedia();
}

function retryVideoMedia(item, video) {
  if (item.settled) return;
  item.settled = true;
  if (item.timer) clearTimeout(item.timer);
  if (video) video.remove();
  __MS_VIDEO_ACTIVE = Math.max(0, __MS_VIDEO_ACTIVE - 1);
  if (item.attempt < __MS_VIDEO_MAX_RETRIES && item.el.isConnected) {
    item.el.dataset.mediaState = 'retrying';
    setTimeout(function () {
      if (item.el.isConnected) {
        __MS_VIDEO_QUEUE.push({ el: item.el, src: item.src, tit: item.tit, poster: item.poster || '', attempt: item.attempt + 1, settled: false });
      }
      pumpVideoMedia();
    }, __MS_VIDEO_RETRY_DELAY_MS * (item.attempt + 1));
  } else {
    item.el.dataset.mediaState = 'error';
    const ph = item.el.querySelector('.ph-art');
    if (ph) ph.remove();
    const error = document.createElement('div');
    error.className = 'media-error';
    error.textContent = t('failedToLoad');
    item.el.appendChild(error);
  }
  pumpVideoMedia();
}

function startVideoMedia(item) {
  const el = item.el;
  if (!el || !el.isConnected) {
    __MS_VIDEO_ACTIVE = Math.max(0, __MS_VIDEO_ACTIVE - 1);
    pumpVideoMedia();
    return;
  }
  el.dataset.mediaState = 'loading';
  const video = document.createElement('video');
  video.className = 'media-video';
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  // __MS_PATCH_APPLIED__: video-opacity-2026-08-08
  // Hide the video element until it has actually painted a frame.
  // Before this, a stalled CDN response would leave a 100% black <video>
  // covering the placeholder. With opacity:0 the placeholder gradient stays
  // visible until finishVideoMedia('ready') flips it back to 1.
  video.style.opacity = '0';
  video.style.transition = 'opacity .35s ease';
  video.setAttribute('aria-label', item.tit);
  if (item.poster) video.poster = item.poster;
  video.addEventListener('loadeddata', function () { finishVideoMedia(item, 'ready'); }, { once: true });
  video.addEventListener('canplay', function () { finishVideoMedia(item, 'ready'); }, { once: true });
  video.addEventListener('error', function () { retryVideoMedia(item, video); }, { once: true });
  item.timer = setTimeout(function () { retryVideoMedia(item, video); }, __MS_VIDEO_STALL_TIMEOUT_MS);
  video.src = item.src;
  el.appendChild(video);
  video.load();
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(function () {});
}

function queueVideoMedia(el, src, tit, poster) {
  if (!el || !el.isConnected || el.dataset.mediaState) return;
  el.dataset.mediaState = 'queued';
  __MS_VIDEO_QUEUE.push({ el: el, src: src, tit: tit, poster: poster || '', attempt: 0, settled: false });
  pumpVideoMedia();
}

function pumpVideoMedia() {
  while (__MS_VIDEO_ACTIVE < __MS_VIDEO_MAX_CONCURRENT && __MS_VIDEO_QUEUE.length) {
    const item = __MS_VIDEO_QUEUE.shift();
    if (!item.el || !item.el.isConnected || item.el.dataset.mediaState === 'ready') continue;
    __MS_VIDEO_ACTIVE += 1;
    startVideoMedia(item);
  }
}

function setupMediaObserver() {
  if (typeof IntersectionObserver === 'undefined') return null;
  if (__MS_MEDIA_OBSERVER) return __MS_MEDIA_OBSERVER;
  __MS_MEDIA_OBSERVER = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (!el || el.dataset.armed !== '1') return;
      delete el.dataset.armed;
      __MS_MEDIA_OBSERVER.unobserve(el);
      const kind = el.dataset.kind;
      const src  = el.dataset.src  || '';
      const tit  = el.dataset.title || '';
      const poster = el.dataset.poster || '';
      if (kind === 'image') {
        // Lazy <img>: cheap and concurrency-friendly, no queue needed.
        const ph = el.querySelector('.ph-art');
        if (ph) ph.remove();
        const tmp = document.createElement('div');
        tmp.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(tit) + '" loading="lazy" decoding="async">';
        while (tmp.firstChild) el.appendChild(tmp.firstChild);
      } else if (kind === 'video') {
        // __MS_PATCH_APPLIED__: video-queue-2026-08-08
        // Hand the video off to the global queue (concurrency-capped, retries on
        // stall/error). The placeholder stays in place until the video actually
        // starts playing, so cards never show a blank when the CDN stalls or
        // returns the wrong status. Errors render a clear <div class="media-error">
        // instead of forging a static image.
        queueVideoMedia(el, src, tit, poster);
      } else {
        return;
      }
    });
  }, { rootMargin: '300px 0px', threshold: 0.01 });
  return __MS_MEDIA_OBSERVER;
}

function observeMediaIn(root) {
  const obs = setupMediaObserver();
  if (!obs || !root) return;
  const nodes = (root.nodeType === 1 ? root : document).querySelectorAll('.media[data-armed="1"]');
  for (let i = 0; i < nodes.length; i++) obs.observe(nodes[i]);
}

function options(id, key) {
  const values = Array.from(new Set(DATA.map((x) => x[key]))).filter(Boolean).sort();
  const cur = $(id).value;
  const firstLabel = key === 'category' ? t('allCategories') : key === 'type' ? t('allTypes') : '';
  $(id).innerHTML = '<option value="">' + firstLabel + '</option>'
    + values.map((v) => '<option value="' + esc(v) + '"' + (v === cur ? ' selected' : '') + '>' + esc(v) + '</option>').join('');
}

function cardHTML(x) {
  const full = !!(x.prompt_text && x.prompt_text.trim());
  return '<article class="card" data-id="' + esc(x.id) + '">'
    + '<div class="badge-row">'
    + (full ? '<span class="badge full">' + t('fullBadge') + '</span>' : '<span class="badge muted">' + t('metadataBadge') + '</span>')
    + (x.source_kind === 'community' ? '<span class="badge community">' + t('sourceBadge') + '</span>' : '')
    + '</div>'
    + '<div class="card-media-wrap">' + lazyMediaOf(x) + '</div>'
    + '<div class="body">'
    + '<h2>' + esc(x.title) + '</h2>'
    + '<div class="desc">' + esc(x.description || '—') + '</div>'
    + '<div class="tag-row">'
    + '<span class="tag accent">' + esc(x.category || '—') + '</span>'
    + '<span class="tag">' + esc(x.type || '—') + '</span>'
    + '<span class="dot ' + (x.local_rel ? '' : 'concept') + '"></span>'
    + '</div></div></article>';
}

function render() {
  const q = $('q').value.trim().toLowerCase();
  const cat = $('cat').value, type = $('type').value, media = $('media').value;
  const source = $('source') ? $('source').value : '';
  let list = DATA;
  if (cat) list = list.filter((x) => x.category === cat);
  if (type) list = list.filter((x) => x.type === type);
  if (media === 'img') list = list.filter((x) => x.local_kind && x.local_kind !== 'mp4' && x.local_kind !== 'hls');
  if (media === 'video') list = list.filter((x) => x.local_kind === 'mp4' || x.local_kind === 'hls');
  if (media === 'art') list = list.filter((x) => !x.local_rel);
  if (source) list = list.filter((x) => (x.source_kind || 'motionsites') === source);
  if (q) {
    const tokens = q.split(/\s+/).filter(Boolean);
    list = list.filter((x) => {
      const hay = (x.title + ' ' + (x.description || '') + ' ' + x.id + ' ' + (x.category || '') + ' ' + (x.type || '') + ' ' + (x.prompt_text || '') + ' ' + (x.source_repo || '') + ' ' + (x.source_path || '')).toLowerCase();
      return tokens.every((tk) => hay.includes(tk));
    });
  }
  $('count').innerHTML = '<b style="color:var(--text)">' + list.length.toLocaleString() + '</b> ' + t('resultsSuffix') + ' · ' + t('totalSuffix') + ' ' + DATA.length.toLocaleString() + ' ' + t('prompts');
  renderProgressive(list);
  if (q) animateSearch(q); else $('spotlight').classList.remove('show');
}

// -------- progressive render --------
function renderBatch(list, start, end) {
  const grid = $('grid');
  if (start === 0) {
    grid.innerHTML = '';
    if (list.length === 0) {
      grid.innerHTML = '<div class="empty"><b>' + t('empty') + '</b><br>' + t('emptyHint') + '</div>';
      grid.dataset.state = 'empty';
      return 0;
    }
    grid.dataset.state = 'ready';
  }
  const endClamped = Math.min(end, list.length);
  const slice = list.slice(start, endClamped);
  if (slice.length === 0) return 0;
  const tmp = document.createElement('div');
  tmp.innerHTML = slice.map(cardHTML).join('');
  const frag = document.createDocumentFragment();
  while (tmp.firstChild) frag.appendChild(tmp.firstChild);
  grid.appendChild(frag);
  observeMediaIn(grid);
  return slice.length;
}

function renderProgressive(list) {
  if (typeof requestAnimationFrame === 'undefined') {
    renderBatch(list, 0, list.length);
    return;
  }
  const BATCH = 60;
  let i = 0;
  function step() {
    const n = renderBatch(list, i, i + BATCH);
    i += n;
    if (i < list.length) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function chipInitFromLite(lite) {
  if (!lite || !$('chips')) return;
  const top = (lite.topCategories || []).slice(0, 9);
  const total = lite.total || 0;
  const html = ['<span class="chip active" data-cat="">' + t('allCatsChip') + ' <b>' + total + '</b></span>']
    .concat(top.map(function (c) { return '<span class="chip" data-cat="' + esc(c.category) + '">' + esc(c.category) + ' <b>' + c.count + '</b></span>'; }))
    .join('');
  $('chips').innerHTML = html;
  $('chips').querySelectorAll('.chip').forEach(function (c) {
    c.addEventListener('click', function () {
      const cat = c.dataset.cat;
      const sel = $('cat');
      if (sel) sel.value = cat;
      $('chips').querySelectorAll('.chip').forEach(function (x) { x.classList.toggle('active', x.dataset.cat === cat); });
      render();
    });
  });
}

function updateHeaderStats(lite) { if (!lite) return; const map = { 'stat-curated': lite.total || 0, 'stat-text': lite.complete || 0, 'stat-anim': (lite.images || 0) + (lite.videos || 0), 'stat-videos': lite.videos || 0, 'stat-concepts': lite.concepts || 0 }; for (const id in map) { const el = document.getElementById(id); if (el) el.textContent = map[id]; } }

function animateSearch(q) {
  const $s = $('spotlight');
  let target = null, bestScore = 99;
  document.querySelectorAll('.card').forEach((c) => {
    const title = (c.querySelector('h2')?.textContent || '').toLowerCase();
    if (title.includes(q) && (title.indexOf(q) < bestScore || !target)) { target = c; bestScore = title.indexOf(q); }
  });
  if (!target) return;
  const tr = target.getBoundingClientRect();
  const x = tr.left + tr.width / 2, y = tr.top + tr.height / 2;
  $s.style.left = x + 'px'; $s.style.top = y + 'px'; $s.classList.add('show');
  target.classList.add('highlight');
  setTimeout(() => { if (target) target.classList.remove('highlight'); }, 1400);
}

let toastTimer = null;
function toast(msg, kind) {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast show ' + (kind || '');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = 'toast'; }, 2400);
}

async function copyText(text) {
  // try Clipboard API first
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) { /* fall through */ }
  // fallback: hidden textarea + execCommand
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus(); ta.select(); ta.setSelectionRange(0, text.length);
    const ok = document.execCommand && document.execCommand('copy');
    document.body.removeChild(ta);
    return !!ok;
  } catch (e) {
    return false;
  }
}

async function openItem(id) {
  current = DATA.find((x) => x.id === id);
  if (!current) return;
  // Lazy-load modal-only fields (image/video URLs, source links, tags) from a separate file
  if(!window.__MS_DETAILS_CACHE__){try{window.__MS_DETAILS_CACHE__=await fetchJSON("data/catalog-details.json");}catch(e){window.__MS_DETAILS_CACHE__={};}}
  const _d=window.__MS_DETAILS_CACHE__[current.id];if(_d){for(const _k in _d){if(current[_k]===undefined)current[_k]=_d[_k];}}
  const isVideo = current.local_kind === 'mp4' || current.local_kind === 'hls';
  $('title').innerHTML = esc(current.title) + ' <small>' + esc(current.id) + '</small>';
  $('description').textContent = current.description || '—';
  $('tags').innerHTML = [
    '<span class="tag accent">' + esc(current.category || '—') + '</span>',
    '<span class="tag">' + esc(current.type || '—') + '</span>',
    '<span class="tag" id="prompt-state-tag" style="color:var(--orange);border-color:rgba(255,186,114,.45)">' + t('modalLoading') + '</span>',
    current.local_rel ? '<span class="tag">' + (isVideo ? t('video') : t('visual')) + '</span>' : '<span class="tag">' + t('conceptBadge') + '</span>'
  ].join('');
  $('preview').innerHTML = mediaOf(current, true);
  $('prompt').textContent = t('modalLoading');
  $('prompt').dataset.mode = 'loading';
  $('copy').disabled = true;
  $('download').disabled = true;
  try { $('dlg').showModal(); } catch (e) { /* not in secure context */ }

  // Lazy-load the prompt body only when the modal opens
  let body = current.prompt_text;
  if (!body || !body.trim()) {
    body = await loadPromptText(current.id);
    current.prompt_text = body;
  }
  // If the user already closed the modal, stop here
  if (!$('dlg').open) return;
  const full = !!(body && body.trim());
  if (full) {
    $('prompt').textContent = body;
    $('prompt').dataset.mode = 'prompt';
  } else {
    $('prompt').innerHTML = metaPanelHTML(current);
    $('prompt').dataset.mode = 'meta';
  }
  $('copy').disabled = !full;
  $('download').disabled = !full;
  // Replace the loading tag with the final state
  const tag = $('prompt-state-tag');
  if (tag) {
    tag.outerHTML = full
      ? '<span class="tag" style="color:var(--green);border-color:rgba(92,220,177,.45)">' + t('fullPrompt') + '</span>'
      : '<span class="tag" style="color:var(--orange);border-color:rgba(255,186,114,.45)">' + t('metadataOnly') + '</span>';
  }
}

function metaPanelHTML(x) {
  const rows = [];
  const push = function (k, v) { if (v != null && v !== '') rows.push('<div class="m-k">' + esc(k) + '</div><div class="m-v">' + esc(v) + '</div>'); };
  if (x.created_at) push(t('metaCreatedAt'), String(x.created_at).replace('T', ' ').replace(/\..*$/, '').replace('+00:00', ' UTC'));
  if (x.page_type) push('page_type', x.page_type);
  if (x.sort_order != null) push(t('metaSortOrder'), x.sort_order);
  if (x.local_kind) push(t('metaLocal'), x.local_kind);
  if (x.text_len) push('text_len', x.text_len);
  if (x.local_rel) push('local_rel', x.local_rel);
  const links = [];
  if (x.image_preview_url) links.push('<a class="meta-link" target="_blank" rel="noopener" href="' + esc(x.image_preview_url) + '">' + esc(t('metaOpenImage')) + '</a>');
  if (x.video_preview_url) links.push('<a class="meta-link" target="_blank" rel="noopener" href="' + esc(x.video_preview_url) + '">' + esc(t('metaOpenVideo')) + '</a>');
  if (x.id && x.source_kind !== 'community') links.push('<a class="meta-link" target="_blank" rel="noopener" href="https://motionsites.ai/p/' + esc(x.id) + '">' + esc(t('metaOriginal')) + '</a>');
  if (x.source_kind === 'community' && x.source_url) links.push('<a class="meta-link" target="_blank" rel="noopener" href="' + esc(x.source_url) + '">' + esc(t('metaOpenSource')) + '</a>');
  return ''
    + '<div class="meta-note">' + esc(t('noFullPromptHint')) + '</div>'
    + '<div class="meta-section-title">' + esc(t('metaSection')) + '</div>'
    + '<div class="meta-grid">' + rows.join('') + '</div>'
    + '<div class="meta-section-title">' + esc(t('metaSource')) + '</div>'
    + (links.length ? '<div class="meta-links">' + links.join(' ') + '</div>' : '<div class="meta-note">' + esc(t('metaNoRemote')) + '</div>');
}

function closeModal() {
  try { $('dlg').close(); } catch (e) {}
  // pause any playing video
  const v = $('preview').querySelector('video');
  if (v) try { v.pause(); } catch (e) {}
}

$('copy').addEventListener('click', async () => {
  if (!current || !current.prompt_text) return;
  const btn = $('copy');
  const original = btn.innerHTML;
  const ok = await copyText(current.prompt_text);
  if (ok) {
    toast(t('copyDone'), 'success');
    flashButton(btn, t('copiedShort') || '✓ ' + t('copyDone'), 'success');
  } else {
    toast(t('copyFail'), 'warn');
    flashButton(btn, t('copyFail'), 'warn');
    // as last resort, focus the prompt block so user can Ctrl+C
    const p = $('prompt');
    try { p.focus(); window.getSelection().selectAllChildren(p); } catch (e) {}
  }
});

function flashButton(btn, text, kind) {
  if (!btn) return;
  btn.classList.add('flash', kind || '');
  // Replace only the visible text (preserve SVG)
  const span = btn.querySelector('[data-i18n]');
  if (span) {
    const prev = span.textContent;
    span.textContent = text;
    setTimeout(() => {
      btn.classList.remove('flash', kind || '');
      span.textContent = prev;
    }, 1600);
  } else {
    btn.innerHTML = text;
    setTimeout(() => { btn.classList.remove('flash', kind || ''); btn.innerHTML = prev || btn.innerHTML; }, 1600);
  }
}
$('download').addEventListener('click', () => {
  if (!current || !current.prompt_text) return;
  const txt = '# ' + current.title + '\n\n' + (current.description || '') + '\n\n## ' + t('fullPrompt') + '\n\n' + current.prompt_text + '\n';
  const url = URL.createObjectURL(new Blob([txt], { type: 'text/markdown;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = current.id + '.md'; a.click();
  URL.revokeObjectURL(url);
  toast(t('exportDone') + ' ' + current.id + '.md', 'success');
});
$('close').addEventListener('click', closeModal);
$('dlg').addEventListener('click', (e) => { if (e.target === $('dlg')) closeModal(); });
$('dlg').addEventListener('close', () => {
  const v = $('preview').querySelector('video');
  if (v) try { v.pause(); } catch (e) {}
});
$('toggle-density').addEventListener('click', () => {
  compact = !compact;
  $('grid').classList.toggle('compact', compact);
  toast(compact ? t('compactView') : t('standardView'));
});
window.addEventListener('scroll', () => {
  const f = $('fab');
  if (window.scrollY > 400) f.classList.add('show'); else f.classList.remove('show');
}, { passive: true });
$('fab').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Event-delegation: card click + image error
$('grid').addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) openItem(card.dataset.id);
});
$('grid').addEventListener('error', onImgError, true); // capture for img errors

// Filter events
['q', 'cat', 'type', 'source', 'media'].forEach((id) => {
  if (id === 'q') { $(id).addEventListener('input', debounce(render, 120)); }
  else { $(id).addEventListener('change', render); }
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'SELECT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault(); $('q').focus(); $('q').select();
  } else if (e.key === 'Escape') {
    if ($('dlg').open) closeModal();
  } else if ((e.key === 'g' || e.key === 'G') && !e.ctrlKey && !e.metaKey && !e.altKey) {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    $('toggle-density').click();
  }
});

// -------- Chips + i18n --------
function chipInit() {
  const counts = {};
  DATA.forEach((x) => { counts[x.category] = (counts[x.category] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 9);
  const html = ['<span class="chip active" data-cat="">' + t('allCatsChip') + ' <b>' + DATA.length + '</b></span>']
    .concat(top.map((c) => '<span class="chip" data-cat="' + esc(c[0]) + '">' + esc(c[0]) + ' <b>' + c[1] + '</b></span>'))
    .join('');
  $('chips').innerHTML = html;
  $('chips').querySelectorAll('.chip').forEach((c) => {
    c.addEventListener('click', () => {
      const cat = c.dataset.cat;
      $('cat').value = cat;
      $('chips').querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x.dataset.cat === cat));
      render();
    });
  });
}

function applyLang() {
  document.documentElement.lang = LANG === 'zh-CN' ? 'zh-CN' : 'en';
  document.title = (LANG === 'zh-CN'
    ? 'MotionSites Prompts · 动效 UI 提示词资料库'
    : 'MotionSites Prompts · A Curated Library of Motion-Driven UI');

  // Search input placeholder
  const q = $('q');
  if (q) q.placeholder = t('searchPlaceholder');

  // --- Bulk DOM translation: any element with [data-i18n] gets text from I18N ---
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.getAttribute('data-i18n');
    const v = t(k);
    if (v) el.textContent = v;
  });

  // --- Bulk attribute translation ---
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const v = t(el.getAttribute('data-i18n-title'));
    if (v) el.title = v;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const v = t(el.getAttribute('data-i18n-aria'));
    if (v) el.setAttribute('aria-label', v);
  });
  document.querySelectorAll('[data-i18n-lang]').forEach((el) => {
    el.textContent = (LANG === 'zh-CN') ? 'EN' : '中';
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const v = t(el.getAttribute('data-i18n-placeholder'));
    if (v) el.placeholder = v;
  });

  // Footer (uses HTML for kbd styling)
  const footer = $('footer-app');
  if (footer) {
    const kbd = '<kbd style="font-family:JetBrains Mono,monospace;padding:2px 6px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:5px">';
    footer.innerHTML = t('footer')
      .replace(/<kbd>\s*([^<]+?)\s*<\/kbd>/g, function(m, key){
        return kbd + esc(key) + '</kbd>';
      });
  }

  // Lang toggle button title (mouseover hint)
  const lt = $('lang-toggle');
  if (lt) lt.title = (LANG === 'zh-CN') ? t('enName') : t('zhName');

  // --- Rebuild selects (re-add i18n option labels) ---
  options('cat', 'category');
  options('type', 'type');
  rebuildSourceOptions();
  // Re-translate the static option labels that don't come from DATA
  const cat0 = $('cat'); if (cat0 && cat0.options[0]) cat0.options[0].textContent = t('allCategories');
  const type0 = $('type'); if (type0 && type0.options[0]) type0.options[0].textContent = t('allTypes');

  const media0 = $('media');
  if (media0) {
    if (media0.options[0]) media0.options[0].textContent = t('allFormats');
    if (media0.options[1]) media0.options[1].textContent = t('staticMotion');
    if (media0.options[2]) media0.options[2].textContent = t('video');
    if (media0.options[3]) media0.options[3].textContent = t('concept');
  }
  const source0 = $('source');
  if (source0) {
    if (source0.options[0]) source0.options[0].textContent = t('allSources');
    if (source0.options[1]) source0.options[1].textContent = t('sourceMotionsites');
    if (source0.options[2]) source0.options[2].textContent = t('sourceCommunity');
  }

  chipInit();
  // preserve current filter selections
  $('cat').value = $('cat').value;
  $('type').value = $('type').value;
  render();
}

$('lang-toggle').addEventListener('click', () => {
  LANG = LANG === 'zh-CN' ? 'en' : 'zh-CN';
  try { localStorage.setItem('ms.lang', LANG); } catch (e) {}
  applyLang();
});



function rebuildSourceOptions() {
  const sel = $('source');
  if (!sel) return;
  const cur = sel.value;
  const present = new Set(DATA.map((x) => x.source_kind || 'motionsites'));
  const opts = ['<option value="">' + t('allSources') + '</option>'];
  if (present.has('motionsites')) opts.push('<option value="motionsites">' + t('sourceMotionsites') + '</option>');
  if (present.has('community')) opts.push('<option value="community">' + t('sourceCommunity') + '</option>');
  sel.innerHTML = opts.join('');
  if (cur && (cur === '' || present.has(cur))) sel.value = cur;
}
// -------- boot --------
async function bootstrap() {
  if (__MS_BOOT_DONE) return;
  __MS_BOOT_DONE = true;

  setupMediaObserver();

  // 1) Fetch LITE and META in parallel — they are independent and META is the
  //    large one (~85 KB gzipped). Painting chips from LITE while META is still
    //    in flight lets the user see category counts ~1 s earlier on cold cache.
  const [liteResult, metaResult] = await Promise.allSettled([
    fetchJSON('data/catalog-lite.json'),
    fetchJSON('data/catalog-meta.json')
  ]);
  if (liteResult.status === 'fulfilled') {
    LITE = liteResult.value;
    chipInitFromLite(LITE);
    updateHeaderStats(LITE);
  }
  if (metaResult.status === 'rejected') {
    toast(t('failedToLoad'), 'warn');
    return;
  }
  DATA = metaResult.value;
  // catalog-meta may be a flat array, or wrapped as {cards:[...]} (same shape as LITE).
  if (DATA && !Array.isArray(DATA) && Array.isArray(DATA.cards)) DATA = DATA.cards;
  if (!Array.isArray(DATA)) DATA = [];
  // NOTE: catalog-text-index.json is fetched lazily by loadPromptText()
  // the first time a modal opens. Fetching it on boot was adding ~1.4 s
  // to the cold-cache FCP on Cloudflare Pages.

  // 3) Clear skeletons now that data is here.
  if (typeof window.__MS_CLEAR_SKELETONS === 'function') window.__MS_CLEAR_SKELETONS();

  // 4) Wire selects + apply language (which renders + chips).
  ['cat', 'type'].forEach(function (id) { options(id, id === 'cat' ? 'category' : 'type'); });
  rebuildSourceOptions();
  applyLang();

  // 5) Warm-cache first 4 prompt bodies so opening the most-likely card feels instant.
  // Smaller batch keeps the initial cold-cache FCP low; the rest is fetched lazily.
  const warm = DATA.slice(0, 4);
  warm.forEach(function (x) { loadPromptText(x.id); });
}

bootstrap();
