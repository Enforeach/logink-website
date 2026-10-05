import type { SvcKey } from '@/lib/services'

/** data-placement values (BUILD §2.2 rule 8, + 'campaign' from §11). */
export type Placement =
  | 'header' | 'pill' | 'bar' | 'hero' | 'table' | 'tier' | 'builder' | 'faq' | 'closing'
  | 'footer' | 'menu' | 'profiler' | 'case' | 'post' | 'channel' | 'campaign' | 'doc' // doc: About/legal aside card

/** data-service values: a registry key, the 360° mode, or none. */
export type CtaService = SvcKey | '360' | 'none'

/** A case-study card. `metric` only for APPROVED_CASE_SLUGS (never invented). */
export type CaseCard = {
  slug: string
  slugEn: string | null
  title: { id: string; en: string | null }
  industry: string
  duration: string | null
  metric: { text: string; period: string; source: string } | null
}
