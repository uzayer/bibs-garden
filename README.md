# bibs garden

My personal digital garden: a slowly growing collection of notes, references, and ideas. Nothing here is finished. Notes get planted, revisited, and pruned over time, and they're sorted by title rather than date so the site is wandered, not read in order.

## What's on the site

| Route                               | What it is                                                          |
| ----------------------------------- | ------------------------------------------------------------------- |
| `/`                                 | Landing page: ASCII 3D hero, a short about section, and the sitemap |
| `/garden`                           | Notes, ideas, and projects in various stages of growth              |
| `/refs`                             | Articles, tools, videos, and sites clipped from around the web      |
| `/garden/[slug]` and `/refs/[slug]` | A single note or reference                                          |

## How writing gets published

The notes live in my Obsidian vault, which is the source of truth. This repo only renders them.

1. A note is published by moving it into the vault's `garden/` folder (`garden/ref/` for references).
2. The [Enveloppe](https://github.com/Enveloppe/obsidian-enveloppe) Obsidian plugin uploads it to `content/garden/`, converting wikilinks to Markdown links and copying embedded attachments to `content/assets/`. Running "Upload all shared notes" also removes anything no longer in `garden/`.
3. [Velite](https://velite.js.org) validates the frontmatter and turns `content/` into typed data in `.velite/`, which the pages import from `#content`.

Don't edit `content/` by hand; the next upload from Obsidian will overwrite it.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) and React 19
- [Velite](https://velite.js.org) for the Markdown content layer
- [Tailwind CSS 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), and [Skiper UI](https://skiper-ui.com) components
- [Framer Motion](https://motion.dev) for scroll effects and [three.js](https://threejs.org) for the ASCII hero
- [Bun](https://bun.sh) as package manager and runtime
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) for linting and formatting

## Development

Use Bun for everything; there's no npm, pnpm, or yarn here.

```bash
bun install
bun dev             # Velite and Next.js in watch mode at http://localhost:3000
bun run build       # Velite build, then Next.js build
bun run lint        # oxlint (bun run lint:fix to autofix)
bun run fmt         # oxfmt
bun run typecheck   # tsc
```

Use `bun run build`, not `bun build` (that's Bun's bundler).

Commits follow [Conventional Commits](https://www.conventionalcommits.org). A Husky pre-commit hook lints, formats, and type-checks staged files.

## Project layout

```
content/           Notes and attachments uploaded from Obsidian (don't edit)
public/            Static files: images, the 3D model, copied attachments
src/app/           Routes: home, garden, refs
src/components/    Page components; shadcn and Skiper UI pieces in ui/
src/lib/           Section config, tags, site constants
velite.config.ts   Content schema and Markdown plugins
```
