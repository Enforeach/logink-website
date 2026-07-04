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
    <section className="py-20 md:py-28 px-6 relative overflow-hidden" style={{ background: 'var(--bg-tint-peach)' }}>
      {/* Oversized decorative quote */}
      <div
        className="absolute top-12 left-6 sm:left-16 font-display text-[140px] font-bold text-[var(--text-primary)] leading-none select-none pointer-events-none"
        style={{ opacity: 0.1, lineHeight: 1 }}
        aria-hidden
      >
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="eyebrow inline-block mb-10">Testimonials</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={testimonials.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next()
              else if (info.offset.x > 60) prev()
            }}
            className={testimonials.length > 1 ? 'cursor-grab active:cursor-grabbing' : undefined}
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
                  className="rounded-full border-2 border-brand-crimson/25"
                />
              ) : (
                <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">
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
              className="h-10 w-10 rounded-full border border-[var(--border-default)] bg-white flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-crimson"
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
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-crimson ${i === current ? 'w-7 gradient-bg' : 'w-2 bg-[var(--border-hover)] hover:bg-[var(--text-muted)]'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-[var(--border-default)] bg-white flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-crimson"
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
