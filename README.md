# saosaiwoonleng.github.io

Personal portfolio / CV website of Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site presents his background, skills, professional experience, and past projects (including the "Scribbler" writing app and other work), plus a contact form.

Live site: https://saosaiwoonleng.github.io/

## Project Overview

This is a static, single-page portfolio site built on the [Hola](https://onepagelove.com/) HTML template, extended with a few custom sections:

- **About / experience** — bio, auto-calculated years of experience, and a time-of-day-aware greeting.
- **Portfolio** — project showcase, including a "Scribbler" project detail page and mobile app work.
- **Charts** — a small chart section under `Content/Charts`.
- **Contact** — a contact form and a silent "new visitor" notification form, both backed by [Formspree](https://formspree.io/) (no server code in this repo).
- **404 page** (`404.html`) — custom not-found page.

There is no backend, database, or build step — `index.html`/`404.html` link directly to the vendored CSS/JS assets under `Content/`.

## Technology Stack

- **Hosting:** [GitHub Pages](https://pages.github.com/), served from the `main` branch of this repository (a `<username>.github.io` user site).
- **Static site generator:** [Jekyll](https://jekyllrb.com/), via GitHub Pages, using the `jekyll-theme-midnight` theme (see `_config.yml`). Jekyll only wraps `index.html`/`404.html` as-is — there is no Liquid templating or Markdown content in use.
- **Markup/styling:** plain HTML5 + CSS3, [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/) (vendored under `Content/`, used by both `index.html` and `404.html`), custom CSS in `Content/Site.css`, `Content/Scribbler`, `Content/WordAnimation`, and `Content/Charts`.
- **Scripting:** [jQuery 3.7.1](https://jquery.com/), plus small vendored plugins (Modernizr, Pace.js, AOS scroll animations, Chaffle/MovingLetter text effects, a custom Scribbler script) under `Content/`.
- **Forms:** [Formspree](https://formspree.io/) (third-party form backend, no server code in this repo).
- **No package manager / no dependency lock file** — all third-party assets are committed directly as static files rather than installed via npm/yarn.

## Project Structure

```
.
├── index.html                  # The entire site (single page, all sections)
├── 404.html                    # Custom GitHub Pages 404 page
├── _config.yml                 # Jekyll theme configuration for GitHub Pages
├── favicon.ico
├── .gitattributes / .gitignore
├── Content/                    # All static assets referenced by index.html/404.html
│   ├── Hola/                   # Base template assets (css/js/fonts/images)
│   ├── AOS/                    # Scroll animation library
│   ├── WordAnimation/          # Text animation (Chaffle/Moving Letter) library
│   ├── Scribbler/              # Scribbler project styles/script
│   ├── Charts/                 # Charts section styles
│   └── bootstrap*.css/.js      # Vendored Bootstrap 4.6 assets
└── docs/maintenance-report/    # Dated maintenance/audit reports
```

There is no dedicated test directory — this is a static site with no application logic to unit test.

## Development Setup

Requirements:

- A modern web browser (no Node.js, Ruby, or other runtime is required to preview the page as-is).

Local preview:

1. Clone the repository:
   ```
   git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
   cd saosaiwoonleng.github.io
   ```
2. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000/`.

If you want to preview exactly what GitHub Pages will render (including the Jekyll theme wrapper), install Ruby + Bundler and use the [GitHub Pages gem](https://github.com/github/pages-gem):
```
gem install bundler jekyll
bundle exec jekyll serve
```

No environment variables or secrets are required to run or build this site.

## Build and Test Instructions

There is no build step, bundler, linter, or type-check step configured for this project — it is plain static HTML/CSS/JS. Changes can be verified by opening the page in a browser and checking the affected section manually across desktop and mobile viewport widths. The only automated checks are the two CI workflows described below.

## CI/CD Documentation

Two GitHub Actions workflows run on every push/PR touching `main`:

- **`.github/workflows/html-check.yml`** — validates `index.html` and `404.html` with [html5validator](https://github.com/svenkreiss/html5validator) to catch malformed markup before it ships.
- **`.github/workflows/link-check.yml`** — crawls `index.html` and `404.html` and fails if any internal or external link/asset is broken.

Both are required checks intended to catch regressions before they reach production. There is no separate build or deploy workflow — GitHub Pages handles that automatically (see below).

## Deployment Documentation

- **Deployment steps:** merge/push to `main`. GitHub Pages automatically rebuilds (via Jekyll) and publishes the site at https://saosaiwoonleng.github.io/, typically within a minute or two.
- **Required configuration:** none beyond the repository's Pages setting (Settings → Pages → Source: `main` branch), which is already configured for this `<username>.github.io` repository.
- **Release process:** there is no versioning/release process — `main` is always the deployed state.
- **Rollback process:** revert or `git revert` the offending commit(s) on `main` and push; GitHub Pages will rebuild from the reverted state. Since GitHub Pages serves directly from `main` and there is no database or persisted state, rollback is purely a Git operation.
