'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
}

/** Interactive before/after comparison slider with draggable handle. */
export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt, beforeLabel, afterLabel, caption }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
    const move = (ev: PointerEvent): void => update(ev.clientX);
    const up = (): void => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 4));
  };

  return (
    <figure>
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-label={caption}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-border shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracota"
      >
        <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={beforeSrc} alt={beforeAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-offwhite" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-terracota text-offwhite shadow-lg">
            <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-md bg-carbon/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-offwhite">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 rounded-md bg-terracota px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-offwhite">
          {afterLabel}
        </span>
      </div>
      <figcaption className="mt-3 text-center text-sm font-medium text-carbon/70">{caption}</figcaption>
    </figure>
  );
}
