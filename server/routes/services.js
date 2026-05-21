import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../auth.js'
import { slugify, uniqueSlug } from '../utils.js'

const router = Router()

// Icon keys the frontend knows how to render
const ALLOWED_ICONS = [
  'Layers',
  'LayoutPanelLeft',
  'Grid2x2',
  'Brush',
  'PaintRoller',
  'Building2',
  'Hammer',
  'Wrench',
  'HardHat',
  'Ruler',
  'PaintBucket',
  'Home',
]

function serialize(row) {
  let features = []
  try {
    features = JSON.parse(row.features)
  } catch {
    features = []
  }
  return { ...row, features }
}

function normalizeFeatures(input) {
  if (Array.isArray(input))
    return input.map((f) => String(f).trim()).filter(Boolean)
  if (typeof input === 'string')
    return input
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean)
  return []
}

function validate(body) {
  for (const f of ['title', 'short', 'description']) {
    if (!body[f] || !String(body[f]).trim()) return `"${f}" alanı zorunludur`
  }
  return null
}

router.get('/', (_req, res) => {
  const rows = db
    .prepare('SELECT * FROM services ORDER BY sort_order ASC, id ASC')
    .all()
  res.json(rows.map(serialize))
})

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Hizmet bulunamadı' })
  res.json(serialize(row))
})

router.post('/', requireAuth, (req, res) => {
  const err = validate(req.body)
  if (err) return res.status(400).json({ error: err })

  const b = req.body
  const slug = uniqueSlug(db, 'services', slugify(b.slug || b.title))
  const icon = ALLOWED_ICONS.includes(b.icon) ? b.icon : 'Building2'
  const maxOrder =
    db.prepare('SELECT MAX(sort_order) AS m FROM services').get().m ?? -1

  const info = db
    .prepare(
      `INSERT INTO services (slug, icon, title, short, description, features, sort_order)
       VALUES (@slug, @icon, @title, @short, @description, @features, @sort_order)`,
    )
    .run({
      slug,
      icon,
      title: b.title.trim(),
      short: b.short.trim(),
      description: b.description.trim(),
      features: JSON.stringify(normalizeFeatures(b.features)),
      sort_order: maxOrder + 1,
    })

  res.status(201).json(
    serialize(db.prepare('SELECT * FROM services WHERE id = ?').get(info.lastInsertRowid)),
  )
})

router.put('/:id', requireAuth, (req, res) => {
  const existing = db
    .prepare('SELECT * FROM services WHERE id = ?')
    .get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Hizmet bulunamadı' })

  const err = validate(req.body)
  if (err) return res.status(400).json({ error: err })

  const b = req.body
  const slug = uniqueSlug(db, 'services', slugify(b.slug || b.title), existing.id)
  const icon = ALLOWED_ICONS.includes(b.icon) ? b.icon : existing.icon

  db.prepare(
    `UPDATE services SET slug=@slug, icon=@icon, title=@title, short=@short,
       description=@description, features=@features WHERE id=@id`,
  ).run({
    id: existing.id,
    slug,
    icon,
    title: b.title.trim(),
    short: b.short.trim(),
    description: b.description.trim(),
    features: JSON.stringify(normalizeFeatures(b.features)),
  })

  res.json(
    serialize(db.prepare('SELECT * FROM services WHERE id = ?').get(existing.id)),
  )
})

router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id)
  if (info.changes === 0)
    return res.status(404).json({ error: 'Hizmet bulunamadı' })
  res.json({ ok: true })
})

export { ALLOWED_ICONS }
export default router
