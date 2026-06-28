# PepsFeeder — Site Summary

## What It Is

Hugo static site deployed on GitHub Pages at `pepsfeeder.github.io`. Blog with 236 published articles. Decap CMS for content editing.

## Tech Stack

- **SSG**: Hugo v0.131.0+extended
- **CMS**: Decap CMS with GitHub OAuth via Cloudflare Worker proxy
- **Search**: Pagefind
- **Hosting**: GitHub Pages (branch: `gh-pages`)
- **CI**: GitHub Actions (`.github/workflows/deploy.yml`)

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Hugo source content, config, layouts |
| `gh-pages` | Built site output (HTML, assets, pagefind index) |

## Content Structure

```
content/
├── posts/        → 236 articles (regular + insight mixed)
└── insight/      → only _index.md (section page, draft: true)
    (147 insight articles live in content/posts/, tagged categories: ["insight"])
```

- Insight articles are marked `draft: true` — excluded from build
- Insight category has no dedicated section in menu

## Images

| Location | Purpose | Count |
|----------|---------|-------|
| `static/wp-content/uploads/` | Published article images | ~78 files |
| `excluded-images/wp-content/uploads/` | Insight-exclusive images (excluded from build) | 169 files |

Images were previously tracked under `content/wp-content/uploads/` in old commits (10k+ files, now removed from working tree). Remote `main` still lacks `static/` — images only exist on `gh-pages`.

## CMS

- Config: `static/admin/config.yml`
- `publish_mode: simple` — commits directly to `main`, no editorial workflow branches
- Media folder: `static/wp-content/uploads`
- OAuth proxy: `https://pepsfeeder-cms-proxy.fourmou-m.workers.dev`

## Deploy Pipeline

Push to `main` → GitHub Actions runs:
1. Checkout `main` + `gh-pages`
2. `hugo` + `npx pagefind`
3. Overlay output onto `gh-pages` (preserves css/, js/, images/, wp-content/, admin/)
4. Push to `gh-pages`
5. Trigger Pages rebuild via API

No linter or type checker — Hugo errors surface at build time.

## Recent Commits (top 5)

```
c1f97d513 exclude insight images + cleanup build cache + add DEPLOY.md
c9e072c3c add github actions deploy workflow
1c78f1015 remove editorial workflow from cms config
5571b0443 setup decap cms with github oauth
edd3a4892 remove insight category from build
```

## Key Files

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | Build + overlay deploy + Pages rebuild |
| `static/admin/config.yml` | Decap CMS configuration |
| `config.toml` | Hugo site config |
| `layouts/index.html` | Homepage with Pagefind search at top |
| `layouts/_default/single.html` | Article template with featured image |
| `layouts/partials/consent.html` | Cookie consent banner |
| `static/css/custom.css` | Featured image + thumbnail CSS |
| `data/consent.yaml` | Empty consent items |
| `DEPLOY.md` | Publish guide |
| `AUDIT.md` | Site strengths/issues assessment |

## Known Issues

- `.git` folder is ~3GB (historical image bloat)
- Remote `main` lacks `static/` — fresh clones cannot build locally
- No revenue model, no newsletter, no clear niche
- No structured data or canonical strategy
- Git submodules (`themes/hugo-book`, `public`) appear misconfigured

## Credentials

- PAT in deploy workflow: `PAT_REMOVED`
- Hugo build time: ~2.7s locally
