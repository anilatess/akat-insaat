import { CheckCircle2 } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { getIcon } from '../lib/icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CTA from '../components/CTA'

export default function Services() {
  const { services } = useContent()
  return (
    <>
      <PageHero
        title="Hizmetlerimiz"
        subtitle="Asma tavandan dış cepheye, anahtar teslim dekorasyondan zemin kaplamaya kadar geniş bir hizmet yelpazesi."
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Hizmetler' }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-px space-y-8">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
            <Reveal key={service.slug}>
              <div
                id={service.slug}
                className={`grid items-center gap-8 rounded-3xl border border-ink-100 bg-white p-6 sm:p-9 lg:grid-cols-12 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Icon / number block */}
                <div className="lg:col-span-4">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-ink-950">
                    <div className="absolute inset-0 bg-grid opacity-50" />
                    <span className="absolute right-5 top-4 font-display text-6xl font-extrabold text-white/5">
                      0{i + 1}
                    </span>
                    <Icon className="relative h-16 w-16 text-brand-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-8">
                  <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-600">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm font-medium text-ink-700"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
            )
          })}
        </div>
      </section>

      <CTA />
    </>
  )
}
