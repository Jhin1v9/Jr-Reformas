import Image from 'next/image';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';

const PROCESS_PHOTOS = [
  { file: 'durante/bano-blanco-durante-01-hero.webp', alt: 'Visita técnica y preparación del espacio — Junior Reformas' },
  { file: 'durante/bano-blanco-durante-02-hero.webp', alt: 'Replanteo y mediciones de la reforma — Junior Reformas' },
  { file: 'durante/bano-blanco-durante-03-hero.webp', alt: 'Instalaciones de fontanería y electricidad — Junior Reformas' },
  { file: 'durante/bano-blanco-durante-04-hero.webp', alt: 'Alicatado y acabados en obra — Junior Reformas' },
  { file: 'durante/bano-blanco-durante-05-hero.webp', alt: 'Acabados finales y limpieza de la reforma — Junior Reformas' },
];

interface Props {
  locale: Locale;
}

export default function ProcessPhotoTimeline({ locale }: Props) {
  const t = getDictionary(locale);
  const steps = t.process.steps;

  return (
    <SectionWrapper variant="dark" id="proceso">
      <SectionHeader badge={t.process.badge} title={t.process.title} description={t.process.description} />

      <div className="relative">
        {/* Linha conectora */}
        <div
          className="absolute left-6 top-0 h-full w-0.5 bg-carbon-mid md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        <ol className="relative space-y-16 md:space-y-24">
          {steps.map((step, i) => {
            const photo = PROCESS_PHOTOS[i];
            const isEven = i % 2 === 0;
            return (
              <li key={step.title} className="relative">
                {/* Marcador do timeline */}
                <div
                  className="absolute left-6 top-8 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-terracota bg-carbon md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  aria-hidden="true"
                >
                  <span className="text-xs font-bold text-terracota">{i + 1}</span>
                </div>

                <div className="grid items-center gap-6 pl-16 md:grid-cols-2 md:gap-16 md:pl-0">
                  {/* Foto */}
                  <Reveal delay={i * 100}>
                    <figure
                      className={`group relative aspect-[4/3] overflow-hidden rounded-2xl ${
                        isEven ? 'md:order-1 md:pr-12' : 'md:order-2 md:pl-12'
                      }`}
                    >
                      <Image
                        src={fotoUrl(photo.file)}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 to-transparent" aria-hidden="true" />
                    </figure>
                  </Reveal>

                  {/* Texto */}
                  <Reveal delay={i * 100 + 80}>
                    <div
                      className={`${
                        isEven ? 'md:order-2 md:pl-12 md:text-left' : 'md:order-1 md:pr-12 md:text-right'
                      }`}
                    >
                      <span className="inline-block rounded-full border border-terracota/50 bg-terracota/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-terracota">
                        Paso {i + 1}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-offwhite md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
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
    </SectionWrapper>
  );
}
