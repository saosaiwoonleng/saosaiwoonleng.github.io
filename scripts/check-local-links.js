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

// Strips HTML comments via a single linear scan (no regex backtracking over
// the whole file) so disabled/commented-out references aren't reported as broken.
function stripHtmlComments(html) {
  let result = "";
  let i = 0;
  while (i < html.length) {
    const start = html.indexOf("<!--", i);
    if (start === -1) {
      result += html.slice(i);
      break;
    }
    result += html.slice(i, start);
    const end = html.indexOf("-->", start + 4);
    if (end === -1) break;
    i = end + 3;
  }
  return result;
}

let missing = [];

for (const file of htmlFiles) {
  const html = stripHtmlComments(fs.readFileSync(path.join(repoRoot, file), "utf8"));
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
