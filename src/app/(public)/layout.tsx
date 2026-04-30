import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { SmoothScroll } from '@/components/public/SmoothScroll'
import { ToastProvider } from '@/components/ui/Toast'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <SmoothScroll>
        <Navbar locale="id" />
        <main className="flex-1">{children}</main>
        <Footer locale="id" />
        <WhatsAppButton />
      </SmoothScroll>
    </ToastProvider>
  )
}
