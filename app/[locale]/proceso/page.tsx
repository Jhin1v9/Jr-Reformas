import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Lightbulb } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata, howToSchema } from '@/lib/seo';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import JsonLd from '@/components/shared/JsonLd';
import Reveal from '@/components/shared/Reveal';
import FAQ from '@/components/sections/FAQ';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Cómo trabajamos: proceso de reforma en 5 pasos | Junior Reformas',
    description: 'Visita gratuita, planeamiento, presupuesto desglosado, ejecución y entrega. Así trabajamos cada reforma en Sabadell y Barcelona, sin sorpresas.',
  },
  en: {
    title: 'How we work: 5-step renovation process | Junior Reformas',
    description: 'Free visit, planning, itemised quote, execution and handover. This is how we run every renovation in Sabadell and Barcelona, without surprises.',
  },
  pt: {
    title: 'Como trabalhamos: processo de reforma em 5 passos | Junior Reformas',
    description: 'Visita gratuita, planeamento, orçamento detalhado, execução e entrega. Assim trabalhamos cada reforma em Sabadell e Barcelona, sem surpresas.',
  },
};

const STEP_FOTOS = [
  'durante/bano-blanco-durante-02-gallery.webp',
  'durante/bano-blanco-durante-03-gallery.webp',
  'detalles/bano-detalle-alicatado-02-gallery.webp',
  'durante/suelo-nivelacion-durante-01-gallery.webp',
  'despues/bano-mampara-despues-01-gallery.webp',
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/proceso/', ...META[locale], keywords: ['proceso reforma', 'cómo trabajamos reformas sabadell'] });
}

export default async function ProcesoPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <>
      <JsonLd data={howToSchema(locale, t.process.steps)} />
      <SectionWrapper variant="dark">
        <Breadcrumb locale={locale} items={[{ name: t.processPage.h1, path: '/proceso/' }]} />
        <SectionHeader as="h1" badge={t.process.badge} title={t.processPage.h1} description={t.processPage.sub} />
        <ol className="space-y-10">
          {t.process.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 60}>
                <div className="grid gap-6 overflow-hidden rounded-2xl border border-border bg-carbon-light md:grid-cols-[1fr_1.4fr]">
                  <div className="relative min-h-56">
                    <Image src={fotoUrl(STEP_FOTOS[i] ?? STEP_FOTOS[0])} alt={`${step.title} — Junior Reformas`} fill sizes="(max-width: 768px) 100vw, 40vw" loading="lazy" className="object-cover" />
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="font-display text-4xl font-bold text-terracota">{String(i + 1).padStart(2, '0')}</span>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-offwhite">{step.title}</h2>
                    <p className="mt-3 leading-relaxed text-text-secondary">{step.description}</p>
                    <p className="mt-4 flex items-start gap-2 rounded-lg border border-olive/40 bg-olive/10 p-4 text-sm text-sand">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                      {t.processPage.tips[i]}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <CTAButton variant="primary" href={localePath(locale, '/presupuesto')}>
            {t.processPage.cta}
          </CTAButton>
        </div>
      </SectionWrapper>
      <FAQ locale={locale} items={t.processPage.faq} variant="light" />
    </>
  );
}
