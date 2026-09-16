import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'

/** `the garden` → `The Garden` */
export const titleCase = (value: string) => value.replace(/(^|\s)\p{Ll}/gu, (c) => c.toUpperCase())

/** Vault dates (`YYYY-MM-DD`, optional time) as ISO days, for `article:*_time` */
export const isoDate = (date?: string) =>
  date && !Number.isNaN(Date.parse(date.slice(0, 10))) ? date.slice(0, 10) : undefined

/** Search results cut descriptions at roughly 160 characters; trim on a word boundary */
const clip = (value: string, max = 160) => {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`
}

type PageMetadata = {
  title?: string
  description?: string
  /** Site-relative path, e.g. `/garden`; relative to `metadataBase` */
  path: string
  openGraph?: Metadata['openGraph']
}

/**
 * Metadata objects merge shallowly, so a page that sets `openGraph` or `twitter` replaces the
 * layout's wholesale. This rebuilds them in full for each page so nothing falls back to the home page's.
 */
export const pageMetadata = ({
  title,
  description: fullDescription = SITE_DESCRIPTION,
  path,
  openGraph,
}: PageMetadata): Metadata => {
  const description = clip(fullDescription)
  const socialTitle = title ?? SITE_NAME
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_GB',
      type: 'website',
      ...openGraph,
    } as Metadata['openGraph'],
    twitter: { card: 'summary_large_image', title: socialTitle, description },
  }
}
