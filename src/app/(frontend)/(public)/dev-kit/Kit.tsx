// Dev-only design-system kit (BUILD §5.5): every ds primitive on each of the six grounds, inside the real
// PageShell chrome. Rendered by /dev-kit (ID) and /en/dev-kit (EN); both 404 in production builds.
import { FrontPageTitle, SplitHeading } from '@/motion/primitives'
import { SOURCES, WA_PATTERNS, page, svc, type Locale } from '@/lib/services'
import type { Ground } from '@/styles/tailwind.tokens'
import { PageShell } from '@/components/ds/chrome/PageShell'
import { Section } from '@/components/ds/Section'
import { Dateline } from '@/components/ds/Dateline'
import { H1Svc } from '@/components/ds/H1Svc'
import { ClockNumeral } from '@/components/ds/ClockNumeral'
import { Stabilo } from '@/components/ds/Stabilo'
import { StageStrip } from '@/components/ds/StageStrip'
import { Chip } from '@/components/ds/Chip'
import { Button } from '@/components/ds/Button'
import { WaButton } from '@/components/ds/WaButton'
import { TextLink } from '@/components/ds/TextLink'
import { Icon, type IconName } from '@/components/ds/Icon'
import { Figure } from '@/components/ds/Figure'
import { DataTable } from '@/components/ds/DataTable'
import { Faq } from '@/components/ds/Faq'
import { FaqSection } from '@/components/ds/FaqSection'
import { FactList } from '@/components/ds/FactList'
import { AnswerBlock } from '@/components/ds/AnswerBlock'
import { SourcedStat } from '@/components/ds/SourcedStat'
import { Price } from '@/components/ds/Price'
import { Badge } from '@/components/ds/Badge'
import { Breadcrumbs } from '@/components/ds/Breadcrumbs'
import { Toc } from '@/components/ds/Toc'
import { Input, Select, Textarea, CheckboxGroup, Honeypot } from '@/components/ds/Field'
import { JsonLd } from '@/components/ds/JsonLd'
import { ProcessStack } from '@/components/ds/ProcessStack'
import { CrossSell } from '@/components/ds/CrossSell'
import { ServicesTable } from '@/components/ds/ServicesTable'
import { ModeChoice } from '@/components/ds/ModeChoice'
import { webPageNode } from '@/lib/meta'

const GROUNDS: { g: Ground; hour: string; name: string; still?: 'jam-0700-seo' | 'jam-1240-sosial' | 'jam-2030-iklan' }[] = [
  { g: 'putih', hour: '1240', name: 'Putih', still: 'jam-1240-sosial' },
  { g: 'kertas', hour: '0700', name: 'Kertas', still: 'jam-0700-seo' },
  { g: 'senja', hour: '1805', name: 'Senja' },
  { g: 'senja-dalam', hour: '1805', name: 'Senja Dalam' },
  { g: 'malam', hour: '2130', name: 'Malam', still: 'jam-2030-iklan' },
  { g: 'malam-dalam', hour: '2130', name: 'Malam Dalam' },
]
const ICONS: IconName[] = ['arrow-right', 'arrow-up-right', 'whatsapp', 'plus', 'minus', 'check', 'alert', 'play', 'pause', 'menu', 'close']
const S = {
  id: { lead: 'Setiap teks duduk di permukaan datar. Tautan selalu bergaris bawah, tombol hanya Aspal, Cahaya, atau hijau WhatsApp.', q: 'Berapa lama hasil SEO terlihat?', a: 'Biasanya tiga sampai enam bulan untuk kata kunci bersaing sedang. Kami melaporkan perkembangan setiap bulan dengan data Google Search Console.' },
  en: { lead: 'Every text sits on a flat surface. Links are always underlined; buttons are only Aspal, Cahaya or WhatsApp green.', q: 'How long until SEO shows results?', a: 'Usually three to six months for mid-competition keywords. We report progress every month with Google Search Console data.' },
}
const paper = (g: Ground) => g === 'putih' || g === 'kertas'

function GroundBlock({ l, g, hour, name, still, first }: { l: Locale; first: boolean } & (typeof GROUNDS)[number]) {
  const src = SOURCES[0]
  return (
    <Section hour={hour} ground={g} id={`g-${g}`} labelledBy={`g-${g}-h`}>
      <div className="wrap grid-12 gap-y-8">
        <Dateline locale={l} hour={hour} right={`Ground · ${name}`} className="col-span-12" />
        <div className="col-span-12 grid gap-6 lg:col-span-7">
          {first ? (
            <H1Svc text={svc('seo').h1[l]} id={`g-${g}-h`} />
          ) : (
            <SplitHeading text={`${name}: ${l === 'id' ? 'semua primitif' : 'every primitive'}`} id={`g-${g}-h`} />
          )}
          <p className="t-lead">{paper(g) ? <Stabilo>{S[l].lead}</Stabilo> : S[l].lead}</p>
          <p className="t-body">
            Body <TextLink href="#g-kertas">{l === 'id' ? 'tautan teks' : 'text link'}</TextLink> · <TextLink href="/layanan" arrow>{svc('seo').name[l]}</TextLink>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#" cta="quote" placement="hero">{l === 'id' ? 'Minta Penawaran' : 'Request a Quote'}</Button>
            <WaButton text={WA_PATTERNS.generic[l]} placement="hero" />
            <Button href="#" variant="ghost">Ghost</Button>
            <Button href="#" variant="text">Text</Button>
            <Button href="#" size="sm">Small</Button>
            <WaButton text={WA_PATTERNS.generic[l]} placement="hero" size="sm" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['ditemukan', 'dipercaya', 'dikutip', 'dihubungi'] as const).map((st) => <Chip key={st} variant="stage" stage={st}>{st}</Chip>)}
            <Chip variant="source" href={src.url} year={src.year}>{src.src}</Chip>
            <Chip variant="engine">ChatGPT</Chip>
            <Chip variant="filter" href="#" current>Filter</Chip>
            <Chip variant="choice">Choice</Chip>
            {g === 'putih' ? <Badge kind="populer" locale={l} /> : null}
            <Badge kind="contoh" locale={l} />
          </div>
          <p className="flex flex-wrap gap-3 text-ink-2">{ICONS.map((n) => <Icon key={n} name={n} />)}</p>
          <FactList items={[{ k: l === 'id' ? 'Harga' : 'Price', v: <Price svc="seo" locale={l} lead /> }, { k: 'Social', v: <Price svc="social" locale={l} /> }]} />
          <DataTable caption={l === 'id' ? 'Tabel · contoh tata letak' : 'Table · layout sample'} head={['Paket', 'Harga', 'Laporan']} rowHeaders stack
            rows={[['Starter', <Price key="p" svc="seo" locale={l} />, 'Bulanan'], ['Growth', <Price key="p" svc="localseo" locale={l} />, 'Bulanan']]} />
          <Faq items={[{ q: S[l].q, a: S[l].a }]} />
          {paper(g) ? (
            <AnswerBlock locale={l} heading={l === 'id' ? 'Jawaban singkat' : 'Short answer'} text={S[l].a} updated={svc('seo').updated} reviewer={null} />
          ) : null}
        </div>
        <div className="col-span-12 grid content-start gap-6 lg:col-span-4 lg:col-start-9">
          <ClockNumeral hour={hour} />
          <SourcedStat value="58%" text={src.text[l]} src={src.src} year={src.year} url={src.url} />
          {still ? <Figure asset={still} locale={l} sizes="(min-width:1024px) 30vw, 100vw" ratio="4/5" lamp={!paper(g)} wipe /> : null}
          <Breadcrumbs locale={l} items={[{ name: 'Beranda', href: '/' }, { name: 'Layanan', href: '/layanan' }, { name: svc('seo').name[l], href: '#' }]} />
        </div>
      </div>
    </Section>
  )
}

export function Kit({ locale: l }: { locale: Locale }) {
  const alt = { id: '/dev-kit', en: '/en/dev-kit' }
  return (
    <PageShell locale={l} alt={alt} wa={page('home').wa[l]} sky="light">
      <JsonLd graph={[webPageNode({ url: alt[l], name: 'Dev kit', locale: l })]} />
      <Section hour="0530" ground="putih" pad="sm">
        <div className="wrap grid gap-8">
          <Dateline locale={l} hour="0530" word="Kit" right="dev only · noindex" />
          {/* specimen of the home front-page cut; a second <h1> is tolerated on this dev-only, noindex page */}
          <div aria-hidden="true"><FrontPageTitle kicker="Agensi Digital Marketing 360° di Jakarta:" lines={[{ text: 'Ditemukan.' }, { text: 'Dipercaya.' }, { text: 'Dikutip AI.', wide: true }, { text: 'Dihubungi.' }]} /></div>
          <StageStrip locale={l} variant="strip" />
          <nav className="t-small flex flex-wrap gap-x-4">{GROUNDS.map((x) => <a key={x.g} className="link" href={`#g-${x.g}`}>{x.name}</a>)}</nav>
        </div>
      </Section>
      {GROUNDS.map((x, i) => <GroundBlock key={x.g} l={l} first={i === 0} {...x} />)}
      <Section hour="0600" ground="kertas" id="tabel" labelledBy="tabel-h">
        <div className="wrap grid gap-8">
          <Dateline locale={l} hour="0600" right="ServicesTable · ModeChoice · StageStrip loop" />
          <h2 id="tabel-h" className="t-h2">{l === 'id' ? 'Layanan dan harga' : 'Services and prices'}</h2>
          <ModeChoice locale={l} context="hub" />
          <ServicesTable locale={l} id="harga" />
          <StageStrip locale={l} variant="loop" active="ditemukan" svc="seo" />
          <CrossSell locale={l} keys={['ads', 'website', 'ai']} heading={l === 'id' ? 'Cocok dikombinasikan dengan' : 'Pairs well with'} />
        </div>
      </Section>
      <Section hour="1240" ground="putih" id="form" labelledBy="form-h">
        <div className="wrap grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-3"><Toc locale={l} numbered items={[{ id: 'g-putih', text: 'Putih', level: 2 }, { id: 'g-kertas', text: 'Kertas', level: 2 }, { id: 'form', text: 'Form', level: 2 }]} /></div>
          <form className="relative col-span-12 grid max-w-xl gap-5 lg:col-span-6 lg:col-start-5" action="#">
            <h2 id="form-h" className="t-h2">Field</h2>
            <Input label={l === 'id' ? 'Nama' : 'Name'} name="nama" autoComplete="name" />
            <Input label="Email" name="email" type="email" error={l === 'id' ? 'Email wajib diisi.' : 'Email is required.'} />
            <Select label={l === 'id' ? 'Layanan' : 'Service'} name="layanan" options={[{ value: 'seo', label: svc('seo').name[l] }, { value: '360', label: 'Kampanye 360°' }]} />
            <CheckboxGroup legend={l === 'id' ? 'Kanal' : 'Channels'} name="kanal" options={[{ value: 'seo', label: 'SEO' }, { value: 'ads', label: 'Ads' }]} checked={['seo']} />
            <Textarea label={l === 'id' ? 'Pesan' : 'Message'} name="pesan" hint={l === 'id' ? 'Opsional.' : 'Optional.'} />
            <Honeypot />
            <Button as="button" cta="form" placement="channel">{l === 'id' ? 'Kirim (contoh, tidak terkirim)' : 'Send (sample, not sent)'}</Button>
          </form>
        </div>
      </Section>
      <ProcessStack locale={l} hour="0445" heading={l === 'id' ? '30 hari pertama' : 'The first 30 days'} steps={[
        { when: 'Hari 1–3', title: 'Discovery', text: l === 'id' ? 'Audit akun dan tujuan.' : 'Account and goal audit.' },
        { when: 'Hari 4–7', title: l === 'id' ? 'Strategi' : 'Strategy', text: l === 'id' ? 'Rencana kanal dan KPI.' : 'Channel plan and KPIs.' },
        { when: 'Hari 8–30', title: l === 'id' ? 'Eksekusi' : 'Execution', text: l === 'id' ? 'Konten, iklan, laporan.' : 'Content, ads, reporting.' },
      ]} />
      <FaqSection locale={l} heading={l === 'id' ? 'Tanya jawab' : 'Questions and answers'} items={[{ q: S[l].q, a: S[l].a }]} />
    </PageShell>
  )
}
