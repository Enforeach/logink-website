'use client'

import { Fragment, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ADS_COMPARISON_TABLE, ADS_COMPARISON_TABLE_EN } from './data'

const ACCENT = '#F88438'
const ACCENT_TEXT = '#C2410C'

function Cell({ value }: { value: boolean }) {
  if (value) {
    return (
      <div className="flex justify-center">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill={ACCENT} aria-hidden>
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }
  return <div className="text-center text-[var(--text-muted)] text-sm">–</div>
}

export function AdsPricingTable({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const [open, setOpen] = useState(false)
  const table = locale === 'en' ? ADS_COMPARISON_TABLE_EN : ADS_COMPARISON_TABLE
  const featureLabel = locale === 'en' ? 'Feature' : 'Fitur'
  const toggleLabel = locale === 'en'
    ? (open ? 'Hide feature comparison' : 'Compare all features')
    : (open ? 'Sembunyikan perbandingan fitur' : 'Bandingkan semua fitur')

  return (
    <div className="mt-10">
      <div className="text-center mb-4">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88438] rounded-full px-3 py-1.5"
          style={{ color: ACCENT_TEXT }}
        >
          {toggleLabel}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-white shadow-card">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-1/2 bg-[var(--bg-tint-peach)] border-b border-[var(--border-default)]">{featureLabel}</th>
                    <th className="sticky top-0 z-10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider bg-[var(--bg-tint-peach)] border-b border-[var(--border-default)]" style={{ color: ACCENT_TEXT }}>Entry</th>
                    <th className="sticky top-0 z-10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider bg-[var(--bg-tint-peach)] border-b border-[var(--border-default)]" style={{ color: ACCENT_TEXT }}>Growth</th>
                    <th className="sticky top-0 z-10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider bg-[var(--bg-tint-peach)] border-b border-[var(--border-default)]" style={{ color: ACCENT_TEXT }}>Full</th>
                  </tr>
                </thead>
                <tbody>
                  {(table as typeof ADS_COMPARISON_TABLE).categories.map((cat, ci) => (
                    <Fragment key={`cat-${ci}`}>
                      <tr>
                        <td
                          colSpan={4}
                          className="px-5 py-2 text-xs font-semibold uppercase tracking-widest"
                          style={{ color: ACCENT_TEXT, background: 'rgba(248,132,56,0.06)' }}
                        >
                          {cat.name}
                        </td>
                      </tr>
                      {cat.features.map((feat, fi) => (
                        <tr
                          key={`feat-${ci}-${fi}`}
                          className="border-t border-[var(--border-default)] hover:bg-[var(--bg-primary)] transition-colors"
                        >
                          <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{feat.name}</td>
                          <td className="px-4 py-3"><Cell value={feat.entry} /></td>
                          <td className="px-4 py-3"><Cell value={feat.growth} /></td>
                          <td className="px-4 py-3"><Cell value={feat.full} /></td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
