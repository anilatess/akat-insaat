import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'

export default function Projects() {
  const { projects } = useContent()
  const categories = useMemo(
    () => ['Tümü', ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  )
  const [active, setActive] = useState('Tümü')

  const filtered =
    active === 'Tümü'
      ? projects
      : projects.filter((p) => p.category === active)

  return (
    <>
      <PageHero
        title="Projelerimiz"
        subtitle="Konut, ofis, sağlık ve endüstriyel alanlarda hayata geçirdiğimiz referans projeler."
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Projeler' }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-px">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active === cat
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.article
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-2xl border border-ink-100 bg-white"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                        {project.category}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          project.status === 'Tamamlandı'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-400 text-ink-900'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-ink-900">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm text-ink-400">
                      <MapPin className="h-4 w-4 text-brand-500" />
                      {project.location} · {project.year}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  )
}
