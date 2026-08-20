type ClassValue = string | number | false | null | undefined | ClassValue[] | Record<string, boolean>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue): void => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    else if (Array.isArray(v)) v.forEach(walk);
    else Object.entries(v).forEach(([k, cond]) => cond && out.push(k));
  };
  inputs.forEach(walk);
  return out.join(' ');
}

export function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(
    locale === 'en' ? 'en-GB' : locale === 'pt' ? 'pt-PT' : 'es-ES',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

export function formatPriceRange(min: number, max: number): string {
  const fmt = (n: number): string =>
    n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  return `${fmt(min)} - ${fmt(max)}`;
}
