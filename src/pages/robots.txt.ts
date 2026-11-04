import type { APIRoute } from 'astro';
import { PREVIEW, siteOrigin } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const origin = siteOrigin(site);
  const body = PREVIEW
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', origin).toString()}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
