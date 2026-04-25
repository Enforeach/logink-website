'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Discovery',
    days: 'Days 1–3',
    desc: 'We audit your current digital presence, analyse competitors, and identify quick wins. You get a clear picture of where you stand and where the opportunities are.',
    color: '#7C3AED',
  },
  {
    num: '02',
    title: 'Strategy',
    days: 'Days 4–7',
    desc: 'We build a tailored 90-day roadmap across all channels — SEO, social, ads, creative — with specific KPIs tied to your revenue goals. Not vanity metrics.',
    color: '#DB2777',
  },
  {
    num: '03',
    title: 'Execution',
    days: 'Days 8–30',
    desc: "Content goes live. Ads launch. SEO optimisations roll out. Our integrated team works in parallel, not in sequence — so nothing bottlenecks.",
    color: '#D97706',
  },
  {
    num: '04',
    title: 'Optimise & Scale',
    days: 'Ongoing',
    desc: 'Monthly performance reviews with your dedicated team. We double down on what works, cut what doesn\'t, and continuously compound your results.',
    color: '#F59E0B',
  },
]

export function HowWeWorkSection() {
  const leftRef = useRef(null)
  const leftInView = useInView(leftRef, { once: true, amount: 0.3 })

  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, amount: 0.4 })

  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F0A1E 0%, #140b22 50%, #0F0A1E 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left sticky column */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-[35%] lg:sticky lg:top-28 flex-shrink-0"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-violet/20 bg-brand-violet/5 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-6">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-5 leading-tight">
              From First Call to First Results in{' '}
              <span className="gradient-text">30 Days</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base">
              We don't believe in lengthy onboarding or endless strategy decks that sit in a drawer. Our process is built for speed — because your competitors aren't waiting.
            </p>
          </motion.div>

          {/* Right: Steps */}
          <div className="lg:w-[65%]">
            {/* Desktop: horizontal timeline */}
            <div className="hidden lg:block">
              <div ref={lineRef} className="relative mb-8">
                {/* Background track */}
                <div className="absolute top-[2.25rem] left-0 right-0 h-px bg-[var(--border-default)]" />
                {/* Animated fill */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={lineInView ? { width: '100%' } : {}}
                  transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
                  className="absolute top-[2.25rem] left-0 h-px gradient-bg"
                />

                {/* Step cards */}
                <div className="grid grid-cols-4 gap-4 relative">
                  {STEPS.map((step, i) => (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 20 }}
                      animate={lineInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Step dot */}
                      <div className="flex flex-col items-center mb-4">
                        <div
                          className="h-[4.5rem] w-[4.5rem] rounded-2xl flex items-center justify-center text-xl font-extrabold text-white z-10 relative shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${step.color}, #DB2777)` }}
                        >
                          {step.num}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                        <div className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: step.color }}>
                          {step.days}
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2 text-sm">{step.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="lg:hidden flex flex-col gap-6 relative">
              <div className="absolute left-[1.375rem] top-0 bottom-0 w-px bg-[var(--border-default)]" />
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4"
                >
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0 z-10"
                    style={{ background: `linear-gradient(135deg, ${step.color}, #DB2777)` }}
                  >
                    {step.num}
                  </div>
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 flex-1">
                    <div className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: step.color }}>
                      {step.days}
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-1 text-sm">{step.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
