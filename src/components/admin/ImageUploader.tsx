import { useRef, useState } from 'react'
import { ImagePlus, Loader2, Trash2 } from 'lucide-react'
import { api, ApiError } from '../../lib/api'

type ImageUploaderProps = {
  value: string
  onChange: (url: string) => void
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setError('')
    setUploading(true)
    try {
      const { url } = await api.uploadImage(file)
      onChange(url)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Yükleme başarısız')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {/* Preview */}
        <div className="relative h-32 w-full overflow-hidden rounded-xl border border-ink-200 bg-ink-50 sm:w-48">
          {value ? (
            <img src={value} alt="Önizleme" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-400">
              <ImagePlus className="h-8 w-8" />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
              e.target.value = ''
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
          >
            <ImagePlus className="h-4 w-4" />
            Görsel Yükle
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2.5 text-sm font-semibold text-ink-600 hover:border-red-300 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Kaldır
            </button>
          )}

          {/* Manual URL fallback */}
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="veya görsel URL'si yapıştırın"
            className="mt-2 w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
          <p className="text-xs text-ink-400">
            JPG, PNG, WEBP · en fazla 8 MB
          </p>
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  )
}
