'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WEBSITE_ADDONS } from './data'
import { WebsiteScopeTable } from './WebsiteScopeTable'

const WA_MESSAGE = encodeURIComponent(
  "Halo Logink, saya tertarik dengan proyek website. Bisa jadwalkan Discovery call?"
)
const WA_LINK = `https://wa.me/6281234567890?text=${WA_MESSAGE}`

export function WebsitePricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 px-4 relative"
      style={{ background: '#0F0A1E' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top center, rgba(6,182,212,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Scope & Harga</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Scope transparan. Harga kustom.
          </h2>
        </div>

        {/* Pricing tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-px mb-10"
          style={{ background: 'linear-gradient(135deg, #06B6D4, #7C3AED)' }}
        >
          <div className="rounded-2xl bg-[var(--bg-surface)] px-8 py-7 text-center">
            <p className="text-sm text-[var(--text-muted)] mb-2">Semua proyek web</p>
            <p className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3">starting from Rp 10 Juta</p>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              Harga final berdasarkan jumlah halaman, kompleksitas, integrasi, dan fungsionalitas kustom. Kami berikan scope dan penawaran detail setelah Discovery call gratis — tanpa komitmen.
            </p>
          </div>
        </motion.div>

        {/* Scope comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h3 className="text-sm font-bold text-[var(--text-secondary)] mb-5">
            Apa yang termasuk di setiap tipe proyek:
          </h3>
          <WebsiteScopeTable />
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-5">Add-on Tersedia</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WEBSITE_ADDONS.map((addon) => (
              <div
                key={addon.name}
                className="rounded-2xl border border-white/10 bg-[var(--bg-surface)] p-6"
                style={{ borderLeftColor: addon.accentColor, borderLeftWidth: 3 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-bold text-[var(--text-primary)]">{addon.name}</h4>
                  <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${addon.accentColor}20`, color: addon.accentColor }}>
                    {addon.badge}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{addon.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=website-landing-page"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white gradient-bg shadow-lg transition-transform hover:scale-105"
            >
              Dapatkan Penawaran Kustom →
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] transition-colors hover:border-[#25D366]/50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat di WhatsApp
            </a>
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Discovery call gratis. Proposal detail dalam 48 jam.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
