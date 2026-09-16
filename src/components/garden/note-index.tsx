'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { ArrowWeired } from '@/components/arrow-weired'
import { tagLabel } from '@/lib/tags'
import { cn } from '@/lib/utils'

export type NoteRow = {
  slug: string
  title: string
  description?: string
  tags: string[]
  tended?: string
  /** Hostname of the source, for clipped references */
  source?: string
}

const TAG_PARAM = 'tag'

/** Tag chips are derived from the notes themselves, never hardcoded. */
const collectTags = (notes: NoteRow[]) => {
  const counts = new Map<string, number>()
  for (const note of notes) for (const tag of note.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  return [...counts].toSorted(([a], [b]) => a.localeCompare(b))
}

/**
 * Multi-select filter: a note shows if it carries any selected tag. Selection lives in
 * `?tag=` so a tag badge on a note page can link straight into a filtered index.
 */
const NoteIndex = ({ notes, basePath }: { notes: NoteRow[]; basePath: string }) => {
  const searchParams = useSearchParams()
  const selected = searchParams.getAll(TAG_PARAM)
  return <NoteIndexView notes={notes} basePath={basePath} selected={selected} />
}

/** Unfiltered render, used as the Suspense fallback while search params resolve. */
const NoteIndexView = ({
  notes,
  basePath,
  selected = [],
}: {
  notes: NoteRow[]
  basePath: string
  selected?: string[]
}) => {
  const tags = collectTags(notes)
  const visible = selected.length
    ? notes.filter((n) => n.tags.some((t) => selected.includes(t)))
    : notes

  const setSelected = (next: string[]) => {
    const params = new URLSearchParams()
    for (const tag of next) params.append(TAG_PARAM, tag)
    const query = params.toString()
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
  }

  const toggle = (tag: string) =>
    setSelected(selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag])

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 px-6 py-8 md:flex-row md:items-baseline md:gap-8 md:px-10">
        <p className="font-roman shrink-0 text-xs uppercase tracking-widest text-black/50">
          filter by topic
        </p>
        <ul className="flex flex-wrap gap-2">
          {tags.map(([tag, count]) => {
            const active = selected.includes(tag)
            return (
              <li key={tag}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(tag)}
                  className={cn(
                    'font-roman cursor-pointer rounded-full border px-3 py-1 text-xs uppercase tracking-widest transition-colors',
                    active
                      ? 'border-black bg-black text-[#F9F7EF]'
                      : 'border-black/20 hover:border-black',
                  )}
                >
                  {tagLabel(tag)} <span className="opacity-50">{count}</span>
                </button>
              </li>
            )
          })}
          {selected.length > 0 && (
            <li>
              <button
                type="button"
                onClick={() => setSelected([])}
                className="font-roman cursor-pointer px-3 py-1 text-xs uppercase tracking-widest underline underline-offset-4"
              >
                clear
              </button>
            </li>
          )}
        </ul>
      </div>

      <ol className="border-b border-black/15">
        {visible.map((note, i) => (
          <li key={note.slug} className="border-t border-black/15">
            <Link
              href={`${basePath}/${note.slug}`}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-6 py-6 transition-colors duration-300 hover:bg-black hover:text-[#F9F7EF] md:grid-cols-[4rem_minmax(0,1.2fr)_minmax(0,1fr)_auto] md:gap-x-8 md:px-10"
            >
              <span className="font-roman text-xs tracking-widest opacity-50">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-custom text-balance break-words text-3xl uppercase leading-[0.9] md:text-5xl">
                {note.title}
              </h2>
              <div className="col-start-2 row-start-2 flex min-w-0 flex-col gap-2 md:col-start-3 md:row-start-1">
                {note.description && (
                  <p className="line-clamp-2 text-sm leading-snug wrap-anywhere opacity-70 first-letter:uppercase">
                    {note.description}
                  </p>
                )}
                <p className="font-roman text-[0.65rem] uppercase tracking-widest wrap-anywhere opacity-50">
                  {[note.source, note.tended, ...note.tags.map(tagLabel)]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <span className="col-start-3 row-span-2 row-start-1 flex size-8 items-center justify-center rounded-full bg-black p-2 text-[#F9F7EF] -rotate-90 transition duration-300 group-hover:-rotate-135 group-hover:bg-[#F9F7EF] group-hover:text-black md:col-start-4 md:row-span-1">
                <ArrowWeired />
              </span>
            </Link>
          </li>
        ))}
        {visible.length === 0 && (
          <li className="font-roman border-t border-black/15 px-6 py-16 text-center text-sm uppercase tracking-widest opacity-50 md:px-10">
            nothing growing here yet
          </li>
        )}
      </ol>
    </div>
  )
}

export { NoteIndex, NoteIndexView }
