import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { prisma } from '@/lib/prisma'

const MAX_SIZE_MB = Number(process.env.MAX_FILE_SIZE_MB || 10)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const VALID_FOLDERS = ['blog', 'case-studies', 'services', 'team', 'general']

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json({ error: `File too large (max ${MAX_SIZE_MB}MB)` }, { status: 400 })
    }
    if (!VALID_FOLDERS.includes(folder)) {
      return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const timestamp = Date.now()
    const ext = extname(file.name) || '.jpg'
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
    const filename = `${timestamp}-${safeName}`
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)

    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), buffer)

    const url = `/uploads/${folder}/${filename}`

    let width: number | undefined
    let height: number | undefined

    const media = await prisma.media.create({
      data: {
        filename,
        url,
        mimeType: file.type,
        fileSize: file.size,
        folder,
        width,
        height,
      },
    })

    return NextResponse.json({ id: media.id, url, filename })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
