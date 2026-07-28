# saosaiwoonleng.github.io

Personal portfolio / CV website for Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site lists background, skills, work experience, and past projects, and includes a contact form.

Live site: https://saosaiwoonleng.github.io/

## Project Overview

- Single-page portfolio (`index.html`) covering profile, skills, experience, education, and a project showcase ("Scribbler").
- Custom `404.html` error page.
- Contact form and a silent "new visitor" notification form, both backed by [Formspree](https://formspree.io/).
- No backend, database, or build step — it is a static site served directly by GitHub Pages.

## Technology Stack

- **Hosting/build:** [GitHub Pages](https://pages.github.com/) with Jekyll, theme `jekyll-theme-midnight` (`_config.yml`).
- **Markup/styling:** Hand-written HTML5 + CSS (Hola template base, custom `Content/Site.css`, `Content/Scribbler`, `Content/WordAnimation`, `Content/Charts`).
- **JavaScript libraries (vendored under `Content/`):** jQuery 3.7.0, Modernizr 3.3.1, Pace.js, AOS (Animate On Scroll), Chaffle (text scramble effect), Moving Letter.
- **Forms:** Formspree (third-party form backend, no server code in this repo).
- **404 page only:** Bootstrap 3.4.1 CSS and Google Fonts ("Arvo"), loaded from public CDNs.

## Project Structure

```
.
├── index.html          # Main single-page site
├── 404.html            # Custom GitHub Pages error page
├── _config.yml         # Jekyll/GitHub Pages configuration
├── favicon.ico
├── Content/            # All static assets
│   ├── Hola/           # Base theme: css, js, fonts, images
│   ├── Scribbler/      # Projects showcase module
│   ├── WordAnimation/  # Animated heading effects (Chaffle/Moving Letter)
│   ├── AOS/            # Scroll animation library
│   └── Charts/         # Skill-bar chart styling
└── docs/
    └── maintenance-report/  # Dated maintenance/audit reports
```

There is no application entry point beyond `index.html`/`404.html`, and no test directory — the project has no build or test tooling (see below).

## Development Setup

No installation or dependency manager is required.

1. Clone the repository:
   ```
   git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
   cd saosaiwoonleng.github.io
   ```
2. Open `index.html` directly in a browser, or serve the directory locally, e.g.:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

To preview with the actual Jekyll theme applied (optional, requires Ruby + Bundler):
```
gem install bundler jekyll
bundle exec jekyll serve
```

There are no environment variables or secrets required to run the site locally.

## Build and Test Instructions

This is a static site with no build, lint, or type-check step. The only automated check is the link/asset validation described below under CI/CD.

## CI/CD Documentation

A GitHub Actions workflow (`.github/workflows/link-check.yml`) runs on every push and pull request targeting `main`. It crawls `index.html` and `404.html` and fails the run if any internal or external link/asset is broken. This is a required check intended to catch broken references before they reach production.

## Deployment Documentation

- GitHub Pages serves this repository directly from the `main` branch root, building it with Jekyll using the theme declared in `_config.yml`. There is no separate deploy step or hosting account to configure.
- **Release process:** merge changes into `main`; GitHub Pages rebuilds and redeploys automatically, typically within a minute or two.
- **Rollback:** revert the offending commit on `main` (`git revert <sha>`) and push; GitHub Pages will rebuild from the reverted state. Since there is no database or persisted state, rollback is purely a Git operation.
