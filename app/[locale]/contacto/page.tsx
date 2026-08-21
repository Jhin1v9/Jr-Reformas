import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata, localBusinessSchema } from '@/lib/seo';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import JsonLd from '@/components/shared/JsonLd';
import ContactForm from '@/components/forms/ContactForm';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Contacto | Junior Reformas — Sabadell y Barcelona',
    description: 'Contacta con Junior Reformas: teléfono y WhatsApp +34 658 18 70 71, email junior.sp@outlook.es. Respuesta el mismo día. Visita técnica gratuita.',
  },
  en: {
    title: 'Contact | Junior Reformas — Sabadell and Barcelona',
    description: 'Contact Junior Reformas: phone and WhatsApp +34 658 18 70 71, email junior.sp@outlook.es. Same-day response. Free technical visit.',
  },
  pt: {
    title: 'Contacto | Junior Reformas — Sabadell e Barcelona',
    description: 'Contacte a Junior Reformas: telefone e WhatsApp +34 658 18 70 71, email junior.sp@outlook.es. Resposta no mesmo dia. Visita técnica gratuita.',
  },
  ca: {
    title: 'Contacte | Junior Reformas — Sabadell i Barcelona',
    description: 'Contacteu amb Junior Reformas: telèfon i WhatsApp +34 658 18 70 71, email junior.sp@outlook.es. Resposta el mateix dia. Visita tècnica gratuïta.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/contacto/', ...META[locale], keywords: ['contacto reformas sabadell', 'presupuesto reforma barcelona'] });
}

export default async function ContactoPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`)}&output=embed`;
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <SectionWrapper variant="dark">
        <Breadcrumb locale={locale} items={[{ name: t.contact.h1, path: '/contacto/' }]} />
        <SectionHeader as="h1" title={t.contact.h1} description={t.contact.sub} />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-sand">{t.contact.direct}</h2>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-4 rounded-xl border border-border bg-carbon-light p-5 transition-all hover:border-terracota/40">
                  <Phone className="h-6 w-6 shrink-0 text-terracota" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-text-muted">{t.forms.phone}</span>
                    <span className="text-lg font-semibold text-offwhite">{SITE.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <CTAButton variant="whatsapp" external href={SITE.whatsapp} ariaLabel={t.whatsapp.ariaLabel} className="w-full justify-start px-5">
                  WhatsApp — {SITE.phoneDisplay}
                </CTAButton>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 rounded-xl border border-border bg-carbon-light p-5 transition-all hover:border-terracota/40">
                  <Mail className="h-6 w-6 shrink-0 text-terracota" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-text-muted">{t.forms.email}</span>
                    <span className="break-all font-semibold text-offwhite">{SITE.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4 rounded-xl border border-border bg-carbon-light p-5">
                <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-terracota" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-text-muted">{t.contact.area}</span>
                  <span className="font-semibold text-offwhite">
                    {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-4 rounded-xl border border-border bg-carbon-light p-5">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-olive" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-text-muted">{t.contact.response}</span>
                  <span className="font-semibold text-offwhite">{t.footer.hours}</span>
                </span>
              </li>
              <li>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-border bg-carbon-light p-5 transition-all hover:border-terracota/40">
                  <Instagram className="h-6 w-6 shrink-0 text-terracota" aria-hidden="true" />
                  <span className="font-semibold text-offwhite">{SITE.instagramHandle}</span>
                </a>
              </li>
            </ul>
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                src={mapSrc}
                title={`${SITE.name} — ${SITE.address.city}`}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-carbon-light p-6 md:p-8">
            <ContactForm
              labels={{
                name: t.forms.name,
                namePlaceholder: t.forms.namePlaceholder,
                phone: t.forms.phone,
                phonePlaceholder: t.forms.phonePlaceholder,
                email: t.forms.email,
                emailPlaceholder: t.forms.emailPlaceholder,
                message: t.forms.message,
                messagePlaceholder: t.forms.messagePlaceholder,
                gdpr: t.forms.gdpr,
                send: t.forms.send,
                sending: t.forms.sending,
                success: t.forms.success,
                errorRequired: t.forms.errorRequired,
                errorPhone: t.forms.errorPhone,
                errorEmail: t.forms.errorEmail,
                errorGdpr: t.forms.errorGdpr,
                thanksHref: localePath(locale, '/gracias'),
              }}
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
