import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../auth.js'
import { slugify, uniqueSlug } from '../utils.js'

const router = Router()

const ALLOWED_STATUS = ['Tamamlandı', 'Devam Ediyor']

function validate(body) {
  const required = ['title', 'category', 'location', 'year', 'description']
  for (const f of required) {
    if (!body[f] || !String(body[f]).trim())
      return `"${f}" alanı zorunludur`
  }
  if (body.status && !ALLOWED_STATUS.includes(body.status))
    return 'Geçersiz durum değeri'
  return null
}

// GET all (public) — ordered
router.get('/', (_req, res) => {
  const rows = db
    .prepare('SELECT * FROM projects ORDER BY sort_order ASC, id DESC')
    .all()
  res.json(rows)
})

// GET one (public)
router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Proje bulunamadı' })
  res.json(row)
})

// CREATE (auth)
router.post('/', requireAuth, (req, res) => {
  const err = validate(req.body)
  if (err) return res.status(400).json({ error: err })

  const b = req.body
  const slug = uniqueSlug(db, 'projects', slugify(b.slug || b.title))
  const maxOrder =
    db.prepare('SELECT MAX(sort_order) AS m FROM projects').get().m ?? -1

  const info = db
    .prepare(
      `INSERT INTO projects (slug, title, category, location, year, image, description, status, sort_order)
       VALUES (@slug, @title, @category, @location, @year, @image, @description, @status, @sort_order)`,
    )
    .run({
      slug,
      title: b.title.trim(),
      category: b.category.trim(),
      location: b.location.trim(),
      year: String(b.year).trim(),
      image: b.image || '',
      description: b.description.trim(),
      status: b.status || 'Tamamlandı',
      sort_order: maxOrder + 1,
    })

  const row = db
    .prepare('SELECT * FROM projects WHERE id = ?')
    .get(info.lastInsertRowid)
  res.status(201).json(row)
})

// UPDATE (auth)
router.put('/:id', requireAuth, (req, res) => {
  const existing = db
    .prepare('SELECT * FROM projects WHERE id = ?')
    .get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Proje bulunamadı' })

  const err = validate(req.body)
  if (err) return res.status(400).json({ error: err })

  const b = req.body
  const slug = uniqueSlug(
    db,
    'projects',
    slugify(b.slug || b.title),
    existing.id,
  )

  db.prepare(
    `UPDATE projects SET slug=@slug, title=@title, category=@category, location=@location,
       year=@year, image=@image, description=@description, status=@status WHERE id=@id`,
  ).run({
    id: existing.id,
    slug,
    title: b.title.trim(),
    category: b.category.trim(),
    location: b.location.trim(),
    year: String(b.year).trim(),
    image: b.image ?? existing.image,
    description: b.description.trim(),
    status: b.status || existing.status,
  })

  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(existing.id)
  res.json(row)
})

// DELETE (auth)
router.delete('/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id)
  if (info.changes === 0)
    return res.status(404).json({ error: 'Proje bulunamadı' })
  res.json({ ok: true })
})

export default router
