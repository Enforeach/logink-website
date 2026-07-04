import Link from 'next/link'
import { PricingTierData } from '@/types'
import { cn } from '@/lib/utils'

interface PricingTierProps {
  tier: PricingTierData
  serviceSlug?: string
  color?: string
}

/* ponytail: legacy DB hexes → 2026 Warm Canvas accents; drop once DB colors are migrated */
const COLOR_REMAP: Record<string, string> = {
  '#7C3AED': '#A855F7',
  '#DB2777': '#D81C5C',
  '#D97706': '#F88438',
  '#F59E0B': '#F5A623',
  '#A78BFA': '#C084FC',
}

export function PricingTierCard({ tier, serviceSlug, color = '#A855F7' }: PricingTierProps) {
  const accent = COLOR_REMAP[color] ?? color
  const features = Array.isArray(tier.features) ? tier.features : []

  const body = (
    <div
      className={cn(
        'flex h-full flex-col bg-white p-6',
        tier.isPopular
          ? 'rounded-[calc(1rem-2px)]'
          : 'rounded-2xl border border-[var(--border-default)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)] hover:shadow-card'
      )}
    >
      <div className="mb-6">
        <h3 className="mb-1 text-lg font-bold text-[var(--text-primary)]">{tier.tierName}</h3>
        <div className="font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
          {tier.priceLabel}
          <span className="font-outfit text-sm font-normal tracking-normal text-[var(--text-muted)]">/bulan</span>
        </div>
      </div>

      <ul className="mb-6 flex-1 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0"
              style={{ color: accent }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={`/contact${serviceSlug ? `?service=${serviceSlug}&tier=${tier.tierName.toLowerCase()}` : ''}`}
        className={cn(
          'block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson focus-visible:ring-offset-2',
          tier.isPopular
            ? 'gradient-bg text-white shadow-cta hover:scale-[1.02] hover:brightness-105'
            : 'border border-[var(--border-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
        )}
      >
        Get Started
      </Link>
    </div>
  )

  if (!tier.isPopular) return body

  return (
    <div className="relative rounded-2xl bg-gradient-cta p-[2px] shadow-cta">
      <div className="gradient-bg absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white shadow-cta">
        Most Popular
      </div>
      {body}
    </div>
  )
}
