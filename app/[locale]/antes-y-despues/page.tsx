import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import CTAFinal from '@/components/sections/CTAFinal';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Antes y después de nuestras reformas | Junior Reformas',
    description: 'Compara el antes y el después de reformas reales: baños, cocinas y pisos transformados en Sabadell y Barcelona. Sliders interactivos.',
  },
  en: {
    title: 'Before and after our renovations | Junior Reformas',
    description: 'Compare the before and after of real renovations: bathrooms, kitchens and flats transformed in Sabadell and Barcelona. Interactive sliders.',
  },
  pt: {
    title: 'Antes e depois das nossas reformas | Junior Reformas',
    description: 'Compare o antes e o depois de reformas reais: casas de banho, cozinhas e apartamentos transformados em Sabadell e Barcelona.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/antes-y-despues/', ...META[locale], keywords: ['antes y después reformas', 'transformación baño sabadell'] });
}

export default async function AntesYDespuesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <>
      <SectionWrapper variant="light" className="pb-0">
        <Breadcrumb locale={locale} variant="light" items={[{ name: t.nav.beforeAfter, path: '/antes-y-despues/' }]} />
        <SectionHeader as="h1" variant="light" badge={t.beforeAfter.badge} title={t.beforeAfter.title} description={t.beforeAfter.description} />
      </SectionWrapper>
      <BeforeAfterSection locale={locale} maxPairs={10} showHeader={false} />
      <div className="bg-offwhite pb-16 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/presupuesto')}>
          {t.ctaFinal.ctaPrimary}
        </CTAButton>
      </div>
      <CTAFinal locale={locale} />
    </>
  );
}

