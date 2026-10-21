// Shared → 360° campaign (src/content/campaign.ts): the map, the table and the pillars shown on Home, Services hub and
// the service pages. The owner gates (K1…K11), edge wiring and the example strip stay in code.
import {
  CENTER, EDGES, EXTRAS, NODES, PILLARS, REPORT, STRATEGY,
} from '@/content/campaign'
import { pageGlobal } from '../define'

const fixed = (n: number) => ({ extra: { minRows: n, maxRows: n } })

export const CampaignContent = pageGlobal({
  slug: 'campaign-content',
  label: '360° campaign',
  group: 'Shared',
  description: 'The 360° campaign wording used on the homepage, the services hub and every service page. Use the language picker (top right) to edit both languages.',
  path: { id: '/', en: '/en' },
  tabs: [
    {
      label: 'Map & channel names',
      description: 'The ring diagram: the centre label and the name of each channel on it.',
      defs: [{ center: CENTER, nodes: NODES, strategy: STRATEGY, report: REPORT }],
      ov: {
        center: { label: 'Centre of the map' },
        nodes: { label: 'Channel names', description: 'The eight channels around the ring. Their order and position are fixed.', ...fixed(NODES.length) },
        'nodes.k': { skip: true },
        'nodes.hour': { skip: true },
        'nodes.label': { label: 'Name on the map' },
        strategy: { label: 'Word for "strategy"', description: 'Used in the connection table (e.g. "Campaign strategy").' },
        report: { label: 'Word for "report"', description: 'Used in the connection table.' },
      },
    },
    {
      label: 'Channel connections',
      description: 'The words on each arrow between two channels, as listed in the connection table.',
      defs: [{ edges: EDGES }],
      ov: {
        edges: { label: 'Connections', description: 'Which channel feeds which is fixed; edit only the wording. Some connections appear later, when the owner confirms them.', ...fixed(EDGES.length) },
        'edges.n': { skip: true },
        'edges.from': { skip: true },
        'edges.to': { skip: true },
        'edges.ok': { skip: true },
        'edges.gate': { skip: true },
        'edges.label': { label: 'Wording' },
      },
    },
    {
      label: 'Pillars',
      description: 'The four ideas that join the campaign. Shown on the homepage (with a short line each) and on the services hub (with the full text).',
      defs: [{ pillars: PILLARS }],
      ov: {
        pillars: { label: 'Pillars', description: 'Four pillars; keep four.', ...fixed(PILLARS.length) },
        'pillars.dt': { label: 'Title' },
        'pillars.dd': { label: 'Full text (services hub)' },
      },
    },
    {
      name: 'table',
      label: 'Connection table',
      description: 'The text table that explains which channel feeds which (readable by search engines and AI).',
      ov: {
        id: { skip: true },
        caption: { label: 'Table caption' },
        head: { label: 'Column headings', description: 'Three: channel, fed by, feeds.' },
        rowNote: { label: 'Notes next to a channel', description: 'Shown in brackets after the channel name.' },
        summary: { label: 'Button text that opens the table' },
        foot: { label: 'Line under the table' },
      },
    },
    {
      label: 'Table extras',
      description: 'The few table cells that point to the strategy or report rather than another channel.',
      defs: [{ extras: EXTRAS }],
      ov: {
        extras: { label: 'Cells', description: 'Fixed list; edit only the wording.', ...fixed(EXTRAS.length) },
        'extras.k': { skip: true },
        'extras.side': { skip: true },
        'extras.unless': { skip: true },
        'extras.item': { label: 'Cell' },
        'extras.item.k': { skip: true },
        'extras.item.label': { label: 'Wording' },
      },
    },
    {
      name: 'note',
      label: 'Service-page link',
      description: 'On each service page, the box “Position in the 360° campaign”.',
      ov: {
        title: { skip: true },
        priced: { skip: true },
        quoted: { skip: true },
        rest: { skip: true },
        link: { label: 'Link text to the 360° campaign' },
      },
    },
  ],
})
