'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { cn } from '@/lib/utils'

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    description: '[0]',
  },
  {
    name: 'Components',
    href: '/components',
    description: '[1]',
  },
  {
    name: 'Pricing',
    href: '/pricing',
    description: '[2]',
  },
  {
    name: 'How to use',
    href: '/docs/quick-start',
    description: '[3]',
  },
  {
    name: 'Account',
    href: '/user',
    description: '[4]',
  },
  {
    name: 'Login',
    href: '/login',
    description: '[7]',
  },
]

export const Skiper58 = () => {
  return (
    <ul className="bs flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  )
}

const STAGGER = 0.035
// Each copy of a letter travels twice its own line box, and the clip window is padded by
// 0.25em on each side (cancelled by a negative margin, so layout is unchanged). Together
// that keeps the parked copy out of view regardless of the font's metrics or line-height.
const TRAVEL = '200%'

const TextRoll: React.FC<{
  children: string
  className?: string
  center?: boolean
}> = ({ children, className, center = false }) => {
  const letters = children.split('')

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      whileTap="hovered"
      className={cn('relative -my-[0.25em] block overflow-hidden py-[0.25em]', className)}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden className="block">
        {letters.map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (letters.length - 1) / 2) : STAGGER * i
          const transition = { ease: 'easeInOut', delay } as const

          return (
            <span className="relative inline-block whitespace-pre" key={i}>
              <motion.span
                variants={{ initial: { y: 0 }, hovered: { y: `-${TRAVEL}` } }}
                transition={transition}
                className="inline-block"
              >
                {l}
              </motion.span>
              <motion.span
                variants={{ initial: { y: TRAVEL }, hovered: { y: 0 } }}
                transition={transition}
                className="absolute inset-0"
              >
                {l}
              </motion.span>
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}

export { TextRoll }
