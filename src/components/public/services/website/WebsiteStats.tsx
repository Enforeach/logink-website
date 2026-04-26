'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { WEBSITE_STATS } from './data'

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

  return <span ref={ref}>{val}</span>
}

export function WebsiteStats() {
  return (
    <section
      className="py-16 px-4 border-y border-white/10"
      style={{ background: 'linear-gradient(180deg, #0A0716 0%, #0D091C 50%, #0A0716 100%)' }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {WEBSITE_STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 px-8 py-6">
            <div className="text-4xl font-extrabold gradient-text">
              {stat.animate ? (
                <>
                  <Counter target={100} />%
                </>
              ) : (
                stat.value
              )}
            </div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">{stat.label}</div>
            <div className="text-xs text-[var(--text-muted)] leading-relaxed">{stat.context}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
