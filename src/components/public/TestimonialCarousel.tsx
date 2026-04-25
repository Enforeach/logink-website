'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: string
  clientName: string
  clientTitle: string
  clientPhoto?: string | null
  quote: string
  companyName: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (testimonials.length <= 1) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next, testimonials.length])

  if (!testimonials.length) return null

  const t = testimonials[current]

  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-sm font-medium mb-10">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
          Testimonials
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote className="text-xl lg:text-2xl font-medium text-[var(--text-primary)] leading-relaxed mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              {t.clientPhoto ? (
                <Image
                  src={t.clientPhoto}
                  alt={t.clientName}
                  width={52}
                  height={52}
                  className="rounded-full border-2 border-brand-violet/30"
                />
              ) : (
                <div className="h-13 w-13 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  {t.clientName[0]}
                </div>
              )}
              <div className="text-left">
                <div className="font-semibold text-[var(--text-primary)]">{t.clientName}</div>
                <div className="text-sm text-[var(--text-secondary)]">{t.clientTitle} · {t.companyName}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-brand-violet/50 transition-all"
              aria-label="Previous"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-brand-violet' : 'w-2 bg-[var(--border-hover)]'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-brand-violet/50 transition-all"
              aria-label="Next"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
