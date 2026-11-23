// Peta tautan internal eksplisit untuk blok "Artikel terkait".
// Sengaja ditulis manual, bukan hasil perhitungan otomatis, agar:
//   1. setiap artikel punya jalur masuk dari artikel lain (tidak ada orphan),
//   2. pilihan tetap topikal dan bisa diaudit,
//   3. arus link bisa diarahkan ke klaster DANA Bisnis dan halaman kode referral.
// Urutan pada daftar menentukan urutan tampil. Tambahkan slug artikel baru di sini
// saat menulis artikel baru, lalu jalankan build.

export const relatedArticles: Record<string, string[]> = {
  // Klaster konsep kode referral
  'apa-itu-kode-referral': [
    'cara-aman-memakai-kode-referral',
    'kode-referral-vs-kode-promo',
    'apa-itu-dana-bisnis',
  ],
  'cara-aman-memakai-kode-referral': [
    'apa-itu-kode-referral',
    'kode-referral-vs-kode-promo',
    'apa-itu-dana-bisnis',
  ],
  'kode-referral-vs-kode-promo': [
    'apa-itu-kode-referral',
    'cara-aman-memakai-kode-referral',
    'apa-itu-dana-bisnis',
  ],

  // Klaster DANA Bisnis, pilar di apa-itu-dana-bisnis
  'apa-itu-dana-bisnis': [
    'mdr-qris-dana-bisnis',
    'limit-dana-bisnis',
    'cara-daftar-dana-bisnis',
  ],
  'mdr-qris-dana-bisnis': [
    'apa-itu-dana-bisnis',
    'pajak-qris-dana-bisnis',
    'tarik-saldo-dana-bisnis',
  ],
  'limit-dana-bisnis': [
    'apa-itu-dana-bisnis',
    'tarik-saldo-dana-bisnis',
    'kelebihan-dan-kekurangan-qris-dana-bisnis',
  ],
  'tarik-saldo-dana-bisnis': [
    'limit-dana-bisnis',
    'mdr-qris-dana-bisnis',
    'apa-itu-dana-bisnis',
  ],
  'cara-daftar-dana-bisnis': [
    'foto-toko-online-dana-bisnis',
    'apa-itu-dana-bisnis',
    'limit-dana-bisnis',
    'qris-dana-bisnis-tidak-bisa',
  ],
  'foto-toko-online-dana-bisnis': [
    'cara-daftar-dana-bisnis',
    'apa-itu-dana-bisnis',
    'limit-dana-bisnis',
  ],
  'qris-dana-bisnis-tidak-bisa': [
    'cara-daftar-dana-bisnis',
    'qris-dana-bisnis-semua-e-wallet',
    'kelebihan-dan-kekurangan-qris-dana-bisnis',
  ],
  'qris-dana-bisnis-semua-e-wallet': [
    'qris-dana-bisnis-tidak-bisa',
    'mdr-qris-dana-bisnis',
    'kelebihan-dan-kekurangan-qris-dana-bisnis',
    'qris-shopeepay',
  ],
  'pajak-qris-dana-bisnis': [
    'mdr-qris-dana-bisnis',
    'kelebihan-dan-kekurangan-qris-dana-bisnis',
    'limit-dana-bisnis',
  ],
  'kelebihan-dan-kekurangan-qris-dana-bisnis': [
    'apa-itu-dana-bisnis',
    'pajak-qris-dana-bisnis',
    'qris-dana-bisnis-semua-e-wallet',
    'limit-shopeepay',
  ],

  // Klaster ShopeePay, pilar di /kode-referral/shopeepay/
  'bonus-pengguna-baru-shopeepay': [
    'cara-pakai-kode-referral-shopeepay',
    'upgrade-shopeepay-plus',
    'cara-melihat-kode-referral-shopeepay-sendiri',
  ],
  'cara-pakai-kode-referral-shopeepay': [
    'bonus-pengguna-baru-shopeepay',
    'upgrade-shopeepay-plus',
    'bonus-kode-referral-shopeepay-100-ribu',
  ],
  'bonus-kode-referral-shopeepay-100-ribu': [
    'bonus-pengguna-baru-shopeepay',
    'cara-pakai-kode-referral-shopeepay',
    'upgrade-shopeepay-plus',
  ],
  'upgrade-shopeepay-plus': [
    'bonus-pengguna-baru-shopeepay',
    'cara-pakai-kode-referral-shopeepay',
    'upgrade-shopeepay-plus-tanpa-ktp',
  ],
  'cara-melihat-kode-referral-shopeepay-sendiri': [
    'bonus-pengguna-baru-shopeepay',
    'cara-pakai-kode-referral-shopeepay',
    'program-undang-teman-shopeepay',
  ],
  'kode-referral-shopeepay-tidak-masuk': [
    'cara-pakai-kode-referral-shopeepay',
    'cara-melihat-kode-referral-shopeepay-sendiri',
    'upgrade-shopeepay-plus',
  ],
  'upgrade-shopeepay-plus-tanpa-ktp': [
    'upgrade-shopeepay-plus',
    'apakah-shopeepay-plus-aman',
    'kode-referral-shopeepay-tidak-masuk',
  ],
  'apakah-shopeepay-plus-aman': [
    'upgrade-shopeepay-plus',
    'upgrade-shopeepay-plus-tanpa-ktp',
    'bonus-pengguna-baru-shopeepay',
  ],

  // Klaster batas dan transaksi
  'limit-shopeepay': [
    'tarik-saldo-shopeepay',
    'qris-shopeepay',
    'biaya-transfer-shopeepay',
  ],
  'tarik-saldo-shopeepay': [
    'limit-shopeepay',
    'tarik-saldo-shopeepay-di-indomaret-alfamart',
    'biaya-transfer-shopeepay',
  ],
  'tarik-saldo-shopeepay-di-indomaret-alfamart': [
    'tarik-saldo-shopeepay',
    'limit-shopeepay',
    'biaya-transfer-shopeepay',
  ],
  'biaya-transfer-shopeepay': [
    'tarik-saldo-shopeepay',
    'limit-shopeepay',
    'qris-shopeepay',
  ],

  // Klaster QRIS
  'qris-shopeepay': [
    'qris-shopeepay-merchant',
    'limit-shopeepay',
    'biaya-transfer-shopeepay',
  ],
  'qris-shopeepay-merchant': [
    'qris-shopeepay',
    'limit-shopeepay',
    'biaya-transfer-shopeepay',
  ],

  // Klaster program dan penanganan masalah
  'program-undang-teman-shopeepay': [
    'bonus-pengguna-baru-shopeepay',
    'cara-melihat-kode-referral-shopeepay-sendiri',
    'kode-referral-shopeepay-tidak-masuk',
  ],
  'shopeepay-dibekukan': [
    'shopeepay-error-dan-gangguan',
    'program-undang-teman-shopeepay',
    'limit-shopeepay',
  ],
  'shopeepay-error-dan-gangguan': [
    'shopeepay-dibekukan',
    'tarik-saldo-shopeepay',
    'kode-referral-shopeepay-tidak-masuk',
  ],

  // Klaster perbandingan
  'shopeepay-vs-gopay': [
    'shopeepay-vs-dana',
    'limit-shopeepay',
    'biaya-transfer-shopeepay',
  ],
  'shopeepay-vs-dana': [
    'shopeepay-vs-gopay',
    'limit-shopeepay',
    'biaya-transfer-shopeepay',
  ],

  // Klaster Seabank, pilar di /kode-referral/seabank/
  'kelebihan-dan-kekurangan-seabank': [
    'bonus-pengguna-baru-seabank',
    'apa-itu-kode-referral',
  ],
  'bonus-pengguna-baru-seabank': [
    'kelebihan-dan-kekurangan-seabank',
    'apa-itu-kode-referral',
  ],

  // Klaster bonus pengguna baru bank digital dan investasi
  'bonus-pengguna-baru-pintu': [
    'bonus-pengguna-baru-krom-bank',
    'kode-referral-vs-kode-promo',
    'apa-itu-kode-referral',
  ],
  'bonus-pengguna-baru-krom-bank': [
    'bonus-pengguna-baru-seabank',
    'bonus-pengguna-baru-pintu',
    'apa-itu-kode-referral',
  ],
};
