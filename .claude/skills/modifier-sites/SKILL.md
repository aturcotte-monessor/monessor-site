---
name: modifier-sites
description: Procédure d'Alex pour tout changement à monessor.com ou alexturcotte.ca (code, contenu, configuration) — branche courte, aperçu Vercel, description de PR ; Alex ouvre et fusionne la PR. À utiliser avant de toucher l'un de ces deux dépôts.
---

# Modifier monessor.com ou alexturcotte.ca

Alex révise tout par une PR qu'il ouvre et fusionne lui-même. Le travail de Claude : une branche, un aperçu Vercel, une description de PR prête à coller.

## Dépôts

| Site | Dépôt (GitHub `aturcotte-monessor/…`) | Poste d'Alex | Production |
|---|---|---|---|
| monessor.com | `monessor-site` (public) | `~/dev/monessor-site` | `https://www.monessor.com` |
| alexturcotte.ca | `alexturcotte-site` (privé) | `~/dev/alexturcotte-site` | `https://www.alexturcotte.ca` |

Les règles de style, de palette et de rédaction sont dans le `CLAUDE.md` de chaque dépôt : les lire avant de coder.

## Déroulement

1. **Demande large ou ambiguë** : avant de coder, réviser la demande, signaler oublis et erreurs, proposer un plan et attendre « go ». Alex veut éviter les allers-retours. Petite correction claire : la faire directement.
2. **Partir de `main` à jour** : `git fetch origin` puis `git checkout -B site/<nom> origin/main`. Si l'arbre local de `~/dev/monessor-site` contient des changements non commités d'Alex (articles en révision), ne pas y toucher : travailler dans un clone séparé dans le scratchpad.
3. **Nom de branche** : `site/<nom>`, partie après `site/` courte ; le slug complet (`site-<nom>`) fait au plus 21 caractères, sinon l'alias d'aperçu Vercel dépasse 63 caractères et devient inaccessible.
4. **Courriel Git** : `git config user.email alex@monessor.com` dans le dépôt (réglage local). L'alias `alex.turcotte@monessor.com` du poste n'est pas lié au compte GitHub et Vercel bloque alors le déploiement.
5. **Vérifier** : `npm run build` et `npx astro check` sans erreur ; pour un changement visible, contrôle dans le navigateur, y compris à 375 px ; pour Fathom, vérifier que chaque lien envoie le bon nom d'événement.
6. **Commit et push** : message conventionnel en anglais (`feat(...)`, `fix(...)`, `content: ...`) ; `git push -u origin site/<nom>`. Ne jamais pousser sur `main` (un push sur `main` déploie en production). Ne pas ouvrir la PR : `gh` n'est pas installé et Alex l'ouvre lui-même.
7. **Description de PR** : fichier `~/monessor-audit/<sujet>/pr-<nom>.md`, en anglais, avec en tête les deux lignes d'attribution (`<!-- claude-projects-attribution -->` puis `_Requested by **Alex**_`), puis les paragraphes **Before:**, **After:** et **How:**, et en dernière ligne `🤖 Generated with [Claude Code](https://claude.com/claude-code)`. L'envoyer avec SendUserFile et la joindre à la réponse.
8. **Message à Alex** (court, en français) : ce qui change, l'aperçu `https://<dépôt>-git-<slug>-alex-turcottes-projects.vercel.app`, le lien pour créer la PR `https://github.com/aturcotte-monessor/<dépôt>/compare/main...site/<nom>?expand=1`, et ce qui n'a pas été vérifié. Les aperçus exigent une connexion Vercel : une réponse 200 sans session ne prouve rien.
9. **Retouches** : tant que la PR n'est pas fusionnée, pousser sur la même branche (l'aperçu se met à jour) et tenir la description de PR à jour. Après fusion, nouvelle branche depuis `main`.
10. **Après la fusion** : vérifier que la production a bien changé (`curl -sI` pour `last-modified`, ou le contenu attendu). Le déploiement automatique a déjà raté une fois ; si c'est le cas, demander à Alex de lancer *Redeploy* sur `main` dans Vercel.

## Rappels de contenu

- Le français est la version maîtresse ; l'anglais en est la traduction complète.
- « plus de vingt ans », jamais une durée de carrière exacte ; « réglementé », jamais « régulé ».
- Titre d'Alex : associé directeur / Managing Partner.
- Fathom : liste fermée des noms d'événements dans `src/utils/tracking.ts` ; ne jamais renommer un nom déjà en production.
