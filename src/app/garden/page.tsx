import type { Metadata } from 'next'

import { SectionIndex, sectionMetadata } from '@/components/garden/section-index'
import { sections } from '@/lib/garden'

export const metadata: Metadata = sectionMetadata(sections.garden)

export default function GardenPage() {
  return <SectionIndex section={sections.garden} />
}
