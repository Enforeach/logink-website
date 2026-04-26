'use client'

import Link from 'next/link'

const CATEGORIES = [
  {
    label: 'Social Media Graphics',
    accent: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
    preview: (
      <div className="flex flex-col gap-2 p-4 h-full">
        <div className="rounded-xl flex-1" style={{ background: 'linear-gradient(135deg,#833ab4,#fd1d1d)' }} />
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="flex-1 h-10 rounded-lg bg-white/10" />)}
        </div>
      </div>
    ),
  },
  {
    label: 'Brand Identity',
    accent: 'linear-gradient(135deg,#1a0533,#2d1060)',
    preview: (
      <div className="flex flex-col gap-3 p-4 h-full justify-center">
        <div className="h-12 w-12 rounded-full gradient-bg mx-auto flex items-center justify-center text-white font-black text-lg">L</div>
        <div className="flex justify-center gap-1.5">
          {['#7C3AED','#DB2777','#D97706','#10B981'].map(c => (
            <div key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="text-center text-white/60 text-sm font-bold">Aa Bb Cc</div>
      </div>
    ),
  },
  {
    label: 'Video Production',
    accent: 'linear-gradient(135deg,#D97706,#F59E0B)',
    preview: (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current ml-0.5"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div className="p-2">
          <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-2/5 rounded-full bg-amber-400" />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Motion Graphics',
    accent: 'linear-gradient(135deg,#DB2777,#7C3AED)',
    preview: (
      <div className="flex h-full items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          {[0,1,2].map(i => (
            <div
              key={i}
              className="absolute rounded-full border-2 opacity-60"
              style={{
                width: `${(i+1)*30}%`,
                height: `${(i+1)*30}%`,
                borderColor: i === 0 ? '#DB2777' : i === 1 ? '#A855F7' : '#7C3AED',
                animation: `spin ${3 + i}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              }}
            />
          ))}
          <div className="h-4 w-4 rounded-full gradient-bg" />
        </div>
      </div>
    ),
  },
  {
    label: 'Copywriting',
    accent: 'linear-gradient(135deg,#1e1b4b,#312e81)',
    preview: (
      <div className="flex flex-col gap-2 p-4 h-full justify-center">
        {[85,60,90,45,75].map((w,i) => (
          <div key={i} className="h-2 rounded-full bg-white/20" style={{ width: `${w}%` }} />
        ))}
        <div className="mt-2 self-start px-3 py-1 rounded-lg bg-violet-500/40 text-white/80 text-xs font-bold">CTA →</div>
      </div>
    ),
  },
  {
    label: 'Print & Collateral',
    accent: 'linear-gradient(135deg,#0c4a2d,#14532d)',
    preview: (
      <div className="flex gap-2 p-4 h-full items-center justify-center">
        {[0,1,2].map(i => (
          <div
            key={i}
            className="flex-1 rounded-lg border border-white/20 bg-white/5"
            style={{ height: '70%', transform: `rotate(${(i-1)*5}deg)` }}
          />
        ))}
      </div>
    ),
  },
]

const ITEMS = [...CATEGORIES, ...CATEGORIES]

export function CreativeShowcase() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: '#0A0716' }}>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Our Craft</p>
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
            What we make.
          </h2>
          <Link href="/portfolio" className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors">
            View full portfolio →
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative" style={{ maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}>
        <div className="flex gap-4 animate-marquee w-max">
          {ITEMS.map((cat, i) => (
            <div
              key={`${cat.label}-${i}`}
              className="group flex-shrink-0 w-52 rounded-2xl border border-white/10 bg-[var(--bg-surface)] overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              style={{ height: 220 }}
            >
              <div className="h-3/4" style={{ background: cat.accent }}>
                {cat.preview}
              </div>
              <div className="h-1/4 flex items-center px-4">
                <span className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  {cat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
