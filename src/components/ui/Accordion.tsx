'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left text-[var(--text-primary)] font-medium hover:bg-[var(--bg-elevated)] transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <svg
                className={cn('h-5 w-5 text-brand-violet transition-transform duration-200 flex-shrink-0 ml-4', isOpen && 'rotate-180')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="px-6 pb-4 text-[var(--text-secondary)] text-sm leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
