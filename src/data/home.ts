export const homeMeta = {
  title: 'Kode Referral Terbaru, Aktif, dan Valid',
  description:
    'Temukan berbagai kode referral terbaru dan valid dari berbagai platform. Cek syarat, bonus, dan cara pakai kodenya.',
};

export const homeHero = {
  heading: 'Referral Update.',
  lead: 'Dapatkan informasi valid dan terkini tentang kode referral terbaru dari berbagai platform, pasti cuan maksimal!',
  facts: (active: number, total: number, categories: number) =>
    `${active} dari ${total} brand berstatus aktif di ${categories} kategori.`,
  links: [
    { label: 'Lihat semua kode referral', href: '/kode-referral/' },
    { label: 'Baca metodologi verifikasi', href: '/metodologi-verifikasi/' },
  ],
  card: {
    label: 'Kode terbaru',
    detailLabel: 'Lihat detail',
    ariaLabel: (name: string) => `Kode referral terbaru ${name}`,
  },
};

export const homeProcess = {
  heading: 'Cara kami mengecek kode referral.',
  intro: 'Empat langkah, dengan pengecekan ulang berkala.',
  steps: [
    {
      title: 'Kode dari tim editorial',
      body: 'Kami membagikan kode referral valid yang digunakan oleh tim editorial.',
    },
    {
      title: 'Buka halaman program resmi',
      body: 'Kami baca halaman program, pusat bantuan, dan toko aplikasi brand.',
    },
    {
      title: 'Catat bonus dan syarat',
      body: 'Kami catat pengguna baru, minimum transaksi, dan masa berlaku.',
    },
    {
      title: 'Tandai entri lewat 30 hari',
      body: 'Entri yang lewat 30 hari masuk daftar pengecekan ulang. Kalau program berubah, status kode diperbarui.',
    },
  ],
  link: { label: 'Baca cara pengecekan lengkap', href: '/metodologi-verifikasi/' },
};

export const homeChecks = {
  heading: 'Cek syaratnya sebelum mengejar bonus.',
  headingId: 'syarat',
  link: { label: 'Baca panduan keamanan', href: '/blog/cara-aman-memakai-kode-referral/' },
  items: [
    {
      title: 'Kode masuk saat mendaftar.',
      body: 'Beberapa program hanya menerima kode sebelum akun aktif.',
    },
    {
      title: 'Syaratnya bisa kamu penuhi.',
      body: 'Verifikasi identitas, transaksi pertama, atau saldo ditahan bisa menjadi syarat.',
    },
    {
      title: 'Masa berlakunya masih terbuka.',
      body: 'Cek tanggal berakhir dan batas klaim sebelum bertransaksi.',
    },
    {
      title: 'Biaya tidak melebihi bonus.',
      body: 'Hitung total biaya sebelum bertransaksi.',
    },
  ],
};

export const homeLedger = {
  heading: 'Kode referral aktif dan tanggal ceknya.',
  intro: 'Diurutkan dari tanggal cek terbaru.',
  caption: 'Brand aktif dengan kode referral dan tanggal cek',
  limit: 4,
  noteBefore: 'Menampilkan brand aktif saja.',
  link: { label: 'Lihat semua kode', href: '/kode-referral/' },
  noteAfter: 'untuk entri lain.',
};

export const homeCategories = {
  heading: 'Cari kode referral per kategori.',
  headingId: 'kategori',
  intro: 'Syaratnya berbeda di tiap layanan.',
};

export const homeNotes = {
  heading: 'Panduan sebelum memakai kode referral.',
  intro: 'Baca soal syarat, keamanan, dan cara klaim bonus.',
  imageSizes:
    '(max-width: 40rem) calc(100vw - 2rem), (max-width: 60rem) calc(41.667vw - 2rem), (min-width: 90rem) 26rem, calc(33.333vw - 4rem)',
  imageWidths: [480, 640, 960],
};

export const homeClosing = {
  heading: 'Cari kode referral brand yang kamu pakai.',
  intro: 'Cek syarat dan bonus sebelum mendaftar.',
};

export const homeStructuredData = {
  collectionPageName: 'Update Kode Referral Terbaru dan Valid',
  itemListName: 'Kode referral aktif dengan tanggal cek',
  itemName: (brandName: string) => `Kode referral ${brandName}`,
};

export const homeOg = {
  alt: (active: number, total: number, date: string) =>
    `Kartu Referral Update: ${active} dari ${total} brand aktif, dicek hingga ${date}.`,
  title: 'Referral Update: Cuan dari kode referral.',
  description: (active: number, total: number, date: string) =>
    `${active} dari ${total} brand aktif. Dicek hingga ${date}.`,
};
