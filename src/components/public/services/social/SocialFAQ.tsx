'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SOCIAL_FAQS, SOCIAL_FAQS_EN } from './data'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[var(--border-default)]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson/50 rounded-lg"
      >
        <span className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-brand-crimson transition-colors">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <Plus size={18} className="text-brand-crimson" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ_COPY = {
  id: { heading: 'Pertanyaan yang sering ditanyakan.', sub: 'Semua yang perlu kamu tahu sebelum mulai.' },
  en: { heading: 'Frequently asked questions.', sub: 'Everything you need to know before getting started.' },
}

export function SocialFAQ({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const faqs = locale === 'en' ? SOCIAL_FAQS_EN : SOCIAL_FAQS
  const c = FAQ_COPY[locale]
  return (
    <section className="py-20 md:py-28 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="eyebrow mb-3">FAQ</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]">{c.heading}</h2>
          <p className="text-[var(--text-secondary)] mt-4">
            {c.sub}
          </p>
        </div>

        <div className="border-t border-[var(--border-default)]">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} q={faq.question} a={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
