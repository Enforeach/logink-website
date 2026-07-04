import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          // "Warm Canvas" palette — from the logo ribbon gradient
          magenta: '#A8138F',
          crimson: '#D81C5C',
          coral: '#EE3D5E',
          orange: '#F88438',
          purple: '#A855F7',
          cream: '#FDF8F3',
          'cream-surface': '#FFFFFF',
          peach: '#FBEFE4',
          rose: '#FBE9EF',
          lilac: '#F5EFFB',
          ink: '#231A26',
          // Legacy aliases (admin + not-yet-migrated code) → nearest new hue
          violet: '#A855F7',
          pink: '#D81C5C',
          amber: '#F88438',
          gold: '#F5A623',
          'light-violet': '#C084FC',
          dark: '#231A26',
          'dark-surface': '#2A2130',
          warm: '#FDF8F3',
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(100deg, #A8138F 0%, #D81C5C 35%, #EE3D5E 65%, #F88438 100%)',
        'gradient-cta': 'linear-gradient(100deg, #D81C5C, #F88438)',
        'gradient-mesh': 'radial-gradient(at 18% 12%, #F8843824 0px, transparent 50%), radial-gradient(at 82% 8%, #D81C5C1A 0px, transparent 45%), radial-gradient(at 65% 55%, #A855F712 0px, transparent 50%)',
      },
      boxShadow: {
        cta: '0 8px 24px -8px rgba(216, 28, 92, 0.45)',
        card: '0 16px 40px -16px rgba(35, 26, 38, 0.16)',
      },
    },
  },
  plugins: [],
}

export default config
