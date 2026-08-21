import { DEFAULT_LOCALE, LOCALES, type Locale } from './constants';
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import pt from '@/locales/pt.json';
import ca from '@/locales/ca.json';

export type Messages = typeof es;

const dictionaries: Record<Locale, Messages> = {
  es,
  en: en as Messages,
  pt: pt as Messages,
  ca: ca as Messages,
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Messages {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

/** Resolve a dotted key path against the dictionary, with ES fallback. */
export function t(locale: Locale, path: string): string {
  const resolve = (obj: unknown): string | undefined => {
    let cur: unknown = obj;
    for (const key of path.split('.')) {
      if (cur && typeof cur === 'object' && key in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[key];
      } else return undefined;
    }
    return typeof cur === 'string' ? cur : undefined;
  };
  return resolve(dictionaries[locale]) ?? resolve(dictionaries[DEFAULT_LOCALE]) ?? path;
}

/** Build a locale-prefixed path. Default locale keeps the /es prefix for consistency. */
export function localePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return `/${locale}${clean}/`;
}
