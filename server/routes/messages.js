import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import db from '../db.js'
import { requireAuth } from '../auth.js'

const router = Router()

// Limit public submissions to curb spam/abuse: 5 per 10 min per IP.
const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin.' },
})

const clip = (v, n) => String(v ?? '').trim().slice(0, n)

// CREATE (public)
router.post('/', submitLimiter, (req, res) => {
  const name = clip(req.body?.name, 120)
  const phone = clip(req.body?.phone, 40)
  const email = clip(req.body?.email, 160)
  const service = clip(req.body?.service, 120)
  const message = clip(req.body?.message, 4000)

  if (!name || !phone || !message)
    return res
      .status(400)
      .json({ error: 'Ad, telefon ve mesaj alanları zorunludur.' })

  db.prepare(
    `INSERT INTO messages (name, phone, email, service, message)
     VALUES (@name, @phone, @email, @service, @message)`,
  ).run({ name, phone, email, service, message })

  res.status(201).json({ ok: true })
})

// LIST (auth)
router.get('/', requireAuth, (_req, res) => {
  const rows = db
    .prepare('SELECT * FROM messages ORDER BY created_at DESC, id DESC')
    .all()
  res.json(rows)
})

// UNREAD COUNT (auth)
router.get('/unread-count', requireAuth, (_req, res) => {
  const c = db.prepare('SELECT COUNT(*) AS c FROM messages WHERE is_read = 0').get().c
  res.json({ count: c })
})

// MARK READ / UNREAD (auth)
router.patch('/:id/read', requireAuth, (req, res) => {
  const read = req.body?.is_read ? 1 : 0
  const info = db
    .prepare('UPDATE messages SET is_read = ? WHERE id = ?')
    .run(read, req.params.id)
  if (info.changes === 0)
    return res.status(404).json({ error: 'Mesaj bulunamadı' })
  res.json({ ok: true })
})

// DELETE (auth)
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id)
  if (info.changes === 0)
    return res.status(404).json({ error: 'Mesaj bulunamadı' })
  res.json({ ok: true })
})

export default router
