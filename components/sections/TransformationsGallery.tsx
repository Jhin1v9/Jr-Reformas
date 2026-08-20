import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import MasonryGrid, { type MasonryItem } from '@/components/shared/MasonryGrid';

interface Props {
  locale: Locale;
}

export default function TransformationsGallery({ locale }: Props) {
  const t = getDictionary(locale);

  const items: MasonryItem[] = [
    { id: 'g1', src: fotoUrl('despues/galeria-cocina-01.jpg'), alt: 'Cocina reformada', category: 'COCINA', aspect: 'landscape' },
    { id: 'g2', src: fotoUrl('despues/galeria-bano-01.jpg'), alt: 'Baño de mármol', category: 'BANO', aspect: 'portrait' },
    { id: 'g3', src: fotoUrl('despues/galeria-piso-01.jpg'), alt: 'Parquet instalado', category: 'PISO', aspect: 'landscape' },
    { id: 'g4', src: fotoUrl('despues/galeria-bano-02.jpg'), alt: 'Baño con doble lavabo', category: 'BANO', aspect: 'portrait' },
    { id: 'g5', src: fotoUrl('despues/galeria-cocina-02.jpg'), alt: 'Cocina blanca con encimera de madera', category: 'COCINA', aspect: 'landscape' },
    { id: 'g6', src: fotoUrl('despues/galeria-terraza-01.jpg'), alt: 'Terraza reformada', category: 'EXTERIOR', aspect: 'landscape' },
    { id: 'g7', src: fotoUrl('despues/galeria-detalle-01.jpg'), alt: 'Detalle de acabado', category: 'DETALLE', aspect: 'square' },
    { id: 'g8', src: fotoUrl('despues/galeria-bano-03.jpg'), alt: 'Ducha moderna', category: 'BANO', aspect: 'portrait' },
  ];

  return (
    <SectionWrapper variant="light" id="galeria">
      <SectionHeader
        variant="light"
        badge={t.gallery.badge}
        title={t.gallery.title}
        description={t.gallery.description}
      />
      <MasonryGrid items={items} columns={4} />
      <div className="mt-12 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/proyectos/galeria')}>
          {t.gallery.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
