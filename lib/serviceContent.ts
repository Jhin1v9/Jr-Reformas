import type { Locale } from './constants';

export interface ServicePriceRow {
  concept: string;
  price: string;
  note?: string;
}

export interface ServiceDuration {
  typical: string;
  range: string;
  factors: string[];
}

export interface ServiceMaterials {
  title: string;
  items: string[];
  warranty: string;
}

export interface ServiceArea {
  name: string;
  description?: string;
}

export interface ServiceContentLocale {
  intro: string[];
  pricesTitle: string;
  pricesDisclaimer: string;
  prices: ServicePriceRow[];
  durationTitle: string;
  duration: ServiceDuration;
  areasTitle: string;
  areasIntro: string;
  areas: ServiceArea[];
  materials: ServiceMaterials;
}

export type ServiceContent = Partial<Record<Locale, ServiceContentLocale>>;

const SABADELL_BARRIOS: ServiceArea[] = [
  { name: 'Centre' },
  { name: 'Gràcia' },
  { name: 'Ca n\'Oriac' },
  { name: 'Creu Alta' },
  { name: 'Torre-romeu' },
  { name: 'Can Deu' },
  { name: 'Can Rull' },
  { name: 'Can Feu' },
  { name: 'Sant Oleguer' },
  { name: 'Poblenou' },
  { name: 'La Planada' },
  { name: 'Campoamor' },
  { name: 'Sant Julià' },
];

const NEARBY_LOCALITIES: ServiceArea[] = [
  { name: 'Barcelona' },
  { name: 'Terrassa' },
  { name: 'Mataró' },
  { name: 'Barberà del Vallès' },
  { name: 'Badia del Vallès' },
  { name: 'Castellar del Vallès' },
  { name: 'Ripollet' },
  { name: 'Santa Perpètua de Mogoda' },
];

const ALL_AREAS: ServiceArea[] = [...SABADELL_BARRIOS, ...NEARBY_LOCALITIES];

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'reformas-integrales': {
    es: {
      intro: [
        'En Sabadell y el Vallès la mayoría de los pisos que reformamos son de los años 60, 70 y 80. Instalaciones al límite, acabados desgastados y una distribución que ya no se adapta a cómo vivimos hoy. Una reforma integral es la forma de transformar el espacio por completo sin sorpresas.',
        'En Junior Reformas llevamos más de 15 años coordinando reformas integrales en Sabadell, Barcelona, Terrassa y Mataró. Gestionamos todo desde la demolición hasta la entrega final: albañilería, fontanería, electricidad, cocina, baños, suelos, carpintería y pintura. Un solo interlocutor para toda la obra.',
        'Cada proyecto empieza con una visita técnica gratuita y sin compromiso. Medimos el espacio, evaluamos el estado de instalaciones y estructura, y te preparamos un presupuesto desglosado con plazos reales.',
      ],
      pricesTitle: 'Precios orientativos de reforma integral en Sabadell',
      pricesDisclaimer: 'Precios orientativos con IVA incluido. El presupuesto definitivo se prepara tras la visita técnica gratuita, según metros, estado inicial y acabados elegidos.',
      prices: [
        { concept: 'Reforma básica (pintura, suelos, baño y cocina)', price: 'desde 22.000 €', note: 'piso 70 m² aprox.' },
        { concept: 'Reforma integral media', price: '400 - 650 €/m²', note: 'cambio de instalaciones y acabados de calidad' },
        { concept: 'Reforma integral alta', price: '650 - 950 €/m²', note: 'materiales premium, diseño a medida' },
        { concept: 'Reforma integral piso 80-90 m²', price: '30.000 - 55.000 €', note: 'según acabados' },
        { concept: 'Reforma para alquilar 70 m²', price: '18.000 - 30.000 €', note: 'acabados resistentes, plazo rápido' },
      ],
      durationTitle: 'Duración de una reforma integral',
      duration: {
        typical: '8 - 12 semanas',
        range: 'Piso de 80-100 m²',
        factors: ['Estado de instalaciones eléctricas y de fontanería', 'Necesidad de cambiar distribución o tirar tabiques', 'Tipo de materiales y tiempos de entrega', 'Trámites con el ayuntamiento de Sabadell'],
      },
      areasTitle: 'Zonas donde hacemos reformas integrales',
      areasIntro: 'Trabajamos en todos los barrios de Sabadell y en un radio de 40-50 km. Estas son las zonas donde más reformas integrales realizamos:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiales y acabados',
        items: ['Porcelánico y gres de primera calidad', 'Parquet, tarima y laminado AC4/AC5', 'Grifería y sanitarios de marcas reconocidas', 'Pintura plástica lavable y esmaltes', 'Ventanas de aluminio o PVC con cámara', 'Aislamiento térmico y acústico'],
        warranty: 'Todos los materiales incluyen garantía del fabricante y damos 2 años de garantía en la ejecución de la obra.',
      },
    },
    en: {
      intro: [
        'In Sabadell and the Vallès, most of the flats we renovate date from the 1960s, 70s and 80s. Outdated installations, worn finishes and layouts that no longer match modern living. A full renovation is the way to transform the space completely and without surprises.',
        'At Junior Reformas we have more than 15 years of experience coordinating full renovations in Sabadell, Barcelona, Terrassa and Mataró. We manage everything from demolition to final handover: masonry, plumbing, electrics, kitchen, bathrooms, flooring, carpentry and painting. One single point of contact for the entire project.',
        'Every project starts with a free, no-obligation technical visit. We measure the space, assess the condition of installations and structure, and prepare an itemised quote with realistic deadlines.',
      ],
      pricesTitle: 'Guide prices for full renovations in Sabadell',
      pricesDisclaimer: 'Guide prices including VAT. The final quote is prepared after a free technical visit, depending on square metres, initial condition and chosen finishes.',
      prices: [
        { concept: 'Basic renovation (paint, floors, bathroom and kitchen)', price: 'from €22,000', note: 'approx. 70 m² flat' },
        { concept: 'Mid-range full renovation', price: '€400 - €650 /m²', note: 'new installations and quality finishes' },
        { concept: 'High-end full renovation', price: '€650 - €950 /m²', note: 'premium materials, bespoke design' },
        { concept: 'Full renovation 80-90 m² flat', price: '€30,000 - €55,000', note: 'depending on finishes' },
        { concept: 'Rental flat renovation 70 m²', price: '€18,000 - €30,000', note: 'hard-wearing finishes, fast timeline' },
      ],
      durationTitle: 'How long does a full renovation take?',
      duration: {
        typical: '8 - 12 weeks',
        range: '80-100 m² flat',
        factors: ['Condition of electrical and plumbing installations', 'Need to change layout or remove walls', 'Material choice and delivery times', 'Permits from Sabadell town hall'],
      },
      areasTitle: 'Areas we cover for full renovations',
      areasIntro: 'We work in every neighbourhood of Sabadell and within a 40-50 km radius. These are the areas where we carry out most full renovations:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials and finishes',
        items: ['First-quality porcelain and stoneware tiles', 'Parquet, hardwood and AC4/AC5 laminate', 'Taps and sanitaryware from recognised brands', 'Washable plastic paint and enamels', 'Aluminium or PVC double-glazed windows', 'Thermal and acoustic insulation'],
        warranty: 'All materials include the manufacturer’s warranty and we provide a 2-year workmanship guarantee.',
      },
    },
    pt: {
      intro: [
        'Em Sabadell e no Vallès, a maioria dos apartamentos que reformamos é dos anos 60, 70 e 80. Instalações ultrapassadas, acabamentos desgastados e divisões que já não se adaptam à forma como vivemos hoje. Uma reforma integral é a forma de transformar completamente o espaço sem surpresas.',
        'Na Junior Reformas temos mais de 15 anos de experiência a coordenar reformas integrais em Sabadell, Barcelona, Terrassa e Mataró. Gerimos tudo desde a demolição até à entrega final: alvenaria, canalizações, eletricidade, cozinha, casas de banho, soalhos, carpintaria e pintura. Um único interlocutor para toda a obra.',
        'Cada projeto começa com uma visita técnica gratuita e sem compromisso. Medimos o espaço, avaliamos o estado das instalações e estrutura, e preparamos um orçamento detalhado com prazos reais.',
      ],
      pricesTitle: 'Preços orientativos de reforma integral em Sabadell',
      pricesDisclaimer: 'Preços orientativos com IVA incluído. O orçamento definitivo é preparado após a visita técnica gratuita, consoante metros quadrados, estado inicial e acabamentos escolhidos.',
      prices: [
        { concept: 'Reforma básica (pintura, soalhos, casa de banho e cozinha)', price: 'desde 22.000 €', note: 'apartamento 70 m² aprox.' },
        { concept: 'Reforma integral média', price: '400 - 650 €/m²', note: 'mudança de instalações e acabados de qualidade' },
        { concept: 'Reforma integral alta', price: '650 - 950 €/m²', note: 'materiais premium, design à medida' },
        { concept: 'Reforma integral apartamento 80-90 m²', price: '30.000 - 55.000 €', note: 'consoante acabamentos' },
        { concept: 'Reforma para alugar 70 m²', price: '18.000 - 30.000 €', note: 'acabados resistentes, prazo rápido' },
      ],
      durationTitle: 'Duração de uma reforma integral',
      duration: {
        typical: '8 - 12 semanas',
        range: 'Apartamento 80-100 m²',
        factors: ['Estado das instalações elétricas e de canalização', 'Necessidade de alterar divisões ou derrubar paredes', 'Tipo de materiais e prazos de entrega', 'Trâmites na câmara municipal de Sabadell'],
      },
      areasTitle: 'Zonas onde fazemos reformas integrais',
      areasIntro: 'Trabalhamos em todos os bairros de Sabadell num raio de 40-50 km. Estas são as zonas onde realizamos mais reformas integrais:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiais e acabamentos',
        items: ['Porcelânico e grés de primeira qualidade', 'Soalho, parquet e flutuante AC4/AC5', 'Torneiras e sanitários de marcas reconhecidas', 'Tinta plástica lavável e esmaltes', 'Janelas de alumínio ou PVC com câmara', 'Isolamento térmico e acústico'],
        warranty: 'Todos os materiais incluem garantia do fabricante e damos 2 anos de garantia na execução da obra.',
      },
    },
    ca: {
      intro: [
        'A Sabadell i al Vallès, la majoria de pisos que reformem són dels anys 60, 70 i 80. Instal·lacions al límit, acabaments desgastats i una distribució que ja no s\'adapta a com vivim avui. Una reforma integral és la forma de transformar l\'espai completament sense sorpreses.',
        'A Junior Reformas portem més de 15 anys coordinant reformes integrals a Sabadell, Barcelona, Terrassa i Mataró. Gestionem tot des de la demolició fins a l\'entrega final: paleteria, fontaneria, electricitat, cuina, banys, terres, fusteria i pintura. Un únic interlocutor per a tota l\'obra.',
        'Cada projecte comença amb una visita tècnica gratuïta i sense compromís. Mesurem l\'espai, avaluem l\'estat de les instal·lacions i l\'estructura, i et preparem un pressupost desglossat amb terminis reals.',
      ],
      pricesTitle: 'Preus orientatius de reforma integral a Sabadell',
      pricesDisclaimer: 'Preus orientatius amb IVA inclòs. El pressupost definitiu es prepara després de la visita tècnica gratuïta, segons metres quadrats, estat inicial i acabats escollits.',
      prices: [
        { concept: 'Reforma bàsica (pintura, terres, bany i cuina)', price: 'des de 22.000 €', note: 'pis 70 m² aprox.' },
        { concept: 'Reforma integral mitjana', price: '400 - 650 €/m²', note: 'canvi d\'instal·lacions i acabats de qualitat' },
        { concept: 'Reforma integral alta', price: '650 - 950 €/m²', note: 'materials premium, disseny a mida' },
        { concept: 'Reforma integral pis 80-90 m²', price: '30.000 - 55.000 €', note: 'segons acabats' },
        { concept: 'Reforma per llogar 70 m²', price: '18.000 - 30.000 €', note: 'acabats resistents, termini ràpid' },
      ],
      durationTitle: 'Durada d\'una reforma integral',
      duration: {
        typical: '8 - 12 setmanes',
        range: 'Pis 80-100 m²',
        factors: ['Estat de les instal·lacions elèctriques i de fontaneria', 'Necessitat de canviar la distribució o enderrocar parets', 'Tipus de materials i terminis d\'entrega', 'Tràmits amb l\'ajuntament de Sabadell'],
      },
      areasTitle: 'Zones on fem reformes integrals',
      areasIntro: 'Treballem a tots els barris de Sabadell i en un radi de 40-50 km. Aquestes són les zones on fem més reformes integrals:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials i acabats',
        items: ['Porcel·lànic i gres de primera qualitat', 'Parquet, tarima i laminat AC4/AC5', 'Aixetes i sanitaris de marques reconegudes', 'Pintura plàstica rentable i esmalts', 'Finestres d\'alumini o PVC amb cambra', 'Aïllament tèrmic i acústic'],
        warranty: 'Tots els materials inclouen garantia del fabricant i donem 2 anys de garantia en l\'execució de l\'obra.',
      },
    },
  },
  'banos': {
    es: {
      intro: [
        'La reforma de baño es una de las más demandadas en Sabadell. Cambiar la bañera por plato de ducha, renovar el alicatado, instalar sanitarios modernos y mejorar la iluminación transforma por completo el espacio sin necesidad de una obra integral.',
        'En Junior Reformas hacemos reformas de baño completas en Sabadell, Barcelona, Terrassa y Mataró. Gestionamos la demolición, fontanería, electricidad, alicatado, sanitarios, mampara y acabados con un solo equipo.',
        'Cada baño es diferente: un baño pequeño de 4 m² no tiene las mismas necesidades que un baño doble de 8 m². Por eso empezamos siempre con una visita técnica gratuita para medir, evaluar instalaciones y proponerte la mejor solución.',
      ],
      pricesTitle: 'Precios orientativos de reforma de baño en Sabadell',
      pricesDisclaimer: 'Precios con IVA incluido. El presupuesto definitivo depende del tamaño del baño, estado de las instalaciones y materiales elegidos.',
      prices: [
        { concept: 'Cambio bañera por plato de ducha', price: 'desde 1.800 €', note: 'sin cambiar alicatado completo' },
        { concept: 'Reforma de baño pequeño (4-5 m²)', price: '3.000 - 5.500 €', note: 'estándar' },
        { concept: 'Reforma de baño completo (5-7 m²)', price: '4.500 - 8.000 €', note: 'media-alta' },
        { concept: 'Reforma de baño premium (+7 m²)', price: '8.000 - 12.000 €', note: 'materiales de gama alta' },
        { concept: 'Cambio de instalaciones de fontanería', price: '600 - 1.500 €', note: 'según complejidad' },
      ],
      durationTitle: 'Cuánto tarda reformar un baño',
      duration: {
        typical: '1 - 3 semanas',
        range: 'Baño completo',
        factors: ['Necesidad de cambiar instalaciones completas', 'Tipo de alicatado y tiempo de secado', 'Demora en la entrega de muebles o mampara', 'Impermeabilización adicional'],
      },
      areasTitle: 'Dónde reformamos baños',
      areasIntro: 'Realizamos reformas de baño en Sabadell y alrededores, incluyendo todos estos barrios y localidades:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiales que utilizamos en baños',
        items: ['Azulejos y porcelánico antideslizante', 'Platos de ducha de resina o porcelánico', 'Sanitarios suspendidos y cisternas empotradas', 'Grifería termostática de marcas reconocidas', 'Mamparas de cristal templado', 'Espejos LED e iluminación integrada'],
        warranty: 'Garantía de 2 años en la ejecución y garantía del fabricante en todos los materiales.',
      },
    },
    en: {
      intro: [
        'Bathroom renovation is one of the most requested services in Sabadell. Replacing the bathtub with a shower tray, updating wall tiles, installing modern sanitaryware and improving lighting completely transforms the space without needing a full renovation.',
        'At Junior Reformas we carry out complete bathroom renovations in Sabadell, Barcelona, Terrassa and Mataró. We manage demolition, plumbing, electrics, tiling, sanitaryware, shower screen and finishes with a single team.',
        'Every bathroom is different: a small 4 m² bathroom does not have the same needs as a double 8 m² bathroom. That is why we always start with a free technical visit to measure, assess installations and propose the best solution.',
      ],
      pricesTitle: 'Guide prices for bathroom renovation in Sabadell',
      pricesDisclaimer: 'Prices include VAT. The final quote depends on bathroom size, installation condition and chosen materials.',
      prices: [
        { concept: 'Bathtub to shower tray replacement', price: 'from €1,800', note: 'without full retiling' },
        { concept: 'Small bathroom renovation (4-5 m²)', price: '€3,000 - €5,500', note: 'standard' },
        { concept: 'Complete bathroom renovation (5-7 m²)', price: '€4,500 - €8,000', note: 'mid-high range' },
        { concept: 'Premium bathroom (+7 m²)', price: '€8,000 - €12,000', note: 'high-end materials' },
        { concept: 'Full plumbing replacement', price: '€600 - €1,500', note: 'depending on complexity' },
      ],
      durationTitle: 'How long does a bathroom renovation take?',
      duration: {
        typical: '1 - 3 weeks',
        range: 'Complete bathroom',
        factors: ['Need to replace all installations', 'Tile type and drying time', 'Delivery delay for furniture or shower screen', 'Additional waterproofing'],
      },
      areasTitle: 'Areas where we renovate bathrooms',
      areasIntro: 'We carry out bathroom renovations in Sabadell and surroundings, including all these neighbourhoods and locations:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials we use in bathrooms',
        items: ['Anti-slip tiles and porcelain', 'Resin or porcelain shower trays', 'Wall-hung sanitaryware and concealed cisterns', 'Thermostatic taps from recognised brands', 'Tempered glass shower screens', 'LED mirrors and integrated lighting'],
        warranty: '2-year workmanship guarantee and manufacturer warranty on all materials.',
      },
    },
    pt: {
      intro: [
        'A reforma de casa de banho é uma das mais pedidas em Sabadell. Trocar a banheira por base de duche, renovar o azulejo, instalar sanitários modernos e melhorar a iluminação transforma completamente o espaço sem ser necessária uma reforma integral.',
        'Na Junior Reformas fazemos remodelações completas de casas de banho em Sabadell, Barcelona, Terrassa e Mataró. Gerimos a demolição, canalizações, eletricidade, azulejo, sanitários, mampara e acabamentos com uma única equipa.',
        'Cada casa de banho é diferente: uma pequena de 4 m² não tem as mesmas necessidades que uma dupla de 8 m². Por isso começamos sempre com uma visita técnica gratuita para medir, avaliar instalações e propor a melhor solução.',
      ],
      pricesTitle: 'Preços orientativos de remodelação de casa de banho em Sabadell',
      pricesDisclaimer: 'Preços com IVA incluído. O orçamento definitivo depende do tamanho da casa de banho, estado das instalações e materiais escolhidos.',
      prices: [
        { concept: 'Troca de banheira por base de duche', price: 'desde 1.800 €', note: 'sem mudar azulejo completo' },
        { concept: 'Casa de banho pequena (4-5 m²)', price: '3.000 - 5.500 €', note: 'standard' },
        { concept: 'Casa de banho completa (5-7 m²)', price: '4.500 - 8.000 €', note: 'média-alta' },
        { concept: 'Casa de banho premium (+7 m²)', price: '8.000 - 12.000 €', note: 'materiais de gama alta' },
        { concept: 'Mudança completa de canalizações', price: '600 - 1.500 €', note: 'consoante complexidade' },
      ],
      durationTitle: 'Quanto tempo demora a remodelar uma casa de banho?',
      duration: {
        typical: '1 - 3 semanas',
        range: 'Casa de banho completa',
        factors: ['Necessidade de substituir instalações completas', 'Tipo de azulejo e tempo de secagem', 'Atraso na entrega de móveis ou mampara', 'Impermeabilização adicional'],
      },
      areasTitle: 'Onde fazemos remodelações de casas de banho',
      areasIntro: 'Realizamos remodelações de casas de banho em Sabadell e arredores, incluindo todos estes bairros e localidades:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiais que utilizamos em casas de banho',
        items: ['Azulejo e porcelânico antiderrapante', 'Bases de duche em resina ou porcelânico', 'Sanitários suspensos e cisternas embutidas', 'Torneiras termostáticas de marcas reconhecidas', 'Mamparas de vidro temperado', 'Espelhos LED e iluminação integrada'],
        warranty: 'Garantia de 2 anos na execução e garantia do fabricante em todos os materiais.',
      },
    },
    ca: {
      intro: [
        'La reforma de bany és una de les més demandades a Sabadell. Canviar la banyera per plat de dutxa, renovar l\'alicatat, instal·lar sanitaris moderns i millorar la il·luminació transforma completament l\'espai sense necessitat d\'una obra integral.',
        'A Junior Reformas fem reformes de bany completes a Sabadell, Barcelona, Terrassa i Mataró. Gestionem la demolició, la fontaneria, l\'electricitat, l\'alicatat, els sanitaris, la mampara i els acabats amb un únic equip.',
        'Cada bany és diferent: un bany petit de 4 m² no té les mateixes necessitats que un bany doble de 8 m². Per això comencem sempre amb una visita tècnica gratuïta per mesurar, avaluar les instal·lacions i proposar-te la millor solució.',
      ],
      pricesTitle: 'Preus orientatius de reforma de bany a Sabadell',
      pricesDisclaimer: 'Preus amb IVA inclòs. El pressupost definitiu depèn de la mida del bany, estat de les instal·lacions i materials escollits.',
      prices: [
        { concept: 'Canvi de banyera per plat de dutxa', price: 'des de 1.800 €', note: 'sense canviar alicatat complet' },
        { concept: 'Reforma de bany petit (4-5 m²)', price: '3.000 - 5.500 €', note: 'estàndard' },
        { concept: 'Reforma de bany complet (5-7 m²)', price: '4.500 - 8.000 €', note: 'mitjana-alta' },
        { concept: 'Reforma de bany premium (+7 m²)', price: '8.000 - 12.000 €', note: 'materials de gamma alta' },
        { concept: 'Canvi d\'instal·lacions de fontaneria', price: '600 - 1.500 €', note: 'segons complexitat' },
      ],
      durationTitle: 'Quant triga reformar un bany',
      duration: {
        typical: '1 - 3 setmanes',
        range: 'Bany complet',
        factors: ['Necessitat de canviar instal·lacions completes', 'Tipus d\'alicatat i temps de secat', 'Demora en l\'entrega de mobles o mampara', 'Impermeabilització addicional'],
      },
      areasTitle: 'On reformem banys',
      areasIntro: 'Realitzem reformes de bany a Sabadell i rodalies, incloent tots aquests barris i localitats:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials que utilitzem en banys',
        items: ['Rajoles i porcel·lànic antilliscant', 'Plats de dutxa de resina o porcel·lànic', 'Sanitaris suspesos i cisternes encastades', 'Aixetes termostàtiques de marques reconegudes', 'Mampares de vidre templat', 'Miralls LED i il·luminació integrada'],
        warranty: 'Garantia de 2 anys en l\'execució i garantia del fabricant en tots els materials.',
      },
    },
  },
  'cocinas': {
    es: {
      intro: [
        'La cocina es el corazón de la casa. Una reforma bien planteada mejora la distribución, el almacenamiento, la iluminación y la conexión con el salón o comedor. En Sabadell muchos clientes apuestan por abrir la cocina al salón o por una distribución en L o isla.',
        'En Junior Reformas diseñamos cocinas a medida en Sabadell, Barcelona, Terrassa y Mataró. Nos encargamos del mobiliario, encimera, electrodomésticos, instalaciones de agua, luz y gas, alicatado, suelo y acabados.',
        'Cada proyecto empieza con una visita técnica en la que medimos el espacio, estudiamos la distribución actual y te proponemos soluciones según tu presupuesto y forma de cocinar.',
      ],
      pricesTitle: 'Precios orientativos de reforma de cocina en Sabadell',
      pricesDisclaimer: 'Precios con IVA incluido. El presupuesto definitivo depende de los metros, la distribución, los muebles y los electrodomésticos elegidos.',
      prices: [
        { concept: 'Cocina pequeña (5-6 m²)', price: '5.000 - 9.000 €', note: 'estándar' },
        { concept: 'Cocina media (7-9 m²)', price: '7.000 - 14.000 €', note: 'calidad media-alta' },
        { concept: 'Cocina grande o abierta al salón', price: '12.000 - 20.000 €', note: 'con isla o península' },
        { concept: 'Cocina premium con electrodomésticos altos', price: '20.000 - 35.000 €', note: 'materiales de gama alta' },
        { concept: 'Suelo y alicatado de cocina', price: '1.500 - 4.000 €', note: 'según materiales' },
      ],
      durationTitle: 'Cuánto tarda reformar una cocina',
      duration: {
        typical: '2 - 5 semanas',
        range: 'Cocina completa',
        factors: ['Necesidad de cambiar instalaciones de agua, luz o gas', 'Tiempo de fabricación de muebles a medida', 'Tipo de encimera y tiempos de instalación', 'Apertura de tabiques no estructurales'],
      },
      areasTitle: 'Dónde reformamos cocinas',
      areasIntro: 'Diseñamos y reformamos cocinas en Sabadell y en un radio de 40-50 km. Estas son las zonas principales:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiales que utilizamos en cocinas',
        items: ['Muebles de melamina, lacados o madera natural', 'Encimeras de cuarzo, compacto, granito o madera', 'Azulejos, porcelánico y revestimientos anti-salpicaduras', 'Electrodomésticos de marcas reconocidas', 'Iluminación LED bajo mueble y focos', 'Grifería monomando y osmosis'],
        warranty: 'Garantía de 2 años en la ejecución y garantía del fabricante en mobiliario y electrodomésticos.',
      },
    },
    en: {
      intro: [
        'The kitchen is the heart of the home. A well-planned renovation improves layout, storage, lighting and connection with the living or dining room. In Sabadell many clients choose to open the kitchen to the living room or opt for an L-shaped layout or island.',
        'At Junior Reformas we design bespoke kitchens in Sabadell, Barcelona, Terrassa and Mataró. We take care of cabinetry, worktops, appliances, water, electricity and gas installations, tiling, flooring and finishes.',
        'Every project starts with a technical visit where we measure the space, study the current layout and propose solutions based on your budget and cooking habits.',
      ],
      pricesTitle: 'Guide prices for kitchen renovation in Sabadell',
      pricesDisclaimer: 'Prices include VAT. The final quote depends on square metres, layout, cabinetry and chosen appliances.',
      prices: [
        { concept: 'Small kitchen (5-6 m²)', price: '€5,000 - €9,000', note: 'standard' },
        { concept: 'Medium kitchen (7-9 m²)', price: '€7,000 - €14,000', note: 'mid-high quality' },
        { concept: 'Large or open-plan kitchen', price: '€12,000 - €20,000', note: 'with island or peninsula' },
        { concept: 'Premium kitchen with high-end appliances', price: '€20,000 - €35,000', note: 'luxury materials' },
        { concept: 'Kitchen flooring and tiling', price: '€1,500 - €4,000', note: 'depending on materials' },
      ],
      durationTitle: 'How long does a kitchen renovation take?',
      duration: {
        typical: '2 - 5 weeks',
        range: 'Complete kitchen',
        factors: ['Need to change water, electricity or gas installations', 'Manufacturing time for bespoke cabinetry', 'Worktop type and installation time', 'Opening non-structural walls'],
      },
      areasTitle: 'Areas where we renovate kitchens',
      areasIntro: 'We design and renovate kitchens in Sabadell and within a 40-50 km radius. These are the main areas:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials we use in kitchens',
        items: ['Melamine, lacquered or natural wood cabinetry', 'Quartz, compact, granite or wood worktops', 'Tiles, porcelain and splashback cladding', 'Appliances from recognised brands', 'LED lighting under cabinets and spotlights', 'Single-lever taps and osmosis systems'],
        warranty: '2-year workmanship guarantee and manufacturer warranty on cabinetry and appliances.',
      },
    },
    pt: {
      intro: [
        'A cozinha é o coração da casa. Uma reforma bem planeada melhora a distribuição, o armazenamento, a iluminação e a ligação com a sala de estar ou de jantar. Em Sabadell muitos clientes apostam em abrir a cozinha à sala ou numa distribuição em L ou ilha.',
        'Na Junior Reformas desenhamos cozinhas à medida em Sabadell, Barcelona, Terrassa e Mataró. Encarregamo-nos dos móveis, bancada, eletrodomésticos, instalações de água, luz e gás, azulejo, soalho e acabamentos.',
        'Cada projeto começa com uma visita técnica em que medimos o espaço, estudamos a distribuição atual e propomos soluções consoante o orçamento e a forma de cozinhar.',
      ],
      pricesTitle: 'Preços orientativos de reforma de cozinha em Sabadell',
      pricesDisclaimer: 'Preços com IVA incluído. O orçamento definitivo depende dos metros, distribuição, móveis e eletrodomésticos escolhidos.',
      prices: [
        { concept: 'Cozinha pequena (5-6 m²)', price: '5.000 - 9.000 €', note: 'standard' },
        { concept: 'Cozinha média (7-9 m²)', price: '7.000 - 14.000 €', note: 'qualidade média-alta' },
        { concept: 'Cozinha grande ou aberta à sala', price: '12.000 - 20.000 €', note: 'com ilha ou península' },
        { concept: 'Cozinha premium com eletrodomésticos altos', price: '20.000 - 35.000 €', note: 'materiais de gama alta' },
        { concept: 'Solo e azulejo de cozinha', price: '1.500 - 4.000 €', note: 'consoante materiais' },
      ],
      durationTitle: 'Quanto tempo demora a reformar uma cozinha?',
      duration: {
        typical: '2 - 5 semanas',
        range: 'Cozinha completa',
        factors: ['Necessidade de mudar instalações de água, luz ou gás', 'Prazo de fabricação de móveis à medida', 'Tipo de bancada e tempo de instalação', 'Abertura de paredes não estruturais'],
      },
      areasTitle: 'Onde fazemos reformas de cozinha',
      areasIntro: 'Desenhamos e reformamos cozinhas em Sabadell e num raio de 40-50 km. Estas são as zonas principais:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiais que utilizamos em cozinhas',
        items: ['Móveis de melamina, lacados ou madeira natural', 'Bancadas de quartzo, compacto, granito ou madeira', 'Azulejo, porcelânico e revestimentos anti-respingo', 'Eletrodomésticos de marcas reconhecidas', 'Iluminação LED sob móvel e focos', 'Torneiras monocomando e osmose'],
        warranty: 'Garantia de 2 anos na execução e garantia do fabricante em móveis e eletrodomésticos.',
      },
    },
    ca: {
      intro: [
        'La cuina és el cor de la casa. Una reforma ben plantejada millora la distribució, l\'emmagatzematge, la il·luminació i la connexió amb el saló o el menjador. A Sabadell molts clients aposten per obrir la cuina al saló o per una distribució en L o illa.',
        'A Junior Reformas dissenyem cuines a mida a Sabadell, Barcelona, Terrassa i Mataró. Ens encarreguem del mobiliari, la encimera, els electrodomèstics, les instal·lacions d\'aigua, llum i gas, l\'alicatat, el terra i els acabats.',
        'Cada projecte comença amb una visita tècnica en què mesurem l\'espai, estudiem la distribució actual et proposem solucions segons el teu pressupost i forma de cuinar.',
      ],
      pricesTitle: 'Preus orientatius de reforma de cuina a Sabadell',
      pricesDisclaimer: 'Preus amb IVA inclòs. El pressupost definitiu depèn dels metres, la distribució, els mobles i els electrodomèstics escollits.',
      prices: [
        { concept: 'Cuina petita (5-6 m²)', price: '5.000 - 9.000 €', note: 'estàndard' },
        { concept: 'Cuina mitjana (7-9 m²)', price: '7.000 - 14.000 €', note: 'qualitat mitjana-alta' },
        { concept: 'Cuina gran o oberta al saló', price: '12.000 - 20.000 €', note: 'amb illa o península' },
        { concept: 'Cuina premium amb electrodomèstics alts', price: '20.000 - 35.000 €', note: 'materials de gamma alta' },
        { concept: 'Terra i alicatat de cuina', price: '1.500 - 4.000 €', note: 'segons materials' },
      ],
      durationTitle: 'Quant triga reformar una cuina',
      duration: {
        typical: '2 - 5 setmanes',
        range: 'Cuina completa',
        factors: ['Necessitat de canviar instal·lacions d\'aigua, llum o gas', 'Temps de fabricació de mobles a mida', 'Tipus d\'encimera i temps d\'instal·lació', 'Obertura de parets no estructurals'],
      },
      areasTitle: 'On reformem cuines',
      areasIntro: 'Dissenyem i reformem cuines a Sabadell i en un radi de 40-50 km. Aquestes són les zones principals:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials que utilitzem en cuines',
        items: ['Mobles de melamina, lacats o fusta natural', 'Encimeres de quars, compacte, granit o fusta', 'Rajoles, porcel·lànic i revestiments anti-salpicadures', 'Electrodomèstics de marques reconegudes', 'Il·luminació LED sota moble i focus', 'Aixetes monocomandament i osmosi'],
        warranty: 'Garantia de 2 anys en l\'execució i garantia del fabricant en mobiliari i electrodomèstics.',
      },
    },
  },
  'suelos-y-parquet': {
    es: {
      intro: [
        'El suelo es uno de los elementos que más transforma una vivienda. Cambiar un suelo antiguo por parquet, tarima o porcelánico nuevo aporta calidez, limpieza y una sensación de obra terminada sin necesidad de una reforma integral.',
        'En Junior Reformas instalamos suelos de parquet, tarima de madera, laminado AC4/AC5 y porcelánico en Sabadell, Barcelona, Terrassa y Mataró. Nivelamos la base, retiramos el pavimento antiguo y dejamos el acabado listo para usar.',
        'La clave de un buen suelo está en la preparación de la base. Por eso empezamos siempre con una visita técnica para comprobar la nivelación, la humedad y el estado de la solera.',
      ],
      pricesTitle: 'Precios orientativos de suelos y parquet en Sabadell',
      pricesDisclaimer: 'Precios con IVA incluido por m² instalado. El presupuesto definitivo depende del material elegido, el estado de la base y los metros a cubrir.',
      prices: [
        { concept: 'Parquet flotante laminado AC4/AC5', price: '35 - 60 €/m²', note: 'material e instalación' },
        { concept: 'Tarima de madera natural', price: '60 - 110 €/m²', note: 'roble, haya, etc.' },
        { concept: 'Suelo porcelánico', price: '45 - 90 €/m²', note: 'incluye colocación con niveladores' },
        { concept: 'Nivelación de solera', price: '15 - 30 €/m²', note: 'cuando la base no está lista' },
        { concept: 'Retirada de suelo antiguo', price: '8 - 15 €/m²', note: 'incluye sacar escombros' },
      ],
      durationTitle: 'Cuánto tarda cambiar el suelo',
      duration: {
        typical: '3 - 7 días',
        range: 'Piso de 80-100 m²',
        factors: ['Estado de la solera y necesidad de nivelar', 'Tipo de material y tiempo de acopio', 'Necesidad de levantar rodapiés y puertas', 'Secado de adhesivos o masillas'],
      },
      areasTitle: 'Dónde instalamos suelos y parquet',
      areasIntro: 'Trabajamos en Sabadell y alrededores, instalando suelos en pisos, casas y locales comerciales:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiales que utilizamos en suelos',
        items: ['Parquet flotante de marcas certificadas', 'Tarima maciza y engineered', 'Suelo laminado AC4/AC5 resistente', 'Porcelánico imitación madera o piedra', 'Rodapiés y perfiles a juego', 'Barnices y productos de mantenimiento'],
        warranty: 'Garantía de 2 años en la instalación y garantía del fabricante en todos los materiales.',
      },
    },
    en: {
      intro: [
        'Flooring is one of the elements that most transforms a home. Replacing an old floor with new parquet, hardwood or porcelain adds warmth, cleanliness and a finished feel without needing a full renovation.',
        'At Junior Reformas we install parquet, hardwood, AC4/AC5 laminate and porcelain flooring in Sabadell, Barcelona, Terrassa and Mataró. We level the base, remove the old flooring and leave the finish ready to use.',
        'The key to a good floor is base preparation. That is why we always start with a technical visit to check levelling, moisture and the condition of the screed.',
      ],
      pricesTitle: 'Guide prices for flooring and parquet in Sabadell',
      pricesDisclaimer: 'Prices include VAT per m² installed. The final quote depends on the chosen material, base condition and area to cover.',
      prices: [
        { concept: 'AC4/AC5 floating laminate', price: '€35 - €60 /m²', note: 'material and installation' },
        { concept: 'Natural hardwood flooring', price: '€60 - €110 /m²', note: 'oak, beech, etc.' },
        { concept: 'Porcelain flooring', price: '€45 - €90 /m²', note: 'including installation with levellers' },
        { concept: 'Screed levelling', price: '€15 - €30 /m²', note: 'when base is not ready' },
        { concept: 'Removal of old flooring', price: '€8 - €15 /m²', note: 'including debris removal' },
      ],
      durationTitle: 'How long does it take to change the floor?',
      duration: {
        typical: '3 - 7 days',
        range: '80-100 m² flat',
        factors: ['Screed condition and need for levelling', 'Material type and delivery time', 'Need to remove skirting boards and doors', 'Drying of adhesives or fillers'],
      },
      areasTitle: 'Areas where we install flooring and parquet',
      areasIntro: 'We work in Sabadell and surroundings, installing flooring in flats, houses and commercial premises:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials we use for flooring',
        items: ['Certified brand floating parquet', 'Solid and engineered hardwood', 'Resistant AC4/AC5 laminate', 'Porcelain imitation wood or stone', 'Matching skirting boards and profiles', 'Varnishes and maintenance products'],
        warranty: '2-year installation guarantee and manufacturer warranty on all materials.',
      },
    },
    pt: {
      intro: [
        'O soalho é um dos elementos que mais transforma uma casa. Trocar um soalho antigo por parquet, tarima ou porcelânico novo dá calor, limpeza e uma sensação de obra terminada sem ser necessária uma reforma integral.',
        'Na Junior Reformas instalamos soalhos de parquet, tarima de madeira, flutuante AC4/AC5 e porcelânico em Sabadell, Barcelona, Terrassa e Mataró. Nivelamos a base, retiramos o pavimento antigo e deixamos o acabado pronto a usar.',
        'A chave de um bom soalho está na preparação da base. Por isso começamos sempre com uma visita técnica para verificar a nivelagem, a humidade e o estado do contrapiso.',
      ],
      pricesTitle: 'Preços orientativos de soalhos e parquet em Sabadell',
      pricesDisclaimer: 'Preços com IVA incluído por m² instalado. O orçamento definitivo depende do material escolhido, estado da base e metros a cobrir.',
      prices: [
        { concept: 'Flutuante laminado AC4/AC5', price: '35 - 60 €/m²', note: 'material e instalação' },
        { concept: 'Tarima de madeira natural', price: '60 - 110 €/m²', note: 'carvalho, faia, etc.' },
        { concept: 'Solo porcelânico', price: '45 - 90 €/m²', note: 'inclui colocação com niveladores' },
        { concept: 'Nivelamento de contrapiso', price: '15 - 30 €/m²', note: 'quando a base não está pronta' },
        { concept: 'Retirada de soalho antigo', price: '8 - 15 €/m²', note: 'inclui remover entulho' },
      ],
      durationTitle: 'Quanto tempo demora trocar o soalho?',
      duration: {
        typical: '3 - 7 dias',
        range: 'Apartamento 80-100 m²',
        factors: ['Estado do contrapiso e necessidade de nivelar', 'Tipo de material e prazo de entrega', 'Necessidade de levantar rodapés e portas', 'Secagem de adesivos ou massas'],
      },
      areasTitle: 'Onde instalamos soalhos e parquet',
      areasIntro: 'Trabalhamos em Sabadell e arredores, instalando soalhos em apartamentos, casas e locais comerciais:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materiais que utilizamos em soalhos',
        items: ['Parquet flutuante de marcas certificadas', 'Tarima maciça e engineered', 'Flutuante AC4/AC5 resistente', 'Porcelânico imitação madeira ou pedra', 'Rodapés e perfis a condizer', 'Vernizes e produtos de manutenção'],
        warranty: 'Garantia de 2 anos na instalação e garantia do fabricante em todos os materiais.',
      },
    },
    ca: {
      intro: [
        'El terra és un dels elements que més transforma un habitatge. Canviar un terra antic per parquet, tarima o porcel·lànic nou aporta calidesa, netedat i una sensació d\'obra acabada sense necessitat d\'una reforma integral.',
        'A Junior Reformas instal·lem terres de parquet, tarima de fusta, laminat AC4/AC5 i porcel·lànic a Sabadell, Barcelona, Terrassa i Mataró. Nivelleem la base, retirem el paviment antic i deixem l\'acabat llest per usar.',
        'La clau d\'un bon terra està en la preparació de la base. Per això comencem sempre amb una visita tècnica per comprovar la nivelació, la humitat i l\'estat de la solera.',
      ],
      pricesTitle: 'Preus orientatius de terres i parquet a Sabadell',
      pricesDisclaimer: 'Preus amb IVA inclòs per m² instal·lat. El pressupost definitiu depèn del material escollit, l\'estat de la base i els metres a cobrir.',
      prices: [
        { concept: 'Parquet flotant laminat AC4/AC5', price: '35 - 60 €/m²', note: 'material i instal·lació' },
        { concept: 'Tarima de fusta natural', price: '60 - 110 €/m²', note: 'roure, faig, etc.' },
        { concept: 'Terra porcel·lànic', price: '45 - 90 €/m²', note: 'inclou col·locació amb niveladors' },
        { concept: 'Nivellació de solera', price: '15 - 30 €/m²', note: 'quan la base no està llesta' },
        { concept: 'Retirada de terra antic', price: '8 - 15 €/m²', note: 'inclou treure runa' },
      ],
      durationTitle: 'Quant triga canviar el terra',
      duration: {
        typical: '3 - 7 dies',
        range: 'Pis 80-100 m²',
        factors: ['Estat de la solera i necessitat de nivellar', 'Tipus de material i temps d\'aprovisionament', 'Necessitat de aixecar rodapeus i portes', 'Assecat d\'adhesius o massilles'],
      },
      areasTitle: 'On instal·lem terres i parquet',
      areasIntro: 'Treballem a Sabadell i rodalies, instal·lant terres en pisos, cases i locals comercials:',
      areas: ALL_AREAS,
      materials: {
        title: 'Materials que utilitzem en terres',
        items: ['Parquet flotant de marques certificades', 'Tarima massissa i engineered', 'Laminat AC4/AC5 resistent', 'Porcel·lànic imitació fusta o pedra', 'Rodapeus i perfils a joc', 'Barnissos i productes de manteniment'],
        warranty: 'Garantia de 2 anys en la instal·lació i garantia del fabricant en tots els materials.',
      },
    },
  },
  pintura: {
    es: {
      intro: [
          "Una buena pintura es el acabado que más noticia se lleva al entrar en una casa. Quitar el gotelé, alisar paredes y aplicar colores actuales renueva por completo cualquier estancia sin obras mayores.",
          "En Junior Reformas pintamos pisos completos en Sabadell, Barcelona, Terrassa y Mataró. Trabajamos con pintura plástica de calidad, esmaltes lavables y acabados alisados que duran en el tiempo.",
          "Preparamos bien las superficies antes de pintar: reparamos grietas, alisamos y aplicamos imprimación para que el resultado sea impecable."
        ],
      pricesTitle: "Precios orientativos de pintura en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo depende de los metros, el estado de las paredes y el tipo de acabado.",
      prices: [
          {
          concept: "Pintar piso 70-80 m²",
          price: "1.500 - 3.000 €",
          note: "paredes y techos"
        },
          {
          concept: "Quitar gotelé y alisar paredes",
          price: "25 - 45 €/m²",
          note: "incluye pintura"
        },
          {
          concept: "Pintura estándar",
          price: "8 - 15 €/m²",
          note: "paredes lisas"
        },
          {
          concept: "Esmalte de puertas y ventanas",
          price: "80 - 150 €/unidad",
          note: "según tamaño"
        },
          {
          concept: "Pintura de fachada",
          price: "15 - 30 €/m²",
          note: "según acceso"
        }
        ],
      durationTitle: "Cuánto tarda pintar un piso",
      duration: {
        typical: "3 - 7 días",
        range: "Piso de 80 m²",
        factors: [
            "Estado de las paredes y necesidad de alisar",
            "Número de colores y acabados",
            "Secado entre capas",
            "Protección de suelos y muebles"
          ]
      },
      areasTitle: "Dónde pintamos",
      areasIntro: "Realizamos trabajos de pintura en Sabadell y alrededores:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en pintura",
        items: [
            "Pintura plástica lavable de calidad",
            "Imprimaciones y fijadores",
            "Masillas de alisado",
            "Esmaltes al agua y sintéticos",
            "Siliconas y selladores",
            "Colores a medida"
          ],
        warranty: "Garantía de 2 años en la aplicación y garantía del fabricante en pinturas."
      }
    }
  },
  albanileria: {
    es: {
      intro: [
          "La albañilería es la base de toda reforma de calidad. Tirar tabiques, levantar muros, enfoscar y nivelar soleras son trabajos que definen el resultado final de la obra.",
          "En Junior Reformas realizamos trabajos de albañilería en Sabadell, Barcelona, Terrassa y Mataró con control de cada fase, desde la demolición controlada hasta los acabados previos a pintura.",
          "Trabajamos tanto con particulares que necesitan una reforma parcial como con obras integrales donde coordinamos todos los gremios."
        ],
      pricesTitle: "Precios orientativos de albañilería en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo se prepara tras visita técnica.",
      prices: [
          {
          concept: "Tirar tabique de ladrillo o pladur",
          price: "150 - 400 €",
          note: "según tamaño"
        },
          {
          concept: "Levantar tabique nuevo",
          price: "200 - 500 €",
          note: "incluye materiales"
        },
          {
          concept: "Enfoscado y revoco",
          price: "25 - 45 €/m²",
          note: "paredes"
        },
          {
          concept: "Nivelación de solera",
          price: "15 - 30 €/m²",
          note: "según espesor"
        },
          {
          concept: "Apertura de hueco",
          price: "300 - 800 €",
          note: "puerta o ventana"
        }
        ],
      durationTitle: "Duración de trabajos de albañilería",
      duration: {
        typical: "2 - 10 días",
        range: "Según alcance",
        factors: [
            "Metros de tabique a tirar o levantar",
            "Necesidad de reforzar estructuras",
            "Tiempo de secado de enfoscados",
            "Acceso al inmueble y retirada de escombros"
          ]
      },
      areasTitle: "Dónde hacemos albañilería",
      areasIntro: "Realizamos trabajos de albañilería en Sabadell y en un radio de 40-50 km:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en albañilería",
        items: [
            "Ladrillo hueco y bloques de hormigón",
            "Mortero de cemento y yeso",
            "Placas de pladur y perfiles",
            "Aislamiento térmico y acústico",
            "Hierro para refuerzos",
            "Impermeabilizantes para baños y terrazas"
          ],
        warranty: "Garantía de 2 años en la ejecución de los trabajos de albañilería."
      }
    }
  },
  electricidad: {
    es: {
      intro: [
          "La instalación eléctrica es una de las partes más importantes de una reforma, especialmente en pisos antiguos de Sabadell donde los cuadros y cableados ya no cumplen con las necesidades actuales.",
          "En Junior Reformas renovamos instalaciones eléctricas completas: cuadro, protecciones, cableado, puntos de luz, enchufes e iluminación LED. Trabajamos con boletín incluido cuando proceda.",
          "Cada reforma eléctrica empieza con una visita técnica para evaluar el estado actual, la potencia contratada y las necesidades de cada estancia."
        ],
      pricesTitle: "Precios orientativos de electricidad en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo depende del número de puntos, metros de vivienda y estado actual.",
      prices: [
          {
          concept: "Renovación eléctrica parcial",
          price: "1.200 - 2.500 €",
          note: "puntos específicos"
        },
          {
          concept: "Instalación eléctrica completa piso 80 m²",
          price: "4.000 - 7.000 €",
          note: "cuadro, cableado y puntos"
        },
          {
          concept: "Cuadro eléctrico nuevo",
          price: "400 - 900 €",
          note: "según líneas"
        },
          {
          concept: "Punto de luz o enchufe nuevo",
          price: "60 - 120 €",
          note: "por unidad"
        },
          {
          concept: "Iluminación LED completa",
          price: "800 - 2.000 €",
          note: "según vivienda"
        }
        ],
      durationTitle: "Duración de una reforma eléctrica",
      duration: {
        typical: "3 - 7 días",
        range: "Instalación completa",
        factors: [
            "Número de puntos a renovar",
            "Estado del cableado existente",
            "Necesidad de rozar paredes",
            "Tramitación del boletín"
          ]
      },
      areasTitle: "Dónde instalamos electricidad",
      areasIntro: "Realizamos instalaciones eléctricas en Sabadell y alrededores:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en electricidad",
        items: [
            "Cableado de cobre certificado",
            "Cuadros eléctricos con protecciones",
            "Mecanismos de marcas reconocidas",
            "Iluminación LED de bajo consumo",
            "Tomas USB y cargadores",
            "Sistemas de domótica básica"
          ],
        warranty: "Garantía de 2 años en la instalación y boletín eléctrico incluido cuando proceda."
      }
    }
  },
  fontaneria: {
    es: {
      intro: [
          "La fontanería es el sistema que hace que una casa funcione bien cada día. Renovar tuberías viejas, cambiar bajantes o instalar sanitarios modernos mejora el confort y evita problemas futuros.",
          "En Junior Reformas realizamos instalaciones de fontanería en reformas de baños, cocinas y pisos completos en Sabadell, Barcelona, Terrassa y Mataró.",
          "Trabajamos con tuberías multicapa, cobre y PVC según necesidad, y siempre hacemos pruebas de estanqueidad antes de cerrar paredes."
        ],
      pricesTitle: "Precios orientativos de fontanería en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo depende del alcance, número de puntos y estado de las tuberías.",
      prices: [
          {
          concept: "Renovación fontanería baño",
          price: "800 - 2.000 €",
          note: "tuberías y desagües"
        },
          {
          concept: "Cambio de bajante",
          price: "400 - 1.200 €",
          note: "según altura y acceso"
        },
          {
          concept: "Instalación de sanitarios",
          price: "200 - 500 €",
          note: "por unidad"
        },
          {
          concept: "Cisterna empotrada",
          price: "350 - 700 €",
          note: "incluye mecanismo"
        },
          {
          concept: "Calentador o termo eléctrico",
          price: "300 - 900 €",
          note: "según capacidad"
        }
        ],
      durationTitle: "Duración de trabajos de fontanería",
      duration: {
        typical: "2 - 5 días",
        range: "Según alcance",
        factors: [
            "Estado de las tuberías existentes",
            "Número de puntos de agua a renovar",
            "Necesidad de acceder a bajantes",
            "Pruebas de estanqueidad"
          ]
      },
      areasTitle: "Dónde hacemos fontanería",
      areasIntro: "Realizamos instalaciones de fontanería en Sabadell y alrededores:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en fontanería",
        items: [
            "Tubería multicapa y cobre",
            "PVC sanitario de alta resistencia",
            "Grifería termostática y monomando",
            "Sanitarios suspendidos y cisternas",
            "Sifones y válvulas antirretorno",
            "Calentadores y termos"
          ],
        warranty: "Garantía de 2 años en la instalación y garantía del fabricante en todos los materiales."
      }
    }
  },
  'pladur-y-techos': {
    es: {
      intro: [
          "El pladur es una solución versátil para crear tabiques, falsos techos y trasdosados con acabado perfecto. Permite ocultar instalaciones, mejorar el aislamiento y ganar espacio visual.",
          "En Junior Reformas montamos tabiques de pladur, falsos techos continuos y trasdosados en Sabadell, Barcelona, Terrassa y Mataró, con especial atención en las juntas y el lijado final.",
          "Trabajamos con placas estándar, resistentes a la humedad y con aislamiento, según la zona de la vivienda donde se vaya a instalar."
        ],
      pricesTitle: "Precios orientativos de pladur en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo depende de los metros, la altura y el tipo de placa.",
      prices: [
          {
          concept: "Tabique de pladur simple",
          price: "25 - 45 €/m²",
          note: "montado y acabado"
        },
          {
          concept: "Falso techo continuo",
          price: "30 - 55 €/m²",
          note: "incluye estructura"
        },
          {
          concept: "Trasdosado con aislamiento",
          price: "40 - 70 €/m²",
          note: "frente a fachada"
        },
          {
          concept: "Placa resistente a humedad",
          price: "+10 - 15 €/m²",
          note: "baños y cocinas"
        },
          {
          concept: "Registros y cortineros",
          price: "60 - 150 €/unidad",
          note: "según tamaño"
        }
        ],
      durationTitle: "Duración de trabajos de pladur",
      duration: {
        typical: "2 - 7 días",
        range: "Según metros",
        factors: [
            "Metros de tabique o techo a montar",
            "Necesidad de aislamiento",
            "Tipo de placa y acabado",
            "Secado de masillas"
          ]
      },
      areasTitle: "Dónde montamos pladur",
      areasIntro: "Realizamos trabajos de pladur en Sabadell y alrededores:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en pladur",
        items: [
            "Placas de pladur estándar y resistentes a humedad",
            "Perfiles de acero galvanizado",
            "Lana de roca o lana de vidrio para aislamiento",
            "Cinta de juntas y pasta",
            "Tornillería y tacos específicos"
          ],
        warranty: "Garantía de 2 años en la instalación de pladur y acabados."
      }
    }
  },
  'fachadas-y-terrazas': {
    es: {
      intro: [
          "Las terrazas y fachadas son las zonas más expuestas de una vivienda. Una buena impermeabilización y un revestimiento adecuado evitan filtraciones, grietas y problemas de humedad en el interior.",
          "En Junior Reformas rehabilitamos fachadas e impermeabilizamos terrazas en Sabadell, Barcelona, Terrassa y Mataró. Trabajamos con membranas, revestimientos y suelos técnicos para exteriores.",
          "Cada terraza o fachada requiere un diagnóstico previo para identificar el origen de las humedades y aplicar la solución correcta."
        ],
      pricesTitle: "Precios orientativos de fachadas y terrazas en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo depende de los metros, el estado y los materiales elegidos.",
      prices: [
          {
          concept: "Impermeabilización de terraza",
          price: "45 - 90 €/m²",
          note: "membrana y protección"
        },
          {
          concept: "Suelo técnico exterior",
          price: "50 - 120 €/m²",
          note: "según material"
        },
          {
          concept: "Revestimiento de fachada",
          price: "35 - 80 €/m²",
          note: "pintura o monocapa"
        },
          {
          concept: "Reparación de grietas",
          price: "200 - 600 €",
          note: "según extensión"
        },
          {
          concept: "Cambio de barandilla",
          price: "150 - 400 €/ml",
          note: "incluye material"
        }
        ],
      durationTitle: "Duración de fachadas y terrazas",
      duration: {
        typical: "1 - 3 semanas",
        range: "Según alcance",
        factors: [
            "Metros a impermeabilizar o revestir",
            "Estado de la base",
            "Condiciones meteorológicas",
            "Necesidad de levantar pavimento"
          ]
      },
      areasTitle: "Dónde trabajamos fachadas y terrazas",
      areasIntro: "Realizamos rehabilitación de fachadas e impermeabilización de terrazas en Sabadell y alrededores:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en fachadas y terrazas",
        items: [
            "Membranas de poliuretano y tela asfáltica",
            "Suelos técnicos de exterior",
            "Revestimientos monocapa y pintura de fachada",
            "Selladores y siliconas específicas",
            "Barandillas de acero y aluminio"
          ],
        warranty: "Garantía de 2 años en la ejecución y garantía del fabricante en impermeabilizaciones."
      }
    }
  },
  'locales-comerciales': {
    es: {
      intro: [
          "Reformar un local comercial requiere cumplir plazos ajustados y minimizar el tiempo de cierre. En Junior Reformas entendemos que cada día cerrado es una pérdida para el negocio.",
          "Hacemos adecuaciones integrales de locales en Sabadell, Barcelona, Terrassa y Mataró: instalaciones, suelos de alto tránsito, aseos, escaparates, iluminación y acabados comerciales.",
          "Planificamos la obra por fases cuando es posible, para que el local pueda seguir operativo durante parte de la reforma."
        ],
      pricesTitle: "Precios orientativos de locales comerciales en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo depende de los metros, el estado y el tipo de negocio.",
      prices: [
          {
          concept: "Adecuación local pequeño 40-60 m²",
          price: "8.000 - 18.000 €",
          note: "básica"
        },
          {
          concept: "Reforma integral local 80-120 m²",
          price: "20.000 - 45.000 €",
          note: "media"
        },
          {
          concept: "Suelo de alto tránsito",
          price: "30 - 70 €/m²",
          note: "instalado"
        },
          {
          concept: "Aseo de local comercial",
          price: "3.000 - 6.000 €",
          note: "completo"
        },
          {
          concept: "Iluminación y cuadro eléctrico",
          price: "2.000 - 6.000 €",
          note: "según local"
        }
        ],
      durationTitle: "Duración de reforma de local comercial",
      duration: {
        typical: "3 - 8 semanas",
        range: "Según metros",
        factors: [
            "Metros del local y complejidad",
            "Necesidad de obra por fases",
            "Licencias del ayuntamiento",
            "Entrega de mobiliario comercial"
          ]
      },
      areasTitle: "Dónde reformamos locales comerciales",
      areasIntro: "Realizamos reformas de locales comerciales en Sabadell y alrededores:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en locales comerciales",
        items: [
            "Suelos vinílicos y porcelánicos de alto tránsito",
            "Iluminación LED comercial",
            "Tabiques de pladur y cristal",
            "Aseos compactos y sanitarios resistentes",
            "Pintura lavable y acabados duraderos"
          ],
        warranty: "Garantía de 2 años en la ejecución y garantía del fabricante en materiales comerciales."
      }
    }
  },
  carpinteria: {
    es: {
      intro: [
          "La carpintería aporta personalidad y funcionalidad a una reforma. Puertas, armarios empotrados, muebles de baño y cocina son elementos que se usan a diario y deben resistir el paso del tiempo.",
          "En Junior Reformas hacemos carpintería a medida en Sabadell, Barcelona, Terrassa y Mataró. Diseñamos e instalamos armarios, puertas de interior, muebles de baño y soluciones de almacenaje.",
          "Medimos en obra para aprovechar cada centímetro y ajustar las piezas a paredes y techos que nunca son del todo rectos."
        ],
      pricesTitle: "Precios orientativos de carpintería en Sabadell",
      pricesDisclaimer: "Precios con IVA incluido. El presupuesto definitivo depende de los materiales, medidas y acabados elegidos.",
      prices: [
          {
          concept: "Puertas de interior lacadas",
          price: "180 - 350 €/unidad",
          note: "instalada"
        },
          {
          concept: "Puertas de interior chapa",
          price: "120 - 220 €/unidad",
          note: "instalada"
        },
          {
          concept: "Armario empotrado a medida",
          price: "1.200 - 3.000 €",
          note: "según tamaño"
        },
          {
          concept: "Mueble de baño a medida",
          price: "600 - 1.800 €",
          note: "según diseño"
        },
          {
          concept: "Cocina de carpintería a medida",
          price: "4.000 - 10.000 €",
          note: "completa"
        }
        ],
      durationTitle: "Duración de trabajos de carpintería",
      duration: {
        typical: "1 - 3 semanas",
        range: "Según proyecto",
        factors: [
            "Tiempo de fabricación de piezas a medida",
            "Número de puertas o armarios",
            "Acabados especiales (lacado, chapa, etc.)",
            "Coordinación con otros gremios"
          ]
      },
      areasTitle: "Dónde hacemos carpintería",
      areasIntro: "Realizamos trabajos de carpintería a medida en Sabadell y alrededores:",
      areas: [
          {
          name: "Centre"
        },
          {
          name: "Gràcia"
        },
          {
          name: "Ca n'Oriac"
        },
          {
          name: "Creu Alta"
        },
          {
          name: "Torre-romeu"
        },
          {
          name: "Can Deu"
        },
          {
          name: "Can Rull"
        },
          {
          name: "Can Feu"
        },
          {
          name: "Sant Oleguer"
        },
          {
          name: "Poblenou"
        },
          {
          name: "La Planada"
        },
          {
          name: "Campoamor"
        },
          {
          name: "Sant Julià"
        },
          {
          name: "Barcelona"
        },
          {
          name: "Terrassa"
        },
          {
          name: "Mataró"
        },
          {
          name: "Barberà del Vallès"
        },
          {
          name: "Badia del Vallès"
        },
          {
          name: "Castellar del Vallès"
        },
          {
          name: "Ripollet"
        },
          {
          name: "Santa Perpètua de Mogoda"
        }
        ],
      materials: {
        title: "Materiales que utilizamos en carpintería",
        items: [
            "Maderas nobles y chapas naturales",
            "Lacados en blanco o colores a medida",
            "Melaminas resistentes para armarios",
            "Bisagras y herrajes de calidad",
            "Encimeras de cuarzo y compacto"
          ],
        warranty: "Garantía de 2 años en la instalación y garantía del fabricante en materiales."
      }
    }
  },

};

export function getServiceContent(slug: string, locale: Locale): ServiceContentLocale | undefined {
  const content = SERVICE_CONTENT[slug];
  return content ? content[locale] : undefined;
}
