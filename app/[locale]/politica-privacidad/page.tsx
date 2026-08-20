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
  return legalMetadata(locale, 'politica-privacidad', 'Política de privacidad');
}

export default async function PoliticaPrivacidad({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return (
    <LegalPage params={{ locale }} kind="politica-privacidad" title="Política de privacidad">
      <h2>Responsable del tratamiento</h2>
      <p>
        Responsable: <strong>{SITE.founder}</strong> ({SITE.name}) · {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city} · {SITE.email} · {SITE.phone}.
      </p>
      <h2>Datos que recogemos</h2>
      <p>
        A través de los formularios de contacto y presupuesto recogemos nombre, teléfono, email y la información que nos facilitas sobre tu
        proyecto de reforma, con la única finalidad de responderte y preparar tu presupuesto.
      </p>
      <h2>Base jurídica y conservación</h2>
      <p>
        La base jurídica es tu consentimiento, otorgado al marcar la casilla de aceptación. Conservamos los datos el tiempo necesario para
        gestionar tu solicitud y las comunicaciones derivadas.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {SITE.email}.
        También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).
      </p>
      <h2>Destinatarios</h2>
      <p>No cedemos tus datos a terceros salvo obligación legal.</p>
    </LegalPage>
  );
}
