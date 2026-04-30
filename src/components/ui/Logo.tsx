import { cn } from '@/lib/utils'

interface LogoMarkProps {
  size?: number
  className?: string
}

interface LogoFullProps {
  size?: number
  theme?: 'dark' | 'light'
  className?: string
  suffix?: string
}

const GRAD_ID_MARK = 'logink-mark-grad'
const GRAD_ID_FULL = 'logink-full-grad'

// viewBox 320×200 → aspect ratio 1.6
const MARK_PATH =
  'M 104.95 20 C 113.60 19.14 123.55 20.98 131.99 23.55 C 140.43 26.12 148.15 30.42 155.59 35.41 C 163.03 40.40 169.17 48.50 176.61 53.49 C 184.05 58.48 191.64 63.59 200.21 65.35 C 208.78 67.11 218.96 64.50 228.05 64.04 C 237.14 63.58 246.84 60.34 254.73 62.57 C 262.62 64.80 271.23 70.47 275.38 77.4 C 279.53 84.33 279.74 95.27 279.63 104.14 C 279.52 113.01 277.68 122.34 274.71 130.61 C 271.74 138.88 267.37 147.02 261.81 153.78 C 256.25 160.54 249.00 166.99 241.38 171.19 C 233.76 175.39 224.73 178.08 216.08 178.96 C 207.43 179.84 197.85 178.84 189.48 176.45 C 181.11 174.05 173.39 169.41 165.88 164.59 C 158.37 159.77 151.86 152.56 144.43 147.55 C 137.00 142.54 129.82 136.43 121.32 134.5 C 112.82 132.57 102.72 135.47 93.42 135.96 C 84.12 136.45 73.55 139.80 65.52 137.43 C 57.49 135.06 49.42 128.77 45.23 121.74 C 41.04 114.71 40.20 104.01 40.37 95.25 C 40.54 86.49 43.06 77.36 46.24 69.17 C 49.42 60.98 53.81 52.87 59.45 46.13 C 65.09 39.39 72.49 33.09 80.07 28.74 C 87.65 24.38 96.30 20.86 104.95 20 Z ' +
  'M 106.42 55.23 C 114.17 53.95 124.03 57.48 131.68 61.4 C 139.33 65.31 145.26 73.39 152.32 78.72 C 159.38 84.05 166.31 89.72 174.06 93.39 C 181.81 97.06 190.06 99.51 198.83 100.73 C 207.60 101.95 219.23 99.82 226.65 100.73 C 234.07 101.64 241.93 101.22 243.34 106.2 C 244.75 111.18 240.12 124.17 235.09 130.6 C 230.06 137.03 221.00 143.49 213.15 144.77 C 205.31 146.05 195.67 142.20 188.02 138.29 C 180.37 134.38 174.34 126.56 167.25 121.28 C 160.16 116.00 153.26 110.28 145.51 106.61 C 137.76 102.94 129.40 100.25 120.74 99.27 C 112.08 98.29 101.05 101.79 93.53 100.73 C 86.01 99.67 76.99 98.20 75.6 92.93 C 74.21 87.66 80.07 75.38 85.21 69.1 C 90.35 62.82 98.67 56.51 106.42 55.23 Z'

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  const w = Math.round(size * 1.6)
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={GRAD_ID_MARK} x1="40" y1="180" x2="280" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A8138F" />
          <stop offset="0.30" stopColor="#D81C5C" />
          <stop offset="0.65" stopColor="#EE3D5E" />
          <stop offset="1" stopColor="#F88438" />
        </linearGradient>
      </defs>
      <path fill={`url(#${GRAD_ID_MARK})`} fillRule="evenodd" d={MARK_PATH} />
    </svg>
  )
}

export function LogoFull({ size = 32, theme = 'dark', className, suffix }: LogoFullProps) {
  // mark: 320×200 scaled to `size` tall → width = size * 1.6
  const markW = Math.round(size * 1.6)
  const gap = Math.round(size * 0.28)
  const fontSize = Math.round(size * 0.88)
  const svgW = markW + gap + Math.round(fontSize * (suffix ? 5.8 : 3.7))
  const svgH = size

  const logColor = theme === 'dark' ? '#FFFFFF' : '#0A0118'
  const inkColor = '#A855F7'
  const textY = size * 0.82

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logink"
    >
      <defs>
        <linearGradient id={GRAD_ID_FULL} x1="40" y1="180" x2="280" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A8138F" />
          <stop offset="0.30" stopColor="#D81C5C" />
          <stop offset="0.65" stopColor="#EE3D5E" />
          <stop offset="1" stopColor="#F88438" />
        </linearGradient>
      </defs>

      {/* Mark scaled to fit size height */}
      <g transform={`scale(${size / 200})`}>
        <path fill={`url(#${GRAD_ID_FULL})`} fillRule="evenodd" d={MARK_PATH} />
      </g>

      {/* Text */}
      <text
        x={markW + gap}
        y={textY}
        fontFamily="var(--font-sans, -apple-system, system-ui, sans-serif)"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        <tspan fill={logColor}>Log</tspan>
        <tspan fill={inkColor}>ink</tspan>
        {suffix && (
          <tspan
            fill={theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)'}
            fontSize={Math.round(fontSize * 0.72)}
          >
            {' '}{suffix}
          </tspan>
        )}
      </text>
    </svg>
  )
}
