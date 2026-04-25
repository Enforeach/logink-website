import Link from 'next/link'
import { PricingTierData } from '@/types'
import { cn } from '@/lib/utils'

interface PricingTierProps {
  tier: PricingTierData
  serviceSlug?: string
  color?: string
}

export function PricingTierCard({ tier, serviceSlug, color = '#7C3AED' }: PricingTierProps) {
  const features = Array.isArray(tier.features) ? tier.features : []

  return (
    <div
      className={cn(
        'relative rounded-2xl border p-6 flex flex-col',
        tier.isPopular
          ? 'border-brand-violet bg-[var(--bg-surface)] shadow-xl shadow-brand-violet/10'
          : 'border-[var(--border-default)] bg-[var(--bg-surface)]'
      )}
      style={tier.isPopular ? { borderColor: color } : {}}
    >
      {tier.isPopular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg"
          style={{ backgroundColor: color }}
        >
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{tier.tierName}</h3>
        <div className="text-3xl font-extrabold" style={{ color }}>
          {tier.priceLabel}
          <span className="text-sm font-normal text-[var(--text-muted)]">/bulan</span>
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
            <svg
              className="h-4 w-4 flex-shrink-0 mt-0.5"
              style={{ color }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
          'block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200',
          tier.isPopular
            ? 'text-white hover:scale-[1.02] hover:shadow-lg'
            : 'border border-[var(--border-hover)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
        )}
        style={tier.isPopular ? { background: `linear-gradient(135deg, ${color}, #DB2777)` } : {}}
      >
        Get Started
      </Link>
    </div>
  )
}
