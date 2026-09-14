<!--
Guidance for AI coding agents (Copilot / assistant) working on this repo.
Keep this file short, actionable and specific to this Astro site.
For the full design system and copy rules, see /CLAUDE.md — this file is
about where things live and how to build/preview, not visual style.
-->

# Copilot instructions — monessor-site

## Purpose
- Help contributors and AI agents make small, safe, and intentional edits to an Astro.js site.
- Preserve simplicity, clarity, and long-term maintainability.

## Big picture
- This is an [Astro](https://astro.build/) site (static output) styled with Tailwind CSS, with Markdown content collections for the bilingual "Perspectives / Insights" section.
- Build system: Astro + Vite. No custom bundler config beyond `@tailwindcss/vite`.
- Hosted on Vercel; `npm run build` (`astro build`) produces `dist/`, which is what gets deployed.
- Primary files:
  - `src/pages/index.astro` / `src/pages/en/index.astro` — FR/EN homepage content, structure, and small inline client JS.
  - `src/layouts/Layout.astro` — shared `<head>`, SEO/meta tags, JSON-LD, Fathom Analytics script.
  - `src/components/` — reusable UI (`Header.astro`, `Hero.astro`, `ContactCta.astro`, `InsightCard.astro`). Reuse these instead of duplicating markup.
  - `src/content/insights/{fr,en}/*.md` — Perspectives/Insights articles, validated by the schema in `src/content.config.ts`.
  - `public/css/styles.css` — legacy global styles and design tokens (colors, radii, layout grid), served as-is by Astro from `public/`.
  - `public/scripts/main.js` — small client JS (email obfuscation, year injection), loaded via `<script>` in the page templates.
  - `public/assets/` — images and favicon, referenced as `/assets/...`.

## Local development & testing
- Install once: `npm install`.
- Dev server with hot reload: `npm run dev`.
- Type/content check (also flags unused or mismatched content-collection fields): `npx astro check`.
- Production build (what Vercel runs): `npm run build`; preview it locally with `npm run preview`.
- Do not add a new bundler or framework integration without clear requirement.

## Deployment
- Hosted on Vercel.
- Commits to the default branch (`main`) are deployed automatically via `astro build`.

## Project-specific patterns and conventions
- **Content collections**: only `src/content.config.ts` defines the schema for `insights` — do not recreate a second config file under `src/content/`; Astro only reads the one at `src/content.config.ts`, and a stale duplicate there will silently diverge from the real schema.
- **Static assets & legacy files**: root-level `index.html`, `css/`, `scripts/`, `assets/` (outside `public/`) do not exist anymore — they were a pre-Astro static site and are not part of the build. All static files live under `public/` (served verbatim) or are imported through `src/`.
- **Minimal JavaScript**:
  - Keep client-side scripts tiny and dependency-free.
  - Inline JS is acceptable when it improves clarity (see email obfuscation in `public/scripts/main.js`).
- **Accessibility**:
  - Preserve semantic HTML.
  - Keep existing `aria-label` attributes and add new ones only when appropriate.
- **Styling**:
  - Design tokens for the legacy stylesheet live in `:root` in `public/css/styles.css`; Tailwind utility classes are used directly in `.astro` components.
  - Prefer reusing existing CSS variables/Tailwind classes over hardcoded values, and reuse existing components (see `/CLAUDE.md`) before writing new markup.
- **Structure**:
  - Favor simple, readable markup over abstraction.
  - Avoid premature refactoring into components or templates.
- **SEO & semantic markup**:
  - Keep heading hierarchy clean: h1 once per page (main topic), then h2, h3 in order. Never skip levels.
  - Each page has a canonical `<link rel="canonical">` tag, computed dynamically in `Layout.astro`.
  - Use `<link rel="alternate" hreflang="...">` for language variants (already in place, computed in `Layout.astro`).
  - Write meta descriptions naturally for humans first; avoid keyword stuffing.
  - JSON-LD structured data (`organizationSchema` in `Layout.astro`, `jsonLd` in the insight `[...slug].astro` pages) must reference assets that actually exist under `public/assets/`.

## Coding principles
- Prefer clarity over cleverness.
- Optimize for readability and future self-maintenance.
- Avoid over-engineering.
- Comments only when intent is not obvious from the code itself.

## AI behavior & guardrails
- Prefer **small, incremental changes**.
- When unsure, ask for clarification instead of guessing.
- Do not introduce new libraries, frameworks, or tooling without explicit justification.
- Avoid stylistic rewrites unless requested.
- Before removing anything that looks unused, verify it isn't referenced from `src/` or `public/` (e.g. `grep` for the path) — see "Static assets & legacy files" above for a past example.

## Change safety rules
- Ask for confirmation before:
  - Large HTML/Astro restructures
  - Renaming CSS classes or Tailwind patterns used across pages
  - Removing or replacing existing JavaScript logic
  - Deleting files, even ones that look unused
- When editing multiple files:
  - Show a clear diff
  - Summarize what changed and why

## Examples (what to change and how)
- Update the hero title or meta description:
  - Edit the FR copy in `src/pages/index.astro` and the EN copy in `src/pages/en/index.astro` (or `Hero.astro` if shared).
  - Keep meta descriptions between 155–160 characters (fits most search results).
  - Ensure `<h1>` matches or closely mirrors `<title>` for consistency.
- Change color tokens used by the legacy stylesheet:
  - Edit `:root` variables at the top of `public/css/styles.css` (e.g. `--accent`, `--bg`).
- Add or edit a Perspectives/Insights article:
  - Add a Markdown file under `src/content/insights/fr/` or `src/content/insights/en/`, matching the frontmatter fields in `src/content.config.ts`.
- Email obfuscation:
  - The script in `public/scripts/main.js` wires email from `span[data-user|data-domain|data-tld]`.
  - Preserve the `data-*` attributes and `wireEmail()` logic if modifying.

## Commit discipline
- Prefer small, atomic commits.
- One visual or behavioral change per commit when possible.
- Commit messages should clearly reference the file(s) changed.

## What not to do
- Do not remove the inline email-obfuscation script unless replacing it with an equally small, dependency-free solution.
- Do not recreate a root-level static `index.html`/`css/`/`scripts/`/`assets/` — all output must go through Astro (`src/pages`, `public/`).

## Where to look first
- `/CLAUDE.md` — design system, copy/tone rules, and build commands.
- `src/layouts/Layout.astro` — page shell, SEO/meta, JSON-LD, analytics.
- `src/pages/` — route structure and page content (FR at the root, EN under `/en/`).
- `src/components/` — reusable UI building blocks.
- `public/assets/` — images and favicon.

## If anything here is unclear
- Update this file and include the clarification in the same commit.

## Preview & validation (copyable)
- Preview locally: `npm run dev`, then open the printed local URL.
- Validate types and content schema: `npx astro check`.
- Validate the production build: `npm run build && npm run preview`.

## Commit & PR conventions
- Commit message style: short, imperative scope (e.g. `docs: update hero title`, `style: tweak --accent color`).
- PR checklist:
  1. Preview locally (`npm run dev`) and confirm visual/functional change.
  2. Run `npx astro check` and `npm run build` before opening the PR.
  3. Keep PRs atomic (one logical change per PR).
  4. Reference changed files in the PR description.

## Language conventions
- Use generic language codes (`fr`, `en`) only.
- Do not introduce region-specific variants (`en-US`, `en-CA`) unless explicitly requested.

## SEO checklist for updates
When updating page content or structure, verify:
1. **Page title** — 50–60 characters, includes primary keyword, matches h1 intent.
2. **Meta description** — 155–160 characters, accurately summarizes content, not keyword-stuffed.
3. **Heading hierarchy** — h1 (once), h2s (main sections), h3s (subsections), no skipped levels.
4. **Canonical URL** — each page self-references its canonical URL to prevent duplicate-content issues.
5. **Hreflang tags** — language alternates point to the correct versions (`/` for French, `/en/` for English).
