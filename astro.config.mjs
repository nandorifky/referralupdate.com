import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kode-referral.example',
  output: 'static',
  build: { format: 'directory' },
});
