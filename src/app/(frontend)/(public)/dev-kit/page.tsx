import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Kit } from './Kit'
import { loadCms } from '@/cms/load'

export const metadata: Metadata = { title: { absolute: 'Dev kit | Logink' }, robots: { index: false, follow: false } }

export default async function DevKit() {
  await loadCms()
  if (process.env.NODE_ENV === 'production') notFound()
  return <Kit locale="id" />
}
