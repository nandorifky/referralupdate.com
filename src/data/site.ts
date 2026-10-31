import type { CategorySlug } from './categories';

export const PREVIEW = true;

export const site = {
  name: 'KodeReferral',
  title: 'Kode referral Indonesia yang dicek ulang',
  description:
    'Cari kode referral untuk e-wallet, bank digital, investasi, dan e-commerce. Lihat bonus, syarat, dan tanggal cek sebelum mendaftar.',
  nav: [
    { label: 'Direktori', href: '/kode-referral/' },
    { label: 'Kategori', href: '/kategori/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Metodologi', href: '/metodologi-verifikasi/' },
  ],
  footer: [
    { label: 'Direktori', href: '/kode-referral/' },
    { label: 'Kategori', href: '/kategori/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Metodologi', href: '/metodologi-verifikasi/' },
    { label: 'Disclosure affiliate', href: '/disclosure-affiliate/' },
    { label: 'Privasi', href: '/privasi/' },
    { label: 'Tentang', href: '/tentang/' },
  ],
};

const longDate = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const shortDate = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
});

export function formatIdDate(iso: string) {
  return longDate.format(new Date(`${iso}T00:00:00Z`));
}

export function formatIdDateShort(iso: string) {
  return shortDate.format(new Date(`${iso}T00:00:00Z`));
}

export type Photo = {
  src: string;
  alt: string;
  position: string;
  author: string;
  license: string;
  source: string;
};

const businesswoman: Photo = {
  src: '/images/young-businesswoman-holding-her-smartphone-in-the-home-offic-1920.jpg',
  alt: 'Perempuan muda memegang ponsel di meja kerjanya.',
  position: '60% 45%',
  author: 'Shixart1985',
  license: 'CC BY 2.0',
  source:
    'https://commons.wikimedia.org/wiki/File:Young_businesswoman_holding_her_smartphone_in_the_home_office.jpg',
};

const screenPrinting: Photo = {
  src: '/images/screen-printing-demonstration-1920.jpg',
  alt: 'Tangan menarik rakel di atas layar sablon berwarna merah.',
  position: '50% 50%',
  author: 'Ahmad Ali Karim',
  license: 'CC0',
  source:
    'https://commons.wikimedia.org/wiki/File:Screen_printing_demonstration_at_TEDxUTM.jpg',
};

const woodType: Photo = {
  src: '/images/wood-type-close-up-1920.jpg',
  alt: 'Blok huruf kayu letterpress tersusun terbalik.',
  position: '50% 50%',
  author: 'Adam Lusch',
  license: 'CC BY-SA 2.0',
  source: 'https://commons.wikimedia.org/wiki/File:Wood_Type_close-up.jpg',
};

const openBook: Photo = {
  src: '/images/open-book-b-w-1920.jpg',
  alt: 'Buku terbuka dengan halaman bertulisan.',
  position: '50% 60%',
  author: 'Bibliothek Wissenschaftspark Albert Einstein',
  license: 'CC BY-SA 4.0',
  source: 'https://commons.wikimedia.org/wiki/File:Open_Book_b%26w.jpg',
};

const phonePayment: Photo = {
  src: '/images/mobile-payment-hand-1920.jpg',
  alt: 'Tangan memegang ponsel di dekat mesin pembaca kartu.',
  position: '50% 55%',
  author: 'Bogdan Hoyaux / European Commission',
  license: 'CC BY 4.0',
  source: 'https://commons.wikimedia.org/wiki/File:P059743-876254.jpg',
};

const cardTerminal: Photo = {
  src: '/images/mobile-payment-1920.jpg',
  alt: 'Mesin pembaca kartu dan ponsel di atas meja.',
  position: '50% 50%',
  author: 'European Commission',
  license: 'CC BY 4.0',
  source: 'https://commons.wikimedia.org/wiki/File:P059743-518704.jpg',
};

const goldBars: Photo = {
  src: '/images/gold-bars-1920.jpg',
  alt: 'Batangan emas berjajar dengan cap berat dan kadar.',
  position: '50% 55%',
  author: 'Chepry (Andrzej Barabasz)',
  license: 'CC BY-SA 4.0',
  source: 'https://commons.wikimedia.org/wiki/File:400-oz-Gold-Bars-AB-01.jpg',
};

const cargoBike: Photo = {
  src: '/images/cargo-bike-parcels-1920.jpg',
  alt: 'Sepeda kargo memuat tumpukan paket di jalan kota.',
  position: '50% 55%',
  author: 'Alan',
  license: 'CC BY 2.0',
  source: 'https://commons.wikimedia.org/wiki/File:Parcel_delivery_by_freight_bicycle_2016.jpg',
};

const airportHall: Photo = {
  src: '/images/helsinki-airport-1920.jpg',
  alt: 'Aula keberangkatan bandara dengan langit-langit melengkung.',
  position: '50% 45%',
  author: 'kallerna',
  license: 'CC BY-SA 4.0',
  source: 'https://commons.wikimedia.org/wiki/File:Helsinki_airport_departure_hall_1.jpg',
};

const morningMarket: Photo = {
  src: '/images/morning-market-1920.jpg',
  alt: 'Pasar pagi dengan dagangan sayur yang ditata rapi.',
  position: '50% 45%',
  author: 'Touam (Hervé Agnoux)',
  license: 'CC BY-SA 4.0',
  source:
    'https://commons.wikimedia.org/wiki/File:Matin_ensoleill%C3%A9_au_march%C3%A9_de_la_Terrasse.jpg',
};

const deskWorkspace: Photo = {
  src: '/images/desk-workspace-1920.jpg',
  alt: 'Laptop, cangkir kopi, dan tanaman di meja kerja.',
  position: '50% 50%',
  author: 'Shixart1985',
  license: 'CC BY 2.0',
  source:
    'https://commons.wikimedia.org/wiki/File:Working_at_a_desk_with_a_laptop_coffee_cup_and_a_plant_on_a_white_surface.jpg',
};

// Ganti src, alt, dan position di sini untuk memasang foto sendiri.
export const photos = {
  hero: businesswoman,
  split: screenPrinting,
  blog: woodType,
  article: openBook,
} as const;

export const brandPhotos: Record<CategorySlug, Photo> = {
  'e-wallet': phonePayment,
  'bank-digital': cardTerminal,
  investasi: goldBars,
  'e-commerce': cargoBike,
  travel: airportHall,
  'food-delivery': morningMarket,
  saas: deskWorkspace,
};

export const photoCredits: Photo[] = [
  businesswoman,
  screenPrinting,
  woodType,
  openBook,
  phonePayment,
  cardTerminal,
  goldBars,
  cargoBike,
  airportHall,
  morningMarket,
  deskWorkspace,
];

export function breadcrumbLd(items: { name: string; path: string }[], origin: URL) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, origin).toString(),
    })),
  };
}
