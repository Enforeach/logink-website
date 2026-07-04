'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { WEBSITE_COMPARISON_TABLE } from './data'

const COLUMNS_ID = [
  { key: 'landing' as const, label: 'Landing Page', accentColor: '#C084FC', bestFor: 'Kampanye & lead gen' },
  { key: 'profile' as const, label: 'Company Profile', accentColor: '#A855F7', bestFor: 'Kehadiran brand' },
  { key: 'ecommerce' as const, label: 'E-Commerce', accentColor: '#EE3D5E', bestFor: 'Toko online' },
]

const COLUMNS_EN = [
  { key: 'landing' as const, label: 'Landing Page', accentColor: '#C084FC', bestFor: 'Campaigns & lead gen' },
  { key: 'profile' as const, label: 'Company Profile', accentColor: '#A855F7', bestFor: 'Brand presence' },
  { key: 'ecommerce' as const, label: 'E-Commerce', accentColor: '#EE3D5E', bestFor: 'Online store' },
]

function CheckIcon() {
  return (
    <svg className="h-4 w-4 mx-auto" viewBox="0 0 20 20" fill="#059669" aria-hidden>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export function WebsiteScopeTable({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const columns = locale === 'en' ? COLUMNS_EN : COLUMNS_ID
  const featureLabel = locale === 'en' ? 'Feature' : 'Fitur'

  return (
    <div className="overflow-auto max-h-[520px] rounded-2xl border border-[var(--border-default)] bg-white">
      <table className="w-full min-w-[500px] text-sm">
        <thead>
          <tr>
            <th className="sticky top-0 z-10 bg-white text-left px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)] w-1/2 shadow-[0_1px_0_var(--border-default)]">
              {featureLabel}
            </th>
            {columns.map((col) => (
              <th key={col.key} className="sticky top-0 z-10 bg-white px-4 py-4 text-center w-[16.6%] shadow-[0_1px_0_var(--border-default)]">
                <div className="flex items-center justify-center gap-1.5 font-bold text-sm text-[var(--text-primary)]">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: col.accentColor }} aria-hidden />
                  {col.label}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] font-normal mt-0.5">{col.bestFor}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WEBSITE_COMPARISON_TABLE.map((group, gi) => (
            <Fragment key={group.category}>
              <tr className="border-b border-[var(--border-default)]">
                <td colSpan={4} className="px-5 py-2 bg-[var(--bg-primary)]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-crimson)]">
                    {group.category}
                  </span>
                </td>
              </tr>
              {group.features.map((feat, fi) => (
                <motion.tr
                  key={feat.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: gi * 0.05 + fi * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-[var(--border-default)] transition-colors hover:bg-[var(--bg-tint-lilac)]"
                  style={{ background: fi % 2 === 0 ? 'transparent' : 'rgba(35,26,38,0.02)' }}
                >
                  <td className="px-5 py-3 text-sm text-[var(--text-secondary)]">{feat.name}</td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-center">
                      {feat[col.key] ? (
                        <CheckIcon />
                      ) : (
                        <span className="text-[var(--text-muted)] text-base leading-none">–</span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
