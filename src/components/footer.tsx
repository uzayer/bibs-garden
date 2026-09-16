import Image from 'next/image'
import Link from 'next/link'

import { AUTHOR, INSTAGRAM_URL, gravatarUrl, isExternal } from '@/lib/site'

const NAME = 'zuhayermasud'

// Swap the placeholder hrefs as routes and profiles go live
const columns = [
  {
    title: 'Garden',
    links: [
      { label: 'Notes', href: '/garden' },
      { label: 'Images', href: '#' },
      { label: 'References', href: '/refs' },
    ],
  },
  {
    title: 'Socials',
    links: [{ label: 'Instagram', href: INSTAGRAM_URL }],
  },
]

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0a0a0a] pb-[env(safe-area-inset-bottom)] text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="h-px w-full bg-neutral-800" />

        <div className="grid gap-12 pt-20 md:grid-cols-[1.2fr_2fr] md:px-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex w-fit items-center gap-3">
              <Image
                src={gravatarUrl(160)}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-lg bg-neutral-800 object-cover"
              />
              <span className="text-lg font-medium text-white">{NAME}</span>
            </Link>
            <p className="max-w-xs text-neutral-500">
              © {new Date().getFullYear()} {AUTHOR}. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-6">
                <p className="font-semibold text-neutral-200">{column.title}</p>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-white"
                        {...(isExternal(link.href) && { target: '_blank', rel: 'noreferrer' })}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none mt-24 -mb-[0.12em] select-none text-center font-custom text-[18vw] leading-none md:text-[12.5vw] tracking-tighter whitespace-nowrap text-neutral-900"
      >
        {NAME}
      </p>
    </footer>
  )
}

export { Footer }
