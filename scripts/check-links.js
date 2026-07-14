const fs = require('fs');
const path = require('path');

const files = ['index.html', '404.html'];
let broken = [];

const COMMENT_RE = /<!--[\s\S]*?-->/g;
function stripComments(html) {
  let cleaned = html;
  let previous;
  do {
    previous = cleaned;
    cleaned = cleaned.replace(COMMENT_RE, '');
  } while (cleaned !== previous);
  return cleaned;
}

// Any string with a URI scheme (http:, mailto:, javascript:, vbscript:, data:, ...),
// a protocol-relative URL (//host/...), or a same-page fragment (#...) is not a
// local file reference, so we don't check it against the filesystem.
const NON_LOCAL_RE = /^(#|\/\/|[a-z][a-z0-9+.-]*:)/i;

for (const file of files) {
  const html = stripComments(fs.readFileSync(file, 'utf8'));
  const attrRegex = /(?:href|src)\s*=\s*"([^"]+)"/g;
  let match;
  while ((match = attrRegex.exec(html))) {
    let ref = match[1];
    if (NON_LOCAL_RE.test(ref)) {
      continue;
    }
    ref = ref.split('#')[0].split('?')[0];
    if (!ref) continue;
    const base = ref.startsWith('/') ? '.' : path.dirname(file);
    const resolved = path.resolve(base, ref.replace(/^\//, ''));
    if (!fs.existsSync(resolved)) {
      broken.push(`${file}: ${ref} -> ${resolved}`);
    }
  }
}

if (broken.length) {
  console.error('Broken local references found:');
  broken.forEach((b) => console.error('  ' + b));
  process.exit(1);
} else {
  console.log(`All local href/src references in ${files.join(', ')} resolve to existing files.`);
}
