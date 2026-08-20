import photosMeta from '@/public/fotos/metadata.json';

export type Fase = 'ANTES' | 'DURANTE' | 'DESPUES' | 'DETALLE' | 'EQUIPO' | 'MATERIAL';
export type Categoria = 'COCINA' | 'BANO' | 'PISO' | 'LOCAL' | 'EXTERIOR' | 'INSTAL' | 'DEMO' | 'SUELO';
export type Calidad = 'HQ' | 'MQ' | 'LQ';

export interface Photo {
  id: string;
  original_filename: string;
  new_filename: string;
  fase: Fase;
  categoria: Categoria;
  calidad: Calidad;
  localidad: 'SAB' | 'BCN' | 'TER' | 'MAT' | 'GEN';
  descripcion: string;
  width: number;
  height: number;
  tiene_par: boolean;
  par_id: string | null;
  alt_text: string;
  sizes: { thumb: string; gallery: string; hero: string };
}

export interface PhotoPair {
  par_id: string;
  antes_id: string;
  despues_id: string;
  antes_file: string;
  despues_file: string;
  categoria: Categoria;
  localidad: string;
  descripcion: string;
}

interface PhotosMeta {
  project: string;
  total_photos: number;
  date_classified: string;
  photos: Photo[];
  pares: PhotoPair[];
}

const meta = photosMeta as unknown as PhotosMeta;

/** Public URL helper — foto files live under /fotos/<folder>/<file> */
export function fotoUrl(rel: string): string {
  return `/fotos/${rel}`;
}

export function allPhotos(): Photo[] {
  return meta.photos.filter((p) => p.calidad !== 'LQ');
}

export function getPhotos(filter: { fase?: Fase; categoria?: Categoria; calidad?: Calidad }): Photo[] {
  return allPhotos().filter(
    (p) =>
      (!filter.fase || p.fase === filter.fase) &&
      (!filter.categoria || p.categoria === filter.categoria) &&
      (!filter.calidad || p.calidad === filter.calidad)
  );
}

export function getPairs(): PhotoPair[] {
  return meta.pares;
}

export const HERO_HOME = 'despues/cocina-negra-despues-01-hero.webp';
export const HERO_BANOS = 'despues/bano-mampara-despues-01-hero.webp';
export const HERO_COCINAS = 'despues/cocina-azul-despues-01-hero.webp';
export const HERO_INTEGRALES = 'despues/cocina-negra-despues-01-hero.webp';
export const HERO_SUELOS = 'despues/bano-marmol-despues-01-hero.webp';
export const CTA_FINAL_BG = 'despues/bano-marmol-despues-02-hero.webp';

export const HOME_GALLERY: string[] = [
  'despues/bano-marmol-despues-02-gallery.webp',
  'despues/bano-doble-lavabo-despues-01-gallery.webp',
  'despues/bano-led-despues-01-gallery.webp',
  'despues/cocina-azul-despues-01-gallery.webp',
  'despues/cocina-negra-despues-01-gallery.webp',
  'despues/bano-mampara-despues-01-gallery.webp',
  'despues/bano-completo-despues-02-gallery.webp',
  'despues/bano-gris-despues-01-gallery.webp',
];
