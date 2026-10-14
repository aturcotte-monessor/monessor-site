import { getCollection } from 'astro:content';

export type Locale = 'fr' | 'en';

/**
 * Explicit FR <-> EN pairs for routes whose slugs differ between locales
 * (service landing pages and other hand-translated pages, not generated from a shared slug).
 */
const SERVICE_ROUTE_PAIRS: Array<[fr: string, en: string]> = [
  ['/fr/services/cto-temps-partage-pme/', '/en/services/fractional-cto-sme/'],
  ['/fr/services/gouvernance-sf-reglementee/', '/en/services/regulated-fs-governance/'],
  ['/fr/approche/', '/en/approach/'],
  ['/fr/a-propos/', '/en/about/'],
  ['/fr/confidentialite/', '/en/privacy/']
];

function normalizePath(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

function matchServiceRoute(path: string, targetLang: Locale): string | null {
  const normalized = normalizePath(path);

  for (const [frPath, enPath] of SERVICE_ROUTE_PAIRS) {
    if (normalized === frPath) return targetLang === 'en' ? enPath : frPath;
    if (normalized === enPath) return targetLang === 'fr' ? frPath : enPath;
  }

  return null;
}

async function matchInsightRoute(path: string, targetLang: Locale): Promise<string | null> {
  const normalized = normalizePath(path);
  const frMatch = normalized.match(/^\/fr\/insights\/([^/]+)\/$/);
  const enMatch = normalized.match(/^\/en\/insights\/([^/]+)\/$/);

  if (!frMatch && !enMatch) return null;

  const entries = await getCollection('insights');

  if (frMatch) {
    const slug = frMatch[1];
    const entry = entries.find((e) => e.id === `fr/${slug}` && e.data.lang === 'fr');
    if (!entry) return null;
    if (targetLang === 'fr') return normalized;

    const counterpart = entry.data.translationKey
      ? entries.find((e) => e.data.lang === 'en' && e.data.translationKey === entry.data.translationKey)
      : undefined;
    if (!counterpart) return null;

    return `/en/insights/${counterpart.id.replace(/^en\//, '')}/`;
  }

  const slug = enMatch![1];
  const entry = entries.find((e) => e.id === `en/${slug}` && e.data.lang === 'en');
  if (!entry) return null;
  if (targetLang === 'en') return normalized;

  const counterpart = entry.data.translationKey
    ? entries.find((e) => e.data.lang === 'fr' && e.data.translationKey === entry.data.translationKey)
    : undefined;
  if (!counterpart) return null;

  return `/fr/insights/${counterpart.id.replace(/^fr\//, '')}/`;
}

function defaultAlternate(path: string, targetLang: Locale): string {
  const normalized = normalizePath(path);
  // Routes symétriques : /fr/... <-> /en/... ; la racine (redirigée selon la langue) mène à l'accueil.
  const rest = normalized.replace(/^\/(fr|en)(?=\/)/, '');
  return `/${targetLang}${rest === '' ? '/' : rest}`;
}

/**
 * Resolves the equivalent path of `currentPath` in `targetLang`.
 * Order of resolution: explicit service route map -> insights translationKey lookup
 * -> default /fr/ <-> /en/ prefix swap (assumes matching slugs).
 */
export async function getAlternatePath(currentPath: string, targetLang: Locale): Promise<string> {
  const serviceMatch = matchServiceRoute(currentPath, targetLang);
  if (serviceMatch) return serviceMatch;

  const insightMatch = await matchInsightRoute(currentPath, targetLang);
  if (insightMatch) return insightMatch;

  return defaultAlternate(currentPath, targetLang);
}
