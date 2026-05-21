import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { seedProjects, seedServices } from './seed.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || join(__dirname, 'data.db')

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    year TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Tamamlandı',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Building2',
    title TEXT NOT NULL,
    short TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    service TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

// --- Seed admin ---
const adminCount = db.prepare('SELECT COUNT(*) AS c FROM admins').get().c
if (adminCount === 0) {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'akat2024'
  const hash = bcrypt.hashSync(password, 10)
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run(
    username,
    hash,
  )
  console.log(
    `[db] Yönetici hesabı oluşturuldu → kullanıcı adı: "${username}", şifre: "${password}" (lütfen giriş yaptıktan sonra değiştirin)`,
  )
}

// --- Seed projects ---
const projectCount = db.prepare('SELECT COUNT(*) AS c FROM projects').get().c
if (projectCount === 0) {
  const insert = db.prepare(`
    INSERT INTO projects (slug, title, category, location, year, image, description, status, sort_order)
    VALUES (@slug, @title, @category, @location, @year, @image, @description, @status, @sort_order)
  `)
  const tx = db.transaction((rows) => {
    rows.forEach((p, i) => insert.run({ ...p, sort_order: i }))
  })
  tx(seedProjects)
  console.log(`[db] ${seedProjects.length} örnek proje eklendi`)
}

// --- Seed services ---
const serviceCount = db.prepare('SELECT COUNT(*) AS c FROM services').get().c
if (serviceCount === 0) {
  const insert = db.prepare(`
    INSERT INTO services (slug, icon, title, short, description, features, sort_order)
    VALUES (@slug, @icon, @title, @short, @description, @features, @sort_order)
  `)
  const tx = db.transaction((rows) => {
    rows.forEach((s, i) =>
      insert.run({ ...s, features: JSON.stringify(s.features), sort_order: i }),
    )
  })
  tx(seedServices)
  console.log(`[db] ${seedServices.length} örnek hizmet eklendi`)
}

export default db
