'use client';

import { useMemo, useState } from 'react';
import { fotoUrl, type Photo, type Categoria, type Fase } from '@/lib/photos';
import MasonryGrid, { type MasonryItem } from '@/components/shared/MasonryGrid';
import { cn } from '@/lib/utils';

interface FilterLabels {
  all: string;
  phaseAll: string;
  categories: Record<string, string>;
  phases: Record<string, string>;
}

interface Props {
  photos: Photo[];
  labels: FilterLabels;
  videos?: { src: string; poster: string; category: Categoria; alt: string }[];
  showPhaseFilter?: boolean;
  columns?: 2 | 3 | 4;
}

const CATS: Categoria[] = ['COCINA', 'BANO', 'PISO', 'SUELO', 'LOCAL'];
const PHASES: Fase[] = ['ANTES', 'DURANTE', 'DESPUES', 'DETALLE'];

export default function GalleryMasonry({
  photos,
  labels,
  videos = [],
  showPhaseFilter = true,
  columns = 3,
}: Props) {
  const [cat, setCat] = useState<Categoria | null>(null);
  const [phase, setPhase] = useState<Fase | null>(null);

  const filteredPhotos = useMemo(
    () => photos.filter((p) => (!cat || p.categoria === cat) && (!phase || p.fase === phase)),
    [photos, cat, phase]
  );

  const items: MasonryItem[] = useMemo(() => {
    const photoItems: MasonryItem[] = filteredPhotos.map((p) => ({
      id: p.id,
      src: fotoUrl(p.sizes.gallery),
      alt: p.alt_text,
      category: p.categoria,
      aspect: p.height > p.width ? 'portrait' : p.height < p.width * 0.75 ? 'landscape' : 'square',
    }));
    const videoItems: MasonryItem[] = videos
      .filter((v) => !cat || v.category === cat)
      .map((v, i) => ({
        id: `video-${i}`,
        src: v.poster,
        alt: v.alt,
        category: v.category,
        type: 'video',
        videoSrc: v.src,
        aspect: 'video',
      }));
    return [...photoItems, ...videoItems];
  }, [filteredPhotos, videos, cat]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <FilterButton active={cat === null} onClick={() => setCat(null)}>
          {labels.all}
        </FilterButton>
        {CATS.map((c) => (
          <FilterButton key={c} active={cat === c} onClick={() => setCat(c)}>
            {labels.categories[c] ?? c}
          </FilterButton>
        ))}
        {showPhaseFilter ? (
          <>
            <span className="mx-2 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
            <FilterButton active={phase === null} onClick={() => setPhase(null)}>
              {labels.phaseAll}
            </FilterButton>
            {PHASES.map((f) => (
              <FilterButton key={f} active={phase === f} onClick={() => setPhase(f)}>
                {labels.phases[f] ?? f}
              </FilterButton>
            ))}
          </>
        ) : null}
      </div>

      <MasonryGrid items={items} categories={undefined} columns={columns} />
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
        'rounded-full border px-4 py-2 text-sm font-medium transition-all',
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
