export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

const STATUS_COLORS: Record<string, 'green' | 'default' | 'amber'> = {
  PUBLISHED: 'green', DRAFT: 'default', REVIEW: 'amber',
}

export default async function PagesPage() {
  let pages: any[] = []
  try {
    pages = await prisma.page.findMany({ orderBy: { updatedAt: 'desc' } })
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Pages</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{pages.length} total pages</p>
        </div>
        <Button href="/admin/pages/new" size="sm">+ New Page</Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
              {['Title', 'Slug', 'Status', 'Updated', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-default)]">
            {pages.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[var(--text-muted)]">No pages yet.</td></tr>
            ) : pages.map(page => (
              <tr key={page.id} className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/admin/pages/${page.id}/edit`} className="font-medium text-[var(--text-primary)] hover:text-brand-violet transition-colors">{page.title}</Link>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)] text-xs font-mono">/{page.slug}</td>
                <td className="px-4 py-3"><Badge variant={STATUS_COLORS[page.status] || 'default'}>{page.status}</Badge></td>
                <td className="px-4 py-3 text-[var(--text-muted)] hidden md:table-cell">{formatDate(page.updatedAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/pages/${page.id}/edit`} className="text-brand-violet hover:text-brand-pink text-sm font-medium">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
