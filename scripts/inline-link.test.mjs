import {
  externalHrefs,
  inlineTextPlain,
  paragraphsPlainText,
  parseInlineText,
  toParagraphs,
} from '../src/lib/paragraphs.ts';

let failures = 0;
function check(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  const ok = a === e;
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) console.log(`      expected ${e}\n      actual   ${a}`);
}

// --- tautan ---------------------------------------------------------------

check(
  'link internal',
  parseInlineText('Baca [panduan ini](/blog/cara-pakai/) dulu.'),
  [
    { text: 'Baca ' },
    { text: 'panduan ini', href: '/blog/cara-pakai/' },
    { text: ' dulu.' },
  ],
);

check(
  'link eksternal',
  parseInlineText('Cek [situs resmi](https://shopeepay.co.id/) ya.'),
  [
    { text: 'Cek ' },
    { text: 'situs resmi', href: 'https://shopeepay.co.id/' },
    { text: ' ya.' },
  ],
);

check('mailto dibiarkan utuh', parseInlineText('Kirim ke [admin](mailto:a@b.id).'), [
  { text: 'Kirim ke [admin](mailto:a@b.id).' },
]);

check('href relatif dibiarkan utuh', parseInlineText('Lihat [ini](blog/x/).'), [
  { text: 'Lihat [ini](blog/x/).' },
]);

check('tanpa token', parseInlineText('Kalimat biasa saja.'), [{ text: 'Kalimat biasa saja.' }]);

check('dua token', parseInlineText('[a](/x/) dan [b](/y/)'), [
  { text: 'a', href: '/x/' },
  { text: ' dan ' },
  { text: 'b', href: '/y/' },
]);

// --- tebal / miring ------------------------------------------------------

check('tebal', parseInlineText('Ini **penting** sekali.'), [
  { text: 'Ini ' },
  { text: 'penting', bold: true },
  { text: ' sekali.' },
]);

check('miring', parseInlineText('Ini *catatan* kecil.'), [
  { text: 'Ini ' },
  { text: 'catatan', italic: true },
  { text: ' kecil.' },
]);

check('tebal miring', parseInlineText('Ini ***sangat penting***.'), [
  { text: 'Ini ' },
  { text: 'sangat penting', bold: true, italic: true },
  { text: '.' },
]);

check('tebal di dalam label tautan', parseInlineText('[**tebal**](/x/)'), [
  { text: 'tebal', bold: true, href: '/x/' },
]);

check(
  'tebal yang membungkus label ber-tebal',
  parseInlineText('**a [**b**](https://x.id/p) c**'),
  [
    { text: 'a ', bold: true },
    { text: 'b', bold: true, href: 'https://x.id/p' },
    { text: ' c', bold: true },
  ],
);

check('tautan di dalam tebal', parseInlineText('**tebal dengan [tautan](/x/)**'), [
  { text: 'tebal dengan ', bold: true },
  { text: 'tautan', bold: true, href: '/x/' },
]);

check('tebal lalu miring berurutan', parseInlineText('**a** dan *b*'), [
  { text: 'a', bold: true },
  { text: ' dan ' },
  { text: 'b', italic: true },
]);

check('bintang tunggal tetap teks', parseInlineText('a * b'), [{ text: 'a * b' }]);

check('dua bintang tak berpasangan tetap teks', parseInlineText('teks **tebal'), [
  { text: 'teks **tebal' },
]);

check('penanda kosong tetap teks', parseInlineText('teks **  ** akhir'), [
  { text: 'teks **  ** akhir' },
]);

check('garis bawah tidak didukung', parseInlineText('_miring_ tetap teks'), [
  { text: '_miring_ tetap teks' },
]);

// --- teks polos untuk meta dan structured data ---------------------------

check(
  'teks polos',
  inlineTextPlain(parseInlineText('Baca [panduan ini](/blog/x/) dulu.')),
  'Baca panduan ini dulu.',
);

check(
  'teks polos membuang penanda',
  inlineTextPlain(parseInlineText('**tebal** dan *miring*')),
  'tebal dan miring',
);

check(
  'multi-paragraf + token',
  toParagraphs('Paragraf satu [link](/a/).\n\nParagraf dua.').map((paragraph) =>
    inlineTextPlain(parseInlineText(paragraph)),
  ),
  ['Paragraf satu link.', 'Paragraf dua.'],
);

check('paragraphsPlainText', paragraphsPlainText('Satu [a](/a/).\n\nDua [b](/b/).'), 'Satu a. Dua b.');

check(
  'paragraphsPlainText membuang penanda',
  paragraphsPlainText('Satu **tebal**.\n\nDua *miring*.'),
  'Satu tebal. Dua miring.',
);

check('externalHrefs', externalHrefs('Lihat [ini](/internal/) dan [itu](https://x.id/p).'), [
  'https://x.id/p',
]);

check('externalHrefs mengabaikan penanda', externalHrefs('**tebal** [ini](https://x.id/p)'), [
  'https://x.id/p',
]);

console.log(failures === 0 ? 'ALL PASS' : `${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);
