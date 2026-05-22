import { useId } from 'react'

type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
}

// Stacked gold chevrons — the AKAT Teknik İnşaat brand mark.
function ChevronMark({ className = '' }: { className?: string }) {
  const id = useId()
  const grad = `akat-gold-${id}`
  const rows = [0, 1, 2, 3, 4]
  return (
    <svg viewBox="0 0 120 116" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ecd28a" />
          <stop offset="45%" stopColor="#cda04a" />
          <stop offset="100%" stopColor="#9a6f28" />
        </linearGradient>
      </defs>
      {rows.map((i) => {
        const apexY = 12 + i * 13
        return (
          <path
            key={i}
            d={`M16 ${apexY + 26} L60 ${apexY} L104 ${apexY + 26}`}
            fill="none"
            stroke={`url(#${grad})`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const akatColor = variant === 'light' ? 'text-white' : 'text-ink-900'
  const subColor = variant === 'light' ? 'text-brand-300' : 'text-brand-600'

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <ChevronMark className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span
          className={`block font-serif text-2xl font-bold tracking-[0.12em] ${akatColor}`}
        >
          AKAT
        </span>
        <span
          className={`mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.22em] ${subColor}`}
        >
          Teknik İnşaat
        </span>
      </span>
    </span>
  )
}
