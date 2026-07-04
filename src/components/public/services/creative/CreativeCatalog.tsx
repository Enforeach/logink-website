'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Palette, Clapperboard, PenLine, Check, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CREATIVE_MODULES, CREATIVE_MODULES_EN } from './data'

const MODULE_ICONS: Record<string, LucideIcon> = {
  'graphic-design': Palette,
  'video-production': Clapperboard,
  copywriting: PenLine,
}

const EASE = [0.22, 1, 0.36, 1] as const

function ModuleCard({ mod, index, inView, locale = 'id' }: { mod: typeof CREATIVE_MODULES[number]; index: number; inView: boolean; locale?: 'id' | 'en' }) {
  const [open, setOpen] = useState(false)
  const Icon = MODULE_ICONS[mod.id] ?? Palette

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)] hover:-translate-y-1"
    >
      {/* Header */}
      <div className="p-6 md:p-7">
        <div className="flex items-start gap-4 mb-3">
          {/* Icon squircle */}
          <div
            className="flex-shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center"
            style={{ background: `rgba(${mod.accentRgb},0.12)` }}
            aria-hidden
          >
            <Icon size={22} strokeWidth={1.75} style={{ color: mod.accentColor }} />
          </div>
          <div>
            <h3 className="font-display text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1">{mod.title}</h3>
            <p className="text-sm font-semibold" style={{ color: mod.accentColor }}>&ldquo;{mod.tagline}&rdquo;</p>
          </div>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{mod.description}</p>

        {/* Deliverable pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mod.deliverables.map(d => (
            <span
              key={d.name}
              className="text-[11px] px-2.5 py-1 rounded-full font-medium"
              style={{ color: mod.accentColor, background: `rgba(${mod.accentRgb},0.10)` }}
            >
              {d.name.split(' (')[0]}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
          style={{ color: mod.accentColor }}
        >
          {open ? (locale === 'en' ? 'Close' : 'Tutup') : (locale === 'en' ? 'See details' : 'Lihat detail')}
          <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-6 border-t border-[var(--border-default)] pt-5 space-y-4">
              {mod.deliverables.map((d, di) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: di * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check size={16} strokeWidth={2.5} className="flex-shrink-0 mt-0.5" style={{ color: mod.accentColor }} aria-hidden />
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

const CATALOG_COPY = {
  id: { eyebrow: 'Apa yang Kami Buat', heading: 'Tiga studio, satu tim kreatif.', sub: 'Setiap deliverable dibuat kustom untuk brandmu, tanpa template, tanpa stock, tanpa jalan pintas.' },
  en: { eyebrow: 'What We Make', heading: 'Three studios, one creative team.', sub: 'Every deliverable is custom-made for your brand: no templates, no stock, no shortcuts.' },
}

export function CreativeCatalog({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const modules = locale === 'en' ? CREATIVE_MODULES_EN : CREATIVE_MODULES
  const c = CATALOG_COPY[locale]

  return (
    <section ref={ref} className="py-20 md:py-28 px-6" style={{ background: 'var(--bg-tint-peach)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4">
            {c.heading}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            {c.sub}
          </p>
        </div>

        <div className="space-y-5">
          {(modules as typeof CREATIVE_MODULES).map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} inView={inView} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
