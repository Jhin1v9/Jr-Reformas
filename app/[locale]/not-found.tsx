import Link from 'next/link';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import SectionWrapper from '@/components/shared/SectionWrapper';
import CTAButton from '@/components/shared/CTAButton';

/** 404 inside the locale tree. */
export default function NotFound() {
  const locale: Locale = 'es';
  const t = getDictionary(locale);
  const popular = [
    { href: localePath(locale, '/servicios'), label: t.nav.services },
    { href: localePath(locale, '/localidades'), label: t.nav.localities },
    { href: localePath(locale, '/proyectos/galeria'), label: t.nav.gallery },
    { href: localePath(locale, '/presupuesto'), label: t.nav.budget },
  ];
  return (
    <SectionWrapper variant="dark" className="min-h-[60vh]">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-7xl font-bold text-terracota">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-offwhite">{t.notFound.title}</h1>
        <p className="mt-3 text-text-secondary">{t.notFound.description}</p>
        <div className="mt-8">
          <CTAButton variant="primary" href={localePath(locale, '/')}>
            {t.notFound.cta}
          </CTAButton>
        </div>
        <h2 className="mt-12 text-sm font-semibold uppercase tracking-widest text-sand">{t.notFound.popular}</h2>
        <ul className="mt-4 flex flex-wrap justify-center gap-3">
          {popular.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="rounded-lg border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-terracota hover:text-offwhite">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
