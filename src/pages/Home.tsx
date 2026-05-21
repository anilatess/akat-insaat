import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Award,
} from 'lucide-react'
import { company, processSteps, stats } from '../data/site'
import { useContent } from '../context/ContentContext'
import { getIcon } from '../lib/icons'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <ProcessSection />
      <CTA />
    </>
  )
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink-950 text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
      </div>

      <div className="container-px relative flex min-h-screen items-center pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-brand-200 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {company.founded}'dan beri kaliteli inşaat ve dekorasyon
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Geleceğin yapılarını{' '}
            <span className="text-gradient">bugünden</span> inşa ediyoruz
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300"
          >
            {company.tagline}. Asma tavan, bölme duvar, sıva, boya ve cephe
            uygulamalarında uçtan uca profesyonel çözümler sunuyoruz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/projeler"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-4 font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30"
            >
              Projelerimizi İnceleyin
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/iletisim"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Ücretsiz Teklif Alın
            </Link>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-white sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-ink-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Trust bar ---------------- */
function TrustBar() {
  const items = [
    { icon: ShieldCheck, text: 'Uygulama Garantisi' },
    { icon: Clock, text: 'Zamanında Teslim' },
    { icon: Award, text: 'Kaliteli Malzeme' },
    { icon: CheckCircle2, text: 'Ücretsiz Keşif' },
  ]
  return (
    <div className="border-b border-ink-100 bg-white">
      <div className="container-px grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {items.map((it) => (
          <div key={it.text} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <it.icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-ink-800">
              {it.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Services ---------------- */
function ServicesSection() {
  const { services } = useContent()
  return (
    <section className="bg-ink-50 py-20 sm:py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Hizmetlerimiz"
          title="Uçtan uca inşaat ve dekorasyon çözümleri"
          description="İhtiyacınıza özel, kaliteli malzeme ve uzman işçilikle sunduğumuz hizmetlerimizle projelerinize değer katıyoruz."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                to="/hizmetler"
                className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-ink-900/5"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink-900 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-ink-900">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
                  {service.short}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Detaylı Bilgi
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- About ---------------- */
function AboutSection() {
  const highlights = [
    'Konut, ofis, sağlık ve endüstriyel yapılarda deneyim',
    'Projeye özel mühendislik ve tasarım yaklaşımı',
    'İş güvenliği ve kalite standartlarına tam uyum',
    'Şeffaf maliyet ve düzenli ilerleme raporlaması',
  ]
  return (
    <section className="py-20 sm:py-24">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80"
              alt="AKAT İnşaat şantiye çalışması"
              className="aspect-4/3 w-full rounded-3xl object-cover"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-brand-500 px-7 py-6 text-white shadow-xl sm:block">
              <div className="text-4xl font-extrabold">15+</div>
              <div className="text-sm font-medium text-brand-50">
                Yıllık Tecrübe
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Hakkımızda"
            title="Detaya önem veren, güvenilir bir çözüm ortağı"
            description="AKAT İnşaat olarak, modern ve şık çizgilerle yaşayan projeler ortaya koyuyoruz. Her ölçekte projede kaliteyi, estetiği ve dayanıklılığı bir arada sunmayı ilke ediniyoruz."
          />
          <ul className="mt-8 space-y-4">
            {highlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.05}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  <span className="text-ink-700">{h}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <Link
              to="/kurumsal"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Bizi Daha Yakından Tanıyın
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Projects ---------------- */
function ProjectsSection() {
  const { projects } = useContent()
  const featured = projects.slice(0, 3)
  return (
    <section className="bg-ink-50 py-20 sm:py-24">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Projelerimiz"
            title="Hayata geçirdiğimiz seçkin işler"
          />
          <Reveal>
            <Link
              to="/projeler"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              Tüm Projeler
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <article className="group relative h-80 overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-medium text-brand-200">
                    {project.location} · {project.year}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Process ---------------- */
function ProcessSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-px">
        <SectionHeading
          eyebrow="Çalışma Sürecimiz"
          title="Fikirden teslimata kadar net bir yol haritası"
          description="Şeffaf ve planlı bir süreç ile projelerinizi sorunsuz biçimde hayata geçiriyoruz."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-ink-100 bg-white p-7">
                <span className="font-display text-5xl font-extrabold text-ink-100">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
