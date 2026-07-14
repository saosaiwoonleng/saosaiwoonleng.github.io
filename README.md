# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site presents his professional experience, education, and past projects.

Live site: https://saosaiwoonleng.github.io/

## Project Overview

This is a single-page portfolio site rendering a résumé/CV-style layout: introduction, work experience, education, skills, and a project showcase. It includes a handful of small self-contained UI features (scroll-triggered animations, an animated headline effect, a "Scribbler" project widget) built directly on top of `index.html` rather than as separate apps.

## Technology Stack

- **Hosting**: [GitHub Pages](https://pages.github.com/), served from the `main` branch via [Jekyll](https://jekyllrb.com/) (`_config.yml`, theme `jekyll-theme-midnight`). No Jekyll layouts/includes are used — `index.html` and `404.html` are served as static files.
- **Markup/Styling**: Plain HTML5 + CSS, [Bootstrap 4](https://getbootstrap.com/docs/4.6/) (CSS only, no Bootstrap JS bundle is included).
- **Scripting**: Vanilla JavaScript + [jQuery 3.7.0](https://jquery.com/), plus a few small vendored UI libraries:
  - `Content/AOS` — [Animate On Scroll](https://michalsnik.github.io/aos/) for scroll-reveal animations
  - `Content/WordAnimation` — animated/"chaffle" text effects for the headline
  - `Content/Scribbler` — assets for the Scribbler project showcase widget
  - `Content/Charts` — styling for the skills chart
- There is no build step, package manager, or bundler — all third-party libraries are vendored directly under `Content/` and referenced with plain `<link>`/`<script>` tags.

## Project Structure

```
index.html          Main portfolio page (single page, all sections)
404.html             Custom GitHub Pages 404 page
favicon.ico          Site favicon
_config.yml          Jekyll configuration (theme only; no custom layouts)
Content/             All vendored CSS/JS assets and site-specific styles
  Site.css            Site-specific overrides
  bootstrap*.css/js    Vendored Bootstrap 4.6.0 (CSS only)
  Hola/                Base theme (Hola) CSS/JS/fonts/images this site is built on
  AOS/                 Scroll animation library
  WordAnimation/       Animated headline text effect
  Scribbler/           Scribbler project widget assets
  Charts/              Skills chart styling
```

There is no separate test directory, server code, or API — this is a static, client-side-only site.

## Development Setup

No dependency installation or build tooling is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
   cd saosaiwoonleng.github.io
   ```
2. Open `index.html` directly in a browser, or serve the directory locally, e.g.:
   ```bash
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```
3. Edit `index.html`, `404.html`, or files under `Content/` directly — changes are visible on refresh with no build step.

## Build and Test Instructions

There is no build, bundling, lint, or type-check step — the site is plain static HTML/CSS/JS served as-is.

Before pushing changes, manually verify in a browser:
- The page loads with no console errors
- Layout looks correct on both desktop and mobile widths
- Links and section anchors navigate correctly

## CI/CD Documentation

- GitHub Actions runs a link check on every push and pull request (`.github/workflows/html-validate.yml` → `scripts/check-links.js`), verifying every local `href`/`src` reference in `index.html` and `404.html` resolves to a file that actually exists in the repo (catches typos in asset paths before they go live as 404s).
- **Deployment**: GitHub Pages builds and deploys automatically from the `main` branch on every push — no separate deploy step is required. Changes merged to `main` go live at https://saosaiwoonleng.github.io/ within a few minutes.
- **Rollback**: revert the offending commit(s) on `main` and push; GitHub Pages will redeploy the reverted state automatically.

## License

No license file is present; all rights reserved by the author unless stated otherwise.
