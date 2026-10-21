import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InstrumentsKit } from '../../../(public)/dev-kit/instruments/InstrumentsKit'
import { loadCms } from '@/cms/load'

export const metadata: Metadata = { title: { absolute: 'Dev kit · instruments | Logink' }, robots: { index: false, follow: false } }

export default async function DevKitInstrumentsEn() {
  await loadCms()
  if (process.env.NODE_ENV === 'production') notFound()
  return <InstrumentsKit locale="en" />
}
