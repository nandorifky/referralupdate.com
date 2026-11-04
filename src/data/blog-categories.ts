export const blogCategorySlugs = ['dasar-keamanan', 'tips-optimasi', 'review'] as const;

export type BlogCategorySlug = (typeof blogCategorySlugs)[number];

const labels: Record<BlogCategorySlug, string> = {
  'dasar-keamanan': 'Dasar & keamanan',
  'tips-optimasi': 'Cara pakai',
  'review': 'Review',
};

export function blogCategoryName(slug: BlogCategorySlug) {
  return labels[slug];
}
