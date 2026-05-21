import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { company, navItems } from '../data/site'
import { useContent } from '../context/ContentContext'
import Logo from './Logo'
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from './SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()
  const { services } = useContent()

  const socials = [
    { icon: InstagramIcon, href: company.social.instagram, label: 'Instagram' },
    { icon: FacebookIcon, href: company.social.facebook, label: 'Facebook' },
    { icon: LinkedinIcon, href: company.social.linkedin, label: 'LinkedIn' },
    { icon: TwitterIcon, href: company.social.twitter, label: 'Twitter' },
  ]

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-px grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
            {company.description}
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-ink-300 transition-all hover:bg-brand-500 hover:text-white"
              >
                <s.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Kurumsal
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-ink-400 transition-colors hover:text-brand-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Hizmetler
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/hizmetler"
                  className="text-ink-400 transition-colors hover:text-brand-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            İletişim
          </h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
              <span className="text-ink-400">{company.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brand-500" />
              <a
                href={company.phoneHref}
                className="text-ink-400 transition-colors hover:text-brand-400"
              >
                {company.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand-500" />
              <a
                href={company.emailHref}
                className="text-ink-400 transition-colors hover:text-brand-400"
              >
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-500 sm:flex-row">
          <p>
            © {year} {company.name}. Tüm hakları saklıdır.
          </p>
          <p>
            Modern inşaat ve dekorasyon çözümleri · İstanbul
          </p>
        </div>
      </div>
    </footer>
  )
}
