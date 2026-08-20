import { type Locale } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n';
import { faqSchema } from '@/lib/seo';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import JsonLd from '@/components/shared/JsonLd';
import Reveal from '@/components/shared/Reveal';

interface Props {
  locale: Locale;
  items?: { q: string; a: string }[];
  variant?: 'dark' | 'light';
  withSchema?: boolean;
}

/** FAQ accordion using native details/summary (RSC-friendly, accessible). */
export default function FAQ({ locale, items, variant = 'light', withSchema = true }: Props) {
  const t = getDictionary(locale);
  const faqs = items ?? t.faq.items;
  return (
    <SectionWrapper variant={variant} id="faq">
      <SectionHeader variant={variant} badge={t.faq.badge} title={t.faq.title} />
      {withSchema ? <JsonLd data={faqSchema(faqs)} /> : null}
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 50}>
            <details
              className={`group rounded-xl border transition-colors ${
                variant === 'light'
                  ? 'border-carbon/10 bg-white open:border-terracota/40'
                  : 'border-border bg-carbon-light open:border-terracota/40'
              }`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracota [&::-webkit-details-marker]:hidden">
                <span className={variant === 'light' ? 'text-carbon' : 'text-offwhite'}>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-terracota text-terracota transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className={`px-5 pb-5 leading-relaxed ${variant === 'light' ? 'text-carbon/75' : 'text-text-secondary'}`}>{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
