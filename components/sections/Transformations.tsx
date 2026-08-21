'use client';

import { type Locale } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import AfterCarousel, { type AfterSlide } from '@/components/shared/AfterCarousel';

interface Props {
  locale: Locale;
  slides: AfterSlide[];
}

export default function Transformations({ locale, slides }: Props) {
  const t = getDictionary(locale);

  return (
    <SectionWrapper variant="light" id="transformaciones">
      <SectionHeader
        variant="light"
        badge={t.gallery.badge}
        title={t.gallery.title}
        description={t.gallery.description}
      />
      <AfterCarousel
        slides={slides}
        labels={{ previous: t.common.previous, next: t.common.next, slide: t.common.slide }}
      />
    </SectionWrapper>
  );
}
