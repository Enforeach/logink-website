import type { Config } from 'tailwindcss'
import { theme } from './src/styles/tailwind.tokens'

// Route-group parentheses are written [(]…[)]: backslash escapes match 0 files in Tailwind 3.4.19.
// Never scan (payload), src/collections, src/components/public (legacy) or docs/.
export default {
  content: [
    './src/app/[(]frontend[)]/**/*.{ts,tsx}',
    './src/app/global-not-found.tsx',
    './src/components/ds/**/*.{ts,tsx}',
    './src/components/instruments/**/*.{ts,tsx}',
    './src/components/sections/**/*.{ts,tsx}',
    './src/motion/**/*.{ts,tsx}',
  ],
  theme,
  corePlugins: { container: false },
} satisfies Config
