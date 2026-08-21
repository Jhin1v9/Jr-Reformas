'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Maximize2, Play } from 'lucide-react';
import Image from 'next/image';
import { gsap } from '@/components/hooks/useGSAP';
import { cn } from '@/lib/utils';
import Lightbox, { type LightboxItem } from './Lightbox';

export interface MasonryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  type?: 'image' | 'video';
  videoSrc?: string;
  aspect?: 'square' | 'portrait' | 'landscape' | 'video';
}

interface LightboxLabels {
  close?: string;
  previous?: string;
  next?: string;
  expanded?: string;
  cta?: string;
  whatsappText?: string;
}

interface Props {
  items: MasonryItem[];
  categories?: string[];
  className?: string;
  columns?: 2 | 3 | 4 | 5;
  compact?: boolean;
  labels?: LightboxLabels;
}

const aspectClasses: Record<string, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
  video: 'aspect-[9/16]',
};

export default function MasonryGrid({
  items,
  categories,
  className,
  columns = 4,
  compact = true,
  labels,
}: Props) {
  const [filter, setFilter] = useState<string>('todos');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredItems = useMemo(
    () => (filter === 'todos' ? items : items.filter((item) => item.category === filter)),
    [items, filter]
  );

  useEffect(() => {
    const grid = gridRef.current;
    const itemEls = itemsRef.current.filter(Boolean);
    if (!grid || itemEls.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, [filter]);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      filteredItems.map((item) => ({
        id: item.id,
        src: item.src,
        alt: item.alt,
        type: item.type,
        videoSrc: item.videoSrc,
      })),
    [filteredItems]
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsOpen(true);
  };

  const next = () => setLightboxIndex((i) => (i + 1) % lightboxItems.length);
  const prev = () => setLightboxIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length);

  // Tailwind CSS columns classes (real masonry via multi-column layout)
  const colClass =
    columns === 5
      ? 'columns-2 sm:columns-3 md:columns-4 lg:columns-5'
      : columns === 4
        ? 'columns-2 sm:columns-3 lg:columns-4'
        : columns === 2
          ? 'columns-2'
          : 'columns-2 sm:columns-3';

  const gapClass = compact ? 'gap-2' : 'gap-4';
  const spaceClass = compact ? 'space-y-2' : 'space-y-4';

  return (
    <div className={className}>
      {categories && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <FilterButton active={filter === 'todos'} onClick={() => setFilter('todos')}>
            Todos
          </FilterButton>
          {categories
            .filter((cat) => cat.toLowerCase() !== 'todos')
            .map((cat) => (
              <FilterButton key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
                {cat}
              </FilterButton>
            ))}
        </div>
      )}

      <div ref={gridRef} className={cn(colClass, gapClass, spaceClass)}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative block w-full overflow-hidden rounded-lg bg-carbon-light text-left"
            >
              {item.type === 'video' && item.videoSrc ? (
                <>
                  <div className={cn('relative w-full', aspectClasses[item.aspect || 'video'])}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-carbon/20 transition-colors group-hover:bg-carbon/40">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-carbon/60 text-offwhite backdrop-blur transition-transform group-hover:scale-110">
                        <Play className="h-5 w-5 fill-current" />
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className={cn('relative w-full', aspectClasses[item.aspect || 'square'])}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Instagram-style hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-carbon/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Maximize2 className="h-6 w-6 text-offwhite" />
                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-offwhite/90">
                  {item.category}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <Lightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={next}
        onPrev={prev}
        labels={labels}
      />
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
        active
          ? 'border-terracota bg-terracota text-offwhite'
          : 'border-border text-text-secondary hover:border-sand hover:text-offwhite'
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
