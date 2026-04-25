'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

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
  { id: '1', name: 'SEO & Content Marketing', slug: 'seo-content-marketing', color: '#7C3AED', shortDescId: 'Long-term organic growth & inbound leads', funnelPosition: 'Top Funnel', pricingTiers: [{ priceLabel: 'IDR 6M' }] },
  { id: '2', name: 'Social Media Management', slug: 'social-media-management', color: '#DB2777', shortDescId: 'Brand awareness & community building', funnelPosition: 'Top Funnel', pricingTiers: [] },
  { id: '3', name: 'Paid Advertising', slug: 'paid-advertising', color: '#D97706', shortDescId: 'Fast scaling & immediate ROI', funnelPosition: 'Mid Funnel', pricingTiers: [{ priceLabel: 'IDR 6M' }] },
  { id: '4', name: 'Creative Services', slug: 'creative-services', color: '#F59E0B', shortDescId: 'Scroll-stopping content that converts', funnelPosition: 'All Funnel', pricingTiers: [] },
  { id: '5', name: 'Website & Landing Page', slug: 'website-landing-page', color: '#A78BFA', shortDescId: 'Converting visitors into customers', funnelPosition: 'Bottom Funnel', pricingTiers: [{ priceLabel: 'IDR 10M' }] },
]

/* ─── Individual card variants ─── */

function SEOCard({ svc }: { svc: Service }) {
  return (
    <div className="flex flex-col sm:flex-row h-full gap-6">
      <div className="flex-1">
        <div className="h-12 w-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${svc.color}18`, color: svc.color }}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="font-bold text-[var(--text-primary)] mb-1 text-lg">{svc.name}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-3">{svc.shortDescId}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {['Keyword Research', 'Up to 30 Articles/mo', 'Looker Studio'].map((f) => (
            <span key={f} className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border-default)] text-[var(--text-muted)]">{f}</span>
          ))}
        </div>
        {svc.pricingTiers?.[0] && (
          <p className="text-xs text-[var(--text-muted)] mb-3">Starting from <span className="font-semibold" style={{ color: svc.color }}>{svc.pricingTiers[0].priceLabel}/mo</span></p>
        )}
        <LearnMore href={`/services/${svc.slug}`} color={svc.color} />
      </div>
      {/* Mini ascending line chart */}
      <div className="flex-shrink-0 flex items-center">
        <div className="w-32 h-24 rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-3 flex flex-col justify-end gap-1">
          <div className="flex items-end gap-1 h-full">
            {[30, 45, 38, 55, 62, 70, 80, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm opacity-80"
                style={{ height: `${h}%`, background: `linear-gradient(to top, ${svc.color}, ${svc.color}60)` }}
              />
            ))}
          </div>
          <p className="text-[8px] text-[var(--text-muted)] text-center">Organic traffic ↑</p>
        </div>
      </div>
    </div>
  )
}

function SocialCard({ svc }: { svc: Service }) {
  return (
    <div className="h-full flex flex-col" style={{ background: `radial-gradient(circle at top center, ${svc.color}0d 0%, transparent 60%)` }}>
      <div className="h-12 w-12 rounded-xl mb-4 flex items-center justify-center" style={{ background: `${svc.color}18`, color: svc.color }}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>
      <h3 className="font-bold text-[var(--text-primary)] mb-1">{svc.name}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">{svc.shortDescId}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {['Educate', 'Entertain', 'Convert'].map((p) => (
          <span key={p} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${svc.color}18`, color: svc.color }}>
            {p}
          </span>
        ))}
      </div>
      <LearnMore href={`/services/${svc.slug}`} color={svc.color} />
    </div>
  )
}

function PaidAdsCard({ svc }: { svc: Service }) {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <div className="text-5xl font-extrabold gradient-text leading-none">2–4x</div>
        <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wide">Typical ROAS in 3 months</div>
      </div>
      <div className="h-px bg-[var(--border-default)] mb-4" />
      <div className="h-12 w-12 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${svc.color}18`, color: svc.color }}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <h3 className="font-bold text-[var(--text-primary)] mb-1">{svc.name}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">{svc.shortDescId}</p>
      <LearnMore href={`/services/${svc.slug}`} color={svc.color} />
    </div>
  )
}

function CreativeCard({ svc }: { svc: Service }) {
  const colors = ['#7C3AED', '#DB2777', '#D97706']
  return (
    <div className="h-full flex flex-col">
      {/* Stacked thumbnail mockups */}
      <div className="relative h-20 mb-4 ml-2">
        {colors.map((c, i) => (
          <div
            key={i}
            className="absolute h-14 w-24 rounded-lg border border-[var(--border-default)]"
            style={{
              background: `linear-gradient(135deg, ${c}25, ${c}08)`,
              left: `${i * 10}px`,
              top: `${i * 4}px`,
              zIndex: colors.length - i,
            }}
          />
        ))}
      </div>
      <div className="h-12 w-12 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${svc.color}18`, color: svc.color }}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>
      <h3 className="font-bold text-[var(--text-primary)] mb-1">{svc.name}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">{svc.shortDescId}</p>
      <LearnMore href={`/services/${svc.slug}`} color={svc.color} />
    </div>
  )
}

function WebsiteCard({ svc }: { svc: Service }) {
  return (
    <div className="h-full flex flex-col">
      {/* Browser chrome mockup */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] overflow-hidden mb-4">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--border-default)]">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
          <span className="h-2 w-2 rounded-full bg-green-400/60" />
          <div className="flex-1 mx-2 h-3 rounded bg-[var(--bg-elevated)]" />
        </div>
        <div className="h-16 gradient-bg opacity-30" />
      </div>
      <div className="h-12 w-12 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${svc.color}18`, color: svc.color }}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
        </svg>
      </div>
      <h3 className="font-bold text-[var(--text-primary)] mb-1">{svc.name}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-2 flex-1">{svc.shortDescId}</p>
      {svc.pricingTiers?.[0] && (
        <p className="text-xs text-[var(--text-muted)] mb-3">Starting from <span className="font-semibold" style={{ color: svc.color }}>{svc.pricingTiers[0].priceLabel}</span></p>
      )}
      <LearnMore href={`/services/${svc.slug}`} color={svc.color} />
    </div>
  )
}

function LearnMore({ href, color }: { href: string; color: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-xs font-semibold mt-auto transition-colors group"
      style={{ color }}
    >
      Learn more
      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

function BentoCard({
  svc,
  colSpan,
  animVariant,
  index,
}: {
  svc: Service
  colSpan: string
  animVariant: 'slideLeft' | 'scaleUp'
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const initial = animVariant === 'slideLeft' ? { opacity: 0, x: -40 } : { opacity: 0, scale: 0.9 }
  const animate = isInView ? { opacity: 1, x: 0, scale: 1 } : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`${colSpan} rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-1 group`}
      style={{
        borderTopColor: svc.color,
        borderTopWidth: '3px',
        boxShadow: '0 0 0 0 transparent',
      }}
      whileHover={{ boxShadow: `0 8px 30px ${svc.color}20` }}
    >
      {svc.slug === 'seo-content-marketing' && <SEOCard svc={svc} />}
      {svc.slug === 'social-media-management' && <SocialCard svc={svc} />}
      {svc.slug === 'paid-advertising' && <PaidAdsCard svc={svc} />}
      {svc.slug === 'creative-services' && <CreativeCard svc={svc} />}
      {svc.slug === 'website-landing-page' && <WebsiteCard svc={svc} />}
    </motion.div>
  )
}

export function ServicesSection({ services = [] }: { services?: Service[] }) {
  const display = services.length > 0 ? services : FALLBACK

  const seo = display.find((s) => s.slug === 'seo-content-marketing')
  const social = display.find((s) => s.slug === 'social-media-management')
  const paid = display.find((s) => s.slug === 'paid-advertising')
  const creative = display.find((s) => s.slug === 'creative-services')
  const website = display.find((s) => s.slug === 'website-landing-page')

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 })

  return (
    <section className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
            Five integrated services working as one system — not siloed vendors.
          </p>
        </motion.div>

        {/* Bento grid — desktop */}
        <div className="hidden sm:grid grid-cols-3 gap-5">
          {seo && <BentoCard svc={seo} colSpan="col-span-2" animVariant="slideLeft" index={0} />}
          {social && <BentoCard svc={social} colSpan="col-span-1" animVariant="scaleUp" index={1} />}
          {paid && <BentoCard svc={paid} colSpan="col-span-1" animVariant="scaleUp" index={2} />}
          {creative && <BentoCard svc={creative} colSpan="col-span-1" animVariant="scaleUp" index={3} />}
          {website && <BentoCard svc={website} colSpan="col-span-1" animVariant="scaleUp" index={4} />}
        </div>

        {/* Mobile: single column */}
        <div className="flex flex-col gap-4 sm:hidden">
          {display.map((svc, i) => (
            <BentoCard key={svc.id} svc={svc} colSpan="" animVariant="scaleUp" index={i} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-violet hover:text-brand-pink transition-colors group"
          >
            View all services
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
