'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from '@/components/hooks/useGSAP';
import { cn } from '@/lib/utils';

export interface AfterSlide {
  src: string;
  alt: string;
  service: string;
  location: string;
}

interface Props {
  slides: AfterSlide[];
  className?: string;
  aspectClass?: string;
  autoplay?: boolean;
  interval?: number;
  labels?: {
    previous?: string;
    next?: string;
    slide?: string;
  };
}

const DEFAULT_LABELS = {
  previous: 'Anterior',
  next: 'Siguiente',
  slide: 'Ir a la transformación',
};

export default function AfterCarousel({
  slides,
  className,
  aspectClass = 'aspect-[16/9] md:aspect-[21/9]',
  autoplay = true,
  interval = 4000,
  labels = {},
}: Props) {
  const l = { ...DEFAULT_LABELS, ...labels };
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoplay, interval, next, slides.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (slides.length === 0) return null;

  return (
    <div ref={sectionRef} className={cn('relative', className)}>
      <div className={cn('relative overflow-hidden rounded-2xl', aspectClass)}>
        {slides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              i === active ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/20 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="inline-block rounded-full bg-terracota px-3 py-1 text-xs font-semibold uppercase tracking-wider text-offwhite">
                {slide.service}
              </span>
              <p className="mt-2 font-display text-lg font-medium text-white md:text-2xl">{slide.location}</p>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label={l.previous}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-carbon shadow-lg transition-all hover:bg-white hover:scale-110 md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={l.next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-carbon shadow-lg transition-all hover:bg-white hover:scale-110 md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${l.slide} ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === active ? 'w-8 bg-terracota' : 'w-2 bg-carbon/30 dark:bg-white/30'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
