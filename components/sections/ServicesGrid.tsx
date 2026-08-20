import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import { HOME_SERVICES } from '@/lib/services';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';

const SERVICE_FOTO: Record<string, string> = {
  'reformas-integrales': 'despues/piso-pasillo-despues-01-gallery.webp',
  'suelos-y-parquet': 'durante/suelo-nivelacion-durante-01-gallery.webp',
  banos: 'despues/bano-marmol-despues-01-gallery.webp',
  cocinas: 'despues/cocina-azul-despues-01-gallery.webp',
  albanileria: 'durante/bano-blanco-durante-01-gallery.webp',
  'locales-comerciales': 'despues/bano-led-despues-01-gallery.webp',
};

interface Props {
  locale: Locale;
}

export default function ServicesGrid({ locale }: Props) {
  const t = getDictionary(locale);
  return (
    <SectionWrapper variant="light" id="servicios">
      <SectionHeader variant="light" badge={t.servicesGrid.badge} title={t.servicesGrid.title} description={t.servicesGrid.description} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.slug} delay={i * 70}>
              <Link
                href={localePath(locale, `/servicios/${s.slug}`)}
                className="group block h-full overflow-hidden rounded-xl border border-carbon/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-terracota/40 hover:shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={fotoUrl(SERVICE_FOTO[s.slug] ?? 'despues/bano-marmol-despues-01-gallery.webp')}
                    alt={`${s.title} — Junior Reformas, Sabadell`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-terracota/10">
                      <Icon className="h-5 w-5 text-terracota" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-carbon">{s.title}</h3>
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
      <div className="mt-12 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/servicios')}>
          {t.servicesGrid.viewAll}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
