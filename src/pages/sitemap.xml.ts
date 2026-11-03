import type { APIRoute } from 'astro';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { getCategories } from '../data/categories';
import { photos, PREVIEW } from '../data/site';
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

type Entry = {
  lastmod?: string;
  images?: { loc: string; title: string }[];
};

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('https://referralupdate.com');
  const urls = new Map<string, Entry>();
  const buildDate = new Date().toISOString().slice(0, 10);
  const imageCache = new Map<ImageMetadata, string>();

  const imageLoc = async (photo: { src: ImageMetadata; alt: string }) => {
    let loc = imageCache.get(photo.src);
    if (!loc) {
      const generated = await getImage({
        src: photo.src,
        width: 1280,
        format: 'jpg',
        quality: 68,
      });
      loc = new URL(generated.src, origin).toString();
      imageCache.set(photo.src, loc);
    }
    return loc;
  };

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
      urls.set('/', {
        lastmod: latestBrand ?? buildDate,
        images: [{ loc: await imageLoc(photos.hero), title: photos.hero.alt }],
      });
      urls.set('/kode-referral/', { lastmod: latestBrand ?? buildDate });
    }

    for (const brand of listed) {
      urls.set(`/kode-referral/${brand.slug}/`, {
        lastmod: brand.checkedAt,
        images: [{ loc: await imageLoc(brand.image), title: brand.image.alt }],
      });
    }

    if (isBlogIndexable(articles)) {
      urls.set('/blog/', { lastmod: latestArticle ?? buildDate });
    }
    for (const article of indexableArticles) {
      urls.set(`/blog/${article.slug}/`, {
        lastmod: article.updated,
        images: [{ loc: await imageLoc(article.image), title: article.image.alt }],
      });
    }

    const categoryPages = categories.filter((category) => isCategoryIndexable(category, brands));
    if (categoryPages.length > 0) {
      urls.set('/kategori/', { lastmod: latestBrand ?? buildDate });
    }
    for (const category of categoryPages) {
      const latest = brandsInCategory(listed, category.slug).reduce<string | undefined>(
        (value, brand) => (!value || brand.checkedAt > value ? brand.checkedAt : value),
        undefined,
      );
      urls.set(`/kategori/${category.slug}/`, { lastmod: latest ?? buildDate });
    }

    for (const path of [
      '/tentang/',
      '/kontak/',
      '/metodologi-verifikasi/',
      '/disclosure-affiliate/',
      '/privasi/',
    ]) {
      urls.set(path, {});
    }
  }

  const entries = [...urls.entries()]
    .map(([path, entry]) => {
      const images = entry.images
        ?.map(
          (image) =>
            `\n    <image:image>\n      <image:loc>${escape(image.loc)}</image:loc>\n      <image:title>${escape(image.title)}</image:title>\n    </image:image>`,
        )
        .join('');
      return `  <url>\n    <loc>${escape(new URL(path, origin).toString())}</loc>${
        entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
      }${images ?? ''}\n  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
