'use client'

import { Badge } from '@/components/ui/Badge'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { formatDate } from '@/lib/utils'

const ROLE_COLORS: Record<string, 'green' | 'violet' | 'amber' | 'default'> = {
  ADMIN: 'violet', EDITOR: 'green', VIEWER: 'default',
}

interface User {
  id: string
  name: string | null
  email: string | null
  role: string
  createdAt: Date | string
  emailVerified: Date | string | null
}

export function UsersTable({ users, currentUserId }: { users: User[]; currentUserId?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
            {['Name', 'Email', 'Role', 'Verified', 'Joined', ''].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-default)]">
          {users.length === 0 ? (
            <tr><td colSpan={6} className="px-4 py-8 text-center text-[var(--text-muted)]">No users found.</td></tr>
          ) : users.map(user => (
            <tr key={user.id} className="bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user.name?.[0] ?? '?'}
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">{user.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[var(--text-secondary)]">{user.email}</td>
              <td className="px-4 py-3"><Badge variant={ROLE_COLORS[user.role] ?? 'default'}>{user.role}</Badge></td>
              <td className="px-4 py-3">
                <Badge variant={user.emailVerified ? 'green' : 'amber'}>{user.emailVerified ? 'Verified' : 'Pending'}</Badge>
              </td>
              <td className="px-4 py-3 text-[var(--text-muted)] hidden md:table-cell">{formatDate(new Date(user.createdAt))}</td>
              <td className="px-4 py-3">
                {user.id !== currentUserId && (
                  <DeleteButton
                    id={user.id}
                    apiPath="/api/users"
                    confirmMessage={`Delete user "${user.name ?? user.email}"? This cannot be undone.`}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
