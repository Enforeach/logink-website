import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CaseStudyForm } from '@/components/admin/CaseStudyForm'

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let cs: any = null
  try {
    cs = await prisma.caseStudy.findUnique({ where: { id }, include: { metrics: { orderBy: { sortOrder: 'asc' } } } })
  } catch {}
  if (!cs) notFound()
  return <CaseStudyForm caseStudy={cs} />
}
