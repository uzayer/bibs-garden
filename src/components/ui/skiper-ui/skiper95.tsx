'use client'

import { motion, type MotionValue, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import { cn } from '@/lib/utils'

const TICKS = `repeating-linear-gradient(to bottom, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 5px)`

/**
 * The indicator on its own. Tracks whole-page scroll unless given a `progress` value;
 * sticky by default as in the demo.
 */
const ScrollProgress = ({
  className,
  progress,
}: {
  className?: string
  progress?: MotionValue<number>
}) => {
  const { scrollYProgress: pageProgress } = useScroll()
  const scrollYProgress = progress ?? pageProgress

  const value = useTransform(scrollYProgress, [0, 1], [100, 0])
  const clipPath = useMotionTemplate`inset(0 0 ${value}% 0)`

  const progressValue = useTransform(scrollYProgress, [0, 1], [1, 100])
  const rounded = useTransform(progressValue, (v) => Math.round(v))

  const y = useTransform(scrollYProgress, [0, 1], [0, 190])

  return (
    <div
      className={cn(
        'z-4 sticky left-0 top-1/2 flex h-48 w-4 -translate-y-1/2 translate-x-10 flex-col items-center justify-center',
        className,
      )}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0" style={{ backgroundImage: TICKS, opacity: 0.15 }} />
        <motion.div className="absolute inset-0" style={{ clipPath, backgroundImage: TICKS }} />
      </div>
      <motion.div
        style={{ y }}
        className="bg-foreground text-foreground absolute left-0 top-0 flex h-px w-8 items-center justify-center text-sm font-medium tracking-tight"
      >
        <motion.span className="absolute -right-1 translate-x-full tabular-nums">
          {rounded}
        </motion.span>
      </motion.div>
    </div>
  )
}

/**
 * Place inside a `relative` container: the indicator sticks to the viewport only while
 * that container is on screen, and reads 100 when its bottom reaches the viewport's.
 */
const ContainedScrollProgress = ({ className }: { className?: string }) => {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })

  return (
    <div ref={track} className="pointer-events-none absolute inset-y-0 left-0">
      <ScrollProgress progress={scrollYProgress} className={className} />
    </div>
  )
}

const Skiper95 = () => {
  return (
    <div className="relative flex h-full w-full">
      <ScrollProgress />

      <Content />
    </div>
  )
}

export { ContainedScrollProgress, ScrollProgress, Skiper95 }

/**
 * ==============   Utils   ================
 */

function Content() {
  return (
    <article className="mx-auto max-w-xl space-y-[10vh] py-[50vh]">
      <div className="-mt-36 mb-36 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Scroll down to see the effect
        </span>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi alias similique eveniet
          corrupti cupiditate, saepe magni, distinctio at dolor dignissimos consequatur rerum quasi
          expedita soluta amet, fugiat quaerat commodi accusamus enim necessitatibus facere cumque
          dolores quisquam? Vero harum repellendus labore.
        </div>
      ))}
    </article>
  )
}
