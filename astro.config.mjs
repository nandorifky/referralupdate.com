import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import articleSections from './src/lib/article-sections.mjs';

export default defineConfig({
  site: 'https://kode-referral.example',
  output: 'static',
  build: { format: 'directory' },
  markdown: { processor: satteri({ hastPlugins: [articleSections] }) },
  integrations: [mdx()],
});
