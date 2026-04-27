'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WEBSITE_FAQS, WEBSITE_FAQS_EN } from './data'

const FAQ_COPY = {
  id: { heading: 'Pertanyaan yang sering ditanyakan.' },
  en: { heading: 'Frequently asked questions.' },
}

export function WebsiteFAQ({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = locale === 'en' ? WEBSITE_FAQS_EN : WEBSITE_FAQS
  const c = FAQ_COPY[locale]

  return (
    <section className="py-24 px-4" style={{ background: '#0F0A1E' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#06B6D4] mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            {c.heading}
          </h2>
        </div>

        <div className="space-y-2">
          {(faqs as typeof WEBSITE_FAQS).map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-[var(--bg-surface)] overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-[var(--text-primary)]">{faq.question}</span>
                <motion.svg
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-5 w-5 flex-shrink-0 text-[#06B6D4]"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
