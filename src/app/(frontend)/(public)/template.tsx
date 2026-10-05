// Page cuts for this root (React <ViewTransition>, see src/motion/PageCut.tsx). Owner: Motion.
import type { ReactNode } from 'react'
import { PageCut } from '@/motion/PageCut'

export default function Template({ children }: { children: ReactNode }) {
  return <PageCut>{children}</PageCut>
}
