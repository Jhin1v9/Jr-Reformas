import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { type Locale } from '@/lib/constants';
import { getDictionary, localePath } from '@/lib/i18n';
import { breadcrumbSchema } from '@/lib/seo';
import JsonLd from './JsonLd';

export interface Crumb {
  name: string;
  path: string; // without locale prefix, with trailing slash
}

interface Props {
  locale: Locale;
  items: Crumb[];
  variant?: 'dark' | 'light';
}

export default function Breadcrumb({ locale, items, variant = 'dark' }: Props) {
  const t = getDictionary(locale);
  const all: Crumb[] = [{ name: t.breadcrumb.home, path: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <JsonLd data={breadcrumbSchema(all, locale)} />
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${variant === 'light' ? 'text-carbon/60' : 'text-text-muted'}`}>
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 ? <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {last ? (
                <span aria-current="page" className={variant === 'light' ? 'font-medium text-carbon' : 'font-medium text-sand'}>
                  {c.name}
                </span>
              ) : (
                <Link href={localePath(locale, c.path)} className="transition-colors hover:text-terracota">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
