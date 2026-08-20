import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { LOCALITIES } from '@/lib/localities';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';

interface Props {
  locale: Locale;
}

/** Stylized SVG map of the service area (Barcelona province) with 4 pins. */
export default function AreaMap({ locale }: Props) {
  const t = getDictionary(locale);
  return (
    <SectionWrapper variant="dark" id="area">
      <SectionHeader badge={t.area.badge} title={t.area.title} description={t.area.description} />
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative rounded-2xl border border-border bg-carbon-light p-4">
            <svg viewBox="0 0 100 90" className="w-full" role="img" aria-label={t.area.title}>
              <rect x="0" y="0" width="100" height="90" rx="4" fill="#1f1f1f" />
              <path d="M20 78 Q45 60 60 72 T95 66" stroke="#3a3a3a" strokeWidth="1.5" fill="none" />
              <path d="M10 55 Q35 45 55 52 T92 44" stroke="#3a3a3a" strokeWidth="1.5" fill="none" />
              <path d="M25 30 Q45 26 70 34" stroke="#3a3a3a" strokeWidth="1.5" fill="none" />
              <circle cx="50" cy="22" r="14" fill="#B85C38" opacity="0.12" />
              {LOCALITIES.map((l) => (
                <g key={l.slug} transform={`translate(${l.coords.x}, ${l.coords.y})`}>
                  <circle r={l.hub ? 4 : 3} fill={l.hub ? '#B85C38' : '#D8D0C3'} />
                  <circle r={l.hub ? 8 : 6} fill="none" stroke={l.hub ? '#B85C38' : '#D8D0C3'} strokeWidth="0.5" opacity="0.5" />
                  <text y="-6" textAnchor="middle" fontSize="5" fill={l.hub ? '#B85C38' : '#F5F3EE'} fontWeight="700">
                    {l.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {LOCALITIES.map((l, i) => (
            <li key={l.slug}>
              <Reveal delay={i * 70}>
                <Link
                  href={localePath(locale, `/localidades/${l.slug}`)}
                  className="group flex h-full flex-col rounded-xl border border-border bg-carbon-light p-6 transition-all hover:border-terracota/40"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-5 w-5 ${l.hub ? 'text-terracota' : 'text-sand'}`} aria-hidden="true" />
                    <h3 className="font-display text-lg font-semibold text-offwhite">{l.name}</h3>
                  </div>
                  {l.hub ? (
                    <span className="mt-2 inline-block w-fit rounded-full border border-terracota px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-terracota">
                      {t.area.main}
                    </span>
                  ) : null}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{l.housing}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terracota">
                    {t.servicesGrid.viewMore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 text-center">
        <Link href={localePath(locale, '/contacto')} className="text-sm font-semibold text-terracota underline-offset-4 hover:underline">
          {t.area.cta} →
        </Link>
      </div>
    </SectionWrapper>
  );
}
