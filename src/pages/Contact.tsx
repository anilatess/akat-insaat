import { useState, type FormEvent } from 'react'
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Printer,
  Send,
} from 'lucide-react'
import { company } from '../data/site'
import { useContent } from '../context/ContentContext'
import { api, ApiError } from '../lib/api'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const { services } = useContent()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    setSending(true)
    try {
      await api.sendMessage({
        name: String(fd.get('name') || ''),
        phone: String(fd.get('phone') || ''),
        email: String(fd.get('email') || ''),
        service: String(fd.get('service') || ''),
        message: String(fd.get('message') || ''),
      })
      setSent(true)
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Mesaj gönderilemedi. Lütfen telefon ile ulaşmayı deneyin.',
      )
    } finally {
      setSending(false)
    }
  }

  const info = [
    {
      icon: MapPin,
      title: 'Adres',
      value: company.address,
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: company.phone,
      href: company.phoneHref,
    },
    {
      icon: Mail,
      title: 'E-posta',
      value: company.email,
      href: company.emailHref,
    },
    { icon: Printer, title: 'Faks', value: company.fax },
  ]

  return (
    <>
      <PageHero
        title="İletişim"
        subtitle="Projeniz için ücretsiz keşif ve fiyat teklifi almak üzere bizimle iletişime geçin."
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'İletişim' }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-5">
          {/* Info */}
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold text-ink-900">
                Bize ulaşın
              </h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                Sorularınız ve talepleriniz için aşağıdaki kanallardan bize
                ulaşabilir veya formu doldurabilirsiniz. En kısa sürede size geri
                dönüş yapacağız.
              </p>
            </Reveal>

            <div className="mt-8 space-y-5">
              {info.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink-900">
                        {item.title}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-0.5 block text-ink-500 transition-colors hover:text-brand-600"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-ink-500">{item.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="rounded-3xl border border-ink-100 bg-white p-7 shadow-sm sm:p-9">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                      <CheckCircle2 className="h-9 w-9" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-ink-900">
                      Mesajınız alındı!
                    </h3>
                    <p className="mt-2 max-w-sm text-ink-500">
                      Talebiniz için teşekkür ederiz. Ekibimiz en kısa sürede
                      sizinle iletişime geçecektir.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 rounded-full border border-ink-200 px-6 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
                    >
                      Yeni mesaj gönder
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                      </div>
                    )}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Ad Soyad" name="name" required>
                        <input
                          required
                          name="name"
                          type="text"
                          placeholder="Adınız Soyadınız"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Telefon" name="phone" required>
                        <input
                          required
                          name="phone"
                          type="tel"
                          placeholder="05XX XXX XX XX"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="E-posta" name="email">
                        <input
                          name="email"
                          type="email"
                          placeholder="ornek@eposta.com"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Hizmet" name="service">
                        <select name="service" className={inputClass}>
                          <option value="">Seçiniz</option>
                          {services.map((s) => (
                            <option key={s.slug} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Diğer">Diğer</option>
                        </select>
                      </Field>
                    </div>
                    <Field label="Mesajınız" name="message" required>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder="Projeniz hakkında kısaca bilgi verin..."
                        className={`${inputClass} resize-none`}
                      />
                    </Field>
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-7 py-4 font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {sending ? (
                        <>
                          Gönderiliyor
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        </>
                      ) : (
                        <>
                          Mesajı Gönder
                          <Send className="h-4.5 w-4.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="container-px">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-ink-100">
              <iframe
                title="AKAT Teknik İnşaat Konum"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  company.mapQuery,
                )}&output=embed`}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-ink-50/50 px-4 py-3 text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20'

function Field({
  label,
  name,
  required,
  children,
}: {
  label: string
  name: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      {children}
    </label>
  )
}
