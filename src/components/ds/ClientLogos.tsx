import Image from 'next/image'
import { getClientLogos } from '@/payload/queries'
import type { Locale } from '@/lib/services'

const H = { id: 'Klien Logink', en: 'Logink clients' }

/** Real client logos from Payload. Renders nothing below 6 (never padded with placeholders). */
export async function ClientLogos({ locale: l }: { locale: Locale }) {
  const logos = await getClientLogos().catch(() => [])
  if (logos.length < 6) return null
  return (
    <div>
      <p className="t-dateline text-ink-2">{H[l]}</p>
      <ul className="mt-4 grid grid-cols-3 items-center gap-6 sm:grid-cols-6">
        {logos.map((c) => (
          <li key={c.id}>
            <Image src={c.logo!} alt={c.name} width={c.width} height={c.height} sizes="160px" className="h-10 w-auto object-contain" />
          </li>
        ))}
      </ul>
    </div>
  )
}
