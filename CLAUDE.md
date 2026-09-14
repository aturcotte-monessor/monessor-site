# Directives de Développement Monessor.com (Astro.js + MDX)

## Pile Technique
- Framework: Astro.js avec composants MDX
- Styles: Tailwind CSS (Thème sombre exécutif haut de gamme, accents vert/gold)
- Anytique: Fathom Analytics (Événement sur CTA Contact)

## Règles de Style & Design System
1. **Thème Visuel :** Conserver la charte "Pratique Exécutive" (fond sombre `#0f2537` / `#111111`, typographies sobres, cartes contrastées).
2. **Copie & Vocabulaire :**
   - Utiliser un ton C-Level, sobre et factuel.
   - Ne jamais utiliser de vocabulaire d'agence générique ("funnels", "growth hacking", "boostez vos ventes").
   - Segment A = PME Établies ($10M–$100M CA). Offre d'entrée = *Diagnostic de Maturité TI & IA* (2-3 semaines).
   - Segment B = Secteurs Régulés (BSIF/OSFI). Offre d'entrée = *Revue de Gouvernance TI* (3-4 semaines).
3. **Composants :** Réutiliser 100 % des composants UI existants (`Layout.astro`, accordéons, cartes `Services`, bannières d'exclusion) plutôt que d'en recréer de nouveaux.

## Commandes Utiles
- Build : `npm run build`
- Dev : `npm run dev`
- Lint/Check : `npx astro check`
