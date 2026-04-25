import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

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

      <DataTable
        data={submissions}
        columns={[
          {
            key: 'name',
            header: 'Name',
            render: (row) => (
              <div>
                <div className="font-medium text-[var(--text-primary)]">{row.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{row.email}</div>
              </div>
            ),
          },
          {
            key: 'company',
            header: 'Company',
            render: (row) => row.company || '—',
            className: 'hidden md:table-cell',
          },
          {
            key: 'services',
            header: 'Services',
            render: (row) => {
              const svcs = Array.isArray(row.services) ? row.services : []
              return svcs.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {svcs.slice(0, 2).map((s: string) => (
                    <Badge key={s} variant="violet" size="sm">{s.replace(/-/g, ' ')}</Badge>
                  ))}
                  {svcs.length > 2 && <Badge variant="default" size="sm">+{svcs.length - 2}</Badge>}
                </div>
              ) : '—'
            },
            className: 'hidden lg:table-cell',
          },
          {
            key: 'isRead',
            header: 'Status',
            render: (row) => <Badge variant={row.isRead ? 'default' : 'violet'}>{row.isRead ? 'Read' : 'New'}</Badge>,
          },
          {
            key: 'createdAt',
            header: 'Date',
            render: (row) => formatDate(row.createdAt),
            className: 'hidden md:table-cell',
          },
        ]}
        emptyMessage="No submissions yet."
      />
    </div>
  )
}
