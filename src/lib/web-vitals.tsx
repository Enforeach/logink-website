'use client'
// Owner decision 14: field Web Vitals (INP p75 etc.) go to GTM through window.dataLayer.
import { useReportWebVitals } from 'next/web-vitals'

type DL = { dataLayer?: Record<string, unknown>[] }

// Stable reference: a new function per render would re-report every metric.
const report: Parameters<typeof useReportWebVitals>[0] = ({ name, value, id, rating }) => {
  const w = window as unknown as DL
  ;(w.dataLayer ||= []).push({ event: 'web_vitals', name, value, id, rating })
}

export function WebVitals() {
  useReportWebVitals(report)
  return null
}
