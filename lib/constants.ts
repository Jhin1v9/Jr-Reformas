export const SITE = {
  name: 'Junior Reformas',
  founder: 'João Paulo de Oliveira Domingues',
  slogan: 'Calidad y confianza en cada reforma',
  domain: 'jr-reformas.com',
  url: 'https://jr-reformas.com',
  email: 'junior.sp@outlook.es',
  phone: '+34 658 18 70 71',
  phoneRaw: '+34658187071',
  phoneDisplay: '+34 658 187 071',
  whatsapp: 'https://wa.me/34658187071',
  instagram: 'https://instagram.com/junioreformas',
  instagramHandle: '@junioreformas',
  address: {
    street: 'Francesc Layret 76',
    city: 'Sant Feliu de Llobregat',
    postalCode: '08208',
    region: 'Barcelona',
    country: 'ES',
  },
  geo: { lat: 41.3833, lng: 2.05 },
  hours: 'Lun-Sáb 9:00-18:00 (sáb hasta 13:00)',
  openingHoursSchema: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
  yearsExperience: 15,
} as const;

export const LOCALES = ['es', 'en', 'pt', 'ca'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  ca: 'Català',
};

export const LOCALE_OG: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_GB',
  pt: 'pt_BR',
  ca: 'ca_ES',
};
