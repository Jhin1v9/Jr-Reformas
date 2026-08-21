import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'dark' | 'light';
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function SectionWrapper({ variant = 'dark', id, className, children }: Props) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 md:py-20 lg:py-24',
        variant === 'dark' ? 'bg-carbon text-text-primary' : 'bg-offwhite text-carbon',
        className
      )}
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
