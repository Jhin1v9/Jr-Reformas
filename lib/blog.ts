export interface BlogSection {
  h2: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  excerpt: string;
  tldr: string;
  date: string;
  category: 'Costes' | 'Proceso' | 'Materiales' | 'Permisos' | 'Consejos';
  readingTime: number;
  keywords: string[];
  image: string;
  relatedServices: string[];
  relatedLocality: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cuanto-cuesta-reforma-integral-sabadell',
    title: '¿Cuánto cuesta una reforma integral en Sabadell en 2026?',
    metaTitle: 'Precio de una reforma integral en Sabadell (2026) | Junior Reformas',
    metaDesc: 'Precios reales y rangos orientativos de una reforma integral en Sabadell en 2026: por m², por partidas y qué factores mueven el precio. Guía clara.',
    excerpt: 'Rangos orientativos por m², qué incluye cada nivel de acabado y los factores que más mueven el precio de una reforma integral en Sabadell.',
    tldr: 'Una reforma integral en Sabadell suele moverse entre 400 y 900 €/m² según el nivel de acabado: un piso de 90 m² puede ir de unos 36.000 € (estándar) a más de 80.000 € (alto standing). La única cifra fiable sale de una visita técnica con presupuesto desglosado.',
    date: '2026-08-01',
    category: 'Costes',
    readingTime: 6,
    keywords: ['cuánto cuesta reforma integral sabadell', 'precio reforma integral sabadell 2026'],
    image: 'despues/cocina-negra-despues-01-gallery.webp',
    relatedServices: ['reformas-integrales', 'banos', 'cocinas'],
    relatedLocality: 'reformas-sabadell',
    sections: [
      {
        h2: 'Rangos orientativos por nivel de acabado',
        paragraphs: [
          'En Sabadell y el Vallès Occidental, los rangos habituales de una reforma integral de vivienda son: estándar 400-600 €/m², premium 600-900 €/m² y alto standing 900-1.500 €/m². Un piso típico de 80-100 m² en zonas como el Centro o La Creu Alta suele situarse entre 35.000 € y 80.000 € según el alcance.',
          'Estos rangos incluyen demolición, instalaciones, albañilería, suelos, cocina, baños, carpintería, pintura y limpieza. No incluyen muebles ni electrodomésticos.',
        ],
        list: ['Estándar (400-600 €/m²): reforma funcional con materiales de calidad media-alta', 'Premium (600-900 €/m²): materiales de marca y acabados cuidados', 'Alto standing (900-1.500 €/m²): materiales de lujo y diseño a medida'],
      },
      {
        h2: '¿Qué factores mueven el precio?',
        paragraphs: [
          'El estado inicial es el factor que más sorpresas da: instalaciones antiguas, humedades ocultas o soleras en mal estado pueden sumar partidas importantes. Por eso la visita técnica es imprescindible antes de dar un precio cerrado.',
          'También influyen la distribución (tirar tabiques y rehacer instalaciones cuesta más que pintar y poner suelo), la calidad de los materiales y los extras como climatización, domótica o carpintería a medida.',
        ],
      },
      {
        h2: '¿Cómo evitar sorpresas en el presupuesto?',
        paragraphs: [
          'Pide siempre un presupuesto desglosado por partidas: demolición, instalaciones, albañilería, acabados. Así puedes comparar y decidir dónde invertir más y dónde ajustar.',
          'Nosotros trabajamos así: visita técnica gratuita, medición, y presupuesto desglosado en 3-5 días laborables. Sin compromiso.',
        ],
      },
    ],
  },
  {
    slug: 'cuanto-cuesta-reforma-bano-sabadell',
    title: '¿Cuánto cuesta reformar un baño en Sabadell?',
    metaTitle: 'Precio de reformar un baño en Sabadell | Junior Reformas',
    metaDesc: 'Cuánto cuesta reformar un baño en Sabadell: rangos reales, qué incluye la reforma completa y cuánto tarda. Cambio de bañera por plato de ducha.',
    excerpt: 'De 3.000 € a 8.000 € según tamaño y materiales: te explicamos qué incluye la reforma de un baño completo y dónde se puede ajustar el precio.',
    tldr: 'Reformar un baño completo en Sabadell suele costar entre 3.000 € y 8.000 € y tardar de 1 a 3 semanas. El cambio de bañera por plato de ducha es la reforma más demandada.',
    date: '2026-07-15',
    category: 'Costes',
    readingTime: 5,
    keywords: ['cuánto cuesta reformar un baño sabadell', 'precio reforma baño sabadell'],
    image: 'despues/bano-marmol-despues-01-gallery.webp',
    relatedServices: ['banos', 'fontaneria'],
    relatedLocality: 'reformas-sabadell',
    sections: [
      {
        h2: 'Precio orientativo de una reforma de baño completa',
        paragraphs: [
          'Un baño estándar de 4-5 m² con demolición, nuevas instalaciones, alicatado completo, plato de ducha, sanitarios, mampara y mueble suele estar entre 4.000 € y 7.000 €. Baños pequeños o reformas parciales (solo alicatado o solo sanitarios) pueden bajar de los 3.000 €.',
          'Materiales como el porcelánico de gran formato, los sanitarios suspendidos o las griferías termostáticas suben el precio pero también el resultado y la durabilidad.',
        ],
      },
      {
        h2: '¿Qué incluye la reforma de un baño?',
        paragraphs: ['Una reforma completa de baño incluye:'],
        list: ['Demolición y retirada de escombros', 'Fontanería y electricidad nuevas', 'Impermeabilización de la zona de ducha', 'Alicatado de paredes y suelo', 'Plato de ducha, sanitarios y grifería', 'Mampara, mueble de lavabo y espejo', 'Sellados, limpieza y revisión final'],
      },
      {
        h2: '¿Cuánto tarda reformar un baño?',
        paragraphs: [
          'Entre 1 y 3 semanas según el alcance. Un baño completo estándar suele resolverse en unas 2 semanas si los materiales están elegidos desde el principio. Lo que más retrasa una reforma de baño son los cambios de última hora y los materiales con plazos de entrega largos.',
        ],
      },
    ],
  },
  {
    slug: 'cuanto-cuesta-reforma-cocina-sabadell',
    title: '¿Cuánto cuesta reformar una cocina en Sabadell?',
    metaTitle: 'Precio de reformar una cocina en Sabadell | Junior Reformas',
    metaDesc: 'Cuánto cuesta reformar una cocina en Sabadell: rangos por tamaño y acabado, qué incluye y cómo planificar la reforma sin sorpresas.',
    excerpt: 'Entre 5.000 € y 15.000 € según muebles, encimera y electrodomésticos. Te contamos qué incluye la reforma de cocina y cómo ahorrar sin perder calidad.',
    tldr: 'Una reforma de cocina en Sabadell suele costar entre 5.000 € y 15.000 € y tardar de 2 a 4 semanas. Los muebles y la encimera son las partidas que más pesan.',
    date: '2026-06-20',
    category: 'Costes',
    readingTime: 5,
    keywords: ['cuánto cuesta reformar una cocina sabadell', 'precio reforma cocina sabadell'],
    image: 'despues/cocina-azul-despues-01-gallery.webp',
    relatedServices: ['cocinas', 'electricidad', 'fontaneria'],
    relatedLocality: 'reformas-sabadell',
    sections: [
      {
        h2: 'Rangos de precio de una reforma de cocina',
        paragraphs: [
          'Una cocina pequeña con muebles estándar puede reformarse desde unos 5.000-7.000 €. Una cocina de tamaño medio con muebles de calidad, encimera de cuarzo y electrodomésticos suele estar entre 8.000 € y 12.000 €. Las cocinas a medida con materiales premium superan los 15.000 €.',
        ],
      },
      {
        h2: '¿Qué partidas pesan más?',
        paragraphs: ['El presupuesto de una cocina se reparte aproximadamente así:'],
        list: ['Muebles y encimera: 40-50% del presupuesto', 'Instalaciones (agua, luz, gas): 15-20%', 'Alicatado y suelo: 15-20%', 'Electrodomésticos: 10-20% según la gama'],
      },
      {
        h2: 'Consejos para ahorrar sin perder calidad',
        paragraphs: [
          'Mantén la distribución de agua y desagües si es posible: mover tomas de fontanería encarece la obra. Invierte en encimera y grifería (lo que más se usa a diario) y ajusta en frentes de muebles o electrodomésticos de gama media.',
          'Y lo más importante: presupuesto desglosado antes de empezar. Así sabes exactamente qué pagas en cada partida.',
        ],
      },
    ],
  },
  {
    slug: 'cuanto-tarda-reforma-integral',
    title: '¿Cuánto tarda una reforma integral de un piso?',
    metaTitle: 'Cuánto tarda una reforma integral de piso | Junior Reformas',
    metaDesc: 'Plazos reales de una reforma integral: de 2 a 4 meses según metros y alcance. Cronograma por fases y consejos para no alargar la obra.',
    excerpt: 'Un piso de 80-100 m² suele tardar entre 2 y 4 meses. Te enseñamos el cronograma por fases y qué cosas alargan una obra.',
    tldr: 'Una reforma integral de un piso de 80-100 m² tarda normalmente entre 2 y 4 meses: 1-2 semanas de demolición e instalaciones, 3-5 semanas de albañilería y suelos, y 2-4 semanas de cocina, baños y acabados.',
    date: '2026-05-10',
    category: 'Proceso',
    readingTime: 5,
    keywords: ['cuánto tarda una reforma integral', 'plazo reforma piso'],
    image: 'durante/bano-blanco-durante-02-gallery.webp',
    relatedServices: ['reformas-integrales'],
    relatedLocality: 'reformas-barcelona',
    sections: [
      {
        h2: 'Cronograma típico por fases',
        paragraphs: ['Estos son los plazos habituales de una reforma integral bien planificada:'],
        list: ['Demolición y desescombro: 3-7 días', 'Instalaciones (electricidad, fontanería, clima): 1-2 semanas', 'Albañilería, tabiques y soleras: 2-3 semanas', 'Suelos y alicatados: 1-2 semanas', 'Cocina y baños: 2-3 semanas', 'Carpintería, pintura y acabados: 1-2 semanas', 'Limpieza y entrega: 2-3 días'],
      },
      {
        h2: '¿Qué alarga una obra?',
        paragraphs: [
          'Los tres grandes enemigos del plazo son: cambios de criterio a mitad de obra, materiales no decididos a tiempo (con plazos de entrega de semanas) e imprevistos ocultos como humedades o instalaciones en peor estado del esperado.',
          'Una buena fase de planeamiento, con todos los materiales elegidos antes de empezar, es la mejor garantía de cumplir el cronograma.',
        ],
      },
      {
        h2: '¿Cómo te mantenemos informado?',
        paragraphs: [
          'Te enviamos fotos del avance por WhatsApp y te avisamos antes de cada decisión importante. Saber en qué punto está tu obra es parte de la tranquilidad que prometemos.',
        ],
      },
    ],
  },
  {
    slug: 'permisos-reforma-vivienda-sabadell',
    title: 'Permisos para reformar una vivienda en Sabadell',
    metaTitle: 'Permisos para reformar una vivienda en Sabadell | Junior Reformas',
    metaDesc: 'Qué permisos necesitas para reformar tu piso en Sabadell: comunicación inmediata, licencia de obra y casos especiales. Guía clara y actualizada.',
    excerpt: 'La mayoría de reformas interiores solo necesitan una comunicación al ayuntamiento. Te explicamos cuándo hace falta licencia y cómo tramitarla.',
    tldr: 'Para reformas interiores sin tocar estructura ni fachada, en Sabadell suele bastar una comunicación de obra al ayuntamiento. Si tocas estructura, fachada o amplias superficie, necesitas licencia de obra.',
    date: '2026-04-05',
    category: 'Permisos',
    readingTime: 5,
    keywords: ['permisos reforma vivienda sabadell', 'licencia obra sabadell'],
    image: 'durante/bano-blanco-durante-04-gallery.webp',
    relatedServices: ['reformas-integrales', 'albanileria'],
    relatedLocality: 'reformas-sabadell',
    sections: [
      {
        h2: '¿Cuándo NO necesitas licencia de obra?',
        paragraphs: [
          'Las reformas interiores que no afectan a elementos estructurales ni modifican la fachada suelen tramitarse con una comunicación previa o assabentat al Ayuntamiento de Sabadell: cambiar suelos, alicatar, renovar instalaciones, tirar tabiques no estructurales o reformar baño y cocina.',
        ],
      },
      {
        h2: '¿Cuándo necesitas licencia de obra?',
        paragraphs: ['Necesitarás licencia cuando la obra:'],
        list: ['Afecta a elementos estructurales (muros de carga, vigas, forjados)', 'Modifica la fachada o las cubiertas', 'Amplía la superficie o el volumen de la vivienda', 'Cambia el uso del inmueble (por ejemplo, vivienda a local)'],
      },
      {
        h2: '¿Quién se encarga del papeleo?',
        paragraphs: [
          'En la visita técnica te decimos exactamente qué trámite necesita tu reforma y te orientamos sobre cómo presentarlo. Si la comunidad de vecinos debe ser informada (zonas comunes, bajantes), también te indicamos cómo hacerlo.',
          'Nota: esta guía es orientativa. La normativa municipal puede actualizarse; confirma siempre los requisitos vigentes antes de empezar.',
        ],
      },
    ],
  },
];

import { BLOG_POSTS_2 } from './blog2';

export const ALL_POSTS: BlogPost[] = [...BLOG_POSTS, ...BLOG_POSTS_2].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export function getPost(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export const BLOG_CATEGORIES = ['Costes', 'Proceso', 'Materiales', 'Permisos', 'Consejos'] as const;
