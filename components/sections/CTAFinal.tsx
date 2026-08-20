import Image from 'next/image';
import { Phone } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl, CTA_FINAL_BG } from '@/lib/photos';
import CTAButton from '@/components/shared/CTAButton';

interface Props {
  locale: Locale;
}

export default function CTAFinal({ locale }: Props) {
  const t = getDictionary(locale);
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={fotoUrl(CTA_FINAL_BG)}
        alt="Baño reformado con acabados de calidad — Junior Reformas"
        fill
        sizes="100vw"
        loading="lazy"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-carbon/85" aria-hidden="true" />
      <div className="mx-auto w-full max-w-content px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-offwhite md:text-5xl">{t.ctaFinal.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">{t.ctaFinal.sub}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTAButton variant="primary" href={localePath(locale, '/presupuesto')} className="px-10 py-5 text-lg">
            {t.ctaFinal.ctaPrimary}
          </CTAButton>
          <CTAButton
            variant="whatsapp"
            external
            href={`${SITE.whatsapp}?text=${encodeURIComponent(t.whatsapp.message)}`}
            ariaLabel={t.whatsapp.ariaLabel}
            className="px-10 py-5 text-lg"
          >
            {t.ctaFinal.ctaWhatsapp}
          </CTAButton>
        </div>
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="mt-8 inline-flex items-center gap-2 text-xl font-semibold text-sand transition-colors hover:text-terracota"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {SITE.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
