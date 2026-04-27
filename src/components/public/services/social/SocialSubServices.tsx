'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { SOCIAL_MODULES, SOCIAL_MODULES_EN } from './data'

const PLATFORM_COLORS: Record<string, string> = {
  Instagram: '#E4405F',
  TikTok: '#FE2C55',
  Facebook: '#1877F2',
  LinkedIn: '#0A66C2',
}

type Module = typeof SOCIAL_MODULES[number]

function ModuleCard({ mod, index, locale = 'id' }: { mod: Module; index: number; locale?: 'id' | 'en' }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-hover)] transition-colors"
      style={{ borderLeft: `3px solid ${mod.accentColor}` }}
    >
      <div className="p-6">
        {/* Platform pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(mod.platforms as readonly string[]).map((p) => (
            <span
              key={p}
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: `${PLATFORM_COLORS[p] || mod.accentColor}20`,
                color: PLATFORM_COLORS[p] || mod.accentColor,
                border: `1px solid ${PLATFORM_COLORS[p] || mod.accentColor}40`,
              }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Title + icon */}
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{mod.title}</h3>
        <p className="text-sm italic text-[var(--text-muted)] mb-3">{mod.tagline}</p>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{mod.description}</p>

        {/* Feature name pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(mod.features as readonly { name: string; description: string }[]).map((f) => (
            <span
              key={f.name}
              className="px-2.5 py-1 rounded-full text-xs font-medium border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
            >
              {f.name}
            </span>
          ))}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold transition-colors"
          style={{ color: mod.accentColor }}
        >
          <span>{expanded ? (locale === 'en' ? 'Close ▲' : 'Tutup ▲') : (locale === 'en' ? 'See details ▼' : 'Lihat detail ▼')}</span>
        </button>
      </div>

      {/* Expanded feature details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6 space-y-3 border-t border-[var(--border-default)] pt-5">
              {(mod.features as readonly { name: string; description: string }[]).map((f) => (
                <div key={f.name} className="flex gap-3">
                  <div
                    className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: mod.accentColor }}
                  >
                    <Check size={11} strokeWidth={3} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">{f.name}</div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const SUB_COPY = {
  id: { eyebrow: 'Apa yang Kamu Dapat', heading: 'Tiga mesin, satu strategi.', sub: 'Pilih satu, dua, atau ketiganya — setiap modul dirancang untuk berdiri sendiri atau digabungkan.' },
  en: { eyebrow: 'What You Get', heading: 'Three engines, one strategy.', sub: 'Choose one, two, or all three — every module is designed to work standalone or combined.' },
}

export function SocialSubServices({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const modules = locale === 'en' ? SOCIAL_MODULES_EN : SOCIAL_MODULES
  const c = SUB_COPY[locale]
  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">{c.eyebrow}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            {c.heading}
          </h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl">
            {c.sub}
          </p>
        </div>

        <div className="space-y-4">
          {(modules as typeof SOCIAL_MODULES).map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
