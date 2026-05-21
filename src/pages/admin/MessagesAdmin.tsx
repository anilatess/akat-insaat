import { useEffect, useState } from 'react'
import {
  Loader2,
  Mail,
  MailOpen,
  Phone,
  Trash2,
  User,
  Wrench,
} from 'lucide-react'
import { api, ApiError } from '../../lib/api'
import type { Message } from '../../types'

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<number | null>(null)

  const load = async () => {
    setError('')
    try {
      setMessages(await api.listMessages())
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Mesajlar yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch messages on mount (state updates only after the async call resolves).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [])

  const toggleRead = async (m: Message) => {
    setBusyId(m.id)
    try {
      await api.markMessageRead(m.id, !m.is_read)
      setMessages((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, is_read: m.is_read ? 0 : 1 } : x)),
      )
    } catch {
      /* sessizce yoksay */
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (m: Message) => {
    if (!confirm(`${m.name} adlı kişinin mesajını silmek istiyor musunuz?`))
      return
    setBusyId(m.id)
    try {
      await api.deleteMessage(m.id)
      setMessages((prev) => prev.filter((x) => x.id !== m.id))
    } catch (err) {
      alert(err instanceof ApiError ? err.message : 'Silme başarısız')
    } finally {
      setBusyId(null)
    }
  }

  const fmt = (iso: string) => {
    const d = new Date(iso.replace(' ', 'T') + 'Z')
    return d.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Mesajlar</h1>
        <p className="mt-1 text-ink-500">
          İletişim formundan gelen talepler ({messages.length})
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-20 text-center">
          <Mail className="mx-auto h-10 w-10 text-ink-300" />
          <p className="mt-3 font-medium text-ink-500">Henüz mesaj yok</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border bg-white p-5 transition-colors ${
                m.is_read ? 'border-ink-200' : 'border-brand-300 bg-brand-50/30'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-white">
                    <User className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-900">{m.name}</span>
                      {!m.is_read && (
                        <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          Yeni
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-ink-400">{fmt(m.created_at)}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleRead(m)}
                    disabled={busyId === m.id}
                    title={m.is_read ? 'Okunmadı işaretle' : 'Okundu işaretle'}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-600 disabled:opacity-50"
                  >
                    {m.is_read ? (
                      <MailOpen className="h-4 w-4" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(m)}
                    disabled={busyId === m.id}
                    className="inline-flex items-center justify-center rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-red-600 hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
                  >
                    {busyId === m.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a
                  href={`tel:${m.phone}`}
                  className="inline-flex items-center gap-1.5 text-ink-600 hover:text-brand-600"
                >
                  <Phone className="h-4 w-4 text-brand-500" />
                  {m.phone}
                </a>
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-1.5 text-ink-600 hover:text-brand-600"
                  >
                    <Mail className="h-4 w-4 text-brand-500" />
                    {m.email}
                  </a>
                )}
                {m.service && (
                  <span className="inline-flex items-center gap-1.5 text-ink-600">
                    <Wrench className="h-4 w-4 text-brand-500" />
                    {m.service}
                  </span>
                )}
              </div>

              <p className="mt-3 whitespace-pre-line rounded-xl bg-ink-50 px-4 py-3 text-sm text-ink-700">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
