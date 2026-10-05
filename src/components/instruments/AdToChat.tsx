// E11 · Ad → WhatsApp chat. A neutral feed ad card (no platform chrome) whose green <span> "Kirim pesan
// WhatsApp" presses once, then the chat window: bubbles rise in their masks 450 ms apart (lk-chat). Chat lines
// are customer/kedai quotes, Indonesian in both locales. Home Bab IV shows 2 bubbles (§11 4.7); default 3.
// Used on: home Bab IV, Paid Ads; ChatBody is the Phone 'whatsapp' screen.
import type { Locale } from '@/lib/services'
import { mediaFile } from '@/lib/assets'
import { ADCHAT, CHAT, KEDAI, MOCK_LABEL, MOCK_LABEL_PHOTO } from '@/content/instruments'
import { MockFrame, v, type MockGround } from './MockFrame'

export function ChatBody({ bubbles = 3 }: { bubbles?: 2 | 3 }) {
  const lines = [{ t: CHAT.out, out: true }, { t: CHAT.reply, out: false }, { t: CHAT.out2, out: true }].slice(0, bubbles)
  return (
    <>
      <div className="flex items-center gap-2 border-b border-hair pb-2">
        <span className="m-av" aria-hidden="true">KC</span>
        <b className="font-650">{KEDAI}</b>
      </div>
      <ol className="m-chat lk-chat">
        {lines.map((b, i) => (
          <li key={i}><span className={b.out ? 'out' : 'in'} style={v({ '--i': i })}>{b.t}</span></li>
        ))}
      </ol>
    </>
  )
}

export function AdToChat({ locale: l, bubbles = 3, ground = 'malam-dalam', className }: { locale: Locale; bubbles?: 2 | 3; ground?: MockGround; className?: string }) {
  const photo = mediaFile('ig', 'tile-3')
  return (
    <MockFrame locale={l} ground={ground} className={className} label={(photo ? MOCK_LABEL_PHOTO : MOCK_LABEL)[l]}>
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <div data-ground="putih" className="m-box grid gap-2">
          <div className="flex items-center gap-2">
            <span className="m-av" aria-hidden="true">KC</span>
            <span className="grid"><b className="font-650">{KEDAI}</b><span className="m-xs text-ink-2">{ADCHAT.sponsored[l]}</span></span>
          </div>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- pre-encoded 480px ig tile served as-is (BUILD §2.2 rule 9)
            <img src={photo.src} width={photo.w} height={photo.h} alt={photo.alt?.[l] ?? ''} loading="lazy" decoding="async" className="aspect-[2/1] w-full rounded object-cover sm:aspect-[4/3]" />
          ) : (
            <i className="block aspect-[2/1] bg-surface-alt sm:aspect-[4/3]" aria-hidden="true" />
          )}
          <b className="font-650">{ADCHAT.headline[l]}</b>
          <span className="m-btn m-wa m-press">{ADCHAT.cta[l]}</span>
        </div>
        <div className="m-box grid gap-3"><ChatBody bubbles={bubbles} /></div>
      </div>
    </MockFrame>
  )
}
