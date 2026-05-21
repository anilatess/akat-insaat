// Initial content used to seed the database on first run.
// Icons are stored as string keys; the frontend maps them to lucide-react components.

export const seedServices = [
  {
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

export const seedProjects = [
  {
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
