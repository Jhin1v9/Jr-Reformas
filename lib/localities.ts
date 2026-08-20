export interface Locality {
  slug: string;
  name: string;
  hub: boolean;
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  intro: string[];
  zones: string;
  housing: string;
  coords: { x: number; y: number }; // relative position on stylized SVG map
}

export const LOCALITIES: Locality[] = [
  {
    slug: 'reformas-sabadell',
    name: 'Sabadell',
    hub: true,
    metaTitle: 'Reformas integrales en Sabadell | Junior Reformas',
    metaDesc: 'Empresa de reformas integrales en Sabadell: pisos, baños, cocinas y suelos. 15+ años de experiencia, visita gratuita y presupuesto desglosado. Respuesta el mismo día.',
    keywords: ['reformas integrales sabadell', 'empresa reformas sabadell', 'reforma baño sabadell', 'reforma cocina sabadell'],
    intro: [
      'Sabadell es nuestra base y la ciudad donde más trabajamos. Conocemos a fondo su parque de viviendas: pisos de los años 60-80 en el Centro, La Creu Alta y Torre-romeu, apartamentos con baños y cocinas que piden una actualización completa, y casas más amplias en las zonas residenciales.',
      'La mayoría de las reformas que hacemos en Sabadell son pisos de 70 a 110 m²: reforma integral con nueva instalación eléctrica y de fontanería, cocina abierta al salón, baño con plato de ducha y suelo nuevo en toda la vivienda.',
      'Trabajamos también en locales comerciales del centro de Sabadell, adecuándolos para nuevos negocios con el mínimo tiempo de cierre.',
    ],
    zones: 'Centro, Eix Macià, La Creu Alta, Torre-romeu, Can Rull, Gràcia, Sant Oleguer y Can Deu.',
    housing: 'Pisos de los años 60-80, apartamentos para actualizar, casas unifamiliares y locales comerciales en planta baja.',
    coords: { x: 50, y: 22 },
  },
  {
    slug: 'reformas-barcelona',
    name: 'Barcelona',
    hub: false,
    metaTitle: 'Reformas integrales en Barcelona | Junior Reformas',
    metaDesc: 'Empresa de reformas en Barcelona: pisos del Eixample, baños, cocinas y reformas integrales. Presupuesto desglosado y visita técnica gratuita. 15+ años de experiencia.',
    keywords: ['reformas integrales barcelona', 'empresa reformas barcelona', 'reforma baño barcelona', 'reforma cocina barcelona'],
    intro: [
      'En Barcelona trabajamos sobre todo en pisos con carácter: fincas del Eixample, Sant Martí, Sants y Gràcia, con techos altos, carpinterías antiguas y distribuciones que necesitan replantearse para la vida actual.',
      'Las reformas más habituales en Barcelona son integrales de pisos de 60 a 100 m²: renovar instalaciones completas, abrir la cocina, ganar luz y actualizar baños con platos de ducha a ras de suelo.',
      'Conocemos los requisitos habituales de las comunidades de vecinos y los permisos necesarios para reformar viviendas en Barcelona.',
    ],
    zones: 'Eixample, Gràcia, Sants, Sant Martí, Les Corts, Nou Barris y Horta-Guinardó.',
    housing: 'Pisos en fincas antiguas, apartamentos del Eixample y viviendas de los años 50-70 para actualizar.',
    coords: { x: 62, y: 70 },
  },
  {
    slug: 'reformas-terrassa',
    name: 'Terrassa',
    hub: false,
    metaTitle: 'Reformas integrales en Terrassa | Junior Reformas',
    metaDesc: 'Empresa de reformas en Terrassa: pisos, baños, cocinas, suelos y locales. Visita técnica gratuita y presupuesto desglosado. Respuesta el mismo día.',
    keywords: ['reformas terrassa', 'reformas integrales terrassa', 'reforma baño terrassa', 'empresa reformas terrassa'],
    intro: [
      'Terrassa es una de nuestras zonas habituales de trabajo, a pocos minutos de nuestra base en Sabadell. Reformamos pisos en el Centre, Ègara, Ca n\'Anglada y las urbanizaciones del norte de la ciudad.',
      'El parque de viviendas de Terrassa combina pisos de los años 60-70 que necesitan reforma integral con casas y torres donde suelen pedirse reformas parciales: baños, cocinas y suelos.',
      'Al estar tan cerca, podemos hacer la visita técnica en Terrassa prácticamente de un día para otro.',
    ],
    zones: 'Centre, Ègara, Ca n\'Anglada, Torredembarra, Can Parellada y Matadepera.',
    housing: 'Pisos de los años 60-70, casas unifamiliares, torres y locales en el centro.',
    coords: { x: 30, y: 30 },
  },
  {
    slug: 'reformas-mataro',
    name: 'Mataró',
    hub: false,
    metaTitle: 'Reformas integrales en Mataró | Junior Reformas',
    metaDesc: 'Empresa de reformas en Mataró y el Maresme: pisos, baños, cocinas y suelos. 15+ años de experiencia, visita gratuita y presupuesto desglosado.',
    keywords: ['reformas mataro', 'reformas integrales mataro', 'reforma baño mataro', 'empresa reformas mataro'],
    intro: [
      'En Mataró y el Maresme reformamos tanto pisos cerca del centro como viviendas en las urbanizaciones. El ambiente marino pide materiales y acabados resistentes a la humedad, algo que tenemos muy en cuenta al elegir soluciones.',
      'Las reformas más comunes en Mataró son actualización de pisos de segunda residencia, baños completos y cocinas, además de terrazas con problemas de impermeabilización.',
      'Nos desplazamos a Mataró y todo el Maresme dentro de nuestro radio habitual de 40-50 km.',
    ],
    zones: 'Centre, Cerdanyola, Rocafonda, La Llàntia, El Pla d\'en Boet y el Maresme.',
    housing: 'Pisos en el centro, apartamentos junto al mar y casas en urbanizaciones.',
    coords: { x: 72, y: 40 },
  },
];

export function getLocality(slug: string): Locality | undefined {
  return LOCALITIES.find((l) => l.slug === slug);
}
