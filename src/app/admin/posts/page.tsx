import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

export default async function AdminPostsPage() {
  let posts: any[] = []
  try {
    posts = await prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        author: { select: { name: true } },
        category: { select: { nameId: true } },
      },
    })
  } catch {}

  const statusColors: Record<string, 'green' | 'violet' | 'amber' | 'default' | 'red'> = {
    PUBLISHED: 'green',
    DRAFT: 'default',
    REVIEW: 'violet',
    SCHEDULED: 'amber',
    ARCHIVED: 'red',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Posts</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{posts.length} total posts</p>
        </div>
        <Button href="/admin/posts/new" size="sm">+ New Post</Button>
      </div>

      <DataTable
        data={posts}
        columns={[
          {
            key: 'titleId',
            header: 'Title',
            render: (row) => (
              <Link href={`/admin/posts/${row.id}/edit`} className="font-medium text-[var(--text-primary)] hover:text-brand-violet transition-colors line-clamp-1">
                {row.titleId}
              </Link>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <Badge variant={statusColors[row.status] || 'default'}>{row.status}</Badge>,
          },
          {
            key: 'category',
            header: 'Category',
            render: (row) => row.category?.nameId || '—',
            className: 'hidden md:table-cell',
          },
          {
            key: 'author',
            header: 'Author',
            render: (row) => row.author?.name || '—',
            className: 'hidden lg:table-cell',
          },
          {
            key: 'updatedAt',
            header: 'Updated',
            render: (row) => formatDate(row.updatedAt),
            className: 'hidden lg:table-cell',
          },
          {
            key: 'actions',
            header: '',
            render: (row) => (
              <Link href={`/admin/posts/${row.id}/edit`} className="text-brand-violet hover:text-brand-pink text-sm font-medium transition-colors">
                Edit
              </Link>
            ),
          },
        ]}
        emptyMessage="No posts yet. Create your first post!"
      />
    </div>
  )
}
