import { routes } from './routes';

export const programReferralMeta = {
  title: 'Program Referral: Ajak Teman Dapat Saldo, Event Undang Teman',
  description:
    'Ikuti event undang teman dan program referral: cara ajak teman dapat saldo, batas bonus, serta perbandingan 11 brand yang sudah dicek.',
  h1: 'Program referral: ajak teman dapat saldo, ikuti event undang teman.',
};

export function programReferralLead(count: number) {
  return `${count} program dan event undang teman aktif di e-wallet, bank digital, investasi, bisnis, dan hiburan. Bandingkan bonus pengundang, batas undangan, dan syaratnya sebelum mengajak teman.`;
}

export const intro = [
  'Program referral untuk pengundang adalah cara mendapat bonus dengan membagikan kode undangan atau tautan referral milik sendiri. Bedanya dengan halaman kode referral: di sini kamu berperan sebagai pengundang yang mengajak teman, bukan pengguna baru yang memasukkan kode. Bonus pengundang baru diberikan setelah teman mendaftar dan memenuhi syarat yang ditetapkan brand.',
  'Istilahnya berbeda antar brand: ada yang menyebut event undang teman, program referral, promo ajak teman, atau affiliate. Yang perlu dibandingkan tetap sama: besaran bonus pengundang, batas undangan, syarat yang harus dipenuhi teman, dan jadwal pencairan. Tabel di bawah merangkum program dan event undang teman yang sudah kami catat.',
];

export const eventIntro =
  'Brand memakai istilah event, promo, atau program untuk kampanye undang teman. Status dan tanggal cek di tabel membantu membedakan program yang masih aktif dari yang belum diperbarui. Nama event bisa berubah, jadi selalu buka halaman resmi brand untuk ketentuan terbaru.';

export const joinSteps = [
  {
    title: 'Pilih event atau program.',
    body: 'Buka halaman brand yang bonus pengundangnya paling masuk akal untukmu. Sesuaikan dengan jenis teman yang akan diajak dan aktivitas yang biasa mereka lakukan.',
  },
  {
    title: 'Siapkan akun pengundang.',
    body: 'Pastikan akunmu sudah terverifikasi dan memenuhi syarat sebagai pengundang. Beberapa program meminta KYC, rekening aktif, atau profil usaha sebelum tautan referral bisa dibagikan.',
  },
  {
    title: 'Buka menu Undang Teman atau Referral.',
    body: 'Di aplikasi brand, cari menu Undang Teman, Referral, Affiliate, atau tautan undangan. Salin kode undangan atau tautan referral milikmu dari halaman resmi tersebut.',
  },
  {
    title: 'Bagikan tautan atau kode undangan.',
    body: 'Kirim lewat pesan pribadi ke teman yang memang ingin mendaftar. Jelaskan syarat yang harus mereka penuhi agar bonus pengundang tidak hangus karena aktivitas yang kurang.',
  },
  {
    title: 'Pantau status dan pencairan.',
    body: 'Periksa status undangan di menu yang sama. Catat tanggal cek, batas undangan per bulan, dan jadwal pencairan supaya tidak mengejar bonus yang sudah lewat masa berlakunya.',
  },
];

export const bonusTypes = [
  {
    title: 'Saldo atau cashback nominal.',
    body: 'Sejumlah e-wallet dan bank digital memberi saldo tetap per teman yang memenuhi syarat, misalnya setelah isi saldo atau transaksi direct debit.',
  },
  {
    title: 'Komisi dari transaksi.',
    body: 'Aplikasi investasi memberi komisi dari biaya atau volume transaksi teman. Nilainya mengikuti level referral dan masa berlaku komisi.',
  },
  {
    title: 'Poin aplikasi.',
    body: 'Aplikasi hiburan dan bacaan memberi poin yang bisa ditukar sesuai ketentuan. Kurs dan masa berlaku poin ditentukan brand.',
  },
  {
    title: 'Komisi affiliate UMKM.',
    body: 'Layanan bisnis memberi komisi ketika merchant yang diundang bergabung dan memenuhi ketentuan program afiliasi.',
  },
];

export const checks = [
  {
    title: 'Batas undangan atau bonus per bulan.',
    body: 'Beberapa brand membatasi jumlah teman atau total bonus yang bisa diterima pengundang.',
  },
  {
    title: 'Syarat yang harus dipenuhi teman.',
    body: 'Verifikasi akun, isi saldo, transaksi pertama, atau masa tahan saldo menentukan apakah bonus pengundang cair.',
  },
  {
    title: 'Masa berlaku komisi.',
    body: 'Komisi transaksi biasanya hanya dihitung selama periode tertentu sejak teman mendaftar.',
  },
  {
    title: 'Jadwal pencairan.',
    body: 'Bonus bisa dikirim setelah beberapa hari, menunggu hari ke-38, atau terakumulasi di dompet aplikasi.',
  },
  {
    title: 'Larangan self-referral dan spam.',
    body: 'Gunakan satu akun dan tautan resmi, jangan mengundang diri sendiri atau menyebar tautan tanpa izin.',
  },
];

export const faqs = [
  {
    q: 'Apa itu program referral dari sisi pengundang?',
    a: 'Program referral dari sisi pengundang adalah kesepakatan untuk membagikan kode undangan atau tautan referral milik sendiri. Saat teman mendaftar dan memenuhi syarat, pengundang menerima bonus pengundang. Bonusnya bisa berupa saldo, voucher, komisi, atau poin, tergantung ketentuan brand. Halaman ini merangkum program dan event undang teman yang bonus pengundangnya sudah kami catat.',
  },
  {
    q: 'Apa itu event undang teman dan bedanya dengan program referral?',
    a: 'Event undang teman adalah sebutan brand untuk kampanye ajak teman yang berlangsung pada periode tertentu. Program referral adalah mekanisme yang lebih umum dan bisa tetap berjalan setelah kampanye selesai. Sebagian brand memakai istilah program, promo, atau event untuk hal yang mirip. Karena itu, cek status, tanggal berlaku, dan tanggal cek di tabel sebelum mengikuti event undang teman.',
  },
  {
    q: 'Bagaimana cara mengajak teman lewat tautan referral?',
    a: 'Buka menu Undang Teman, Referral, atau Affiliate di aplikasi brand, lalu salin tautan referral atau kode undangan milikmu. Bagikan lewat pesan pribadi, bukan spam ke grup tanpa izin. Pastikan teman membuka tautan resmi brand, mendaftar dengan kode yang benar, dan memenuhi syarat seperti verifikasi akun atau transaksi pertama. Pantau status undangan di menu yang sama.',
  },
  {
    q: 'Bonus pengundang biasanya berbentuk apa saja?',
    a: 'Bonus pengundang umumnya berupa saldo atau cashback per teman di e-wallet dan bank digital, komisi dari transaksi teman di aplikasi investasi, poin di aplikasi hiburan, atau komisi affiliate untuk merchant UMKM. Nominal, batas undangan, dan cara pencairannya berbeda per brand. Baca reward pengundang di tabel dan syarat resminya sebelum mengajak teman.',
  },
  {
    q: 'Apakah ada batas jumlah undangan atau bonus per bulan?',
    a: 'Ada pada sebagian program. GoPay Pinjam membatasi 20 hadiah per pengundang, Krom Bank 30 teman per bulan, NeoBank 15 hadiah per bulan, Superbank 20 teman per bulan, dan SeaBank maksimal Rp5.000.000 per bulan. Brand lain punya ketentuan sendiri. Batas ini bisa berubah, jadi cek syarat resmi dan tanggal cek terakhir sebelum mengandalkan bonus pengundang.',
  },
  {
    q: 'Kapan bonus atau komisi referral cair?',
    a: 'Waktunya berbeda per brand. GoPay Pinjam mengirim saldo bonus paling lambat 24 jam setelah pencairan pinjaman pertama disetujui. Krom Bank mengirim bonus pada hari ke-38 sejak aktivasi akun atau paling lambat 7 hari sesudahnya. Komisi investasi biasanya terakumulasi di dompet aplikasi setelah transaksi terkonfirmasi. Cek bagian pencairan di halaman brand.',
  },
  {
    q: 'Apa bedanya program referral dan program afiliasi?',
    a: 'Program referral biasanya ditujukan untuk individu yang mengundang teman dan mendapat bonus setelah teman memenuhi syarat. Program afiliasi lebih sering untuk pemilik usaha, kreator, atau mitra yang mempromosikan layanan dan menerima komisi dari aktivitas yang dihasilkan. DANA Bisnis, misalnya, menyebut pesertanya sebagai affiliate UMKM. Keduanya memakai tautan atau kode, tetapi syarat, pencairan, dan target pesertanya bisa berbeda.',
  },
];

export const related = [
  {
    label: 'Direktori kode referral',
    href: routes.directory.href,
    note: 'Cari kode yang bisa kamu pakai saat mendaftar.',
  },
  {
    label: 'Apa Itu Kode Referral? Arti, Cara Kerja, dan Bonusnya',
    href: '/blog/apa-itu-kode-referral/',
    note: 'Dasar cara kerja kode referral dari sisi pengguna baru.',
  },
  {
    label: 'Cara Menggunakan Kode Referral dengan Aman agar Tidak Rugi',
    href: '/blog/cara-aman-memakai-kode-referral/',
    note: 'Cek syarat dan keamanan sebelum memakai kode.',
  },
  {
    label: 'Kode Referral vs Kode Promo, Apa Bedanya dan Kapan Digunakan?',
    href: '/blog/kode-referral-vs-kode-promo/',
    note: 'Bedakan bonus referral dari potongan promo biasa.',
  },
  {
    label: 'Kode referral e-wallet',
    href: '/kategori/e-wallet/',
    note: 'Brand dompet digital dengan bonus saldo dan poin.',
  },
  {
    label: 'Kode referral bank digital',
    href: '/kategori/bank-digital/',
    note: 'Bonus setelah rekening aktif dan setoran awal.',
  },
  {
    label: 'Kode referral investasi',
    href: '/kategori/investasi/',
    note: 'Aplikasi investasi dengan komisi transaksi.',
  },
  {
    label: routes.disclosure.label,
    href: routes.disclosure.href,
    note: 'Cara kami memakai tautan affiliate.',
  },
  {
    label: routes.methodology.label,
    href: routes.methodology.href,
    note: 'Proses pemeriksaan tanggal cek dan status program.',
  },
];

export const tableCaption = 'Event dan program undang teman yang dicek';
