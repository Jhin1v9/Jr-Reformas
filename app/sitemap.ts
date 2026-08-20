import type { MetadataRoute } from 'next';
import { SITE, LOCALES } from '@/lib/constants';
import { SERVICES } from '@/lib/services';
import { LOCALITIES } from '@/lib/localities';
import { ALL_POSTS } from '@/lib/blog';

export const dynamic = 'force-static';

const STATIC_PATHS = [
  { path: '/', priority: 1.0, changefreq: 'weekly' as const },
  { path: '/servicios/', priority: 0.9, changefreq: 'monthly' as const },
  { path: '/localidades/', priority: 0.9, changefreq: 'monthly' as const },
  { path: '/proyectos/galeria/', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/antes-y-despues/', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/proceso/', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/sobre-junior/', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/blog/', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/contacto/', priority: 0.9, changefreq: 'monthly' as const },
  { path: '/presupuesto/', priority: 0.9, changefreq: 'monthly' as const },
  { path: '/aviso-legal/', priority: 0.2, changefreq: 'yearly' as const },
  { path: '/politica-privacidad/', priority: 0.2, changefreq: 'yearly' as const },
  { path: '/politica-cookies/', priority: 0.2, changefreq: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();
  for (const locale of LOCALES) {
    for (const s of STATIC_PATHS) {
      entries.push({
        url: `${SITE.url}/${locale}${s.path}`,
        lastModified: now,
        changeFrequency: s.changefreq,
        priority: s.priority,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}${s.path}`])),
        },
      });
    }
    for (const svc of SERVICES) {
      entries.push({
        url: `${SITE.url}/${locale}/servicios/${svc.slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: svc.main ? 0.9 : 0.8,
      });
    }
    for (const loc of LOCALITIES) {
      entries.push({
        url: `${SITE.url}/${locale}/localidades/${loc.slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: loc.hub ? 0.95 : 0.85,
      });
    }
    for (const post of ALL_POSTS) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${post.slug}/`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.7,
      });
    }
  }
  return entries;
}
