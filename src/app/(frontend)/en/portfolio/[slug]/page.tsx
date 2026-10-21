import { permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { slugRedirect } from '@/lib/slug-redirect'
import { getSitemapEntries } from '@/payload/queries'
import { CasePage, caseMeta } from '@/components/sections/case/CasePage'
import { loadCms } from '@/cms/load'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600

// slugEn ?? slug, plus the ID slugs so their 308s are prebuilt too
export async function generateStaticParams() {
  const { caseStudies } = await getSitemapEntries().catch(() => ({ caseStudies: [] as { slug: string; slugEn: string | null }[] }))
  return caseStudies.flatMap((c) => [...(c.slugEn ? [{ slug: c.slugEn }] : []), { slug: c.slug }])
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await loadCms()
  return caseMeta((await params).slug, 'en')
}

export default async function Page({ params }: Props) {
  await loadCms()
  const { slug } = await params
  const to = await slugRedirect('case', slug, 'en') // BUILD §1.10: an ID slug whose case has a slugEn → 308
  if (to) permanentRedirect(to)
  return <CasePage slug={slug} locale="en" />
}
