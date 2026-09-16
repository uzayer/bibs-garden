import { getNote, getSlugs, sections } from '@/lib/garden'
import { noteOgImage, ogContentType, ogSize } from '@/lib/og'

export const dynamicParams = false
export const size = ogSize
export const contentType = ogContentType

export const generateStaticParams = () => getSlugs(sections.garden).map((slug) => ({ slug }))

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const note = getNote(sections.garden, (await params).slug)
  return noteOgImage(note?.title ?? '', `${sections.garden.href}/`)
}
