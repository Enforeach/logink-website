// Pages → Home (src/content/home.ts; chat copy in sections/home/profiler-data.ts). Tabs follow the page order.
import { page } from '@/lib/services'
import { FAQ, FAQ_H, MORE, OUTCOME, PROFILER, SERVICES_H } from '@/content/home'
import { CHIP, UI } from '@/components/sections/home/profiler-data'
import { pageGlobal, pageTab, seoOf } from '../define'
import type { Overrides } from '../fields'

const paths = ['campaign', 'seo', 'localseo', 'ads', 'social', 'creative', 'website', 'ai']
// the chat tree nests deeply: short table names avoid "Exceeded max identifier length"
const chat: Overrides = Object.fromEntries(paths.flatMap((k, i) => [
  [k, { label: k === 'campaign' ? '360° campaign path' : `${k} path` }],
  [`${k}.name`, { label: 'Service name', description: 'Also printed in the WhatsApp brief.' }],
  [`${k}.confirm`, { label: 'Opening reply', description: 'Optional. Empty = "Baik, {name}…" from the Chat assistant tab.' }],
  [`${k}.qs`, { label: 'Questions (6)', description: 'Keep six questions and their order: the progress counter says "of 6".', dbName: `q${i}` }],
  [`${k}.qs.key`, { label: 'Internal key', readOnly: true }],
  [`${k}.qs.label`, { label: 'Name in the WhatsApp brief' }],
  [`${k}.qs.type`, { label: 'Answer type', type: 'select', options: [{ label: 'Pick one', value: 'single' }, { label: 'Pick several', value: 'multi' }] }],
  [`${k}.qs.text`, { label: 'Question' }],
  [`${k}.qs.opts`, { label: 'Answer buttons', dbName: `o${i}` }],
]))

export const HomePage = pageGlobal({
  slug: 'home-page',
  label: 'Home',
  group: 'Pages',
  description: 'The homepage. Tabs run in page order, top to bottom. Use the language picker (top right) to edit Bahasa Indonesia and English.',
  path: page('home').path,
  seo: seoOf(page('home')),
  tabs: [
    pageTab(page('home')),
    {
      name: 'hero',
      label: 'Hero',
      description: 'The first screen: the big lines, the sentence under them and the intro video button labels.',
      ov: {
        kicker: { label: 'Small line above the heading' },
        lines: { label: 'Big heading lines', description: 'Read together they are the page H1 (the Page tab). Keep four lines.' },
        'lines.text': { label: 'Line' },
        'lines.wide': { skip: true },
        sentence: { label: 'Sentence under the heading' },
        filmLabels: { label: 'Intro video button', description: 'Read by screen readers on the pause/play control of the hero video.' },
        'filmLabels.pause': { label: 'Pause label' },
        'filmLabels.play': { label: 'Play label' },
      },
    },
    {
      label: 'Services',
      description: 'The service cards. Names, links and prices come from the services; here you edit the heading and each one-line outcome.',
      defs: [{ servicesH: SERVICES_H, outcome: OUTCOME }],
      ov: {
        servicesH: { label: 'Heading' },
        'servicesH.label': { label: 'Small label above the heading' },
        'servicesH.h2': { label: 'Heading' },
        outcome: { label: 'One-line outcome per service', description: 'Shown on each service card. Also listed on the About page.' },
      },
    },
    {
      name: 'c360',
      label: '360° campaign',
      description: 'The "one campaign, every channel" section. The four pillar titles come from Shared → 360° campaign.',
      ov: {
        h2: { label: 'Heading' },
        lead1: { label: 'Highlighted sentence' },
        lead4: { label: 'Sentence after it' },
        pillarsLabel: { label: 'Screen-reader name of the pillar list' },
        pillarLine: { label: 'Line under each pillar', description: 'Four lines, in the order of the pillars (Shared → 360° campaign → Pillars). Keep four.' },
        'pillarLine.line': { label: 'Line' },
        one: { label: 'Button: start with one service' },
        video: { label: '360° video button', description: 'Read by screen readers on the pause/play control.' },
        'video.pause': { label: 'Pause label' },
        'video.play': { label: 'Play label' },
      },
    },
    {
      name: 'process',
      label: 'Process',
      description: 'The "how we work" steps, in three groups. Also used on the About page and the SEO service page.',
      ov: {
        label: { label: 'Small label above the heading' },
        h2: { label: 'Heading' },
        lead: { label: 'Sentence under the heading' },
        groups: { label: 'Step groups', description: 'Three groups: before signing, your decision, after approval. Keep three.' },
        'groups.label': { label: 'Group name' },
        'groups.steps': { label: 'Steps' },
        'groups.steps.t': { label: 'Step name' },
        'groups.steps.d': { label: 'Step description' },
        'groups.steps.sign': { skip: true },
      },
    },
    {
      name: 'proof',
      label: 'Case studies',
      description: 'The heading texts around the case study row. The cases themselves are in Blog & Portfolio → Case studies.',
      ov: {
        label: { label: 'Small label above the heading' },
        h2: { label: 'Heading' },
        lede: { label: 'Sentence under the heading' },
        all: { label: 'Link text: see all case studies' },
      },
    },
    {
      label: 'FAQ',
      description: 'Questions and answers at the bottom of the page. They also feed Google’s FAQ markup.',
      defs: [{ faqH: FAQ_H, faq: FAQ }],
      ov: {
        faqH: { label: 'Section heading' },
        faq: { label: 'Questions' },
        'faq.q': { label: 'Question' },
        'faq.a': { label: 'Answer', description: '40 to 80 words; the first sentence should answer the question.' },
      },
    },
    {
      label: 'Other labels',
      defs: [{ more: MORE }],
      ov: { more: { label: '"Read more" button', description: 'Opens the longer text on pages that collapse it (also on service pages).' } },
    },
    {
      label: 'Chat assistant',
      description: 'The guided WhatsApp chat. It is built but not shown on the homepage at the moment; edit it here so it is ready when it returns.',
      defs: [{ profiler: PROFILER, chips: CHIP, chatUi: UI }],
      ov: {
        profiler: { label: 'Card texts' },
        'profiler.h2': { label: 'Heading' },
        'profiler.first': { label: 'First chat message' },
        'profiler.chip360': { label: '360° button' },
        'profiler.orOne': { label: 'Line before the service buttons' },
        'profiler.bot': { label: 'Assistant name' },
        chips: { label: 'Service buttons' },
        chatUi: { label: 'Chat messages & form', description: 'Keep the {words in braces}: {name} = the visitor’s first name, {n} = number of choices, {i} = question number.' },
        'chatUi.confirm': { label: 'Opening reply ({name} = service name)' },
        'chatUi.contact1': { label: 'After the questions, line 1' },
        'chatUi.contact2': { label: 'After the questions, line 2' },
        'chatUi.done1': { label: 'Thank-you ({name} = visitor name)' },
        'chatUi.done2': { label: 'Thank-you, line 2' },
        'chatUi.seoRedirect': { label: 'Reply when SEO visitor has no website' },
        'chatUi.lastQ': { label: 'Prefix of the last question' },
        'chatUi.multi': { label: 'Continue button ({n} = choices)' },
        'chatUi.sent': { label: 'Visitor message after sending' },
        'chatUi.restart': { label: 'Start over button' },
        'chatUi.typing': { label: 'Typing indicator' },
        'chatUi.step': { label: 'Progress ({i} = question number)' },
        'chatUi.form': { label: 'Contact form labels' },
        'chatUi.form.nama': { label: 'Name' },
        'chatUi.form.bisnis': { label: 'Business' },
        'chatUi.form.email': { label: 'Email' },
        'chatUi.form.wa': { label: 'WhatsApp' },
        'chatUi.form.submit': { label: 'Send button' },
        'chatUi.form.req': { label: '"required" word' },
      },
    },
    {
      name: 'chat',
      label: 'Chat questions',
      description: 'The six questions per service in the guided chat (not shown on the homepage at the moment). Each language has its own questions.',
      rootLocalized: true,
      ov: chat,
    },
  ],
})
