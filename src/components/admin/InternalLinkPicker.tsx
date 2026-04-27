'use client'
import { useState, useEffect, useRef } from 'react'
import { formatDate } from '@/lib/utils'

interface SearchResult {
  id: string
  titleId: string
  slug: string
  publishedAt: string | null
  category?: { nameId: string } | null
}

interface Props {
  onInsert: (url: string, text: string) => void
  onClose: () => void
}

export function InternalLinkPicker({ onInsert, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    fetch(`/api/posts/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => { setResults(data); setLoading(false) })
      .catch(() => setLoading(false))
    return () => controller.abort()
  }, [query])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Insert Internal Link</h3>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-lg">✕</button>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search published posts…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-brand-violet focus:outline-none mb-3"
        />
        <div className="max-h-60 overflow-y-auto space-y-1">
          {loading && <p className="text-xs text-[var(--text-muted)] px-2 py-4 text-center">Searching…</p>}
          {!loading && results.length === 0 && <p className="text-xs text-[var(--text-muted)] px-2 py-4 text-center">No published posts found.</p>}
          {results.map(post => (
            <button
              key={post.id}
              type="button"
              onClick={() => onInsert(`/blog/${post.slug}`, post.titleId)}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
            >
              <div className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{post.titleId}</div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5 flex items-center gap-2">
                <span className="font-mono">/blog/{post.slug}</span>
                {post.category && <span>· {post.category.nameId}</span>}
                {post.publishedAt && <span>· {formatDate(new Date(post.publishedAt))}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
