import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { SubmissionActions } from '@/components/admin/SubmissionActions'

export default async function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let submission: any = null
  try {
    submission = await prisma.contactSubmission.findUnique({ where: { id } })
  } catch {}
  if (!submission) notFound()

  const services: string[] = Array.isArray(submission.services) ? submission.services : []

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/submissions" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">← Submissions</Link>
        <Badge variant={submission.isRead ? 'default' : 'violet'}>{submission.isRead ? 'Read' : 'New'}</Badge>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{submission.name}</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">{formatDate(submission.createdAt)}</p>
      </div>

      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] divide-y divide-[var(--border-default)]">
        {[
          { label: 'Email', value: submission.email },
          { label: 'Company', value: submission.company || '—' },
          { label: 'Phone', value: submission.phone || '—' },
          { label: 'Budget', value: submission.budgetRange || '—' },
          { label: 'Timeline', value: submission.timeline || '—' },
          { label: 'Source', value: submission.source || '—' },
        ].map(row => (
          <div key={row.label} className="flex gap-4 px-5 py-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-24 shrink-0 mt-0.5">{row.label}</span>
            <span className="text-sm text-[var(--text-primary)]">{row.value}</span>
          </div>
        ))}

        {services.length > 0 && (
          <div className="flex gap-4 px-5 py-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-24 shrink-0 mt-0.5">Services</span>
            <div className="flex flex-wrap gap-1.5">
              {services.map(s => (
                <Badge key={s} variant="violet" size="sm">{s.replace(/-/g, ' ')}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="px-5 py-4">
          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Message</p>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{submission.message}</p>
        </div>
      </div>

      <SubmissionActions id={submission.id} isRead={submission.isRead} />
    </div>
  )
}
