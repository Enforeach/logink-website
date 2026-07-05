'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ADS_PRICING_TIERS, ADS_PRICING_TIERS_EN, ADS_ADDONS, ADS_ADDONS_EN } from './data'
import { AdsPricingTable } from './AdsPricingTable'

const ACCENT = '#F88438'
const ACCENT_TEXT = '#C2410C' // AA-safe orange for small text on light bg

const PRICING_COPY = {
  id: {
    heading: 'Pilih paket Anda.',
    sub: 'Harga transparan, tanpa kejutan. Semua paket mencakup akses akun penuh dan optimasi mingguan.',
    popular: '★ Paling Populer',
    managementFee: '(biaya manajemen)',
    bestFor: 'Cocok untuk:',
    adSpendLabel: 'Rekomendasi budget iklan:',
    cta: 'Mulai Sekarang',
    ctaHref: (name: string) => `/contact?service=paid-advertising&tier=${name.toLowerCase()}`,
    managementNote: 'Biaya manajemen saja. Budget iklan dibayarkan langsung ke Google, Meta, TikTok, dan platform marketplace.',
    addonsTitle: 'Add-on Tersedia',
    adSpendTitle: 'Tentang Budget Iklan',
    adSpendDesc: 'Harga di atas adalah biaya manajemen, yaitu yang Anda bayar ke Logink untuk strategi, setup, optimasi, dan pelaporan kampanye. Budget iklan (yang dibayarkan ke Google, Meta, TikTok, dll.) terpisah dan langsung ke platform. Anda yang mengendalikan budget-nya. Rekomendasi kami:',
    adSpendFooter: 'Anda selalu memiliki akses penuh ke akun iklan Anda dan bisa melihat persis ke mana setiap rupiah Anda mengalir.',
    adSpendSuffix: 'budget iklan',
  },
  en: {
    heading: 'Choose your plan.',
    sub: 'Transparent pricing, no surprises. All plans include full account access and weekly optimization.',
    popular: '★ Most Popular',
    managementFee: '(management fee)',
    bestFor: 'Best for:',
    adSpendLabel: 'Recommended ad spend:',
    cta: 'Get Started',
    ctaHref: (name: string) => `/en/contact?service=paid-advertising&tier=${name.toLowerCase()}`,
    managementNote: 'Management fee only. Ad spend is paid directly to Google, Meta, TikTok, and marketplace platforms.',
    addonsTitle: 'Available Add-ons',
    adSpendTitle: 'About Ad Spend',
    adSpendDesc: "The prices above are management fees: what you pay Logink for campaign strategy, setup, optimization, and reporting. Ad spend (paid to Google, Meta, TikTok, etc.) is separate and goes directly to the platform. You control the budget. Our recommendations:",
    adSpendFooter: "You always have full access to your ad accounts and can see exactly where every rupiah goes.",
    adSpendSuffix: 'ad spend',
  },
}

function CheckIcon({ color = ACCENT }: { color?: string }) {
  return (
    <svg className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill={color} aria-hidden>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function TierCard({ tier, index, copy }: {
  tier: typeof ADS_PRICING_TIERS[number]
  index: number
  copy: typeof PRICING_COPY['id']
}) {
  const inner = (
    <div className={`bg-white flex flex-col flex-1 h-full p-7 ${tier.isPopular ? 'rounded-[15px]' : 'rounded-2xl'}`}>
      {/* Header */}
      <div className="mb-5">
        <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">{tier.name}</div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl font-bold text-[var(--text-primary)] tracking-[-0.02em]">{tier.price}</span>
          <span className="text-sm text-[var(--text-muted)]">{tier.period}</span>
        </div>
        <div className="text-xs text-[var(--text-muted)]">{copy.managementFee}</div>
        <div
          className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ background: 'rgba(248,132,56,0.10)', color: ACCENT_TEXT, border: '1px solid rgba(248,132,56,0.25)' }}
        >
          {tier.platformCoverage}
        </div>
        <p className="text-[11px] text-[var(--text-muted)] mt-1.5">{copy.bestFor} {tier.bestFor}</p>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
            <CheckIcon />
            {f}
          </li>
        ))}
        {tier.addOnNote && (
          <li className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
            <svg className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {tier.addOnNote}
          </li>
        )}
      </ul>

      {/* Ad spend note */}
      <div className="text-[11px] text-[var(--text-muted)] border-t border-[var(--border-default)] pt-3 mt-5">
        {copy.adSpendLabel} <span className="font-semibold" style={{ color: ACCENT_TEXT }}>{tier.recommendedAdSpend}</span>
      </div>

      {/* CTA */}
      <Link
        href={copy.ctaHref(tier.name)}
        className={`mt-5 block text-center px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
          tier.isPopular
            ? 'gradient-bg text-white shadow-cta hover:brightness-105'
            : 'border border-[var(--border-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-tint-peach)]'
        }`}
      >
        {copy.cta}
      </Link>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col ${
        tier.isPopular
          ? 'rounded-2xl p-[1px] gradient-brand-bg shadow-cta'
          : 'rounded-2xl border border-[var(--border-default)] bg-white hover:shadow-card hover:-translate-y-1 transition-all duration-300'
      }`}
    >
      {tier.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-xs font-bold px-3.5 py-1 rounded-full text-white gradient-bg shadow-cta whitespace-nowrap">
          {copy.popular}
        </span>
      )}
      {inner}
    </motion.div>
  )
}

export function AdsPricing({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const tiers = locale === 'en' ? ADS_PRICING_TIERS_EN : ADS_PRICING_TIERS
  const addons = locale === 'en' ? ADS_ADDONS_EN : ADS_ADDONS
  const copy = PRICING_COPY[locale]

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="eyebrow mb-3">Pricing</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em] mb-4">
            {copy.heading}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm">
            {copy.sub}
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
          {(tiers as typeof ADS_PRICING_TIERS).map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} copy={copy} />
          ))}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mb-10">
          {copy.managementNote}
        </p>

        {/* Comparison table */}
        <AdsPricingTable locale={locale} />

        {/* Add-ons */}
        <div className="mt-14">
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)] text-center mb-6">{copy.addonsTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(addons as typeof ADS_ADDONS).map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-[var(--border-default)] bg-white p-5 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
                style={{ borderLeftColor: addon.accentColor, borderLeftWidth: 3 }}
              >
                <div className="font-display font-bold text-[var(--text-primary)] mb-1">
                  {addon.name}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">{addon.description}</p>
                <p className="text-[11px] text-[var(--text-muted)]">{addon.availability}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ad spend guidance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-tint-peach)] p-6"
          style={{ borderLeftColor: ACCENT, borderLeftWidth: 4 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl" aria-hidden>💡</span>
            <div>
              <h4 className="font-display font-bold text-[var(--text-primary)] mb-2">{copy.adSpendTitle}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                {copy.adSpendDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                {(tiers as typeof ADS_PRICING_TIERS).map((t) => (
                  <div key={t.name} className="rounded-lg bg-white border border-[var(--border-default)] px-3 py-2">
                    <div className="font-semibold" style={{ color: ACCENT_TEXT }}>{t.name}</div>
                    <div className="text-[var(--text-muted)] text-xs">{t.recommendedAdSpend} {copy.adSpendSuffix}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-3">
                {copy.adSpendFooter}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
