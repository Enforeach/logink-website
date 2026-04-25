'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEO_FEATURES_TABS } from './data'

type Tab = typeof SEO_FEATURES_TABS[number]
type Feature = Tab['features'][number]

const TAB_BADGE_COLORS: Record<string, string> = {
  'Growth+': 'rgba(124,58,237,0.15)',
  'Full only': 'rgba(217,119,6,0.15)',
}
const TAB_BADGE_TEXT: Record<string, string> = {
  'Growth+': '#A78BFA',
  'Full only': '#FCD34D',
}

export function SEOFeatures() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = SEO_FEATURES_TABS[activeTab]

  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">What You Get</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">Everything included.</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl">
            No hidden extras. Every deliverable your brand needs to grow, under one roof.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-[var(--border-default)] mb-8 overflow-x-auto pb-0 scrollbar-none">
          {SEO_FEATURES_TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className="relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0"
              style={{ color: activeTab === i ? '#7C3AED' : 'var(--text-muted)' }}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {activeTab === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg,#7C3AED,#DB2777)' }}
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
            className="space-y-4"
          >
            {(tab.features as readonly Feature[]).map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-violet-500/20 transition-colors"
                style={{ borderLeft: '2px solid', borderLeftColor: '#7C3AED' }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-[var(--text-primary)]">{f.title}</h3>
                      {'badge' in f && f.badge && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                          style={{
                            background: TAB_BADGE_COLORS[f.badge] || 'rgba(124,58,237,0.15)',
                            color: TAB_BADGE_TEXT[f.badge] || '#A78BFA',
                          }}
                        >
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">{f.desc}</p>
                  </div>
                  {'tiers' in f && f.tiers && (
                    <div className="flex gap-3 flex-shrink-0">
                      {Object.entries(f.tiers).map(([tier, val]) => (
                        <div key={tier} className="text-center">
                          <div className="text-xs font-bold text-[var(--text-primary)]">{val as string}</div>
                          <div className="text-[10px] text-[var(--text-muted)] capitalize">{tier}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
