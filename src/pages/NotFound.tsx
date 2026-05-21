import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center text-white">
      <span className="font-display text-7xl font-extrabold text-gradient sm:text-9xl">
        404
      </span>
      <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-3 max-w-md text-ink-400">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-600"
      >
        <ArrowLeft className="h-5 w-5" />
        Ana Sayfaya Dön
      </Link>
    </section>
  )
}
