import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pdfly.com';

  const routes = [
    '',
    '/merge',
    '/compress',
    '/edit',
    '/pdf-to-docx',
    '/docx-to-pdf',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.9,
  }));

  return [...routes];
}
