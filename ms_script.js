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
  if (x.local_kind === 'mp4') return '<video src="' + esc(x.local_rel) + '" ' + (forPreview ? 'controls ' : '') + 'autoplay loop muted playsinline preload="metadata"></video>';
  if (x.local_kind === 'hls') return placeholderHTML(x, { big: forPreview });
  if (x.local_kind === 'webp' || x.local_kind === 'gif' || x.local_kind === 'png' || x.local_kind === 'jpeg') {
    return '<img src="' + esc(x.local_rel) + '" alt="' + esc(x.title) + '" loading="lazy" decoding="async">';
  }
  return placeholderHTML(x, { big: forPreview });
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
    + '<div class="media">' + mediaOf(x, false) + '</div>'
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
  const grid = $('grid');
  if (list.length === 0) {
    grid.innerHTML = '<div class="empty"><b>' + t('empty') + '</b><br>' + t('emptyHint') + '</div>';
  } else {
    // build with DocumentFragment for fewer reflows
    const frag = document.createDocumentFragment();
    const tmp = document.createElement('div');
    tmp.innerHTML = list.map(cardHTML).join('');
    while (tmp.firstChild) frag.appendChild(tmp.firstChild);
    grid.innerHTML = '';
    grid.appendChild(frag);
  }
  if (q) animateSearch(q); else $('spotlight').classList.remove('show');
}

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

function openItem(id) {
  current = DATA.find((x) => x.id === id);
  if (!current) return;
  const full = !!(current.prompt_text && current.prompt_text.trim());
  $('title').innerHTML = esc(current.title) + ' <small>' + esc(current.id) + '</small>';
  $('description').textContent = current.description || '—';
  if (full) {
    $('prompt').textContent = current.prompt_text;
    $('prompt').dataset.mode = 'prompt';
  } else {
    $('prompt').innerHTML = metaPanelHTML(current);
    $('prompt').dataset.mode = 'meta';
  }
  $('copy').disabled = !full;
  $('download').disabled = !full;
  const isVideo = current.local_kind === 'mp4' || current.local_kind === 'hls';
  $('tags').innerHTML = [
    '<span class="tag accent">' + esc(current.category || '—') + '</span>',
    '<span class="tag">' + esc(current.type || '—') + '</span>',
    full ? '<span class="tag" style="color:var(--green);border-color:rgba(92,220,177,.45)">' + t('fullPrompt') + '</span>' : '<span class="tag" style="color:var(--orange);border-color:rgba(255,186,114,.45)">' + t('metadataOnly') + '</span>',
    current.local_rel ? '<span class="tag">' + (isVideo ? t('video') : t('visual')) + '</span>' : '<span class="tag">' + t('conceptBadge') + '</span>'
  ].join('');
  $('preview').innerHTML = mediaOf(current, true);
  try { $('dlg').showModal(); } catch (e) { /* not in secure context */ }
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
  $(id).addEventListener(id === 'q' ? 'input' : 'change', render);
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
['cat', 'type'].forEach((id) => options(id, id === 'cat' ? 'category' : 'type'));
rebuildSourceOptions();
applyLang(); // also calls render() and chipInit() at the end
