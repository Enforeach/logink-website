'use client'

import { motion } from 'framer-motion'

const PROBLEMS = [
  {
    problem: 'Siloed agencies with zero synergy',
    solution: 'One integrated team running all channels: your SEO informs your ads, your social feeds your content.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    problem: 'Reports full of vanity metrics',
    solution: 'We optimize for revenue, leads, and ROAS, not impressions or follower counts. Full GA4 transparency.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    problem: 'Generic recycled templates',
    solution: 'Every piece of creative is built for your brand, your audience, and the Indonesian market; no copy-paste.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
]

export function ProblemSolution() {
  return (
    <section className="py-20 px-4 bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-brand-pink text-sm font-medium mb-4">
            Why Logink?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            We Solve What Others{' '}
            <span className="gradient-text">Can&apos;t</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Conventional agencies work in silos. We build one integrated system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] overflow-hidden"
            >
              {/* Problem */}
              <div className="p-6 border-b border-[var(--border-default)]">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">Problem</div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{item.problem}</p>
                  </div>
                </div>
              </div>
              {/* Solution */}
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-brand-violet/10 text-brand-violet flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brand-violet uppercase tracking-wider mb-1">Logink's Solution</div>
                    <p className="text-sm text-[var(--text-secondary)]">{item.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
