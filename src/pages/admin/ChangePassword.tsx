import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { api, ApiError } from '../../lib/api'

const inputCls =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

export default function ChangePassword() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setDone(false)
    if (next !== confirm) {
      setError('Yeni şifreler eşleşmiyor')
      return
    }
    setSaving(true)
    try {
      await api.changePassword(current, next)
      setDone(true)
      setCurrent('')
      setNext('')
      setConfirm('')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'İşlem başarısız')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Şifre Değiştir</h1>
        <p className="mt-1 text-ink-500">
          Hesap güvenliğiniz için güçlü bir şifre kullanın.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-ink-200 bg-white p-6"
      >
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
        {done && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            Şifreniz başarıyla güncellendi.
          </div>
        )}

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-800">
            Mevcut Şifre
          </span>
          <input
            required
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-800">
            Yeni Şifre
          </span>
          <input
            required
            type="password"
            minLength={6}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            className={inputCls}
            placeholder="En az 6 karakter"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-800">
            Yeni Şifre (Tekrar)
          </span>
          <input
            required
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputCls}
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  )
}
