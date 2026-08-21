import { cn } from '@/lib/utils';

interface Props {
  badge?: string;
  title: string;
  description?: string;
  variant?: 'dark' | 'light';
  as?: 'h1' | 'h2';
}

export default function SectionHeader({ badge, title, description, variant = 'dark', as: Tag = 'h2' }: Props) {
  return (
    <div className="mb-10 md:mb-14 max-w-3xl">
      {badge ? (
        <span className="inline-block rounded-full border border-terracota px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-terracota sm:text-[11px] sm:tracking-[0.2em]">
          {badge}
        </span>
      ) : null}
      <Tag
        className={cn(
          'mt-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl',
          variant === 'dark' ? 'text-text-primary' : 'text-carbon'
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p className={cn('mt-4 text-sm leading-relaxed sm:text-base md:text-lg', variant === 'dark' ? 'text-text-secondary' : 'text-carbon/70')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
