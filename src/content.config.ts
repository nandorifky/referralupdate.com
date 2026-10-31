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

const officialUrl = z.url().refine((value) => {
  const host = new URL(value).hostname;
  return !/(^|\.)example\.(com|org|net)$/.test(host) && !host.endsWith('.example');
}, 'Gunakan domain resmi brand, bukan domain contoh.');

const brands = defineCollection({
  loader: yamlCollection('./src/content/brands'),
  schema: z.object({
    name: z.string().min(2),
    category: z.enum(categorySlugs),
    code: z.string().min(4),
    reward: z.string().min(3),
    checkedAt: z.iso.date(),
    summary: z.string().min(120),
    steps: z.array(z.string().min(20)).min(3),
    terms: z.array(z.string().min(15)).min(3),
    faqs: z
      .array(
        z.object({
          q: z.string().min(10),
          a: z.string().min(40),
        }),
      )
      .min(2),
    officialUrl,
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
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(10),
    excerpt: z.string().min(100),
    category: z.enum(blogCategorySlugs),
    updated: z.iso.date(),
    author: z.object({
      name: z.string().min(3),
      role: z.string().min(3),
    }),
    sources: z.array(source).min(1),
    relatedBrands: z.array(z.string()).default([]),
  }),
});

export const collections = { brands, blog };
