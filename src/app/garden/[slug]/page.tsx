import type { Metadata } from 'next'

import { NoteView, noteMetadata, noteStaticParams } from '@/components/garden/note-view'
import { sections } from '@/lib/garden'

// Every note is known at build time; anything else is a 404
export const dynamicParams = false

export const generateStaticParams = () => noteStaticParams(sections.garden)

export async function generateMetadata({ params }: PageProps<'/garden/[slug]'>): Promise<Metadata> {
  return noteMetadata(sections.garden, (await params).slug)
}

export default async function GardenNotePage({ params }: PageProps<'/garden/[slug]'>) {
  return <NoteView section={sections.garden} slug={(await params).slug} />
}
