import { photoCredits } from '../data/site';
import { getArticles, getBrands } from './content';

export type PhotoCredit = {
  author?: string;
  license?: string;
  source?: string;
};

export async function getPhotoCredits(): Promise<PhotoCredit[]> {
  const [brands, articles] = await Promise.all([getBrands(), getArticles()]);
  const contentImages = [...brands, ...articles].map((entry) => entry.image);

  return [...photoCredits, ...contentImages]
    .filter((image) => image.author || image.license || image.source)
    .map(({ author, license, source }) => ({ author, license, source }));
}
