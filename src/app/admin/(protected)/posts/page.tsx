import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/Button'
import { PostsTable } from '@/components/admin/PostsTable'

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Posts</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{posts.length} total posts</p>
        </div>
        <Button href="/admin/posts/new" size="sm">+ New Post</Button>
      </div>
      <PostsTable posts={posts} />
    </div>
  )
}
