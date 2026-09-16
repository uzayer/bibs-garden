# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Warning: Next.js 16

This project uses Next.js 16, which has breaking changes from earlier versions. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Turbopack is the default bundler — do not use webpack plugins.

## Documentation before code changes

Before editing behavior, configuration, or APIs that depend on an external library, pull current docs with Context7 (preferred IDs below). Do not rely on training data for signatures, config options, or version-specific behavior.

1. Resolve or confirm the library ID: `npx ctx7@latest library <name> "<what you need>"`
2. Fetch: `npx ctx7@latest docs <libraryId> "<specific question>"`

Use a **versioned** ID from the `library` output when the installed package version must match (e.g. Next.js). If a command fails with a quota error, use `npx ctx7@latest login` or set `CONTEXT7_API_KEY`.

### Context7 library IDs (this stack)

| Topic | Context7 ID | Notes |
| --- | --- | --- |
| Next.js (match ~16.2.x) | `/vercel/next.js/v16.2.2` | Bump segment if project `next` version diverges |
| React | `/reactjs/react.dev` | Official docs; `/facebook/react/v19_2_0` for version-tied API |
| Velite | `/zce/velite` | Content pipeline, schemas, build |
| Tailwind CSS | `/tailwindlabs/tailwindcss.com` | v4 utilities, `@tailwindcss/postcss` |
| TypeScript | `/microsoft/typescript` | Prefer `/v5.9.3` (or nearest) when version-specific |
| Base UI (`@base-ui/react`) | `/mui/base-ui` | Headless primitives used with shadcn-style setup |
| shadcn/ui & CLI | `/shadcn-ui/ui` | Components, CLI, registries |
| ESLint | `/eslint/eslint` | Flat config, rule sets |

## Git commits

- **Conventional Commits**: enforced by Commitlint ([Conventional Commits](https://www.conventionalcommits.org/) + `@commitlint/config-conventional`). Examples: `feat:`, `fix:`, `chore:`, `docs:`, optional scope `feat(api): ...`.
- **No `Co-authored-by:` trailers**: Do not add `Co-authored-by:` lines for AI tools or assistants; the human author owns the commits. Husky `commit-msg` strips any such lines before Commitlint runs, but you should still omit them.

To skip hooks in an emergency (e.g. CI or recover): `HUSKY=0 git commit ...` (use sparingly).

## Commands

```bash
pnpm dev          # velite dev + next dev in parallel (watch mode)
pnpm build        # velite build --clean, then next build (sequential)
pnpm lint         # eslint
```

Always use `pnpm`. Never `npm` or `yarn`.

## Architecture

### Content pipeline

**Velite** (`velite.config.ts`) is the content layer. It reads `.md` files from `content/`, validates frontmatter via Zod schemas, and outputs typed TypeScript to `.velite/`. Velite runs as a standalone CLI process — it is **not** a webpack plugin and must not be wired into Next.js config.

Pages import content via the `#content` path alias:
```ts
import { gardenNotes } from '#content'
```

The `.velite/` directory is gitignored and generated at build time.

### Collections

| velite.config key | Source pattern | Fields |
|---|---|---|
| `gardenNotes` | `content/garden/**/*.md` | title, description, tags, source, author, published, created, updated, content, + computed `slug`, `folder` |

- `title` falls back to the filename; `slug` is a Unicode-aware slug of the filename and must be unique (build fails on duplicates).
- `folder` is the sub-folder inside the vault's `garden/` (`''` at top level, e.g. `'ref'`).
- Notes with an empty body are kept with `content: ''`.

### Vault frontmatter helpers

Empty YAML keys arrive as `null`, which Zod's `.optional()` rejects. Use the helpers at the top of `velite.config.ts` for every vault field — never `s.string().optional()` directly:

- `nullish(schema)` — treats `null | ''` as absent
- `vaultTags()` — `null` → `[]`, single string → list, strips leading `#`
- `vaultAuthor()` — `string | string[] | null`, strips `[[wikilinks]]`, joins with `, `
- `vaultDate()` — keeps the date string (`2026-02-24` or `2026-02-24 22:51`), rejects unparseable values

### Markdown handling

Velite's built-in `copyLinkedFiles` is disabled. `remarkVaultLinks` replaces it: relative links to notes (`.md`) render as plain text, relative attachments are URL-decoded and copied to `public/static/`, and missing attachments become text with a build warning. `remarkBreaks` matches Obsidian's default line-break rendering; `remarkStripWikilinks` catches any leftover `[[...]]`.

### Content source

`content/` is written **only** by the Enveloppe Obsidian plugin (`obsidian-mkdocs-publisher`); never edit it by hand, and never write back to the vault. The vault is canonical.

- A note is published by moving it into the vault's `garden/` folder. Enveloppe runs in share-all mode with every path outside `garden/` excluded, so there is no `publish` frontmatter key.
- Upload behavior mirrors vault paths: `garden/X.md` → `content/garden/X.md`. Embedded attachments → `content/assets/`.
- Wikilinks are converted to relative Markdown links; `%%comments%%` are removed before upload.
- Autoclean deletes `.md`/attachment files under `content/` that are no longer in the vault's `garden/`, and is restricted from touching anything outside `content/`.
- Publishing is triggered manually from Obsidian ("Upload all shared notes" is what runs autoclean).

### Path aliases

- `@/*` → `src/*`
- `#content` → `.velite`

### UI

shadcn/ui with `base-nova` style, neutral base color, CSS variables enabled. Add components with `pnpm dlx shadcn add <component>`. Component files land in `src/components/ui/`.
