import type { ImageMetadata } from 'astro';
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

// Bentuk gambar yang sama dipakai untuk sampul brand, gambar pendukung, dan
// sampul artikel. `alt` dan `caption` wajib supaya setiap gambar punya
// keterangan yang bisa dibaca mesin pencari dan pembaca layar.
const photoSchema = (image: () => z.ZodType<ImageMetadata>) =>
  z.object({
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
  });

// Gambar pendukung galeri boleh punya rasio bebas. `ratio: 'auto'` memakai
// rasio asli berkas (tak dipotong), sedangkan nilai lain memotong ke rasio itu.
// Tata letaknya sendiri: tiga kolom di desktop, dua di tablet, satu di ponsel,
// dan baris terakhir yang tidak penuh otomatis melar memenuhi lebar.
const gallerySchema = (image: () => z.ZodType<ImageMetadata>) =>
  photoSchema(image).extend({
    ratio: z.enum(['auto', '4:3', '16:9', '1:1', '3:4']).default('auto'),
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
        image: photoSchema(image),
        gallery: z.array(gallerySchema(image)).default([]),
      code: z.string().min(4),
      reward: z.string().min(3),
      status: z.enum(['active', 'unverified', 'expired']),
      relatedArticles: z.array(z.string()).default([]),
      validFrom: z.iso.date().optional(),
      expiresAt: z.iso.date().optional(),
      rewardReferee: z.string().min(20).optional(),
      rewardReferrer: z.string().min(20).optional(),
      rewardReferrerShort: z.string().min(40).max(120),
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

// Blok ulasan untuk kategori `review`. `reviewBody` versi ringkas ada di
// `verdict`; `method` dan `pros`/`cons` hanya tampil di halaman karena Google
// tidak membaca properti itu di JSON-LD.
const review = z.object({
  itemName: z.string().min(3),
  itemUrl: realUrl.optional(),
  applicationCategory: z.string().min(3),
  operatingSystem: z.string().min(2),
  rating: z.object({
    value: z.number().min(0).max(10),
    best: z.number().default(10),
    worst: z.number().default(0),
  }),
  title: z.string().min(10).optional(),
  verdict: z.string().min(80).optional(),
  pros: z.array(z.string().min(15)).max(6).optional(),
  cons: z.array(z.string().min(15)).max(6).optional(),
  method: z.string().min(40).optional(),
  reviewer: z
    .object({
      name: z.string().min(3).max(100),
      role: z.string().min(3).optional(),
    })
    .optional(),
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
      image: photoSchema(image),
      author: z.object({
        name: z.string().min(3),
        role: z.string().min(3),
      }),
      sources: z.array(source).min(1),
      relatedBrands: z.array(z.string()).default([]),
      review: review.optional(),
    })
    .superRefine((data, ctx) => {
      if (data.category === 'review' && !data.review) {
        ctx.addIssue({
          code: 'custom',
          path: ['review'],
          message: 'Kategori review wajib mengisi blok review.',
        });
      }
      if (data.category !== 'review' && data.review) {
        ctx.addIssue({
          code: 'custom',
          path: ['review'],
          message: 'Blok review hanya untuk artikel kategori review.',
        });
      }
      if (data.review && data.review.rating.value > data.review.rating.best) {
        ctx.addIssue({
          code: 'custom',
          path: ['review', 'rating', 'value'],
          message: 'rating.value tidak boleh melebihi rating.best.',
        });
      }
      if (data.review?.reviewer && !data.review.reviewer.role) {
        ctx.addIssue({
          code: 'custom',
          path: ['review', 'reviewer', 'role'],
          message: 'reviewer.role wajib diisi bila nama reviewer dicantumkan.',
        });
      }
    }),
});

export const collections = { brands, blog };
