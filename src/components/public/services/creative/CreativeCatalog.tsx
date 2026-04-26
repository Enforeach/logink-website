'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CREATIVE_MODULES } from './data'

function ModuleCard({ mod, index, inView }: { mod: typeof CREATIVE_MODULES[number]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] overflow-hidden"
      style={{ borderLeftColor: mod.accentColor, borderLeftWidth: 3 }}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{mod.title}</h3>
            <p className="text-sm font-semibold" style={{ color: mod.accentColor }}>"{mod.tagline}"</p>
          </div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{mod.description}</p>

        {/* Deliverable pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mod.deliverables.map(d => (
            <span
              key={d.name}
              className="text-[11px] px-2 py-0.5 rounded-full border"
              style={{ borderColor: `${mod.accentColor}40`, color: mod.accentColor, background: `${mod.accentColor}10` }}
            >
              {d.name.split(' (')[0]}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1 text-xs font-semibold transition-colors"
          style={{ color: mod.accentColor }}
        >
          {open ? 'Less ▲' : 'See details ▼'}
        </button>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/10 pt-5 space-y-4">
              {mod.deliverables.map((d, di) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: di * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <svg className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill={mod.accentColor}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{d.name}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{d.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function CreativeCatalog() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">What We Create</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Three studios, one creative team.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm leading-relaxed">
            Every deliverable is custom-built for your brand — no templates, no stock, no shortcuts.
          </p>
        </div>

        <div className="space-y-4">
          {CREATIVE_MODULES.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
