import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Kit } from '../../(public)/dev-kit/Kit'

export const metadata: Metadata = { title: { absolute: 'Dev kit | Logink' }, robots: { index: false, follow: false } }

export default function DevKitEn() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <Kit locale="en" />
}
