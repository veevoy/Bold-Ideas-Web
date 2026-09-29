import { pathToFileURL } from 'node:url';
import { readdir, readFile, access } from 'node:fs/promises';
import { parseCaseStudy, publishedCaseStudies, caseStudyImages } from '../src/case-study-model.ts';

export async function validateCaseStudyFiles() {
  const root = new URL('../src/content/case-studies/', import.meta.url);
  const filenames = (await readdir(root)).filter(file => file.endsWith('.json'));
  const files = Object.fromEntries(await Promise.all(filenames.map(async file => [file, JSON.parse(await readFile(new URL(file, root), 'utf8'))])));
  const studies = publishedCaseStudies(files);
  for (const [file, value] of Object.entries(files)) {
    const study = parseCaseStudy(value, file);
    if (file !== `${study.slug}.json`) throw new Error(`${file}: filename must match slug (${study.slug}.json).`);
    for (const image of caseStudyImages(study)) {
      await access(new URL(`../public${image.src}`, import.meta.url)).catch(() => { throw new Error(`${file}: missing image ${image.src}`); });
    }
  }
  return studies;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const studies = await validateCaseStudyFiles();
  console.log(`Case study content valid: ${studies.length} published projects.`);
}
