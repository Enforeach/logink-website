'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ADS_PLATFORMS } from './data'

type Platform = typeof ADS_PLATFORMS[number]

function TierBadge({ available, name }: { available: boolean; name: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={
        available
          ? { background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }
          : { background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }
      }
    >
      {available ? '✓' : '✗'} {name}
    </span>
  )
}

function PlatformIcon({ id, color }: { id: string; color: string }) {
  if (id === 'google') return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" fill={color} />
    </svg>
  )
  if (id === 'meta') return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={color}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
  if (id === 'tiktok') return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}

export function AdsPlatformOverview() {
  const [active, setActive] = useState(0)
  const platform = ADS_PLATFORMS[active]

  return (
    <section className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Where Your Ads Run</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Five platforms. One integrated strategy.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm leading-relaxed">
            We don't just run ads on one platform and hope. We build cross-platform campaigns where Google captures intent, Meta builds awareness, TikTok drives discovery, and Marketplace converts shoppers.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 mb-8 overflow-x-auto">
          {ADS_PLATFORMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="relative flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors z-10"
              style={{ color: active === i ? p.accentColor : 'var(--text-muted)' }}
            >
              {active === i && (
                <motion.div
                  layoutId="platform-tab-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: `rgba(${p.accentRgb},0.12)`, border: `1px solid rgba(${p.accentRgb},0.25)` }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <PlatformIcon id={p.id} color={active === i ? p.accentColor : '#6B7280'} />
              <span className="relative hidden sm:block">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 overflow-hidden"
            style={{ background: `radial-gradient(ellipse at 80% 0%, rgba(${platform.accentRgb},0.04) 0%, transparent 60%), var(--bg-surface)` }}
          >
            <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">

              {/* Left */}
              <div className="lg:col-span-3 space-y-5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <PlatformIcon id={platform.id} color={platform.accentColor} />
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{platform.name}</h3>
                    <span className="text-xs text-[var(--text-muted)]">{platform.subtitle}</span>
                  </div>
                  <p className="text-sm font-semibold mt-2" style={{ color: platform.accentColor }}>
                    "{platform.tagline}"
                  </p>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{platform.description}</p>

                <div className="space-y-2">
                  {platform.features.map((f, i) => (
                    <motion.div
                      key={f}
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill={platform.accentColor}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — tier availability */}
              <div className="lg:col-span-2 flex flex-col justify-between gap-6">
                <div className="rounded-xl border border-white/10 bg-white/3 p-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Available in</p>
                  <div className="flex flex-wrap gap-2">
                    <TierBadge available={platform.tiers.entry} name="Entry" />
                    <TierBadge available={platform.tiers.growth} name="Growth" />
                    <TierBadge available={platform.tiers.full} name="Full" />
                  </div>
                  {'tierNote' in platform && (
                    <p className="text-[11px] text-[var(--text-muted)] pt-1 border-t border-white/10">
                      {platform.tierNote}
                    </p>
                  )}
                </div>

                <a
                  href="#pricing"
                  className="text-center px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                  style={{ borderColor: `rgba(${platform.accentRgb},0.35)`, color: platform.accentColor }}
                >
                  View pricing →
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
