const fs = require('fs');
const path = require('path');

const files = ['index.html', '404.html'];
let broken = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const attrRegex = /(?:href|src)\s*=\s*"([^"]+)"/g;
  let match;
  while ((match = attrRegex.exec(html))) {
    let ref = match[1];
    if (/^(https?:)?\/\//.test(ref) || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('#') || ref.startsWith('data:') || ref.startsWith('javascript:')) {
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
