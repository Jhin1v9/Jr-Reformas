import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import GalleryMasonry from '@/components/sections/GalleryMasonry';
import CTAFinal from '@/components/sections/CTAFinal';
import { type MasonryItem } from '@/components/shared/MasonryGrid';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Galería de transformaciones reales | Junior Reformas',
    description: 'Fotos reales de nuestras reformas: baños, cocinas, pisos y suelos en Sabadell, Barcelona y alrededores. Antes, durante y después.',
  },
  en: {
    title: 'Gallery of real transformations | Junior Reformas',
    description: 'Real photos of our renovations: bathrooms, kitchens, flats and flooring in Sabadell, Barcelona and surroundings. Before, during and after.',
  },
  pt: {
    title: 'Galeria de transformações reais | Junior Reformas',
    description: 'Fotos reais das nossas reformas: casas de banho, cozinhas, apartamentos e pavimentos em Sabadell, Barcelona e arredores. Antes, durante e depois.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/proyectos/galeria/', ...META[locale], keywords: ['galería reformas sabadell', 'fotos reformas reales'] });
}

const GALLERY_ITEMS: MasonryItem[] = [
  { id: 'c1', src: fotoUrl('despues/galeria-cocina-01.jpg'), alt: 'Cocina moderna gris con encimera oscura', category: 'Cocinas', aspect: 'landscape' },
  { id: 'b1', src: fotoUrl('despues/galeria-bano-01.jpg'), alt: 'Baño de mármol con doble lavabo', category: 'Baños', aspect: 'portrait' },
  { id: 'p1', src: fotoUrl('despues/galeria-piso-01.jpg'), alt: 'Suelo de parquet acabado', category: 'Pisos', aspect: 'landscape' },
  { id: 'b2', src: fotoUrl('despues/galeria-bano-02.jpg'), alt: 'Baño con doble lavabo y espejos LED', category: 'Baños', aspect: 'portrait' },
  { id: 'c2', src: fotoUrl('despues/galeria-cocina-02.jpg'), alt: 'Cocina blanca con encimera de madera', category: 'Cocinas', aspect: 'landscape' },
  { id: 't1', src: fotoUrl('despues/galeria-terraza-01.jpg'), alt: 'Terraza con suelo exterior', category: 'Terrazas', aspect: 'landscape' },
  { id: 'b3', src: fotoUrl('despues/galeria-bano-03.jpg'), alt: 'Ducha moderna en tonos grises', category: 'Baños', aspect: 'portrait' },
  { id: 'd1', src: fotoUrl('despues/galeria-detalle-01.jpg'), alt: 'Detalle de acabado en ducha', category: 'Detalles', aspect: 'square' },
  { id: 'p2', src: fotoUrl('despues/galeria-piso-02.jpg'), alt: 'Suelo hexagonal negro', category: 'Pisos', aspect: 'landscape' },
  { id: 'o1', src: fotoUrl('durante/galeria-obra-01.jpg'), alt: 'Obra en curso: albañilería', category: 'En obra', aspect: 'landscape' },
  { id: 'o2', src: fotoUrl('durante/galeria-obra-02.jpg'), alt: 'Demolición y preparación', category: 'En obra', aspect: 'landscape' },
  { id: 'v1', src: fotoUrl('despues/cocina-gris-hero-01.jpg'), alt: 'Vídeo timelapse de reforma', category: 'Cocinas', type: 'video', videoSrc: '/videos/obra-timelapse-01.mp4', aspect: 'video' },
];

export default async function GaleriaPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);

  return (
    <>
      <SectionWrapper variant="dark">
        <Breadcrumb locale={locale} items={[{ name: t.nav.gallery, path: '/proyectos/galeria/' }]} />
        <SectionHeader as="h1" title={t.gallery.pageTitle} description={t.gallery.pageSub} />
        <GalleryMasonry
          items={GALLERY_ITEMS}
          categories={['Todos', 'Cocinas', 'Baños', 'Pisos', 'Terrazas', 'Detalles', 'En obra']}
          labels={{ all: 'Todos' }}
          columns={3}
        />
      </SectionWrapper>
      <CTAFinal locale={locale} />
    </>
  );
}
