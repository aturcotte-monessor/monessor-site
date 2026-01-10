<!--
Guidance for AI coding agents (Copilot / assistant) working on this repo.
Keep this file short, actionable and specific to this static site.
-->

# Copilot instructions — monessor-site

## Purpose
- Help contributors and AI agents make small, safe, and intentional edits to a simple static site.
- Preserve simplicity, clarity, and long-term maintainability.

## Big picture
- This is a single-page static website (HTML + CSS + tiny JS) served on Vercel.
- No build system, bundler, or server-side code.
- Changes are file-based and appear on publish.
- Primary files:
  - `index.html` — single-page content, structure, and small client JS (email obfuscation, year injection).
  - `css/styles.css` — global styles and design tokens (colors, radii, layout grid).

## Local development & testing
- There is no build step.
- To preview changes:
  - Open `index.html` directly in a browser, or
  - Use Live Server in VS Code for auto-reload.
- Avoid adding a build tool unless there is a clear requirement (e.g. SASS, TypeScript).

## Deployment
- Hosted on Vercel.
- Commits to the default branch are deployed automatically.

## Project-specific patterns and conventions
- **Minimal JavaScript**:
  - Keep client-side scripts tiny and dependency-free.
  - Inline JS is acceptable when it improves clarity (see email obfuscation).
- **Accessibility**:
  - Preserve semantic HTML.
  - Keep existing `aria-label` attributes and add new ones only when appropriate.
- **Styling**:
  - Design tokens live in `:root` in `css/styles.css`.
  - Prefer reusing CSS variables over hardcoded values.
- **Structure**:
  - Favor simple, readable markup over abstraction.
  - Avoid premature refactoring into components or templates.

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

## Change safety rules
- Ask for confirmation before:
  - Large HTML restructures
  - Renaming CSS classes used across the page
  - Removing or replacing existing JavaScript logic
- When editing multiple files:
  - Show a clear diff
  - Summarize what changed and why

## Examples (what to change and how)
- Update the hero title or meta description:
  - Edit `<title>` and `<meta name="description">` in `index.html`.
- Change color tokens:
  - Edit `:root` variables at the top of `css/styles.css` (e.g. `--accent`, `--bg`).
- Email obfuscation:
  - The script in `index.html` wires email from `span[data-user|data-domain|data-tld]`.
  - Preserve the `data-*` attributes and `wireEmail()` logic if modifying.

## Commit discipline
- Prefer small, atomic commits.
- One visual or behavioral change per commit when possible.
- Commit messages should clearly reference the file(s) changed.

## What not to do
- Do not introduce a JS build step or `package.json` — this repo is intentionally simple.
- Do not remove the inline email-obfuscation script unless replacing it with an equally small, dependency-free solution.

## Where to look first
- `index.html` — page structure and inline scripts.
- `css/styles.css` — design tokens and layout rules.
- `assets/` — images and favicon.

## If anything here is unclear
- Update this file and include the clarification in the same commit.
