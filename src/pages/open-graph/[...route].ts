import { OGImageRoute } from 'astro-og-canvas';
import { getOgCards, toOgImageOptions } from '../../lib/og';

const pages = await getOgCards();

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => toOgImageOptions(page),
});
