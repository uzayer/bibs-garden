import { gardenNotes, type GardenNote } from '#content'

export { tagLabel } from '@/lib/tags'

/**
 * Each vault sub-folder of `garden/` is published as its own section with an index and
 * note pages. Slugs are unique across the whole collection, so a note belongs to exactly one.
 */
export const sections = {
  garden: {
    folder: '',
    href: '/garden',
    title: 'the garden',
    noun: 'note',
    count: 'notes planted',
    description: 'Notes, ideas, and projects in various stages of growth.',
    intro:
      'Notes, ideas, and projects in various stages of growth. Nothing here is in order, so wander by topic and follow whatever catches your eye.',
  },
  refs: {
    folder: 'ref',
    href: '/refs',
    title: 'references',
    noun: 'reference',
    count: 'references clipped',
    description: 'Articles, tools, videos, and sites clipped from around the web.',
    intro:
      'Articles, tools, videos, and sites I’ve clipped from around the web and want to keep. Some come with notes, most are just worth a visit.',
  },
} as const

export type Section = (typeof sections)[keyof typeof sections]

const byTitle = (a: GardenNote, b: GardenNote) =>
  a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })

/** Sorted by title, not date: the garden is meant to be wandered, not read in order. */
export const getNotes = (section: Section) =>
  gardenNotes.filter((n) => n.folder === section.folder).toSorted(byTitle)

/** Params can arrive percent-encoded for non-Latin slugs. */
export const getNote = (section: Section, slug: string) => {
  const decoded = safeDecodeURIComponent(slug)
  return getNotes(section).find((n) => n.slug === slug || n.slug === decoded)
}

export const getSlugs = (section: Section) => getNotes(section).map((n) => n.slug)

const safeDecodeURIComponent = (value: string) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/** The last time a note was touched: `updated`, falling back to `created`. */
export const tendedDate = (note: GardenNote) => note.updated ?? note.created

/** Vault dates are `YYYY-MM-DD` with an optional time; only the day is shown, so format it in UTC to avoid shifting it. */
export const formatDate = (date?: string) => {
  if (!date) return undefined
  const day = new Date(`${date.slice(0, 10)}T00:00:00Z`)
  if (Number.isNaN(day.getTime())) return undefined
  return day.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export const readingMinutes = (html: string) => {
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export const isUrl = (value?: string): value is string => !!value && /^https?:\/\//i.test(value)

/** `https://www.example.com/a/b` → `example.com` */
export const sourceHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
