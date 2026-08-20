import { ClipboardCheck, FileText, HardHat, MapPinned, Sparkles } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';

const ICONS = [MapPinned, ClipboardCheck, FileText, HardHat, Sparkles];

interface Props {
  locale: Locale;
}

export default function ProcessSteps({ locale }: Props) {
  const t = getDictionary(locale);
  return (
    <SectionWrapper variant="dark" id="proceso">
      <SectionHeader badge={t.process.badge} title={t.process.title} description={t.process.description} />
      <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
        <span className="absolute left-6 top-0 hidden h-0.5 w-[calc(100%-3rem)] translate-x-6 bg-carbon-mid md:top-8 md:block" aria-hidden="true" />
        {t.process.steps.map((step, i) => {
          const Icon = ICONS[i] ?? MapPinned;
          return (
            <li key={step.title} className="relative">
              <Reveal delay={i * 90}>
                <div className="flex md:flex-col md:items-center md:text-center gap-4 md:gap-0">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-terracota bg-carbon">
                    <Icon className="h-6 w-6 text-terracota" aria-hidden="true" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-terracota text-xs font-bold text-offwhite">
                      {i + 1}
                    </span>
                  </div>
                  <div className="md:mt-5">
                    <h3 className="font-display text-lg font-semibold text-offwhite">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
      <div className="mt-12 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/proceso')}>
          {t.processPage.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
