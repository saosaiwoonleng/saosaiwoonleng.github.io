# saosaiwoonleng.github.io

Personal portfolio / online CV for Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site lists skills, work experience, education, and project case studies, and includes a contact form.

Live at: https://saosaiwoonleng.github.io/

## Project Overview

- Single-page portfolio (`index.html`) with sections for about, skills, experience, education, projects, and contact.
- Custom `404.html` error page.
- Scroll-triggered animations (AOS), animated headline text, an interest "Scribbler" widget, and CSS skill-bar charts.
- The contact form and a "notify me when new content is added" form both submit to [Formspree](https://formspree.io/).

## Technology Stack

- Static HTML5 / CSS3 / vanilla JS — no build step, no server-side code.
- [Bootstrap 4.6](https://getbootstrap.com/) (grid + base styles) and [jQuery 3.7.1](https://jquery.com/), vendored locally under `Content/`.
- [AOS](https://michalsnik.github.io/aos/) for scroll animations, plus small standalone libraries for text animation (`WordAnimation`) and the "Scribbler" interest widget.
- [Formspree](https://formspree.io/) for handling form submissions (no backend in this repo).
- Hosted on **GitHub Pages**, served from the `main` branch. `_config.yml` sets the GitHub Pages theme (`jekyll-theme-midnight`); Jekyll itself is not used for the page content — `index.html`/`404.html` are served as-is.

## Project Structure

```
.
├── index.html              # The entire site (single page)
├── 404.html                 # Custom error page
├── _config.yml              # GitHub Pages / Jekyll theme config
├── favicon.ico
├── Content/                 # All vendored CSS/JS/fonts/images, grouped by library
│   ├── Hola/                 # Base theme: css, js, fonts, images (incl. portfolio screenshots)
│   ├── AOS/                  # Scroll-animation library
│   ├── Charts/                # CSS skill-bar chart styles
│   ├── Scribbler/             # "Scribbler" interest widget
│   ├── WordAnimation/          # Animated headline text
│   └── bootstrap*.css/.min.css # Vendored Bootstrap 4.6 grid/reboot/core
├── scripts/
│   └── check-local-links.js  # CI check: verifies local href/src references resolve to real files
└── .github/workflows/
    └── check.yml             # Runs the link checker on push/PR
```

There is no separate test directory or application entry point beyond `index.html`/`404.html` — both are loaded directly by the browser.

## Development Setup

Required tooling:

- Any modern browser.
- [Node.js](https://nodejs.org/) 18+ (only needed to run the CI check script locally; not required to view or edit the site).

No package installation or environment variables are required. To work on the site locally:

1. Clone the repository.
2. Open `index.html` (or `404.html`) directly in a browser, or serve the folder with any static file server, e.g.:
   ```
   npx serve .
   ```
3. Edit HTML/CSS/JS directly under the repo root and `Content/`, then refresh the browser to see changes.

A VS Code launch configuration for opening `index.html` in Chrome is provided in `.vscode/launch.json` (update the local path if you use it).

## Build and Test Instructions

There is no build step, bundler, or transpiler — files are served as-authored.

- **Link check** (verifies every local `href`/`src` in the HTML files points to a file that exists):
  ```
  node scripts/check-local-links.js
  ```
- There is no unit/integration test suite, linter, or type checker configured, since this is a static HTML/CSS/JS site with no application logic to unit test.

## CI/CD Documentation

- GitHub Actions workflow: `.github/workflows/check.yml`.
- **Trigger:** runs on every push to `main` and on every pull request.
- **Check performed:** `node scripts/check-local-links.js`, which fails the build if any local asset reference in `index.html`/`404.html` is broken.
- This workflow only validates the site; it does not deploy. Deployment is handled separately by GitHub Pages (see below).

## Deployment Documentation

- **Hosting:** GitHub Pages, configured to deploy from the `main` branch (Settings → Pages in the GitHub repository).
- **Release process:** merging to `main` is the release — GitHub Pages automatically rebuilds and publishes the site within a few minutes of a push to `main`.
- **Rollback:** revert or `git revert` the offending commit(s) on `main` and push; GitHub Pages will redeploy the previous content automatically. There is no separate release/versioning scheme.
