'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/constants';
import { FlagES, FlagGB, FlagPT, FlagCA } from './Flags';

const FLAGS: Record<Locale, (p: { className?: string }) => React.ReactElement> = {
  es: FlagES,
  en: FlagGB,
  pt: FlagPT,
  ca: FlagCA,
};

interface Props {
  locale: Locale;
  label: string;
}

/** Language switcher with handmade SVG flags (ES / GB / PT). */
export default function LanguageSwitcher({ locale, label }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Replace the locale segment in the current path
  const targetPath = (loc: Locale): string => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${loc}/`;
    segments[0] = loc;
    return `/${segments.join('/')}/`;
  };

  const CurrentFlag = FLAGS[locale];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-colors hover:border-sand hover:text-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracota"
      >
        <CurrentFlag className="h-4 w-6 rounded-[2px]" />
        <span className="uppercase font-semibold">{locale}</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {open ? (
        <ul role="listbox" className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-carbon-light shadow-xl">
          {LOCALES.map((loc) => {
            const Flag = FLAGS[loc];
            return (
              <li key={loc} role="option" aria-selected={loc === locale}>
                <Link
                  href={targetPath(loc)}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-carbon-mid hover:text-offwhite"
                >
                  <Flag className="h-4 w-6 rounded-[2px]" />
                  <span className="flex-1">{LOCALE_LABELS[loc]}</span>
                  {loc === locale ? <Check className="h-4 w-4 text-terracota" aria-hidden="true" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
