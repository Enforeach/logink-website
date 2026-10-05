/** Stage dot for cards: the key light of the parent Section, or of data-stage on the dot itself. */
export const Dot = ({ stage }: { stage?: string }) => (
  <i className="mt-[0.45em] inline-block h-2 w-2 shrink-0 rounded-full bg-key" data-stage={stage} aria-hidden="true" />
)
