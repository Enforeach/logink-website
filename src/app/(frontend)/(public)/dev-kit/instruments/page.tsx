import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InstrumentsKit } from './InstrumentsKit'

export const metadata: Metadata = { title: { absolute: 'Dev kit · instrumen | Logink' }, robots: { index: false, follow: false } }

export default function DevKitInstruments() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <InstrumentsKit locale="id" />
}
