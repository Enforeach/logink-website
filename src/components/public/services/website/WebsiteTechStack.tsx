'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WEBSITE_TECH_STACK } from './data'

export function WebsiteTechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#0C0818' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Tech Stack Kami</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            Kami pilih tool terbaik untuk proyekmu.
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Tidak terpaku pada satu platform — kami rekomendasikan berdasarkan skala, budget, dan tujuan jangka panjangmu.
          </p>
        </div>

        <div className="space-y-10">
          {WEBSITE_TECH_STACK.map((group, gi) => {
            return (
              <div key={group.category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: group.accentColor }} />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    {group.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, ii) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: gi * 0.04 + ii * 0.05 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-center gap-2 rounded-lg border border-white/10 bg-[var(--bg-surface)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] cursor-default transition-all hover:border-white/20 hover:-translate-y-0.5"
                      style={{
                        boxShadow: 'none',
                      }}
                      whileHover={{
                        borderColor: `${group.accentColor}50`,
                        color: group.accentColor,
                        boxShadow: `0 0 12px ${group.accentColor}15`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{ background: group.accentColor }}
                      />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
