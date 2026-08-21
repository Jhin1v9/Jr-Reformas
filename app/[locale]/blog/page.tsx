import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { ALL_POSTS } from '@/lib/blog';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Reveal from '@/components/shared/Reveal';
import { BlogCard } from '@/components/sections/BlogPreview';
import CTAFinal from '@/components/sections/CTAFinal';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Guías útiles sobre reformas | Blog Junior Reformas',
    description: 'Guías prácticas sobre reformas: precios en Sabadell, plazos, permisos, materiales y consejos para reformar tu piso sin sorpresas.',
  },
  en: {
    title: 'Useful renovation guides | Junior Reformas Blog',
    description: 'Practical renovation guides: prices in Sabadell, timelines, permits, materials and tips to renovate your home without surprises.',
  },
  pt: {
    title: 'Guias úteis sobre reformas | Blog Junior Reformas',
    description: 'Guias práticos sobre reformas: preços em Sabadell, prazos, licenças, materiais e conselhos para reformar sem surpresas.',
  },
  ca: {
    title: 'Guies útils sobre reformes | Blog Junior Reformas',
    description: 'Guies pràctiques sobre reformes: preus a Sabadell, terminis, llicències, materials i consells per reformar sense sorpreses.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/blog/', ...META[locale], keywords: ['guías reformas', 'blog reformas sabadell', 'consejos reforma piso'] });
}

export default async function BlogPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <>
      <SectionWrapper variant="dark">
        <Breadcrumb locale={locale} items={[{ name: t.nav.blog, path: '/blog/' }]} />
        <SectionHeader as="h1" badge={t.blogPreview.badge} title={t.blogPreview.title} description={t.blogPreview.description} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <BlogCard post={p} locale={locale} readMore={t.blogPreview.readMore} minRead={t.blogPreview.minRead} />
            </Reveal>
          ))}
        </div>
      </SectionWrapper>
      <CTAFinal locale={locale} />
    </>
  );
}
