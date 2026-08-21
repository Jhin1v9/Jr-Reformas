'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import { MAIN_SERVICES } from '@/lib/services';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import { gsap } from '@/components/hooks/useGSAP';

interface Props {
  locale: Locale;
}

export default function ServicesCarousel({ locale }: Props) {
  const t = getDictionary(locale);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.firstElementChild as HTMLElement | null;
    const width = card ? card.offsetWidth + 24 : 400;
    scrollRef.current.scrollBy({ left: dir * width, behavior: 'smooth' });
  };

  return (
    <SectionWrapper variant="dark" id="servicios" className="overflow-hidden">
      <div ref={sectionRef}>
      <SectionHeader
        badge={t.servicesGrid.badge}
        title={t.servicesGrid.title}
        description={t.servicesGrid.description}
      />

      <div className="relative">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-carbon/80 p-3 text-offwhite backdrop-blur transition-all hover:scale-110 hover:bg-carbon lg:flex"
          aria-label={t.common.previous}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-carbon/80 p-3 text-offwhite backdrop-blur transition-all hover:scale-110 hover:bg-carbon lg:flex"
          aria-label={t.common.next}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MAIN_SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={localePath(locale, `/servicios/${service.slug}`)}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative block w-[85vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-carbon-light md:w-[60vw] lg:w-[45vw]"
            >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {service.heroFoto ? (
                    <Image
                      src={fotoUrl(service.heroFoto)}
                      alt={`${service.title} — Junior Reformas`}
                      fill
                      sizes="(max-width: 768px) 85vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${service.gradient ?? 'from-carbon-mid via-carbon to-carbon-light'}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <span className="mb-2 inline-block rounded-full bg-terracota px-3 py-1 text-xs font-bold uppercase tracking-wider text-offwhite">
                    {t.servicesGrid.mostRequested}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-offwhite md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-sand/90 md:text-base">
                    {service.shortDesc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-terracota opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {t.servicesGrid.viewProjects}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center">
        <Link
          href={localePath(locale, '/servicios')}
          className="inline-flex items-center gap-2 rounded-lg border border-sand px-6 py-3 text-sm font-semibold text-sand transition-all hover:border-offwhite hover:text-offwhite"
        >
          {t.servicesGrid.viewAll}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      </div>
    </SectionWrapper>
  );
}
