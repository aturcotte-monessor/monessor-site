export const ui = {
  fr: {
    perspectivesTitle: 'Perspectives',
    exploreAllInsights: 'Explorer toutes nos analyses exécutives',
    readInsight: 'Lire l’analyse',
  },
  en: {
    perspectivesTitle: 'Insights',
    exploreAllInsights: 'Explore all executive insights',
    readInsight: 'Read the insight',
  },
} as const;

export type Locale = keyof typeof ui;
