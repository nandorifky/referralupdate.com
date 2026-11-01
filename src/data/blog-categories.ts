export const blogCategorySlugs = ['dasar-keamanan', 'tips-optimasi'] as const;

export type BlogCategorySlug = (typeof blogCategorySlugs)[number];

const labels: Record<BlogCategorySlug, string> = {
  'dasar-keamanan': 'Dasar & keamanan',
  'tips-optimasi': 'Cara pakai',
};

export function blogCategoryName(slug: BlogCategorySlug) {
  return labels[slug];
}
