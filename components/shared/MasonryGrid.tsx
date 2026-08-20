'use client';

import { useState, useMemo } from 'react';
import PhotoCard from './PhotoCard';
import VideoCard from './VideoCard';
import Lightbox, { type LightboxItem } from './Lightbox';
import { cn } from '@/lib/utils';

export interface MasonryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  type?: 'image' | 'video';
  videoSrc?: string;
  aspect?: 'square' | 'portrait' | 'landscape' | 'video';
}

interface Props {
  items: MasonryItem[];
  categories?: string[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export default function MasonryGrid({ items, categories, className, columns = 3 }: Props) {
  const [filter, setFilter] = useState<string>('todos');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = useMemo(
    () => (filter === 'todos' ? items : items.filter((item) => item.category === filter)),
    [items, filter]
  );

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
  const prev = () =>
    setLightboxIndex((i) => (i - 1 + lightboxItems.length) % lightboxItems.length);

  const colCount = columns === 4 ? 'md:grid-cols-4' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <div className={className}>
      {categories && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <FilterButton active={filter === 'todos'} onClick={() => setFilter('todos')}>
            Todos
          </FilterButton>
          {categories.map((cat) => (
            <FilterButton key={cat} active={filter === cat} onClick={() => setFilter(cat)}>
              {cat}
            </FilterButton>
          ))}
        </div>
      )}

      <div className={cn('columns-1 gap-4 space-y-4', colCount)}>
        {filteredItems.map((item, index) =>
          item.type === 'video' && item.videoSrc ? (
            <VideoCard
              key={item.id}
              src={item.videoSrc}
              poster={item.src}
              aspect={item.aspect || 'video'}
              className="break-inside-avoid"
              onClick={() => openLightbox(index)}
            />
          ) : (
            <PhotoCard
              key={item.id}
              src={item.src}
              alt={item.alt}
              aspect={item.aspect || 'square'}
              className="break-inside-avoid"
              onClick={() => openLightbox(index)}
            />
          )
        )}
      </div>

      <Lightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={next}
        onPrev={prev}
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
        'rounded-full border px-5 py-2 text-sm font-medium transition-all',
        active
          ? 'border-terracota bg-terracota text-offwhite'
          : 'border-sand/30 bg-transparent text-sand hover:border-offwhite hover:text-offwhite'
      )}
    >
      {children}
    </button>
  );
}
