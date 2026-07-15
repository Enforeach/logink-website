'use client'

import { Fragment, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LOCALSEO_COMPARISON_TABLE, LOCALSEO_COMPARISON_TABLE_EN } from './data'

type CellValue = boolean | string

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#0D9488" aria-hidden>
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }
  if (value === false) {
    return <div className="text-center text-[var(--text-muted)] text-sm">–</div>
  }
  return (
    <div className="text-center text-sm font-bold" style={{ color: '#0F766E' }}>
      {value}
    </div>
  )
}

export function LocalSeoPricingTable({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const [open, setOpen] = useState(false)
  const table = locale === 'en' ? LOCALSEO_COMPARISON_TABLE_EN : LOCALSEO_COMPARISON_TABLE
  const toggleLabel = locale === 'en'
    ? (open ? 'Hide feature comparison' : 'Compare all features')
    : (open ? 'Sembunyikan perbandingan fitur' : 'Bandingkan semua fitur')
  const featureLabel = locale === 'en' ? 'Feature' : 'Fitur'

  return (
    <div className="mt-10">
      <div className="text-center mb-4">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] rounded-full px-3 py-1.5"
          style={{ color: '#0F766E' }}
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
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-1/2 bg-[var(--bg-tint-lilac)] border-b border-[var(--border-default)]">{featureLabel}</th>
                    <th className="sticky top-0 z-10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider bg-[var(--bg-tint-lilac)] border-b border-[var(--border-default)]" style={{ color: '#0F766E' }}>Starter</th>
                    <th className="sticky top-0 z-10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider bg-[var(--bg-tint-lilac)] border-b border-[var(--border-default)]" style={{ color: '#0F766E' }}>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {table.categories.map((cat, ci) => (
                    <Fragment key={`cat-${ci}`}>
                      <tr>
                        <td
                          colSpan={3}
                          className="px-5 py-2 text-xs font-semibold uppercase tracking-widest"
                          style={{ color: '#0F766E', background: 'rgba(13,148,136,0.05)' }}
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
                          <td className="px-4 py-3"><Cell value={feat.starter as CellValue} /></td>
                          <td className="px-4 py-3"><Cell value={feat.growth as CellValue} /></td>
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
