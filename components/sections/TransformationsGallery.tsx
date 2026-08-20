import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl, HOME_GALLERY } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import MasonryGrid, { type MasonryItem } from '@/components/shared/MasonryGrid';

interface Props {
  locale: Locale;
}

export default function TransformationsGallery({ locale }: Props) {
  const t = getDictionary(locale);

  const items: MasonryItem[] = HOME_GALLERY.map((file, i) => ({
    id: `home-gallery-${i}`,
    src: fotoUrl(file),
    alt: `Transformación real — Junior Reformas, Sabadell`,
    category: 'todos',
    aspect: i % 3 === 0 ? 'portrait' : i % 3 === 1 ? 'landscape' : 'square',
  }));

  return (
    <SectionWrapper variant="dark" id="galeria">
      <SectionHeader
        badge={t.gallery.badge}
        title={t.gallery.title}
        description={t.gallery.description}
      />
      <MasonryGrid items={items} columns={3} />
      <div className="mt-12 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/proyectos/galeria')}>
          {t.gallery.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
