import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import db from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SECRET_FILE = join(__dirname, '.jwt-secret')

// Resolve a stable signing secret:
// 1) JWT_SECRET env var (recommended for production)
// 2) a persisted random secret in server/.jwt-secret
// 3) generate one and persist it (so tokens survive restarts)
function resolveSecret() {
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 16)
    return process.env.JWT_SECRET
  if (existsSync(SECRET_FILE)) {
    const s = readFileSync(SECRET_FILE, 'utf8').trim()
    if (s) return s
  }
  const generated = crypto.randomBytes(48).toString('hex')
  try {
    writeFileSync(SECRET_FILE, generated, { mode: 0o600 })
    console.warn(
      '[auth] JWT_SECRET tanımlı değil — rastgele bir anahtar üretilip server/.jwt-secret dosyasına kaydedildi. Üretimde JWT_SECRET ortam değişkenini ayarlamanız önerilir.',
    )
  } catch {
    console.warn('[auth] Uyarı: JWT anahtarı dosyaya yazılamadı, geçici anahtar kullanılıyor.')
  }
  return generated
}

const JWT_SECRET = resolveSecret()
const TOKEN_TTL = '7d'

export function login(username, password) {
  const admin = db
    .prepare('SELECT * FROM admins WHERE username = ?')
    .get(username)
  if (!admin) return null
  if (!bcrypt.compareSync(password, admin.password_hash)) return null
  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  })
  return { token, user: { id: admin.id, username: admin.username } }
}

export function changePassword(userId, currentPassword, newPassword) {
  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(userId)
  if (!admin) return { ok: false, error: 'Kullanıcı bulunamadı' }
  if (!bcrypt.compareSync(currentPassword, admin.password_hash))
    return { ok: false, error: 'Mevcut şifre hatalı' }
  if (!newPassword || newPassword.length < 6)
    return { ok: false, error: 'Yeni şifre en az 6 karakter olmalı' }
  const hash = bcrypt.hashSync(newPassword, 10)
  db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?').run(
    hash,
    userId,
  )
  return { ok: true }
}

// Express middleware — protects routes, expects "Authorization: Bearer <token>"
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Yetkisiz erişim' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Oturum süresi dolmuş veya geçersiz' })
  }
}
