import { existsSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import type { Image, Link, Root, Text } from 'mdast'
import remarkBreaks from 'remark-breaks'
import { visit } from 'unist-util-visit'
import { defineConfig, isRelativePath, processAsset, s, z } from 'velite'

/**
 * Content contract
 * ----------------
 * The Obsidian vault is canonical. A note is published by moving it into the
 * vault's `garden/` folder; Enveloppe mirrors that folder to `content/garden/`
 * (attachments to `content/assets/`) and autoclean deletes anything that left it.
 * Nothing here writes back to `content/` — Velite only reads and normalizes.
 *
 * Vault frontmatter (see vault `templates/Ref.md`):
 *   title, description, tags, source, author, published, created, updated
 * Empty keys arrive as YAML `null`, so every optional field goes through `nullish()`.
 */

const OUTPUT = {
  data: '.velite',
  assets: 'public/static',
  base: '/static/',
  // Velite's [ext] has no leading dot.
  name: '[name]-[hash:8].[ext]',
  clean: true,
} as const

const GARDEN_ROOT = resolve('content/garden')

/** Treat YAML `null` and `''` as absent before validating. */
const nullish = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === null || v === '' ? undefined : v), schema.optional())

/**
 * Remark transformers are typed structurally: Velite bundles its own `unified`
 * types, so `Plugin` from the top-level package doesn't unify with them.
 */
type RemarkTransformer = (tree: Root, file: { path: string }) => void | Promise<void>

/** Inner part of `[[...]]`: `Page`, `Page|Alias`, `Page#Heading`, `Page#Heading|Alias`. */
const displayFromWikilinkInner = (inner: string) => {
  const t = inner.trim()
  const pipe = t.indexOf('|')
  if (pipe !== -1) return t.slice(pipe + 1).trim()
  const hash = t.indexOf('#')
  if (hash !== -1) return t.slice(0, hash).trim()
  return t
}

const wikilinkToPlain = (value: string) =>
  value.replace(/!?\[\[([^\]]+)\]\]/g, (_, inner: string) =>
    displayFromWikilinkInner(inner),
  )

/** `string | string[] | null` with wikilinks stripped, joined for display. */
const vaultAuthor = () =>
  z.preprocess((v) => {
    if (v === null || v === undefined || v === '') return undefined
    const list = Array.isArray(v) ? v : [v]
    const joined = list
      .map((a) => wikilinkToPlain(String(a ?? '')).trim())
      .filter(Boolean)
      .join(', ')
    return joined || undefined
  }, z.string().optional())

/** Tags as a clean string list; tolerates `null`, a single string, and `#tag`. */
const vaultTags = () =>
  z.preprocess((v) => {
    if (v === null || v === undefined || v === '') return []
    const list = Array.isArray(v) ? v : [v]
    return list
      .filter((t) => t !== null && t !== '')
      .map((t) => String(t).replace(/^#/, ''))
  }, z.array(z.string()))

/** Obsidian dates may be `2026-02-24` or `2026-02-24 22:51`; keep the string, reject junk. */
const vaultDate = () =>
  nullish(
    z.coerce
      .string()
      .refine((d) => !Number.isNaN(Date.parse(d)), 'Invalid date'),
  )

const basename = (path: string) =>
  path.split('/').pop()!.replace(/\.mdx?$/, '')

/** Unicode-aware so non-Latin (e.g. Bangla) filenames don't collapse to ''. */
const slugify = (path: string) =>
  basename(path)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

const safeDecode = (url: string) => {
  try {
    return decodeURI(url)
  } catch {
    return url
  }
}

const isNoteUrl = (url: string) => /\.mdx?(?:[#?].*)?$/i.test(url)

/** Strip leftover Obsidian wikilinks in text to their display text. */
const remarkStripWikilinks = (): RemarkTransformer => (tree) => {
  visit(tree, 'text', (node) => {
    if (!node.value.includes('[[')) return
    node.value = wikilinkToPlain(node.value)
  })
}

/**
 * Resolve relative links/images as emitted by Enveloppe:
 * - links/embeds to other notes → plain text (routing is not built yet, and the
 *   target may be a private note that was never published)
 * - relative attachments → copied to `public/static` (decoded first, since
 *   Obsidian filenames often contain spaces)
 * - relative targets that don't exist → plain text instead of failing the note
 *
 * Replaces Velite's built-in `copyLinkedFiles`, which neither decodes URLs nor
 * tolerates `.md` targets.
 */
const remarkVaultLinks = (): RemarkTransformer => async (tree, file) => {
  const toText = (node: Link | Image): Text => ({
    type: 'text',
    value:
      node.type === 'image'
        ? node.alt || ''
        : node.children.map((c) => ('value' in c ? c.value : '')).join(''),
  })

  const jobs: Promise<void>[] = []

  visit(tree, ['link', 'image'], (node, index, parent) => {
    const n = node as Link | Image
    if (!parent || index === undefined || !isRelativePath(n.url)) return

    const url = safeDecode(n.url)
    const target = resolve(dirname(file.path), url.replace(/[#?].*$/, ''))

    if (isNoteUrl(url) || !existsSync(target)) {
      if (!isNoteUrl(url))
        console.warn(`[velite] missing attachment "${url}" in ${file.path}`)
      parent.children[index] = toText(n)
      return
    }

    jobs.push(
      processAsset(url, file.path, OUTPUT.name, OUTPUT.base).then((src) => {
        n.url = src
      }),
    )
  })

  await Promise.all(jobs)
}

/** Stub notes (frontmatter only) are valid garden seedlings, not errors. */
const noteBody = () =>
  s.markdown().catch((ctx) => {
    const onlyEmpty = ctx.error.issues.every(
      (i) => i.message === 'The content is empty',
    )
    if (!onlyEmpty)
      console.warn(
        `[velite] markdown failed: ${ctx.error.issues.map((i) => i.message).join('; ')}`,
      )
    return ''
  })

const gardenNotes = {
  name: 'GardenNote',
  pattern: 'garden/**/*.md',
  schema: s
    .object({
      title: nullish(z.string()),
      description: nullish(z.string()),
      tags: vaultTags(),
      source: nullish(z.string()),
      author: vaultAuthor(),
      published: vaultDate(),
      created: vaultDate(),
      updated: vaultDate(),
      content: noteBody(),
    })
    .transform((data, { meta }) => ({
      ...data,
      title: data.title ?? basename(meta.path),
      slug: slugify(meta.path),
      /** Sub-folder inside the vault's `garden/` ('' for top level, e.g. 'ref'). */
      folder: relative(GARDEN_ROOT, dirname(meta.path)).split('\\').join('/'),
    })),
}

export default defineConfig({
  root: 'content',
  markdown: {
    // Velite's copier is replaced by remarkVaultLinks (see above).
    copyLinkedFiles: false,
    // Obsidian renders single newlines as line breaks by default.
    remarkPlugins: [remarkBreaks, remarkStripWikilinks, remarkVaultLinks],
  },
  output: OUTPUT,
  collections: { gardenNotes },
  prepare: ({ gardenNotes }) => {
    const seen = new Map<string, string>()
    for (const note of gardenNotes) {
      const prev = seen.get(note.slug)
      if (prev)
        throw new Error(
          `Duplicate slug "${note.slug}": "${prev}" and "${note.title}" — rename one in the vault.`,
        )
      seen.set(note.slug, note.title)
    }
  },
})
