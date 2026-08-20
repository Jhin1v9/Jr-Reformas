import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE, type Locale } from '@/lib/constants';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Breadcrumb from '@/components/shared/Breadcrumb';

interface Props {
  params: { locale: string };
  kind: 'aviso-legal' | 'politica-privacidad' | 'politica-cookies';
}

export function legalMetadata(locale: Locale, kind: Props['kind'], title: string): Metadata {
  return {
    ...pageMetadata({ locale, path: `/${kind}/`, title: `${title} | ${SITE.name}`, description: `${title} — ${SITE.name}` }),
    robots: { index: false },
  };
}

export function LegalPage({ params, kind, title, children }: Props & { title: string; children: React.ReactNode }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  return (
    <SectionWrapper variant="light">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb locale={locale} variant="light" items={[{ name: title, path: `/${kind}/` }]} />
        <h1 className="font-display text-3xl font-bold text-carbon md:text-4xl">{title}</h1>
        <div className="prose-jr mt-8">{children}</div>
        <p className="mt-8 text-sm text-carbon/60">
          {SITE.name} · {SITE.founder} · {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city} · {SITE.email}
        </p>
      </div>
    </SectionWrapper>
  );
}
