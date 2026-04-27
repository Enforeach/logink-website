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

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.72)}
      viewBox="0 0 80 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={GRAD_ID_MARK} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DB2777" />
          <stop offset="45%" stopColor="#E879A0" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path
        d="M 14,44 C 5,38 4,22 16,12 C 28,2 52,4 64,18 C 74,30 70,46 56,50 C 44,54 32,46 36,34 C 40,24 56,24 58,38"
        stroke={`url(#${GRAD_ID_MARK})`}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LogoFull({ size = 32, theme = 'dark', className, suffix }: LogoFullProps) {
  const textH = size
  const markW = Math.round(size * 1.38)
  const gap = Math.round(size * 0.28)
  const fontSize = Math.round(size * 0.88)
  const svgW = markW + gap + Math.round(fontSize * (suffix ? 5.8 : 3.7))
  const svgH = size

  const logColor = theme === 'dark' ? '#FFFFFF' : '#0A0118'
  const inkColor = '#7C3AED'
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
        <linearGradient id={GRAD_ID_FULL} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DB2777" />
          <stop offset="45%" stopColor="#E879A0" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>

      {/* Mark */}
      <g transform={`scale(${size / 58})`}>
        <path
          d="M 14,44 C 5,38 4,22 16,12 C 28,2 52,4 64,18 C 74,30 70,46 56,50 C 44,54 32,46 36,34 C 40,24 56,24 58,38"
          stroke={`url(#${GRAD_ID_FULL})`}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
        {suffix && <tspan fill={theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)'} fontSize={Math.round(fontSize * 0.72)}> {suffix}</tspan>}
      </text>
    </svg>
  )
}
