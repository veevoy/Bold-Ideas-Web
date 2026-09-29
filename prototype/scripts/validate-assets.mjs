import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = path.join(root, 'public');
const manifest = JSON.parse(await readFile(new URL('../../docs/assets.json', import.meta.url), 'utf8'));
const expected = new Set();

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const lists = await Promise.all(entries.map(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : [filename];
  }));
  return lists.flat();
}

// The inventory includes dynamic audience paths, video posters and motion-off stills.
for (const group of manifest.groups) {
  for (const asset of group.files) {
    if (!/^\/(brand|images|video)\/[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/.test(asset)) {
      throw new Error(`Invalid asset path in ${group.id}: ${asset}`);
    }
    if (expected.has(asset)) throw new Error(`Duplicate inventory entry: ${asset}`);
    expected.add(asset);
    const info = await stat(path.join(publicRoot, asset.slice(1))).catch(() => null);
    if (!info?.isFile() || info.size === 0) throw new Error(`Missing or empty public asset: ${asset}`);
  }
}

for (const filename of await filesIn(publicRoot)) {
  const asset = '/' + path.relative(publicRoot, filename).split(path.sep).join('/');
  if (!expected.has(asset)) throw new Error(`Public asset has no provenance entry in docs/assets.json: ${asset}`);
}

// Catch literal URLs that Vite would otherwise leave unchecked in public/.
const sourceFiles = [...await filesIn(path.join(root, 'src')), path.join(root, 'index.html')];
for (const filename of sourceFiles.filter(file => /\.(tsx?|css|json|html)$/.test(file))) {
  const source = await readFile(filename, 'utf8');
  for (const match of source.matchAll(/\/(?:brand|images|video)\/[a-zA-Z0-9/_-]+\.(?:mp4|webm|jpe?g|png|webp|avif|svg|woff2?)/g)) {
    if (!expected.has(match[0])) throw new Error(`${path.relative(root, filename)} references an unlisted asset: ${match[0]}`);
  }
}

console.log(`Asset inventory valid: ${expected.size} files; public files and literal source references match.`);
