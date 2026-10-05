import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InstrumentsKit } from '../../../(public)/dev-kit/instruments/InstrumentsKit'

export const metadata: Metadata = { title: { absolute: 'Dev kit · instruments | Logink' }, robots: { index: false, follow: false } }

export default function DevKitInstrumentsEn() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <InstrumentsKit locale="en" />
}
