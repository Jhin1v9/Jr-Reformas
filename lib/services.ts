import {
  Home, Bath, ChefHat, Layers, Hammer, Zap, Droplets, PaintRoller,
  Grid3x3, Building2, Store, DoorOpen, type LucideIcon,
} from 'lucide-react';
import type { Categoria } from './photos';

export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  icon: LucideIcon;
  main: boolean;
  categoria: Categoria;
  heroFoto?: string;
  gradient?: string;
  includes: string[];
  processSteps: string[];
  faq: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: 'reformas-integrales',
    title: 'Reformas integrales',
    shortDesc: 'Reforma completa de tu piso o casa: demolición, instalaciones, cocina, baños y acabados.',
    metaTitle: 'Reformas integrales en Sabadell y Barcelona | Junior Reformas',
    metaDesc: 'Reformas integrales en Sabadell, Barcelona, Terrassa y Mataró. 15+ años de experiencia, presupuesto desglosado y visita técnica gratuita. Respuesta el mismo día.',
    keywords: ['reformas integrales sabadell', 'reformas integrales barcelona', 'empresa reformas sabadell'],
    icon: Home,
    main: true,
    categoria: 'PISO',
    heroFoto: 'despues/cocina-negra-despues-01-hero.webp',
    includes: ['Demolición y desescombro', 'Albañilería y tabiques', 'Instalación eléctrica completa', 'Fontanería y climatización', 'Suelos y parquet', 'Cocina y baños completos', 'Carpintería interior', 'Pintura y acabados', 'Limpieza final de obra'],
    processSteps: ['Visita técnica y medición del espacio', 'Proyecto y definición de materiales', 'Demolición y retirada de escombros', 'Instalaciones: electricidad, fontanería y clima', 'Albañilería, tabiques y falsos techos', 'Suelos, alicatados y carpintería', 'Pintura, acabados y limpieza final'],
    faq: [
      { q: '¿Cuánto cuesta una reforma integral en Sabadell?', a: 'Como orientación, una reforma integral estándar suele partir de 400-600 €/m² según estado inicial y acabados. El presupuesto exacto se prepara tras la visita técnica gratuita.' },
      { q: '¿Cuánto tarda una reforma integral de un piso?', a: 'Un piso de 80-100 m² suele tardar entre 2 y 4 meses según el alcance de la obra y los materiales elegidos.' },
      { q: '¿Tengo que coordinar yo a los gremios?', a: 'No. Junior coordina personalmente todo el equipo: albañilería, fontanería, electricidad y carpintería. Un solo interlocutor para toda la obra.' },
      { q: '¿Puedo vivir en casa durante la reforma integral?', a: 'En una reforma integral lo habitual y más cómodo es buscar una alternativa temporal. En reformas parciales sí se puede vivir en casa con planificación.' },
    ],
  },
  {
    slug: 'suelos-y-parquet',
    title: 'Suelos y parquet',
    shortDesc: 'Instalación de parquet, tarima, suelo laminado y porcelánico con nivelación perfecta.',
    metaTitle: 'Suelos y parquet en Sabadell y Barcelona | Junior Reformas',
    metaDesc: 'Instalación de parquet, tarima y suelo porcelánico en Sabadell, Barcelona, Terrassa y Mataró. Nivelación profesional y acabados impecables.',
    keywords: ['suelos parquet sabadell', 'suelos parquet barcelona', 'instalación parquet sabadell'],
    icon: Layers,
    main: true,
    categoria: 'SUELO',
    heroFoto: 'despues/suelo-parquet-despues-01.jpg',
    includes: ['Parquet y tarima de madera', 'Suelo laminado AC4/AC5', 'Suelo porcelánico y gres', 'Nivelación de soleras', 'Rodapiés y remates', 'Retirada del suelo antiguo'],
    processSteps: ['Revisión y nivelación de la base', 'Elección de material según uso', 'Colocación con sistema de nivelación', 'Rodapiés, juntas y remates', 'Limpieza y revisión final'],
    faq: [
      { q: '¿Parquet o porcelánato: qué elijo?', a: 'El parquet aporta calidez y el porcelánico máxima resistencia y fácil mantenimiento. Te asesoramos según el uso de cada estancia.' },
      { q: '¿Se puede poner suelo nuevo encima del antiguo?', a: 'En muchos casos sí, si la base está nivelada y firme. Lo comprobamos en la visita técnica gratuita.' },
      { q: '¿Cuánto tarda cambiar el suelo de un piso?', a: 'Un piso de 80-100 m² suele completarse en 3-7 días según el material y el estado de la base.' },
    ],
  },
  {
    slug: 'banos',
    title: 'Baños',
    shortDesc: 'Reforma completa de baños: plato de ducha, alicatado, sanitarios, mamparas y muebles.',
    metaTitle: 'Reforma de baño en Sabadell y Barcelona | Junior Reformas',
    metaDesc: 'Reforma de baños en Sabadell, Barcelona, Terrassa y Mataró. Cambio de bañera por plato de ducha, alicatado, sanitarios y acabados premium. Visita gratuita.',
    keywords: ['reforma de baño sabadell', 'reforma de baño barcelona', 'cambiar bañera por ducha sabadell'],
    icon: Bath,
    main: true,
    categoria: 'BANO',
    heroFoto: 'despues/bano-mampara-despues-01-hero.webp',
    includes: ['Cambio de bañera por plato de ducha', 'Alicatado completo de paredes', 'Suelo porcelánico antideslizante', 'Sanitarios y grifería', 'Mamparas de cristal', 'Muebles de lavabo y espejos LED', 'Fontanería y desagües', 'Impermeabilización'],
    processSteps: ['Demolición y vaciado del baño', 'Instalaciones: fontanería y electricidad', 'Impermeabilización y alicatado', 'Plato de ducha, sanitarios y grifería', 'Mampara, mueble y accesorios', 'Sellado, limpieza y revisión final'],
    faq: [
      { q: '¿Cuánto cuesta reformar un baño en Sabadell?', a: 'Un baño completo estándar suele estar entre 3.000 € y 8.000 € según tamaño y materiales. Te lo confirmamos con presupuesto desglosado tras la visita gratuita.' },
      { q: '¿Cuánto tarda reformar un baño?', a: 'Entre 1 y 3 semanas según el alcance: demolición, instalaciones, alicatado, sanitarios y acabados.' },
      { q: '¿Hay que cambiar las instalaciones?', a: 'Si la fontanería o la electricidad tienen más de 20-25 años, recomendamos renovarlas durante la reforma para evitar problemas futuros.' },
      { q: '¿Merece la pena cambiar la bañera por un plato de ducha?', a: 'En la mayoría de casos sí: ganas accesibilidad, seguridad y sensación de amplitud. Es una de las reformas más demandadas.' },
    ],
  },
  {
    slug: 'cocinas',
    title: 'Cocinas',
    shortDesc: 'Cocinas a medida: muebles, encimeras, instalaciones, iluminación y electrodomésticos.',
    metaTitle: 'Reforma de cocina en Sabadell y Barcelona | Junior Reformas',
    metaDesc: 'Reforma de cocinas en Sabadell, Barcelona, Terrassa y Mataró. Diseño a medida, instalaciones completas y acabados cuidados. Presupuesto desglosado gratis.',
    keywords: ['reforma de cocina sabadell', 'reforma de cocina barcelona', 'cocinas a medida sabadell'],
    icon: ChefHat,
    main: false,
    categoria: 'COCINA',
    heroFoto: 'despues/cocina-gris-despues-01.jpg',
    includes: ['Diseño y distribución a medida', 'Muebles y encimeras', 'Fontanería y desagües', 'Instalación eléctrica e iluminación', 'Alicatado y suelo', 'Electrodomésticos', 'Carpintería y remates'],
    processSteps: ['Diseño de la distribución', 'Demolición y preparación', 'Instalaciones de agua, luz y gas', 'Alicatado y suelo', 'Montaje de muebles y encimera', 'Electrodomésticos y revisión final'],
    faq: [
      { q: '¿Cuánto cuesta reformar una cocina en Sabadell?', a: 'Como orientación, una cocina completa suele estar entre 5.000 € y 15.000 € según tamaño, muebles y electrodomésticos. Presupuesto desglosado tras la visita.' },
      { q: '¿Cuánto tarda la reforma de una cocina?', a: 'Normalmente entre 2 y 4 semanas, según la distribución y los materiales elegidos.' },
      { q: '¿Se puede abrir la cocina al salón?', a: 'En muchos pisos sí. Comprobamos en la visita si el tabique no es estructural y te proponemos la mejor distribución.' },
    ],
  },
  {
    slug: 'albanileria',
    title: 'Albañilería',
    shortDesc: 'Tabiques, enfoscados, soleras, tirar tabiques y toda la obra gruesa de tu reforma.',
    metaTitle: 'Albañilería en Sabadell y Barcelona | Junior Reformas',
    metaDesc: 'Trabajos de albañilería en Sabadell, Barcelona, Terrassa y Mataró. Tabiques, soleras, enfoscados y demolición. 15+ años de experiencia.',
    keywords: ['albañileria sabadell', 'paleta sabadell', 'tirar tabique sabadell'],
    icon: Hammer,
    main: false,
    categoria: 'DEMO',
    heroFoto: 'durante/bano-blanco-durante-01-hero.webp',
    includes: ['Tirar y levantar tabiques', 'Enfoscados y revocos', 'Soleras y nivelaciones', 'Apertura de huecos', 'Reparación de paredes', 'Desescombro'],
    processSteps: ['Evaluación del estado de muros y soleras', 'Demolición controlada', 'Nueva albañilería y enfoscados', 'Nivelación y secados', 'Revisión antes de acabados'],
    faq: [
      { q: '¿Se puede tirar cualquier tabique?', a: 'Los tabiques de ladrillo o pladur sí; los muros de carga nunca sin informe técnico. Lo verificamos en la visita antes de tocar nada.' },
      { q: '¿Cuánto cuesta tirar un tabique?', a: 'Depende del tamaño y de si hay instalaciones dentro. Lo valoramos en la visita gratuita y lo detallamos en el presupuesto.' },
    ],
  },
  {
    slug: 'electricidad',
    title: 'Electricidad',
    shortDesc: 'Instalación eléctrica completa, cuadros, puntos de luz e iluminación LED.',
    metaTitle: 'Electricidad para reformas en Sabadell | Junior Reformas',
    metaDesc: 'Instalaciones eléctricas en reformas de viviendas en Sabadell, Barcelona, Terrassa y Mataró. Cuadros, cableado, iluminación LED y domótica básica.',
    keywords: ['electricidad reforma vivienda sabadell', 'instalación eléctrica piso sabadell'],
    icon: Zap,
    main: false,
    categoria: 'INSTAL',
    gradient: 'from-yellow-900 via-carbon to-carbon-light',
    includes: ['Instalación eléctrica completa', 'Cuadro eléctrico y protecciones', 'Puntos de luz y enchufes', 'Iluminación LED integrada', 'Tomas USB y domótica básica', 'Boletín eléctrico'],
    processSteps: ['Revisión de la instalación existente', 'Diseño de puntos según el nuevo uso', 'Rozas y cableado nuevo', 'Cuadro y protecciones', 'Comprobaciones y boletín'],
    faq: [
      { q: '¿Hay que renovar la instalación eléctrica en un piso antiguo?', a: 'Si tiene más de 25-30 años, es muy recomendable: seguridad, capacidad para los electrodomésticos actuales y cumplimiento normativo.' },
      { q: '¿Puedo añadir más enchufes y puntos de luz?', a: 'Sí. En la fase de planeamiento definimos contigo cada punto según los muebles y el uso de cada estancia.' },
    ],
  },
  {
    slug: 'fontaneria',
    title: 'Fontanería',
    shortDesc: 'Tuberías, desagües, sanitarios, grifería y calentadores para tu reforma.',
    metaTitle: 'Fontanería para reformas en Sabadell | Junior Reformas',
    metaDesc: 'Instalaciones de fontanería en reformas en Sabadell, Barcelona, Terrassa y Mataró. Tuberías, desagües, sanitarios y grifería de calidad.',
    keywords: ['fontaneria reforma sabadell', 'fontanero reforma baño sabadell'],
    icon: Droplets,
    main: false,
    categoria: 'INSTAL',
    gradient: 'from-blue-900 via-carbon to-carbon-light',
    includes: ['Renovación completa de tuberías', 'Desagües y bajantes', 'Instalación de sanitarios', 'Grifería y termostáticas', 'Calentadores y termos', 'Cisternas empotradas'],
    processSteps: ['Revisión de bajantes y acometidas', 'Nueva distribución de tuberías', 'Pruebas de presión y estanqueidad', 'Montaje de sanitarios y grifería', 'Revisión final'],
    faq: [
      { q: '¿Conviene cambiar las tuberías al reformar?', a: 'Si son de plomo, hierro o tienen más de 25 años, sí. Cambiarlas durante la reforma evita fugas y obras futuras.' },
      { q: '¿Instaláis cisternas empotradas?', a: 'Sí, trabajamos con cisternas empotradas y sanitarios suspendidos para un acabado moderno y fácil de limpiar.' },
    ],
  },
  {
    slug: 'pintura',
    title: 'Pintura',
    shortDesc: 'Pintura de pisos completos, alisado de paredes y acabados decorativos.',
    metaTitle: 'Pintura de pisos en Sabadell y Barcelona | Junior Reformas',
    metaDesc: 'Pintura de viviendas en Sabadell, Barcelona, Terrassa y Mataró. Alisado de paredes, quitar gotelé y acabados impecables.',
    keywords: ['pintura reforma piso sabadell', 'pintor sabadell', 'quitar gotelé sabadell'],
    icon: PaintRoller,
    main: false,
    categoria: 'PISO',
    heroFoto: 'despues/piso-pasillo-despues-01-hero.webp',
    includes: ['Quitar gotelé y alisar paredes', 'Pintura plástica de calidad', 'Techos y carpintería', 'Reparación de grietas', 'Esmaltes y lacados', 'Colores y asesoría'],
    processSteps: ['Protección de suelos y muebles', 'Reparación y alisado', 'Imprimación', 'Dos manos de pintura', 'Repasos y limpieza'],
    faq: [
      { q: '¿Cuánto cuesta pintar un piso en Sabadell?', a: 'Depende de los metros y del estado de las paredes (gotelé, grietas). Te damos precio cerrado tras la visita gratuita.' },
      { q: '¿Se puede quitar el gotelé?', a: 'Sí, alisamos las paredes y dejamos un acabado liso moderno, listo para pintar en el color que elijas.' },
    ],
  },
  {
    slug: 'pladur-y-techos',
    title: 'Pladur y techos',
    shortDesc: 'Tabiques de pladur, falsos techos, trasdosados e iluminación integrada.',
    metaTitle: 'Pladur y falsos techos en Sabadell | Junior Reformas',
    metaDesc: 'Tabiques de pladur, falsos techos y trasdosados en Sabadell, Barcelona, Terrassa y Mataró. Iluminación LED integrada y acabados perfectos.',
    keywords: ['pladur sabadell', 'falso techo sabadell', 'tabique pladur sabadell'],
    icon: Grid3x3,
    main: false,
    categoria: 'DEMO',
    heroFoto: 'durante/bano-blanco-durante-05-hero.webp',
    includes: ['Tabiques de pladur', 'Falsos techos continuos', 'Trasdosados con aislamiento', 'Foseados para iluminación LED', 'Cortineros y registros', 'Juntas y masilla perfectas'],
    processSteps: ['Replanteo y niveles', 'Estructura de perfiles', 'Placas y aislamiento', 'Cinta y pasta de juntas', 'Lijado y preparación para pintura'],
    faq: [
      { q: '¿El pladur es resistente?', a: 'Sí, con la estructura y placas adecuadas aguanta estanterías, TVs y muebles colgados sin problema.' },
      { q: '¿Se puede bajar el techo para ocultar instalaciones?', a: 'Sí, es una de las soluciones más habituales en reformas integrales para ocultar tuberías, conductos y cableado.' },
    ],
  },
  {
    slug: 'fachadas-y-terrazas',
    title: 'Fachadas y terrazas',
    shortDesc: 'Rehabilitación de fachadas, impermeabilización de terrazas y cerramientos.',
    metaTitle: 'Fachadas y terrazas en Sabadell y Barcelona | Junior Reformas',
    metaDesc: 'Rehabilitación de fachadas e impermeabilización de terrazas en Sabadell, Barcelona, Terrassa y Mataró. Suelos exteriores y cerramientos.',
    keywords: ['reforma terraza sabadell', 'impermeabilizar terraza barcelona'],
    icon: Building2,
    main: false,
    categoria: 'EXTERIOR',
    heroFoto: 'despues/terraza-despues-01.jpg',
    includes: ['Impermeabilización de terrazas', 'Suelos exteriores antideslizantes', 'Revestimiento de fachadas', 'Cerramientos y barandillas', 'Reparación de grietas', 'Pintura exterior'],
    processSteps: ['Diagnóstico de humedades y grietas', 'Preparación y reparación de la base', 'Impermeabilización', 'Revestimiento y acabados', 'Pruebas y revisión'],
    faq: [
      { q: '¿Cómo se arregla una terraza con filtraciones?', a: 'Levantando el pavimento, reparando la base y aplicando una impermeabilización completa antes del nuevo suelo. Es la única solución duradera.' },
      { q: '¿Trabajáis en comunidades de vecinos?', a: 'Sí, también realizamos trabajos de fachadas y zonas comunes para comunidades y administradores.' },
    ],
  },
  {
    slug: 'locales-comerciales',
    title: 'Locales comerciales',
    shortDesc: 'Reforma integral de locales: adecuación, instalaciones, aseos y escaparates.',
    metaTitle: 'Reformas de locales comerciales en Sabadell | Junior Reformas',
    metaDesc: 'Reforma de locales comerciales en Sabadell, Barcelona, Terrassa y Mataró. Adecuación completa para tu negocio con plazos claros.',
    keywords: ['reformas locales comerciales sabadell', 'adecuación local barcelona'],
    icon: Store,
    main: false,
    categoria: 'LOCAL',
    gradient: 'from-carbon-mid via-carbon to-carbon-light',
    includes: ['Adecuación integral del local', 'Instalaciones eléctricas y de iluminación', 'Aseos y zonas técnicas', 'Suelos de alto tránsito', 'Escaparates y entradas', 'Pintura y acabados comerciales'],
    processSteps: ['Visita y análisis del negocio', 'Proyecto de adecuación', 'Obra por fases para minimizar el cierre', 'Instalaciones y acabados', 'Entrega lista para abrir'],
    faq: [
      { q: '¿Cuánto tarda reformar un local comercial?', a: 'Depende de los metros y del estado inicial, pero planificamos por fases para que el negocio pierda el mínimo tiempo posible.' },
      { q: '¿Os encargáis también de los aseos y la electricidad del local?', a: 'Sí, la reforma del local es integral: fontanería, electricidad, suelos, techos y acabados, todo con un solo equipo.' },
    ],
  },
  {
    slug: 'carpinteria',
    title: 'Carpintería',
    shortDesc: 'Puertas, armarios a medida, cocinas y carpintería de madera para tu reforma.',
    metaTitle: 'Carpintería para reformas en Sabadell | Junior Reformas',
    metaDesc: 'Carpintería a medida en reformas en Sabadell, Barcelona, Terrassa y Mataró. Puertas, armarios, muebles de baño y cocina.',
    keywords: ['carpintería reforma sabadell', 'armarios a medida sabadell'],
    icon: DoorOpen,
    main: false,
    categoria: 'PISO',
    gradient: 'from-amber-950 via-carbon to-carbon-light',
    includes: ['Puertas de interior', 'Armarios empotrados a medida', 'Muebles de baño', 'Carpintería de cocina', 'Estanterías y muebles a medida', 'Marcos y molduras'],
    processSteps: ['Medición en obra', 'Diseño y elección de materiales', 'Fabricación', 'Instalación y ajuste', 'Acabados y revisión'],
    faq: [
      { q: '¿Hacéis armarios a medida?', a: 'Sí, diseñamos e instalamos armarios empotrados y muebles a medida aprovechando cada centímetro.' },
      { q: '¿Puedo cambiar solo las puertas de casa?', a: 'Claro. Cambiar puertas y marcos es una reforma rápida que transforma por completo el aspecto de un piso.' },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const MAIN_SERVICES = SERVICES.filter((s) => s.main);
export const HOME_SERVICES = [
  SERVICES[0], SERVICES[1], SERVICES[2], SERVICES[3], SERVICES[4], SERVICES[10],
];
