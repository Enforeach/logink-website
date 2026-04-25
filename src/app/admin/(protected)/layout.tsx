import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Sidebar } from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'
import { ToastProvider } from '@/components/ui/Toast'
import { prisma } from '@/lib/prisma'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  const role = session.user.role
  if (role !== 'ADMIN' && role !== 'EDITOR' && role !== 'VIEWER') {
    redirect('/')
  }

  let unreadCount = 0
  try {
    unreadCount = await prisma.contactSubmission.count({ where: { isRead: false } })
  } catch {}

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar unreadCount={unreadCount} user={session.user} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  )
}
