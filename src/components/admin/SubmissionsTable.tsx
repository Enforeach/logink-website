'use client'

import Link from 'next/link'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

interface Submission {
  id: string
  name: string
  email: string
  company?: string | null
  services?: string[] | null
  isRead: boolean
  createdAt: Date | string
}

export function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  return (
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
          render: (row) => row.company || '-',
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
            ) : '-'
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
          render: (row) => formatDate(new Date(row.createdAt)),
          className: 'hidden md:table-cell',
        },
        {
          key: 'actions',
          header: '',
          render: (row) => (
            <Link href={`/admin/submissions/${row.id}`} className="text-brand-violet hover:text-brand-pink text-sm font-medium transition-colors">
              View
            </Link>
          ),
        },
      ]}
      emptyMessage="No submissions yet."
    />
  )
}
