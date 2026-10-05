// EN root layout (BUILD §1.3). Core W1 → Motion W2a adds the (M) lines, then frozen.
// No chrome here: every page renders <PageShell> (§2.3).
import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/tokens.css'
import '@/motion/motion.css' // (M) right after tokens.css
import { outfit, bricolage, martian } from '@/styles/fonts'
import { SITE_URL } from '@/lib/services'
import { WebVitals } from '@/lib/web-vitals'
import { DayDial } from '@/motion/primitives' // (M)
import { SiteObserver } from '@/motion/SiteObserver' // (M)
import { RichGate } from '@/motion/RichGate' // (M)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: { siteName: 'Logink', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${bricolage.variable} ${martian.variable}`} suppressHydrationWarning>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54VQ85P3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <a href="#main" className="skip-link">Skip to content</a>
        <DayDial />
        {children}
        <SiteObserver />
        <RichGate />
        <WebVitals />
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-54VQ85P3');`}
        </Script>
      </body>
    </html>
  )
}
