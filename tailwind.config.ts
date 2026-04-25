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
          dark: '#0F0A1E',
          'dark-surface': '#1A1530',
          warm: '#FFF7ED',
          cream: '#FFF9F2',
          'cream-surface': '#F8F6F2',
          violet: '#7C3AED',
          pink: '#DB2777',
          amber: '#D97706',
          gold: '#F59E0B',
          'light-violet': '#A78BFA',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
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
        'gradient-brand': 'linear-gradient(135deg, #7C3AED, #DB2777)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #7C3AED33 0px, transparent 50%), radial-gradient(at 80% 0%, #DB277733 0px, transparent 50%), radial-gradient(at 0% 50%, #D9770633 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
