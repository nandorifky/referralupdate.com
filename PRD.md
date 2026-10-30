# PRD — Direktori Kode Referral Indonesia

| Field | Isi |
|---|---|
| Versi | 1.3 (Draft untuk review) |
| Tanggal | 31 Oktober 2026 |
| Pemilik | Product |
| Nama kerja | KodeReferral (nama final TBD) |
| Model produk | Direktori publik kode referral + blog editorial |
| Pasar | Indonesia, Bahasa Indonesia |
| Monetisasi | Affiliate + iklan display, sponsored listing/konten sebagai fase lanjutan |
| Pilar produk | (1) Direktori kode referral, (2) Blog editorial |
| Fokus utama | Pertumbuhan organik (SEO) yang berkelanjutan dan tepercaya |

> Revisi v1.3: stack ditetapkan ke Astro static + Cloudflare free tier (D1, R2, Workers, Turnstile); strategi rendering diubah dari ISR menjadi full static build + rebuild on publish.
> Revisi v1.2: menambahkan strategi rendering (static-first/SSG + ISR) beserta matriks rendering per tipe halaman.
> Revisi v1.1: menambahkan pilar blog editorial secara menyeluruh — arsitektur, template, strategi konten, internal linking, roadmap, dan metrik.

---

## 1. Ringkasan Produk

KodeReferral adalah direktori independen yang membantu orang Indonesia menemukan **kode referral yang masih aktif** untuk aplikasi dan layanan populer — mulai dari e-wallet, bank digital, investasi, e-commerce, travel, sampai SaaS. Setiap kode ditampilkan bersama besaran bonus, syarat ringkas, cara pakai, status verifikasi, dan tanggal terakhir dicek.

Situs berdiri di atas dua pilar:

1. **Direktori kode (data):** halaman brand yang terverifikasi, cepat dipindai, dan langsung mendorong aksi.
2. **Blog editorial (konten):** artikel edukasi, perbandingan, tips keamanan, dan update program yang menjawab pertanyaan sebelum pengguna memutuskan.

Blog bukan pelengkap agar situs "tidak monoton". Blog memperluas jangkauan kata kunci, membangun otoritas topik, menarik backlink, dan mengarahkan pembaca ke halaman brand yang relevan. Direktori memberi konversi; blog memberi kedalaman dan kredibilitas.

Nilai utama bagi pengguna bukan sekadar daftar kode, melainkan **kepercayaan bahwa kode itu berfungsi** dan **pemahaman cara memakainya dengan aman**.

Situs ini adalah produk data + konten. SEO bukan fitur tambahan, melainkan model distribusi utamanya.

---

## 2. Latar Belakang & Peluang

### 2.1 Masalah pengguna

- Kode referral tersebar di grup WhatsApp, Telegram, TikTok, dan forum — sulit dicari ulang dan cepat kedaluwarsa.
- Pengguna tidak tahu kode mana yang masih aktif, berapa bonusnya, dan apakah syaratnya masuk akal.
- Halaman promo brand sering tidak menjelaskan langkah pemakaian secara praktis.
- Banyak situs kode referral menampilkan kode kedaluwarsa tanpa tanggal verifikasi, sehingga pengguna kehilangan kepercayaan.
- Informasi seputar referral — cara aman memakainya, perbandingan program, dan tips mencairkan bonus — tersebar dan jarang dikurasi dalam satu tempat.

### 2.2 Peluang

- Pola pencarian `kode referral [nama brand]` memiliki intent tinggi dan volume panjang (long-tail) yang besar per brand.
- Brand fintech, bank digital, dan e-commerce di Indonesia secara rutin menjalankan program referral.
- Konten edukasi dan perbandingan referral masih didominasi artikel generik; ada ruang untuk konten yang lebih akurat, terverifikasi, dan lokal.
- Pesaing umumnya lemah pada tiga hal: **kesegaran data**, **kualitas konten per halaman**, dan **pengalaman mobile**. Ketiganya bisa dijadikan pembeda.

### 2.3 Asumsi yang perlu divalidasi

- Permintaan pencarian per brand cukup besar untuk membenarkan pembuatan halaman khusus.
- Program affiliate tersedia untuk mayoritas brand target (langsung atau lewat jaringan affiliate).
- Tim mampu memverifikasi kode dan memproduksi artikel secara berkala (kapasitas editorial adalah risiko utama).

---

## 3. Tujuan & Non-Tujuan

### 3.1 Tujuan

| # | Tujuan | Ukuran keberhasilan |
|---|---|---|
| G1 | Menjadi rujukan kode referral terpercaya di Indonesia | Trafik organik tumbuh stabil; rasio kode terverifikasi > 90% |
| G2 | Menangkap trafik long-tail `kode referral [brand]` | Masuk 10 besar untuk ≥ 100 kata kunci uang dalam 6 bulan |
| G3 | Mengubah trafik menjadi klik affiliate | Outbound CTR ≥ 10% dari kunjungan halaman brand |
| G4 | Membangun otoritas topik | 300+ halaman brand berkualitas, 40+ artikel pendukung dalam 12 bulan |
| G5 | Membangun blog editorial yang mandiri sebagai kanal trafik | 8.000 sesi organik blog/bulan dan 10 artikel di 10 besar dalam 6 bulan |
| G6 | Menjaga kualitas teknis | ≥ 90% URL lolos Core Web Vitals (data lapangan) |

### 3.2 Non-tujuan (fase awal)

- Bukan platform SaaS untuk brand mengelola program referral.
- Bukan marketplace tempat brand membeli peringkat.
- Tidak menargetkan pasar di luar Indonesia dan tidak menyajikan konten multibahasa.
- Tidak membuat aplikasi mobile native.
- Tidak melakukan scraping otomatis terhadap area login atau data pribadi brand.
- Tidak menyediakan akun pengguna penuh (profil, follower, chat) pada MVP.
- Bukan portal berita keuangan umum; topik blog harus relevan dengan referral, keputusan finansial, dan brand di direktori.
- Tidak menerima guest post/kontributor eksternal tanpa kurasi ketat.

---

## 4. Persona & Jobs To Be Done

### 4.1 Pencari kode (persona utama)

- Usia 18–40, mayoritas mobile, datang dari Google dengan satu brand di kepala.
- Ingin: kode aktif, bonus terbesar, langkah pakai yang jelas, dan kepastian kode berfungsi.
- JTBD: *"Saat saya mau daftar [brand], saya ingin kode referral yang benar-benar aktif supaya saya dapat bonus tanpa trial-and-error."*

### 4.2 Pembanding program

- Sedang memilih aplikasi/bank digital dan membandingkan bonus referral.
- Ingin: tabel perbandingan, syarat, dan rekomendasi yang netral.
- JTBD: *"Saat saya memilih aplikasi, saya ingin membandingkan bonus referral dan syaratnya supaya saya tidak salah pilih."*

### 4.3 Pembaca editorial

- Datang dari Google atau media sosial untuk memahami referral sebelum memutuskan.
- Topik yang dicari: keamanan kode, cara kerja bonus, perbandingan aplikasi, syarat pencairan.
- Ingin jawaban yang jelas, contoh nyata, dan rekomendasi yang tidak memihak.
- JTBD: *"Saat saya ingin memanfaatkan referral tanpa risiko, saya ingin panduan yang jelas supaya saya tidak terjebak syarat atau kode palsu."*

### 4.4 Kontributor kode (fase 2)

- Pengguna yang punya kode dan mau membagikannya.
- Butuh proses submit yang cepat, status moderasi yang jelas, dan aturan anti-spam.
- JTBD: *"Saat saya punya kode yang berfungsi, saya ingin membagikannya supaya orang lain dan saya sama-sama dapat manfaat."*

### 4.5 Editor internal

- Memverifikasi kode, menulis ringkasan syarat, menjaga kesegaran konten.
- Menulis, memfact-check, dan memperbarui artikel blog.
- Butuh antrean verifikasi, kalender editorial, log audit, dan status kode yang jelas.

### 4.6 Mitra brand/affiliate (fase lanjut)

- Ingin paparan trafik dan atribusi klik.
- Butuh label sponsored yang jelas dan metrik performa.

---

## 5. Metrik Keberhasilan

**North Star Metric:** jumlah klik keluar (kode digunakan) dari trafik organik per bulan.

| Kategori | Metrik | Target indikatif (6 bulan) |
|---|---|---|
| SEO | Sesi organik / bulan | 30.000 |
| SEO | Kata kunci uang di 10 besar | 100 |
| SEO | CTR rata-rata GSC | ≥ 4% |
| SEO | Rasio URL terindeks vs layak indeks | ≥ 80% |
| Konten | Sesi organik blog / bulan | 8.000 |
| Konten | Artikel di 10 besar | 10 |
| Konten | Blog-assisted outbound clicks | ≥ 25% dari total klik keluar |
| Konten | Subscriber newsletter | 1.000 |
| Produk | Copy code rate (halaman brand) | ≥ 25% |
| Produk | Outbound CTR (halaman brand) | ≥ 10% |
| Produk | Kode terverifikasi dalam 30 hari | ≥ 90% |
| Bisnis | RPM iklan | Dipantau, bukan target awal |
| Bisnis | EPC affiliate | Dipantau per brand |
| Teknis | URL lolos CWV (field) | ≥ 90% |

Catatan: angka target wajib dikalibrasi ulang setelah 8 minggu data nyata.

---

## 6. Model Bisnis

### 6.1 Alur pendapatan

| Sumber | Cara kerja | Prioritas |
|---|---|---|
| Affiliate | Tombol "Gunakan Kode" dan CTA dalam artikel mengarah ke tautan affiliate brand; komisi per pendaftaran/transaksi | Utama |
| Iklan display | AdSense atau jaringan setara pada slot yang tidak mengganggu | Sekunder |
| Sponsored listing | Brand membayar untuk penempatan unggulan yang **berlabel jelas** | Fase 3 |
| Konten bersponsor | Artikel bermitra dengan label jelas, tetap relevan dengan topik referral | Fase 3 |
| Newsletter | Distribusi ulang konten dan kode baru; monetisasi tidak langsung | Fase 2 |

### 6.2 Aturan monetisasi

- Uang tidak boleh mengubah status verifikasi kode. Kode berbayar tetap ditandai benar/salah apa adanya.
- Setiap tautan affiliate memakai atribut `rel="sponsored nofollow"`.
- Disclosure affiliate tampil jelas di atas tombol CTA dan di artikel yang memuat tautan affiliate.
- Slot iklan tidak boleh mendorong CTA kode ke bawah lipatan pada mobile.
- Tidak ada iklan pop-up/intrusif yang menutupi konten.
- Artikel bersponsor wajib diberi label di judul dan paragraf pembuka.

---

## 7. Strategi SEO (Inti Produk)

### 7.1 Prinsip

1. **Satu URL = satu intent utama.** URL stabil, tanpa tahun/bulan di slug.
2. **Kepercayaan lebih penting daripada jumlah halaman.** Kode kedaluwarsa merusak brand dan SEO.
3. **Programmatic hanya untuk kombinasi yang punya permintaan nyata.** Tidak ada halaman hasil permutasi tanpa nilai unik.
4. **Blog tidak boleh menjadi konten massal.** Setiap artikel harus punya angle, data, atau sudut pandang yang jelas.
5. **Mobile-first dan cepat.** Mayoritas trafik dari ponsel; iklan tidak boleh merusak Core Web Vitals.
6. **Topikal, bukan sekadar daftar.** Direktori dan blog saling menaut dalam model pilar–klaster.
7. **Manusia yang menjamin akurasi.** AI boleh membantu draft, tetapi verifikasi dan publikasi dilakukan manusia.

### 7.2 Riset kata kunci & peta topik

Validasi volume dengan Ahrefs/Keyword Planner sebelum membuat halaman. Jangan membuat halaman hanya karena "kelihatannya ada".

**Direktori**

| Tier | Contoh kata kunci | Intent | Halaman tujuan | Prioritas |
|---|---|---|---|---|
| Head | kode referral, kode referal, kode undangan | Broad / campuran | Homepage + hub | Menengah |
| Mid | kode referral e-wallet, kode referral bank digital, kode referral investasi | Komersial | Halaman kategori | Tinggi |
| Long-tail uang | kode referral bibit, kode referal gopay, kode undangan pluang | Transaksional | Halaman brand | Tertinggi |
| Informasional | cara pakai kode referral bibit, apa itu kode referral | Informasional | Bagian di halaman brand / blog | Tinggi |
| Perbandingan | aplikasi investasi dengan bonus referral terbesar | Komersial | Artikel roundup blog | Menengah |
| Freshness | kode referral bibit terbaru, kode referal [brand] 2026 | Transaksional | Halaman brand yang sama (update di tempat) | Tinggi |

**Blog**

| Klaster | Contoh kata kunci | Intent | Format | Prioritas |
|---|---|---|---|---|
| Dasar & keamanan | apa itu kode referral, cara kerja kode referral, kode referral palsu | Informasional | Artikel pilar + turunan | Tinggi |
| Perbandingan | aplikasi investasi bonus referral terbesar, e-wallet bonus referral | Komersial | Roundup/tabel | Tinggi |
| Optimasi bonus | cara mencairkan bonus referral, bonus referral tidak masuk | Informasional | Tips/panduan | Tinggi |
| Update program | program referral terbaru bulan ini | Freshness | Artikel update (URL tetap) | Menengah |
| Keputusan finansial | cara memilih bank digital, cashback vs poin vs bonus | Informasional | Artikel pilar | Menengah |

**Varian ejaan yang harus tercakup secara natural di konten:** `referal`, `refferal`, `referall`, `kode undangan`. Jangan membuat URL terpisah untuk tiap ejaan — cukup gunakan dalam kalimat, FAQ, dan alt text.

**Aturan kanibalisasi:** panduan "cara pakai kode referral X" digabung ke halaman brand X selama intent-nya sama. Artikel blog terpisah hanya dibuat jika intent benar-benar berbeda (mis. edukasi umum "Apa itu kode referral", perbandingan lintas brand, atau tips keamanan).

**Model pilar–klaster:** setiap klaster blog punya satu artikel pilar yang menaut ke 5–10 artikel turunan, dan sebaliknya. Klaster MVP:

1. Dasar & keamanan referral.
2. Perbandingan aplikasi/bank.
3. Cara memaksimalkan & mencairkan bonus.
4. Update program.

### 7.3 Arsitektur informasi & pola URL

```
/                                       Homepage
/kode-referral/                         Hub semua brand (A–Z + kategori)
/kode-referral/{brand}/                 Halaman uang utama per brand
/kategori/{kategori}/                   Hub kategori direktori
/blog/                                  Hub blog
/blog/{kategori}/                       Arsip kategori blog
/blog/{slug}/                           Artikel blog
/penulis/{slug}/                        Profil penulis
/cari?q=                                Hasil pencarian (noindex)
/tentang/                               Tentang & tim
/kebijakan-editorial/                   Kebijakan editorial
/metodologi-verifikasi/                 Cara kode diverifikasi
/disclosure-affiliate/                  Pengungkapan affiliate
/privasi/                               Kebijakan privasi
/kontak/                                Kontak & koreksi
/go/{brand}                             Redirect affiliate (noindex, diblok robots)
```

Aturan URL:

- Huruf kecil, tanda hubung, tanpa parameter tahun/bulan.
- Ganti slug hanya dengan 301 permanen.
- Halaman filter/sort tidak membuat URL baru yang terindeks; gunakan parameter dan `noindex` atau canonical ke halaman dasar.
- Pagination: canonical ke dirinya sendiri, bukan ke halaman 1.
- Jangan membuat halaman terpisah per bulan ("kode-referral-oktober-2026"). Perbarui URL yang sama agar otoritas dan backlink terkumpul.
- Blog memakai kategori, bukan tag. Halaman tag tipis tidak dibuat pada MVP.
- Arsip blog memakai pagination crawlable, bukan infinite scroll tanpa URL.

### 7.4 Tipe halaman & peran SEO

| Tipe halaman | Peran | Target kata kunci | Prioritas MVP |
|---|---|---|---|
| Homepage | Brand + navigasi + kepercayaan + editorial | kode referral | P0 |
| Hub semua brand | Penemuan & internal link | kode referral terbaru | P1 |
| Kategori direktori | Mengumpulkan otoritas topik | kode referral {kategori} | P0 |
| Brand | Halaman uang utama | kode referral {brand} | P0 |
| Blog hub | Pintu masuk konten & internal link | blog kode referral | P0 |
| Kategori blog | Mengelompokkan topik | tips referral, perbandingan | P0 |
| Artikel pilar | Topikal & backlink | apa itu kode referral, dll. | P0 |
| Artikel turunan | Long-tail & konversi | cara aman pakai kode referral | P1 |
| Profil penulis | E-E-A-T | — | P1 |
| Halaman trust | E-E-A-T | tentang, metodologi | P0 |
| Pencarian internal | UX, bukan SEO | — | P0 |
| Redirect affiliate | Tracking | — | P0 |

### 7.5 Template & anatomi halaman

#### Homepage

- Value proposition + kolom pencarian.
- Kategori populer.
- "Baru diverifikasi minggu ini".
- Brand populer.
- Modul editorial: artikel unggulan + tautan ke blog.
- Cara kerja (3 langkah) + statistik kepercayaan (jumlah kode terverifikasi, frekuensi pengecekan).
- Halaman trust dan newsletter.

#### Halaman kategori direktori

- Intro unik 150–250 kata yang menjelaskan kategori dan cara memilih.
- Daftar brand dengan bonus, status, dan tanggal verifikasi.
- Filter ringan (status, jenis bonus, alfabetis) tanpa membuat URL terindeks baru.
- FAQ kategori.
- Modul 2 artikel blog relevan.
- Tautan ke kategori terkait.

#### Halaman brand (halaman terpenting)

1. Breadcrumb.
2. H1: `Kode Referral {Brand} Terbaru {Bulan} {Tahun}`.
3. Blok jawaban langsung: bonus, kode utama, badge status, tanggal verifikasi, tombol **Salin Kode**.
4. Disclosure affiliate singkat.
5. Cara pakai 3–6 langkah.
6. Daftar kode lain (jika ada) dengan status masing-masing.
7. Ringkasan syarat & ketentuan + tautan sumber resmi.
8. FAQ 4–6 pertanyaan (jawaban 2–4 kalimat).
9. Modul "Artikel terkait" (minimal 2 artikel blog relevan).
10. Alternatif brand serupa dalam kategori yang sama.
11. Kotak editor: nama penulis, tanggal diperbarui, tautan metodologi.

Konten unik minimum: 150–300 kata intro + syarat + FAQ, bukan boilerplate yang diulang identik di semua brand.

#### Blog hub

- Hero editorial + artikel unggulan.
- Kategori topik, artikel terbaru, artikel populer.
- Modul CTA ke direktori: "Cari kode referral terverifikasi".
- Newsletter signup.
- Tanpa tag cloud dan tanpa arsip tanggal.

#### Arsip kategori blog

- Intro unik 100–200 kata.
- Daftar artikel dengan pagination crawlable.
- Artikel unggulan kategori + tautan ke kategori lain.
- CTA kontekstual ke kategori direktori yang relevan.

#### Artikel blog

1. Kategori + breadcrumb.
2. H1 dan dek yang menjawab intent.
3. Penulis + reviewer + tanggal terbit + tanggal diperbarui.
4. Daftar isi untuk artikel > 1.200 kata.
5. Blok jawaban langsung (answer-first).
6. Isi dengan subjudul, tabel, contoh, dan sumber.
7. Modul CTA kontekstual ke 2–5 halaman brand relevan (kode terverifikasi).
8. FAQ (jika relevan).
9. Daftar sumber resmi + tanggal akses.
10. Kotak penulis + kebijakan editorial.
11. Artikel terkait (2–3) dan kategori terkait.

Jenis artikel:

- **Pilar/edukasi (evergreen):** definisi, cara kerja, keamanan, perbedaan referral vs promo.
- **Perbandingan/roundup:** tabel bonus & syarat; diperbarui di URL yang sama setiap tahun.
- **Tips praktis:** pencairan bonus, syarat umum, kesalahan umum.
- **Update program:** ringkasan program terbaru; URL tetap, diperbarui berkala.

#### Profil penulis

- Bio, keahlian, foto, tautan profesional (`sameAs`).
- Daftar artikel yang ditulis dan direview.
- Halaman ini penting untuk E-E-A-T.

### 7.6 Programmatic SEO dengan quality gate

pSEO dipakai untuk membuat halaman brand dalam skala, tetapi setiap halaman harus lolos gate berikut **sebelum** dipublikasikan:

| Gate | Kriteria |
|---|---|
| Permintaan | Ada volume pencarian tervalidasi atau bukti intent lain |
| Program nyata | Program referral resmi/aktif dan syarat tersedia |
| Data | Minimal 1 kode aktif atau tautan referral resmi + langkah pakai |
| Konten unik | Intro unik ≥ 150 kata, ringkasan syarat, FAQ ≥ 3 |
| Verifikasi | Diperiksa manusia, tanggal verifikasi tercatat |
| Duplikasi | Tidak ada template identik antarbrand selain boilerplate legal |
| Review | Editor menyetujui sebelum publish |

Aturan tambahan:

- Ramp publikasi maksimal 20–50 URL baru per minggu, pantau GSC.
- Jangan membuat permutasi kota, bulan, atau "kode referral X untuk Y" tanpa permintaan nyata.
- Halaman tanpa impresi setelah 90 hari dan tanpa nilai strategis: gabungkan atau hapus dengan 410/301 yang tepat.
- Blog **tidak** mengikuti pSEO massal. Setiap artikel wajib punya angle, data, atau sudut pandang unik; tidak ada artikel yang hanya merangkum ulang halaman brand.

### 7.7 Structured data

| Tipe | Halaman | Catatan |
|---|---|---|
| Organization | Sitewide | Nama, logo, URL, `sameAs` sosial resmi |
| WebSite | Sitewide | Identitas situs dan penerbit |
| BreadcrumbList | Semua halaman | Wajib, konsisten dengan breadcrumb visual |
| ItemList | Kategori direktori, hub, halaman brand, hub/arsip blog | Daftar brand, kode, atau artikel |
| CollectionPage | Kategori direktori & blog | Semantik, bukan rich result |
| FAQPage | Halaman brand & artikel | Markup valid, tetapi jangan berharap rich result: Google membatasi FAQ rich results ke situs pemerintah/kesehatan otoritatif |
| BlogPosting | Artikel blog | `headline`, `author`, `datePublished`, `dateModified`, `image`, `publisher` |
| Person | Profil penulis/editor | Nama, peran, `sameAs` |

Larangan:

- Jangan menandai `AggregateRating` atau `Review` palsu. Ulasan hanya jika benar-benar ada ulasan pengguna.
- Jangan memakai `Offer` untuk kode yang sudah kedaluwarsa.
- Jangan mengandalkan `HowTo`: rich result-nya sudah dihentikan Google. Langkah pakai tetap ditulis sebagai konten biasa.
- Jangan menandai halaman sebagai produk/merchant jika bukan.

Validasi setiap template di Rich Results Test dan Schema Markup Validator sebelum rilis.

### 7.8 Technical SEO

**Rendering & performa**

- Astro static output: konten utama harus tersedia di HTML hasil build, bukan setelah hydration. Tidak ada SSR/ISR di halaman konten. Keputusan per tipe halaman ada di §7.9.
- Target Core Web Vitals (p75, mobile): LCP ≤ 2,5 dtk, INP ≤ 200 ms, CLS ≤ 0,1.
- Gambar: WebP/AVIF, dimensi eksplisit, lazy load di bawah lipatan, prioritas untuk LCP.
- Font self-hosted, `font-display: swap`, preload font utama.
- Budget JavaScript ketat; hindari library berat untuk interaksi sederhana.
- Iklan: slot dengan tinggi tetap (cegah CLS), lazy load, maksimal 1 unit di atas lipatan, tidak menutupi CTA.
- Artikel panjang memuat gambar sampul dan konten segera, bukan setelah hydration.

**Indexing & crawl**

- Sitemap index terpisah: `brands.xml`, `categories.xml`, `blog.xml`, `static.xml`.
- `lastmod` hanya berubah jika konten benar-benar berubah.
- Sitemap hanya berisi URL indexable (200, canonical diri sendiri).
- `robots.txt`: izinkan CSS/JS/gambar, blokir `/cari`, `/go`, `/admin`, `/api`.
- Jangan memakai Indexing API Google untuk halaman umum — API itu khusus job posting dan livestream.
- Daftarkan sitemap ke Google Search Console dan Bing Webmaster Tools (IndexNow opsional).
- Pantau laporan "Crawled – currently not indexed" setiap minggu.

**Canonical & duplikasi**

- Semua halaman punya canonical diri sendiri.
- Halaman filter, sort, dan parameter pelacakan: `noindex` atau canonical ke halaman dasar.
- Pagination direktori dan blog: self-canonical.
- Artikel yang diperbarui mempertahankan `datePublished`; `dateModified` diperbarui.
- Konten sindikasi/duplikat tidak dipublikasikan tanpa nilai tambah.
- RSS feed blog disediakan untuk distribusi dan agregator (opsional, bukan faktor ranking langsung).

**Kebersihan teknis**

- HTTPS + HSTS, kompresi, caching CDN.
- 404 yang benar, 410 untuk konten yang dihapus permanen, 301 untuk perubahan URL.
- Tidak ada soft 404 (halaman "kosong" tetap 200).
- Uji mobile dan WebView Android.
- Log file analysis bulanan untuk crawl budget.

### 7.9 Strategi Rendering

**Keputusan:** situs dirender **fully static** dengan **Astro** (`output: 'static'`). Homepage, hub, kategori, halaman brand, artikel, arsip, dan profil penulis di-generate saat build lalu dilayani sebagai static asset dari CDN Cloudflare. Tidak ada SSR/ISR di jalur halaman konten.

Alasan:

- **SEO:** HTML lengkap saat crawler datang; tidak bergantung pada JavaScript.
- **Performa:** Astro mengirim nol JavaScript secara default; interaksi memakai islands kecil. CWV lebih mudah dijaga.
- **Gratis & skalabel:** request static asset Cloudflare gratis dan tidak terbatas; tidak terkena limit 100k request/hari.
- **Cocok dengan limit free tier:** menghindari batas bundle Worker ~3 MiB dan CPU 10ms yang menjadi kendala pada Next.js SSR/ISR.

#### Matriks rendering per tipe halaman

| Halaman | Strategi | Pembaruan | Catatan |
|---|---|---|---|
| Homepage | Static (build) | Rebuild saat publish/verifikasi | Modul brand/kode/artikel terbaru |
| Hub & kategori direktori | Static | Rebuild saat publish/verifikasi | Daftar brand |
| Halaman brand | Static | Rebuild saat publish/verifikasi | Status kode ikut ter-update |
| Artikel & arsip blog | Static | Rebuild saat publish/edit | CWV kritis |
| Profil penulis | Static | Rebuild saat publish | Jarang berubah |
| Pencarian | Static index (Pagefind) | Rebuild saat publish | Client-side, `noindex` |
| `/go/{brand}` | Cloudflare Worker (302) | Real-time | Tracking + redirect, diblok robots |
| Vote, lapor, submit | Cloudflare Worker + D1 | Real-time | Tidak diindeks |
| Admin/CMS | Keystatic/Decap (Git) + auth | Real-time | `noindex`, dilindungi Access/OAuth |

#### Alur pembaruan (build-on-change)

1. Editor mengubah kode/artikel lewat CMS Git-based, lalu commit/publish.
2. Deploy hook Cloudflare memicu build Astro.
3. Build menarik konten dari Git dan data dinamis dari D1, lalu menghasilkan HTML, sitemap, dan indeks Pagefind.
4. Deploy baru menggantikan asset lama; cache CDN mengikuti versi baru.

#### Prinsip implementasi

- Konten utama (judul, kode, syarat, isi artikel) harus ada di HTML hasil build; jangan fetch client-side untuk konten inti.
- Data yang berubah cepat (vote count, laporan baru) boleh dimuat client-side dari Worker dengan ruang terpesan agar tidak CLS. Status verifikasi utama tetap di HTML statis.
- Build harus idempoten dan cepat (< 3 menit untuk 300 halaman); jika build gagal, deploy terakhir tetap melayani situs.
- Jangan mengubah halaman konten menjadi SSR saat butuh data real-time; tambahkan Worker API untuk komponen tertentu.
- Preview lewat branch deployment sebelum merge/publish.
- Build trigger di-debounce (mis. maksimal 1 build per 5 menit) agar tidak membanjiri kuota build.

#### Tradeoff

| Pilihan | Kelebihan | Kekurangan | Keputusan |
|---|---|---|---|
| Astro full static + rebuild | Gratis, cepat, aman, CWV terbaik; cocok limit Cloudflare free | Update butuh build (menit), bukan instan | **Dipakai** |
| Next.js + ISR | Update per halaman tanpa build penuh | Bundle/CPU free tier bermasalah; cache lebih kompleks | Tidak dipakai |
| Full SSR | Data selalu segar | Biaya, latensi, dan kompleksitas tidak sepadan | Tidak dipakai |

#### Batas free tier & mitigasi

- **Build:** Pages free ± 500 build/bulan; Workers Builds punya kuota terpisah — verifikasi sebelum memilih. Verifikasi 5/hari ≈ 150 build/bulan.
- **Request dinamis:** 100k/hari untuk vote, lapor, submit, dan redirect. Jika terlampaui, naik ke Workers Paid $5/bulan.
- **D1 write:** 100k baris/hari. Jangan menulis setiap pageview; agregasi klik per jam/hari.
- **Build gagal:** deploy terakhir tetap live; alert + retry otomatis.

#### Dampak ke PRD

- Framework: Astro + TypeScript; islands hanya untuk copy code, vote, dan form.
- Hosting: Cloudflare Workers Static Assets (disarankan) atau Pages.
- CMS: Keystatic atau Decap (Git-based) untuk blog dan data brand/kode; riwayat Git sebagai audit log.
- Data dinamis: D1 untuk vote, laporan, submission, dan agregasi klik; R2 untuk upload bukti dan backup D1.
- Pencarian: Pagefind, dibangun saat build.
- Monitoring: alert build gagal, staleness halaman brand, dan error Worker.

### 7.10 Kesegaran data & siklus hidup konten

Ini adalah pembeda sekaligus sinyal kualitas terpenting.

**Status kode**

| Status | Definisi | Tampilan |
|---|---|---|
| Terverifikasi | Dicek ≤ 30 hari | Badge hijau + tanggal |
| Perlu dicek ulang | 31–60 hari | Badge kuning + ajakan lapor |
| Usang | > 60 hari atau banyak laporan gagal | Badge oranye, diturunkan dari daftar utama |
| Kedaluwarsa | Dikonfirmasi tidak berlaku | Badge merah + alternatif |
| Dihentikan | Program brand berakhir | Catatan khusus, tautan ke alternatif |

Aturan operasional:

- Setiap kode punya `next_verify_at`; cron membuat antrean verifikasi.
- Jadwal cek: brand volatil (e-wallet, promo musiman) 30 hari; brand stabil 60–90 hari.
- Vote pengguna ("berhasil"/"tidak berhasil") memengaruhi confidence score. Fail rate > 30% dalam 7 hari memicu review.
- Halaman dengan kode kedaluwarsa **tidak dihapus** jika masih punya backlink/nilai informasi. Tandai kedaluwarsa, tampilkan alternatif, pertahankan URL.
- Jangan memperbarui tanggal tanpa perubahan nyata (fake freshness).
- Anggaran operasional contoh: 150 brand × verifikasi bulanan = ± 5 pengecekan/hari kerja.

**Siklus konten blog**

- Artikel evergreen ditinjau ulang setiap 6–12 bulan atau saat program brand berubah.
- Artikel perbandingan/update diperbarui minimal setiap kuartal.
- Tampilkan tanggal "Diperbarui" yang akurat; jangan mengubah `datePublished`.
- Artikel yang kehilangan relevansi digabung atau dialihkan dengan 301, bukan dibiarkan menua tanpa perawatan.

### 7.11 Internal linking

- Homepage → kategori utama + brand populer + artikel unggulan + halaman trust.
- Kategori direktori → semua brand dalam kategori + kategori terkait + 2 artikel relevan.
- Brand → brand serupa, kategori induk, 2–3 artikel relevan, halaman metodologi.
- Blog hub → kategori blog + artikel unggulan + CTA direktori.
- Artikel → 2–5 halaman brand relevan + 2–3 artikel terkait + kategori blog.
- Model pilar–klaster: artikel pilar menaut ke 5–10 artikel turunan; setiap artikel turunan menaut balik ke pilar.
- Semua halaman maksimal 3 klik dari homepage.
- Anchor text deskriptif dan bervariasi; hindari exact-match berlebihan.
- Breadcrumb visual + BreadcrumbList schema di semua halaman.

### 7.12 E-E-A-T & kualitas konten

- Profil penulis/editor nyata dengan foto, pengalaman, dan tautan profesional.
- Halaman **Metodologi Verifikasi** yang menjelaskan sumber, cara cek, dan frekuensi.
- Halaman **Kebijakan Editorial** yang menjelaskan proses riset, koreksi, dan independensi.
- Label "Diperiksa oleh" dan tanggal verifikasi di setiap halaman brand.
- Setiap artikel blog punya penulis dan reviewer yang tercantum.
- Kebijakan koreksi: laporan pengguna ditindaklanjuti ≤ 3 hari kerja.
- Transparency: nyatakan situs tidak berafiliasi dengan brand kecuali dinyatakan; jelaskan komisi.
- Sitasi sumber resmi (situs brand, syarat & ketentuan) dan tanggal akses.
- Konten AI hanya sebagai draft; faktanya wajib diverifikasi manusia. Hindari konten massal otomatis (kebijakan scaled content abuse Google).
- Cek plagiarisme sebelum publish.
- Ulasan pengguna hanya ditampilkan jika asli dan dimoderasi.
- Hindari artikel "serba bisa" tanpa sudut pandang; setiap artikel harus punya alasan untuk ada.

### 7.13 Visibilitas di AI Search / AI Overviews

- **Answer-first**: paragraf 1–2 kalimat langsung menjawab "kode referral X dan bonusnya apa" atau pertanyaan utama artikel.
- Gunakan tabel untuk perbandingan bonus dan syarat.
- Jaga konsistensi entitas: nama brand, URL resmi, logo, dan `sameAs` yang sama di seluruh situs.
- Sajikan data unik yang layak dikutip: tanggal verifikasi, tingkat keberhasilan, ringkasan syarat, dan temuan orisinal dari artikel.
- Tentukan kebijakan crawler AI secara sadar. Jika ingin dikutip, jangan blokir `Google-Extended`, `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot` di level CDN/robots. Jika memblokir, terima konsekuensi tidak muncul di jawaban AI.
- Pantau trafik rujukan dari mesin AI di GA4.

### 7.14 Guardrail anti-spam

- Tidak ada doorway pages (mis. brand × kota).
- Tidak ada konten massal tanpa review manusia, termasuk artikel blog.
- Tidak ada halaman tag tipis atau arsip tanggal tanpa konten unik.
- Tidak ada cloaking: konten untuk crawler dan pengguna harus sama.
- Tautan affiliate `rel="sponsored nofollow"`.
- Tidak membeli backlink atau menukar link secara masif.
- Tidak menyalin deskripsi brand apa pun apa adanya (plagiarisme).
- Sponsored content selalu berlabel.
- Patuhi ToS brand: verifikasi manual dari sumber resmi, bukan scraping area privat.

---

## 8. Kebutuhan Fungsional

Prioritas: P0 = wajib MVP, P1 = fase 1.1, P2 = fase 2.

| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| FR-01 | Pencarian brand | Autocomplete, hasil brand + kategori + artikel, empty state | P0 |
| FR-02 | Browse kategori | Daftar brand per kategori, status, bonus | P0 |
| FR-03 | Halaman brand | Template lengkap sesuai §7.5 | P0 |
| FR-04 | Salin kode | Tombol copy + toast + fallback manual | P0 |
| FR-05 | Redirect affiliate | `/go/{brand}` + tracking + `rel sponsored` | P0 |
| FR-06 | Badge verifikasi | Status + tanggal di semua kode | P0 |
| FR-07 | Vote kode | "Berhasil"/"Tidak berhasil" + deduplikasi | P1 |
| FR-08 | Lapor kode mati | Form singkat + alasan | P1 |
| FR-09 | Submit kode | Form UGC + moderasi + anti-spam | P1 |
| FR-10 | Filter & sort | Status, jenis bonus, alfabetis | P1 |
| FR-11 | Alternatif brand | Rekomendasi brand serupa | P1 |
| FR-12 | CMS Git-based | CRUD brand, kode, kategori; antrean verifikasi; riwayat Git sebagai audit log | P0 |
| FR-13 | CMS editorial | Artikel, penulis, kategori, jadwal, preview, revisi (Git) | P0 |
| FR-14 | Analytics event | Copy, klik keluar, vote, search, submit, baca artikel | P0 |
| FR-15 | Sitemap & robots | Generate otomatis, validasi saat build | P0 |
| FR-16 | Halaman legal & trust | Privacy, disclosure, metodologi, editorial | P0 |
| FR-17 | Structured data | Sesuai §7.7 | P0 |
| FR-18 | Newsletter | Notifikasi kode baru/kedaluwarsa + artikel | P2 |
| FR-19 | Perbandingan | Tabel bandingkan 2–3 brand | P2 |
| FR-20 | Klaim halaman brand | Brand mengklaim profil (berbayar, berlabel) | P2 |
| FR-21 | Blog hub & kategori | Hub, arsip kategori, pagination crawlable | P0 |
| FR-22 | Template artikel | Penulis, TOC, sumber, CTA, related, schema | P0 |
| FR-23 | Profil penulis | Bio, daftar artikel, `sameAs` | P1 |
| FR-24 | Modul artikel terkait | Blog ↔ brand dua arah | P0 |
| FR-25 | RSS feed | Feed artikel untuk distribusi | P2 |

### 8.1 Acceptance criteria kunci

**FR-04 Salin kode**
- Given kode berstatus aktif, when pengguna menekan "Salin Kode", then kode tersalin, muncul toast "Kode disalin", tombol berubah "Tersalin", dan event `copy_code` terkirim dengan `brand_id` + `page_type`.
- Jika clipboard gagal, tampilkan fallback dengan teks kode yang bisa diseleksi manual.

**FR-05 Redirect affiliate**
- Given kode aktif, when pengguna menekan "Gunakan Kode", then kode disalin lebih dulu, tab baru membuka `/go/{brand}?code=...`, lalu 302 ke URL affiliate dengan sub-ID, dan event `outbound_click` tercatat.
- Tautan keluar memakai `rel="sponsored nofollow"` dan `target="_blank"`.
- Redirect tidak diindeks dan diblok robots.

**FR-06 Badge verifikasi**
- Setiap kode menampilkan status dan tanggal verifikasi.
- Halaman brand menampilkan "Terakhir diperbarui" yang berasal dari `updated_at` konten, bukan timestamp build.
- Kode > 60 hari tanpa verifikasi otomatis berstatus "perlu dicek ulang" (bukan langsung "kedaluwarsa").

**FR-01 Pencarian**
- Debounce 200 ms, maksimal 8 hasil, mendukung varian ejaan "referal".
- Hasil kosong menampilkan brand populer dan tautan kategori.
- Halaman hasil pencarian `noindex` dan tidak masuk sitemap.

**FR-12 Admin verifikasi**
- Editor dapat mengubah status kode dengan catatan wajib.
- Setiap perubahan tercatat di audit log (siapa, kapan, status lama → baru).
- Perubahan langsung memengaruhi tampilan publik setelah cache invalidated.

**FR-15 Sitemap**
- Sitemap dibangun saat build; build gagal jika ada URL `noindex` yang masuk sitemap.
- `lastmod` hanya berubah saat konten berubah.

**FR-21/FR-22 Blog**
- Given artikel berstatus published, when halaman dirender, then tampil penulis, tanggal terbit, tanggal diperbarui, kategori, BreadcrumbList, dan BlogPosting yang valid.
- Artikel menampilkan minimal 2 tautan ke halaman brand relevan dan 2 artikel terkait.
- Arsip kategori memakai pagination crawlable; tidak ada halaman tag.
- Artikel yang diperbarui tidak mengubah `datePublished`, hanya `dateModified`.
- Blog hub menampilkan CTA ke direktori dan newsletter.

---

## 9. Peta Situs

```
Beranda
├── Kode Referral (hub A–Z)
│   └── {Brand} — halaman uang
├── Kategori Direktori
│   ├── E-wallet
│   ├── Bank digital
│   ├── Investasi
│   ├── E-commerce
│   ├── Travel
│   ├── Food delivery
│   └── SaaS & produktivitas
├── Blog
│   ├── Kategori
│   │   ├── Dasar & Keamanan
│   │   ├── Perbandingan
│   │   ├── Tips & Optimasi Bonus
│   │   └── Update Program
│   └── Artikel
├── Penulis
├── Tentang
├── Kebijakan Editorial
├── Metodologi Verifikasi
├── Disclosure Affiliate
├── Privasi
└── Kontak
```

Kedalaman maksimal: 3 klik dari homepage ke halaman brand dan artikel mana pun.

---

## 10. Data Model (ringkas)

**Pemisahan data (stack Astro + Cloudflare):**

- **Konten Git:** Brand, Category, Code, Author, BlogCategory, dan Article disimpan sebagai file (MDX/JSON/YAML) dan diedit lewat CMS Git-based. Build membaca data ini.
- **D1 (SQLite):** Vote, Report, Submission, ClickEvent agregat, dan antrean operasional (mis. laporan masuk). D1 bukan sumber utama konten halaman; status verifikasi kode tetap di konten Git dan diubah lewat CMS.
- **R2:** Upload bukti laporan/submission dan backup D1.

Skema di bawah adalah kontrak data untuk kedua lapisan.

### Brand
`id, slug, name, aliases[], primary_category_id, logo_url, official_url, description, affiliate_url_template, affiliate_network, status(active|inactive), is_featured, created_at, updated_at`

### Category
`id, slug, name, description, parent_id, sort_order`

### Code
`id, brand_id, type(code|link), code_value(nullable), reward_title, reward_value, terms_md, source_url, status(verified|recheck|stale|expired|discontinued), verified_at, verified_by, next_verify_at, expires_at, success_votes, fail_votes, is_primary, priority, created_at, updated_at`

### VerificationLog
`id, code_id, checked_at, checker_id, method(official_source|manual_test|user_report), evidence_url, result, notes`

### Submission
`id, brand_name, code_value, proof_url, contact_email(nullable), status(pending|approved|rejected), reviewer_id, created_at`

### ClickEvent
`id, brand_id, code_id(nullable), article_id(nullable), action(copy|go|vote|report|article_cta), page_type, session_id, referrer, created_at`
Tidak menyimpan PII. Tulis sebagai agregat per jam/hari (bukan satu baris per pageview) agar bijak terhadap limit 100k write/hari D1.

### Author
`id, name, slug, role, bio, photo_url, same_as[]`

### BlogCategory
`id, slug, name, description, sort_order`

### Article
`id, slug, title, excerpt, body_md, cover_image_url, category_id, content_type(pillar|cluster|roundup|update), author_id, reviewer_id, status(draft|review|published), reading_time_min, related_brand_ids[], related_article_ids[], sources[], seo_title, meta_description, published_at, last_reviewed_at, updated_at`

---

## 11. Alur Verifikasi, Editorial & Moderasi

### 11.1 Alur kode baru

1. Riset permintaan & ketersediaan program.
2. Kumpulkan sumber resmi (halaman program, syarat).
3. Buat draft brand + kode.
4. Verifikasi manual/sumber resmi; catat bukti.
5. Tulis intro, syarat ringkas, FAQ, langkah pakai.
6. Review editor (cek duplikasi & akurasi).
7. Publish + masuk sitemap + internal link; deploy hook memicu rebuild.
8. Jadwalkan `next_verify_at`.

### 11.2 Alur verifikasi berkala

- Cron membaca manifest `verification-schedule.json` hasil build dan membuat ringkasan kode yang jatuh tempo.
- Editor mengecek sumber resmi; memperbarui status + tanggal lewat CMS, lalu rebuild.
- Jika gagal: tandai kedaluwarsa, tampilkan alternatif, simpan halaman.
- Jika program berakhir: status "dihentikan", beri catatan, pertimbangkan 301 ke kategori.

### 11.3 Laporan pengguna

- Form lapor dengan alasan (tidak berfungsi, syarat berubah, bonus berbeda).
- SLA review ≤ 3 hari kerja.
- Setelah 3 laporan valid dalam 7 hari, kode otomatis masuk antrean prioritas.

### 11.4 Moderasi UGC (fase 2)

- Wajib login ringan atau verifikasi email.
- Rate limit + CAPTCHA (Turnstile).
- Larangan menampilkan kode duplikat/spam.
- Semua submission melewati antrean manual sebelum tampil.

### 11.5 Alur editorial blog

1. Riset kata kunci dan tentukan klaster.
2. Tulis brief: intent, angle unik, data/sumber, CTA ke brand mana.
3. Draft oleh penulis.
4. Fact-check ke sumber resmi dan cek plagiarisme.
5. Review editor; cek kanibalisasi dengan halaman brand/artikel lain.
6. Publish + schema + internal link dua arah; deploy hook memicu rebuild.
7. Distribusi (newsletter, sosial).
8. Review ulang 6–12 bulan atau saat program berubah.

**Aturan konten minimum per artikel:**

| Elemen | Standar |
|---|---|
| Angle unik | Wajib; bukan rangkuman halaman brand |
| Sumber | Minimal 2 sumber resmi/kredibel + tanggal akses |
| Penulis & reviewer | Wajib tercantum |
| Internal link | 2–5 brand + 2–3 artikel |
| CTA | Relevan dengan topik, maksimal 2 |
| Fact-check | Wajib sebelum publish |
| Update | Evergreen 6–12 bulan; perbandingan/update per kuartal |

**Ritme publikasi indikatif:** 2 artikel/minggu saat MVP, lalu 4–6/minggu. Kualitas lebih penting daripada frekuensi.

### 11.6 Kalender konten 8 artikel MVP

| # | Judul kerja | Kata kunci utama | Jenis | CTA utama |
|---|---|---|---|---|
| 1 | Apa Itu Kode Referral dan Cara Kerjanya | apa itu kode referral | Pilar | Hub kategori |
| 2 | Kode Referral vs Kode Promo: Apa Bedanya? | kode referral vs kode promo | Pilar | Halaman brand |
| 3 | Cara Aman Memakai Kode Referral dari Internet | kode referral palsu | Tips | Halaman brand |
| 4 | Bonus Referral Tidak Masuk? 7 Penyebab Umum | bonus referral tidak masuk | Tips | E-wallet |
| 5 | Aplikasi Investasi dengan Bonus Referral Terbesar | aplikasi investasi bonus referral | Roundup | Brand investasi |
| 6 | E-Wallet dengan Bonus Referral Terbaik | e-wallet bonus referral | Roundup | Brand e-wallet |
| 7 | Cara Mencairkan Bonus Referral dan Syaratnya | cara mencairkan bonus referral | Tips | Multi-brand |
| 8 | Program Referral Terbaru Bulan Ini | program referral terbaru | Update | Brand unggulan |

---

## 12. Monetisasi (Detail)

### 12.1 Penempatan

| Elemen | Aturan |
|---|---|
| Tombol CTA | Di atas lipatan, kontras tinggi, tidak tertutup iklan |
| Disclosure | Tepat di atas CTA, 1 baris, jelas |
| Iklan in-content | Maksimal 1 per layar, tinggi tetap |
| CTA dalam artikel | Kontekstual, maksimal 2 per artikel, mengarah ke brand relevan |
| Sponsored listing | Label "Bersponsor", tidak memengaruhi urutan verifikasi |
| Artikel bersponsor | Label di judul + disclosure; tidak boleh menyesatkan pembaca |

### 12.2 Tracking

- Parameter: `brand`, `page_type`, `placement`, `code_id`, `article_id`.
- Redirect `/go/{brand}` mencatat klik sebelum meneruskan.
- Sub-ID affiliate per penempatan untuk mengukur EPC.
- Event GA4: `copy_code`, `outbound_click`, `vote_success`, `vote_fail`, `report_expired`, `submit_code`, `article_cta_click`, `newsletter_signup`.

---

## 13. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performa | LCP ≤ 2,5 dtk; INP ≤ 200 ms; CLS ≤ 0,1 (p75 mobile) |
| Caching | Static asset CDN Cloudflare; cache mengikuti deploy baru; API dinamis `no-store` atau TTL pendek |
| Ketersediaan | Uptime 99,9% |
| Aksesibilitas | WCAG 2.2 AA; navigasi keyboard; kontras cukup |
| Keamanan | OWASP Top 10; rate limit; sanitasi input; CAPTCHA pada form publik |
| Privasi | Patuh UU PDP No. 27/2022; consent untuk analytics/iklan; minim PII |
| Legal | Disclosure affiliate; penggunaan merek nominatif; disclaimer; proses takedown |
| SEO safety | Build gagal jika ada `noindex` bocor, sitemap tidak valid, canonical salah, atau artikel tanpa penulis/tanggal |
| Konten | Tidak ada publish otomatis tanpa review editorial; sumber wajib dicantumkan |
| Kompatibilitas | Chrome/Safari/Firefox/Edge modern, WebView Android |
| Observability | Error monitoring, uptime monitoring, alert build failure |

---

## 14. Analytics & Pelaporan

### 14.1 Event

| Event | Properti |
|---|---|
| `view_brand_page` | brand_id, code_count, status |
| `view_article` | article_id, category, author_id |
| `search` | query, result_count |
| `copy_code` | brand_id, code_id, page_type |
| `outbound_click` | brand_id, code_id, placement |
| `vote_success` / `vote_fail` | brand_id, code_id |
| `report_expired` | brand_id, reason |
| `submit_code` | brand_id, source |
| `scroll_75` | article_id |
| `article_cta_click` | article_id, brand_id, placement |
| `newsletter_signup` | source |

### 14.2 Dashboard

- **SEO:** GSC impresi, klik, CTR, posisi, coverage, CWV.
- **Konten:** sesi organik blog, artikel top 10, scroll 75%, CTA klik, subscriber.
- **Produk:** funnel view → copy → outbound.
- **Bisnis:** EPC per brand, RPM iklan, pendapatan per 1.000 sesi organik.
- **Operasional:** kode jatuh tempo verifikasi, SLA laporan, approval rate submission, artikel jatuh tempo review.

### 14.3 Ritme

- Harian: error & uptime.
- Mingguan: GSC coverage, keyword movement, performa artikel baru.
- Bulanan: audit kesegaran kode, refresh halaman top 20, audit content decay artikel, analisis kompetitor, CWV field data.

---

## 15. Ruang Lingkup MVP & Roadmap

### 15.1 MVP (minggu 1–8)

**Masuk lingkup**

- Situs statis Astro di Cloudflare (Workers Static Assets, D1, R2) + Pagefind.
- 100 brand terkurasi, 10 kategori direktori.
- Homepage, hub, kategori, halaman brand, halaman trust.
- Blog hub, 3 kategori blog, template artikel, profil penulis.
- 8 artikel pilar/turunan awal dengan internal link ke direktori.
- Pencarian, copy, redirect affiliate, badge verifikasi.
- CMS Git-based untuk brand/kode/artikel + antrean verifikasi + riwayat Git sebagai audit log.
- Structured data, sitemap, robots, GA4, GSC.
- Halaman legal, kebijakan editorial, metodologi verifikasi.

**Di luar lingkup**

- Submit kode publik, vote, komentar.
- Perbandingan interaktif, newsletter, akun pengguna.
- Klaim brand, API, aplikasi mobile.
- Multi-bahasa.
- Guest post/kontributor eksternal.

### 15.2 Roadmap

| Fase | Durasi | Fokus | Target |
|---|---|---|---|
| Sprint 0 | Minggu 1–2 | Setup Astro + Cloudflare (D1/R2/Workers), CMS Git, Pagefind, desain, legal, analytics | Fondasi siap |
| MVP | Minggu 3–8 | 100 brand + fitur P0 + blog + 8 artikel | Rilis publik |
| v1.1 | Minggu 9–12 | Vote, lapor, submit; 250 brand; 30 artikel; profil penulis | Engagement awal |
| v2 | Bulan 4–6 | Perbandingan interaktif, newsletter, 300+ brand, 50 artikel | Trafik stabil |
| v3 | Bulan 7–12 | Sponsored listing, klaim brand, 80+ artikel, refresh engine | Diversifikasi pendapatan |

### 15.3 Kriteria rilis MVP

- ≥ 100 halaman brand lolos quality gate dan terverifikasi.
- ≥ 8 artikel blog live, schema BlogPosting valid, tanpa halaman tag.
- Halaman konten tersaji sebagai HTML statis hasil build Astro; konten utama ada tanpa JavaScript.
- D1, R2, Turnstile, dan cron backup aktif di free tier.
- Semua fitur P0 berfungsi dan diuji di mobile.
- Core Web Vitals lolos pada template utama.
- Structured data valid tanpa error kritis.
- Sitemap & robots benar; 0 URL `noindex` bocor.
- Halaman legal, disclosure, kebijakan editorial, dan metodologi live.
- GA4 + GSC terverifikasi dan menerima data.
- 0 broken link internal; 0 soft 404.
- Prosedur verifikasi, editorial, dan backup terdokumentasi.

---

## 16. Risiko & Mitigasi

| Risiko | Dampak | Kemungkinan | Mitigasi |
|---|---|---|---|
| Konten tipis/massal (scaled content abuse) | Penalti algoritma, trafik hilang | Tinggi | Quality gate, review manusia, ramp indexing |
| Blog generik/AI tanpa nilai | Trafik rendah, otoritas rusak | Tinggi | Brief wajib, fact-check, review manusia, data unik |
| Topik blog melenceng | Fokus & relevansi turun | Sedang | Klaster topik ketat, setiap artikel wajib punya CTA ke brand |
| Kanibalisasi blog vs halaman brand | Peringkat tidak stabil | Sedang | Aturan intent: panduan cara pakai digabung ke halaman brand |
| Kode kedaluwarsa | Kepercayaan & konversi turun | Tinggi | Sistem verifikasi, vote, tanggal jelas |
| Iklan merusak CWV/UX | Ranking & pendapatan turun | Sedang | Slot tetap, lazy load, batas unit |
| Masalah merek dagang/legal | Takedown, sengketa | Sedang | Penggunaan nominatif, disclaimer, proses takedown |
| Scraping melanggar ToS | Risiko hukum | Sedang | Verifikasi manual dari sumber resmi |
| Kapasitas verifikasi & editorial terbatas | Data usang, blog stagnan | Tinggi | Prioritas brand, kalender realistis, jadwal jelas |
| Perubahan program affiliate | Pendapatan turun | Sedang | Diversifikasi brand & jaringan |
| Kompetitor besar/coupon site | Sulit ranking | Sedang | Data unik, kualitas lokal, kecepatan |
| Update algoritma Google | Trafik fluktuatif | Tinggi | Diversifikasi kanal, kualitas berkelanjutan |
| Spam submission (fase 2) | Kualitas & keamanan | Sedang | Moderasi, CAPTCHA, rate limit |
| Build gagal/kuota build habis | Update tertunda | Sedang | Debounce, build < 3 menit, alert, deploy terakhir tetap live |
| Ketergantungan pada free tier Cloudflare | Perlu upgrade saat tumbuh | Sedang | ORM portabel (Drizzle), konten di Git, export D1 rutin |

---

## 17. Pertanyaan Terbuka

1. Nama produk dan domain final?
2. Siapa yang bertanggung jawab atas verifikasi kode dan berapa kapasitas per minggu?
3. Apakah submit kode UGC masuk MVP atau ditunda ke v1.1?
4. Jaringan iklan mana yang dipakai (AdSense vs jaringan premium)?
5. Apakah ada anggaran untuk penulisan konten dan review legal?
6. Target tanggal rilis publik?
7. Kebijakan crawler AI: diizinkan untuk kutipan atau diblokir?
8. Apakah brand boleh mengklaim halaman dan membayar di fase 3?
9. Strategi backlink awal: PR, riset data, atau kemitraan media?
10. Siapa penulis/editor blog dan berapa kapasitas per bulan?
11. Apakah blog menerima guest post/kontributor eksternal?
12. Apakah newsletter menjadi kanal distribusi prioritas?
13. Apakah editor nyaman memakai CMS Git-based, atau perlu admin panel khusus?
14. Hosting final: Workers Static Assets atau Cloudflare Pages?

---

## 18. Lampiran

### 18.1 Stack final: Astro + Cloudflare free tier

- **Framework:** Astro + TypeScript (`output: 'static'`); islands untuk copy code, vote, dan form.
- **Rendering:** full static build; rebuild on publish/verification via deploy hook. Tanpa SSR/ISR di halaman konten.
- **Hosting/CDN:** Cloudflare Workers Static Assets (disarankan) atau Pages; static request gratis & unlimited.
- **Database:** Cloudflare D1 (SQLite) + Drizzle ORM.
- **Storage:** Cloudflare R2 untuk upload bukti dan backup D1; logo di repo.
- **CMS:** Keystatic atau Decap (Git-based) untuk blog dan data brand/kode; riwayat Git sebagai audit log.
- **API dinamis:** Cloudflare Workers untuk `/go/{brand}`, vote, lapor, dan submit.
- **Pencarian:** Pagefind (indeks build-time, client-side).
- **Auth admin:** Cloudflare Access (gratis ≤ 50 user) atau GitHub OAuth.
- **Anti-spam:** Cloudflare Turnstile.
- **Analytics:** GA4 + GSC + Cloudflare Web Analytics.
- **Monitoring:** Sentry free + Workers Logs + alert build.
- **Email:** Cloudflare Email Routing (inbound); newsletter via Resend/Brevo/MailerLite free tier.
- **Cron:** Worker Cron untuk reminder verifikasi dan backup D1 ke R2 mingguan.
- **Backup:** export D1 ke R2 mingguan; konten Git sebagai backup utama.

Catatan: domain tetap berbayar. Cloudflare Images tidak dipakai — optimasi gambar dilakukan saat build. Jika suatu saat butuh SSR/ISR atau melewati 100k request dinamis/hari, budget-kan Workers Paid $5/bulan.

### 18.2 Contoh JSON-LD

**BreadcrumbList**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://example.id/" },
    { "@type": "ListItem", "position": 2, "name": "Investasi", "item": "https://example.id/kategori/investasi/" },
    { "@type": "ListItem", "position": 3, "name": "Bibit", "item": "https://example.id/kode-referral/bibit/" }
  ]
}
```

**ItemList (halaman kategori)**

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Kode Referral Investasi",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Kode Referral Bibit", "url": "https://example.id/kode-referral/bibit/" },
    { "@type": "ListItem", "position": 2, "name": "Kode Referral Pluang", "url": "https://example.id/kode-referral/pluang/" }
  ]
}
```

**BlogPosting**

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Apa Itu Kode Referral dan Cara Kerjanya",
  "image": "https://example.id/img/apa-itu-kode-referral.jpg",
  "author": {
    "@type": "Person",
    "name": "Nama Penulis",
    "url": "https://example.id/penulis/nama-penulis/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KodeReferral",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.id/logo.png"
    }
  },
  "datePublished": "2026-10-01",
  "dateModified": "2026-10-20",
  "mainEntityOfPage": "https://example.id/blog/apa-itu-kode-referral/"
}
```

**FAQPage (halaman brand)**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah kode referral bisa dipakai berkali-kali?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umumnya kode referral hanya berlaku untuk pengguna baru dan satu kali per akun. Periksa syarat resmi brand untuk kepastian."
      }
    }
  ]
}
```

**Organization**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KodeReferral",
  "url": "https://example.id/",
  "logo": "https://example.id/logo.png",
  "sameAs": [
    "https://www.instagram.com/example",
    "https://x.com/example"
  ]
}
```

### 18.3 Checklist rilis halaman

- [ ] Title unik ≤ 60 karakter, memuat brand + intent + tahun.
- [ ] Meta description 140–160 karakter.
- [ ] Satu H1 yang sesuai intent.
- [ ] Blok jawaban langsung di atas lipatan.
- [ ] Status + tanggal verifikasi terlihat.
- [ ] Canonical diri sendiri.
- [ ] Breadcrumb visual + schema.
- [ ] Structured data valid.
- [ ] ≥ 3 internal link relevan.
- [ ] Alt text pada gambar/logo.
- [ ] Tautan affiliate `rel="sponsored nofollow"`.
- [ ] Tidak ada iklan intrusif di atas CTA.
- [ ] LCP/INP/CLS lolos di mobile.
- [ ] Masuk sitemap dan tidak `noindex`.
- [ ] OG/Twitter card lengkap.
- [ ] Diuji di perangkat mobile nyata.

### 18.4 Checklist rilis artikel blog

- [ ] Penulis & reviewer tercantum.
- [ ] Tanggal terbit dan tanggal diperbarui akurat.
- [ ] Kategori benar; tidak ada halaman tag.
- [ ] BlogPosting schema valid.
- [ ] TOC untuk artikel panjang.
- [ ] ≥ 2 sumber resmi + tanggal akses.
- [ ] 2–5 tautan ke halaman brand relevan.
- [ ] 2–3 tautan ke artikel terkait.
- [ ] CTA maksimal 2 dan relevan.
- [ ] Gambar sampul + alt text.
- [ ] Canonical, OG, dan meta description.
- [ ] Masuk `blog.xml`.
- [ ] Tidak ada plagiarisme.
- [ ] Mobile & CWV lolos.

### 18.5 Checklist bulanan SEO

- [ ] GSC: coverage, query baru, penurunan posisi.
- [ ] CWV field data (CrUX).
- [ ] Verifikasi ulang kode yang jatuh tempo.
- [ ] Refresh 20 halaman dengan impresi tertinggi.
- [ ] Audit content decay artikel & refresh top 10.
- [ ] Cek broken link & redirect chain.
- [ ] Audit kanibalisasi kata kunci blog vs halaman brand.
- [ ] Analisis gap kompetitor.
- [ ] Validasi ulang schema setelah perubahan template.
- [ ] Review log crawl & ukuran sitemap.
