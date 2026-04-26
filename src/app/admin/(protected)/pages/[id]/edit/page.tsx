import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PageForm } from '@/components/admin/PageForm'

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let page: any = null
  try {
    page = await prisma.page.findUnique({ where: { id } })
  } catch {}
  if (!page) notFound()
  return <PageForm page={page} />
}
