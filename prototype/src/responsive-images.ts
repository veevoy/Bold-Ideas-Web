import variants from './content/image-variants.json';

type Variant = { src: string; width: number };
const images = variants as Record<string, Variant[]>;

/** Original files remain the largest candidate; crops keep their source coordinates. */
export function responsiveImage(src: string, sizes: string) {
  const candidates = images[src];
  return candidates ? { srcSet: candidates.map(image => `${image.src} ${image.width}w`).join(', '), sizes } : {};
}

export function posterImage(src: string, width: number) {
  return images[src]?.find(candidate => candidate.width >= width)?.src ?? src;
}

export const gallerySizes = '(max-width: 600px) calc(100vw - 48px), (max-width: 2087px) 92vw, 1920px';
export const thumbnailSizes = '(max-width: 600px) calc(100vw - 48px), (max-width: 900px) 50vw, 46vw';
