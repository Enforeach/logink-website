import { svc, type Locale, type SvcKey } from '@/lib/services'
import { T } from './strings'

/** Exact registry price text; `lead` prefixes "Mulai"; a null price shows the registry quote line. */
export const priceText = (k: SvcKey, l: Locale, lead?: boolean) => {
  const s = svc(k)
  if (!s.price) return s.quote?.[l] ?? ''
  return lead && !s.price[l].startsWith(T.from[l]) ? `${T.from[l]} ${s.price[l]}` : s.price[l] // website's price already reads 'Mulai …'
}

export function Price({ svc: k, locale: l, lead, className }: { svc: SvcKey; locale: Locale; lead?: boolean; className?: string }) {
  return <span className={className ?? 'font-650 tabular-nums'}>{priceText(k, l, lead)}</span>
}
