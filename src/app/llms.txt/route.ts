// /llms.txt generated from the registry (BUILD §1.7): entity, the live services with their price text,
// key pages ID + EN, and the contact line. Replaces the old static public/llms.txt.
import { EMAIL, ENTITY, INSTAGRAM, PAGES, SITE_URL, WA_DISPLAY, liveServices } from '@/lib/services'
import { loadCms } from '@/cms/load'

export const revalidate = 3600

const abs = (p: string) => `${SITE_URL}${p === '/' ? '' : p}`

export async function GET() {
  await loadCms()
  const services = liveServices().map((s) => {
    const price = s.price?.en ?? s.quote?.en ?? ''
    return `- [${s.name.en}](${abs(s.path.en)}) · ID: [${s.name.id}](${abs(s.path.id)}): ${s.line.en} ${price}.`
  })
  const pages = PAGES.map((p) => `- [${p.title.en.replace(/ \| Logink$/, '')}](${abs(p.path.en)}) · ID: [${p.title.id.replace(/ \| Logink$/, '')}](${abs(p.path.id)})`)
  const body = [
    '# Logink',
    '',
    `> ${ENTITY.en}`,
    '',
    ENTITY.id,
    '',
    '## Services',
    '',
    ...services,
    '',
    '## Key pages',
    '',
    ...pages,
    '',
    '## Contact',
    '',
    `- WhatsApp (official, only number): ${WA_DISPLAY}`,
    `- Email: ${EMAIL}`,
    `- Instagram: ${INSTAGRAM}`,
    '- Location: Jakarta, Indonesia',
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
