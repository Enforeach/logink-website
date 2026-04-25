'use client'

const LOGOS = [
  'Tokopedia', 'Shopee', 'Gojek', 'Traveloka', 'Bukalapak',
  'OVO', 'Grab', 'Lazada', 'Blibli', 'Tiket.com',
]

export function LogoMarquee() {
  return (
    <section className="relative py-6" style={{ background: '#0A0716' }}>
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED40, #DB277740, transparent)' }} />
      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7C3AED40, #DB277740, transparent)' }} />

      {/* Label */}
      <p className="text-center text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
        Trusted by leading Indonesian brands
      </p>

      {/* Marquee with edge fade */}
      <div
        className="marquee-container"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="marquee-track">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span
              key={i}
              className="inline-block mx-10 text-sm font-semibold uppercase tracking-widest select-none transition-all duration-200 hover:opacity-70 cursor-default"
              style={{ opacity: 0.3, color: 'var(--text-primary)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.3')}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
