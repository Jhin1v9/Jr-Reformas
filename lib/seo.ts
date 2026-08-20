import type { Metadata } from 'next';
import { SITE, LOCALES, LOCALE_OG, type Locale } from './constants';
import { AGGREGATE_RATING } from './testimonials';

const BASE = SITE.url;

export function pageMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}): Metadata {
  const canonical = `${BASE}/${opts.locale}${opts.path === '/' ? '/' : opts.path}`;
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = `${BASE}/${loc}${opts.path === '/' ? '/' : opts.path}`;
  }
  languages['x-default'] = `${BASE}/es${opts.path === '/' ? '/' : opts.path}`;
  const ogImage = opts.image ?? '/logo/logo-jr.png';
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical, languages },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE.name,
      locale: LOCALE_OG[opts.locale],
      type: opts.type ?? 'website',
      images: [{ url: ogImage.startsWith('http') ? ogImage : `${BASE}${ogImage}`, width: 1200, height: 630, alt: opts.title }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [ogImage.startsWith('http') ? ogImage : `${BASE}${ogImage}`],
    },
  };
}

export function localBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${BASE}/#business`,
    name: SITE.name,
    description:
      'Empresa de reformas integrales y parciales con más de 15 años de experiencia en Sabadell, Barcelona y alrededores. Presupuesto desglosado, visita técnica gratuita.',
    url: BASE,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    image: `${BASE}/logo/logo-jr.png`,
    logo: `${BASE}/logo/logo-jr.png`,
    priceRange: '€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postalCode,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: [
      { '@type': 'City', name: 'Sabadell' },
      { '@type': 'City', name: 'Barcelona' },
      { '@type': 'City', name: 'Terrassa' },
      { '@type': 'City', name: 'Mataró' },
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
    ],
    sameAs: [SITE.instagram],
    founder: { '@type': 'Person', name: SITE.founder },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: AGGREGATE_RATING.ratingValue,
      reviewCount: AGGREGATE_RATING.reviewCount,
      bestRating: 5,
    },
  };
}

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: BASE,
    logo: `${BASE}/logo/logo-jr.png`,
    email: SITE.email,
    telephone: SITE.phoneRaw,
    sameAs: [SITE.instagram],
    founder: { '@type': 'Person', name: SITE.founder },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE}/${locale}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  metaDesc: string;
  slug: string;
  date: string;
  image: string;
}, locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDesc,
    image: `${BASE}/fotos/${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: SITE.name, url: BASE },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo/logo-jr.png` },
    },
    mainEntityOfPage: `${BASE}/${locale}/blog/${post.slug}/`,
  };
}

export function howToSchema(locale: Locale, steps: { title: string; description: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: locale === 'es' ? 'Cómo trabajamos: proceso de reforma en 5 pasos' : locale === 'pt' ? 'Como trabalhamos: processo de reforma em 5 passos' : 'How we work: 5-step renovation process',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };
}

export function serviceSchema(service: { title: string; metaDesc: string; slug: string }, locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDesc,
    provider: { '@type': 'LocalBusiness', '@id': `${BASE}/#business`, name: SITE.name },
    areaServed: ['Sabadell', 'Barcelona', 'Terrassa', 'Mataró'].map((name) => ({ '@type': 'City', name })),
    url: `${BASE}/${locale}/servicios/${service.slug}/`,
  };
}
