import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { company, navItems } from '../data/site'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkBase =
    'relative text-sm font-semibold transition-colors duration-200'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-18 items-center justify-between py-3">
        <Link to="/" aria-label={company.name}>
          <Logo variant={scrolled ? 'dark' : 'dark'} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? 'text-brand-600'
                      : 'text-ink-700 hover:text-brand-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={company.phoneHref}
            className="flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink-900 transition-colors hover:bg-ink-100 lg:hidden"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mx-4 mt-2 overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-2xl shadow-ink-900/10"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                          isActive
                            ? 'bg-brand-50 text-brand-700'
                            : 'text-ink-800 hover:bg-ink-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <a
                href={company.phoneHref}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 text-base font-semibold text-white"
              >
                <Phone className="h-5 w-5" />
                {company.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
