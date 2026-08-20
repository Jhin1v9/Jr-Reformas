import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PhotoCard from './PhotoCard';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  href: string;
  image?: string | null;
  variant?: 'hero' | 'grid';
  gradient?: string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  href,
  image,
  variant = 'grid',
  gradient = 'from-carbon via-carbon-mid to-carbon-light',
  className,
}: Props) {
  const isHero = variant === 'hero';

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl bg-carbon-light ring-1 ring-white/5 transition-all duration-300 hover:ring-terracota/30',
        className
      )}
    >
      {image ? (
        <PhotoCard
          src={image}
          alt={title}
          aspect={isHero ? 'landscape' : 'landscape'}
          className="rounded-none"
          hoverScale={false}
        />
      ) : (
        <div
          className={cn(
            'relative bg-gradient-to-br',
            gradient,
            isHero ? 'aspect-[16/10]' : 'aspect-[4/3]'
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(184,92,56,0.15),transparent_50%)]" />
        </div>
      )}

      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-carbon/95 via-carbon/60 to-transparent p-6 md:p-8',
          isHero ? 'md:p-10' : ''
        )}
      >
        <h3
          className={cn(
            'font-display font-bold text-offwhite',
            isHero ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'mt-2 text-sm leading-relaxed text-sand/90 line-clamp-2',
            isHero ? 'md:text-base' : ''
          )}
        >
          {description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-terracota opacity-0 transition-all duration-300 group-hover:opacity-100">
          Ver proyectos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
