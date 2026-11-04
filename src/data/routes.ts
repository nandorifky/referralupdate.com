export type Route = { label: string; href: string; ldLabel?: string };

export const routes = {
  home: { label: 'Beranda', href: '/' },
  directory: { label: 'Direktori', href: '/kode-referral/', ldLabel: 'Direktori kode referral' },
  programReferral: { label: 'Program referral', href: '/program-referral/' },
  categories: { label: 'Kategori', href: '/kategori/' },
  blog: { label: 'Blog', href: '/blog/' },
  methodology: { label: 'Cara kami cek', href: '/metodologi-verifikasi/' },
  disclosure: { label: 'Tautan affiliate', href: '/disclosure-affiliate/' },
  privacy: { label: 'Privasi', href: '/privasi/' },
  about: { label: 'Tentang', href: '/tentang/' },
  contact: { label: 'Kontak', href: '/kontak/' },
} as const satisfies Record<string, Route>;

export const navItems = [routes.directory, routes.categories, routes.blog, routes.methodology];

export const footerItems = [
  ...navItems,
  routes.programReferral,
  routes.disclosure,
  routes.privacy,
  routes.about,
];

export const sitemapStaticRoutes = [
  routes.about,
  routes.contact,
  routes.methodology,
  routes.disclosure,
  routes.privacy,
  routes.programReferral,
];

export const feed = { label: 'RSS', href: '/rss.xml' };

export const homeCrumb = { name: routes.home.label, path: routes.home.href };
