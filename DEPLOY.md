# PepsFeeder — Build & Deploy Guide

## Architecture

```
main (source) ──► GitHub Actions ──► gh-pages (built site) ──► GitHub Pages (live)
```

- **`main`**: Hugo source files (content, layouts, config, static assets)
- **`gh-pages`**: Built output (HTML, CSS, JS, images) — **never edit directly**
- **Live site**: `https://pepsfeeder.github.io/`

---

## Publish from CMS (Decap CMS)

1. Go to `https://pepsfeeder.github.io/admin/`
2. Sign in with GitHub OAuth
3. Click **New Post** (or edit existing)
4. Fill in fields (title, body, featured image, categories, tags)
5. Click **Publish** (not Save — Publish commits to `main`)
6. Wait ~2 minutes — the article will appear on the live site automatically

**What happens behind the scenes:**
- CMS commits the markdown file to `content/posts/` on `main`
- GitHub Actions triggers automatically
- Hugo builds the site, overlays output onto `gh-pages`, triggers Pages rebuild

---

## Publish from Local (direct edits)

If you edit templates, add articles, or change config locally:

```bash
# 1. Make your changes, then test locally
hugo server -D   # preview at http://localhost:1313

# 2. Commit and push to main
git add <your-changed-files>
git commit -m "description of change"
git push origin main
```

The workflow will auto-deploy to GitHub Pages.

### Adding a new article locally

Create a markdown file in `content/posts/`:

```yaml
---
title: "Your Article Title"
date: 2026-06-28
categories:
  - wellness   # or digital, strategy
author: Chris Manoel
image: /wp-content/uploads/your-image.png
tags:
  - tag1
  - tag2
type: post
draft: false
---

Your article content here.
```

Add images to `static/wp-content/uploads/`, then reference them as `/wp-content/uploads/filename.png`.

### Editing templates or CSS

Templates are in `layouts/`, static assets in `static/`. After editing, run `hugo` locally to verify, then commit and push to `main`.

---

## Why Content is Duplicated Between `public/` and Project Root

The `public/` directory is Hugo's build output. It duplicates the site content because:

- **`public/posts/`** = Hugo-generated HTML from `content/posts/`
- **`public/css/`**, **`public/js/`** = Copied from `static/`
- **`public/wp-content/`** = Copied from `static/wp-content/`

This is normal Hugo behavior. `public/` is gitignored and never pushed to `main`.

**However**, the working tree also has leaked build artifacts from earlier erroneous deploys (when the repo was mixed between source and built output). These can be cleaned up:

```bash
rm -rf public/
git checkout -- .   # revert any unintended changes
```

The only directories you should have are:

```
content/    layouts/    static/    data/    .github/
config.toml    Jenkinsfile    README.md
```

Everything else (post directories at root level, `css/`, `js/`, `admin/`, etc.) is stale build output that leaked from earlier deployments.

---

## If Something Goes Wrong

### Deployment fails
Check the workflow run at:
`https://github.com/pepsfeeder/pepsfeeder.github.io/actions`

### Site not updating after CMS publish
Trigger a Pages rebuild manually:
```bash
curl -X POST -H "Authorization: Bearer <PAT>" \
  https://api.github.com/repos/pepsfeeder/pepsfeeder.github.io/pages/builds
```

### Missing images / CSS / admin page
The workflow overlay preserves these from `gh-pages`. If a deploy wiped them, restore from a backup or rebuild:

```bash
hugo
npx pagefind --site public
touch public/.nojekyll
cd public
git init && git add -A && git commit -m "full rebuild"
git remote add origin https://github.com/pepsfeeder/pepsfeeder.github.io.git
git push -f origin HEAD:gh-pages
```
