import Image from 'next/image';
import { ArrowRight, BadgeCheck, Clock, MessageCircle } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl, HERO_HOME } from '@/lib/photos';
import CTAButton from '@/components/shared/CTAButton';

interface Props {
  locale: Locale;
}

export default function Hero({ locale }: Props) {
  const t = getDictionary(locale);
  const badges = [
    { icon: BadgeCheck, label: t.hero.badge1 },
    { icon: Clock, label: t.hero.badge2 },
    { icon: MessageCircle, label: t.hero.badge3 },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-carbon">
      <Image
        src={fotoUrl(HERO_HOME)}
        alt="Reforma integral terminada: cocina moderna en tonos grafito con iluminación LED — Junior Reformas, Sabadell"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/85 to-carbon/40" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-content flex-col justify-center px-4 py-24 sm:px-6 md:py-36 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-[1.1] text-offwhite md:text-5xl lg:text-6xl">{t.hero.h1}</h1>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">{t.hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton variant="primary" href={localePath(locale, '/presupuesto')}>
              {t.hero.ctaPrimary}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </CTAButton>
            <CTAButton variant="secondary" href={localePath(locale, '/antes-y-despues')}>
              {t.hero.ctaSecondary}
            </CTAButton>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-border bg-carbon/70 px-4 py-2 text-sm font-medium text-sand backdrop-blur"
              >
                <Icon className="h-4 w-4 text-terracota" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
