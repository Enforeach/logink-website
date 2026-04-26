'use client'

import { useState, useRef } from 'react'

interface MediaFile {
  id: string; url: string; filename: string; mimeType: string
  fileSize: number; folder: string; uploadedAt: string | Date
}

const FOLDERS = ['general', 'blog', 'case-studies', 'services', 'team']

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function MediaGrid({ initialMedia }: { initialMedia: MediaFile[] }) {
  const [media, setMedia] = useState(initialMedia)
  const [folder, setFolder] = useState('general')
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      try {
        const res = await fetch('/api/media/upload', { method: 'POST', body: fd })
        if (res.ok) {
          const newFile = await res.json()
          setMedia(m => [{ ...newFile, uploadedAt: new Date().toISOString(), mimeType: file.type, fileSize: file.size, folder }, ...m])
        }
      } catch {}
    }
    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this file?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' })
      if (res.ok) setMedia(m => m.filter(f => f.id !== id))
    } catch {}
    setDeleting(null)
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Upload bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
        <select
          value={folder}
          onChange={e => setFolder(e.target.value)}
          className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none"
        >
          {FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {uploading ? (
            <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Uploading…</>
          ) : '+ Upload Files'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleUpload(e.target.files)} />
        <span className="text-xs text-[var(--text-muted)]">JPG, PNG, WebP, SVG · Max 10MB</span>
      </div>

      {/* Grid */}
      {media.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border-default)] p-12 text-center">
          <p className="text-sm text-[var(--text-muted)]">No media files yet. Upload your first image.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map(file => (
            <div key={file.id} className="group relative rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
              <img src={file.url} alt={file.filename} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <button
                  onClick={() => copyUrl(file.url)}
                  className="w-full rounded-lg bg-white/20 py-1 text-xs text-white hover:bg-white/30 transition-colors"
                >
                  {copied === file.url ? '✓ Copied!' : 'Copy URL'}
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  disabled={deleting === file.id}
                  className="w-full rounded-lg bg-red-500/30 py-1 text-xs text-red-300 hover:bg-red-500/50 transition-colors disabled:opacity-50"
                >
                  {deleting === file.id ? '…' : 'Delete'}
                </button>
              </div>
              <div className="px-2 py-1.5 border-t border-[var(--border-default)]">
                <p className="text-[10px] text-[var(--text-muted)] truncate">{file.filename}</p>
                <p className="text-[9px] text-[var(--text-muted)] opacity-60">{formatBytes(file.fileSize)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
