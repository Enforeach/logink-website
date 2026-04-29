import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CaseStudyEditor } from '@/components/admin/CaseStudyEditor'

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let cs: any = null
  try {
    cs = await prisma.caseStudy.findUnique({
      where: { id },
      include: {
        metrics: { orderBy: { sortOrder: 'asc' } },
        blocks: { orderBy: { sortOrder: 'asc' } },
      },
    })
  } catch {}
  if (!cs) notFound()
  return <CaseStudyEditor caseStudy={cs} />
}
