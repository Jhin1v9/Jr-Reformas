import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'primary' | 'secondary' | 'whatsapp';
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

const styles: Record<NonNullable<Props['variant']>, string> = {
  primary:
    'bg-terracota text-offwhite shadow-[0_8px_24px_rgba(184,92,56,0.25)] hover:bg-terracota-light hover:-translate-y-0.5',
  secondary:
    'border border-sand text-sand bg-transparent hover:border-offwhite hover:text-offwhite',
  whatsapp: 'bg-whatsapp text-white hover:brightness-110 hover:-translate-y-0.5',
};

export default function CTAButton({ variant = 'primary', href, children, className, external, ariaLabel }: Props) {
  const cls = cn(
    'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-8 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota',
    styles[variant],
    className
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
