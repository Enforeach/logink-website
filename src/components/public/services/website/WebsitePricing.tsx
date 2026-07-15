'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { WEBSITE_ADDONS, WEBSITE_ADDONS_EN } from './data'
import { WebsiteScopeTable } from './WebsiteScopeTable'

const PRICING_COPY = {
  id: {
    eyebrow: 'Scope & Harga',
    heading: 'Scope transparan. Harga kustom.',
    pricingNote: 'Semua proyek web',
    pricingDesc: 'Harga final ditentukan oleh jumlah halaman, kompleksitas, integrasi, dan fungsionalitas kustom. Kami memberikan scope dan penawaran detail setelah Discovery call gratis, tanpa komitmen.',
    scopeLabel: 'Yang termasuk di setiap tipe proyek:',
    addonsTitle: 'Add-on yang Tersedia',
    ctaLabel: 'Dapatkan Penawaran Kustom →',
    ctaHref: '/contact?service=website-landing-page',
    waMessage: 'Halo Logink, saya tertarik dengan proyek website. Bisa jadwalkan Discovery call?',
    waBtn: 'Chat di WhatsApp',
    ctaNote: 'Discovery call gratis. Proposal detail dalam 48 jam.',
  },
  en: {
    eyebrow: 'Scope & Pricing',
    heading: 'Transparent scope. Custom pricing.',
    pricingNote: 'All web projects',
    pricingDesc: 'Final pricing based on number of pages, complexity, integrations, and custom functionality. We provide a detailed scope and quote after a free Discovery call, no commitment required.',
    scopeLabel: "What's included in each project type:",
    addonsTitle: 'Available Add-ons',
    ctaLabel: 'Get a Custom Quote →',
    ctaHref: '/en/contact?service=website-landing-page',
    waMessage: "Hi Logink, I'm interested in a website project. Can we schedule a Discovery call?",
    waBtn: 'Chat on WhatsApp',
    ctaNote: 'Free Discovery call. Detailed proposal within 48 hours.',
  },
}

export function WebsitePricing({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const copy = PRICING_COPY[locale]
  const addons = locale === 'en' ? WEBSITE_ADDONS_EN : WEBSITE_ADDONS
  const WA_LINK = `https://wa.me/628139453933?text=${encodeURIComponent(copy.waMessage)}`

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="eyebrow mb-3">{copy.eyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">
            {copy.heading}
          </h2>
        </motion.div>

        {/* Pricing panel: gradient border + CTA shadow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-px mb-12 gradient-brand-bg shadow-cta"
        >
          <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-8 text-center">
            <p className="text-sm text-[var(--text-secondary)] mb-2">{copy.pricingNote}</p>
            <p className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.03em] gradient-text mb-3">starting from Rp 10 Juta</p>
            <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              {copy.pricingDesc}
            </p>
          </div>
        </motion.div>

        {/* Scope comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-5">
            {copy.scopeLabel}
          </h3>
          <WebsiteScopeTable locale={locale} />
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-5">{copy.addonsTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(addons as typeof WEBSITE_ADDONS).map((addon) => (
              <div
                key={addon.name}
                className="relative rounded-2xl border border-[var(--border-default)] bg-white p-6 overflow-hidden hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-0 left-0 right-0 h-1" style={{ background: addon.accentColor }} aria-hidden />
                <div className="flex items-start justify-between gap-3 mb-2 mt-1">
                  <h4 className="font-display font-bold text-[var(--text-primary)]">{addon.name}</h4>
                  <span className="shrink-0 text-[10px] px-2.5 py-0.5 rounded-full font-semibold text-[var(--text-primary)]"
                    style={{ background: `${addon.accentColor}1A` }}>
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={copy.ctaHref}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white gradient-bg shadow-cta hover:scale-[1.02] hover:brightness-105 transition-all duration-200"
            >
              {copy.ctaLabel}
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.waBtn}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white hover:scale-[1.02] transition-all duration-200"
              style={{ background: '#25D366' }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {copy.waBtn}
            </a>
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)]">
            {copy.ctaNote}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
