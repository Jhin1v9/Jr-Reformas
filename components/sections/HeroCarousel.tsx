import { ArrowRight, BadgeCheck, Clock, MessageCircle } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import Carousel from '@/components/shared/Carousel';
import CTAButton from '@/components/shared/CTAButton';

const HERO_VIDEO = '/videos/WhatsApp Video 2026-08-11 at 18.15.19 (1).mp4';
const HERO_POSTER = fotoUrl('despues/cocina-negra-despues-01-hero.webp');

const HERO_SLIDES = [
  { id: 'video', type: 'video' as const },
  { id: 'cocina', src: fotoUrl('despues/cocina-negra-despues-01-hero.webp'), alt: 'Cocina reformada en tonos grafito con iluminación LED — Junior Reformas' },
  { id: 'bano-marmol', src: fotoUrl('despues/bano-marmol-despues-02-hero.webp'), alt: 'Baño de mármol con doble lavabo y ducha — Junior Reformas' },
  { id: 'piso', src: fotoUrl('despues/piso-pasillo-despues-01-hero.webp'), alt: 'Piso reformado: pasillo moderno y luminoso — Junior Reformas' },
  { id: 'bano-mampara', src: fotoUrl('despues/bano-mampara-despues-01-hero.webp'), alt: 'Baño con mampara de cristal y acabados premium — Junior Reformas' },
];

interface Props {
  locale: Locale;
}

export default function HeroCarousel({ locale }: Props) {
  const t = getDictionary(locale);
  const badges = [
    { icon: BadgeCheck, label: t.hero.badge1 },
    { icon: Clock, label: t.hero.badge2 },
    { icon: MessageCircle, label: t.hero.badge3 },
  ];

  const slides = HERO_SLIDES.map((slide) => ({
    id: slide.id,
    content:
      slide.type === 'video' ? (
        <div className="absolute inset-0 bg-carbon">
          <video
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.src})` }}
          role="img"
          aria-label={slide.alt}
        />
      ),
  }));

  return (
    <section className="relative isolate h-[85vh] min-h-[600px] overflow-hidden bg-carbon md:h-[90vh]">
      <Carousel
        slides={slides}
        interval={6000}
        showArrows={false}
        showDots={true}
        className="absolute inset-0 h-full w-full"
        slideClassName="h-full w-full"
        pauseOnHover={false}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/80 to-carbon/40 md:via-carbon/75" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-carbon/80 via-transparent to-carbon/30" aria-hidden="true" />

      <div className="mx-auto flex h-full w-full max-w-content flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-6 inline-block rounded-full border border-terracota/50 bg-terracota/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-terracota backdrop-blur-sm">
            {t.hero.badge}
          </span>
          <h1 className="text-4xl font-bold leading-[1.1] text-offwhite md:text-5xl lg:text-6xl">
            {t.hero.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton variant="primary" href={localePath(locale, '/presupuesto')}>
              {t.hero.ctaPrimary}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </CTAButton>
            <CTAButton variant="secondary" href={localePath(locale, '/proyectos/galeria')}>
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
