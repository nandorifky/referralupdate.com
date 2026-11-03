import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { site } from '../data/site';
import { getArticles } from '../lib/content';
import { isArticleIndexable } from '../lib/policy';

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site: configured }) => {
  const origin = configured ?? new URL('https://referralupdate.com');
  const articles = (await getArticles()).filter(isArticleIndexable);
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
          `      <pubDate>${new Date(`${article.updated}T00:00:00Z`).toUTCString()}</pubDate>`,
          `      <media:content url="${escape(imageUrl)}" medium="image" type="image/jpeg" />`,
          '    </item>',
        ].join('\n');
      }),
    )
  ).join('\n');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">',
    '  <channel>',
    `    <title>${escape(site.name)}</title>`,
    `    <link>${escape(new URL('/blog/', origin).toString())}</link>`,
    `    <description>${escape(site.description)}</description>`,
    '    <language>id-ID</language>',
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
