# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng (Reo), a software engineer based in Singapore. Live at [saosaiwoonleng.github.io](https://saosaiwoonleng.github.io/).

## Project Overview

A single-page portfolio site presenting an about section, skills, work experience, project gallery, and a contact section. It's built as static HTML/CSS/JS and served directly by GitHub Pages — there is no backend, build step, or database.

Notable behaviour:
- Scroll-triggered animations (AOS), a typing/letter animation on the hero section, and a lightbox gallery (PhotoSwipe) for project screenshots.
- A hidden Formspree-backed form (`#newUserAlert`) posts a lightweight "someone viewed the portfolio" notification.
- Content, styling, and third-party libraries all live under `Content/`.

## Technology Stack

- **Markup/Styling:** HTML5, CSS (Bootstrap 4.6.0 grid/reboot, custom `Content/Site.css`, `Content/Hola` theme CSS)
- **Scripting:** vanilla JS + jQuery 3.7.0, plus vendored plugins:
  - AOS (scroll animations)
  - Chaffle / MovingLetter (text animation effects)
  - Pace.js, Modernizr (page-load/feature-detection helpers)
  - PhotoSwipe (image gallery lightbox, bundled inside the Hola theme assets)
- **Form handling:** [Formspree](https://formspree.io/) (client-side POST, no server code in this repo)
- **Hosting:** GitHub Pages, serving straight from the repository (`_config.yml` is a leftover Jekyll theme declaration — the site itself is a static `index.html`, not a Jekyll template)

There is no package manager, bundler, or build step: all third-party libraries are committed directly under `Content/` rather than installed via npm/yarn.

## Project Structure

```
.
├── index.html              # Main (and only) page — entry point of the site
├── 404.html                 # Custom GitHub Pages 404 page
├── favicon.ico
├── _config.yml              # GitHub Pages/Jekyll config (theme only, unused by index.html)
└── Content/
    ├── Hola/                # Base theme: CSS, fonts, images, and core JS (jQuery, plugins, main.js)
    ├── AOS/                 # "Animate on scroll" library + site-specific loader
    ├── Scribbler/            # Styles/JS for the "Scribbler" project section
    ├── Charts/                # Styles for chart/stat elements
    ├── WordAnimation/         # Chaffle/MovingLetter text animation libraries
    ├── bootstrap*.css        # Vendored Bootstrap 4.6 grid/reboot styles
    └── Site.css               # Site-specific overrides
```

There is no dedicated test suite or `src`/`dist` split — `index.html` and `404.html` are served as-is.

## Development Setup

Requirements: any modern web browser. No Node.js, Ruby, or other runtime is required to view the site locally.

1. Clone the repository:
   ```bash
   git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
   cd saosaiwoonleng.github.io
   ```
2. Open `index.html` directly in a browser, or serve the directory with any static file server, e.g.:
   ```bash
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

No environment variables or secrets are required to run the site locally.

## Build and Test Instructions

There is no build step, package manager, linter, or automated test suite in this repository — it is plain static HTML/CSS/JS. Verification is manual:

- Open `index.html` in a browser and check the page renders correctly and all sections/animations work.
- Check the browser console for missing assets or JS errors.
- A CI workflow (see below) automatically validates HTML and checks for broken links on every push/PR.

## CI/CD

GitHub Actions workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

- **Triggers:** every push and pull request.
- **Checks:**
  - HTML validation of `index.html` and `404.html`.
  - Broken link checking across the repository (internal links and asset references).
- These checks must pass before a pull request is considered mergeable.

### Deployment

Deployment is handled automatically by **GitHub Pages**: any push to the `main` branch is published to `https://saosaiwoonleng.github.io/` with no separate build or deploy workflow required.

**Rollback:** if a change on `main` causes a regression, revert the offending commit(s) (`git revert <sha>`) and push to `main` — GitHub Pages will redeploy the reverted state automatically. There is no separate release/versioning process.
