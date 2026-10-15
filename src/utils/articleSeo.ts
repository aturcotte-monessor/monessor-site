// Titres et descriptions SEO des articles, côté code, quand ceux du frontmatter sont trop longs
// (titre affiché ≤ ~60 caractères avec « | Monessor », description de 120 à 160 caractères).
// Clé : translationKey de l'article, puis langue. Le titre complet reste celui de la page et d'Open Graph.
// Comme la table des segments, ces valeurs pourront passer dans le frontmatter après la révision des articles.
import type { CollectionEntry } from 'astro:content';

type Seo = { title?: string; description?: string };

const ARTICLE_SEO: Record<string, Partial<Record<'fr' | 'en', Seo>>> = {
  'replatforming-fable': {
    fr: {
      title: 'La fable du replatforming : un compromis d’affaires',
      description: 'Moderniser un système patrimonial est un compromis d’affaires : conversion technique ou réingénierie, et gestion de la dette fonctionnelle.'
    },
    en: {
      title: 'The replatforming fable: a business trade-off',
      description: 'Modernizing a legacy system is a business trade-off: technical conversion or business re-engineering, and how to manage functional debt.'
    }
  },
  'governance-speed': {
    fr: { title: 'Gouvernance et vitesse en services financiers' },
    en: { title: 'Governance and speed in financial services' }
  },
  'sme-technology-strategy': {
    fr: { title: 'TI en PME : du centre de coût à l’actif stratégique' },
    en: { title: 'SME technology: from cost centre to strategic asset' }
  }
};

export function articleSeo(entry: CollectionEntry<'insights'>): { title: string; description: string } {
  const seo = (entry.data.translationKey && ARTICLE_SEO[entry.data.translationKey]?.[entry.data.lang]) || {};
  return { title: seo.title ?? entry.data.title, description: seo.description ?? entry.data.excerpt };
}
