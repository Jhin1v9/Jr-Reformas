import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';
import { SITE, type Locale } from '@/lib/constants';
import { LegalPage, legalMetadata } from '@/components/shared/LegalPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return legalMetadata(locale, 'aviso-legal', 'Aviso legal');
}

export default async function AvisoLegal({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return (
    <LegalPage params={{ locale }} kind="aviso-legal" title="Aviso legal">
      <h2>Titular del sitio</h2>
      <p>
        Este sitio web es titularidad de <strong>{SITE.founder}</strong> ({SITE.name}), con dirección en {SITE.address.street},{' '}
        {SITE.address.postalCode} {SITE.address.city} ({SITE.address.region}). Contacto: {SITE.email} · {SITE.phone}.
      </p>
      <h2>Objeto</h2>
      <p>
        El sitio web {SITE.domain} tiene por objeto informar sobre los servicios de reformas integrales y parciales ofrecidos por {SITE.name}
        en Sabadell, Barcelona, Terrassa, Mataró y alrededores.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        Los contenidos de este sitio tienen carácter informativo. Los precios y estimaciones mostrados (incluida la calculadora de presupuestos)
        son orientativos y no constituyen una oferta vinculante; el presupuesto definitivo se formaliza tras la visita técnica.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, fotografías, logotipos y diseño de este sitio son titularidad de {SITE.name} y no pueden reproducirse sin autorización.
      </p>
    </LegalPage>
  );
}
