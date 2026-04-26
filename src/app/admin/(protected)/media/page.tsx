import { prisma } from '@/lib/prisma'
import { MediaGrid } from '@/components/admin/MediaGrid'

export default async function MediaPage() {
  let media: any[] = []
  try {
    media = await prisma.media.findMany({ orderBy: { uploadedAt: 'desc' } })
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Media Library</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{media.length} files</p>
      </div>
      <MediaGrid initialMedia={media} />
    </div>
  )
}
