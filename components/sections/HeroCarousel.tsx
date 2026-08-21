'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import CTAButton from '@/components/shared/CTAButton';
import { gsap } from '@/components/hooks/useGSAP';

const HERO_SLIDES = [
  {
    id: 'cocina',
    src: fotoUrl('despues/cocina-gris-hero-01.jpg'),
    alt: 'Cocina reformada en tonos grafito — Junior Reformas',
  },
  {
    id: 'bano',
    src: fotoUrl('despues/bano-marmol-hero-01.jpg'),
    alt: 'Baño de mármol con doble lavabo — Junior Reformas',
  },
  {
    id: 'piso',
    src: fotoUrl('despues/piso-parquet-hero-01.jpg'),
    alt: 'Piso reformado con parquet — Junior Reformas',
  },
  {
    id: 'terraza',
    src: fotoUrl('despues/terraza-hero-01.jpg'),
    alt: 'Terraza reformada con suelo exterior — Junior Reformas',
  },
];

interface Props {
  locale: Locale;
}

export default function HeroCarousel({ locale }: Props) {
  const t = getDictionary(locale);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [go]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8 })
        .from('.hero-title', { y: 60, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4');
    }, content);

    return () => ctx.revert();
  }, []);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden bg-carbon"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/40 to-carbon/80" aria-hidden="true" />

      {/* Conteúdo centralizado */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <span className="hero-badge mb-6 inline-block rounded-full border border-terracota/60 bg-terracota/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracota backdrop-blur-sm">
          {t.hero.badge}
        </span>
        <h1 className="hero-title max-w-4xl font-display text-5xl font-bold leading-[1.05] text-offwhite md:text-6xl lg:text-7xl">
          {t.hero.h1}
        </h1>
        <p className="hero-subtitle mt-6 max-w-2xl text-lg text-sand md:text-xl">{t.hero.sub}</p>
        <div className="hero-cta mt-10 flex flex-col gap-4 sm:flex-row">
          <CTAButton variant="primary" href={localePath(locale, '/presupuesto')} className="px-8 py-4 text-lg">
            {t.hero.ctaPrimary}
          </CTAButton>
          <CTAButton variant="secondary" href={localePath(locale, '/proyectos/galeria')} className="px-8 py-4 text-lg">
            {t.hero.ctaSecondary}
          </CTAButton>
        </div>
      </div>

      {/* Setas laterais */}
      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/30 bg-carbon/40 p-4 text-offwhite backdrop-blur transition-all hover:scale-110 hover:bg-carbon/60 md:flex"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/30 bg-carbon/40 p-4 text-offwhite backdrop-blur transition-all hover:scale-110 hover:bg-carbon/60 md:flex"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-3 rounded-full transition-all ${
              i === index ? 'w-10 bg-terracota' : 'w-3 bg-offwhite/50 hover:bg-offwhite'
            }`}
            aria-label={`Ir al slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce text-offwhite/60 md:block">
        <span className="block h-10 w-6 rounded-full border-2 border-offwhite/40 px-1">
          <span className="mx-auto mt-2 block h-1.5 w-1.5 rounded-full bg-offwhite/80" />
        </span>
      </div>
    </section>
  );
}
