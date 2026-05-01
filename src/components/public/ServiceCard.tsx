import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { ServiceData } from '@/types'

interface ServiceCardProps {
  service: ServiceData
  size?: 'sm' | 'lg'
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'seo-content-marketing': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  'social-media-management': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  ),
  'paid-advertising': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  'creative-services': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  'website-landing-page': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
    </svg>
  ),
}

export function ServiceCard({ service, size = 'sm' }: ServiceCardProps) {
  const icon = SERVICE_ICONS[service.slug] || SERVICE_ICONS['seo-content-marketing']
  const startingPrice = service.pricingTiers?.[0]?.priceLabel

  return (
    <Link
      href={`/layanan/${service.slug}`}
      className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-xl"
      style={{ borderTopColor: service.color, borderTopWidth: '3px' }}
    >
      <div className={size === 'lg' ? 'p-8' : 'p-6'}>
        {/* Icon */}
        <div
          className={`${size === 'lg' ? 'h-14 w-14 mb-6' : 'h-12 w-12 mb-4'} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
          style={{ backgroundColor: `${service.color}15`, color: service.color }}
        >
          {icon}
        </div>

        {/* Name */}
        <h3 className={`font-bold text-[var(--text-primary)] mb-2 ${size === 'lg' ? 'text-xl' : 'text-base'}`}>
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
              <span className="font-semibold" style={{ color: service.color }}>
                {startingPrice}
              </span>
            </span>
          )}
        </div>

        {/* Learn more */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-brand-violet" style={{ color: service.color }}>
          Learn more
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
