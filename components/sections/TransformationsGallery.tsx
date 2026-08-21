import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import GalleryMasonry from '@/components/sections/GalleryMasonry';
import { type MasonryItem } from '@/components/shared/MasonryGrid';

interface Props {
  locale: Locale;
}

const INSTAGRAM_ITEMS: MasonryItem[] = [
  { id: 'i1', src: fotoUrl('despues/galeria-cocina-01.jpg'), alt: 'Cocina moderna gris', category: 'Cocinas', aspect: 'landscape' },
  { id: 'i2', src: fotoUrl('despues/galeria-bano-01.jpg'), alt: 'Baño de mármol', category: 'Baños', aspect: 'portrait' },
  { id: 'i3', src: fotoUrl('despues/galeria-piso-01.jpg'), alt: 'Parquet acabado', category: 'Pisos', aspect: 'landscape' },
  { id: 'i4', src: fotoUrl('despues/galeria-bano-02.jpg'), alt: 'Baño con doble lavabo', category: 'Baños', aspect: 'portrait' },
  { id: 'i5', src: fotoUrl('despues/galeria-cocina-02.jpg'), alt: 'Cocina blanca con encimera madera', category: 'Cocinas', aspect: 'landscape' },
  { id: 'i6', src: fotoUrl('despues/galeria-terraza-01.jpg'), alt: 'Terraza reformada', category: 'Terrazas', aspect: 'landscape' },
  { id: 'i7', src: fotoUrl('despues/galeria-bano-03.jpg'), alt: 'Ducha moderna', category: 'Baños', aspect: 'portrait' },
  { id: 'i8', src: fotoUrl('despues/galeria-detalle-01.jpg'), alt: 'Detalle de acabado', category: 'Detalles', aspect: 'square' },
  { id: 'i9', src: fotoUrl('despues/galeria-piso-02.jpg'), alt: 'Suelo hexagonal negro', category: 'Pisos', aspect: 'landscape' },
  { id: 'i10', src: fotoUrl('durante/galeria-obra-01.jpg'), alt: 'Obra en curso', category: 'En obra', aspect: 'landscape' },
  { id: 'i11', src: fotoUrl('despues/cocina-gris-hero-01.jpg'), alt: 'Timelapse reforma cocina', category: 'Cocinas', type: 'video', videoSrc: '/videos/obra-timelapse-01.mp4', aspect: 'video' },
  { id: 'i12', src: fotoUrl('durante/galeria-obra-02.jpg'), alt: 'Demolición y preparación', category: 'En obra', aspect: 'landscape' },
];

export default function TransformationsGallery({ locale }: Props) {
  const t = getDictionary(locale);

  return (
    <SectionWrapper variant="light" id="galeria">
      <SectionHeader
        variant="light"
        badge={t.gallery.badge}
        title={t.gallery.title}
        description={t.gallery.description}
      />
      <GalleryMasonry
        items={INSTAGRAM_ITEMS}
        categories={['Cocinas', 'Baños', 'Pisos', 'Terrazas', 'Detalles', 'En obra']}
        columns={4}
        compact
        labels={{
          all: t.gallery.filters.all,
          close: t.lightbox.close,
          previous: t.lightbox.previous,
          next: t.lightbox.next,
          expanded: t.lightbox.expanded,
          cta: t.lightbox.cta,
          whatsappText: t.lightbox.whatsappText,
        }}
      />
      <div className="mt-10 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/proyectos/galeria')}>
          {t.gallery.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
