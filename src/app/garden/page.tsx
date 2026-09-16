import type { Metadata } from 'next'

import { SectionIndex } from '@/components/garden/section-index'
import { sections } from '@/lib/garden'

export const metadata: Metadata = {
  title: 'The Garden',
  description: sections.garden.description,
}

export default function GardenPage() {
  return <SectionIndex section={sections.garden} />
}
