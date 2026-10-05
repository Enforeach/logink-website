import { permanentRedirect } from 'next/navigation'
import { ArticlePage, postMeta } from '@/components/sections/blog/ArticlePage'
import { slugRedirect } from '@/lib/slug-redirect'
import { getSitemapEntries } from '@/payload/queries'

export const revalidate = 300

export async function generateStaticParams() {
  const { posts } = await getSitemapEntries()
  return posts.filter((p) => p.slugEn).map((p) => ({ slug: p.slugEn! }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return postMeta((await params).slug, 'en')
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  // BUILD §1.10 page-code 308: ID slug with an EN twin → /en/blog/{slugEn}; ID-only post → /blog/{slug}
  const to = await slugRedirect('post', slug, 'en')
  if (to) permanentRedirect(to)
  return <ArticlePage slug={slug} locale="en" />
}
