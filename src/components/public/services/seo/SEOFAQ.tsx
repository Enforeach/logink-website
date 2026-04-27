'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEO_FAQS, SEO_FAQS_EN } from './data'

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden hover:border-violet-500/20 transition-colors">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-[var(--text-primary)]">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center"
          style={{ background: open ? 'linear-gradient(135deg,#7C3AED,#DB2777)' : 'rgba(124,58,237,0.12)' }}
        >
          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
          >
            <div className="px-6 pb-5 border-t border-[var(--border-default)]">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed pt-4 max-w-2xl">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ_COPY = {
  id: { heading: 'Pertanyaan yang sering ditanyakan.', sub: 'Jawaban langsung — tanpa basa-basi.' },
  en: { heading: 'Frequently asked questions.', sub: 'Straight answers — no filler.' },
}

export function SEOFAQ({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const faqs = locale === 'en' ? SEO_FAQS_EN : SEO_FAQS
  const c = FAQ_COPY[locale]
  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">FAQ</div>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)]">{c.heading}</h2>
          <p className="text-[var(--text-secondary)] mt-2 text-sm">{c.sub}</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.question} a={faq.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
