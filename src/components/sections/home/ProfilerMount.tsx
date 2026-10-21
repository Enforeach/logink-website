'use client'
// ≤0.5 KB loader: imports the profiler island once the card is within 600px of the viewport and swaps it in for
// the SSR shell (children). Until then, and without JS, every chip is a working wa.me link.
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import type { Locale } from '@/lib/services'
import type { ProfilerData } from './profiler-data' // type only

type Labels = { first: string; chip360: string; orOne: string; bot: string }

export function ProfilerMount({ locale, labels, data, children }: { locale: Locale; labels: Labels; data: ProfilerData; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [Island, setIsland] = useState<ComponentType<Labels & { locale: Locale; data: ProfilerData }> | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return
      io.disconnect()
      import('./LeadProfilerIsland').then((m) => setIsland(() => m.LeadProfilerIsland))
    }, { rootMargin: '600px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref}>{Island ? <Island locale={locale} {...labels} data={data} /> : children}</div>
}
