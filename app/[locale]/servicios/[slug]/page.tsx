import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Phone, ArrowRight } from 'lucide-react';
import { LOCALES, SITE, type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata, serviceSchema, faqSchema } from '@/lib/seo';
import { SERVICES, getService } from '@/lib/services';
import { LOCALITIES } from '@/lib/localities';
import { fotoUrl, getPairs, getPhotos } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import JsonLd from '@/components/shared/JsonLd';
import Reveal from '@/components/shared/Reveal';
import BeforeAfterSlider from '@/components/sections/BeforeAfterSlider';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/forms/ContactForm';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { locale: Locale; slug: string }[] {
  return LOCALES.flatMap((locale) => SERVICES.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    locale,
    path: `/servicios/${service.slug}/`,
    title: service.metaTitle,
    description: service.metaDesc,
    keywords: service.keywords,
    image: service.heroFoto ? `/fotos/${service.heroFoto}` : undefined,
  });
}

export default async function ServicioPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const service = getService(slug);
  if (!service) notFound();
  const t = getDictionary(locale);
  const Icon = service.icon;

  // Pairs of the service category (fallback: all pairs)
  const catPairs = getPairs().filter((p) => p.categoria === service.categoria);
  const pairs = (catPairs.length > 0 ? catPairs : getPairs()).slice(0, 2);
  // Gallery photos of the same category
  const catPhotos = getPhotos({ categoria: service.categoria }).slice(0, 4);

  const h1 =
    locale === 'es'
      ? `${service.title} en Sabadell, Barcelona y alrededores`
      : locale === 'pt'
        ? `${service.title} em Sabadell, Barcelona e arredores`
        : `${service.title} in Sabadell, Barcelona and surroundings`;

  return (
    <>
      <JsonLd data={[serviceSchema(service, locale), faqSchema(service.faq)]} />
      <section className="relative isolate overflow-hidden bg-carbon">
        {service.heroFoto ? (
          <Image src={fotoUrl(service.heroFoto)} alt={`${service.title} — Junior Reformas, Sabadell`} fill priority sizes="100vw" className="-z-10 object-cover" />
        ) : (
          <div
            className={`absolute inset-0 -z-10 bg-gradient-to-br ${service.gradient ?? 'from-carbon-mid via-carbon to-carbon-light'}`}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon via-carbon/85 to-carbon/40" aria-hidden="true" />
        <div className="mx-auto w-full max-w-content px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Breadcrumb locale={locale} items={[{ name: t.nav.services, path: '/servicios/' }, { name: service.title, path: `/servicios/${service.slug}/` }]} />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-terracota px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracota">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {service.title}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-offwhite md:text-5xl">{h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">{service.shortDesc}</p>
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
        <SectionHeader variant="light" title={locale === 'es' ? 'Qué incluye' : locale === 'pt' ? 'O que inclui' : "What's included"} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((item, i) => (
            <li key={item}>
              <Reveal delay={(i % 3) * 60}>
                <span className="flex items-center gap-3 rounded-lg border border-carbon/10 bg-white p-4 text-sm font-medium text-carbon">
                  <Check className="h-5 w-5 shrink-0 text-olive" aria-hidden="true" />
                  {item}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper variant="light" className="pt-0">
        <SectionHeader variant="light" badge={t.beforeAfter.badge} title={t.beforeAfter.title} />
        <div className="grid gap-8 md:grid-cols-2">
          {pairs.map((p) => (
            <BeforeAfterSlider
              key={p.par_id}
              beforeSrc={fotoUrl(p.antes_file)}
              afterSrc={fotoUrl(p.despues_file)}
              beforeAlt={`${p.descripcion} — en obra`}
              afterAlt={`${p.descripcion} — acabado final — Junior Reformas`}
              beforeLabel={t.beforeAfter.before}
              afterLabel={t.beforeAfter.after}
              caption={p.descripcion}
            />
          ))}
        </div>
        {catPhotos.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {catPhotos.map((p) => (
              <li key={p.id} className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={fotoUrl(p.sizes.gallery)} alt={p.alt_text} fill sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" className="object-cover" />
              </li>
            ))}
          </ul>
        ) : null}
      </SectionWrapper>

      <SectionWrapper variant="dark">
        <SectionHeader title={`${t.process.title} — ${service.title}`} />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {service.processSteps.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-xl border border-border bg-carbon-light p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracota font-display text-sm font-bold text-offwhite">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-relaxed text-text-secondary">{step}</span>
            </li>
          ))}
        </ol>
      </SectionWrapper>

      <FAQ locale={locale} items={service.faq} variant="light" withSchema={false} />

      <SectionWrapper variant="dark">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader title={t.budgetForm.h1} description={t.budgetForm.sub} />
            <a href={`tel:${SITE.phoneRaw}`} className="inline-flex items-center gap-2 text-xl font-semibold text-terracota hover:text-terracota-light">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-sand">{t.footer.localitiesTitle}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {LOCALITIES.map((l) => (
                  <li key={l.slug}>
                    <Link href={localePath(locale, `/localidades/${l.slug}`)} className="group flex items-center justify-between rounded-lg border border-border bg-carbon-light px-4 py-3 text-sm font-medium text-text-secondary transition-all hover:border-terracota/40 hover:text-offwhite">
                      {l.name}
                      <ArrowRight className="h-4 w-4 text-terracota transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
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
