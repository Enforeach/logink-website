import type { ReactNode } from 'react'

/** Semburat highlight on citable passages. Paper grounds only (DESIGN §6). */
export function Stabilo({ children }: { children: ReactNode }) {
  return <mark className="stabilo">{children}</mark>
}
