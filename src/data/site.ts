import type { ImageMetadata } from 'astro';

import businesswomanSrc from '../assets/images/young-businesswoman-holding-her-smartphone-in-the-home-offic-1920.jpg';

export const PREVIEW = false;

export type OgImage = { path: string; alt: string };

export const defaultOgImage: OgImage = {
  path: '/open-graph/default.png',
  alt: 'Kartu Referral Update: direktori independen kode referral Indonesia.',
};

export const site = {
  name: 'Referral Update',
  tagline: 'Pasti Cuan Maksimal!',
  title: 'Direktori kode referral Indonesia',
  description:
    'Cari kode referral aplikasi dan layanan digital di Indonesia. Lihat bonus, syarat, status, dan tanggal cek sebelum mendaftar.',
  nav: [
    { label: 'Direktori', href: '/kode-referral/' },
    { label: 'Kategori', href: '/kategori/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Cara kami cek', href: '/metodologi-verifikasi/' },
  ],
  footer: [
    { label: 'Direktori', href: '/kode-referral/' },
    { label: 'Kategori', href: '/kategori/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Cara kami cek', href: '/metodologi-verifikasi/' },
    { label: 'Tautan affiliate', href: '/disclosure-affiliate/' },
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

export type PhotoFrame = {
  src: ImageMetadata;
  alt: string;
  position: string;
};

export type Photo = PhotoFrame & {
  author: string;
  license: string;
  source: string;
};

const businesswoman: Photo = {
  src: businesswomanSrc,
  alt: 'Perempuan muda memegang ponsel di meja kerjanya.',
  position: '60% 45%',
  author: 'Shixart1985',
  license: 'CC BY 2.0',
  source:
    'https://commons.wikimedia.org/wiki/File:Young_businesswoman_holding_her_smartphone_in_the_home_office.jpg',
};

// Ganti src, alt, dan position di sini untuk memasang foto sendiri.
export const photos = {
  hero: businesswoman,
} as const;

export const photoCredits: Photo[] = [businesswoman];

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
