import { useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import { api, ApiError } from '../../lib/api'
import { getIcon, iconOptions } from '../../lib/icons'
import type { Service, ServiceInput } from '../../types'
import Modal from '../../components/admin/Modal'

type FormState = Omit<ServiceInput, 'features'> & { featuresText: string }

const empty: FormState = {
  title: '',
  icon: 'Building2',
  short: '',
  description: '',
  featuresText: '',
}

const inputCls =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

export default function ServicesAdmin() {
  const { services, refresh } = useContent()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState<FormState>(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const openNew = () => {
    setEditing(null)
    setForm(empty)
    setError('')
    setModalOpen(true)
  }

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({
      title: s.title,
      icon: s.icon,
      short: s.short,
      description: s.description,
      featuresText: s.features.join('\n'),
    })
    setError('')
    setModalOpen(true)
  }

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    const payload: ServiceInput = {
      title: form.title,
      icon: form.icon,
      short: form.short,
      description: form.description,
      features: form.featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
    }
    try {
      if (editing) await api.updateService(editing.id, payload)
      else await api.createService(payload)
      await refresh()
      setModalOpen(false)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Kaydetme başarısız')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (s: Service) => {
    if (!confirm(`"${s.title}" hizmetini silmek istediğinize emin misiniz?`))
      return
    setDeletingId(s.id)
    try {
      await api.deleteService(s.id)
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
          <h1 className="text-2xl font-bold text-ink-900">Hizmetler</h1>
          <p className="mt-1 text-ink-500">
            {services.length} hizmet · ekleyin, düzenleyin veya silin
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <Plus className="h-5 w-5" />
          Yeni Hizmet
        </button>
      </div>

      {/* List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = getIcon(s.icon)
          return (
            <div
              key={s.id}
              className="flex flex-col rounded-2xl border border-ink-200 bg-white p-5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-brand-400">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-bold text-ink-900">{s.title}</h3>
              <p className="mt-1.5 flex-1 text-sm text-ink-500">{s.short}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(s)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
                >
                  <Pencil className="h-4 w-4" />
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s)}
                  disabled={deletingId === s.id}
                  className="inline-flex items-center justify-center rounded-lg border border-ink-200 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === s.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <Field label="Hizmet Adı" required>
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className={inputCls}
              placeholder="Örn: Asma Tavan Sistemleri"
            />
          </Field>

          <Field label="İkon">
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((name) => {
                const Icon = getIcon(name)
                const active = form.icon === name
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => set('icon', name)}
                    title={name}
                    className={`flex aspect-square items-center justify-center rounded-xl border transition-colors ${
                      active
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-ink-200 text-ink-500 hover:border-brand-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="Kısa Açıklama (kart üzerinde görünür)" required>
            <input
              required
              value={form.short}
              onChange={(e) => set('short', e.target.value)}
              className={inputCls}
              placeholder="Tek cümlelik özet"
            />
          </Field>

          <Field label="Detaylı Açıklama" required>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Hizmet hakkında ayrıntılı açıklama..."
            />
          </Field>

          <Field label="Özellikler (her satıra bir madde)">
            <textarea
              rows={4}
              value={form.featuresText}
              onChange={(e) => set('featuresText', e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder={'Alçıpan asma tavan\nMetal & lineer tavan\nAkustik çözümler'}
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
