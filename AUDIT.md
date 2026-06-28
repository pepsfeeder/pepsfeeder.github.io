# PepsFeeder Site Assessment

## Technical

### Strengths

- **Hugo + Decap CMS pipeline** — CMS publish triggers GitHub Actions, site live in ~2 minutes
- **Pagefind search** integrated at top of homepage
- **gh-pages overlay strategy** preserves static assets across deploys without re-uploading
- **Insight content properly excluded** — articles marked `draft: true`, images moved to `excluded-images/`

### Issues

- **Remote `main` lacks `static/`** — 10k+ images only exist on `gh-pages`, not in origin `main`. The overlay deploy works around this, but it means a fresh clone cannot build the site locally without extra steps.
- **Repository split** — Hugo source on `main` branch, built output on `gh-pages` branch. Standard but adds mental overhead versus a single-branch Pages deploy.
- **Git submodules look misconfigured** — `pepsfeeder/themes/hugo-book` and `pepsfeeder/public` paths suggest a nested repo structure rather than the expected flat layout.
- **No pre-deploy CI** — Hugo errors only surface at build time during the Actions workflow.

## Non-Technical

### Strengths

- **236 published articles** — substantial content library spanning multiple topics
- **Clear content separation** — regular articles distinct from opinion/insight pieces
- **Consistent formatting** — all posts follow the same front-matter schema (author, date, excerpt, featured image)

### Issues

- **No author identity or brand** — articles read as syndicated/aggregated. There is no "About" page that establishes who runs the site and why.
- **SEO basics present, advanced missing** — excerpts and tags exist, but no structured data, sitemap optimization, or canonical strategy was observed.
- **No revenue model visible** — no ads, newsletter signup, product, or monetization path in place.
