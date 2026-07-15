'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type LucideProps, MapPin, LayoutTemplate, Navigation, Star } from 'lucide-react'
import type { FC } from 'react'
import { LOCALSEO_FEATURES_TABS, LOCALSEO_FEATURES_TABS_EN } from './data'

type Feature = { title: string; desc: string; badge: string | null }

const ICON_MAP: Record<string, FC<LucideProps>> = { MapPin, LayoutTemplate, Navigation, Star }

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon {...props} />
}

const COPY = {
  id: {
    eyebrow: 'Apa yang Anda Dapatkan',
    heading: 'Semua yang dibutuhkan untuk menang lokal.',
    sub: 'Profil Google Business, landing page, keyword "near me", hingga review — satu tim menangani seluruh kehadiran lokal Anda.',
  },
  en: {
    eyebrow: 'What You Get',
    heading: 'Everything you need to win locally.',
    sub: 'Google Business Profile, landing page, "near me" keywords, and reviews — one team handling your entire local presence.',
  },
}

export function LocalSeoFeatures({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const [activeTab, setActiveTab] = useState(0)
  const TABS = locale === 'en' ? LOCALSEO_FEATURES_TABS_EN : LOCALSEO_FEATURES_TABS
  const tab = TABS[activeTab]
  const c = COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">{c.heading}</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl">{c.sub}</p>
        </motion.div>

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-[var(--border-default)] mb-8 overflow-x-auto pb-0 scrollbar-none" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => setActiveTab(i)}
              className="relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] rounded-t-lg"
              style={{ color: activeTab === i ? '#0F766E' : 'var(--text-muted)' }}
            >
              <LucideIcon name={t.icon} size={14} strokeWidth={1.5} />
              <span>{t.label}</span>
              {activeTab === i && (
                <motion.div
                  layoutId="localseo-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: '#0D9488' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {(tab.features as readonly Feature[]).map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl border border-[var(--border-default)] bg-white hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(13,148,136,0.10)' }}
                  >
                    <LucideIcon name={tab.icon} size={20} strokeWidth={1.5} color="#0F766E" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display font-semibold text-[var(--text-primary)]">{f.title}</h3>
                      {f.badge && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                          style={{ background: 'rgba(13,148,136,0.12)', color: '#0F766E' }}
                        >
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
