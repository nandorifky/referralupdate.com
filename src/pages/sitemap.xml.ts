import type { APIRoute } from 'astro';
import { getCategories } from '../data/categories';
import { PREVIEW } from '../data/site';
import { brandsInCategory, getArticles, getBrands } from '../lib/content';
import {
  indexableBrands,
  isArticleIndexable,
  isBlogIndexable,
  isCategoryIndexable,
  isDirectoryIndexable,
} from '../lib/policy';

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('https://kode-referral.example');
  const urls = new Map<string, string | undefined>();

  if (!PREVIEW) {
    const [brands, articles] = await Promise.all([getBrands(), getArticles()]);
    const categories = getCategories();
    const listed = indexableBrands(brands);
    const latestBrand = listed.reduce<string | undefined>(
      (latest, brand) => (!latest || brand.checkedAt > latest ? brand.checkedAt : latest),
      undefined,
    );
    const indexableArticles = articles.filter(isArticleIndexable);
    const latestArticle = indexableArticles.reduce<string | undefined>(
      (latest, article) => (!latest || article.updated > latest ? article.updated : latest),
      undefined,
    );

    if (isDirectoryIndexable(brands)) {
      urls.set('/', latestBrand);
      urls.set('/kode-referral/', latestBrand);
    }

    for (const brand of listed) {
      urls.set(`/kode-referral/${brand.slug}/`, brand.checkedAt);
    }

    if (isBlogIndexable(articles)) {
      urls.set('/blog/', latestArticle);
    }
    for (const article of indexableArticles) {
      urls.set(`/blog/${article.slug}/`, article.updated);
    }

    const categoryPages = categories.filter((category) => isCategoryIndexable(category, brands));
    if (categoryPages.length > 0) {
      urls.set('/kategori/', latestBrand);
    }
    for (const category of categoryPages) {
      const latest = brandsInCategory(listed, category.slug).reduce<string | undefined>(
        (value, brand) => (!value || brand.checkedAt > value ? brand.checkedAt : value),
        undefined,
      );
      urls.set(`/kategori/${category.slug}/`, latest);
    }

    for (const path of [
      '/tentang/',
      '/kontak/',
      '/metodologi-verifikasi/',
      '/disclosure-affiliate/',
      '/privasi/',
    ]) {
      urls.set(path, undefined);
    }
  }

  const entries = [...urls.entries()]
    .map(
      ([path, lastmod]) =>
        `  <url>\n    <loc>${escape(new URL(path, origin).toString())}</loc>${
          lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
        }\n  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
