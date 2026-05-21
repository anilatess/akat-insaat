import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  LogOut,
  ExternalLink,
  Menu,
  X,
  KeyRound,
  Mail,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Logo from '../Logo'

const navItems = [
  { to: '/admin', label: 'Genel Bakış', icon: LayoutDashboard, end: true },
  { to: '/admin/projeler', label: 'Projeler', icon: FolderKanban, end: false },
  { to: '/admin/hizmetler', label: 'Hizmetler', icon: Wrench, end: false },
  { to: '/admin/mesajlar', label: 'Mesajlar', icon: Mail, end: false },
  { to: '/admin/sifre', label: 'Şifre Değiştir', icon: KeyRound, end: false },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/giris')
  }

  const sidebar = (
    <>
      <div className="px-6 py-6">
        <Link to="/admin" onClick={() => setOpen(false)}>
          <Logo variant="light" />
        </Link>
        <p className="mt-1 text-xs text-ink-400">Yönetim Paneli</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'text-ink-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-5 w-5" />
          Siteyi Görüntüle
        </a>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut className="h-5 w-5" />
          Çıkış Yap
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-ink-950 lg:flex">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/60"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-ink-950">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-ink-200 bg-white px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 lg:hidden"
            aria-label="Menüyü aç"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-500">
              Hoş geldiniz,{' '}
              <span className="font-semibold text-ink-900">
                {user?.username}
              </span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
              {user?.username?.[0]?.toUpperCase()}
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Close button for mobile sidebar (floating) */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed right-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ink-900 shadow-lg lg:hidden"
          aria-label="Menüyü kapat"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
