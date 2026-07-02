# saosaiwoonleng.github.io

Personal portfolio website for Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site presents an about/skills/experience overview and a filterable showcase of past projects, and is published live at [saosaiwoonleng.github.io](https://saosaiwoonleng.github.io/).

## Project Overview

- Single-page portfolio (`index.html`) with sections for Home, About, Skills, Experiences, Projects and Contact.
- Custom `404.html` error page.
- Project showcase is a filterable masonry grid (Windows App, Web App, Mobile App, Electronic Project, Project, Gaming PC).
- Scroll-triggered animations (AOS), a text/letter animation on the hero heading, a testimonials carousel, and a contact form.
- No backend/server component — the contact form submits directly to [Formspree](https://formspree.io/).

## Technology Stack

- **Markup/Styling**: static HTML5, CSS3 (no CSS preprocessor build step; compiled CSS is committed directly).
- **CSS frameworks/libraries**: [Bootstrap 4](https://getbootstrap.com/) (grid/reboot/base CSS only, no Bootstrap JS), a custom "Hola" template (`Content/Hola`).
- **JavaScript libraries** (vendored under `Content/`, no package manager): jQuery, [AOS](https://michalsnik.github.io/aos/) (animate on scroll), Modernizr, pace.js, Masonry, imagesLoaded, parallax.js, Chaffle/moving-letter text animation.
- **Form handling**: [Formspree](https://formspree.io/) (third-party hosted form backend).
- **Hosting/deployment**: [GitHub Pages](https://pages.github.com/), served from the `main` branch of this repository (a `username.github.io` repo). Jekyll is available (`_config.yml` sets `theme: jekyll-theme-midnight`) but the site's HTML files are plain static pages without Jekyll front matter, so they are published as-is.

There is no application server, database, or build pipeline — this is a purely static site.

## Project Structure

```
.
├── index.html              # Main single-page site
├── 404.html                 # Custom 404 error page
├── _config.yml               # GitHub Pages / Jekyll config
├── favicon.ico
├── Content/
│   ├── Site.css              # Site-specific overrides
│   ├── bootstrap*.css        # Vendored Bootstrap 4 CSS (grid/reboot/full)
│   ├── AOS/                  # Animate-on-scroll library
│   ├── Charts/                # Chart-related styling
│   ├── Hola/                  # Base template: css/, js/, fonts/, images/
│   ├── Scribbler/             # "Scribbler" landing/demo page assets
│   └── WordAnimation/         # Letter/word animation effects
├── scripts/
│   └── check-local-links.js   # CI helper: verifies local href/src references resolve
└── .github/workflows/ci.yml   # CI: link check + HTML validation
```

There is no dedicated `src` vs `dist` split — files under `Content/` and the HTML entry points are what gets served directly.

## Development Setup

Required tooling:

- A modern web browser.
- [Node.js](https://nodejs.org/) 18+ (only needed to run the CI checks locally; the site itself has no build step).
- Optionally, any static file server for local preview (e.g. Python's `http.server`, VS Code Live Server).

No dependency installation is required to run the site — all third-party libraries are vendored directly under `Content/`.

Local preview:

```bash
# from the repository root
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

There are no environment variables or secrets required — the only external integration is the public Formspree form endpoint referenced directly in `index.html`.

## Build and Test Instructions

There is no build step (no bundler/transpiler) — HTML/CSS/JS files are served as committed.

To run the available checks locally (requires Node.js):

```bash
# Verify every local href/src in index.html and 404.html resolves to a real file
node scripts/check-local-links.js

# Validate HTML structure (uses the project's lenient rule set in .html-validate.json)
npx --yes html-validate --config .html-validate.json index.html 404.html
```

There is no unit/integration test suite, since this is a static content site.

## CI/CD Documentation

GitHub Actions workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

- **Triggers**: every push to `main` and every pull request targeting `main`.
- **Checks**:
  - `scripts/check-local-links.js` — fails if any local asset reference (`href`/`src`) in `index.html` or `404.html` points to a missing file.
  - `html-validate` — fails on structural HTML errors (unclosed tags, invalid nesting, duplicate IDs, etc.), using the project's `.html-validate.json` rule set which intentionally disables purely stylistic/accessibility-opinion rules that don't match the vendored template's markup conventions.
- Both checks must pass before merging.

## Deployment Documentation

- Deployment is handled automatically by **GitHub Pages** whenever `main` is updated — there is no separate deploy step or workflow to run.
- Repository settings: Pages is configured to build from the `main` branch (repository root).
- **Release process**: merge changes into `main`; GitHub Pages rebuilds and publishes automatically, usually within a minute.
- **Rollback**: revert the offending commit(s) on `main` (e.g. `git revert <sha>`) and push — GitHub Pages will redeploy the reverted state automatically. There is no database or persistent state to roll back.

## Repository Hygiene Notes

- Vendored third-party libraries (jQuery, Bootstrap, AOS, Masonry, etc.) are committed directly rather than managed via a package manager. When updating them, replace the vendored file(s) with the official upstream build for the same file set and re-run the CI checks above.
- Keep `.gitignore` up to date for local/editor artifacts (e.g. `*.log`) so they don't get committed accidentally.
