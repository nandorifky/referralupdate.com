import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { routes } from '../data/routes';
import { site, siteOrigin } from '../data/site';
import { getArticles, sortArticlesByUpdated } from '../lib/content';
import { isArticleIndexable } from '../lib/policy';

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site: configured }) => {
  const origin = siteOrigin(configured);
  const articles = sortArticlesByUpdated((await getArticles()).filter(isArticleIndexable));
  const updated = articles[0]?.updated;

  const items = (
    await Promise.all(
      articles.map(async (article) => {
        const url = new URL(`/blog/${article.slug}/`, origin).toString();
        const image = await getImage({
          src: article.image.src,
          width: 1200,
          format: 'jpg',
          quality: 80,
        });
        const imageUrl = new URL(image.src, origin).toString();
        return [
          '    <item>',
          `      <title>${escape(article.title)}</title>`,
          `      <link>${escape(url)}</link>`,
          `      <guid isPermaLink="true">${escape(url)}</guid>`,
          `      <description>${escape(article.excerpt)}</description>`,
          `      <pubDate>${new Date(`${article.published ?? article.updated}T00:00:00Z`).toUTCString()}</pubDate>`,
          `      <media:content url="${escape(imageUrl)}" medium="image" type="image/jpeg" />`,
          '    </item>',
        ].join('\n');
      }),
    )
  ).join('\n');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">',
    '  <channel>',
    `    <title>${escape(site.name)}</title>`,
    `    <link>${escape(new URL(routes.blog.href, origin).toString())}</link>`,
    `    <description>${escape(site.description)}</description>`,
    '    <language>id-ID</language>',
    `    <atom:link href="${escape(new URL('/rss.xml', origin).toString())}" rel="self" type="application/rss+xml" />`,
    updated ? `    <lastBuildDate>${new Date(`${updated}T00:00:00Z`).toUTCString()}</lastBuildDate>` : '',
    items,
    '  </channel>',
    '</rss>',
    '',
  ]
    .filter((line) => line !== '')
    .join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
