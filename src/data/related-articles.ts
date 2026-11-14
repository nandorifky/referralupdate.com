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
    'apa-itu-dana-bisnis',
    'limit-dana-bisnis',
    'qris-dana-bisnis-tidak-bisa',
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
  ],
};
