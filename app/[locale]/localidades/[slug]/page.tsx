import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';
import { LOCALES, SITE, type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { getLocality, LOCALITIES } from '@/lib/localities';
import { SERVICES } from '@/lib/services';
import { fotoUrl, HOME_GALLERY } from '@/lib/photos';
import { TESTIMONIALS } from '@/lib/testimonials';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';
import { TestimonialCard } from '@/components/sections/Testimonials';
import ContactForm from '@/components/forms/ContactForm';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  return LOCALES.flatMap((locale) => LOCALITIES.map((l) => ({ locale, slug: l.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  const loc = getLocality(slug);
  if (!loc) return {};
  return pageMetadata({ locale, path: `/localidades/${loc.slug}/`, title: loc.metaTitle, description: loc.metaDesc, keywords: loc.keywords });
}

export default async function LocalidadPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const loc = getLocality(slug);
  if (!loc) notFound();
  const t = getDictionary(locale);

  const h1 =
    locale === 'es'
      ? `Reformas integrales en ${loc.name}`
      : locale === 'pt'
        ? `Reformas integrais em ${loc.name}`
        : `Full renovations in ${loc.name}`;

  // Rotate testimonial per locality for variety
  const testimonial = TESTIMONIALS[LOCALITIES.findIndex((l) => l.slug === loc.slug) % TESTIMONIALS.length];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-carbon">
        <Image src={fotoUrl('despues/bano-marmol-despues-02-hero.webp')} alt={`${h1} — Junior Reformas`} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/85 to-carbon/40" aria-hidden="true" />
        <div className="mx-auto w-full max-w-content px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Breadcrumb locale={locale} items={[{ name: t.nav.localities, path: '/localidades/' }, { name: loc.name, path: `/localidades/${loc.slug}/` }]} />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-terracota px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracota">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {loc.hub ? t.area.main : t.area.badge}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-offwhite md:text-5xl">{h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">{loc.metaDesc}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton variant="primary" href={localePath(locale, '/presupuesto')}>
                {t.hero.ctaPrimary}
              </CTAButton>
              <CTAButton variant="whatsapp" external href={SITE.whatsapp} ariaLabel={t.whatsapp.ariaLabel}>
                WhatsApp
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper variant="light">
        <div className="max-w-3xl space-y-5">
          {loc.intro.map((p) => (
            <p key={p.slice(0, 32)} className="text-base leading-relaxed text-carbon/80 md:text-lg">
              {p}
            </p>
          ))}
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <div className="rounded-xl border border-carbon/10 bg-white p-5">
              <h2 className="font-display text-lg font-semibold text-carbon">{locale === 'es' ? 'Zonas donde trabajamos' : locale === 'pt' ? 'Zonas onde trabalhamos' : 'Areas we cover'}</h2>
              <p className="mt-2 text-sm leading-relaxed text-carbon/70">{loc.zones}</p>
            </div>
            <div className="rounded-xl border border-carbon/10 bg-white p-5">
              <h2 className="font-display text-lg font-semibold text-carbon">{locale === 'es' ? 'Tipos de vivienda habituales' : locale === 'pt' ? 'Tipos de habitação habituais' : 'Typical housing'}</h2>
              <p className="mt-2 text-sm leading-relaxed text-carbon/70">{loc.housing}</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <SectionHeader title={`${t.nav.services} — ${loc.name}`} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.slug}>
                <Reveal delay={(i % 4) * 60}>
                  <Link href={localePath(locale, `/servicios/${s.slug}`)} className="group flex h-full items-center gap-3 rounded-xl border border-border bg-carbon-light p-5 transition-all hover:border-terracota/40">
                    <Icon className="h-6 w-6 shrink-0 text-terracota" aria-hidden="true" />
                    <span className="text-sm font-semibold text-offwhite group-hover:text-terracota">{s.title}</span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </SectionWrapper>

      <SectionWrapper variant="light">
        <SectionHeader variant="light" badge={t.gallery.badge} title={`${t.gallery.title} — ${loc.name}`} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_GALLERY.slice(0, 4).map((file) => (
            <li key={file} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={fotoUrl(file)} alt={`Ejemplo de reforma en ${loc.name} — Junior Reformas`} fill sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" className="object-cover" />
            </li>
          ))}
        </ul>
        <div className="mt-12 mx-auto max-w-xl">
          <TestimonialCard t={testimonial} verifiedLabel={t.testimonials.verified} ratingLabel={t.testimonials.rating} light />
        </div>
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader title={t.contact.h1} description={t.budgetForm.sub} />
            <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center gap-2 text-xl font-semibold text-terracota hover:text-terracota-light">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <p className="mt-4 text-sm text-text-secondary">{t.contact.response}</p>
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
