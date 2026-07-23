# saosaiwoonleng.github.io

Personal portfolio website of Sao Sai Woon Leng (Reo), a software engineer in Singapore. The site showcases projects, education, professional experience, and contact details.

Live at: https://saosaiwoonleng.github.io/

## Project Overview

A single-page portfolio/CV site built as static HTML, CSS, and JavaScript. It includes:

- A hero/intro section with animated greeting text
- About, education, and experience sections
- A projects showcase ("Scribbler")
- A contact form (submitted via [Formspree](https://formspree.io/))
- A custom 404 page

## Technology Stack

- **Markup/Styling:** Plain HTML5 and CSS3 (no CSS preprocessor build step)
- **CSS framework:** [Bootstrap 4.6](https://getbootstrap.com/) (grid/reboot, vendored under `Content/`)
- **Animation libraries:** [AOS](https://michalsnik.github.io/aos/) (scroll animations), a custom "Chaffle"/word-shuffle animation, and a custom text/word animation script
- **Form handling:** Formspree (external, no backend code in this repo)
- **Hosting:** [GitHub Pages](https://pages.github.com/), using the `jekyll-theme-midnight` theme declared in `_config.yml` (the theme's Jekyll layout is not applied to the custom `index.html`/`404.html`, which are served as static files)

There is no package manager, build tool, or test suite — all JS/CSS dependencies are vendored directly in the repository.

## Project Structure

```
.
├── index.html        # Main single-page site (entry point)
├── 404.html           # Custom "page not found" page
├── favicon.ico
├── _config.yml        # GitHub Pages / Jekyll theme configuration
└── Content/            # Vendored CSS/JS assets and site-specific styles
    ├── AOS/            # Scroll-animation library
    ├── Charts/          # Chart styling
    ├── Hola/           # Base theme (css/js/fonts/images)
    ├── Scribbler/       # Projects showcase styles/scripts
    ├── WordAnimation/   # Word/letter animation effects
    ├── Site.css         # Site-wide custom overrides
    └── bootstrap*.css   # Vendored Bootstrap 4.6 grid/reboot styles
```

There is no separate configuration or testing directory — this is a static site with no server-side code.

## Development Setup

No installation or build step is required.

1. Clone the repository:
   ```
   git clone https://github.com/saosaiwoonleng/saosaiwoonleng.github.io.git
   cd saosaiwoonleng.github.io
   ```
2. Open `index.html` directly in a browser, or serve the directory locally, e.g.:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000/`.

A VS Code Chrome launch configuration is provided in `.vscode/launch.json` for debugging `index.html` directly from the editor.

## Build and Test Instructions

This is a static site with no build, lint, type-check, or automated test tooling. Verify changes by loading the page in a browser and checking the console for errors.

## CI/CD Documentation

There is no custom CI/CD pipeline in this repository. Deployment is handled automatically by GitHub Pages: any push to the default branch is built and published by GitHub's Pages infrastructure using the theme configured in `_config.yml`.

## Deployment Documentation

- **Deploy:** Push to the repository's default branch; GitHub Pages rebuilds and publishes automatically (typically within a few minutes).
- **Configuration:** Pages settings (custom domain, HTTPS, build source) are managed in the repository's GitHub Settings → Pages, not in this repo's code.
- **Rollback:** Revert or `git revert` the offending commit(s) on the default branch and push; GitHub Pages will redeploy the reverted state.
