export const blogCategorySlugs = [
  'knowledge',
  'review',
  'perbandingan',
  'verifikasi-akun',
  'bonus-pengguna-baru',
] as const;

export type BlogCategorySlug = (typeof blogCategorySlugs)[number];

export type BlogCategory = {
  slug: BlogCategorySlug;
  name: string;
  line: string;
  description: string;
  intro: string;
  editorialUpdated: string;
};

export const blogCategories: BlogCategory[] = [
  {
    slug: 'knowledge',
    name: 'Knowledge',
    line: 'Arti dan cara kerja.',
    description:
      'Penjelasan dasar kode referral: artinya, cara kerjanya, bedanya dengan kode promo, dan cara memakainya tanpa salah langkah.',
    intro:
      'Kode referral adalah kode milik pengguna lama yang dipakai pengguna baru saat mendaftar, dan biasanya memberi bonus untuk kedua pihak.\n\nArtikel di kategori ini menjelaskan arti kode referral, cara kerjanya, dan bedanya dengan kode promo. Setiap artikel memakai sumber resmi brand dan mencantumkan tanggal pengecekan, jadi kamu tahu kapan terakhir diperiksa.',
    editorialUpdated: '2026-11-14',
  },
  {
    slug: 'review',
    name: 'Review',
    line: 'Kelebihan dan kekurangan.',
    description:
      'Ulasan produk dan layanan seputar kode referral: kelebihan, kekurangan, biaya, dan siapa yang cocok memakainya.',
    intro:
      'Review di sini bukan pujian. Kelebihan dan kekurangan ditulis sama panjang, lengkap dengan biaya, syarat, dan batas pemakaian dari sumber resmi.\n\nKami menandai hal yang sering terlewat: verifikasi yang diminta, dana yang tertahan, dan ketergantungan pada aplikasi. Tanggal pengecekan dicantumkan karena biaya dan syarat bisa berubah kapan saja.',
    editorialUpdated: '2026-11-14',
  },
  {
    slug: 'perbandingan',
    name: 'Perbandingan',
    line: 'Dua brand, satu kriteria.',
    description:
      'Perbandingan dua brand atau lebih dengan kriteria yang sama: biaya, limit, bonus, dan kemudahan pemakaian.',
    intro:
      'Perbandingan memakai satu tabel dan satu set kriteria untuk semua brand: biaya transaksi, limit, cara klaim bonus, dan waktu sampai akun siap dipakai.\n\nDatanya diambil dari halaman resmi masing-masing brand pada tanggal yang sama. Setiap perbandingan ditutup dengan penjelasan siapa cocok memakai layanan mana, bukan klaim "yang terbaik" tanpa konteks.',
    editorialUpdated: '2026-11-14',
  },
  {
    slug: 'verifikasi-akun',
    name: 'Verifikasi akun',
    line: 'Daftar dan upgrade.',
    description:
      'Panduan pendaftaran dan upgrade akun: dokumen yang disiapkan, langkah verifikasi, dan penyebab umum gagal.',
    intro:
      'Verifikasi akun menentukan besar saldo yang bisa disimpan, limit transaksi, dan bonus yang bisa diklaim.\n\nArtikel di kategori ini menuliskan langkah pendaftaran dan upgrade secara berurutan, dokumen yang disiapkan, penyebab umum gagal, dan apa yang perlu dilakukan setelahnya. Semua langkah mengacu ke panduan resmi brand yang berlaku saat artikel diperbarui.',
    editorialUpdated: '2026-11-14',
  },
  {
    slug: 'bonus-pengguna-baru',
    name: 'Bonus pengguna baru',
    line: 'Bonus untuk akun baru.',
    description:
      'Bonus dan promo untuk pengguna baru: besar bonus, syarat klaim, masa berlaku, dan kapan bonus benar-benar cair.',
    intro:
      'Bonus pengguna baru biasanya cair setelah akun aktif dan syarat tertentu terpenuhi, bukan saat kode dimasukkan.\n\nArtikel di kategori ini menuliskan syarat itu satu per satu: transaksi minimum, masa aktif, dan batas waktu klaim. Nominal bonus selalu disertai tanggal pengecekan, dan bentuk bonusnya dijelaskan, apakah saldo yang bisa ditarik atau poin yang hanya berlaku di merchant tertentu.',
    editorialUpdated: '2026-11-14',
  },
];

export function blogCategoryName(slug: BlogCategorySlug) {
  return blogCategories.find((category) => category.slug === slug)?.name ?? slug;
}

export function getBlogCategory(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}
