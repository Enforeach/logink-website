'use client'
import { useEffect, useState } from 'react'

interface Heading { id: string; text: string; level: number }

interface Props { headings: Heading[] }

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav className="text-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Table of Contents</p>
      <ul className="space-y-1.5">
        {headings.map(h => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`block text-[13px] leading-snug transition-colors truncate ${
                activeId === h.id
                  ? 'text-brand-violet font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
