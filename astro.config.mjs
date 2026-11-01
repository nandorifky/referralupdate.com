import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import articleSections from './src/lib/article-sections.mjs';

export default defineConfig({
  site: 'https://referralupdate.com',
  output: 'static',
  build: { format: 'directory' },
  markdown: { processor: satteri({ hastPlugins: [articleSections] }) },
  integrations: [mdx()],
});
