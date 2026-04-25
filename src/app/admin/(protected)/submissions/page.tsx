import { prisma } from '@/lib/prisma'
import { SubmissionsTable } from '@/components/admin/SubmissionsTable'

export default async function AdminSubmissionsPage() {
  let submissions: any[] = []
  try {
    submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Contact Submissions</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{submissions.length} total submissions</p>
      </div>
      <SubmissionsTable submissions={submissions} />
    </div>
  )
}
