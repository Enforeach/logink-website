'use client'

import Link from 'next/link'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

interface Post {
  id: string
  titleId: string
  status: string
  updatedAt: Date | string
  category?: { nameId: string } | null
  author?: { name: string } | null
}

const STATUS_COLORS: Record<string, 'green' | 'violet' | 'amber' | 'default' | 'red'> = {
  PUBLISHED: 'green',
  DRAFT: 'default',
  REVIEW: 'violet',
  SCHEDULED: 'amber',
  ARCHIVED: 'red',
}

export function PostsTable({ posts }: { posts: Post[] }) {
  return (
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
          render: (row) => <Badge variant={STATUS_COLORS[row.status] || 'default'}>{row.status}</Badge>,
        },
        {
          key: 'category',
          header: 'Category',
          render: (row) => row.category?.nameId || '-',
          className: 'hidden md:table-cell',
        },
        {
          key: 'author',
          header: 'Author',
          render: (row) => row.author?.name || '-',
          className: 'hidden lg:table-cell',
        },
        {
          key: 'updatedAt',
          header: 'Updated',
          render: (row) => formatDate(new Date(row.updatedAt)),
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
  )
}
