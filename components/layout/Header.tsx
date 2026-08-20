'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ChevronDown } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { SERVICES } from '@/lib/services';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import MobileNav from './MobileNav';

interface Props {
  locale: Locale;
}

export default function Header({ locale }: Props) {
  const t = getDictionary(locale);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: localePath(locale, '/localidades'), label: t.nav.localities },
    { href: localePath(locale, '/proyectos/galeria'), label: t.nav.gallery },
    { href: localePath(locale, '/proceso'), label: t.nav.process },
    { href: localePath(locale, '/sobre-junior'), label: t.nav.about },
    { href: localePath(locale, '/blog'), label: t.nav.blog },
    { href: localePath(locale, '/contacto'), label: t.nav.contact },
  ];

  const navBg = scrolled
    ? 'bg-carbon/95 border-b border-border shadow-lg'
    : 'bg-transparent border-b border-transparent';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${navBg}`}
    >
      <div className="mx-auto flex h-16 md:h-20 w-full max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={localePath(locale, '/')} className="flex items-center gap-3" aria-label={`${SITE.name} — ${t.nav.home}`}>
          <Image src="/logo/logo-jr.png" alt={`Logo ${SITE.name}`} width={44} height={44} priority className="h-10 w-10 md:h-11 md:w-11 object-contain" />
          <span className="font-display text-lg md:text-xl font-bold text-offwhite leading-none drop-shadow-md">
            Junior <span className="text-terracota">Reformas</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {/* Servicios dropdown */}
            <li className="group relative">
              <Link
                href={localePath(locale, '/servicios')}
                className="flex items-center gap-1 text-sm font-medium text-offwhite/90 transition-colors hover:text-terracota drop-shadow"
              >
                {t.nav.services}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
              </Link>
              <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-border bg-carbon-light shadow-2xl">
                  <ul className="py-2">
                    {SERVICES.map((service) => {
                      const Icon = service.icon;
                      return (
                        <li key={service.slug}>
                          <Link
                            href={localePath(locale, `/servicios/${service.slug}`)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-carbon-mid hover:text-offwhite"
                          >
                            <Icon className="h-4 w-4 shrink-0 text-terracota" aria-hidden="true" />
                            <span>{service.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-medium text-offwhite/90 transition-colors hover:text-terracota drop-shadow">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-offwhite/90 transition-colors hover:text-terracota drop-shadow"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <LanguageSwitcher locale={locale} label={t.nav.changeLanguage} />
          <Link
            href={localePath(locale, '/presupuesto')}
            className="hidden lg:inline-flex items-center rounded-lg bg-terracota px-5 py-2.5 text-sm font-semibold text-offwhite transition-all hover:bg-terracota-light"
          >
            {t.nav.budget}
          </Link>
          <MobileNav locale={locale} links={[{ href: localePath(locale, '/servicios'), label: t.nav.services }, ...links]} labels={{ open: t.nav.openMenu, close: t.nav.closeMenu, budget: t.nav.budget, budgetHref: localePath(locale, '/presupuesto') }} />
        </div>
      </div>
    </header>
  );
}
