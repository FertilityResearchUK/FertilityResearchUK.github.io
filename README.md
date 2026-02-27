# Fertility Research UK Website

Static website for Fertility Research UK (FRUK), built with [Eleventy](https://www.11ty.dev/) and content-first Markdown + Nunjucks templates.

## Stack

- Eleventy 3
- Markdown content in `src/*.md`
- Nunjucks layouts/components in `src/_includes/`
- Global data in `src/_data/`
- Vanilla CSS and JavaScript (`src/styles.css`, `src/script.js`)

## Prerequisites

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Local development

```bash
npm run serve
```

This starts Eleventy in watch mode with a local dev server.

## Production build

```bash
npm run build
```

Generated output is written to `_site/`.

## Project structure

```text
.
├── .eleventy.js               # Eleventy config, filters, collections, SVG icon map
├── src/
│   ├── _data/
│   │   └── site.js            # Global site metadata
│   ├── _includes/
│   │   ├── base.njk           # Base layout (SEO/meta, header/footer)
│   │   ├── header.njk
│   │   ├── footer.njk
│   │   ├── home.njk
│   │   ├── about.njk
│   │   ├── research.njk
│   │   ├── support.njk
│   │   ├── fundraising.njk
│   │   ├── team.njk
│   │   └── news.njk
│   ├── assets/                # Images and static assets (passthrough copied)
│   ├── team/                  # Team/trustee profile entries
│   ├── news/                  # News post entries
│   ├── index.md
│   ├── about.md
│   ├── research.md
│   ├── support.md
│   ├── fundraising.md
│   ├── team.md
│   ├── news.md
│   ├── privacy.md
│   ├── 404.md
│   ├── feed.njk
│   ├── robots.njk
│   ├── sitemap.njk
│   ├── styles.css
│   └── script.js
├── _site/                     # Generated output (do not edit)
└── _colour-options.html       # Palette exploration helper page
```

## Content model

### Standard pages

Main pages are Markdown files in `src/` with front matter.

Example:

```yaml
---
title: About
description: Learn about FRUK
layout: about.njk
permalink: /about/
---
```

### Team and trustees

Team profiles live in `src/team/*.md` and are grouped by tags:

- `tags: trustee`
- `tags: team-member`

Ordering is controlled by numeric `order` in front matter.

### News

News posts live in `src/news/*.md` with:

- `headline`
- `summary`
- `date`
- `image` (optional)
- `tags: news`

## Eleventy configuration notes

`.eleventy.js` defines:

- passthrough copy for `src/assets`, `src/styles.css`, `src/script.js`
- custom collections for trustees, team members, and news
- date, slug, initials, and icon filters
- output directory `_site`

## Deployment

This repository is configured for static output deployment.

1. Run `npm run build`
2. Publish contents of `_site/` to your static host (for this repo, GitHub Pages)

## Notes

- `npm test` is currently a placeholder and intentionally exits with an error.
- Update `src/_data/site.js` for site-wide metadata (URL, socials, organisation details).
- Contact form endpoint is set in `src/_includes/support.njk`.

