'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEO_COMPARISON_TABLE } from './data'

type CellValue = boolean | string

function Cell({ value, isHighest }: { value: CellValue; isHighest?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#10B981">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }
  if (value === false) {
    return <div className="text-center text-[var(--text-muted)] text-sm">—</div>
  }
  return (
    <div className={`text-center text-sm font-bold ${isHighest ? 'gradient-text' : 'text-[var(--text-primary)]'}`}>
      {value}
    </div>
  )
}

export function SEOPricingTable() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-10">
      <div className="text-center mb-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          {open ? 'Hide feature comparison' : 'Compare all features'}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
            <div className="overflow-x-auto rounded-2xl border border-[var(--border-default)]">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-[var(--border-default)]" style={{ background: 'rgba(124,58,237,0.05)' }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-1/2">Feature</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-violet-400 uppercase tracking-wider">Entry</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-violet-400 uppercase tracking-wider">Growth</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-amber-400 uppercase tracking-wider">Full</th>
                  </tr>
                </thead>
                <tbody>
                  {SEO_COMPARISON_TABLE.categories.map((cat, ci) => (
                    <>
                      <tr key={`cat-${ci}`}>
                        <td
                          colSpan={4}
                          className="px-5 py-2 text-xs font-semibold uppercase tracking-widest"
                          style={{ color: '#7C3AED', background: 'rgba(124,58,237,0.04)' }}
                        >
                          {cat.name}
                        </td>
                      </tr>
                      {cat.features.map((feat, fi) => (
                        <tr
                          key={`feat-${ci}-${fi}`}
                          className="border-t border-[var(--border-default)] hover:bg-[var(--bg-surface)] transition-colors"
                        >
                          <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{feat.name}</td>
                          <td className="px-4 py-3"><Cell value={feat.entry as CellValue} /></td>
                          <td className="px-4 py-3"><Cell value={feat.growth as CellValue} /></td>
                          <td className="px-4 py-3"><Cell value={feat.full as CellValue} isHighest={typeof feat.full === 'string'} /></td>
                        </tr>
                      ))}
                    </>
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
