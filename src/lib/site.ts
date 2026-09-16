export const INSTAGRAM_URL = 'https://www.instagram.com/zuhayermasud/'

export const AUTHOR = 'Zuhayer Masud'
export const SITE_NAME = 'bibs garden'
export const SITE_URL = 'https://bibs-garden.vercel.app'
export const SITE_DESCRIPTION =
  'A slowly growing digital garden of notes, references, and ideas from Zuhayer Masud. Wandered, not read in order.'

export const isExternal = (href: string) => /^https?:\/\//.test(href)

// SHA-256 of the Gravatar account's email (trimmed, lowercased); `d=initials` shows "ZM" until a photo is set
const GRAVATAR_HASH = '7a245fe47147ef43c4dcb3b132d573838db1a982260f832be32e14e66ddb06cf'

export const gravatarUrl = (size: number) =>
  `https://gravatar.com/avatar/${GRAVATAR_HASH}?s=${size}&d=initials&name=Zuhayer+Masud`
