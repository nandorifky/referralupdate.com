/**
 * Memecah teks frontmatter menjadi beberapa paragraf pada setiap baris kosong.
 *
 * Dipakai supaya field YAML/teks bisa ditulis sebagai lebih dari satu paragraf
 * tanpa mengubah isi teksnya. Baris baru di dalam satu paragraf tetap dilipat
 * menjadi spasi, sehingga bungkus baris di sumber tidak memengaruhi hasil.
 */
export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter((paragraph) => paragraph.length > 0);
}

/**
 * Satu potongan teks hasil pemecahan markup inline. `href` berarti tautan,
 * `bold`/`italic` berarti penekanan. Ketiganya boleh menempel bersamaan.
 */
export type InlinePart = {
  text: string;
  href?: string;
  bold?: boolean;
  italic?: boolean;
};

const LINK_TOKEN = /^\[([^[\]]+)\]\(([^()\s]+)\)/;
const EXTERNAL_HREF = /^https?:\/\//i;

export function isExternalHref(href: string): boolean {
  return EXTERNAL_HREF.test(href);
}

function validHref(href: string): boolean {
  return href.startsWith('/') || EXTERNAL_HREF.test(href);
}

type Format = { bold?: boolean; italic?: boolean };

function textPart(text: string, format: Format): InlinePart {
  return {
    text,
    ...(format.bold ? { bold: true } : {}),
    ...(format.italic ? { italic: true } : {}),
  };
}

/**
 * Parser satu paragraf untuk markup inline: `**tebal**`, `*miring*`,
 * `***tebal miring***`, dan tautan `[teks](/tujuan/)` atau
 * `[teks](https://contoh.id/)`. Markup boleh bersarang dua arah, misalnya
 * `**tebal dengan [tautan](/x/)**` atau `[**tebal**](/x/)`.
 *
 * Markup yang tidak berpasangan atau berisi kosong dibiarkan sebagai teks
 * supaya kesalahannya terlihat, bukan hilang diam-diam. Href hanya diterima
 * bila internal (diawali `/`) atau eksternal http/https; tautan afiliasi tidak
 * boleh lewat token ini dan diperiksa di `policy.ts`. Garis bawah sengaja tidak
 * dipakai sebagai penanda karena bentrok dengan nama field dan kode.
 */
/**
 * Mencari penutup `marker` sambil melewati token tautan utuh. Tanpa ini,
 * penanda di dalam label tautan (mis. `[**tebal**](/x/)`) akan dianggap
 * penutup oleh `**` pembuka di luarnya, sehingga markup bersarang jadi kacau.
 */
function findClosingMarker(text: string, start: number, marker: string): number {
  let index = start;
  while (index < text.length) {
    const link = LINK_TOKEN.exec(text.slice(index));
    if (link && validHref(link[2])) {
      index += link[0].length;
      continue;
    }
    if (text.startsWith(marker, index)) return index;
    index += 1;
  }
  return -1;
}

function parseFormat(text: string, format: Format): InlinePart[] {
  const parts: InlinePart[] = [];
  let buffer = '';
  let index = 0;

  const flush = () => {
    if (buffer) {
      parts.push(textPart(buffer, format));
      buffer = '';
    }
  };

  while (index < text.length) {
    const link = LINK_TOKEN.exec(text.slice(index));
    if (link && validHref(link[2])) {
      flush();
      for (const inner of parseFormat(link[1], format)) {
        parts.push({ ...inner, href: link[2] });
      }
      index += link[0].length;
      continue;
    }

    const markers: [string, Format][] = [
      ['***', { ...format, bold: true, italic: true }],
      ['**', { ...format, bold: true }],
      ['*', { ...format, italic: true }],
    ];
    let matchedMarker = false;
    for (const [marker, nextFormat] of markers) {
      if (!text.startsWith(marker, index)) continue;
      const end = findClosingMarker(text, index + marker.length, marker);
      if (end === -1) continue;
      const inner = text.slice(index + marker.length, end);
      if (!inner.trim()) continue;
      flush();
      parts.push(...parseFormat(inner, nextFormat));
      index = end + marker.length;
      matchedMarker = true;
      break;
    }
    if (matchedMarker) continue;

    buffer += text[index];
    index += 1;
  }

  flush();
  return parts;
}

export function parseInlineText(text: string): InlinePart[] {
  return parseFormat(text, {});
}

/** Teks polos tanpa tautan, dipakai untuk meta dan structured data. */
export function inlineTextPlain(parts: InlinePart[]): string {
  return parts.map((part) => part.text).join('');
}

/** Teks polos dari beberapa paragraf, digabung jadi satu baris. */
export function paragraphsPlainText(text: string): string {
  return toParagraphs(text)
    .map((paragraph) => inlineTextPlain(parseInlineText(paragraph)))
    .join(' ');
}

/** Semua href eksternal di dalam beberapa paragraf, untuk pemeriksaan kebijakan. */
export function externalHrefs(text: string): string[] {
  return toParagraphs(text)
    .flatMap((paragraph) => parseInlineText(paragraph))
    .map((part) => part.href)
    .filter((href): href is string => Boolean(href) && isExternalHref(href));
}
