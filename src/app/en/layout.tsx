import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { SmoothScroll } from '@/components/public/SmoothScroll'
import { ToastProvider } from '@/components/ui/Toast'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-outfit antialiased">
        <ToastProvider>
          <SmoothScroll>
            <Navbar locale="en" />
            <main className="flex-1">{children}</main>
            <Footer locale="en" />
            <WhatsAppButton />
          </SmoothScroll>
        </ToastProvider>
      </body>
    </html>
  )
}
