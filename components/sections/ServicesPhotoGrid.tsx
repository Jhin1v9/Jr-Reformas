import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import { SERVICES, MAIN_SERVICES } from '@/lib/services';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';
import Image from 'next/image';

interface Props {
  locale: Locale;
}

export default function ServicesPhotoGrid({ locale }: Props) {
  const t = getDictionary(locale);
  const main = MAIN_SERVICES;
  const secondary = SERVICES.filter((s) => !s.main);

  return (
    <SectionWrapper variant="light" id="servicios">
      <SectionHeader
        variant="light"
        badge={t.servicesGrid.badge}
        title={t.servicesGrid.title}
        description={t.servicesGrid.description}
      />

      {/* 3 MAIN em destaque */}
      <div className="grid gap-6 lg:grid-cols-3">
        {main.map((s, i) => (
          <Reveal key={s.slug} delay={i * 80}>
            <ServiceCard service={s} locale={locale} variant="hero" />
          </Reveal>
        ))}
      </div>

      {/* Secundários em grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {secondary.map((s, i) => (
          <Reveal key={s.slug} delay={i * 60}>
            <ServiceCard service={s} locale={locale} variant="grid" />
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}

function ServiceCard({
  service,
  locale,
  variant,
}: {
  service: (typeof SERVICES)[0];
  locale: Locale;
  variant: 'hero' | 'grid';
}) {
  const href = localePath(locale, `/servicios/${service.slug}`);

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl bg-carbon-light ring-1 ring-white/5 transition-all duration-300 hover:ring-terracota/30"
    >
      <div className={`relative overflow-hidden ${variant === 'hero' ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        {service.heroFoto ? (
          <Image
            src={fotoUrl(service.heroFoto)}
            alt={`${service.title} — Junior Reformas`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${
              service.gradient ?? 'from-carbon-mid via-carbon to-carbon-light'
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/95 via-carbon/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {service.main && (
          <span className="mb-2 w-fit rounded-full bg-terracota px-3 py-1 text-xs font-bold uppercase tracking-wider text-offwhite">
            Más solicitado
          </span>
        )}
        <h3 className="font-display text-xl font-bold text-offwhite md:text-2xl">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-sand/90 line-clamp-2">
          {service.shortDesc}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-terracota opacity-0 transition-all duration-300 group-hover:opacity-100">
          Ver proyectos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
