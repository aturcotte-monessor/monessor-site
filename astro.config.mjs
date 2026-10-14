// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import mdx from '@astrojs/mdx';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Resolves a sitemap URL's pathname back to the source file that produces it,
// so we can stamp <lastmod> with that file's last git commit date.
function resolveSourceFile(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const lang = segments[0] === 'en' || segments[0] === 'fr' ? segments[0] : null;
  if (!lang) return null; // la racine redirige selon la langue et n'est pas dans le sitemap
  const rest = segments.slice(1);

  const pagesDir = path.join('src/pages', lang);

  if (rest.length === 0) {
    return path.join(pagesDir, 'index.astro');
  }

  // Section des analyses : /fr/perspectives/ et /en/insights/
  if (rest[0] === 'insights' || rest[0] === 'perspectives') {
    if (rest.length === 1) {
      return path.join(pagesDir, rest[0], 'index.astro');
    }
    const slug = rest[1];
    const contentDir = path.join('src/content/insights', lang);
    for (const ext of ['md', 'mdx']) {
      const candidate = path.join(contentDir, `${slug}.${ext}`);
      if (existsSync(path.join(rootDir, candidate))) return candidate;
    }
    return null;
  }

  if (rest[0] === 'services' && rest.length === 2) {
    return path.join(pagesDir, 'services', `${rest[1]}.astro`);
  }

  // Pages de contenu : le texte vit dans un composant partagé FR/EN
  const contentPages = {
    approche: 'ApproachPage', approach: 'ApproachPage',
    'a-propos': 'AboutPage', about: 'AboutPage',
    confidentialite: 'PrivacyPage', privacy: 'PrivacyPage',
  };
  if (rest.length === 1 && contentPages[rest[0]]) {
    return path.join('src/components', `${contentPages[rest[0]]}.astro`);
  }

  return null;
}

// Paires FR / EN pour les balises hreflang du sitemap.
// Pages à slugs traduits (même liste que src/utils/i18nRoutes.ts) + articles appariés par translationKey.
const STATIC_PAIRS = [
  ['/fr/', '/en/'],
  ['/fr/perspectives/', '/en/insights/'],
  ['/fr/services/cto-temps-partage-pme/', '/en/services/fractional-cto-sme/'],
  ['/fr/services/gouvernance-sf-reglementee/', '/en/services/regulated-fs-governance/'],
  ['/fr/approche/', '/en/approach/'],
  ['/fr/a-propos/', '/en/about/'],
  ['/fr/confidentialite/', '/en/privacy/'],
];

function articlePairs() {
  const byKey = {};
  for (const lang of ['fr', 'en']) {
    const dir = path.join(rootDir, 'src/content/insights', lang);
    for (const file of readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
      const key = readFileSync(path.join(dir, file), 'utf8').match(/^translationKey:\s*"?([^"\n]+)"?/m)?.[1];
      if (!key) continue;
      byKey[key] ??= {};
      byKey[key][lang] = `/${lang}/${lang === 'fr' ? 'perspectives' : 'insights'}/${file.replace(/\.mdx?$/, '')}/`;
    }
  }
  return Object.values(byKey).filter((pair) => pair.fr && pair.en).map((pair) => [pair.fr, pair.en]);
}

const HREFLANG = new Map();
for (const [fr, en] of [...STATIC_PAIRS, ...articlePairs()]) {
  const links = [
    { lang: 'fr', url: `https://www.monessor.com${fr}` },
    { lang: 'en', url: `https://www.monessor.com${en}` },
    // x-default : la racine pour l'accueil (redirection selon la langue), sinon la version française
    { lang: 'x-default', url: `https://www.monessor.com${fr === '/fr/' ? '/' : fr}` },
  ];
  HREFLANG.set(fr, links);
  HREFLANG.set(en, links);
}

function getGitLastModified(relativePath) {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', relativePath],
      { cwd: rootDir }
    ).toString().trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

export default defineConfig({
  site: 'https://www.monessor.com',
  // Routes symétriques /fr/ et /en/. Les redirections (racine selon la langue, anciennes URL françaises,
  // anciens slugs) sont de vraies 301/302 servies par Vercel : voir vercel.json.
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // Les pages 404 ne doivent pas être indexées
      // Ni les pages 404 ni la racine (qui redirige selon la langue) ne sont indexées
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return pathname !== '/' && !/\/404\/?$/.test(pathname);
      },
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const sourceFile = resolveSourceFile(pathname);
        const lastmod = sourceFile ? getGitLastModified(sourceFile) : undefined;
        const links = HREFLANG.get(pathname);
        return { ...item, ...(lastmod && { lastmod }), ...(links && { links }) };
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
