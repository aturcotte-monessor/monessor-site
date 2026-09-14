// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import mdx from '@astrojs/mdx';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Resolves a sitemap URL's pathname back to the source file that produces it,
// so we can stamp <lastmod> with that file's last git commit date.
function resolveSourceFile(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const lang = segments[0] === 'en' ? 'en' : null;
  const rest = lang ? segments.slice(1) : segments;

  const pagesDir = lang ? path.join('src/pages', lang) : 'src/pages';

  if (rest.length === 0) {
    return path.join(pagesDir, 'index.astro');
  }

  if (rest[0] === 'insights') {
    if (rest.length === 1) {
      return path.join(pagesDir, 'insights', 'index.astro');
    }
    const slug = rest[1];
    const contentDir = path.join('src/content/insights', lang ?? 'fr');
    for (const ext of ['md', 'mdx']) {
      const candidate = path.join(contentDir, `${slug}.${ext}`);
      if (existsSync(path.join(rootDir, candidate))) return candidate;
    }
    return null;
  }

  if (rest[0] === 'services' && rest.length === 2) {
    return path.join(pagesDir, 'services', `${rest[1]}.astro`);
  }

  return null;
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
  integrations: [
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const sourceFile = resolveSourceFile(pathname);
        const lastmod = sourceFile ? getGitLastModified(sourceFile) : undefined;
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
