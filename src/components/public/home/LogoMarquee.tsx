import Image from 'next/image'
import { getClientLogos } from '@/payload/queries'
import { type Locale, t } from '@/lib/i18n'

// Data-driven "Trusted by" strip. Renders nothing while there are no active
// client logos in the CMS, so the section stays hidden until the team adds
// logos in Payload (Content → Client Logos), then it appears automatically.
export async function LogoMarquee({ locale = 'id' }: { locale?: Locale }) {
  let logos: Awaited<ReturnType<typeof getClientLogos>> = []
  try {
    logos = await getClientLogos()
  } catch {
    logos = []
  }
  if (!logos.length) return null

  const label = t(locale, 'home.trustedBy')

  return (
    <section className="relative py-8 bg-[var(--bg-base)] border-y border-[var(--border-default)]">
      <p className="eyebrow text-center mb-5">{label}</p>

      <div
        className="marquee-container"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="marquee-track">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={`${logo.id}-${i}`}
              className="inline-flex items-center mx-10 h-8 select-none grayscale opacity-60 transition-all duration-200 hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={logo.logo as string}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-8 w-auto object-contain"
                unoptimized={(logo.logo as string).endsWith('.svg')}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
