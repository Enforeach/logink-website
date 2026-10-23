'use client'

import { motion } from 'framer-motion'
import { ADS_PLATFORMS, ADS_PLATFORMS_EN } from './data'

type Platform = typeof ADS_PLATFORMS[number]

function TierBadge({ available, name }: { available: boolean; name: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
      style={
        available
          ? { background: 'rgba(16,185,129,0.10)', color: '#059669', border: '1px solid rgba(16,185,129,0.30)' }
          : { background: 'rgba(35,26,38,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-default)' }
      }
    >
      {available ? '✓' : '✗'} {name}
    </span>
  )
}

function PlatformIcon({ id, color }: { id: string; color: string }) {
  if (id === 'google') return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" fill={color} />
    </svg>
  )
  if (id === 'meta') return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={color} aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
  if (id === 'tiktok') return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={color} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={color} strokeWidth="2" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}

const PLATFORM_COPY = {
  id: {
    eyebrow: 'Di Mana Iklan Anda Tayang',
    heading: 'Lima platform. Satu strategi terpadu.',
    sub: 'Kami tidak sekadar menjalankan iklan di satu platform lalu berharap. Kami membangun kampanye lintas platform: Google menangkap intent, Meta membangun awareness, TikTok mendorong discovery, dan Marketplace mengonversi pembeli.',
    availableIn: 'Tersedia di',
    seePricing: 'Lihat harga →',
  },
  en: {
    eyebrow: 'Where Your Ads Run',
    heading: 'Five platforms. One unified strategy.',
    sub: "We don't just run ads on one platform and hope for the best. We build cross-platform campaigns where Google captures intent, Meta builds awareness, TikTok drives discovery, and Marketplaces convert buyers.",
    availableIn: 'Available in',
    seePricing: 'See pricing →',
  },
}

function PlatformCard({ platform, index, availableIn, seePricing }: {
  platform: Platform
  index: number
  availableIn: string
  seePricing: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl border border-[var(--border-default)] bg-white p-7 overflow-hidden hover:shadow-card hover:-translate-y-1 hover:border-[var(--border-hover)] transition-all duration-300"
    >
      {/* Accent top bar */}
      <span className="absolute top-0 left-0 right-0 h-1" style={{ background: platform.accentColor }} aria-hidden />

      <div className="flex items-center gap-3 mb-1 mt-1">
        <span
          className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${platform.accentRgb},0.10)` }}
          aria-hidden
        >
          <PlatformIcon id={platform.id} color={platform.accentColor} />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)] leading-tight">{platform.name}</h3>
          <span className="text-xs text-[var(--text-muted)]">{platform.subtitle}</span>
        </div>
      </div>

      <p className="text-sm font-medium text-[var(--text-primary)] mt-3 pl-3 border-l-2" style={{ borderColor: platform.accentColor }}>
        &ldquo;{platform.tagline}&rdquo;
      </p>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4">{platform.description}</p>

      <ul className="space-y-2 mt-4 flex-1">
        {platform.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill={platform.accentColor} aria-hidden>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-[var(--border-default)]">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{availableIn}</span>
            <TierBadge available={platform.tiers.entry} name="Entry" />
            <TierBadge available={platform.tiers.growth} name="Growth" />
            <TierBadge available={platform.tiers.full} name="Full" />
          </div>
          <a
            href="#pricing"
            className="text-sm font-semibold text-[var(--text-primary)] group-hover:translate-x-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88438] rounded"
          >
            {seePricing}
          </a>
        </div>
        {'tierNote' in platform && (
          <p className="text-[11px] text-[var(--text-muted)] mt-2">
            {platform.tierNote}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export function AdsPlatformOverview({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const platforms = locale === 'en' ? ADS_PLATFORMS_EN : ADS_PLATFORMS
  const c = PLATFORM_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="eyebrow mb-3">{c.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-4">
            {c.heading}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm leading-relaxed">
            {c.sub}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(platforms as typeof ADS_PLATFORMS).map((platform, i) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              index={i}
              availableIn={c.availableIn}
              seePricing={c.seePricing}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
