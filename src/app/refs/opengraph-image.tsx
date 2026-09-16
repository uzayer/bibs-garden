import { sections } from '@/lib/garden'
import { titleCase } from '@/lib/metadata'
import { noteOgImage, ogContentType, ogSize } from '@/lib/og'

export const alt = titleCase(sections.refs.title)
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return noteOgImage(titleCase(sections.refs.title), '/')
}
