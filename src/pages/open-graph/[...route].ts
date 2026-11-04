import type { APIRoute, GetStaticPaths } from 'astro';
import type { OgCard } from '../../lib/og';
import { getOgCards } from '../../lib/og';
import { renderOgCard } from '../../lib/og-render';

export const getStaticPaths = (async () => {
  const cards = await getOgCards();
  return Object.entries(cards).map(([key, card]) => ({
    params: { route: `${key}.png` },
    props: { card },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { card } = props as { card: OgCard };
  const png = await renderOgCard(card);

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
