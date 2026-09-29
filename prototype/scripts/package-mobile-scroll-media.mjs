import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

// Sites can serve public assets before invoking its Worker. Store mobile films
// under internal content-addressed parts so the public MP4 URLs reach the same
// range-enabled delivery adapter as the desktop films. Static builds stay intact.
export function packageMobileScrollMedia(clientDirectory) {
  const manifest = {};
  for (const name of ['bold-story-scroll-mobile.mp4', 'collaboration-bridge-scroll-mobile.mp4']) {
    const url = `/video/${name}`;
    const source = path.join(clientDirectory, url);
    const bytes = readFileSync(source);
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    const parts = [];
    const size = 4 * 1024 * 1024;
    for (let offset = 0; offset < bytes.length; offset += size) {
      const part = bytes.subarray(offset, offset + size);
      const partUrl = `/__media/${sha256.slice(0, 16)}/${String(parts.length).padStart(3, '0')}.bin`;
      const destination = path.join(clientDirectory, partUrl);
      mkdirSync(path.dirname(destination), { recursive: true });
      writeFileSync(destination, part);
      parts.push({ url: partUrl, size: part.length });
    }
    manifest[url] = { size: bytes.length, sha256, parts };
    rmSync(source);
  }
  return manifest;
}
