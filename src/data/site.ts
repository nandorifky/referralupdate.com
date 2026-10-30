export type Category = {
  slug: string;
  name: string;
  line: string;
  description: string;
};

export type Brand = {
  slug: string;
  name: string;
  category: string;
  code: string;
  reward: string;
  checked: string;
  summary: string;
  steps: string[];
  terms: string[];
  faqs: { q: string; a: string }[];
  officialUrl: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  excerpt: string;
  updated: string;
  author: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  relatedBrands: string[];
};

export const categories: Category[] = [
  {
    slug: 'e-wallet',
    name: 'E-wallet',
    line: 'Saldo dan poin.',
    description:
      'Dipakai untuk bayar, kirim uang, dan isi ulang. Bonus biasanya berupa saldo atau poin.',
  },
  {
    slug: 'bank-digital',
    name: 'Bank digital',
    line: 'Bunga dan bonus.',
    description:
      'Rekening tanpa cabang dengan bonus setelah rekening aktif dan setoran awal.',
  },
  {
    slug: 'investasi',
    name: 'Investasi',
    line: 'Reksa dana, emas, saham.',
    description:
      'Aplikasi reksa dana, emas, dan saham. Bonus masuk setelah transaksi pertama.',
  },
  {
    slug: 'e-commerce',
    name: 'E-commerce',
    line: 'Voucher dan koin.',
    description:
      'Marketplace untuk belanja harian. Bonus berupa voucher, koin, atau potongan ongkir.',
  },
  {
    slug: 'travel',
    name: 'Travel',
    line: 'Tiket dan hotel.',
    description:
      'Tiket dan hotel dengan potongan untuk pemesanan pertama. Cek aturan pembatalan.',
  },
  {
    slug: 'food-delivery',
    name: 'Food delivery',
    line: 'Diskon pesanan.',
    description:
      'Diskon pesanan untuk akun baru. Cek area layanan dan minimum pesanan sebelum memakai kode.',
  },
  {
    slug: 'saas',
    name: 'SaaS & produktivitas',
    line: 'Kredit alat kerja.',
    description:
      'Aplikasi kerja seperti desain dan catatan memberi kredit atau diskon langganan untuk akun baru.',
  },
];

export const brands: Brand[] = [
  {
    slug: 'bibit',
    name: 'Bibit',
    category: 'investasi',
    code: 'BIBIT-X7K2',
    reward: 'Bonus reksa dana',
    checked: '28 Okt 2026',
    summary:
      'Bibit adalah aplikasi reksa dana untuk investor pemula. Program referalnya biasanya memberi bonus reksa dana untuk akun baru yang menyelesaikan pembelian pertama.',
    steps: [
      'Unduh aplikasi Bibit dari App Store atau Google Play.',
      'Daftar dengan email, lalu isi kode BIBIT-X7K2 di kolom kode referal.',
      'Selesaikan verifikasi dan beli produk reksa dana pertama sesuai profil risiko.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum pernah mendaftar di Bibit.',
      'Bonus mengikuti ketentuan program yang berlaku di aplikasi.',
      'Satu akun hanya dapat memakai satu kode referal.',
    ],
    faqs: [
      {
        q: 'Apakah kode bisa dipakai setelah mendaftar?',
        a: 'Tidak. Kode diisi saat pendaftaran dan tidak bisa ditambahkan setelah akun aktif.',
      },
      {
        q: 'Berapa lama bonus masuk?',
        a: 'Waktu pencairan mengikuti ketentuan Bibit. Cek status di aplikasi.',
      },
    ],
    officialUrl: 'https://bibit.id',
  },
  {
    slug: 'pluang',
    name: 'Pluang',
    category: 'investasi',
    code: 'PLUANG-M4Q',
    reward: 'Bonus emas',
    checked: '28 Okt 2026',
    summary:
      'Pluang menyatukan reksa dana, emas, dan aset kripto dalam satu aplikasi. Bonus referal sering diberikan dalam bentuk emas setelah transaksi pertama.',
    steps: [
      'Buka aplikasi Pluang dan pilih daftar akun baru.',
      'Masukkan kode PLUANG-M4Q saat diminta kode referal.',
      'Lakukan pembelian pertama sesuai syarat program.',
    ],
    terms: [
      'Berlaku untuk pengguna baru dengan data yang belum terdaftar.',
      'Bonus dapat berubah mengikuti kampanye yang sedang berjalan.',
      'Transaksi yang dibatalkan tidak dihitung sebagai syarat bonus.',
    ],
    faqs: [
      {
        q: 'Apakah bonus bisa dicairkan?',
        a: 'Bonus emas dapat dijual setelah memenuhi syarat program. Baca ketentuan di aplikasi sebelum menjual aset.',
      },
      {
        q: 'Bisakah memakai kode orang lain?',
        a: 'Bisa, selama kode masih berlaku dan kamu memenuhi syarat sebagai pengguna baru. Satu akun tetap hanya boleh memakai satu kode.',
      },
    ],
    officialUrl: 'https://pluang.com',
  },
  {
    slug: 'ajaib',
    name: 'Ajaib',
    category: 'investasi',
    code: 'AJAIB-P3T',
    reward: 'Bonus saham atau reksa dana',
    checked: '27 Okt 2026',
    summary:
      'Ajaib adalah platform investasi saham dan reksa dana untuk investor ritel. Program referal biasanya memberi bonus saham atau reksa dana setelah akun aktif dan transaksi pertama.',
    steps: [
      'Unduh aplikasi Ajaib dan buat akun baru.',
      'Isi kode AJAIB-P3T di kolom referal saat pendaftaran.',
      'Selesaikan verifikasi dan lakukan transaksi sesuai syarat.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum terdaftar di Ajaib.',
      'Jenis bonus mengikuti kampanye yang berlaku.',
      'Investasi memiliki risiko, termasuk kehilangan modal.',
    ],
    faqs: [
      {
        q: 'Apakah bonus saham bisa langsung dijual?',
        a: 'Saham bonus biasanya masuk setelah periode tertentu. Cek halaman program untuk jadwal dan syarat penjualan.',
      },
      {
        q: 'Perlu rekening bank untuk bonus?',
        a: 'Rekening bank dipakai untuk verifikasi dan pencairan. Gunakan rekening atas nama sendiri.',
      },
    ],
    officialUrl: 'https://ajaib.co.id',
  },
  {
    slug: 'gopay',
    name: 'GoPay',
    category: 'e-wallet',
    code: 'GOPAY-A8N',
    reward: 'Saldo dan poin',
    checked: '28 Okt 2026',
    summary:
      'GoPay dipakai untuk pembayaran di Gojek dan merchant yang menerima QRIS. Program referal umumnya memberi saldo atau poin untuk akun baru yang melakukan transaksi pertama.',
    steps: [
      'Daftar akun Gojek baru dengan nomor HP aktif.',
      'Masukkan kode GOPAY-A8N di halaman pendaftaran atau menu referal.',
      'Lakukan transaksi pertama sesuai syarat program.',
    ],
    terms: [
      'Berlaku untuk akun Gojek baru yang belum pernah memakai GoPay.',
      'Bonus saldo mengikuti kampanye yang berlaku.',
      'Satu nomor HP hanya dapat memakai satu kode referal.',
    ],
    faqs: [
      {
        q: 'Bisakah kode dipakai di GoFood?',
        a: 'Kode referal GoPay berlaku untuk akun baru. Untuk pesanan GoFood, cek juga promo merchant yang tersedia di aplikasi.',
      },
      {
        q: 'Kenapa bonus belum masuk?',
        a: 'Pastikan transaksi pertama sudah selesai dan memenuhi minimum. Bonus biasanya masuk setelah periode validasi program.',
      },
    ],
    officialUrl: 'https://www.gojek.com/id/gopay/',
  },
  {
    slug: 'ovo',
    name: 'OVO',
    category: 'e-wallet',
    code: 'OVO-T2R',
    reward: 'Saldo atau poin',
    checked: '26 Okt 2026',
    summary:
      'OVO adalah dompet digital untuk pembayaran, transfer, dan isi ulang. Kode referal biasanya memberi saldo atau poin setelah akun diaktifkan dan transaksi pertama.',
    steps: [
      'Unduh aplikasi OVO dan daftar dengan nomor HP.',
      'Masukkan kode OVO-T2R saat diminta kode referal.',
      'Aktifkan akun dan lakukan transaksi pertama.',
    ],
    terms: [
      'Berlaku untuk pengguna baru dengan nomor HP yang belum terdaftar.',
      'Bonus mengikuti ketentuan kampanye yang berlaku.',
      'Satu akun hanya dapat memakai satu kode.',
    ],
    faqs: [
      {
        q: 'Apakah OVO Premium wajib?',
        a: 'Beberapa program meminta akun OVO Premium untuk pencairan bonus. Cek syarat di aplikasi sebelum upgrade.',
      },
      {
        q: 'Bisakah kode dipakai setelah akun aktif?',
        a: 'Tidak. Kode referal diisi saat pendaftaran. Akun yang sudah aktif tidak bisa menambahkan kode.',
      },
    ],
    officialUrl: 'https://www.ovo.id/',
  },
  {
    slug: 'dana',
    name: 'DANA',
    category: 'e-wallet',
    code: 'DANA-R4U',
    reward: 'Saldo',
    checked: '25 Okt 2026',
    summary:
      'DANA adalah dompet digital untuk pembayaran QRIS, transfer, dan tagihan. Program referal biasanya memberi saldo untuk pengguna baru yang menyelesaikan transaksi pertama.',
    steps: [
      'Unduh DANA dan daftar dengan nomor HP aktif.',
      'Isi kode DANA-R4U pada kolom referal.',
      'Lakukan pembayaran pertama sesuai syarat.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum pernah terdaftar di DANA.',
      'Bonus saldo mengikuti kampanye yang berlaku.',
      'Satu nomor HP hanya dapat memakai satu kode.',
    ],
    faqs: [
      {
        q: 'Apakah bonus bisa ditransfer?',
        a: 'Saldo bonus biasanya punya aturan penggunaan tersendiri. Baca keterangan di aplikasi sebelum mencoba menarik dana.',
      },
      {
        q: 'Perlu upgrade akun?',
        a: 'Beberapa transaksi memerlukan verifikasi identitas. Siapkan KTP dan swafoto sesuai instruksi aplikasi.',
      },
    ],
    officialUrl: 'https://www.dana.id/',
  },
  {
    slug: 'jago',
    name: 'Jago',
    category: 'bank-digital',
    code: 'JAGO-K6P',
    reward: 'Bonus tabungan',
    checked: '27 Okt 2026',
    summary:
      'Jago adalah bank digital dengan rekening, kantong tabungan, dan kartu debit. Program referal biasanya memberi bonus saldo setelah rekening aktif dan ada setoran awal.',
    steps: [
      'Unduh aplikasi Jago dan daftar rekening baru.',
      'Masukkan kode JAGO-K6P saat pendaftaran.',
      'Aktifkan rekening dan lakukan setoran sesuai syarat.',
    ],
    terms: [
      'Berlaku untuk nasabah baru yang belum punya rekening Jago.',
      'Bonus mengikuti ketentuan program yang berlaku.',
      'Data identitas harus sesuai dengan dokumen resmi.',
    ],
    faqs: [
      {
        q: 'Apakah bonus masuk ke kantong tabungan?',
        a: 'Bonus biasanya masuk ke rekening utama. Setelah itu kamu bisa memindahkannya ke kantong tabungan.',
      },
      {
        q: 'Bisakah daftar tanpa KTP?',
        a: 'Tidak. Bank digital memerlukan verifikasi identitas sesuai aturan perbankan.',
      },
    ],
    officialUrl: 'https://www.jago.com/',
  },
  {
    slug: 'seabank',
    name: 'SeaBank',
    category: 'bank-digital',
    code: 'SEABANK-J8F',
    reward: 'Bunga dan bonus',
    checked: '24 Okt 2026',
    summary:
      'SeaBank adalah bank digital yang terhubung dengan ekosistem Shopee dan SeaMoney. Program referal biasanya memberi bonus saldo setelah rekening aktif.',
    steps: [
      'Unduh aplikasi SeaBank dan buat rekening baru.',
      'Masukkan kode SEABANK-J8F saat diminta kode referal.',
      'Aktifkan rekening dan lakukan setoran pertama.',
    ],
    terms: [
      'Berlaku untuk nasabah baru yang belum punya rekening SeaBank.',
      'Bonus mengikuti kampanye yang berlaku.',
      'Rekening harus aktif saat bonus dicairkan.',
    ],
    faqs: [
      {
        q: 'Apakah bunga tabungan masuk otomatis?',
        a: 'Bunga dihitung sesuai saldo dan ketentuan bank. Cek halaman produk untuk suku bunga yang berlaku.',
      },
      {
        q: 'Bisa dipakai tanpa aplikasi Shopee?',
        a: 'Bisa. SeaBank punya aplikasi sendiri, meski beberapa promo terhubung dengan ekosistem Shopee.',
      },
    ],
    officialUrl: 'https://www.seabank.co.id/',
  },
  {
    slug: 'tokopedia',
    name: 'Tokopedia',
    category: 'e-commerce',
    code: 'TOKOPEDIA-B3S',
    reward: 'Voucher belanja',
    checked: '26 Okt 2026',
    summary:
      'Tokopedia adalah marketplace untuk produk fisik dan digital. Kode referal biasanya memberi voucher belanja untuk pembeli baru dengan minimum transaksi.',
    steps: [
      'Buat akun Tokopedia baru lewat aplikasi atau situs.',
      'Masukkan kode TOKOPEDIA-B3S di halaman referal.',
      'Belanja sesuai minimum transaksi yang berlaku.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum pernah bertransaksi.',
      'Voucher mengikuti ketentuan kampanye.',
      'Satu akun hanya dapat memakai satu kode.',
    ],
    faqs: [
      {
        q: 'Apakah voucher bisa digabung dengan promo toko?',
        a: 'Tergantung jenis voucher. Beberapa voucher bisa digabung, beberapa tidak. Cek keterangan di halaman checkout.',
      },
      {
        q: 'Kenapa voucher tidak muncul?',
        a: 'Pastikan akun memenuhi syarat dan minimum belanja. Voucher yang kedaluwarsa juga tidak akan muncul di checkout.',
      },
    ],
    officialUrl: 'https://www.tokopedia.com/',
  },
  {
    slug: 'shopee',
    name: 'Shopee',
    category: 'e-commerce',
    code: 'SHOPEE-L9V',
    reward: 'Koin atau voucher',
    checked: '25 Okt 2026',
    summary:
      'Shopee adalah marketplace dengan promo harian dan program afiliasi. Kode referal pengguna baru biasanya memberi koin atau voucher untuk belanja pertama.',
    steps: [
      'Daftar akun Shopee baru dengan nomor HP atau email.',
      'Masukkan kode SHOPEE-L9V saat diminta kode referal.',
      'Selesaikan pembelian pertama sesuai syarat.',
    ],
    terms: [
      'Berlaku untuk pengguna baru yang belum pernah bertransaksi.',
      'Koin dan voucher mengikuti kampanye yang berlaku.',
      'Satu akun hanya dapat memakai satu kode.',
    ],
    faqs: [
      {
        q: 'Apakah koin bisa dipakai semua produk?',
        a: 'Tidak. Koin biasanya hanya bisa dipakai pada produk dan toko yang mendukung. Cek saat checkout.',
      },
      {
        q: 'Bisa memakai kode setelah checkout?',
        a: 'Kode referal diisi saat pendaftaran. Untuk potongan belanja, gunakan voucher yang tersedia di halaman checkout.',
      },
    ],
    officialUrl: 'https://shopee.co.id/',
  },
  {
    slug: 'traveloka',
    name: 'Traveloka',
    category: 'travel',
    code: 'TRAVELOKA-H5D',
    reward: 'Potongan pemesanan',
    checked: '28 Okt 2026',
    summary:
      'Traveloka menjual tiket pesawat, hotel, kereta, dan aktivitas. Program referal biasanya memberi potongan untuk pemesanan pertama dengan minimum transaksi.',
    steps: [
      'Buat akun Traveloka baru lewat aplikasi atau situs.',
      'Masukkan kode TRAVELOKA-H5D di halaman referal.',
      'Lakukan pemesanan pertama sesuai syarat.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum pernah memesan.',
      'Potongan mengikuti ketentuan kampanye dan produk.',
      'Pemesanan yang dibatalkan tidak dihitung.',
    ],
    faqs: [
      {
        q: 'Apakah potongan berlaku untuk hotel?',
        a: 'Tergantung kampanye. Beberapa kode hanya berlaku untuk tiket pesawat atau produk tertentu. Baca syarat sebelum membayar.',
      },
      {
        q: 'Bisakah kode dipakai untuk orang lain?',
        a: 'Pemesanan bisa untuk orang lain, tetapi akun dan pembayaran harus memenuhi syarat program.',
      },
    ],
    officialUrl: 'https://www.traveloka.com/id-id/',
  },
  {
    slug: 'tiket',
    name: 'Tiket.com',
    category: 'travel',
    code: 'TIKET-Q6B',
    reward: 'Potongan tiket',
    checked: '23 Okt 2026',
    summary:
      'Tiket.com menjual tiket pesawat, hotel, kereta, dan atraksi. Kode referal biasanya memberi potongan untuk pengguna baru yang menyelesaikan pemesanan pertama.',
    steps: [
      'Daftar akun Tiket.com baru.',
      'Masukkan kode TIKET-Q6B pada kolom referal.',
      'Selesaikan pemesanan pertama sesuai syarat.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum pernah memesan.',
      'Potongan mengikuti kampanye yang berlaku.',
      'Pemesanan yang dibatalkan tidak dihitung.',
    ],
    faqs: [
      {
        q: 'Apakah potongan bisa digabung dengan promo bank?',
        a: 'Tergantung ketentuan promo. Cek halaman pembayaran untuk melihat promo yang bisa digabung.',
      },
      {
        q: 'Berapa minimum transaksi?',
        a: 'Minimum berbeda per kampanye. Baca syarat di halaman program sebelum memesan.',
      },
    ],
    officialUrl: 'https://www.tiket.com/',
  },
  {
    slug: 'gofood',
    name: 'GoFood',
    category: 'food-delivery',
    code: 'GOFOOD-C7W',
    reward: 'Diskon pesanan',
    checked: '26 Okt 2026',
    summary:
      'GoFood adalah layanan pesan antar makanan di aplikasi Gojek. Kode referal biasanya memberi diskon untuk pesanan pertama pengguna baru.',
    steps: [
      'Daftar akun Gojek baru dengan nomor HP aktif.',
      'Masukkan kode GOFOOD-C7W di halaman referal.',
      'Pesan makanan sesuai minimum transaksi.',
    ],
    terms: [
      'Berlaku untuk akun Gojek baru yang belum pernah memesan GoFood.',
      'Diskon mengikuti kampanye yang berlaku.',
      'Area layanan dan merchant ikut menentukan ketersediaan promo.',
    ],
    faqs: [
      {
        q: 'Apakah diskon berlaku di semua merchant?',
        a: 'Tidak. Promo biasanya berlaku di merchant tertentu. Cek label promo di halaman restoran.',
      },
      {
        q: 'Bisakah kode dipakai berulang?',
        a: 'Kode referal untuk pengguna baru hanya dapat dipakai sekali per akun.',
      },
    ],
    officialUrl: 'https://www.gojek.com/id/food/',
  },
  {
    slug: 'grabfood',
    name: 'GrabFood',
    category: 'food-delivery',
    code: 'GRABFOOD-S5A',
    reward: 'Diskon pesanan',
    checked: '24 Okt 2026',
    summary:
      'GrabFood adalah layanan pesan antar makanan di aplikasi Grab. Program referal biasanya memberi diskon untuk pengguna baru yang memesan pertama kali.',
    steps: [
      'Daftar akun Grab baru dengan nomor HP aktif.',
      'Masukkan kode GRABFOOD-S5A di halaman referal.',
      'Pesan makanan sesuai syarat kampanye.',
    ],
    terms: [
      'Berlaku untuk akun Grab baru yang belum pernah memesan GrabFood.',
      'Diskon mengikuti ketentuan kampanye.',
      'Biaya pengiriman dan pajak dihitung sesuai lokasi.',
    ],
    faqs: [
      {
        q: 'Apakah diskon termasuk ongkir?',
        a: 'Tergantung kampanye. Beberapa promo hanya memotong harga makanan, bukan biaya pengiriman.',
      },
      {
        q: 'Kenapa promo tidak muncul di checkout?',
        a: 'Cek area layanan, minimum pesanan, dan merchant. Promo yang tidak memenuhi syarat tidak akan muncul.',
      },
    ],
    officialUrl: 'https://www.grab.com/id/food/',
  },
  {
    slug: 'canva',
    name: 'Canva',
    category: 'saas',
    code: 'CANVA-N2E',
    reward: 'Kredit Pro',
    checked: '27 Okt 2026',
    summary:
      'Canva adalah alat desain untuk presentasi, konten sosial, dan materi kerja. Program referal biasanya memberi kredit atau diskon untuk langganan Pro.',
    steps: [
      'Buat akun Canva baru lewat situs atau aplikasi.',
      'Masukkan kode CANVA-N2E di halaman referal.',
      'Aktifkan paket Pro sesuai syarat kampanye.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum pernah berlangganan Pro.',
      'Kredit mengikuti ketentuan kampanye.',
      'Langganan diperpanjang otomatis kecuali dibatalkan.',
    ],
    faqs: [
      {
        q: 'Apakah kredit bisa dipakai untuk tim?',
        a: 'Tergantung paket. Kredit biasanya melekat pada akun yang memakai kode, bukan seluruh tim.',
      },
      {
        q: 'Bisakah berhenti kapan saja?',
        a: 'Bisa. Batalkan sebelum tanggal perpanjangan agar tidak ditagih untuk periode berikutnya.',
      },
    ],
    officialUrl: 'https://www.canva.com/',
  },
  {
    slug: 'notion',
    name: 'Notion',
    category: 'saas',
    code: 'NOTION-Y9C',
    reward: 'Kredit atau diskon',
    checked: '22 Okt 2026',
    summary:
      'Notion adalah ruang kerja untuk catatan, proyek, dan basis data. Program referal biasanya memberi kredit untuk paket berbayar atau diskon langganan.',
    steps: [
      'Buat akun Notion baru lewat situs.',
      'Masukkan kode NOTION-Y9C di halaman referal.',
      'Tingkatkan paket sesuai syarat kampanye.',
    ],
    terms: [
      'Berlaku untuk akun baru yang belum pernah berlangganan paket berbayar.',
      'Kredit mengikuti ketentuan kampanye.',
      'Harga dapat berubah sesuai kebijakan Notion.',
    ],
    faqs: [
      {
        q: 'Apakah kredit berlaku untuk paket tim?',
        a: 'Tergantung kampanye. Cek halaman tagihan sebelum meningkatkan paket.',
      },
      {
        q: 'Bisakah memakai kode setelah punya workspace?',
        a: 'Kode referal biasanya diisi saat pendaftaran. Workspace lama tidak bisa menambahkan kode.',
      },
    ],
    officialUrl: 'https://www.notion.so/',
  },
];

export const articles: Article[] = [
  {
    slug: 'apa-itu-kode-referral',
    title: 'Apa itu kode referral dan cara kerjanya',
    category: 'dasar-keamanan',
    categoryName: 'Dasar & keamanan',
    excerpt:
      'Kode referral adalah kode milik pengguna yang dipakai saat orang lain mendaftar. Bonusnya bisa berupa saldo, poin, atau aset.',
    updated: '30 Okt 2026',
    author: 'Tim editorial KodeReferral',
    relatedBrands: ['bibit', 'gopay', 'tokopedia'],
    sections: [
      {
        heading: 'Kode referral adalah pintu masuk',
        paragraphs: [
          'Kode referral adalah rangkaian huruf atau angka yang dipakai saat mendaftar. Pemilik kode biasanya mendapat bonus ketika orang lain memakainya dan memenuhi syarat program.',
        ],
      },
      {
        heading: 'Bedanya dengan kode promo',
        paragraphs: [
          'Kode promo memberi potongan harga. Kode referral menghubungkan pendaftaranmu dengan pemilik kode. Keduanya bisa muncul di halaman yang sama, tetapi tujuannya berbeda.',
        ],
      },
      {
        heading: 'Siapa yang mendapat bonus',
        paragraphs: [
          'Program referral biasanya memberi bonus kepada pengguna baru yang mendaftar dan pemilik kode yang mengajak. Besaran dan jenis bonus ditentukan oleh brand.',
        ],
      },
      {
        heading: 'Kapan bonus masuk',
        paragraphs: [
          'Bonus tidak selalu langsung masuk. Beberapa program menunggu verifikasi akun, transaksi pertama, atau periode tertentu sebelum bonus dicairkan.',
        ],
        list: [
          'Pengguna baru: bonus pendaftaran atau transaksi pertama.',
          'Pemilik kode: bonus tambahan setelah syarat tercapai.',
          'Brand: biaya akuisisi pengguna yang lebih terukur.',
        ],
      },
      {
        heading: 'Yang perlu dicek sebelum memakai',
        paragraphs: [
          'Baca syarat program sebelum mendaftar. Perhatikan status akun, minimum transaksi, masa berlaku kode, dan cara pencairan bonus.',
        ],
      },
      {
        heading: 'Pilih sumber yang bisa diverifikasi',
        paragraphs: [
          'Kode tanpa tanggal cek atau sumber resmi lebih sulit dipertanggungjawabkan ketika bonus tidak masuk. Cari halaman program atau aplikasi resmi brand.',
        ],
      },
    ],
  },
  {
    slug: 'kode-referral-vs-kode-promo',
    title: 'Kode referral vs kode promo: apa bedanya?',
    category: 'dasar-keamanan',
    categoryName: 'Dasar & keamanan',
    excerpt:
      'Kode referral menghubungkan pendaftaran dengan pengajak. Kode promo memotong harga. Keduanya punya syarat yang berbeda.',
    updated: '29 Okt 2026',
    author: 'Tim editorial KodeReferral',
    relatedBrands: ['tokopedia', 'traveloka', 'pluang'],
    sections: [
      {
        heading: 'Dua kode, dua tujuan',
        paragraphs: [
          'Kode referral menandai siapa yang mengajakmu mendaftar. Kode promo memberi potongan harga atau benefit tertentu saat bertransaksi.',
        ],
      },
      {
        heading: 'Syaratnya juga berbeda',
        paragraphs: [
          'Kode referral biasanya terikat pada akun baru. Kode promo bisa dipakai akun lama selama memenuhi ketentuan.',
        ],
      },
      {
        heading: 'Kapan kode referral dipakai',
        paragraphs: [
          'Kode referral diisi saat pendaftaran atau sebelum transaksi pertama. Setelah akun aktif, kolom kode biasanya tidak bisa diisi lagi.',
        ],
      },
      {
        heading: 'Jika akun sudah aktif',
        paragraphs: [
          'Kode referral dari orang lain umumnya tidak bisa ditambahkan. Kamu masih bisa memakai kode promo yang tersedia untuk transaksi berikutnya.',
        ],
      },
      {
        heading: 'Kapan kode promo lebih cocok',
        paragraphs: [
          'Kode promo cocok ketika kamu sudah menjadi pengguna dan ingin memotong harga belanja, tiket, atau langganan. Kode promo juga sering muncul saat kampanye musiman.',
        ],
      },
      {
        heading: 'Periksa masa berlaku',
        paragraphs: [
          'Baca masa berlaku dan minimum belanja. Kode promo yang sudah kedaluwarsa tidak akan muncul di checkout, meskipun tampilannya masih tersimpan di internet.',
        ],
      },
      {
        heading: 'Cara memilih',
        paragraphs: [
          'Jika kamu pengguna baru, cek kode referral lebih dulu. Setelah akun aktif, baru cari kode promo untuk transaksi berikutnya.',
        ],
      },
      {
        heading: 'Satu kode per transaksi',
        paragraphs: [
          'Jangan memakai dua kode yang saling bertentangan. Beberapa program hanya mengizinkan satu kode per akun atau per transaksi.',
        ],
      },
    ],
  },
  {
    slug: 'cara-aman-memakai-kode-referral',
    title: 'Cara aman memakai kode referral dari internet',
    category: 'tips-optimasi',
    categoryName: 'Tips & optimasi',
    excerpt:
      'Kode referral yang beredar di internet belum tentu aktif. Mulai dari sumber resmi, cek tanggal, dan jangan bagikan data sensitif.',
    updated: '28 Okt 2026',
    author: 'Tim editorial KodeReferral',
    relatedBrands: ['gopay', 'jago', 'shopee'],
    sections: [
      {
        heading: 'Mulai dari sumber resmi',
        paragraphs: [
          'Cari kode di halaman program atau aplikasi resmi brand. Jika kode berasal dari situs lain, cek apakah situs itu mencantumkan sumber dan tanggal pengecekan.',
        ],
      },
      {
        heading: 'Hindari kode tanpa konteks',
        paragraphs: [
          'Jangan memakai kode yang dikirim lewat pesan pribadi tanpa konteks. Kode yang tidak jelas asal-usulnya lebih sulit dilacak ketika bonus gagal masuk.',
        ],
      },
      {
        heading: 'Periksa syarat dan tanggal',
        paragraphs: [
          'Setiap kode punya syarat: akun baru, minimum transaksi, area layanan, atau masa berlaku. Baca syarat itu sebelum mendaftar.',
        ],
      },
      {
        heading: 'Tanggal bukan jaminan',
        paragraphs: [
          'Program bisa berubah kapan saja. Jika kode tidak diterima, gunakan kode lain yang masih berlaku atau hubungi dukungan brand.',
        ],
      },
      {
        heading: 'Jangan bagikan data sensitif',
        paragraphs: [
          'Kode referral tidak memerlukan password, kode OTP, atau data rekening. Siapa pun yang meminta data itu dengan alasan bonus referral perlu dicurigai.',
        ],
      },
      {
        heading: 'Masukkan kode di halaman resmi',
        paragraphs: [
          'Jangan mengisi kode di situs yang meminta login akun bank atau dompet digital. Masukkan kode hanya di halaman pendaftaran resmi.',
        ],
      },
      {
        heading: 'Jika bonus tidak masuk',
        paragraphs: [
          'Simpan bukti pendaftaran dan transaksi. Cek status program di aplikasi, lalu hubungi dukungan resmi jika bonus belum masuk setelah periode validasi.',
        ],
      },
      {
        heading: 'Jangan buat akun ganda',
        paragraphs: [
          'Akun ganda untuk mengejar bonus biasanya dibatalkan. Brand menilainya sebagai pelanggaran ketentuan program.',
        ],
      },
    ],
  },
];

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

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getBrand(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}

export function brandsByCategory(slug: string) {
  return brands.filter((brand) => brand.category === slug);
}

const monthIndex: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
  Jul: 6, Agu: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
};

export function checkedValue(checked: string) {
  const [day, month, year] = checked.split(' ');
  return new Date(Number(year), monthIndex[month] ?? 0, Number(day)).getTime();
}

export function brandsByChecked() {
  return [...brands].sort((a, b) => checkedValue(b.checked) - checkedValue(a.checked));
}

export function isoDate(value: string) {
  const [day, month, year] = value.split(' ');
  const monthNumber = String((monthIndex[month] ?? 0) + 1).padStart(2, '0');
  return `${year}-${String(day).padStart(2, '0')}-${monthNumber}`;
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatCode(code: string) {
  return code;
}

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
