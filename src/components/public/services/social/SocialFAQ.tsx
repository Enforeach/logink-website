'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SOCIAL_FAQS } from './data'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-[var(--border-default)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--bg-elevated)] transition-colors"
      >
        <span className="font-semibold text-[var(--text-primary)] text-sm">{q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <Plus size={18} className="text-pink-400" />
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
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-[var(--border-default)] mb-4" />
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SocialFAQ() {
  return (
    <section className="py-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-3">FAQ</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">Pertanyaan yang sering ditanyakan.</h2>
          <p className="text-[var(--text-secondary)] mt-3">
            Semua yang perlu kamu tahu sebelum mulai.
          </p>
        </div>

        <div className="space-y-3">
          {SOCIAL_FAQS.map((faq) => (
            <FAQItem key={faq.question} q={faq.question} a={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
