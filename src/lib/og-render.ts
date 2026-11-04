import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import type { OgCard } from './og';

const paper = '#F8F7F3';
const ink = '#0F141E';
const muted = '#575B64';
const field = '#1F40BE';
const hairline = '#E3E1D9';
const mark = '#D9241B';

const canvas = { width: 1200, height: 630 };

type Style = Record<string, string | number>;
type VNode = { type: string; props: Record<string, unknown> };

function h(type: string, props: Record<string, unknown> = {}, ...children: (VNode | string)[]): VNode {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}

type Assets = {
  fonts: { name: string; data: Buffer; weight: 400 | 700; style: 'normal' }[];
  mark: string;
};

let assetsPromise: Promise<Assets> | undefined;

function loadAssets(): Promise<Assets> {
  assetsPromise ??= (async () => {
    const root = process.cwd();
    const [bold, regular, markPng] = await Promise.all([
      readFile(join(root, 'src/assets/og/radio-canada-big-700.ttf')),
      readFile(join(root, 'src/assets/og/radio-canada-400.ttf')),
      readFile(join(root, 'public/brand-mark-512.png')),
    ]);

    return {
      fonts: [
        { name: 'Radio Canada Big', data: bold, weight: 700, style: 'normal' },
        { name: 'Radio Canada', data: regular, weight: 400, style: 'normal' },
      ],
      mark: `data:image/png;base64,${markPng.toString('base64')}`,
    };
  })();

  return assetsPromise;
}

function wordmark(src: string): VNode {
  return h(
    'div',
    { style: { display: 'flex', alignItems: 'center' } },
    h('img', { src, width: 40, height: 40, style: { marginRight: '12px' } }),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'baseline' } },
      h(
        'span',
        {
          style: {
            fontFamily: 'Radio Canada Big',
            fontWeight: 700,
            fontSize: '30px',
            letterSpacing: '-0.02em',
            color: ink,
          },
        },
        'Referral Update',
      ),
      h('span', { style: { fontFamily: 'Radio Canada Big', fontWeight: 700, fontSize: '30px', color: mark } }, '.'),
    ),
  );
}

function frame(card: OgCard, body: VNode, src: string): VNode {
  return h(
    'div',
    {
      style: {
        width: `${canvas.width}px`,
        height: `${canvas.height}px`,
        display: 'flex',
        backgroundColor: paper,
        color: ink,
        fontFamily: 'Radio Canada',
      },
    },
    h(
      'div',
      {
        style: {
          width: '1056px',
          height: '494px',
          margin: '64px 72px 72px',
          display: 'flex',
          flexDirection: 'column',
        },
      },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px' } },
        wordmark(src),
        h('div', { style: { fontSize: '20px', color: muted, letterSpacing: '-0.01em' } }, card.label),
      ),
      h('div', { style: { display: 'flex', height: '1px', width: '100%', marginTop: '28px', backgroundColor: hairline } }),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            flexGrow: 1,
            minHeight: 0,
            paddingTop: '40px',
          },
        },
        body,
      ),
    ),
  );
}

function codeSize(code: string) {
  if (code.length <= 8) return 150;
  if (code.length <= 10) return 120;
  if (code.length <= 12) return 96;
  return 84;
}

function statusChip(status: NonNullable<OgCard['status']>, label: string): VNode {
  const tones = {
    active: { backgroundColor: field, color: paper, border: `1px solid ${field}` },
    unverified: { backgroundColor: 'transparent', color: muted, border: `1px solid ${hairline}` },
    expired: { backgroundColor: hairline, color: ink, border: `1px solid ${hairline}` },
  } as const;

  return h(
    'div',
    {
      style: {
        display: 'flex',
        alignSelf: 'flex-start',
        padding: '8px 18px',
        borderRadius: '999px',
        fontFamily: 'Radio Canada Big',
        fontWeight: 700,
        fontSize: '18px',
        letterSpacing: '-0.01em',
        ...tones[status],
      },
    },
    label,
  );
}

function brandBody(card: OgCard): VNode {
  const ended = card.status === 'expired';

  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column' } },
    h(
      'div',
      {
        style: {
          fontFamily: 'Radio Canada Big',
          fontWeight: 700,
          fontSize: '34px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: ink,
          marginBottom: '2px',
        },
      },
      card.name ?? '',
    ),
    h(
      'div',
      {
        style: {
          fontFamily: 'Radio Canada Big',
          fontWeight: 700,
          fontSize: `${codeSize(card.title)}px`,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: ended ? 'rgba(15, 20, 30, 0.55)' : field,
          marginBottom: '18px',
        },
      },
      card.title,
    ),
    h(
      'div',
      {
        style: {
          fontSize: '28px',
          lineHeight: 1.35,
          color: muted,
          maxWidth: '900px',
          lineClamp: 2,
          textOverflow: 'ellipsis',
          marginBottom: '24px',
        },
      },
      card.description,
    ),
    card.status && card.statusLabel ? statusChip(card.status, card.statusLabel) : '',
  );
}

function articleBody(card: OgCard): VNode {
  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column' } },
    h(
      'div',
      {
        style: {
          fontFamily: 'Radio Canada Big',
          fontWeight: 700,
          fontSize: card.title.length > 70 ? '58px' : '64px',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          color: ink,
          lineClamp: 3,
          textOverflow: 'ellipsis',
          marginBottom: '24px',
        },
      },
      card.title,
    ),
    h(
      'div',
      {
        style: {
          fontSize: '26px',
          lineHeight: 1.45,
          color: muted,
          maxWidth: '900px',
          lineClamp: 2,
          textOverflow: 'ellipsis',
        },
      },
      card.description,
    ),
  );
}

function pageBody(card: OgCard): VNode {
  const home = card.path === '/open-graph/home.png';

  return h(
    'div',
    { style: { display: 'flex', flexDirection: 'column' } },
    h(
      'div',
      {
        style: {
          fontFamily: 'Radio Canada Big',
          fontWeight: 700,
          fontSize: home ? '76px' : '84px',
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          color: ink,
          lineClamp: 2,
          textOverflow: 'ellipsis',
          marginBottom: '24px',
        },
      },
      card.title,
    ),
    h(
      'div',
      {
        style: {
          fontSize: '30px',
          lineHeight: 1.35,
          color: muted,
          maxWidth: '900px',
          lineClamp: 2,
          textOverflow: 'ellipsis',
        },
      },
      card.description,
    ),
  );
}

export async function renderOgCard(card: OgCard): Promise<Buffer> {
  const assets = await loadAssets();
  const body =
    card.kind === 'brand' ? brandBody(card) : card.kind === 'article' ? articleBody(card) : pageBody(card);

  const svg = await satori(frame(card, body, assets.mark) as never, {
    width: canvas.width,
    height: canvas.height,
    fonts: assets.fonts,
  });

  return sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 })
    .toBuffer();
}
