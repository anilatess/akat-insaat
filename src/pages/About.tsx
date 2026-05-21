import { CheckCircle2, Target, Eye } from 'lucide-react'
import { company, stats, values } from '../data/site'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import CTA from '../components/CTA'

export default function About() {
  return (
    <>
      <PageHero
        title="Kurumsal"
        subtitle="Detaya önem veren, kaliteyi ve güveni esas alan bir inşaat ve dekorasyon firması."
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Kurumsal' }]}
      />

      {/* Intro */}
      <section className="py-20 sm:py-24">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80"
              alt="Modern yapı"
              className="aspect-4/3 w-full rounded-3xl object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Biz Kimiz?"
              title="Modern çizgilerle yaşayan projeler"
            />
            <div className="mt-6 space-y-4 text-ink-600 leading-relaxed">
              <p>
                {company.name}, {company.founded} yılından bu yana asma tavan,
                bölme duvar, sıva, boya ve dış cephe başta olmak üzere iç ve dış
                mekan uygulamalarında hizmet veren bir taahhüt firmasıdır.
              </p>
              <p>
                Konut, ofis, sağlık ve endüstriyel yapılar dahil her ölçekte
                projede; kaliteli malzeme, uzman işçilik ve titiz proje yönetimi
                anlayışıyla çalışıyoruz. Amacımız, müşterilerimize hem estetik
                hem de dayanıklı, uzun ömürlü çözümler sunmak.
              </p>
              <p>
                Detaya verdiğimiz önem ve şeffaf iletişim anlayışımız sayesinde,
                birlikte çalıştığımız kurumların uzun vadeli çözüm ortağı
                olmayı başardık.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink-950 py-16">
        <div className="container-px grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <div className="text-4xl font-extrabold text-brand-400 sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-ink-300">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 sm:py-24">
        <div className="container-px grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-ink-100 bg-ink-50 p-9">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white">
                <Target className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-ink-900">
                Misyonumuz
              </h3>
              <p className="mt-4 leading-relaxed text-ink-600">
                Müşterilerimizin ihtiyaçlarını en iyi şekilde anlayarak, kaliteli
                malzeme ve uzman işçilikle; bütçe ve zaman planına sadık,
                güvenilir ve estetik çözümler üretmek.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-ink-100 bg-ink-50 p-9">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-brand-400">
                <Eye className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-ink-900">
                Vizyonumuz
              </h3>
              <p className="mt-4 leading-relaxed text-ink-600">
                İnşaat ve dekorasyon sektöründe; yenilikçi çözümleri,
                sürdürülebilir uygulamaları ve müşteri memnuniyetini bir araya
                getirerek tercih edilen, güvenilir bir marka olmak.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Değerlerimiz"
            title="Bizi farklı kılan ilkeler"
            description="Her projede bize yön veren temel değerlerimiz."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-ink-100 bg-white p-7">
                  <CheckCircle2 className="h-8 w-8 text-brand-500" />
                  <h3 className="mt-4 text-lg font-bold text-ink-900">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
