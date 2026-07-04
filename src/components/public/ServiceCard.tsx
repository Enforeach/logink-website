'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  MessagesSquare,
  TrendingUp,
  Palette,
  MonitorSmartphone,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ServiceData } from '@/types'

interface ServiceCardProps {
  service: ServiceData
  size?: 'sm' | 'lg'
}

/* 2026 "Warm Canvas" service accents — override legacy DB hexes by slug */
export const SERVICE_ACCENTS: Record<string, string> = {
  'seo-content-marketing': '#A855F7',
  'social-media-management': '#D81C5C',
  'paid-advertising': '#F88438',
  'creative-services': '#F5A623',
  'website-landing-page': '#C084FC',
}

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'seo-content-marketing': Search,
  'social-media-management': MessagesSquare,
  'paid-advertising': TrendingUp,
  'creative-services': Palette,
  'website-landing-page': MonitorSmartphone,
}

export function ServiceCard({ service, size = 'sm' }: ServiceCardProps) {
  const accent = SERVICE_ACCENTS[service.slug] ?? service.color
  const Icon = SERVICE_ICONS[service.slug] ?? Search
  const startingPrice = service.pricingTiers?.[0]?.priceLabel

  return (
    <Link
      href={`/layanan/${service.slug}`}
      className="group block rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-card hover:bg-[var(--card-tint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2"
      style={{ '--card-tint': `${accent}0F` } as React.CSSProperties}
    >
      {/* Accent hairline */}
      <span aria-hidden className="block h-0.5 w-full" style={{ background: accent }} />

      <div className={size === 'lg' ? 'p-8' : 'p-6'}>
        {/* Icon squircle */}
        <div
          className={`${size === 'lg' ? 'h-14 w-14 mb-6' : 'h-12 w-12 mb-4'} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          <Icon size={size === 'lg' ? 26 : 22} strokeWidth={1.75} aria-hidden />
        </div>

        {/* Name */}
        <h3 className={`font-display font-bold tracking-tight text-[var(--text-primary)] mb-2 ${size === 'lg' ? 'text-xl' : 'text-base'}`}>
          {service.name}
        </h3>

        {/* Short desc */}
        <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2">
          {service.shortDescId || service.descriptionId}
        </p>

        {/* Funnel badge */}
        <div className="flex items-center justify-between">
          {service.funnelPosition && (
            <Badge variant="default" size="sm">{service.funnelPosition}</Badge>
          )}
          {startingPrice && size === 'lg' && (
            <span className="text-xs text-[var(--text-muted)]">
              Starting from{' '}
              <span className="font-display font-semibold" style={{ color: accent }}>
                {startingPrice}
              </span>
            </span>
          )}
        </div>

        {/* Learn more */}
        <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: accent }}>
          Learn more
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

/* ── Full-width alternating row (services hub) ── */

interface ServiceRowProps {
  service: ServiceData
  deliverables: string[]
  flip: boolean
  href: string
  startingFromLabel: string
  learnMoreLabel: string
}

export function ServiceRow({ service, deliverables, flip, href, startingFromLabel, learnMoreLabel }: ServiceRowProps) {
  const accent = SERVICE_ACCENTS[service.slug] ?? service.color
  const Icon = SERVICE_ICONS[service.slug] ?? Search
  const startingPrice = service.pricingTiers?.[0]?.priceLabel

  return (
    <motion.article
      initial={{ opacity: 0, x: flip ? 48 : -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20"
    >
      {/* Icon panel */}
      <div className={flip ? 'md:order-2' : undefined}>
        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-[var(--border-default)]"
          style={{ backgroundColor: `${accent}14` }}
        >
          <div aria-hidden className="absolute inset-0 dot-grid opacity-60" />
          <div
            aria-hidden
            className="absolute -right-12 -top-12 h-48 w-48 rounded-full blur-2xl"
            style={{ background: `${accent}2E` }}
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full blur-2xl"
            style={{ background: `${accent}1F` }}
          />
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white shadow-card"
            style={{ color: accent }}
          >
            <Icon size={44} strokeWidth={1.5} aria-hidden />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={flip ? 'md:order-1' : undefined}>
        {service.funnelPosition && (
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
            style={{ backgroundColor: `${accent}1A`, color: accent }}
          >
            {service.funnelPosition}
          </span>
        )}

        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-3xl">
          {service.name}
        </h3>

        <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
          {service.shortDescId || service.descriptionId}
        </p>

        {deliverables.length > 0 && (
          <ul className="mt-6 space-y-3">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <span
                  className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${accent}1A`, color: accent }}
                >
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
          {startingPrice && (
            <div>
              <div className="text-xs text-[var(--text-muted)]">{startingFromLabel}</div>
              <div className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                {startingPrice}
              </div>
            </div>
          )}
          <Link
            href={href}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2 rounded-full"
            style={{ color: accent }}
            aria-label={`${learnMoreLabel}: ${service.name}`}
          >
            {learnMoreLabel}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
