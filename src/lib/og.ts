import { blogCategoryName } from '../data/blog-categories';
import type { BlogCategory } from '../data/blog-categories';
import { categories, type Category } from '../data/categories';
import { homeOg } from '../data/home';
import { defaultOgImage, site, type OgImage } from '../data/site';
import { brandStatusLabelsShort } from '../data/status';
import {
  brandsInCategory,
  categoriesWithBrands,
  getArticles,
  getBrands,
  type Article,
  type Brand,
} from './content';
import { indexableBlogCategories, indexableBrands, isCategoryIndexable } from './policy';

export type OgCard = OgImage & {
  title: string;
  description: string;
  label: string;
  kind: 'brand' | 'article' | 'page';
  status?: Brand['status'];
  name?: string;
  statusLabel?: string;
};

const titleLimits = { brand: 16, article: 90, page: 80 };
const descriptionLimit = 160;
const excerptLimit = 120;

function withoutTrailingPunctuation(text: string) {
  return text.replace(/[.!?]+$/, '').trim();
}

function fitText(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  if (sentence > 80) return cut.slice(0, sentence + 1);
  const lastSpace = cut.lastIndexOf(' ');
  let out = cut.slice(0, lastSpace > 0 ? lastSpace : max);
  const lastBreak = Math.max(out.lastIndexOf(','), out.lastIndexOf(';'), out.lastIndexOf(':'));
  if (lastBreak > 0 && out.length - lastBreak < 24) out = out.slice(0, lastBreak);
  return `${out.replace(/[\s,;:]+$/, '')}…`;
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
  return card({
    path: `/open-graph/kode-referral/${brand.slug}.png`,
    alt: `Kode ${brand.code} untuk kode referral ${brand.name}, ${brandStatusLabelsShort[brand.status].toLowerCase()}.`,
    title: brand.code,
    description: `${withoutTrailingPunctuation(brand.reward)}.`,
    label: 'Kode referral',
    name: brand.name,
    status: brand.status,
    statusLabel: brandStatusLabelsShort[brand.status],
    kind: 'brand',
  });
}

export function articleOgCard(article: Article): OgCard {
  return card({
    path: `/open-graph/blog/${article.slug}.png`,
    alt: `Kartu panduan: ${article.title}`,
    title: article.title,
    description: fitText(article.excerpt, excerptLimit),
    label: blogCategoryName(article.category),
    kind: 'article',
  });
}

export function homeOgCard(brands: Brand[]): OgCard {
  const active = brands.filter((brand) => brand.status === 'active').length;

  return card({
    path: '/open-graph/home.png',
    alt: homeOg.alt(active, brands.length),
    title: homeOg.title,
    description: homeOg.description(active, brands.length),
    label: 'Beranda',
    kind: 'page',
  });
}

export function directoryOgCard(brands: Brand[]): OgCard {
  return card({
    path: '/open-graph/kode-referral.png',
    alt: `Kartu Referral Update: direktori ${brands.length} kode referral.`,
    title: 'Direktori kode referral Indonesia',
    description: `${brands.length} brand dengan bonus, syarat, dan status.`,
    label: 'Direktori',
    kind: 'page',
  });
}

export function programReferralOgCard(brands: Brand[]): OgCard {
  return card({
    path: '/open-graph/program-referral.png',
    alt: `Kartu Referral Update: ${brands.length} program dan event undang teman untuk pengundang.`,
    title: 'Program referral & event undang teman',
    description: `${brands.length} program dan event undang teman: bonus pengundang, batas undangan.`,
    label: 'Program referral',
    kind: 'page',
  });
}

export function categoryIndexOgCard(brands: Brand[]): OgCard {
  const count = categoriesWithBrands(brands).length;

  return card({
    path: '/open-graph/kategori.png',
    alt: `Kartu Referral Update: ${count} kategori kode referral.`,
    title: 'Kode referral per kategori',
    description: `${count} kategori dengan brand.`,
    label: 'Kategori',
    kind: 'page',
  });
}

export function blogIndexOgCard(articles: Article[]): OgCard {  return card({
    path: '/open-graph/blog.png',
    alt: `Kartu Referral Update: ${articles.length} panduan kode referral.`,
    title: 'Panduan kode referral',
    description: `${articles.length} artikel dengan sumber resmi.`,
    label: 'Panduan',
    kind: 'page',
  });
}

export function blogCategoryIndexOgCard(listed: BlogCategory[]): OgCard {
  return card({
    path: '/open-graph/blog/kategori.png',
    alt: `Kartu Referral Update: ${listed.length} kategori panduan kode referral.`,
    title: 'Kategori panduan kode referral',
    description: `${listed.length} kategori: ${listed.map((category) => category.name).join(', ')}.`,
    label: 'Panduan',
    kind: 'page',
  });
}

export function blogCategoryOgCard(category: BlogCategory, articles: Article[]): OgCard {
  const listed = articles.filter((article) => article.category === category.slug);

  return card({
    path: `/open-graph/blog/kategori/${category.slug}.png`,
    alt: `Kartu Referral Update: ${listed.length} artikel kategori ${category.name}.`,
    title: `Panduan ${category.name}`,
    description: fitText(category.description, descriptionLimit),
    label: 'Kategori',
    kind: 'page',
  });
}

export function categoryOgCard(category: Category, brands: Brand[]): OgCard {
  const listed = brandsInCategory(brands, category.slug);

  return card({
    path: `/open-graph/kategori/${category.slug}.png`,
    alt: `Kartu Referral Update: ${listed.length} kode referral di kategori ${category.name}.`,
    title: `Kode referral ${category.name}`,
    description: `${listed.length} brand di kategori ${category.name}.`,
    label: 'Kategori',
    kind: 'page',
  });
}

export function defaultOgCard(): OgCard {
  return card({
    path: defaultOgImage.path,
    alt: defaultOgImage.alt,
    title: 'Referral Update',
    description: site.orgDescription,
    label: 'Referral Update',
    kind: 'page',
  });
}

let cardsPromise: Promise<Record<string, OgCard>> | undefined;

export function getOgCards(): Promise<Record<string, OgCard>> {
  cardsPromise ??= (async () => {
    const [brands, articles] = await Promise.all([getBrands(), getArticles()]);
    const cards: Record<string, OgCard> = {
      default: defaultOgCard(),
      home: homeOgCard(brands),
      'kode-referral': directoryOgCard(brands),
      'program-referral': programReferralOgCard(indexableBrands(brands)),
      kategori: categoryIndexOgCard(brands),
      blog: blogIndexOgCard(articles),
    };

    for (const brand of brands) {
      cards[`kode-referral/${brand.slug}`] = brandOgCard(brand);
    }
    for (const article of articles) {
      cards[`blog/${article.slug}`] = articleOgCard(article);
    }
    const blogCategoryPages = indexableBlogCategories(articles);
    if (blogCategoryPages.length > 0) {
      cards['blog/kategori'] = blogCategoryIndexOgCard(blogCategoryPages);
    }
    for (const category of blogCategoryPages) {
      cards[`blog/kategori/${category.slug}`] = blogCategoryOgCard(category, articles);
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
