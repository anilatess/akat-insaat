import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FolderKanban, Wrench, Mail, MailWarning } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import { api } from '../../lib/api'

export default function Dashboard() {
  const { projects, services } = useContent()
  const [unread, setUnread] = useState<number | null>(null)

  useEffect(() => {
    api
      .unreadCount()
      .then((r) => setUnread(r.count))
      .catch(() => setUnread(null))
  }, [])

  const ongoing = projects.filter((p) => p.status === 'Devam Ediyor').length

  const cards = [
    {
      label: 'Toplam Proje',
      value: projects.length,
      icon: FolderKanban,
      color: 'bg-brand-500',
    },
    {
      label: 'Hizmet',
      value: services.length,
      icon: Wrench,
      color: 'bg-ink-900',
    },
    {
      label: 'Devam Eden Proje',
      value: ongoing,
      icon: FolderKanban,
      color: 'bg-amber-500',
    },
    {
      label: 'Okunmamış Mesaj',
      value: unread ?? '—',
      icon: unread ? MailWarning : Mail,
      color: unread ? 'bg-red-500' : 'bg-emerald-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Genel Bakış</h1>
        <p className="mt-1 text-ink-500">
          Site içeriğinizi buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-ink-200 bg-white p-6"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.color} text-white`}
            >
              <c.icon className="h-6 w-6" />
            </span>
            <div className="mt-4 text-3xl font-extrabold text-ink-900">
              {c.value}
            </div>
            <div className="text-sm text-ink-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Link
          to="/admin/projeler"
          className="group flex items-center justify-between rounded-2xl border border-ink-200 bg-white p-6 transition-colors hover:border-brand-300"
        >
          <div>
            <div className="flex items-center gap-3">
              <FolderKanban className="h-6 w-6 text-brand-500" />
              <h2 className="text-lg font-bold text-ink-900">Projeleri Yönet</h2>
            </div>
            <p className="mt-2 text-sm text-ink-500">
              Yeni proje ekleyin, mevcut projeleri düzenleyin veya silin.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
        </Link>

        <Link
          to="/admin/hizmetler"
          className="group flex items-center justify-between rounded-2xl border border-ink-200 bg-white p-6 transition-colors hover:border-brand-300"
        >
          <div>
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-brand-500" />
              <h2 className="text-lg font-bold text-ink-900">Hizmetleri Yönet</h2>
            </div>
            <p className="mt-2 text-sm text-ink-500">
              Sunduğunuz hizmetleri ekleyin, düzenleyin veya kaldırın.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500" />
        </Link>
      </div>
    </div>
  )
}
