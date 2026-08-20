import Image from 'next/image';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl, HOME_GALLERY, allPhotos } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';

interface Props {
  locale: Locale;
}

export default function TransformationsGallery({ locale }: Props) {
  const t = getDictionary(locale);
  const metaByFile = new Map(allPhotos().map((p) => [p.sizes.gallery, p]));
  return (
    <SectionWrapper variant="light" id="galeria">
      <SectionHeader variant="light" badge={t.gallery.badge} title={t.gallery.title} description={t.gallery.description} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOME_GALLERY.map((file, i) => {
          const p = metaByFile.get(file);
          return (
            <Reveal key={file} delay={i * 60}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={fotoUrl(file)}
                  alt={p?.alt_text ?? 'Reforma terminada — Junior Reformas'}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon/90 to-transparent px-4 pb-3 pt-12 text-sm font-medium text-offwhite opacity-0 transition-opacity group-hover:opacity-100">
                  {p?.descripcion ?? ''}
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/proyectos/galeria')}>
          {t.gallery.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
