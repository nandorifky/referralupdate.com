const brandExamples = 'Bybit, SeaBank, ShopeePay';

export const ui = {
  skipLink: 'Lewati ke konten',
  breadcrumbLabel: 'Breadcrumb',
  lastChecked: 'Terakhir diperbarui',
  copyCode: 'Salin kode',
  brandExamples,
  brandCount: (count: number) => `${count} brand`,
  search: {
    label: 'Cari platform',
    heroPlaceholder: brandExamples,
    bandPlaceholder: 'Ketik nama brand',
    heroSubmit: 'Cari kode',
    bandSubmit: 'Cari',
  },
  nav: {
    search: 'Cari kode',
    mainLabel: 'Navigasi utama',
    menuLabel: 'Navigasi menu',
    menuToggle: 'Menu',
    close: 'Tutup',
  },
  footer: {
    navLabel: 'Navigasi footer',
    disclaimer:
      'Dapatkan informasi terbaru terkait kode referral dan program referral dari berbagai platform.',
    photoCreditFallback: 'Sumber foto',
  },
};
