'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SEO_PRICING_TIERS, SEO_PRICING_TIERS_EN, SEO_ADDONS, SEO_ADDONS_EN } from './data'
import { SEOPricingTable } from './SEOPricingTable'

const PRICING_COPY = {
  id: {
    popular: 'Paling Populer',
    eyebrow: 'Pricing',
    heading: 'Pilih paket yang sesuai dengan tahap pertumbuhan bisnis Anda.',
    sub: 'Semua paket mencakup akses GA4 penuh dan laporan bulanan. Tanpa kontrak lock-in.',
    addonsTitle: 'Add-on Tersedia',
    addonBadge: 'Opsional',
    addonCta: 'Tambah ke paket →',
    addonHref: '/contact?service=seo-content-marketing&addon=true',
    tierCtaHref: (id: string) => `/contact?service=seo-content-marketing&tier=${id}`,
    tierCta: 'Mulai Konsultasi Gratis →',
  },
  en: {
    popular: 'Most Popular',
    eyebrow: 'Pricing',
    heading: 'Choose the plan that fits your growth stage.',
    sub: 'All plans include full GA4 access and monthly reports. No lock-in contracts.',
    addonsTitle: 'Optional Add-ons',
    addonBadge: 'Optional',
    addonCta: 'Add to scope →',
    addonHref: '/en/contact?service=seo-content-marketing&addon=true',
    tierCtaHref: (id: string) => `/en/contact?service=seo-content-marketing&tier=${id}`,
    tierCta: 'Start Free Consultation →',
  },
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill={color} aria-hidden>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function TierCard({ tier, index, copy }: { tier: typeof SEO_PRICING_TIERS[number]; index: number; copy: typeof PRICING_COPY['id'] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const isGrowth = tier.id === 'growth'
  const isFull = tier.id === 'full'

  const inner = (
    <div className={`bg-white flex flex-col flex-1 h-full p-7 ${isGrowth ? 'rounded-[15px]' : 'rounded-2xl'}`}>
      {/* Tier header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          {isFull && (
            <span
              className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-2"
              style={{ background: 'rgba(248,132,56,0.15)', color: '#C2410C' }}
            >
              Full Suite
            </span>
          )}
          <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
            {tier.name}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">{tier.bestFor}</p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl font-bold text-[var(--text-primary)] tracking-[-0.02em]">{tier.price}</span>
          <span className="text-sm text-[var(--text-muted)]">{tier.period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {tier.features.map((f, i) => {
          const isEverything = typeof f === 'string' && (f.startsWith('Everything') || f.startsWith('Semua'))
          return (
            <li key={i} className={`flex items-start gap-3 text-sm ${isEverything ? 'text-[var(--text-muted)] italic' : 'text-[var(--text-secondary)]'}`}>
              <CheckIcon color="#A855F7" />
              {f}
            </li>
          )
        })}
      </ul>

      {/* CTA */}
      <Link
        href={copy.tierCtaHref(tier.id)}
        className={`w-full text-center py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] ${
          isGrowth
            ? 'gradient-bg text-white shadow-cta hover:brightness-105'
            : 'border border-[var(--border-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-tint-lilac)]'
        }`}
      >
        {copy.tierCta}
      </Link>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 + (isGrowth ? 0.05 : 0), ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col ${
        isGrowth
          ? 'rounded-2xl p-[1px] gradient-brand-bg shadow-cta'
          : 'rounded-2xl border border-[var(--border-default)] bg-white hover:shadow-card hover:-translate-y-1 transition-all duration-300'
      }`}
    >
      {isGrowth && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-xs font-bold px-3.5 py-1 rounded-full text-white gradient-bg shadow-cta whitespace-nowrap">
          {copy.popular}
        </span>
      )}
      {inner}
    </motion.div>
  )
}

export function SEOPricing({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const copy = PRICING_COPY[locale]
  const tiers = locale === 'en' ? SEO_PRICING_TIERS_EN : SEO_PRICING_TIERS
  const addons = locale === 'en' ? SEO_ADDONS_EN : SEO_ADDONS
  return (
    <section id="pricing" className="py-20 md:py-28 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="eyebrow mb-3">{copy.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">{copy.heading}</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto">
            {copy.sub}
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 items-stretch">
          {(tiers as typeof SEO_PRICING_TIERS).map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} copy={copy} />
          ))}
        </div>

        {/* Comparison table */}
        <SEOPricingTable locale={locale} />

        {/* Add-ons */}
        <div className="mt-12">
          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-5">{copy.addonsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(addons as typeof SEO_ADDONS).map((addon, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-[var(--border-default)] bg-white hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm">{addon.name}</h4>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(168,85,247,0.10)', color: '#9333EA' }}
                    >
                      {copy.addonBadge}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{addon.description}</p>
                  <p className="text-xs font-semibold" style={{ color: '#9333EA' }}>{addon.price}</p>
                </div>
                <Link
                  href={copy.addonHref}
                  className="text-xs font-semibold flex-shrink-0 mt-1 transition-opacity hover:opacity-70"
                  style={{ color: '#9333EA' }}
                >
                  {copy.addonCta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
