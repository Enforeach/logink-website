'use client'

import { cn } from '@/lib/utils'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  className?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  emptyMessage = 'No data found',
  className,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-[var(--border-default)]', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn('px-4 py-3 text-left font-semibold text-[var(--text-secondary)] tracking-wider text-xs uppercase', col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-default)]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--text-muted)]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id || index}
                className={cn(
                  'bg-[var(--bg-surface)] transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-[var(--bg-elevated)]'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn('px-4 py-3 text-[var(--text-primary)]', col.className)}
                  >
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
