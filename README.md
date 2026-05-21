# AKAT İnşaat — Kurumsal Web Sitesi + Yönetim Paneli

Modern, yenilikçi ve tamamen responsive bir inşaat & dekorasyon firması web sitesi.
Eski [bta-insaat.com](https://www.bta-insaat.com/) yapısı temel alınarak güncel bir
tasarım ve teknoloji altyapısıyla yeniden inşa edilmiştir. Firma sahibi, **admin
paneli** üzerinden projeleri ve hizmetleri ekleyip düzenleyebilir.

## Teknolojiler

**Arayüz (frontend)**

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — responsive tasarım sistemi (mobil öncelikli)
- **Framer Motion** — animasyonlar · **React Router** — sayfa yönlendirme
- **lucide-react** — ikonlar

**Sunucu (backend) — aynı uygulama içinde**

- **Express** — REST API
- **better-sqlite3** — tek dosyalı veritabanı (`server/data.db`)
- **bcryptjs + JWT** — yönetici girişi · **multer** — görsel yükleme

> Üçüncü parti servis (Vercel, Supabase vb.) gerekmez. Her şey kendi sunucunuzda,
> tek bir Node.js uygulaması olarak çalışır.

## Sayfalar

| Yol          | Sayfa     | İçerik                                            |
| ------------ | --------- | ------------------------------------------------- |
| `/`          | Ana Sayfa | Hero, hizmetler, hakkımızda, projeler, süreç, CTA |
| `/kurumsal`  | Kurumsal  | Hakkımızda, misyon/vizyon, değerler               |
| `/hizmetler` | Hizmetler | Hizmet kategorileri (admin'den yönetilir)         |
| `/projeler`  | Projeler  | Kategori filtreli galeri (admin'den yönetilir)    |
| `/iletisim`  | İletişim  | İletişim bilgileri, form, harita                  |

## 🔐 Yönetim Paneli

- **Giriş adresi:** `/admin/giris`
- **Varsayılan kullanıcı adı:** `admin`
- **Varsayılan şifre:** `akat2024`  → **ilk girişten sonra "Şifre Değiştir" ile mutlaka değiştirin.**

Panelden yapılabilenler:

- **Projeler:** ekleme / düzenleme / silme + bilgisayardan görsel yükleme
- **Hizmetler:** ekleme / düzenleme / silme + ikon seçimi + özellik listesi
- **Mesajlar:** iletişim formundan gelen talepleri görüntüleme, okundu işaretleme, silme
- **Şifre değiştirme**

Yapılan değişiklikler anında public sitede yayınlanır.

## Güvenlik

- Şifreler **bcrypt** ile hash'lenir, oturumlar **JWT** ile yönetilir (7 gün geçerli).
- **Helmet** ile güvenlik başlıkları (CSP, HSTS, X-Frame-Options, nosniff vb.).
- Giriş denemelerinde **rate limiting** (15 dk'da en fazla 10 deneme) — kaba kuvvet
  saldırılarına karşı koruma. İletişim formu da spam'e karşı sınırlandırılmıştır.
- JWT imzalama anahtarı `JWT_SECRET` yoksa otomatik üretilip `server/.jwt-secret`
  dosyasına kaydedilir (yeniden başlatmada oturumlar korunur).
- Tüm veritabanı sorguları parametreli (SQL injection'a kapalı).

## Kurulum & Çalıştırma

```bash
# 1) Bağımlılıkları yükle
npm install

# 2) Geliştirme — arayüz + API birlikte
#    Arayüz: http://localhost:5173  |  API: http://localhost:3001
npm run dev

# Sadece arayüz / sadece API çalıştırmak isterseniz:
npm run dev:web      # yalnızca Vite (5173)
npm run server       # yalnızca API (3001)
```

### Yayına Alma (production)

```bash
npm run build        # arayüzü dist/ klasörüne derler
npm start            # tek sunucu: hem siteyi hem API'yi 3001 portundan sunar
```

`npm start` ile çalışan sunucu hem siteyi (`dist`) hem de admin API'sini aynı
porttan sunar. Sunucuya domain bağlamak için önüne **Nginx** gibi bir ters proxy
koyup 80/443'ü 3001'e yönlendirebilirsiniz. Sürekli çalışması için **PM2**
(`pm2 start npm --name akat -- start`) önerilir.

### Ortam değişkenleri (opsiyonel ama önerilir)

`.env` veya sunucu ortamında ayarlayın:

| Değişken         | Açıklama                              | Varsayılan       |
| ---------------- | ------------------------------------- | ---------------- |
| `PORT`           | Sunucu portu                          | `3001`           |
| `JWT_SECRET`     | Token imzalama anahtarı (**değiştirin**) | dahili sabit     |
| `ADMIN_USERNAME` | İlk yönetici kullanıcı adı            | `admin`          |
| `ADMIN_PASSWORD` | İlk yönetici şifresi                  | `akat2024`       |
| `DB_PATH`        | Veritabanı dosya yolu                 | `server/data.db` |

> `ADMIN_USERNAME/PASSWORD` yalnızca veritabanı **ilk oluşturulurken** kullanılır.
> Sonradan şifreyi panelden değiştirebilirsiniz.

## 🚀 Render.com ile Yayına Alma (önerilen)

Bu repo, Render Blueprint (`render.yaml`) ile gelir — birkaç tıkla yayınlanır:

1. [render.com](https://render.com) hesabı açın, GitHub ile bağlanın.
2. **New → Blueprint** → `anilatess/akat-insaat` reposunu seçin. Render `render.yaml`'ı
   otomatik okur (web servisi + 1GB kalıcı disk + `JWT_SECRET` üretimi).
3. İsterseniz `ADMIN_USERNAME` / `ADMIN_PASSWORD` ortam değişkenlerini güçlü değerlerle
   girin (girmezseniz `admin` / `akat2024` ile başlar, sonra panelden değiştirirsiniz).
4. **Apply** deyin. Render kurar, derler ve yayınlar → `https://akat-insaat.onrender.com`
   gibi bir adres verir. Kendi domaininizi **Settings → Custom Domain**'den ekleyip
   SSL'i otomatik alabilirsiniz.

> **Önemli:** Veritabanı ve görsellerin kalıcı olması için kalıcı disk gerekir; bu da
> Render'ın **Starter planında** (~7$/ay) bulunur. Render **ücretsiz** planında disk
> olmadığından veriler kalıcı olmaz. Tamamen ücretsiz bir kurulum isterseniz mimariyi
> bulut veritabanı (Turso) + bulut görsel depolama ile değiştirmek gerekir.

Disk şu env değişkenleriyle kullanılır (render.yaml'da ayarlı):
`DB_PATH=/var/data/data.db`, `UPLOAD_DIR=/var/data/uploads`.

## 🚀 Kendi Sunucunuzda (VPS) Yayına Alma

1. Sunucuya (VPS) Node.js 20+ kurun, projeyi kopyalayın, `npm install` çalıştırın.
2. `.env` dosyası oluşturup en az şunları ayarlayın:
   ```
   PORT=3001
   JWT_SECRET=uzun-rastgele-bir-deger
   ADMIN_USERNAME=sectiginiz-kullanici
   ADMIN_PASSWORD=guclu-bir-sifre
   ```
   (Veya ilk girişten sonra şifreyi panelden değiştirin.)
3. `npm run build` → ardından `pm2 start npm --name akat -- start` ile sürekli çalıştırın.
4. **Nginx** ters proxy + **SSL (Let's Encrypt)** ile domaini 443 → 3001'e yönlendirin.
5. `src/data/site.ts` içindeki firma bilgilerini (telefon, e-posta, adres, sosyal medya)
   gerçek değerlerle güncelleyin.
6. Panelden örnek projeleri/hizmetleri gerçek içerikle değiştirin, görselleri yükleyin.
7. `server/data.db` + `server/uploads/` için düzenli yedekleme planlayın.

## Veri & Yedekleme

- Tüm veriler `server/data.db` (SQLite) dosyasında (projeler, hizmetler, mesajlar,
  yönetici hesabı), yüklenen görseller `server/uploads/` klasöründe tutulur.
- **Yedek almak için** bu iki yolu kopyalamanız yeterlidir.
- Statik metinler (firma adı, telefon, adres, istatistikler, süreç adımları)
  kod içinde `src/data/site.ts` dosyasındadır. API ulaşılamazsa bu dosyadaki
  içerik **yedek (fallback)** olarak gösterilir.

## Proje Yapısı

```
src/
├── components/        # Navbar, Footer, CTA, Logo, admin/ (panel bileşenleri)
├── context/           # AuthContext (giriş), ContentContext (API verisi)
├── lib/               # api.ts (istemci), icons.tsx (ikon kayıt defteri)
├── data/site.ts       # Statik içerik + API fallback verisi
├── pages/             # Public sayfalar + pages/admin/ (panel ekranları)
└── types.ts           # Paylaşılan TypeScript tipleri
server/
├── index.js           # Express uygulaması (API + prod'da dist servisi)
├── db.js              # SQLite şema + ilk veri (seed)
├── auth.js            # JWT + bcrypt yardımcıları
├── routes/            # auth, projects, services, upload, messages
├── data.db            # Veritabanı (otomatik oluşur, git'e dahil değil)
└── uploads/           # Yüklenen görseller (git'e dahil değil)
```
