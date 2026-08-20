import Image from 'next/image';
import { Phone, Calendar, Star, Clock } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import CTAButton from '@/components/shared/CTAButton';

interface Props {
  locale: Locale;
}

export default function CTAFinal({ locale }: Props) {
  const t = getDictionary(locale);

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={fotoUrl('despues/bano-marmol-hero-01.jpg')}
        alt="Baño reformado con acabados de calidad — Junior Reformas"
        fill
        sizes="100vw"
        loading="lazy"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon/90 via-carbon/80 to-carbon/70" aria-hidden="true" />

      <div className="mx-auto w-full max-w-content px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-offwhite md:text-5xl lg:text-6xl">
          {t.ctaFinal.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          {t.ctaFinal.sub}
        </p>

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

        {/* Stats flutuantes */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 rounded-2xl border border-border/50 bg-carbon/60 p-6 backdrop-blur sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <Calendar className="h-6 w-6 text-terracota" aria-hidden="true" />
            <span className="text-2xl font-bold text-offwhite">15+</span>
            <span className="text-xs uppercase tracking-wider text-text-secondary">años de experiencia</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star className="h-6 w-6 text-terracota" aria-hidden="true" />
            <span className="text-2xl font-bold text-offwhite">5★</span>
            <span className="text-xs uppercase tracking-wider text-text-secondary">9 reseñas verificadas</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="h-6 w-6 text-terracota" aria-hidden="true" />
            <span className="text-2xl font-bold text-offwhite">24h</span>
            <span className="text-xs uppercase tracking-wider text-text-secondary">tiempo de respuesta</span>
          </div>
        </div>
      </div>
    </section>
  );
}
