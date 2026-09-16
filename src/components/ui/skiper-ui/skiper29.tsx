'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import React, { useRef } from 'react'

import { ArrowWeired } from '@/components/arrow-weired'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import { INSTAGRAM_URL, isExternal } from '@/lib/site'

// Items without an href don't have a route yet
const sitemap: { label: string; href?: string }[] = [
  { label: 'notes', href: '/garden' },
  { label: 'images' },
  { label: 'references', href: '/refs' },
  { label: 'instagram', href: INSTAGRAM_URL },
]

const Skiper29 = () => {
  const gallery = useRef(null)
  const gallery2 = useRef(null)

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: gallery2,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0.6, 1], ['0%', '30%'])

  const scaleDiv = useTransform(scrollYProgress2, [0, 1], [1, 0.7])
  const scaleImg = useTransform(scrollYProgress2, [0, 1], [1, 1.3])

  return (
    <div className="flex w-screen flex-col items-center overflow-hidden bg-[#F9F7EF] text-black">
      <div ref={gallery} className="relative flex h-[70vh] w-screen items-end overflow-hidden">
        <div className="absolute left-0 top-0 z-10 h-1/2 w-full bg-gradient-to-t from-transparent to-black/90" />
        <motion.img
          src="/images/garden-hero.webp"
          alt=""
          className="h-screen w-full object-cover"
          style={{ y }}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <p className="font-roman md:text-md my-10 px-6 text-center text-sm uppercase tracking-widest">
          its a doggy dog world out there
        </p>
        <h1 className="font-custom h-8.5 lg:h-17 w-full border-b border-t text-center text-5xl leading-[0.9] lg:text-8xl">
          MY GARDEN
        </h1>
        <div className="my-4 flex size-8 items-center justify-center rounded-full bg-black p-2 text-[#F9F7EF]">
          <ArrowWeired />
        </div>
      </div>

      <motion.div
        ref={gallery2}
        style={{ scale: scaleDiv, clipPath: 'url(#video)' }}
        className="mt-35 relative flex aspect-video w-full items-center justify-center overflow-hidden lg:w-[80%]"
      >
        <SvgMask />
        <motion.img
          src="/images/garden-hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: scaleImg }}
        />
      </motion.div>

      <div className="mt-32 flex w-full flex-col items-center justify-center">
        <h2 className="font-custom h-8.5 lg:h-17 w-full border-t text-center text-5xl uppercase leading-[0.9] lg:text-8xl">
          hi, i’m
        </h2>
        <h2 className="font-custom h-8.5 lg:h-17 w-full border-b border-t text-center text-5xl uppercase leading-[0.9] lg:text-8xl">
          zuhayer
        </h2>
        <p className="font-roman md:text-md mt-10 text-sm uppercase tracking-widest">
          designer from bangladesh 🇧🇩
        </p>
        <p className="mt-6 max-w-md px-6 text-center text-base leading-relaxed text-black/70">
          This is my digital garden, a slowly growing collection of notes, images, and references I
          pick up along the way. Nothing here is finished. Ideas get planted, revisited, and pruned
          over time.
        </p>
      </div>

      <div className="my-42 flex flex-col items-center justify-center uppercase">
        <p className="font-roman md:text-md my-6 text-sm tracking-widest">sitemap</p>
        <ul className="flex flex-col items-center justify-center gap-1.5">
          {sitemap.map(({ label, href }) => {
            const text = (
              <TextRoll
                center
                className="font-custom text-4xl leading-[0.9] opacity-20 transition-opacity ease-in-out hover:opacity-100"
              >
                {label}
              </TextRoll>
            )

            return (
              <li key={label} className="relative flex cursor-pointer flex-col items-center">
                {href && isExternal(href) ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {text}
                  </a>
                ) : href ? (
                  <Link href={href}>{text}</Link>
                ) : (
                  text
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export { Skiper29 }

const SvgMask = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1836 1053" width="100%">
      <clipPath id="video" clipPathUnits="objectBoundingBox">
        <path
          fill="currentColor"
          d="M457.525 1.148c-20.789-3.198-193.979 1.16-283.854 2.496 11.104-.178 1.297-2.868-81.146-2.496-103.5.468-86 102.499-86 109.999s-7 524.5-6.5 547.5 10 59 6.5 99c-2.8 32-1.167 234.667 0 332.003.5 75 62.5 66.5 67 68.5s38.5 0 81.5 0 436 6 526 10.5 438.995-.5 505.495 0 330.01-12.5 417.51-12.5 230.99 2 270.99 0 40.5-16 51-31.5 12.5-61 12.5-105.5c0-44.503 7.01-274.504 7.01-348.004s-3.51-159.998-7.01-230.998 0-256.002 0-318.002 7.01-92.998-22.5-110.999c-18.79-11.471-81.99-9.999-133.49-9.999H853.525c-29 0-370 4-396 0Z"
          transform="scale(0.0005139987561, 0.0008543065594)"
        ></path>
      </clipPath>
    </svg>
  )
}

/**
 * Skiper 29 Parallax_001 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
