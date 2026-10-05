import { ldJson } from '@/lib/meta'

/** The page's one JSON-LD script, a single @graph. */
export function JsonLd({ graph }: { graph: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(graph) }} />
}
