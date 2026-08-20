import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Users, Award, BadgeCheck, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { isLocale, getDictionary, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';
import { fotoUrl } from '@/lib/photos';
import SectionWrapper from '@/components/shared/SectionWrapper';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTAButton from '@/components/shared/CTAButton';
import Reveal from '@/components/shared/Reveal';
import ProcessSteps from '@/components/sections/ProcessSteps';
import CTAFinal from '@/components/sections/CTAFinal';

interface Props {
  params: Promise<{ locale: string }>;
}

const META: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Sobre Junior Reformas: 15+ años de oficio | Junior Reformas',
    description: 'Conoce a João Paulo y al equipo de Junior Reformas: más de 15 años reformando pisos, baños y cocinas en Sabadell, Barcelona y alrededores.',
  },
  en: {
    title: 'About Junior Reformas: 15+ years of craft | Junior Reformas',
    description: 'Meet João Paulo and the Junior Reformas team: over 15 years renovating flats, bathrooms and kitchens in Sabadell, Barcelona and surroundings.',
  },
  pt: {
    title: 'Sobre a Junior Reformas: 15+ anos de ofício | Junior Reformas',
    description: 'Conheça o João Paulo e a equipa da Junior Reformas: mais de 15 anos reformando apartamentos, casas de banho e cozinhas em Sabadell e arredores.',
  },
};

const PHILOSOPHY_ICONS = [BadgeCheck, ShieldCheck, Award, HeartHandshake];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'es';
  return pageMetadata({ locale, path: '/sobre-junior/', ...META[locale], keywords: ['junior reformas', 'empresa reformas sabadell experiencia'] });
}

export default async function SobreJuniorPage({ params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = getDictionary(locale);
  return (
    <>
      <SectionWrapper variant="dark">
        <Breadcrumb locale={locale} items={[{ name: t.nav.about, path: '/sobre-junior/' }]} />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader as="h1" badge={t.nav.about} title={t.about.h1} />
            <div className="space-y-4 text-text-secondary leading-relaxed">
              {t.about.story.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 text-sm text-text-muted">
              {SITE.founder} — {SITE.name}
            </p>
          </div>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image src={fotoUrl('despues/bano-doble-lavabo-despues-01-gallery.webp')} alt="Trabajo terminado por el equipo de Junior Reformas" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.stats.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 70}>
                <div className="rounded-xl border border-border bg-carbon-light p-6 text-center">
                  <p className="font-display text-4xl font-bold text-terracota">{s.value}</p>
                  <p className="mt-2 text-sm text-text-secondary">{s.label}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </SectionWrapper>

      <SectionWrapper variant="light">
        <SectionHeader variant="light" title={t.about.philosophyTitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.philosophy.map((p, i) => {
            const Icon = PHILOSOPHY_ICONS[i] ?? BadgeCheck;
            return (
              <Reveal key={p.title} delay={i * 70}>
                <div className="h-full rounded-xl border border-carbon/10 bg-white p-6 shadow-sm">
                  <Icon className="h-7 w-7 text-terracota" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-lg font-semibold text-carbon">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-carbon/70">{p.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex items-start gap-4 rounded-xl border border-carbon/10 bg-white p-6">
          <Users className="h-8 w-8 shrink-0 text-olive" aria-hidden="true" />
          <div>
            <h2 className="font-display text-lg font-semibold text-carbon">{t.about.teamTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-carbon/70">{t.about.team}</p>
          </div>
        </div>
      </SectionWrapper>

      <ProcessSteps locale={locale} />

      <div className="bg-carbon pb-16 text-center">
        <CTAButton variant="primary" href={localePath(locale, '/contacto')}>
          {t.nav.contact}
        </CTAButton>
      </div>
      <CTAFinal locale={locale} />
    </>
  );
}
