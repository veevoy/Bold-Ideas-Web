import { publishedCaseStudies, type ProjectCaseStudy } from './case-study-model';

// Each JSON file is discovered automatically; order controls home and next-story order.
export const projectCaseStudies = publishedCaseStudies(
  import.meta.glob('./content/case-studies/*.json', { eager: true, import: 'default' }),
);

export type CaseStudy = {
  readonly kind: 'project';
  readonly project: ProjectCaseStudy;
  readonly headline: readonly string[];
  readonly image: ProjectCaseStudy['image'];
};

export const caseStudies: readonly CaseStudy[] = [
  ...projectCaseStudies.map(project => ({ kind: 'project' as const, project, headline: project.headline, image: project.image })),
];
