import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react';
import { SITE, type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { SERVICES } from '@/lib/services';
import { LOCALITIES } from '@/lib/localities';

interface Props {
  locale: Locale;
}

export default function Footer({ locale }: Props) {
  const t = getDictionary(locale);
  const quickLinks = [
    { href: localePath(locale, '/proceso'), label: t.nav.process },
    { href: localePath(locale, '/sobre-junior'), label: t.nav.about },
    { href: localePath(locale, '/proyectos/galeria'), label: t.nav.gallery },
    { href: localePath(locale, '/blog'), label: t.nav.blog },
    { href: localePath(locale, '/contacto'), label: t.nav.contact },
    { href: localePath(locale, '/presupuesto'), label: t.nav.budget },
  ];

  return (
    <footer className="border-t border-border bg-carbon text-sand">
      <div className="mx-auto grid w-full max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href={localePath(locale, '/')} className="flex items-center gap-3">
            <Image src="/logo/logo-jr.png" alt={`Logo ${SITE.name}`} width={48} height={48} className="h-12 w-12 object-contain" />
            <span className="font-display text-xl font-bold text-offwhite">
              Junior <span className="text-terracota">Reformas</span>
            </span>
          </Link>
          <p className="mt-4 text-sm italic text-text-muted">{t.footer.slogan}</p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-terracota"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" />
            {SITE.instagramHandle}
          </a>
        </div>
        <nav aria-label={t.footer.servicesTitle}>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-offwhite">{t.footer.servicesTitle}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={localePath(locale, `/servicios/${s.slug}`)} className="text-text-secondary transition-colors hover:text-terracota">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localePath(locale, '/servicios')} className="font-medium text-terracota hover:text-terracota-light">
                {t.servicesGrid.viewAll} →
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label={t.footer.localitiesTitle}>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-offwhite">{t.footer.localitiesTitle}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {LOCALITIES.map((l) => (
              <li key={l.slug}>
                <Link href={localePath(locale, `/localidades/${l.slug}`)} className="text-text-secondary transition-colors hover:text-terracota">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-offwhite">{t.footer.quickLinks}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.slice(0, 4).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-text-secondary transition-colors hover:text-terracota">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-offwhite">{t.footer.contactTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-text-secondary">
            <li>
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-2 transition-colors hover:text-terracota">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 transition-colors hover:text-terracota">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.footer.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-content flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-text-muted sm:px-6 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} {SITE.name}. {t.footer.rights}</p>
          <ul className="flex gap-5">
            <li><Link href={localePath(locale, '/aviso-legal')} className="hover:text-sand">{t.footer.legalNotice}</Link></li>
            <li><Link href={localePath(locale, '/politica-privacidad')} className="hover:text-sand">{t.footer.privacy}</Link></li>
            <li><Link href={localePath(locale, '/politica-cookies')} className="hover:text-sand">{t.footer.cookies}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
