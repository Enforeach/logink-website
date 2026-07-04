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
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">Table of Contents</p>
      <ul className="space-y-0.5 border-l border-[var(--border-default)]">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`relative block py-1 text-[13px] leading-snug transition-colors truncate ${h.level === 3 ? 'pl-7' : 'pl-4'} ${
                activeId === h.id
                  ? 'gradient-text font-semibold before:absolute before:-left-px before:top-1 before:bottom-1 before:w-[2px] before:rounded-full before:bg-gradient-cta'
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
