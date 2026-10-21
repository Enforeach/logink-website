// Dev only (BUILD §5.8): the home page with every media lookup null, to check the §4.4 no-asset fallbacks
// (text-only hero, no chapter stills, poster-free section 05). notFound() in production, never indexed.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HomePage } from '@/components/sections/home/HomePage'
import { loadCms } from '@/cms/load'

export const metadata: Metadata = { title: { absolute: 'Home fallback | Logink' }, robots: { index: false, follow: false } }

export default async function HomeFallback() {
  await loadCms()
  if (process.env.NODE_ENV === 'production') notFound()
  return <HomePage locale="id" noMedia />
}
