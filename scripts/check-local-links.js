#!/usr/bin/env node
// Verifies that every local asset reference (href/src) in the site's HTML
// files points to a file that actually exists in the repository.
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML_FILES = ['index.html', '404.html'];
const ATTR_PATTERN = /\b(?:href|src)\s*=\s*["']([^"']+)["']/g;

function isLocal(ref) {
  if (!ref || ref.startsWith('#')) return false;
  if (/^([a-z][a-z0-9+.-]*:)/i.test(ref)) return false; // has a scheme (http:, mailto:, tel:, etc.)
  if (ref.startsWith('//')) return false; // protocol-relative
  return true;
}

let missing = [];

for (const file of HTML_FILES) {
  const fullPath = path.join(ROOT, file);
  const html = fs.readFileSync(fullPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  let match;
  while ((match = ATTR_PATTERN.exec(html)) !== null) {
    const ref = match[1];
    if (!isLocal(ref)) continue;
    const cleanRef = ref.split(/[?#]/)[0];
    if (!cleanRef) continue;
    const target = path.join(ROOT, decodeURIComponent(cleanRef));
    if (!fs.existsSync(target)) {
      missing.push(`${file}: ${ref}`);
    }
  }
}

if (missing.length) {
  console.error('Broken local asset references found:');
  for (const m of missing) console.error(`  - ${m}`);
  process.exit(1);
}

console.log(`OK: all local asset references in ${HTML_FILES.join(', ')} resolve to existing files.`);
