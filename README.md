# MotionSites Prompts — A Curated Library of Motion-Driven UI

> 一个精选的、面向动效驱动 UI 的提示词(Prompt)合集。
>
> An offline-first, single-file catalog of **motion-driven UI prompts** — landing pages, hero scenes, agency showcases, dashboards, and more. Browse, search, copy, and export every prompt locally. No login, no network call, no paywall.

![Catalog hero](docs/screenshots/catalog-hero.svg)

---

## 中文简介

**MotionSites Prompts** 是一个开源、离线优先的「动效 UI 提示词目录」,汇集了 300+ 条经过策划的动效驱动型界面提示词,涵盖:

- 着陆页(Landing Page)
- 首屏 Hero 场景
- SaaS 产品介绍页
- 数字工作室作品集(Agency / Portfolio)
- Web3 / AI / Dashboard 数据看板
- 旅游、医疗、房地产等行业模板

每一条提示词都可以一键复制、导出为 Markdown,部分条目还配有本地化的动效预览(WebP / MP4)。所有内容都是**单文件静态站点**形式,无需登录、无需联网、无需付费墙。

### 你能用它做什么

- 复制提示词喂给任何 LLM(ChatGPT / Claude / Gemini / DeepSeek 等),快速生成前端代码
- 作为动效设计灵感库浏览
- 通过本地筛选(分类、类型、是否付费、媒体格式)精准定位
- 作为团队 / 个人前端作品集的起始模板

### 仓库内容速览

```
MotionSites-Prompts/
├── README.md                # 本文件(中英双语)
├── LICENSE                  # MIT License
├── CONTRIBUTING.md          # 贡献指南
├── prompts/                 # 分类整理的提示词库(本次新增)
│   ├── landing/             # 着陆页提示词
│   ├── hero/                # Hero 首屏提示词
│   ├── saas/                # SaaS 提示词
│   ├── agency/              # 数字工作室提示词
│   ├── dashboard/           # 数据看板提示词
│   └── portfolio/           # 作品集提示词
├── templates/               # 起始 HTML 模板
├── examples/                # 完整示例项目
├── docs/
│   ├── screenshots/         # SVG 截图与示意图
│   └── catalog.json         # 提示词索引数据
└── index.html               # 单文件浏览入口(可选)
```

### 如何使用

#### 1. 直接在 GitHub 上浏览

打开仓库根目录的 `README.md` 或者 `docs/catalog.json`,从分类目录(比如 `prompts/landing/`)中选择感兴趣的提示词文件,直接复制 `Prompt` 代码块即可使用。

#### 2. 本地浏览(推荐)

```bash
git clone https://github.com/zhaosenlin12-creator/MotionSites-Prompts.git
cd MotionSites-Prompts

# 方法 A:直接打开
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux

# 方法 B:启动本地静态服务器
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

#### 3. 集成到自己的工作流

将 `prompts/` 目录中的任意 `.md` 文件复制到你的 LLM 对话中,或使用以下脚本批量导出:

```bash
# 列出所有提示词文件
find prompts -name "*.md" | sort
```

### 截图与示意图

| 视图 | 说明 |
| --- | --- |
| ![Catalog hero](docs/screenshots/catalog-hero.svg) | 主页 Hero 与分类筛选 |
| ![Prompt card](docs/screenshots/prompt-card.svg) | 单个提示词卡片详情 |
| ![Categories](docs/screenshots/categories.svg) | 分类导航条 |
| ![Filters](docs/screenshots/filters.svg) | 多维筛选器 |

> 完整动效预览请克隆到本地,所有预览文件均为 `WebP` 或 `MP4`,GitHub SVG 版本只展示布局结构。

### 贡献方式

欢迎提交 PR!请参考 [CONTRIBUTING.md](CONTRIBUTING.md):

1. 在 `prompts/<分类>/` 下新增 `.md` 文件
2. 命名规范:`<序号>-<英文短名>.md`,例如 `007-glassmorphism-hero.md`
3. 文件模板见 `prompts/_TEMPLATE.md`
4. 同步在 `docs/catalog.json` 的对应分类下追加索引
5. 提交 PR,标题写明 `[prompt] <分类>: <标题>`

### 数据来源与版权

| 字段 | 来源 |
| --- | --- |
| 标题、描述、分类、媒体链接 | 公开的 [motionsites.ai](https://motionsites.ai) 目录 |
| 完整提示词正文 | 社区维护的开源仓库(`xianxian-sensen`、`Melectrona`、`akkikumar72/liro-prompts`、`giglianepefrei`) |
| 预览素材 | `motionsites.ai` CDN,首次构建时下载并打包进仓库 |

每一条提示词正文的版权归原作者所有,本仓库仅做归档与索引。

---

## English

**MotionSites Prompts** is an open-source, offline-first catalog of **motion-driven UI prompts**. It ships **300+ curated prompts** spanning landing pages, hero scenes, SaaS sections, agency showcases, dashboards, and industry-specific templates (travel, healthcare, real estate, …).

### Highlights

- ? **Single static file** — open `index.html` directly from disk, no build step needed
- ?? **Multi-dimensional filters** — category, type, access (open / premium), media format
- ?? **Keyboard-first** — `/` focuses search, `Esc` closes modal, `G` toggles compact mode
- ?? **Two card densities** — standard 16:10 grid and compact list
- ?? **Spotlight search** — a soft glow tracks the best-matching card as you type
- ?? **Offline** — all preview media is bundled locally, no network calls after clone

### File layout

```
.
├── README.md                       # Bilingual project README (this file)
├── LICENSE                         # MIT
├── CONTRIBUTING.md                 # How to add a new prompt
├── prompts/                        # Categorized prompt library
│   ├── _TEMPLATE.md                # Markdown template for new prompts
│   ├── landing/                    # Landing-page prompts
│   ├── hero/                       # Hero / first-screen prompts
│   ├── saas/                       # SaaS prompts
│   ├── agency/                     # Digital-agency prompts
│   ├── dashboard/                  # Dashboard / data-viz prompts
│   └── portfolio/                  # Portfolio prompts
├── templates/                      # Starter HTML/CSS templates
├── examples/                       # Full end-to-end examples
├── docs/
│   ├── screenshots/                # SVG previews (no binary blobs)
│   └── catalog.json                # Machine-readable index
└── index.html                      # Optional single-file viewer
```

### Usage

1. **Browse on GitHub** — open any file under `prompts/<category>/`.
2. **Local browsing** — `git clone` then double-click `index.html` (or serve with `python -m http.server`).
3. **Pipeline integration** — `docs/catalog.json` is machine-readable; use it as input for your own tools.

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). New prompts should:

1. Live in `prompts/<category>/`
2. Follow the format in `prompts/_TEMPLATE.md`
3. Be appended to `docs/catalog.json` under the same category
4. Pass any existing tests / lints (none yet — see roadmap)

### License

[MIT](LICENSE) — free to use, modify, and redistribute. Individual prompt bodies retain their original authors' copyrights; this repository only archives and indexes them.

---

## Roadmap

- [x] Bilingual README with diagrams
- [x] Categorized prompts library (`prompts/<category>/*.md`)
- [x] SVG-based screenshots in `docs/screenshots/`
- [x] Machine-readable `docs/catalog.json`
- [ ] Live single-file viewer (`index.html`) — port from sibling project
- [ ] Automated lint for prompt files
- [ ] CI: schema validation for `catalog.json`
- [ ] Bilingual translations for every prompt (zh-CN / en-US)
