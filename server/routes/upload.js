import { Router } from 'express'
import multer from 'multer'
import { fileURLToPath } from 'node:url'
import { dirname, extname, join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { requireAuth } from '../auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
// Configurable so it can point at a persistent disk in production
// (e.g. UPLOAD_DIR=/var/data/uploads on Render).
export const UPLOAD_DIR =
  process.env.UPLOAD_DIR || join(__dirname, '..', 'uploads')

if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '-')
      .replace(/-+/g, '-')
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`
    cb(null, `${unique}-${safe}`.replace(extname(safe), extname(safe)))
  },
})

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Sadece görsel dosyaları yüklenebilir (jpg, png, webp, gif, avif)'))
  },
})

const router = Router()

router.post('/', requireAuth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!req.file) return res.status(400).json({ error: 'Dosya bulunamadı' })
    // Public URL served by the static /uploads handler
    res.status(201).json({ url: `/uploads/${req.file.filename}` })
  })
})

export default router
