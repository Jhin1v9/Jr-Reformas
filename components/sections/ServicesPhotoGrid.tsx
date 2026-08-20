import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import { SERVICES, MAIN_SERVICES } from '@/lib/services';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import ServiceCard from '@/components/shared/ServiceCard';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';

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

      <div className="grid gap-6 lg:grid-cols-3">
        {main.map((s, i) => (
          <Reveal key={s.slug} delay={i * 80}>
            <ServiceCard
              title={s.title}
              description={s.shortDesc}
              href={localePath(locale, `/servicios/${s.slug}`)}
              image={s.heroFoto ? fotoUrl(s.heroFoto) : null}
              gradient={s.gradient}
              variant="hero"
              className="h-full"
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {secondary.map((s, i) => (
          <Reveal key={s.slug} delay={i * 60}>
            <ServiceCard
              title={s.title}
              description={s.shortDesc}
              href={localePath(locale, `/servicios/${s.slug}`)}
              image={s.heroFoto ? fotoUrl(s.heroFoto) : null}
              gradient={s.gradient}
              variant="grid"
              className="h-full"
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/servicios')}>
          {t.servicesGrid.viewAll}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
