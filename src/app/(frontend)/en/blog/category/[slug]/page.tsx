import { CategoryPage, categoryMeta } from '@/components/sections/blog/CategoryPage'
import { CATEGORIES } from '@/lib/services'
import { loadCms } from '@/cms/load'

export const revalidate = 3600

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  await loadCms()
  return categoryMeta((await params).slug, 'en')
}

export default async function Page({ params }: Props) {
  await loadCms()
  return <CategoryPage slug={(await params).slug} locale="en" />
}
