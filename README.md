# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site presents his professional experience, education, skills, and past projects, and includes a contact form.

Live site: https://saosaiwoonleng.github.io/

## Project Overview

- **Purpose**: Single-page personal portfolio / online CV with a hero section, about/experience/education timeline, skills, project showcase, testimonials, and a contact form.
- **Main features**:
  - Responsive one-page layout (hero, about, resume, portfolio, contact)
  - Scroll animations (AOS) and animated text effects (chaffle / moving-letter)
  - Portfolio grid with lightbox-style project gallery
  - "Scribbler" widget with auto-calculated years of experience and project count
  - Time-of-day aware greeting
  - Contact form and a "notify me" opt-in form, both submitted via [Formspree](https://formspree.io/)
  - Custom 404 page
- **Architecture**: This is a static, framework-free website. There is no server-side code and no JavaScript build step — `index.html` loads a set of vendored CSS/JS libraries and small hand-written scripts directly from the `Content/` folder. The site is hosted as a GitHub Pages **user site**, which serves `index.html` from the `main` branch as-is.

## Technology Stack

- **Markup/Styling**: Plain HTML5 + CSS3, built on top of the "Hola" HTML template (`Content/Hola`)
- **JavaScript**: Vanilla JS plus vendored libraries — jQuery, AOS (Animate on Scroll), Modernizr, Pace.js, PhotoSwipe/Waypoints/Parallax (bundled in `Content/Hola/js/plugins.js`), Chaffle and MovingLetter (text animation)
- **Forms**: [Formspree](https://formspree.io/) (third-party form backend, no server required)
- **Hosting**: [GitHub Pages](https://pages.github.com/) — Jekyll is enabled only for the `theme:` setting in `_config.yml`; the actual page content is static HTML and is **not** built from Markdown/Liquid templates
- **No package manager / build tool**: there is no `package.json`, bundler, or transpiler — every asset in `Content/` is served as-is

## Project Structure

```
.
├── index.html              # The entire site (single page)
├── 404.html                # Custom "page not found" page
├── favicon.ico
├── _config.yml             # GitHub Pages / Jekyll theme config
├── .gitattributes
├── .gitignore
├── .vscode/launch.json     # Local browser-debugging config (not required to run the site)
└── Content/
    ├── Hola/                # Base portfolio template: css, js, fonts, images
    ├── Scribbler/           # "Scribbler" widget styles/script
    ├── Charts/              # Chart styling
    ├── WordAnimation/       # Chaffle / MovingLetter text animation libs
    └── AOS/                 # Animate-on-scroll library
```

There is no dedicated `tests/` directory — see [Build and Test Instructions](#build-and-test-instructions) for how this project is validated.

## Development Setup

**Requirements**: a modern web browser. No Node.js, Ruby, or other runtime is required to view or edit the site locally, since there is no build step.

1. Clone the repository:
   ```bash
   git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
   cd saosaiwoonleng.github.io
   ```
2. Open `index.html` directly in a browser, or serve the folder locally to avoid `file://` path quirks:
   ```bash
   python3 -m http.server 8000
   # then visit http://localhost:8000/
   ```
3. Edit HTML/CSS/JS files directly under the repo root and `Content/`; refresh the browser to see changes.

**Environment variables**: none. The contact/notify forms post directly to a Formspree endpoint configured in `index.html`; no API keys or secrets are required.

## Build and Test Instructions

There is no compiled build output — the checked-in HTML/CSS/JS **is** the deployable artifact.

- **Build**: not applicable (no bundler/compiler).
- **Lint / validate HTML**: run an HTML validator against the pages, e.g.:
  ```bash
  npx html-validate index.html 404.html
  ```
  Rule overrides live in `.htmlvalidate.json`, extending `html-validate:recommended`. The disabled rules are intentional exceptions for this specific template rather than blanket suppressions:
  - `no-inline-style` — the purchased "Hola" theme relies on a handful of inline styles.
  - `no-conditional-comment`, `doctype-style` — legacy IE conditional-comment blocks used for old-browser fallbacks.
  - `empty-heading`, `element-permitted-content` — the hero/about text-animation effects (`flipletter`, `movingletter`) intentionally nest `<div>`s inside otherwise-empty `<h1>`/`<h3>` elements as JS injection targets.
  - `attr-quotes`, `void-style`, `attribute-boolean-style`, `no-trailing-whitespace` — stylistic-only, not correctness issues.
  - `no-implicit-button-type`, `hidden-focusable`, `wcag/h30`, `wcag/h32`, `wcag/h71` — accessibility nice-to-haves tracked as future work rather than blocking issues (see the latest report under `docs/maintenance-report/`).
- **Check for broken local links/assets**:
  ```bash
  node scripts/check-links.js index.html 404.html
  ```
- **Automated tests**: none currently exist, since the project has no application logic beyond static markup and small UI scripts. The CI workflow (below) validates HTML structure and checks for broken local links/asset references on every push and pull request.
- **Manual verification**: open `index.html` in a browser (desktop and mobile viewport widths) and confirm the hero, resume, portfolio, and contact sections render and that the contact form submits successfully.

## CI/CD Documentation

GitHub Actions workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

- **Triggers**: every push and pull request that touches HTML files.
- **Checks performed**:
  - HTML validation (`html-validate`) on `index.html` and `404.html`
  - Broken internal link/asset check (verifies that local `href`/`src` references in the tracked HTML resolve to files that exist in the repository)
- **Required checks before merge**: the workflow must pass before a pull request is merged.
- **Deployment**: handled automatically by GitHub Pages — once changes are pushed to the `main` branch, GitHub rebuilds and republishes the site with no separate deploy step or environment promotion required.

## Deployment Documentation

- **Steps**: merging/pushing to `main` is the deployment — GitHub Pages watches the `main` branch of this user site (`<username>.github.io`) and serves `index.html` directly.
- **Required configuration**: GitHub Pages must be enabled for this repository with the source set to the `main` branch (default for a `*.github.io` user site repository). `_config.yml` only sets the Jekyll theme metadata and does not affect the static `index.html`.
- **Release process**: there are no versioned releases; the latest commit on `main` is always what is live.
- **Rollback process**: revert the offending commit(s) on `main` (e.g. `git revert <sha>`) and push — GitHub Pages will redeploy the reverted content within a few minutes. Because there is no build step, a rollback is simply serving a previous commit's files.

## Notes for Maintainers

- Vendored third-party libraries (jQuery, Bootstrap CSS, AOS, PhotoSwipe, etc. under `Content/`) are checked directly into the repository rather than installed via a package manager. When bumping a vendored library, update the file in place (or its version-numbered filename) and update the corresponding `<script>`/`<link>` reference in `index.html`.
- Maintenance and security audit history is recorded under [`docs/maintenance-report/`](docs/maintenance-report/).
