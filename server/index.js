import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'

import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import serviceRoutes from './routes/services.js'
import uploadRoutes, { UPLOAD_DIR } from './routes/upload.js'
import messageRoutes from './routes/messages.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3001
const DIST_DIR = join(__dirname, '..', 'dist')

const app = express()

// Behind one reverse proxy (e.g. Nginx) in production — needed for correct
// client IPs in rate limiting.
app.set('trust proxy', 1)

// Security headers + a CSP that allows our fonts, images, and the Maps embed.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        frameSrc: ['https://www.google.com'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: null,
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Uploaded images (with long cache)
app.use(
  '/uploads',
  express.static(UPLOAD_DIR, { maxAge: '7d', fallthrough: true }),
)

// API
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/messages', messageRoutes)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

// Unknown API route → JSON 404 (avoid SPA fallback returning HTML)
app.use('/api', (_req, res) => res.status(404).json({ error: 'Bulunamadı' }))

// Production: serve the built SPA + client-side routing fallback.
// Note: Express 5 dropped app.get('*') wildcard support, so we use a
// catch-all middleware after the static handler instead.
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  app.use((_req, res) => res.sendFile(join(DIST_DIR, 'index.html')))
} else {
  app.get('/', (_req, res) =>
    res.send(
      'API çalışıyor. Geliştirme modunda arayüz için Vite sunucusunu (npm run dev) kullanın.',
    ),
  )
}

app.listen(PORT, () => {
  console.log(`[server] AKAT İnşaat API → http://localhost:${PORT}`)
  if (existsSync(DIST_DIR))
    console.log(`[server] Site (dist) bu porttan sunuluyor.`)
})
