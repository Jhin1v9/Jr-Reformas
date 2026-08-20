'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  locale: string;
  links: NavLink[];
  labels: { open: string; close: string; budget: string; budgetHref: string };
}

export default function MobileNav({ links, labels }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.open}
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-text-secondary hover:border-sand hover:text-offwhite"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-carbon/98 backdrop-blur" role="dialog" aria-modal="true">
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            <span className="font-display text-lg font-bold text-offwhite">
              Junior <span className="text-terracota">Reformas</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-offwhite"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Menú móvil">
            <ul className="divide-y divide-border px-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-lg font-medium text-text-primary hover:text-terracota"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <Link
                  href={labels.budgetHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-terracota px-5 py-4 text-base font-semibold text-offwhite"
                >
                  {labels.budget}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
