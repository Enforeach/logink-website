import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Kit } from '../../(public)/dev-kit/Kit'
import { loadCms } from '@/cms/load'

export const metadata: Metadata = { title: { absolute: 'Dev kit | Logink' }, robots: { index: false, follow: false } }

export default async function DevKitEn() {
  await loadCms()
  if (process.env.NODE_ENV === 'production') notFound()
  return <Kit locale="en" />
}
