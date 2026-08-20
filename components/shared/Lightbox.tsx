'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  type?: 'image' | 'video';
  videoSrc?: string;
}

interface Props {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ items, currentIndex, isOpen, onClose, onNext, onPrev }: Props) {
  const current = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !current) return null;

  const total = items.length;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/60 text-offwhite transition-all hover:bg-carbon/80"
        aria-label="Cerrar"
      >
        <X className="h-6 w-6" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/60 p-3 text-offwhite transition-all hover:bg-carbon/80 md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/60 p-3 text-offwhite transition-all hover:bg-carbon/80 md:flex"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 py-16 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          {current.type === 'video' && current.videoSrc ? (
            <video
              src={current.videoSrc}
              controls
              autoPlay
              className="h-full w-full rounded-lg object-contain"
            />
          ) : (
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          )}
        </div>

        {total > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium tracking-widest text-offwhite/70">
            {currentIndex + 1} / {total}
          </div>
        )}
      </div>
    </div>
  );
}
