'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CaseStudyData } from '@/types'

// ponytail: DB still stores the 2024 service hexes; remap to 2026 "Warm Canvas" accents at render.
const ACCENT_REMAP: Record<string, string> = {
  '#7C3AED': '#A855F7', // SEO
  '#DB2777': '#D81C5C', // Social
  '#D97706': '#F88438', // Ads
  '#F59E0B': '#F5A623', // Creative
  '#A78BFA': '#C084FC', // Web
}

export function serviceAccent(color?: string | null): string {
  if (!color) return '#D81C5C'
  return ACCENT_REMAP[color.toUpperCase()] || color
}

interface CaseStudyCardProps {
  caseStudy: CaseStudyData
  index?: number
}

export function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  const topMetric = caseStudy.metrics?.[0]
  const accent = serviceAccent(caseStudy.service?.color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
    >
      <Link
        href={`/portfolio/${caseStudy.slug}`}
        className="group block h-full rounded-2xl border border-[var(--border-default)] bg-white overflow-hidden hover:border-[var(--border-hover)] hover:shadow-card hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-crimson"
      >
        {/* Thumbnail */}
        <div className="aspect-[16/10] bg-[var(--bg-tint-peach)] relative overflow-hidden">
          {(caseStudy.featuredImage || caseStudy.thumbnail) ? (
            <Image
              src={(caseStudy.featuredImage || caseStudy.thumbnail)!}
              alt={caseStudy.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 gradient-brand-bg opacity-10" />
          )}
          {/* Client logo */}
          {caseStudy.clientLogo && (
            <div className="absolute top-4 left-4 h-10 w-20 bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm">
              <Image src={caseStudy.clientLogo} alt={caseStudy.clientName} fill className="object-contain p-2" />
            </div>
          )}
          {/* Service tag pill in accent tint */}
          {caseStudy.service && (
            <span
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
              style={{
                // darken accent slightly for AA contrast on the light tint
                color: `color-mix(in srgb, ${accent} 65%, #231A26)`,
                backgroundColor: `color-mix(in srgb, ${accent} 12%, white)`,
              }}
            >
              {caseStudy.service.name}
            </span>
          )}
        </div>

        <div className="p-5">
          {/* CRO: lead with the result */}
          {topMetric && (
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-display text-3xl font-bold tracking-tight gradient-text tabular-nums">
                {/* afterValue may already carry its own sign (e.g. "+463%") */}
                {/^[+-]/.test(topMetric.afterValue) ? topMetric.afterValue : `+${topMetric.afterValue}`}
              </span>
              <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                {topMetric.metricLabel}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--bg-tint-peach)] text-[var(--text-secondary)]">
              {caseStudy.industry}
            </span>
          </div>
          <h3 className="font-display font-bold text-lg text-[var(--text-primary)] tracking-tight mb-1 group-hover:text-brand-crimson transition-colors line-clamp-2">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)]">{caseStudy.clientName}</p>
        </div>
      </Link>
    </motion.div>
  )
}
