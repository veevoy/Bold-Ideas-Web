import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, writeFile, readdir, stat, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = {};
const files = [];
for (const [name, source] of [['story', 'bold-story-scroll-mobile.mp4'], ['bridge', 'collaboration-bridge-scroll-mobile.mp4']]) {
  const input = path.join(root, 'public/video', source);
  const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', input], { encoding: 'utf8' }).trim());
  const directory = path.join(root, 'public/video/frames', name);
  await mkdir(directory, { recursive: true });
  const temporary = await mkdtemp(path.join(tmpdir(), 'bold-scroll-sheets-'));
  try {
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
      '-vf', 'fps=20,scale=640:360:flags=lanczos,tile=4x2', '-fps_mode', 'passthrough',
      '-start_number', '0', path.join(temporary, '%03d.png')]);
    for (const file of (await readdir(directory)).filter(file => /^\d+\.webp$/.test(file))) await rm(path.join(directory, file));
    for (const file of (await readdir(temporary)).sort()) {
      await sharp(path.join(temporary, file)).webp({ quality: 70, effort: 6 }).toFile(path.join(directory, file.replace('.png', '.webp')));
    }
  } finally { await rm(temporary, { recursive: true, force: true }); }
  const sheets = (await readdir(directory)).filter(name => name.endsWith('.webp')).sort().map(file => `/video/frames/${name}/${file}`);
  manifest[name] = { width: 640, height: 360, fps: 20, columns: 4, framesPerSheet: 8, frameCount: Math.round(duration * 20), sheets };
  if (sheets.length !== Math.ceil(manifest[name].frameCount / 8)) throw new Error(`Unexpected sheet count for ${name}`);
  files.push(...sheets);
}
await writeFile(path.join(root, 'src/content/scroll-sequences.json'), JSON.stringify(manifest, null, 2) + '\n');
const inventoryPath = path.join(root, '../docs/assets.json');
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));
inventory.updated = '2026-09-30';
inventory.groups = inventory.groups.filter(group => group.id !== 'mobile-scroll-sequences');
inventory.groups.push({ id: 'mobile-scroll-sequences', usage: 'Mobile/touch scroll-driven story and bridge, independent of video playback', files,
  source: 'Existing user-supplied scroll films, same edit and timing as the mobile MP4s.',
  processing: 'ffmpeg/sharp: 20fps, 640×360px frames packed into 4×2 WebP sheets at quality 70. Lazy loading, two concurrent downloads and three decoded sheets per section. The last painted frame remains visible while a new sheet loads.' });
await writeFile(inventoryPath, JSON.stringify(inventory, null, 2) + '\n');
const bytes = (await Promise.all(files.map(file => stat(path.join(root, 'public', file))))).reduce((sum, value) => sum + value.size, 0);
console.log(`Generated ${files.length} WebP sheets (${(bytes / 1e6).toFixed(2)} MB for both films).`);
