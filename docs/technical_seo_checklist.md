# PepsFeeder: Technical SEO & Crawlability Checklist

To ensure maximum crawl efficiency and high search engine visibility, all technical parameters must be strictly followed.

## 1. Crawlability & Indexing
- [ ] **robots.txt:** Verified and points to the correct sitemap.
- [ ] **sitemap.xml:** Ensure Hugo generates a fresh sitemap at `/sitemap.xml`.
- [ ] **Canonical Tags:** Every page must have a self-referencing canonical tag to avoid duplicate content issues.
- [ ] **404 Page:** Custom 404 page exists and does not return a 200 OK status.
- [ ] **Broken Links:** Perform monthly audits for 404s and redirect where necessary.

## 2. On-Page Structure
- [ ] **H1 Tag:** Each page must have exactly one H1 tag (Title).
- [ ] **Meta Descriptions:** Every page must have a unique meta description (150-160 characters) using `.Params.description`.
- [ ] **Image Alt Text:** All images must have descriptive alt text for accessibility and SEO.
- [ ] **Clean URLs:** Ensure all URLs are lowercase and use hyphens, not underscores.

## 3. Structured Data (JSON-LD)
- [ ] **Article Schema:** All posts must use `BlogPosting` or `Article` schema with correct `datePublished`, `author`, and `publisher` info.
- [ ] **Organization Schema:** Homepage must include `Organization` and `WebSite` schema.
- [ ] **Breadcrumbs Schema:** Implement breadcrumbs for better SERP display.

## 4. Mobile UX & Speed
- [ ] **Mobile Responsive:** All layouts must be fully responsive and pass Google's Mobile-Friendly test.
- [ ] **Page Speed:** Minimize large JavaScript libraries. Use native Hugo image processing for resizing.
- [ ] **Web Vitals:** Target LCP (Largest Contentful Paint) under 2.5s.

## 5. Hugo Implementation Snippets

### Meta Template (layouts/partials/head.html)
```html
<link rel="canonical" href="{{ .Permalink }}">
<meta name="description" content="{{ with .Description }}{{ . }}{{ else }}{{ .Summary | truncate 160 }}{{ end }}">
```

### JSON-LD (layouts/partials/schema.html)
```html
{{ if .IsPage }}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": {{ .Title | jsonify }},
  "datePublished": {{ .Date.Format "2006-01-02T15:04:05Z07:00" | jsonify }},
  "author": {
    "@type": "Person",
    "name": {{ .Params.author | default .Site.Params.author.name | jsonify }}
  },
  "publisher": {
    "@type": "Organization",
    "name": {{ .Site.Title | jsonify }},
    "logo": {
      "@type": "ImageObject",
      "url": {{ .Site.Params.logo | absURL | jsonify }}
    }
  },
  "description": {{ .Summary | plainify | safeHTML | jsonify }}
}
</script>
{{ end }}
```
