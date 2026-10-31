export const categorySlugs = [
  'e-wallet',
  'bank-digital',
  'investasi',
  'e-commerce',
  'travel',
  'food-delivery',
  'saas',
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
    line: 'Saldo dan poin.',
    description:
      'Dipakai untuk bayar, kirim uang, dan isi ulang. Bonus biasanya berupa saldo atau poin.',
    intro:
      'Dompet digital dipakai untuk bayar QRIS, transfer, dan isi ulang. Sebelum memakai kode referral, pastikan aplikasinya menerima metode pembayaran yang kamu pakai dan cek apakah bonus berupa saldo yang bisa ditarik atau poin yang hanya berlaku di merchant tertentu.\n\nJebakan yang sering muncul adalah bonus kecil dengan syarat transaksi besar, masa berlaku pendek, atau akun harus di-upgrade lebih dulu. Cocokkan syarat itu dengan kebiasaan harianmu; kode dengan bonus besar tidak berguna kalau layanannya tidak kamu pakai.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'bank-digital',
    name: 'Bank digital',
    line: 'Bunga dan bonus.',
    description:
      'Rekening tanpa cabang dengan bonus setelah rekening aktif dan setoran awal.',
    intro:
      'Bank digital memberi bonus setelah rekening aktif dan ada setoran awal. Perhatikan biaya admin, batas transfer, dan apakah bonus masuk ke rekening utama atau terkunci di kantong tabungan. Rekening yang tidak aktif dalam periode tertentu bisa kehilangan bonus.\n\nJebakan umumnya ada pada setoran minimum dan verifikasi identitas. Siapkan KTP dan rekening atas nama sendiri, lalu baca apakah saldo harus ditahan atau cukup satu transaksi. Bandingkan juga bunga yang berlaku, karena angka promo sering berubah setelah kampanye selesai.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'investasi',
    name: 'Investasi',
    line: 'Reksa dana, emas, saham.',
    description:
      'Aplikasi reksa dana, emas, dan saham. Bonus masuk setelah transaksi pertama.',
    intro:
      'Kode referral investasi biasanya memberi bonus reksa dana, emas, atau saham setelah transaksi pertama. Pilih aplikasi yang izinnya bisa dicek di OJK, lalu pastikan produk yang kamu beli sesuai profil risiko, bukan sekadar mengejar bonus.\n\nJebakan yang perlu diwaspadai: bonus dengan masa tahan, biaya jual yang menggerus keuntungan, dan syarat transaksi yang memaksa kamu membeli aset berisiko. Bonus tidak pernah menghapus risiko investasi; pakai dana yang memang siap diinvestasikan.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'e-commerce',
    name: 'E-commerce',
    line: 'Voucher dan koin.',
    description:
      'Marketplace untuk belanja harian. Bonus berupa voucher, koin, atau potongan ongkir.',
    intro:
      'Marketplace memberi voucher, koin, atau potongan ongkir untuk pembeli baru. Sebelum memakai kode, cek minimum belanja, kategori produk yang ikut promo, dan apakah voucher bisa digabung dengan diskon toko.\n\nJebakan paling sering adalah voucher yang hanya berlaku untuk produk tertentu atau kedaluwarsa cepat. Hitung total akhir di checkout, bukan hanya nilai voucher, lalu pastikan ongkir dan biaya layanan tidak menghapus potongannya.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'travel',
    name: 'Travel',
    line: 'Tiket dan hotel.',
    description:
      'Tiket dan hotel dengan potongan untuk pemesanan pertama. Cek aturan pembatalan.',
    intro:
      'Kode travel biasanya memotong tiket, hotel, atau paket perjalanan untuk pemesanan pertama. Perhatikan produk yang ikut promo, tanggal perjalanan yang berlaku, dan aturan pembatalan sebelum membayar.\n\nJebakan yang sering muncul adalah potongan kecil dengan minimum transaksi besar, biaya ubah jadwal, atau promo yang tidak berlaku saat musim liburan. Bandingkan harga akhir di beberapa tanggal sebelum memutuskan, dan simpan bukti pemesanan jika bonus tidak masuk.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'food-delivery',
    name: 'Food delivery',
    line: 'Diskon pesanan.',
    description:
      'Diskon pesanan untuk akun baru. Cek area layanan dan minimum pesanan sebelum memakai kode.',
    intro:
      'Diskon food delivery berlaku untuk pesanan pertama di merchant tertentu. Cek area layanan, minimum pesanan, biaya pengiriman, dan apakah diskon memotong harga makanan atau hanya ongkir.\n\nJebakan umumnya ada pada promo yang tidak berlaku di semua restoran dan biaya layanan yang tetap dihitung. Pesan dari merchant yang benar-benar kamu inginkan, bukan sekadar mengejar diskon yang akhirnya membuat total pesanan lebih mahal.',
    editorialUpdated: '2026-10-30',
  },
  {
    slug: 'saas',
    name: 'SaaS & produktivitas',
    line: 'Kredit alat kerja.',
    description:
      'Aplikasi kerja seperti desain dan catatan memberi kredit atau diskon langganan untuk akun baru.',
    intro:
      'Kode referral aplikasi kerja memberi kredit, diskon langganan, atau masa uji tambahan. Cocokkan paket dengan kebutuhan tim, lalu cek apakah kredit melekat pada akun atau bisa dipakai bersama.\n\nJebakan yang perlu dibaca: perpanjangan otomatis, harga setelah masa promo, dan batas jumlah pengguna. Berhenti berlangganan sebelum tanggal perpanjangan jika kredit sudah habis dan paket tidak lagi dipakai.',
    editorialUpdated: '2026-10-30',
  },
];

export function getCategories() {
  return categories;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
