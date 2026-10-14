/**
 * Date en toutes lettres (« 14 septembre 2026 », « September 14, 2026 »).
 * En UTC : les dates du frontmatter sont des jours, pas des instants ; sans cela, une
 * compilation hors UTC affichait la veille.
 */
export function formatDate(date: Date, locale: 'fr' | 'en'): string {
  return date.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
