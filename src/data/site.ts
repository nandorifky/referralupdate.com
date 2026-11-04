import type { ImageMetadata } from 'astro';
import { footerItems, navItems } from './routes';

export const PREVIEW = false;
export const SITE_URL = 'https://referralupdate.com';

export function siteOrigin(configured?: URL) {
  return configured ?? new URL(SITE_URL);
}

export type OgImage = { path: string; alt: string };

export const defaultOgImage: OgImage = {
  path: '/open-graph/default.png',
  alt: 'Kartu Referral Update: direktori independen kode referral Indonesia.',
};

export const site = {
  name: 'Referral Update',
  tagline: 'Pasti Cuan Maksimal!',
  title: 'Info Kode Referral Terbaru, Valid, dan Aktif',
  description:
    'Cari kode referral aplikasi dan layanan digital di Indonesia. Lihat bonus, syarat, status, dan tanggal cek sebelum mendaftar.',
  email: 'halo@referralupdate.com',
  orgDescription: 'Direktori independen kode referral untuk layanan digital di Indonesia.',
  logo: { path: '/brand-mark-512.png', width: 512, height: 512 },
  copyrightYear: new Date().getFullYear(),
  nav: navItems,
  footer: footerItems,
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
