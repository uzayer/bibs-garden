---
title: Digital Garden Spec Sheet
description: specification sheet for the obsidian digital garden
tags:
  - topic/digital-garden
source: "[[Obsidian Digital Garden Website]]"
created: 2026-05-06
---



# Bibs Garden — Product Spec Sheet

> Version 1.0 — May 2026  
> Stack: Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Velite · pnpm

**Stack layers:**
- CMS: Obsidian + Enveloppe → GitHub
- Frontend: Next.js (App Router) + Velite + shadcn/ui → Vercel
- Domain: Namecheap + Cloudflare

---

## Vision

A personal digital garden inspired by Maggie Appleton's approach — a collection of imperfect, growing notes, ideas, and lists that are explored non-linearly. Not a blog. Not a portfolio. A public window into how Bibs thinks, watches, reads, designs, and skates.

The site has two distinct layers:

1. **The Garden** — writing, ideas, and notes in various stages of growth
2. **The Library & Anti-Library** — books read, books wanted, films, anime, and shows watched (personal and design-related)

Everything is written in Obsidian and published via Enveloppe → GitHub → Vercel.

---

## Inspiration

**Maggie Appleton — maggieappleton.com**

- Non-linear, topically navigated, not date-sorted
- Essays, patterns, and notes coexist in the same space
- Strong personal visual identity — feels like a person, not a template
- Wandering encouraged over reading in sequence

**Key difference from Maggie's garden:** Bibs's garden extends into personal territory — movies, anime, TV shows, and a library system — things Maggie keeps off her garden. This is intentional. The garden reflects the full person.

---

## Site Sections

### 1. Home (`/`)

The entry point. hyper personalized

**Contains:**

- A brief personal intro — who Bibs is, what this place is , whats is a digital garden and how is it any different from a liner doc
- A "recently tended" feed — last 5-6 notes added or updated (pulled from git history at build time)
- Quick links into the main sections (Garden, Library, Anti-Library)
- Visual personality — custom cursor, strong typography, decorative elements
**Does not contain:**

- A blog feed
- A list of all notes
- Dates as primary organization

---

### 2. The Garden (`/garden`)

All notes, ideas, and writing. Non-linear and tag-navigated.

**Contains:**

- All notes tagged `type/notes` and `type/idea`
- Browseable by topic tags (`topic/design`, `topic/skateboarding`, `topic/pokemon`, `topic/personal`, `topic/tech`)
- Backlinks — notes that reference each other via `[[wikilinks]]` show connections at the bottom of each note
- Cmd+K search across all garden notes
- Tag filter — multi-select, derived dynamically from frontmatter, not hardcoded

**Does not contain:**

- A sidebar with a list of every note title (anti-Fumadocs)
- Date-sorted feed
- Categories as folders

**Note page layout:**

- Title
- Topic tag badges (shadcn Badge)
- Last tended date
- Body content (MDX rendered)
- Backlinks section at the bottom

---

### 3. The Library (`/library`)

Books read, films watched, anime completed — rendered as card grids.
this is built using bases in obsidian + obsidian webclipper with a clipper template gotten off the internet

**Sub-sections:**

#### Books (`/library/books`)

- Card grid — cover image, title, author, rating, status (read / reading / want)
- Filter by tag (`topic/design`, `topic/personal`)
- Each card links to a note with review + highlights

#### Films (`/library/films`)

- Card grid — poster, title, year, rating
- Filter by tag (`topic/design`, `topic/personal`) — a film can be both
- Each card links to a note with personal reaction and/or design observations
- `[[wikilinks]]` inside film notes connect to garden notes (e.g. Blade Runner → a note on Swiss Design)

#### Anime (`/library/anime`)

- Same card grid pattern as films
- Filter by `topic/personal`, status (watching / completed / dropped)

#### TV Shows (`/library/tv`)

- Same card grid pattern

**All library notes share this frontmatter schema:**

```yaml
---
title: string
description: string
tags: [, topic/design, topic/personal]
cover: https://image-url
rating: 1-10
status: completed | watching | dropped | read | reading | want
author: string (books only)
year: number (films/anime)
---
```

---

### 4. The Anti-Library (`/anti-library`)

Books and films Bibs wants to read or watch but hasn't yet. Inspired by Umberto Eco's concept — the unread books on the shelf matter as much as the read ones.

**Contains:**

- A simple list/card grid of books and films tagged `status: want`
- Brief note on why it's on the list
- No ratings (unread/unwatched)

---

### 5. References (`/refs`)

Web clippings, articles, design references — things captured and saved.

**Contains:**

- Card grid of all notes tagged `status/ref`
- Tag filter by topic (`topic/design`, `topic/tech`, `topic/macos` etc.)
- Each card shows: title, source URL, description, tags
- Links to the full clipping note

**Frontmatter schema for refs:**

```yaml
---
title: string
description: string
tags: [status/ref, topic/design]
source: https://original-url
author: string
created: YYYY-MM-DD
---
```

---

## Navigation

**Global nav (top):**

```
Garden    Library    Anti-Library    Refs    [Search ⌘K]
```

**No sidebar.** Navigation lives in the top bar and on index pages.

**Tag navigation:** Every `t/` tag has an index page at `/tags/[tag]` showing all content across all sections carrying that tag. This is how cross-section connections surface — clicking `topic/design` on a film card takes you to a page showing every design-tagged note, film, book, and ref in the whole garden.

---


---

## Content → URL Mapping

|Content|URL|
|---|---|
|Home|`/`|
|Garden index|`/garden`|
|Individual note|`/garden/[slug]`|
|Library home|`/library`|
|Books|`/library/books`|
|Films|`/library/films`|
|Anime|`/library/anime`|
|TV Shows|`/library/tv`|
|Anti-library|`/anti-library`|
|References|`/refs`|
|Tag index|`/tags/[tag]`|

---

## Content Source

**All content lives in `content/` as flat `.md` files.**

```
content/
├── garden/         ← type/notes and type/idea
├── library/        ←  (books, films, anime, tv)
├── refs/           ← s/ref clippings
└── anti-library/   ← status: want items
```

Files are pushed from Obsidian via Enveloppe. No manual uploads.

**Content processing:** Velite — reads `.md` files at build time, validates frontmatter against a Zod schema, outputs typed TypeScript collections (`allGardenNotes`, `allLibraryItems`, etc.), compiles markdown body at build.

---

## Features

### Must Have (Foundation)

- [ ] Content processing via Velite — schema-validated collections, body compiled at build time
- [ ] Dynamic tag extraction from frontmatter — no hardcoded tags
- [ ] Multi-select tag filter on all index pages
- [ ] Card grid component for library and refs sections
- [ ] Backlinks — notes that `[[link]]` to each other show connections
- [ ] Cmd+K search across all content
- [ ] Recently tended feed on home page (git history at build time)
- [ ] External image support (any hostname)

### Nice to Have (Customization Phase)

- [ ] Custom cursor
- [ ] Framer Motion page transitions
- [ ] Strong personal typography + color system
- [ ] Graph view (visual map of note connections)
- [ ] Timeline — browse by year/month of creation
- [ ] Reading time estimate on garden notes

### Shelved

- [ ] Timeline heatmap (may revisit)

---

## Tech Decisions

| Decision                | Choice            | Reason                                                 |
| ----------------------- | ----------------- | ------------------------------------------------------ |
| Content processing      | Velite            | Build-time schema validation, TypeScript types, markdown compiled at build |
| Search (Cmd+K)          | Pagefind          | Static index built post-build, zero client JS overhead |
| Component library       | shadcn/ui (Radix) | Copy-paste, agent-friendly, fully customizable         |
| Styling                 | Tailwind CSS      | Utility-first, easy to direct agents with class names  |
| Package manager         | pnpm              | Always pnpm, never npm or yarn                         |
| Deployment              | Vercel            | Auto-deploys on every GitHub push                      |
| Domain/CDN              | Cloudflare        | Domain management + global CDN                         |

---

## Coding Conventions

- TypeScript everywhere — no `.js` files in `src/`
- All new pages → `src/app/`
- All reusable components → `src/components/`
- shadcn components → `@/components/ui/[component]`
- `cn()` utility from `@/lib/cn` for conditional Tailwind classes
- Never hardcode tag names — always derive from frontmatter at runtime
- Agent context file: `AGENT_CONTEXT.md` at project root — read before every task

---

## Publishing Pipeline

```
Write in Obsidian
    → Tag with topic/, , status/ tags
    → Run Enveloppe publish
    → Note pushed to GitHub as .md
    → Vercel detects push
    → Site rebuilds (~30 seconds)
    → Note live at /garden/[slug] or /library/[slug]
```

---