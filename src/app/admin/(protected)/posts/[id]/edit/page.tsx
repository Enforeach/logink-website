import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PostEditor } from '@/components/admin/PostEditor'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let post = null
  try {
    post = await prisma.post.findUnique({ where: { id } })
  } catch {}
  if (!post) notFound()
  return <PostEditor post={post} />
}
