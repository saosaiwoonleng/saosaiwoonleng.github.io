# saosaiwoonleng.github.io

Personal portfolio website for Sao Sai Woon Leng (Reo), a Software Engineer based in Singapore. Live at [saosaiwoonleng.github.io](https://saosaiwoonleng.github.io/).

## Project Overview

A single-page portfolio site covering an about/intro section, technical and professional skills, employment and education history, a filterable project gallery, testimonials, and a contact form. The site is fully static — there is no backend, database, or build step. The contact form posts directly to [Formspree](https://formspree.io/).

High-level layout:
- `index.html` — the entire single-page site (home, about, skills, experience, projects, testimonials, contact).
- `404.html` — custom GitHub Pages 404 error page.

## Technology Stack

- **Markup/Styling**: plain HTML5 and CSS3 (no preprocessor build step; compiled CSS is committed directly).
- **JavaScript**: vanilla JS plus a small set of vendored libraries, all loaded via `<script>` tags (no bundler, no npm dependency tree):
  - [jQuery](https://jquery.com/) 3.7.1 — DOM/event handling for the bundled UI plugins.
  - Custom plugin bundle (`Content/Hola/js/plugins.js`) — includes Waypoints, parallax.js, Masonry/jQuery Bridget, and PhotoSwipe.
  - [AOS](https://michalsnik.github.io/aos/) (Animate On Scroll) — scroll-triggered animations.
  - Custom `Scribbler` and `WordAnimation` modules — typewriter/terminal and letter-animation effects used in the hero/about sections.
- **Hosting/Deployment**: [GitHub Pages](https://pages.github.com/), serving the repository directly from the `main` branch.
- **Forms**: [Formspree](https://formspree.io/) handles contact form submissions (no server-side code in this repo).

There is no `package.json`/npm dependency manifest — all third-party JS/CSS is vendored directly under `Content/` rather than installed from a registry.

## Project Structure

```
.
├── index.html              # entry point — the entire site
├── 404.html                 # GitHub Pages custom 404 page
├── _config.yml               # GitHub Pages/Jekyll passthrough config
├── favicon.ico
└── Content/
    ├── Site.css               # top-level custom overrides
    ├── Hola/                  # base theme: CSS, JS, fonts, images
    │   ├── css/                # base.css, main.css, vendor.css, fonts.css, iconic icon font
    │   ├── js/                 # jquery, plugins.js, main.js, portfoliogrid.js, modernizr, pace
    │   ├── fonts/               # webfonts (Libre Baskerville, Montserrat, Nunito)
    │   └── images/              # hero/background images and the portfolio gallery
    ├── AOS/                   # vendored Animate-On-Scroll library
    ├── Scribbler/              # custom typewriter/terminal effect
    ├── WordAnimation/           # custom letter animation effect (chaffle, movingletter)
    └── Charts/                 # CSS for the circular skill charts
```

There is no dedicated test directory — see [Build and Test Instructions](#build-and-test-instructions) for how changes are verified.

## Development Setup

No installation or build tooling is required — this is a static site of plain HTML/CSS/JS files.

**Requirements:** any modern web browser, plus optionally a local static file server (Python 3 or Node.js) for previewing changes outside of `file://`.

**Local preview:**

```bash
# from the repository root
python3 -m http.server 8080
# then open http://localhost:8080/index.html
```

or, with Node.js installed:

```bash
npx http-server -p 8080
```

Edit `index.html`, `404.html`, or files under `Content/` directly and refresh the browser to see changes — there is no compile/build step.

## Build and Test Instructions

- **Build**: none required; files are served as-is.
- **Lint**: HTML markup is checked in CI with [HTMLHint](https://htmlhint.com/) (see [CI/CD](#cicd-documentation)). To run it locally:
  ```bash
  npx htmlhint index.html 404.html
  ```
- **Unit/integration tests**: none — there is no application logic to unit test. Manual verification is done by opening the page in a browser and checking the console for errors (see `/loop` agent or the `verify` skill for an automated headless-browser smoke check).
- **Type checking**: not applicable (no TypeScript/typed source).

## CI/CD Documentation

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request:

- Checks out the repository.
- Runs HTMLHint against `index.html` and `404.html` to catch malformed markup before it reaches `main`.

This is a required check — a failing lint blocks the PR from looking "green," though branch protection (if enabled) governs whether merging is actually blocked.

**Deployment** is handled entirely by GitHub Pages' built-in "deploy from branch" pipeline: any push to `main` is automatically published to `https://saosaiwoonleng.github.io/` within a few minutes. There is no separate deploy job in this repository.

## Deployment Documentation

- **Release process**: commit directly to (or merge a PR into) `main`. GitHub Pages rebuilds and republishes automatically — no manual release/tagging step is needed for this site.
- **Configuration**: `_config.yml` sets the GitHub Pages Jekyll theme (`jekyll-theme-midnight`); since `index.html`/`404.html` carry no Jekyll front matter, Jekyll serves them as static passthrough files rather than themed templates.
- **Rollback**: revert the offending commit(s) on `main` (`git revert <sha>`) and push — GitHub Pages will redeploy the reverted state automatically. There is no database or stateful backend to roll back.

## Repository Hygiene Notes

- Vendored third-party assets (jQuery, AOS, fonts, icon packs) are committed directly rather than installed via a package manager — when updating one, replace the vendored file in place and update the corresponding `<script>`/`<link>` reference in `index.html`/`404.html`.
- Avoid committing editor/OS artifacts (`debug.log`, `.DS_Store`, etc.) — see `.gitignore`.
