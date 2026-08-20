import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { LOCALES, SITE, type Locale } from '@/lib/constants';
import { isLocale } from '@/lib/i18n';
import { localBusinessSchema, organizationSchema, pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

const HOME_META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Reformas integrales en Sabadell y Barcelona | Junior Reformas',
    description:
      'Empresa de reformas integrales en Sabadell, Barcelona, Terrassa y Mataró. Baños, cocinas, suelos y pisos completos. 15+ años de experiencia, visita gratuita y presupuesto desglosado.',
  },
  en: {
    title: 'Home renovations in Sabadell and Barcelona | Junior Reformas',
    description:
      'Renovation company in Sabadell, Barcelona, Terrassa and Mataró. Bathrooms, kitchens, flooring and full renovations. 15+ years of experience, free visit and itemised quote.',
  },
  pt: {
    title: 'Reformas integrais em Sabadell e Barcelona | Junior Reformas',
    description:
      'Empresa de reformas em Sabadell, Barcelona, Terrassa e Mataró. Casas de banho, cozinhas, pavimentos e reformas completas. 15+ anos de experiência, visita gratuita e orçamento detalhado.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  const meta = HOME_META[locale];
  return {
    metadataBase: new URL(SITE.url),
    ...pageMetadata({
      locale,
      path: '/',
      title: meta.title,
      description: meta.description,
      keywords: ['reformas integrales sabadell', 'empresa reformas sabadell', 'reformas barcelona', 'reforma baño sabadell', 'reforma cocina sabadell'],
    }),
    icons: { icon: '/favicon.ico', apple: '/logo/logo-jr.png' },
  };
}

export const viewport: Viewport = {
  themeColor: '#171717',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;
  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={[localBusinessSchema(), organizationSchema()]} />
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header locale={locale} />
        <main id="contenido">{children}</main>
        <Footer locale={locale} />
        <WhatsAppButton locale={locale} />
        {/* GA4 placeholder: replace GA_MEASUREMENT_ID to enable analytics
        <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" strategy="afterInteractive" />
        */}
      </body>
    </html>
  );
}
