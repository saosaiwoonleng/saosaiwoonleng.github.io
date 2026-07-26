# saosaiwoonleng.github.io

Personal portfolio website for Sao Sai Woon Leng (Reo), a software engineer in Singapore. The site showcases projects, education, professional experience, and contact details.

Live at: https://saosaiwoonleng.github.io

## Project Overview

- Single-page portfolio (`index.html`) with sections for intro, about, experience, portfolio/projects, and contact.
- Custom `404.html` error page.
- Contact and newsletter forms submit to [Formspree](https://formspree.io).
- Served directly by GitHub Pages — there is no server-side application or database.

## Technology Stack

- Plain HTML5, CSS3, and vanilla/jQuery JavaScript — no build step, bundler, or package manager.
- Hosting/deploy: [GitHub Pages](https://pages.github.com/) (`_config.yml` sets `theme: jekyll-theme-midnight`, though the site's own markup and styling are used as-is rather than Jekyll templating).
- Vendored front-end libraries (checked into `Content/`):
  - jQuery 3.7.0
  - Bootstrap 4.6.0 (grid/reboot CSS only; no Bootstrap JS is loaded)
  - AOS (Animate On Scroll)
  - Modernizr, pace.js
  - Custom bundles: Scribbler, WordAnimation (Chaffle/MovingLetter)
- Forms: Formspree (external, no secrets stored in this repo)

## Project Structure

```
.
├── index.html              # Main site entry point
├── 404.html                 # Custom error page
├── _config.yml               # GitHub Pages / Jekyll config
├── favicon.ico
└── Content/                  # All CSS/JS/font/image assets
    ├── Hola/                 # Theme CSS/JS, fonts, images
    ├── AOS/                  # Scroll animation library
    ├── Charts/                # Chart styling
    ├── Scribbler/             # Landing/typing effect
    ├── WordAnimation/         # Text animation effects
    └── bootstrap*.css         # Bootstrap grid/reboot styles
```

There is no test suite, backend, or database in this repository.

## Development Setup

Requirements: any modern web browser. No Node.js, Ruby, or package manager is required to run the site locally.

To develop locally:

1. Clone the repository.
2. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:
   ```bash
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

No environment variables or secrets are required — the contact/newsletter forms post directly to a public Formspree endpoint.

## Build and Test Instructions

There is no build step, linter, or automated test suite — the site is static HTML/CSS/JS served as-is.

Before publishing changes, manually verify in a browser:

- The page loads without console errors.
- Navigation, animations (AOS/WordAnimation), and the portfolio grid work as expected.
- Contact and newsletter forms submit successfully.
- The page renders correctly on both desktop and mobile viewport widths.

## CI/CD

A GitHub Actions workflow (`.github/workflows/link-check.yml`) runs on pushes/PRs to `main` that touch HTML files. It checks internal links, images, and scripts referenced in the HTML for broken paths, so a typo'd `href`/`src` is caught before it reaches production.

Deployment is handled by GitHub Pages: pushing to `main` automatically builds and publishes the site. There is no separate staging environment.

## Deployment

- **Process:** Push to `main` → GitHub Pages automatically rebuilds and publishes to `https://saosaiwoonleng.github.io`.
- **Rollback:** Revert or `git revert` the offending commit on `main` and push; GitHub Pages will redeploy the previous state. Because the site is static, there is no database or migration state to roll back.
