'use client'
import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { Icon } from '@/components/ds/Icon'

type Gtag = (cmd: 'event', name: string, params: Record<string, unknown>) => void
const gtag = (): Gtag | undefined => (typeof window !== 'undefined' ? (window as unknown as { gtag?: Gtag }).gtag : undefined)
const seen = new Set<string>() // one impression per widget per page load (also absorbs StrictMode's double effect)
const onStorage = (cb: () => void) => { addEventListener('storage', cb); return () => removeEventListener('storage', cb) }
const dismissedNow = (key: string) => { try { return Date.now() < Number(localStorage.getItem(key) || 0) } catch { return false } }

/**
 * The only client part of a CMS CTA widget (the markup is server-rendered, visible without JS):
 * POST /api/cta-widgets/{id}/impression once, POST …/click on the primary link ([data-cta-primary]),
 * the legacy gtag events, and the localStorage dismissal (key and expiry unchanged from the old widgets).
 */
export function CtaTrack({ id, placement, template, gaLabel, gaCategory, dismissible, days, closeLabel, ground, className, children }: {
  id: string; placement: string; template: string; gaLabel: string | null; gaCategory: string | null
  dismissible: boolean; days: number; closeLabel: string; ground?: string; className?: string; children: ReactNode
}) {
  const key = `cta_${id}_dismissed`
  const stored = useSyncExternalStore(onStorage, () => dismissedNow(key), () => false) // server: visible
  const [closed, setClosed] = useState(false)
  const gone = closed || (dismissible && stored)

  useEffect(() => {
    if (gone || seen.has(id)) return
    seen.add(id)
    fetch(`/api/cta-widgets/${id}/impression`, { method: 'POST' }).catch(() => {})
    gtag()?.('event', 'cta_impression', { event_label: gaLabel || id, cta_id: id, cta_placement: placement, cta_template: template })
  }, [gone, id, gaLabel, placement, template])

  if (gone) return null

  const onClick = (e: React.MouseEvent) => {
    if (!(e.target as Element).closest('a[data-cta-primary]')) return
    fetch(`/api/cta-widgets/${id}/click`, { method: 'POST', keepalive: true }).catch(() => {})
    gtag()?.('event', gaCategory || 'cta_click', { event_label: gaLabel || id, event_category: 'CTA', cta_id: id, cta_placement: placement, cta_template: template })
  }
  const dismiss = () => {
    try { localStorage.setItem(key, String(Date.now() + days * 864e5)) } catch {}
    setClosed(true)
  }

  return (
    <aside className={`relative ${className ?? ''}`} data-ground={ground} data-cta-widget={id} data-cta-placement={placement} onClickCapture={onClick}>
      {children}
      {dismissible ? (
        <button type="button" onClick={dismiss} aria-label={closeLabel}
          className="absolute right-1 top-1 inline-flex h-tap w-tap items-center justify-center text-ink-2 hover:text-ink">
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </aside>
  )
}
