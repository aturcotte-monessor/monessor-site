# monessor.com

Site de **Monessor** (Services-conseils Monessor inc.) : conseil en gestion stratégique des TI pour les PME et les services financiers réglementés.

## Pile technique

- **Astro 7**, site statique (SSG), composants `.astro` et analyses en MDX (collection `insights`, `src/content/insights/{fr,en}/`).
- **Tailwind CSS 4** ; jetons de couleur dans le `@theme` de `src/styles/global.css` (charte : voir `CLAUDE.md`).
- **Polices auto-hébergées** dans `public/fonts/` : Inter (texte) et Montserrat Bold (mot-symbole MONESSOR). Aucun appel à Google Fonts.
- **Images** : portrait servi par `astro:assets` (AVIF et WebP) depuis `src/assets/` ; images de partage 1200 × 630 dans `public/assets/og/`.
- **Analytique** : Fathom, sans témoin ; événements nommés par `fathomEvent()` (`src/utils/tracking.ts`).
- **Hébergement** : Vercel, déploiement automatique de `main` ; chaque branche poussée obtient un aperçu.

## Structure

- Routes symétriques `/fr/...` et `/en/...` (`src/pages/fr/`, `src/pages/en/`). Les analyses sont sous `/fr/perspectives/` et `/en/insights/`. Les paires de pages traduites sont dans `src/utils/i18nRoutes.ts`.
- Gabarits partagés FR/EN dans `src/components/` (`ServicePage`, `ArticlePage`, `InsightsIndex`, `AboutPage`, `ApproachPage`, `PrivacyPage`) ; les fichiers de page ne choisissent que la langue et le contenu.
- Métadonnées d'articles côté code : segments (`src/utils/articleSegments.ts`) et titres ou descriptions SEO raccourcis (`src/utils/articleSeo.ts`).
- `vercel.json` : redirection de la racine selon la langue (302), 301 des anciennes URL, et 301 vers la version avec barre oblique finale. Toute page renommée doit y ajouter sa 301.

## Développement local

Prérequis : Node.js 22 ou plus récent, npm.

```bash
npm install
npm run dev        # serveur de développement
npm run build      # build de production dans dist/
npx astro check    # vérification des types et des gabarits
npm run preview    # sert dist/ en local
```

## Flux de travail

1. Créer une branche courte (`site/lot-8`, par exemple) : l'adresse d'aperçu Vercel `monessor-site-git-<branche>-alex-turcottes-projects.vercel.app` doit rester sous 63 caractères.
2. Vérifier avant de pousser : `npm run build`, `npx astro check`, et un contrôle d'accessibilité (axe-core) sur les pages touchées.
3. Ouvrir une demande de fusion vers `main` ; la fusion déploie en production.
