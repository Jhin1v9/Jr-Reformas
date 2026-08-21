import { Star, BadgeCheck, Quote } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { TESTIMONIALS } from '@/lib/testimonials';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';
import Link from 'next/link';

interface Props {
  locale: Locale;
}

export default function TestimonialsHome({ locale }: Props) {
  const t = getDictionary(locale);
  const items = TESTIMONIALS.slice(0, 3);

  return (
    <SectionWrapper variant="dark" id="testimonios">
      <SectionHeader
        badge={t.testimonials.badge}
        title={t.testimonials.title}
        description={t.testimonials.description}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 100}>
            <blockquote className="relative h-full rounded-2xl border border-border bg-carbon-light p-5 sm:p-6 lg:p-7">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-terracota/20" aria-hidden="true" />
              <div className="flex items-center gap-1" aria-label={`${item.stars} / 5 ${t.testimonials.rating}`}>
                {Array.from({ length: item.stars }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-terracota text-terracota" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-text-secondary italic">
                “{item.text}”
              </p>
              <footer className="mt-6 border-t border-border pt-5">
                <p className="font-semibold text-offwhite">{item.name}</p>
                <p className="mt-0.5 text-sm text-text-muted">
                  {item.projectType} · {item.city}
                </p>
                {item.verified ? (
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-olive">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    {t.testimonials.verified} — ProntoPro
                  </p>
                ) : null}
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href={localePath(locale, '/sobre-junior')}
          className="inline-flex min-h-[44px] items-center gap-2 px-2 text-sm font-semibold text-terracota transition-colors hover:text-terracota-light"
        >
          {t.testimonials.viewAll} →
        </Link>
      </div>
    </SectionWrapper>
  );
}
