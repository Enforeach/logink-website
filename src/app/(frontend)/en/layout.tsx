import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'
import { ToastProvider } from '@/components/ui/Toast'
import { SetLang } from './SetLang'

// Nested layouts must not render <html>/<body> — the root layout owns them.
// The old nested <html lang="en"> caused a hydration mismatch that dropped
// the font variables on /en.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <SetLang lang="en" />
      <Navbar locale="en" />
      <main className="flex-1">{children}</main>
      <Footer locale="en" />
      <WhatsAppButton />
    </ToastProvider>
  )
}
