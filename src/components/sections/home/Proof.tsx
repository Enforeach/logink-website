// 05 Proof (owner 2026-10-04: proof once): the real case studies from Payload as a drag row of typographic covers
// (no metric unless the slug is in APPROVED_CASE_SLUGS) and real client logos only when 6+ exist. Never an invented
// result. Owner 2026-10-04: no 'Cara kami mengukur' panel here; no cases at all: no section.
import Link from 'next/link'
import { getPortfolioList } from '@/payload/queries'
import { APPROVED_CASE_SLUGS, page, type Locale } from '@/lib/services'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { CaseFileRow } from '@/components/ds/CaseCover'
import { ClientLogos } from '@/components/ds/ClientLogos'
import { Icon } from '@/components/ds/Icon'
import { PROOF } from '@/content/home'
import { toCard } from '../case/clean' // the Hubs cleaner: strips the CMS data defects before a title is shown

export async function Proof({ locale: l }: { locale: Locale }) {
  const cards = (await getPortfolioList().catch(() => [])).map((cs) => toCard(cs, l, APPROVED_CASE_SLUGS))
  if (!cards.length) return null
  return (
    <Section hour="0700" ground="putih" id="bukti" labelledBy="bukti-h">
      <div className="wrap grid gap-6">
        <div className="grid max-w-lead gap-3">
          <Dateline locale={l} label={PROOF.label[l]} />
          <h2 id="bukti-h" className="t-h2">{PROOF.h2[l]}</h2>
          <p className="t-lead">{PROOF.lede[l]}</p>
        </div>
        <CaseFileRow locale={l} cases={cards} />
        <ClientLogos locale={l} />
        <Link href={page('portfolio').path[l]} className="link t-ui inline-flex min-h-tap items-center gap-2 justify-self-start font-650">
          {PROOF.all[l]}<Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </Section>
  )
}
