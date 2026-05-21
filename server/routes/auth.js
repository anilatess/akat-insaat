import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { changePassword, login, requireAuth } from '../auth.js'

const router = Router()

// Brute-force protection: 10 login attempts per 15 min per IP.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Çok fazla başarısız giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.',
  },
})

router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password)
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' })
  const result = login(username, password)
  if (!result)
    return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' })
  res.json(result)
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: { id: req.user.id, username: req.user.username } })
})

router.post('/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  const result = changePassword(req.user.id, currentPassword, newPassword)
  if (!result.ok) return res.status(400).json({ error: result.error })
  res.json({ ok: true })
})

export default router
