import { GROUPS, liveServices, page, type Locale, type SvcKey } from '@/lib/services'

/** "Minta Penawaran" always → {contact}?layanan={key}#formulir (BUILD §2.2 rule 8). */
export const quoteHref = (l: Locale, svc?: SvcKey | '360') => `${page('contact').path[l]}${svc ? `?layanan=${svc}` : ''}#formulir`
export const hub360 = (l: Locale) => `${page('hub').path[l]}#kampanye-360`
/** The 3 GROUPS columns in registry order (organik: SEO, Local SEO, Social, SEO AI · penjualan: Ads, Website · kreasi: Creative). */
export const groups = () =>
  (Object.keys(GROUPS) as (keyof typeof GROUPS)[]).map((g) => ({ key: g, name: GROUPS[g], items: liveServices().filter((s) => s.group === g) }))
