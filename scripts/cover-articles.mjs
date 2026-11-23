// Cover generator for article images: 1200x900, "DANA Bisnis" reference style.
//
// Geometry is derived from the reference cover
// src/assets/images/features/articles/apa-itu-dana-bisnis.webp, in its 1200x900
// coordinate space. Fonts: Radio Canada Big (display) + Space Mono (mono).
//
//   node scripts/cover-articles.mjs <slug> [<slug> ...]
//   node scripts/cover-articles.mjs --all
//   node scripts/cover-articles.mjs <slug> --measure    render + report geometry

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const root = process.cwd();

const W = 1200;
const H = 900;

const C = {
  paper: '#F7F5F4',
  blue: '#2341BD',
  red: '#DC2E22',
  black: '#000000',
  ink: '#0F141E',
};

// Type metrics as fractions of the font size, calibrated against the reference
// cover and probe renders of the bundled fonts.
const RCB = { asc: 0.85, desc: 0.17, cap: 0.7, lsb: 0.06 };
const SM = { asc: 0.8, desc: 0.2, cap: 0.7, lsb: 0.07 };

// Layout in 1200x900 coordinates.
const L = {
  logoIcon: { left: 43, top: 42, size: 45 },
  logoWord: { left: 107, capTop: 50, size: 40.7, tracking: -0.014 },
  headline: { left: 41, capTop: 301, size: 95.7, tracking: 0.053, maxWidth: 1118 },
  block: { left: 41, top: 396, size: 64, lineHeight: 61 },
  desc: { left: 41, width: 884, size: 24, lineHeight: 34, baseline1: 560 },
  rule: { left: 41, top: 858, width: 1149, height: 5 },
  bottom: { centerX: 615.5, size: 20, baseline: 887 },
};

const FONTS = [
  { name: 'Radio Canada Big', file: 'src/assets/og/radio-canada-big-700.ttf', weight: 700 },
  { name: 'Space Mono', file: 'src/assets/og/space-mono-400.ttf', weight: 400 },
  { name: 'Space Mono', file: 'src/assets/og/space-mono-700.ttf', weight: 700 },
];

const h = (type, props = {}, ...children) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});

async function loadAssets() {
  const [fonts, icon] = await Promise.all([
    Promise.all(
      FONTS.map(async (f) => ({ name: f.name, data: await readFile(join(root, f.file)), weight: f.weight, style: 'normal' })),
    ),
    readFile(join(root, 'public/brand-mark-512.png')),
  ]);
  return { fonts, icon: `data:image/png;base64,${icon.toString('base64')}` };
}

// Offset from the top of a line box to the first line's baseline / cap top.
const baselineOffset = (size, lineHeight, m) => (lineHeight - (m.asc + m.desc) * size) / 2 + m.asc * size;
const capTopOffset = (size, lineHeight, m) => baselineOffset(size, lineHeight, m) - m.cap * size;

function coverNode(cover, assets) {
  const abs = (style) => ({ position: 'absolute', display: 'flex', ...style });
  const headlineSize = cover.headlineSize ?? L.headline.size;

  const headline = h(
    'div',
    {
      style: abs({
        left: `${L.headline.left}px`,
        top: `${L.headline.capTop - capTopOffset(headlineSize, headlineSize, RCB)}px`,
        fontFamily: 'Radio Canada Big',
        fontWeight: 700,
        fontSize: `${headlineSize}px`,
        lineHeight: 1,
        letterSpacing: `${L.headline.tracking}em`,
        whiteSpace: 'pre',
      }),
    },
    ...cover.headline.map((part) => h('span', { style: { color: part.color } }, part.text)),
  );

  const block = h(
    'div',
    {
      style: abs({
        left: `${L.block.left}px`,
        top: `${L.block.top}px`,
        flexDirection: 'column',
        backgroundColor: C.blue,
        color: C.paper,
        paddingBottom: '5px',
        fontFamily: 'Radio Canada Big',
        fontWeight: 700,
        fontSize: `${L.block.size}px`,
        lineHeight: `${L.block.lineHeight}px`,
      }),
    },
    ...cover.penjelas.map((line) => h('div', { style: { display: 'flex' } }, line)),
  );

  const desc = h(
    'div',
    {
      style: abs({
        left: `${L.desc.left}px`,
        top: `${L.desc.baseline1 - baselineOffset(L.desc.size, L.desc.lineHeight, SM)}px`,
        width: `${L.desc.width}px`,
        fontFamily: 'Space Mono',
        fontWeight: 400,
        fontSize: `${L.desc.size}px`,
        lineHeight: `${L.desc.lineHeight}px`,
        color: C.ink,
      }),
    },
    cover.desc,
  );

  const rule = h('div', {
    style: abs({
      left: `${L.rule.left}px`,
      top: `${L.rule.top}px`,
      width: `${L.rule.width}px`,
      height: `${L.rule.height}px`,
      backgroundColor: C.black,
    }),
  });

  const bottom = h(
    'div',
    {
      style: abs({
        left: `${L.bottom.centerX - W / 2}px`,
        top: `${L.bottom.baseline - baselineOffset(L.bottom.size, L.bottom.size, SM)}px`,
        width: `${W}px`,
        justifyContent: 'center',
        fontFamily: 'Space Mono',
        fontWeight: 700,
        fontSize: `${L.bottom.size}px`,
        lineHeight: 1,
        color: C.black,
      }),
    },
    'REFERRALUPDATE.COM',
  );

  return h(
    'div',
    { style: { position: 'relative', display: 'flex', width: `${W}px`, height: `${H}px`, backgroundColor: C.paper } },
    h(
      'div',
      { style: abs({ left: `${L.logoIcon.left}px`, top: `${L.logoIcon.top}px`, width: `${L.logoIcon.size}px`, height: `${L.logoIcon.size}px` }) },
      h('img', { src: assets.icon, width: L.logoIcon.size, height: L.logoIcon.size }),
    ),
    h(
      'div',
      {
        style: abs({
          left: `${L.logoWord.left}px`,
          top: `${L.logoWord.capTop - capTopOffset(L.logoWord.size, L.logoWord.size, RCB)}px`,
          fontFamily: 'Radio Canada Big',
          fontWeight: 700,
          fontSize: `${L.logoWord.size}px`,
          lineHeight: 1,
          letterSpacing: `${L.logoWord.tracking}em`,
          color: C.ink,
        }),
      },
      'Referral Update',
      h('span', { style: { color: C.red } }, '.'),
    ),
    headline,
    block,
    desc,
    rule,
    bottom,
  );
}

const renderSvg = (cover, assets) =>
  satori(coverNode(cover, assets), { width: W, height: H, fonts: assets.fonts });

// Ink width of the headline at a given size, measured on an over-wide canvas so
// that long headlines are never clipped (the 1200px cover canvas would saturate).
async function headlineWidth(parts, size, assets) {
  const probeW = 2600;
  const node = h(
    'div',
    { style: { position: 'relative', display: 'flex', width: `${probeW}px`, height: '260px', backgroundColor: C.paper } },
    h(
      'div',
      {
        style: {
          position: 'absolute', left: '0px', top: '0px', display: 'flex',
          fontFamily: 'Radio Canada Big', fontWeight: 700, fontSize: `${size}px`,
          lineHeight: 1, letterSpacing: `${L.headline.tracking}em`, whiteSpace: 'pre',
        },
      },
      ...parts.map((p) => h('span', { style: { color: p.color } }, p.text)),
    ),
  );
  const svg = await satori(node, { width: probeW, height: 260, fonts: assets.fonts });
  const { px } = await toPixels(await sharp(Buffer.from(svg)).png().toBuffer());
  const b = boxAt(px, (p) => preds.dark(p) || preds.blue(p) || preds.red(p), 0, probeW - 1, 0, 259);
  return b.w;
}

// ---------------------------------------------------------------- measurements
async function toPixels(buf) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const { width: w, channels: c } = info;
  return {
    w,
    px: (x, y) => { const i = (y * w + x) * c; return [data[i], data[i + 1], data[i + 2]]; },
  };
}

const preds = {
  blue: (p) => Math.abs(p[0] - 0x23) <= 60 && Math.abs(p[1] - 0x41) <= 60 && Math.abs(p[2] - 0xbd) <= 60,
  red: (p) => Math.abs(p[0] - 0xdc) <= 60 && Math.abs(p[1] - 0x2e) <= 60 && Math.abs(p[2] - 0x22) <= 60,
  dark: (p) => p[0] < 128 && p[1] < 128 && p[2] < 128,
  white: (p) => p[0] > 215 && p[1] > 215 && p[2] > 215,
};

function boxAt(px, pred, x0, x1, y0, y1) {
  let a = 1e9, b = -1, c = 1e9, d = -1, n = 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { if (pred(px(x, y))) { if (x < a) a = x; if (x > b) b = x; if (y < c) c = y; if (y > d) d = y; n++; } }
  return n ? { x0: a, x1: b, y0: c, y1: d, w: b - a + 1, h: d - c + 1 } : null;
}

function inkBands(px, w, pred, x0, x1, y0, y1, minCount = 3) {
  const bands = [];
  let cur = null;
  for (let y = y0; y <= y1; y++) {
    let n = 0;
    for (let x = x0; x <= x1; x++) if (pred(px(x, y))) n++;
    if (n >= minCount) { if (!cur) cur = { y0: y, y1: y }; else cur.y1 = y; } else if (cur) { bands.push(cur); cur = null; }
  }
  if (cur) bands.push(cur);
  return bands;
}

async function measure(buf) {
  const { px } = await toPixels(buf);
  const blue = preds.blue, red = preds.red, dark = preds.dark, white = preds.white;
  const any = (p) => dark(p) || blue(p) || red(p);
  const out = {};
  out.logoIcon = boxAt(px, blue, 0, 100, 20, 110);
  out.logoIconRed = boxAt(px, red, 0, 100, 20, 110);
  out.logoWord = boxAt(px, dark, 100, 500, 20, 110);
  out.headline = boxAt(px, any, 0, W - 1, 250, 385);
  out.block = boxAt(px, blue, 0, W - 1, 380, 545);
  out.blockLine1 = boxAt(px, white, out.block.x0 + 1, out.block.x1, out.block.y0 + 1, out.block.y0 + 60);
  out.blockLine2 = boxAt(px, white, out.block.x0 + 1, out.block.x1, out.block.y0 + 61, out.block.y1 - 1);
  out.descLines = inkBands(px, W, dark, 0, W - 1, 535, 730).map((b) => ({ ...b, ...boxAt(px, dark, 0, W - 1, b.y0, b.y1) }));
  out.rule = boxAt(px, dark, 0, W - 1, L.rule.top - 3, L.rule.top + L.rule.height + 3);
  out.bottom = boxAt(px, dark, 0, W - 1, 866, 899);
  return out;
}

// ------------------------------------------------------------------- content
// headline: black segment + blue segment + red period (reference style).

const hl = (black, blue) => [
  { text: black, color: C.black },
  { text: blue, color: C.blue },
  { text: '.', color: C.red },
];

const COVERS = [
  {
    slug: 'shopeepay-vs-gopay',
    headline: hl('SHOPEEPAY VS ', 'GOPAY'),
    penjelas: ['Review Perbandingan', 'Biaya dan Limitnya'],
    desc: 'ShopeePay dan GoPay sama sama dompet digital dengan ekosistem berbeda. Perbandingan ini memakai satu set kriteria, yaitu biaya transaksi, limit, cara klaim bonus, dan waktu akun siap dipakai.',
  },
  {
    slug: 'shopeepay-vs-dana',
    headline: hl('SHOPEEPAY VS ', 'DANA'),
    penjelas: ['Review Perbandingan', 'Biaya dan Limitnya'],
    desc: 'ShopeePay dan DANA sama sama dompet digital yang dapat membaca QRIS. Perbandingan ini memakai satu set kriteria, yaitu biaya transaksi, limit, cara klaim bonus, dan waktu akun siap dipakai.',
  },
  {
    slug: 'apakah-shopeepay-plus-aman',
    headline: hl('SHOPEEPAY ', 'PLUS'),
    penjelas: ['Apakah Aman Dipakai', 'dan Apa Risikonya'],
    desc: 'Apakah ShopeePay Plus aman dipakai untuk menyimpan saldo dan menerima dana? Ketahui izin penyelenggara, data yang diminta saat upgrade, dan cara menjaga keamanan akun.',
  },
  {
    slug: 'biaya-transfer-shopeepay',
    headline: hl('BIAYA ', 'TRANSFER'),
    penjelas: ['Apa Saja yang Dikenakan', 'dan Kapan Gratis'],
    desc: 'Biaya transfer ShopeePay berbeda menurut jalur yang dipakai, yaitu antar sesama pengguna, ke rekening bank, atau melalui merchant. Ketahui jalur yang dikenakan biaya dan cara memeriksanya.',
  },
  {
    slug: 'tarik-saldo-shopeepay',
    headline: hl('TARIK ', 'SALDO'),
    penjelas: ['Cara, Syarat, dan', 'Waktu Prosesnya'],
    desc: 'Tarik saldo ShopeePay dapat dilakukan ke rekening bank atau melalui merchant tertentu. Ketahui syaratnya, langkahnya, waktu proses, dan penyebab penarikan gagal.',
  },
  {
    slug: 'tarik-saldo-shopeepay-di-indomaret-alfamart',
    headline: hl('TARIK ', 'TUNAI'),
    penjelas: ['Cara Tarik Tunai', 'di Indomaret dan Alfamart'],
    desc: 'Tarik saldo ShopeePay di Indomaret dan Alfamart dilakukan melalui fitur tarik tunai di merchant. Ketahui syaratnya, langkah di kasir, batas nominal, dan kendala yang sering muncul.',
  },
  {
    slug: 'limit-shopeepay',
    headline: hl('LIMIT ', 'SHOPEEPAY'),
    penjelas: ['Jenis Batas dan', 'Cara Menaikkannya'],
    desc: 'Limit ShopeePay menentukan besar saldo yang dapat disimpan dan nilai transaksi yang boleh dijalankan. Ketahui jenis batasnya, kaitannya dengan upgrade akun, dan cara memeriksanya.',
  },
  {
    slug: 'qris-shopeepay',
    headline: hl('QRIS ', 'SHOPEEPAY'),
    penjelas: ['Cara Pakai dan', 'Batas Pembayarannya'],
    desc: 'QRIS ShopeePay dipakai untuk membayar di merchant mana pun yang menerima QRIS, bukan hanya di merchant ShopeePay. Ketahui cara pakainya, batas pembayaran, dan kendala yang sering muncul.',
  },
  {
    slug: 'qris-shopeepay-merchant',
    headline: hl('QRIS ', 'MERCHANT'),
    penjelas: ['Cara Mendaftar dan', 'Manfaatnya'],
    desc: 'QRIS ShopeePay untuk merchant memungkinkan usaha menerima pembayaran QRIS melalui aplikasi dan mencatat transaksi. Ketahui cara mendaftar, syaratnya, biaya layanan, dan pencairan dana.',
  },
  {
    slug: 'kode-referral-shopeepay-pengguna-baru',
    headline: hl('KODE ', 'REFERRAL'),
    penjelas: ['untuk Pengguna Baru', 'dan Bonusnya'],
    desc: 'Kode referral ShopeePay ditujukan untuk pengguna baru yang belum pernah mengaktifkan akun. Ketahui syarat, cara memasukkan kode saat login, dan batas waktu klaim bonusnya.',
  },
  {
    slug: 'cara-pakai-kode-referral-shopeepay',
    headline: hl('CARA PAKAI ', 'KODE'),
    penjelas: ['Urutan Langkah', 'yang Benar'],
    desc: 'Kode referral ShopeePay hanya bisa dimasukkan pada alur login pengguna baru. Ketahui urutan langkah yang benar dan penyebab kode tidak dikenali saat pendaftaran.',
  },
  {
    slug: 'kode-referral-shopeepay-tidak-masuk',
    headline: hl('KODE TIDAK ', 'MASUK'),
    penjelas: ['Urutan Pemeriksaan', 'dan Penyebabnya'],
    desc: 'Kode referral ShopeePay tidak masuk bisa berarti kode ditolak, kolom kode tidak muncul, atau bonus belum bertambah. Ketahui urutan pemeriksaan dan penyebab tiap keadaan.',
  },
  {
    slug: 'cara-melihat-kode-referral-shopeepay-sendiri',
    headline: hl('KODE ', 'UNDANGAN'),
    penjelas: ['Cara Melihat dan', 'Membagikannya'],
    desc: 'Kode referral ShopeePay milik sendiri dapat dilihat melalui menu undangan di dalam aplikasi. Ketahui letak menunya, cara membagikannya, dan bonus yang diperoleh pengundang.',
  },
  {
    slug: 'program-undang-teman-shopeepay',
    headline: hl('UNDANG ', 'TEMAN'),
    penjelas: ['Cara Kerja dan', 'Bonus Kedua Pihak'],
    desc: 'Program undang teman ShopeePay memberi bonus kepada pengirim dan penerima kode. Ketahui cara kerjanya, syarat kedua pihak, batas waktu klaim, dan aturan penyalahgunaan yang perlu dipatuhi.',
  },
  {
    slug: 'bonus-kode-referral-shopeepay-100-ribu',
    headline: hl('BONUS KODE ', 'REFERRAL'),
    penjelas: ['Benarkah 100 Ribu', 'dan 1 Juta?'],
    desc: 'Klaim bonus kode referral ShopeePay 100 ribu dan 1 juta beredar luas di internet. Ketentuan resmi menyebutkan angka berbeda, dan berikut penjelasan serta cara memeriksanya.',
  },
  {
    slug: 'upgrade-shopeepay-plus',
    headline: hl('UPGRADE ', 'PLUS'),
    penjelas: ['Syarat, Cara, dan', 'Bonus Referral'],
    desc: 'Upgrade ShopeePay Plus adalah syarat pencairan bonus referral bagi pengguna baru. Ketahui perbedaan akun biasa dan ShopeePay Plus, syaratnya, serta prosesnya.',
  },
  {
    slug: 'upgrade-shopeepay-plus-tanpa-ktp',
    headline: hl('UPGRADE TANPA ', 'KTP'),
    penjelas: ['Ini yang Disebut', 'Ketentuannya'],
    desc: 'Upgrade ShopeePay Plus tanpa KTP sering dicari karena dokumen identitas belum siap. Ketentuan yang tersedia tetap meminta verifikasi identitas, dan ini penjelasan serta pilihannya.',
  },
  {
    slug: 'shopeepay-dibekukan',
    headline: hl('SHOPEEPAY ', 'DIBEKUKAN'),
    penjelas: ['Penyebab dan Langkah', 'yang Bisa Ditempuh'],
    desc: 'ShopeePay dibekukan membuat saldo tidak dapat dipakai, ditarik, atau dipindahkan. Ketahui penyebabnya, tanda akun dibatasi, cara mengajukan peninjauan, dan langkah pencegahan.',
  },
  {
    slug: 'shopeepay-error-dan-gangguan',
    headline: hl('SHOPEEPAY ', 'ERROR'),
    penjelas: ['Cara Membedakan', 'Penyebabnya'],
    desc: 'ShopeePay error bisa berasal dari akun, jaringan, atau layanan yang sedang terganggu. Ketahui cara membedakan penyebabnya, langkah pemeriksaan, dan kapan menghubungi bantuan.',
  },
  {
    slug: 'kelebihan-dan-kekurangan-seabank',
    headline: hl('SEA', 'BANK'),
    penjelas: ['Review Jujur Setelah', '1 Tahun Pemakaian'],
    desc: 'SeaBank adalah bank digital dari PT Bank SeaBank Indonesia dengan bunga tabungan harian dan transfer gratis. Ulasan ini menilai kelebihan dan kekurangannya dari pemakaian satu tahun dan biaya resmi.',
  },
  {
    slug: 'foto-toko-online-dana-bisnis',
    headline: hl('FOTO ', 'TOKO'),
    penjelas: ['Contoh Screenshot untuk', 'Daftar DANA Bisnis'],
    desc: 'Pemilik toko online tidak harus punya bangunan fisik untuk melengkapi foto usaha saat daftar DANA Bisnis. Contoh screenshot halaman toko, dari media sosial sampai marketplace, beserta cara menyiapkannya.',
  },
  {
    slug: 'bonus-pengguna-baru-pintu',
    headline: hl('BONUS ', 'PINTU'),
    penjelas: ['Cashback Referral dan', 'Misi Pengguna Baru'],
    desc: 'Pengguna baru Pintu punya dua jalur bonus: cashback transaksi lewat kode referral dan misi transaksi pertama yang berperiode. Ketahui besaran, syarat, dan cara klaimnya.',
  },
  {
    slug: 'bonus-pengguna-baru-krom-bank',
    headline: hl('BONUS ', 'KROM'),
    penjelas: ['Cara Klaim hingga', 'Rp150.000'],
    desc: 'Kode referral Krom Bank MUHR486J memberi bonus hingga Rp150.000 untuk pengguna baru yang mengisi saldo dan mempertahankannya. Ketahui syarat dan jadwal pencairannya.',
  },
];

const COVER_DIR = 'src/assets/images/features/articles';

async function main() {
  const args = process.argv.slice(2);
  const doMeasure = args.includes('--measure');
  const all = args.includes('--all');
  const slugs = args.filter((a) => !a.startsWith('--'));
  const wanted = all ? COVERS.map((c) => c.slug) : slugs;
  if (!wanted.length) { console.error('usage: node scripts/cover-articles.mjs <slug> [--measure] [--all]'); process.exit(1); }

  const assets = await loadAssets();

  for (const slug of wanted) {
    const cover = COVERS.find((c) => c.slug === slug);
    if (!cover) { console.error(`no cover config for ${slug}`); process.exit(1); }

    // Auto-fit the headline so it never exceeds maxWidth (min margin on both sides).
    const baseSize = cover.headlineSize ?? L.headline.size;
    const natural = await headlineWidth(cover.headline, baseSize, assets);
    if (natural > L.headline.maxWidth) {
      cover.headlineSize = baseSize * (L.headline.maxWidth / natural);
      console.log(`  headline auto-fit: ${baseSize}px -> ${cover.headlineSize.toFixed(1)}px (natural ${natural}px)`);
    }

    const svg = await renderSvg(cover, assets);
    const buf = await sharp(Buffer.from(svg)).webp({ quality: 96, effort: 6 }).toBuffer();
    const m = await measure(buf);
    if (m.headline.x1 > W - 20) console.log(`  WARNING headline overflows: x1=${m.headline.x1}`);

    await writeFile(join(root, COVER_DIR, `${slug}.webp`), buf);
    const meta = await sharp(buf).metadata();
    console.log(`wrote ${COVER_DIR}/${slug}.webp ${meta.width}x${meta.height} ${(buf.length / 1024).toFixed(0)}KB  headline ${m.headline.x0}-${m.headline.x1} cap ${m.headline.h}`);
    if (doMeasure) console.log(JSON.stringify(m, null, 1));
  }
}

await main();
