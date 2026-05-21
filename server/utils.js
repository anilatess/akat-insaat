// Turkish-aware slug generator
const MAP = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  İ: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
  Ç: 'c',
  Ğ: 'g',
  Ö: 'o',
  Ş: 's',
  Ü: 'u',
}

export function slugify(text) {
  return String(text)
    .trim()
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (c) => MAP[c] || c)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// Ensure a slug is unique within a table by appending -2, -3, ... if needed.
export function uniqueSlug(db, table, base, excludeId = null) {
  let slug = base || 'kayit'
  let n = 1
  for (;;) {
    const candidate = n === 1 ? slug : `${slug}-${n}`
    const row = excludeId
      ? db
          .prepare(`SELECT id FROM ${table} WHERE slug = ? AND id != ?`)
          .get(candidate, excludeId)
      : db.prepare(`SELECT id FROM ${table} WHERE slug = ?`).get(candidate)
    if (!row) return candidate
    n++
  }
}
