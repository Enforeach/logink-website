'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const TRUST_PILLS = [
  '✓ 100% original content',
  '✓ Bahasa Indonesia native',
  '✓ Monthly content calendar',
]

const POSTS = [
  {
    type: 'image' as const,
    bg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
    label: 'Instagram',
    heart: '2.4K',
    comment: '186',
  },
  {
    type: 'video' as const,
    bg: '#010101',
    label: 'TikTok',
    views: '45.2K views',
  },
  {
    type: 'text' as const,
    bg: 'linear-gradient(135deg,#0a66c2 0%,#1e3a5f 100%)',
    label: 'LinkedIn',
    likes: '312',
  },
  {
    type: 'image' as const,
    bg: 'linear-gradient(135deg,#f77062,#fe5196)',
    label: 'Instagram',
    heart: '1.8K',
    comment: '94',
  },
]

export function SocialHero() {
  return (
    <section
      className="relative min-h-[88vh] flex items-center overflow-hidden px-4 pt-24 pb-16"
      style={{ background: '#0F0A1E' }}
    >
      <div className="absolute inset-0 animated-mesh opacity-60" />
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle,rgba(219,39,119,0.18) 0%,transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto w-full z-10">
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-10">
          <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[var(--text-primary)] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">Social Media Management</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 text-xs font-semibold text-pink-400 mb-6"
              style={{ background: 'rgba(219,39,119,0.08)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
              Social Media Management
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-5"
            >
              Content That Connects.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg,#DB2777,#7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Presence That Converts.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg"
            >
              We take social media completely off your plate — strategy, content creation, scheduling, community management, and performance reporting across Instagram, TikTok, Facebook, and LinkedIn.{' '}
              <span className="text-[var(--text-primary)] font-medium">
                You focus on your business. We make your brand impossible to scroll past.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Link
                href="/contact?service=social-media-management"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm hover:scale-[1.03] hover:shadow-xl transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg,#DB2777,#7C3AED)',
                  boxShadow: '0 4px 24px rgba(219,39,119,0.25)',
                }}
              >
                Start Free Consultation
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--bg-elevated)] transition-all duration-200"
              >
                See Pricing
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {TRUST_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="text-xs text-[var(--text-secondary)] px-3 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)]"
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
              style={{ width: 260 }}
            >
              {/* Phone frame */}
              <div
                className="rounded-[36px] overflow-hidden shadow-2xl"
                style={{
                  width: 260,
                  height: 480,
                  border: '6px solid #1a1a2e',
                  background: '#0a0a14',
                  boxShadow: '0 0 60px rgba(219,39,119,0.15), 0 30px 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 pb-1">
                  <span className="text-[9px] text-white/50 font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="h-1 w-3 rounded-sm bg-white/40" />
                    <div className="h-1 w-1 rounded-sm bg-white/40" />
                  </div>
                </div>

                {/* Scrolling feed */}
                <div className="overflow-hidden" style={{ height: 420 }}>
                  <motion.div
                    animate={{ y: [0, -320] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="flex flex-col gap-2.5 px-2 pt-1"
                  >
                    {[...POSTS, ...POSTS].map((post, i) => (
                      <div key={i}>
                        {post.type === 'image' && (
                          <div className="rounded-xl overflow-hidden" style={{ background: post.bg, height: 134 }}>
                            <div className="h-full flex flex-col justify-between p-3">
                              <div className="flex items-center gap-1.5">
                                <div className="h-5 w-5 rounded-full bg-white/30" />
                                <div className="h-1.5 w-16 rounded-full bg-white/30" />
                              </div>
                              <div className="flex gap-3 text-white text-xs font-semibold">
                                <span>❤ {post.heart}</span>
                                <span>💬 {post.comment}</span>
                              </div>
                            </div>
                          </div>
                        )}
                        {post.type === 'video' && (
                          <div
                            className="rounded-xl flex flex-col items-center justify-center gap-1.5"
                            style={{ background: post.bg, height: 134 }}
                          >
                            <div className="h-9 w-9 rounded-full border-2 border-white/40 flex items-center justify-center">
                              <svg className="h-3.5 w-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <span className="text-white/70 text-[11px]">{post.views}</span>
                            <span className="text-white/40 text-[10px]">♫ Trending audio</span>
                          </div>
                        )}
                        {post.type === 'text' && (
                          <div className="rounded-xl p-3" style={{ background: post.bg, height: 134 }}>
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <div className="h-5 w-5 rounded-full bg-white/30" />
                              <div className="h-1.5 w-20 rounded-full bg-white/30" />
                            </div>
                            <div className="space-y-1.5 mb-2.5">
                              <div className="h-1.5 w-full rounded-full bg-white/20" />
                              <div className="h-1.5 w-4/5 rounded-full bg-white/20" />
                              <div className="h-1.5 w-3/5 rounded-full bg-white/20" />
                            </div>
                            <div className="text-white/70 text-[11px]">👍 {post.likes}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Floating platform pills */}
              {[
                { name: 'Instagram', color: '#E4405F', style: { top: -16, left: 8 }, delay: 0 },
                { name: 'TikTok', color: '#FE2C55', style: { top: -16, right: 12 }, delay: 0.7 },
                { name: 'Facebook', color: '#1877F2', style: { bottom: -16, left: 12 }, delay: 1.4 },
                { name: 'LinkedIn', color: '#0A66C2', style: { bottom: -16, right: 8 }, delay: 2.1 },
              ].map((p, i) => (
                <motion.span
                  key={p.name}
                  animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                  className="absolute px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg"
                  style={{
                    background: p.color,
                    border: `1px solid ${p.color}60`,
                    ...p.style,
                  }}
                >
                  {p.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
