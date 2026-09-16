import { Suspense } from 'react'

import { Footer } from '@/components/footer'
import { BackLink } from '@/components/garden/back-link'
import { NoteIndex, NoteIndexView, type NoteRow } from '@/components/garden/note-index'
import { formatDate, getNotes, isUrl, type Section, sourceHost, tendedDate } from '@/lib/garden'

/** Index page shared by every garden section (`/garden`, `/refs`). */
const SectionIndex = ({ section }: { section: Section }) => {
  // Only what the list needs crosses to the client; note bodies stay on the server
  const notes: NoteRow[] = getNotes(section).map((note) => ({
    slug: note.slug,
    title: note.title,
    description: note.description,
    tags: note.tags,
    tended: formatDate(tendedDate(note)),
    source: isUrl(note.source) ? sourceHost(note.source) : undefined,
  }))

  return (
    <>
      <main className="min-h-screen w-full bg-[#F9F7EF] text-black">
        <header className="px-6 pt-10 md:px-10">
          <BackLink href="/" label="home" />
        </header>

        <section className="mt-24 flex flex-col items-center md:mt-32">
          <p className="font-roman md:text-md text-sm uppercase tracking-widest">zuhayer’s</p>
          <h1 className="font-custom mt-10 h-[0.71em] w-full border-y border-black/15 text-center text-6xl uppercase leading-[0.9] md:text-9xl lg:text-[10rem]">
            {section.title}
          </h1>
          <p className="mt-10 max-w-md px-6 text-center text-base leading-relaxed text-black/70">
            {section.intro}
          </p>
          <p className="font-roman mt-6 text-xs uppercase tracking-widest text-black/50">
            {notes.length} {section.count}
          </p>
        </section>

        <section className="mt-20 pb-32">
          <Suspense fallback={<NoteIndexView notes={notes} basePath={section.href} />}>
            <NoteIndex notes={notes} basePath={section.href} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  )
}

export { SectionIndex }
