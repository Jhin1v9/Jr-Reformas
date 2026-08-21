'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Phone, Calendar, Star, Clock } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import CTAButton from '@/components/shared/CTAButton';
import { gsap } from '@/components/hooks/useGSAP';

interface Props {
  locale: Locale;
}

export default function CTAFinal({ locale }: Props) {
  const t = getDictionary(locale);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.cta-title, .cta-sub, .cta-buttons, .cta-phone, .cta-stats',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-10 h-[120%] w-full">
        <Image
          src={fotoUrl('despues/bano-marmol-hero-01.jpg')}
          alt="Baño reformado con acabados de calidad — Junior Reformas"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon/90 via-carbon/80 to-carbon/70" aria-hidden="true" />

      <div className="mx-auto w-full max-w-content px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8 lg:py-32">
        <h2 className="cta-title mx-auto max-w-3xl font-display text-2xl font-bold leading-tight text-offwhite sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {t.ctaFinal.title}
        </h2>
        <p className="cta-sub mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          {t.ctaFinal.sub}
        </p>

        <div className="cta-buttons mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          className="cta-phone mt-8 inline-flex items-center gap-2 text-xl font-semibold text-sand transition-colors hover:text-terracota"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {SITE.phoneDisplay}
        </a>

        {/* Stats flutuantes */}
        <div className="cta-stats mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-2 rounded-2xl border border-border/50 bg-carbon/60 p-4 backdrop-blur sm:gap-4 sm:p-6">
          <div className="flex flex-col items-center gap-2">
            <Calendar className="h-6 w-6 text-terracota" aria-hidden="true" />
            <span className="text-2xl font-bold text-offwhite">15+</span>
            <span className="text-xs uppercase tracking-wider text-text-secondary">{t.ctaFinal.stats.years}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star className="h-6 w-6 text-terracota" aria-hidden="true" />
            <span className="text-2xl font-bold text-offwhite">5★</span>
            <span className="text-xs uppercase tracking-wider text-text-secondary">{t.ctaFinal.stats.reviews}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="h-6 w-6 text-terracota" aria-hidden="true" />
            <span className="text-2xl font-bold text-offwhite">24h</span>
            <span className="text-xs uppercase tracking-wider text-text-secondary">{t.ctaFinal.stats.response}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
