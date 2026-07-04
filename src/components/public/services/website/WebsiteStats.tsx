'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { WEBSITE_STATS, WEBSITE_STATS_EN } from './data'

function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1200, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <span ref={ref} className="tabular-nums">{val}</span>
}

export function WebsiteStats({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const stats = locale === 'en' ? WEBSITE_STATS_EN : WEBSITE_STATS
  return (
    <section className="py-16 md:py-20 px-4" style={{ background: 'var(--bg-ink)' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(253,248,243,0.1)]">
        {(stats as typeof WEBSITE_STATS).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center gap-2 px-8 py-6"
          >
            <div className="font-display text-5xl md:text-6xl font-bold leading-none gradient-text">
              {stat.animate ? (
                <>
                  <Counter target={100} />%
                </>
              ) : (
                stat.value
              )}
            </div>
            <div className="text-sm font-semibold text-[var(--text-on-ink)]">{stat.label}</div>
            <div className="h-px w-10 gradient-bg" aria-hidden />
            <div className="text-xs leading-relaxed" style={{ color: 'rgba(253,248,243,0.6)' }}>{stat.context}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
