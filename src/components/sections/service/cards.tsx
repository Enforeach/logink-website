// The lead instrument per service (BUILD §2.5d "Service hero card"), now the first visual of Showcase
// (section 2); work-step `card`s follow it there.
import type { SvcKey } from '@/lib/services'
import type { InstrumentKey } from '@/content/services/types'

export const HERO_CARD: Record<SvcKey, { k: InstrumentKey; mode?: 'serp' | 'maps' }> = {
  seo: { k: 'SerpToMaps', mode: 'serp' },
  localseo: { k: 'SerpToMaps', mode: 'maps' },
  ads: { k: 'Funnel' },
  social: { k: 'IgGrid' },
  creative: { k: 'ContentCalendar' },
  website: { k: 'SiteFrame' },
  ai: { k: 'AiAnswer' },
}
