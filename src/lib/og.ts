import type { OGImageOptions } from 'astro-og-canvas';
import { blogCategoryName } from '../data/blog-categories';
import { categories, type Category } from '../data/categories';
import { defaultOgImage, formatIdDate, type OgImage } from '../data/site';
import {
  brandsInCategory,
  categoriesWithBrands,
  getArticles,
  getBrands,
  sortArticlesByUpdated,
  sortBrandsByChecked,
  type Article,
  type Brand,
} from './content';
import { isCategoryIndexable } from './policy';

export type OgCard = OgImage & {
  title: string;
  description: string;
  kind: 'brand' | 'article' | 'page';
  status?: Brand['status'];
};

type Rgb = [number, number, number];

const palette: Record<'paper' | 'ink' | 'muted' | 'accent' | 'mark', Rgb> = {
  paper: [248, 247, 243],
  ink: [15, 20, 30],
  muted: [87, 91, 100],
  accent: [31, 64, 190],
  mark: [217, 36, 27],
};

const fonts = [
  './src/assets/og/radio-canada-big-700.ttf',
  './src/assets/og/radio-canada-400.ttf',
];

const statusLabels: Record<Brand['status'], string> = {
  active: 'Aktif',
  unverified: 'Belum terverifikasi',
  expired: 'Berakhir',
};

const titleLimits = { brand: 16, article: 90, page: 80 };
const descriptionLimit = 140;

function withoutTrailingPunctuation(text: string) {
  return text.replace(/[.!?]+$/, '').trim();
}

function checkedThrough(brands: Brand[]) {
  const latest = sortBrandsByChecked(brands)[0];
  return latest ? formatIdDate(latest.checkedAt) : 'tanggal cek belum tersedia';
}

function card(input: OgCard): OgCard {
  if (input.title.length > titleLimits[input.kind]) {
    throw new Error(`${input.path}: judul OG terlalu panjang (${input.title.length} karakter).`);
  }
  if (input.description.length > descriptionLimit) {
    throw new Error(
      `${input.path}: deskripsi OG terlalu panjang (${input.description.length} karakter).`,
    );
  }
  if (!input.alt.trim()) {
    throw new Error(`${input.path}: alt text OG tidak boleh kosong.`);
  }
  return input;
}

export function brandOgCard(brand: Brand): OgCard {
  const expired = brand.status === 'expired';
  const expiry = brand.expiresAt ? formatIdDate(brand.expiresAt) : 'menurut sumber resmi';
  const status = expired
    ? `Berakhir ${expiry}.`
    : `${statusLabels[brand.status]}, dicek ${formatIdDate(brand.checkedAt)}.`;
  const altStatus = expired
    ? `berakhir ${expiry}`
    : `${statusLabels[brand.status].toLowerCase()}, dicek ${formatIdDate(brand.checkedAt)}`;

  return card({
    path: `/open-graph/kode-referral/${brand.slug}.png`,
    alt: `Kode ${brand.code} untuk kode referral ${brand.name}, ${altStatus}.`,
    title: brand.code,
    description: `Kode referral ${brand.name}: ${withoutTrailingPunctuation(brand.reward)}. ${status}`,
    kind: 'brand',
    status: brand.status,
  });
}

export function articleOgCard(article: Article): OgCard {
  return card({
    path: `/open-graph/blog/${article.slug}.png`,
    alt: `Kartu panduan: ${article.title}.`,
    title: article.title,
    description: `${blogCategoryName(article.category)}, diperbarui ${formatIdDate(article.updated)}.`,
    kind: 'article',
  });
}

export function homeOgCard(brands: Brand[]): OgCard {
  const active = brands.filter((brand) => brand.status === 'active').length;
  const latest = sortBrandsByChecked(brands.filter((brand) => brand.status === 'active'))[0]
    ?? sortBrandsByChecked(brands)[0];
  const date = latest ? formatIdDate(latest.checkedAt) : 'tanggal cek belum tersedia';

  return card({
    path: '/open-graph/home.png',
    alt: `Kartu Referral Update: ${active} dari ${brands.length} brand aktif, dicek hingga ${date}.`,
    title: 'Referral Update: Cuan dari kode referral.',
    description: `${active} dari ${brands.length} brand aktif. Dicek hingga ${date}.`,
    kind: 'page',
  });
}

export function directoryOgCard(brands: Brand[]): OgCard {
  const date = checkedThrough(brands);

  return card({
    path: '/open-graph/kode-referral.png',
    alt: `Kartu Referral Update: direktori ${brands.length} kode referral, dicek hingga ${date}.`,
    title: 'Direktori kode referral Indonesia',
    description: `${brands.length} brand dengan bonus, syarat, dan status. Dicek hingga ${date}.`,
    kind: 'page',
  });
}

export function categoryIndexOgCard(brands: Brand[]): OgCard {
  const count = categoriesWithBrands(brands).length;
  const date = checkedThrough(brands);

  return card({
    path: '/open-graph/kategori.png',
    alt: `Kartu Referral Update: ${count} kategori kode referral.`,
    title: 'Kode referral per kategori',
    description: `${count} kategori dengan brand. Dicek hingga ${date}.`,
    kind: 'page',
  });
}

export function blogIndexOgCard(articles: Article[]): OgCard {
  const latest = sortArticlesByUpdated(articles)[0];
  const date = latest ? formatIdDate(latest.updated) : 'tanggal belum tersedia';

  return card({
    path: '/open-graph/blog.png',
    alt: `Kartu Referral Update: ${articles.length} panduan kode referral.`,
    title: 'Panduan kode referral',
    description: `${articles.length} artikel dengan sumber resmi. Diperbarui hingga ${date}.`,
    kind: 'page',
  });
}

export function categoryOgCard(category: Category, brands: Brand[]): OgCard {
  const listed = brandsInCategory(brands, category.slug);
  const date = checkedThrough(listed);

  return card({
    path: `/open-graph/kategori/${category.slug}.png`,
    alt: `Kartu Referral Update: ${listed.length} kode referral kategori ${category.name}.`,
    title: `Kode referral ${category.name}`,
    description: `${listed.length} brand di kategori ${category.name}. Dicek hingga ${date}.`,
    kind: 'page',
  });
}

export function defaultOgCard(): OgCard {
  return card({
    path: defaultOgImage.path,
    alt: defaultOgImage.alt,
    title: 'Referral Update',
    description: 'Direktori independen kode referral untuk layanan digital di Indonesia.',
    kind: 'page',
  });
}

export function toOgImageOptions(card: OgCard): OGImageOptions {
  const border =
    card.status === 'expired'
      ? palette.mark
      : card.status === 'unverified'
        ? palette.muted
        : palette.accent;
  const titleSize = card.kind === 'brand' ? 108 : card.kind === 'article' ? 64 : 74;
  const descriptionSize = card.kind === 'brand' ? 36 : 32;

  return {
    title: card.title,
    description: card.description,
    bgGradient: [palette.paper],
    border: { color: border, width: 12, side: 'inline-start' },
    padding: 72,
    font: {
      title: {
        color: palette.ink,
        size: titleSize,
        weight: 'Bold',
        lineHeight: card.kind === 'brand' ? 1 : 1.08,
        families: ['Radio Canada Big'],
      },
      description: {
        color: palette.muted,
        size: descriptionSize,
        weight: 'Normal',
        lineHeight: 1.35,
        families: ['Radio Canada'],
      },
    },
    fonts,
  };
}

let cardsPromise: Promise<Record<string, OgCard>> | undefined;

export function getOgCards(): Promise<Record<string, OgCard>> {
  cardsPromise ??= (async () => {
    const [brands, articles] = await Promise.all([getBrands(), getArticles()]);
    const cards: Record<string, OgCard> = {
      default: defaultOgCard(),
      home: homeOgCard(brands),
      'kode-referral': directoryOgCard(brands),
      kategori: categoryIndexOgCard(brands),
      blog: blogIndexOgCard(articles),
    };

    for (const brand of brands) {
      cards[`kode-referral/${brand.slug}`] = brandOgCard(brand);
    }
    for (const article of articles) {
      cards[`blog/${article.slug}`] = articleOgCard(article);
    }
    for (const category of categories) {
      if (isCategoryIndexable(category, brands)) {
        cards[`kategori/${category.slug}`] = categoryOgCard(category, brands);
      }
    }

    return cards;
  })();

  return cardsPromise;
}
