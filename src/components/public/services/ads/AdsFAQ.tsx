'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ADS_FAQS, ADS_FAQS_EN } from './data'

const ACCENT_TEXT = '#C2410C'

const FAQ_COPY = {
  id: { heading: 'Pertanyaan yang sering ditanyakan.' },
  en: { heading: 'Frequently asked questions.' },
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88438] rounded-lg"
      >
        <span className="text-base font-medium text-[var(--text-primary)] group-hover:text-[#C2410C] transition-colors">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-colors ${open ? 'gradient-bg' : ''}`}
          style={open ? undefined : { background: 'rgba(248,132,56,0.12)' }}
        >
          <svg
            className={`h-3.5 w-3.5 ${open ? 'text-white' : ''}`}
            style={open ? undefined : { color: ACCENT_TEXT }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed pb-5 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function AdsFAQ({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const faqs = locale === 'en' ? ADS_FAQS_EN : ADS_FAQS
  const c = FAQ_COPY[locale]

  return (
    <section className="py-20 md:py-28 px-6 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="eyebrow mb-3">FAQ</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-[-0.03em]">
            {c.heading}
          </h2>
        </motion.div>

        <div className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
          {(faqs as typeof ADS_FAQS).map((faq, i) => (
            <FAQItem key={i} q={faq.question} a={faq.answer} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
