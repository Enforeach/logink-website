import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export default async function AdminDashboardPage() {
  const session = await auth()

  let stats = { posts: 0, caseStudies: 0, submissions: 0, media: 0 }
  let recentActivity: {
    id: string
    action: string
    entityType: string
    entityTitle: string | null
    createdAt: Date
    user: { name: string }
  }[] = []

  try {
    const [posts, caseStudies, submissions, media, activity] = await Promise.all([
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.caseStudy.count({ where: { status: 'PUBLISHED' } }),
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.media.count(),
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } },
      }),
    ])
    stats = { posts, caseStudies, submissions, media }
    recentActivity = activity
  } catch {}

  const QUICK_STATS = [
    { label: 'Published Posts', value: stats.posts, href: '/admin/posts', color: '#7C3AED' },
    { label: 'Case Studies', value: stats.caseStudies, href: '/admin/case-studies', color: '#DB2777' },
    { label: 'Unread Submissions', value: stats.submissions, href: '/admin/submissions', color: '#D97706' },
    { label: 'Media Files', value: stats.media, href: '/admin/media', color: '#F59E0B' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'} 👋
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">Here&apos;s what&apos;s happening with your website.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 hover:border-[var(--border-hover)] transition-all group"
          >
            <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/admin/posts/new', label: '+ New Post' },
            { href: '/admin/case-studies', label: '+ New Case Study' },
            { href: '/admin/submissions', label: 'View Submissions' },
            { href: '/admin/media', label: 'Media Library' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="px-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-secondary)] hover:text-brand-violet hover:border-brand-violet/30 transition-all"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] divide-y divide-[var(--border-default)]">
            {recentActivity.map((log) => (
              <div key={log.id} className="flex items-start justify-between p-4 gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    {log.user.name[0]}
                  </div>
                  <div>
                    <span className="text-sm text-[var(--text-primary)]">
                      <strong>{log.user.name}</strong> {log.action} &ldquo;{log.entityTitle || log.entityType}&rdquo;
                    </span>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5 capitalize">{log.entityType}</div>
                  </div>
                </div>
                <span className="text-xs text-[var(--text-muted)] whitespace-nowrap flex-shrink-0">
                  {formatDate(log.createdAt)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center text-sm text-[var(--text-muted)]">
            No activity yet. Start creating content!
          </div>
        )}
      </div>
    </div>
  )
}
