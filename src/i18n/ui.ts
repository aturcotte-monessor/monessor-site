export const ui = {
  fr: {
    perspectivesTitle: 'Perspectives',
    exploreAllInsights: 'Explorer toutes les analyses',
    readInsight: 'Lire l’analyse',
  },
  en: {
    perspectivesTitle: 'Insights',
    exploreAllInsights: 'Explore all insights',
    readInsight: 'Read the insight',
  },
} as const;

export type Locale = keyof typeof ui;
