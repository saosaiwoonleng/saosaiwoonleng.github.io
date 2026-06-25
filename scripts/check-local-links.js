#!/usr/bin/env node
// Verifies every local href/src reference in the site's HTML files points to a file that exists.
// Run from the repository root: node scripts/check-local-links.js

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const htmlFiles = fs
  .readdirSync(repoRoot)
  .filter((name) => name.endsWith(".html"));

const ATTR_PATTERN = /\b(?:href|src)\s*=\s*["']([^"']+)["']/g;

let missing = [];

for (const file of htmlFiles) {
  const html = fs
    .readFileSync(path.join(repoRoot, file), "utf8")
    .replace(/<!--[\s\S]*?-->/g, "");
  let match;
  while ((match = ATTR_PATTERN.exec(html))) {
    const ref = match[1];

    if (
      ref === "" ||
      ref.startsWith("#") ||
      ref.startsWith("http://") ||
      ref.startsWith("https://") ||
      ref.startsWith("//") ||
      ref.startsWith("mailto:") ||
      ref.startsWith("tel:") ||
      ref.startsWith("data:")
    ) {
      continue;
    }

    const cleanRef = ref.split("#")[0].split("?")[0];
    const resolved = path.join(repoRoot, decodeURIComponent(cleanRef));

    if (!fs.existsSync(resolved)) {
      missing.push(`${file}: ${ref}`);
    }
  }
}

if (missing.length > 0) {
  console.error("Broken local references found:\n");
  for (const entry of missing) {
    console.error(`  - ${entry}`);
  }
  process.exit(1);
}

console.log(`OK: checked ${htmlFiles.length} HTML file(s), all local references resolve.`);
