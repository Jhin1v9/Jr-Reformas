import { Star, BadgeCheck } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n';
import { TESTIMONIALS, type Testimonial } from '@/lib/testimonials';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';

export function TestimonialCard({ t, verifiedLabel, light = false }: { t: Testimonial; verifiedLabel: string; light?: boolean }) {
  return (
    <blockquote
      className={
        light
          ? 'h-full rounded-2xl border border-carbon/10 bg-white p-7 shadow-sm'
          : 'h-full rounded-2xl border border-border bg-carbon-light p-7'
      }
    >
      <div className="flex items-center gap-1" aria-label={`${t.stars} / 5 estrellas`}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-terracota text-terracota" aria-hidden="true" />
        ))}
      </div>
      <p className={light ? 'mt-4 leading-relaxed text-carbon/80 italic' : 'mt-4 leading-relaxed text-text-secondary italic'}>
        “{t.text}”
      </p>
      <footer className="mt-5">
        <p className={light ? 'font-semibold text-carbon' : 'font-semibold text-offwhite'}>{t.name}</p>
        <p className="mt-0.5 text-sm text-text-muted">
          {t.projectType} · {t.date}
        </p>
        {t.verified ? (
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-olive">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            {verifiedLabel}
          </p>
        ) : null}
      </footer>
    </blockquote>
  );
}

interface Props {
  locale: Locale;
  max?: number;
  variant?: 'dark' | 'light';
}

export default function Testimonials({ locale, max = 3, variant = 'light' }: Props) {
  const t = getDictionary(locale);
  const items = TESTIMONIALS.slice(0, max);
  return (
    <SectionWrapper variant={variant} id="testimonios">
      <SectionHeader
        variant={variant === 'light' ? 'light' : 'dark'}
        badge={t.testimonials.badge}
        title={t.testimonials.title}
        description={t.testimonials.description}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 80}>
            <TestimonialCard t={item} verifiedLabel={t.testimonials.verified} light={variant === 'light'} />
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
