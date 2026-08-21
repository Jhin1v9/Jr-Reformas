'use client';

import { useEffect, useRef } from 'react';
import { CalendarDays, MapPin, MessageCircle, Star, BadgeCheck } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { gsap } from '@/components/hooks/useGSAP';
import Reveal from '@/components/shared/Reveal';

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  href?: string;
  badge?: string;
}

interface Props {
  locale: Locale;
}

export default function StatsBanner({ locale }: Props) {
  const t = getDictionary(locale);
  const stats: Stat[] = [
    { icon: CalendarDays, label: '15', desc: t.stats.desc1 },
    { icon: MessageCircle, label: '24h', desc: t.stats.desc2 },
    { icon: MapPin, label: '4', desc: t.stats.desc3 },
    { icon: Star, label: '5', desc: t.stats.desc4, href: localePath(locale, '/sobre-junior'), badge: 'Verificado en ProntoPro' },
  ];

  return (
    <section className="relative border-y border-border bg-carbon-light py-14 md:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracota/40 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.desc} delay={i * 100}>
              <StatCard stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const isNumeric = /^\d+$/.test(stat.label);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el || !isNumeric) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { innerText: '0' },
        {
          innerText: stat.label,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [isNumeric, stat.label]);

  const Icon = stat.icon;

  const content = (
    <div className="group flex flex-col items-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-terracota/30 bg-carbon text-terracota shadow-lg shadow-terracota/5 transition-transform group-hover:scale-110">
        <Icon className="h-8 w-8" aria-hidden="true" />
      </span>
      <div ref={valueRef} className="mt-5 font-display text-5xl font-bold text-offwhite md:text-6xl">
        {isNumeric ? '0' : stat.label}
        {isNumeric ? '+' : ''}
      </div>
      <p className="mt-2 text-sm font-medium text-text-secondary md:text-base">{stat.desc}</p>
      {stat.badge ? (
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-olive/40 bg-olive/10 px-3 py-1 text-xs font-semibold text-olive">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {stat.badge}
        </span>
      ) : null}
    </div>
  );

  if (stat.href) {
    return (
      <a href={stat.href} className="block rounded-2xl border border-transparent p-6 transition-all hover:border-terracota/20 hover:bg-carbon/30">
        {content}
      </a>
    );
  }

  return <div className="rounded-2xl p-6">{content}</div>;
}
