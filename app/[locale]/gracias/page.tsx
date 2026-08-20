import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2, Phone, Instagram } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import SectionWrapper from '@/components/shared/SectionWrapper';
import CTAButton from '@/components/shared/CTAButton';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return {
    ...pageMetadata({
      locale,
      path: '/gracias/',
      title: locale === 'es' ? '¡Gracias! | Junior Reformas' : locale === 'pt' ? 'Obrigado! | Junior Reformas' : 'Thank you! | Junior Reformas',
      description: 'Solicitud recibida. Te contactamos en menos de 24h.',
    }),
    robots: { index: false, follow: false },
  };
}

export default async function GraciasPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <SectionWrapper variant="dark" className="min-h-[70vh]">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-olive" aria-hidden="true" />
        <h1 className="mt-6 font-display text-3xl font-bold text-offwhite md:text-4xl">{t.thanks.h1}</h1>
        <p className="mt-4 text-lg text-text-secondary">{t.thanks.sub}</p>

        <ol className="mt-10 space-y-3 text-left">
          <li className="text-sm font-semibold uppercase tracking-widest text-sand">{t.thanks.nextSteps}</li>
          {t.thanks.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-xl border border-border bg-carbon-light p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracota text-sm font-bold text-offwhite">{i + 1}</span>
              <span className="text-sm text-text-secondary">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <CTAButton variant="whatsapp" external href={SITE.whatsapp} ariaLabel={t.whatsapp.ariaLabel}>
            {t.thanks.ctaWhatsapp}
          </CTAButton>
          <CTAButton variant="secondary" href={localePath(locale, '/proyectos/galeria')}>
            {t.thanks.ctaProjects}
          </CTAButton>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-text-muted">
          <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-terracota">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-terracota">
            <Instagram className="h-4 w-4" aria-hidden="true" />
            {SITE.instagramHandle}
          </a>
        </div>
        <p className="mt-6">
          <CTAButton variant="secondary" href={localePath(locale, '/blog')}>
            {t.thanks.ctaBlog}
          </CTAButton>
        </p>
      </div>
    </SectionWrapper>
  );
}
