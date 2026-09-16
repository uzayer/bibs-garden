import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { SITE_NAME } from '@/lib/site'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const CREAM = '#F9F7EF'

// Satori reads WOFF but not WOFF2; process.cwd() is the project root at build time
const headingFont = () => readFile(join(process.cwd(), 'src/app/fonts/skiper-custom.woff'))

const fontOptions = async () => ({
  ...ogSize,
  fonts: [{ name: 'Skiper Custom', data: await headingFont(), style: 'normal' as const }],
})

const frame = {
  width: '100%',
  height: '100%',
  display: 'flex',
  background: CREAM,
  color: 'black',
  fontFamily: 'Skiper Custom',
  textTransform: 'uppercase',
} as const

const Wordmark = () => <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>{SITE_NAME}</div>

/** The site-wide card: the wordmark alone, centred. */
export const siteOgImage = async () =>
  new ImageResponse(
    <div style={{ ...frame, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', fontSize: 160, lineHeight: 1 }}>
        <Wordmark />
      </div>
    </div>,
    await fontOptions(),
  )

/** A note's card: the title centred, with its section path and the wordmark along the bottom. */
export const noteOgImage = async (title: string, path: string) =>
  new ImageResponse(
    <div style={{ ...frame, flexDirection: 'column', padding: '0 64px 48px' }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          textWrap: 'balance',
          fontSize: title.length > 40 ? 88 : title.length > 20 ? 112 : 140,
          lineHeight: 0.9,
          paddingTop: 48,
        }}
      >
        {title}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', fontSize: 36, lineHeight: 1 }}
      >
        <span>{path}</span>
        <Wordmark />
      </div>
    </div>,
    await fontOptions(),
  )

export const appleIconSize = { width: 180, height: 180 }

/** Home-screen icon: the heading font's "B" on cream, since iOS fills transparency with black */
export const appleIcon = async () =>
  new ImageResponse(
    <div style={{ ...frame, alignItems: 'center', justifyContent: 'center', fontSize: 150 }}>
      B
    </div>,
    { ...(await fontOptions()), ...appleIconSize },
  )
