import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

type Crumb = { label: string; to?: string }

type PageHeroProps = {
  title: string
  subtitle?: string
  crumbs?: Crumb[]
}

export default function PageHero({ title, subtitle, crumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-28 pb-16 text-white sm:pt-32 sm:pb-20">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand-700/10 blur-3xl" />

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {crumbs && (
            <nav className="mb-5 flex items-center gap-1.5 text-sm text-ink-400">
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  {c.to ? (
                    <Link
                      to={c.to}
                      className="transition-colors hover:text-brand-400"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-ink-600" />
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-ink-300">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
