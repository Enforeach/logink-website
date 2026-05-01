import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { ToastProvider } from '@/components/ui/Toast'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-outfit antialiased">
        <ToastProvider>
          <Navbar locale="en" />
          <main className="flex-1">{children}</main>
          <Footer locale="en" />
          <WhatsAppButton />
        </ToastProvider>
      </body>
    </html>
  )
}
