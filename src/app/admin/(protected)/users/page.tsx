export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { UsersTable } from '@/components/admin/UsersTable'

export default async function UsersPage() {
  const session = await auth()
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
      <UsersTable users={users} currentUserId={session?.user?.id} />
    </div>
  )
}
