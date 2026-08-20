import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { getPairs, fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';
import BeforeAfterSlider from './BeforeAfterSlider';

interface Props {
  locale: Locale;
  maxPairs?: number;
  showHeader?: boolean;
}

export default function BeforeAfterSection({ locale, maxPairs = 4, showHeader = true }: Props) {
  const t = getDictionary(locale);
  const pairs = getPairs().slice(0, maxPairs);
  return (
    <SectionWrapper variant="light" id="antes-y-despues">
      {showHeader ? (
        <SectionHeader variant="light" badge={t.beforeAfter.badge} title={t.beforeAfter.title} description={t.beforeAfter.description} />
      ) : null}
      <div className="grid gap-8 md:grid-cols-2">
        {pairs.map((p, i) => (
          <Reveal key={p.par_id} delay={i * 80}>
            <BeforeAfterSlider
              beforeSrc={fotoUrl(p.antes_file)}
              afterSrc={fotoUrl(p.despues_file)}
              beforeAlt={`${p.descripcion} — estado en obra`}
              afterAlt={`${p.descripcion} — acabado final — Junior Reformas`}
              beforeLabel={t.beforeAfter.before}
              afterLabel={t.beforeAfter.after}
              caption={p.descripcion}
            />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/antes-y-despues')}>
          {t.beforeAfter.cta}
        </CTAButton>
      </div>
    </SectionWrapper>
  );
}
