// E5 · AI answer card: engines as plain text chips, the question (a customer quote), the answer as RevealWords
// (45 ms per word, capped at 600 ms) and numbered citation chips (1)(2)(3); chip (2) contohkedai.id carries a
// 1px jingga ring. Used on: home Bab III and the AI page (inside ProofLoupe with AnnotationLayer), AI hero, Phone 'ai'.
import type { Locale } from '@/lib/services'
import { RevealWords } from '@/motion/primitives'
import { AI, AI_QUESTION, ENGINES } from '@/content/instruments'
import { MockFrame, v, type MockGround } from './MockFrame'

type Size = 'full' | 'phone'

export function AiAnswerBody({ locale: l, size = 'full' }: { locale: Locale; size?: Size }) {
  return (
    <>
      {size === 'full' ? (
        <div className="flex flex-wrap gap-1.5">{ENGINES.map((e) => <span key={e} className="m-chip m-mono">{e}</span>)}</div>
      ) : null}
      <p className="ml-auto max-w-[88%] rounded bg-surface-alt px-3 py-2">{AI_QUESTION}</p>
      <div className="m-ai"><RevealWords text={AI.answer[l]} /></div>
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        <span className="m-cap mr-1">{AI.sources[l]}</span>
        {AI.cites.map((c) => (
          <span key={c.n} className={c.hit ? 'lk-cite lk-cite--hit lk-w m-cite' : 'lk-cite lk-w m-cite'} style={v({ '--i': c.n - 1 })}>
            <span>({c.n}) {c.t[l]}</span>
          </span>
        ))}
      </div>
    </>
  )
}

export function AiAnswer({ locale: l, size = 'full', ground = 'putih', className }: { locale: Locale; size?: Size; ground?: MockGround; className?: string }) {
  return (
    <MockFrame locale={l} ground={ground} className={className}>
      <AiAnswerBody locale={l} size={size} />
    </MockFrame>
  )
}
