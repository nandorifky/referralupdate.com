import { getCollection, type CollectionEntry } from 'astro:content';
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

export function sortBrandsByChecked(brands: Brand[]) {
  return [...brands].sort((a, b) => b.checkedAt.localeCompare(a.checkedAt));
}

export function brandsInCategory(brands: Brand[], slug: string) {
  return brands.filter((brand) => brand.category === slug);
}
