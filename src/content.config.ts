import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { blogCategorySlugs } from './data/blog-categories';
import { categorySlugs } from './data/categories';
import { yamlCollection } from './lib/yaml-loader';

const source = z.object({
  label: z.string().min(3),
  url: z.url(),
});

const faqIntent = z.enum([
  'bonus',
  'syarat',
  'pencairan',
  'masa-berlaku',
  'cara-pakai',
  'keamanan',
]);

const realUrl = z.url().refine((value) => {
  const host = new URL(value).hostname;
  return !/(^|\.)example\.(com|org|net)$/.test(host) && !host.endsWith('.example');
}, 'Gunakan domain resmi brand, bukan domain contoh.');

const brands = defineCollection({
  loader: yamlCollection('./src/content/brands'),
  schema: ({ image }) =>
    z
      .object({
        name: z.string().min(2),
        category: z.enum(categorySlugs),
        image: z.object({
          src: image(),
          alt: z.string().min(20).max(160),
          caption: z.string().min(20).max(200),
          position: z
            .string()
            .regex(/^\d{1,3}% \d{1,3}%$/)
            .default('50% 50%'),
          author: z.string().min(1).optional(),
          license: z.string().min(1).optional(),
          source: z.url().optional(),
        }),
      code: z.string().min(4),
      reward: z.string().min(3),
      status: z.enum(['active', 'unverified', 'expired']),
      validFrom: z.iso.date().optional(),
      expiresAt: z.iso.date().optional(),
      rewardReferee: z.string().min(20).optional(),
      rewardReferrer: z.string().min(20).optional(),
      payoutNote: z.string().min(40),
      eligibility: z.array(z.string().min(15)).min(2),
      checkedAt: z.iso.date(),
      summary: z.string().min(120),
      seo: z.object({
        title: z.string().min(20).max(75),
        description: z.string().min(120).max(158),
        h1: z.string().min(15).max(70),
      }),
      steps: z.array(z.string().min(20)).min(3),
      terms: z.array(z.string().min(15)).min(3),
      faqs: z
        .array(
          z.object({
            q: z.string().min(10),
            a: z.string().min(40),
            intent: faqIntent,
          }),
        )
        .min(3),
      officialUrl: realUrl,
      programUrl: realUrl.optional(),
      referralUrl: realUrl.optional(),
      verificationNote: z.string().min(80),
      sources: z.array(source).min(1),
      updateLog: z
        .array(
          z.object({
            date: z.iso.date(),
            note: z.string().min(10),
          }),
        )
        .min(1),
      author: z.object({
        name: z.string().min(3),
        role: z.string().min(3),
      }),
    })
    .refine((data) => Boolean(data.rewardReferee || data.rewardReferrer), {
      message: 'Isi rewardReferee atau rewardReferrer.',
      path: ['rewardReferee'],
    })
    .refine(
      (data) => !data.validFrom || !data.expiresAt || data.expiresAt >= data.validFrom,
      {
        message: 'expiresAt tidak boleh lebih awal dari validFrom.',
        path: ['expiresAt'],
      },
    )
    .refine((data) => new Set(data.faqs.map((faq) => faq.intent)).size >= 3, {
      message: 'FAQ harus mencakup minimal tiga intent berbeda.',
      path: ['faqs'],
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(10),
      excerpt: z.string().min(100),
      category: z.enum(blogCategorySlugs),
      published: z.iso.date().optional(),
      updated: z.iso.date(),
      image: z.object({
        src: image(),
        alt: z.string().min(20).max(160),
        caption: z.string().min(20).max(200),
        position: z
          .string()
          .regex(/^\d{1,3}% \d{1,3}%$/)
          .default('50% 50%'),
        author: z.string().min(1).optional(),
        license: z.string().min(1).optional(),
        source: z.url().optional(),
      }),
      author: z.object({
        name: z.string().min(3),
        role: z.string().min(3),
      }),
      sources: z.array(source).min(1),
      relatedBrands: z.array(z.string()).default([]),
    }),
});

export const collections = { brands, blog };
