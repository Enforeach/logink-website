const LOGOS = [
  'Tokopedia', 'Shopee', 'Gojek', 'Traveloka', 'Bukalapak',
  'OVO', 'Grab', 'Lazada', 'Blibli', 'Tiket.com',
]

export function LogoMarquee() {
  return (
    <section className="relative py-8 bg-[var(--bg-base)] border-y border-[var(--border-default)]">
      {/* Eyebrow */}
      <p className="eyebrow text-center mb-5">
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
              className="inline-block mx-10 text-sm font-semibold uppercase tracking-widest select-none cursor-default grayscale opacity-60 text-[var(--text-secondary)] transition-all duration-200 hover:grayscale-0 hover:opacity-100 hover:text-[var(--text-primary)]"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
