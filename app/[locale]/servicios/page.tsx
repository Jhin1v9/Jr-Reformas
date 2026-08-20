import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { SERVICES } from '@/lib/services';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Reveal from '@/components/shared/Reveal';
import CTAFinal from '@/components/sections/CTAFinal';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Servicios de reforma en Sabadell y Barcelona | Junior Reformas',
    description: 'Reformas integrales, baños, cocinas, suelos, albañilería, electricidad, fontanería y más en Sabadell, Barcelona, Terrassa y Mataró. Presupuesto gratuito.',
  },
  en: {
    title: 'Renovation services in Sabadell and Barcelona | Junior Reformas',
    description: 'Full renovations, bathrooms, kitchens, flooring, masonry, electrics, plumbing and more in Sabadell, Barcelona, Terrassa and Mataró. Free quote.',
  },
  pt: {
    title: 'Serviços de reforma em Sabadell e Barcelona | Junior Reformas',
    description: 'Reformas integrais, casas de banho, cozinhas, pavimentos, alvenaria, eletricidade, canalização e mais em Sabadell, Barcelona, Terrassa e Mataró. Orçamento grátis.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/servicios/', ...META[locale], keywords: ['servicios reforma sabadell', 'empresa reformas barcelona'] });
}

export default async function ServiciosPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <>
      <SectionWrapper variant="light">
        <Breadcrumb locale={locale} variant="light" items={[{ name: t.nav.services, path: '/servicios/' }]} />
        <SectionHeader
          as="h1"
          variant="light"
          badge={t.servicesGrid.badge}
          title={locale === 'es' ? 'Nuestros servicios de reforma' : locale === 'pt' ? 'Os nossos serviços de reforma' : 'Our renovation services'}
          description={t.servicesGrid.description}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link
                  href={localePath(locale, `/servicios/${s.slug}`)}
                  className="group block h-full overflow-hidden rounded-xl border border-carbon/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-terracota/40 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={fotoUrl(s.heroFoto.replace('-hero', '-gallery'))} alt={`${s.title} — Junior Reformas`} fill sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-terracota/10">
                        <Icon className="h-5 w-5 text-terracota" aria-hidden="true" />
                      </span>
                      <h2 className="font-display text-xl font-semibold text-carbon">{s.title}</h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-carbon/70">{s.shortDesc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terracota">
                      {t.servicesGrid.viewMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </SectionWrapper>
      <CTAFinal locale={locale} />
    </>
  );
}
