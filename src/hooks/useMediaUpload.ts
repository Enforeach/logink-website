'use client'

import { useState, useCallback } from 'react'

interface UploadedMedia {
  id: string
  url: string
  filename: string
  altText?: string
}

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(async (file: File, folder = 'general'): Promise<UploadedMedia | null> => {
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await res.json()
      return data as UploadedMedia
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      return null
    } finally {
      setUploading(false)
    }
  }, [])

  return { upload, uploading, error }
}
