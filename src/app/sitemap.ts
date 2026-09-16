import type { MetadataRoute } from 'next'

import { getNotes, sections, tendedDate } from '@/lib/garden'
import { SITE_URL } from '@/lib/site'

const toDate = (date?: string) => (date ? new Date(`${date.slice(0, 10)}T00:00:00Z`) : undefined)

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = Object.values(sections).flatMap((section) =>
    getNotes(section).map((note) => ({
      url: `${SITE_URL}${section.href}/${encodeURIComponent(note.slug)}`,
      lastModified: toDate(tendedDate(note)),
    })),
  )

  return [
    { url: SITE_URL, priority: 1 },
    ...Object.values(sections).map((section) => ({
      url: `${SITE_URL}${section.href}`,
      priority: 0.8,
    })),
    ...notes,
  ]
}
