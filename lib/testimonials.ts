export interface Testimonial {
  id: string;
  stars: 5;
  text: string;
  name: string;
  city: string;
  projectType: string;
  date: string;
  dateISO: string;
  source: 'google' | 'prontopro';
  verified: boolean;
}

/** Reseñas reales extraídas del perfil de Google/ProntoPro de Junior Reformas (2025-2026). */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    stars: 5,
    text: 'Muy buen trabajo, me ha cambiado dos bañeras por platos de ducha y alicatado todas las paredes de la zona de la ducha.',
    name: 'Jose Maria M.',
    city: 'Barcelona y alrededores',
    projectType: 'Reforma integral de baño',
    date: 'Julio 2026',
    dateISO: '2026-07-23',
    source: 'prontopro',
    verified: true,
  },
  {
    id: 't2',
    stars: 5,
    text: 'Excelente servicio. Junior es una persona super responsable, detallista en su trabajo y educado.',
    name: 'Cesar D.',
    city: 'Barcelona y alrededores',
    projectType: 'Reforma integral de baño',
    date: 'Julio 2026',
    dateISO: '2026-07-08',
    source: 'prontopro',
    verified: true,
  },
  {
    id: 't3',
    stars: 5,
    text: 'Ha realizado la reforma de mi apartamento: suelo, paredes, luz, fontanería, cocina y baño completo. Es una persona seria y trabajadora.',
    name: 'Manuel V.',
    city: 'Barcelona y alrededores',
    projectType: 'Reforma integral de vivienda',
    date: 'Noviembre 2025',
    dateISO: '2025-11-16',
    source: 'prontopro',
    verified: true,
  },
  {
    id: 't4',
    stars: 5,
    text: 'Recomendable. Trabajo de demolición de tabique bien ejecutado y dentro de plazo.',
    name: 'Fran A.',
    city: 'Barcelona y alrededores',
    projectType: 'Tirar tabique',
    date: 'Octubre 2025',
    dateISO: '2025-10-24',
    source: 'prontopro',
    verified: true,
  },
  {
    id: 't5',
    stars: 5,
    text: 'Muy buen trato por parte de Junior, precio competitivo y lo ha puesto todo muy fácil.',
    name: 'Carlos L.',
    city: 'Barcelona y alrededores',
    projectType: 'Reforma integral de vivienda',
    date: 'Agosto 2025',
    dateISO: '2025-08-13',
    source: 'prontopro',
    verified: true,
  },
  {
    id: 't6',
    stars: 5,
    text: 'Junior es una excelente persona y paleta. Estamos muy contentos con el trabajo que ha realizado, ha quedado genial.',
    name: 'Francisco F.',
    city: 'Barcelona y alrededores',
    projectType: 'Cambiar azulejos de baño',
    date: 'Julio 2025',
    dateISO: '2025-07-26',
    source: 'prontopro',
    verified: true,
  },
  {
    id: 't7',
    stars: 5,
    text: 'Es un paleta muy bueno. A mí me ha puesto racholas en el cuarto de baño. A parte es una persona que hace de todo.',
    name: 'Asunción S.',
    city: 'Barcelona y alrededores',
    projectType: 'Cambiar azulejos de baño',
    date: 'Julio 2025',
    dateISO: '2025-07-03',
    source: 'prontopro',
    verified: true,
  },
  {
    id: 't8',
    stars: 5,
    text: 'Junior es muy profesional, detallista y ordenado. El trabajo realizado ha quedado muy bien, estamos muy satisfechos.',
    name: 'Eva O.',
    city: 'Barcelona y alrededores',
    projectType: 'Reparación de paredes',
    date: 'Junio 2025',
    dateISO: '2025-06-30',
    source: 'prontopro',
    verified: true,
  },
];

export const AGGREGATE_RATING = {
  ratingValue: 5.0,
  reviewCount: TESTIMONIALS.length,
};
