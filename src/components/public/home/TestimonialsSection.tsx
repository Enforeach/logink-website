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

const PLACEHOLDERS: Testimonial[] = [
  {
    id: '1',
    clientName: 'Rina Hartati',
    clientTitle: 'Marketing Director',
    clientPhoto: null,
    quote: "Logink completely transformed how we approach digital marketing. Within 90 days, our organic traffic tripled and our paid ROAS went from 1.4x to 3.8x. The integrated approach makes the difference: everything actually works together.",
    companyName: 'PT Maju Bersama',
  },
  {
    id: '2',
    clientName: 'Budi Santoso',
    clientTitle: 'Founder & CEO',
    clientPhoto: null,
    quote: "We've worked with three agencies before Logink. None of them gave us full account access, transparent reporting, or a team that actually understood the Indonesian market. Logink does all three.",
    companyName: 'Nusantara Digital',
  },
  {
    id: '3',
    clientName: 'Sarah Wijaya',
    clientTitle: 'Head of Growth',
    clientPhoto: null,
    quote: "The monthly Looker Studio reports alone are worth it: I finally understand exactly what's driving revenue versus what's just noise. Best decision we made for our marketing stack.",
    companyName: 'Kreasi Bangsa',
  },
]

export function TestimonialsSection({ testimonials = [] }: { testimonials?: Testimonial[] }) {
  const display = testimonials.length > 0 ? testimonials : PLACEHOLDERS
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % display.length)
  }, [display.length])

  useEffect(() => {
    if (display.length <= 1 || paused) return
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next, display.length, paused])

  const t = display[current]

  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: '#0F0A1E' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Radial gradient behind quote */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-xs font-semibold uppercase tracking-wider">
            What Our Clients Say
          </span>
        </motion.div>

        {/* Giant decorative opening quote */}
        <div
          className="absolute top-[4.5rem] left-4 sm:left-0 text-[120px] font-extrabold gradient-text leading-none select-none pointer-events-none"
          style={{ opacity: 0.12, lineHeight: 1 }}
          aria-hidden
        >
          &ldquo;
        </div>

        {/* Quote carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <blockquote className="text-xl sm:text-2xl font-medium text-[var(--text-primary)] leading-relaxed italic mb-8 max-w-2xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Client */}
            <div className="flex items-center justify-center gap-3">
              {t.clientPhoto ? (
                <Image
                  src={t.clientPhoto}
                  alt={t.clientName}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-brand-violet/30"
                />
              ) : (
                <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                  {t.clientName[0]}
                </div>
              )}
              <div className="text-left">
                <div className="font-semibold text-[var(--text-primary)] text-sm">{t.clientName}</div>
                <div className="text-xs text-[var(--text-secondary)]">{t.clientTitle} · {t.companyName}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Giant closing quote */}
        <div
          className="absolute bottom-10 right-4 sm:right-0 text-[120px] font-extrabold gradient-text leading-none select-none pointer-events-none"
          style={{ opacity: 0.12, lineHeight: 1 }}
          aria-hidden
        >
          &rdquo;
        </div>

        {/* Dots */}
        {display.length > 1 && (
          <div className="flex items-center justify-center gap-2">
            {display.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 gradient-bg' : 'w-2 h-2 bg-[var(--border-hover)]'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
