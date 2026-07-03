# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng (Reo), a software engineer based in Singapore.
Hosted on GitHub Pages at [saosaiwoonleng.github.io](https://saosaiwoonleng.github.io/).

## Project Overview

A single-page portfolio site presenting a bio, skills, work experience, project gallery,
and a contact form. The page is built from static HTML/CSS/JS — there is no backend, build
step, or database; the browser renders `index.html` directly.

Main features:
- Landing hero with time-of-day greeting and animated text
- About / skills / experience timeline
- Filterable project portfolio grid with a lightbox-style detail view
- Contact form that submits to [Formspree](https://formspree.io/) (no server code in this repo)
- Custom 404 page

## Technology Stack

- **Markup/Styling:** plain HTML5 + CSS3 (no framework build step)
- **JavaScript:** vanilla JS + jQuery 3.7.1
- **Vendored front-end libraries** (checked into `Content/`, no package manager):
  - jQuery
  - AOS (Animate On Scroll)
  - Modernizr (custom feature-detect build)
  - Pace.js (page-load progress bar)
  - Bootstrap 4 CSS (grid/utilities only, used by `404.html`)
  - Chaffle / MovingLetter (text animation effects)
- **Hosting:** [GitHub Pages](https://pages.github.com/) via the `jekyll-theme-midnight`
  theme declared in `_config.yml` (the theme only affects Pages' Jekyll processing;
  the site itself ships fully rendered HTML and does not use Jekyll templating)
- **Forms:** Formspree (third-party form backend, no secrets stored in this repo)

## Project Structure

```
.
├── index.html              # The entire single-page site
├── 404.html                 # Custom "page not found" page
├── favicon.ico
├── _config.yml               # GitHub Pages / Jekyll theme config
└── Content/
    ├── Site.css               # Site-wide overrides
    ├── bootstrap*.css         # Bootstrap 4 CSS (used by 404.html only)
    ├── AOS/                   # Animate-on-scroll library
    ├── Charts/                # Skill/experience chart styling
    ├── Scribbler/              # "Scribbler" project showcase styling/JS
    ├── WordAnimation/          # Hero text animation effects
    └── Hola/                  # Base theme: css/, js/, fonts/, images/
```

There is no test directory or build directory — this is a static, unbundled site.

## Development Setup

No installed toolchain is required.

Requirements:
- Any modern web browser
- (Optional) A local static file server, since some browsers restrict `fetch`/asset
  loading from `file://` URLs

Steps:
1. Clone the repository:
   ```
   git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
   cd saosaiwoonleng.github.io
   ```
2. Open `index.html` directly in a browser, **or** serve it locally:
   ```
   python3 -m http.server 8000
   # then visit http://localhost:8000/
   ```

No environment variables or secrets are required. The contact form posts to a public
Formspree endpoint that is already embedded in `index.html`.

## Build and Test Instructions

There is no build step, bundler, package manager, or automated test suite — the
repository is deployed as-is. Verification is manual:

- Open `index.html` and `404.html` in a browser and confirm the page renders,
  animations run, and the contact form is reachable.
- Check the browser console for JavaScript errors after any change to files under
  `Content/`.

If you introduce a package manager (e.g. `npm`) in the future, wire the corresponding
install/build/lint commands into `.github/workflows/pages-ci.yml` (see below) so they
run automatically before merge.

## CI/CD Documentation

`.github/workflows/pages-ci.yml` runs on every push and pull request:
- Lints all HTML files with [HTMLHint](https://htmlhint.com/)
- Checks for dead relative links/assets with
  [lychee](https://github.com/lycheeverse/lychee-action) (external network links are
  best-effort and non-blocking)

The workflow must pass before merging a pull request.

**Deployment:** GitHub Pages serves the repository directly from the default branch
(`main`) — there is no separate deploy step or artifact to publish. Pushing to `main`
is the deployment. There is no staging environment.

## Deployment Documentation

- **Release process:** merge to `main`; GitHub Pages picks up the change automatically
  (typically live within a minute).
- **Rollback process:** revert the offending commit(s) on `main` (`git revert <sha>`)
  and push; GitHub Pages will redeploy the reverted state. Because Pages always serves
  the current `main` HEAD, there is no separate artifact store to roll back — git
  history is the only rollback mechanism.
- **Required configuration:** none beyond the repository's GitHub Pages setting
  (Settings → Pages → Deploy from branch `main`).
