'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, MessagesSquare, TrendingUp, Palette, MonitorSmartphone, ArrowRight, Sparkles, type LucideIcon } from 'lucide-react'

interface Service {
  id: string
  name: string
  slug: string
  color: string
  shortDescId?: string | null
  funnelPosition?: string | null
  pricingTiers?: { priceLabel: string }[]
}

const FALLBACK: Service[] = [
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#A855F7', shortDescId: 'Pertumbuhan organik jangka panjang & leads inbound', funnelPosition: 'Top Funnel', pricingTiers: [{ priceLabel: 'IDR 6M' }] },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management', color: '#D81C5C', shortDescId: 'Bangun brand awareness & komunitas yang aktif', funnelPosition: 'Top Funnel', pricingTiers: [] },
  { id: '3', name: 'Paid Advertising', slug: 'paid-ads', color: '#F88438', shortDescId: 'Iklan yang langsung hasilkan ROI nyata', funnelPosition: 'Mid Funnel', pricingTiers: [{ priceLabel: 'IDR 6M' }] },
  { id: '4', name: 'Creative Services', slug: 'creative-services', color: '#F5A623', shortDescId: 'Konten yang bikin scroll berhenti dan mengkonversi', funnelPosition: 'All Funnel', pricingTiers: [] },
  { id: '5', name: 'Website & Landing Page', slug: 'website-development', color: '#C084FC', shortDescId: 'Ubah pengunjung jadi pelanggan', funnelPosition: 'Bottom Funnel', pricingTiers: [{ priceLabel: 'IDR 10M' }] },
]

/* Warm Canvas accents keyed by slug (covers both id/en slug variants) */
const META: Record<string, { accent: string; icon: LucideIcon }> = {
  'seo-content-marketing': { accent: '#A855F7', icon: Search },
  'social-media-management': { accent: '#D81C5C', icon: MessagesSquare },
  'paid-advertising': { accent: '#F88438', icon: TrendingUp },
  'paid-ads': { accent: '#F88438', icon: TrendingUp },
  'creative-services': { accent: '#F5A623', icon: Palette },
  'website-landing-page': { accent: '#C084FC', icon: MonitorSmartphone },
  'website-development': { accent: '#C084FC', icon: MonitorSmartphone },
}

const SECTION_COPY = {
  id: { badge: 'Layanan Kami', headline: 'Apa yang Kami', headlineGradient: 'Kerjakan', desc: 'Lima layanan terintegrasi yang bekerja sebagai satu sistem, bukan vendor-vendor yang berjalan terpisah.', viewAll: 'Lihat semua layanan' },
  en: { badge: 'Our Services', headline: 'What We', headlineGradient: 'Do', desc: 'Five integrated services working as one system, not siloed vendors.', viewAll: 'View all services' },
}

/* Accent darkened for AA text contrast on white */
const ACCENT_TEXT = 'text-[color-mix(in_srgb,var(--acc)_55%,#231A26)]'

function SeoExtra({ locale, accent }: { locale: 'id' | 'en'; accent: string }) {
  const features = locale === 'id'
    ? ['Riset Kata Kunci', '30 Artikel/bln', 'Looker Studio']
    : ['Keyword Research', 'Up to 30 Articles/mo', 'Looker Studio']
  return (
    <>
      <ul className="flex flex-wrap gap-1.5 mb-4 list-none p-0 m-0">
        {features.map((f) => (
          <li key={f} className="text-xs px-2.5 py-1 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)]">{f}</li>
        ))}
      </ul>
      {/* Mini ascending bar chart */}
      <div className="hidden sm:flex w-36 h-24 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-3 flex-col justify-end gap-1 absolute bottom-6 right-6" aria-hidden="true">
        <div className="flex items-end gap-1 h-full">
          {[30, 45, 38, 55, 62, 70, 80, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: `linear-gradient(to top, ${accent}, ${accent}55)` }}
            />
          ))}
        </div>
        <p className="text-[10px] text-[var(--text-muted)] text-center m-0">Organic traffic ↑</p>
      </div>
    </>
  )
}

function SocialExtra({ locale }: { locale: 'id' | 'en' }) {
  const pillars = locale === 'id' ? ['Edukasi', 'Hiburan', 'Konversi'] : ['Educate', 'Entertain', 'Convert']
  return (
    <ul className="flex flex-wrap gap-2 mb-4 list-none p-0 m-0">
      {pillars.map((p) => (
        <li key={p} className={`text-xs px-3 py-1 rounded-full font-medium bg-[color-mix(in_srgb,var(--acc)_10%,white)] ${ACCENT_TEXT}`}>
          {p}
        </li>
      ))}
    </ul>
  )
}

function PaidExtra({ locale }: { locale: 'id' | 'en' }) {
  const roasLabel = locale === 'id' ? 'Rata-rata ROAS dalam 3 bulan' : 'Typical ROAS in 3 months'
  return (
    <div className="mb-4">
      <div className="font-display text-5xl font-extrabold gradient-text leading-none">2–4x</div>
      <div className="text-xs text-[var(--text-muted)] mt-1.5 uppercase tracking-wide">{roasLabel}</div>
    </div>
  )
}

function BentoCard({ svc, locale, index }: { svc: Service; locale: 'id' | 'en'; index: number }) {
  const meta = META[svc.slug] ?? { accent: svc.color, icon: Sparkles }
  const Icon = meta.icon
  const isSeo = svc.slug === 'seo-content-marketing'
  const isSocial = svc.slug === 'social-media-management'
  const isPaid = svc.slug === 'paid-advertising' || svc.slug === 'paid-ads'
  const href = `${locale === 'id' ? '/layanan' : '/en/services'}/${svc.slug}`
  const startingFrom = locale === 'id' ? 'Mulai dari' : 'Starting from'
  const perMonth = locale === 'id' ? '/bln' : '/mo'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      style={{ '--acc': meta.accent } as CSSProperties}
      className={`group relative rounded-2xl bg-white border border-[var(--border-default)] p-6 lg:p-7 transition-[border-color,box-shadow] duration-300 hover:border-[var(--border-hover)] hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)] ${isSeo ? 'sm:col-span-2' : ''}`}
    >
      {/* Accent tint on hover (~6%) */}
      <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[var(--acc)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Icon squircle — saturates on hover */}
          <span className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[color-mix(in_srgb,var(--acc)_12%,white)] text-[var(--acc)] group-hover:bg-[var(--acc)] group-hover:text-white transition-colors duration-300">
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          {svc.funnelPosition && (
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--acc)_10%,white)] ${ACCENT_TEXT}`}>
              {svc.funnelPosition}
            </span>
          )}
        </div>

        {isPaid && <PaidExtra locale={locale} />}

        <h3 className="font-display font-bold text-[var(--text-primary)] mb-1.5 text-lg">{svc.name}</h3>
        <p className={`text-sm text-[var(--text-secondary)] mb-4 ${isSeo ? 'sm:max-w-md' : 'flex-1'}`}>{svc.shortDescId}</p>

        {isSeo && <SeoExtra locale={locale} accent={meta.accent} />}
        {isSocial && <SocialExtra locale={locale} />}

        {svc.pricingTiers?.[0] && (
          <p className="text-xs text-[var(--text-muted)] mb-3">
            {startingFrom}{' '}
            <span className={`font-semibold ${ACCENT_TEXT}`}>
              {svc.pricingTiers[0].priceLabel}{isSeo ? perMonth : ''}
            </span>
          </p>
        )}

        <Link href={href} className={`inline-flex items-center gap-1.5 text-xs font-semibold mt-auto ${ACCENT_TEXT}`}>
          {locale === 'id' ? 'Selengkapnya' : 'Learn more'}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )
}

export function ServicesSection({ services = [], locale = 'id' }: { services?: Service[]; locale?: 'id' | 'en' }) {
  const display = services.length > 0 ? services : FALLBACK
  const sc = SECTION_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="eyebrow block mb-4">{sc.badge}</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--text-primary)] mb-4 leading-[1.12] tracking-[-0.03em]">
            {sc.headline} <span className="gradient-text">{sc.headlineGradient}</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            {sc.desc}
          </p>
        </motion.div>

        {/* Asymmetric bento: featured SEO card spans 2 cols */}
        <div className="grid sm:grid-cols-3 gap-5">
          {display.map((svc, i) => (
            <BentoCard key={svc.id} svc={svc} locale={locale} index={i} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link
            href={locale === 'id' ? '/layanan' : '/en/services'}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color-mix(in_srgb,#A855F7_55%,#231A26)] hover:text-brand-crimson transition-colors group"
          >
            {sc.viewAll}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
