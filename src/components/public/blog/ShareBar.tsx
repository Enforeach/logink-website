'use client'
import { useState } from 'react'

interface Props {
  title: string
  url: string
  tags?: string[]
}

export function ShareBar({ title, url, tags }: Props) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(url) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-8 border-t border-b border-[var(--border-default)] mt-10 mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Share:</span>
        <div className="flex items-center gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-[var(--border-default)] text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all"
          >
            𝕏 Twitter
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
            target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-[var(--border-default)] text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all"
          >
            LinkedIn
          </a>
          <a
            href={`https://wa.me/?text=${encodedTitle}+${encodedUrl}`}
            target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-[var(--border-default)] text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all"
          >
            WhatsApp
          </a>
          <button
            onClick={copyLink}
            className="px-3 py-1.5 rounded-lg border border-[var(--border-default)] text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all"
          >
            {copied ? '✓ Copied!' : '🔗 Copy link'}
          </button>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {tags.map(tag => (
              <a
                key={tag}
                href={`/blog/tag/${tag}`}
                className="px-2.5 py-1 rounded-full text-xs border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
