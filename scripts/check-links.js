#!/usr/bin/env node
"use strict";

// Verifies that every local href/src reference in the given HTML files
// points to a file that actually exists in the repository. External URLs,
// mailto/tel links, in-page anchors, and data URIs are ignored.

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const files = process.argv.slice(2);

if (files.length === 0) {
  console.error("Usage: node scripts/check-links.js <file.html> [more.html ...]");
  process.exit(1);
}

const ATTR_RE = /\b(?:href|src)\s*=\s*"([^"]+)"|\b(?:href|src)\s*=\s*'([^']+)'/g;
const IGNORE_RE = /^(https?:)?\/\/|^mailto:|^tel:|^javascript:|^data:|^#/i;

let errorCount = 0;

for (const file of files) {
  const absFile = path.resolve(repoRoot, file);
  const html = fs.readFileSync(absFile, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const baseDir = path.dirname(absFile);

  let match;
  while ((match = ATTR_RE.exec(html)) !== null) {
    const raw = match[1] || match[2];
    if (!raw || IGNORE_RE.test(raw)) continue;

    const cleaned = raw.split("#")[0].split("?")[0];
    if (!cleaned) continue;

    const target = cleaned.startsWith("/")
      ? path.join(repoRoot, cleaned)
      : path.join(baseDir, cleaned);

    if (!fs.existsSync(target)) {
      console.error(`${file}: broken reference "${raw}" -> ${path.relative(repoRoot, target)}`);
      errorCount++;
    }
  }
}

if (errorCount > 0) {
  console.error(`\n${errorCount} broken local reference(s) found.`);
  process.exit(1);
}

console.log("All local references resolved successfully.");
