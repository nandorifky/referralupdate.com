import { getCollection, type CollectionEntry } from 'astro:content';
import { blogCategories } from '../data/blog-categories';
import { categories } from '../data/categories';
import { assertContentIntegrity } from './policy';

export type Brand = CollectionEntry<'brands'>['data'] & { slug: string };

export type Article = CollectionEntry<'blog'>['data'] & {
  slug: string;
  body: string;
  entry: CollectionEntry<'blog'>;
};

type Store = {
  brands: Brand[];
  articles: Article[];
};

let storePromise: Promise<Store> | undefined;

function load(): Promise<Store> {
  storePromise ??= (async () => {
    const [brandEntries, articleEntries] = await Promise.all([
      getCollection('brands'),
      getCollection('blog'),
    ]);

    const brands = brandEntries.map((entry) => ({ ...entry.data, slug: entry.id }));
    const articles = articleEntries.map((entry) => ({
      ...entry.data,
      slug: entry.id,
      body: entry.body ?? '',
      entry,
    }));

    assertContentIntegrity(brands, articles);
    return { brands, articles };
  })();

  return storePromise;
}

export async function getBrands() {
  return (await load()).brands;
}

export async function getBrand(slug: string) {
  return (await getBrands()).find((brand) => brand.slug === slug);
}

export async function getArticles() {
  return (await load()).articles;
}

export async function getArticle(slug: string) {
  return (await getArticles()).find((article) => article.slug === slug);
}

const statusRank: Record<Brand['status'], number> = {
  active: 0,
  unverified: 1,
  expired: 2,
};
const categoryRank = new Map(categories.map((category, index) => [category.slug, index]));

export function sortBrandsByChecked(brands: Brand[]) {
  return [...brands].sort(
    (a, b) =>
      b.checkedAt.localeCompare(a.checkedAt) ||
      statusRank[a.status] - statusRank[b.status] ||
      (categoryRank.get(a.category) ?? 99) - (categoryRank.get(b.category) ?? 99) ||
      a.name.localeCompare(b.name, 'id'),
  );
}

export function sortArticlesByUpdated(articles: Article[]) {
  return [...articles].sort(
    (a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, 'id'),
  );
}

export function brandsInCategory(brands: Brand[], slug: string) {
  return brands.filter((brand) => brand.category === slug);
}

export function categoriesWithBrands(brands: Brand[]) {
  return categories.filter((category) =>
    brands.some((brand) => brand.category === category.slug),
  );
}

export function articlesInBlogCategory(articles: Article[], slug: string) {
  return articles.filter((article) => article.category === slug);
}

export function blogCategoriesWithArticles(articles: Article[]) {
  return blogCategories.filter((category) =>
    articles.some((article) => article.category === category.slug),
  );
}
