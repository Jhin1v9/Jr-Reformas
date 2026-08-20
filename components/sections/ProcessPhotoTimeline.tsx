'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';

const PROCESS_PHOTOS = [
  { file: 'durante/proceso-visita.jpg', alt: 'Visita técnica al espacio — Junior Reformas' },
  { file: 'durante/proceso-planificacion.jpg', alt: 'Selección de materiales y planificación — Junior Reformas' },
  { file: 'durante/proceso-presupuesto.jpg', alt: 'Preparación del presupuesto y obra — Junior Reformas' },
  { file: 'durante/proceso-ejecucion.jpg', alt: 'Ejecución de la obra — Junior Reformas' },
  { file: 'despues/proceso-entrega.jpg', alt: 'Ambiente terminado y entregado — Junior Reformas' },
];

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;
      setProgress(Math.max(0, Math.min(1, current / total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { ref, progress };
}

interface Props {
  locale: Locale;
}

export default function ProcessPhotoTimeline({ locale }: Props) {
  const t = getDictionary(locale);
  const steps = t.process.steps;
  const { ref, progress } = useScrollProgress();

  return (
    <SectionWrapper variant="dark" id="proceso" className="overflow-hidden">
      <div ref={ref}>
        <SectionHeader badge={t.process.badge} title={t.process.title} description={t.process.description} />

        <div className="relative mt-12 md:mt-16">
          {/* Linha conectora de fundo */}
          <div
            className="absolute left-6 top-0 hidden h-0.5 w-[calc(100%-3rem)] bg-carbon-mid md:left-0 md:top-24 md:block md:w-full"
            aria-hidden="true"
          />
          {/* Linha conectora animada */}
          <div
            className="absolute left-6 top-0 hidden h-0.5 bg-terracota transition-all duration-300 md:left-0 md:top-24 md:block"
            style={{ width: `${progress * 100}%` }}
            aria-hidden="true"
          />

          <ol className="relative space-y-12 md:grid md:grid-cols-5 md:gap-6 md:space-y-0">
            {steps.map((step, i) => {
              const photo = PROCESS_PHOTOS[i];
              return (
                <li key={step.title} className="relative">
                  <Reveal delay={i * 120}>
                    <div className="flex gap-6 md:flex-col md:items-center md:text-center">
                      {/* Número */}
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-terracota bg-carbon shadow-lg shadow-terracota/10">
                        <span className="text-lg font-bold text-terracota">{i + 1}</span>
                      </div>

                      {/* Foto */}
                      <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl md:mt-6">
                        <Image
                          src={fotoUrl(photo.file)}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 20vw"
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent" aria-hidden="true" />
                      </figure>

                      {/* Texto */}
                      <div className="md:mt-5">
                        <h3 className="font-display text-lg font-semibold text-offwhite md:text-xl">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 text-center">
          <CTAButton variant="primary" href={localePath(locale, '/proceso')}>
            {t.processPage.cta}
          </CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
