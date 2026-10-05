'use client'
import { useEffect, useState } from 'react'

const pad = (n: number) => String(n).padStart(2, '0')
const LABELS = { id: ['hari', 'jam', 'menit', 'detik'], en: ['days', 'hrs', 'min', 'sec'] }

/** Live countdown to a real CMS endDate. The server HTML shows the end date as text (children) until mount. */
export function CtaCountdown({ end, locale, children }: { end: string; locale: 'id' | 'en'; children: React.ReactNode }) {
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    const t = new Date(end).getTime()
    const tick = () => setLeft(Math.max(0, t - Date.now()))
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [end])
  if (left === null) return <>{children}</>
  const parts = [Math.floor(left / 864e5), Math.floor(left / 36e5) % 24, Math.floor(left / 6e4) % 60, Math.floor(left / 1e3) % 60]
  return (
    <p className="flex gap-4 tabular-nums" role="timer" aria-live="off">
      {parts.map((v, i) => (
        <span key={i} className="grid text-center">
          <span className="t-h3">{pad(v)}</span>
          <span className="t-dateline text-ink-2">{LABELS[locale][i]}</span>
        </span>
      ))}
    </p>
  )
}
