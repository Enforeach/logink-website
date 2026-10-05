// Unmatched URLs across both frontend roots (experimental.globalNotFound; BUILD §3.9 404, owner Blog pkg).
// It bypasses layouts, so it imports tokens.css and the fonts itself: no motion.css, no client JS.
import type { Metadata } from 'next'
import '@/styles/tokens.css'
import { outfit, bricolage, martian } from '@/styles/fonts'
import { NotFoundPage } from '@/components/sections/notfound/NotFoundPage'
import { NF } from '@/content/notfound'

export const metadata: Metadata = {
  title: { absolute: NF.title.id },
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <html lang="id" className={`${outfit.variable} ${bricolage.variable} ${martian.variable}`}>
      <body>
        <main id="main" data-sky="light">
          <NotFoundPage locale="id" standalone />
        </main>
      </body>
    </html>
  )
}
