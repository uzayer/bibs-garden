import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/footer'
import { BackLink } from '@/components/garden/back-link'
import { ContainedScrollProgress } from '@/components/ui/skiper-ui/skiper95'
import {
  formatDate,
  getNote,
  getSlugs,
  isUrl,
  readingMinutes,
  type Section,
  sourceHost,
  tagLabel,
  tendedDate,
} from '@/lib/garden'
import { isoDate, pageMetadata, titleCase } from '@/lib/metadata'
import { AUTHOR } from '@/lib/site'

/** `[[Note]]` in frontmatter isn't touched by the remark plugins, so strip it here. */
const plain = (value: string) => value.replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, '$2')

export const noteStaticParams = (section: Section) => getSlugs(section).map((slug) => ({ slug }))

export const noteMetadata = (section: Section, slug: string): Metadata => {
  const note = getNote(section, slug)
  if (!note) return {}
  return pageMetadata({
    title: note.title,
    // Notes without their own description fall back to their section's
    description: note.description ?? section.description,
    path: `${section.href}/${encodeURIComponent(note.slug)}`,
    openGraph: {
      type: 'article',
      publishedTime: isoDate(note.published ?? note.created),
      modifiedTime: isoDate(tendedDate(note)),
      authors: [note.author ?? AUTHOR],
      section: titleCase(section.title),
      tags: note.tags.map(tagLabel),
    },
  })
}

/** Note page shared by every garden section (`/garden/[slug]`, `/refs/[slug]`). */
export const NoteView = ({ section, slug }: { section: Section; slug: string }) => {
  const note = getNote(section, slug)
  if (!note) notFound()

  const tended = formatDate(tendedDate(note))
  const planted = formatDate(note.created)

  const meta = [
    { label: 'planted', value: planted },
    { label: 'last tended', value: tended !== planted ? tended : undefined },
    { label: 'published', value: formatDate(note.published) },
    { label: 'by', value: note.author },
    { label: 'reading', value: note.content ? `${readingMinutes(note.content)} min` : undefined },
  ].filter((m): m is { label: string; value: string } => !!m.value)

  return (
    <>
      <main className="relative min-h-screen w-full bg-[#F9F7EF] text-black">
        {/* Stays within the note, clear of the footer; hidden on small screens, where it would sit on top of the text */}
        <ContainedScrollProgress className="z-40 hidden md:flex" />
        <header className="px-6 pt-10 md:px-10">
          <BackLink href={section.href} label={section.title} />
        </header>

        <article className="mt-24 flex flex-col items-center pb-32 md:mt-32">
          <p className="font-roman md:text-md px-6 text-center text-sm uppercase tracking-widest">
            {section.noun}
          </p>

          <h1 className="font-custom mt-10 w-full text-balance border-y border-black/15 px-6 py-[0.12em] text-center text-5xl uppercase leading-[0.9] [text-box:trim-both_cap_alphabetic] md:text-7xl lg:text-8xl">
            {note.title}
          </h1>

          {note.description && (
            <p className="mt-10 max-w-xl px-6 text-center text-lg leading-relaxed text-black/70 first-letter:uppercase">
              {note.description}
            </p>
          )}

          {note.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap justify-center gap-2 px-6">
              {note.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`${section.href}?tag=${encodeURIComponent(tag)}`}
                    className="font-roman block rounded-full border border-black/20 px-3 py-1 text-xs uppercase tracking-widest transition-colors hover:border-black hover:bg-black hover:text-[#F9F7EF]"
                  >
                    {tagLabel(tag)}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-16 flex w-full max-w-2xl flex-wrap border-t border-black/15">
            {meta.map(({ label, value }) => (
              <div
                key={label}
                className="flex-1 basis-32 border-b border-black/15 px-6 py-4 text-center"
              >
                <dt className="font-roman text-[0.65rem] uppercase tracking-widest text-black/50">
                  {label}
                </dt>
                <dd className="mt-1 text-sm">{value}</dd>
              </div>
            ))}
            {note.source && (
              <div className="basis-full border-b border-black/15 px-6 py-4 text-center">
                <dt className="font-roman text-[0.65rem] uppercase tracking-widest text-black/50">
                  source
                </dt>
                <dd className="mt-1 truncate text-sm">
                  {isUrl(note.source) ? (
                    <a
                      href={note.source}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-black/30 underline-offset-4 hover:decoration-black"
                    >
                      {sourceHost(note.source)}
                    </a>
                  ) : (
                    plain(note.source)
                  )}
                </dd>
              </div>
            )}
          </dl>

          {note.content ? (
            <div
              className="garden-prose mt-16 w-full max-w-2xl px-6"
              // Rendered by Velite at build time from the vault's own Markdown
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          ) : (
            <p className="font-roman mt-16 text-sm uppercase tracking-widest text-black/50">
              just a seedling, nothing written yet
            </p>
          )}

          <div className="mt-24">
            <BackLink href={section.href} label={`back to ${section.title}`} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
