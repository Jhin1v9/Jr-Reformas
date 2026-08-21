'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { SERVICES } from '@/lib/services';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

interface Props {
  locale: Locale;
}

export default function Header({ locale }: Props) {
  const t = getDictionary(locale);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const budgetHref = localePath(locale, '/presupuesto');

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? 'h-[60px] border-white/5 bg-carbon/95 shadow-lg backdrop-blur-md'
            : 'h-[70px] border-transparent bg-carbon/40 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href={localePath(locale, '/')} className="flex items-center gap-2" aria-label={`${SITE.name} — ${t.nav.home}`}>
            <Image src="/logo/logo-jr.png" alt={`Logo ${SITE.name}`} width={44} height={44} priority className="h-9 w-9 object-contain md:h-10 md:w-10" />
            <span className="font-display text-base font-bold leading-none text-offwhite md:text-lg">
              Junior <span className="text-terracota">Reformas</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
            {/* Servicios dropdown */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-offwhite/80 transition-colors hover:text-offwhite"
              >
                {t.nav.services}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-72 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-border bg-carbon-light shadow-2xl">
                  <ul className="max-h-[70vh] overflow-y-auto py-2">
                    {SERVICES.map((service) => {
                      const Icon = service.icon;
                      return (
                        <li key={service.slug}>
                          <Link
                            href={localePath(locale, `/servicios/${service.slug}`)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-carbon-mid hover:text-offwhite"
                          >
                            <Icon className="h-4 w-4 shrink-0 text-terracota" aria-hidden="true" />
                            <span>{service.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                    <li className="border-t border-border mt-1 pt-1">
                      <Link
                        href={localePath(locale, '/servicios')}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-terracota transition-colors hover:bg-carbon-mid"
                      >
                        {t.servicesGrid.viewAll} →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href={localePath(locale, '/proyectos/galeria')} className="px-3 py-2 text-sm font-medium text-offwhite/80 transition-colors hover:text-offwhite">
              {t.nav.gallery}
            </Link>

            {/* Sobre dropdown */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-offwhite/80 transition-colors hover:text-offwhite"
              >
                {t.nav.about}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-56 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-border bg-carbon-light shadow-2xl">
                  <ul className="py-2">
                    <li>
                      <Link href={localePath(locale, '/sobre-junior')} className="block px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-carbon-mid hover:text-offwhite">
                        {t.common.whoWeAre}
                      </Link>
                    </li>
                    <li>
                      <Link href={localePath(locale, '/sobre-junior#proceso')} className="block px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-carbon-mid hover:text-offwhite">
                        {t.common.howWeWork}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href={localePath(locale, '/blog')} className="px-3 py-2 text-sm font-medium text-offwhite/80 transition-colors hover:text-offwhite">
              {t.nav.blog}
            </Link>

            <Link href={localePath(locale, '/contacto')} className="px-3 py-2 text-sm font-medium text-offwhite/80 transition-colors hover:text-offwhite">
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={`tel:${SITE.phoneRaw}`}
              title={SITE.phone}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-offwhite/70 transition-colors hover:bg-terracota/20 hover:text-terracota"
              aria-label={t.common.callUs}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>

            <LanguageSwitcher locale={locale} label={t.nav.changeLanguage} />

            <Link
              href={budgetHref}
              className="hidden sm:inline-flex items-center rounded-lg bg-terracota px-4 py-2 text-sm font-semibold text-offwhite transition-colors hover:bg-terracota-light"
            >
              {t.nav.budget}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.nav.openMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-offwhite/80 hover:border-sand hover:text-offwhite lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-carbon/98 backdrop-blur lg:hidden" role="dialog" aria-modal="true">
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-border px-4">
            <span className="font-display text-lg font-bold text-offwhite">
              Junior <span className="text-terracota">Reformas</span>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label={t.nav.closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-offwhite/80 hover:text-offwhite"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="divide-y divide-border">
              {/* Servicios expandable */}
              <li>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 text-lg font-medium text-offwhite"
                >
                  {t.nav.services}
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <ul className="mb-3 space-y-1 border-l-2 border-terracota/30 pl-4">
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={localePath(locale, `/servicios/${service.slug}`)}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-text-secondary hover:text-terracota"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={localePath(locale, '/servicios')}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm font-medium text-terracota"
                      >
                        {t.servicesGrid.viewAll}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href={localePath(locale, '/proyectos/galeria')} onClick={() => setMobileOpen(false)} className="block py-4 text-lg font-medium text-offwhite">
                  {t.nav.gallery}
                </Link>
              </li>

              {/* Sobre expandable */}
              <li>
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 text-lg font-medium text-offwhite"
                >
                  {t.nav.about}
                  <ChevronDown className={`h-5 w-5 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileAboutOpen && (
                  <ul className="mb-3 space-y-1 border-l-2 border-terracota/30 pl-4">
                    <li>
                      <Link href={localePath(locale, '/sobre-junior')} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-text-secondary hover:text-terracota">
                        {t.common.whoWeAre}
                      </Link>
                    </li>
                    <li>
                      <Link href={localePath(locale, '/sobre-junior#proceso')} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-text-secondary hover:text-terracota">
                        {t.common.howWeWork}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href={localePath(locale, '/blog')} onClick={() => setMobileOpen(false)} className="block py-4 text-lg font-medium text-offwhite">
                  {t.nav.blog}
                </Link>
              </li>

              <li>
                <Link href={localePath(locale, '/contacto')} onClick={() => setMobileOpen(false)} className="block py-4 text-lg font-medium text-offwhite">
                  {t.nav.contact}
                </Link>
              </li>

              <li className="py-4">
                <Link
                  href={budgetHref}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-terracota px-5 py-3.5 text-base font-semibold text-offwhite"
                >
                  {t.nav.budget}
                </Link>
              </li>

              <li className="py-4">
                <a href={`tel:${SITE.phoneRaw}`} className="flex items-center justify-center gap-2 text-lg font-medium text-offwhite">
                  <Phone className="h-5 w-5 text-terracota" />
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
