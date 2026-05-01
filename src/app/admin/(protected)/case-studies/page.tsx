export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/Button'
import { CaseStudiesTable } from '@/components/admin/CaseStudiesTable'

export default async function CaseStudiesPage() {
  let caseStudies: any[] = []
  try {
    caseStudies = await prisma.caseStudy.findMany({ orderBy: { updatedAt: 'desc' } })
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Case Studies</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{caseStudies.length} total</p>
        </div>
        <Button href="/admin/case-studies/new" size="sm">+ New Case Study</Button>
      </div>
      <CaseStudiesTable caseStudies={caseStudies} />
    </div>
  )
}
