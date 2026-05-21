import { company } from '../data/site'

type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink-900'
  const subColor = variant === 'light' ? 'text-ink-300' : 'text-ink-500'

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="#0f172a" />
        <path
          d="M14 46 V27 L32 14 L50 27 V46 Z"
          fill="none"
          stroke="#f98307"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M12 46 H52"
          stroke="#f98307"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="27" y="33" width="10" height="13" fill="#f98307" />
        <path
          d="M22 27 L32 20 L42 27"
          fill="none"
          stroke="#ffd989"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <span className="leading-none">
        <span
          className={`block font-display text-lg font-extrabold tracking-tight ${textColor}`}
        >
          {company.shortName}
          <span className="text-brand-500">.</span>
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.25em] ${subColor}`}
        >
          İnşaat
        </span>
      </span>
    </span>
  )
}
