import { CalendarDays, MapPin, MessageCircle, Star } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary } from '@/lib/i18n';
import Reveal from '@/components/shared/Reveal';

interface Props {
  locale: Locale;
}

export default function StatsBanner({ locale }: Props) {
  const t = getDictionary(locale);
  const stats = [
    { icon: CalendarDays, label: t.stats.label1, desc: t.stats.desc1 },
    { icon: MessageCircle, label: t.stats.label2, desc: t.stats.desc2 },
    { icon: MapPin, label: t.stats.label3, desc: t.stats.desc3 },
    { icon: Star, label: t.stats.label4, desc: t.stats.desc4 },
  ];

  return (
    <section className="border-y border-border bg-carbon-light">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-terracota/30 bg-carbon text-terracota">
                  <stat.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-offwhite md:text-3xl">{stat.label}</p>
                  <p className="text-sm text-text-secondary">{stat.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
