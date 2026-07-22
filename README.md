# saosaiwoonleng.github.io

Personal portfolio website for Sao Sai Woon Leng (Reo), a software engineer based in Singapore. The site presents a bio, work experience, education, and a project portfolio, and includes a contact section.

Live site: https://saosaiwoonleng.github.io/

## Project Overview

- Single-page portfolio (`index.html`) with sections for intro, about, resume, portfolio/projects, and contact.
- Custom `404.html` error page.
- No backend or database — the site is fully static and served directly by GitHub Pages.

## Technology Stack

- Plain HTML/CSS/JS — no build step, bundler, or package manager (no `package.json`).
- [Bootstrap 4.6.0](https://getbootstrap.com/) for layout and components.
- [jQuery 3.7.0](https://jquery.com/) as the DOM/utility library used by the template's plugins.
- [AOS](https://michalsnik.github.io/aos/) for scroll animations.
- Custom "Hola" template assets (CSS/JS/fonts/images) under `Content/Hola/`.
- `Content/Scribbler/` and `Content/WordAnimation/` provide small custom UI widgets used on the page (text carousel, animated word/heading effects).
- Hosted on GitHub Pages. `_config.yml` sets a Jekyll theme (`jekyll-theme-midnight`), but the site does not rely on Jekyll templating — `index.html` is served as-is.

## Project Structure

```
index.html          Main single-page site (entry point)
404.html             Custom not-found page
_config.yml          GitHub Pages / Jekyll configuration
Content/             Vendored CSS/JS/fonts/images used by the site
  Hola/              Base template assets (css, js, fonts, images)
  AOS/               Scroll-animation library
  Charts/            Chart styling used in the resume/skills section
  Scribbler/         Custom text-carousel widget
  WordAnimation/     Custom animated heading/word effects
favicon.ico          Site favicon
```

There is no test suite or build pipeline — changes are made directly to the HTML/CSS/JS files.

## Development Setup

No installation is required. To work on the site locally:

1. Clone the repository.
2. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

## Build and Test Instructions

There is no build step, dependency installation, or automated test suite configured for this project — it is plain static HTML/CSS/JS. Verify changes by opening the page in a browser and checking the affected section(s) on both desktop and mobile viewport sizes.

## CI/CD

`.github/workflows/validate.yml` runs [html5validator](https://github.com/svenkreiss/html5validator) against `index.html` and `404.html` on every push and pull request targeting `main`, catching malformed markup before it reaches the live site. There is no separate deployment step — see below.

## Deployment

The site is deployed automatically by GitHub Pages from this repository. Pushing to the default branch publishes the change to https://saosaiwoonleng.github.io/ — no separate deployment step is required. To roll back, revert the offending commit(s) on the default branch.
