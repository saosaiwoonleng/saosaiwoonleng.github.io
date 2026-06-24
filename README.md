# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng (Reo), a software engineer in
Singapore. The site showcases professional experience, education, technical
skills, and past projects, and includes a contact form.

Live at: https://saosaiwoonleng.github.io/

## Project Overview

- Single-page portfolio (`index.html`) with sections for an intro/hero,
  about, skills, employment history, education history, projects, and
  contact.
- Custom `404.html` error page.
- No backend or database — the contact form posts directly to
  [Formspree](https://formspree.io/), a third-party form-to-email service.

## Technology Stack

- Plain HTML5, CSS3, and vanilla/jQuery-based JavaScript — no JS framework,
  no build tooling, no package manager.
- Hosted on [GitHub Pages](https://pages.github.com/), built with Jekyll
  using the bundled `jekyll-theme-midnight` theme (see `_config.yml`).
- Vendored third-party libraries (checked into `Content/`, not installed via
  a package manager):
  - [jQuery](https://jquery.com/) 3.7.1
  - [AOS](https://michalsnik.github.io/aos/) (Animate On Scroll)
  - [Modernizr](https://modernizr.com/) (custom feature-detection build)
  - [Pace.js](https://github.hubspot.com/pace/) (page-load progress bar)
  - Chaffle / MovingLetter (text animation effects)
  - Hola theme assets (fonts, icon font, images)

## Project Structure

- `index.html` — the entire single-page site.
- `404.html` — custom not-found page.
- `_config.yml` — Jekyll configuration (theme selection) used by GitHub
  Pages' build.
- `Content/` — all static assets, grouped by library/feature:
  - `Content/Hola/` — base theme (CSS, fonts, images, core JS).
  - `Content/AOS/` — scroll animation library.
  - `Content/Charts/` — chart styling.
  - `Content/WordAnimation/` — text animation effects (Chaffle, MovingLetter).
  - `Content/Scribbler/` — styles/scripts for the Scribbler project showcase.
- `favicon.ico` — site favicon.
- `.vscode/launch.json` — local VS Code browser-launch config (gitignored;
  not part of the deployed site).

There is no application entry point beyond `index.html`/`404.html`, no
environment configuration, and no automated test suite — this is a static
site with no server-side logic.

## Development Setup

No installation step is required; there is no `package.json` or dependency
manager.

1. Clone the repository.
2. Serve the directory with any static file server, e.g.:

   ```bash
   python3 -m http.server 8000
   ```

   Then open `http://localhost:8000/index.html` in a browser.

   (Opening `index.html` directly via `file://` also works for most content,
   but a local server more closely matches how GitHub Pages serves the
   site.)

There are no environment variables or secrets required to run the site.

## Build and Test Instructions

- **Build:** none required for local development. GitHub Pages performs the
  Jekyll build automatically on deploy (see `_config.yml`).
- **Tests:** there is no automated test suite, since the site has no
  application logic to unit test. Verify changes by loading the page in a
  browser and checking the browser console for errors.
- **Lint/type checks:** not applicable — plain HTML/CSS/JS with no build
  pipeline.

## CI/CD Documentation

- A GitHub Actions workflow (`.github/workflows/html-check.yml`) runs on
  pushes and pull requests and checks that all local asset references
  (scripts, stylesheets, images) in the HTML files resolve to files that
  exist in the repository — catching broken links from renames or deletions.
  It does not deploy anything and does not gate the GitHub Pages build
  below.
- **Deployment:** GitHub Pages builds and deploys directly from the `main`
  branch using Jekyll (configured in the repository's Settings → Pages).
  Pushing to `main` is sufficient to publish a change; there is no separate
  deploy step or environment to manage.

## Deployment Documentation

- **Release process:** merging to `main` is the release — GitHub Pages
  rebuilds and publishes automatically, usually within a minute or two.
- **Rollback:** revert or `git revert` the offending commit(s) on `main` and
  push; GitHub Pages will rebuild from the reverted state. Because the site
  is static with no database, there is no data migration to reverse.
