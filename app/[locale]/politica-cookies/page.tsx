import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';
import { type Locale } from '@/lib/constants';
import { LegalPage, legalMetadata } from '@/components/shared/LegalPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return legalMetadata(locale, 'politica-cookies', 'Política de cookies');
}

export default async function PoliticaCookies({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return (
    <LegalPage params={{ locale }} kind="politica-cookies" title="Política de cookies">
      <h2>Uso de cookies</h2>
      <p>
        Este sitio web no utiliza cookies de seguimiento propias. Se emplean únicamente almacenamiento local del navegador para recordar el
        progreso del formulario de presupuesto (datos que solo se guardan en tu dispositivo y puedes borrar en cualquier momento).
      </p>
      <h2>Servicios de terceros</h2>
      <p>
        La página de contacto puede cargar un mapa de Google Maps, que podría instalar cookies de Google según su propia política de privacidad.
        Si en el futuro se activa Google Analytics, se informará aquí y se solicitará tu consentimiento previo.
      </p>
      <h2>Cómo desactivar las cookies</h2>
      <p>Puedes configurar tu navegador para rechazar cookies y borrar el almacenamiento local desde los ajustes de privacidad.</p>
    </LegalPage>
  );
}
