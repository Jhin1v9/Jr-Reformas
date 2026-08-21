import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { getPhotos, fotoUrl, type Photo } from '@/lib/photos';
import HeroCarousel from '@/components/sections/HeroCarousel';
import StatsBanner from '@/components/sections/StatsBanner';
import BudgetCalculator from '@/components/sections/BudgetCalculator';
import ServicesCarousel from '@/components/sections/ServicesCarousel';
import ProcessTimeline from '@/components/shared/ProcessTimeline';
import TransformationsGallery from '@/components/sections/TransformationsGallery';
import Transformations from '@/components/sections/Transformations';
import WhyJunior from '@/components/sections/WhyJunior';
import TestimonialsHome from '@/components/sections/TestimonialsHome';
import AreaMap from '@/components/sections/AreaMap';
import FAQ from '@/components/sections/FAQ';
import BlogPreview from '@/components/sections/BlogPreview';
import CTAFinal from '@/components/sections/CTAFinal';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';

interface Props {
  params: Promise<{ locale: string }>;
}

const SERVICE_LABELS: Record<string, string> = {
  COCINA: 'Cocina',
  BANO: 'Baño',
  PISO: 'Reforma integral',
  LOCAL: 'Local comercial',
  EXTERIOR: 'Fachada / Terraza',
  INSTAL: 'Instalaciones',
  DEMO: 'Obra gruesa',
  SUELO: 'Suelos',
};

const LOCATION_LABELS: Record<string, string> = {
  SAB: 'Sabadell',
  BCN: 'Barcelona',
  TER: 'Terrassa',
  MAT: 'Mataró',
  GEN: 'Barcelona',
};

function buildAfterSlides(photos: Photo[]): { src: string; alt: string; service: string; location: string }[] {
  return photos.slice(0, 10).map((p) => ({
    src: fotoUrl(p.sizes.hero),
    alt: p.alt_text,
    service: SERVICE_LABELS[p.categoria] ?? 'Reforma',
    location: LOCATION_LABELS[p.localidad] ?? 'Sabadell',
  }));
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  const afterSlides = buildAfterSlides(getPhotos({ fase: 'DESPUES' }));

  return (
    <>
      <HeroCarousel locale={locale} />
      <StatsBanner locale={locale} />
      <SectionWrapper variant="dark" id="calculadora">
        <SectionHeader badge={t.calculator.badge} title={t.calculator.title} description={t.calculator.description} />
        <BudgetCalculator
          labels={{
            step1: t.calculator.step1,
            step2: t.calculator.step2,
            step3: t.calculator.step3,
            types: t.calculator.types,
            finishes: {
              estandar: t.calculator.finishes.estandar,
              premium: t.calculator.finishes.premium,
              alto: t.calculator.finishes.alto,
            },
            finishesDesc: {
              estandar: t.calculator.finishes.estandarDesc,
              premium: t.calculator.finishes.premiumDesc,
              alto: t.calculator.finishes.altoDesc,
            },
            result: t.calculator.result,
            disclaimer: t.calculator.disclaimer,
            cta: t.calculator.cta,
            sqm: t.calculator.sqm,
            ctaHref: localePath(locale, '/presupuesto'),
          }}
        />
      </SectionWrapper>
      <ServicesCarousel locale={locale} />
      <ProcessTimeline locale={locale} />
      <TransformationsGallery locale={locale} />
      <Transformations locale={locale} slides={afterSlides} />
      <WhyJunior locale={locale} />
      <TestimonialsHome locale={locale} />
      <AreaMap locale={locale} />
      <FAQ locale={locale} />
      <BlogPreview locale={locale} />
      <CTAFinal locale={locale} />
    </>
  );
}
