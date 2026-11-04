import type { ImageMetadata } from 'astro';
import promoBank from '../assets/images/banners/banner-seabank.webp';

export type BannerFormat = 'billboard' | 'leaderboard' | 'inline' | 'rail';

export type Banner = {
  format: BannerFormat;
  enabled: boolean;
  position: string;
  image?: { src: ImageMetadata; alt: string; position?: string };
  href?: string;
  label?: string;
  adUnit?: { client: string; slot: string };
};

export const banners = {
  'home-billboard': {     // 4:1 atau 1600x400
    format: 'billboard',
    enabled: false,
    position: 'Beranda · setelah daftar brand',
  },
  'brand-rail': {         //	4:3 atau 800x600
    format: 'rail',
    enabled: false,
    position: 'Halaman brand · aside',
    adUnit: { client: 'ca-pub-xxxxxxxx', slot: '1234567890' },
  },
  'article-inline': {     // 16:5 atau 1120×350
    format: 'inline',
    enabled: true,
    position: 'Artikel · akhir isi',
      image: {
      src: promoBank,
      alt: 'Promo Seabank',
      position: '50% 50%',         // opsional, titik fokus crop
    },
    href: '#!', // opsional
    label: 'Iklan',
  },
  'directory-leaderboard': {  // 6:1 atau 1600x270
    format: 'leaderboard',
    enabled: false,
    position: 'Direktori · bawah tabel',
  },
  'category-leaderboard': {   // 6:1 atau 1600x270
    format: 'leaderboard',
    enabled: false,
    position: 'Kategori · bawah tabel',
  },
} satisfies Record<string, Banner>;

export type BannerId = keyof typeof banners;
