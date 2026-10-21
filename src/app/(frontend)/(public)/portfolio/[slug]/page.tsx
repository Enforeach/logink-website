import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { slugRedirect } from '@/lib/slug-redirect'
import { getPortfolioList } from '@/payload/queries'
import { CasePage, caseMeta } from '@/components/sections/case/CasePage'
import { loadCms } from '@/cms/load'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  return (await getPortfolioList().catch(() => [])).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await loadCms()
  return caseMeta((await params).slug, 'id')
}

export default async function Page({ params }: Props) {
  await loadCms()
  const { slug } = await params
  const to = await slugRedirect('case', slug, 'id') // BUILD §1.10: an EN slug on the ID route → 308 to the ID slug
  if (to) permanentRedirect(to)
  return <CasePage slug={slug} locale="id" />
}
