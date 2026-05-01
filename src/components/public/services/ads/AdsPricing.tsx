'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ADS_PRICING_TIERS, ADS_PRICING_TIERS_EN, ADS_ADDONS, ADS_ADDONS_EN } from './data'
import { AdsPricingTable } from './AdsPricingTable'

const PRICING_COPY = {
  id: {
    heading: 'Pilih paketmu.',
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
    adSpendDesc: 'Harga di atas adalah biaya manajemen, yaitu yang kamu bayar ke Logink untuk strategi, setup, optimasi, dan pelaporan kampanye. Budget iklan (yang dibayarkan ke Google, Meta, TikTok, dll.) terpisah dan langsung ke platform. Kamu yang kontrol budgetnya. Rekomendasi kami:',
    adSpendFooter: 'Kamu selalu punya akses penuh ke akun iklanmu dan bisa melihat persis ke mana setiap rupiahmu pergi.',
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

export function AdsPricing({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const tiers = locale === 'en' ? ADS_PRICING_TIERS_EN : ADS_PRICING_TIERS
  const addons = locale === 'en' ? ADS_ADDONS_EN : ADS_ADDONS
  const copy = PRICING_COPY[locale]

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(217,119,6,0.05) 0%, transparent 60%), #0F0A1E' }}
    >
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            {copy.heading}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-sm">
            {copy.sub}
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {(tiers as typeof ADS_PRICING_TIERS).map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl flex flex-col overflow-hidden"
              style={
                tier.isPopular
                  ? { background: 'var(--bg-surface)', border: '1px solid rgba(217,119,6,0.5)', boxShadow: '0 0 40px rgba(217,119,6,0.12)' }
                  : { background: 'var(--bg-surface)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {tier.isPopular && (
                <div className="text-center py-2 text-xs font-bold uppercase tracking-widest text-amber-900"
                  style={{ background: 'linear-gradient(90deg,#D97706,#F59E0B)' }}>
                  {copy.popular}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1 gap-5">
                {/* Header */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">{tier.name}</div>
                  <div className="text-3xl font-extrabold text-[var(--text-primary)]">{tier.price}</div>
                  <div className="text-xs text-[var(--text-muted)]">{tier.period} {copy.managementFee}</div>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: 'rgba(217,119,6,0.12)', color: '#D97706', border: '1px solid rgba(217,119,6,0.25)' }}>
                    {tier.platformCoverage}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">{copy.bestFor} {tier.bestFor}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <svg className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="#10B981">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {tier.addOnNote && (
                    <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <svg className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {tier.addOnNote}
                    </li>
                  )}
                </ul>

                {/* Ad spend note */}
                <div className="text-[11px] text-[var(--text-muted)] border-t border-white/10 pt-3">
                  {copy.adSpendLabel} <span className="text-amber-400 font-semibold">{tier.recommendedAdSpend}</span>
                </div>

                {/* CTA */}
                <Link
                  href={copy.ctaHref(tier.name)}
                  className={`block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    tier.isPopular
                      ? 'gradient-bg text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20'
                      : 'border border-white/15 text-[var(--text-secondary)] hover:border-white/30 hover:text-[var(--text-primary)]'
                  }`}
                >
                  {copy.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mb-10">
          {copy.managementNote}
        </p>

        {/* Comparison table */}
        <AdsPricingTable locale={locale} />

        {/* Add-ons */}
        <div className="mt-14">
          <h3 className="text-lg font-bold text-[var(--text-primary)] text-center mb-6">{copy.addonsTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(addons as typeof ADS_ADDONS).map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-white/10 bg-[var(--bg-surface)] p-5"
                style={{ borderLeftColor: addon.accentColor, borderLeftWidth: 3 }}
              >
                <div className="font-semibold text-[var(--text-primary)] mb-1" style={{ color: addon.accentColor }}>
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
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 rounded-xl border border-amber-500/20 bg-[var(--bg-surface)] p-6"
          style={{ borderLeftColor: '#D97706', borderLeftWidth: 4 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h4 className="font-bold text-[var(--text-primary)] mb-2">{copy.adSpendTitle}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                {copy.adSpendDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                {(tiers as typeof ADS_PRICING_TIERS).map((t) => (
                  <div key={t.name} className="rounded-lg bg-white/5 px-3 py-2">
                    <div className="font-semibold text-amber-400">{t.name}</div>
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
