import { permanentRedirect } from 'next/navigation'
import { ArticlePage, postMeta } from '@/components/sections/blog/ArticlePage'
import { slugRedirect } from '@/lib/slug-redirect'
import { getSitemapEntries } from '@/payload/queries'
import { loadCms } from '@/cms/load'

export const revalidate = 300

export async function generateStaticParams() {
  const { posts } = await getSitemapEntries()
  return posts.map((p) => ({ slug: p.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  await loadCms()
  return postMeta((await params).slug, 'id')
}

export default async function Page({ params }: Props) {
  await loadCms()
  const { slug } = await params
  const to = await slugRedirect('post', slug, 'id') // an EN slug on the ID route → 308 to the ID slug (BUILD §1.10)
  if (to) permanentRedirect(to)
  return <ArticlePage slug={slug} locale="id" />
}
