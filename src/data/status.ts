import type { Brand } from '../lib/content';

export const brandStatusLabels = {
  active: 'Aktif',
  unverified: 'Belum terverifikasi',
  expired: 'Program berakhir',
} as const satisfies Record<Brand['status'], string>;

export const brandStatusLabelsShort = {
  active: 'Aktif',
  unverified: 'Belum terverifikasi',
  expired: 'Berakhir',
} as const satisfies Record<Brand['status'], string>;
