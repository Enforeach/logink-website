'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WEBSITE_COMPARISON_TABLE } from './data'

const COLUMNS_ID = [
  { key: 'landing' as const, label: 'Landing Page', accentColor: '#06B6D4', bestFor: 'Kampanye & lead gen' },
  { key: 'profile' as const, label: 'Company Profile', accentColor: '#7C3AED', bestFor: 'Kehadiran brand' },
  { key: 'ecommerce' as const, label: 'E-Commerce', accentColor: '#10B981', bestFor: 'Toko online' },
]

const COLUMNS_EN = [
  { key: 'landing' as const, label: 'Landing Page', accentColor: '#06B6D4', bestFor: 'Campaigns & lead gen' },
  { key: 'profile' as const, label: 'Company Profile', accentColor: '#7C3AED', bestFor: 'Brand presence' },
  { key: 'ecommerce' as const, label: 'E-Commerce', accentColor: '#10B981', bestFor: 'Online store' },
]

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4 mx-auto" viewBox="0 0 20 20" fill={color}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export function WebsiteScopeTable({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const columns = locale === 'en' ? COLUMNS_EN : COLUMNS_ID
  const featureLabel = locale === 'en' ? 'Feature' : 'Fitur'

  return (
    <div ref={ref} className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[500px] text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] w-1/2">
              {featureLabel}
            </th>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-4 text-center w-[16.6%]">
                <div className="font-bold text-sm" style={{ color: col.accentColor }}>{col.label}</div>
                <div className="text-[10px] text-[var(--text-muted)] font-normal mt-0.5">{col.bestFor}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WEBSITE_COMPARISON_TABLE.map((group, gi) => (
            <>
              <tr key={`cat-${gi}`} className="border-b border-white/5">
                <td colSpan={4} className="px-5 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#06B6D4]">
                    {group.category}
                  </span>
                </td>
              </tr>
              {group.features.map((feat, fi) => (
                <motion.tr
                  key={feat.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: gi * 0.05 + fi * 0.04 + 0.2 }}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  style={{ background: fi % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}
                >
                  <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{feat.name}</td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-center">
                      {feat[col.key] ? (
                        <CheckIcon color="#10B981" />
                      ) : (
                        <span className="text-[var(--text-muted)] text-base leading-none">–</span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
