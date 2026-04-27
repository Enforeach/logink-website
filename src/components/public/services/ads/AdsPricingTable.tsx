'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ADS_COMPARISON_TABLE } from './data'

function Cell({ value }: { value: boolean }) {
  if (value) {
    return (
      <div className="flex justify-center">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#10B981">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }
  return <div className="text-center text-[var(--text-muted)] text-sm">—</div>
}

export function AdsPricingTable() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-10">
      <div className="text-center mb-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
        >
          {open ? 'Sembunyikan perbandingan fitur' : 'Bandingkan semua fitur'}
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
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="border-b border-white/10" style={{ background: 'rgba(217,119,6,0.05)' }}>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-1/2">Fitur</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-amber-400 uppercase tracking-wider">Entry</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-amber-400 uppercase tracking-wider">Growth</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-amber-300 uppercase tracking-wider">Full</th>
                  </tr>
                </thead>
                <tbody>
                  {ADS_COMPARISON_TABLE.categories.map((cat, ci) => (
                    <>
                      <tr key={`cat-${ci}`}>
                        <td
                          colSpan={4}
                          className="px-5 py-2 text-xs font-semibold uppercase tracking-widest"
                          style={{ color: '#D97706', background: 'rgba(217,119,6,0.04)' }}
                        >
                          {cat.name}
                        </td>
                      </tr>
                      {cat.features.map((feat, fi) => (
                        <tr
                          key={`feat-${ci}-${fi}`}
                          className="border-t border-white/5 hover:bg-white/3 transition-colors"
                        >
                          <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{feat.name}</td>
                          <td className="px-4 py-3"><Cell value={feat.entry} /></td>
                          <td className="px-4 py-3"><Cell value={feat.growth} /></td>
                          <td className="px-4 py-3"><Cell value={feat.full} /></td>
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
