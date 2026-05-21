import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2, Lock, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ApiError } from '../../lib/api'
import Logo from '../../components/Logo'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/admin')
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Giriş sırasında bir hata oluştu',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/">
            <Logo variant="light" />
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-ink-900">Yönetici Girişi</h1>
          <p className="mt-2 text-sm text-ink-500">
            Devam etmek için hesap bilgilerinizi girin.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink-800">
                Kullanıcı Adı
              </span>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50/50 py-3 pl-11 pr-4 text-ink-900 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                  placeholder="admin"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink-800">
                Şifre
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50/50 py-3 pl-11 pr-4 text-ink-900 outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
                  placeholder="••••••••"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-7 py-3.5 font-semibold text-white transition-all hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink-400">
          <Link to="/" className="hover:text-brand-400">
            ← Siteye geri dön
          </Link>
        </p>
      </div>
    </div>
  )
}
