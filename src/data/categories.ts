export const categorySlugs = [
  'e-wallet',
  'bank-digital',
  'investasi',
  'e-commerce',
  'travel',
  'food-delivery',
  'saas',
  'bisnis',
  'hiburan',
] as const;

export type CategorySlug = (typeof categorySlugs)[number];

export type Category = {
  slug: CategorySlug;
  name: string;
  line: string;
  description: string;
  intro: string;
  editorialUpdated: string;
};

export const categories: Category[] = [
  {
    slug: 'e-wallet',
    name: 'E-wallet',
    line: 'Bayar dan transfer.',
    description:
      'Dipakai untuk bayar QRIS, kirim uang, dan isi ulang. Bonus biasanya berupa saldo atau poin.',
    intro:
      'Dompet digital dipakai untuk bayar QRIS, transfer, dan isi ulang. Sebelum memakai kode referral, cek apakah aplikasinya menerima metode pembayaran yang kamu pakai. Lihat juga apakah bonus berupa saldo yang bisa ditarik atau poin yang hanya berlaku di merchant tertentu.\n\nPerhatikan syarat transaksi, masa berlaku bonus, dan kewajiban upgrade akun. Kode dengan bonus besar belum tentu cocok kalau kamu jarang memakai layanannya. Pilih kode yang syaratnya bisa kamu penuhi dengan pemakaian normal.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'bank-digital',
    name: 'Bank digital',
    line: 'Rekening tanpa cabang.',
    description:
      'Rekening tanpa cabang dengan bonus setelah rekening aktif dan setoran awal.',
    intro:
      'Bank digital membuka rekening lewat aplikasi tanpa datang ke cabang. Bonus referral biasanya diberikan setelah rekening aktif dan ada setoran awal. Cek biaya admin, batas transfer, dan apakah bonus masuk ke rekening utama atau terkunci di kantong tabungan.\n\nSiapkan KTP dan rekening atas nama sendiri untuk verifikasi. Baca juga apakah saldo harus ditahan beberapa hari atau cukup satu transaksi. Bunga dan bonus promo bisa berubah setelah kampanye selesai, jadi bandingkan syaratnya, bukan hanya nominal bonus.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'investasi',
    name: 'Investasi',
    line: 'Reksa dana, emas, saham.',
    description:
      'Aplikasi reksa dana, emas, dan saham. Bonus biasanya masuk setelah transaksi pertama.',
    intro:
      'Aplikasi investasi memakai kode referral untuk memberi bonus reksa dana, emas, atau saham setelah transaksi pertama. Pilih aplikasi yang izinnya bisa dicek di OJK, lalu pastikan produk yang kamu beli sesuai profil risiko. Jangan membeli aset berisiko hanya karena bonusnya.\n\nPerhatikan masa tahan bonus, biaya jual, dan syarat transaksi. Bonus tidak menghapus risiko investasi. Pakai dana yang memang siap diinvestasikan dan baca prospektus atau penjelasan produk sebelum membeli.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'e-commerce',
    name: 'E-commerce',
    line: 'Voucher belanja.',
    description:
      'Marketplace untuk belanja harian. Bonus berupa voucher, koin, atau potongan ongkir.',
    intro:
      'Marketplace memberi voucher, koin, atau potongan ongkir untuk pembeli baru. Sebelum memakai kode referral atau kode promo, cek minimum belanja, kategori produk yang ikut promo, dan apakah voucher bisa digabung dengan diskon toko.\n\nHitung total akhir di checkout, bukan hanya nilai voucher. Ongkir dan biaya layanan bisa menghapus potongannya. Pastikan juga kamu memang butuh produk yang dibeli, karena belanja tambahan sering membuat pengeluaran lebih besar daripada bonus yang didapat.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'travel',
    name: 'Travel',
    line: 'Tiket dan hotel.',
    description:
      'Tiket dan hotel dengan potongan untuk pemesanan pertama. Cek aturan pembatalan.',
    intro:
      'Kode travel biasanya memotong harga tiket, hotel, atau paket perjalanan untuk pemesanan pertama. Perhatikan produk yang ikut promo, tanggal perjalanan yang berlaku, dan aturan pembatalan sebelum membayar.\n\nBandingkan harga akhir di beberapa tanggal. Biaya ubah jadwal dan promo musim liburan bisa membuat potongan kecil tidak terasa. Simpan bukti pemesanan supaya mudah ditanyakan ke dukungan resmi kalau bonus tidak masuk.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'food-delivery',
    name: 'Food delivery',
    line: 'Diskon pesanan.',
    description:
      'Diskon pesanan untuk akun baru. Cek area layanan dan minimum pesanan sebelum memakai kode.',
    intro:
      'Diskon food delivery berlaku untuk pesanan pertama di merchant tertentu. Cek area layanan, minimum pesanan, biaya pengiriman, dan apakah diskon memotong harga makanan atau hanya ongkir.\n\nPilih restoran yang memang ingin kamu pesan. Biaya layanan dan ongkir tetap dihitung, jadi total pesanan bisa lebih mahal meskipun ada diskon. Bandingkan total akhir sebelum checkout.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'saas',
    name: 'SaaS & produktivitas',
    line: 'Kredit alat kerja.',
    description:
      'Aplikasi kerja seperti desain dan catatan memberi kredit atau diskon langganan untuk akun baru.',
    intro:
      'Kode referral aplikasi kerja memberi kredit, diskon langganan, atau masa uji tambahan. Cocokkan paket dengan kebutuhan tim, lalu cek apakah kredit melekat pada satu akun atau bisa dipakai bersama.\n\nBaca harga setelah masa promo dan aturan perpanjangan otomatis. Berhenti berlangganan sebelum tanggal perpanjangan kalau kredit sudah habis dan paket tidak lagi dipakai. Jangan memilih paket tahunan hanya karena diskonnya lebih besar.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'bisnis',
    name: 'Bisnis & UMKM',
    line: 'Pembayaran usaha.',
    description:
      'Layanan pembayaran dan kasir untuk usaha kecil. Bonus biasanya berupa komisi atau potongan biaya.',
    intro:
      'Aplikasi bisnis dipakai untuk menerima pembayaran, mencatat penjualan, dan mengatur kas usaha kecil. Program referalnya biasanya memberi komisi per merchant yang bergabung, bukan bonus tunai sekali masuk. Nilai komisi bergantung pada aktivitas usaha yang diundang.\n\nPerhatikan syarat verifikasi dokumen usaha, biaya transaksi setelah masa promo, dan jangka waktu komisi. Mendaftarkan usaha orang lain tanpa izin bisa menimbulkan masalah. Pastikan rekening pencairan komisi memakai nama pemilik usaha yang sama.',
    editorialUpdated: '2026-10-31',
  },
  {
    slug: 'hiburan',
    name: 'Hiburan & bacaan',
    line: 'Poin undangan.',
    description:
      'Aplikasi hiburan dan bacaan memberi poin untuk akun baru. Cek cara tukar poin dan masa berlakunya.',
    intro:
      'Aplikasi hiburan dan bacaan memberi poin untuk membaca, check-in, atau mengundang teman. Poin biasanya baru bernilai setelah ditukar ke hadiah atau saldo. Kurs tukarnya bisa berubah mengikuti ketentuan aplikasi.\n\nCek masa berlaku poin dan syarat penukaran sebelum mengumpulkan banyak poin. Untuk tautan undangan, pastikan domainnya sesuai dengan situs resmi aplikasi. Unduh aplikasi hanya dari Google Play atau App Store.',
    editorialUpdated: '2026-10-31',
  },
];

export function getCategories() {
  return categories;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
