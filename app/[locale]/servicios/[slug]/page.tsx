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
import { fotoUrl, getPhotos, type Photo } from '@/lib/photos';
import { getServiceContent } from '@/lib/serviceContent';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import JsonLd from '@/components/shared/JsonLd';
import Reveal from '@/components/shared/Reveal';
import ProcessTimeline from '@/components/shared/ProcessTimeline';
import GalleryMasonry from '@/components/sections/GalleryMasonry';
import { type MasonryItem } from '@/components/shared/MasonryGrid';
import ServicePriceTable from '@/components/shared/ServicePriceTable';
import ServiceDuration from '@/components/shared/ServiceDuration';
import ServiceAreas from '@/components/shared/ServiceAreas';
import ServiceMaterials from '@/components/shared/ServiceMaterials';
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
  const content = getServiceContent(slug, locale);
  const Icon = service.icon;

  // Gallery photos of the same category (DESPUES only)
  const catPhotos = getPhotos({ categoria: service.categoria, fase: 'DESPUES' });
  const fallbackPhotos = getPhotos({ fase: 'DESPUES' });
  const carouselPhotos = (catPhotos.length > 0 ? catPhotos : fallbackPhotos).slice(0, 8);

  const galleryItems: MasonryItem[] = carouselPhotos.map((p: Photo, i: number) => ({
    id: `${service.slug}-${i}`,
    src: fotoUrl(p.sizes.gallery),
    alt: p.alt_text,
    category: service.title,
    aspect: p.height > p.width ? 'portrait' : p.width / p.height > 1.4 ? 'landscape' : 'square',
  }));

  const h1 =
    locale === 'es'
      ? `${service.title} en Sabadell, Barcelona y alrededores`
      : locale === 'pt'
        ? `${service.title} em Sabadell, Barcelona e arredores`
        : locale === 'ca'
          ? `${service.title} a Sabadell, Barcelona i voltants`
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
            <span className="inline-flex items-center gap-2 rounded-full border border-terracota px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-terracota sm:text-[11px] sm:tracking-[0.2em]">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {service.title}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-tight text-offwhite sm:text-3xl md:text-5xl">{h1}</h1>
            <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">{service.shortDesc}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton variant="primary" href={localePath(locale, '/presupuesto')} className="w-full sm:w-auto">
                {t.hero.ctaPrimary}
              </CTAButton>
              <CTAButton variant="whatsapp" external href={SITE.whatsapp} ariaLabel={t.whatsapp.ariaLabel} className="w-full sm:w-auto">
                WhatsApp
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper variant="light">
        <SectionHeader variant="light" title={t.servicePage.includesTitle} />
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

      {content ? (
        <>
          <SectionWrapper variant="light" className="pt-0">
            <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-carbon/80">
              {content.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper variant="light" className="pt-0">
            <ServicePriceTable
              title={content.pricesTitle}
              disclaimer={content.pricesDisclaimer}
              rows={content.prices}
            />
          </SectionWrapper>

          <SectionWrapper variant="light" className="pt-0">
            <div className="grid gap-6 lg:grid-cols-2">
              <ServiceDuration title={content.durationTitle} duration={content.duration} />
              <ServiceMaterials materials={content.materials} />
            </div>
          </SectionWrapper>

          <SectionWrapper variant="light" className="pt-0">
            <ServiceAreas
              title={content.areasTitle}
              intro={content.areasIntro}
              areas={content.areas}
            />
          </SectionWrapper>
        </>
      ) : (
        <SectionWrapper variant="light" className="pt-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-carbon md:text-3xl">
              {t.servicePage.whyTitle.replace('{{service}}', service.title.toLowerCase())}
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-carbon/80">
              <p>
                En <strong className="text-carbon">Junior Reformas</strong> llevamos más de 15 años transformando espacios en Sabadell, Barcelona, Terrassa y Mataró. Nuestro equipo coordina personalmente cada fase de la obra para que tú solo tengas que preocuparte de disfrutar del resultado.
              </p>
              <p>
                Cada proyecto de <strong>{service.title.toLowerCase()}</strong> comienza con una visita técnica gratuita sin compromiso. Durante esa visita evaluamos el estado actual del espacio, escuchamos tus necesidades y te asesoramos sobre las mejores soluciones.
              </p>
            </div>
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper variant="light" className="pt-0">
        <SectionHeader
          variant="light"
          badge={t.gallery.badge}
          title={service.title}
          description={t.servicePage.galleryDesc.replace('{{service}}', service.title)}
        />
        {galleryItems.length > 0 ? (
          <GalleryMasonry
            items={galleryItems}
            categories={[service.title]}
            columns={3}
            compact
            labels={{
              all: t.gallery.filters.all,
              close: t.lightbox.close,
              previous: t.lightbox.previous,
              next: t.lightbox.next,
              expanded: t.lightbox.expanded,
              cta: t.lightbox.cta,
              whatsappText: t.lightbox.whatsappText,
            }}
          />
        ) : (
          <p className="text-center text-text-secondary">{t.servicePage.noPhotos}</p>
        )}
      </SectionWrapper>

      <ProcessTimeline locale={locale} variant="dark" title={`${t.process.title} — ${service.title}`} />

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
