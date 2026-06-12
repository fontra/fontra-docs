# Fontra User Docs

Hosted at [docs.fontra.xyz](https://docs.fontra.xyz)

Built with [Eleventy (11ty)](https://www.11ty.dev/) — the same generator as
[fontra-blog](https://github.com/fontra/fontra-blog).

## Building the site locally

Requires [Node.js](https://nodejs.org/) 18 or newer.

```
npm install
npm start
```

Then open the address shown in the terminal (usually `http://localhost:8080`).
The dev server rebuilds and reloads on every change.

To produce a production build in `_site/`:

```
npm run build
npm run check-urls   # verifies all expected URLs exist in _site/
```

## How the site is organized

- `content/` — all pages, as Markdown with YAML front matter, in five
  sections: `introduction/`, `tutorials/`, `how-tos/`, `reference/`,
  `explanations/`. Each section is an Eleventy collection; the `order`
  front matter drives the prev/next links.
- `content/css/style.sass` + `_sass/` — styles (compiled by the build).
- `_layouts/`, `_includes/` — the page template (Liquid).
- `_data/site.js` — site-wide values (`site.url`, `site.title`, …).
- `images/`, `videos/` — static assets, copied as-is.
- `eleventy.config.js` — build configuration, including a small
  kramdown-compatibility layer (see comments there) so the Markdown
  written for the previous Jekyll setup renders unchanged.
- `scripts/check-url-parity.mjs` — asserts that every URL from the
  Jekyll era still exists in the build output.

### Front matter

```
---
title     : Page title
layout    : default
permalink : /section/page-name/
order     : 4232
---
```

Permalinks are explicit and must not be changed casually — existing links
into docs.fontra.xyz depend on them (`npm run check-urls` guards this).

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

# Credits

[Gustavo Ferreira](https://github.com/gferreira) initiated this documentation
