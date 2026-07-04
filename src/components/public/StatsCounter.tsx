'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Stat {
  value: string
  label: string
  numericValue?: number
  suffix?: string
}

const STATS: Stat[] = [
  { value: '2-4x', label: 'Average ROAS', numericValue: 4, suffix: 'x' },
  { value: '150+', label: 'Articles/Month', numericValue: 150, suffix: '+' },
  { value: '5', label: 'Integrated Services', numericValue: 5 },
  { value: '100%', label: 'Transparent Reporting', numericValue: 100, suffix: '%' },
]

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsCounter() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:py-24" style={{ background: 'var(--bg-ink)' }}>
      {/* Subtle light dot grid on the ink band */}
      <div
        aria-hidden
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(253, 248, 243, 0.07) 1px, transparent 1px)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[rgba(253,248,243,0.12)]">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center lg:px-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-display text-5xl lg:text-6xl font-bold tracking-[-0.03em] gradient-text leading-none mb-3">
                {stat.numericValue !== undefined ? (
                  <CountUp target={stat.numericValue} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </div>
              <p
                className="text-xs uppercase tracking-[0.18em] font-medium"
                style={{ color: 'rgba(253, 248, 243, 0.6)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
