import type { Metadata } from 'next'

import { SectionIndex } from '@/components/garden/section-index'
import { sections } from '@/lib/garden'

export const metadata: Metadata = {
  title: 'References',
  description: sections.refs.description,
}

export default function RefsPage() {
  return <SectionIndex section={sections.refs} />
}
