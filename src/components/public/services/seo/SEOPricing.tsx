'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SEO_PRICING_TIERS, SEO_ADDONS } from './data'
import { SEOPricingTable } from './SEOPricingTable'

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill={color}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function TierCard({ tier, index }: { tier: typeof SEO_PRICING_TIERS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const isGrowth = tier.id === 'growth'
  const isFull = tier.id === 'full'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 + (isGrowth ? 0.05 : 0), ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl border overflow-hidden"
      style={{
        borderColor: isGrowth ? 'rgba(124,58,237,0.5)' : 'var(--border-default)',
        background: isGrowth
          ? 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, var(--bg-surface) 60%)'
          : 'var(--bg-surface)',
        boxShadow: isGrowth ? '0 0 40px rgba(124,58,237,0.12)' : 'none',
      }}
    >
      {isGrowth && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,#7C3AED,#DB2777,transparent)' }} />
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Tier header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isGrowth && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
                  style={{ background: 'linear-gradient(135deg,#7C3AED,#DB2777)' }}>
                  Paling Populer
                </span>
              )}
              {isFull && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-amber-900"
                  style={{ background: '#F59E0B' }}>
                  Full Suite
                </span>
              )}
            </div>
            <h3
              className="text-xl font-extrabold"
              style={{ color: isGrowth ? '#A78BFA' : isFull ? '#FCD34D' : 'var(--text-primary)' }}
            >
              {tier.name}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">{tier.bestFor}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">{tier.price}</span>
            <span className="text-sm text-[var(--text-muted)]">{tier.period}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((f, i) => {
            const isEverything = typeof f === 'string' && f.startsWith('Everything')
            return (
              <li key={i} className={`flex items-start gap-3 text-sm ${isEverything ? 'text-[var(--text-muted)] italic' : 'text-[var(--text-secondary)]'}`}>
                <CheckIcon color={isGrowth ? '#A78BFA' : isFull ? '#F59E0B' : '#10B981'} />
                {f}
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <Link
          href={`/contact?service=seo-content-marketing&tier=${tier.id}`}
          className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] ${
            isGrowth
              ? 'gradient-bg text-white hover:shadow-xl hover:shadow-violet-500/25'
              : 'border border-[var(--border-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
          }`}
        >
          Mulai Konsultasi Gratis →
        </Link>
      </div>
    </motion.div>
  )
}

export function SEOPricing() {
  return (
    <section
      id="pricing"
      className="py-20 px-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.06) 0%, #0F0A1E 50%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Pricing</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">Pilih paket yang sesuai dengan tahap pertumbuhanmu.</h2>
          <p className="text-[var(--text-secondary)] mt-3 max-w-lg mx-auto">
            Semua paket mencakup akses GA4 penuh dan laporan bulanan. Tanpa kontrak lock-in.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {SEO_PRICING_TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Comparison table */}
        <SEOPricingTable />

        {/* Add-ons */}
        <div className="mt-12">
          <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-5">Add-on Tersedia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SEO_ADDONS.map((addon, i) => (
              <div key={i} className="flex items-start justify-between gap-4 p-5 rounded-xl border border-dashed border-[var(--border-hover)] bg-[var(--bg-surface)] hover:border-violet-500/30 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm">{addon.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold text-[var(--text-muted)] border border-[var(--border-default)]">Opsional</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-2">{addon.description}</p>
                  <p className="text-xs font-semibold text-violet-400">{addon.price}</p>
                </div>
                <Link
                  href="/contact?service=seo-content-marketing&addon=true"
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex-shrink-0 mt-1 transition-colors"
                >
                  Tambah ke kuota →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
