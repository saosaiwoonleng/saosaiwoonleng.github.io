# saosaiwoonleng.github.io

Personal portfolio website for Sao Sai Woon Leng (Reo), a software engineer based in
Singapore. The site presents an about/introduction section, skills, work experience,
education, and a portfolio of past projects, along with a contact form.

Live site: https://saosaiwoonleng.github.io/

## Project Overview

- **Purpose**: Online CV / portfolio showcasing professional experience, skills, and
  projects, with a contact form for inquiries.
- **Architecture**: A static, hand-built multi-section single page (`index.html`) plus
  a standalone `404.html` error page. There is no build step, bundler, or backend —
  every asset (CSS, JS, fonts, images) is committed directly to the repository and
  served as-is.
- **Hosting**: Deployed via [GitHub Pages](https://pages.github.com/), which serves
  the repository directly from the default branch.

## Technology Stack

- **Markup/Styling**: Hand-authored HTML5 + CSS, built on top of the vendored
  ["Hola" HTML5 template](Content/Hola) and [Bootstrap 4](https://getbootstrap.com/docs/4.6/)
  (grid/utility classes only, used on `404.html`).
- **JavaScript**: Vanilla JS plus a handful of small vendored libraries — jQuery,
  [AOS](https://michalsnik.github.io/aos/) (scroll animations), Pace.js (page-load
  progress bar), Modernizr (feature detection), and Chaffle/`movingletter` (text
  animation effects).
- **Forms**: Contact form is submitted via [Formspree](https://formspree.io/).
- **Hosting/Deployment**: GitHub Pages (static hosting, no server-side code).
- **CI**: GitHub Actions (see [CI/CD](#cicd)).

No package manager (npm/yarn) or build tool is used — third-party libraries live in
`Content/` as static, vendored files rather than `node_modules` dependencies.

## Project Structure

```
.
├── index.html                # Main single-page site (all sections)
├── 404.html                  # Custom 404 error page
├── favicon.ico
├── _config.yml                # GitHub Pages / Jekyll config (theme metadata only)
├── Content/
│   ├── Hola/                  # Vendored "Hola" template: css, js, fonts, images
│   ├── AOS/                   # Scroll-animation library
│   ├── Charts/                # Styles for the skills chart section
│   ├── Scribbler/             # Custom script/styles for the project counter widget
│   ├── WordAnimation/         # Text animation effects (chaffle / movingletter)
│   └── bootstrap.min.css      # Bootstrap 4 (used by 404.html)
└── .github/workflows/ci.yml   # HTML validation + link checking
```

- **Entry point**: `index.html` (served at the site root).
- **Error page**: `404.html`, configured automatically by GitHub Pages.
- **Configuration**: `_config.yml` (GitHub Pages theme metadata; the site does not
  otherwise rely on Jekyll templating).
- **Tests**: There is no application test suite (no backend/business logic to test).
  Verification is done via the CI checks described below.

## Development Setup

No installation or build step is required.

**Requirements**: a modern web browser. A local static file server is recommended
(opening `index.html` directly via `file://` also works, but a server avoids
path-related edge cases).

To run the site locally:

```bash
git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
cd saosaiwoonleng.github.io
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

There are no environment variables or secrets required to run the site locally.

## Build and Test Instructions

There is no compilation/build step — edit the HTML/CSS/JS files directly and refresh
the browser.

**HTML validation** (matches the `validate-html` CI job):

```bash
pip install html5validator
html5validator --root . --match 404.html --also-check-css
```

**Link checking** (matches the `check-links` CI job), using
[lychee](https://github.com/lycheeverse/lychee):

```bash
lychee --offline --no-progress --exclude-mail index.html 404.html
```

There are no unit/integration tests, linters, or type checkers configured, as this is
a static content site with no application logic to unit test.

## CI/CD

GitHub Actions workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

- **Triggers**: every push to `main` and every pull request targeting `main`.
- **Jobs**:
  - `validate-html` — validates `404.html` against the HTML5 spec (and inline CSS)
    using [`html5validator`](https://github.com/svenkreiss/html5validator).
    `index.html` inherits some pre-existing markup nesting issues from its
    third-party theme template; it renders correctly in all browsers, but is not
    yet part of the strict-validation gate (tracked as follow-up cleanup rather
    than blocking CI).
  - `check-links` — checks `index.html` and `404.html` for broken internal
    references using [lychee](https://github.com/lycheeverse/lychee) in offline
    mode.
- **Required checks before merge**: both jobs should pass before merging changes
  that touch `index.html` or `404.html`.
- **Deployment**: handled entirely by GitHub Pages — any push to the default branch
  is published automatically. There is no separate deploy job in this repository.

## Deployment Documentation

- **Deployment steps**: push to the default branch (`main`). GitHub Pages rebuilds
  and republishes the site automatically; no manual steps are required.
- **Configuration**: `_config.yml` sets the (unused) Jekyll theme metadata for Pages;
  no other Pages configuration is needed.
- **Release process**: there are no versioned releases — the live site always
  reflects the latest commit on `main`.
- **Rollback**: revert or `git revert` the offending commit(s) on `main` and push;
  GitHub Pages will redeploy the previous state automatically. Since the site is
  fully static, there is no database or server state to roll back.

## Repository Hygiene Notes

- Third-party libraries are vendored (copied into `Content/`) rather than installed
  via a package manager, so there is no automated dependency-update tooling (e.g.
  Dependabot) tracking them. When updating a vendored library, replace the file(s)
  in place and note the version bump in the commit message.
- `Content/bootstrap.min.css` (and its source map) is the only Bootstrap 4 build
  kept in the repository; unused Bootstrap variants (grid-only/reboot-only builds,
  non-minified builds) were removed to avoid unreferenced, unmaintained assets.
