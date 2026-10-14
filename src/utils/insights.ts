import type { CollectionEntry } from 'astro:content';

type Insight = CollectionEntry<'insights'>;

/** Segment d'un article : son frontmatter, sinon celui de sa traduction (même translationKey). */
export function resolveSegment(entry: Insight, all: Insight[]): 'pme' | 'sf' | undefined {
  if (entry.data.segment) return entry.data.segment;
  const key = entry.data.translationKey;
  if (!key) return undefined;
  return all.find((e) => e.data.translationKey === key && e.data.segment)?.data.segment;
}
