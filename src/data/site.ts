import type { Project, Service } from '../types'

export const company = {
  name: 'AKAT İnşaat',
  shortName: 'AKAT',
  tagline: 'Modern ve şık çizgilerle yaşayan projelerin mimarıyız',
  description:
    'Asma tavan, bölme duvar, sıva, boya ve dış cephe çözümlerinde uzmanlaşmış, kaliteyi ve detayı önemseyen bir taahhüt firmasıyız.',
  founded: 2009,
  phone: '0(216) 642 54 06',
  phoneHref: 'tel:+902166425406',
  email: 'info@akat-insaat.com',
  emailHref: 'mailto:info@akat-insaat.com',
  fax: '0(216) 312 24 36',
  address:
    'Mimar Sinan Mh. Çavuşbaşı Cad. Özge Sokak Birleşim İş Merkezi No: 5 D: 4 Çekmeköy / İstanbul',
  mapQuery: 'Çekmeköy İstanbul',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
}

export type NavItem = { label: string; to: string }

export const navItems: NavItem[] = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Kurumsal', to: '/kurumsal' },
  { label: 'Hizmetler', to: '/hizmetler' },
  { label: 'Projeler', to: '/projeler' },
  { label: 'İletişim', to: '/iletisim' },
]

// Fallback content — shown if the API is unreachable. The live site loads
// projects & services from the backend (managed via the admin panel).
export const fallbackServices: Service[] = [
  {
    id: 1,
    slug: 'asma-tavan',
    icon: 'Layers',
    title: 'Asma Tavan Sistemleri',
    short: 'Alçıpan, taşyünü, metal ve lineer asma tavan uygulamaları.',
    description:
      'Akustik, dekoratif ve fonksiyonel ihtiyaçlara göre tasarlanan asma tavan sistemleri ile mekanlarınıza estetik ve modern bir görünüm kazandırıyoruz.',
    features: [
      'Alçıpan asma tavan',
      'Taşyünü tavan sistemleri',
      'Metal & lineer tavan',
      'Akustik tavan çözümleri',
    ],
  },
  {
    id: 2,
    slug: 'bolme-duvar',
    icon: 'LayoutPanelLeft',
    title: 'Bölme Duvar Sistemleri',
    short: 'Alçıpan ve gazbeton bölme duvar ile esnek mekan kurguları.',
    description:
      'Ofis, hastane ve ticari alanlar için ses ve yangın yalıtımlı, hızlı kurulan bölme duvar sistemleri ile mekanları ihtiyaca göre bölümlendiriyoruz.',
    features: [
      'Alçıpan bölme duvar',
      'Gazbeton duvar',
      'Ses & yangın yalıtımı',
      'Cam bölme sistemleri',
    ],
  },
  {
    id: 3,
    slug: 'siva',
    icon: 'Grid2x2',
    title: 'Sıva Uygulamaları',
    short: 'Çimento esaslı ve dekoratif sıva uygulamaları.',
    description:
      'Düzgün ve dayanıklı yüzeyler için makineli ve elle çimento esaslı sıva ile dekoratif sıva uygulamalarını profesyonel ekibimizle gerçekleştiriyoruz.',
    features: [
      'Çimento esaslı sıva',
      'Makine sıva',
      'Dekoratif sıva',
      'Saten & alçı sıva',
    ],
  },
  {
    id: 4,
    slug: 'boya-cephe',
    icon: 'Brush',
    title: 'Boya ve Dış Cephe',
    short: 'İç-dış boya, ısı yalıtımı ve mantolama uygulamaları.',
    description:
      'Bina ömrünü uzatan ve enerji tasarrufu sağlayan ısı yalıtım (mantolama) sistemleri ile iç ve dış mekan boya uygulamalarında kaliteli malzeme kullanıyoruz.',
    features: [
      'İç & dış cephe boyası',
      'Mantolama (ısı yalıtımı)',
      'Dekoratif cephe kaplama',
      'Su yalıtımı',
    ],
  },
  {
    id: 5,
    slug: 'zemin-duvar-kaplama',
    icon: 'PaintRoller',
    title: 'Zemin & Duvar Kaplama',
    short: 'Seramik, fayans ve dekoratif duvar kaplama uygulamaları.',
    description:
      'Kullanım alanına uygun seramik, fayans ve dekoratif kaplama uygulamaları ile zemin ve duvarlarınıza şık, dayanıklı bir görünüm sağlıyoruz.',
    features: [
      'Seramik & fayans',
      'Granit & doğal taş',
      'Dekoratif duvar kaplama',
      'Epoksi zemin',
    ],
  },
  {
    id: 6,
    slug: 'anahtar-teslim',
    icon: 'Building2',
    title: 'Anahtar Teslim Projeler',
    short: 'Komple iç mekan ve dekorasyon taahhüt çözümleri.',
    description:
      'Projelendirmeden uygulamaya kadar tüm süreci yöneterek, ofis ve ticari alanlar için anahtar teslim dekorasyon ve tadilat hizmeti sunuyoruz.',
    features: [
      'Proje & tasarım',
      'Komple tadilat',
      'Ofis dekorasyonu',
      'Proje yönetimi',
    ],
  },
]

export const fallbackProjects: Project[] = [
  {
    id: 1,
    slug: 'memorial-bahcelievler',
    title: 'Memorial Bahçelievler Hastanesi',
    category: 'Sağlık',
    location: 'İstanbul',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    description:
      'Hijyen standartlarına uygun asma tavan ve bölme duvar sistemleri uygulaması.',
    status: 'Tamamlandı',
  },
  {
    id: 2,
    slug: 'dhl-tuzla-lojistik',
    title: 'DHL Tuzla Depo & Lojistik Binası',
    category: 'Endüstriyel',
    location: 'Tuzla, İstanbul',
    year: '2022',
    image:
      'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=80',
    description:
      'Geniş açıklıklı lojistik yapısında sıva, boya ve zemin kaplama uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 3,
    slug: 'gratis-tuzla',
    title: 'Gratis Tuzla Depo Binası',
    category: 'Endüstriyel',
    location: 'Tuzla, İstanbul',
    year: '2022',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    description: 'Depo ve idari alanlar için komple iç mekan taahhüt çözümleri.',
    status: 'Tamamlandı',
  },
  {
    id: 4,
    slug: 'nef-yalikavak',
    title: 'Nef Yalıkavak Projesi',
    category: 'Konut',
    location: 'Bodrum',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description:
      'Lüks konut projesinde dekoratif sıva, boya ve özel kaplama uygulamaları.',
    status: 'Devam Ediyor',
  },
  {
    id: 5,
    slug: 'memorial-sisli',
    title: 'Memorial Şişli Hastanesi',
    category: 'Sağlık',
    location: 'İstanbul',
    year: '2021',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    description:
      'Sağlık yapısında akustik tavan ve yangın yalıtımlı bölme duvar uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 6,
    slug: 'ozbag-ofis',
    title: 'Özbağ Ofis Projesi',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    description:
      'Modern ofis alanı için anahtar teslim dekorasyon ve bölme duvar çözümleri.',
    status: 'Tamamlandı',
  },
]

export type Stat = { value: string; label: string }

export const stats: Stat[] = [
  { value: '15+', label: 'Yıllık Tecrübe' },
  { value: '250+', label: 'Tamamlanan Proje' },
  { value: '180+', label: 'Mutlu Müşteri' },
  { value: '40+', label: 'Uzman Ekip' },
]

export type Step = { number: string; title: string; description: string }

export const processSteps: Step[] = [
  {
    number: '01',
    title: 'Keşif & Analiz',
    description:
      'Sahada inceleme yaparak ihtiyaçlarınızı analiz eder, ölçüm ve değerlendirme gerçekleştiririz.',
  },
  {
    number: '02',
    title: 'Tasarım & Planlama',
    description:
      'İhtiyaca uygun çözümleri projelendirir, malzeme ve maliyet planını şeffaf şekilde sunarız.',
  },
  {
    number: '03',
    title: 'Uygulama',
    description:
      'Uzman ekibimizle, iş güvenliği kurallarına uygun şekilde uygulamayı zamanında tamamlarız.',
  },
  {
    number: '04',
    title: 'Teslim & Garanti',
    description:
      'Kalite kontrolünü tamamlar, projeyi teslim eder ve uygulama garantisi sağlarız.',
  },
]

export type Value = { title: string; description: string }

export const values: Value[] = [
  {
    title: 'Kalite Odaklılık',
    description:
      'Her projede en kaliteli malzemeleri ve doğru uygulama tekniklerini kullanırız.',
  },
  {
    title: 'Zamanında Teslim',
    description:
      'Planlanan takvime sadık kalır, projeleri söz verdiğimiz sürede teslim ederiz.',
  },
  {
    title: 'Güven & Şeffaflık',
    description:
      'Maliyet ve süreçte şeffaf iletişimi esas alır, müşteri memnuniyetini önceleriz.',
  },
  {
    title: 'İş Güvenliği',
    description:
      'Tüm sahalarda iş sağlığı ve güvenliği standartlarına eksiksiz uyarız.',
  },
]
