import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/constants';
import { isLocale, getDictionary } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { allPhotos } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import PhotoGallery from '@/components/sections/PhotoGallery';
import CTAFinal from '@/components/sections/CTAFinal';

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

export default async function GaleriaPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  const photos = allPhotos();
  return (
    <>
      <SectionWrapper variant="dark">
        <Breadcrumb locale={locale} items={[{ name: t.nav.gallery, path: '/proyectos/galeria/' }]} />
        <SectionHeader as="h1" title={t.gallery.pageTitle} description={t.gallery.pageSub} />
        <PhotoGallery
          photos={photos}
          labels={{
            all: t.gallery.filters.all,
            phaseAll: t.gallery.filters.phaseAll,
            categories: {
              COCINA: t.gallery.filters.COCINA,
              BANO: t.gallery.filters.BANO,
              PISO: t.gallery.filters.PISO,
              SUELO: t.gallery.filters.SUELO,
              LOCAL: t.gallery.filters.LOCAL,
            },
            phases: {
              ANTES: t.gallery.filters.ANTES,
              DURANTE: t.gallery.filters.DURANTE,
              DESPUES: t.gallery.filters.DESPUES,
              DETALLE: t.gallery.filters.DETALLE,
            },
            openImage: t.gallery.openImage,
            closeImage: t.gallery.closeImage,
          }}
        />
      </SectionWrapper>
      <CTAFinal locale={locale} />
    </>
  );
}
