import Image from 'next/image';
import { Award, BadgeCheck, ShieldCheck } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';

const ICONS = [Award, BadgeCheck, ShieldCheck];
const FOTOS = [
  'detalles/bano-detalle-espejo-led-01-gallery.webp',
  'detalles/bano-detalle-alicatado-01-gallery.webp',
  'durante/bano-radiador-durante-01-gallery.webp',
];

interface Props {
  locale: Locale;
}

export default function WhyJunior({ locale }: Props) {
  const t = getDictionary(locale);
  return (
    <SectionWrapper variant="dark" id="por-que-junior">
      <SectionHeader badge={t.whyJunior.badge} title={t.whyJunior.title} />
      <div className="grid gap-6 md:grid-cols-3">
        {t.whyJunior.items.map((item, i) => {
          const Icon = ICONS[i] ?? Award;
          return (
            <Reveal key={item.title} delay={i * 90}>
              <div className="h-full overflow-hidden rounded-xl border border-border bg-carbon-light">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={fotoUrl(FOTOS[i] ?? FOTOS[0])}
                    alt={`${item.title} — Junior Reformas`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-olive" aria-hidden="true" />
                    <h3 className="font-display text-xl font-semibold text-offwhite">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
