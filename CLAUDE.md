# Directives de Développement Monessor.com (Astro.js + MDX)

## Pile Technique
- Framework: Astro.js avec composants MDX
- Styles: Tailwind CSS 4 (jetons de couleur dans le `@theme` de `src/styles/global.css`)
- Routes : symétriques `/fr/...` et `/en/...` (pages FR dans `src/pages/fr/`, analyses FR sous `/fr/perspectives/`, EN sous `/en/insights/`). La racine `/` et les anciennes URL françaises sont redirigées par `vercel.json` (302 selon la langue du navigateur, 301 pour les anciennes URL) ; toute page renommée doit y ajouter sa 301.
- Analytique: Fathom Analytics (événements nommés par `fathomEvent()` dans `src/utils/tracking.ts`)

## Règles de Style & Design System
1. **Palette (charte Monessor, règle 60-30-10) :**
   - 60 % clair : fond `#F8FAFC` (`bg-light`) et blanc pour les cartes ; texte courant `#434343` (`text-ink`).
   - 30 % sarcelle `#23545B` (`text-teal`, `bg-teal`) : titres, liens et structure sur fond clair ; jamais en texte sur fond foncé.
   - 10 % corail `#FF6F61` (`bg-coral`) : bouton d'action unique (`.btn`) avec texte foncé `#0E1315` (`text-ink-dark`), chiffres clés et accents sur fond foncé.
   - Sarcelle profonde `#102A2E` (`bg-teal-deep`) pour les bandes et blocs foncés (héros, vignette de rendez-vous, pied de page), texte `#F8FAFC`.
   - Corail foncé `#C6483C` (`text-coral-text`), même teinte : seule façon d'utiliser le corail en texte ou en icône sur fond clair (4,6:1).
   - Interdits : texte blanc sur corail, corail `#FF6F61` en texte sur fond clair (2,6:1), toute autre couleur hors charte (menthe, verts, or).
   - Typographie : Montserrat Bold pour le mot-symbole MONESSOR (classe `.wordmark`, interlettrage 0,08em, sous-ensemble limité à ses lettres) ; Inter, police variable, pour tout le reste. Les deux sont auto-hébergées dans `public/fonts/` et préchargées dans `Layout.astro` ; aucun appel à Google Fonts.
2. **Thème mixte :** en-tête clair (emblème couleur), sections de contenu claires, bandes foncées pour l'autorité et l'action. L'emblème est en SVG dans `public/assets/` : `monessor-embleme.svg` sur fond clair, `monessor-embleme-blanc-corail.svg` sur fond foncé.
3. **Conversion :** un seul lien de rendez-vous (`MEETING_URL`). Toute page se termine par la vignette `MeetingCta` (variante `pme`, `sf`, `article` ou `generic`) puis le pied de page global, tous deux rendus par `Layout.astro`. Chaque bouton de rendez-vous porte un événement Fathom distinct par emplacement, langue et page.
4. **Copie & Vocabulaire :**
   - Utiliser un ton C-Level, sobre et factuel.
   - Ne jamais utiliser de vocabulaire d'agence générique ("funnels", "growth hacking", "boostez vos ventes").
   - Segment A = PME. Offre d'entrée = *Diagnostic de maturité TI & IA* (2-3 semaines). Clients typiques : 5 M$ à 100 M$ de chiffre d'affaires, mentionné une seule fois dans le texte de la page PME ; jamais « établies » ni la fourchette dans les menus, titres, méta ou données structurées.
   - Segment B = Secteurs Régulés (BSIF/OSFI). Offre d'entrée = *Revue de Gouvernance TI* (3-4 semaines), sans prix public.
   - Titre d'Alex Turcotte : associé directeur / Managing Partner. LinkedIn : https://www.linkedin.com/in/turcottealex
5. **Accessibilité (WCAG 2.2 AA) :** contraste d'au moins 4,5:1 (3:1 pour le grand texte et les icônes) ; anneau de focus global (sarcelle sur fond clair, corail sur fond foncé), jamais `outline: none` ; cibles tactiles d'au moins 44 px ; pas d'`aria-hidden` sur du texte visible ; un `aria-label` doit contenir le texte visible ; mouvements désactivés sous `prefers-reduced-motion`. Vérifier avec axe-core avant chaque livraison.
6. **Composants :** Réutiliser les composants existants (`Layout.astro`, `Header.astro`, `Footer.astro`, `MeetingCta.astro`, `ContactCta.astro`, accordéons, cartes) plutôt que d'en recréer de nouveaux.

## Commandes Utiles
- Build : `npm run build`
- Dev : `npm run dev`
- Lint/Check : `npx astro check`
