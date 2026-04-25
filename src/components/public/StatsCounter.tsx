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
    <section className="py-20 px-4 bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {stat.numericValue !== undefined ? (
                  <CountUp target={stat.numericValue} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
