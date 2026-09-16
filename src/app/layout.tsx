import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'

import { pageMetadata } from '@/lib/metadata'
import { AUTHOR, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const skiperCustom = localFont({
  src: './fonts/skiper-custom.woff',
  variable: '--font-skiper-custom',
})

const skiperRoman = localFont({
  src: './fonts/roman.woff',
  variable: '--font-skiper-roman',
})

export const metadata: Metadata = {
  ...pageMetadata({ path: '/' }),
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
}

// Let the page run under Safari's floating toolbar; the footer pads itself by the safe-area inset
export const viewport: Viewport = {
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${skiperCustom.variable} ${skiperRoman.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
