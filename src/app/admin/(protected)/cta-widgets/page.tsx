export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

function statusVariant(w: { isActive: boolean; endDate: Date | null; startDate: Date | null }): 'green' | 'amber' | 'default' | 'red' {
  if (!w.isActive) return 'default'
  const now = new Date()
  if (w.endDate && w.endDate < now) return 'red'
  if (w.startDate && w.startDate > now) return 'amber'
  return 'green'
}

function statusLabel(w: { isActive: boolean; endDate: Date | null; startDate: Date | null }): string {
  if (!w.isActive) return 'Inactive'
  const now = new Date()
  if (w.endDate && w.endDate < now) return 'Expired'
  if (w.startDate && w.startDate > now) return 'Scheduled'
  return 'Active'
}

export default async function CtaWidgetsPage() {
  let widgets: any[] = []
  try {
    widgets = await prisma.ctaWidget.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">CTA Widgets</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{widgets.length} widgets</p>
        </div>
        <Button href="/admin/cta-widgets/new" size="sm">+ New Widget</Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
              {['Name', 'Template', 'Placement', 'Targeting', 'Status', 'Impressions', 'Clicks', 'CTR', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-default)]">
            {widgets.length === 0 ? (
              <tr><td colSpan={9} className="px-4 py-8 text-center text-[var(--text-muted)]">No CTA widgets yet. Create your first one!</td></tr>
            ) : widgets.map(w => {
              const ctr = w.impressionCount > 0 ? ((w.clickCount / w.impressionCount) * 100).toFixed(1) : '0'
              return (
                <tr key={w.id} className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/cta-widgets/${w.id}/edit`} className="font-medium text-[var(--text-primary)] hover:text-brand-violet transition-colors">
                      {w.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs">{w.templateType.replace('_', ' ')}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs hidden md:table-cell">{w.placement.replace('_', ' ')}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs hidden lg:table-cell">{w.targetingType.replace('_', ' ')}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant(w)}>{statusLabel(w)}</Badge></td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs">{w.impressionCount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs">{w.clickCount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] text-xs">{ctr}%</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/cta-widgets/${w.id}/edit`} className="text-brand-violet hover:text-brand-pink text-sm font-medium">Edit</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
