import Link from 'next/link'

import { ArrowWeired } from '@/components/arrow-weired'

/** Mirrors the landing page's "All work" pill: a circled arrow pointing back, with a small label. */
const BackLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="group flex w-fit items-center gap-3">
    <span className="flex size-8 items-center justify-center rounded-full bg-black p-2 text-[#F9F7EF] transition-transform duration-300 group-hover:-translate-x-1">
      <ArrowWeired className="rotate-90" />
    </span>
    <span className="font-roman text-xs uppercase tracking-widest md:text-sm">{label}</span>
  </Link>
)

export { BackLink }
