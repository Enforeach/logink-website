'use client'

import Link from 'next/link'

const CATEGORIES = [
  {
    label: 'Grafis Social Media',
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
    label: 'Identitas Brand',
    accent: 'linear-gradient(135deg,#231A26,#3D2A44)',
    preview: (
      <div className="flex flex-col gap-3 p-4 h-full justify-center">
        <div className="h-12 w-12 rounded-full gradient-bg mx-auto flex items-center justify-center text-white font-black text-lg">L</div>
        <div className="flex justify-center gap-1.5">
          {['#A8138F','#D81C5C','#F88438','#F5A623'].map(c => (
            <div key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="text-center text-white/60 text-sm font-bold">Aa Bb Cc</div>
      </div>
    ),
  },
  {
    label: 'Produksi Video',
    accent: 'linear-gradient(135deg,#F88438,#F5A623)',
    preview: (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current ml-0.5"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div className="p-2">
          <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-2/5 rounded-full bg-brand-gold" />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Motion Graphics',
    accent: 'linear-gradient(135deg,#D81C5C,#A855F7)',
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
                borderColor: i === 0 ? '#D81C5C' : i === 1 ? '#EE3D5E' : '#A855F7',
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
    accent: 'linear-gradient(135deg,#2D1F33,#4A2E55)',
    preview: (
      <div className="flex flex-col gap-2 p-4 h-full justify-center">
        {[85,60,90,45,75].map((w,i) => (
          <div key={i} className="h-2 rounded-full bg-white/20" style={{ width: `${w}%` }} />
        ))}
        <div className="mt-2 self-start px-3 py-1 rounded-lg bg-white/20 text-white/90 text-xs font-bold">CTA →</div>
      </div>
    ),
  },
  {
    label: 'Cetak & Kolateral',
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

const SHOWCASE_COPY = {
  id: { eyebrow: 'Karya Kami', heading: 'Apa yang kami buat.', portfolio: 'Lihat portfolio lengkap →', href: '/portfolio' },
  en: { eyebrow: 'Our Work', heading: 'What we make.', portfolio: 'See full portfolio →', href: '/en/portfolio' },
}

export function CreativeShowcase({ locale = 'id' }: { locale?: 'id' | 'en' }) {
  const c = SHOWCASE_COPY[locale]
  return (
    <section className="py-20 md:py-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="eyebrow mb-3">{c.eyebrow}</div>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
            {c.heading}
          </h2>
          <Link href={c.href} className="text-sm font-semibold text-brand-crimson hover:text-brand-coral transition-colors">
            {c.portfolio}
          </Link>
        </div>
      </div>

      {/* Horizontal-scroll media gallery (marquee) */}
      <div className="marquee-container relative" style={{ maskImage: 'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)' }}>
        <div className="marquee-track gap-5 pr-5">
          {ITEMS.map((cat, i) => (
            <div
              key={`${cat.label}-${i}`}
              className="group relative flex-shrink-0 w-56 rounded-2xl overflow-hidden border border-[var(--border-default)] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_-16px_rgba(35,26,38,0.25)]"
              style={{ height: 240 }}
            >
              {/* Media tile */}
              <div
                className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ background: cat.accent }}
              >
                {cat.preview}
              </div>
              {/* Gradient overlay caption reveal */}
              <div
                className="absolute inset-x-0 bottom-0 flex items-end p-4 pt-12 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(35,26,38,0.72))' }}
              >
                <span className="text-sm font-display font-semibold text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {cat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
