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
        <span className="inline-block rounded-full border border-terracota px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracota">
          {badge}
        </span>
      ) : null}
      <Tag
        className={cn(
          'mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
          variant === 'dark' ? 'text-text-primary' : 'text-carbon'
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p className={cn('mt-4 text-base md:text-lg leading-relaxed', variant === 'dark' ? 'text-text-secondary' : 'text-carbon/70')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
