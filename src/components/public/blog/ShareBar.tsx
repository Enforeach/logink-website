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

  const chip = 'px-3.5 py-1.5 rounded-full border border-[var(--border-default)] bg-white text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all'

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.18em]">Share:</span>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank" rel="noopener noreferrer"
          className={chip}
        >
          𝕏 Twitter
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank" rel="noopener noreferrer"
          className={chip}
        >
          LinkedIn
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}+${encodedUrl}`}
          target="_blank" rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          WhatsApp
        </a>
        <button onClick={copyLink} className={chip}>
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
  )
}
