'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { Photo, Categoria, Fase } from '@/lib/photos';
import { fotoUrl } from '@/lib/photos';

interface FilterLabels {
  all: string;
  phaseAll: string;
  categories: Record<string, string>;
  phases: Record<string, string>;
  openImage: string;
  closeImage: string;
}

interface Props {
  photos: Photo[];
  labels: FilterLabels;
  showPhaseFilter?: boolean;
}

const CATS: Categoria[] = ['COCINA', 'BANO', 'PISO', 'SUELO', 'LOCAL'];
const PHASES: Fase[] = ['DURANTE', 'DESPUES', 'DETALLE'];

export default function PhotoGallery({ photos, labels, showPhaseFilter = true }: Props) {
  const [cat, setCat] = useState<Categoria | null>(null);
  const [phase, setPhase] = useState<Fase | null>(null);
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = photos.filter((p) => (!cat || p.categoria === cat) && (!phase || p.fase === phase));

  const chip = (active: boolean): string =>
    `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'border-terracota bg-terracota text-offwhite' : 'border-border text-text-secondary hover:border-sand hover:text-offwhite'
    }`;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setCat(null)} className={chip(cat === null)} aria-pressed={cat === null}>
          {labels.all}
        </button>
        {CATS.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className={chip(cat === c)} aria-pressed={cat === c}>
            {labels.categories[c] ?? c}
          </button>
        ))}
        {showPhaseFilter ? (
          <>
            <span className="mx-2 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
            <button type="button" onClick={() => setPhase(null)} className={chip(phase === null)} aria-pressed={phase === null}>
              {labels.phaseAll}
            </button>
            {PHASES.map((f) => (
              <button key={f} type="button" onClick={() => setPhase(f)} className={chip(phase === f)} aria-pressed={phase === f}>
                {labels.phases[f] ?? f}
              </button>
            ))}
          </>
        ) : null}
      </div>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {filtered.map((p) => (
          <li key={p.id} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setLightbox(p)}
              aria-label={`${labels.openImage}: ${p.alt_text}`}
              className="group relative block w-full overflow-hidden rounded-xl border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracota"
            >
              <Image
                src={fotoUrl(p.sizes.gallery)}
                alt={p.alt_text}
                width={800}
                height={Math.round((800 * p.height) / p.width)}
                loading="lazy"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-carbon/90 to-transparent px-4 pb-3 pt-10 text-left text-sm font-medium text-offwhite opacity-0 transition-opacity group-hover:opacity-100">
                {p.descripcion}
                <span className="ml-2 shrink-0 rounded bg-terracota px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  {labels.phases[p.fase] ?? p.fase}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt_text}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={labels.closeImage}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-carbon-light text-offwhite hover:border-terracota"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={fotoUrl(lightbox.sizes.hero)}
              alt={lightbox.alt_text}
              width={1600}
              height={Math.round((1600 * lightbox.height) / lightbox.width)}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-text-secondary">{lightbox.descripcion}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
