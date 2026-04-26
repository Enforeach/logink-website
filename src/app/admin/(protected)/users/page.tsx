export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

const ROLE_COLORS: Record<string, 'green' | 'violet' | 'amber' | 'default'> = {
  ADMIN: 'violet', EDITOR: 'green', VIEWER: 'default',
}

export default async function UsersPage() {
  let users: any[] = []
  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true, emailVerified: true },
    })
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Users</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{users.length} total users</p>
      </div>

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
                      {user.name?.[0] || '?'}
                    </div>
                    <span className="font-medium text-[var(--text-primary)]">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{user.email}</td>
                <td className="px-4 py-3"><Badge variant={ROLE_COLORS[user.role] || 'default'}>{user.role}</Badge></td>
                <td className="px-4 py-3">
                  <Badge variant={user.emailVerified ? 'green' : 'amber'}>{user.emailVerified ? 'Verified' : 'Pending'}</Badge>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)] hidden md:table-cell">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
