import type { Locale } from '@/lib/services'
import { fmtDate } from './strings'
import { cn } from '@/lib/utils'

/**
 * Eyebrow (soft-modern pass, owner 2026-10-03): a short SERVICE/TOPIC label in a soft pill, never a
 * city, clock or time of day ("Jakarta, 05.30 WIB — Fajar" read like news). Label precedence:
 * `label` > `right` > `word`. A real ISO `date` (blog) renders as a quiet <time> after the label.
 * `hour` is kept only for the key-light colour (set by the parent Section); hour alone renders nothing.
 */
export function Dateline({ locale: l, date, word, right, label, className }: {
  locale: Locale; hour?: string; date?: string; word?: string; right?: string; label?: string; className?: string
}) {
  const text = label ?? right ?? word
  if (!text && !date) return null
  return (
    <p className={cn('dateline', className)}>
      <span>{text ?? <time dateTime={date}>{fmtDate(date!, l)}</time>}</span>
      {text && date ? <span><time dateTime={date}>{fmtDate(date, l)}</time></span> : null}
      {text && right && (label || word) && right !== text ? <span>{right}</span> : null}
    </p>
  )
}
