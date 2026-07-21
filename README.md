# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng ("Reo"), a software engineer based in Singapore. The site showcases projects, education, professional experience, and contact details.

Live at: https://saosaiwoonleng.github.io

## Project Overview

- Static single-page portfolio (`index.html`) plus a custom `404.html` error page.
- Sections include an intro/hero, about, experience, education, project showcase (Scribbler, WordAnimation, Charts, mobile apps, etc.), and a contact form.
- Small vanilla-JS enhancements: time-based greeting, animated word carousel, and auto-calculated years of experience / project counts.
- Contact and "notify me" forms submit to [Formspree](https://formspree.io) — no backend of its own.

## Technology Stack

- **Hosting:** GitHub Pages, served via Jekyll with the `jekyll-theme-midnight` theme (see `_config.yml`).
- **Markup/Styling:** Hand-written HTML5 + CSS, [Bootstrap](https://getbootstrap.com/) (vendored under `Content/`).
- **JavaScript:** Vanilla JS plus a few small vendored libraries/plugins:
  - `Content/Hola` — jQuery, Modernizr, Pace, and site "Hola" theme assets/plugins
  - `Content/WordAnimation` — Chaffle-based word/letter animation
  - `Content/AOS` — [Animate On Scroll](https://michalsnik.github.io/aos/)
  - `Content/Scribbler`, `Content/Charts` — project-specific scripts/styles used by the Scribbler and Charts project showcases
- **Forms:** Formspree (no server code in this repo).
- No package manager, build step, or bundler — assets are committed directly and referenced as static files.

## Project Structure

```
.
├── index.html       # Main single-page site (entry point)
├── 404.html         # Custom "page not found" page
├── favicon.ico
├── _config.yml      # Jekyll theme configuration for GitHub Pages
└── Content/         # Static assets (CSS, JS, fonts, images) grouped by feature/library
    ├── Hola/
    ├── WordAnimation/
    ├── Scribbler/
    ├── Charts/
    └── AOS/
```

There is no dedicated test directory — this is a static site with no automated build or test tooling.

## Development Setup

No dependency installation or build step is required.

1. Clone the repository.
2. Open `index.html` directly in a browser, or serve the folder locally, e.g.:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

Optional: if you want to preview the Jekyll theme exactly as GitHub Pages renders it, install Ruby/Bundler and run:
```
bundle exec jekyll serve
```

## Build and Test Instructions

There is no build, lint, or automated test pipeline — the site is plain HTML/CSS/JS deployed as-is. Changes should be verified manually by opening the page(s) in a browser (desktop and mobile widths) before committing.

## CI/CD Documentation

GitHub Pages automatically builds and deploys the `main` branch on every push — no separate CI workflow is configured in this repository. There are no required checks before merge; review changes manually and preview locally before pushing to `main`.

## Deployment Documentation

- **Deploy:** Push/merge to `main` — GitHub Pages rebuilds and publishes automatically, typically within a minute or two.
- **Rollback:** Revert the offending commit(s) on `main` and push; GitHub Pages will redeploy the reverted state.
