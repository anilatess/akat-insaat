import { useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, Loader2, MapPin } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import { api, ApiError } from '../../lib/api'
import type { Project, ProjectInput } from '../../types'
import Modal from '../../components/admin/Modal'
import ImageUploader from '../../components/admin/ImageUploader'

const empty: ProjectInput = {
  title: '',
  category: '',
  location: '',
  year: String(new Date().getFullYear()),
  image: '',
  description: '',
  status: 'Tamamlandı',
}

const inputCls =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

const CATEGORIES = ['Konut', 'Ofis', 'Sağlık', 'Endüstriyel', 'Ticari', 'Eğitim']

export default function ProjectsAdmin() {
  const { projects, refresh } = useContent()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState<ProjectInput>(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const openNew = () => {
    setEditing(null)
    setForm(empty)
    setError('')
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditing(p)
    setForm({
      title: p.title,
      category: p.category,
      location: p.location,
      year: p.year,
      image: p.image,
      description: p.description,
      status: p.status,
    })
    setError('')
    setModalOpen(true)
  }

  const set = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (editing) await api.updateProject(editing.id, form)
      else await api.createProject(form)
      await refresh()
      setModalOpen(false)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kaydetme başarısız')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (p: Project) => {
    if (!confirm(`"${p.title}" projesini silmek istediğinize emin misiniz?`))
      return
    setDeletingId(p.id)
    try {
      await api.deleteProject(p.id)
      await refresh()
    } catch (err) {
      alert(err instanceof ApiError ? err.message : 'Silme başarısız')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Projeler</h1>
          <p className="mt-1 text-ink-500">
            {projects.length} proje · ekleyin, düzenleyin veya silin
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <Plus className="h-5 w-5" />
          Yeni Proje
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-ink-200 bg-white"
          >
            <div className="relative h-40 bg-ink-100">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-ink-400">
                  Görsel yok
                </div>
              )}
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  p.status === 'Tamamlandı'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-400 text-ink-900'
                }`}
              >
                {p.status}
              </span>
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {p.category}
              </span>
              <h3 className="mt-1 font-bold text-ink-900">{p.title}</h3>
              <div className="mt-1.5 flex items-center gap-1 text-xs text-ink-400">
                <MapPin className="h-3.5 w-3.5" />
                {p.location} · {p.year}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
                >
                  <Pencil className="h-4 w-4" />
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p)}
                  disabled={deletingId === p.id}
                  className="inline-flex items-center justify-center rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === p.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <Field label="Proje Adı" required>
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className={inputCls}
              placeholder="Örn: Memorial Bahçelievler Hastanesi"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kategori" required>
              <input
                required
                list="category-list"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className={inputCls}
                placeholder="Konut, Ofis, Sağlık..."
              />
              <datalist id="category-list">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Durum" required>
              <select
                value={form.status}
                onChange={(e) =>
                  set('status', e.target.value as Project['status'])
                }
                className={inputCls}
              >
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="Devam Ediyor">Devam Ediyor</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Konum" required>
              <input
                required
                value={form.location}
                onChange={(e) => set('location', e.target.value)}
                className={inputCls}
                placeholder="İstanbul"
              />
            </Field>
            <Field label="Yıl" required>
              <input
                required
                value={form.year}
                onChange={(e) => set('year', e.target.value)}
                className={inputCls}
                placeholder="2024"
              />
            </Field>
          </div>

          <Field label="Görsel">
            <ImageUploader
              value={form.image}
              onChange={(url) => set('image', url)}
            />
          </Field>

          <Field label="Açıklama" required>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Proje hakkında kısa açıklama..."
            />
          </Field>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-xl border border-ink-200 px-5 py-2.5 font-semibold text-ink-700 hover:bg-ink-50"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      {children}
    </label>
  )
}
