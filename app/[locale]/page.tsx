import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import Hero from '@/components/sections/Hero';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import BudgetCalculator from '@/components/sections/BudgetCalculator';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ProcessSteps from '@/components/sections/ProcessSteps';
import TransformationsGallery from '@/components/sections/TransformationsGallery';
import WhyJunior from '@/components/sections/WhyJunior';
import Testimonials from '@/components/sections/Testimonials';
import AreaMap from '@/components/sections/AreaMap';
import FAQ from '@/components/sections/FAQ';
import BlogPreview from '@/components/sections/BlogPreview';
import CTAFinal from '@/components/sections/CTAFinal';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} />
      <BeforeAfterSection locale={locale} />
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
      <ServicesGrid locale={locale} />
      <ProcessSteps locale={locale} />
      <TransformationsGallery locale={locale} />
      <WhyJunior locale={locale} />
      <Testimonials locale={locale} />
      <AreaMap locale={locale} />
      <FAQ locale={locale} />
      <BlogPreview locale={locale} />
      <CTAFinal locale={locale} />
    </>
  );
}
