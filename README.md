# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site presents his background, professional experience, and projects (including the "Scribbler" writing app and other work).

Live site: https://saosaiwoonleng.github.io/

## Project Overview

This is a static, single-page portfolio site built on the [Hola](https://onepagelove.com/) HTML template, extended with a few custom sections:

- **About / experience** — bio, auto-calculated years of experience, and a time-of-day-aware greeting.
- **Portfolio** — project showcase, including a "Scribbler" project detail page and mobile app work.
- **Charts** — a small chart section under `Content/Charts`.
- **Contact** — contact details and a text-box carousel.
- **404 page** (`404.html`) — custom not-found page.

There is no backend, build step, or bundler — `index.html` links directly to the vendored CSS/JS assets under `Content/`.

## Technology Stack

- **Hosting:** [GitHub Pages](https://pages.github.com/), served from the `main` branch of this repository (a `<username>.github.io` user site).
- **Static site generator:** [Jekyll](https://jekyllrb.com/), via GitHub Pages, using the `jekyll-theme-midnight` theme (see `_config.yml`). Jekyll only wraps `index.html`/`404.html` as-is — there is no Liquid templating or Markdown content in use.
- **Markup/styling:** plain HTML5 + CSS3, [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/) (vendored under `Content/`), custom CSS in `Content/Site.css` and `Content/Hola/css/`.
- **Scripting:** [jQuery 3.7.0](https://jquery.com/), plus small vendored plugins (AOS scroll animations, Chaffle/WordAnimation text effects, Photoswipe, a custom Scribbler script) under `Content/`.
- **No package manager / no dependency lock file** — all third-party assets are committed directly as static files rather than installed via npm/yarn.

## Project Structure

```
.
├── index.html                  # The entire site (single page, all sections)
├── 404.html                    # Custom GitHub Pages 404 page
├── _config.yml                 # Jekyll theme configuration for GitHub Pages
├── favicon.ico
├── .gitattributes / .gitignore
├── .vscode/launch.json         # VS Code "launch Chrome against localhost" debug config
├── Content/                    # All static assets referenced by index.html/404.html
│   ├── Hola/                   # Base template assets (css/js/fonts/images)
│   ├── AOS/                    # Scroll animation library
│   ├── WordAnimation/          # Text animation (Chaffle) library
│   ├── Scribbler/              # Scribbler project styles/script
│   ├── Charts/                 # Charts section styles
│   └── bootstrap*.css/.js      # Vendored Bootstrap 4.6 assets
└── docs/maintenance-report/    # Dated maintenance/audit reports
```

There is no dedicated test directory — this is a static site with no application logic to unit test.

## Development Setup

Requirements:

- A modern web browser (no Node.js, Ruby, or other runtime is required to preview the page as-is).
- Optional: [VS Code](https://code.visualstudio.com/) with a Chrome/Edge debugger to use the included `.vscode/launch.json`.

Local preview:

1. Clone the repository.
2. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000/`.

If you want to preview exactly what GitHub Pages will render (including the Jekyll theme wrapper), install Ruby + Bundler and use the [GitHub Pages gem](https://github.com/github/pages-gem):
```
gem install github-pages
jekyll serve
```

No environment variables or secrets are required to run or build this site.

## Build and Test Instructions

There is no build step, bundler, linter, or test suite configured for this project — it is plain static HTML/CSS/JS. Changes can be verified by opening the page in a browser and checking the affected section manually across desktop and mobile viewport widths.

A GitHub Actions workflow (see below) performs basic automated HTML validation on every push/PR.

## CI/CD Documentation

- **Workflow:** `.github/workflows/html-check.yml`
- **Trigger:** runs on every push and pull request that touches `*.html` files.
- **What it checks:** validates `index.html` and `404.html` with [html5validator](https://github.com/svenkreiss/html5validator) to catch malformed markup before it ships.
- **Required checks before merge:** the HTML validation job should pass; there are no other automated checks.
- **Deployment:** handled entirely by GitHub Pages — pushing to `main` triggers GitHub's own Pages build (Jekyll) and deploy. There is no custom deploy workflow in this repository.
- **Environment flow:** single environment — `main` is production (the live site).

## Deployment Documentation

- **Deployment steps:** merge/push to `main`. GitHub Pages automatically rebuilds (via Jekyll) and publishes the site at https://saosaiwoonleng.github.io/, typically within a minute or two.
- **Required configuration:** none beyond the repository's Pages setting (Settings → Pages → Source: `main` branch), which is already configured for this `<username>.github.io` repository.
- **Release process:** there is no versioning/release process — `main` is always the deployed state.
- **Rollback process:** revert or `git revert` the offending commit(s) on `main` and push; GitHub Pages will rebuild from the reverted state. Since GitHub Pages serves directly from `main`, the previous commit is always the rollback target.
