import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../data/site'
import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="container-px py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute -top-20 right-10 h-60 w-60 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Projenizi birlikte hayata geçirelim
            </h2>
            <p className="mt-4 text-lg text-ink-300">
              Ücretsiz keşif ve fiyat teklifi için bizimle iletişime geçin.
              Uzman ekibimiz en kısa sürede size dönüş yapsın.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30"
              >
                Teklif Alın
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
