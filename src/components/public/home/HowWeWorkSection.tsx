'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

interface Step {
  num: string
  title: string
  days: string
  desc: string
  color: string
}

const STEPS_ID: Step[] = [
  {
    num: '01',
    title: 'Discovery',
    days: 'Hari 1–3',
    desc: 'Kami audit kehadiran digital kamu saat ini, analisis kompetitor, dan identifikasi quick wins. Kamu dapat gambaran jelas tentang posisi brand sekarang dan peluang yang bisa diambil.',
    color: '#A855F7',
  },
  {
    num: '02',
    title: 'Strategi',
    days: 'Hari 4–7',
    desc: 'Kami susun roadmap 90 hari yang disesuaikan untuk semua channel (SEO, social, iklan, kreatif) dengan KPI spesifik yang terhubung ke target pendapatan kamu. Bukan vanity metrics.',
    color: '#D81C5C',
  },
  {
    num: '03',
    title: 'Eksekusi',
    days: 'Hari 8–30',
    desc: 'Konten go live. Iklan diluncurkan. Optimasi SEO mulai berjalan. Tim terintegrasi kami bekerja paralel, bukan berurutan, tanpa ada bottleneck.',
    color: '#F88438',
  },
  {
    num: '04',
    title: 'Optimasi & Kembangkan',
    days: 'Berkelanjutan',
    desc: 'Review performa bulanan bersama tim dedikasi kamu. Kami perkuat apa yang berhasil, potong yang tidak, dan terus tingkatkan hasilnya secara konsisten.',
    color: '#F5A623',
  },
]

const STEPS_EN: Step[] = [
  {
    num: '01',
    title: 'Discovery',
    days: 'Days 1–3',
    desc: 'We audit your current digital presence, analyse competitors, and identify quick wins. You get a clear picture of where you stand and where the opportunities are.',
    color: '#A855F7',
  },
  {
    num: '02',
    title: 'Strategy',
    days: 'Days 4–7',
    desc: 'We build a tailored 90-day roadmap across all channels (SEO, social, ads, creative) with specific KPIs tied to your revenue goals. Not vanity metrics.',
    color: '#D81C5C',
  },
  {
    num: '03',
    title: 'Execution',
    days: 'Days 8–30',
    desc: "Content goes live. Ads launch. SEO optimisations roll out. Our integrated team works in parallel, not in sequence, so nothing bottlenecks.",
    color: '#F88438',
  },
  {
    num: '04',
    title: 'Optimise & Scale',
    days: 'Ongoing',
    desc: 'Monthly performance reviews with your dedicated team. We double down on what works, cut what doesn\'t, and continuously compound your results.',
    color: '#F5A623',
  },
]

const COPY = {
  id: {
    badge: 'Proses Kami',
    headline: 'Dari Konsultasi Pertama ke Hasil Nyata dalam',
    headlineGradient: '30 Hari',
    body: 'Kami tidak percaya dengan onboarding yang bertele-tele atau strategi deck yang ujung-ujungnya cuma jadi pajangan. Proses kami dirancang untuk kecepatan, karena kompetitor kamu tidak sedang menunggu.',
  },
  en: {
    badge: 'Our Process',
    headline: 'From First Call to First Results in',
    headlineGradient: '30 Days',
    body: "We don't believe in lengthy onboarding or endless strategy decks that sit in a drawer. Our process is built for speed, because your competitors aren't waiting.",
  },
}

/* Accent darkened for AA text contrast on white */
const accentText = (hex: string) => `color-mix(in srgb, ${hex} 55%, #231A26)`

function StepCard({ step, index }: { step: Step; index: number }) {
  const right = index % 2 === 1

  return (
    <li className="relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-16 list-none">
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className="absolute left-6 md:left-1/2 top-9 -translate-x-1/2 h-4 w-4 rounded-full gradient-brand-bg ring-4 ring-[var(--bg-base)] z-10"
      />
      <motion.div
        initial={{ opacity: 0, y: 24, x: right ? 24 : -24 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`rounded-2xl bg-white border border-[var(--border-default)] p-6 md:p-8 transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.16)] ${right ? 'md:col-start-2' : 'md:col-start-1'}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3"
              style={{ background: `${step.color}1A`, color: accentText(step.color) }}
            >
              {step.days}
            </span>
            <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
          </div>
          {/* Huge ghost step number */}
          <span
            aria-hidden="true"
            className="font-display text-6xl md:text-7xl font-extrabold leading-none gradient-text opacity-30 select-none flex-shrink-0 -mt-1"
          >
            {step.num}
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{step.desc}</p>
      </motion.div>
    </li>
  )
}

export function HowWeWorkSection({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = COPY[locale]
  const steps = locale === 'id' ? STEPS_ID : STEPS_EN

  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.75', 'end 0.5'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="eyebrow block mb-4">{c.badge}</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--text-primary)] mb-4 leading-[1.12] tracking-[-0.03em] max-w-3xl mx-auto">
            {c.headline}{' '}
            <span className="gradient-text">{c.headlineGradient}</span>
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {c.body}
          </p>
        </motion.div>

        {/* Scroll-linked zigzag timeline */}
        <div ref={trackRef} className="relative max-w-4xl mx-auto">
          {/* Track */}
          <div aria-hidden="true" className="absolute left-6 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-[var(--border-default)]" />
          {/* Gradient fill — grows with scroll */}
          <motion.div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[3px] rounded-full gradient-brand-bg origin-top"
            style={{ scaleY, x: '-50%' }}
          />
          <ol className="space-y-10 md:space-y-14 p-0 m-0">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
