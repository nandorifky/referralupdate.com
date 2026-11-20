import { getArticles, getBrands } from './content';

export type PhotoCredit = {
  author?: string;
  license?: string;
  source?: string;
};

export async function getPhotoCredits(): Promise<PhotoCredit[]> {
  const [brands, articles] = await Promise.all([getBrands(), getArticles()]);
  const contentImages = [
    ...brands.flatMap((brand) => [brand.image, ...brand.gallery]),
    ...articles.map((article) => article.image),
  ];

  return contentImages
    .filter((image) => image.author || image.license || image.source)
    .map(({ author, license, source }) => ({ author, license, source }));
}
