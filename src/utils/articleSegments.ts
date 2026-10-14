import type { CollectionEntry } from 'astro:content';
import { resolveSegment } from './insights';

type Insight = CollectionEntry<'insights'>;
export type Segment = 'pme' | 'sf';

/**
 * Segments visés par chaque article, indexés par translationKey (commun aux versions FR et EN).
 * Le premier segment détermine la vignette de rendez-vous. Pourra migrer vers un champ `segments`
 * du frontmatter une fois la révision des articles terminée.
 */
const ARTICLE_SEGMENTS: Record<string, Segment[]> = {
  'sme-technology-strategy': ['pme'], // 03 : la technologie dans les PME
  'governance-speed': ['sf'], // 02 : gouvernance TI dans les services financiers
  'replatforming-fable': ['pme', 'sf'] // 01 : modernisation, utile aux deux segments
};

/** Segments d'un article : table ci-dessus, sinon champ `segment` du frontmatter (ou de sa traduction). */
export function articleSegments(entry: Insight, all: Insight[]): Segment[] {
  const mapped = entry.data.translationKey ? ARTICLE_SEGMENTS[entry.data.translationKey] : undefined;
  if (mapped) return mapped;
  const fromFrontmatter = resolveSegment(entry, all);
  return fromFrontmatter ? [fromFrontmatter] : [];
}

/** Deux articles liés : même segment d'abord, puis les plus récents ; même langue, sans l'article courant. */
export function relatedArticles(entry: Insight, all: Insight[], count = 2): Insight[] {
  const mine = new Set(articleSegments(entry, all));
  return all
    .filter((e) => e.data.lang === entry.data.lang && e.id !== entry.id && !e.data.draft)
    .map((e) => ({ e, shared: articleSegments(e, all).some((s) => mine.has(s)) ? 1 : 0 }))
    .sort((a, b) => b.shared - a.shared || b.e.data.pubDate.getTime() - a.e.data.pubDate.getTime())
    .slice(0, count)
    .map(({ e }) => e);
}

export const segmentLabels = {
  fr: { pme: 'PME', sf: 'Finance réglementée' },
  en: { pme: 'SMEs', sf: 'Regulated finance' }
} as const;
