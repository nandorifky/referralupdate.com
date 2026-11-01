import { categorySlugs, type Category } from '../data/categories';
import { PREVIEW } from '../data/site';
import type { Article, Brand } from './content';

const PLACEHOLDER = /pratinjau|belum diuji|data contoh/i;

export function isBrandIndexable(brand: Brand) {
  if (PREVIEW) return false;
  if (PLACEHOLDER.test(brand.verificationNote) || PLACEHOLDER.test(brand.summary)) return false;
  return (
    brand.status !== 'expired' &&
    brand.verificationNote.length >= 80 &&
    brand.summary.length >= 120 &&
    Boolean(brand.rewardReferee || brand.rewardReferrer) &&
    brand.payoutNote.length >= 40 &&
    brand.eligibility.length >= 2 &&
    new Set(brand.faqs.map((faq) => faq.intent)).size >= 3 &&
    brand.steps.length >= 3 &&
    brand.terms.length >= 3 &&
    brand.faqs.length >= 3 &&
    brand.sources.length >= 1 &&
    brand.updateLog.length >= 1
  );
}

export function indexableBrands(brands: Brand[]) {
  return brands.filter(isBrandIndexable);
}

export function isCategoryIndexable(category: Category, brands: Brand[]) {
  if (PREVIEW) return false;
  const listed = brands.filter(
    (brand) => brand.category === category.slug && isBrandIndexable(brand),
  );
  const paragraphs = category.intro.split(/\n\s*\n/).filter((paragraph) => paragraph.trim());
  return listed.length >= 2 && category.intro.length >= 300 && paragraphs.length >= 2;
}

export function indexableCategories(categories: Category[], brands: Brand[]) {
  return categories.filter((category) => isCategoryIndexable(category, brands));
}

export function categoryHref(category: Category, brands: Brand[]) {
  return isCategoryIndexable(category, brands)
    ? `/kategori/${category.slug}/`
    : `/kode-referral/?kategori=${category.slug}`;
}

export function articleWordCount(body: string) {
  const text = body
    .replace(/^import\s.+$/gm, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/[#*_>`~[\]]/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

export function isArticleIndexable(article: Article) {
  if (PREVIEW) return false;
  return (
    articleWordCount(article.body) >= 400 &&
    article.sources.length >= 1 &&
    article.author.name.length > 0 &&
    Boolean(article.updated)
  );
}

export function isDirectoryIndexable(brands: Brand[]) {
  return !PREVIEW && indexableBrands(brands).length >= 6;
}

export function isBlogIndexable(articles: Article[]) {
  return !PREVIEW && articles.filter(isArticleIndexable).length >= 3;
}

export function assertContentIntegrity(brands: Brand[], articles: Article[]) {
  const problems: string[] = [];
  const slugs = new Set(brands.map((brand) => brand.slug));

  const duplicates = (field: string, values: { slug: string; value: string }[]) => {
    const seen = new Map<string, string[]>();
    for (const { slug, value } of values) {
      const key = value.trim().toLowerCase().replace(/\s+/g, ' ');
      seen.set(key, [...(seen.get(key) ?? []), slug]);
    }
    for (const [value, owners] of seen) {
      if (owners.length > 1) {
        problems.push(`${field} identik di ${owners.join(', ')}: "${value.slice(0, 60)}…"`);
      }
    }
  };

  duplicates('summary', brands.map((brand) => ({ slug: brand.slug, value: brand.summary })));
  duplicates(
    'verificationNote',
    brands.map((brand) => ({ slug: brand.slug, value: brand.verificationNote })),
  );
  duplicates('code', brands.map((brand) => ({ slug: brand.slug, value: brand.code })));
  duplicates(
    'seo.title',
    brands.map((brand) => ({ slug: brand.slug, value: brand.seo.title })),
  );
  duplicates(
    'seo.description',
    brands.map((brand) => ({ slug: brand.slug, value: brand.seo.description })),
  );
  duplicates('seo.h1', brands.map((brand) => ({ slug: brand.slug, value: brand.seo.h1 })));

  for (const brand of brands) {
    const name = brand.name.toLowerCase();
    if (!brand.seo.title.toLowerCase().includes(name)) {
      problems.push(`${brand.slug}: seo.title harus memuat nama brand`);
    }
    if (!brand.seo.h1.toLowerCase().includes(name)) {
      problems.push(`${brand.slug}: seo.h1 harus memuat nama brand`);
    }
    if (!(categorySlugs as readonly string[]).includes(brand.category)) {
      problems.push(`${brand.slug}: kategori "${brand.category}" tidak dikenal`);
    }
    if (brand.status === 'expired' && !brand.expiresAt) {
      problems.push(`${brand.slug}: status expired harus punya expiresAt`);
    }
    if (brand.status !== 'expired' && brand.expiresAt && brand.expiresAt < brand.checkedAt) {
      problems.push(`${brand.slug}: expiresAt sudah lewat saat checkedAt; ubah status ke expired`);
    }
  }

  for (const article of articles) {
    for (const slug of article.relatedBrands) {
      if (!slugs.has(slug)) {
        problems.push(`${article.slug}: relatedBrands "${slug}" tidak ada di koleksi brand`);
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(`Pemeriksaan konten gagal:\n- ${problems.join('\n- ')}`);
  }
}
