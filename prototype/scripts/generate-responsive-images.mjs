import sharp from 'sharp';
import { readFile, writeFile, readdir, mkdir, stat, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = path.join(root, 'public');
const directory = path.join(publicRoot, 'images/responsive');
await mkdir(directory, { recursive: true });
async function sources(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(items.filter(item => item.name !== 'responsive').map(async item => {
    const file = path.join(dir, item.name);
    return item.isDirectory() ? sources(file) : /\.(webp|jpe?g|png)$/.test(item.name) ? [file] : [];
  }))).flat();
}
const manifest = {};
const provenance = [];
for (const file of (await sources(path.join(publicRoot, 'images'))).sort()) {
  if (file.includes(`${path.sep}testimonials${path.sep}`) || file.endsWith('automation-pipeline-poster.webp')) continue;
  const metadata = await sharp(file).metadata();
  if (metadata.width <= 600) continue;
  const original = '/' + path.relative(publicRoot, file).split(path.sep).join('/');
  const stem = original.slice('/images/'.length).replace(/\.[^.]+$/, '').replaceAll('/', '-');
  const sourceBytes = (await stat(file)).size;
  const candidates = [];
  for (const width of [480, 960, 1440].filter(width => width < metadata.width)) {
    const src = `/images/responsive/${stem}-${width}.webp`;
    const photographic = !original.startsWith('/images/cases/') || /stock|sea-figma/.test(original);
    await sharp(file).resize({ width, withoutEnlargement: true }).webp(photographic ? { quality: 84, effort: 6 } : { lossless: true, effort: 6 }).toFile(path.join(publicRoot, src));
    // Some flat UI exports compress better at their original size.
    if ((await stat(path.join(publicRoot, src))).size >= sourceBytes) {
      await unlink(path.join(publicRoot, src));
      continue;
    }
    candidates.push({ src, width });
  }
  candidates.push({ src: original, width: metadata.width });
  manifest[original] = candidates;
  provenance.push({ source: original, sourceSha256: createHash('sha256').update(await readFile(file)).digest('hex'), files: candidates.slice(0, -1).map(v => v.src) });
}
await writeFile(path.join(root, 'src/content/image-variants.json'), JSON.stringify(manifest, null, 2) + '\n');
const inventoryPath = path.join(root, '../docs/assets.json');
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));
const generated = new Set(provenance.flatMap(item => item.files));
for (const old of inventory.groups.find(group => group.id === 'responsive-images')?.files ?? []) {
  if (!generated.has(old)) await unlink(path.join(publicRoot, old)).catch(error => { if (error.code !== 'ENOENT') throw error; });
}
inventory.groups = inventory.groups.filter(group => group.id !== 'responsive-images');
inventory.groups.push({ id: 'responsive-images', usage: 'Responsive candidates for case heroes, thumbnails, galleries and video stills', files: provenance.flatMap(item => item.files), processing: '480/960/1440px derivatives, never upscaled. UI uses lossless WebP after proportional Lanczos resize; photographic backgrounds and stills use quality 84. Original exports remain the largest candidate. Source hashes and provenance below refer to the original groups in this inventory.', sources: provenance });
await writeFile(inventoryPath, JSON.stringify(inventory, null, 2) + '\n');
const bytes = (await Promise.all(provenance.flatMap(item => item.files).map(src => stat(path.join(publicRoot, src))))).reduce((sum, info) => sum + info.size, 0);
console.log(`Generated ${provenance.reduce((sum, item) => sum + item.files.length, 0)} responsive files for ${provenance.length} originals (${(bytes / 1e6).toFixed(2)} MB total).`);
