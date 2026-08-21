'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CarouselSlide {
  id: string;
  content: ReactNode;
}

interface Props {
  slides: CarouselSlide[];
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  slideClassName?: string;
  pauseOnHover?: boolean;
  labels?: {
    previous?: string;
    next?: string;
    slide?: string;
  };
}

const DEFAULT_LABELS = {
  previous: 'Anterior',
  next: 'Siguiente',
  slide: 'Ir al slide',
};

export default function Carousel({
  slides,
  interval = 5000,
  showArrows = true,
  showDots = true,
  className,
  slideClassName,
  pauseOnHover = true,
  labels = {},
}: Props) {
  const l = { ...DEFAULT_LABELS, ...labels };
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goTo = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    timerRef.current = setInterval(() => go(1), interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, interval, isPaused, go]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  if (slides.length === 0) return null;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-in-out',
            i === index ? 'z-10 opacity-100' : 'z-0 opacity-0',
            slideClassName
          )}
          aria-hidden={i !== index}
        >
          {slide.content}
        </div>
      ))}

      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/50 p-2 text-offwhite backdrop-blur transition-all hover:scale-110 hover:bg-carbon/70 active:scale-95 md:left-4"
            aria-label={l.previous}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/50 p-2 text-offwhite backdrop-blur transition-all hover:scale-110 hover:bg-carbon/70 active:scale-95 md:right-4"
            aria-label={l.next}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-1">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              className="flex h-10 w-10 items-center justify-center rounded-full"
              aria-label={`${l.slide} ${i + 1}`}
              aria-current={i === index}
            >
              <span
                className={cn(
                  'block h-2 rounded-full transition-all',
                  i === index ? 'w-8 bg-terracota' : 'w-2 bg-offwhite/50 hover:bg-offwhite'
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
