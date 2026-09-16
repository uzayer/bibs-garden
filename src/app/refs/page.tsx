import type { Metadata } from 'next'

import { SectionIndex, sectionMetadata } from '@/components/garden/section-index'
import { sections } from '@/lib/garden'

export const metadata: Metadata = sectionMetadata(sections.refs)

export default function RefsPage() {
  return <SectionIndex section={sections.refs} />
}
