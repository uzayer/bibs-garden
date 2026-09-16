import type { Metadata } from 'next'

import { NoteView, noteMetadata, noteStaticParams } from '@/components/garden/note-view'
import { sections } from '@/lib/garden'

// Every reference is known at build time; anything else is a 404
export const dynamicParams = false

export const generateStaticParams = () => noteStaticParams(sections.refs)

export async function generateMetadata({ params }: PageProps<'/refs/[slug]'>): Promise<Metadata> {
  return noteMetadata(sections.refs, (await params).slug)
}

export default async function RefPage({ params }: PageProps<'/refs/[slug]'>) {
  return <NoteView section={sections.refs} slug={(await params).slug} />
}
