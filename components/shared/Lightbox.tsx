'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  type?: 'image' | 'video';
  videoSrc?: string;
}

interface Labels {
  close: string;
  previous: string;
  next: string;
  expanded: string;
  cta: string;
  whatsappText: string;
}

interface Props {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  labels?: Partial<Labels>;
}

const DEFAULT_LABELS: Labels = {
  close: 'Cerrar',
  previous: 'Anterior',
  next: 'Siguiente',
  expanded: 'Vista ampliada',
  cta: 'Quiero este estilo',
  whatsappText: 'Hola Junior, vi esta obra en jr-reformas.com y quiero algo similar.',
};

export default function Lightbox({ items, currentIndex, isOpen, onClose, onNext, onPrev, labels = {} }: Props) {
  const l = { ...DEFAULT_LABELS, ...labels };
  const current = items[currentIndex];
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? onNext() : onPrev();
    }
    setTouchStart(null);
  };

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
  const whatsappMessage = encodeURIComponent(l.whatsappText);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-carbon/95 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={l.expanded}
    >
      {/* Header com contador e fechar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-4 md:px-8">
        <div className="text-sm font-medium tracking-widest text-offwhite/80">
          {currentIndex + 1} <span className="text-offwhite/40">/</span> {total}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/60 text-offwhite transition-all hover:bg-carbon/80"
          aria-label={l.close}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/60 p-2 text-offwhite transition-all hover:scale-110 hover:bg-carbon/80 active:scale-95 md:left-4"
            aria-label={l.previous}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-offwhite/20 bg-carbon/60 p-2 text-offwhite transition-all hover:scale-110 hover:bg-carbon/80 active:scale-95 md:right-4"
            aria-label={l.next}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div
        className="relative flex h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-4 md:h-[75vh] md:px-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {current.type === 'video' && current.videoSrc ? (
          <video
            src={current.videoSrc}
            controls
            autoPlay
            className="max-h-full max-w-full rounded-lg"
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

      {/* Footer com legenda e CTA */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-4 bg-gradient-to-t from-carbon to-transparent px-4 pb-8 pt-16 text-center">
        <p className="max-w-xl text-base font-medium text-offwhite md:text-lg">{current.alt}</p>
        <a
          href={`${SITE.whatsapp}&text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          {l.cta}
        </a>
      </div>
    </div>
  );
}
