'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { formatDate } from '@/lib/utils'

const STATUS_COLORS: Record<string, 'green' | 'violet' | 'amber' | 'default' | 'red'> = {
  PUBLISHED: 'green', DRAFT: 'default', REVIEW: 'violet', ARCHIVED: 'red',
}

interface CaseStudy {
  id: string
  title: string
  clientName: string
  industry: string | null
  status: string
  updatedAt: Date | string
}

export function CaseStudiesTable({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
            {['Title', 'Client', 'Industry', 'Status', 'Updated', ''].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-default)]">
          {caseStudies.length === 0 ? (
            <tr><td colSpan={6} className="px-4 py-8 text-center text-[var(--text-muted)]">No case studies yet.</td></tr>
          ) : caseStudies.map(cs => (
            <tr key={cs.id} className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors">
              <td className="px-4 py-3">
                <Link href={`/admin/case-studies/${cs.id}/edit`} className="font-medium text-[var(--text-primary)] hover:text-brand-violet transition-colors line-clamp-1">{cs.title}</Link>
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">{cs.clientName}</td>
              <td className="px-4 py-3 text-[var(--text-secondary)] hidden md:table-cell">{cs.industry ?? '-'}</td>
              <td className="px-4 py-3"><Badge variant={STATUS_COLORS[cs.status] || 'default'}>{cs.status}</Badge></td>
              <td className="px-4 py-3 text-[var(--text-muted)] hidden lg:table-cell">{formatDate(new Date(cs.updatedAt))}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-4">
                  <Link href={`/admin/case-studies/${cs.id}/edit`} className="text-brand-violet hover:text-brand-pink text-sm font-medium">Edit</Link>
                  <DeleteButton
                    id={cs.id}
                    apiPath="/api/case-studies"
                    confirmMessage={`Delete "${cs.title}"? This cannot be undone.`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
