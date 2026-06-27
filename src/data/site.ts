import type { Project, Service } from '../types'

export const company = {
  name: 'AKAT Teknik İnşaat',
  shortName: 'AKAT',
  tagline: 'Modern ve şık çizgilerle yaşayan projelerin mimarıyız',
  description:
    'Asma tavan, bölme duvar, sıva, boya ve dış cephe çözümlerinde uzmanlaşmış, kaliteyi ve detayı önemseyen bir taahhüt firmasıyız.',
  founded: 2009,
  phone: '',
  phoneHref: '',
  email: 'tuncer@akatinsaat.com',
  emailHref: 'mailto:tuncer@akatinsaat.com',
  address:
    'Meclis Mahallesi Teraziler Caddesi Derviş Sokak No: 38/1 Sancaktepe / İstanbul',
  mapQuery: 'Meclis Mahallesi Teraziler Caddesi Sancaktepe İstanbul',
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
    slug: 'akbank-gn-md',
    title: 'Akbank Genel Müdürlük',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/akbank-gn-md.jpg',
    description:
      'Akbank genel müdürlük binasında asma tavan, bölme duvar ve dekorasyon uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 2,
    slug: 'arcelik-sutluce',
    title: 'Arçelik Sütlüce Genel Müdürlük',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/arcelik-sutluce.jpg',
    description:
      'Arçelik Sütlüce genel müdürlük binasında komple iç mekan taahhüt çözümleri.',
    status: 'Tamamlandı',
  },
  {
    id: 3,
    slug: 'sabanci-holding',
    title: 'Sabancı Holding',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/sabanci-holding.jpg',
    description:
      'Sabancı Holding ofis alanlarında asma tavan, bölme duvar ve özel yüzey uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 4,
    slug: 'reckitt-benckiser',
    title: 'Reckitt Benckiser',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/reckitt-benckiser.jpg',
    description:
      'Reckitt Benckiser genel müdürlük ofislerinde iç mekan ve dekorasyon uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 5,
    slug: 'enerjisa-gn-md',
    title: 'Enerjisa Genel Müdürlük',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/enerjisa-gn-md.jpg',
    description:
      'Enerjisa genel müdürlük binasında asma tavan ve bölme duvar sistemleri uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 6,
    slug: 'emaar-ortak-alanlar',
    title: 'Emaar Square Ortak Alanlar',
    category: 'Ticari',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/emaar-ortak-alanlar.jpg',
    description:
      'Emaar Square yaşam alanı ortak mekanlarında dekoratif tavan ve özel kaplama uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 7,
    slug: 'emaar-m1-lobi',
    title: 'Emaar Square M1 Lobi',
    category: 'Ticari',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/emaar-m1-lobi.jpg',
    description:
      'Emaar Square M1 blok lobi alanında özel tavan ve dekorasyon uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 8,
    slug: 'daiichi-sankyo',
    title: 'Daiichi Sankyo İlaç Genel Müdürlük',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2020',
    image: '/projects/daiichi-sankyo.jpg',
    description:
      'Daiichi Sankyo ilaç genel müdürlük binasında iç mekan ve dekorasyon taahhüt çözümleri.',
    status: 'Tamamlandı',
  },
  {
    id: 9,
    slug: 'nef-bodrum-reserve',
    title: 'Nef Bodrum Reserve',
    category: 'Konut',
    location: 'Bodrum',
    year: '2019',
    image: '/projects/nef-bodrum-reserve.jpg',
    description:
      'Nef Yalıkavak Reserve lüks konut projesinde dekoratif sıva, boya ve özel iç mekan uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 10,
    slug: 'siemens-17-nolu-bina',
    title: 'Siemens 17 Numaralı Bina',
    category: 'Endüstriyel',
    location: 'İstanbul',
    year: '2018',
    image: '/projects/siemens-17-nolu-bina.jpg',
    description:
      'Siemens 17 numaralı bina için asma tavan, bölme duvar ve iç mekan uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 11,
    slug: 'tuv-turk-gn-md',
    title: 'TÜV Türk Genel Müdürlük',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2017',
    image: '/projects/tuv-turk-gn-md.jpg',
    description:
      'TÜV Türk genel müdürlük ofis alanlarında asma tavan ve iç mekan uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 12,
    slug: 'bayer-gn-md',
    title: 'Bayer Genel Müdürlük',
    category: 'Ofis',
    location: 'İstanbul',
    year: '2017',
    image: '/projects/bayer-gn-md.jpg',
    description:
      'Bayer Türkiye genel müdürlük binasında ofis dekorasyon ve bölme duvar uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 13,
    slug: 'memorial-sisli',
    title: 'Memorial Şişli Hastanesi',
    category: 'Sağlık',
    location: 'İstanbul',
    year: '2016',
    image: '/projects/memorial-sisli.jpg',
    description:
      "Memorial Şişli Hastanesi'nde hijyen standartlarına uygun asma tavan ve bölme duvar uygulamaları.",
    status: 'Tamamlandı',
  },
  {
    id: 14,
    slug: 'memorial-bahcelievler',
    title: 'Memorial Bahçelievler Hastanesi',
    category: 'Sağlık',
    location: 'İstanbul',
    year: '2016',
    image: '/projects/memorial-bahcelievler.jpg',
    description:
      "Memorial Bahçelievler Hastanesi'nde asma tavan, bölme duvar ve özel yüzey uygulamaları.",
    status: 'Tamamlandı',
  },
  {
    id: 15,
    slug: 'dhl-tuzla-depo',
    title: 'DHL Tuzla Depo',
    category: 'Endüstriyel',
    location: 'Tuzla, İstanbul',
    year: '2016',
    image: '/projects/dhl-depo.jpg',
    description:
      'DHL Tuzla lojistik depo binasında geniş açıklıklı sıva, boya ve tavan uygulamaları.',
    status: 'Tamamlandı',
  },
  {
    id: 16,
    slug: 'gratis-tuzla-depo',
    title: 'Gratis Tuzla Depo',
    category: 'Endüstriyel',
    location: 'Tuzla, İstanbul',
    year: '2016',
    image: '/projects/gratis-tuzla-depo.jpg',
    description:
      'Gratis Tuzla depo ve idari binasında komple iç mekan taahhüt çözümleri.',
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
