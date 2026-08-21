import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import AreaMap from '@/components/sections/AreaMap';
import CTAFinal from '@/components/sections/CTAFinal';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Dónde trabajamos: Sabadell, Barcelona, Terrassa, Mataró | Junior Reformas',
    description: 'Reformas integrales en Sabadell, Barcelona, Terrassa y Mataró. Radio de actuación de 40-50 km. Visita técnica gratuita y presupuesto desglosado.',
  },
  en: {
    title: 'Where we work: Sabadell, Barcelona, Terrassa, Mataró | Junior Reformas',
    description: 'Full renovations in Sabadell, Barcelona, Terrassa and Mataró. 40-50 km service area. Free technical visit and itemised quote.',
  },
  pt: {
    title: 'Onde trabalhamos: Sabadell, Barcelona, Terrassa, Mataró | Junior Reformas',
    description: 'Reformas integrais em Sabadell, Barcelona, Terrassa e Mataró. Área de atuação de 40-50 km. Visita técnica gratuita e orçamento detalhado.',
  },
  ca: {
    title: 'On treballem: Sabadell, Barcelona, Terrassa, Mataró | Junior Reformas',
    description: 'Reformes integrals a Sabadell, Barcelona, Terrassa i Mataró. Àrea d\'actuació de 40-50 km. Visita tècnica gratuïta i pressupost desglossat.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/localidades/', ...META[locale], keywords: ['reformas sabadell', 'reformas barcelona', 'reformas terrassa', 'reformas mataro'] });
}

export default async function LocalidadesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <>
      <SectionWrapper variant="light">
        <Breadcrumb locale={locale} variant="light" items={[{ name: t.nav.localities, path: '/localidades/' }]} />
        <SectionHeader as="h1" variant="light" badge={t.area.badge} title={t.area.title} description={t.area.description} />
      </SectionWrapper>
      <AreaMap locale={locale} />
      <CTAFinal locale={locale} />
    </>
  );
}
